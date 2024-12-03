export interface Streak {
  id: string;
  name: string;
  description?: string;
  emoji: string;
  startDate: string;
  lastChecked: string;
  currentStreak: number;
  longestStreak: number;
  category: StreakCategory;
  tags?: string[];
  history: StreakEntry[];
}

export type NewStreak = Omit<Streak, 'id' | 'startDate' | 'lastChecked' | 'currentStreak' | 'longestStreak'>;

export type StreakStatus = 'active' | 'at-risk' | 'broken';

export type StreakCategory = 'Health' | 'Productivity' | 'Learning' | 'Lifestyle' | 'Other';

interface StreakEntry {
  date: string;
  status: 'completed' | 'failed' | 'skipped';
  note?: string;
} 