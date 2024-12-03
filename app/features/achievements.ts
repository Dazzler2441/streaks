interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  condition: (streak: Streak) => boolean;
  unlockedAt?: string;
}

const achievements: Achievement[] = [
  {
    id: 'first-week',
    name: 'First Week Complete',
    description: 'Maintain a streak for 7 days',
    icon: '🌟',
    condition: (streak) => streak.currentStreak >= 7
  },
  // More achievements...
]; 