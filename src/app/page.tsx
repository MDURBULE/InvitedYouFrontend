'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  MapPin,
  Calendar,
  Music,
  Check,
  ChevronRight,
  Share2,
  Smartphone,
  Eye,
  Heart,
} from 'lucide-react';
import { InvitationOpeningSequence } from '@/features/animations/components/InvitationOpeningSequence';
import { AnimationPreviewModal } from '@/features/animations/components/AnimationPreview';
import { TemplateResponse } from '@/types';
import { useLanguage } from '@/i18n/LanguageContext';

export default function HomePage() {
  const { t, locale } = useLanguage();
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

  const sampleHonorees =
    locale === 'mr'
      ? 'सिद्धार्थ आणि अनन्या'
      : locale === 'hi'
      ? 'सिद्धार्थ एवं अनन्या'
      : 'Siddharth & Ananya';

  const sampleTitle =
    locale === 'mr'
      ? 'शुभविवाह सोहळा'
      : locale === 'hi'
      ? 'शाही विवाह समारोह'
      : "Royal Wedding Celebration";

  return (
    <div className="relative min-h-screen bg-[#0C0D12] text-gray-100 overflow-hidden font-sans">
      {/* Subtle warm ambient lighting */}
      <div className="pointer-events-none absolute -top-48 left-1/2 -translate-x-1/2 h-[500px] w-[750px] rounded-full bg-gradient-to-b from-[#8B1E2E]/20 via-[#D4AF37]/10 to-transparent blur-[140px]" />

      {/* ========================================================
          1. HERO SECTION
      ======================================================== */}
      <section className="relative mx-auto max-w-7xl px-4 pt-12 pb-16 sm:px-6 lg:px-8 lg:pt-16 lg:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Authentic Copywriting */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Thoughtful, Human Pill */}
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-3.5 py-1 text-xs font-sans text-amber-200">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
              <span>{t('hero.badge')}</span>
            </div>

            {/* Natural, Powerful Headline */}
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.18]">
              {t('hero.titleStart')}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-300 to-amber-100">
                {t('hero.titleHighlight')}
              </span>
              {t('hero.titleEnd')}
            </h1>

            {/* Practical, Reassuring Subtitle */}
            <p className="text-sm sm:text-base lg:text-lg text-gray-300 max-w-2xl leading-relaxed mx-auto lg:mx-0 font-normal">
              {t('hero.description')}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2">
              <Link
                href="/templates"
                className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-full bg-[#D4AF37] hover:bg-[#E5C378] text-[#120508] px-6 sm:px-8 py-3 sm:py-3.5 text-xs sm:text-sm font-bold shadow-lg transition-all active:scale-95"
              >
                <span>{t('hero.browseTemplates')}</span>
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/editor"
                className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 text-white px-6 sm:px-8 py-3 sm:py-3.5 text-xs sm:text-sm font-semibold transition-all active:scale-95"
              >
                <span>{t('hero.createCustom')}</span>
              </Link>
            </div>

            {/* 3 Real Practical Benefits (No tech-jargon) */}
            <div className="grid grid-cols-3 gap-3 pt-6 border-t border-white/10 max-w-lg mx-auto lg:mx-0 text-left">
              <div className="flex flex-col">
                <span className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-amber-400" />
                  <span>Google Maps</span>
                </span>
                <span className="text-[11px] text-gray-400 mt-0.5">
                  {locale === 'mr' ? 'थेट रस्ता सुरू' : locale === 'hi' ? 'सीधा नेविगेशन' : '1-click navigation'}
                </span>
              </div>

              <div className="flex flex-col">
                <span className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-amber-400" />
                  <span>Calendar Save</span>
                </span>
                <span className="text-[11px] text-gray-400 mt-0.5">
                  {locale === 'mr' ? 'मुहूर्त सेव्ह करा' : locale === 'hi' ? 'कैलेंडर रिमाइंडर' : 'Never miss date'}
                </span>
              </div>

              <div className="flex flex-col">
                <span className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5">
                  <Music className="h-3.5 w-3.5 text-amber-400" />
                  <span>Shehnai Music</span>
                </span>
                <span className="text-[11px] text-gray-400 mt-0.5">
                  {locale === 'mr' ? 'मंगल सनई' : locale === 'hi' ? 'मांगलिक धुन' : 'Festive ambiance'}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Realistic Mobile Phone Mockup */}
          <div className="lg:col-span-5 flex flex-col items-center w-full">
            {/* Style Selector Tabs */}
            <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 p-1 mb-4 max-w-full overflow-x-auto no-scrollbar">
              {[
                {
                  id: 'envelope-reveal',
                  label: locale === 'mr' ? 'मेणाची मुद्रा' : locale === 'hi' ? 'वैक्स सील' : 'Wax Seal',
                },
                {
                  id: 'royal-curtain-doors',
                  label: locale === 'mr' ? 'राजवाडा द्वार' : locale === 'hi' ? 'शाही महल' : 'Palace Doors',
                },
                {
                  id: 'botanical-bloom',
                  label: locale === 'mr' ? 'पुष्पवाटिका' : locale === 'hi' ? 'पुष्प वाटिका' : 'Floral Bloom',
                },
              ].map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => {
                    setActiveHeroPreset(p.id as any);
                    setIsOpeningHero(false);
                  }}
                  className={`rounded-full px-3.5 py-1 text-xs font-medium whitespace-nowrap transition-all ${
                    activeHeroPreset === p.id
                      ? 'bg-amber-400 text-gray-950 font-bold shadow-sm'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>

            {/* Realistic Smartphone Chassis Frame */}
            <div className="relative w-full max-w-[340px] rounded-[42px] border-[5px] border-[#2A2B36] bg-[#0E0F16] p-2.5 shadow-2xl shadow-black/80 ring-1 ring-white/15">
              {/* Phone Speaker & Camera Notch */}
              <div className="relative mx-auto mb-2 h-4 w-28 rounded-full bg-[#181922] flex items-center justify-center">
                <div className="h-1.5 w-10 rounded-full bg-[#2A2B36]" />
                <div className="ml-2 h-2 w-2 rounded-full bg-[#242533]" />
              </div>

              {/* Inside Mobile Screen */}
              <div className="relative rounded-[32px] overflow-hidden bg-gradient-to-b from-[#1C0D12] via-[#12080B] to-[#0A0507] p-2 min-h-[460px] flex flex-col justify-between border border-white/5">
                {/* Mini WhatsApp Status Bar Simulation */}
                <div className="flex items-center justify-between px-3 pt-1 text-[10px] text-gray-400 border-b border-white/5 pb-1.5">
                  <span className="font-medium text-gray-300">WhatsApp Link Preview</span>
                  <span className="text-amber-400 font-semibold">{t('hero.livePreviewBadge')}</span>
                </div>

                {/* Opening Sequence */}
                <div className="my-auto py-2">
                  <InvitationOpeningSequence
                    config={{
                      version: 1,
                      preset: activeHeroPreset,
                      intensity: 'balanced',
                      interaction: 'tap-to-open',
                      enableParticles: true,
                      particleType: 'gold-dust',
                      particleCount: 18,
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
                    title={sampleTitle}
                    honorees={sampleHonorees}
                    isOpening={isOpeningHero}
                    onOpen={handleHeroOpen}
                    onSkip={handleHeroOpen}
                  />
                </div>

                {/* Bottom Instruction */}
                <div className="text-center pb-2 text-[11px] text-gray-400 font-sans">
                  {locale === 'mr'
                    ? 'पाहुणे फोनवर असा अनुभव घेतील'
                    : locale === 'hi'
                    ? 'मेहमान अपने फ़ोन पर ऐसा अनुभव देखेंगे'
                    : 'This is what guests see on their phones'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          2. HOW IT WORKS (Human, Simple, 3 Steps)
      ======================================================== */}
      <section className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 border-t border-white/10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest text-amber-400 font-sans font-semibold">
            {locale === 'mr' ? 'सोपी पद्धत' : locale === 'hi' ? 'सरल प्रक्रिया' : 'Simple 3-Step Process'}
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-white mt-1.5">
            {locale === 'mr'
              ? 'आपली डिजिटल पत्रिका काही मिनिटांत तयार करा'
              : locale === 'hi'
              ? 'कुछ ही मिनटों में अपनी डिजिटल पत्रिका तैयार करें'
              : 'Create & Share in 3 Simple Steps'}
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-gray-400 max-w-lg mx-auto">
            {locale === 'mr'
              ? 'कोणत्याही डिझाईनरवर अवलंबून न राहता आपल्या कुटुंबाचा सोहळा सुंदर रीतीने सादर करा.'
              : locale === 'hi'
              ? 'बिना किसी तकनीकी झंझट के अपने परिवार के उत्सव को गरिमामयी ढंग से प्रस्तुत करें।'
              : 'No waiting on graphic designers or app installs. Ready to send right away.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              num: '01',
              title: locale === 'mr' ? 'डिझाईन निवडा' : locale === 'hi' ? 'डिज़ाइन चुनें' : 'Choose Your Style',
              desc:
                locale === 'mr'
                  ? 'राजेशाही राजवाडा, मेणाची मुद्रा, किंवा पुष्पवाटिका — आपल्या परंपरेला साजेसे डिझाईन निवडा.'
                  : locale === 'hi'
                  ? 'शाही राजवाड़ा, वैक्स सील या पुष्प वाटिका — अपनी परंपरा और पसंद के अनुकूल टेम्पलेट चुनें।'
                  : 'Select an authentic motif — royal palace doors, cracked wax seals, or botanical floral blooms.',
            },
            {
              num: '02',
              title: locale === 'mr' ? 'तपशील भरा' : locale === 'hi' ? 'विवरण भरें' : 'Add Family & Dates',
              desc:
                locale === 'mr'
                  ? 'वधू-वरांची नावे, शुभ मुहूर्त, हळदी-संगीताची वेळ आणि कार्यालयाचा गुगल मॅप्स पत्ता टाका.'
                  : locale === 'hi'
                  ? 'वर-वधू के नाम, शुभ मुहूर्त, हल्दी-संगीत का समय और हॉल का गूगल मैप्स पता जोड़ें।'
                  : 'Enter couple names, family hosts, ceremony schedule, and venue address with 1-click maps.',
            },
            {
              num: '03',
              title: locale === 'mr' ? 'व्हॉट्सअ‍ॅपवर पाठवा' : locale === 'hi' ? 'व्हाट्सएप पर भेजें' : 'Share 1 Clean Link',
              desc:
                locale === 'mr'
                  ? 'एकच सुंदर लिंक व्हॉट्सअ‍ॅपवर पाठवा. पाहुणे कोणत्याही मोबाईलवर लगेच पाहू शकतात.'
                  : locale === 'hi'
                  ? 'एक ही सुंदर लिंक व्हाट्सएप पर साझा करें। मेहमान किसी भी फ़ोन पर तुरंत देख सकते हैं।'
                  : 'Send on WhatsApp or SMS. It opens smoothly in any mobile browser with directions and audio.',
            },
          ].map((step, idx) => (
            <div
              key={idx}
              className="relative rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-7 flex flex-col justify-between hover:border-amber-400/40 transition-colors"
            >
              <div>
                <span className="font-serif text-3xl font-bold text-amber-400/70">{step.num}</span>
                <h3 className="font-serif text-lg font-bold text-white mt-3">{step.title}</h3>
                <p className="mt-2 text-xs text-gray-400 leading-relaxed font-sans">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================
          3. REAL VALUE FOR REAL GUESTS (No fake comparison charts)
      ======================================================== */}
      <section className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 border-t border-white/10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest text-amber-400 font-sans font-semibold">
            {t('features.sectionBadge')}
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-white mt-1.5">
            {t('features.sectionTitle')}
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-gray-400">
            {t('features.sectionSubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: '📍',
              title: t('features.card3Title'),
              desc: t('features.card3Desc'),
            },
            {
              icon: '🗓️',
              title: t('features.card4Title'),
              desc: t('features.card4Desc'),
            },
            {
              icon: '🚪',
              title: t('features.card1Title'),
              desc: t('features.card1Desc'),
            },
            {
              icon: '📱',
              title: t('features.card5Title'),
              desc: t('features.card5Desc'),
            },
            {
              icon: '💐',
              title: t('features.card6Title'),
              desc: t('features.card6Desc'),
            },
            {
              icon: '💬',
              title: t('features.card2Title'),
              desc: t('features.card2Desc'),
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="rounded-3xl border border-white/10 bg-[#12131C]/60 p-6 flex flex-col justify-between hover:border-amber-400/30 transition-all shadow-sm"
            >
              <div>
                <span className="text-2xl">{item.icon}</span>
                <h3 className="font-serif text-base font-bold text-white mt-3">{item.title}</h3>
                <p className="mt-1.5 text-xs text-gray-400 leading-relaxed font-sans">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================
          4. OCCASIONS SHOWCASE
      ======================================================== */}
      <section className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 border-t border-white/10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs uppercase tracking-widest text-amber-400 font-sans font-semibold">
              {locale === 'mr' ? 'मांगलिक प्रसंग' : locale === 'hi' ? 'मांगलिक प्रसंग' : 'Occasions'}
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-1">
              {locale === 'mr'
                ? 'प्रत्येक सोहळ्यासाठी स्वतंत्र व सुंदर शैली'
                : locale === 'hi'
                ? 'प्रत्येक मांगलिक अवसर के लिए विशेष शैलियां'
                : 'Crafted for Every Family Celebration'}
            </h2>
          </div>
          <Link
            href="/templates"
            className="text-xs font-semibold text-amber-300 hover:text-amber-200 flex items-center gap-1 self-start sm:self-auto"
          >
            <span>{t('templatesPage.title')}</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {[
            {
              category: 'WEDDING',
              title: t('categories.wedding'),
              desc: locale === 'mr' ? 'शाही राजवाडा, हळद, संगीत आणि फेरे.' : locale === 'hi' ? 'शाही महल द्वार, फेरे, संगीत व रिसेप्शन।' : 'Royal double doors, wax seals, and muhurtham schedule.',
              emoji: '💒',
            },
            {
              category: 'ENGAGEMENT',
              title: t('categories.engagement'),
              desc: locale === 'mr' ? 'साखरपुडा व अंगठी समारंभ पत्रिका.' : locale === 'hi' ? 'सगाई, रोके व टीका रस्म के लिए सुरुचिपूर्ण डिज़ाइन।' : 'Romantic floral vines and ring ceremony announcements.',
              emoji: '💍',
            },
            {
              category: 'HOUSEWARMING',
              title: t('categories.housewarming'),
              desc: locale === 'mr' ? 'गृहप्रवेश व वास्तुशांती पूजा आमंत्रण.' : locale === 'hi' ? 'गृह प्रवेश, वास्तु शांति व महापूजा निमंत्रण।' : 'Auspicious toran, glowing diyas, and entrance reveal.',
              emoji: '🪔',
            },
            {
              category: 'BIRTHDAY',
              title: t('categories.birthday'),
              desc: locale === 'mr' ? 'वाढदिवस व पार्टी सोहळा निमंत्रण.' : locale === 'hi' ? 'जन्मदिन पार्टी और यादगार फोटो गैलरी।' : 'Festive confetti, memories gallery, and party details.',
              emoji: '🎂',
            },
          ].map((cat, idx) => (
            <Link
              key={idx}
              href={`/templates?category=${cat.category}`}
              className="group rounded-3xl border border-white/10 bg-white/[0.02] p-5 sm:p-6 transition-all hover:border-amber-400/40 hover:-translate-y-1"
            >
              <div className="text-3xl mb-3">{cat.emoji}</div>
              <h3 className="font-serif text-base font-bold text-white group-hover:text-amber-200 transition-colors">
                {cat.title}
              </h3>
              <p className="mt-1.5 text-xs text-gray-400 leading-relaxed font-sans">{cat.desc}</p>
              <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-amber-400 group-hover:translate-x-1 transition-transform">
                <span>{locale === 'mr' ? 'डिझाईन्स पहा' : locale === 'hi' ? 'डिज़ाइन देखें' : 'View Designs'}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ========================================================
          5. BOTTOM CALL TO ACTION
      ======================================================== */}
      <section className="relative mx-auto max-w-4xl px-4 py-16 sm:py-20 text-center sm:px-6">
        <div className="rounded-3xl border border-amber-400/30 bg-gradient-to-b from-[#1C0D12] via-[#14080B] to-[#0A0507] p-8 sm:p-14 shadow-2xl">
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-snug">
            {locale === 'mr'
              ? 'आपल्या पाहुण्यांचे स्वागत करा एका देखण्या डिजिटल पत्रिकेसह'
              : locale === 'hi'
              ? 'अपने मेहमानों का स्वागत कीजिए एक सुंदर डिजिटल पत्रिका के साथ'
              : 'Give your guests an invitation they will truly appreciate.'}
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-gray-300 max-w-lg mx-auto font-sans leading-relaxed">
            {locale === 'mr'
              ? 'डिझाईन निवडा, तपशील भरा आणि व्हॉट्सअ‍ॅपवर लगेच शेअर करा.'
              : locale === 'hi'
              ? 'डिज़ाइन चुनें, विवरण भरें और तुरंत व्हाट्सएप पर साझा करें।'
              : 'Choose a design, customize the ceremony schedule, and share via WhatsApp in minutes.'}
          </p>

          <div className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Link
              href="/templates"
              className="w-full sm:w-auto rounded-full bg-[#D4AF37] hover:bg-[#E5C378] text-[#120508] px-7 py-3 text-xs sm:text-sm font-bold shadow-md transition-all active:scale-95"
            >
              {t('templatesPage.title')}
            </Link>
            <Link
              href="/editor"
              className="w-full sm:w-auto rounded-full border border-white/20 bg-white/5 hover:bg-white/10 text-white px-7 py-3 text-xs sm:text-sm font-semibold transition-all active:scale-95"
            >
              {t('hero.createCustom')}
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
