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

// ... rest of the code ...
