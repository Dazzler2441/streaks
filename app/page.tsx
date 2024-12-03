'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStreaks } from '@/hooks/useStreaks';
import { Streak } from '@/types/streak';
import { getStreakStatus } from '@/lib/streaks';
import { MilestoneCelebration } from '@/components/MilestoneCelebration';
import { AddStreakModal } from '@/components/AddStreakModal';
import { SoundToggle } from '@/components/SoundToggle';

// Emoji mapping for different streak statuses
const statusEmojis: Record<string, string> = {
  active: '🔥',
  'at-risk': '⚠️',
  broken: '💔',
};

// Calculate streak statistics
const calculateStats = (streak: Streak) => {
  const startDate = new Date(streak.startDate);
  const today = new Date();
  const totalDays = Math.floor((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  const successRate = Math.round((streak.currentStreak / totalDays) * 100);

  return {
    totalDays,
    successRate,
    startedOn: formatDate(streak.startDate),
    lastChecked: formatDate(streak.lastChecked)
  };
};

// Helper function to format date
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export default function Page(): JSX.Element {
  const { 
    streaks, 
    isLoading, 
    addStreak, 
    deleteStreak, 
    failStreak,
    currentMilestone,
    clearMilestone 
  } = useStreaks();
  const [mounted, setMounted] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleFailStreak = (id: string) => {
    playSound('fail');
    failStreak(id);
  };

  const handleDeleteStreak = (id: string) => {
    playSound('delete');
    deleteStreak(id);
  };

  const renderContent = () => {
    if (!mounted || isLoading) {
      return (
        <div className="flex items-center justify-center min-h-[200px]">
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            className="animate-pulse"
          >
            Loading... ⌛
          </motion.div>
        </div>
      );
    }

    return (
      <>
        {/* Add new streak button */}
        <motion.div 
          className="mb-8 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
              transition-colors font-medium shadow-lg hover:shadow-xl
              active:transform active:scale-95 flex items-center justify-center gap-2"
          >
            <span>✨</span> Add New Streak
          </button>
        </motion.div>

        {/* Empty state */}
        {streaks.length === 0 && (
          <motion.div 
            className="text-center text-gray-400 py-12"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-4xl mb-4">🌟</div>
            <p className="text-lg mb-2">No streaks yet!</p>
            <p className="text-sm">Start by adding your first streak above.</p>
          </motion.div>
        )}

        {/* Streaks grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, staggerChildren: 0.1 }}
        >
          <AnimatePresence>
            {streaks.map((streak, index: number) => {
              const status = getStreakStatus(streak);
              const stats = calculateStats(streak);
              
              return (
                // ... streak card JSX ...
              );
            })}
          </AnimatePresence>
        </motion.div>
      </>
    );
  };

  return (
    <motion.main 
      className="container mx-auto p-4 min-h-screen bg-gray-900 text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1 
        className="text-3xl font-bold mb-8 text-center flex items-center justify-center gap-2"
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, type: "spring" }}
      >
        <span className="text-4xl">📊</span> Streak Tracker
      </motion.h1>
      {renderContent()}

      {currentMilestone && (
        <MilestoneCelebration
          milestone={currentMilestone}
          onClose={clearMilestone}
        />
      )}

      <AddStreakModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={addStreak}
      />
      <SoundToggle />
    </motion.main>
  );
}
