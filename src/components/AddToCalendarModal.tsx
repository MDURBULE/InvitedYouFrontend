'use client';

import React, { useState } from 'react';
import { Calendar, Download, X, ExternalLink } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

interface AddToCalendarModalProps {
  title: string;
  honorees?: string;
  eventDate?: string;
  venueName?: string;
  venueAddress?: string;
  description?: string;
}

export const AddToCalendarModal: React.FC<AddToCalendarModalProps> = ({
  title,
  honorees,
  eventDate,
  venueName,
  venueAddress,
  description,
}) => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  if (!eventDate) return null;

  const startDate = new Date(eventDate);
  const endDate = new Date(startDate.getTime() + 4 * 60 * 60 * 1000); // 4 hours celebration duration

  const formatGoogleDate = (date: Date) => {
    return date.toISOString().replace(/-|:|\.\d+/g, '');
  };

  const eventTitle = honorees ? `${honorees} — ${title}` : title;
  const location = `${venueName || ''} ${venueAddress || ''}`.trim();
  const details = description || `Invited to celebrate: ${eventTitle}`;

  // Google Calendar URL
  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    eventTitle
  )}&dates=${formatGoogleDate(startDate)}/${formatGoogleDate(endDate)}&details=${encodeURIComponent(
    details
  )}&location=${encodeURIComponent(location)}`;

  // Outlook Calendar URL
  const outlookCalendarUrl = `https://outlook.live.com/calendar/0/deeplink/compose?subject=${encodeURIComponent(
    eventTitle
  )}&startdt=${startDate.toISOString()}&enddt=${endDate.toISOString()}&body=${encodeURIComponent(
    details
  )}&location=${encodeURIComponent(location)}`;

  // Download ICS File
  const handleDownloadIcs = () => {
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//InvitedYou//Digital Invitations//EN',
      'CALSCALE:GREGORIAN',
      'BEGIN:VEVENT',
      `UID:${Date.now()}@invitedyou.com`,
      `DTSTAMP:${formatGoogleDate(new Date())}`,
      `DTSTART:${formatGoogleDate(startDate)}`,
      `DTEND:${formatGoogleDate(endDate)}`,
      `SUMMARY:${eventTitle}`,
      `DESCRIPTION:${details}`,
      `LOCATION:${location}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `${title.replace(/\s+/g, '_')}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="flex items-center justify-center gap-2 rounded-xl border border-royal-gold/40 bg-royal-dark/90 px-4 py-2.5 text-xs font-semibold text-royal-champagne hover:bg-royal-dark transition-all shadow-md active:scale-95"
      >
        <Calendar className="h-4 w-4 text-royal-gold" />
        <span>{t('calendar.addToCalendar')}</span>
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-sm rounded-2xl border border-royal-gold/40 bg-[#161722] p-6 shadow-2xl">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="absolute right-4 top-4 text-gray-400 hover:text-white"
              aria-label={t('common.close')}
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-royal-ruby/40 text-royal-champagne border border-royal-gold/30">
                <Calendar className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-white">{t('calendar.modalTitle')}</h3>
                <p className="text-xs text-gray-400">{t('calendar.modalSubtitle')}</p>
              </div>
            </div>

            <div className="space-y-2.5 mt-5">
              <a
                href={googleCalendarUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-3 text-xs font-medium text-white hover:bg-white/10 transition-colors"
              >
                <span>{t('calendar.googleCalendar')}</span>
                <ExternalLink className="h-4 w-4 text-gray-400" />
              </a>

              <a
                href={outlookCalendarUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-3 text-xs font-medium text-white hover:bg-white/10 transition-colors"
              >
                <span>{t('calendar.outlookCalendar')}</span>
                <ExternalLink className="h-4 w-4 text-gray-400" />
              </a>

              <button
                type="button"
                onClick={() => {
                  handleDownloadIcs();
                  setIsOpen(false);
                }}
                className="flex w-full items-center justify-between rounded-xl border border-royal-gold/40 bg-royal-gold/15 p-3 text-xs font-medium text-royal-champagne hover:bg-royal-gold/25 transition-colors"
              >
                <span>{t('calendar.appleCalendar')}</span>
                <Download className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
