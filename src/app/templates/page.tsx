'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { templatesApi } from '@/lib/api';
import { TemplateResponse, EventCategory, TemplateType } from '@/types';
import { AnimationPreviewModal } from '@/features/animations/components/AnimationPreview';
import { Sparkles, Eye, ArrowRight, Filter, Check } from 'lucide-react';

const CATEGORIES: { id: string; label: string }[] = [
  { id: 'ALL', label: 'All Celebrations' },
  { id: 'WEDDING', label: 'Wedding' },
  { id: 'ENGAGEMENT', label: 'Engagement' },
  { id: 'BIRTHDAY', label: 'Birthday' },
  { id: 'ANNIVERSARY', label: 'Anniversary' },
  { id: 'HOUSEWARMING', label: 'Griha Pravesh' },
  { id: 'BABY_SHOWER', label: 'Baby Shower' },
  { id: 'FESTIVAL', label: 'Festivals' },
];

const TEMPLATE_TYPES: { id: string; label: string }[] = [
  { id: 'ALL', label: 'All Formats' },
  { id: 'ANIMATED', label: '✨ Animated Invites' },
  { id: 'STATIC', label: '📄 Static Cards' },
];

const STYLES: { id: string; label: string }[] = [
  { id: 'ALL', label: 'All Styles' },
  { id: 'ROYAL', label: 'Royal & Palace' },
  { id: 'TRADITIONAL', label: 'Traditional' },
  { id: 'FLORAL', label: 'Botanical & Floral' },
  { id: 'PLAYFUL', label: 'Playful & Festive' },
  { id: 'MINIMALIST', label: 'Modern Minimalist' },
];

import { Suspense } from 'react';

function TemplateGalleryContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [category, setCategory] = useState<string>(searchParams.get('category') || 'ALL');
  const [templateType, setTemplateType] = useState<string>(searchParams.get('templateType') || 'ALL');
  const [styleTag, setStyleTag] = useState<string>(searchParams.get('styleTag') || 'ALL');

  const [templates, setTemplates] = useState<TemplateResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [previewTemplate, setPreviewTemplate] = useState<TemplateResponse | null>(null);

  useEffect(() => {
    async function loadTemplates() {
      setLoading(true);
      try {
        const data = await templatesApi.getTemplates({
          category: category !== 'ALL' ? category : undefined,
          templateType: templateType !== 'ALL' ? templateType : undefined,
          styleTag: styleTag !== 'ALL' ? styleTag : undefined,
        });
        setTemplates(data);
      } catch (e) {
        // Fallback default templates if backend is starting
        setTemplates([
          {
            id: 'royal-rajwada-wedding',
            name: 'Royal Rajwada Palace Suite',
            category: 'WEDDING',
            templateType: 'ANIMATED',
            styleTag: 'ROYAL',
            description:
              'Opulent imperial ruby and antique gold palace aesthetics with majestic double door parting and wax seal reveal.',
            thumbnailUrl:
              'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80',
            previewAnimationUrl: '',
            defaultPreset: 'royal-curtain-doors',
            supportedPresets: ['royal-curtain-doors', 'envelope-reveal', 'modern-cinematic'],
            defaultDesignConfig: JSON.stringify({
              primaryColor: '#8B1E2E',
              secondaryColor: '#D4AF37',
              backgroundColor: '#140609',
              titleFont: 'Cinzel Decorative',
              bodyFont: 'Outfit',
            }),
            defaultAnimationConfig: JSON.stringify({
              version: 1,
              preset: 'royal-curtain-doors',
              intensity: 'balanced',
              interaction: 'tap-to-open',
              enableParticles: true,
              particleType: 'gold-dust',
              particleCount: 26,
              allowReplay: true,
              reducedMotionFallback: true,
              steps: [],
            }),
            supportedMediaTypes: ['image', 'video', 'audio'],
            isPremium: true,
            isPublished: true,
            version: 1,
          },
          {
            id: 'botanical-bloom-romance',
            name: 'Botanical Bloom & Vines',
            category: 'ENGAGEMENT',
            templateType: 'ANIMATED',
            styleTag: 'FLORAL',
            description:
              'Whimsical hand-drawn vines that grow and bloom around the invitation with soft falling rose petals.',
            thumbnailUrl:
              'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=600&q=80',
            previewAnimationUrl: '',
            defaultPreset: 'botanical-bloom',
            supportedPresets: ['botanical-bloom', 'envelope-reveal'],
            defaultDesignConfig: JSON.stringify({
              primaryColor: '#C98686',
              secondaryColor: '#6E8070',
              backgroundColor: '#FAF6F2',
              titleFont: 'Playfair Display',
              bodyFont: 'Inter',
            }),
            defaultAnimationConfig: JSON.stringify({
              version: 1,
              preset: 'botanical-bloom',
              intensity: 'balanced',
              interaction: 'auto-open',
              enableParticles: true,
              particleType: 'rose-petals',
              particleCount: 18,
              allowReplay: true,
              reducedMotionFallback: true,
              steps: [],
            }),
            supportedMediaTypes: ['image', 'audio'],
            isPremium: false,
            isPublished: true,
            version: 1,
          },
          {
            id: 'golden-glamour-birthday',
            name: 'Golden Glamour Birthday Fiesta',
            category: 'BIRTHDAY',
            templateType: 'ANIMATED',
            styleTag: 'PLAYFUL',
            description:
              'Vibrant celebratory pop with shimmering gold confetti bursts, lively typography, and interactive photo slideshow.',
            thumbnailUrl:
              'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=600&q=80',
            previewAnimationUrl: '',
            defaultPreset: 'celebration-pop',
            supportedPresets: ['celebration-pop', 'envelope-reveal'],
            defaultDesignConfig: JSON.stringify({
              primaryColor: '#F4A226',
              secondaryColor: '#E76F51',
              backgroundColor: '#12151E',
              titleFont: 'Outfit',
              bodyFont: 'Inter',
            }),
            defaultAnimationConfig: JSON.stringify({
              version: 1,
              preset: 'celebration-pop',
              intensity: 'expressive',
              interaction: 'tap-to-open',
              enableParticles: true,
              particleType: 'confetti',
              particleCount: 35,
              allowReplay: true,
              reducedMotionFallback: true,
              steps: [],
            }),
            supportedMediaTypes: ['image', 'video', 'audio'],
            isPremium: false,
            isPublished: true,
            version: 1,
          },
          {
            id: 'classic-wax-seal-wedding',
            name: 'Classic Wax Seal Keepsake',
            category: 'WEDDING',
            templateType: 'ANIMATED',
            styleTag: 'TRADITIONAL',
            description:
              'Vintage embossed envelope with authentic cracking wax seal that unfolds into a 3D elevated wedding invitation card.',
            thumbnailUrl:
              'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=600&q=80',
            previewAnimationUrl: '',
            defaultPreset: 'envelope-reveal',
            supportedPresets: ['envelope-reveal', 'royal-curtain-doors'],
            defaultDesignConfig: JSON.stringify({
              primaryColor: '#A12C2F',
              secondaryColor: '#C5A059',
              backgroundColor: '#F7F4EE',
              titleFont: 'Playfair Display',
              bodyFont: 'Inter',
            }),
            defaultAnimationConfig: JSON.stringify({
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
            }),
            supportedMediaTypes: ['image', 'video', 'audio'],
            isPremium: false,
            isPublished: true,
            version: 1,
          },
          {
            id: 'modern-minimalist-chic',
            name: 'Modern Minimalist Chic',
            category: 'ANNIVERSARY',
            templateType: 'STATIC',
            styleTag: 'MINIMALIST',
            description:
              'Ultra-clean contemporary typography, crisp generous whitespace, and instant access designed for modern couples.',
            thumbnailUrl:
              'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=600&q=80',
            previewAnimationUrl: '',
            defaultPreset: 'none',
            supportedPresets: ['none'],
            defaultDesignConfig: JSON.stringify({
              primaryColor: '#1A1A1A',
              secondaryColor: '#737373',
              backgroundColor: '#FFFFFF',
              titleFont: 'Outfit',
              bodyFont: 'Inter',
            }),
            defaultAnimationConfig: JSON.stringify({
              version: 1,
              preset: 'none',
              intensity: 'subtle',
              interaction: 'auto-open',
              enableParticles: false,
              allowReplay: false,
              reducedMotionFallback: true,
              steps: [],
            }),
            supportedMediaTypes: ['image'],
            isPremium: false,
            isPublished: true,
            version: 1,
          },
          {
            id: 'griha-pravesh-auspicious',
            name: 'Shubh Griha Pravesh & Pooja',
            category: 'HOUSEWARMING',
            templateType: 'ANIMATED',
            styleTag: 'TRADITIONAL',
            description:
              'Warm auspicious marigold toran, glowing diya lanterns, and welcoming ceremonial doors for blessed new beginnings.',
            thumbnailUrl:
              'https://images.unsplash.com/photo-1609137144813-7d9921338f24?auto=format&fit=crop&w=600&q=80',
            previewAnimationUrl: '',
            defaultPreset: 'royal-curtain-doors',
            supportedPresets: ['royal-curtain-doors', 'envelope-reveal'],
            defaultDesignConfig: JSON.stringify({
              primaryColor: '#E65100',
              secondaryColor: '#FFB300',
              backgroundColor: '#FFFDE7',
              titleFont: 'Cinzel Decorative',
              bodyFont: 'Outfit',
            }),
            defaultAnimationConfig: JSON.stringify({
              version: 1,
              preset: 'royal-curtain-doors',
              intensity: 'balanced',
              interaction: 'tap-to-open',
              enableParticles: true,
              particleType: 'gold-dust',
              particleCount: 20,
              allowReplay: true,
              reducedMotionFallback: true,
              steps: [],
            }),
            supportedMediaTypes: ['image', 'audio'],
            isPremium: false,
            isPublished: true,
            version: 1,
          },
        ]);
      } finally {
        setLoading(false);
      }
    }

    loadTemplates();
  }, [category, templateType, styleTag]);

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-3">
        <span className="text-xs uppercase tracking-widest text-royal-gold font-serif font-semibold">
          Curated Design Collection
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white">
          Invitation Template Gallery
        </h1>
        <p className="text-sm text-gray-400 font-sans max-w-2xl mx-auto">
          Explore handcrafted Indian celebration suites and contemporary minimalist cards. Preview
          the opening animation live before personalizing.
        </p>
      </div>

      {/* Filter Controls Bar */}
      <div className="space-y-4 rounded-3xl border border-royal-gold/30 bg-royal-dark/80 p-5 shadow-xl backdrop-blur-md">
        {/* Category Pills - Horizontal scroll on mobile */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar scrollbar-none pb-1 sm:flex-wrap">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setCategory(cat.id)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-sans font-medium whitespace-nowrap shrink-0 transition-all ${
                category === cat.id
                  ? 'bg-royal-gold text-royal-dark font-bold shadow-gold'
                  : 'text-gray-300 hover:text-white bg-white/5 hover:bg-white/10'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Format & Style Secondary Filters */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 pt-3 border-t border-white/10 text-xs">
          {/* Format Type */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar scrollbar-none w-full sm:w-auto pb-0.5">
            <span className="text-gray-400 font-medium shrink-0">Format:</span>
            {TEMPLATE_TYPES.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTemplateType(t.id)}
                className={`rounded-lg px-2.5 py-1 font-medium whitespace-nowrap shrink-0 transition-all ${
                  templateType === t.id
                    ? 'bg-royal-ruby text-white font-bold'
                    : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Style Tag */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar scrollbar-none w-full sm:w-auto pb-0.5">
            <span className="text-gray-400 font-medium shrink-0">Style:</span>
            {STYLES.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setStyleTag(s.id)}
                className={`rounded-lg px-2.5 py-1 font-medium whitespace-nowrap shrink-0 transition-all ${
                  styleTag === s.id
                    ? 'bg-white/20 text-white font-bold'
                    : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Templates Grid */}
      {loading ? (
        <div className="py-20 text-center text-royal-champagne font-serif text-lg animate-pulse">
          Loading curated templates...
        </div>
      ) : templates.length === 0 ? (
        <div className="rounded-3xl border border-white/10 bg-white/5 py-16 text-center space-y-3">
          <p className="font-serif text-lg text-white">No templates match the selected filters.</p>
          <button
            type="button"
            onClick={() => {
              setCategory('ALL');
              setTemplateType('ALL');
              setStyleTag('ALL');
            }}
            className="text-xs text-royal-gold hover:underline"
          >
            Reset all filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((tmpl) => (
            <div
              key={tmpl.id}
              className="group relative flex flex-col rounded-3xl border border-royal-gold/25 bg-royal-dark/90 overflow-hidden shadow-lg transition-all hover:border-royal-gold/60 hover:-translate-y-1 hover:shadow-gold"
            >
              {/* Image Preview & Badges */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-black/60">
                <img
                  src={tmpl.thumbnailUrl}
                  alt={tmpl.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />

                {/* Format Badge */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                  <span
                    className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider backdrop-blur-md shadow-sm ${
                      tmpl.templateType === 'ANIMATED'
                        ? 'bg-royal-ruby/90 text-white border border-royal-gold/40'
                        : 'bg-black/70 text-gray-200 border border-white/20'
                    }`}
                  >
                    {tmpl.templateType === 'ANIMATED' ? '✨ Animated' : '📄 Static'}
                  </span>
                  {tmpl.isPremium && (
                    <span className="rounded-full bg-royal-gold/90 text-royal-dark px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider shadow-sm">
                      Royal Suite
                    </span>
                  )}
                </div>

                {/* Opening Preset Tag */}
                <div className="absolute bottom-3 left-3">
                  <span className="rounded-full bg-black/75 backdrop-blur-md border border-white/20 px-2.5 py-0.5 text-[10px] text-royal-champagne font-sans">
                    Preset: {tmpl.defaultPreset}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="flex flex-1 flex-col p-4 sm:p-6 space-y-3">
                <div className="flex items-center justify-between text-[11px] uppercase tracking-widest text-royal-gold font-sans font-semibold">
                  <span>{tmpl.category}</span>
                  <span className="text-gray-400 lowercase">{tmpl.styleTag}</span>
                </div>

                <h3 className="font-serif text-lg sm:text-xl font-bold text-white group-hover:text-royal-champagne transition-colors line-clamp-1">
                  {tmpl.name}
                </h3>

                <p className="text-xs text-gray-400 font-sans leading-relaxed line-clamp-2">
                  {tmpl.description}
                </p>

                {/* Actions: Live Preview & Use Template */}
                <div className="pt-3 sm:pt-4 mt-auto flex items-center gap-2 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setPreviewTemplate(tmpl)}
                    className="flex-1 flex items-center justify-center gap-1 sm:gap-1.5 rounded-xl border border-white/20 bg-white/5 py-2 sm:py-2.5 text-xs font-semibold text-white hover:bg-white/10 transition-colors"
                  >
                    <Eye className="h-3.5 w-3.5 text-royal-gold" />
                    <span>Preview</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => router.push(`/editor?templateId=${tmpl.id}`)}
                    className="flex-1 flex items-center justify-center gap-1 sm:gap-1.5 rounded-xl bg-gradient-to-r from-royal-gold to-royal-champagne py-2 sm:py-2.5 text-xs font-bold text-royal-dark shadow-gold hover:opacity-95 active:scale-95 transition-all"
                  >
                    <span>Use Template</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Preview */}
      {previewTemplate && (
        <AnimationPreviewModal
          template={previewTemplate}
          onClose={() => setPreviewTemplate(null)}
          onSelect={() => {
            router.push(`/editor?templateId=${previewTemplate.id}`);
          }}
        />
      )}
    </div>
  );
}

export default function TemplateGalleryPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-royal-champagne font-serif">Loading gallery...</div>}>
      <TemplateGalleryContent />
    </Suspense>
  );
}
