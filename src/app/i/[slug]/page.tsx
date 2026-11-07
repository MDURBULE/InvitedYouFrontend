'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { publicApi } from '@/lib/api';
import { InvitationResponse } from '@/types';
import { AnimatedInvitationRenderer } from '@/features/animations/components/AnimatedInvitationRenderer';
import { Sparkles, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/i18n/LanguageContext';

export default function PublicInvitationPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const router = useRouter();
  const { t, locale } = useLanguage();

  const [invitation, setInvitation] = useState<InvitationResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    async function fetchInvitation() {
      setLoading(true);
      setError(null);
      try {
        const data = await publicApi.getInvitationBySlug(slug);
        setInvitation(data);
      } catch (err: any) {
        // Fallback for demo or preview slug
        if (slug.includes('siddharth') || slug.includes('demo') || slug.includes('preview')) {
          const sampleHonorees =
            locale === 'mr'
              ? 'सिद्धार्थ आणि अनन्या'
              : locale === 'hi'
              ? 'सिद्धार्थ एवं अनन्या'
              : 'Siddharth & Ananya';

          const sampleTitle =
            locale === 'mr'
              ? 'सिद्धार्थ आणि अनन्या यांचा शुभविवाह'
              : locale === 'hi'
              ? 'सिद्धार्थ एवं अनन्या का शाही विवाह समारोह'
              : "Siddharth & Ananya's Royal Wedding";

          const sampleHosts =
            locale === 'mr'
              ? 'सौ. व श्री. शर्मा आणि सौ. व श्री. वर्मा'
              : locale === 'hi'
              ? 'श्रीमती एवं श्री शर्मा व श्रीमती एवं श्री वर्मा'
              : 'Mr. & Mrs. Sharma & Mr. & Mrs. Verma';

          const sampleFunctions =
            locale === 'mr'
              ? [
                  {
                    id: '1',
                    name: 'पारंपरिक संगीत व मेहंदी',
                    date: '२० नोव्हेंबर, २०२६',
                    time: 'सायंकाळी ६:३० वाजता',
                    venueName: 'द रॉयल लॉन',
                    dressCode: 'पारंपरिक वेशभूषा',
                  },
                  {
                    id: '2',
                    name: 'शुभविवाह मुहूर्त सोहळा',
                    date: '२१ नोव्हेंबर, २०२६',
                    time: 'सकाळी ९:४५ वाजता शुभ मुहूर्त',
                    venueName: 'मुख्य कल्याण मंडपम',
                    dressCode: 'सिल्क व पारंपरिक पोशाख',
                  },
                ]
              : locale === 'hi'
              ? [
                  {
                    id: '1',
                    name: 'पारंपरिक संगीत एवं मेहंदी',
                    date: '२० नवंबर, २०२६',
                    time: 'शाम ६:३० बजे से',
                    venueName: 'द रॉयल लॉन',
                    dressCode: 'पारंपरिक उत्सव वेशभूषा',
                  },
                  {
                    id: '2',
                    name: 'मांगलिक विवाह मुहूर्त एवं फेरे',
                    date: '२१ नवंबर, २०२६',
                    time: 'प्रातः ९:४५ बजे शुभ मुहूर्त',
                    venueName: 'मुख्य कल्याण मंडपम',
                    dressCode: 'पारंपरिक रेशमी परिधान',
                  },
                ]
              : [
                  {
                    id: '1',
                    name: 'Traditional Sangeet & Mehendi',
                    date: 'November 20, 2026',
                    time: '6:30 PM Onwards',
                    venueName: 'The Royal Lawn',
                    dressCode: 'Vibrant Traditional Attire',
                  },
                  {
                    id: '2',
                    name: 'Auspicious Muhurtham Ceremony',
                    date: 'November 21, 2026',
                    time: '9:45 AM Auspicious Time',
                    venueName: 'Main Kalyana Mandapam',
                    dressCode: 'South Indian Silks & Traditional Whites',
                  },
                ];

          setInvitation({
            id: 1,
            publicId: '00000000-0000-0000-0000-000000000001',
            userId: 1,
            templateId: 'royal-rajwada-wedding',
            slug: slug,
            title: sampleTitle,
            eventCategory: 'WEDDING',
            hosts: sampleHosts,
            honorees: sampleHonorees,
            eventDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString(),
            venueName: 'The Grand Palace & Convention Centre',
            venueAddress: 'Palace Grounds, Jayamahal Road, Bengaluru, Karnataka 560006',
            googleMapsUrl: 'https://maps.google.com',
            functions: JSON.stringify(sampleFunctions),
            designConfig: JSON.stringify({
              primaryColor: '#8B1E2E',
              secondaryColor: '#D4AF37',
              backgroundColor: '#140609',
              titleFont: 'Cinzel Decorative',
              bodyFont: 'Outfit',
            }),
            animationConfig: JSON.stringify({
              version: 1,
              preset: 'royal-curtain-doors',
              intensity: 'balanced',
              interaction: 'tap-to-open',
              enableParticles: true,
              particleType: 'gold-dust',
              particleCount: 26,
              allowReplay: true,
              reducedMotionFallback: true,
              steps: [],
            }),
            mediaGallery: JSON.stringify([
              {
                id: '1',
                url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80',
                caption: 'Joyous smiles',
                mediaType: 'image',
              },
              {
                id: '2',
                url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=600&q=80',
                caption: 'Pre-wedding photoshoot',
                mediaType: 'image',
              },
            ]),
            musicUrl: '',
            status: 'PUBLISHED',
            isPublic: true,
            viewsCount: 42,
            version: 1,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          });
        } else {
          setError(err.message || 'Invitation not found or is currently private.');
        }
      } finally {
        setLoading(false);
      }
    }
    fetchInvitation();
  }, [slug, locale]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0C0D14] text-center p-4">
        <div className="space-y-3">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-royal-ruby/50 border border-royal-gold/40 shadow-gold">
            <Sparkles className="h-6 w-6 text-royal-gold animate-spin-slow" />
          </div>
          <p className="font-serif text-lg text-royal-champagne">
            {locale === 'mr'
              ? 'आपली निमंत्रण पत्रिका तयार होत आहे...'
              : locale === 'hi'
              ? 'आपका निमंत्रण पत्र तैयार हो रहा है...'
              : 'Preparing your invitation...'}
          </p>
        </div>
      </div>
    );
  }

  if (error || !invitation) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#0C0D14] p-4 text-center">
        <div className="max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-md space-y-4">
          <span className="text-3xl">💌</span>
          <h2 className="font-serif text-2xl font-bold text-white">
            {locale === 'mr'
              ? 'निमंत्रण पत्रिका सापडली नाही'
              : locale === 'hi'
              ? 'निमंत्रण पत्र नहीं मिला'
              : 'Invitation Not Found'}
          </h2>
          <p className="text-xs text-gray-400 font-sans leading-relaxed">
            {error || 'This digital invitation link may be private, unpublished, or expired.'}
          </p>
          <div className="pt-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-royal-gold to-royal-champagne px-6 py-2.5 text-xs font-bold text-royal-dark shadow-gold"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>{t('nav.home')}</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <AnimatedInvitationRenderer
      title={invitation.title}
      eventCategory={invitation.eventCategory}
      hosts={invitation.hosts}
      honorees={invitation.honorees}
      eventDate={invitation.eventDate}
      venueName={invitation.venueName}
      venueAddress={invitation.venueAddress}
      googleMapsUrl={invitation.googleMapsUrl}
      functions={invitation.functions}
      designConfig={invitation.designConfig}
      animationConfig={invitation.animationConfig}
      mediaGallery={invitation.mediaGallery}
      musicUrl={invitation.musicUrl}
      slug={invitation.slug}
      isPreview={false}
    />
  );
}
