import React, { useState, useCallback, useEffect, useRef } from 'react';
import { fetchMedicalData, createSymptomCheckerChat } from './services/geminiService';
import type { AnySearchResult, HistoryEntry } from './types';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import LoadingScreen from './components/LoadingScreen';
import SearchResult from './components/SearchResult';
import Disclaimer from './components/Disclaimer';
import InitialState from './components/InitialState';
import FavoritesList from './components/FavoritesList';
import HistoryList from './components/HistoryList';
import FilePreview from './components/FilePreview';
import ChatInterface from './components/ChatInterface';
import OfflineBanner from './components/OfflineBanner';
import DidYouMean from './components/DidYouMean';
import { loadFavoritesFromStorage, saveFavoritesToStorage, loadHistoryFromStorage, saveHistoryToStorage } from './utils/storage';
import { useTranslation } from './hooks/useTranslation';
import InitialLoadingScreen from './components/InitialLoadingScreen';
import type { Chat } from '@google/genai';
import DateTimeDisplay from './components/DateTimeDisplay';
import MicrophonePermissionPrompt from './components/MicrophonePermissionPrompt';
import About from './components/About';

type UploadedFile = { name: string; type: string; data: string };
type ConversationMessage = { author: 'user' | 'model'; text: string };
type AiProvider = 'standard' | 'advanced';
type SearchMode = 'search' | 'chat';

const getResultId = (result: AnySearchResult): string => {
  if (result.type === 'suggestions') return result.originalTerm;
  return result.type === 'structured' ? result.medicalInfo.name : result.term;
};

