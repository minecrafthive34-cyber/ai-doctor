import React, { useState } from 'react';
import { useTranslation } from '../hooks/useTranslation';
import type { Language } from '../types';
import { useTheme } from '../context/ThemeContext';
import { SunIcon, MoonIcon } from './Icons';

interface HeaderProps {
  favoritesCount: number;
  historyCount: number;
  onToggleFavorites: () => void;
  onToggleHistory: () => void;
  favoritesButtonRef: React.RefObject<HTMLButtonElement>;
  historyButtonRef: React.RefObject<HTMLButtonElement>;
  onToggleAbout: () => void;
  aboutButtonRef: React.RefObject<HTMLButtonElement>;
}

const Header: React.FC<HeaderProps> = ({ 
  favoritesCount, 
  historyCount, 
  onToggleFavorites, 
  onToggleHistory, 
  favoritesButtonRef, 
  historyButtonRef,
  onToggleAbout,
  aboutButtonRef,
}) => {
  const { language, setLanguage, t } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const [isLangDropdownOpen, setLangDropdownOpen] = useState(false);

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    setLangDropdownOpen(false);
  }

  return (
    <header className="bg-white dark:bg-slate-800 shadow-sm w-full sticky top-0 z-10 border-b border-slate-200 dark:border-slate-700 no-print">
      <div className="container mx-auto p-4 flex items-center justify-between">
        <div className="flex items-center">
          <div className="flex items-center flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 sm:h-10 sm:w-10 text-blue-500 me-3" viewBox="0 0 24 24" fill="none" role="img" aria-labelledby="logo-title">
              <title id="logo-title">AI Doctor Logo</title>
              {/* Vertical bar of the cross */}
              <path d="M12 5V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              {/* Horizontal pulse line */}
              <path d="M5 12H9L11 9L13 15L15 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-100">{t('header.title')}</h1>
              <p className="hidden sm:block text-sm text-slate-500 dark:text-slate-400">{t('header.subtitle')}</p>
            </div>
          </div>
          {/* AFFILIATION LOGOS */}
          <div className="hidden lg:flex items-center gap-4 ml-6 pl-6 border-l border-slate-200 dark:border-slate-700 h-10">
            <a href="https://www.un.org" target="_blank" rel="noopener noreferrer" title="United Nations" className="text-slate-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
              <svg role="img" aria-label="United Nations Logo" className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                  <title>United Nations</title>
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10" />
                  <path d="M12 2a15.3 15.3 0 00-4 10 15.3 15.3 0 004 10" />
                  <path d="M2 12h20" />
                  <path d="M5 19c2-3 2-7 0-10" />
                  <path d="M19 19c-2-3-2-7 0-10" />
              </svg>
            </a>
            <a href="https://www.who.int" target="_blank" rel="noopener noreferrer" title="World Health Organization" className="text-slate-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
              <svg role="img" aria-label="World Health Organization Symbol" className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <title>World Health Organization</title>
                <line x1="12" y1="2" x2="12" y2="22" />
                <path d="M9 20C15 16 9 8 15 4" />
              </svg>
            </a>
          </div>
        </div>
        <div className="flex items-center gap-1 sm:gap-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-opacity-50 transition-colors"
            aria-label={t('header.toggleTheme', { theme: theme === 'light' ? 'dark' : 'light' })}
          >
            {theme === 'light' ? (
              <MoonIcon className="h-6 w-6" />
            ) : (
              <SunIcon className="h-6 w-6" />
            )}
          </button>
          <div className="relative">
            <button
              onClick={() => setLangDropdownOpen(!isLangDropdownOpen)}
              className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-opacity-50 transition-colors"
              aria-label={t('header.language')}
              aria-haspopup="true"
              aria-expanded={isLangDropdownOpen}
              aria-controls="language-menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C13.18 7.083 14.133 7.5 15 7.5c2.25 0 4.5-.634 6-1.875" />
              </svg>
            </button>
            {isLangDropdownOpen && (
              <div id="language-menu" role="menu" className="absolute end-0 mt-2 w-32 bg-white dark:bg-slate-800 rounded-md shadow-lg z-20 border border-slate-200 dark:border-slate-600">
                <button role="menuitem" onClick={() => handleLanguageChange('en')} className={`block w-full text-start px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 ${language === 'en' ? 'font-bold' : ''}`}>
                  {t('languages.en')}
                </button>
                <button role="menuitem" onClick={() => handleLanguageChange('ar')} className={`block w-full text-start px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 ${language === 'ar' ? 'font-bold' : ''}`}>
                  {t('languages.ar')}
                </button>
              </div>
            )}
          </div>
          <button
            ref={aboutButtonRef}
            onClick={onToggleAbout}
            className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-opacity-50 transition-colors"
            aria-label={t('header.about')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
            </svg>
          </button>
           <button 
            ref={historyButtonRef}
            onClick={onToggleHistory}
            className="relative flex items-center p-2 sm:px-4 sm:py-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-opacity-50 transition-colors"
            aria-label={t('header.viewHistory')}
          >
             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:me-2" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
             </svg>
            <span className="hidden sm:inline">{t('header.history')}</span>
            {historyCount > 0 && (
              <span className="absolute -top-2 -end-2 flex items-center justify-center h-5 w-5 bg-blue-500 text-white text-xs font-bold rounded-full" aria-live="polite">
                {historyCount}
              </span>
            )}
          </button>
          <button 
            ref={favoritesButtonRef}
            onClick={onToggleFavorites}
            className="relative flex items-center p-2 sm:px-4 sm:py-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-opacity-50 transition-colors"
            aria-label={t('header.viewFavorites')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:me-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.196-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
            <span className="hidden sm:inline">{t('header.favorites')}</span>
            {favoritesCount > 0 && (
              <span className="absolute -top-2 -end-2 flex items-center justify-center h-5 w-5 bg-blue-500 text-white text-xs font-bold rounded-full" aria-live="polite">
                {favoritesCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;