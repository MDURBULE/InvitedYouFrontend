import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Shield,
  Lock,
  Eye,
  FileText,
  UserCheck,
  Server,
  Share2,
  Trash2,
  Mail,
  ChevronRight,
  Clock,
  Sparkles,
  CheckCircle2,
  Calendar,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy | InvitedYou — Animated Digital Invitations',
  description:
    'Read InvitedYou’s Privacy Policy to understand how we collect, protect, and handle personal information for hosts and celebration guests.',
};

export default function PrivacyPolicyPage() {
  const lastUpdated = 'October 20, 2024';

  const sections = [
    { id: 'introduction', title: '1. Introduction & Scope' },
    { id: 'information-collected', title: '2. Information We Collect' },
    { id: 'how-we-use', title: '3. How We Use Your Information' },
    { id: 'guest-privacy', title: '4. Guest Privacy Protections' },
    { id: 'data-security', title: '5. Storage & Security' },
    { id: 'integrations', title: '6. WhatsApp & Integrations' },
    { id: 'cookies', title: '7. Cookies & Local Storage' },
    { id: 'retention-deletion', title: '8. Retention & Deletion Rights' },
    { id: 'your-rights', title: '9. Your Privacy Rights' },
    { id: 'contact', title: '10. Contact Us' },
  ];

  return (
    <main className="min-h-screen bg-[#0C0D14] text-gray-200">
      {/* Hero Header */}
      <section className="relative overflow-hidden border-b border-royal-gold/20 bg-gradient-to-b from-[#141522] via-[#0E1019] to-[#0C0D14] py-14 sm:py-20">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-royal-gold/10 via-transparent to-transparent pointer-events-none" />

        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center space-y-4">
          {/* Breadcrumb */}
          <nav className="flex items-center justify-center gap-2 text-xs text-gray-400 font-sans mb-3">
            <Link href="/" className="hover:text-royal-gold transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3 w-3 text-royal-gold/60" />
            <span className="text-royal-champagne font-medium">Privacy Policy</span>
          </nav>

          <div className="inline-flex items-center gap-2 rounded-full border border-royal-gold/30 bg-royal-gold/10 px-3.5 py-1 text-xs font-semibold text-royal-champagne">
            <Shield className="h-3.5 w-3.5 text-royal-gold" />
            <span>Privacy & Data Protection Commitment</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Privacy <span className="text-royal-gold">Policy</span>
          </h1>

          <p className="mx-auto max-w-2xl text-sm sm:text-base text-gray-300 font-sans leading-relaxed">
            At <strong className="text-white">InvitedYou</strong>, your privacy and the sacred trust of your
            celebrations are of paramount importance. This policy explains how we treat personal information
            when you create, customize, or view our digital invitation experiences.
          </p>

          <div className="flex items-center justify-center gap-2 pt-2 text-xs text-gray-400 font-sans">
            <Clock className="h-3.5 w-3.5 text-royal-gold" />
            <span>Effective Date & Last Updated: <strong className="text-white">{lastUpdated}</strong></span>
          </div>
        </div>
      </section>

      {/* Highlight Cards Grid */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="rounded-2xl border border-royal-gold/20 bg-royal-dark/90 p-4 shadow-lg backdrop-blur-md">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-royal-gold/10 text-royal-gold mb-3">
              <UserCheck className="h-5 w-5" />
            </div>
            <h2 className="font-serif text-sm font-semibold text-white">Zero Guest Sign-Up</h2>
            <p className="text-xs text-gray-400 mt-1">
              Invited guests never need an account or app download to view your event.
            </p>
          </div>

          <div className="rounded-2xl border border-royal-gold/20 bg-royal-dark/90 p-4 shadow-lg backdrop-blur-md">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-royal-gold/10 text-royal-gold mb-3">
              <Lock className="h-5 w-5" />
            </div>
            <h2 className="font-serif text-sm font-semibold text-white">No Selling of Data</h2>
            <p className="text-xs text-gray-400 mt-1">
              We never sell, monetize, or broker host or guest contact numbers or emails.
            </p>
          </div>

          <div className="rounded-2xl border border-royal-gold/20 bg-royal-dark/90 p-4 shadow-lg backdrop-blur-md">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-royal-gold/10 text-royal-gold mb-3">
              <Server className="h-5 w-5" />
            </div>
            <h2 className="font-serif text-sm font-semibold text-white">Encrypted Storage</h2>
            <p className="text-xs text-gray-400 mt-1">
              All invitation assets, guest responses, and tokens are encrypted in transit and at rest.
            </p>
          </div>

          <div className="rounded-2xl border border-royal-gold/20 bg-royal-dark/90 p-4 shadow-lg backdrop-blur-md">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-royal-gold/10 text-royal-gold mb-3">
              <Trash2 className="h-5 w-5" />
            </div>
            <h2 className="font-serif text-sm font-semibold text-white">Complete Host Control</h2>
            <p className="text-xs text-gray-400 mt-1">
              Easily update, archive, or permanently purge your event data whenever you wish.
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
              <FileText className="h-4 w-4 text-royal-gold" />
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
                Need Assistance?
              </span>
              <p className="text-xs text-gray-400 leading-relaxed">
                Have specific privacy concerns or request a data export?
              </p>
              <a
                href="mailto:privacy@invitedyou.com"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-royal-gold hover:underline"
              >
                <Mail className="h-3.5 w-3.5" />
                privacy@invitedyou.com
              </a>
            </div>
          </aside>

          {/* Legal Clauses */}
          <div className="lg:col-span-8 space-y-10 font-sans text-sm leading-relaxed text-gray-300">
            {/* 1. Introduction */}
            <article id="introduction" className="rounded-2xl border border-white/10 bg-[#10121D] p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-2 text-royal-champagne font-serif text-lg font-bold">
                <Sparkles className="h-5 w-5 text-royal-gold" />
                <h2>1. Introduction &amp; Scope</h2>
              </div>
              <p>
                Welcome to <strong>InvitedYou</strong> (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;). We provide a premium,
                interactive celebration invitation service available at <code>invitedyou.com</code> and related web applications.
              </p>
              <p>
                This Privacy Policy applies to all individuals who access or use our services, including event hosts who
                register accounts and create invitations (&ldquo;Hosts&rdquo;), as well as recipients who open invitation links
                to view ceremony details, RSVP, or access venue navigation (&ldquo;Guests&rdquo;).
              </p>
              <p>
                By accessing or using InvitedYou, you consent to the practices described in this document. If you do not
                agree with this Privacy Policy, please discontinue using the platform.
              </p>
            </article>

            {/* 2. Information We Collect */}
            <article id="information-collected" className="rounded-2xl border border-white/10 bg-[#10121D] p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-2 text-royal-champagne font-serif text-lg font-bold">
                <Eye className="h-5 w-5 text-royal-gold" />
                <h2>2. Information We Collect</h2>
              </div>
              <p>We collect information in three ways: information provided by Hosts, information provided by Guests, and information gathered automatically.</p>

              <div className="space-y-3 pt-2">
                <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4 space-y-1.5">
                  <h3 className="font-semibold text-white text-xs uppercase tracking-wider flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-royal-gold" />
                    A. Host Account Information
                  </h3>
                  <p className="text-xs text-gray-400">
                    When you register as an event host, we collect your first name, last name, email address, optional contact phone number, and a hashed password.
                  </p>
                </div>

                <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4 space-y-1.5">
                  <h3 className="font-semibold text-white text-xs uppercase tracking-wider flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-royal-gold" />
                    B. Event &amp; Invitation Content
                  </h3>
                  <p className="text-xs text-gray-400">
                    Details you enter to construct your invitations, including event titles, host names (e.g. bride, groom, celebrant), dates, schedules, venue names, physical addresses, map coordinates, custom messages, background audio choices, and uploaded event photographs.
                  </p>
                </div>

                <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4 space-y-1.5">
                  <h3 className="font-semibold text-white text-xs uppercase tracking-wider flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-royal-gold" />
                    C. Guest RSVP &amp; Interaction Responses
                  </h3>
                  <p className="text-xs text-gray-400">
                    When guests interact with an invitation, we record their RSVP status (Attending / Regretful), submitted guest names, attendee headcounts, dietary notes, and heartfelt wishes. Guests are not required to create user accounts to submit RSVPs.
                  </p>
                </div>

                <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4 space-y-1.5">
                  <h3 className="font-semibold text-white text-xs uppercase tracking-wider flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-royal-gold" />
                    D. Technical &amp; Device Information
                  </h3>
                  <p className="text-xs text-gray-400">
                    Standard web server logs such as IP addresses, browser types, operating systems, and anonymous viewing metrics to ensure responsive animation rendering and protect against malicious abuse.
                  </p>
                </div>
              </div>
            </article>

            {/* 3. How We Use Information */}
            <article id="how-we-use" className="rounded-2xl border border-white/10 bg-[#10121D] p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-2 text-royal-champagne font-serif text-lg font-bold">
                <FileText className="h-5 w-5 text-royal-gold" />
                <h2>3. How We Use Your Information</h2>
              </div>
              <p>We use the collected information solely for legitimate service purposes, including:</p>
              <ul className="space-y-2 text-xs text-gray-300 list-disc list-inside">
                <li><strong className="text-white">Delivering the Invitation Experience:</strong> Rendering custom invitation web pages, animated envelope unsealings, royal reveals, and responsive typography on any device.</li>
                <li><strong className="text-white">Facilitating Host Management:</strong> Aggregating RSVP tallies, dietary headcounts, and guest lists in the host&apos;s private dashboard.</li>
                <li><strong className="text-white">Guest Utility Features:</strong> Providing 1-tap Google Maps directions, Apple Maps links, and .ICS calendar export downloads.</li>
                <li><strong className="text-white">WhatsApp &amp; Social Previews:</strong> Generating dynamic Open Graph preview cards for high-fidelity link sharing.</li>
                <li><strong className="text-white">Security &amp; Fraud Prevention:</strong> Preventing automated bots, DDoS disruptions, or unauthorized content modification.</li>
              </ul>
            </article>

            {/* 4. Guest Privacy Protections */}
            <article id="guest-privacy" className="rounded-2xl border border-royal-gold/20 bg-[#10121D] p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-2 text-royal-champagne font-serif text-lg font-bold">
                <UserCheck className="h-5 w-5 text-royal-gold" />
                <h2>4. Guest Privacy Protections</h2>
              </div>
              <p>
                We believe guests attending your celebration should never be subjected to unwanted marketing, aggressive tracking, or forced sign-ups.
              </p>
              <div className="rounded-xl bg-royal-gold/5 border border-royal-gold/20 p-4 text-xs space-y-2 text-gray-300">
                <p className="font-semibold text-royal-champagne">Our Specific Guest Privacy Commitments:</p>
                <ul className="space-y-1 list-disc list-inside text-gray-400">
                  <li>Guests do not create an account or verify passwords to view an invite.</li>
                  <li>Guest RSVP records are shared exclusively with the host of that specific event.</li>
                  <li>We never send promotional emails or advertising SMS messages to guests who RSVP.</li>
                </ul>
              </div>
            </article>

            {/* 5. Storage & Security */}
            <article id="data-security" className="rounded-2xl border border-white/10 bg-[#10121D] p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-2 text-royal-champagne font-serif text-lg font-bold">
                <Lock className="h-5 w-5 text-royal-gold" />
                <h2>5. Storage, Infrastructure &amp; Security</h2>
              </div>
              <p>
                We employ multi-layered technical, administrative, and physical safeguards designed to protect personal
                information against unauthorized access, loss, or alteration.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3 space-y-1">
                  <span className="font-semibold text-white block">TLS/SSL Encryption</span>
                  <span className="text-gray-400">All data in transit is encrypted using modern 256-bit HTTPS protocols.</span>
                </div>
                <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3 space-y-1">
                  <span className="font-semibold text-white block">Secure Database Access</span>
                  <span className="text-gray-400">Parameterized JDBC execution and strict access isolation preventing data leakage.</span>
                </div>
                <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3 space-y-1">
                  <span className="font-semibold text-white block">Credential Hashing</span>
                  <span className="text-gray-400">Host passwords are irreversibly salted and cryptographically hashed.</span>
                </div>
                <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3 space-y-1">
                  <span className="font-semibold text-white block">High Durability Storage</span>
                  <span className="text-gray-400">Cloud media storage with automated daily backups and redundant mirrors.</span>
                </div>
              </div>
            </article>

            {/* 6. WhatsApp & Integrations */}
            <article id="integrations" className="rounded-2xl border border-white/10 bg-[#10121D] p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-2 text-royal-champagne font-serif text-lg font-bold">
                <Share2 className="h-5 w-5 text-royal-gold" />
                <h2>6. WhatsApp &amp; Third-Party Services</h2>
              </div>
              <p>
                InvitedYou features deep integration with WhatsApp to help hosts send invites effortlessly:
              </p>
              <ul className="space-y-2 text-xs text-gray-300 list-disc list-inside">
                <li><strong className="text-white">WhatsApp Click-to-Chat:</strong> When you share an invitation via WhatsApp, we construct standard deep links (<code>https://wa.me/?text=...</code>). We do not read your private WhatsApp messages, phone contacts, or chat history.</li>
                <li><strong className="text-white">Mapping Providers:</strong> Venue navigation links direct guests to Google Maps, Apple Maps, or Waze using public coordinates provided by the host.</li>
                <li><strong className="text-white">Calendar Services:</strong> Adding events generates an RFC-standard <code>.ics</code> file executed on the user&apos;s device without harvesting personal calendar data.</li>
              </ul>
            </article>

            {/* 7. Cookies & Local Storage */}
            <article id="cookies" className="rounded-2xl border border-white/10 bg-[#10121D] p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-2 text-royal-champagne font-serif text-lg font-bold">
                <Server className="h-5 w-5 text-royal-gold" />
                <h2>7. Cookies &amp; Local Storage</h2>
              </div>
              <p>
                We use cookies and browser local storage strictly for functional, necessary purposes:
              </p>
              <ul className="space-y-2 text-xs text-gray-300 list-disc list-inside">
                <li><strong className="text-white">Session Authentication:</strong> Remembering active host logins (JWT tokens stored securely).</li>
                <li><strong className="text-white">Draft Persistence:</strong> Storing temporary in-progress invitation edits locally so work is not lost if the browser is accidentally closed.</li>
                <li><strong className="text-white">Visual Preferences:</strong> Preserving sound mute/play toggles during invitation previews.</li>
              </ul>
              <p className="text-xs text-gray-400">
                We do not deploy intrusive third-party cross-site advertising tracking cookies.
              </p>
            </article>

            {/* 8. Retention & Deletion */}
            <article id="retention-deletion" className="rounded-2xl border border-white/10 bg-[#10121D] p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-2 text-royal-champagne font-serif text-lg font-bold">
                <Trash2 className="h-5 w-5 text-royal-gold" />
                <h2>8. Data Retention &amp; Host Deletion Rights</h2>
              </div>
              <p>
                We retain invitation data for as long as your account remains active or as needed to provide you with digital keepsake access.
              </p>
              <p>
                Hosts can delete any invitation draft or published invitation at any time directly through the dashboard.
                Upon deletion, the public URL is immediately deactivated, guest RSVP logs are severed, and uploaded photo assets are queued for permanent deletion from storage buckets.
              </p>
            </article>

            {/* 9. Your Privacy Rights */}
            <article id="your-rights" className="rounded-2xl border border-white/10 bg-[#10121D] p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-2 text-royal-champagne font-serif text-lg font-bold">
                <Shield className="h-5 w-5 text-royal-gold" />
                <h2>9. Your Privacy Rights</h2>
              </div>
              <p>
                Depending on your location, you may have legal rights regarding your personal information, including:
              </p>
              <ul className="space-y-2 text-xs text-gray-300 list-disc list-inside">
                <li>The right to request access to the personal data we store about you.</li>
                <li>The right to rectify inaccurate or incomplete records.</li>
                <li>The right to request permanent deletion (&ldquo;Right to be Forgotten&rdquo;).</li>
                <li>The right to export your guest RSVPs and event details in portable digital formats.</li>
              </ul>
              <p className="text-xs text-gray-400">
                To exercise any of these rights, contact us at <code>privacy@invitedyou.com</code>.
              </p>
            </article>

            {/* 10. Contact Us */}
            <article id="contact" className="rounded-2xl border border-royal-gold/30 bg-gradient-to-tr from-royal-dark to-[#181A26] p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-2 text-royal-champagne font-serif text-lg font-bold">
                <Mail className="h-5 w-5 text-royal-gold" />
                <h2>10. Contact Us &amp; Grievance Officer</h2>
              </div>
              <p>
                If you have questions, feedback, or complaints regarding this Privacy Policy or our data handling practices, please contact our team:
              </p>
              <div className="rounded-xl border border-white/10 bg-black/30 p-4 space-y-2 text-xs">
                <p><strong className="text-white">InvitedYou Legal &amp; Privacy Office</strong></p>
                <p className="text-gray-400">Email: <a href="mailto:privacy@invitedyou.com" className="text-royal-gold hover:underline">privacy@invitedyou.com</a></p>
                <p className="text-gray-400">General Support: <a href="mailto:support@invitedyou.com" className="text-royal-gold hover:underline">support@invitedyou.com</a></p>
                <p className="text-gray-400">Response turnaround: Within 24-48 business hours.</p>
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
            Have questions regarding our terms? Read our{' '}
            <Link href="/terms" className="text-royal-gold underline hover:text-royal-champagne">
              Terms &amp; Conditions
            </Link>
            .
          </div>
        </div>
      </section>
    </main>
  );
}
