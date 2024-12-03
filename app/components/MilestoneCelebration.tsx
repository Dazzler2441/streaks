import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { useEffect } from 'react';
import { playSound } from '../utils/sounds';

interface MilestoneCelebrationProps {
  milestone: number;
  onClose: () => void;
}

const milestoneMessages = {
  7: "🌟 One Week Streak!",
  30: "🎉 One Month Strong!",
  50: "🚀 Halfway to 100!",
  100: "💫 Century Club!",
  365: "🏆 One Year Champion!",
};

export const MilestoneCelebration = ({ milestone, onClose }: MilestoneCelebrationProps) => {
  useEffect(() => {
    // Play celebration sound
    playSound('milestone');

    // Trigger confetti
    const duration = 3000;
    const animationEnd = Date.now() + duration;

    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    };

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        clearInterval(interval);
        return;
      }

      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#FFD700', '#FFA500', '#FF69B4']
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#87CEEB', '#98FB98', '#DDA0DD']
      });
    }, 150);

    // Auto-close after animation
    setTimeout(onClose, duration);

    return () => clearInterval(interval);
  }, [onClose]);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          className="bg-gradient-to-r from-purple-600 to-blue-600 p-8 rounded-2xl shadow-2xl text-center"
        >
          <motion.div
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            className="text-6xl mb-4"
          >
            {milestone >= 365 ? '👑' : milestone >= 100 ? '🌟' : '🎉'}
          </motion.div>
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-3xl font-bold text-white mb-4"
          >
            {milestoneMessages[milestone as keyof typeof milestoneMessages] || 
             `Amazing! ${milestone} Days!`}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-white/80 mb-6"
          >
            Keep up the great work!
          </motion.p>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}; 