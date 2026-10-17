'use client';

import React, { useState } from 'react';
import { Share2, Copy, Check } from 'lucide-react';

interface WhatsAppShareButtonProps {
  title: string;
  honorees?: string;
  slug: string;
}

export const WhatsAppShareButton: React.FC<WhatsAppShareButtonProps> = ({
  title,
  honorees,
  slug,
}) => {
  const [copied, setCopied] = useState(false);

  const getFullUrl = () => {
    if (typeof window !== 'undefined') {
      return `${window.location.origin}/i/${slug}`;
    }
    return `https://invitedyou.com/i/${slug}`;
  };

  const shareText = `*${honorees || title}*\nYou are warmly invited to celebrate with us!\n\nOpen your digital invitation here:\n${getFullUrl()}`;

  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(getFullUrl());
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2.5 text-xs font-semibold shadow-md active:scale-95 transition-all"
      >
        <Share2 className="h-4 w-4" />
        Share on WhatsApp
      </a>

      <button
        type="button"
        onClick={handleCopy}
        className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 hover:bg-white/20 text-white px-4 py-2.5 text-xs font-medium active:scale-95 transition-all"
      >
        {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
        {copied ? 'Link Copied!' : 'Copy Link'}
      </button>
    </div>
  );
};
