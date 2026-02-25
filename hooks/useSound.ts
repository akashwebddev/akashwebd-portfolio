'use client';

import { useEffect, useCallback, useRef, useState } from 'react';
import { SoundSystem } from '@/lib/soundSystem';

export function useSound() {
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [musicVolume, setMusicVolumeState] = useState(0.3);
  const backgroundMusicRef = useRef<HTMLAudioElement | null>(null);
  const hasInteractedRef = useRef(false);

  // Initialize sound system and background music
  useEffect(() => {
    SoundSystem.init();
    
    // Background music直接从public folder
    backgroundMusicRef.current = new Audio('/background-music.mp3');
    backgroundMusicRef.current.loop = true;
    backgroundMusicRef.current.volume = musicVolume;

    // Cleanup on unmount
    return () => {
      if (backgroundMusicRef.current) {
        backgroundMusicRef.current.pause();
        backgroundMusicRef.current = null;
      }
    };
  }, [musicVolume]);

  // Handle user interaction for autoplay
  useEffect(() => {
    const handleFirstInteraction = () => {
      if (!hasInteractedRef.current) {
        hasInteractedRef.current = true;
        document.removeEventListener('click', handleFirstInteraction);
        document.removeEventListener('scroll', handleFirstInteraction);
        document.removeEventListener('keydown', handleFirstInteraction);
      }
    };

    document.addEventListener('click', handleFirstInteraction);
    document.addEventListener('scroll', handleFirstInteraction);
    document.addEventListener('keydown', handleFirstInteraction);

    return () => {
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('scroll', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
    };
  }, []);

  // Original sound functions from SoundSystem
  const playClick = useCallback(() => {
    SoundSystem.playClick();
  }, []);

  const playSuccess = useCallback(() => {
    SoundSystem.playSuccess();
  }, []);

  const playLoadingTick = useCallback(() => {
    SoundSystem.playLoadingTick();
  }, []);

  const playChime = useCallback(() => {
    SoundSystem.playChime();
  }, []);

  const playNotification = useCallback(() => {
    SoundSystem.playNotification();
  }, []);

  const playSectionTransition = useCallback(() => {
    SoundSystem.playSectionTransition();
  }, []);

  const playHackerAccess = useCallback(() => {
    SoundSystem.playHackerAccess();
  }, []);

  const playRotatingHackerSound = useCallback(() => {
    SoundSystem.playRotatingHackerSound();
  }, []);

  // Background music controls
  const playBackgroundMusic = useCallback(() => {
    if (backgroundMusicRef.current && !isMusicPlaying) {
      const playPromise = backgroundMusicRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsMusicPlaying(true);
            console.log('🎵 Background music started');
          })
          .catch(error => {
            console.log('⚠️ Background music autoplay failed:', error);
          });
      }
    }
  }, [isMusicPlaying]);

  const pauseBackgroundMusic = useCallback(() => {
    if (backgroundMusicRef.current && isMusicPlaying) {
      backgroundMusicRef.current.pause();
      setIsMusicPlaying(false);
      console.log('🎵 Background music paused');
    }
  }, [isMusicPlaying]);

  const toggleBackgroundMusic = useCallback(() => {
    if (isMusicPlaying) {
      pauseBackgroundMusic();
    } else {
      playBackgroundMusic();
    }
  }, [isMusicPlaying, playBackgroundMusic, pauseBackgroundMusic]);

  const setMusicVolume = useCallback((volume: number) => {
    const newVolume = Math.max(0, Math.min(1, volume));
    setMusicVolumeState(newVolume);
    if (backgroundMusicRef.current) {
      backgroundMusicRef.current.volume = newVolume;
    }
  }, []);

  const startMusicWithInteraction = useCallback(() => {
    if (!isMusicPlaying && backgroundMusicRef.current && hasInteractedRef.current) {
      playBackgroundMusic();
    }
  }, [isMusicPlaying, playBackgroundMusic]);

  return {
    // Original sound effects
    playClick,
    playSuccess,
    playLoadingTick,
    playChime,
    playNotification,
    playSectionTransition,
    playHackerAccess,
    playRotatingHackerSound,
    
    // Background music controls
    playBackgroundMusic,
    pauseBackgroundMusic,
    toggleBackgroundMusic,
    setMusicVolume,
    startMusicWithInteraction,
    isMusicPlaying,
    musicVolume,
  };
}
