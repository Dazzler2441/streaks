import { Streak, NewStreak, StreakStatus } from '../types/streak';

// Generate a unique ID
const generateId = () => crypto.randomUUID();

// Get today's date as ISO string at midnight
export const getTodayISO = () => {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  return date.toISOString();
};

// Calculate days between two dates
export const daysBetween = (date1: string, date2: string) => {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  const diffTime = Math.abs(d2.getTime() - d1.getTime());
  return Math.floor(diffTime / (1000 * 60 * 60 * 24));
};

export const createStreak = (newStreak: NewStreak): Streak => {
  const now = getTodayISO();
  
  return {
    ...newStreak,
    emoji: newStreak.emoji || '✨',
    id: generateId(),
    startDate: now,
    lastChecked: now,
    currentStreak: 1,
    longestStreak: 1,
  };
};

export const updateStreakStatus = (streak: Streak): Streak => {
  const today = getTodayISO();
  const days = daysBetween(streak.lastChecked, today);
  
  // No update needed if already checked today
  if (days === 0) {
    return streak;
  }

  // If exactly one day has passed, increment the streak
  if (days === 1) {
    const newCurrentStreak = streak.currentStreak + 1;
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

export const getStreakStatus = (streak: Streak): StreakStatus => {
  const today = getTodayISO();
  const days = daysBetween(streak.lastChecked, today);
  
  if (days === 0) return 'active';
  if (days === 1) return 'at-risk';
  return 'broken';
};

// New helper to check if already checked in today
export const canCheckInToday = (streak: Streak): boolean => {
  const today = getTodayISO();
  return daysBetween(streak.lastChecked, today) > 0;
}; 