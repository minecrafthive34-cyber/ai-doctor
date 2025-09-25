import React from 'react';
import { useTranslation } from '../hooks/useTranslation';

interface MicrophonePermissionPromptProps {
  onAllow: () => void;
  onDeny: () => void;
}

const MicrophonePermissionPrompt: React.FC<MicrophonePermissionPromptProps> = ({ onAllow, onDeny }) => {
  const { t } = useTranslation();

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 p-4 sm:p-6" role="dialog" aria-modal="true" aria-labelledby="mic-permission-title">
      <div className="max-w-md mx-auto bg-white dark:bg-slate-800 rounded-lg shadow-2xl border border-slate-200 dark:border-slate-700 animate-fade-in">
        <div className="p-6">
          <h2 id="mic-permission-title" className="text-lg font-semibold text-slate-800 dark:text-slate-100">{t('micPermission.title')}</h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{t('micPermission.body')}</p>
          <div className="mt-4 flex justify-end gap-3">
            <button
              onClick={onDeny}
              className="px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-700 rounded-md hover:bg-slate-200 dark:hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-400"
            >
              {t('micPermission.denyButton')}
            </button>
            <button
              onClick={onAllow}
              className="px-4 py-2 text-sm font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {t('micPermission.enableButton')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MicrophonePermissionPrompt;