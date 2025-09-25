import React, { createContext, useState, useEffect, ReactNode, useCallback } from 'react';
import type { Language } from '../types';

// The problematic JSON imports are removed.
// We now hardcode the default English translations to ensure a stable, synchronous start.
const defaultEnTranslations = {
  "header": {
    "title": "AI Doctor",
    "subtitle": "Your AI Medical Information Assistant",
    "favorites": "Favorites",
    "history": "History",
    "toggleTheme": "Switch to {theme} mode",
    "language": "Language",
    "viewFavorites": "View your saved favorites",
    "viewHistory": "View search history",
    "about": "About this application"
  },
  "search": {
    "placeholder": "Search condition, use voice, or upload image...",
    "placeholderChat": "Describe your symptoms to start a chat...",
    "button": "Search",
    "startChat": "Start Chat",
    "buttonLoading": "Searching...",
    "searchMode": "Search Mode",
    "search": "Standard Search",
    "symptomChecker": "Symptom Checker",
    "aiProvider": "AI Provider",
    "standardAI": "Standard",
    "advancedAI": "Advanced (Latest Info)",
    "clear": "Clear search",
    "uploadImage": "Upload Image",
    "removeImage": "Remove Image",
    "errorFileType": "Invalid file type. Please upload a JPEG, PNG, or WEBP image.",
    "errorFileSize": "File is too large. Please upload an image under 4MB.",
    "errorFileRead": "An error occurred while trying to read the file. Please try again.",
    "recentSearches": "Recent Searches",
    "voiceSearch": "Start voice search",
    "listening": "Listening...",
    "voiceErrorGeneral": "Sorry, we couldn't understand that. Please try again or type your search.",
    "voiceErrorNoSpeech": "We didn't hear anything. Please try speaking again.",
    "voiceErrorAudioCapture": "There's an issue with your microphone. Please check if it's working.",
    "voiceErrorNetwork": "Voice search requires a network connection. Please check your connection and try again.",
    "newSearch": "New Search"
  },
  "loading": {
    "title": "AI Doctor is thinking...",
    "messages": [
      "Consulting vast medical databases...",
      "Cross-referencing symptoms and causes...",
      "Analyzing peer-reviewed studies...",
      "Compiling information from trusted sources...",
      "Finalizing your detailed report..."
    ]
  },
  "initial": {
    "title": "How are you feeling today?",
    "subtitle": "Describe your symptoms, and our AI will help find relevant medical information.",
    "placeholder": "For example: 'I have a headache, fever, and a sore throat...'",
    "analyzeButton": "Analyze Symptoms",
    "commonSymptomsTitle": "Or start with a common symptom:",
    "symptoms": {
      "headache": "Headache",
      "fever": "Fever",
      "cough": "Cough",
      "fatigue": "Fatigue",
      "soreThroat": "Sore Throat"
    }
  },
  "results": {
    "shareEmail": "Share via Email",
    "copyAll": "Copy All Content",
    "copySection": "Copy Section",
    "copied": "Copied!",
    "addToFavorites": "Add {name} to favorites",
    "removeFromFavorites": "Remove {name} from favorites",
    "sources": "Sources",
    "relatedConditions": "Related Conditions",
    "sections": {
      "symptoms": "Common Symptoms",
      "causes": "Causes & Risk Factors",
      "treatments": "Common Treatments",
      "medicines": "Common Medicines",
      "prevention": "Prevention"
    }
  },
  "favorites": {
    "title": "Your Favorites",
    "close": "Close favorites list",
    "empty": "You haven't saved any favorites yet.",
    "view": "View",
    "remove": "Remove"
  },
  "history": {
    "title": "Search History",
    "close": "Close history list",
    "empty": "Your search history is empty.",
    "search": "Search",
    "clear": "Clear History"
  },
  "suggestions": {
    "title": "Did you mean:",
    "noResultsFor": "No exact results found for \"{term}\"."
  },
  "chat": {
    "title": "Symptom Analysis",
    "placeholder": "Type your response...",
    "sendButton": "Send message"
  },
  "disclaimer": {
    "title": "Important Disclaimer",
    "body": "The information provided by AI Doctor is for general informational and educational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition."
  },
  "error": {
    "general": "Sorry, an error occurred while fetching information. Please try again.",
    "emptySearch": "Please enter a medical condition or upload an image to search.",
    "offlineSearch": "You are offline. This information could not be loaded from the cache."
  },
  "offline": {
    "banner": "You are currently offline. Some features may be unavailable."
  },
  "micPermission": {
    "title": "Enable Voice Search?",
    "body": "To use voice search, this app needs access to your microphone. Your audio is not stored.",
    "enableButton": "Enable",
    "denyButton": "Not Now",
    "deniedError": "Microphone access is blocked. Please enable it in your browser settings to use voice search."
  },
  "footer": {
    "createdBy": "made by omar abdullah alshahrani | contest 25/26"
  },
  "languages": {
    "en": "English",
    "ar": "العربية"
  },
  "about": {
    "title": "About AI Doctor",
    "close": "Close about dialog",
    "closeButton": "Close",
    "body": {
      "paragraph1": "AI Doctor is a powerful tool designed to provide you with comprehensive and easy-to-understand medical information. Powered by Google's Gemini API, it can look up details on a vast range of illnesses, diseases, cancers, and viruses.",
      "paragraph2": "You can search for conditions, check symptoms, or even upload an image for analysis. Our goal is to make medical information more accessible, but it's crucial to remember that this app is not a substitute for professional medical advice."
    }
  },
  "fact": {
    "title": "Medical Fact of the Day",
    "error": "Could not load a medical fact at this time.",
    "newFact": "Get a New Fact",
    "facts": [
      "The human heart beats about 100,000 times a day, pumping about 2,000 gallons of blood.",
      "Your brain is sometimes more active when you’re asleep than when you’re awake.",
      "An adult's skin weighs around 8 pounds (3.6 kilograms) and covers an area of about 22 square feet (2 square meters).",
      "The acid in your stomach is strong enough to dissolve razor blades.",
      "Humans are the only species known to blush.",
      "Your bones are composed of about 31% water.",
      "The small intestine is roughly 20 feet long and is where about 90% of digestion and absorption of food occurs."
    ]
  }
};


