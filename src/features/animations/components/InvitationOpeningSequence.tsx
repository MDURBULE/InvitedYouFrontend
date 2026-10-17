'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { AnimationConfig, DesignConfig } from '@/types';
import { Sparkles, ArrowDown } from 'lucide-react';

interface InvitationOpeningSequenceProps {
  config: AnimationConfig;
  design: DesignConfig;
  title: string;
  honorees?: string;
  isOpening: boolean;
  onOpen: () => void;
  onSkip: () => void;
}

export const InvitationOpeningSequence: React.FC<InvitationOpeningSequenceProps> = ({
  config,
  design,
  title,
  honorees,
  isOpening,
  onOpen,
  onSkip,
}) => {
  const preset = config.preset || 'envelope-reveal';

  return (
    <div className="relative flex min-h-[70vh] sm:min-h-[80vh] w-full flex-col items-center justify-center px-2 py-4 sm:p-4">
      {/* ========================================================
          PRESET 1: ENVELOPE REVEAL (The Royal Seal)
      ======================================================== */}
      {preset === 'envelope-reveal' && (
        <div className="relative flex w-full flex-col items-center">
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="relative w-full max-w-[360px] mx-auto px-1 sm:px-0"
            style={{ perspective: 1200 }}
          >
            {/* Envelope Pocket */}
            <div
              className="relative h-52 sm:h-56 w-full rounded-2xl border border-royal-gold/40 bg-gradient-to-b from-[#2A1016] via-[#1B0A0E] to-[#120508] p-4 sm:p-6 shadow-2xl overflow-hidden cursor-pointer"
              onClick={!isOpening ? onOpen : undefined}
            >
              {/* Gold Filigree Corner Borders */}
              <div className="absolute top-2 left-2 h-6 w-6 sm:h-8 sm:w-8 border-t-2 border-l-2 border-royal-gold/60 rounded-tl" />
              <div className="absolute top-2 right-2 h-6 w-6 sm:h-8 sm:w-8 border-t-2 border-r-2 border-royal-gold/60 rounded-tr" />
              <div className="absolute bottom-2 left-2 h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-l-2 border-royal-gold/60 rounded-bl" />
              <div className="absolute bottom-2 right-2 h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-r-2 border-royal-gold/60 rounded-br" />

              {/* Envelope Flap Animation */}
              <motion.div
                className="absolute inset-x-0 top-0 h-24 sm:h-28 origin-top bg-gradient-to-b from-royal-ruby/90 to-royal-dark/95 border-b border-royal-gold/40 shadow-lg"
                style={{
                  clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                }}
                animate={
                  isOpening
                    ? { rotateX: 180, opacity: 0.2, y: -20 }
                    : { rotateX: 0, opacity: 1, y: 0 }
                }
                transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
              />

              {/* Emerging Card Preview */}
              <motion.div
                className="absolute inset-x-4 sm:inset-x-6 top-4 sm:top-6 h-44 sm:h-48 rounded-xl bg-gradient-to-br from-royal-ivory via-white to-royal-parchment p-3 sm:p-5 shadow-xl text-center flex flex-col items-center justify-center border border-royal-gold/40"
                animate={
                  isOpening
                    ? { y: -110, scale: 1.05, opacity: 0.95 }
                    : { y: 0, scale: 1, opacity: 0.4 }
                }
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-royal-ruby font-medium">
                  Exclusive Invitation
                </span>
                <h3 className="font-serif text-base sm:text-lg font-bold text-gray-900 mt-1 line-clamp-1">
                  {honorees || title}
                </h3>
                <div className="w-10 sm:w-12 h-0.5 bg-royal-gold/60 my-1.5" />
                <p className="text-[11px] sm:text-xs text-gray-600 line-clamp-1">{title}</p>
              </motion.div>

              {/* Central Wax Seal */}
              {!isOpening && (
                <motion.div
                  className="absolute inset-0 flex items-center justify-center z-10"
                  animate={{ scale: [1, 1.04, 1] }}
                  transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
                >
                  <button
                    type="button"
                    onClick={onOpen}
                    className="relative flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-gradient-to-tr from-royal-ruby via-[#A12C2F] to-[#C94A4D] border-2 border-royal-gold shadow-gold-lg transition-transform hover:scale-105 active:scale-95"
                    aria-label="Open invitation wax seal"
                  >
                    <div className="flex flex-col items-center justify-center text-center">
                      <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-royal-champagne mb-0.5 animate-pulse" />
                      <span className="text-[8px] sm:text-[9px] font-bold tracking-widest text-white uppercase">
                        TAP TO OPEN
                      </span>
                    </div>
                  </button>
                </motion.div>
              )}
            </div>

            <p className="mt-3 sm:mt-4 text-center text-xs sm:text-sm font-sans text-royal-gold/80 tracking-wide">
              Tap the royal seal to open your invitation
            </p>
          </motion.div>
        </div>
      )}

      {/* ========================================================
          PRESET 2: ROYAL PALACE DOORS
      ======================================================== */}
      {preset === 'royal-curtain-doors' && (
        <div className="relative flex w-full flex-col items-center">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative h-80 sm:h-96 w-full max-w-[360px] mx-auto rounded-2xl border-2 border-royal-gold/50 bg-[#150709] shadow-2xl overflow-hidden"
            style={{ perspective: 1000 }}
          >
            {/* Center light beam behind doors */}
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-royal-champagne/20 via-transparent to-royal-gold/10" />

            {/* Left Palace Door */}
            <motion.div
              className="absolute left-0 top-0 bottom-0 w-1/2 origin-left bg-gradient-to-r from-[#3D0C13] to-[#59141D] border-r border-royal-gold/60 p-3 sm:p-4 flex flex-col justify-between shadow-2xl"
              animate={isOpening ? { rotateY: -85, opacity: 0.1 } : { rotateY: 0, opacity: 1 }}
              transition={{ duration: 1.1, ease: [0.25, 0.8, 0.25, 1] }}
            >
              <div className="h-12 w-12 sm:h-16 sm:w-16 border-t-2 border-l-2 border-royal-gold/70 rounded-tl" />
              <div className="self-end my-auto h-7 w-7 sm:h-8 sm:w-8 rounded-full border border-royal-gold/80 bg-royal-gold/30 flex items-center justify-center shadow-gold">
                <div className="h-2 w-2 rounded-full bg-royal-champagne" />
              </div>
              <div className="h-12 w-12 sm:h-16 sm:w-16 border-b-2 border-l-2 border-royal-gold/70 rounded-bl" />
            </motion.div>

            {/* Right Palace Door */}
            <motion.div
              className="absolute right-0 top-0 bottom-0 w-1/2 origin-right bg-gradient-to-l from-[#3D0C13] to-[#59141D] border-l border-royal-gold/60 p-3 sm:p-4 flex flex-col justify-between shadow-2xl"
              animate={isOpening ? { rotateY: 85, opacity: 0.1 } : { rotateY: 0, opacity: 1 }}
              transition={{ duration: 1.1, ease: [0.25, 0.8, 0.25, 1] }}
            >
              <div className="h-12 w-12 sm:h-16 sm:w-16 border-t-2 border-r-2 border-royal-gold/70 rounded-tr self-end" />
              <div className="self-start my-auto h-7 w-7 sm:h-8 sm:w-8 rounded-full border border-royal-gold/80 bg-royal-gold/30 flex items-center justify-center shadow-gold">
                <div className="h-2 w-2 rounded-full bg-royal-champagne" />
              </div>
              <div className="h-12 w-12 sm:h-16 sm:w-16 border-b-2 border-r-2 border-royal-gold/70 rounded-br self-end" />
            </motion.div>

            {/* Center Open CTA Button */}
            {!isOpening && (
              <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-auto px-4">
                <button
                  type="button"
                  onClick={onOpen}
                  className="px-5 py-2.5 sm:px-6 sm:py-3 rounded-full bg-gradient-to-r from-royal-gold via-royal-champagne to-royal-gold text-royal-dark font-serif font-bold text-xs sm:text-sm tracking-wider shadow-gold-lg border border-white/40 hover:scale-105 active:scale-95 transition-transform flex items-center gap-2"
                >
                  <Sparkles className="h-4 w-4" />
                  ENTER CELEBRATION
                </button>
              </div>
            )}
          </motion.div>

          <p className="mt-3 sm:mt-4 text-center text-xs sm:text-sm font-sans text-royal-gold/80 tracking-wide">
            Tap to open the palace doors
          </p>
        </div>
      )}

      {/* ========================================================
          PRESET 3: BOTANICAL BLOOM & VINES
      ======================================================== */}
      {preset === 'botanical-bloom' && (
        <div className="relative flex w-full flex-col items-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative h-72 sm:h-80 w-full max-w-[360px] mx-auto rounded-3xl border border-[#C98686]/40 bg-gradient-to-br from-[#FAF6F2] via-white to-[#F2EAE2] p-5 sm:p-8 shadow-2xl flex flex-col items-center justify-center text-center overflow-hidden"
          >
            {/* SVG Vines animation */}
            <svg
              className="absolute inset-0 h-full w-full pointer-events-none opacity-40"
              viewBox="0 0 400 400"
              fill="none"
              stroke="#6E8070"
              strokeWidth="1.5"
            >
              <motion.path
                d="M 50 200 Q 120 50 200 80 T 350 200 Q 280 350 200 320 T 50 200"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.8, ease: 'easeInOut' }}
              />
            </svg>

            <span className="text-[10px] sm:text-xs uppercase tracking-widest text-[#6E8070] font-sans font-medium mb-1.5">
              A Joyous Celebration
            </span>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-gray-900 mb-1.5 line-clamp-1">
              {honorees || title}
            </h2>
            <p className="text-[11px] sm:text-xs text-gray-600 max-w-xs line-clamp-2">{title}</p>

            {!isOpening && (
              <button
                type="button"
                onClick={onOpen}
                className="mt-5 sm:mt-6 px-5 py-2.5 rounded-full bg-[#C98686] text-white font-sans text-xs font-semibold tracking-wider hover:bg-[#B86F6F] active:scale-95 transition-all shadow-md flex items-center gap-2"
              >
                <Sparkles className="h-3.5 w-3.5" />
                BLOOM INVITATION
              </button>
            )}
          </motion.div>
        </div>
      )}

      {/* ========================================================
          PRESET 4: CELEBRATION POP & CONFETTI
      ======================================================== */}
      {preset === 'celebration-pop' && (
        <div className="relative flex w-full flex-col items-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative h-72 sm:h-80 w-full max-w-[360px] mx-auto rounded-3xl border border-yellow-500/30 bg-gradient-to-b from-[#181926] via-[#12131F] to-[#0A0A12] p-5 sm:p-8 shadow-2xl flex flex-col items-center justify-center text-center overflow-hidden"
          >
            <motion.div
              animate={{ y: [0, -6, 0], rotate: [0, -2, 2, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
              className="mb-3 sm:mb-4 flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center rounded-2xl bg-gradient-to-tr from-amber-500 via-orange-500 to-rose-500 p-3 sm:p-4 shadow-lg cursor-pointer"
              onClick={onOpen}
            >
              <Sparkles className="h-10 w-10 sm:h-12 sm:w-12 text-white animate-spin-slow" />
            </motion.div>

            <h2 className="font-serif text-lg sm:text-xl font-bold text-white mb-1 line-clamp-1">
              {honorees || title}
            </h2>
            <p className="text-[11px] sm:text-xs text-gray-400 mb-3 sm:mb-4 line-clamp-1">{title}</p>

            {!isOpening && (
              <button
                type="button"
                onClick={onOpen}
                className="px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-gray-950 font-sans font-bold text-xs tracking-wider shadow-lg hover:scale-105 active:scale-95 transition-transform"
              >
                POP TO REVEAL 🎉
              </button>
            )}
          </motion.div>
        </div>
      )}

      {/* ========================================================
          PRESET 5: MODERN CINEMATIC
      ======================================================== */}
      {preset === 'modern-cinematic' && (
        <div className="relative flex w-full flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative h-72 sm:h-80 w-full max-w-[360px] mx-auto rounded-2xl border border-white/20 bg-black/60 backdrop-blur-md p-5 sm:p-6 shadow-2xl flex flex-col items-center justify-center text-center"
          >
            <div className="h-14 w-14 sm:h-16 sm:w-16 rounded-full border border-royal-gold/60 flex items-center justify-center mb-3 sm:mb-4">
              <span className="font-serif text-lg sm:text-xl text-royal-champagne">
                {title.charAt(0) || '✦'}
              </span>
            </div>
            <h2 className="font-serif text-xl sm:text-2xl font-semibold text-white tracking-wide mb-2 line-clamp-1">
              {honorees || title}
            </h2>
            <button
              type="button"
              onClick={onOpen}
              className="mt-3 sm:mt-4 px-5 py-2 rounded-full border border-white/40 text-white font-sans text-xs tracking-widest uppercase hover:bg-white/10 transition-colors"
            >
              View Invitation
            </button>
          </motion.div>
        </div>
      )}

      {/* Floating Skip to Details button */}
      <div className="mt-6 sm:mt-8">
        <button
          type="button"
          onClick={onSkip}
          className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/60 px-4 py-2 sm:px-5 sm:py-2.5 text-xs font-sans font-medium text-gray-300 hover:text-white backdrop-blur-sm shadow-md transition-all active:scale-95"
        >
          <span>Skip to event details & directions</span>
          <ArrowDown className="h-3.5 w-3.5 text-royal-gold" />
        </button>
      </div>
    </div>
  );
};
