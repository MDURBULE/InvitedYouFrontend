import { EventFunction, MediaItem } from '@/types';

export interface CategorySampleData {
  title: string;
  honorees: string;
  hosts: string;
  eventDate: string;
  venueName: string;
  venueAddress: string;
  googleMapsUrl: string;
  slug: string;
  functions: EventFunction[];
  mediaGallery: MediaItem[];
}

export const CATEGORY_SAMPLE_DATA: Record<string, CategorySampleData> = {
  HOUSEWARMING: {
    title: 'Shubh Griha Pravesh & Vastu Shanti Puja',
    honorees: 'The Sharma Family (Rajesh & Sunita)',
    hosts: 'Sunita & Rajesh Sharma',
    eventDate: '2026-11-28T09:00',
    venueName: "New Residence 'Villa Ashirwad'",
    venueAddress: 'Plot 42, Palm Meadows, Whitefield, Bengaluru, Karnataka 560066',
    googleMapsUrl: 'https://maps.google.com',
    slug: 'sharma-griha-pravesh',
    functions: [
      {
        id: '1',
        name: 'Auspicious Ganapati Havan & Vastu Shanti Puja',
        date: '2026-11-28',
        time: '8:30 AM Auspicious Muhurtham',
        venueName: 'Residence Courtyard & Puja Hall',
        dressCode: 'Traditional Indian Festive Attire',
      },
      {
        id: '2',
        name: 'Griha Pravesh Housewarming Mahaprasad & Lunch',
        date: '2026-11-28',
        time: '12:30 PM Onwards',
        venueName: 'Villa Terrace & Banquet Lawn',
        dressCode: 'Festive Elegance',
      },
    ],
    mediaGallery: [
      {
        id: '1',
        url: 'https://images.unsplash.com/photo-1582738411706-bfc8e691d1c2?auto=format&fit=crop&w=800&q=80',
        caption: 'Auspicious brass diyas and marigold entrance',
        mediaType: 'image',
      },
      {
        id: '2',
        url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
        caption: 'Our welcoming new living space',
        mediaType: 'image',
      },
    ],
  },

  BIRTHDAY: {
    title: "Aarav's 1st Birthday Wonder Bash",
    honorees: 'Aarav Sharma',
    hosts: 'Pooja & Vikram Sharma',
    eventDate: '2026-11-15T18:00',
    venueName: 'The Grand Sky Ballroom',
    venueAddress: 'Level 5, Galleria Mall, Indiranagar, Bengaluru, Karnataka 560038',
    googleMapsUrl: 'https://maps.google.com',
    slug: 'aarav-1st-birthday',
    functions: [
      {
        id: '1',
        name: 'Grand Cake Cutting & Little Star Welcome',
        date: '2026-11-15',
        time: '6:30 PM Onwards',
        venueName: 'Main Kids Fantasy Lounge',
        dressCode: 'Smart Casual / Colorful Party Attire',
      },
      {
        id: '2',
        name: 'Celebratory Dinner & Dance Floor',
        date: '2026-11-15',
        time: '8:00 PM Onwards',
        venueName: 'Skyline Terrace Deck',
        dressCode: 'Evening Party Wear',
      },
    ],
    mediaGallery: [
      {
        id: '1',
        url: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=800&q=80',
        caption: 'Golden birthday cake and party sparkles',
        mediaType: 'image',
      },
      {
        id: '2',
        url: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=800&q=80',
        caption: 'Festive balloons and cheerful smiles',
        mediaType: 'image',
      },
    ],
  },

  ENGAGEMENT: {
    title: 'The Ring Ceremony & Sagan of Rohan & Natasha',
    honorees: 'Rohan & Natasha',
    hosts: 'The Mehra & Singhania Families',
    eventDate: '2026-11-18T18:30',
    venueName: 'Taj West End Heritage Lawns',
    venueAddress: 'Race Course Road, High Grounds, Bengaluru, Karnataka 560001',
    googleMapsUrl: 'https://maps.google.com',
    slug: 'rohan-natasha-engagement',
    functions: [
      {
        id: '1',
        name: 'Auspicious Sagan & Ring Exchange',
        date: '2026-11-18',
        time: '6:30 PM Auspicious Time',
        venueName: 'The Glass House & Lotus Lawn',
        dressCode: 'Ethnic Glamour / Indo-Western',
      },
      {
        id: '2',
        name: 'Cocktails, Sangeet & Celebration Dinner',
        date: '2026-11-18',
        time: '8:00 PM Onwards',
        venueName: 'Prince of Wales Grand Lawns',
        dressCode: 'Glamorous Evening Wear',
      },
    ],
    mediaGallery: [
      {
        id: '1',
        url: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=800&q=80',
        caption: 'The diamond ring of forever promises',
        mediaType: 'image',
      },
      {
        id: '2',
        url: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=800&q=80',
        caption: 'Celebrating our beautiful new journey',
        mediaType: 'image',
      },
    ],
  },

  ANNIVERSARY: {
    title: 'Celebrating 25 Years of Everlasting Love - Silver Jubilee',
    honorees: 'Sunil & Kavita',
    hosts: 'Hosted with love by Rohan & Sneha',
    eventDate: '2026-12-05T19:00',
    venueName: 'The Leela Palace Heritage Ballroom',
    venueAddress: 'Old Airport Road, Kodihalli, Bengaluru, Karnataka 560008',
    googleMapsUrl: 'https://maps.google.com',
    slug: 'sunil-kavita-25th-anniversary',
    functions: [
      {
        id: '1',
        name: 'Vow Renewal & Golden Toast',
        date: '2026-12-05',
        time: '7:00 PM',
        venueName: 'Royal Heritage Ballroom',
        dressCode: 'Black Tie / Evening Silks',
      },
      {
        id: '2',
        name: 'Gala Dinner & Nostalgia Musical Night',
        date: '2026-12-05',
        time: '8:30 PM Onwards',
        venueName: 'Grand Palace Lawn',
        dressCode: 'Formal Elegance',
      },
    ],
    mediaGallery: [
      {
        id: '1',
        url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
        caption: 'Decades of togetherness and cherished memories',
        mediaType: 'image',
      },
      {
        id: '2',
        url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80',
        caption: 'Silver jubilee evening toast',
        mediaType: 'image',
      },
    ],
  },

  BABY_SHOWER: {
    title: 'Baby Shower & Traditional Godh Bharai Ceremony',
    honorees: 'Celebrating Mom-to-Be Sneha',
    hosts: 'The Verma & Kapoor Families',
    eventDate: '2026-12-12T11:00',
    venueName: 'The Grand Orchid Floral Pavilion',
    venueAddress: 'Bellary Road, Near International Airport, Bengaluru 562157',
    googleMapsUrl: 'https://maps.google.com',
    slug: 'sneha-baby-shower',
    functions: [
      {
        id: '1',
        name: 'Traditional Godh Bharai Puja & Blessings',
        date: '2026-12-12',
        time: '11:00 AM Auspicious Time',
        venueName: 'Garden Pavilion Hall',
        dressCode: 'Pastel Traditional Silks / Yellow & Pink',
      },
      {
        id: '2',
        name: 'Baby Shower High Tea, Games & Celebratory Lunch',
        date: '2026-12-12',
        time: '1:00 PM Onwards',
        venueName: 'The Floral Orchid Courtyard',
        dressCode: 'Festive Pastels',
      },
    ],
    mediaGallery: [
      {
        id: '1',
        url: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=800&q=80',
        caption: 'Awaiting our sweet little blessing',
        mediaType: 'image',
      },
    ],
  },

  FESTIVAL: {
    title: 'Grand Shubh Deepawali Celebration & Diwali Milan',
    honorees: 'Welcoming Prosperity, Light & Joy',
    hosts: 'The Agarwal Family',
    eventDate: '2026-11-01T18:00',
    venueName: 'Heritage Club Central Lawns',
    venueAddress: 'Civil Lines, Palace Road, Bengaluru 560001',
    googleMapsUrl: 'https://maps.google.com',
    slug: 'diwali-milan-celebration',
    functions: [
      {
        id: '1',
        name: 'Lakshmi-Ganesh Puja & Diya Lighting Ceremony',
        date: '2026-11-01',
        time: '6:00 PM Auspicious Time',
        venueName: 'Main Mandir Courtyard',
        dressCode: 'Traditional Festive Red & Gold',
      },
      {
        id: '2',
        name: 'Diwali Festive Sweets Feast & Musical Milan',
        date: '2026-11-01',
        time: '8:00 PM Onwards',
        venueName: 'Illuminated Grand Lawns',
        dressCode: 'Festive Indian Wear',
      },
    ],
    mediaGallery: [
      {
        id: '1',
        url: 'https://images.unsplash.com/photo-1605371924599-2d0365da1ae0?auto=format&fit=crop&w=800&q=80',
        caption: 'Clay diyas and festive golden sparks',
        mediaType: 'image',
      },
    ],
  },

  WEDDING: {
    title: "Siddharth & Ananya's Royal Wedding Celebration",
    honorees: 'Siddharth & Ananya',
    hosts: 'Mr. & Mrs. Sharma & Mr. & Mrs. Verma',
    eventDate: '2026-11-21T10:00',
    venueName: 'The Grand Palace & Convention Centre',
    venueAddress: 'Palace Grounds, Jayamahal Road, Bengaluru, Karnataka 560006',
    googleMapsUrl: 'https://maps.google.com',
    slug: 'siddharth-ananya-wedding',
    functions: [
      {
        id: '1',
        name: 'Traditional Sangeet & Mehendi Night',
        date: '2026-11-20',
        time: '6:30 PM Onwards',
        venueName: 'The Royal Lawn',
        dressCode: 'Vibrant Traditional Attire',
      },
      {
        id: '2',
        name: 'Auspicious Muhurtham Ceremony',
        date: '2026-11-21',
        time: '9:45 AM Auspicious Time',
        venueName: 'Main Kalyana Mandapam',
        dressCode: 'South Indian Silks & Sherwanis',
      },
    ],
    mediaGallery: [
      {
        id: '1',
        url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
        caption: 'Royal wedding portraits',
        mediaType: 'image',
      },
      {
        id: '2',
        url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80',
        caption: 'Pre-wedding moments of joy',
        mediaType: 'image',
      },
    ],
  },
};

/**
 * Returns authentic, culturally appropriate sample data for any category.
 * If category is unknown, falls back to the wedding suite.
 */
export function getSampleDataForCategory(category?: string): CategorySampleData {
  if (!category) return CATEGORY_SAMPLE_DATA.WEDDING;
  const upper = category.toUpperCase().trim();
  return CATEGORY_SAMPLE_DATA[upper] || CATEGORY_SAMPLE_DATA.WEDDING;
}
