import { useState } from 'react';
import { Howler } from 'howler';

export const SoundToggle = () => {
  const [isMuted, setIsMuted] = useState(false);

  const toggleSound = () => {
    Howler.mute(!isMuted);
    setIsMuted(!isMuted);
  };

  return (
    <button
      onClick={toggleSound}
      className="fixed bottom-4 right-4 p-3 bg-gray-800 rounded-full
        hover:bg-gray-700 transition-colors"
    >
      {isMuted ? '🔇' : '🔊'}
    </button>
  );
}; 