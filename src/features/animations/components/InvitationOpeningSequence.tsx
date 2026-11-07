'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { AnimationConfig, DesignConfig } from '@/types';
import { Sparkles, ArrowDown } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

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
  const { t, locale } = useLanguage();
  const preset = config.preset || 'envelope-reveal';

  const auspiciousInvocation =
    locale === 'mr'
      ? '॥ श्री गणेशाय नमः ॥'
      : locale === 'hi'
      ? '॥ श्री गणेशाय नमः ॥'
      : '|| Shree Ganeshay Namah ||';

  const auspiciousTagline =
    locale === 'mr'
      ? '॥ सस्नेह निमंत्रण ॥'
      : locale === 'hi'
      ? '॥ मांगलिक निमंत्रण पत्र ॥'
      : '|| Cordial Celebration Invitation ||';

  return (
    <div className="relative flex min-h-[70vh] sm:min-h-[78vh] w-full flex-col items-center justify-center px-2 py-4 sm:p-4">
      {/* ========================================================
          PRESET 1: ENVELOPE REVEAL (Authentic Royal Wax Seal / राजमुद्रा)
      ======================================================== */}
      {preset === 'envelope-reveal' && (
        <div className="relative flex w-full flex-col items-center">
          <motion.div
            initial={{ scale: 0.94, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="relative w-full max-w-[370px] mx-auto px-1 sm:px-0"
            style={{ perspective: 1200 }}
          >
            {/* Auspicious Invocation Header */}
            <div className="text-center mb-3">
              <span className="font-serif text-xs sm:text-sm font-bold tracking-widest text-amber-300 drop-shadow">
                {auspiciousInvocation}
              </span>
            </div>

            {/* Envelope Pocket */}
            <div
              className="relative h-56 sm:h-60 w-full rounded-2xl border-2 border-[#D4AF37]/50 bg-gradient-to-b from-[#2E0E15] via-[#1D080C] to-[#120407] p-4 sm:p-6 shadow-2xl overflow-hidden cursor-pointer select-none"
              onClick={!isOpening ? onOpen : undefined}
            >
              {/* Gold Filigree Ornate Corners */}
              <div className="absolute top-2 left-2 h-7 w-7 sm:h-9 sm:w-9 border-t-2 border-l-2 border-[#D4AF37]/80 rounded-tl" />
              <div className="absolute top-2 right-2 h-7 w-7 sm:h-9 sm:w-9 border-t-2 border-r-2 border-[#D4AF37]/80 rounded-tr" />
              <div className="absolute bottom-2 left-2 h-7 w-7 sm:h-9 sm:w-9 border-b-2 border-l-2 border-[#D4AF37]/80 rounded-bl" />
              <div className="absolute bottom-2 right-2 h-7 w-7 sm:h-9 sm:w-9 border-b-2 border-r-2 border-[#D4AF37]/80 rounded-br" />

              {/* Envelope Flap Animation */}
              <motion.div
                className="absolute inset-x-0 top-0 h-28 sm:h-32 origin-top bg-gradient-to-b from-[#6B1420] via-[#4D0D16] to-[#2E0E15] border-b-2 border-[#D4AF37]/60 shadow-xl"
                style={{
                  clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                }}
                animate={
                  isOpening
                    ? { rotateX: 180, opacity: 0.15, y: -25 }
                    : { rotateX: 0, opacity: 1, y: 0 }
                }
                transition={{ duration: 0.75, ease: [0.4, 0, 0.2, 1] }}
              >
                {/* Triangular gold foil border trim */}
                <div className="absolute inset-0 flex items-center justify-center pt-2">
                  <span className="text-[10px] text-amber-200/60 font-serif tracking-widest uppercase">
                    {auspiciousTagline}
                  </span>
                </div>
              </motion.div>

              {/* Emerging Invitation Card Preview */}
              <motion.div
                className="absolute inset-x-4 sm:inset-x-6 top-4 sm:top-6 h-48 sm:h-52 rounded-xl bg-gradient-to-br from-[#FFFDF9] via-[#FAF6EE] to-[#F3ECE0] p-4 sm:p-5 shadow-2xl text-center flex flex-col items-center justify-center border border-[#D4AF37]/50"
                animate={
                  isOpening
                    ? { y: -120, scale: 1.05, opacity: 0.98 }
                    : { y: 0, scale: 1, opacity: 0.45 }
                }
                transition={{ duration: 0.85, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="text-[10px] sm:text-[11px] font-serif font-bold tracking-widest text-[#851424] uppercase">
                  {auspiciousTagline}
                </span>
                <h3 className="font-serif text-base sm:text-lg font-bold text-gray-900 mt-1.5 line-clamp-1 drop-shadow-sm">
                  {honorees || title}
                </h3>
                <div className="w-12 h-0.5 bg-[#D4AF37] my-2 rounded-full" />
                <p className="text-[11px] sm:text-xs text-gray-700 line-clamp-1 font-sans">{title}</p>
              </motion.div>

              {/* Central Authentic Royal Wax Seal (राजमुद्रा) */}
              {!isOpening && (
                <motion.div
                  className="absolute inset-0 flex items-center justify-center z-10"
                  animate={{ scale: [1, 1.03, 1] }}
                  transition={{ repeat: Infinity, duration: 2.8, ease: 'easeInOut' }}
                >
                  <button
                    type="button"
                    onClick={onOpen}
                    className="group relative flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center rounded-full bg-gradient-to-br from-[#A51D2C] via-[#851424] to-[#540B16] border-2 border-[#D4AF37] shadow-[0_4px_25px_rgba(212,175,55,0.45)] hover:shadow-[0_6px_30px_rgba(212,175,55,0.65)] hover:scale-105 active:scale-95 transition-all"
                    aria-label={t('invitationOpening.tapRoyalSeal')}
                  >
                    {/* Concentric Gold Relief Rings */}
                    <div className="absolute inset-1.5 rounded-full border border-[#D4AF37]/60 pointer-events-none" />
                    <div className="absolute inset-3 rounded-full border border-dashed border-[#D4AF37]/40 pointer-events-none" />

                    <div className="flex flex-col items-center justify-center text-center z-10 px-1">
                      {/* Auspicious Center Symbol */}
                      <span className="font-serif text-lg sm:text-xl font-bold text-amber-200 drop-shadow -mb-0.5">
                        {locale === 'mr' ? '॥ श्री ॥' : locale === 'hi' ? '॥ ॐ ॥' : '✦'}
                      </span>
                      <span className="text-[8px] sm:text-[9px] font-sans font-bold tracking-widest text-amber-100 uppercase leading-tight mt-0.5">
                        {t('invitationOpening.tapToOpen')}
                      </span>
                    </div>
                  </button>
                </motion.div>
              )}
            </div>

            <p className="mt-3.5 sm:mt-4 text-center text-xs sm:text-sm font-sans text-amber-200/90 tracking-wide font-medium">
              {t('invitationOpening.tapRoyalSeal')}
            </p>
          </motion.div>
        </div>
      )}

      {/* ========================================================
          PRESET 2: ROYAL PALACE DOORS (राजवाडा महाद्वार)
      ======================================================== */}
      {preset === 'royal-curtain-doors' && (
        <div className="relative flex w-full flex-col items-center">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative h-84 sm:h-96 w-full max-w-[370px] mx-auto rounded-3xl border-2 border-[#D4AF37]/60 bg-[#140508] shadow-2xl overflow-hidden"
            style={{ perspective: 1100 }}
          >
            {/* Auspicious Top Toran / Archway */}
            <div className="absolute top-0 inset-x-0 z-20 h-10 bg-gradient-to-b from-[#2E0E15] to-transparent flex items-center justify-center border-b border-[#D4AF37]/30">
              <span className="font-serif text-[11px] sm:text-xs font-bold text-amber-300 tracking-wider">
                {auspiciousInvocation}
              </span>
            </div>

            {/* Inner Temple Golden Glow */}
            <div className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-400/25 via-amber-600/10 to-transparent" />

            {/* Left Palace Gate Panel */}
            <motion.div
              className="absolute left-0 top-0 bottom-0 w-1/2 origin-left bg-gradient-to-r from-[#4A0E17] via-[#350A10] to-[#26070B] border-r-2 border-[#D4AF37]/80 p-3 sm:p-4 flex flex-col justify-between shadow-2xl"
              animate={isOpening ? { rotateY: -85, opacity: 0.1 } : { rotateY: 0, opacity: 1 }}
              transition={{ duration: 1.15, ease: [0.25, 0.8, 0.25, 1] }}
            >
              {/* Ornate Brass Studs & Corner Bracket */}
              <div className="h-10 w-10 sm:h-12 sm:w-12 border-t-2 border-l-2 border-[#D4AF37]/80 rounded-tl pt-2 pl-2">
                <div className="h-2 w-2 rounded-full bg-[#D4AF37] shadow-gold" />
              </div>

              {/* Traditional Brass Ring Door Knocker (कडी) */}
              <div className="self-end my-auto -mr-2 sm:-mr-2.5 flex items-center justify-center">
                <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full border-2 border-[#D4AF37] bg-gradient-to-br from-[#D4AF37] to-[#8C6D23] shadow-gold flex items-center justify-center">
                  <div className="h-3.5 w-3.5 rounded-full border-2 border-[#26070B] bg-[#D4AF37]" />
                </div>
              </div>

              <div className="h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-l-2 border-[#D4AF37]/80 rounded-bl pb-2 pl-2">
                <div className="h-2 w-2 rounded-full bg-[#D4AF37] shadow-gold" />
              </div>
            </motion.div>

            {/* Right Palace Gate Panel */}
            <motion.div
              className="absolute right-0 top-0 bottom-0 w-1/2 origin-right bg-gradient-to-l from-[#4A0E17] via-[#350A10] to-[#26070B] border-l-2 border-[#D4AF37]/80 p-3 sm:p-4 flex flex-col justify-between shadow-2xl"
              animate={isOpening ? { rotateY: 85, opacity: 0.1 } : { rotateY: 0, opacity: 1 }}
              transition={{ duration: 1.15, ease: [0.25, 0.8, 0.25, 1] }}
            >
              <div className="h-10 w-10 sm:h-12 sm:w-12 border-t-2 border-r-2 border-[#D4AF37]/80 rounded-tr self-end pt-2 pr-2">
                <div className="h-2 w-2 rounded-full bg-[#D4AF37] shadow-gold ml-auto" />
              </div>

              {/* Matching Knocker on Right Door */}
              <div className="self-start my-auto -ml-2 sm:-ml-2.5 flex items-center justify-center">
                <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full border-2 border-[#D4AF37] bg-gradient-to-br from-[#D4AF37] to-[#8C6D23] shadow-gold flex items-center justify-center">
                  <div className="h-3.5 w-3.5 rounded-full border-2 border-[#26070B] bg-[#D4AF37]" />
                </div>
              </div>

              <div className="h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-r-2 border-[#D4AF37]/80 rounded-br self-end pb-2 pr-2">
                <div className="h-2 w-2 rounded-full bg-[#D4AF37] shadow-gold ml-auto" />
              </div>
            </motion.div>

            {/* Center Open CTA Button */}
            {!isOpening && (
              <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-auto px-4">
                <button
                  type="button"
                  onClick={onOpen}
                  className="px-6 py-3 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#D4AF37] text-[#1A0508] font-serif font-bold text-xs sm:text-sm tracking-wider shadow-[0_4px_25px_rgba(212,175,55,0.55)] border border-white/60 hover:scale-105 active:scale-95 transition-transform flex items-center gap-2"
                >
                  <Sparkles className="h-4 w-4 text-[#851424]" />
                  <span>{t('invitationOpening.enterCelebration')}</span>
                </button>
              </div>
            )}
          </motion.div>

          <p className="mt-3.5 sm:mt-4 text-center text-xs sm:text-sm font-sans text-amber-200/90 tracking-wide font-medium">
            {t('invitationOpening.tapPalaceDoors')}
          </p>
        </div>
      )}

      {/* ========================================================
          PRESET 3: BOTANICAL BLOOM & VINES (पुष्पवाटिका)
      ======================================================== */}
      {preset === 'botanical-bloom' && (
        <div className="relative flex w-full flex-col items-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative h-76 sm:h-84 w-full max-w-[360px] mx-auto rounded-3xl border border-[#D4AF37]/40 bg-gradient-to-br from-[#FAF6F2] via-white to-[#F2EAE2] p-5 sm:p-8 shadow-2xl flex flex-col items-center justify-center text-center overflow-hidden"
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

            <span className="text-[10px] sm:text-xs uppercase tracking-widest text-[#556957] font-serif font-bold mb-1.5">
              {t('invitationOpening.joyousCelebration')}
            </span>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-gray-900 mb-1.5 line-clamp-1">
              {honorees || title}
            </h2>
            <p className="text-[11px] sm:text-xs text-gray-600 max-w-xs line-clamp-2">{title}</p>

            {!isOpening && (
              <button
                type="button"
                onClick={onOpen}
                className="mt-5 sm:mt-6 px-6 py-2.5 rounded-full bg-[#851424] text-white font-sans text-xs font-semibold tracking-wider hover:bg-[#6D0E1C] active:scale-95 transition-all shadow-md flex items-center gap-2 border border-amber-300/40"
              >
                <Sparkles className="h-3.5 w-3.5 text-amber-300" />
                <span>{t('invitationOpening.bloomInvitation')}</span>
              </button>
            )}
          </motion.div>
        </div>
      )}

      {/* ========================================================
          PRESET 4: CELEBRATION POP & CONFETTI (उत्सव)
      ======================================================== */}
      {preset === 'celebration-pop' && (
        <div className="relative flex w-full flex-col items-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative h-76 sm:h-84 w-full max-w-[360px] mx-auto rounded-3xl border border-amber-500/40 bg-gradient-to-b from-[#181926] via-[#12131F] to-[#0A0A12] p-5 sm:p-8 shadow-2xl flex flex-col items-center justify-center text-center overflow-hidden"
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
                className="px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-gray-950 font-sans font-bold text-xs tracking-wider shadow-lg hover:scale-105 active:scale-95 transition-transform"
              >
                {t('invitationOpening.popToReveal')}
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
            className="relative h-76 sm:h-84 w-full max-w-[360px] mx-auto rounded-2xl border border-white/20 bg-black/60 backdrop-blur-md p-5 sm:p-6 shadow-2xl flex flex-col items-center justify-center text-center"
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
              className="mt-3 sm:mt-4 px-6 py-2.5 rounded-full border border-amber-300/60 bg-amber-400/10 text-amber-200 font-sans text-xs tracking-widest uppercase hover:bg-amber-400/20 transition-colors"
            >
              {t('invitationOpening.viewInvitation')}
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
          <span>{t('invitationOpening.skipToDetails')}</span>
          <ArrowDown className="h-3.5 w-3.5 text-royal-gold" />
        </button>
      </div>
    </div>
  );
};
