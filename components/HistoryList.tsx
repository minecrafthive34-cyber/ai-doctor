import React, { useEffect, useRef } from 'react';
import { useTranslation } from '../hooks/useTranslation';
import type { HistoryEntry } from '../types';

interface HistoryListProps {
  history: HistoryEntry[];
  onClose: () => void;
  onSelect: (searchTerm: string) => void;
  onClear: () => void;
  isOpen: boolean;
  triggerRef: React.RefObject<HTMLButtonElement>;
}

const HistoryList: React.FC<HistoryListProps> = ({ history, onClose, onSelect, onClear, isOpen, triggerRef }) => {
  const { t, language } = useTranslation();
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
        if (e.key !== 'Tab') return;

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
      };

      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      }

      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('keydown', handleEscape);

      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        document.removeEventListener('keydown', handleEscape);
        triggerRef.current?.focus();
      };
    }
  }, [isOpen, onClose, triggerRef]);
  
  if (!isOpen) {
    return null;
  }

  const handleSelect = (searchTerm: string) => {
    onSelect(searchTerm);
    // onClose is handled by the effect, no need to call it twice
  };

  return (
    <div 
        className="fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-75 z-40 flex justify-center items-center animate-fade-in" 
        onClick={onClose}
        aria-modal="true"
        role="dialog"
        aria-labelledby="history-title"
    >
      <div 
        ref={modalRef}
        className="bg-white dark:bg-slate-800 rounded-lg shadow-xl w-full max-w-lg m-4 max-h-[80vh] flex flex-col" 
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-4 border-b border-slate-200 dark:border-slate-700">
          <h2 id="history-title" className="text-2xl font-bold text-slate-800 dark:text-slate-100">{t('history.title')}</h2>
          <button 
            onClick={onClose} 
            className="text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-100 transition-colors"
            aria-label={t('history.close')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-4 overflow-y-auto">
          {history.length > 0 ? (
            <ul className="space-y-3">
              {history.map((item) => (
                <li key={`${item.term}-${item.timestamp}`} className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-700/50 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                  <div>
                    <span className="font-semibold text-slate-700 dark:text-slate-200 truncate block">{item.term}</span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                        {new Date(item.timestamp).toLocaleString(language, {
                            dateStyle: 'medium',
                            timeStyle: 'short',
                        })}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => handleSelect(item.term)}
                      className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-semibold rounded-md hover:bg-blue-200 transition-colors"
                    >
                      {t('history.search')}
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center py-8">
               <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-slate-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
               </svg>
              <p className="mt-4 text-slate-500 dark:text-slate-400">{t('history.empty')}</p>
            </div>
          )}
        </div>
        {history.length > 0 && (
            <div className="p-4 border-t border-slate-200 dark:border-slate-700 text-end">
                <button
                    onClick={onClear}
                    className="px-4 py-2 bg-red-100 text-red-700 font-semibold rounded-lg hover:bg-red-200 dark:bg-red-900/50 dark:text-red-300 dark:hover:bg-red-800/50 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50 transition-colors text-sm"
                >
                    {t('history.clear')}
                </button>
            </div>
        )}
      </div>
    </div>
  );
};

export default HistoryList;
