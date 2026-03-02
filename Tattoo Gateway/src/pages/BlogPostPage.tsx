import { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { useBlogs } from '@/hooks/useBlogs';
import { useAuth } from '@/contexts/AuthContext';
import { ArrowLeft, Edit, Trash2 } from 'lucide-react';

// Simple TipTap JSON content renderer
const renderNode = (node: any, index: number): React.ReactNode => {
  if (!node) return null;

  if (node.type === 'text') {
    let element: React.ReactNode = node.text;
    if (node.marks) {
      for (const mark of node.marks) {
        if (mark.type === 'bold') element = <strong key={index}>{element}</strong>;
        if (mark.type === 'italic') element = <em key={index}>{element}</em>;
        if (mark.type === 'code') element = <code key={index} className="bg-[rgba(242,242,242,0.08)] px-1.5 py-0.5 text-[#D4A24A] text-sm">{element}</code>;
        if (mark.type === 'link') element = <a key={index} href={mark.attrs?.href} target="_blank" rel="noopener noreferrer" className="text-[#D4A24A] underline hover:text-[#E5B35B]">{element}</a>;
      }
    }
    return element;
  }

  const children = node.content?.map((child: any, i: number) => renderNode(child, i)) || [];

  switch (node.type) {
    case 'doc':
      return <div key={index}>{children}</div>;
    case 'paragraph':
      return <p key={index} className="text-[#B8BDC4] leading-relaxed mb-4">{children}</p>;
    case 'heading': {
      const level = node.attrs?.level || 2;
      const Tag = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
      const sizes: Record<number, string> = {
        1: 'text-3xl sm:text-4xl',
        2: 'text-2xl sm:text-3xl',
        3: 'text-xl sm:text-2xl',
      };
      return (
        <Tag key={index} className={`font-display ${sizes[level] || sizes[2]} text-[#F2F2F2] mt-8 mb-4`}>
          {children}
        </Tag>
      );
    }
    case 'codeBlock':
      return (
        <pre key={index} className="bg-[rgba(242,242,242,0.05)] border border-[rgba(242,242,242,0.1)] p-4 mb-4 overflow-x-auto">
          <code className="text-sm font-mono text-[#B8BDC4] whitespace-pre">{children}</code>
        </pre>
      );
    case 'bulletList':
      return <ul key={index} className="list-disc list-inside text-[#B8BDC4] mb-4 space-y-1">{children}</ul>;
    case 'orderedList':
      return <ol key={index} className="list-decimal list-inside text-[#B8BDC4] mb-4 space-y-1">{children}</ol>;
    case 'listItem':
      return <li key={index}>{children}</li>;
    case 'image':
      return (
        <figure key={index} className="my-6">
          <img src={node.attrs?.src} alt={node.attrs?.alt || ''} className="w-full max-w-2xl" />
          {node.attrs?.title && <figcaption className="mt-2 text-xs text-[#B8BDC4] font-mono">{node.attrs.title}</figcaption>}
        </figure>
      );
    case 'youtube':
      return (
        <div key={index} className="my-6 aspect-video">
          <iframe
            src={node.attrs?.src}
            className="w-full h-full"
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
        </div>
      );
    case 'blockquote':
      return <blockquote key={index} className="border-l-2 border-[#D4A24A] pl-4 my-4 italic text-[#B8BDC4]">{children}</blockquote>;
    case 'horizontalRule':
      return <hr key={index} className="border-[rgba(242,242,242,0.1)] my-8" />;
    default:
      return <div key={index}>{children}</div>;
  }
};

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { getBlogBySlug, deleteBlog } = useBlogs();
  const { isOwnerOrAdmin } = useAuth();
  const navigate = useNavigate();

  const post = slug ? getBlogBySlug(slug) : undefined;

  useEffect(() => {
    window.scrollTo(0, 0);
    const ctx = gsap.context(() => {
      gsap.fromTo('.blog-post-content', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out', stagger: 0.1 });
    });
    return () => ctx.revert();
  }, [slug]);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-display text-3xl text-[#F2F2F2] mb-4">Post not found</h2>
          <Link to="/blog" className="text-[#D4A24A] text-sm hover:underline">Back to blog</Link>
        </div>
      </div>
    );
  }

  let content: any = null;
  try {
    content = JSON.parse(post.content);
  } catch {
    content = null;
  }

  const handleDelete = () => {
    if (confirm('Delete this post?')) {
      deleteBlog(post.id);
      navigate('/blog');
    }
  };

  return (
    <div className="min-h-screen py-24 px-6 sm:px-[6vw]">
      <div className="max-w-[800px] mx-auto">
        {/* Back link */}
        <Link
          to="/blog"
          className="blog-post-content inline-flex items-center gap-2 text-[#B8BDC4] hover:text-[#D4A24A] transition-colors mb-8 font-mono text-xs uppercase tracking-[0.14em] opacity-0"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to blog
        </Link>

        {/* Featured image */}
        {post.featuredImage && (
          <div className="blog-post-content aspect-[2/1] overflow-hidden mb-8 opacity-0">
            <img src={post.featuredImage} alt={post.title} className="w-full h-full object-cover" />
          </div>
        )}

        {/* Meta */}
        <div className="blog-post-content flex items-center gap-3 mb-4 opacity-0">
          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#D4A24A]">
            {new Date(post.publishDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </span>
          <span className="text-[rgba(242,242,242,0.2)]">·</span>
          <span className="font-mono text-[11px] text-[#B8BDC4]">By {post.authorName}</span>
        </div>

        {/* Title */}
        <h1 className="blog-post-content font-display text-[clamp(28px,4vw,52px)] text-[#F2F2F2] leading-tight mb-6 opacity-0">
          {post.title}
        </h1>

        {/* Admin actions */}
        {isOwnerOrAdmin && (
          <div className="blog-post-content flex gap-3 mb-8 opacity-0">
            <Link
              to={`/dashboard/blog/edit/${post.slug}`}
              className="btn-secondary inline-flex items-center gap-2 text-xs"
            >
              <Edit className="w-3.5 h-3.5" />
              Edit
            </Link>
            <button onClick={handleDelete} className="btn-secondary inline-flex items-center gap-2 text-xs text-red-400 border-red-400/30 hover:border-red-400 hover:text-red-400">
              <Trash2 className="w-3.5 h-3.5" />
              Delete
            </button>
          </div>
        )}

        {/* Content */}
        <div className="blog-post-content prose-dark opacity-0">
          {content ? renderNode(content, 0) : (
            <p className="text-[#B8BDC4]">Unable to render this post content.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogPostPage;
