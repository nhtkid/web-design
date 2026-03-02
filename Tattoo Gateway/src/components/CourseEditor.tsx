import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCourses } from '@/hooks/useCourses';
import { ArrowLeft, Save } from 'lucide-react';

const CourseEditor = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getCourseById, createCourse, updateCourse } = useCourses();

  const isEditing = Boolean(id);
  const existing = isEditing && id ? getCourseById(id) : undefined;

  const [form, setForm] = useState({
    title: existing?.title || '',
    description: existing?.description || '',
    thumbnail: existing?.thumbnail || '',
    videoSrc: existing?.videoSrc || 'videos/courses/',
    duration: existing ? Math.floor(existing.duration / 60) : 0,
    durationSec: existing ? existing.duration % 60 : 0,
    previewDuration: existing?.previewDuration || 15,
    price: existing?.price || 0,
    instructorName: existing?.instructorName || 'Ali',
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const totalSeconds = form.duration * 60 + form.durationSec;
    const data = {
      title: form.title,
      description: form.description,
      thumbnail: form.thumbnail,
      videoSrc: form.videoSrc,
      duration: totalSeconds,
      previewDuration: form.previewDuration,
      price: form.price,
      instructorName: form.instructorName,
      instructorAvatar: '',
    };

    if (isEditing && id) {
      updateCourse(id, data);
    } else {
      createCourse(data);
    }
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen py-24 px-6 sm:px-[6vw]">
      <div className="max-w-[700px] mx-auto">
        <button
          onClick={() => navigate('/dashboard')}
          className="inline-flex items-center gap-2 text-[#B8BDC4] hover:text-[#D4A24A] transition-colors mb-8 font-mono text-xs uppercase tracking-[0.14em]"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to dashboard
        </button>

        <h1 className="font-display text-3xl text-[#F2F2F2] mb-8">
          {isEditing ? 'Edit Course' : 'New Course'}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block font-mono text-[11px] uppercase tracking-[0.14em] text-[#B8BDC4] mb-2">Title</label>
            <input
              type="text"
              value={form.title}
              onChange={e => setForm(p => ({ ...p, title: e.target.value }))}
              required
              className="w-full"
              placeholder="Course title"
            />
          </div>

          <div>
            <label className="block font-mono text-[11px] uppercase tracking-[0.14em] text-[#B8BDC4] mb-2">Description</label>
            <textarea
              value={form.description}
              onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
              required
              rows={4}
              className="w-full resize-none"
              placeholder="Course description"
            />
          </div>

          <div>
            <label className="block font-mono text-[11px] uppercase tracking-[0.14em] text-[#B8BDC4] mb-2">Thumbnail URL</label>
            <input
              type="text"
              value={form.thumbnail}
              onChange={e => setForm(p => ({ ...p, thumbnail: e.target.value }))}
              className="w-full"
              placeholder="https://images.unsplash.com/..."
            />
          </div>

          <div>
            <label className="block font-mono text-[11px] uppercase tracking-[0.14em] text-[#B8BDC4] mb-2">
              Video file path (relative to public/)
            </label>
            <input
              type="text"
              value={form.videoSrc}
              onChange={e => setForm(p => ({ ...p, videoSrc: e.target.value }))}
              className="w-full"
              placeholder="videos/courses/my-video.mp4"
            />
            <p className="text-[10px] text-[#B8BDC4] mt-1 opacity-60">
              Place video files in public/videos/courses/ and enter the path here
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-mono text-[11px] uppercase tracking-[0.14em] text-[#B8BDC4] mb-2">Duration (min)</label>
              <input
                type="number"
                value={form.duration}
                onChange={e => setForm(p => ({ ...p, duration: Number(e.target.value) }))}
                min={0}
                className="w-full"
              />
            </div>
            <div>
              <label className="block font-mono text-[11px] uppercase tracking-[0.14em] text-[#B8BDC4] mb-2">Duration (sec)</label>
              <input
                type="number"
                value={form.durationSec}
                onChange={e => setForm(p => ({ ...p, durationSec: Number(e.target.value) }))}
                min={0}
                max={59}
                className="w-full"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-mono text-[11px] uppercase tracking-[0.14em] text-[#B8BDC4] mb-2">Preview Duration (sec)</label>
              <input
                type="number"
                value={form.previewDuration}
                onChange={e => setForm(p => ({ ...p, previewDuration: Number(e.target.value) }))}
                min={5}
                max={60}
                className="w-full"
              />
            </div>
            <div>
              <label className="block font-mono text-[11px] uppercase tracking-[0.14em] text-[#B8BDC4] mb-2">Price ($)</label>
              <input
                type="number"
                value={form.price}
                onChange={e => setForm(p => ({ ...p, price: Number(e.target.value) }))}
                min={0}
                className="w-full"
              />
            </div>
          </div>

          <div>
            <label className="block font-mono text-[11px] uppercase tracking-[0.14em] text-[#B8BDC4] mb-2">Instructor Name</label>
            <input
              type="text"
              value={form.instructorName}
              onChange={e => setForm(p => ({ ...p, instructorName: e.target.value }))}
              className="w-full"
              placeholder="Ali"
            />
          </div>

          <button type="submit" className="btn-primary inline-flex items-center gap-2">
            <Save className="w-4 h-4" />
            {isEditing ? 'Update Course' : 'Create Course'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CourseEditor;
