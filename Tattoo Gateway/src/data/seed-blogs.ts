import type { BlogPost } from '@/types';

export const seedBlogs: BlogPost[] = [
  {
    id: 'blog-001',
    slug: 'the-art-of-fine-line-tattoos',
    title: 'The Art of Fine Line Tattoos',
    excerpt:
      'Exploring the delicate craft of fine line tattooing — precision, patience, and the stories skin can hold.',
    featuredImage:
      'https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?w=800&q=80',
    content: JSON.stringify({
      type: 'doc',
      content: [
        {
          type: 'heading',
          attrs: { level: 2 },
          content: [{ type: 'text', text: 'Why Fine Lines?' }],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'Fine line tattooing is where precision meets poetry. Every stroke matters — there\'s no hiding behind heavy shading or bold outlines. It\'s just you, the needle, and the story your client wants to carry.',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'I fell in love with fine line work because it feels honest. The thinner the line, the more intentional every movement has to be. There\'s a meditative quality to it — a conversation between the artist and the skin.',
            },
          ],
        },
        {
          type: 'heading',
          attrs: { level: 2 },
          content: [{ type: 'text', text: 'The Technical Side' }],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'For those interested in the technical aspects, here\'s a quick overview of the needle configuration I typically use:',
            },
          ],
        },
        {
          type: 'codeBlock',
          attrs: { language: 'text' },
          content: [
            {
              type: 'text',
              text: 'Needle: 3RL (3 Round Liner)\nVoltage: 7.5V - 8V\nSpeed: Slow, steady passes\nInk: Diluted black (30-40% mix)\nDepth: Shallow dermis only\n\nKey: Let the needle do the work.\nDon\'t force — glide.',
            },
          ],
        },
        {
          type: 'heading',
          attrs: { level: 2 },
          content: [{ type: 'text', text: 'Aftercare for Fine Lines' }],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'Fine line tattoos require extra care during healing. The lines are delicate and can fade or blur if not properly maintained during the first two weeks. Keep the area clean, moisturized, and out of direct sunlight.',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'I always tell my clients: your tattoo is only as good as your aftercare. Treat it like a wound that\'s also a work of art — because that\'s exactly what it is.',
            },
          ],
        },
      ],
    }),
    status: 'published',
    publishDate: '2025-12-15T10:00:00.000Z',
    authorId: 'owner-001',
    authorName: 'Ali',
    createdAt: '2025-12-15T10:00:00.000Z',
    updatedAt: '2025-12-15T10:00:00.000Z',
  },
  {
    id: 'blog-002',
    slug: 'upcoming-flash-day-event',
    title: 'Upcoming Flash Day Event',
    excerpt:
      'Mark your calendars — our next Flash Day is coming. Pre-designed pieces at special prices, walk-ins welcome.',
    featuredImage:
      'https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?w=800&q=80',
    content: JSON.stringify({
      type: 'doc',
      content: [
        {
          type: 'heading',
          attrs: { level: 2 },
          content: [{ type: 'text', text: 'What is Flash Day?' }],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'Flash Day is when I open the studio for walk-ins with a curated sheet of pre-designed tattoos. Each design is one-of-a-kind — once it\'s claimed, it\'s gone forever.',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'It\'s a chance to get inked without the usual wait times, and the designs tend to be smaller, more accessible pieces that still carry the same level of intention and craft.',
            },
          ],
        },
        {
          type: 'heading',
          attrs: { level: 2 },
          content: [{ type: 'text', text: 'Details' }],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'Date: TBD (stay tuned on Instagram)\nLocation: Private studio, Milan\nPricing: €80 – €250 per piece\nBooking: Walk-in only, first come first served',
            },
          ],
        },
      ],
    }),
    status: 'draft',
    publishDate: '2026-04-01T10:00:00.000Z',
    authorId: 'owner-001',
    authorName: 'Ali',
    createdAt: '2026-01-10T10:00:00.000Z',
    updatedAt: '2026-01-10T10:00:00.000Z',
  },
  {
    id: 'blog-003',
    slug: 'new-ink-styles-for-2026',
    title: 'New Ink Styles for 2026',
    excerpt:
      'A look ahead at the tattoo trends and personal style evolution I\'m exploring this year.',
    featuredImage:
      'https://images.unsplash.com/photo-1565058379802-bbe93b2f703a?w=800&q=80',
    content: JSON.stringify({
      type: 'doc',
      content: [
        {
          type: 'heading',
          attrs: { level: 2 },
          content: [{ type: 'text', text: '2026 Vision' }],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'Every year I push my work in new directions. 2026 is about merging botanical illustration with geometric structure — organic forms held together by mathematical precision.',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'I\'ve been studying Japanese woodblock prints and Art Nouveau lettering, finding the sweet spot where Eastern minimalism meets Western ornament. The results are pieces that feel both ancient and completely new.',
            },
          ],
        },
        {
          type: 'heading',
          attrs: { level: 2 },
          content: [{ type: 'text', text: 'What to Expect' }],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'Expect more layered compositions, subtle dot-work gradients, and negative space used as a design element rather than just empty skin. I\'m excited to share this journey with you.',
            },
          ],
        },
      ],
    }),
    status: 'scheduled',
    publishDate: '2026-03-15T10:00:00.000Z',
    authorId: 'owner-001',
    authorName: 'Ali',
    createdAt: '2026-02-01T10:00:00.000Z',
    updatedAt: '2026-02-01T10:00:00.000Z',
  },
];
