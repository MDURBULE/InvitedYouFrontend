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
import { UniversalShareButton } from '@/components/UniversalShareButton';
import { Calendar, Clock, MapPin, Sparkles, Navigation, Phone, Share2 } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

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
  const { t, locale } = useLanguage();
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
    isRevealed,
    isOpening,
    isPlayingAudio,
    startOpening,
    skipToDetails,
    replay,
    toggleAudio,
  } = useAnimationState(animConfig);

  const handleToggleAudio = () => {
    if (!audioRef.current && musicUrl) {
      audioRef.current = new Audio(musicUrl);
      audioRef.current.loop = true;
    }

    if (audioRef.current) {
      if (isPlayingAudio) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(() => {
          // Autoplay policy prevented
        });
      }
    }
    toggleAudio();
  };

  const handleScrollToDetails = () => {
    if (detailsRef.current) {
      detailsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Format date and time
  const formattedDate = eventDate
    ? new Date(eventDate).toLocaleDateString(locale === 'mr' ? 'mr-IN' : locale === 'hi' ? 'hi-IN' : 'en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : '';

  const formattedTime = eventDate
    ? new Date(eventDate).toLocaleTimeString(locale === 'mr' ? 'mr-IN' : locale === 'hi' ? 'hi-IN' : 'en-US', {
        hour: 'numeric',
        minute: '2-digit',
      })
    : '';

  const getCategoryTitle = (cat: string) => {
    switch (cat) {
      case 'WEDDING':
        return t('categories.wedding');
      case 'ENGAGEMENT':
        return t('categories.engagement');
      case 'BIRTHDAY':
        return t('categories.birthday');
      case 'HOUSEWARMING':
        return t('categories.housewarming');
      case 'ANNIVERSARY':
        return t('categories.anniversary');
      case 'BABY_SHOWER':
        return t('categories.babyShower');
      case 'FESTIVAL':
        return t('categories.festival');
      default:
        return t('categories.other');
    }
  };

  const auspiciousInvocation =
    locale === 'mr'
      ? '॥ श्री गणेशाय नमः ॥'
      : locale === 'hi'
      ? '॥ श्री गणेशाय नमः ॥'
      : '|| Shree Ganeshay Namah ||';

  const familyBlessing =
    locale === 'mr'
      ? 'श्री गजाननाच्या कृपेने, आमच्या परिवाराच्या वतीने सस्नेह निमंत्रण'
      : locale === 'hi'
      ? 'परमपिता परमेश्वर की असीम अनुकंपा एवं कुलदेवता के आशीर्वाद से'
      : 'With the divine blessings of Almighty and our elders';

  const hostSectionTitle =
    locale === 'mr'
      ? 'निमंत्रक व आपले स्नेही'
      : locale === 'hi'
      ? 'विनीत एवं दर्शनाभिलाषी'
      : 'Cordially Invited By';

  return (
    <div
      className="relative min-h-screen w-full overflow-x-hidden text-gray-100 selection:bg-amber-400 selection:text-gray-900"
      style={{
        backgroundColor: design.backgroundColor || '#0C0D14',
      }}
    >
      {/* Floating Particles Canvas */}
      {animConfig.enableParticles && (
        <DecorativeParticles
          type={animConfig.particleType || 'gold-dust'}
          count={animConfig.particleCount || 22}
        />
      )}

      {/* Persistent Floating Controls (Replay, Music) */}
      <AnimationControls
        allowReplay={animConfig.allowReplay && isRevealed}
        isPlayingAudio={isPlayingAudio}
        hasMusic={Boolean(musicUrl)}
        onReplay={replay}
        onToggleAudio={handleToggleAudio}
        onScrollToDetails={isRevealed ? handleScrollToDetails : undefined}
      />

      {/* Main Responsive Container */}
      <main className="relative mx-auto max-w-3xl px-3 py-6 sm:px-6 sm:py-10">
        {/* ========================================================
            OPENING SEQUENCE STAGE (Active when !isRevealed)
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
              {/* Header Hero Card - Tactile Indian Wedding Card Feel */}
              <div
                className="relative rounded-3xl border-2 border-[#D4AF37]/50 bg-gradient-to-b from-[#2B0E14] via-[#1A070B] to-[#100306] p-5 sm:p-10 text-center shadow-2xl backdrop-blur-md overflow-hidden"
              >
                {/* Traditional Corner Gold Borders */}
                <div className="absolute top-2.5 left-2.5 h-8 w-8 sm:h-10 sm:w-10 border-t-2 border-l-2 border-[#D4AF37]/70 rounded-tl" />
                <div className="absolute top-2.5 right-2.5 h-8 w-8 sm:h-10 sm:w-10 border-t-2 border-r-2 border-[#D4AF37]/70 rounded-tr" />
                <div className="absolute bottom-2.5 left-2.5 h-8 w-8 sm:h-10 sm:w-10 border-b-2 border-l-2 border-[#D4AF37]/70 rounded-bl" />
                <div className="absolute bottom-2.5 right-2.5 h-8 w-8 sm:h-10 sm:w-10 border-b-2 border-r-2 border-[#D4AF37]/70 rounded-br" />

                {/* Event Completed / Concluded Keepsake Banner */}
                {eventDate && new Date(eventDate).getTime() < Date.now() && (
                  <div className="mb-4 sm:mb-5 rounded-2xl border border-amber-500/40 bg-amber-500/15 py-2.5 px-4 text-center">
                    <p className="font-serif text-xs sm:text-sm font-bold text-amber-300 flex items-center justify-center gap-2 tracking-wider">
                      <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                      <span>{t('dashboard.completedBadge')}</span>
                      <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                    </p>
                  </div>
                )}

                {/* Auspicious Invocation Calligraphy */}
                <div className="text-center mb-3 sm:mb-4">
                  <span className="font-serif text-xs sm:text-sm font-bold text-amber-300 tracking-widest drop-shadow">
                    {auspiciousInvocation}
                  </span>
                </div>

                {/* Traditional Arch Filigree */}
                <div className="mx-auto mb-3 sm:mb-4 flex items-center justify-center gap-2 sm:gap-3 text-amber-200/80">
                  <div className="h-px w-10 sm:w-16 bg-gradient-to-r from-transparent to-[#D4AF37]" />
                  <span className="font-serif text-[11px] sm:text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
                    {getCategoryTitle(eventCategory)}
                  </span>
                  <div className="h-px w-10 sm:w-16 bg-gradient-to-l from-transparent to-[#D4AF37]" />
                </div>

                {/* Respectful Family Introduction */}
                {hosts && (
                  <div className="font-sans text-xs sm:text-sm text-gray-200 tracking-wide mb-3 leading-relaxed max-w-xl mx-auto">
                    <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-amber-300/80 block mb-0.5 font-serif font-semibold">
                      {hostSectionTitle}
                    </span>
                    <span className="font-semibold text-amber-100 text-sm sm:text-base">{hosts}</span>
                    <p className="text-[11px] sm:text-xs text-gray-300 mt-1 italic font-serif">
                      {familyBlessing}
                    </p>
                  </div>
                )}

                {/* Honorees or Couple Names */}
                <h1
                  className="font-serif text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white my-2.5 sm:my-4 drop-shadow-md break-words"
                  style={{
                    color: '#FFFDF9',
                    textShadow: '0 2px 14px rgba(212,175,55,0.35)',
                  }}
                >
                  {honorees || title}
                </h1>

                {/* Event Title Subhead */}
                {honorees && title && (
                  <h2 className="font-serif text-base sm:text-xl text-amber-200/90 tracking-wide font-medium mt-1">
                    {title}
                  </h2>
                )}

                {/* Date & Time Highlights */}
                {formattedDate && (
                  <div className="mt-5 sm:mt-6 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 text-xs sm:text-sm font-sans text-gray-200">
                    <div className="flex items-center gap-2 rounded-full border border-[#D4AF37]/40 bg-black/40 px-4 py-1.5 shadow-sm">
                      <Calendar className="h-4 w-4 text-amber-400" />
                      <span className="font-medium">{formattedDate}</span>
                    </div>
                    {formattedTime && (
                      <div className="flex items-center gap-2 rounded-full border border-[#D4AF37]/40 bg-black/40 px-4 py-1.5 shadow-sm">
                        <Clock className="h-4 w-4 text-amber-400" />
                        <span className="font-medium">{formattedTime}</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Venue Quick Link */}
                {venueName && (
                  <div className="mt-3.5 flex items-center justify-center gap-1.5 text-xs sm:text-sm text-amber-200/90 font-medium">
                    <MapPin className="h-4 w-4 text-amber-400 shrink-0" />
                    <span>{venueName}</span>
                  </div>
                )}

                {/* Practical Guest Action Bar */}
                <div className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 pt-4 border-t border-[#D4AF37]/25">
                  {/* Direct Google Maps Direction button */}
                  {googleMapsUrl && (
                    <a
                      href={googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full bg-[#D4AF37] hover:bg-[#E5C378] text-gray-950 px-4 py-2 text-xs font-bold shadow-md transition-all active:scale-95"
                    >
                      <Navigation className="h-3.5 w-3.5 text-gray-950" />
                      <span>{t('invitationView.googleMaps')}</span>
                    </a>
                  )}

                  {/* Add to Calendar Modal */}
                  {eventDate && (
                    <AddToCalendarModal
                      title={title}
                      honorees={honorees}
                      eventDate={eventDate}
                      venueName={venueName}
                      venueAddress={venueAddress}
                    />
                  )}

                  {/* Share on WhatsApp / Universal */}
                  <UniversalShareButton
                    title={title}
                    honorees={honorees}
                    slug={slug}
                    venueName={venueName}
                    eventDate={eventDate}
                    variant="compact"
                  />
                </div>
              </div>

              {/* Countdown Section */}
              <div className="text-center">
                <CountdownTimer targetDate={eventDate} themeColor={design.secondaryColor} />
              </div>

              {/* Event Functions / Multi-Day Schedule Timeline */}
              {parsedFunctions.length > 0 && (
                <div className="rounded-3xl border-2 border-[#D4AF37]/35 bg-[#17080C]/90 p-5 sm:p-8 shadow-xl backdrop-blur-md">
                  <div className="text-center mb-5 sm:mb-6">
                    <span className="text-[10px] sm:text-xs uppercase tracking-widest text-[#D4AF37] font-semibold font-serif">
                      {locale === 'mr' ? 'मांगलिक कार्यक्रम व मुहूर्त' : locale === 'hi' ? 'मांगलिक कार्यक्रम एवं शुभ मुहूर्त' : 'Ceremonies & Schedule'}
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mt-1">
                      {t('invitationView.scheduleTitle')}
                    </h3>
                  </div>

                  <div className="space-y-3.5 sm:space-y-4">
                    {parsedFunctions.map((fn, idx) => (
                      <div
                        key={fn.id || idx}
                        className="rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5 transition-colors hover:border-[#D4AF37]/50"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-2">
                          <h4 className="font-serif text-base sm:text-lg font-bold text-amber-200">
                            {fn.name}
                          </h4>
                          {fn.dressCode && (
                            <span className="text-[11px] rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 px-3 py-0.5 text-amber-300 self-start sm:self-auto font-medium">
                              {t('invitationView.dressCode')}: {fn.dressCode}
                            </span>
                          )}
                        </div>

                        <div className="mt-2.5 flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-gray-200 font-sans">
                          {fn.date && (
                            <div className="flex items-center gap-1.5">
                              <Calendar className="h-3.5 w-3.5 text-amber-400" />
                              <span>{fn.date}</span>
                            </div>
                          )}
                          {fn.time && (
                            <div className="flex items-center gap-1.5">
                              <Clock className="h-3.5 w-3.5 text-amber-400" />
                              <span>{fn.time}</span>
                            </div>
                          )}
                          {fn.venueName && (
                            <div className="flex items-center gap-1.5">
                              <MapPin className="h-3.5 w-3.5 text-amber-400" />
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
                <div className="rounded-3xl border-2 border-[#D4AF37]/35 bg-[#17080C]/90 p-5 sm:p-8 shadow-xl backdrop-blur-md">
                  <div className="text-center mb-5 sm:mb-6">
                    <span className="text-[10px] sm:text-xs uppercase tracking-widest text-[#D4AF37] font-semibold font-serif">
                      {t('invitationView.galleryTitle')}
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mt-1">
                      {t('invitationView.gallerySubtitle')}
                    </h3>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {parsedMedia.map((m, idx) => (
                      <div
                        key={m.id || idx}
                        onClick={() => setActivePhoto(m.url)}
                        className="group relative aspect-square overflow-hidden rounded-2xl border border-white/10 bg-white/5 cursor-pointer shadow-md"
                      >
                        <img
                          src={m.url}
                          alt={m.caption || 'Celebration moment'}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                        {m.caption && (
                          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/50 to-transparent p-2 text-center">
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

              {/* Traditional Sanskrit Mangal Blessing & Footer Note */}
              <div className="pt-8 pb-12 text-center text-xs text-gray-300 font-sans space-y-3">
                <p className="font-serif text-amber-300/80 text-xs sm:text-sm tracking-wide">
                  ॥ शुभं भवतु । कल्याणम् आयुः आरोग्यम् धनसंपदा ॥
                </p>
                <p className="italic text-gray-400 max-w-md mx-auto leading-relaxed">
                  {locale === 'mr'
                    ? 'आपल्या उपस्थितीने व शुभाशीर्वादाने हा मंगल सोहळा अधिक आनंदमय होईल!'
                    : locale === 'hi'
                    ? 'आपकी गरिमामयी उपस्थिति एवं स्नेहपूर्ण आशीर्वाद से यह पावन उत्सव और भी आनंदमय होगा!'
                    : 'We warmly look forward to celebrating this auspicious occasion with you!'}
                </p>
                <div className="pt-2 flex items-center justify-center gap-2 text-[#D4AF37] font-serif text-xs">
                  <span>✦</span>
                  <span className="font-bold tracking-wider">InvitedYou</span>
                  <span>✦</span>
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
