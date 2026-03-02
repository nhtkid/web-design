import { Link } from 'react-router-dom';
import type { BlogPost } from '@/types';

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard = ({ post }: BlogCardProps) => {
  const readTime = Math.max(1, Math.ceil(post.excerpt.length / 200));

  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group block bg-[rgba(242,242,242,0.03)] border border-[rgba(242,242,242,0.08)] hover:border-[rgba(212,162,74,0.3)] transition-all duration-300 overflow-hidden"
    >
      {/* Featured image */}
      <div className="aspect-[16/9] overflow-hidden bg-[rgba(242,242,242,0.04)]">
        {post.featuredImage ? (
          <img
            src={post.featuredImage}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center px-6 text-center">
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#B8BDC4]">No cover media</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-center gap-3 mb-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#D4A24A]">
            {new Date(post.publishDate).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#B8BDC4]">
            {readTime} min read
          </span>
        </div>
        <h3 className="font-display text-xl text-[#F2F2F2] mb-2 group-hover:text-[#D4A24A] transition-colors leading-tight">
          {post.title}
        </h3>
        <p className="text-sm text-[#B8BDC4] leading-relaxed line-clamp-2">
          {post.excerpt}
        </p>
        <div className="mt-4 flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-[#D4A24A] flex items-center justify-center text-[10px] font-mono text-[#0B0D10] font-bold">
            {post.authorName.charAt(0).toUpperCase()}
          </div>
          <span className="font-mono text-[11px] text-[#B8BDC4]">{post.authorName}</span>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
