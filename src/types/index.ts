export type EventCategory =
  | 'WEDDING'
  | 'ENGAGEMENT'
  | 'BIRTHDAY'
  | 'ANNIVERSARY'
  | 'HOUSEWARMING'
  | 'BABY_SHOWER'
  | 'FESTIVAL'
  | 'OTHER';

export type TemplateType = 'STATIC' | 'ANIMATED';

export type StyleTag =
  | 'ROYAL'
  | 'TRADITIONAL'
  | 'MODERN'
  | 'FLORAL'
  | 'MINIMALIST'
  | 'PLAYFUL';

export type AnimationPresetId =
  | 'envelope-reveal'
  | 'royal-curtain-doors'
  | 'botanical-bloom'
  | 'modern-cinematic'
  | 'celebration-pop'
  | 'none';

export type AnimationIntensity = 'subtle' | 'balanced' | 'expressive';

export type InteractionMode = 'tap-to-open' | 'auto-open' | 'scroll-triggered';

export interface AnimationStep {
  id: string;
  target: string;
  trigger: 'onMount' | 'onUserAction' | 'onStepComplete' | 'onViewportEnter';
  effect: 'fadeIn' | 'fadeUp' | 'slideUp' | 'zoomIn' | 'doorPart' | 'envelopeFold' | 'particleBurst';
  durationMs: number;
  delayMs?: number;
}

export interface AnimationConfig {
  version: 1;
  preset: AnimationPresetId;
  intensity: AnimationIntensity;
  interaction: InteractionMode;
  enableParticles: boolean;
  particleType?: 'gold-dust' | 'rose-petals' | 'confetti' | 'stars';
  particleCount?: number;
  allowReplay: boolean;
  reducedMotionFallback: boolean;
  musicAutoStartOnInteraction?: boolean;
  steps: AnimationStep[];
}

export interface DesignConfig {
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  titleFont: string;
  bodyFont: string;
  ornament?: string;
  theme?: string;
  heroImageUrl?: string;
  customCss?: string;
}

export interface EventFunction {
  id: string;
  name: string;
  date?: string;
  time?: string;
  venueName?: string;
  address?: string;
  dressCode?: string;
}

export interface MediaItem {
  id: string;
  url: string;
  caption?: string;
  mediaType: 'image' | 'video';
  isHero?: boolean;
}

export interface TemplateResponse {
  id: string;
  name: string;
  category: EventCategory;
  templateType: TemplateType;
  styleTag: StyleTag;
  description: string;
  thumbnailUrl: string;
  previewAnimationUrl: string;
  defaultPreset: AnimationPresetId;
  supportedPresets: AnimationPresetId[];
  defaultDesignConfig: string;    // JSON string
  defaultAnimationConfig: string; // JSON string
  supportedMediaTypes: string[];
  isPremium: boolean;
  isPublished: boolean;
  version: number;
}

export interface InvitationResponse {
  id: number;
  publicId: string;
  userId: number;
  templateId: string;
  slug: string;
  title: string;
  eventCategory: EventCategory;
  hosts?: string;
  honorees?: string;
  eventDate?: string;
  venueName?: string;
  venueAddress?: string;
  googleMapsUrl?: string;
  functions?: string;       // JSON string of EventFunction[]
  designConfig: string;     // JSON string of DesignConfig
  animationConfig: string;  // JSON string of AnimationConfig
  mediaGallery?: string;    // JSON string of MediaItem[]
  musicUrl?: string;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  isPublic: boolean;
  viewsCount: number;
  version: number;
  createdAt: string;
  updatedAt: string;
}

export interface AuthUser {
  id: number;
  publicId: string;
  email: string;
  firstName: string;
  lastName?: string;
  phoneNumber?: string;
  isVerified: boolean;
}

export interface AuthResponse {
  token: string;
  tokenType: string;
  userId: number;
  publicId: string;
  email: string;
  firstName: string;
  lastName?: string;
}
