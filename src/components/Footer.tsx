'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sparkles, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const pathname = usePathname();

  // Hide on public invitation view
  if (pathname.startsWith('/i/')) {
    return null;
  }

  return (
    <footer className="border-t border-royal-gold/20 bg-[#0B0C11] text-gray-400 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-royal-ruby to-royal-gold shadow-gold">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <span className="font-serif text-lg font-bold text-white">
              Invited<span className="text-royal-gold">You</span>
            </span>
          </div>
          <p className="text-xs font-sans leading-relaxed text-gray-400">
            Elegant, modern, and memorable digital invitations. Crafted with royal aesthetics, fluid
            motion, and seamless WhatsApp sharing for guests worldwide.
          </p>
        </div>

        <div>
          <h4 className="font-serif text-sm font-semibold text-white uppercase tracking-wider mb-3">
            Occasions
          </h4>
          <ul className="space-y-2 text-xs font-sans">
            <li>
              <Link href="/templates?category=WEDDING" className="hover:text-royal-gold transition-colors">
                Royal Wedding Invitations
              </Link>
            </li>
            <li>
              <Link href="/templates?category=ENGAGEMENT" className="hover:text-royal-gold transition-colors">
                Engagement & Ring Ceremonies
              </Link>
            </li>
            <li>
              <Link href="/templates?category=BIRTHDAY" className="hover:text-royal-gold transition-colors">
                Milestone Birthday Celebrations
              </Link>
            </li>
            <li>
              <Link href="/templates?category=HOUSEWARMING" className="hover:text-royal-gold transition-colors">
                Griha Pravesh & Home Pooja
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-serif text-sm font-semibold text-white uppercase tracking-wider mb-3">
            Animation Presets
          </h4>
          <ul className="space-y-2 text-xs font-sans">
            <li className="flex items-center gap-1.5">
              <span className="text-royal-gold">💌</span> Envelope Reveal & Wax Seal
            </li>
            <li className="flex items-center gap-1.5">
              <span className="text-royal-gold">🚪</span> Royal Palace Doors Parting
            </li>
            <li className="flex items-center gap-1.5">
              <span className="text-royal-gold">🌿</span> Botanical Bloom & Vines
            </li>
            <li className="flex items-center gap-1.5">
              <span className="text-royal-gold">🎉</span> Festive Confetti Celebration
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-serif text-sm font-semibold text-white uppercase tracking-wider mb-3">
            Guest Guarantee
          </h4>
          <p className="text-xs font-sans leading-relaxed text-gray-400">
            Zero guest registration, instant mobile browser rendering, one-tap venue directions, and
            full calendar support.
          </p>
          <div className="mt-4 flex items-center gap-1 text-xs text-gray-400 font-sans">
            <span>Made with</span>
            <Heart className="h-3.5 w-3.5 text-royal-ruby fill-royal-ruby" />
            <span>for life&apos;s grand celebrations</span>
          </div>
          <div className="mt-3 pt-3 border-t border-white/10 flex items-center gap-3 text-xs text-gray-400 font-sans">
            <Link href="/privacy" className="hover:text-royal-champagne transition-colors">
              Privacy Policy
            </Link>
            <span className="text-white/20">•</span>
            <Link href="/terms" className="hover:text-royal-champagne transition-colors">
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500 font-sans text-center sm:text-left">
        <div>
          &copy; {new Date().getFullYear()} InvitedYou. All rights reserved.
        </div>
        <div className="flex items-center gap-4 sm:gap-6">
          <Link href="/privacy" className="hover:text-royal-champagne transition-colors">
            Privacy Policy
          </Link>
          <span className="text-white/20">•</span>
          <Link href="/terms" className="hover:text-royal-champagne transition-colors">
            Terms &amp; Conditions
          </Link>
        </div>
      </div>
    </footer>
  );
};
