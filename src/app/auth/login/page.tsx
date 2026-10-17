'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { authApi } from '@/lib/api';
import { Sparkles, ArrowRight, Lock, Mail } from 'lucide-react';

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/dashboard';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await authApi.login({ email, password });
      router.push(redirect);
    } catch (err: any) {
      setError(err.message || 'Login failed. Please check your email and password.');
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
          <h1 className="font-serif text-2xl font-bold text-white">Welcome Back</h1>
          <p className="text-xs text-gray-400 font-sans">
            Sign in to manage and edit your celebration invitations.
          </p>
        </div>

        {error && (
          <div className="rounded-xl border border-red-500/40 bg-red-500/10 p-3 text-xs text-red-300 text-center font-sans">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3.5 top-3 h-4 w-4 text-gray-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-xl border border-white/20 bg-white/5 pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-500 focus:border-royal-gold focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-3.5 top-3 h-4 w-4 text-gray-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl border border-white/20 bg-white/5 pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-500 focus:border-royal-gold focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-royal-gold to-royal-champagne py-3 text-sm font-bold text-royal-dark shadow-gold hover:opacity-95 active:scale-95 transition-all mt-2"
          >
            <span>{loading ? 'Signing in...' : 'Sign In'}</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        <div className="text-center pt-2 border-t border-white/10 text-xs text-gray-400 font-sans">
          Don&apos;t have an account yet?{' '}
          <Link
            href={`/auth/register${redirect ? `?redirect=${redirect}` : ''}`}
            className="text-royal-gold font-semibold hover:underline"
          >
            Create account
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="flex min-h-[85vh] items-center justify-center text-royal-champagne font-serif">Loading...</div>}>
      <LoginContent />
    </Suspense>
  );
}
