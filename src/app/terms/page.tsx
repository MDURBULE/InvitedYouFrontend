import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Scale,
  ShieldCheck,
  Sparkles,
  Share2,
  ChevronRight,
  AlertCircle,
  HelpCircle,
  Mail,
  CheckCircle2,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms & Conditions | InvitedYou',
  description: 'Simple and fair terms for creating and sharing digital invitations on InvitedYou.',
};

export default function TermsAndConditionsPage() {
  const lastUpdated = 'October 2024';

  return (
    <main className="min-h-screen bg-[#0C0D14] text-gray-200">
      {/* Header */}
      <section className="relative overflow-hidden border-b border-royal-gold/20 bg-gradient-to-b from-[#141522] via-[#0E1019] to-[#0C0D14] py-12 sm:py-16">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-royal-ruby/15 via-transparent to-transparent pointer-events-none" />

        <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center space-y-3">
          <nav className="flex items-center justify-center gap-2 text-xs text-gray-400 font-sans">
            <Link href="/" className="hover:text-royal-gold transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3 w-3 text-royal-gold/60" />
            <span className="text-royal-champagne font-medium">Terms &amp; Conditions</span>
          </nav>

          <div className="inline-flex items-center gap-1.5 rounded-full border border-royal-gold/30 bg-royal-gold/10 px-3 py-0.5 text-xs font-semibold text-royal-champagne">
            <Scale className="h-3.5 w-3.5 text-royal-gold" />
            <span>User Agreement</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Terms &amp; <span className="text-royal-gold">Conditions</span>
          </h1>

          <p className="mx-auto max-w-xl text-xs sm:text-sm text-gray-300 font-sans leading-relaxed">
            Welcome to InvitedYou. By using our platform, you agree to these simple and fair terms.
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
            <ShieldCheck className="h-5 w-5 text-royal-gold mx-auto mb-1.5" />
            <h3 className="text-xs font-semibold text-white">You Own Your Content</h3>
            <p className="text-[11px] text-gray-400 mt-0.5">You retain full rights to your uploaded photos and event details.</p>
          </div>
          <div className="rounded-xl border border-royal-gold/20 bg-royal-dark/95 p-3.5 text-center shadow-lg">
            <Sparkles className="h-5 w-5 text-royal-gold mx-auto mb-1.5" />
            <h3 className="text-xs font-semibold text-white">Proprietary Designs</h3>
            <p className="text-[11px] text-gray-400 mt-0.5">InvitedYou templates, animations, and code belong to InvitedYou.</p>
          </div>
          <div className="rounded-xl border border-royal-gold/20 bg-royal-dark/95 p-3.5 text-center shadow-lg">
            <Share2 className="h-5 w-5 text-royal-gold mx-auto mb-1.5" />
            <h3 className="text-xs font-semibold text-white">Public Guest Links</h3>
            <p className="text-[11px] text-gray-400 mt-0.5">Share links freely with guests on WhatsApp, SMS, or social media.</p>
          </div>
          <div className="rounded-xl border border-royal-gold/20 bg-royal-dark/95 p-3.5 text-center shadow-lg">
            <AlertCircle className="h-5 w-5 text-royal-gold mx-auto mb-1.5" />
            <h3 className="text-xs font-semibold text-white">Respectful Use</h3>
            <p className="text-[11px] text-gray-400 mt-0.5">Zero tolerance for spam, harassment, or infringing material.</p>
          </div>
        </div>
      </section>

      {/* Concise Content Body */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 py-10 space-y-6 font-sans text-xs sm:text-sm">
        {/* 1. Services */}
        <div className="rounded-2xl border border-white/10 bg-[#10121D] p-5 sm:p-6 space-y-3">
          <div className="flex items-center gap-2 text-royal-champagne font-serif text-base font-bold">
            <CheckCircle2 className="h-4 w-4 text-royal-gold" />
            <h2>1. Service Overview</h2>
          </div>
          <p className="text-gray-300 leading-relaxed">
            InvitedYou provides a platform to create, customize, and share interactive celebration invitations featuring animated reveals, ceremony agendas, interactive venue maps, and digital RSVP management.
          </p>
        </div>

        {/* 2. Content Ownership */}
        <div className="rounded-2xl border border-white/10 bg-[#10121D] p-5 sm:p-6 space-y-3">
          <div className="flex items-center gap-2 text-royal-champagne font-serif text-base font-bold">
            <ShieldCheck className="h-4 w-4 text-royal-gold" />
            <h2>2. Content Ownership &amp; Intellectual Property</h2>
          </div>
          <ul className="space-y-1.5 text-gray-300 list-disc list-inside">
            <li><strong className="text-white">Your Content:</strong> You own all photos, names, text, and stories you upload. You grant us permission to host and display them for your invitations.</li>
            <li><strong className="text-white">Our Platform:</strong> InvitedYou owns all website designs, code, animations, templates, and trademarks. You may not copy, scrape, or resell our templates.</li>
          </ul>
        </div>

        {/* 3. Acceptable Use */}
        <div className="rounded-2xl border border-royal-ruby/30 bg-[#10121D] p-5 sm:p-6 space-y-3">
          <div className="flex items-center gap-2 text-royal-champagne font-serif text-base font-bold">
            <AlertCircle className="h-4 w-4 text-royal-ruby" />
            <h2>3. Acceptable Use</h2>
          </div>
          <p className="text-gray-300 leading-relaxed">
            You agree to use InvitedYou only for lawful celebration announcements. Do not upload pornographic, abusive, fraudulent, or copyright-infringing content. We reserve the right to remove non-compliant invitations and suspend offending accounts.
          </p>
        </div>

        {/* 4. Guest Sharing */}
        <div className="rounded-2xl border border-white/10 bg-[#10121D] p-5 sm:p-6 space-y-3">
          <div className="flex items-center gap-2 text-royal-champagne font-serif text-base font-bold">
            <Share2 className="h-4 w-4 text-royal-gold" />
            <h2>4. Sharing &amp; Guest Access</h2>
          </div>
          <p className="text-gray-300 leading-relaxed">
            When you publish an invite, a shareable link (e.g. <code>invitedyou.com/i/your-slug</code>) is generated. You are responsible for distributing your link. Anyone with the link can view your event details and submit an RSVP.
          </p>
        </div>

        {/* 5. Disclaimers & Law */}
        <div className="rounded-2xl border border-white/10 bg-[#10121D] p-5 sm:p-6 space-y-3">
          <div className="flex items-center gap-2 text-royal-champagne font-serif text-base font-bold">
            <Scale className="h-4 w-4 text-royal-gold" />
            <h2>5. Service Availability &amp; Governing Law</h2>
          </div>
          <p className="text-gray-300 leading-relaxed">
            We strive for 99.9% uptime for your celebration dates. The service is provided &ldquo;as is&rdquo;. These terms are governed by the laws of India, with jurisdiction in Maharashtra, India.
          </p>
        </div>

        {/* 6. Contact */}
        <div className="rounded-2xl border border-royal-gold/30 bg-gradient-to-tr from-royal-dark to-[#181A26] p-5 sm:p-6 space-y-2">
          <div className="flex items-center gap-2 text-royal-champagne font-serif text-base font-bold">
            <Mail className="h-4 w-4 text-royal-gold" />
            <h2>6. Contact Us</h2>
          </div>
          <p className="text-gray-300">
            For questions regarding these terms, reach us at:{' '}
            <a href="mailto:support@invitedyou.com" className="text-royal-gold underline hover:text-royal-champagne">
              support@invitedyou.com
            </a>
          </p>
        </div>

        {/* Footer Navigation */}
        <div className="pt-4 flex items-center justify-between text-xs text-gray-500 border-t border-white/10">
          <Link href="/" className="text-royal-champagne hover:text-white transition-colors">
            &larr; Back to Home
          </Link>
          <Link href="/privacy" className="text-royal-gold hover:underline">
            Read Privacy Policy &rarr;
          </Link>
        </div>
      </section>
    </main>
  );
}
