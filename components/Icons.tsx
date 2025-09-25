import React from 'react';

interface IconProps {
  className?: string;
}

export const SymptomsIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M15 13.5a3 3 0 11-6 0 3 3 0 016 0z" />
    <path d="M12 4a1 1 0 00-1 1v7.5a4 4 0 102 0V5a1 1 0 00-1-1z" />
  </svg>
);

export const CausesIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M14.5 9a5.5 5.5 0 10-11 0 5.5 5.5 0 0011 0z" />
    <path d="M9 16a7 7 0 100-14 7 7 0 000 14zm6.6-1.5l5.1 5.1-1.5 1.5-5.1-5.1 1.5-1.5z" />
  </svg>
);

export const TreatmentsIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2L3 5v6c0 5.5 3.8 10.3 9 11.5 5.2-1.2 9-6 9-11.5V5l-9-3zm-1 14H8v-3H5v-2h3V9h2v3h3v2h-3v3z" />
  </svg>
);

export const MedicinesIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M13 5.3a6 6 0 00-7.4 9.4l-1.3 1.3a1 1 0 001.4 1.4l1.3-1.3A6 6 0 0013 5.3zm4.7-1.3a1 1 0 00-1.4 0l-8.4 8.4a1 1 0 000 1.4l1.4 1.4a1 1 0 011.4 0l8.4-8.4a1 1 0 000-1.4L17.7 4z" />
  </svg>
);

export const PreventionIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M18 3h-3v2h3v12a2 2 0 01-2 2H5a2 2 0 01-2-2V5h3V3H3a2 2 0 00-2 2v14a4 4 0 004 4h12a4 4 0 004-4V5a2 2 0 00-2-2zm-3.3 8.3a2 2 0 00-3.4-1.6A2 2 0 008 10.8V13h8v-2.2a2 2 0 00-1.3-1.9zM12 1a2 2 0 00-2 2v2h4V3a2 2 0 00-2-2z" />
  </svg>
);

export const MicrophoneIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 016 0v8.25a3 3 0 01-3 3z" />
  </svg>
);

export const MoonIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
  </svg>
);

export const SunIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);