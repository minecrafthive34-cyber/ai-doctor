import React, { useState, useEffect } from 'react';
import type { AnySearchResult, StructuredSearchResultData, GroundedSearchResultData } from '../types';
import { formatStructuredResultForSharing, formatGroundedResultForSharing, formatSectionForSharing } from '../utils/formatters';
import { useTranslation } from '../hooks/useTranslation';
import { SymptomsIcon, CausesIcon, TreatmentsIcon, MedicinesIcon, PreventionIcon } from './Icons';
import { fetchRelatedConditions } from '../services/geminiService';

interface SearchResultProps {
  data: StructuredSearchResultData | GroundedSearchResultData;
  favorites: AnySearchResult[];
  onAddToFavorites: (item: AnySearchResult) => void;
  onRemoveFromFavorites: (itemId:string) => void;
  onSearch: (query: string) => void;
}

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  symptoms: SymptomsIcon,
  causes: CausesIcon,
  treatments: TreatmentsIcon,
  medicines: MedicinesIcon,
  prevention: PreventionIcon,
};

const getResultId = (result: AnySearchResult): string => {
  if (result.type === 'suggestions') {
    return result.originalTerm;
  }
  return result.type === 'structured' ? result.medicalInfo.name : result.term;
};

interface InfoSectionProps {
  title: string;
  items: string[];
  iconKey: keyof typeof iconMap;
  colorClass: string;
  resultName: string;
}

const InfoSection: React.FC<InfoSectionProps> = ({ title, items, iconKey, colorClass, resultName }) => {
  const { t } = useTranslation();
  const IconComponent = iconMap[iconKey];
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    const body = formatSectionForSharing(resultName, title, items, t('disclaimer.body'));
    navigator.clipboard.writeText(body).then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
    }).catch(err => {
        console.error('Failed to copy text: ', err);
        alert('Failed to copy text to clipboard.');
    });
  };
  
  return (
    <div className="bg-white dark:bg-slate-800 p-4 sm:p-6 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
      <div className="flex justify-between items-center mb-3">
          <h3 className={`text-xl font-semibold flex items-center ${colorClass}`}>
            <div className="relative group me-3">
              <IconComponent className="h-8 w-8" aria-hidden="true" />
              <div className="absolute bottom-full mb-2 w-max max-w-xs left-1/2 -translate-x-1/2 invisible group-hover:visible px-3 py-1.5 bg-zinc-800 text-white text-sm font-semibold rounded-lg shadow-lg z-10 transition-opacity duration-200 opacity-0 group-hover:opacity-100">
                {title}
                <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-zinc-800"></div>
              </div>
            </div>
            {title}
          </h3>
          <div className="no-print flex-shrink-0 flex items-center gap-2">
            <button
              onClick={handleCopy}
              disabled={isCopied}
              className={`no-print flex-shrink-0 flex items-center px-3 py-1 text-xs font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-opacity-50 transition-colors ${isCopied ? 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'}`}
              aria-label={`${t('results.copySection')} ${title}`}
            >
              {isCopied ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 me-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  {t('results.copied')}
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 me-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  {t('results.copySection')}
                </>
              )}
            </button>
          </div>
      </div>
      {items && items.length > 0 ? (
        <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-300">
          {items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      ) : (
        <p className="text-slate-500 dark:text-slate-400">No information available.</p>
      )}
    </div>
  );
};

const StructuredResult: React.FC<{ data: StructuredSearchResultData }> = ({ data }) => {
    const { medicalInfo } = data;
    const { t } = useTranslation();
    const resultName = medicalInfo.name;
    const translatedSections = {
        symptoms: t('results.sections.symptoms'),
        causes: t('results.sections.causes'),
        treatments: t('results.sections.treatments'),
        medicines: t('results.sections.medicines'),
        prevention: t('results.sections.prevention'),
    };

    return (
        <div className="grid md:grid-cols-2 gap-6">
            <InfoSection 
              title={translatedSections.symptoms}
              items={medicalInfo.symptoms} 
              colorClass="text-red-600"
              iconKey="symptoms"
              resultName={resultName}
            />
            <InfoSection 
              title={translatedSections.causes}
              items={medicalInfo.causes} 
              colorClass="text-orange-600"
              iconKey="causes"
              resultName={resultName}
            />
            <InfoSection 
              title={translatedSections.treatments}
              items={medicalInfo.commonTreatments} 
              colorClass="text-green-700"
              iconKey="treatments"
              resultName={resultName}
            />
            <InfoSection 
              title={translatedSections.medicines}
              items={medicalInfo.medicines} 
              colorClass="text-purple-600"
              iconKey="medicines"
              resultName={resultName}
            />
            <InfoSection 
              title={translatedSections.prevention}
              items={medicalInfo.prevention} 
              colorClass="text-blue-600"
              iconKey="prevention"
              resultName={resultName}
            />
        </div>
    );
}

const GroundedResult: React.FC<{ data: AnySearchResult & { type: 'grounded' } }> = ({ data }) => {
  const { summary, sources } = data;
  const { t } = useTranslation();
  return (
    <div className="bg-white dark:bg-slate-800 p-4 sm:p-6 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 whitespace-pre-wrap">{summary}</p>

        {sources.length > 0 && (
            <div className="mt-8 border-t border-slate-200 dark:border-slate-700 pt-6">
                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-4">{t('results.sources')}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {sources.map((source, index) => (
                        <a 
                            key={index}
                            href={source.uri} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="block p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg border border-slate-200 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700 hover:border-slate-300 dark:hover:border-slate-500 transition-all transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500"
                            title={`Go to source: ${source.title || source.uri}`}
                        >
                            <div className="flex items-start gap-3">
                                <div className="flex-shrink-0 mt-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="font-semibold text-blue-600 dark:text-blue-400 break-words">
                                        {source.title || 'Untitled Source'}
                                    </p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-1">
                                        {source.uri}
                                    </p>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        )}
    </div>
  );
}


