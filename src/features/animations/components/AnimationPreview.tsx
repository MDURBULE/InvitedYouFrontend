'use client';

import React, { useState } from 'react';
import { AnimationConfig, DesignConfig, TemplateResponse } from '@/types';
import { AnimatedInvitationRenderer } from './AnimatedInvitationRenderer';
import { X, RefreshCw } from 'lucide-react';

interface AnimationPreviewModalProps {
  template: TemplateResponse;
  onClose: () => void;
  onSelect?: () => void;
}

export const AnimationPreviewModal: React.FC<AnimationPreviewModalProps> = ({
  template,
  onClose,
  onSelect,
}) => {
  const [replayKey, setReplayKey] = useState(0);

  const handleReplay = () => {
    setReplayKey((prev) => prev + 1);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-2 sm:p-4 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative flex h-[94vh] sm:h-[92vh] w-full max-w-2xl flex-col rounded-2xl sm:rounded-3xl border border-royal-gold/40 bg-royal-dark shadow-2xl overflow-hidden">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between border-b border-white/10 px-3 sm:px-6 py-2.5 sm:py-4 bg-black/40">
          <div className="max-w-[120px] xs:max-w-[180px] sm:max-w-xs">
            <span className="hidden xs:block text-[10px] uppercase tracking-widest text-royal-gold font-sans font-semibold">
              Live Animation Preview
            </span>
            <h3 className="font-serif text-sm sm:text-lg font-bold text-white truncate">
              {template.name}
            </h3>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              onClick={handleReplay}
              className="flex items-center gap-1 sm:gap-1.5 rounded-full border border-white/20 bg-white/10 px-2 sm:px-3 py-1.5 text-xs text-royal-champagne hover:bg-white/20 transition-colors"
              title="Replay Animation"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Replay</span>
            </button>

            {onSelect && (
              <button
                type="button"
                onClick={onSelect}
                className="rounded-full bg-gradient-to-r from-royal-gold to-royal-champagne px-3 sm:px-4 py-1.5 text-xs font-bold text-royal-dark shadow-gold hover:opacity-95 transition-opacity"
              >
                Use Template
              </button>
            )}

            <button
              type="button"
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Preview Canvas */}
        <div className="flex-1 overflow-y-auto">
          <AnimatedInvitationRenderer
            key={replayKey}
            title="Siddharth & Ananya's Wedding Celebration"
            eventCategory={template.category}
            hosts="Mr. & Mrs. Rajesh Sharma"
            honorees="Siddharth & Ananya"
            eventDate={new Date(Date.now() + 1000 * 60 * 60 * 24 * 45).toISOString()}
            venueName="The Grand Palace Hotel & Convention Centre"
            venueAddress="Palace Grounds, MG Road, Bengaluru, Karnataka 560001"
            googleMapsUrl="https://maps.google.com"
            functions={JSON.stringify([
              {
                id: '1',
                name: 'Traditional Sangeet & Mehendi',
                date: 'November 20, 2026',
                time: '6:30 PM Onwards',
                venueName: 'The Royal Lawn',
                dressCode: 'Festive Vibrant Traditional',
              },
              {
                id: '2',
                name: 'Auspicious Muhurtham Ceremony',
                date: 'November 21, 2026',
                time: '9:45 AM Auspicious Time',
                venueName: 'Main Kalyana Mandapam',
                dressCode: 'South Indian Silks / Formal Attire',
              },
            ])}
            designConfig={template.defaultDesignConfig}
            animationConfig={template.defaultAnimationConfig}
            mediaGallery={JSON.stringify([
              {
                id: '1',
                url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=600&q=80',
                caption: 'Pre-wedding photoshoot',
              },
              {
                id: '2',
                url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80',
                caption: 'Engagement smiles',
              },
            ])}
            slug="preview-demo"
            isPreview={true}
          />
        </div>
      </div>
    </div>
  );
};
