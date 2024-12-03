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
  history: StreakEntry[];
}

export type StreakCategory = 'Health' | 'Productivity' | 'Learning' | 'Lifestyle' | 'Other';

export interface StreakEntry {
  date: string;
  status: 'completed' | 'failed' | 'skipped';
  note?: string;
}

export type NewStreak = Pick<Streak, 'name' | 'description' | 'emoji' | 'category'>;

export type StreakStatus = 'active' | 'at-risk' | 'broken'; 