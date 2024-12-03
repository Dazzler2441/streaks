import { Streak } from '../types/streak';

interface StreakAnalytics {
  totalDays: number;
  successRate: number;
  longestStreak: number;
  currentStreak: number;
  weeklyAverage: number;
  monthlyTrend: number[];
}

export const calculateAnalytics = (streak: Streak): StreakAnalytics => {
  const startDate = new Date(streak.startDate);
  const today = new Date();
  const totalDays = Math.floor((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  
  // Calculate weekly average (last 7 days)
  const weeklyAverage = streak.history
    .filter(entry => {
      const entryDate = new Date(entry.date);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return entryDate >= weekAgo && entry.status === 'completed';
    }).length / 7;

  // Calculate monthly trend (last 30 days)
  const monthlyTrend = Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    return streak.history.find(entry => 
      entry.date.startsWith(dateStr) && entry.status === 'completed'
    ) ? 1 : 0;
  }).reverse();

  return {
    totalDays,
    successRate: Math.round((streak.currentStreak / totalDays) * 100),
    longestStreak: streak.longestStreak,
    currentStreak: streak.currentStreak,
    weeklyAverage,
    monthlyTrend,
  };
};

// Optional: Add a component to display the analytics
export const StreakAnalytics: React.FC<{ streak: Streak }> = ({ streak }) => {
  const analytics = calculateAnalytics(streak);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Analytics</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="text-sm text-gray-400">Weekly Average</div>
          <div className="text-xl">{analytics.weeklyAverage.toFixed(1)} days</div>
        </div>
        <div>
          <div className="text-sm text-gray-400">Success Rate</div>
          <div className="text-xl">{analytics.successRate}%</div>
        </div>
      </div>
      {/* Add more analytics display as needed */}
    </div>
  );
}; 