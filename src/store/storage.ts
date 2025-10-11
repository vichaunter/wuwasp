import type { UserData } from '@/types';

const STORAGE_KEY = 'wuwa-planner-data';

export const storage = {
  getUserData(): UserData | null {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return null;
    }
  },

  setUserData(data: UserData): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Error writing to localStorage:', error);
    }
  },

  clearUserData(): void {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  },
};

