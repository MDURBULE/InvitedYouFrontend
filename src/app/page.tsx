'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Sparkles,
  ArrowRight,
  Share2,
  Calendar,
  MapPin,
  CheckCircle,
  Play,
  Heart,
  Eye,
} from 'lucide-react';
import { InvitationOpeningSequence } from '@/features/animations/components/InvitationOpeningSequence';
import { AnimationPreviewModal } from '@/features/animations/components/AnimationPreview';
import { TemplateResponse } from '@/types';

export default function HomePage() {
  const [activeHeroPreset, setActiveHeroPreset] = useState<
    'envelope-reveal' | 'royal-curtain-doors' | 'botanical-bloom' | 'celebration-pop'
  >('envelope-reveal');
  const [isOpeningHero, setIsOpeningHero] = useState(false);
  const [previewTemplate, setPreviewTemplate] = useState<TemplateResponse | null>(null);

  const handleHeroOpen = () => {
    setIsOpeningHero(true);
    setTimeout(() => {
      setIsOpeningHero(false);
    }, 2200);
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Ambient background glows */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[600px] w-[800px] rounded-full bg-gradient-to-tr from-royal-ruby/30 via-royal-gold/15 to-transparent blur-[160px]" />

      {/* ========================================================
          HERO SECTION
      ======================================================== */}
      <section className="relative mx-auto max-w-7xl px-4 pt-16 pb-20 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-royal-gold/40 bg-royal-gold/10 px-4 py-1.5 backdrop-blur-md shadow-gold">
              <Sparkles className="h-4 w-4 text-royal-gold animate-pulse" />
              <span className="text-xs font-serif tracking-wider text-royal-champagne uppercase font-semibold">
                The Next Generation of Celebration Invites
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.15]">
              Make Guests Feel <span className="text-gold-gradient">Celebrated</span> Before They Even Arrive.
            </h1>

            <p className="text-sm sm:text-base md:text-lg font-sans text-gray-300 max-w-2xl leading-relaxed mx-auto lg:mx-0">
              Transform your celebration into a memorable interactive digital experience. Send a
              single link via WhatsApp that opens in any mobile browser with royal door reveals,
              wax seal unfolds, live countdowns, turn-by-turn directions, and calendar reminders.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2 sm:pt-4">
              <Link
                href="/templates"
                className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-royal-gold via-royal-champagne to-royal-gold px-6 sm:px-8 py-3 sm:py-3.5 text-xs sm:text-sm font-bold text-royal-dark shadow-gold hover:scale-105 active:scale-95 transition-transform"
              >
                <span>Browse Animated Templates</span>
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/editor"
                className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 sm:px-8 py-3 sm:py-3.5 text-xs sm:text-sm font-semibold text-white hover:bg-white/10 active:scale-95 transition-all"
              >
                <span>Create Custom Invitation</span>
              </Link>
            </div>

            {/* Quick Guarantees */}
            <div className="grid grid-cols-3 gap-2 pt-6 border-t border-white/10 max-w-lg mx-auto lg:mx-0">
              <div className="text-center lg:text-left">
                <span className="font-serif text-base sm:text-lg font-bold text-royal-champagne">0 Apps</span>
                <p className="text-[10px] sm:text-[11px] text-gray-400">Any mobile browser</p>
              </div>
              <div className="text-center lg:text-left">
                <span className="font-serif text-base sm:text-lg font-bold text-royal-champagne">1 Tap</span>
                <p className="text-[10px] sm:text-[11px] text-gray-400">WhatsApp delivery</p>
              </div>
              <div className="text-center lg:text-left">
                <span className="font-serif text-base sm:text-lg font-bold text-royal-champagne">60 FPS</span>
                <p className="text-[10px] sm:text-[11px] text-gray-400">Pure fluid motion</p>
              </div>
            </div>
          </div>

          {/* Right Hero: Interactive Live Preview Container */}
          <div className="lg:col-span-5 flex flex-col items-center w-full">
            {/* Preset Selector Pill - Scrollable on Mobile */}
            <div className="w-full max-w-full overflow-x-auto no-scrollbar scrollbar-none pb-1">
              <div className="flex items-center justify-start sm:justify-center gap-1.5 rounded-2xl sm:rounded-full border border-royal-gold/30 bg-royal-dark/90 p-1.5 backdrop-blur-md mb-3 shadow-md min-w-max mx-auto">
                {[
                  { id: 'envelope-reveal', label: 'Wax Seal Envelope' },
                  { id: 'royal-curtain-doors', label: 'Palace Doors' },
                  { id: 'botanical-bloom', label: 'Floral Bloom' },
                  { id: 'celebration-pop', label: 'Confetti Pop' },
                ].map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => {
                      setActiveHeroPreset(p.id as any);
                      setIsOpeningHero(false);
                    }}
                    className={`rounded-full px-3 py-1 text-[11px] font-sans font-medium whitespace-nowrap transition-all ${
                      activeHeroPreset === p.id
                        ? 'bg-royal-gold text-royal-dark font-bold shadow-sm'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Live Interactive Sequence Demo */}
            <div className="relative w-full rounded-3xl border border-royal-gold/40 bg-gradient-to-b from-[#180A0E]/90 to-[#0A0507] p-2.5 sm:p-4 shadow-2xl backdrop-blur-md">
              <div className="mb-2 flex items-center justify-between px-3 pt-2">
                <div className="flex items-center gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                  <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
                  <div className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
                </div>
                <span className="text-[10px] tracking-widest text-royal-gold font-sans font-medium uppercase">
                  Interactive Live Demo
                </span>
              </div>

              <div className="min-h-[420px] flex items-center justify-center">
                <InvitationOpeningSequence
                  config={{
                    version: 1,
                    preset: activeHeroPreset,
                    intensity: 'balanced',
                    interaction: 'tap-to-open',
                    enableParticles: true,
                    particleType: 'gold-dust',
                    particleCount: 20,
                    allowReplay: true,
                    reducedMotionFallback: true,
                    steps: [],
                  }}
                  design={{
                    primaryColor: '#8B1E2E',
                    secondaryColor: '#D4AF37',
                    backgroundColor: '#120508',
                    titleFont: 'Cinzel Decorative',
                    bodyFont: 'Outfit',
                  }}
                  title="Siddharth & Ananya's Royal Wedding"
                  honorees="Siddharth & Ananya"
                  isOpening={isOpeningHero}
                  onOpen={handleHeroOpen}
                  onSkip={handleHeroOpen}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          CELEBRATION CATEGORIES GRID
      ======================================================== */}
      <section className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 border-t border-white/10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest text-royal-gold font-serif font-semibold">
            Tailored Experiences
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mt-1">
            For Life&apos;s Most Sacred & Joyous Celebrations
          </h2>
          <p className="mt-2 text-sm text-gray-400 font-sans">
            Every occasion deserves a distinctive visual identity, authentic cultural motifs, and
            curated motion choreography.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {[
            {
              category: 'WEDDING',
              title: 'Royal Weddings',
              desc: 'Palace doors, wax seals, muhurtham timelines, and multi-function cards.',
              emoji: '💒',
              color: 'from-red-950/80 to-amber-950/60',
            },
            {
              category: 'ENGAGEMENT',
              title: 'Engagements',
              desc: 'Botanical vines, romantic monograms, and ring ceremony announcements.',
              emoji: '💍',
              color: 'from-rose-950/80 to-stone-900/60',
            },
            {
              category: 'BIRTHDAY',
              title: 'Milestone Birthdays',
              desc: 'Confetti bursts, balloon arches, and interactive memory galleries.',
              emoji: '🎂',
              color: 'from-amber-950/80 to-neutral-900/60',
            },
            {
              category: 'HOUSEWARMING',
              title: 'Griha Pravesh',
              desc: 'Marigold torans, glowing diyas, and auspicious entry door animation.',
              emoji: '🪔',
              color: 'from-orange-950/80 to-neutral-900/60',
            },
          ].map((cat, idx) => (
            <Link
              key={idx}
              href={`/templates?category=${cat.category}`}
              className="group relative rounded-3xl border border-royal-gold/25 bg-royal-dark/70 p-4 sm:p-6 backdrop-blur-sm transition-all hover:border-royal-gold/60 hover:-translate-y-1 shadow-md hover:shadow-gold"
            >
              <div className="text-3xl mb-3">{cat.emoji}</div>
              <h3 className="font-serif text-lg font-bold text-white group-hover:text-royal-champagne transition-colors">
                {cat.title}
              </h3>
              <p className="mt-1.5 text-xs text-gray-400 font-sans leading-relaxed">
                {cat.desc}
              </p>
              <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-royal-gold font-sans group-hover:translate-x-1 transition-transform">
                <span>Explore Designs</span>
                <ArrowRight className="h-3 w-3" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ========================================================
          STATIC VS ANIMATED COMPARISON
      ======================================================== */}
      <section className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 border-t border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-4">
            <span className="text-xs uppercase tracking-widest text-royal-gold font-serif font-semibold">
              The Evolution of Invites
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-white">
              Why an Animated Digital Webpage Beats a Plain Image
            </h2>
            <p className="text-sm text-gray-300 leading-relaxed font-sans">
              Traditional JPEG cards and static PDF flyers get compressed, lost in WhatsApp chats,
              and force guests to manually re-type addresses into maps. InvitedYou transforms your
              invitation into a living keepsake.
            </p>

            <ul className="space-y-3 pt-2 text-sm text-gray-300 font-sans">
              {[
                'Ceremonial opening reveal creates excitement and emotional connection.',
                'Interactive turn-by-turn Google Maps & Apple Maps navigation.',
                'One-tap Add to Calendar prevents guests from forgetting the event.',
                'Multi-event functions (Sangeet, Muhurtham, Reception) neatly organized.',
                'Zero mobile lag or battery drain with pure CSS & Canvas hardware acceleration.',
              ].map((point, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <CheckCircle className="h-4 w-4 text-royal-gold shrink-0 mt-0.5" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            <div className="pt-4">
              <Link
                href="/templates"
                className="inline-flex items-center gap-2 rounded-full border border-royal-gold/60 bg-royal-gold/10 px-6 py-2.5 text-xs font-bold text-royal-champagne hover:bg-royal-gold hover:text-royal-dark transition-all"
              >
                <span>View Full Template Gallery</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Side by side comparison cards - 1 column on mobile, 2 on sm */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-4 sm:p-6 text-center space-y-3 opacity-75">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Old WhatsApp Forward
              </span>
              <div className="h-28 sm:h-36 rounded-2xl bg-neutral-900 border border-white/10 flex items-center justify-center p-3 text-xs text-gray-500">
                Compressed JPEG Image
              </div>
              <ul className="text-[11px] text-gray-400 text-left space-y-1.5">
                <li>❌ Blurry text on zoom</li>
                <li>❌ Address cannot be clicked</li>
                <li>❌ Guests forget the date</li>
                <li>❌ No music or reveal</li>
              </ul>
            </div>

            <div className="rounded-3xl border-2 border-royal-gold/60 bg-gradient-to-b from-[#241016] to-[#120609] p-4 sm:p-6 text-center space-y-3 shadow-gold">
              <span className="text-xs font-bold text-royal-champagne uppercase tracking-wider">
                InvitedYou Platform
              </span>
              <div className="h-28 sm:h-36 rounded-2xl bg-royal-dark border border-royal-gold/40 flex flex-col items-center justify-center p-3 text-xs text-royal-champagne">
                <Sparkles className="h-6 w-6 text-royal-gold mb-1 animate-pulse" />
                <span className="font-serif font-bold text-white">Live Webpage</span>
                <span className="text-[10px] text-gray-400 mt-1">3D Wax Seal & Palace Doors</span>
              </div>
              <ul className="text-[11px] text-gray-200 text-left space-y-1.5 font-medium">
                <li>✨ Crisp typography & photos</li>
                <li>📍 1-tap Google Maps route</li>
                <li>📅 Google & Apple Calendar save</li>
                <li>♫ Curated ceremonial music</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          BOTTOM CALL TO ACTION
      ======================================================== */}
      <section className="relative mx-auto max-w-5xl px-4 py-14 sm:py-20 text-center sm:px-6">
        <div className="rounded-3xl border border-royal-gold/40 bg-gradient-to-b from-[#260E15] via-[#1A0A0E] to-[#120608] p-6 sm:p-14 shadow-2xl">
          <div className="mx-auto flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl bg-royal-gold/20 text-royal-gold border border-royal-gold/40 mb-5 sm:mb-6 shadow-gold">
            <Sparkles className="h-6 w-6 sm:h-7 sm:w-7" />
          </div>

          <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
            Your Guests Deserve an Unforgettable First Impression.
          </h2>
          <p className="mt-3 text-xs sm:text-sm md:text-base text-gray-300 font-sans max-w-xl mx-auto">
            Choose a template, personalize your details, and publish in minutes. Start free with zero
            credit card required.
          </p>

          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Link
              href="/templates"
              className="w-full sm:w-auto rounded-full bg-gradient-to-r from-royal-gold via-royal-champagne to-royal-gold px-7 py-3 sm:py-3.5 text-xs sm:text-sm font-bold text-royal-dark shadow-gold hover:scale-105 active:scale-95 transition-transform"
            >
              Explore All Templates
            </Link>
            <Link
              href="/auth/register"
              className="w-full sm:w-auto rounded-full border border-white/20 bg-white/5 px-7 py-3 sm:py-3.5 text-xs sm:text-sm font-semibold text-white hover:bg-white/10 transition-colors"
            >
              Create Free Account
            </Link>
          </div>
        </div>
      </section>

      {/* Template Preview Modal if active */}
      {previewTemplate && (
        <AnimationPreviewModal
          template={previewTemplate}
          onClose={() => setPreviewTemplate(null)}
        />
      )}
    </div>
  );
}
