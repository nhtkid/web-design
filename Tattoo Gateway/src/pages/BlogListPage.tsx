import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { useBlogs } from '@/hooks/useBlogs';
import { useAuth } from '@/contexts/AuthContext';
import BlogCard from '@/components/BlogCard';
import { Edit, PenLine } from 'lucide-react';

const BlogListPage = () => {
  const { publicBlogs } = useBlogs();
  const { isOwnerOrAdmin } = useAuth();

  useEffect(() => {
    window.scrollTo(0, 0);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.blog-item',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out', stagger: 0.08 }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen py-24 px-6 sm:px-[6vw]">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <h1 className="blog-item font-display text-[clamp(36px,4vw,64px)] uppercase leading-[0.95] tracking-[-0.02em] text-[#F2F2F2] opacity-0">
              Blog
            </h1>
            <p className="blog-item mt-3 text-[#B8BDC4] text-sm opacity-0">
              Thoughts on ink, process, and craft.
            </p>
          </div>
          {isOwnerOrAdmin && (
            <div className="blog-item flex items-center gap-2 opacity-0">
              <Link
                to="/dashboard?tab=blogs"
                className="btn-secondary inline-flex items-center gap-2"
              >
                <Edit className="w-4 h-4" />
                Edit
              </Link>
              <Link
                to="/dashboard/blog/new"
                className="btn-primary inline-flex items-center gap-2"
              >
                <PenLine className="w-4 h-4" />
                New Post
              </Link>
            </div>
          )}
        </div>

        {/* Blog grid */}
        {publicBlogs.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-[#B8BDC4] text-lg">No posts yet. Check back soon.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {publicBlogs.map(post => (
              <div key={post.id} className="blog-item opacity-0">
                <BlogCard post={post} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogListPage;
