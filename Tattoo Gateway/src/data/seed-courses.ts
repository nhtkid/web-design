import type { Course } from '@/types';

export const seedCourses: Course[] = [
  {
    id: 'course-001',
    title: 'Tattoo Design Fundamentals',
    description:
      'Learn the foundations of tattoo design — from composition and line weight to understanding how ink behaves on skin. Perfect for aspiring tattoo artists or enthusiasts who want to understand the craft.',
    thumbnail:
      'https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?w=600&q=80',
    videoSrc: 'videos/courses/design-fundamentals.mp4',
    duration: 1245, // 20:45
    previewDuration: 15,
    price: 49,
    instructorName: 'Ali',
    instructorAvatar: '',
    createdAt: '2025-11-01T10:00:00.000Z',
    updatedAt: '2025-11-01T10:00:00.000Z',
  },
  {
    id: 'course-002',
    title: 'Advanced Shading Techniques',
    description:
      'Master the art of shading — whip shading, dot-work gradients, smooth grey-wash transitions. This course covers the techniques that separate good tattoos from great ones.',
    thumbnail:
      'https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?w=600&q=80',
    videoSrc: 'videos/courses/advanced-shading.mp4',
    duration: 2130, // 35:30
    previewDuration: 15,
    price: 79,
    instructorName: 'Ali',
    instructorAvatar: '',
    createdAt: '2025-12-01T10:00:00.000Z',
    updatedAt: '2025-12-01T10:00:00.000Z',
  },
  {
    id: 'course-003',
    title: 'Building Your Portfolio',
    description:
      'Your portfolio is your resume. Learn how to photograph your work, curate your pieces, build an online presence, and attract the clients you actually want to work with.',
    thumbnail:
      'https://images.unsplash.com/photo-1565058379802-bbe93b2f703a?w=600&q=80',
    videoSrc: 'videos/courses/building-portfolio.mp4',
    duration: 960, // 16:00
    previewDuration: 15,
    price: 39,
    instructorName: 'Ali',
    instructorAvatar: '',
    createdAt: '2026-01-15T10:00:00.000Z',
    updatedAt: '2026-01-15T10:00:00.000Z',
  },
];
