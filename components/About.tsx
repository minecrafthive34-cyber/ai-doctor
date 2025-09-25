import React, { useEffect, useRef } from 'react';
import { useTranslation } from '../hooks/useTranslation';

interface AboutProps {
  onClose: () => void;
  isOpen: boolean;
  triggerRef: React.RefObject<HTMLButtonElement>;
}

const About: React.FC<AboutProps> = ({ onClose, isOpen, triggerRef }) => {
  const { t } = useTranslation();
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      const modalNode = modalRef.current;
      if (!modalNode) return;

      const focusableElements = modalNode.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      firstElement?.focus();

      const handleKeyDown = (e: KeyboardEvent) => {
        // Handle Escape key to close the modal
        if (e.key === 'Escape') {
          onClose();
          return;
        }
        
        // Handle Tab key for focus trapping
        if (e.key === 'Tab') {
          if (e.shiftKey) { // Shift+Tab
            if (document.activeElement === firstElement) {
              lastElement?.focus();
              e.preventDefault();
            }
          } else { // Tab
            if (document.activeElement === lastElement) {
              firstElement?.focus();
              e.preventDefault();
            }
          }
        }
      };

      document.addEventListener('keydown', handleKeyDown);

      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        triggerRef.current?.focus();
      };
    }
  }, [isOpen, onClose, triggerRef]);
  
  if (!isOpen) {
    return null;
  }

  return (
    <div 
        className="no-print fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-75 z-40 flex justify-center items-center animate-fade-in" 
        onClick={onClose}
        aria-modal="true"
        role="dialog"
        aria-labelledby="about-title"
    >
      <div 
        ref={modalRef}
        className="bg-white dark:bg-slate-800 rounded-lg shadow-xl w-full max-w-2xl m-4 max-h-[90vh] flex flex-col" 
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-4 border-b border-slate-200 dark:border-slate-700">
          <h2 id="about-title" className="text-2xl font-bold text-slate-800 dark:text-slate-100">{t('about.title')}</h2>
          <button 
            onClick={onClose} 
            className="text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-100 transition-colors"
            aria-label={t('about.close')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-6 overflow-y-auto space-y-4 text-slate-600 dark:text-slate-300">
          <p>{t('about.body.paragraph1')}</p>
          <p>{t('about.body.paragraph2')}</p>
          <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700 text-center">
            <p className="text-sm text-slate-500 dark:text-slate-400">
                {t('footer.createdBy')}
            </p>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">Version 1.1.0</p>
          </div>
        </div>
        <div className="p-4 border-t border-slate-200 dark:border-slate-700 text-end">
            <button
                onClick={onClose}
                className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition-colors text-sm"
            >
                {t('about.closeButton')}
            </button>
        </div>
      </div>
    </div>
  );
};

export default About;
