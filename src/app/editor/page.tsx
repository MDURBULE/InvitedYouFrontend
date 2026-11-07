'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { templatesApi, invitationsApi, mediaApi, getAuthToken } from '@/lib/api';
import {
  TemplateResponse,
  AnimationConfig,
  DesignConfig,
  EventFunction,
  MediaItem,
  AnimationPresetId,
  AnimationIntensity,
} from '@/types';
import { getDefaultAnimationConfig, PRESET_LIBRARY } from '@/features/animations/engine/presetLibrary';
import { AnimatedInvitationRenderer } from '@/features/animations/components/AnimatedInvitationRenderer';
import { CURATED_TEMPLATES } from '@/lib/curatedTemplates';
import { getSampleDataForCategory } from '@/lib/sampleCelebrationData';
import {
  Sparkles,
  Save,
  Globe,
  Eye,
  Plus,
  Trash2,
  Upload,
  Calendar,
  MapPin,
  Music,
  Sliders,
  Check,
  ArrowLeft,
} from 'lucide-react';
import { Suspense } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';

function InvitationEditorContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t, locale } = useLanguage();
  const templateIdParam = searchParams.get('templateId') || 'royal-rajwada-wedding';
  const invitationIdParam = searchParams.get('id');

  const [activeTab, setActiveTab] = useState<'DETAILS' | 'FUNCTIONS' | 'VENUE' | 'MEDIA' | 'ANIMATION'>(
    'DETAILS'
  );

  // Form State
  const [template, setTemplate] = useState<TemplateResponse | null>(null);
  const [title, setTitle] = useState("Siddharth & Ananya's Royal Wedding");
  const [eventCategory, setEventCategory] = useState('WEDDING');
  const [honorees, setHonorees] = useState('Siddharth & Ananya');
  const [hosts, setHosts] = useState('Mr. & Mrs. Sharma & Mr. & Mrs. Verma');
  const [eventDate, setEventDate] = useState('2026-11-21T10:00');
  const [venueName, setVenueName] = useState('The Grand Palace Hall');
  const [venueAddress, setVenueAddress] = useState('Palace Grounds, MG Road, Bengaluru, Karnataka');
  const [googleMapsUrl, setGoogleMapsUrl] = useState('');
  const [musicUrl, setMusicUrl] = useState('');
  const [slug, setSlug] = useState('siddharth-ananya-wedding');

  // Multi-event functions
  const [functions, setFunctions] = useState<EventFunction[]>([
    {
      id: '1',
      name: 'Traditional Sangeet & Mehendi',
      date: '2026-11-20',
      time: '6:30 PM Onwards',
      venueName: 'The Royal Lawn',
      dressCode: 'Vibrant Traditional',
    },
    {
      id: '2',
      name: 'Auspicious Muhurtham Ceremony',
      date: '2026-11-21',
      time: '9:45 AM Auspicious Time',
      venueName: 'Main Kalyana Mandapam',
      dressCode: 'South Indian Silks',
    },
  ]);

  // Media gallery
  const [mediaGallery, setMediaGallery] = useState<MediaItem[]>([
    {
      id: '1',
      url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80',
      caption: 'Couple portrait',
      mediaType: 'image',
    },
    {
      id: '2',
      url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=600&q=80',
      caption: 'Pre-wedding moments',
      mediaType: 'image',
    },
  ]);

  // Animation and Design configurations
  const [animConfig, setAnimConfig] = useState<AnimationConfig>(getDefaultAnimationConfig('royal-curtain-doors'));
  const [designConfig, setDesignConfig] = useState<DesignConfig>({
    primaryColor: '#8B1E2E',
    secondaryColor: '#D4AF37',
    backgroundColor: '#140609',
    titleFont: 'Cinzel Decorative',
    bodyFont: 'Outfit',
  });

  // UI state
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [previewKey, setPreviewKey] = useState(0);
  const [showMobilePreview, setShowMobilePreview] = useState(false);

  // Load Template or Existing Invitation
  useEffect(() => {
    async function loadTemplate() {
      try {
        const data = await templatesApi.getTemplateById(templateIdParam);
        setTemplate(data);
        if (data.defaultAnimationConfig) {
          try {
            setAnimConfig(JSON.parse(data.defaultAnimationConfig));
          } catch {
            // fallback
          }
        }
        if (data.defaultDesignConfig) {
          try {
            setDesignConfig(JSON.parse(data.defaultDesignConfig));
          } catch {
            // fallback
          }
        }
      } catch (err) {
        const curated = CURATED_TEMPLATES.find((t) => t.id === templateIdParam);
        if (curated) {
          setTemplate(curated);
          if (curated.defaultAnimationConfig) {
            try {
              setAnimConfig(JSON.parse(curated.defaultAnimationConfig));
            } catch {
              // fallback
            }
          }
        }
      }
    }
    loadTemplate();
  }, [templateIdParam]);

  useEffect(() => {
    if (!invitationIdParam) return;
    async function loadExisting() {
      try {
        const inv = await invitationsApi.getInvitationById(Number(invitationIdParam));
        setTitle(inv.title);
        setEventCategory(inv.eventCategory);
        setHosts(inv.hosts || '');
        setHonorees(inv.honorees || '');
        if (inv.eventDate) {
          setEventDate(inv.eventDate.substring(0, 16));
        }
        setVenueName(inv.venueName || '');
        setVenueAddress(inv.venueAddress || '');
        setGoogleMapsUrl(inv.googleMapsUrl || '');
        setMusicUrl(inv.musicUrl || '');
        setSlug(inv.slug);

        if (inv.functions) {
          try {
            setFunctions(JSON.parse(inv.functions));
          } catch {
            // fallback
          }
        }
        if (inv.designConfig) {
          try {
            setDesignConfig(JSON.parse(inv.designConfig));
          } catch {
            // fallback
          }
        }
        if (inv.animationConfig) {
          try {
            setAnimConfig(JSON.parse(inv.animationConfig));
          } catch {
            // fallback
          }
        }
        if (inv.mediaGallery) {
          try {
            setMediaGallery(JSON.parse(inv.mediaGallery));
          } catch {
            // fallback
          }
        }
      } catch (e) {
        // failed
      }
    }
    loadExisting();
  }, [invitationIdParam]);

  const handleSave = async (publish: boolean = false) => {
    const token = getAuthToken();
    if (!token) {
      alert(locale === 'mr' ? 'कृपया लॉग इन किंवा साइन अप करा' : locale === 'hi' ? 'कृपया पहले साइन इन करें' : 'Please sign in or create an account to save and publish your invitation.');
      router.push('/auth/login?redirect=/editor');
      return;
    }

    setSaving(true);
    try {
      const payload = {
        templateId: templateIdParam,
        title,
        eventCategory,
        hosts,
        honorees,
        eventDate: eventDate ? new Date(eventDate).toISOString() : undefined,
        venueName,
        venueAddress,
        googleMapsUrl,
        slug,
        functions: JSON.stringify(functions),
        designConfig: JSON.stringify(designConfig),
        animationConfig: JSON.stringify(animConfig),
        mediaGallery: JSON.stringify(mediaGallery),
        musicUrl,
      };

      let result;
      if (invitationIdParam) {
        result = await invitationsApi.updateInvitation(Number(invitationIdParam), payload);
        if (publish) {
          result = await invitationsApi.publishInvitation(Number(invitationIdParam));
        }
      } else {
        result = await invitationsApi.createInvitation(payload);
        if (publish) {
          result = await invitationsApi.publishInvitation(result.id);
        }
      }

      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);

      if (publish && result?.slug) {
        router.push(`/i/${result.slug}`);
      } else if (!invitationIdParam && result?.id) {
        router.push(`/editor?id=${result.id}`);
      }
    } catch (e: any) {
      alert(e.message || 'Failed to save invitation. Please check required fields.');
    } finally {
      setSaving(false);
    }
  };

  const addFunction = () => {
    setFunctions((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        name: locale === 'mr' ? 'नवीन विधी / स्वागत समारंभ' : locale === 'hi' ? 'नई रस्म / रिसेप्शन' : 'New Function / Reception',
        date: '',
        time: '',
        venueName: venueName || '',
        dressCode: '',
      },
    ]);
  };

  const removeFunction = (id: string) => {
    setFunctions((prev) => prev.filter((f) => f.id !== id));
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    try {
      const res = await mediaApi.uploadFile(e.target.files[0], 'image');
      setMediaGallery((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          url: res.url,
          caption: res.fileName,
          mediaType: 'image',
        },
      ]);
    } catch (err: any) {
      alert(err.message || 'File upload failed');
    }
  };

  const handlePresetChange = (preset: AnimationPresetId) => {
    const base = PRESET_LIBRARY[preset];
    setAnimConfig((prev) => ({
      ...base,
      intensity: prev.intensity || 'balanced',
      enableParticles: prev.enableParticles,
    }));
    setPreviewKey((k) => k + 1);
  };

  return (
    <div className="min-h-screen bg-[#0C0D14] flex flex-col">
      {/* Top Studio Bar */}
      <div className="sticky top-0 z-30 flex items-center justify-between border-b border-white/10 bg-royal-dark/95 px-2.5 sm:px-4 py-2.5 sm:py-3 backdrop-blur-md">
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          <button
            type="button"
            onClick={() => router.push('/templates')}
            className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <div className="max-w-[110px] xs:max-w-[160px] sm:max-w-xs md:max-w-md">
            <span className="hidden xs:block text-[10px] uppercase tracking-widest text-royal-gold font-sans font-semibold">
              {invitationIdParam ? t('editor.pageTitleEdit') : t('editor.pageTitleNew')}
            </span>
            <h2 className="font-serif text-xs sm:text-base font-bold text-white truncate">
              {title || 'Celebration Invitation'}
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          {/* Mobile Preview Toggle */}
          <button
            type="button"
            onClick={() => setShowMobilePreview(!showMobilePreview)}
            className="lg:hidden flex items-center gap-1 rounded-full border border-royal-gold/40 bg-royal-gold/15 px-2.5 py-1.5 text-xs font-semibold text-royal-champagne"
          >
            <Eye className="h-3.5 w-3.5 text-royal-gold" />
            <span>{showMobilePreview ? t('common.edit') : t('common.preview')}</span>
          </button>

          <button
            type="button"
            onClick={() => handleSave(false)}
            disabled={saving}
            className="flex items-center gap-1 sm:gap-1.5 rounded-full border border-royal-gold/40 bg-white/5 px-2.5 sm:px-4 py-1.5 text-xs font-semibold text-royal-champagne hover:bg-white/10 transition-colors active:scale-95"
          >
            <Save className="h-3.5 w-3.5" />
            <span>{saving ? '...' : saveSuccess ? '✓ ' + t('common.saved') : t('editor.saveDraftBtn')}</span>
          </button>

          <button
            type="button"
            onClick={() => handleSave(true)}
            disabled={saving}
            className="flex items-center gap-1 sm:gap-1.5 rounded-full bg-gradient-to-r from-royal-gold to-royal-champagne px-2.5 sm:px-5 py-1.5 text-xs font-bold text-royal-dark shadow-gold hover:opacity-95 active:scale-95 transition-all"
          >
            <Globe className="h-3.5 w-3.5" />
            <span>{t('editor.publishBtn')}</span>
          </button>
        </div>
      </div>

      {/* Main Studio Body: Dual-Pane */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
        {/* ========================================================
            LEFT PANE: CONTROLS & TABS (Columns: 5)
        ======================================================== */}
        <div
          className={`lg:col-span-5 border-r border-white/10 bg-[#10111A] flex flex-col h-[calc(100vh-58px)] sm:h-[calc(100vh-65px)] overflow-y-auto ${
            showMobilePreview ? 'hidden lg:flex' : 'flex'
          }`}
        >
          {/* Navigation Tabs */}
          <div className="flex border-b border-white/10 overflow-x-auto no-scrollbar scrollbar-none text-xs font-sans font-medium text-gray-400 bg-black/20">
            {[
              { id: 'DETAILS', label: t('editor.tabDetails') },
              { id: 'FUNCTIONS', label: t('editor.tabFunctions') },
              { id: 'VENUE', label: t('editor.tabVenue') },
              { id: 'MEDIA', label: t('editor.tabMedia') },
              { id: 'ANIMATION', label: t('editor.tabAnimation') },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3 sm:px-4 py-2.5 sm:py-3 whitespace-nowrap transition-colors border-b-2 ${
                  activeTab === tab.id
                    ? 'border-royal-gold text-royal-gold font-bold bg-white/5'
                    : 'border-transparent hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="p-3.5 sm:p-6 space-y-5 sm:space-y-6 flex-1">
            {/* TAB 1: BASIC DETAILS */}
            {activeTab === 'DETAILS' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1">
                    {t('editor.titleLabel')} *
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Wedding Ceremony & Reception"
                    className="w-full rounded-xl border border-white/20 bg-white/5 px-3.5 py-2.5 text-sm text-white placeholder-gray-500 focus:border-royal-gold focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1">
                    {t('editor.categoryLabel')}
                  </label>
                  <select
                    value={eventCategory}
                    onChange={(e) => {
                      const newCat = e.target.value;
                      setEventCategory(newCat);
                      if (!invitationIdParam) {
                        const sample = getSampleDataForCategory(newCat);
                        setTitle(sample.title);
                        setHonorees(sample.honorees);
                        setHosts(sample.hosts);
                        setVenueName(sample.venueName);
                        setVenueAddress(sample.venueAddress);
                        setFunctions(sample.functions);
                        setMediaGallery(sample.mediaGallery);
                      }
                    }}
                    className="w-full rounded-xl border border-white/20 bg-[#1A1C29] px-3.5 py-2.5 text-sm text-white focus:border-royal-gold focus:outline-none"
                  >
                    <option value="WEDDING">{t('categories.wedding')}</option>
                    <option value="ENGAGEMENT">{t('categories.engagement')}</option>
                    <option value="BIRTHDAY">{t('categories.birthday')}</option>
                    <option value="ANNIVERSARY">{t('categories.anniversary')}</option>
                    <option value="HOUSEWARMING">{t('categories.housewarming')}</option>
                    <option value="BABY_SHOWER">{t('categories.babyShower')}</option>
                    <option value="FESTIVAL">{t('categories.festival')}</option>
                    <option value="OTHER">{t('categories.other')}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1">
                    {t('editor.honoreesLabel')} *
                  </label>
                  <input
                    type="text"
                    value={honorees}
                    onChange={(e) => setHonorees(e.target.value)}
                    placeholder={t('editor.honoreesPlaceholder')}
                    className="w-full rounded-xl border border-white/20 bg-white/5 px-3.5 py-2.5 text-sm text-white placeholder-gray-500 focus:border-royal-gold focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1">
                    {t('editor.hostsLabel')}
                  </label>
                  <input
                    type="text"
                    value={hosts}
                    onChange={(e) => setHosts(e.target.value)}
                    placeholder={t('editor.hostsPlaceholder')}
                    className="w-full rounded-xl border border-white/20 bg-white/5 px-3.5 py-2.5 text-sm text-white placeholder-gray-500 focus:border-royal-gold focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1">
                    {t('editor.eventDateLabel')}
                  </label>
                  <input
                    type="datetime-local"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="w-full rounded-xl border border-white/20 bg-white/5 px-3.5 py-2.5 text-sm text-white focus:border-royal-gold focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1">
                    {t('editor.slugLabel')}
                  </label>
                  <div className="flex items-center rounded-xl border border-white/20 bg-white/5 px-3 py-2 text-xs text-gray-400">
                    <span>invitedyou.com/i/</span>
                    <input
                      type="text"
                      value={slug}
                      onChange={(e) =>
                        setSlug(
                          e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '')
                        )
                      }
                      className="flex-1 bg-transparent text-white font-medium focus:outline-none ml-1"
                    />
                  </div>
                  <p className="mt-1 text-[11px] text-gray-400">{t('editor.slugHelp')}</p>
                </div>
              </div>
            )}

            {/* TAB 2: SCHEDULE / FUNCTIONS */}
            {activeTab === 'FUNCTIONS' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-sm font-semibold text-white uppercase tracking-wider">
                    {t('editor.functionsTitle')}
                  </h3>
                  <button
                    type="button"
                    onClick={addFunction}
                    className="flex items-center gap-1 rounded-full border border-royal-gold/40 bg-royal-gold/10 px-3 py-1 text-xs text-royal-champagne hover:bg-royal-gold/20"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>{t('editor.addFunctionBtn')}</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {functions.map((fn, idx) => (
                    <div
                      key={fn.id}
                      className="rounded-2xl border border-white/10 bg-white/5 p-4 space-y-3 relative"
                    >
                      <button
                        type="button"
                        onClick={() => removeFunction(fn.id)}
                        className="absolute right-3 top-3 text-gray-400 hover:text-red-400"
                        title={t('editor.removeFunction')}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>

                      <div>
                        <label className="block text-[11px] text-gray-400 uppercase font-semibold mb-1">
                          {t('editor.functionNameLabel')} #{idx + 1}
                        </label>
                        <input
                          type="text"
                          value={fn.name}
                          onChange={(e) => {
                            const val = e.target.value;
                            setFunctions((prev) =>
                              prev.map((item) =>
                                item.id === fn.id ? { ...item, name: val } : item
                              )
                            );
                          }}
                          className="w-full rounded-lg border border-white/20 bg-black/40 px-3 py-1.5 text-xs text-white"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[11px] text-gray-400 uppercase font-semibold mb-1">
                            {t('editor.functionDateLabel')}
                          </label>
                          <input
                            type="text"
                            value={fn.date || ''}
                            placeholder="e.g. Nov 20, 2026"
                            onChange={(e) => {
                              const val = e.target.value;
                              setFunctions((prev) =>
                                prev.map((item) =>
                                  item.id === fn.id ? { ...item, date: val } : item
                                )
                              );
                            }}
                            className="w-full rounded-lg border border-white/20 bg-black/40 px-3 py-1.5 text-xs text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] text-gray-400 uppercase font-semibold mb-1">
                            {t('editor.functionTimeLabel')}
                          </label>
                          <input
                            type="text"
                            value={fn.time || ''}
                            placeholder="e.g. 9:45 AM"
                            onChange={(e) => {
                              const val = e.target.value;
                              setFunctions((prev) =>
                                prev.map((item) =>
                                  item.id === fn.id ? { ...item, time: val } : item
                                )
                              );
                            }}
                            className="w-full rounded-lg border border-white/20 bg-black/40 px-3 py-1.5 text-xs text-white"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] text-gray-400 uppercase font-semibold mb-1">
                          {t('editor.functionDressLabel')}
                        </label>
                        <input
                          type="text"
                          value={fn.dressCode || ''}
                          placeholder="e.g. Traditional Silks, Festive Brights"
                          onChange={(e) => {
                            const val = e.target.value;
                            setFunctions((prev) =>
                              prev.map((item) =>
                                item.id === fn.id ? { ...item, dressCode: val } : item
                              )
                            );
                          }}
                          className="w-full rounded-lg border border-white/20 bg-black/40 px-3 py-1.5 text-xs text-white"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: VENUE & MAPS */}
            {activeTab === 'VENUE' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1">
                    {t('editor.venueNameLabel')}
                  </label>
                  <input
                    type="text"
                    value={venueName}
                    onChange={(e) => setVenueName(e.target.value)}
                    placeholder="e.g. The Grand Palace & Convention Centre"
                    className="w-full rounded-xl border border-white/20 bg-white/5 px-3.5 py-2.5 text-sm text-white focus:border-royal-gold focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1">
                    {t('editor.venueAddressLabel')}
                  </label>
                  <textarea
                    rows={3}
                    value={venueAddress}
                    onChange={(e) => setVenueAddress(e.target.value)}
                    placeholder="e.g. Palace Grounds, Jayamahal Road, Bengaluru, Karnataka 560006"
                    className="w-full rounded-xl border border-white/20 bg-white/5 px-3.5 py-2.5 text-sm text-white focus:border-royal-gold focus:outline-none resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1">
                    {t('editor.googleMapsUrlLabel')}
                  </label>
                  <input
                    type="url"
                    value={googleMapsUrl}
                    onChange={(e) => setGoogleMapsUrl(e.target.value)}
                    placeholder="https://maps.app.goo.gl/..."
                    className="w-full rounded-xl border border-white/20 bg-white/5 px-3.5 py-2.5 text-sm text-white focus:border-royal-gold focus:outline-none"
                  />
                </div>
              </div>
            )}

            {/* TAB 4: PHOTOS & MEDIA */}
            {activeTab === 'MEDIA' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-sm font-semibold text-white uppercase tracking-wider">
                    {t('editor.mediaTitle')}
                  </h3>
                  <label className="flex items-center gap-1.5 rounded-full bg-royal-gold text-royal-dark px-3 py-1 text-xs font-bold cursor-pointer hover:opacity-90">
                    <Upload className="h-3.5 w-3.5" />
                    <span>{t('editor.addPhotoBtn')}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {mediaGallery.map((m) => (
                    <div
                      key={m.id}
                      className="group relative aspect-square rounded-2xl border border-white/10 bg-white/5 overflow-hidden"
                    >
                      <img src={m.url} alt="Gallery item" className="h-full w-full object-cover" />
                      <button
                        type="button"
                        onClick={() =>
                          setMediaGallery((prev) => prev.filter((item) => item.id !== m.id))
                        }
                        className="absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded-full bg-black/70 text-red-400 hover:text-red-300"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-white/10">
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1">
                    {t('editor.musicUrlLabel')}
                  </label>
                  <input
                    type="url"
                    value={musicUrl}
                    onChange={(e) => setMusicUrl(e.target.value)}
                    placeholder="https://example.com/ceremonial-shehnai.mp3"
                    className="w-full rounded-xl border border-white/20 bg-white/5 px-3.5 py-2.5 text-sm text-white focus:border-royal-gold focus:outline-none"
                  />
                  <p className="mt-1 text-[11px] text-gray-400">
                    {t('editor.musicUrlHelp')}
                  </p>
                </div>
              </div>
            )}

            {/* TAB 5: DEDICATED ANIMATION STUDIO */}
            {activeTab === 'ANIMATION' && (
              <div className="space-y-6">
                <div>
                  <span className="text-xs uppercase tracking-widest text-royal-gold font-serif font-semibold">
                    {t('editor.animationPresetLabel')}
                  </span>
                  <div className="mt-2 grid grid-cols-2 gap-2.5">
                    {[
                      { id: 'envelope-reveal', label: locale === 'mr' ? 'मेणाची राजमुद्रा' : locale === 'hi' ? 'वैक्स सील लिफाफा' : 'Wax Seal Envelope', desc: 'Fold & slide card' },
                      { id: 'royal-curtain-doors', label: locale === 'mr' ? 'राजवाडा महाद्वार' : locale === 'hi' ? 'शाही महल द्वार' : 'Royal Palace Doors', desc: '3D door parting' },
                      { id: 'botanical-bloom', label: locale === 'mr' ? 'पुष्पवाटिका' : locale === 'hi' ? 'पुष्प वाटिका' : 'Botanical Bloom', desc: 'Growing vines & petals' },
                      { id: 'celebration-pop', label: locale === 'mr' ? 'रंगबिरंगी उत्सव' : locale === 'hi' ? 'उत्सव कन्फ़ेटी' : 'Celebration Pop', desc: 'Festive confetti burst' },
                      { id: 'modern-cinematic', label: locale === 'mr' ? 'आधुनिक सिनेमा' : locale === 'hi' ? 'आधुनिक सिनेमाई' : 'Modern Cinematic', desc: 'Hero photo fade' },
                      { id: 'none', label: locale === 'mr' ? 'साधे (अ‍ॅनिमेशन नाही)' : locale === 'hi' ? 'स्थिर (एनिमेशन रहित)' : 'Static (No Opening)', desc: 'Instant card display' },
                    ].map((preset) => (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => handlePresetChange(preset.id as any)}
                        className={`rounded-2xl border p-3 text-left transition-all ${
                          animConfig.preset === preset.id
                            ? 'border-royal-gold bg-royal-gold/15 text-royal-champagne shadow-gold'
                            : 'border-white/10 bg-white/5 text-gray-300 hover:border-white/20'
                        }`}
                      >
                        <span className="block text-xs font-bold font-serif">{preset.label}</span>
                        <span className="block text-[10px] text-gray-400 mt-0.5">{preset.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Animation Intensity */}
                {animConfig.preset !== 'none' && (
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                      {t('editor.animationIntensityLabel')}
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {(['subtle', 'balanced', 'expressive'] as AnimationIntensity[]).map((tier) => (
                        <button
                          key={tier}
                          type="button"
                          onClick={() => {
                            setAnimConfig((prev) => ({ ...prev, intensity: tier }));
                            setPreviewKey((k) => k + 1);
                          }}
                          className={`rounded-xl border py-2 text-center text-xs capitalize font-medium transition-all ${
                            animConfig.intensity === tier
                              ? 'border-royal-gold bg-royal-gold text-royal-dark font-bold'
                              : 'border-white/10 bg-white/5 text-gray-300 hover:bg-white/10'
                          }`}
                        >
                          {tier}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Decorative Particles Toggle */}
                {animConfig.preset !== 'none' && (
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="block text-xs font-semibold text-white">
                          {t('editor.enableParticles')}
                        </span>
                        <span className="block text-[11px] text-gray-400">
                          {t('editor.particleEffectLabel')}
                        </span>
                      </div>
                      <input
                        type="checkbox"
                        checked={animConfig.enableParticles}
                        onChange={(e) =>
                          setAnimConfig((prev) => ({
                            ...prev,
                            enableParticles: e.target.checked,
                          }))
                        }
                        className="h-4 w-4 rounded accent-royal-gold cursor-pointer"
                      />
                    </div>

                    {animConfig.enableParticles && (
                      <div className="flex gap-2 pt-2">
                        {(['gold-dust', 'rose-petals', 'confetti'] as const).map((pType) => (
                          <button
                            key={pType}
                            type="button"
                            onClick={() =>
                              setAnimConfig((prev) => ({ ...prev, particleType: pType }))
                            }
                            className={`rounded-lg px-2.5 py-1 text-[11px] capitalize font-medium ${
                              animConfig.particleType === pType
                                ? 'bg-royal-gold/30 text-royal-gold border border-royal-gold/60 font-bold'
                                : 'bg-black/30 text-gray-400 border border-transparent'
                            }`}
                          >
                            {pType === 'gold-dust'
                              ? t('editor.particleTypeGold')
                              : pType === 'rose-petals'
                              ? t('editor.particleTypePetals')
                              : t('editor.particleTypeConfetti')}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Replay Test Button */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setPreviewKey((k) => k + 1)}
                    className="w-full flex items-center justify-center gap-2 rounded-xl border border-royal-gold/50 bg-royal-gold/10 py-2.5 text-xs font-bold text-royal-champagne hover:bg-royal-gold/20 transition-all shadow-md"
                  >
                    <Sparkles className="h-4 w-4 text-royal-gold" />
                    <span>{t('invitationView.replayAnimation')}</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ========================================================
            RIGHT PANE: LIVE INTERACTIVE PREVIEW CANVAS (Columns: 7)
        ======================================================== */}
        <div
          className={`lg:col-span-7 bg-[#08090D] flex flex-col h-[calc(100vh-58px)] sm:h-[calc(100vh-65px)] overflow-y-auto ${
            showMobilePreview ? 'flex' : 'hidden lg:flex'
          }`}
        >
          <div className="flex items-center justify-between border-b border-white/10 px-3 sm:px-6 py-2.5 bg-black/40">
            <span className="text-[10px] uppercase tracking-widest text-royal-gold font-sans font-semibold">
              {t('hero.livePreviewBadge')} &bull; {animConfig.preset}
            </span>
            <span className="text-[10px] text-gray-400">Live</span>
          </div>

          <div className="flex-1 p-1.5 sm:p-6 flex justify-center pb-20 lg:pb-6">
            <div className="w-full max-w-xl">
              <AnimatedInvitationRenderer
                key={previewKey}
                title={title}
                eventCategory={eventCategory}
                hosts={hosts}
                honorees={honorees}
                eventDate={eventDate ? new Date(eventDate).toISOString() : undefined}
                venueName={venueName}
                venueAddress={venueAddress}
                googleMapsUrl={googleMapsUrl}
                functions={JSON.stringify(functions)}
                designConfig={JSON.stringify(designConfig)}
                animationConfig={JSON.stringify(animConfig)}
                mediaGallery={JSON.stringify(mediaGallery)}
                musicUrl={musicUrl}
                slug={slug}
                isPreview={true}
              />
            </div>
          </div>

          {/* Floating Back to Edit button on mobile */}
          {showMobilePreview && (
            <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
              <button
                type="button"
                onClick={() => setShowMobilePreview(false)}
                className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-royal-gold to-royal-champagne text-royal-dark px-5 py-2.5 text-xs font-bold shadow-gold active:scale-95 transition-transform"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>Return to Edit</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function InvitationEditorPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0C0D14] flex items-center justify-center text-royal-champagne font-serif">Loading Studio...</div>}>
      <InvitationEditorContent />
    </Suspense>
  );
}
