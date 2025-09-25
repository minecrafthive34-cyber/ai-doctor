import React from 'react';
import { useTranslation } from '../hooks/useTranslation';

const Disclaimer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="w-full mt-10 p-4 bg-slate-100 dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 no-print">
      <div className="container mx-auto max-w-3xl text-center">
        <h4 className="font-bold text-sm text-slate-700 dark:text-slate-200 mb-2">{t('disclaimer.title')}</h4>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
          {t('disclaimer.body')}
        </p>
        <p className="text-xs text-slate-500 dark:text-slate-400">
            {t('footer.createdBy')}
        </p>
      </div>
    </footer>
  );
};

export default Disclaimer;
