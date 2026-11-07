'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sparkles, Heart } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { LanguageSwitcher } from './LanguageSwitcher';

export const Footer: React.FC = () => {
  const pathname = usePathname();
  const { t } = useLanguage();

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
            {t('footer.tagline')}
          </p>
          <div className="pt-2">
            <span className="text-[11px] text-gray-400 font-sans block mb-1.5 uppercase tracking-wider">
              Language / भाषा:
            </span>
            <LanguageSwitcher variant="footer" />
          </div>
        </div>

        <div>
          <h4 className="font-serif text-sm font-semibold text-white uppercase tracking-wider mb-3">
            {t('footer.occasions')}
          </h4>
          <ul className="space-y-2 text-xs font-sans">
            <li>
              <Link href="/templates?category=WEDDING" className="hover:text-royal-gold transition-colors">
                {t('categories.wedding')}
              </Link>
            </li>
            <li>
              <Link href="/templates?category=ENGAGEMENT" className="hover:text-royal-gold transition-colors">
                {t('categories.engagement')}
              </Link>
            </li>
            <li>
              <Link href="/templates?category=BIRTHDAY" className="hover:text-royal-gold transition-colors">
                {t('categories.birthday')}
              </Link>
            </li>
            <li>
              <Link href="/templates?category=HOUSEWARMING" className="hover:text-royal-gold transition-colors">
                {t('categories.housewarming')}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-serif text-sm font-semibold text-white uppercase tracking-wider mb-3">
            {t('footer.presets')}
          </h4>
          <ul className="space-y-2 text-xs font-sans">
            <li className="flex items-center gap-1.5">
              <span className="text-royal-gold">💌</span> {t('invitationOpening.tapRoyalSeal')}
            </li>
            <li className="flex items-center gap-1.5">
              <span className="text-royal-gold">🚪</span> {t('invitationOpening.tapPalaceDoors')}
            </li>
            <li className="flex items-center gap-1.5">
              <span className="text-royal-gold">🌿</span> {t('invitationOpening.bloomInvitation')}
            </li>
            <li className="flex items-center gap-1.5">
              <span className="text-royal-gold">🎉</span> {t('invitationOpening.popToReveal')}
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-serif text-sm font-semibold text-white uppercase tracking-wider mb-3">
            {t('footer.guestGuarantee')}
          </h4>
          <p className="text-xs font-sans leading-relaxed text-gray-400">
            {t('footer.guaranteeText')}
          </p>
          <div className="mt-4 flex items-center gap-1 text-xs text-gray-400 font-sans">
            <span>{t('footer.madeWithLove')}</span>
            <Heart className="h-3.5 w-3.5 text-royal-ruby fill-royal-ruby" />
          </div>
          <div className="mt-3 pt-3 border-t border-white/10 flex items-center gap-3 text-xs text-gray-400 font-sans">
            <Link href="/privacy" className="hover:text-royal-champagne transition-colors">
              {t('footer.privacyPolicy')}
            </Link>
            <span className="text-white/20">•</span>
            <Link href="/terms" className="hover:text-royal-champagne transition-colors">
              {t('footer.termsConditions')}
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500 font-sans text-center sm:text-left">
        <div>
          &copy; {new Date().getFullYear()} InvitedYou. {t('footer.allRightsReserved')}
        </div>
        <div className="flex items-center gap-4 sm:gap-6">
          <Link href="/privacy" className="hover:text-royal-champagne transition-colors">
            {t('footer.privacyPolicy')}
          </Link>
          <span className="text-white/20">•</span>
          <Link href="/terms" className="hover:text-royal-champagne transition-colors">
            {t('footer.termsConditions')}
          </Link>
        </div>
      </div>
    </footer>
  );
};
