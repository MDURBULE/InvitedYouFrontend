import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#0C0D14',
};

export const metadata: Metadata = {
  title: 'InvitedYou — Animated Digital Invitation Platform',
  description:
    'Create stunning, interactive, animated digital invitations for weddings, birthdays, engagements, and celebrations. Instant WhatsApp sharing, no app download required for guests.',
  openGraph: {
    title: 'InvitedYou — Animated Digital Invitations',
    description: 'Modern, interactive celebration invitations with royal animations and one-tap WhatsApp sharing.',
    url: 'https://invitedyou.com',
    siteName: 'InvitedYou',
    locale: 'en_IN',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen flex flex-col bg-[#0C0D14] text-gray-100 antialiased">
        <Navbar />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
