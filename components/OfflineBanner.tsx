import React from 'react';
import { useTranslation } from '../hooks/useTranslation';

const OfflineBanner: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div
      className="w-full bg-yellow-400 text-center p-2 text-sm font-semibold text-black sticky top-0 z-20 flex items-center justify-center gap-2"
      role="status"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18l-9-9" />
      </svg>
      <span>{t('offline.banner')}</span>
    </div>
  );
};

export default OfflineBanner;