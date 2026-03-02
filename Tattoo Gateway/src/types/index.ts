export type Role = 'admin' | 'owner' | 'user-paid' | 'user-free';

export interface User {
  id: string;
  name: string;
  email: string;
  password: string; // plaintext for POC only
  role: Role;
  createdAt: string;
}

export type BlogStatus = 'draft' | 'published' | 'scheduled';

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  featuredImage: string;
  content: string; // TipTap JSON stringified
  status: BlogStatus;
  publishDate: string; // ISO date
  authorId: string;
  authorName: string;
  createdAt: string;
  updatedAt: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  videoSrc: string; // path relative to public/
  duration: number; // seconds
  previewDuration: number; // seconds (default 15)
  price: number;
  instructorName: string;
  instructorAvatar: string;
  createdAt: string;
  updatedAt: string;
}

export interface Purchase {
  userId: string;
  courseId: string;
  purchasedAt: string;
}
