import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from '../hooks/useTranslation';

const FactOfTheDay: React.FC = () => {
  const [factIndex, setFactIndex] = useState<number>(-1);
  const { t, translations } = useTranslation();

  const facts = React.useMemo(() => translations?.fact?.facts || [], [translations]);

  const getNewFact = useCallback(() => {
    if (facts.length === 0) {
      return;
    }
    
    let newIndex = factIndex;
    if (facts.length > 1) {
        while (newIndex === factIndex) {
            newIndex = Math.floor(Math.random() * facts.length);
        }
    } else {
        newIndex = 0;
    }
    setFactIndex(newIndex);
  }, [facts, factIndex]);

  useEffect(() => {
    // Set initial fact when facts become available
    if (facts.length > 0) {
        setFactIndex(Math.floor(Math.random() * facts.length));
    } else {
        setFactIndex(-1); // Reset if facts disappear
    }
  }, [facts]); // This will re-run when language changes

  const currentFact = factIndex !== -1 ? facts[factIndex] : null;

  return (
    <div className="p-6 bg-white dark:bg-slate-800 rounded-lg shadow-md border border-slate-200 dark:border-slate-700 text-center">
      <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-3">{t('fact.title')}</h3>
      <div className="min-h-[60px] flex items-center justify-center">
        {!currentFact ? (
          <div className="flex items-center justify-center space-x-1" aria-label="Loading fact">
            <span className="h-2 w-2 bg-slate-400 rounded-full animate-pulse [animation-delay:-0.3s]"></span>
            <span className="h-2 w-2 bg-slate-400 rounded-full animate-pulse [animation-delay:-0.15s]"></span>
            <span className="h-2 w-2 bg-slate-400 rounded-full animate-pulse"></span>
          </div>
        ) : (
          <p className="text-slate-600 dark:text-slate-300 italic">"{currentFact}"</p>
        )}
      </div>
      <button
        onClick={getNewFact}
        disabled={facts.length < 2}
        className="mt-4 px-4 py-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 text-sm font-semibold rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {t('fact.newFact')}
      </button>
    </div>
  );
};

export default FactOfTheDay;
