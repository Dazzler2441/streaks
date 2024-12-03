interface Preferences {
  theme: 'light' | 'dark' | 'system';
  notifications: boolean;
  reminderTime?: string;
  weekStartsOn: 0 | 1 | 6; // Sunday, Monday, or Saturday
  soundEnabled: boolean;
}

export const usePreferences = () => {
  const [preferences, setPreferences] = useState<Preferences>(defaultPreferences);
  
  // Implementation
}; 