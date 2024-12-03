import { useState, useEffect } from 'react';

interface Preferences {
  theme: 'light' | 'dark' | 'system';
  notifications: boolean;
  reminderTime?: string;
  weekStartsOn: 0 | 1 | 6;
  soundEnabled: boolean;
}

const defaultPreferences: Preferences = {
  theme: 'system',
  notifications: false,
  weekStartsOn: 1,
  soundEnabled: true,
};

export const usePreferences = () => {
  const [preferences, setPreferences] = useState<Preferences>(defaultPreferences);

  useEffect(() => {
    const savedPrefs = localStorage.getItem('preferences');
    if (savedPrefs) {
      setPreferences(JSON.parse(savedPrefs));
    }
  }, []);

  const updatePreferences = (newPrefs: Partial<Preferences>) => {
    setPreferences(prev => {
      const updated = { ...prev, ...newPrefs };
      localStorage.setItem('preferences', JSON.stringify(updated));
      return updated;
    });
  };

  return { preferences, updatePreferences };
}; 