import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  FileCheck2,
  Scale,
  ShieldCheck,
  Sparkles,
  ChevronRight,
  Clock,
  AlertCircle,
  HelpCircle,
  Mail,
  CheckCircle2,
  Share2,
  Smartphone,
  Lock,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms and Conditions | InvitedYou — Animated Digital Invitations',
  description:
    'Review the Terms and Conditions governing your use of InvitedYou’s digital celebration invitation creator, templates, animations, and RSVP services.',
};

export default function TermsAndConditionsPage() {
  const lastUpdated = 'October 20, 2024';

  const sections = [
    { id: 'acceptance', title: '1. Acceptance of Terms' },
    { id: 'services', title: '2. Description of Services' },
    { id: 'accounts', title: '3. Accounts & Security' },
    { id: 'ip-rights', title: '4. Intellectual Property & Ownership' },
    { id: 'user-content', title: '5. User Content & Upload Guidelines' },
    { id: 'acceptable-use', title: '6. Acceptable Use Policy' },
    { id: 'public-links', title: '7. Guest Links & WhatsApp Sharing' },
    { id: 'availability', title: '8. Service Availability & Keepsakes' },
    { id: 'disclaimers', title: '9. Disclaimers of Warranties' },
    { id: 'liability', title: '10. Limitation of Liability' },
    { id: 'termination', title: '11. Termination & Account Deletion' },
    { id: 'governing-law', title: '12. Governing Law & Disputes' },
    { id: 'contact', title: '13. Contact & Inquiries' },
  ];

  return (
    <main className="min-h-screen bg-[#0C0D14] text-gray-200">
      {/* Hero Header */}
      <section className="relative overflow-hidden border-b border-royal-gold/20 bg-gradient-to-b from-[#141522] via-[#0E1019] to-[#0C0D14] py-14 sm:py-20">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-royal-ruby/15 via-transparent to-transparent pointer-events-none" />

        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center space-y-4">
          {/* Breadcrumb */}
          <nav className="flex items-center justify-center gap-2 text-xs text-gray-400 font-sans mb-3">
            <Link href="/" className="hover:text-royal-gold transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3 w-3 text-royal-gold/60" />
            <span className="text-royal-champagne font-medium">Terms &amp; Conditions</span>
          </nav>

          <div className="inline-flex items-center gap-2 rounded-full border border-royal-gold/30 bg-royal-gold/10 px-3.5 py-1 text-xs font-semibold text-royal-champagne">
            <Scale className="h-3.5 w-3.5 text-royal-gold" />
            <span>Platform User Agreement</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Terms &amp; <span className="text-royal-gold">Conditions</span>
          </h1>

          <p className="mx-auto max-w-2xl text-sm sm:text-base text-gray-300 font-sans leading-relaxed">
            Please read these terms carefully before creating or sharing digital invitations with{' '}
            <strong className="text-white">InvitedYou</strong>. By accessing or using our services, you agree
            to be bound by these provisions.
          </p>

          <div className="flex items-center justify-center gap-2 pt-2 text-xs text-gray-400 font-sans">
            <Clock className="h-3.5 w-3.5 text-royal-gold" />
            <span>Effective Date &amp; Last Updated: <strong className="text-white">{lastUpdated}</strong></span>
          </div>
        </div>
      </section>

      {/* Highlights Grid */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="rounded-2xl border border-royal-gold/20 bg-royal-dark/90 p-4 shadow-lg backdrop-blur-md">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-royal-gold/10 text-royal-gold mb-3">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h2 className="font-serif text-sm font-semibold text-white">Your Content, Your Own</h2>
            <p className="text-xs text-gray-400 mt-1">
              You retain full ownership of your photographs, wedding stories, and family details.
            </p>
          </div>

          <div className="rounded-2xl border border-royal-gold/20 bg-royal-dark/90 p-4 shadow-lg backdrop-blur-md">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-royal-gold/10 text-royal-gold mb-3">
              <Share2 className="h-5 w-5" />
            </div>
            <h2 className="font-serif text-sm font-semibold text-white">Guest Accessibility</h2>
            <p className="text-xs text-gray-400 mt-1">
              Shareable links work directly in any mobile or desktop web browser without logins.
            </p>
          </div>

          <div className="rounded-2xl border border-royal-gold/20 bg-royal-dark/90 p-4 shadow-lg backdrop-blur-md">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-royal-gold/10 text-royal-gold mb-3">
              <Sparkles className="h-5 w-5" />
            </div>
            <h2 className="font-serif text-sm font-semibold text-white">Proprietary Designs</h2>
            <p className="text-xs text-gray-400 mt-1">
              InvitedYou animations, templates, and styles are protected by intellectual property laws.
            </p>
          </div>

          <div className="rounded-2xl border border-royal-gold/20 bg-royal-dark/90 p-4 shadow-lg backdrop-blur-md">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-royal-gold/10 text-royal-gold mb-3">
              <Smartphone className="h-5 w-5" />
            </div>
            <h2 className="font-serif text-sm font-semibold text-white">High Concurrency Uptime</h2>
            <p className="text-xs text-gray-400 mt-1">
              Built for high traffic when thousands of celebration guests open your links simultaneously.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Quick Navigation Sidebar */}
          <aside className="lg:col-span-4 sticky top-24 rounded-2xl border border-white/10 bg-[#12141F] p-5 shadow-xl">
            <div className="flex items-center gap-2 pb-3 border-b border-white/10 text-royal-champagne font-serif text-sm font-semibold">
              <FileCheck2 className="h-4 w-4 text-royal-gold" />
              <span>Table of Contents</span>
            </div>
            <nav className="mt-4 space-y-1 font-sans text-xs">
              {sections.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="block rounded-lg px-2.5 py-1.5 text-gray-400 hover:text-royal-champagne hover:bg-white/5 transition-colors"
                >
                  {item.title}
                </a>
              ))}
            </nav>

            <div className="mt-6 pt-4 border-t border-white/10 space-y-2">
              <span className="text-[11px] uppercase tracking-wider text-gray-500 font-semibold block">
                Legal Inquiries
              </span>
              <p className="text-xs text-gray-400 leading-relaxed">
                Questions regarding rights or terms of use? Contact our legal team:
              </p>
              <a
                href="mailto:legal@invitedyou.com"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-royal-gold hover:underline"
              >
                <Mail className="h-3.5 w-3.5" />
                legal@invitedyou.com
              </a>
            </div>
          </aside>

          {/* Legal Clauses */}
          <div className="lg:col-span-8 space-y-10 font-sans text-sm leading-relaxed text-gray-300">
            {/* 1. Acceptance of Terms */}
            <article id="acceptance" className="rounded-2xl border border-white/10 bg-[#10121D] p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-2 text-royal-champagne font-serif text-lg font-bold">
                <Scale className="h-5 w-5 text-royal-gold" />
                <h2>1. Acceptance of Terms</h2>
              </div>
              <p>
                These Terms and Conditions (&ldquo;Terms&rdquo;) constitute a legally binding agreement between you
                (&ldquo;User,&rdquo; &ldquo;Host,&rdquo; or &ldquo;Guest&rdquo;) and <strong>InvitedYou</strong> (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;),
                governing your access to and use of the website <code>invitedyou.com</code>, associated mobile web experiences,
                APIs, and digital invitation authoring tools.
              </p>
              <p>
                By creating an account, publishing an invitation, or opening an invitation URL, you affirm that you are at
                least 18 years of age (or have reached the age of majority in your jurisdiction) and possess the legal
                capacity to enter into these Terms. If you do not agree to these Terms, you must immediately refrain from
                using the platform.
              </p>
            </article>

            {/* 2. Services */}
            <article id="services" className="rounded-2xl border border-white/10 bg-[#10121D] p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-2 text-royal-champagne font-serif text-lg font-bold">
                <Sparkles className="h-5 w-5 text-royal-gold" />
                <h2>2. Description of Services</h2>
              </div>
              <p>
                InvitedYou provides a digital web platform that enables users to design, personalize, publish, and distribute
                celebration invitations (including weddings, engagements, birthdays, and cultural ceremonies) featuring:
              </p>
              <ul className="space-y-2 text-xs text-gray-300 list-disc list-inside">
                <li>Animated envelope unsealings, royal door reveals, and botanical bloom animation presets.</li>
                <li>Custom event schedules, multiple ceremony agendas, venue addresses, and map coordinate navigation.</li>
                <li>Digital RSVP response collection and headcount management for hosts.</li>
                <li>One-tap calendar integration (.ICS calendar file generation for Google Calendar, Apple, Outlook).</li>
                <li>Optimized WhatsApp share card previews and one-tap forwarding links.</li>
              </ul>
              <p className="text-xs text-gray-400">
                We reserve the right to upgrade, modify, enhance, or discontinue specific templates, features, or design styles at our discretion.
              </p>
            </article>

            {/* 3. Accounts & Security */}
            <article id="accounts" className="rounded-2xl border border-white/10 bg-[#10121D] p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-2 text-royal-champagne font-serif text-lg font-bold">
                <Lock className="h-5 w-5 text-royal-gold" />
                <h2>3. Accounts &amp; Security</h2>
              </div>
              <p>
                To create and publish invitations, you must register an account. You agree to provide accurate, current, and
                complete information during the registration process and to keep your credentials confidential.
              </p>
              <p>
                You are solely responsible for all activities that occur under your account. If you suspect unauthorized access
                or any security breach, you must notify us immediately at <code>security@invitedyou.com</code>. InvitedYou is
                not liable for any losses arising from unauthorized account usage.
              </p>
            </article>

            {/* 4. IP Rights */}
            <article id="ip-rights" className="rounded-2xl border border-white/10 bg-[#10121D] p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-2 text-royal-champagne font-serif text-lg font-bold">
                <ShieldCheck className="h-5 w-5 text-royal-gold" />
                <h2>4. Intellectual Property &amp; Platform Ownership</h2>
              </div>
              <p>
                <strong>Our Intellectual Property:</strong> All software, code, algorithms, animation presets (e.g. envelope reveals,
                curtain parting, wax seal designs), vector graphics, curated fonts, UI layouts, and trademarks are the exclusive
                property of InvitedYou and its licensors. You are granted a limited, non-exclusive, non-transferable, revocable
                license to use our templates strictly for your personal, non-commercial celebration invitations.
              </p>
              <p>
                You may not reverse-engineer, decompile, scrape, redistribute, or resell InvitedYou templates or code without
                prior explicit written authorization from InvitedYou.
              </p>
            </article>

            {/* 5. User Content */}
            <article id="user-content" className="rounded-2xl border border-white/10 bg-[#10121D] p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-2 text-royal-champagne font-serif text-lg font-bold">
                <CheckCircle2 className="h-5 w-5 text-royal-gold" />
                <h2>5. User Content &amp; Upload Guidelines</h2>
              </div>
              <p>
                <strong>Your Ownership:</strong> You retain full copyright and ownership of all photographs, couple stories, event names,
                family announcements, and text (&ldquo;User Content&rdquo;) that you upload or input into InvitedYou.
              </p>
              <p>
                <strong>License to Host:</strong> By uploading User Content, you grant InvitedYou a worldwide, royalty-free license to host,
                cache, compress, display, and transmit that content solely for the purpose of rendering and delivering your digital
                invitations to you and your invited guests.
              </p>
              <p className="text-xs text-gray-400">
                You represent and warrant that you possess all necessary rights, permissions, or model releases for any images or personal
                details uploaded to the platform.
              </p>
            </article>

            {/* 6. Acceptable Use */}
            <article id="acceptable-use" className="rounded-2xl border border-royal-ruby/30 bg-[#10121D] p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-2 text-royal-champagne font-serif text-lg font-bold">
                <AlertCircle className="h-5 w-5 text-royal-ruby" />
                <h2>6. Acceptable Use Policy</h2>
              </div>
              <p>You agree not to use InvitedYou to create or transmit content that:</p>
              <ul className="space-y-2 text-xs text-gray-300 list-disc list-inside">
                <li>Is unlawful, defamatory, libelous, harassing, abusive, fraudulent, or threatening.</li>
                <li>Contains explicit adult pornography, unsolicited sexual depictions, or graphic violence.</li>
                <li>Infringes upon copyrights, trademarks, privacy rights, or publicity rights of any third party.</li>
                <li>Distributes malicious software, worms, phishing exploits, or links to deceptive domains.</li>
                <li>Sends unsolicited bulk spam or harvested contact information.</li>
              </ul>
              <p className="text-xs text-red-300">
                We reserve the right to remove any invitation or terminate accounts found violating this Acceptable Use Policy immediately and without prior notice.
              </p>
            </article>

            {/* 7. Public Links & WhatsApp */}
            <article id="public-links" className="rounded-2xl border border-white/10 bg-[#10121D] p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-2 text-royal-champagne font-serif text-lg font-bold">
                <Share2 className="h-5 w-5 text-royal-gold" />
                <h2>7. Guest Links &amp; WhatsApp Sharing</h2>
              </div>
              <p>
                When you publish an invitation, a unique, accessible web link (e.g., <code>invitedyou.com/i/your-event-slug</code>)
                is generated. Anyone with access to this link can view the celebration details and submit an RSVP.
              </p>
              <p>
                You acknowledge that you are responsible for the distribution of your public event link via WhatsApp, SMS, email,
                or social media. InvitedYou is not liable for unauthorized distribution or sharing of your event links by third parties.
              </p>
            </article>

            {/* 8. Availability & Keepsakes */}
            <article id="availability" className="rounded-2xl border border-white/10 bg-[#10121D] p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-2 text-royal-champagne font-serif text-lg font-bold">
                <Clock className="h-5 w-5 text-royal-gold" />
                <h2>8. Service Availability &amp; Keepsake Access</h2>
              </div>
              <p>
                We strive for continuous, high-availability platform uptime to ensure your guests experience smooth animation
                loading on your celebration day.
              </p>
              <p>
                Published invitations remain accessible online through the conclusion of your scheduled event dates and for a
                reasonable keepsake period thereafter. However, we recommend exporting your guest RSVP lists and preserving your
                original photo assets locally.
              </p>
            </article>

            {/* 9. Disclaimers */}
            <article id="disclaimers" className="rounded-2xl border border-white/10 bg-[#10121D] p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-2 text-royal-champagne font-serif text-lg font-bold">
                <HelpCircle className="h-5 w-5 text-royal-gold" />
                <h2>9. Disclaimers of Warranties</h2>
              </div>
              <p className="text-xs uppercase tracking-wider text-gray-400">
                THE SERVICE IS PROVIDED ON AN &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE&rdquo; BASIS WITHOUT WARRANTIES OF ANY KIND,
                WHETHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR
                NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, BUG-FREE, OR ERROR-FREE.
              </p>
            </article>

            {/* 10. Limitation of Liability */}
            <article id="liability" className="rounded-2xl border border-white/10 bg-[#10121D] p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-2 text-royal-champagne font-serif text-lg font-bold">
                <Scale className="h-5 w-5 text-royal-gold" />
                <h2>10. Limitation of Liability</h2>
              </div>
              <p>
                TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL INVITEDYOU, ITS FOUNDERS, DIRECTORS, OR
                AFFILIATES BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES (INCLUDING LOSS
                OF DATA, EVENT ATTENDANCE DISCREPANCIES, OR THIRD-PARTY MESSAGING CARRIER CHARGES) ARISING OUT OF OR IN CONNECTION
                WITH YOUR USE OF THE SERVICE.
              </p>
            </article>

            {/* 11. Termination */}
            <article id="termination" className="rounded-2xl border border-white/10 bg-[#10121D] p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-2 text-royal-champagne font-serif text-lg font-bold">
                <CheckCircle2 className="h-5 w-5 text-royal-gold" />
                <h2>11. Termination &amp; Account Deletion</h2>
              </div>
              <p>
                You may terminate your account at any time by contacting our support team or deleting your published events through
                the host dashboard.
              </p>
              <p>
                We reserve the right to suspend or terminate access to any account that breaches these Terms or engages in harmful,
                abusive, or fraudulent conduct.
              </p>
            </article>

            {/* 12. Governing Law */}
            <article id="governing-law" className="rounded-2xl border border-white/10 bg-[#10121D] p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-2 text-royal-champagne font-serif text-lg font-bold">
                <Scale className="h-5 w-5 text-royal-gold" />
                <h2>12. Governing Law &amp; Dispute Resolution</h2>
              </div>
              <p>
                These Terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict
                of law principles. Any legal suit, action, or proceeding arising out of or related to these Terms shall be instituted
                exclusively in the competent courts located in Maharashtra, India.
              </p>
            </article>

            {/* 13. Contact & Inquiries */}
            <article id="contact" className="rounded-2xl border border-royal-gold/30 bg-gradient-to-tr from-royal-dark to-[#181A26] p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-2 text-royal-champagne font-serif text-lg font-bold">
                <Mail className="h-5 w-5 text-royal-gold" />
                <h2>13. Contact &amp; Legal Notices</h2>
              </div>
              <p>
                For questions regarding these Terms or to provide formal legal notices, please reach out to us:
              </p>
              <div className="rounded-xl border border-white/10 bg-black/30 p-4 space-y-2 text-xs">
                <p><strong className="text-white">InvitedYou Legal Counsel</strong></p>
                <p className="text-gray-400">Legal Inquiries: <a href="mailto:legal@invitedyou.com" className="text-royal-gold hover:underline">legal@invitedyou.com</a></p>
                <p className="text-gray-400">Support &amp; Feedback: <a href="mailto:support@invitedyou.com" className="text-royal-gold hover:underline">support@invitedyou.com</a></p>
                <p className="text-gray-400">Website: <a href="https://invitedyou.com" className="text-royal-gold hover:underline">https://invitedyou.com</a></p>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Back to top / Return banner */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pb-16 text-center">
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            href="/"
            className="text-xs font-semibold text-royal-champagne hover:text-white transition-colors flex items-center gap-1.5"
          >
            &larr; Return to Homepage
          </Link>
          <div className="text-xs text-gray-500 font-sans">
            Need information about our data practices? Read our{' '}
            <Link href="/privacy" className="text-royal-gold underline hover:text-royal-champagne">
              Privacy Policy
            </Link>
            .
          </div>
        </div>
      </section>
    </main>
  );
}
