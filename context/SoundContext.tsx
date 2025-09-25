import React, { createContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { playSound, setSoundEnabled, userInteractionForAudio } from '../utils/sound';

type SoundName = 'click' | 'success' | 'error' | 'toggle_on' | 'toggle_off' | 'favorite';

interface SoundContextType {
  isSoundEnabled: boolean;
  toggleSound: () => void;
  playSoundEffect: (name: SoundName) => void;
}

export const SoundContext = createContext<SoundContextType | undefined>(undefined);

export const SoundProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isSoundEnabled, setIsSoundEnabled] = useState<boolean>(() => {
    const savedState = localStorage.getItem('ai-doctor-sound-enabled');
    return savedState !== null ? JSON.parse(savedState) : true;
  });

  useEffect(() => {
    setSoundEnabled(isSoundEnabled);
    localStorage.setItem('ai-doctor-sound-enabled', JSON.stringify(isSoundEnabled));
  }, [isSoundEnabled]);

  const toggleSound = useCallback(() => {
    userInteractionForAudio(); // Ensure context is running
    setIsSoundEnabled(prev => {
        const newState = !prev;
        if (newState) {
            playSound('toggle_on');
        }
        return newState;
    });
  }, []);

  const playSoundEffect = useCallback((name: SoundName) => {
    userInteractionForAudio(); // Ensure context is running before playing
    playSound(name);
  }, []);

  useEffect(() => {
    // Add a global listener to initialize the AudioContext on the first user interaction.
    const initAudio = () => userInteractionForAudio();
    window.addEventListener('click', initAudio, { once: true });
    window.addEventListener('keydown', initAudio, { once: true });
    
    return () => {
        window.removeEventListener('click', initAudio);
        window.removeEventListener('keydown', initAudio);
    };
  }, []);

  const value = { isSoundEnabled, toggleSound, playSoundEffect };

  return <SoundContext.Provider value={value}>{children}</SoundContext.Provider>;
};
