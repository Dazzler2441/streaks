import { useState, useEffect } from 'react';
import { Streak, NewStreak } from '../types/streak';
import { 
  createStreak, 
  updateStreakStatus, 
  getTodayISO, 
  daysBetween 
} from '../lib/streaks';

const STORAGE_KEY = 'streaks';
const UPDATE_INTERVAL = 1000 * 60 * 60; // Check every hour
const MILESTONES = [7, 30, 50, 100, 365];

export const useStreaks = () => {
  const [streaks, setStreaks] = useState<Streak[]>([]);
  const [initialized, setInitialized] = useState(false);
  const [currentMilestone, setCurrentMilestone] = useState<number | null>(null);

  // Load and update streaks
  const updateAllStreaks = () => {
    setStreaks(prevStreaks => 
      prevStreaks.map(streak => updateStreakStatus(streak))
    );
  };

  // Initialize streaks from localStorage
  useEffect(() => {
    try {
      const savedStreaks = localStorage.getItem(STORAGE_KEY);
      if (savedStreaks) {
        // Load and immediately update all streaks
        const loadedStreaks = JSON.parse(savedStreaks);
        setStreaks(loadedStreaks.map((streak: Streak) => updateStreakStatus(streak)));
      }
    } catch (error) {
      console.error('Error reading from localStorage:', error);
    } finally {
      setInitialized(true);
    }
  }, []);

  // Set up periodic updates
  useEffect(() => {
    // Update streaks when tab becomes visible
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        updateAllStreaks();
      }
    };

    // Update streaks periodically
    const intervalId = setInterval(updateAllStreaks, UPDATE_INTERVAL);
    
    // Set up visibility change listener
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearInterval(intervalId);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // Save streaks to localStorage whenever they change
  useEffect(() => {
    if (initialized) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(streaks));
      } catch (error) {
        console.error('Error saving to localStorage:', error);
      }
    }
  }, [streaks, initialized]);

  const addStreak = (newStreak: NewStreak) => {
    const streak = createStreak(newStreak);
    setStreaks(prev => [...prev, streak]);
    return streak;
  };

  const deleteStreak = (id: string) => {
    setStreaks(prev => prev.filter(streak => streak.id !== id));
  };

  const failStreak = (id: string) => {
    setStreaks(prev =>
      prev.map(streak =>
        streak.id === id
          ? {
              ...streak,
              currentStreak: 1,
              lastChecked: getTodayISO(),
            }
          : streak
      )
    );
  };

  // Helper to check if streak hit a milestone
  const checkMilestone = (streakCount: number): number | null => {
    return MILESTONES.find(milestone => streakCount === milestone) || null;
  };

  // Update the updateStreakStatus logic
  const updateStreakStatus = (streak: Streak): Streak => {
    const today = getTodayISO();
    const days = daysBetween(streak.lastChecked, today);
    
    if (days === 0) return streak;

    if (days === 1) {
      const newCurrentStreak = streak.currentStreak + 1;
      // Check for milestone
      const milestone = checkMilestone(newCurrentStreak);
      if (milestone) {
        setCurrentMilestone(milestone);
      }
      
      return {
        ...streak,
        lastChecked: today,
        currentStreak: newCurrentStreak,
        longestStreak: Math.max(newCurrentStreak, streak.longestStreak),
      };
    }

    // If more than one day has passed, reset the streak
    return {
      ...streak,
      lastChecked: today,
      currentStreak: 1,
    };
  };

  const clearMilestone = () => {
    setCurrentMilestone(null);
  };

  // Add data export/import functionality
  const exportData = () => {
    const data = JSON.stringify(streaks);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `streaks-backup-${new Date().toISOString()}.json`;
    a.click();
  };

  const importData = async (file: File) => {
    const text = await file.text();
    const data = JSON.parse(text);
    setStreaks(data);
  };

  return {
    streaks,
    isLoading: !initialized,
    addStreak,
    deleteStreak,
    failStreak,
    currentMilestone,
    clearMilestone,
    exportData,
    importData,
  };
}; 