'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { authApi } from '@/lib/api';
import { Sparkles, ArrowRight, Lock, Mail, User, Phone } from 'lucide-react';

function RegisterContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/dashboard';

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await authApi.register({
        email,
        password,
        firstName,
        lastName,
        phoneNumber,
      });
      router.push(redirect);
    } catch (err: any) {
      setError(err.message || 'Registration failed. Please check your information.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[85vh] items-center justify-center px-3 sm:px-4 py-8 sm:py-12">
      <div className="w-full max-w-md rounded-3xl border border-royal-gold/30 bg-royal-dark/95 p-5 sm:p-8 shadow-2xl backdrop-blur-md space-y-6">
        <div className="text-center space-y-2">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-royal-ruby to-royal-gold shadow-gold">
            <Sparkles className="h-6 w-6 text-white" />
          </div>
          <h1 className="font-serif text-2xl font-bold text-white">Create an Account</h1>
          <p className="text-xs text-gray-400 font-sans">
            Start creating impressive digital invitations for your guests.
          </p>
        </div>

        {error && (
          <div className="rounded-xl border border-red-500/40 bg-red-500/10 p-3 text-xs text-red-300 text-center font-sans">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-gray-300 uppercase tracking-wider mb-1">
                First Name *
              </label>
              <div className="relative">
                <User className="pointer-events-none absolute left-3 top-2.5 h-3.5 w-3.5 text-gray-400" />
                <input
                  type="text"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Mayur"
                  className="w-full rounded-xl border border-white/20 bg-white/5 pl-9 pr-3 py-2 text-xs text-white placeholder-gray-500 focus:border-royal-gold focus:outline-none"
                />
              </div>
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-gray-300 uppercase tracking-wider mb-1">
                Last Name
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Durbule"
                className="w-full rounded-xl border border-white/20 bg-white/5 px-3 py-2 text-xs text-white placeholder-gray-500 focus:border-royal-gold focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-gray-300 uppercase tracking-wider mb-1">
              Email Address *
            </label>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3 top-2.5 h-3.5 w-3.5 text-gray-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-xl border border-white/20 bg-white/5 pl-9 pr-3 py-2 text-xs text-white placeholder-gray-500 focus:border-royal-gold focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-gray-300 uppercase tracking-wider mb-1">
              Phone / WhatsApp (Optional)
            </label>
            <div className="relative">
              <Phone className="pointer-events-none absolute left-3 top-2.5 h-3.5 w-3.5 text-gray-400" />
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full rounded-xl border border-white/20 bg-white/5 pl-9 pr-3 py-2 text-xs text-white placeholder-gray-500 focus:border-royal-gold focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-gray-300 uppercase tracking-wider mb-1">
              Password * (Min 6 chars)
            </label>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-3 top-2.5 h-3.5 w-3.5 text-gray-400" />
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl border border-white/20 bg-white/5 pl-9 pr-3 py-2 text-xs text-white placeholder-gray-500 focus:border-royal-gold focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-royal-gold to-royal-champagne py-3 text-sm font-bold text-royal-dark shadow-gold hover:opacity-95 active:scale-95 transition-all mt-4"
          >
            <span>{loading ? 'Creating account...' : 'Create Account'}</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        <div className="text-center pt-2 border-t border-white/10 text-xs text-gray-400 font-sans">
          Already have an account?{' '}
          <Link
            href={`/auth/login${redirect ? `?redirect=${redirect}` : ''}`}
            className="text-royal-gold font-semibold hover:underline"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="flex min-h-[85vh] items-center justify-center text-royal-champagne font-serif">Loading...</div>}>
      <RegisterContent />
    </Suspense>
  );
}
