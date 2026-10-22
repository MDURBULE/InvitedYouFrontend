import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Shield,
  Lock,
  UserCheck,
  Trash2,
  Mail,
  ChevronRight,
  Eye,
  CheckCircle2,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy | InvitedYou',
  description: 'Understand how InvitedYou collects, protects, and respects your celebration data.',
};

export default function PrivacyPolicyPage() {
  const lastUpdated = 'October 2024';

  return (
    <main className="min-h-screen bg-[#0C0D14] text-gray-200">
      {/* Header */}
      <section className="relative overflow-hidden border-b border-royal-gold/20 bg-gradient-to-b from-[#141522] via-[#0E1019] to-[#0C0D14] py-12 sm:py-16">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-royal-gold/10 via-transparent to-transparent pointer-events-none" />

        <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center space-y-3">
          <nav className="flex items-center justify-center gap-2 text-xs text-gray-400 font-sans">
            <Link href="/" className="hover:text-royal-gold transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3 w-3 text-royal-gold/60" />
            <span className="text-royal-champagne font-medium">Privacy Policy</span>
          </nav>

          <div className="inline-flex items-center gap-1.5 rounded-full border border-royal-gold/30 bg-royal-gold/10 px-3 py-0.5 text-xs font-semibold text-royal-champagne">
            <Shield className="h-3.5 w-3.5 text-royal-gold" />
            <span>Privacy Commitment</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Privacy <span className="text-royal-gold">Policy</span>
          </h1>

          <p className="mx-auto max-w-xl text-xs sm:text-sm text-gray-300 font-sans leading-relaxed">
            We respect your privacy. This policy outlines how InvitedYou handles your personal and celebration data.
          </p>

          <p className="text-[11px] text-gray-500 font-sans">
            Last Updated: <strong className="text-gray-300">{lastUpdated}</strong>
          </p>
        </div>
      </section>

      {/* Highlights Grid */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 -mt-5">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="rounded-xl border border-royal-gold/20 bg-royal-dark/95 p-3.5 text-center shadow-lg">
            <UserCheck className="h-5 w-5 text-royal-gold mx-auto mb-1.5" />
            <h3 className="text-xs font-semibold text-white">No Guest Logins</h3>
            <p className="text-[11px] text-gray-400 mt-0.5">Guests view &amp; RSVP instantly without creating an account.</p>
          </div>
          <div className="rounded-xl border border-royal-gold/20 bg-royal-dark/95 p-3.5 text-center shadow-lg">
            <Lock className="h-5 w-5 text-royal-gold mx-auto mb-1.5" />
            <h3 className="text-xs font-semibold text-white">Zero Data Selling</h3>
            <p className="text-[11px] text-gray-400 mt-0.5">We never sell, rent, or monetize your contact information.</p>
          </div>
          <div className="rounded-xl border border-royal-gold/20 bg-royal-dark/95 p-3.5 text-center shadow-lg">
            <Shield className="h-5 w-5 text-royal-gold mx-auto mb-1.5" />
            <h3 className="text-xs font-semibold text-white">Encrypted &amp; Safe</h3>
            <p className="text-[11px] text-gray-400 mt-0.5">All passwords, media, and invites are secured with modern encryption.</p>
          </div>
          <div className="rounded-xl border border-royal-gold/20 bg-royal-dark/95 p-3.5 text-center shadow-lg">
            <Trash2 className="h-5 w-5 text-royal-gold mx-auto mb-1.5" />
            <h3 className="text-xs font-semibold text-white">Host Control</h3>
            <p className="text-[11px] text-gray-400 mt-0.5">Edit, unpublish, or permanently delete invitations at any time.</p>
          </div>
        </div>
      </section>

      {/* Concise Content Body */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 py-10 space-y-6 font-sans text-xs sm:text-sm">
        {/* 1. What We Collect */}
        <div className="rounded-2xl border border-white/10 bg-[#10121D] p-5 sm:p-6 space-y-3">
          <div className="flex items-center gap-2 text-royal-champagne font-serif text-base font-bold">
            <Eye className="h-4 w-4 text-royal-gold" />
            <h2>1. Information We Collect</h2>
          </div>
          <ul className="space-y-1.5 text-gray-300 list-disc list-inside">
            <li><strong className="text-white">Host Account Info:</strong> Your name, email address, password (securely hashed), and optional phone number.</li>
            <li><strong className="text-white">Event Details:</strong> Bride &amp; groom / celebrant names, ceremony dates, schedules, venue address, and uploaded event photos.</li>
            <li><strong className="text-white">Guest RSVP Data:</strong> Guest name, attendance status, headcount, and optional dietary preference or wishes.</li>
          </ul>
        </div>

        {/* 2. How We Use Information */}
        <div className="rounded-2xl border border-white/10 bg-[#10121D] p-5 sm:p-6 space-y-3">
          <div className="flex items-center gap-2 text-royal-champagne font-serif text-base font-bold">
            <CheckCircle2 className="h-4 w-4 text-royal-gold" />
            <h2>2. How We Use It</h2>
          </div>
          <p className="text-gray-300">
            We use your data solely to provide and improve the invitation service:
          </p>
          <ul className="space-y-1.5 text-gray-300 list-disc list-inside">
            <li>Rendering customized, animated invitation pages on mobile and desktop devices.</li>
            <li>Displaying RSVP responses and headcount tallies inside the host dashboard.</li>
            <li>Generating 1-tap Google Maps venue directions and calendar (.ics) reminders for guests.</li>
          </ul>
        </div>

        {/* 3. Guest Privacy Protection */}
        <div className="rounded-2xl border border-royal-gold/20 bg-[#10121D] p-5 sm:p-6 space-y-3">
          <div className="flex items-center gap-2 text-royal-champagne font-serif text-base font-bold">
            <UserCheck className="h-4 w-4 text-royal-gold" />
            <h2>3. Guest Privacy Protections</h2>
          </div>
          <p className="text-gray-300 leading-relaxed">
            Celebration guests are never asked to register, install an app, or set a password. Guest names and RSVPs are shared exclusively with the host of that specific event. We never send promotional messages or spam to guests.
          </p>
        </div>

        {/* 4. Security & Deletion */}
        <div className="rounded-2xl border border-white/10 bg-[#10121D] p-5 sm:p-6 space-y-3">
          <div className="flex items-center gap-2 text-royal-champagne font-serif text-base font-bold">
            <Lock className="h-4 w-4 text-royal-gold" />
            <h2>4. Data Storage &amp; Deletion Rights</h2>
          </div>
          <p className="text-gray-300 leading-relaxed">
            All data in transit is protected via HTTPS (TLS 1.3). As a host, you can edit or permanently delete any invitation from your dashboard at any time. When deleted, the public URL is disabled and all associated data is queued for permanent removal.
          </p>
        </div>

        {/* 5. Contact */}
        <div className="rounded-2xl border border-royal-gold/30 bg-gradient-to-tr from-royal-dark to-[#181A26] p-5 sm:p-6 space-y-2">
          <div className="flex items-center gap-2 text-royal-champagne font-serif text-base font-bold">
            <Mail className="h-4 w-4 text-royal-gold" />
            <h2>5. Questions or Requests?</h2>
          </div>
          <p className="text-gray-300">
            If you have questions about your privacy or wish to request data removal, email us at:{' '}
            <a href="mailto:privacy@invitedyou.com" className="text-royal-gold underline hover:text-royal-champagne">
              privacy@invitedyou.com
            </a>
          </p>
        </div>

        {/* Footer Navigation */}
        <div className="pt-4 flex items-center justify-between text-xs text-gray-500 border-t border-white/10">
          <Link href="/" className="text-royal-champagne hover:text-white transition-colors">
            &larr; Back to Home
          </Link>
          <Link href="/terms" className="text-royal-gold hover:underline">
            Read Terms &amp; Conditions &rarr;
          </Link>
        </div>
      </section>
    </main>
  );
}
