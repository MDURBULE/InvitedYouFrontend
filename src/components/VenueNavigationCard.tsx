'use client';

import React, { useState } from 'react';
import { MapPin, Navigation, Copy, Check, ExternalLink } from 'lucide-react';

interface VenueNavigationCardProps {
  venueName?: string;
  venueAddress?: string;
  googleMapsUrl?: string;
  themeColor?: string;
}

export const VenueNavigationCard: React.FC<VenueNavigationCardProps> = ({
  venueName,
  venueAddress,
  googleMapsUrl,
  themeColor = '#D4AF37',
}) => {
  const [copied, setCopied] = useState(false);

  if (!venueName && !venueAddress) return null;

  const resolvedMapsUrl =
    googleMapsUrl && googleMapsUrl.startsWith('http')
      ? googleMapsUrl
      : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
          `${venueName || ''} ${venueAddress || ''}`.trim()
        )}`;

  const appleMapsUrl = `https://maps.apple.com/?q=${encodeURIComponent(
    `${venueName || ''} ${venueAddress || ''}`.trim()
  )}`;

  const handleCopy = () => {
    const text = `${venueName ? venueName + '\n' : ''}${venueAddress || ''}`.trim();
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="rounded-2xl border border-royal-gold/30 bg-royal-dark/75 p-4 sm:p-6 shadow-xl backdrop-blur-md">
      <div className="flex items-start gap-2.5 sm:gap-3">
        <div
          className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-xl border border-royal-gold/40 bg-royal-ruby/50 text-royal-champagne"
          style={{ borderColor: themeColor }}
        >
          <MapPin className="h-4 w-4 sm:h-5 sm:w-5" />
        </div>
        <div className="flex-1">
          <span className="text-[10px] uppercase tracking-widest text-royal-gold font-sans font-semibold">
            Venue & Location
          </span>
          {venueName && (
            <h4 className="font-serif text-base sm:text-lg font-bold text-white mt-0.5 break-words">
              {venueName}
            </h4>
          )}
          {venueAddress && (
            <p className="mt-1 text-xs sm:text-sm font-sans text-gray-300 leading-relaxed whitespace-pre-line break-words">
              {venueAddress}
            </p>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-2.5">
        <a
          href={resolvedMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-royal-gold to-royal-champagne px-4 py-2.5 text-xs font-bold text-royal-dark shadow-gold hover:opacity-95 active:scale-95 transition-all"
        >
          <Navigation className="h-4 w-4" />
          Google Maps
        </a>

        <a
          href={appleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-xs font-medium text-white hover:bg-white/20 active:scale-95 transition-all"
        >
          <ExternalLink className="h-4 w-4" />
          Apple Maps
        </a>

        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-xs font-medium text-white hover:bg-white/20 active:scale-95 transition-all"
        >
          {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
          {copied ? 'Copied!' : 'Copy Address'}
        </button>
      </div>
    </div>
  );
};
