import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const EMOJI_CATEGORIES = {
  'Activities': ['⚽️', '🎮', '🎨', '📚', '💪', '🧘', '🏃', '🚴', '🎵', '✍️'],
  'Health': ['💊', '🏥', '🧠', '❤️', '🥗', '🥤', '😴', '🧘‍♀️', '🚰', '🥦'],
  'Productivity': ['💻', '📱', '✏️', '📝', '⏰', '📅', '✅', '📈', '💡', '🎯'],
  'Lifestyle': ['🌅', '🧹', '🛏️', '🪴', '🐕', '📖', '🎸', '🎨', '🧘‍♂️', '🚿'],
  'Other': ['⭐️', '🌟', '✨', '🎉', '🔥', '💫', '🌈', '🎊', '🏆', '💎'],
};

interface EmojiPickerProps {
  onSelect: (emoji: string) => void;
  selectedEmoji: string;
}

export const EmojiPicker = ({ onSelect, selectedEmoji }: EmojiPickerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [category, setCategory] = useState<keyof typeof EMOJI_CATEGORIES>('Activities');

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 text-2xl bg-gray-800 rounded-lg border border-gray-700 
          hover:border-gray-600 transition-colors flex items-center justify-center"
      >
        {selectedEmoji}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full mt-2 left-0 bg-gray-800 rounded-lg border border-gray-700 
              shadow-xl p-4 w-72 z-50"
          >
            {/* Category Tabs */}
            <div className="flex gap-1 mb-3 overflow-x-auto pb-2 scrollbar-thin">
              {Object.keys(EMOJI_CATEGORIES).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat as keyof typeof EMOJI_CATEGORIES)}
                  className={`px-3 py-1 rounded-full text-sm whitespace-nowrap
                    ${category === cat 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Emoji Grid */}
            <div className="grid grid-cols-5 gap-2">
              {EMOJI_CATEGORIES[category].map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => {
                    onSelect(emoji);
                    setIsOpen(false);
                  }}
                  className={`w-10 h-10 text-xl flex items-center justify-center rounded
                    hover:bg-gray-700 transition-colors
                    ${selectedEmoji === emoji ? 'bg-blue-600' : ''}`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}; 