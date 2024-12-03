import { Howl } from 'howler';

// Sound configuration object
export const SOUNDS = {
  success: new Howl({
    src: ['data:audio/wav;base64,UklGRjIAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAAABmYWN0BAAAAAAAAABkYXRhAAAAAA=='],
    volume: 0.5
  }),
  milestone: new Howl({
    src: ['data:audio/wav;base64,UklGRjIAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAAABmYWN0BAAAAAAAAABkYXRhAAAAAA=='],
    volume: 0.7
  }),
  fail: new Howl({
    src: ['data:audio/wav;base64,UklGRjIAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAAABmYWN0BAAAAAAAAABkYXRhAAAAAA=='],
    volume: 0.5
  }),
  add: new Howl({
    src: ['data:audio/wav;base64,UklGRjIAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAAABmYWN0BAAAAAAAAABkYXRhAAAAAA=='],
    volume: 0.5
  }),
  delete: new Howl({
    src: ['data:audio/wav;base64,UklGRjIAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAAABmYWN0BAAAAAAAAABkYXRhAAAAAA=='],
    volume: 0.4
  }),
  click: new Howl({
    src: ['data:audio/wav;base64,UklGRjIAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAAABmYWN0BAAAAAAAAABkYXRhAAAAAA=='],
    volume: 0.3
  })
};

// Sound player utility
export const playSound = (sound: keyof typeof SOUNDS) => {
  SOUNDS[sound].play();
}; 