const App: React.FC = () => {
  const { language, t } = useTranslation();
  const [isAppLoading, setIsAppLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchResult, setSearchResult] = useState<AnySearchResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [isInitialState, setIsInitialState] = useState<boolean>(true);
  const [favorites, setFavorites] = useState<AnySearchResult[]>([]);
  const [showFavorites, setShowFavorites] = useState<boolean>(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [showHistory, setShowHistory] = useState<boolean>(false);
  const [aiProvider, setAiProvider] = useState<AiProvider>('standard');
  const [searchMode, setSearchMode] = useState<SearchMode>('search');
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);
  const [chat, setChat] = useState<Chat | null>(null);
  const [conversation, setConversation] = useState<ConversationMessage[]>([]);
  const [isChatting, setIsChatting] = useState<boolean>(false);
  const [isReplying, setIsReplying] = useState<boolean>(false);
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const [showMicPermissionPrompt, setShowMicPermissionPrompt] = useState<boolean>(false);
  const [micPermissionState, setMicPermissionState] = useState<PermissionState>('prompt');
  const [showAbout, setShowAbout] = useState<boolean>(false);

  const favoritesButtonRef = useRef<HTMLButtonElement>(null);
  const historyButtonRef = useRef<HTMLButtonElement>(null);
  const aboutButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAppLoading(false);
    }, 2500); // Show splash screen for 2.5 seconds

    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
        window.removeEventListener('online', handleOnline);
        window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    // Check for microphone permission status on load
    if (navigator.permissions && typeof navigator.permissions.query === 'function') {
      navigator.permissions.query({ name: 'microphone' as PermissionName }).then((permissionStatus) => {
        // Update state based on current permission
        setMicPermissionState(permissionStatus.state);
        
        // Listen for changes in permission status
        permissionStatus.onchange = () => {
          setMicPermissionState(permissionStatus.state);
        };
      });
    }
  }, []);

  useEffect(() => {
    setFavorites(loadFavoritesFromStorage());
    setHistory(loadHistoryFromStorage());
  }, []);

  useEffect(() => {
    saveFavoritesToStorage(favorites);
  }, [favorites]);

  useEffect(() => {
    saveHistoryToStorage(history);
  }, [history]);

  const handleFileChange = (file: File) => {
    if (!file) return;

    // Clear previous errors on new file selection
    setError(null);
    setFileError(null);

    // Check file type
    const acceptedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!acceptedTypes.includes(file.type)) {
      setFileError(t('search.errorFileType'));
      return;
    }

    // Check file size (4MB limit)
    const maxSize = 4 * 1024 * 1024;
    if (file.size > maxSize) {
      setFileError(t('search.errorFileSize'));
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      const base64Data = base64String.split(',')[1];
      setUploadedFile({
        name: file.name,
        type: file.type,
        data: base64Data
      });
    };
    reader.onerror = () => {
      setFileError(t('search.errorFileRead'));
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
    setFileError(null);
  }
  
  const handleSearchModeChange = (mode: SearchMode) => {
    setSearchMode(mode);
    // When switching to chat mode, clear any uploaded file as it's not applicable.
    if (mode === 'chat' && uploadedFile) {
        handleRemoveFile();
    }
  };


  const handleSearch = useCallback(async (query: string, isSymptomCheck = false) => {
    if (!query.trim() && !uploadedFile) {
      setError(t('error.emptySearch'));
      return;
    }
    
    setShowHistory(false);
    setError(null);
    setFileError(null);
    setSearchResult(null);
    setIsInitialState(false);
    setIsChatting(false);
    setConversation([]);
    setSearchTerm(query);

    if (isSymptomCheck) {
        setIsLoading(true);
        try {
            const chatSession = createSymptomCheckerChat(language);
            setChat(chatSession);
            setIsChatting(true);

            const userMessage: ConversationMessage = { author: 'user', text: query };
            setConversation([userMessage]);
            
            const response = await chatSession.sendMessage({ message: query });
            const modelMessage: ConversationMessage = { author: 'model', text: response.text };
            setConversation(prev => [...prev, modelMessage]);

        } catch (err) {
            console.error(err);
            if (!navigator.onLine) {
              setError(t('error.offlineSearch'));
            } else {
              setError(t('error.general'));
            }
            setIsChatting(false);
        } finally {
            setIsLoading(false);
        }
        return;
    }

    setIsLoading(true);
    try {
      // If a file is uploaded or offline, disable Google Search for this query
      const isGoogleSearchEnabled = uploadedFile || !isOnline ? false : aiProvider === 'advanced';
      const result = await fetchMedicalData(query, language, isGoogleSearchEnabled, uploadedFile ?? undefined, isOnline);
      
      setSearchResult(result);
      if (result.type !== 'suggestions' && !history.find(item => item.term.toLowerCase() === query.toLowerCase())) {
        const newHistoryEntry: HistoryEntry = { term: query, timestamp: Date.now() };
        setHistory(prev => [newHistoryEntry, ...prev].slice(0, 20)); // Keep last 20 searches
      }
    } catch (err) {
      console.error(err);
      if ((err as Error).message === 'offline-no-cache') {
        setError(t('error.offlineSearch'));
      } else {
        setError(t('error.general'));
      }
    } finally {
      setIsLoading(false);
      setUploadedFile(null); // Clear file after search
    }
  }, [language, t, history, uploadedFile, isOnline, aiProvider]);
  
  const handleChatReply = async (message: string) => {
    if (!chat) return;

    const userMessage: ConversationMessage = { author: 'user', text: message };
    setConversation(prev => [...prev, userMessage]);
    setIsReplying(true);

    try {
        const response = await chat.sendMessage({ message });
        const modelMessage: ConversationMessage = { author: 'model', text: response.text };
        setConversation(prev => [...prev, modelMessage]);
    } catch (err) {
        console.error(err);
        const errorMessage: ConversationMessage = { author: 'model', text: t('error.general') };
        setConversation(prev => [...prev, errorMessage]);
    } finally {
        setIsReplying(false);
    }
  };


  const handleAddToFavorites = (item: AnySearchResult) => {
    setFavorites(prev => [...prev, item]);
  };

  const handleRemoveFromFavorites = (itemId: string) => {
    setFavorites(prev => prev.filter(fav => getResultId(fav) !== itemId));
  };
  
  const handleSelectFavorite = (favorite: AnySearchResult) => {
    setIsInitialState(false);
    setError(null);
    setSearchResult(favorite);
    setShowFavorites(false);
    setIsChatting(false);
  };

  const handleClearHistory = () => {
    setHistory([]);
  };

  const handleRequestMicPermission = () => {
    if (!localStorage.getItem('ai-doctor-mic-permission-denied')) {
      setShowMicPermissionPrompt(true);
    }
  };

  const handleAllowMicPermission = async () => {
    setShowMicPermissionPrompt(false);
    try {
        // This will trigger the native browser permission prompt.
        // The 'onchange' listener will then update the micPermissionState.
        await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch (err) {
        console.error('Microphone permission denied by user.', err);
        // If the user denies the native prompt, set a flag
        // so our custom prompt doesn't show again.
        // The 'onchange' listener will handle the state update to 'denied'.
        localStorage.setItem('ai-doctor-mic-permission-denied', 'true');
    }
  };

  const handleDenyMicPermission = () => {
    // This handles the "Not Now" on our custom prompt.
    localStorage.setItem('ai-doctor-mic-permission-denied', 'true');
    setShowMicPermissionPrompt(false);
  };

  const handleStartNewSearch = () => {
    setIsInitialState(true);
    setSearchResult(null);
    setSearchTerm('');
    setError(null);
    setFileError(null);
    setUploadedFile(null);
    setIsChatting(false);
    setConversation([]);
    setChat(null);
  };

  if (isAppLoading) {
    return <InitialLoadingScreen />;
  }

  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen font-sans text-slate-800 dark:text-slate-200 flex flex-col">
      <div className="print-only print-header">
        <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-500 me-3" viewBox="0 0 24 24" fill="none" role="img" aria-labelledby="print-logo-title">
              <title id="print-logo-title">AI Doctor Logo</title>
              <path d="M12 5V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M5 12H9L11 9L13 15L15 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <h1 className="text-3xl font-bold text-slate-800">{t('header.title')}</h1>
        </div>
      </div>
      {!isOnline && <OfflineBanner />}
      <Header 
        favoritesCount={favorites.length}
        historyCount={history.length}
        onToggleFavorites={() => setShowFavorites(!showFavorites)}
        onToggleHistory={() => setShowHistory(!showHistory)}
        favoritesButtonRef={favoritesButtonRef}
        historyButtonRef={historyButtonRef}
        onToggleAbout={() => setShowAbout(!showAbout)}
        aboutButtonRef={aboutButtonRef}
      />
      <main className="flex-grow container mx-auto p-4 md:p-8 flex flex-col items-center">
        <div className="w-full max-w-3xl no-print">
          <DateTimeDisplay />
          <SearchBar 
            onSearch={handleSearch} 
            isLoading={isLoading} 
            aiProvider={aiProvider}
            onAiProviderChange={setAiProvider}
            searchMode={searchMode}
            onSearchModeChange={handleSearchModeChange}
            onFileChange={handleFileChange}
            hasFile={!!uploadedFile}
            fileError={fileError}
            isOnline={isOnline}
            history={history}
            micPermissionState={micPermissionState}
            onRequestMicPermission={handleRequestMicPermission}
          />
          {!isInitialState && !isLoading && (
            <div className="mt-6 text-center">
              <button
                onClick={handleStartNewSearch}
                className="px-6 py-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-opacity-50 transition-colors text-sm"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block me-2 -mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                {t('search.newSearch')}
              </button>
            </div>
          )}
          {uploadedFile && (
            <FilePreview file={uploadedFile} onRemove={handleRemoveFile} />
          )}
          {error && <div role="alert" className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md text-center dark:bg-red-900/50 dark:border-red-700 dark:text-red-300">{error}</div>}
        </div>
        
        <div className="w-full max-w-3xl mt-8">
          {isLoading && !isChatting ? (
            <LoadingScreen />
          ) : (
            <>
              {isChatting ? (
                <ChatInterface 
                    conversation={conversation}
                    onSendMessage={handleChatReply}
                    isReplying={isReplying}
                />
              ) : (
                <>
                  {!error && searchResult?.type === 'suggestions' && (
                    <DidYouMean 
                      originalTerm={searchResult.originalTerm}
                      suggestions={searchResult.suggestions}
                      onSelectSuggestion={handleSearch}
                    />
                  )}
                  {!error && (searchResult?.type === 'structured' || searchResult?.type === 'grounded') && (
                    <SearchResult 
                      data={searchResult}
                      favorites={favorites}
                      onAddToFavorites={handleAddToFavorites}
                      onRemoveFromFavorites={handleRemoveFromFavorites}
                      onSearch={handleSearch}
                    />
                  )}
                  {!error && !searchResult && isInitialState && <InitialState onSearch={handleSearch} />}
                </>
              )}
            </>
          )}
        </div>
      </main>
      <Disclaimer />
      <FavoritesList 
        isOpen={showFavorites}
        favorites={favorites}
        onClose={() => setShowFavorites(false)}
        onSelect={handleSelectFavorite}
        onRemove={handleRemoveFromFavorites}
        triggerRef={favoritesButtonRef}
      />
       <HistoryList 
        isOpen={showHistory}
        history={history}
        onClose={() => setShowHistory(false)}
        onSelect={handleSearch}
        onClear={handleClearHistory}
        triggerRef={historyButtonRef}
      />
      <About
        isOpen={showAbout}
        onClose={() => setShowAbout(false)}
        triggerRef={aboutButtonRef}
      />
       {showMicPermissionPrompt && (
        <MicrophonePermissionPrompt
          onAllow={handleAllowMicPermission}
          onDeny={handleDenyMicPermission}
        />
      )}
    </div>
  );
};

export default App;