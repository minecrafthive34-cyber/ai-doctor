import React, { useState, useEffect } from 'react';
import { useTranslation } from '../hooks/useTranslation';

const LoadingScreen: React.FC = () => {
  const { translations, t } = useTranslation();
  const loadingMessages = translations.loading.messages;
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prevIndex) => (prevIndex + 1) % loadingMessages.length);
    }, 2500);

    return () => clearInterval(interval);
  }, [loadingMessages.length]);

  return (
    <div 
        className="flex flex-col items-center justify-center p-8 text-center bg-white dark:bg-slate-800 rounded-lg shadow-md border border-slate-200 dark:border-slate-700"
        aria-live="polite"
        aria-atomic="true"
    >
      <h2 className="text-2xl font-bold text-blue-600 mb-6">{t('loading.title')}</h2>
      <div className="relative w-24 h-24" aria-hidden="true">
        {/* Static background ring */}
        <div className="absolute inset-0 border-8 border-slate-100 dark:border-slate-700 rounded-full"></div>
        {/* Spinning arc */}
        <div className="absolute inset-0 border-8 border-t-blue-500 border-l-transparent border-b-blue-500 border-r-transparent rounded-full animate-spin"></div>
        {/* Pulsing center icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c.251.023.501.05.75.082a.75.75 0 01.75.75v5.714a2.25 2.25 0 00.659 1.591L19 14.5M9.75 3.104l-2.022.022A2.25 2.25 0 005.625 5.25v5.714a2.25 2.25 0 00.659 1.591L12 21l6.341-6.341a2.25 2.25 0 00.659-1.591V5.25a2.25 2.25 0 00-2.25-2.25H9.75z" />
          </svg>
        </div>
      </div>
      <p key={messageIndex} className="text-slate-600 dark:text-slate-300 mt-8 text-lg animate-fade-in">
        {loadingMessages[messageIndex]}
      </p>
    </div>
  );
};

export default LoadingScreen;
