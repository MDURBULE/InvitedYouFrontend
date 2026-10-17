'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { invitationsApi, getAuthToken } from '@/lib/api';
import { InvitationResponse } from '@/types';
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
  Check,
} from 'lucide-react';

export default function UserDashboardPage() {
  const router = useRouter();
  const [invitations, setInvitations] = useState<InvitationResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);

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

  const handleCopyLink = (slug: string) => {
    const url = `${window.location.origin}/i/${slug}`;
    navigator.clipboard.writeText(url);
    setCopiedSlug(slug);
    setTimeout(() => setCopiedSlug(null), 2500);
  };

  const handleTogglePublish = async (inv: InvitationResponse) => {
    try {
      if (inv.status === 'PUBLISHED') {
        const res = await invitationsApi.unpublishInvitation(inv.id);
        setInvitations((prev) => prev.map((item) => (item.id === inv.id ? res : item)));
      } else {
        const res = await invitationsApi.publishInvitation(inv.id);
        setInvitations((prev) => prev.map((item) => (item.id === inv.id ? res : item)));
      }
    } catch (e: any) {
      alert(e.message || 'Failed to toggle publication status');
    }
  };

  const handleDuplicate = async (id: number) => {
    try {
      const copy = await invitationsApi.duplicateInvitation(id);
      setInvitations((prev) => [copy, ...prev]);
    } catch (e: any) {
      alert(e.message || 'Failed to duplicate invitation');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this invitation?')) return;
    try {
      await invitationsApi.deleteInvitation(id);
      setInvitations((prev) => prev.filter((item) => item.id !== id));
    } catch (e: any) {
      alert(e.message || 'Failed to delete invitation');
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <span className="text-xs uppercase tracking-widest text-royal-gold font-serif font-semibold">
            Host Dashboard
          </span>
          <h1 className="font-serif text-2xl sm:text-4xl font-bold text-white mt-0.5">
            My Digital Invitations
          </h1>
          <p className="text-xs text-gray-400 font-sans mt-1">
            Manage your celebration drafts, publish links, and monitor guest views.
          </p>
        </div>

        <Link
          href="/templates"
          className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-royal-gold to-royal-champagne px-5 py-2.5 text-xs font-bold text-royal-dark shadow-gold hover:opacity-95 active:scale-95 transition-all"
        >
          <Plus className="h-4 w-4" />
          <span>New Invitation</span>
        </Link>
      </div>

      {/* Invitations List */}
      {loading ? (
        <div className="py-20 text-center text-royal-champagne font-serif animate-pulse">
          Loading your invitations...
        </div>
      ) : invitations.length === 0 ? (
        <div className="rounded-3xl border border-white/10 bg-white/5 py-16 text-center space-y-4">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-royal-ruby/30 text-royal-gold border border-royal-gold/30">
            <Sparkles className="h-7 w-7" />
          </div>
          <h3 className="font-serif text-xl font-bold text-white">No Invitations Created Yet</h3>
          <p className="text-xs text-gray-400 max-w-sm mx-auto font-sans">
            Choose an animated template or traditional card to begin your first celebration invite.
          </p>
          <div className="pt-2">
            <Link
              href="/templates"
              className="inline-flex items-center gap-2 rounded-full bg-royal-gold px-6 py-2.5 text-xs font-bold text-royal-dark shadow-gold"
            >
              <span>Browse Template Gallery</span>
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {invitations.map((inv) => (
            <div
              key={inv.id}
              className="rounded-3xl border border-royal-gold/25 bg-royal-dark/90 p-4 sm:p-6 flex flex-col justify-between shadow-lg space-y-4 hover:border-royal-gold/50 transition-colors"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-royal-gold font-sans">
                    {inv.eventCategory}
                  </span>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                      inv.status === 'PUBLISHED'
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : 'bg-white/10 text-gray-400 border border-white/10'
                    }`}
                  >
                    {inv.status}
                  </span>
                </div>

                <h3 className="font-serif text-xl font-bold text-white line-clamp-1">
                  {inv.title}
                </h3>

                {inv.honorees && (
                  <p className="text-xs text-royal-champagne font-serif">{inv.honorees}</p>
                )}

                <div className="text-[11px] text-gray-400 font-sans space-y-1 pt-1">
                  {inv.venueName && <p className="line-clamp-1">📍 {inv.venueName}</p>}
                  <p>👁️ {inv.viewsCount || 0} guest page views</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-white/10 space-y-2">
                {inv.status === 'PUBLISHED' && (
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleCopyLink(inv.slug)}
                      className="flex-1 flex items-center justify-center gap-1.5 rounded-xl border border-royal-gold/40 bg-royal-gold/10 py-2 text-xs font-semibold text-royal-champagne hover:bg-royal-gold/20 transition-colors"
                    >
                      {copiedSlug === inv.slug ? (
                        <Check className="h-3.5 w-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="h-3.5 w-3.5" />
                      )}
                      <span>{copiedSlug === inv.slug ? 'Copied' : 'Copy Link'}</span>
                    </button>

                    <Link
                      href={`/i/${inv.slug}`}
                      target="_blank"
                      className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/20 bg-white/5 text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
                      title="Open Live Link"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <Link
                    href={`/editor?id=${inv.id}`}
                    className="flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white py-2 text-xs font-medium transition-colors"
                  >
                    <Edit3 className="h-3.5 w-3.5" />
                    <span>Edit</span>
                  </Link>

                  <button
                    type="button"
                    onClick={() => handleTogglePublish(inv)}
                    className="flex-1 flex items-center justify-center gap-1.5 rounded-xl border border-white/20 hover:border-white/40 text-gray-300 hover:text-white py-2 text-xs font-medium transition-colors"
                  >
                    <Globe className="h-3.5 w-3.5" />
                    <span>{inv.status === 'PUBLISHED' ? 'Unpublish' : 'Publish'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDuplicate(inv.id)}
                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-gray-400 hover:text-white"
                    title="Duplicate Invitation"
                  >
                    <Copy className="h-3.5 w-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(inv.id)}
                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-gray-400 hover:text-red-400"
                    title="Delete Invitation"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
