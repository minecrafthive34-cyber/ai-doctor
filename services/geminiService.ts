import { GoogleGenAI, Type, Chat } from "@google/genai";
import type { MedicalInfo, AnySearchResult, Language, SuggestionsResultData } from '../types';
import { preCannedData } from '../data/preCannedData';
import { levenshtein } from '../utils/stringSimilarity';

// Lazily initialize the AI client to prevent crash on load
let ai: GoogleGenAI | null = null;
const getAiClient = (): GoogleGenAI => {
  if (!ai) {
    ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
  return ai;
};


const medicalInfoSchema = {
  type: Type.OBJECT,
  properties: {
    name: { 
      type: Type.STRING, 
      description: "The common name of the medical condition." 
    },
    description: { 
      type: Type.STRING, 
      description: "A detailed but easy-to-understand overview of the condition, including what it is and who it affects." 
    },
    symptoms: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "A list of 5-7 common symptoms associated with the condition."
    },
    causes: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "A list of known causes or primary risk factors for the condition."
    },
    commonTreatments: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "A list of general categories of non-pharmaceutical treatment options (e.g., 'Physical therapy', 'Lifestyle changes', 'Surgical options')."
    },
    medicines: {
       type: Type.ARRAY,
       items: { type: Type.STRING },
       description: "A list of general classes of medications used for treatment. Do not recommend specific drugs. For example, 'Antiviral medications', 'Pain relievers', or 'Antibiotics'."
    },
    prevention: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "A list of common preventive measures."
    }
  },
  required: ["name", "description", "symptoms", "causes", "commonTreatments", "medicines", "prevention"]
};

export function createSymptomCheckerChat(language: Language): Chat {
    const client = getAiClient();
    const languageMap: Record<string, string> = {
        en: 'English',
        ar: 'Arabic',
    };
    const responseLanguage = languageMap[language] || 'English';

    const systemInstruction = `You are AI Doctor, a friendly and empathetic medical information assistant. Your language is ${responseLanguage}.
When a user describes their symptoms, your very first response must be a clarifying question to better understand their pain. Ask about location, type of pain (e.g., sharp, dull, cramping), and duration. Be conversational and caring.
After the user responds, you can ask one more follow-up question if necessary.
Then, provide a helpful summary that lists potential causes based on the conversation and clear suggestions on when it might be appropriate to see a doctor.
IMPORTANT: You are not a doctor. Do not provide a diagnosis. All information is for educational purposes only. Always include a disclaimer advising the user to consult a professional.`;

    const chat = client.chats.create({
        model: 'gemini-2.5-flash',
        config: {
            systemInstruction,
        },
    });
    return chat;
}

