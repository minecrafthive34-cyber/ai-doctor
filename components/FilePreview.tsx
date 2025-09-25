import React from 'react';
import { useTranslation } from '../hooks/useTranslation';

interface FilePreviewProps {
  file: {
    name: string;
    type: string;
    data: string;
  };
  onRemove: () => void;
}

const FilePreview: React.FC<FilePreviewProps> = ({ file, onRemove }) => {
  const { t } = useTranslation();
  const imageUrl = `data:${file.type};base64,${file.data}`;

  return (
    <div className="mt-4 p-3 bg-white border border-slate-200 rounded-lg flex items-center justify-between animate-fade-in">
      <div className="flex items-center gap-3 overflow-hidden">
        <img src={imageUrl} alt={file.name} className="w-12 h-12 rounded-md object-cover flex-shrink-0" />
        <span className="text-sm text-slate-700 truncate" title={file.name}>
          {file.name}
        </span>
      </div>
      <button
        type="button"
        onClick={onRemove}
        className="flex-shrink-0 ml-4 p-2 rounded-full text-slate-500 hover:bg-slate-100 transition-colors"
        aria-label={t('search.removeImage')}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
};

export default FilePreview;