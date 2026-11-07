'use client';

import React, { useEffect, useState, useMemo, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { templatesApi } from '@/lib/api';
import { TemplateResponse, EventCategory, TemplateType } from '@/types';
import { CURATED_TEMPLATES } from '@/lib/curatedTemplates';
import { AnimationPreviewModal } from '@/features/animations/components/AnimationPreview';
import { Sparkles, Eye, ArrowRight, Filter, Check, Search, X } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

function TemplateGalleryContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t, locale, formatNumber } = useLanguage();

  const [category, setCategory] = useState<string>(searchParams.get('category') || 'ALL');
  const [templateType, setTemplateType] = useState<string>(searchParams.get('templateType') || 'ALL');
  const [styleTag, setStyleTag] = useState<string>(searchParams.get('styleTag') || 'ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [allTemplates, setAllTemplates] = useState<TemplateResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [previewTemplate, setPreviewTemplate] = useState<TemplateResponse | null>(null);

  const categories = [
    { id: 'ALL', label: t('categories.all'), icon: '✨' },
    { id: 'WEDDING', label: t('categories.wedding'), icon: '💍' },
    { id: 'ENGAGEMENT', label: t('categories.engagement'), icon: '💎' },
    { id: 'BIRTHDAY', label: t('categories.birthday'), icon: '🎂' },
    { id: 'HOUSEWARMING', label: t('categories.housewarming'), icon: '🪔' },
    { id: 'ANNIVERSARY', label: t('categories.anniversary'), icon: '🥂' },
    { id: 'BABY_SHOWER', label: t('categories.babyShower'), icon: '🍼' },
    { id: 'FESTIVAL', label: t('categories.festival'), icon: '🎆' },
  ];

  const templateTypes = [
    { id: 'ALL', label: t('templateTypes.all') },
    { id: 'ANIMATED', label: t('templateTypes.animated') },
    { id: 'STATIC', label: t('templateTypes.static') },
  ];

  const styles = [
    { id: 'ALL', label: t('styles.all') },
    { id: 'ROYAL', label: t('styles.royal') },
    { id: 'TRADITIONAL', label: t('styles.traditional') },
    { id: 'FLORAL', label: t('styles.floral') },
    { id: 'PLAYFUL', label: t('styles.playful') },
    { id: 'MINIMALIST', label: t('styles.minimalist') },
  ];

  const getPresetLabel = (presetId?: string) => {
    switch (presetId) {
      case 'royal-curtain-doors':
        return locale === 'mr' ? 'राजवाडा महाद्वार' : locale === 'hi' ? 'शाही महल द्वार' : 'Royal Palace Doors';
      case 'envelope-reveal':
        return locale === 'mr' ? 'मेणाची राजमुद्रा' : locale === 'hi' ? 'वैक्स सील लिफाफा' : 'Wax Seal Envelope';
      case 'botanical-bloom':
        return locale === 'mr' ? 'पुष्पवाटिका' : locale === 'hi' ? 'पुष्प वाटिका' : 'Botanical Bloom';
      case 'celebration-pop':
        return locale === 'mr' ? 'रंगबिरंगी उत्सव' : locale === 'hi' ? 'उत्सव कन्फ़ेटी' : 'Celebration Pop';
      case 'modern-cinematic':
        return locale === 'mr' ? 'आधुनिक सिनेमा' : locale === 'hi' ? 'आधुनिक सिनेमाई' : 'Modern Cinematic';
      default:
        return locale === 'mr' ? 'क्लासिक पत्रिका' : locale === 'hi' ? 'क्लासिक पत्रिका' : 'Classic Invite';
    }
  };

  const getCategoryLabel = (cat: string) => {
    switch (cat.toUpperCase()) {
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

  const getStyleLabel = (style: string) => {
    switch (style.toUpperCase()) {
      case 'ROYAL':
        return t('styles.royal');
      case 'TRADITIONAL':
        return t('styles.traditional');
      case 'FLORAL':
        return t('styles.floral');
      case 'PLAYFUL':
        return t('styles.playful');
      case 'MINIMALIST':
        return t('styles.minimalist');
      default:
        return style;
    }
  };

  useEffect(() => {
    async function loadTemplates() {
      setLoading(true);
      try {
        const data = await templatesApi.getTemplates({});
        if (data && data.length > 0) {
          const enriched = data.map((t) => {
            const curated = CURATED_TEMPLATES.find((c) => c.id === t.id);
            if (!curated) return t;
            return {
              ...t,
              thumbnailUrl:
                !t.thumbnailUrl || t.thumbnailUrl.startsWith('/')
                  ? curated.thumbnailUrl
                  : t.thumbnailUrl,
              defaultAnimationConfig:
                !t.defaultAnimationConfig || t.defaultAnimationConfig === '{}'
                  ? curated.defaultAnimationConfig
                  : t.defaultAnimationConfig,
              defaultDesignConfig:
                !t.defaultDesignConfig || t.defaultDesignConfig === '{}'
                  ? curated.defaultDesignConfig
                  : t.defaultDesignConfig,
            };
          });
          setAllTemplates(enriched);
        } else {
          setAllTemplates(CURATED_TEMPLATES);
        }
      } catch (err) {
        setAllTemplates(CURATED_TEMPLATES);
      } finally {
        setLoading(false);
      }
    }
    loadTemplates();
  }, []);

  const filteredTemplates = useMemo(() => {
    return allTemplates.filter((item) => {
      if (category !== 'ALL' && item.category !== category) return false;
      if (templateType !== 'ALL' && item.templateType !== templateType) return false;
      if (styleTag !== 'ALL' && item.styleTag !== styleTag) return false;
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesDesc = (item.description || '').toLowerCase().includes(query);
        const matchesCat = item.category.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc && !matchesCat) return false;
      }
      return true;
    });
  }, [allTemplates, category, templateType, styleTag, searchQuery]);

  return (
    <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8 sm:space-y-10">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/40 bg-amber-400/10 px-3.5 py-1 text-xs font-serif text-amber-200 uppercase font-semibold">
          <Sparkles className="h-3.5 w-3.5 text-amber-400" />
          <span>{t('templatesPage.badge')}</span>
        </div>
        <h1 className="font-serif text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
          {t('templatesPage.title')}
        </h1>
        <p className="text-xs sm:text-sm md:text-base font-sans text-gray-300 leading-relaxed max-w-2xl mx-auto">
          {t('templatesPage.subtitle')}
        </p>
      </div>

      {/* Filter and Search Bar Container */}
      <div className="rounded-3xl border border-[#D4AF37]/30 bg-[#120B0F]/90 p-4 sm:p-6 shadow-xl backdrop-blur-md space-y-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="pointer-events-none absolute left-3.5 top-3 h-4 w-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('templatesPage.searchPlaceholder')}
            className="w-full rounded-2xl border border-white/10 bg-white/5 py-2.5 pl-10 pr-10 text-xs sm:text-sm text-white placeholder-gray-500 focus:border-[#D4AF37]/70 focus:outline-none focus:ring-1 focus:ring-[#D4AF37]/70"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-3 text-gray-400 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Primary Occasions Filter - Horizontal Scrollable on Mobile */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar scrollbar-none pb-1">
          {categories.map((c) => {
            const isSelected = category === c.id;
            const count =
              c.id === 'ALL'
                ? allTemplates.length
                : allTemplates.filter((t) => t.category === c.id).length;

            return (
              <button
                key={c.id}
                type="button"
                onClick={() => setCategory(c.id)}
                className={`flex items-center gap-1.5 rounded-full px-3.5 sm:px-4 py-1.5 text-xs font-sans font-medium whitespace-nowrap shrink-0 transition-all ${
                  isSelected
                    ? 'bg-[#D4AF37] text-gray-950 font-bold shadow-md scale-105'
                    : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white border border-white/10'
                }`}
              >
                <span>{c.icon}</span>
                <span>{c.label}</span>
                <span
                  className={`ml-1 text-[10px] rounded-full px-1.5 py-0.2 ${
                    isSelected ? 'bg-black/20 text-gray-950 font-bold' : 'bg-white/10 text-gray-400'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Format & Style Secondary Filters */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 pt-3 border-t border-white/10 text-xs">
          {/* Format Type */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar scrollbar-none w-full sm:w-auto pb-0.5">
            <span className="text-gray-400 font-medium shrink-0">
              {locale === 'mr' ? 'प्रकार:' : locale === 'hi' ? 'प्रारूप:' : 'Format:'}
            </span>
            {templateTypes.map((tItem) => (
              <button
                key={tItem.id}
                type="button"
                onClick={() => setTemplateType(tItem.id)}
                className={`rounded-xl px-2.5 py-1 font-medium whitespace-nowrap shrink-0 transition-all ${
                  templateType === tItem.id
                    ? 'bg-[#851424] text-white font-bold border border-[#D4AF37]/50'
                    : 'text-gray-400 hover:text-gray-200 bg-white/5'
                }`}
              >
                {tItem.label}
              </button>
            ))}
          </div>

          {/* Style Tag */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar scrollbar-none w-full sm:w-auto pb-0.5">
            <span className="text-gray-400 font-medium shrink-0">
              {locale === 'mr' ? 'शैली:' : locale === 'hi' ? 'शैली:' : 'Style:'}
            </span>
            {styles.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setStyleTag(s.id)}
                className={`rounded-xl px-2.5 py-1 font-medium whitespace-nowrap shrink-0 transition-all ${
                  styleTag === s.id
                    ? 'bg-white/20 text-white font-bold border border-white/30'
                    : 'text-gray-400 hover:text-gray-200 bg-white/5'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Templates Count */}
      <div className="flex items-center justify-between text-xs text-gray-400 px-1">
        <span>
          {loading
            ? t('common.loading')
            : `${filteredTemplates.length} ${t('templatesPage.resultsCount')}`}
        </span>
        {(category !== 'ALL' || templateType !== 'ALL' || styleTag !== 'ALL' || searchQuery) && (
          <button
            type="button"
            onClick={() => {
              setCategory('ALL');
              setTemplateType('ALL');
              setStyleTag('ALL');
              setSearchQuery('');
            }}
            className="text-amber-300 hover:underline"
          >
            {t('templatesPage.resetFilters')}
          </button>
        )}
      </div>

      {/* Loading Skeleton */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-3xl border border-white/10 bg-[#160B0E]/60 overflow-hidden animate-pulse">
              <div className="aspect-[4/3] w-full bg-white/5" />
              <div className="p-5 space-y-3">
                <div className="h-3 w-20 bg-white/10 rounded-full" />
                <div className="h-5 w-3/4 bg-white/10 rounded-full" />
                <div className="h-3 w-full bg-white/5 rounded-full" />
                <div className="h-3 w-2/3 bg-white/5 rounded-full" />
                <div className="flex gap-2 pt-2">
                  <div className="h-9 flex-1 bg-white/10 rounded-xl" />
                  <div className="h-9 flex-1 bg-[#D4AF37]/20 rounded-xl" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : filteredTemplates.length === 0 ? (
        <div className="rounded-3xl border border-white/10 bg-white/5 py-16 text-center space-y-3">
          <p className="font-serif text-lg text-white">{t('templatesPage.noResults')}</p>
          <button
            type="button"
            onClick={() => {
              setCategory('ALL');
              setTemplateType('ALL');
              setStyleTag('ALL');
              setSearchQuery('');
            }}
            className="text-xs text-amber-300 hover:underline font-semibold"
          >
            {t('templatesPage.resetFilters')}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((tmpl) => (
            <div
              key={tmpl.id}
              className="group relative flex flex-col rounded-3xl border-2 border-[#D4AF37]/35 bg-gradient-to-b from-[#1E0D12] via-[#14070A] to-[#0D0406] overflow-hidden shadow-lg transition-all hover:border-[#D4AF37]/70 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(212,175,55,0.25)]"
            >
              {/* Image Preview & Badges */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-black/60">
                <img
                  src={tmpl.thumbnailUrl || 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80'}
                  alt={tmpl.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80';
                  }}
                />

                {/* Format Badge */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                  <span
                    className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider backdrop-blur-md shadow-sm ${
                      tmpl.templateType === 'ANIMATED'
                        ? 'bg-[#851424]/95 text-white border border-[#D4AF37]/50'
                        : 'bg-black/75 text-gray-200 border border-white/20'
                    }`}
                  >
                    {tmpl.templateType === 'ANIMATED' ? '✨ ' + t('templateTypes.animated') : '📄 ' + t('templateTypes.static')}
                  </span>
                  {tmpl.isPremium && (
                    <span className="rounded-full bg-[#D4AF37] text-gray-950 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider shadow-sm">
                      {t('templatesPage.premium')}
                    </span>
                  )}
                </div>

                {/* Opening Preset Tag */}
                <div className="absolute bottom-3 left-3">
                  <span className="rounded-full bg-black/80 backdrop-blur-md border border-[#D4AF37]/40 px-3 py-1 text-[11px] text-amber-200 font-sans font-medium">
                    {getPresetLabel(tmpl.defaultPreset)}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="flex flex-1 flex-col p-4 sm:p-6 space-y-3">
                <div className="flex items-center justify-between text-[11px] uppercase tracking-wider text-amber-300 font-sans font-semibold">
                  <span>{getCategoryLabel(tmpl.category)}</span>
                  <span className="text-gray-400">{getStyleLabel(tmpl.styleTag)}</span>
                </div>

                <h3 className="font-serif text-lg font-bold text-white group-hover:text-amber-200 transition-colors line-clamp-1">
                  {tmpl.name}
                </h3>

                <p className="text-xs text-gray-300 font-sans leading-relaxed line-clamp-2 flex-1">
                  {tmpl.description}
                </p>

                {/* Action Buttons */}
                <div className="pt-2 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setPreviewTemplate(tmpl)}
                    className="flex-1 flex items-center justify-center gap-1.5 rounded-full border border-white/20 bg-white/5 py-2 text-xs font-semibold text-white hover:bg-white/10 active:scale-95 transition-all"
                  >
                    <Eye className="h-3.5 w-3.5" />
                    <span>{t('templatesPage.liveDemo')}</span>
                  </button>

                  <Link
                    href={`/editor?templateId=${tmpl.id}`}
                    className="flex-1 flex items-center justify-center gap-1.5 rounded-full bg-[#D4AF37] hover:bg-[#E5C378] py-2 text-xs font-bold text-gray-950 shadow-md active:scale-95 transition-all"
                  >
                    <span>{t('templatesPage.useTemplate')}</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Animation Preview Modal */}
      {previewTemplate && (
        <AnimationPreviewModal
          template={previewTemplate}
          onClose={() => setPreviewTemplate(null)}
        />
      )}
    </div>
  );
}

export default function TemplatesPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#D4AF37]" />
        </div>
      }
    >
      <TemplateGalleryContent />
    </Suspense>
  );
}
