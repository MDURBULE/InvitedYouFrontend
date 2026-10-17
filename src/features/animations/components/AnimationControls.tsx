'use client';

import React from 'react';
import { RotateCcw, Volume2, VolumeX, ArrowDown } from 'lucide-react';

interface AnimationControlsProps {
  allowReplay: boolean;
  isPlayingAudio: boolean;
  hasMusic: boolean;
  onReplay: () => void;
  onToggleAudio: () => void;
  onScrollToDetails?: () => void;
}

export const AnimationControls: React.FC<AnimationControlsProps> = ({
  allowReplay,
  isPlayingAudio,
  hasMusic,
  onReplay,
  onToggleAudio,
  onScrollToDetails,
}) => {
  return (
    <aside
      aria-label="Invitation controls"
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex items-center gap-1.5 sm:gap-2 rounded-full border border-royal-gold/40 bg-royal-dark/90 p-1 sm:p-1.5 backdrop-blur-md shadow-gold transition-all"
    >
      {/* Background Music Toggle */}
      {hasMusic && (
        <button
          type="button"
          onClick={onToggleAudio}
          className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-royal-ruby/80 text-royal-champagne hover:bg-royal-ruby transition-colors"
          title={isPlayingAudio ? 'Mute Music' : 'Play Ceremonial Music'}
          aria-label={isPlayingAudio ? 'Mute Music' : 'Play Ceremonial Music'}
        >
          {isPlayingAudio ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
        </button>
      )}

      {/* Replay Opening Sequence */}
      {allowReplay && (
        <button
          type="button"
          onClick={onReplay}
          className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-white/10 text-royal-champagne hover:bg-white/20 transition-colors"
          title="Replay Opening Sequence"
          aria-label="Replay Opening Sequence"
        >
          <RotateCcw className="h-4 w-4" />
        </button>
      )}

      {/* Scroll Down / To Details */}
      {onScrollToDetails && (
        <button
          type="button"
          onClick={onScrollToDetails}
          className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-white/10 text-royal-champagne hover:bg-white/20 transition-colors"
          title="Jump to Venue & Details"
          aria-label="Jump to Venue & Details"
        >
          <ArrowDown className="h-4 w-4" />
        </button>
      )}
    </aside>
  );
};
