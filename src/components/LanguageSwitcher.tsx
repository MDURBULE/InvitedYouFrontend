'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { Locale } from '@/i18n/types';
import { Globe, Check, ChevronDown } from 'lucide-react';

interface LanguageSwitcherProps {
  variant?: 'nav' | 'footer' | 'floating' | 'compact';
  className?: string;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  variant = 'nav',
  className = '',
}) => {
  const { locale, setLocale, availableLocales, localeInfo } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Variant: Footer (Horizontal tabs)
  if (variant === 'footer') {
    return (
      <div className={`flex items-center gap-1.5 p-1 rounded-xl bg-white/5 border border-white/10 ${className}`}>
        <Globe className="h-3.5 w-3.5 text-royal-gold ml-2 shrink-0" />
        <div className="flex items-center gap-1">
          {availableLocales.map((loc) => {
            const isActive = loc.code === locale;
            return (
              <button
                key={loc.code}
                type="button"
                onClick={() => setLocale(loc.code)}
                className={`px-2.5 py-1 text-xs font-sans rounded-lg transition-all flex items-center gap-1 ${
                  isActive
                    ? 'bg-gradient-to-r from-royal-gold to-royal-champagne text-royal-dark font-bold shadow-sm'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
                title={loc.label}
              >
                <span>{loc.flag}</span>
                <span>{loc.nativeLabel}</span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // Variant: Floating (Compact pill on public view)
  if (variant === 'floating') {
    return (
      <div className={`relative ${className}`} ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex h-9 sm:h-10 items-center gap-1.5 rounded-full border border-royal-gold/40 bg-royal-dark/90 px-3 text-xs font-sans font-medium text-royal-champagne backdrop-blur-md shadow-gold hover:bg-royal-dark transition-all"
          title="Change Language / भाषा बदलें / भाषा बदला"
          aria-label="Change Language"
        >
          <span className="text-sm">{localeInfo.flag}</span>
          <span className="font-semibold">{localeInfo.nativeLabel}</span>
          <ChevronDown className={`h-3 w-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <div className="absolute right-0 bottom-full mb-2 w-40 rounded-2xl border border-royal-gold/40 bg-[#140609]/95 p-1.5 shadow-2xl backdrop-blur-xl z-50">
            <div className="px-2 py-1 text-[10px] font-sans text-royal-gold/70 uppercase tracking-wider border-b border-white/10 mb-1">
              Select Language / भाषा
            </div>
            {availableLocales.map((loc) => {
              const isSelected = loc.code === locale;
              return (
                <button
                  key={loc.code}
                  type="button"
                  onClick={() => {
                    setLocale(loc.code);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 text-xs font-sans rounded-xl transition-all ${
                    isSelected
                      ? 'bg-royal-gold/20 text-royal-champagne font-bold'
                      : 'text-gray-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span>{loc.flag}</span>
                    <span>{loc.nativeLabel}</span>
                  </span>
                  {isSelected && <Check className="h-3.5 w-3.5 text-royal-gold" />}
                </button>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  // Variant: Navbar Dropdown (default)
  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 rounded-full border border-royal-gold/30 bg-royal-dark/80 px-2.5 py-1.5 text-xs font-sans font-medium text-gray-200 hover:text-white hover:border-royal-gold/60 transition-all shadow-sm"
        aria-label="Select Language"
      >
        <span className="text-sm">{localeInfo.flag}</span>
        <span className="font-medium text-royal-champagne hidden xs:inline">{localeInfo.nativeLabel}</span>
        <span className="font-bold text-royal-champagne xs:hidden">{localeInfo.short}</span>
        <ChevronDown className={`h-3 w-3 text-royal-gold transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-44 rounded-2xl border border-royal-gold/30 bg-royal-dark/95 p-1.5 shadow-2xl backdrop-blur-xl z-50 animate-in fade-in slide-in-from-top-1 duration-150">
          <div className="px-2.5 py-1 text-[10px] font-sans uppercase tracking-wider text-royal-gold/70 border-b border-white/10 mb-1">
            Choose Language / भाषा
          </div>
          {availableLocales.map((loc) => {
            const isSelected = loc.code === locale;
            return (
              <button
                key={loc.code}
                type="button"
                onClick={() => {
                  setLocale(loc.code);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs font-sans rounded-xl transition-all ${
                  isSelected
                    ? 'bg-royal-gold/20 text-royal-champagne font-bold'
                    : 'text-gray-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                <span className="flex items-center gap-2">
                  <span className="text-sm">{loc.flag}</span>
                  <div className="flex flex-col text-left">
                    <span className="text-xs">{loc.nativeLabel}</span>
                    <span className="text-[10px] text-gray-400 font-normal">{loc.label}</span>
                  </div>
                </span>
                {isSelected && <Check className="h-3.5 w-3.5 text-royal-gold" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
