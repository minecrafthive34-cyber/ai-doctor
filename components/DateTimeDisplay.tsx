import React, { useState, useEffect } from 'react';
import { useTranslation } from '../hooks/useTranslation';

const DateTimeDisplay: React.FC = () => {
  const { language } = useTranslation();
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000); // Update every second

    return () => clearInterval(timer);
  }, []);

  const formattedDate = currentDateTime.toLocaleDateString(language, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const formattedTime = currentDateTime.toLocaleTimeString(language, {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  return (
    <div className="text-center mb-6 no-print">
      <p className="text-lg font-semibold text-slate-700 dark:text-slate-200">{formattedDate}</p>
      <p className="text-sm text-slate-500 dark:text-slate-400">{formattedTime}</p>
    </div>
  );
};

export default DateTimeDisplay;
