'use client';

import React, { useEffect, useState, useMemo, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { templatesApi } from '@/lib/api';
import { TemplateResponse, EventCategory, TemplateType } from '@/types';
import { CURATED_TEMPLATES } from '@/lib/curatedTemplates';
import { AnimationPreviewModal } from '@/features/animations/components/AnimationPreview';
import { Sparkles, Eye, ArrowRight, Filter, Check, Search, X } from 'lucide-react';

const CATEGORIES: { id: string; label: string; icon: string }[] = [
  { id: 'ALL', label: 'All Celebrations', icon: '✨' },
  { id: 'WEDDING', label: 'Wedding Suites', icon: '💍' },
  { id: 'ENGAGEMENT', label: 'Engagement & Rings', icon: '💎' },
  { id: 'BIRTHDAY', label: 'Birthday Fiesta', icon: '🎂' },
  { id: 'HOUSEWARMING', label: 'Griha Pravesh', icon: '🪔' },
  { id: 'ANNIVERSARY', label: 'Anniversary', icon: '🥂' },
  { id: 'BABY_SHOWER', label: 'Baby Shower', icon: '🍼' },
  { id: 'FESTIVAL', label: 'Festivals & Pooja', icon: '🎆' },
];

const TEMPLATE_TYPES: { id: string; label: string }[] = [
  { id: 'ALL', label: 'All Formats' },
  { id: 'ANIMATED', label: '✨ Animated Invites' },
  { id: 'STATIC', label: '📄 Static Cards' },
];

const STYLES: { id: string; label: string }[] = [
  { id: 'ALL', label: 'All Styles' },
  { id: 'ROYAL', label: 'Royal Palace' },
  { id: 'TRADITIONAL', label: 'Traditional' },
  { id: 'FLORAL', label: 'Botanical Floral' },
  { id: 'PLAYFUL', label: 'Playful Fiesta' },
  { id: 'MINIMALIST', label: 'Modern Minimal' },
];

function TemplateGalleryContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [category, setCategory] = useState<string>(searchParams.get('category') || 'ALL');
  const [templateType, setTemplateType] = useState<string>(searchParams.get('templateType') || 'ALL');
  const [styleTag, setStyleTag] = useState<string>(searchParams.get('styleTag') || 'ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [allTemplates, setAllTemplates] = useState<TemplateResponse[]>(CURATED_TEMPLATES);
  const [loading, setLoading] = useState(false);
  const [previewTemplate, setPreviewTemplate] = useState<TemplateResponse | null>(null);

  useEffect(() => {
    async function loadTemplates() {
      try {
        const data = await templatesApi.getTemplates({});
        if (data && data.length > 0) {
          // Add backend templates first
          data.forEach((t) => idMap.set(t.id, t));
          // Overlay curated templates so high-resolution thumbnails and rich configs take precedence
          CURATED_TEMPLATES.forEach((t) => {
            const backend = idMap.get(t.id);
            idMap.set(t.id, backend ? { ...backend, ...t } : t);
          });
          setAllTemplates(Array.from(idMap.values()));
        }
      } catch (e) {
        // Fallback to curated templates
        setAllTemplates(CURATED_TEMPLATES);
      }
    }

    loadTemplates();
  }, []);

  // Filter templates based on category, format, style, and search query
  const filteredTemplates = useMemo(() => {
    return allTemplates.filter((t) => {
      // Category filter
      if (category !== 'ALL' && t.category !== category) {
        return false;
      }
      // Template type filter
      if (templateType !== 'ALL' && t.templateType !== templateType) {
        return false;
      }
      // Style tag filter
      if (styleTag !== 'ALL' && t.styleTag !== styleTag) {
        return false;
      }
      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = t.name.toLowerCase().includes(q);
        const matchesCategory = t.category.toLowerCase().includes(q);
        const matchesDesc = t.description?.toLowerCase().includes(q);
        const matchesStyle = t.styleTag.toLowerCase().includes(q);
        if (!matchesName && !matchesCategory && !matchesDesc && !matchesStyle) {
          return false;
        }
      }
      return true;
    });
  }, [allTemplates, category, templateType, styleTag, searchQuery]);

  // Dynamic counts for category tabs
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { ALL: allTemplates.length };
    CATEGORIES.forEach((c) => {
      if (c.id !== 'ALL') {
        counts[c.id] = allTemplates.filter((t) => t.category === c.id).length;
      }
    });
    return counts;
  }, [allTemplates]);

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* Gallery Hero Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-royal-gold/30 bg-royal-gold/10 px-4 py-1 text-xs font-serif font-semibold text-royal-champagne">
          <Sparkles className="h-3.5 w-3.5 text-royal-gold" />
          <span>Curated Invitation Suites</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight">
          Celebration Template <span className="text-royal-gold">Gallery</span>
        </h1>
        <p className="text-xs sm:text-sm text-gray-300 font-sans max-w-2xl mx-auto leading-relaxed">
          Explore handcrafted animated digital invitations designed specifically for each celebration.
          Preview live entrance animations before personalizing.
        </p>
      </div>

      {/* Filter Controls Bar */}
      <div className="space-y-4 rounded-3xl border border-royal-gold/30 bg-royal-dark/90 p-4 sm:p-6 shadow-xl backdrop-blur-md">
        {/* Search Bar */}
        <div className="relative">
          <Search className="pointer-events-none absolute left-3.5 top-3 h-4 w-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search templates by name, style, or celebration occasion..."
            className="w-full rounded-2xl border border-white/10 bg-white/5 pl-10 pr-9 py-2.5 text-xs sm:text-sm text-white placeholder-gray-500 focus:border-royal-gold focus:outline-none transition-colors"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-3 text-gray-400 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Category Pills with Icon and Count Badges */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar scrollbar-none pb-1 sm:flex-wrap">
          {CATEGORIES.map((cat) => {
            const count = categoryCounts[cat.id] || 0;
            const isSelected = category === cat.id;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setCategory(cat.id)}
                className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-sans whitespace-nowrap shrink-0 transition-all ${
                  isSelected
                    ? 'bg-gradient-to-r from-royal-gold to-royal-champagne text-royal-dark font-bold shadow-gold scale-105'
                    : 'text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/5'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] rounded-full px-1.5 py-0.2 ${
                    isSelected ? 'bg-royal-dark/20 text-royal-dark' : 'bg-white/10 text-gray-400'
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
            <span className="text-gray-400 font-medium shrink-0">Format:</span>
            {TEMPLATE_TYPES.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTemplateType(t.id)}
                className={`rounded-xl px-2.5 py-1 font-medium whitespace-nowrap shrink-0 transition-all ${
                  templateType === t.id
                    ? 'bg-royal-ruby text-white font-bold border border-royal-gold/40'
                    : 'text-gray-400 hover:text-gray-200 bg-white/5'
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

      {/* Templates Count and Grid */}
      <div className="flex items-center justify-between text-xs text-gray-400 px-1">
        <span>Showing {filteredTemplates.length} celebration suites</span>
        {(category !== 'ALL' || templateType !== 'ALL' || styleTag !== 'ALL' || searchQuery) && (
          <button
            type="button"
            onClick={() => {
              setCategory('ALL');
              setTemplateType('ALL');
              setStyleTag('ALL');
              setSearchQuery('');
            }}
            className="text-royal-gold hover:underline"
          >
            Clear all filters
          </button>
        )}
      </div>

      {filteredTemplates.length === 0 ? (
        <div className="rounded-3xl border border-white/10 bg-white/5 py-16 text-center space-y-3">
          <p className="font-serif text-lg text-white">No templates match the selected filters.</p>
          <button
            type="button"
            onClick={() => {
              setCategory('ALL');
              setTemplateType('ALL');
              setStyleTag('ALL');
              setSearchQuery('');
            }}
            className="text-xs text-royal-gold hover:underline font-semibold"
          >
            Reset all filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((tmpl) => (
            <div
              key={tmpl.id}
              className="group relative flex flex-col rounded-3xl border border-royal-gold/25 bg-royal-dark/90 overflow-hidden shadow-lg transition-all hover:border-royal-gold/60 hover:-translate-y-1 hover:shadow-gold"
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