export async function fetchMedicalData(
    term: string, 
    language: Language, 
    useGoogleSearch: boolean,
    image?: { type: string; data: string },
    isOnline?: boolean
): Promise<AnySearchResult> {
  const normalizedTerm = term.trim().toLowerCase();
  const cacheKey = `search-cache-${language}-${normalizedTerm}`;
  
  // Check for pre-canned data first. This works offline.
  if (!useGoogleSearch && !image) {
    // 1. Try to find a match in the current language
    const currentLangData = preCannedData[language] || [];
    let match = currentLangData.find(data => data.medicalInfo.name.toLowerCase() === normalizedTerm);

    if (match) {
        console.log(`Serving pre-canned data in ${language} for:`, term);
        return Promise.resolve(JSON.parse(JSON.stringify(match)));
    }

    // 2. If no match, try fallback language ('en') if current language is not 'en'
    if (language !== 'en') {
        const fallbackLangData = preCannedData.en;
        match = fallbackLangData.find(data => data.medicalInfo.name.toLowerCase() === normalizedTerm);
        if (match) {
            console.log(`Serving pre-canned data from fallback 'en' for:`, term);
            return Promise.resolve(JSON.parse(JSON.stringify(match)));
        }
    }
    
    // 3. If no exact match, check for suggestions from pre-canned data using fuzzy search across both languages
    const allTermNamesCurrentLang = (preCannedData[language] || []).map(data => data.medicalInfo.name);
    const allTermNamesFallbackLang = language !== 'en' ? preCannedData.en.map(data => data.medicalInfo.name) : [];
    const allTermNames = [...new Set([...allTermNamesCurrentLang, ...allTermNamesFallbackLang])];
    
    const maxDistance = normalizedTerm.length < 5 ? 1 : (normalizedTerm.length < 9 ? 2 : 3);

    const suggestions = allTermNames
        .map(preCannedTerm => {
            const lowerCasedTerm = preCannedTerm.toLowerCase();
            const variations = [lowerCasedTerm];
            const parenthesisMatch = lowerCasedTerm.match(/\(([^)]+)\)/);
            
            if (parenthesisMatch && parenthesisMatch[1]) {
                variations.push(lowerCasedTerm.split('(')[0].trim());
                variations.push(parenthesisMatch[1].trim());
            }

            const minDistance = Math.min(
                ...variations.map(v => levenshtein(normalizedTerm, v))
            );

            return {
                term: preCannedTerm,
                distance: minDistance,
            };
        })
        .filter(item => item.distance > 0 && item.distance <= maxDistance)
        .sort((a, b) => a.distance - b.distance)
        .map(item => item.term)
        .slice(0, 3);

    if (suggestions.length > 0) {
        console.log(`No exact match for "${term}", providing suggestions from available languages.`);
        const result: SuggestionsResultData = {
            type: 'suggestions',
            suggestions,
            originalTerm: term,
        };
        return Promise.resolve(result);
    }
  }

  // If offline and no pre-canned data was found, try the cache.
  if (isOnline === false) {
    try {
        const cachedItem = localStorage.getItem(cacheKey);
        if (cachedItem) {
            console.log('Serving from localStorage cache for:', term);
            return JSON.parse(cachedItem);
        }
    } catch (e) {
        console.error("Failed to read search result from localStorage cache.", e);
    }
    // If we are offline and nothing is in the cache, throw a specific error.
    throw new Error("offline-no-cache");
  }

  // If online, proceed with API calls.
  try {
    const client = getAiClient();
    const languageMap: Record<string, string> = {
      en: 'English',
      ar: 'Arabic',
    };
    const responseLanguage = languageMap[language] || 'English';

    if (image) {
        const imagePart = {
            inlineData: {
                mimeType: image.type,
                data: image.data,
            },
        };
        const textPart = {
            text: `Analyze the attached image and provide a detailed, easy-to-understand summary based on the following query. If the image is not medically relevant, state that clearly. Provide information for educational purposes only and include a disclaimer that this is not a medical diagnosis. Query: "${term}". Respond in ${responseLanguage}.`,
        };

        const response = await client.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: { parts: [imagePart, textPart] },
        });

        return {
            type: 'grounded',
            term: term || "Image Analysis",
            summary: response.text,
            sources: [],
        };
    }

    if (useGoogleSearch) {
      const response = await client.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `Provide a detailed, easy-to-understand summary about the medical condition "${term}" in ${responseLanguage}. Focus on the most important and current information.`,
        config: {
          tools: [{googleSearch: {}}],
        },
      });

      const summary = response.text;
      const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks ?? [];
      const sources = groundingChunks
        .map((chunk: any) => chunk.web)
        .filter((source: any) => source && source.uri && source.title)
        .map((source: any) => ({ uri: source.uri, title: source.title }));
      
      return {
        type: 'grounded',
        term,
        summary,
        sources,
      };
    }

    const medicalInfoResponse = await client.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Provide detailed information about the following medical condition in ${responseLanguage}: ${term}`,
      config: {
        systemInstruction: `You are an AI medical encyclopedia. Your role is to provide factual, easy-to-understand information about medical conditions in ${responseLanguage}. You must respond strictly in the provided JSON format. Do not offer diagnoses, medical advice, or treatment recommendations. The information provided is for educational purposes only. The 'name' property in the JSON schema should be the common name of the condition in ${responseLanguage}.`,
        responseMimeType: "application/json",
        responseSchema: medicalInfoSchema,
      },
    });

    const jsonText = medicalInfoResponse.text.trim();
    const medicalInfo = JSON.parse(jsonText) as MedicalInfo;
    
    const result: AnySearchResult = {
        type: 'structured',
        medicalInfo,
    };

    // Cache the successful structured result before returning.
    try {
      localStorage.setItem(cacheKey, JSON.stringify(result));
    } catch (e) {
      console.error("Failed to write search result to localStorage cache.", e);
    }

    return result;

  } catch (error) {
    console.error("Error fetching medical data from API:", error);
    throw new Error("Failed to parse or fetch medical information.");
  }
}

const relatedConditionsSchema = {
    type: Type.OBJECT,
    properties: {
        conditions: {
            type: Type.ARRAY,
            description: "A list of 3 to 5 medically related conditions.",
            items: { type: Type.STRING }
        }
    },
    required: ["conditions"]
};


export async function fetchRelatedConditions(conditionName: string, language: Language): Promise<string[]> {
    try {
        const client = getAiClient();
        const languageMap: Record<string, string> = {
            en: 'English',
            ar: 'Arabic',
        };
        const responseLanguage = languageMap[language] || 'English';

        const response = await client.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `List 3 to 5 medically related conditions to "${conditionName}". For example, if the condition is "Type 2 Diabetes", related conditions might include "Hypertension", "Obesity", or "Diabetic Retinopathy". Respond in ${responseLanguage}.`,
            config: {
                responseMimeType: "application/json",
                responseSchema: relatedConditionsSchema,
            },
        });

        const jsonText = response.text.trim();
        const result = JSON.parse(jsonText);
        return result.conditions || [];
    } catch (error) {
        console.error("Error fetching related conditions:", error);
        return []; // Return an empty array on failure
    }
}
