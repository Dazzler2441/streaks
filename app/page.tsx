'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStreaks } from './hooks/useStreaks';
import { NewStreak } from './types/streak';
import { getStreakStatus } from './lib/streaks';
import { MilestoneCelebration } from './components/MilestoneCelebration';
import { EmojiPicker } from './components/EmojiPicker';
import { AddStreakModal } from './components/AddStreakModal';
import { playSound } from './utils/sounds';
import { SoundToggle } from './components/SoundToggle';

// Emoji mapping for different streak statuses
const statusEmojis: Record<string, string> = {
  active: '🔥',
  'at-risk': '⚠️',
  broken: '💔',
};

// Streak category emojis (you can add these to your streak type if you want)
const defaultEmoji = '✨';

// Helper function to format date
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
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

export default function Home() {
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
        {/* Replace the form with a button */}
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
              
              return (
                <motion.div
                  key={streak.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2, delay: index * 0.1 }}
                  className="p-6 border rounded-xl shadow-lg hover:shadow-xl transition-all 
                    bg-gray-800 border-gray-700 transform hover:-translate-y-1"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="font-semibold text-white text-lg flex items-center gap-2">
                      {streak.emoji} {streak.name}
                    </h2>
                    <span
                      className={`px-3 py-1.5 text-sm rounded-full flex items-center gap-1.5 font-medium
                        ${status === 'active' ? 'bg-green-900/50 text-green-200 border border-green-700' :
                        status === 'at-risk' ? 'bg-yellow-900/50 text-yellow-200 border border-yellow-700' :
                        'bg-red-900/50 text-red-200 border border-red-700'}`}
                    >
                      {statusEmojis[status]} {status}
                    </span>
                  </div>
                  
                  <div className="flex gap-6 text-sm text-gray-400 mb-6">
                    <div className="flex items-center gap-1.5">
                      <span className="text-lg">🎯</span>
                      <div>
                        <div className="text-xl font-bold text-white">{streak.currentStreak}</div>
                        <div className="text-xs uppercase tracking-wide">Current</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-lg">🏆</span>
                      <div>
                        <div className="text-xl font-bold text-white">{streak.longestStreak}</div>
                        <div className="text-xs uppercase tracking-wide">Best</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Stats Section */}
                  <div className="mb-6 p-4 bg-gray-900/50 rounded-lg border border-gray-700">
                    <div className="text-xs uppercase tracking-wide text-gray-500 mb-3">Statistics</div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-gray-400 text-xs mb-1">Started On</div>
                        <div className="text-white flex items-center gap-1.5">
                          <span className="text-sm">📅</span>
                          {calculateStats(streak).startedOn}
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-400 text-xs mb-1">Last Active</div>
                        <div className="text-white flex items-center gap-1.5">
                          <span className="text-sm">⏱️</span>
                          {calculateStats(streak).lastChecked}
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-400 text-xs mb-1">Total Days</div>
                        <div className="text-white flex items-center gap-1.5">
                          <span className="text-sm">📆</span>
                          {calculateStats(streak).totalDays} days
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-400 text-xs mb-1">Success Rate</div>
                        <div className="text-white flex items-center gap-1.5">
                          <span className="text-sm">📈</span>
                          {calculateStats(streak).successRate}%
                        </div>
                      </div>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="mt-4">
                      <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-blue-500"
                          initial={{ width: 0 }}
                          animate={{ width: `${calculateStats(streak).successRate}%` }}
                          transition={{ duration: 1, delay: 0.5 }}
                        />
                      </div>
                      <div className="text-xs text-gray-400 mt-1 text-center">
                        Success Rate: {calculateStats(streak).successRate}%
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleFailStreak(streak.id)}
                      className="flex-1 px-4 py-2 bg-yellow-600/30 text-yellow-200 rounded-lg 
                        hover:bg-yellow-600/50 transition-colors border border-yellow-600/50
                        active:transform active:scale-95 flex items-center justify-center gap-1.5"
                    >
                      <span>💔</span> Failed Today
                    </button>
                    <button
                      onClick={() => handleDeleteStreak(streak.id)}
                      className="px-4 py-2 bg-red-600/30 text-red-200 rounded-lg 
                        hover:bg-red-600/50 transition-colors border border-red-600/50
                        active:transform active:scale-95 flex items-center justify-center gap-1.5"
                    >
                      <span>🗑️</span>
                    </button>
                  </div>
                </motion.div>
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

      {/* Milestone Celebration */}
      {currentMilestone && (
        <MilestoneCelebration
          milestone={currentMilestone}
          onClose={clearMilestone}
        />
      )}

      {/* Add the modal */}
      <AddStreakModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={addStreak}
      />
      <SoundToggle />
    </motion.main>
  );
}
