


export type Language = 'en' | 'ar';

export interface MedicalInfo {
  name: string;
  description: string;
  symptoms: string[];
  causes: string[];
  commonTreatments: string[];
  medicines: string[];
  prevention: string[];
}

export interface StructuredSearchResultData {
  type: 'structured';
  medicalInfo: MedicalInfo;
}

export interface GroundedSearchResultData {
  type: 'grounded';
  term: string;
  summary: string;
  sources: {
    uri: string;
    title: string;
  }[];
}

export interface SuggestionsResultData {
  type: 'suggestions';
  suggestions: string[];
  originalTerm: string;
}

export type AnySearchResult = StructuredSearchResultData | GroundedSearchResultData | SuggestionsResultData;

// This is the old type, kept for reference in case it's needed elsewhere but it's replaced by StructuredSearchResultData
export type SearchResultData = StructuredSearchResultData;

export type HistoryEntry = {
  term: string;
  timestamp: number;
};