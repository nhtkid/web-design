import { useCallback, useMemo } from 'react';
import type { BlogPost, BlogStatus } from '@/types';
import { getBlogs, setBlogs, generateId } from '@/lib/storage';
import { useAuth } from '@/contexts/AuthContext';

export function useBlogs() {
  const { user, isOwnerOrAdmin } = useAuth();

  const blogs = useMemo(() => getBlogs(), []);

  const publicBlogs = useMemo(() => {
    const now = new Date().toISOString();
    return blogs
      .filter(b => b.status === 'published' && b.publishDate <= now)
      .sort((a, b) => b.publishDate.localeCompare(a.publishDate));
  }, [blogs]);

  const allBlogs = useMemo(() => {
    // Check scheduled posts and auto-publish
    const now = new Date().toISOString();
    let changed = false;
    const updated = blogs.map(b => {
      if (b.status === 'scheduled' && b.publishDate <= now) {
        changed = true;
        return { ...b, status: 'published' as BlogStatus };
      }
      return b;
    });
    if (changed) setBlogs(updated);
    return updated.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  }, [blogs]);

  const getBlogBySlug = useCallback(
    (slug: string): BlogPost | undefined => {
      const now = new Date().toISOString();
      const list = getBlogs();
      const post = list.find(b => b.slug === slug);
      if (!post) return undefined;
      // Non-admin can only see published posts
      if (!isOwnerOrAdmin) {
        if (post.status !== 'published' || post.publishDate > now) return undefined;
      }
      return post;
    },
    [isOwnerOrAdmin]
  );

  const createBlog = useCallback(
    (data: {
      title: string;
      excerpt: string;
      featuredImage: string;
      content: string;
      status: BlogStatus;
      publishDate: string;
    }): BlogPost | null => {
      if (!user) return null;
      const slug = data.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      const now = new Date().toISOString();
      const post: BlogPost = {
        id: generateId(),
        slug,
        title: data.title,
        excerpt: data.excerpt,
        featuredImage: data.featuredImage,
        content: data.content,
        status: data.status,
        publishDate: data.status === 'published' ? now : data.publishDate,
        authorId: user.id,
        authorName: user.name,
        createdAt: now,
        updatedAt: now,
      };
      const current = getBlogs();
      setBlogs([...current, post]);
      return post;
    },
    [user]
  );

  const updateBlog = useCallback(
    (
      id: string,
      data: Partial<
        Pick<BlogPost, 'title' | 'excerpt' | 'featuredImage' | 'content' | 'status' | 'publishDate'>
      >
    ): BlogPost | null => {
      const current = getBlogs();
      const idx = current.findIndex(b => b.id === id);
      if (idx === -1) return null;
      const updatedSlug = data.title
        ? data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
        : current[idx].slug;
      const updated: BlogPost = {
        ...current[idx],
        ...data,
        slug: updatedSlug,
        updatedAt: new Date().toISOString(),
      };
      current[idx] = updated;
      setBlogs(current);
      return updated;
    },
    []
  );

  const deleteBlog = useCallback((id: string) => {
    const current = getBlogs();
    setBlogs(current.filter(b => b.id !== id));
  }, []);

  return { blogs, publicBlogs, allBlogs, getBlogBySlug, createBlog, updateBlog, deleteBlog };
}
