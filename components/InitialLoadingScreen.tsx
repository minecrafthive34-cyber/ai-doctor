import React from 'react';

const InitialLoadingScreen: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col items-center justify-center" aria-label="Loading AI Doctor">
      <div className="relative w-64 h-32">
        <svg className="absolute w-full h-full" viewBox="0 0 256 128" aria-hidden="true">
          {/* EKG line path */}
          <path
            d="M0 64 H60 L70 44 L85 84 L95 64 H120 L125 59 L130 69 L135 64 H256"
            stroke="#3b82f6" // This corresponds to Tailwind's blue-500
            strokeWidth="3"
            fill="none"
            className="ekg-line"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center animate-pulse-slow">
          {/* Pulsing cross */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
            <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
      <h1 className="text-3xl font-bold text-slate-700 dark:text-slate-200 mt-6 animate-fade-in opacity-0" style={{ animationDelay: '1s' }}>
        AI Doctor
      </h1>
    </div>
  );
};

export default InitialLoadingScreen;