export type Translations = typeof defaultEnTranslations;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  translations: Translations;
  t: (key: string, params?: Record<string, string | number>) => string;
}

const getNestedValue = (obj: any, path: string): any => {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
};

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');
  const [translations, setTranslations] = useState<Translations>(defaultEnTranslations);

  useEffect(() => {
    const savedLang = localStorage.getItem('ai-doctor-language') as Language | null;
    if (savedLang && ['en', 'ar'].includes(savedLang)) {
      setLanguage(savedLang);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('ai-doctor-language', language);
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';

    if (language === 'en') {
        setTranslations(defaultEnTranslations);
        return;
    }

    let isMounted = true;
    const fetchTranslations = async () => {
        try {
            const response = await fetch(`/locales/${language}.json`);
            if (!response.ok) throw new Error("Network response was not ok");
            const data = await response.json();
            if (isMounted) {
                setTranslations(data);
            }
        } catch (error) {
            console.error(`Failed to fetch translations for ${language}:`, error);
            // Fall back to English if another language fails to load
            if (isMounted) {
                setLanguage('en');
            }
        }
    };
    
    fetchTranslations();

    return () => { isMounted = false; };
  }, [language]);
  
  const t = useCallback((key: string, params?: Record<string, string | number>): string => {
      let value = getNestedValue(translations, key);
      if (value === undefined) {
        console.warn(`Translation key not found: ${key}`);
        return key;
      }

      if (typeof value === 'string' && params) {
        Object.entries(params).forEach(([paramKey, paramValue]) => {
          value = value.replace(`{${paramKey}}`, String(paramValue));
        });
      }
      
      return String(value);
  }, [translations]);

  const value = { language, setLanguage, translations, t };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};