'use client';

import { useEffect, useCallback } from 'react';
import { SoundSystem } from '@/lib/soundSystem';

export function useSound() {
  useEffect(() => {
    SoundSystem.init();
  }, []);

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

  return {
    playClick,
    playSuccess,
    playLoadingTick,
    playChime,
    playNotification,
    playSectionTransition,
    playHackerAccess,
    playRotatingHackerSound,
  };
}
