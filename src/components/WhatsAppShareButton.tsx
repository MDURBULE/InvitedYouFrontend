'use client';

import React from 'react';
import { UniversalShareButton } from './UniversalShareButton';

interface WhatsAppShareButtonProps {
  title: string;
  honorees?: string;
  slug: string;
  venueName?: string;
  eventDate?: string;
}

export const WhatsAppShareButton: React.FC<WhatsAppShareButtonProps> = ({
  title,
  honorees,
  slug,
  venueName,
  eventDate,
}) => {
  return (
    <UniversalShareButton
      title={title}
      honorees={honorees}
      slug={slug}
      venueName={venueName}
      eventDate={eventDate}
      variant="primary"
    />
  );
};
