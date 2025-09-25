import React, { useEffect, useRef } from 'react';
import type { AnySearchResult } from '../types';
import { useTranslation } from '../hooks/useTranslation';

interface FavoritesListProps {
  favorites: AnySearchResult[];
  onClose: () => void;
  onSelect: (favorite: AnySearchResult) => void;
  onRemove: (favoriteId: string) => void;
  isOpen: boolean;
  triggerRef: React.RefObject<HTMLButtonElement>;
}

const getResultId = (result: AnySearchResult): string => {
  // FIX: Handle the 'suggestions' type, which uses 'originalTerm' instead of 'term'.
  if (result.type === 'suggestions') return result.originalTerm;
  return result.type === 'structured' ? result.medicalInfo.name : result.term;
};

const getResultName = (result: AnySearchResult): string => {
  // FIX: Handle the 'suggestions' type, which uses 'originalTerm' instead of 'term'.
  if (result.type === 'suggestions') return result.originalTerm;
  return result.type === 'structured' ? result.medicalInfo.name : result.term;
}


const FavoritesList: React.FC<FavoritesListProps> = ({ favorites, onClose, onSelect, onRemove, isOpen, triggerRef }) => {
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

  const handleSelect = (favorite: AnySearchResult) => {
    onSelect(favorite);
    // onClose is handled by the effect, no need to call it twice
  };

  return (
    <div 
        className="no-print fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-75 z-40 flex justify-center items-center animate-fade-in" 
        onClick={onClose}
        aria-modal="true"
        role="dialog"
        aria-labelledby="favorites-title"
    >
      <div 
        ref={modalRef}
        className="bg-white dark:bg-slate-800 rounded-lg shadow-xl w-full max-w-lg m-4 max-h-[80vh] flex flex-col" 
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-4 border-b border-slate-200 dark:border-slate-700">
          <h2 id="favorites-title" className="text-2xl font-bold text-slate-800 dark:text-slate-100">{t('favorites.title')}</h2>
          <button 
            onClick={onClose} 
            className="text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-100 transition-colors"
            aria-label={t('favorites.close')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-4 overflow-y-auto">
          {favorites.length > 0 ? (
            <ul className="space-y-3">
              {favorites.map((fav) => {
                const favId = getResultId(fav);
                const favName = getResultName(fav);
                return (
                    <li key={favId} className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-700/50 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                      <div>
                        <span className="font-semibold text-slate-700 dark:text-slate-200">{favName}</span>
                        {fav.type === 'grounded' && (
                            <span className="ms-2 text-xs font-medium bg-blue-100 text-blue-800 px-2 py-0.5 rounded">{t('search.advancedAI')}</span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => handleSelect(fav)}
                          className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-semibold rounded-md hover:bg-blue-200 transition-colors"
                        >
                          {t('favorites.view')}
                        </button>
                        <button 
                          onClick={() => onRemove(favId)}
                          className="px-3 py-1 bg-red-100 text-red-700 text-sm font-semibold rounded-md hover:bg-red-200 dark:bg-red-900/50 dark:text-red-300 dark:hover:bg-red-800/50 transition-colors"
                          aria-label={`${t('favorites.remove')} ${favName}`}
                        >
                          {t('favorites.remove')}
                        </button>
                      </div>
                    </li>
                )
              })}
            </ul>
          ) : (
            <div className="text-center py-8">
              <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.196-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
              <p className="mt-4 text-slate-500 dark:text-slate-400">{t('favorites.empty')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FavoritesList;
