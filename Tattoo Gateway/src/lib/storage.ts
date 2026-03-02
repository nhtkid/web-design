import type { User, BlogPost, Course, Purchase } from '@/types';

const KEYS = {
  users: 'tg_users_db',
  authUser: 'tg_auth_user',
  blogs: 'tg_blogs',
  courses: 'tg_courses',
  purchases: 'tg_purchases',
  seeded: 'tg_seeded',
} as const;

function get<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function set<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value));
}

// Users
export function getUsers(): User[] {
  return get<User[]>(KEYS.users, []);
}
export function setUsers(users: User[]): void {
  set(KEYS.users, users);
}

// Auth
export function getAuthUser(): User | null {
  return get<User | null>(KEYS.authUser, null);
}
export function setAuthUser(user: User | null): void {
  if (user) {
    set(KEYS.authUser, user);
  } else {
    localStorage.removeItem(KEYS.authUser);
  }
}

// Blogs
export function getBlogs(): BlogPost[] {
  return get<BlogPost[]>(KEYS.blogs, []);
}
export function setBlogs(blogs: BlogPost[]): void {
  set(KEYS.blogs, blogs);
}

// Courses
export function getCourses(): Course[] {
  return get<Course[]>(KEYS.courses, []);
}
export function setCourses(courses: Course[]): void {
  set(KEYS.courses, courses);
}

// Purchases
export function getPurchases(): Purchase[] {
  return get<Purchase[]>(KEYS.purchases, []);
}
export function setPurchases(purchases: Purchase[]): void {
  set(KEYS.purchases, purchases);
}

// Seed check
export function isSeeded(): boolean {
  return localStorage.getItem(KEYS.seeded) === 'true';
}
export function markSeeded(): void {
  localStorage.setItem(KEYS.seeded, 'true');
}

// Generate a simple id
export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}
