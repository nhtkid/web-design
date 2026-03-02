import type { User } from '@/types';

export const seedUsers: User[] = [
  {
    id: 'admin-001',
    name: 'Admin',
    email: 'admin@alismind.studio',
    password: 'admin123',
    role: 'admin',
    createdAt: '2025-01-01T00:00:00.000Z',
  },
  {
    id: 'owner-001',
    name: 'Ali',
    email: 'ali@alismind.studio',
    password: 'owner123',
    role: 'owner',
    createdAt: '2025-01-01T00:00:00.000Z',
  },
];
