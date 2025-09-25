import type { AnySearchResult, HistoryEntry } from '../types';

const FAVORITES_KEY = 'ai-doctor-favorites';
const HISTORY_KEY = 'ai-doctor-history';

export const saveFavoritesToStorage = (favorites: AnySearchResult[]): void => {
  try {
    const favoritesJson = JSON.stringify(favorites);
    localStorage.setItem(FAVORITES_KEY, favoritesJson);
  } catch (error) {
    console.error("Could not save favorites to localStorage", error);
  }
};

export const loadFavoritesFromStorage = (): AnySearchResult[] => {
  try {
    const favoritesJson = localStorage.getItem(FAVORITES_KEY);
    if (favoritesJson) {
      return JSON.parse(favoritesJson);
    }
  } catch (error) {
    console.error("Could not load favorites from localStorage", error);
  }
  return [];
};

export const saveHistoryToStorage = (history: HistoryEntry[]): void => {
  try {
    const historyJson = JSON.stringify(history);
    localStorage.setItem(HISTORY_KEY, historyJson);
  } catch (error) {
    console.error("Could not save history to localStorage", error);
  }
};

export const loadHistoryFromStorage = (): HistoryEntry[] => {
  try {
    const historyJson = localStorage.getItem(HISTORY_KEY);
    if (historyJson) {
      return JSON.parse(historyJson);
    }
  } catch (error) {
    console.error("Could not load history from localStorage", error);
  }
  return [];
};