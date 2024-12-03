import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EmojiPicker } from './EmojiPicker';
import { NewStreak, StreakCategory } from '../types/streak';
import { playSound } from '../utils/sounds';

interface AddStreakModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (streak: NewStreak) => void;
}

export const AddStreakModal = ({ isOpen, onClose, onAdd }: AddStreakModalProps) => {
  const [name, setName] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState('✨');
  const [category, setCategory] = useState<StreakCategory>('Other');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newStreak: NewStreak = {
      name: name.trim(),
      description: '',
      emoji: selectedEmoji,
      category: category,
    };

    playSound('add');
    onAdd(newStreak);
    setName('');
    setSelectedEmoji('✨');
    setCategory('Other');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50"
            onClick={onClose}
          />
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="relative bg-gray-800 rounded-xl shadow-xl p-6 w-full max-w-md"
          >
            <h2 className="text-2xl font-bold mb-6 text-white">Add New Streak</h2>
            
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Choose an Emoji
                  </label>
                  <EmojiPicker
                    selectedEmoji={selectedEmoji}
                    onSelect={setSelectedEmoji}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Streak Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter streak name"
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg
                      text-white placeholder-gray-400 focus:outline-none focus:border-blue-500
                      focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                  />
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-lg
                      hover:bg-gray-600 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg
                      hover:bg-blue-700 transition-colors font-medium"
                  >
                    Add Streak
                  </button>
                </div>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}; 