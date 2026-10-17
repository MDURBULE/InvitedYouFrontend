import { useState, useEffect, useCallback } from 'react';
import { AnimationConfig, AnimationIntensity } from '@/types';
import { useReducedMotion } from './useReducedMotion';

export type StageState = 'INITIAL' | 'OPENING' | 'REVEALED';

export function getDurationMultiplier(intensity: AnimationIntensity): number {
  switch (intensity) {
    case 'subtle':
      return 0.75;
    case 'expressive':
      return 1.35;
    case 'balanced':
    default:
      return 1.0;
  }
}

export function useAnimationState(config: AnimationConfig, onComplete?: () => void) {
  const prefersReduced = useReducedMotion();
  const shouldSkipAnimation = prefersReduced || config.preset === 'none';

  const [stage, setStage] = useState<StageState>(shouldSkipAnimation ? 'REVEALED' : 'INITIAL');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  useEffect(() => {
    if (shouldSkipAnimation) {
      setStage('REVEALED');
      onComplete?.();
    }
  }, [shouldSkipAnimation, onComplete]);

  // Handle auto-open interaction mode
  useEffect(() => {
    if (config.interaction === 'auto-open' && stage === 'INITIAL' && !shouldSkipAnimation) {
      const timer = setTimeout(() => {
        startOpening();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [config.interaction, stage, shouldSkipAnimation]);

  const startOpening = useCallback(() => {
    if (stage !== 'INITIAL') return;
    setStage('OPENING');

    // Total duration calculation based on steps & intensity
    const mult = getDurationMultiplier(config.intensity);
    const totalStepDuration = config.steps.reduce(
      (acc, s) => acc + (s.durationMs || 500) * mult + (s.delayMs || 0) * mult,
      0
    );
    const finishDelay = Math.max(800, totalStepDuration || 1200);

    const timer = setTimeout(() => {
      setStage('REVEALED');
      onComplete?.();
    }, finishDelay);

    return () => clearTimeout(timer);
  }, [stage, config, onComplete]);

  const skipToDetails = useCallback(() => {
    setStage('REVEALED');
    onComplete?.();
  }, [onComplete]);

  const replay = useCallback(() => {
    if (shouldSkipAnimation) return;
    setStage('INITIAL');
    setTimeout(() => {
      if (config.interaction === 'auto-open') {
        startOpening();
      }
    }, 100);
  }, [shouldSkipAnimation, config.interaction, startOpening]);

  const toggleAudio = useCallback(() => {
    setIsPlayingAudio((prev) => !prev);
  }, []);

  return {
    stage,
    startOpening,
    skipToDetails,
    replay,
    isRevealed: stage === 'REVEALED',
    isOpening: stage === 'OPENING',
    isInitial: stage === 'INITIAL',
    isPlayingAudio,
    toggleAudio,
    prefersReducedMotion: prefersReduced,
  };
}