const SearchResult: React.FC<SearchResultProps> = ({ data, favorites, onAddToFavorites, onRemoveFromFavorites, onSearch }) => {
  const { t, language } = useTranslation();
  const [relatedConditions, setRelatedConditions] = useState<string[]>([]);
  const [isLoadingRelated, setIsLoadingRelated] = useState<boolean>(false);
  const [isAllCopied, setIsAllCopied] = useState(false);

  useEffect(() => {
    if (data.type === 'structured') {
        const loadRelated = async () => {
            setIsLoadingRelated(true);
            setRelatedConditions([]); // Clear previous results
            const conditionName = data.medicalInfo.name;
            const related = await fetchRelatedConditions(conditionName, language);
            setRelatedConditions(related);
            setIsLoadingRelated(false);
        };
        loadRelated();
    } else {
        // Clear related conditions if the result is not structured
        setRelatedConditions([]);
    }
  }, [data, language]);
  
  const resultId = getResultId(data);
  const resultName = data.type === 'structured' ? data.medicalInfo.name : data.term;
  const resultDescription = data.type === 'structured' ? data.medicalInfo.description : `An up-to-date summary on ${data.term}.`;
  
  const isFavorite = favorites.some(fav => getResultId(fav) === resultId);

  const getFullContent = () => {
    let body = '';
    if (data.type === 'structured') {
      const translatedSections = {
        symptoms: t('results.sections.symptoms'),
        causes: t('results.sections.causes'),
        treatments: t('results.sections.treatments'),
        medicines: t('results.sections.medicines'),
        prevention: t('results.sections.prevention'),
      };
      body = formatStructuredResultForSharing(data, translatedSections, t('disclaimer.body'));
    } else {
      body = formatGroundedResultForSharing(data, t('disclaimer.body'));
    }
    return body;
  };

  const handleCopyAll = () => {
    const contentToCopy = getFullContent();
    navigator.clipboard.writeText(contentToCopy).then(() => {
        setIsAllCopied(true);
        setTimeout(() => setIsAllCopied(false), 2000); // Reset after 2 seconds
    }).catch(err => {
        console.error('Failed to copy content: ', err);
        alert('Failed to copy content to clipboard.');
    });
  };

  const handleShare = () => {
    const subject = `AI Doctor: Information for ${resultName}`;
    const body = getFullContent();
    const mailtoLink = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
  };

  const handleFavoriteToggle = () => {
    if (isFavorite) {
      onRemoveFromFavorites(resultId);
    } else {
      onAddToFavorites(data);
    }
  };

  return (
    <div className="animate-fade-in">
      <div 
        className="bg-white dark:bg-slate-800 p-4 sm:p-6 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 printable-content"
        role="region"
        aria-labelledby="search-result-title"
      >
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
          <div className="flex-grow">
             <div className="flex items-center gap-3 mb-2">
                <h2 id="search-result-title" className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-100">{resultName}</h2>
                <button 
                  onClick={handleFavoriteToggle}
                  aria-label={isFavorite ? t('results.removeFromFavorites', { name: resultName }) : t('results.addToFavorites', { name: resultName })}
                  className="no-print text-slate-400 dark:text-slate-500 hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 20 20" fill={isFavorite ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.5">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </button>
             </div>
             {data.type === 'structured' && <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300">{resultDescription}</p>}
          </div>
          <div className="no-print flex-shrink-0 flex items-center gap-2 self-start sm:self-center">
             <button
              onClick={handleCopyAll}
              disabled={isAllCopied}
              className={`flex items-center px-4 py-2 font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-opacity-50 transition-colors text-sm whitespace-nowrap ${isAllCopied ? 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300' : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-600'}`}
              aria-label={t('results.copyAll')}
            >
              {isAllCopied ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 me-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  {t('results.copied')}
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 me-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                  {t('results.copyAll')}
                </>
              )}
            </button>
            <button 
                onClick={handleShare}
                className="flex items-center px-4 py-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-opacity-50 transition-colors text-sm whitespace-nowrap"
                aria-label={`${t('results.shareEmail')} for ${resultName}`}
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 me-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {t('results.shareEmail')}
          </button>
          </div>
        </div>
        {data.type === 'grounded' && <div className="mt-4"><GroundedResult data={data} /></div>}
        {data.type === 'structured' && (
            <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
                <StructuredResult data={data} />
            </div>
        )}
        {(isLoadingRelated || (relatedConditions && relatedConditions.length > 0)) && data.type === 'structured' && (
            <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700 no-print">
                <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-200 mb-4">{t('results.relatedConditions')}</h3>
                {isLoadingRelated ? (
                    <div className="flex justify-center items-center h-10">
                        <div className="flex items-center space-x-1">
                            <span className="h-2 w-2 bg-slate-400 dark:bg-slate-500 rounded-full animate-pulse [animation-delay:-0.3s]"></span>
                            <span className="h-2 w-2 bg-slate-400 dark:bg-slate-500 rounded-full animate-pulse [animation-delay:-0.15s]"></span>
                            <span className="h-2 w-2 bg-slate-400 dark:bg-slate-500 rounded-full animate-pulse"></span>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-wrap justify-start gap-3">
                        {relatedConditions.map((condition) => (
                            <button
                                key={condition}
                                onClick={() => onSearch(condition)}
                                className="px-4 py-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 text-base font-semibold rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-opacity-50"
                            >
                                {condition}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        )}
      </div>
    </div>
  );
};

export default SearchResult;
