import React from 'react';
import { useTranslation } from '../hooks/useTranslation';

interface DidYouMeanProps {
  originalTerm: string;
  suggestions: string[];
  onSelectSuggestion: (suggestion: string) => void;
}

const DidYouMean: React.FC<DidYouMeanProps> = ({ originalTerm, suggestions, onSelectSuggestion }) => {
  const { t } = useTranslation();

  return (
    <div className="text-center p-6 sm:p-8 bg-white dark:bg-slate-800 rounded-lg shadow-md border border-slate-200 dark:border-slate-700 animate-fade-in">
      <h2 className="text-xl font-semibold text-slate-700 dark:text-slate-200 mb-4">
        {t('suggestions.noResultsFor', { term: originalTerm })}
      </h2>
      <p className="text-lg text-slate-600 dark:text-slate-300 mb-4">
        {t('suggestions.title')}
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        {suggestions.map((suggestion) => (
          <button
            key={suggestion}
            onClick={() => onSelectSuggestion(suggestion)}
            className="px-4 py-2 bg-blue-100 text-blue-700 text-base font-semibold rounded-lg hover:bg-blue-200 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DidYouMean;
