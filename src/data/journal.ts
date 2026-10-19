import { JournalArticle } from '../types/property';

export const JOURNAL_ARTICLES: JournalArticle[] = [
  {
    id: 'journal-1',
    slug: 'the-art-of-natural-light',
    title: 'The Art of Natural Light: Designing for Well-being',
    subtitle: 'How intentional solar orientation transforms domestic tranquility',
    category: 'Architecture & Light',
    readTime: '5 min read',
    date: 'Autumn 2026',
    heroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
    excerpt: 'Light is not merely illumination; it is the primary material of architecture. When daylight is calibrated with restraint, ordinary spaces achieve a sculptural presence.',
    quote: 'Architecture is the learned game, correct and magnificent, of forms assembled in the light.',
    content: [
      'In luxury residential design, the most valuable luxury is often intangible. While marble and bronze demand tactile reverence, it is the invisible orchestration of natural light that dictates how a room breathes across the hours.',
      'Contemporary pavilions increasingly dispense with decorative clutter in favor of deep structural reveals, clerestory openings, and calculated solar overhangs that prevent harsh thermal glare while inviting soft, bouncing luminance onto honed stone floors.',
      'By studying solar arcs throughout the seasons, an architect can ensure that morning tea occurs in warm ambient sunrise, while west-facing living salons catch the amber softness of dusk without discomfort.'
    ],
    author: {
      name: 'Elena Vance-Ross',
      role: 'Director of Architectural Research'
    }
  },
  {
    id: 'journal-2',
    slug: 'materials-that-age-with-grace',
    title: 'Materials That Age With Grace: Travertine, White Oak, and Bronze',
    subtitle: 'The sensory value of patinating natural substances over synthetic perfection',
    category: 'Materials & Craft',
    readTime: '6 min read',
    date: 'Late Summer 2026',
    heroImage: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=80',
    excerpt: 'True luxury refuses to stay sealed under synthetic lacquers. Discover why unfilled Roman travertine and hand-rubbed bronze grow more captivating with every passing year.',
    quote: 'The finest homes are those that celebrate the quiet passage of time through honest, living surfaces.',
    content: [
      'There is a quiet dignity in honest materiality. Unfilled travertine, quarried from ancient hot springs near Rome, retains subterranean fissures and subtle color gradients that reflect geological history.',
      'When paired with quarter-sawn white oak finished only in organic vegetal oils, interiors become soft to the touch and acoustically gentle. Unlike high-gloss synthetics that reveal every superficial scratch as a flaw, organic materials record daily life as a rich patina.',
      'In our acquisitions practice, we consistently see that residences built with natural, unadorned materials endure in emotional relevance and market resilience far beyond trend-driven aesthetics.'
    ],
    author: {
      name: 'Julian Thorne',
      role: 'Principal Partner & Curator'
    }
  },
  {
    id: 'journal-3',
    slug: 'the-internal-courtyard-revival',
    title: 'The Internal Courtyard: Privacy and Calm in Modern Living',
    subtitle: 'Why inward-focused architecture is reclaiming the residential landscape',
    category: 'Spatial Design',
    readTime: '4 min read',
    date: 'Spring 2026',
    heroImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=80',
    excerpt: 'In an hyper-connected world, turning architecture inward around a private open-air courtyard provides acoustic isolation and uninterrupted communion with nature.',
    quote: 'A home should be an oasis against the noise of the world, not an open billboard to it.',
    content: [
      'The internal courtyard—dating back through Roman peristyles, Moorish riads, and Japanese tsuboniwa—is experiencing a remarkable modern resurgence in contemporary architectural residences.',
      'By turning living quarters inward around a protected microclimate featuring a solitary tree, moss garden, or still water pond, residents enjoy open skies and natural ventilation without sacrificing supreme privacy.',
      'This inward spatial topology creates a dramatic threshold: once you step past the discreet perimeter entry, the city dissolves completely.'
    ],
    author: {
      name: 'Marcus Sterling',
      role: 'Senior Architectural Advisor'
    }
  }
];
