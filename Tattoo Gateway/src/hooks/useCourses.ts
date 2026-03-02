import { useCallback, useMemo } from 'react';
import type { Course } from '@/types';
import { getCourses, setCourses, getPurchases, setPurchases, generateId } from '@/lib/storage';
import { useAuth } from '@/contexts/AuthContext';

export function useCourses() {
  const { user, isOwnerOrAdmin } = useAuth();

  const courses = useMemo(() => getCourses(), []);

  const getCourseById = useCallback((id: string): Course | undefined => {
    return getCourses().find(c => c.id === id);
  }, []);

  const hasPurchased = useCallback(
    (courseId: string): boolean => {
      if (!user) return false;
      if (isOwnerOrAdmin) return true; // owners/admins always have full access
      const purchases = getPurchases();
      return purchases.some(p => p.userId === user.id && p.courseId === courseId);
    },
    [user, isOwnerOrAdmin]
  );

  const canWatchFull = useCallback(
    (courseId: string): boolean => {
      if (isOwnerOrAdmin) return true;
      return hasPurchased(courseId);
    },
    [isOwnerOrAdmin, hasPurchased]
  );

  const purchaseCourse = useCallback(
    (courseId: string): boolean => {
      if (!user) return false;
      const purchases = getPurchases();
      if (purchases.some(p => p.userId === user.id && p.courseId === courseId)) return true;
      setPurchases([
        ...purchases,
        { userId: user.id, courseId, purchasedAt: new Date().toISOString() },
      ]);
      return true;
    },
    [user]
  );

  const createCourse = useCallback(
    (data: Omit<Course, 'id' | 'createdAt' | 'updatedAt'>): Course => {
      const now = new Date().toISOString();
      const course: Course = {
        ...data,
        id: generateId(),
        createdAt: now,
        updatedAt: now,
      };
      const current = getCourses();
      setCourses([...current, course]);
      return course;
    },
    []
  );

  const updateCourse = useCallback(
    (id: string, data: Partial<Omit<Course, 'id' | 'createdAt' | 'updatedAt'>>): Course | null => {
      const current = getCourses();
      const idx = current.findIndex(c => c.id === id);
      if (idx === -1) return null;
      const updated: Course = {
        ...current[idx],
        ...data,
        updatedAt: new Date().toISOString(),
      };
      current[idx] = updated;
      setCourses(current);
      return updated;
    },
    []
  );

  const deleteCourse = useCallback((id: string) => {
    const current = getCourses();
    setCourses(current.filter(c => c.id !== id));
  }, []);

  return { courses, getCourseById, hasPurchased, canWatchFull, purchaseCourse, createCourse, updateCourse, deleteCourse };
}
