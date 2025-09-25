import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from '../hooks/useTranslation';
import { preCannedData } from '../data/preCannedData';
import type { HistoryEntry } from '../types';
import { levenshtein } from '../utils/stringSimilarity';
import { MicrophoneIcon } from './Icons';

// Add type definitions for the Web Speech API to resolve TypeScript errors.
interface SpeechRecognitionEvent extends Event {
  readonly resultIndex: number;
  readonly results: SpeechRecognitionResultList;
}

interface SpeechRecognitionResultList {
  readonly length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  readonly length: number;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionAlternative {
  readonly transcript: string;
}

interface SpeechRecognitionErrorEvent extends Event {
    readonly error: 'no-speech' | 'audio-capture' | 'network' | 'not-allowed' | 'service-not-allowed' | 'bad-grammar' | 'language-not-supported';
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  lang: string;
  interimResults: boolean;
  maxAlternatives: number;
  start(): void;
  stop(): void;
  onstart: ((this: SpeechRecognition, ev: Event) => any) | null;
  onresult: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => any) | null;
  onerror: ((this: SpeechRecognition, ev: SpeechRecognitionErrorEvent) => any) | null;
  onend: ((this: SpeechRecognition, ev: Event) => any) | null;
}

interface SpeechRecognitionStatic {
  new (): SpeechRecognition;
}

declare global {
  interface Window {
    SpeechRecognition: SpeechRecognitionStatic;
    webkitSpeechRecognition: SpeechRecognitionStatic;
  }
}

type AiProvider = 'standard' | 'advanced';
type SearchMode = 'search' | 'chat';

interface SearchBarProps {
  onSearch: (query: string, isSymptomCheck?: boolean) => void;
  isLoading: boolean;
  aiProvider: AiProvider;
  onAiProviderChange: (provider: AiProvider) => void;
  searchMode: SearchMode;
  onSearchModeChange: (mode: SearchMode) => void;
  onFileChange: (file: File) => void;
  hasFile: boolean;
  fileError: string | null;
  isOnline: boolean;
  history: HistoryEntry[];
  micPermissionState: PermissionState;
  onRequestMicPermission: () => void;
}

type SuggestionType = 'history' | 'query';

