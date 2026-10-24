'use client';

import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimationConfig, DesignConfig, EventFunction, MediaItem } from '@/types';
import { useAnimationState } from '../hooks/useAnimationState';
import { DecorativeParticles } from './DecorativeParticles';
import { InvitationOpeningSequence } from './InvitationOpeningSequence';
import { AnimationControls } from './AnimationControls';
import { CountdownTimer } from '@/components/CountdownTimer';
import { VenueNavigationCard } from '@/components/VenueNavigationCard';
import { AddToCalendarModal } from '@/components/AddToCalendarModal';
import { WhatsAppShareButton } from '@/components/WhatsAppShareButton';
import { Calendar, Clock, MapPin, Sparkles, Image as ImageIcon } from 'lucide-react';

interface AnimatedInvitationRendererProps {
  title: string;
  eventCategory: string;
  hosts?: string;
  honorees?: string;
  eventDate?: string;
  venueName?: string;
  venueAddress?: string;
  googleMapsUrl?: string;
  functions?: string;
  designConfig: string;
  animationConfig: string;
  mediaGallery?: string;
  musicUrl?: string;
  slug?: string;
  isPreview?: boolean;
}

export const AnimatedInvitationRenderer: React.FC<AnimatedInvitationRendererProps> = ({
  title,
  eventCategory,
  hosts,
  honorees,
  eventDate,
  venueName,
  venueAddress,
  googleMapsUrl,
  functions,
  designConfig,
  animationConfig,
  mediaGallery,
  musicUrl,
  slug = 'preview',
  isPreview = false,
}) => {
  const detailsRef = useRef<HTMLDivElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [activePhoto, setActivePhoto] = useState<string | null>(null);

  // Parse configurations safely with fallbacks
  const animConfig: AnimationConfig = React.useMemo(() => {
    try {
      return typeof animationConfig === 'string'
        ? JSON.parse(animationConfig)
        : animationConfig;
    } catch {
      return {
        version: 1,
        preset: 'envelope-reveal',
        intensity: 'balanced',
        interaction: 'tap-to-open',
        enableParticles: true,
        particleType: 'gold-dust',
        particleCount: 20,
        allowReplay: true,
        reducedMotionFallback: true,
        steps: [],
      };
    }
  }, [animationConfig]);

  const design: DesignConfig = React.useMemo(() => {
    try {
      return typeof designConfig === 'string' ? JSON.parse(designConfig) : designConfig;
    } catch {
      return {
        primaryColor: '#8B1E2E',
        secondaryColor: '#D4AF37',
        backgroundColor: '#120508',
        titleFont: 'Cinzel Decorative',
        bodyFont: 'Outfit',
      };
    }
  }, [designConfig]);

  const parsedFunctions: EventFunction[] = React.useMemo(() => {
    try {
      return functions ? JSON.parse(functions) : [];
    } catch {
      return [];
    }
  }, [functions]);

  const parsedMedia: MediaItem[] = React.useMemo(() => {
    try {
      return mediaGallery ? JSON.parse(mediaGallery) : [];
    } catch {
      return [];
    }
  }, [mediaGallery]);

  const {
    stage,
    startOpening,
    skipToDetails,
    replay,
    isRevealed,
    isOpening,
    isPlayingAudio,
    toggleAudio,
  } = useAnimationState(animConfig, () => {
    if (musicUrl && animConfig.musicAutoStartOnInteraction && audioRef.current) {
      audioRef.current.play().catch(() => {
        // Autoplay policy prevented playback
      });
    }
  });

  const handleAudioToggle = () => {
    if (!audioRef.current) return;
    if (isPlayingAudio) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
    toggleAudio();
  };

  const scrollToDetails = () => {
    detailsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const formattedDate = eventDate
    ? new Date(eventDate).toLocaleDateString('en-IN', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : undefined;

  const formattedTime = eventDate
    ? new Date(eventDate).toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
      })
    : undefined;

  return (
    <div
      className="relative min-h-screen w-full overflow-x-hidden text-white font-sans selection:bg-royal-gold selection:text-royal-dark"
      style={{
        backgroundColor: design.backgroundColor || '#0E0D14',
      }}
    >
      {/* Background audio element */}
      {musicUrl && (
        <audio ref={audioRef} src={musicUrl} loop preload="none" aria-hidden="true" />
      )}

      {/* Decorative ambient lighting meshes */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div
          className="absolute -top-40 left-1/2 -translate-x-1/2 h-[500px] w-[600px] rounded-full blur-[140px] opacity-30"
          style={{ backgroundColor: design.primaryColor || '#8B1E2E' }}
        />
        <div
          className="absolute bottom-10 right-10 h-[400px] w-[400px] rounded-full blur-[160px] opacity-25"
          style={{ backgroundColor: design.secondaryColor || '#D4AF37' }}
        />
      </div>

      {/* Particle Canvas */}
      {animConfig.enableParticles && animConfig.preset !== 'none' && (
        <DecorativeParticles
          type={animConfig.particleType || 'gold-dust'}
          count={animConfig.particleCount || 24}
          active={true}
        />
      )}

      {/* Persistent Floating Controls (Replay, Audio, Jump to details) */}
      <AnimationControls
        allowReplay={animConfig.allowReplay && isRevealed}
        isPlayingAudio={isPlayingAudio}
        hasMusic={Boolean(musicUrl)}
        onReplay={replay}
        onToggleAudio={handleAudioToggle}
        onScrollToDetails={isRevealed ? scrollToDetails : undefined}
      />

      <main className="relative z-10 mx-auto max-w-2xl px-2.5 sm:px-4 py-4 sm:py-8">
        {/* ========================================================
            OPENING SEQUENCE (Before user reveals or skips)
        ======================================================== */}
        <AnimatePresence mode="wait">
          {!isRevealed && (
            <motion.div
              key="opening-stage"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.5 }}
              className="flex min-h-[70vh] sm:min-h-[80vh] flex-col items-center justify-center"
            >
              <InvitationOpeningSequence
                config={animConfig}
                design={design}
                title={title}
                honorees={honorees}
                isOpening={isOpening}
                onOpen={startOpening}
                onSkip={skipToDetails}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* ========================================================
            FULL INVITATION CARD (Revealed State)
        ======================================================== */}
        <AnimatePresence>
          {isRevealed && (
            <motion.div
              key="revealed-invitation"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-6 sm:space-y-8"
            >
              {/* Header Hero Card */}
              <div
                className="relative rounded-3xl border border-royal-gold/40 bg-gradient-to-b from-[#211116]/90 via-[#160B0E]/95 to-[#0F0709] p-4 sm:p-8 text-center shadow-2xl backdrop-blur-md overflow-hidden"
                style={{
                  borderColor: `${design.secondaryColor || '#D4AF37'}55`,
                }}
              >
                {/* Event Completed / Concluded Keepsake Banner */}
                {eventDate && new Date(eventDate).getTime() < Date.now() && (
                  <div className="mb-4 sm:mb-5 rounded-2xl border border-amber-500/40 bg-amber-500/15 py-2.5 px-4 text-center">
                    <p className="font-serif text-xs sm:text-sm font-bold text-amber-300 flex items-center justify-center gap-2 tracking-wider">
                      <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                      <span>Event Completed • Celebration Concluded</span>
                      <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                    </p>
                    <p className="text-[11px] text-gray-300 font-sans mt-0.5">
                      This invitation is preserved as a cherished celebration keepsake.
                    </p>
                  </div>
                )}

                {/* Traditional Arch Filigree */}
                <div className="mx-auto mb-3 sm:mb-4 flex items-center justify-center gap-2 sm:gap-3 text-royal-champagne opacity-80">
                  <div className="h-px w-8 sm:w-12 bg-gradient-to-r from-transparent to-royal-gold" />
                  <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-royal-gold animate-pulse" />
                  <span className="font-serif text-[10px] sm:text-xs uppercase tracking-widest text-royal-gold">
                    {eventCategory === 'HOUSEWARMING'
                      ? 'SHUBH GRIHA PRAVESH'
                      : eventCategory === 'BABY_SHOWER'
                      ? 'BABY SHOWER CELEBRATION'
                      : eventCategory === 'BIRTHDAY'
                      ? 'BIRTHDAY CELEBRATION'
                      : eventCategory === 'ANNIVERSARY'
                      ? 'ANNIVERSARY CELEBRATION'
                      : eventCategory === 'ENGAGEMENT'
                      ? 'ENGAGEMENT CEREMONY'
                      : `${eventCategory} CELEBRATION`}
                  </span>
                  <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-royal-gold animate-pulse" />
                  <div className="h-px w-8 sm:w-12 bg-gradient-to-l from-transparent to-royal-gold" />
                </div>

                {/* Hosts Introduction */}
                {hosts && (
                  <p className="font-sans text-[11px] sm:text-sm text-gray-300 tracking-wide mb-2 sm:mb-3 uppercase leading-relaxed">
                    With the blessings of our family,
                    <br />
                    <span className="font-semibold text-royal-champagne">{hosts}</span>
                    <br />
                    warmly invite you to celebrate the special occasion of
                  </p>
                )}

                {/* Honorees or Couple Names */}
                <h1
                  className="font-serif text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white my-2 sm:my-3 drop-shadow-md break-words"
                  style={{
                    color: '#FFFDF9',
                    textShadow: '0 2px 14px rgba(212,175,55,0.3)',
                  }}
                >
                  {honorees || title}
                </h1>

                {/* Event Title Subhead */}
                {honorees && title && (
                  <h2 className="font-serif text-lg sm:text-xl text-royal-champagne/90 tracking-wide font-medium mt-1">
                    {title}
                  </h2>
                )}

                {/* Date & Time Highlights */}
                {formattedDate && (
                  <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm font-sans text-gray-200">
                    <div className="flex items-center gap-2 rounded-full border border-royal-gold/30 bg-white/5 px-4 py-1.5">
                      <Calendar className="h-4 w-4 text-royal-gold" />
                      <span>{formattedDate}</span>
                    </div>
                    {formattedTime && (
                      <div className="flex items-center gap-2 rounded-full border border-royal-gold/30 bg-white/5 px-4 py-1.5">
                        <Clock className="h-4 w-4 text-royal-gold" />
                        <span>{formattedTime}</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Venue Quick Link */}
                {venueName && (
                  <div className="mt-3 flex items-center justify-center gap-1.5 text-xs text-gray-400">
                    <MapPin className="h-3.5 w-3.5 text-royal-gold" />
                    <span>{venueName}</span>
                  </div>
                )}

                {/* Top Action Row: Add to Calendar & WhatsApp Share */}
                <div className="mt-5 sm:mt-7 flex flex-wrap items-center justify-center gap-2 sm:gap-3 pt-3.5 sm:pt-4 border-t border-royal-gold/20">
                  <AddToCalendarModal
                    title={title}
                    honorees={honorees}
                    eventDate={eventDate}
                    venueName={venueName}
                    venueAddress={venueAddress}
                  />

                  {!isPreview && (
                    <WhatsAppShareButton
                      title={title}
                      honorees={honorees}
                      slug={slug}
                      venueName={venueName}
                      eventDate={eventDate}
                    />
                  )}
                </div>
              </div>

              {/* Countdown Section */}
              <div className="text-center">
                <CountdownTimer targetDate={eventDate} themeColor={design.secondaryColor} />
              </div>

              {/* Event Functions / Multi-Day Schedule Timeline */}
              {parsedFunctions.length > 0 && (
                <div className="rounded-3xl border border-royal-gold/30 bg-royal-dark/80 p-4 sm:p-8 shadow-xl backdrop-blur-md">
                  <div className="text-center mb-4 sm:mb-6">
                    <span className="text-[10px] uppercase tracking-widest text-royal-gold font-semibold">
                      Ceremony Schedule
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mt-1">
                      Event Functions & Timings
                    </h3>
                  </div>

                  <div className="space-y-3 sm:space-y-4">
                    {parsedFunctions.map((fn, idx) => (
                      <div
                        key={fn.id || idx}
                        className="rounded-2xl border border-white/10 bg-white/5 p-3.5 sm:p-5 transition-colors hover:border-royal-gold/40"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-2">
                          <h4 className="font-serif text-base sm:text-lg font-bold text-royal-champagne">
                            {fn.name}
                          </h4>
                          {fn.dressCode && (
                            <span className="text-[11px] rounded-full border border-royal-gold/30 bg-royal-gold/10 px-3 py-0.5 text-royal-gold self-start sm:self-auto font-medium">
                              Dress: {fn.dressCode}
                            </span>
                          )}
                        </div>

                        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-300 font-sans">
                          {fn.date && (
                            <div className="flex items-center gap-1.5">
                              <Calendar className="h-3.5 w-3.5 text-royal-gold" />
                              <span>{fn.date}</span>
                            </div>
                          )}
                          {fn.time && (
                            <div className="flex items-center gap-1.5">
                              <Clock className="h-3.5 w-3.5 text-royal-gold" />
                              <span>{fn.time}</span>
                            </div>
                          )}
                          {fn.venueName && (
                            <div className="flex items-center gap-1.5">
                              <MapPin className="h-3.5 w-3.5 text-royal-gold" />
                              <span>{fn.venueName}</span>
                            </div>
                          )}
                        </div>

                        {fn.address && (
                          <p className="mt-2 text-xs text-gray-400 font-sans leading-relaxed">
                            {fn.address}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Photo & Video Gallery */}
              {parsedMedia.length > 0 && (
                <div className="rounded-3xl border border-royal-gold/30 bg-royal-dark/80 p-6 sm:p-8 shadow-xl backdrop-blur-md">
                  <div className="text-center mb-6">
                    <span className="text-[10px] uppercase tracking-widest text-royal-gold font-semibold">
                      Treasured Moments
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-white mt-1">
                      Photo & Video Gallery
                    </h3>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {parsedMedia.map((m, idx) => (
                      <div
                        key={m.id || idx}
                        onClick={() => setActivePhoto(m.url)}
                        className="group relative aspect-square overflow-hidden rounded-2xl border border-white/10 bg-white/5 cursor-pointer"
                      >
                        <img
                          src={m.url}
                          alt={m.caption || 'Celebration moment'}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                        {m.caption && (
                          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-2 text-center">
                            <p className="text-[10px] text-white font-sans line-clamp-1">
                              {m.caption}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Venue & Directions Card */}
              <div ref={detailsRef}>
                <VenueNavigationCard
                  venueName={venueName}
                  venueAddress={venueAddress}
                  googleMapsUrl={googleMapsUrl}
                  themeColor={design.secondaryColor}
                />
              </div>

              {/* Footer Note */}
              <div className="pt-8 pb-12 text-center text-xs text-gray-400 font-sans">
                <p className="italic">
                  We look forward to celebrating this joyous occasion with you!
                </p>
                <div className="mt-3 flex items-center justify-center gap-1.5 text-royal-gold/80 font-serif">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Created with InvitedYou</span>
                  <Sparkles className="h-3.5 w-3.5" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Lightbox Modal */}
      {activePhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
          onClick={() => setActivePhoto(null)}
        >
          <div className="relative max-h-[90vh] max-w-2xl">
            <img
              src={activePhoto}
              alt="Celebration moment"
              className="max-h-[85vh] w-auto rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      )}
    </div>
  );
};
