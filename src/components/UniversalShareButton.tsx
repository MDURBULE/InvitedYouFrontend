'use client';

import React, { useState } from 'react';
import {
  Share2,
  Copy,
  Check,
  QrCode,
  X,
  MessageCircle,
  Send,
  Facebook,
  Twitter,
  Mail,
  Smartphone,
  Sparkles,
  ExternalLink,
} from 'lucide-react';

interface UniversalShareButtonProps {
  title: string;
  honorees?: string;
  slug: string;
  venueName?: string;
  eventDate?: string;
  variant?: 'primary' | 'secondary' | 'compact' | 'icon';
  className?: string;
}

export const UniversalShareButton: React.FC<UniversalShareButtonProps> = ({
  title,
  honorees,
  slug,
  venueName,
  eventDate,
  variant = 'primary',
  className = '',
}) => {
  const [copied, setCopied] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [showQr, setShowQr] = useState(false);

  const getFullUrl = () => {
    if (typeof window !== 'undefined') {
      return `${window.location.origin}/i/${slug}`;
    }
    return `https://invitedtoyou.netlify.app/i/${slug}`;
  };

  const formattedDate = eventDate
    ? new Date(eventDate).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : '';

  const shareTitle = honorees ? `${honorees} — Celebration Invitation` : title;

  const shareText = `*${honorees || title}*\n✨ You are warmly invited to celebrate with us! ✨\n${
    formattedDate ? `🗓️ Date: ${formattedDate}\n` : ''
  }${venueName ? `📍 Venue: ${venueName}\n` : ''}\nOpen your interactive digital invitation here:\n${getFullUrl()}`;

  const fullUrl = getFullUrl();

  // 1. Native Mobile / Desktop Web Share (Shares across WhatsApp, Instagram, Telegram, SMS, AirDrop, etc.)
  const handleNativeShare = async () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: fullUrl,
        });
        return true;
      } catch (err: any) {
        // User cancelled or share dismissed
        if (err.name !== 'AbortError') {
          setModalOpen(true);
        }
        return false;
      }
    } else {
      // Fallback for browsers without native share
      setModalOpen(true);
      return false;
    }
  };

  const handleCopyLink = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  // Pre-configured platform links
  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
  const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(fullUrl)}&text=${encodeURIComponent(shareText)}`;
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl)}`;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    `You're invited to celebrate with us! Open the invitation:`
  )}&url=${encodeURIComponent(fullUrl)}`;
  const emailUrl = `mailto:?subject=${encodeURIComponent(shareTitle)}&body=${encodeURIComponent(
    shareText.replace(/\*/g, '')
  )}`;

  // Quick QR code URL (using standard SVG QR generator)
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=260x260&margin=12&data=${encodeURIComponent(
    fullUrl
  )}`;

  return (
    <>
      {/* Trigger Button Variants */}
      {variant === 'icon' ? (
        <button
          type="button"
          onClick={handleNativeShare}
          className={`flex h-9 w-9 items-center justify-center rounded-xl border border-royal-gold/40 bg-royal-gold/10 text-royal-champagne hover:bg-royal-gold/20 active:scale-95 transition-all ${className}`}
          title="Share across apps"
          aria-label="Share across apps"
        >
          <Share2 className="h-4 w-4" />
        </button>
      ) : variant === 'compact' ? (
        <button
          type="button"
          onClick={handleNativeShare}
          className={`inline-flex items-center gap-1.5 rounded-xl border border-royal-gold/40 bg-royal-gold/10 px-3 py-1.5 text-xs font-semibold text-royal-champagne hover:bg-royal-gold/20 active:scale-95 transition-all ${className}`}
        >
          <Share2 className="h-3.5 w-3.5" />
          <span>Share</span>
        </button>
      ) : (
        <div className={`flex flex-wrap items-center gap-2 ${className}`}>
          {/* Main "Share Across Apps" Button */}
          <button
            type="button"
            onClick={handleNativeShare}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-royal-gold via-royal-champagne to-royal-gold bg-[length:200%_auto] hover:bg-right text-royal-dark px-4 sm:px-5 py-2.5 text-xs font-bold shadow-gold active:scale-95 transition-all"
          >
            <Share2 className="h-4 w-4 text-royal-dark" />
            <span>Share Invitation</span>
          </button>

          {/* Quick Copy Link Button */}
          <button
            type="button"
            onClick={handleCopyLink}
            className="flex items-center gap-1.5 rounded-xl border border-white/20 bg-white/10 hover:bg-white/20 text-white px-3.5 py-2.5 text-xs font-medium active:scale-95 transition-all"
            title="Copy invitation link"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
            <span>{copied ? 'Copied!' : 'Copy Link'}</span>
          </button>

          {/* Quick QR Code Modal Trigger */}
          <button
            type="button"
            onClick={() => {
              setModalOpen(true);
              setShowQr(true);
            }}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/20 bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-all"
            title="Show QR Code"
          >
            <QrCode className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Multi-Platform Share Sheet Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => {
            setModalOpen(false);
            setShowQr(false);
          }}
        >
          <div
            className="relative w-full max-w-md rounded-3xl border border-royal-gold/30 bg-[#10121D] p-5 sm:p-6 shadow-2xl text-white space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-royal-gold/15 text-royal-gold">
                  <Share2 className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-serif text-base font-bold text-white">Share Invitation</h3>
                  <p className="text-[11px] text-gray-400 font-sans">Share seamlessly across your favorite apps</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setModalOpen(false);
                  setShowQr(false);
                }}
                className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* QR Code View Toggle */}
            {showQr ? (
              <div className="text-center space-y-4 py-2">
                <div className="mx-auto flex h-60 w-60 items-center justify-center rounded-2xl bg-white p-3 shadow-lg">
                  <img
                    src={qrCodeUrl}
                    alt="Scan Invitation QR Code"
                    className="h-full w-full object-contain"
                  />
                </div>
                <p className="text-xs text-gray-300 font-sans">
                  Guests can point their phone camera at this QR code to view the invitation instantly.
                </p>
                <button
                  type="button"
                  onClick={() => setShowQr(false)}
                  className="inline-flex items-center gap-1.5 text-xs text-royal-gold hover:underline font-semibold"
                >
                  &larr; Back to App Options
                </button>
              </div>
            ) : (
              <>
                {/* Native OS Share Button (Gallery-Style sharing) */}
                {typeof navigator !== 'undefined' && typeof (navigator as any).share === 'function' && (
                  <button
                    type="button"
                    onClick={async () => {
                      const shared = await handleNativeShare();
                      if (shared) setModalOpen(false);
                    }}
                    className="w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-royal-gold via-royal-champagne to-royal-gold p-3 text-xs font-bold text-royal-dark shadow-gold active:scale-95 transition-all"
                  >
                    <Smartphone className="h-4 w-4" />
                    <span>Open Phone Share Tray (WhatsApp, Instagram, etc.)</span>
                  </button>
                )}

                {/* Platform Icons Grid */}
                <div className="grid grid-cols-4 gap-3 text-center">
                  {/* WhatsApp */}
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-1.5 rounded-2xl border border-white/10 bg-white/5 p-3 hover:bg-white/10 hover:border-emerald-500/50 transition-all group"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-md group-hover:scale-105 transition-transform">
                      <MessageCircle className="h-5 w-5" />
                    </div>
                    <span className="text-[11px] font-medium text-gray-300">WhatsApp</span>
                  </a>

                  {/* Telegram */}
                  <a
                    href={telegramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-1.5 rounded-2xl border border-white/10 bg-white/5 p-3 hover:bg-white/10 hover:border-sky-500/50 transition-all group"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500 text-white shadow-md group-hover:scale-105 transition-transform">
                      <Send className="h-5 w-5" />
                    </div>
                    <span className="text-[11px] font-medium text-gray-300">Telegram</span>
                  </a>

                  {/* Facebook */}
                  <a
                    href={facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-1.5 rounded-2xl border border-white/10 bg-white/5 p-3 hover:bg-white/10 hover:border-blue-500/50 transition-all group"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md group-hover:scale-105 transition-transform">
                      <Facebook className="h-5 w-5" />
                    </div>
                    <span className="text-[11px] font-medium text-gray-300">Facebook</span>
                  </a>

                  {/* X / Twitter */}
                  <a
                    href={twitterUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-1.5 rounded-2xl border border-white/10 bg-white/5 p-3 hover:bg-white/10 hover:border-white/30 transition-all group"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-800 text-white shadow-md group-hover:scale-105 transition-transform">
                      <Twitter className="h-5 w-5" />
                    </div>
                    <span className="text-[11px] font-medium text-gray-300">X (Twitter)</span>
                  </a>

                  {/* Email */}
                  <a
                    href={emailUrl}
                    className="flex flex-col items-center gap-1.5 rounded-2xl border border-white/10 bg-white/5 p-3 hover:bg-white/10 hover:border-amber-500/50 transition-all group"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-600 text-white shadow-md group-hover:scale-105 transition-transform">
                      <Mail className="h-5 w-5" />
                    </div>
                    <span className="text-[11px] font-medium text-gray-300">Email</span>
                  </a>

                  {/* QR Code */}
                  <button
                    type="button"
                    onClick={() => setShowQr(true)}
                    className="flex flex-col items-center gap-1.5 rounded-2xl border border-white/10 bg-white/5 p-3 hover:bg-white/10 hover:border-royal-gold/50 transition-all group"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-royal-gold/20 text-royal-champagne border border-royal-gold/30 shadow-md group-hover:scale-105 transition-transform">
                      <QrCode className="h-5 w-5" />
                    </div>
                    <span className="text-[11px] font-medium text-gray-300">QR Code</span>
                  </button>

                  {/* Open Link Direct */}
                  <a
                    href={fullUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-1.5 rounded-2xl border border-white/10 bg-white/5 p-3 hover:bg-white/10 hover:border-purple-500/50 transition-all group"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-600 text-white shadow-md group-hover:scale-105 transition-transform">
                      <ExternalLink className="h-5 w-5" />
                    </div>
                    <span className="text-[11px] font-medium text-gray-300">Preview</span>
                  </a>

                  {/* Copy Link Tile */}
                  <button
                    type="button"
                    onClick={handleCopyLink}
                    className="flex flex-col items-center gap-1.5 rounded-2xl border border-white/10 bg-white/5 p-3 hover:bg-white/10 hover:border-emerald-500/50 transition-all group"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-700 text-white shadow-md group-hover:scale-105 transition-transform">
                      {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
                    </div>
                    <span className="text-[11px] font-medium text-gray-300">
                      {copied ? 'Copied!' : 'Copy'}
                    </span>
                  </button>
                </div>

                {/* Direct Link Box */}
                <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 p-2">
                  <input
                    type="text"
                    readOnly
                    value={fullUrl}
                    className="flex-1 bg-transparent px-2 text-xs text-gray-300 font-mono outline-none truncate"
                  />
                  <button
                    type="button"
                    onClick={handleCopyLink}
                    className="flex items-center gap-1 rounded-xl bg-royal-gold/20 text-royal-champagne hover:bg-royal-gold/30 px-3 py-1.5 text-xs font-semibold transition-colors"
                  >
                    {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};
