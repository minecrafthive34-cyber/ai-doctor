import React, { useState } from 'react';
import { useTranslation } from '../hooks/useTranslation';
import FactOfTheDay from './FactOfTheDay';

interface InitialStateProps {
  onSearch: (query: string, isSymptomCheck?: boolean) => void;
}

const InitialState: React.FC<InitialStateProps> = ({ onSearch }) => {
  const { t } = useTranslation();
  const [symptoms, setSymptoms] = useState('');

  const handleSymptomClick = (symptom: string) => {
    setSymptoms(prev => prev ? `${prev}, ${symptom}`.trim() : symptom);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (symptoms.trim()) {
      onSearch(symptoms.trim(), true);
    }
  };
  
  const commonSymptoms = [
    { key: 'headache', label: t('initial.symptoms.headache') },
    { key: 'fever', label: t('initial.symptoms.fever') },
    { key: 'cough', label: t('initial.symptoms.cough') },
    { key: 'fatigue', label: t('initial.symptoms.fatigue') },
    { key: 'soreThroat', label: t('initial.symptoms.soreThroat') },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <FactOfTheDay />
      <div className="text-center p-6 sm:p-8 bg-white dark:bg-slate-800 rounded-lg shadow-md border border-slate-200 dark:border-slate-700">
        <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-16 w-16 text-blue-500 mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 2a10 10 0 1 0 10 10" />
          <path d="M12 2a10 10 0 0 1 10 10" />
          <path d="M12 2v20" />
          <path d="M12 12H2" />
          <path d="M12 12H22" />
          <path d="M17 7a5 5 0 1 0-10 0" />
          <path d="M7 7a5 5 0 1 1 10 0" />
        </svg>
        <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-100 mb-2">{t('initial.title')}</h2>
        <p className="text-slate-600 dark:text-slate-300 max-w-md mx-auto mb-6">
          {t('initial.subtitle')}
        </p>

        <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto">
          <textarea
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            placeholder={t('initial.placeholder')}
            className="w-full p-3 h-32 text-base bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors placeholder:text-slate-400 dark:placeholder:text-slate-500"
            aria-label={t('initial.subtitle')}
          />

          <div className="my-4">
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">{t('initial.commonSymptomsTitle')}</p>
            <div className="flex flex-wrap justify-center gap-2">
              {commonSymptoms.map(symptom => (
                <button
                  key={symptom.key}
                  type="button"
                  onClick={() => handleSymptomClick(symptom.label)}
                  className="px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 text-sm font-medium rounded-full hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-300"
                >
                  {symptom.label}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={!symptoms.trim()}
            className="w-full sm:w-auto px-10 py-3 bg-blue-500 text-white font-semibold rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-transform transform active:scale-95 disabled:bg-slate-400 disabled:cursor-not-allowed disabled:transform-none"
          >
            {t('initial.analyzeButton')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default InitialState;
