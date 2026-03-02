import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import Youtube from '@tiptap/extension-youtube';
import Placeholder from '@tiptap/extension-placeholder';
import { common, createLowlight } from 'lowlight';
import { useBlogs } from '@/hooks/useBlogs';
import { getBlogs } from '@/lib/storage';
import type { BlogStatus } from '@/types';
import {
  Bold, Italic, Heading1, Heading2, Heading3,
  Code,
  List, ListOrdered, ArrowLeft, Save, Send, Clock,
} from 'lucide-react';

const lowlight = createLowlight(common);

const BlogEditor = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { createBlog, updateBlog } = useBlogs();

  const isEditing = Boolean(slug);
  const existingPost = isEditing ? getBlogs().find(b => b.slug === slug) : null;

  const [title, setTitle] = useState(existingPost?.title || '');
  const [featuredImage, setFeaturedImage] = useState(existingPost?.featuredImage || '');
  const [excerpt, setExcerpt] = useState(existingPost?.excerpt || '');
  const [scheduleDate, setScheduleDate] = useState(existingPost?.publishDate?.slice(0, 16) || '');
  const [showSchedule, setShowSchedule] = useState(false);
  const [saving, setSaving] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false,
      }),
      Image.configure({
        HTMLAttributes: { class: 'max-w-full' },
      }),
      CodeBlockLowlight.configure({ lowlight }),
      Youtube.configure({
        HTMLAttributes: { class: 'aspect-video w-full' },
      }),
      Placeholder.configure({
        placeholder: 'Start writing your post...',
      }),
    ],
    content: existingPost ? JSON.parse(existingPost.content) : undefined,
    editorProps: {
      attributes: {
        class: 'prose-dark min-h-[300px] outline-none p-4 text-[#B8BDC4] leading-relaxed',
      },
    },
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSave = useCallback(
    (status: BlogStatus) => {
      if (!editor || !title.trim()) return;
      setSaving(true);

      const editorJson = editor.getJSON();
      const content = JSON.stringify(editorJson);
      const resolvedFeaturedImage = featuredImage.trim() || existingPost?.featuredImage || '';
      const publishDate =
        status === 'scheduled' && scheduleDate
          ? new Date(scheduleDate).toISOString()
          : status === 'published'
          ? new Date().toISOString()
          : existingPost?.publishDate || new Date().toISOString();

      if (isEditing && existingPost) {
        updateBlog(existingPost.id, { title, excerpt, featuredImage: resolvedFeaturedImage, content, status, publishDate });
      } else {
        createBlog({ title, excerpt, featuredImage: resolvedFeaturedImage, content, status, publishDate });
      }

      setTimeout(() => {
        setSaving(false);
        navigate('/dashboard');
      }, 300);
    },
    [editor, title, featuredImage, excerpt, scheduleDate, isEditing, existingPost, createBlog, updateBlog, navigate]
  );

  if (!editor) return null;

  return (
    <div className="min-h-screen py-24 px-6 sm:px-[6vw]">
      <div className="max-w-[900px] mx-auto">
        {/* Back button */}
        <button
          onClick={() => navigate('/dashboard')}
          className="inline-flex items-center gap-2 text-[#B8BDC4] hover:text-[#D4A24A] transition-colors mb-8 font-mono text-xs uppercase tracking-[0.14em]"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to dashboard
        </button>

        <h1 className="font-display text-3xl text-[#F2F2F2] mb-8">
          {isEditing ? 'Edit Post' : 'New Post'}
        </h1>

        {/* Title */}
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Post title"
          className="w-full text-2xl font-display bg-transparent border-b border-[rgba(242,242,242,0.1)] text-[#F2F2F2] pb-3 mb-6 outline-none focus:border-[#D4A24A] transition-colors"
        />

        {/* Title image URL */}
        <input
          type="url"
          value={featuredImage}
          onChange={e => setFeaturedImage(e.target.value)}
          placeholder="Title image URL (e.g. Instagram image URL)"
          className="w-full mb-6"
        />

        {/* Excerpt */}
        <textarea
          value={excerpt}
          onChange={e => setExcerpt(e.target.value)}
          placeholder="Short excerpt / summary"
          rows={2}
          className="w-full resize-none mb-4"
        />

        {/* Toolbar */}
        <div className="flex flex-wrap gap-1 p-2 bg-[rgba(242,242,242,0.03)] border border-[rgba(242,242,242,0.1)] mb-0">
          <ToolbarButton onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive('bold')} title="Bold">
            <Bold className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive('italic')} title="Italic">
            <Italic className="w-4 h-4" />
          </ToolbarButton>
          <div className="w-px h-6 bg-[rgba(242,242,242,0.1)] mx-1 self-center" />
          <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} active={editor.isActive('heading', { level: 1 })} title="H1">
            <Heading1 className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive('heading', { level: 2 })} title="H2">
            <Heading2 className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive('heading', { level: 3 })} title="H3">
            <Heading3 className="w-4 h-4" />
          </ToolbarButton>
          <div className="w-px h-6 bg-[rgba(242,242,242,0.1)] mx-1 self-center" />
          <ToolbarButton onClick={() => editor.chain().focus().toggleCodeBlock().run()} active={editor.isActive('codeBlock')} title="Code Block">
            <Code className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive('bulletList')} title="Bullet List">
            <List className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive('orderedList')} title="Ordered List">
            <ListOrdered className="w-4 h-4" />
          </ToolbarButton>
        </div>

        {/* Editor */}
        <div className="border border-[rgba(242,242,242,0.1)] border-t-0 bg-[rgba(242,242,242,0.02)] mb-8 min-h-[400px]">
          <EditorContent editor={editor} />
        </div>

        {/* Schedule picker (conditional) */}
        {showSchedule && (
          <div className="mb-6 p-4 bg-[rgba(242,242,242,0.03)] border border-[rgba(242,242,242,0.1)]">
            <label className="block font-mono text-[11px] uppercase tracking-[0.14em] text-[#B8BDC4] mb-2">
              Schedule publish date
            </label>
            <input
              type="datetime-local"
              value={scheduleDate}
              onChange={e => setScheduleDate(e.target.value)}
              className="w-full max-w-xs"
            />
          </div>
        )}

        {/* Action buttons */}
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => handleSave('draft')}
            disabled={saving || !title.trim()}
            className="btn-secondary inline-flex items-center gap-2 disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            Save as Draft
          </button>
          <button
            onClick={() => handleSave('published')}
            disabled={saving || !title.trim()}
            className="btn-primary inline-flex items-center gap-2 disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
            Publish Now
          </button>
          <button
            onClick={() => {
              if (showSchedule && scheduleDate) {
                handleSave('scheduled');
              } else {
                setShowSchedule(!showSchedule);
              }
            }}
            disabled={saving || !title.trim()}
            className="btn-secondary inline-flex items-center gap-2 disabled:opacity-50"
          >
            <Clock className="w-4 h-4" />
            {showSchedule ? 'Confirm Schedule' : 'Schedule'}
          </button>
        </div>
      </div>
    </div>
  );
};

function ToolbarButton({
  onClick,
  active,
  children,
  title,
}: {
  onClick: () => void;
  active?: boolean;
  children: React.ReactNode;
  title: string;
}) {
  return (
    <button
      type="button"
      onMouseDown={e => e.preventDefault()}
      onClick={onClick}
      title={title}
      className={`p-2 transition-colors ${
        active
          ? 'text-[#D4A24A] bg-[rgba(212,162,74,0.1)]'
          : 'text-[#B8BDC4] hover:text-[#F2F2F2] hover:bg-[rgba(242,242,242,0.05)]'
      }`}
    >
      {children}
    </button>
  );
}

export default BlogEditor;
