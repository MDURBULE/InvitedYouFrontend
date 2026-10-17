'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Sparkles, PlusCircle, LayoutDashboard, LogIn, LogOut, User, Menu, X } from 'lucide-react';
import { authApi, getStoredUser } from '@/lib/api';
import { AuthUser } from '@/types';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setUser(getStoredUser());
    setMobileMenuOpen(false);
  }, [pathname]);

  const handleLogout = () => {
    authApi.logout();
    setUser(null);
    setMobileMenuOpen(false);
    router.push('/');
  };

  // Do not show full navbar on public guest invitation page
  if (pathname.startsWith('/i/')) {
    return null;
  }

  return (
    <header className="sticky top-0 z-40 border-b border-royal-gold/20 bg-royal-dark/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-3 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 group shrink-0">
          <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-royal-ruby via-[#A12C2F] to-royal-gold shadow-gold">
            <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-white transition-transform group-hover:rotate-12" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-base sm:text-lg font-bold tracking-tight text-white group-hover:text-royal-champagne transition-colors">
              Invited<span className="text-royal-gold">You</span>
            </span>
            <span className="hidden sm:block text-[9px] uppercase tracking-widest text-gray-400 font-sans -mt-1">
              Celebration Invitations
            </span>
          </div>
        </Link>

        {/* Center Nav Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-sans font-medium text-gray-300">
          <Link
            href="/templates"
            className={`transition-colors hover:text-royal-champagne ${
              pathname === '/templates' ? 'text-royal-gold font-semibold' : ''
            }`}
          >
            Template Gallery
          </Link>
          <Link
            href="/templates?templateType=ANIMATED"
            className="flex items-center gap-1 text-royal-champagne hover:text-white transition-colors"
          >
            <Sparkles className="h-3.5 w-3.5 text-royal-gold animate-pulse" />
            Animated Invitations
          </Link>
          {user && (
            <Link
              href="/dashboard"
              className={`transition-colors hover:text-royal-champagne ${
                pathname === '/dashboard' ? 'text-royal-gold font-semibold' : ''
              }`}
            >
              My Invitations
            </Link>
          )}
        </nav>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-1.5 sm:gap-3">
          <Link
            href="/editor"
            className="flex items-center gap-1 sm:gap-1.5 rounded-full bg-gradient-to-r from-royal-gold to-royal-champagne px-2.5 sm:px-4 py-1.5 sm:py-2 text-xs font-bold text-royal-dark shadow-gold hover:opacity-95 active:scale-95 transition-all"
          >
            <PlusCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            <span className="hidden xs:inline sm:inline">Create</span>
            <span className="hidden sm:inline"> Invitation</span>
          </Link>

          {user ? (
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Link
                href="/dashboard"
                className="flex items-center gap-1 sm:gap-1.5 rounded-full border border-white/20 bg-white/5 px-2.5 sm:px-3 py-1.5 text-xs text-white hover:bg-white/10 transition-colors"
              >
                <User className="h-3.5 w-3.5 text-royal-gold" />
                <span className="hidden sm:inline">{user.firstName}</span>
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                title="Log Out"
              >
                <LogOut className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </button>
            </div>
          ) : (
            <Link
              href="/auth/login"
              className="flex items-center gap-1 sm:gap-1.5 rounded-full border border-white/20 bg-white/5 px-2.5 sm:px-3.5 py-1.5 text-xs text-white hover:bg-white/10 transition-colors"
            >
              <LogIn className="h-3.5 w-3.5" />
              <span>Sign In</span>
            </Link>
          )}

          {/* Mobile Hamburger Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex h-8 w-8 items-center justify-center rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-royal-gold/20 bg-royal-dark/95 px-4 py-4 space-y-3 backdrop-blur-xl animate-in slide-in-from-top-2 duration-200">
          <Link
            href="/templates"
            className="flex items-center justify-between rounded-xl p-2.5 text-sm font-medium text-white hover:bg-white/10 transition-colors"
          >
            <span>Browse Template Gallery</span>
            <span className="text-royal-gold">&rarr;</span>
          </Link>
          <Link
            href="/templates?templateType=ANIMATED"
            className="flex items-center justify-between rounded-xl p-2.5 text-sm font-medium text-royal-champagne hover:bg-white/10 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-royal-gold" />
              <span>Animated Invitations</span>
            </div>
            <span className="text-royal-gold">&rarr;</span>
          </Link>
          <Link
            href="/editor"
            className="flex items-center justify-between rounded-xl p-2.5 text-sm font-medium text-white hover:bg-white/10 transition-colors"
          >
            <span>Create Invitation Studio</span>
            <span className="text-royal-gold">&rarr;</span>
          </Link>
          {user && (
            <Link
              href="/dashboard"
              className="flex items-center justify-between rounded-xl p-2.5 text-sm font-medium text-white hover:bg-white/10 transition-colors"
            >
              <span>My Dashboard & Invites</span>
              <span className="text-royal-gold">&rarr;</span>
            </Link>
          )}
        </div>
      )}
    </header>
  );
};
