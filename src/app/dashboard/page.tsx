'use client';

import React, { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { invitationsApi, getAuthToken } from '@/lib/api';
import { InvitationResponse } from '@/types';
import { UniversalShareButton } from '@/components/UniversalShareButton';
import {
  Plus,
  Eye,
  Edit3,
  Copy,
  Trash2,
  Globe,
  Share2,
  Sparkles,
  ExternalLink,
  CheckCircle2,
  Calendar,
  Clock,
  MapPin,
  CheckCircle,
} from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

export default function UserDashboardPage() {
  const router = useRouter();
  const { t, locale, formatNumber } = useLanguage();
  const [invitations, setInvitations] = useState<InvitationResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'ACTIVE' | 'COMPLETED' | 'DRAFT'>('ALL');

  useEffect(() => {
    const token = getAuthToken();
    if (!token) {
      router.push('/auth/login?redirect=/dashboard');
      return;
    }

    async function loadInvitations() {
      setLoading(true);
      try {
        const data = await invitationsApi.getUserInvitations();
        setInvitations(data);
      } catch (e) {
        // failed or demo
      } finally {
        setLoading(false);
      }
    }

    loadInvitations();
  }, [router]);

  const isEventCompleted = (inv: InvitationResponse) => {
    if (!inv.eventDate) return false;
    const d = new Date(inv.eventDate).getTime();
    return !isNaN(d) && d < Date.now();
  };

  const isEventToday = (inv: InvitationResponse) => {
    if (!inv.eventDate) return false;
    const d = new Date(inv.eventDate);
    const now = new Date();
    return (
      d.getDate() === now.getDate() &&
      d.getMonth() === now.getMonth() &&
      d.getFullYear() === now.getFullYear()
    );
  };

  const counts = useMemo(() => {
    const all = invitations.length;
    const completed = invitations.filter(isEventCompleted).length;
    const active = invitations.filter((inv) => inv.status === 'PUBLISHED' && !isEventCompleted(inv)).length;
    const draft = invitations.filter((inv) => inv.status === 'DRAFT').length;
    return { all, completed, active, draft };
  }, [invitations]);

  const filteredInvitations = useMemo(() => {
    return invitations.filter((inv) => {
      if (statusFilter === 'ALL') return true;
      if (statusFilter === 'ACTIVE') return inv.status === 'PUBLISHED' && !isEventCompleted(inv);
      if (statusFilter === 'COMPLETED') return isEventCompleted(inv);
      if (statusFilter === 'DRAFT') return inv.status === 'DRAFT';
      return true;
    });
  }, [invitations, statusFilter]);

  const handleDelete = async (id: number) => {
    if (!confirm(t('dashboard.confirmDelete'))) return;
    try {
      await invitationsApi.deleteInvitation(id);
      setInvitations((prev) => prev.filter((i) => i.id !== id));
    } catch (e: any) {
      alert(e.message || 'Failed to delete invitation');
    }
  };

  const handleDuplicate = async (id: number) => {
    try {
      const duplicated = await invitationsApi.duplicateInvitation(id);
      setInvitations((prev) => [duplicated, ...prev]);
    } catch (e: any) {
      alert(e.message || 'Failed to duplicate invitation');
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-6 sm:space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-royal-gold/20 pb-6">
        <div>
          <span className="text-[10px] sm:text-xs font-serif uppercase tracking-widest text-royal-gold">
            {t('nav.dashboard')}
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-0.5">
            {t('dashboard.welcome')}
          </h1>
          <p className="text-xs text-gray-400 font-sans mt-1">
            {t('dashboard.subtitle')}
          </p>
        </div>

        <Link
          href="/templates"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-royal-gold via-royal-champagne to-royal-gold px-5 py-2.5 text-xs font-bold text-royal-dark shadow-gold hover:opacity-95 active:scale-95 transition-all self-start sm:self-auto"
        >
          <Plus className="h-4 w-4" />
          <span>{t('dashboard.newInviteBtn')}</span>
        </Link>
      </div>

      {/* Filter Tabs */}
      {invitations.length > 0 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            type="button"
            onClick={() => setStatusFilter('ALL')}
            className={`rounded-full px-4 py-1.5 text-xs font-semibold whitespace-nowrap transition-all ${
              statusFilter === 'ALL'
                ? 'bg-royal-gold text-royal-dark shadow-gold'
                : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
            }`}
          >
            {t('dashboard.filterAll')} ({counts.all})
          </button>

          <button
            type="button"
            onClick={() => setStatusFilter('ACTIVE')}
            className={`rounded-full px-4 py-1.5 text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              statusFilter === 'ACTIVE'
                ? 'bg-emerald-500 text-white shadow-md'
                : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
            }`}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span>{t('dashboard.filterActive')} ({counts.active})</span>
          </button>

          <button
            type="button"
            onClick={() => setStatusFilter('COMPLETED')}
            className={`rounded-full px-4 py-1.5 text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              statusFilter === 'COMPLETED'
                ? 'bg-amber-500 text-white shadow-md'
                : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
            }`}
          >
            <CheckCircle2 className="h-3.5 w-3.5" />
            <span>{t('dashboard.filterCompleted')} ({counts.completed})</span>
          </button>

          <button
            type="button"
            onClick={() => setStatusFilter('DRAFT')}
            className={`rounded-full px-4 py-1.5 text-xs font-semibold whitespace-nowrap transition-all ${
              statusFilter === 'DRAFT'
                ? 'bg-gray-200 text-gray-900 shadow-md'
                : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
            }`}
          >
            {t('dashboard.filterDraft')} ({counts.draft})
          </button>
        </div>
      )}

      {/* Invitations List */}
      {loading ? (
        <div className="py-20 text-center text-royal-champagne font-serif animate-pulse">
          {t('common.loading')}
        </div>
      ) : invitations.length === 0 ? (
        <div className="rounded-3xl border border-white/10 bg-white/5 py-16 text-center space-y-4">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-royal-ruby/30 text-royal-gold border border-royal-gold/30">
            <Sparkles className="h-7 w-7" />
          </div>
          <h3 className="font-serif text-xl font-bold text-white">{t('dashboard.noInvitesYet')}</h3>
          <p className="text-xs text-gray-400 max-w-sm mx-auto font-sans">
            {t('dashboard.createFirstInvite')}
          </p>
          <div className="pt-2">
            <Link
              href="/templates"
              className="inline-flex items-center gap-2 rounded-full bg-royal-gold px-6 py-2.5 text-xs font-bold text-royal-dark shadow-gold"
            >
              <span>{t('templatesPage.title')}</span>
            </Link>
          </div>
        </div>
      ) : filteredInvitations.length === 0 ? (
        <div className="rounded-3xl border border-white/10 bg-white/5 py-12 text-center text-gray-400 text-xs">
          {t('templatesPage.noResults')}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredInvitations.map((inv) => {
            const completed = isEventCompleted(inv);
            const today = isEventToday(inv);

            return (
              <div
                key={inv.id}
                className={`rounded-3xl border ${
                  completed
                    ? 'border-amber-500/30 bg-[#12111A]'
                    : 'border-royal-gold/25 bg-royal-dark/90'
                } p-4 sm:p-6 flex flex-col justify-between shadow-lg space-y-4 hover:border-royal-gold/50 transition-colors`}
              >
                <div className="space-y-2.5">
                  {/* Category and Status Badge */}
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-royal-gold font-sans">
                      {inv.eventCategory}
                    </span>

                    {/* Prominent Event Status Badge */}
                    {completed ? (
                      <span className="rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-amber-500/15 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                        <CheckCircle2 className="h-3 w-3 text-amber-400" />
                        <span>{t('dashboard.completedBadge')}</span>
                      </span>
                    ) : today ? (
                      <span className="rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-royal-gold/20 text-royal-champagne border border-royal-gold/40 flex items-center gap-1 animate-pulse">
                        <Sparkles className="h-3 w-3 text-royal-gold" />
                        <span>{t('dashboard.todayBadge')}</span>
                      </span>
                    ) : inv.status === 'PUBLISHED' ? (
                      <span className="rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span>{t('dashboard.statusPublished')}</span>
                      </span>
                    ) : (
                      <span className="rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-white/10 text-gray-400 border border-white/10">
                        {t('dashboard.statusDraft')}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-xl font-bold text-white line-clamp-1">
                    {inv.title}
                  </h3>

                  {inv.honorees && (
                    <p className="text-xs text-royal-champagne font-serif">{inv.honorees}</p>
                  )}

                  {/* Date, Venue and Views */}
                  <div className="text-[11px] text-gray-400 font-sans space-y-1 pt-1">
                    {inv.eventDate && (
                      <p className="flex items-center gap-1.5 text-gray-300">
                        <Calendar className="h-3.5 w-3.5 text-royal-gold" />
                        <span>
                          {new Date(inv.eventDate).toLocaleDateString(locale === 'mr' ? 'mr-IN' : locale === 'hi' ? 'hi-IN' : 'en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </span>
                        {completed && (
                          <span className="text-[10px] text-amber-400/90 italic">({t('dashboard.completedBadge')})</span>
                        )}
                      </p>
                    )}

                    {inv.venueName && (
                      <p className="flex items-center gap-1.5 line-clamp-1">
                        <MapPin className="h-3.5 w-3.5 text-royal-gold" />
                        <span>{inv.venueName}</span>
                      </p>
                    )}

                    <div className="flex items-center justify-between pt-1 text-gray-500">
                      <span className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        <span>{inv.viewsCount || 0} {t('dashboard.viewsCount')}</span>
                      </span>
                      <span>v{inv.version}</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-2 border-t border-white/10 space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      href={`/editor?id=${inv.id}`}
                      className="flex items-center justify-center gap-1.5 rounded-xl border border-white/20 bg-white/5 py-2 text-xs font-semibold text-white hover:bg-white/10 transition-colors"
                    >
                      <Edit3 className="h-3.5 w-3.5 text-royal-gold" />
                      <span>{t('dashboard.editBtn')}</span>
                    </Link>

                    <Link
                      href={`/i/${inv.slug}`}
                      target="_blank"
                      className="flex items-center justify-center gap-1.5 rounded-xl border border-royal-gold/40 bg-royal-gold/10 py-2 text-xs font-semibold text-royal-champagne hover:bg-royal-gold/20 transition-colors"
                    >
                      <ExternalLink className="h-3.5 w-3.5 text-royal-gold" />
                      <span>{t('dashboard.viewLiveBtn')}</span>
                    </Link>
                  </div>

                  {/* Secondary Actions: Share across apps, Duplicate, Delete */}
                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-2">
                      <UniversalShareButton
                        title={inv.title}
                        honorees={inv.honorees}
                        slug={inv.slug}
                        venueName={inv.venueName}
                        eventDate={inv.eventDate}
                        variant="compact"
                      />

                      <button
                        type="button"
                        onClick={() => handleDuplicate(inv.id)}
                        className="flex h-8 items-center gap-1 rounded-xl border border-white/10 bg-white/5 px-2.5 text-[11px] font-medium text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
                        title={t('dashboard.duplicateBtn')}
                      >
                        <Copy className="h-3 w-3 text-royal-gold" />
                        <span>{t('dashboard.duplicateBtn')}</span>
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleDelete(inv.id)}
                      className="flex h-8 w-8 items-center justify-center rounded-xl text-gray-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                      title={t('dashboard.deleteBtn')}
                      aria-label={t('dashboard.deleteBtn')}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