const SearchBar: React.FC<SearchBarProps> = ({ 
  onSearch, 
  isLoading, 
  aiProvider, 
  onAiProviderChange, 
  searchMode,
  onSearchModeChange,
  onFileChange, 
  hasFile, 
  fileError, 
  isOnline, 
  history, 
  micPermissionState, 
  onRequestMicPermission 
}) => {
  const [query, setQuery] = useState('');
  const { t, language } = useTranslation();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [isListening, setIsListening] = useState(false);
  const [voiceError, setVoiceError] = useState<string | null>(null);
  const [isVoiceSupported, setIsVoiceSupported] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);
  const [suggestionType, setSuggestionType] = useState<SuggestionType>('query');

  useEffect(() => {
    // Check for browser support for Web Speech API
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setIsVoiceSupported(false);
      return;
    }
    
    setIsVoiceSupported(true);
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.lang = language;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
      setVoiceError(null);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setQuery(transcript);
      onSearch(transcript, searchMode === 'chat'); // Automatically trigger search after voice input
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error', event.error);
      switch (event.error) {
        case 'not-allowed':
        case 'service-not-allowed':
          setVoiceError(t('micPermission.deniedError'));
          break;
        case 'no-speech':
          setVoiceError(t('search.voiceErrorNoSpeech'));
          break;
        case 'audio-capture':
          setVoiceError(t('search.voiceErrorAudioCapture'));
          break;
        case 'network':
          setVoiceError(t('search.voiceErrorNetwork'));
          break;
        default:
          setVoiceError(t('search.voiceErrorGeneral'));
          break;
      }
    };
    
    recognition.onend = () => {
      setIsListening(false);
    };
    
    recognitionRef.current = recognition;
    
    // Cleanup function
    return () => {
      recognition?.stop();
    };

  }, [language, onSearch, t, searchMode]);


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
            setShowSuggestions(false);
        }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
        document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuggestions(false);
    onSearch(query, searchMode === 'chat');
  };
  
  const showRecentSearches = () => {
    const recentSearches = history.slice(0, 5).map(h => h.term);
    if (recentSearches.length > 0) {
      setSuggestions(recentSearches);
      setSuggestionType('history');
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleFocus = () => {
    if (query.trim() === '') {
      showRecentSearches();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setActiveSuggestionIndex(-1);

    if (value.trim() === '') {
      showRecentSearches();
      return;
    }

    // User is typing, switch to query suggestions
    setSuggestionType('query');
    const normalizedValue = value.trim().toLowerCase();

    // 1. Get history suggestions (high priority for completions)
    const historySuggestions = history
        .map(item => item.term)
        .filter(term => term.toLowerCase().includes(normalizedValue) && term.toLowerCase() !== normalizedValue);

    // 2. Get pre-canned data suggestions (includes direct substring and fuzzy matches)
    const langData = preCannedData[language] || preCannedData.en;
    
    // Direct substring matches from pre-canned data
    const directPreCanned = langData
        .map(item => item.medicalInfo.name)
        .filter(name => name.toLowerCase().includes(normalizedValue));

    // Fuzzy matches for typos from pre-canned data
    const maxDistance = normalizedValue.length < 5 ? 1 : 2; // Keep threshold low for relevance
    const fuzzyPreCanned = langData
        .map(item => {
            const preCannedTerm = item.medicalInfo.name;
            const lowerCasedTerm = preCannedTerm.toLowerCase();
            
            const variations = [lowerCasedTerm];
            const parenthesisMatch = lowerCasedTerm.match(/\(([^)]+)\)/);
            if (parenthesisMatch && parenthesisMatch[1]) {
                variations.push(lowerCasedTerm.split('(')[0].trim());
                variations.push(parenthesisMatch[1].trim());
            }

            const minDistance = Math.min(
                ...variations.map(v => levenshtein(normalizedValue, v))
            );

            return { term: preCannedTerm, distance: minDistance };
        })
        .filter(item => item.distance > 0 && item.distance <= maxDistance)
        .sort((a, b) => a.distance - b.distance)
        .map(item => item.term);

    // 3. Combine, deduplicate, and limit
    // Priority: History, Direct Substring, Fuzzy
    const combined = [...new Set([...historySuggestions, ...directPreCanned, ...fuzzyPreCanned])];
    const finalSuggestions = combined.slice(0, 7);

    setSuggestions(finalSuggestions);
    setShowSuggestions(finalSuggestions.length > 0);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    setShowSuggestions(false);
    setActiveSuggestionIndex(-1);
    onSearch(suggestion, searchMode === 'chat');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions || suggestions.length === 0) return;

    if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveSuggestionIndex(prev => (prev + 1) % suggestions.length);
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveSuggestionIndex(prev => (prev - 1 + suggestions.length) % suggestions.length);
    } else if (e.key === 'Enter') {
        if (activeSuggestionIndex > -1 && suggestions[activeSuggestionIndex]) {
            e.preventDefault(); // prevent form submission, as handleSuggestionClick will trigger a search
            handleSuggestionClick(suggestions[activeSuggestionIndex]);
        }
    } else if (e.key === 'Escape') {
        setShowSuggestions(false);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };
  
  const handleVoiceClick = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      return;
    }

    if (micPermissionState === 'granted') {
      if (recognitionRef.current) {
        setQuery(''); // Clear query before starting
        setVoiceError(null);
        recognitionRef.current.start();
      }
    } else if (micPermissionState === 'prompt') {
      onRequestMicPermission();
    }
    // If state is 'denied', button is disabled, so nothing happens.
  };

  const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileChange(e.target.files[0]);
      e.target.value = ''; // Reset input to allow re-uploading the same file
    }
  };

  const errorToShow = fileError || voiceError;

  return (
    <div ref={containerRef} className="flex flex-col gap-3">
        <div className="relative">
            <form onSubmit={handleSubmit} className="w-full flex flex-col sm:flex-row items-center gap-2 p-2 bg-white dark:bg-slate-800 rounded-full shadow-md border border-slate-200 dark:border-slate-700">
                <input 
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileSelected}
                    className="hidden"
                    accept="image/png, image/jpeg, image/webp"
                    aria-hidden="true"
                />
                <button
                    type="button"
                    onClick={handleUploadClick}
                    disabled={isLoading || hasFile || !isOnline || searchMode === 'chat'}
                    className="p-3 text-slate-500 dark:text-slate-400 hover:text-blue-500 dark:hover:text-blue-400 disabled:text-slate-300 dark:disabled:text-slate-600 disabled:cursor-not-allowed transition-colors"
                    aria-label={t('search.uploadImage')}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                    </svg>
                </button>
                {isVoiceSupported && (
                  <button
                    type="button"
                    onClick={handleVoiceClick}
                    disabled={isLoading || !isOnline || !isVoiceSupported || micPermissionState === 'denied'}
                    className={`p-3 relative text-slate-500 dark:text-slate-400 hover:text-blue-500 dark:hover:text-blue-400 disabled:text-slate-300 dark:disabled:text-slate-600 disabled:cursor-not-allowed transition-colors ${isListening ? 'text-blue-500' : ''}`}
                    aria-label={t('search.voiceSearch')}
                  >
                    <MicrophoneIcon className="h-6 w-6" />
                    {isListening && (
                      <span className="absolute inset-0 m-auto h-8 w-8 rounded-full bg-blue-500 opacity-20 animate-ping" aria-hidden="true"></span>
                    )}
                  </button>
                )}
                <div className="relative w-full sm:flex-1">
                    <input
                    type="text"
                    value={query}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    onFocus={handleFocus}
                    placeholder={isListening ? t('search.listening') : (searchMode === 'chat' ? t('search.placeholderChat') : t('search.placeholder'))}
                    aria-label={searchMode === 'chat' ? t('search.placeholderChat') : t('search.placeholder')}
                    className="w-full px-5 py-3 pr-12 text-lg bg-transparent focus:outline-none text-slate-700 dark:text-slate-200"
                    disabled={isLoading}
                    autoComplete="off"
                    />
                    <div className="absolute inset-y-0 end-0 flex items-center pe-2">
                        {query && !isLoading && (
                            <button
                            type="button"
                            onClick={() => {
                                setQuery('');
                                handleFocus(); // Re-trigger focus to show recent searches
                            }}
                            className="p-2 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                            aria-label={t('search.clear')}
                            >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            </button>
                        )}
                    </div>
                </div>
                <button
                type="submit"
                disabled={isLoading || (!query.trim() && !hasFile)}
                className="w-full sm:w-auto px-8 py-3 bg-blue-500 text-white font-semibold rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors disabled:bg-slate-400 dark:disabled:bg-slate-600 disabled:cursor-not-allowed flex items-center justify-center"
                >
                {isLoading ? (
                    <>
                    <svg className="animate-spin -ms-1 me-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {t('search.buttonLoading')}
                    </>
                ) : (
                    searchMode === 'chat' ? t('search.startChat') : t('search.button')
                )}
                </button>
            </form>
            {showSuggestions && suggestions.length > 0 && (
                <ul
                    className="absolute top-full mt-2 w-full bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 z-20 overflow-hidden"
                    role="listbox"
                    aria-label="Search suggestions"
                >
                    {suggestionType === 'history' && (
                        <li className="px-5 py-2 text-sm text-slate-500 dark:text-slate-400 font-semibold pointer-events-none" role="presentation">
                            {t('search.recentSearches')}
                        </li>
                    )}
                    {suggestions.map((suggestion, index) => (
                        <li 
                            key={`${suggestion}-${index}`}
                            onClick={() => handleSuggestionClick(suggestion)}
                            className={`px-5 py-3 cursor-pointer text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 ${index === activeSuggestionIndex ? 'bg-slate-100 dark:bg-slate-700' : ''}`}
                            role="option"
                            aria-selected={index === activeSuggestionIndex}
                        >
                            {suggestion}
                        </li>
                    ))}
                </ul>
            )}
        </div>
      {errorToShow && (
        <div role="alert" className="text-center text-red-600 dark:text-red-400 text-sm -mt-2">
          {errorToShow}
        </div>
      )}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 no-print">
        <fieldset
          className="p-1 flex items-center bg-slate-100 dark:bg-slate-800 rounded-full"
          aria-label={t('search.searchMode')}
          disabled={isLoading}
        >
          <legend className="sr-only">{t('search.searchMode')}</legend>
          <button
            onClick={() => onSearchModeChange('search')}
            aria-pressed={searchMode === 'search'}
            className={`px-4 py-1.5 text-sm rounded-full font-semibold transition-colors disabled:cursor-not-allowed ${
              searchMode === 'search'
                ? 'bg-white dark:bg-slate-900 text-blue-600 shadow'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            {t('search.search')}
          </button>
          <button
            onClick={() => onSearchModeChange('chat')}
            aria-pressed={searchMode === 'chat'}
            className={`px-4 py-1.5 text-sm rounded-full font-semibold transition-colors disabled:cursor-not-allowed ${
              searchMode === 'chat'
                ? 'bg-white dark:bg-slate-900 text-blue-600 shadow'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            {t('search.symptomChecker')}
          </button>
        </fieldset>

        <fieldset
          className={`p-1 flex items-center bg-slate-100 dark:bg-slate-800 rounded-full transition-opacity ${
            (hasFile || !isOnline || searchMode === 'chat') ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          aria-label={t('search.aiProvider')}
          disabled={hasFile || !isOnline || searchMode === 'chat'}
        >
          <legend className="sr-only">{t('search.aiProvider')}</legend>
          <button
            onClick={() => onAiProviderChange('standard')}
            aria-pressed={aiProvider === 'standard'}
            className={`px-4 py-1.5 text-sm rounded-full font-semibold transition-colors disabled:cursor-not-allowed ${
              aiProvider === 'standard'
                ? 'bg-white dark:bg-slate-900 text-blue-600 shadow'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            {t('search.standardAI')}
          </button>
          <button
            onClick={() => onAiProviderChange('advanced')}
            aria-pressed={aiProvider === 'advanced'}
            className={`px-4 py-1.5 text-sm rounded-full font-semibold transition-colors disabled:cursor-not-allowed ${
              aiProvider === 'advanced'
                ? 'bg-white dark:bg-slate-900 text-blue-600 shadow'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            {t('search.advancedAI')}
          </button>
        </fieldset>
      </div>
    </div>
  );
};

export default SearchBar;