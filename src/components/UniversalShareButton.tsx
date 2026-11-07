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
  ExternalLink,
  Download,
} from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

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
  const { t, locale } = useLanguage();
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
    ? new Date(eventDate).toLocaleDateString(locale === 'mr' ? 'mr-IN' : locale === 'hi' ? 'hi-IN' : 'en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : '';

  const shareTitle = honorees
    ? `${honorees} — ${locale === 'mr' ? 'सोहळा निमंत्रण' : locale === 'hi' ? 'उत्सव निमंत्रण' : 'Celebration Invitation'}`
    : title;

  const dateLabel = locale === 'mr' ? 'तारीख' : locale === 'hi' ? 'दिनांक' : 'Date';
  const venueLabel = locale === 'mr' ? 'ठिकाण' : locale === 'hi' ? 'स्थान' : 'Venue';

  const shareText = `*${honorees || title}*\n${t('share.shareMessageTemplate')}\n${
    formattedDate ? `🗓️ ${dateLabel}: ${formattedDate}\n` : ''
  }${venueName ? `📍 ${venueLabel}: ${venueName}\n` : ''}${getFullUrl()}`;

  const fullUrl = getFullUrl();

  // 1. Native Mobile / Desktop Web Share
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
        if (err.name !== 'AbortError') {
          setModalOpen(true);
        }
        return false;
      }
    } else {
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
    shareTitle
  )}&url=${encodeURIComponent(fullUrl)}`;
  const emailUrl = `mailto:?subject=${encodeURIComponent(shareTitle)}&body=${encodeURIComponent(
    shareText.replace(/\*/g, '')
  )}`;

  // Quick QR code URL
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=280x280&margin=12&data=${encodeURIComponent(
    fullUrl
  )}`;

  return (
    <>
      {/* Trigger Button Variants */}
      {variant === 'icon' ? (
        <button
          type="button"
          onClick={handleNativeShare}
          className={`flex h-8 w-8 items-center justify-center rounded-xl border border-royal-gold/40 bg-royal-gold/10 text-royal-champagne hover:bg-royal-gold/20 hover:border-royal-gold/60 active:scale-95 transition-all shadow-sm ${className}`}
          title={t('common.share')}
          aria-label={t('common.share')}
        >
          <Share2 className="h-3.5 w-3.5" />
        </button>
      ) : variant === 'compact' ? (
        <div className={`flex items-center gap-2 ${className}`}>
          <button
            type="button"
            onClick={handleNativeShare}
            className="flex-1 h-8 inline-flex items-center justify-center gap-1.5 rounded-xl border border-royal-gold/40 bg-royal-gold/10 px-3 text-xs font-semibold text-royal-champagne hover:bg-royal-gold/20 hover:border-royal-gold/60 active:scale-95 transition-all shadow-sm"
          >
            <Share2 className="h-3.5 w-3.5" />
            <span>{t('common.share')}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setShowQr(true);
              setModalOpen(true);
            }}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-royal-gold/40 bg-royal-gold/10 text-royal-champagne hover:bg-royal-gold/20 hover:border-royal-gold/60 active:scale-95 transition-all shadow-sm"
            title={t('share.viewQr')}
            aria-label={t('share.viewQr')}
          >
            <QrCode className="h-3.5 w-3.5" />
          </button>
        </div>
      ) : variant === 'secondary' ? (
        <div className={`flex items-center gap-2 ${className}`}>
          <button
            type="button"
            onClick={handleNativeShare}
            className="inline-flex items-center gap-2 rounded-xl border border-royal-gold/40 bg-royal-gold/10 hover:bg-royal-gold/20 text-royal-champagne px-4 py-2 text-xs font-semibold active:scale-95 transition-all shadow-sm"
          >
            <Share2 className="h-3.5 w-3.5" />
            <span>{t('share.shareTitle')}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setShowQr(true);
              setModalOpen(true);
            }}
            className="flex h-8.5 w-8.5 shrink-0 items-center justify-center rounded-xl border border-royal-gold/40 bg-royal-gold/10 hover:bg-royal-gold/20 text-royal-champagne hover:border-royal-gold/60 active:scale-95 transition-all shadow-sm"
            title={t('share.viewQr')}
            aria-label={t('share.viewQr')}
          >
            <QrCode className="h-3.5 w-3.5" />
          </button>
        </div>
      ) : (
        <div className={`flex flex-wrap items-center gap-2 ${className}`}>
          {/* Main "Share Across Apps" Button */}
          <button
            type="button"
            onClick={handleNativeShare}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-royal-gold via-royal-champagne to-royal-gold bg-[length:200%_auto] hover:bg-right text-royal-dark px-4 sm:px-5 py-2.5 text-xs font-bold shadow-gold active:scale-95 transition-all"
          >
            <Share2 className="h-4 w-4 text-royal-dark" />
            <span>{t('share.shareTitle')}</span>
          </button>

          {/* Quick QR Code Modal Trigger */}
          <button
            type="button"
            onClick={() => {
              setShowQr(true);
              setModalOpen(true);
            }}
            className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-xl border border-royal-gold/40 bg-royal-gold/10 hover:bg-royal-gold/20 text-royal-champagne hover:border-royal-gold/60 active:scale-95 transition-all shadow-sm"
            title={t('share.viewQr')}
            aria-label={t('share.viewQr')}
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
            className="relative w-full max-w-md rounded-3xl border border-royal-gold/30 bg-[#10121D] p-5 sm:p-6 shadow-2xl text-white space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-royal-gold/15 text-royal-gold border border-royal-gold/20">
                  {showQr ? <QrCode className="h-4.5 w-4.5" /> : <Share2 className="h-4.5 w-4.5" />}
                </div>
                <div>
                  <h3 className="font-serif text-base font-bold text-white">
                    {showQr ? t('share.scanQrCode') : t('share.shareTitle')}
                  </h3>
                  <p className="text-[11px] text-gray-400 font-sans">
                    {showQr ? t('share.scanSubtitle') : t('share.shareSubtitle')}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setModalOpen(false);
                  setShowQr(false);
                }}
                className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                aria-label={t('common.close')}
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* View Mode Switcher: Share via Apps | QR Code */}
            <div className="grid grid-cols-2 rounded-xl bg-white/5 p-1 border border-white/10">
              <button
                type="button"
                onClick={() => setShowQr(false)}
                className={`flex items-center justify-center gap-1.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  !showQr
                    ? 'bg-royal-gold/20 text-royal-champagne border border-royal-gold/40 shadow-sm'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Share2 className="h-3.5 w-3.5" />
                <span>{t('common.share')}</span>
              </button>

              <button
                type="button"
                onClick={() => setShowQr(true)}
                className={`flex items-center justify-center gap-1.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  showQr
                    ? 'bg-royal-gold/20 text-royal-champagne border border-royal-gold/40 shadow-sm'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <QrCode className="h-3.5 w-3.5" />
                <span>QR Code</span>
              </button>
            </div>

            {/* QR Code View */}
            {showQr ? (
              <div className="text-center space-y-4 py-1 animate-in fade-in zoom-in-95 duration-150">
                <div className="mx-auto flex h-60 w-60 items-center justify-center rounded-2xl bg-white p-3 shadow-2xl border-2 border-royal-gold/40">
                  <img
                    src={qrCodeUrl}
                    alt={t('share.scanQrCode')}
                    className="h-full w-full object-contain"
                  />
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-medium text-gray-200">
                    {t('share.scanQrCode')}
                  </p>
                  <p className="text-[11px] text-gray-400 font-sans">
                    {t('share.scanSubtitle')}
                  </p>
                </div>

                {/* QR Actions: Download QR & Copy Link */}
                <div className="flex items-center justify-center gap-2 pt-1">
                  <a
                    href={qrCodeUrl}
                    download={`invitation-qr-${slug}.png`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-xl border border-white/20 bg-white/10 hover:bg-white/20 px-3.5 py-2 text-xs font-semibold text-white transition-all active:scale-95"
                  >
                    <Download className="h-3.5 w-3.5 text-royal-gold" />
                    <span>{t('share.downloadQr')}</span>
                  </a>

                  <button
                    type="button"
                    onClick={handleCopyLink}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-royal-gold/40 bg-royal-gold/15 hover:bg-royal-gold/25 px-3.5 py-2 text-xs font-semibold text-royal-champagne transition-all active:scale-95"
                  >
                    {copied ? (
                      <Check className="h-3.5 w-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="h-3.5 w-3.5 text-royal-gold" />
                    )}
                    <span>{copied ? t('share.linkCopied') : t('share.copyLink')}</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4 animate-in fade-in duration-150">
                {/* Platform Icons Grid */}
                <div className="grid grid-cols-4 gap-2.5 text-center">
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
                    <span className="text-[11px] font-medium text-gray-300 group-hover:text-white">WhatsApp</span>
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
                    <span className="text-[11px] font-medium text-gray-300 group-hover:text-white">Telegram</span>
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
                    <span className="text-[11px] font-medium text-gray-300 group-hover:text-white">Facebook</span>
                  </a>

                  {/* Email */}
                  <a
                    href={emailUrl}
                    className="flex flex-col items-center gap-1.5 rounded-2xl border border-white/10 bg-white/5 p-3 hover:bg-white/10 hover:border-royal-ruby/50 transition-all group"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-royal-ruby/70 text-white shadow-md group-hover:scale-105 transition-transform">
                      <Mail className="h-5 w-5" />
                    </div>
                    <span className="text-[11px] font-medium text-gray-300 group-hover:text-white">Email</span>
                  </a>
                </div>

                {/* Direct Link Input with Copy button */}
                <div className="flex items-center gap-2 rounded-2xl border border-royal-gold/30 bg-royal-dark/90 p-1.5 pl-3">
                  <span className="text-xs text-gray-400 font-mono truncate flex-1">{fullUrl}</span>
                  <button
                    type="button"
                    onClick={handleCopyLink}
                    className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-royal-gold to-royal-champagne px-3 py-2 text-xs font-bold text-royal-dark shrink-0 hover:opacity-95 active:scale-95 transition-all shadow-sm"
                  >
                    {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                    <span>{copied ? t('share.linkCopied') : t('share.copyLink')}</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
