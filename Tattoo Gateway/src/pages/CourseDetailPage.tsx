import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { useCourses } from '@/hooks/useCourses';
import { useAuth } from '@/contexts/AuthContext';
import VideoPlayer from '@/components/VideoPlayer';
import { ArrowLeft, Edit, Trash2, CheckCircle, DollarSign, Clock } from 'lucide-react';

const formatDuration = (seconds: number): string => {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
};

const CourseDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { getCourseById, canWatchFull, hasPurchased, purchaseCourse, deleteCourse } = useCourses();
  const { isOwnerOrAdmin, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const assetBase = import.meta.env.BASE_URL;

  const course = id ? getCourseById(id) : undefined;
  const [purchased, setPurchased] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (course) {
      setPurchased(hasPurchased(course.id));
    }
    const ctx = gsap.context(() => {
      gsap.fromTo('.course-detail', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out', stagger: 0.1 });
    });
    return () => ctx.revert();
  }, [course, hasPurchased]);

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-display text-3xl text-[#F2F2F2] mb-4">Course not found</h2>
          <Link to="/courses" className="text-[#D4A24A] text-sm hover:underline">Back to courses</Link>
        </div>
      </div>
    );
  }

  const handlePurchase = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: `/courses/${course.id}` } });
      return;
    }
    purchaseCourse(course.id);
    setPurchased(true);
  };

  const handleDelete = () => {
    if (confirm('Delete this course?')) {
      deleteCourse(course.id);
      navigate('/courses');
    }
  };

  const fullAccess = canWatchFull(course.id) || purchased;

  return (
    <div className="min-h-screen py-24 px-6 sm:px-[6vw]">
      <div className="max-w-[1100px] mx-auto">
        {/* Back link */}
        <Link
          to="/courses"
          className="course-detail inline-flex items-center gap-2 text-[#B8BDC4] hover:text-[#D4A24A] transition-colors mb-6 font-mono text-xs uppercase tracking-[0.14em] opacity-0"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to courses
        </Link>

        {/* Video player */}
        <div className="course-detail mb-8 opacity-0">
          <VideoPlayer
            src={`${assetBase}${course.videoSrc}`}
            poster={course.thumbnail}
            canWatchFull={fullAccess}
            previewDuration={course.previewDuration}
            courseId={course.id}
            onPurchase={handlePurchase}
          />
        </div>

        {/* Course info */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <h1 className="course-detail font-display text-[clamp(24px,3vw,42px)] text-[#F2F2F2] leading-tight mb-4 opacity-0">
              {course.title}
            </h1>
            <p className="course-detail text-[#B8BDC4] leading-relaxed mb-6 opacity-0">
              {course.description}
            </p>

            {/* Admin actions */}
            {isOwnerOrAdmin && (
              <div className="course-detail flex gap-3 mb-6 opacity-0">
                <Link
                  to={`/dashboard/course/edit/${course.id}`}
                  className="btn-secondary inline-flex items-center gap-2 text-xs"
                >
                  <Edit className="w-3.5 h-3.5" />
                  Edit
                </Link>
                <button
                  onClick={handleDelete}
                  className="btn-secondary inline-flex items-center gap-2 text-xs text-red-400 border-red-400/30 hover:border-red-400 hover:text-red-400"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Delete
                </button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="course-detail opacity-0">
            <div className="bg-[rgba(242,242,242,0.03)] border border-[rgba(242,242,242,0.1)] p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-[#D4A24A] flex items-center justify-center text-sm font-mono text-[#0B0D10] font-bold">
                  {course.instructorName.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-[#F2F2F2] text-sm font-medium">{course.instructorName}</p>
                  <p className="text-[10px] font-mono uppercase tracking-wider text-[#B8BDC4]">Instructor</p>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-sm text-[#B8BDC4]">
                  <Clock className="w-4 h-4 text-[#D4A24A]" />
                  {formatDuration(course.duration)} total
                </div>
                <div className="flex items-center gap-2 text-sm text-[#B8BDC4]">
                  <DollarSign className="w-4 h-4 text-[#D4A24A]" />
                  ${course.price}
                </div>
              </div>

              {purchased || isOwnerOrAdmin ? (
                <div className="flex items-center gap-2 text-green-400 font-mono text-sm">
                  <CheckCircle className="w-5 h-5" />
                  Full access
                </div>
              ) : (
                <button onClick={handlePurchase} className="btn-primary w-full">
                  {isAuthenticated ? `Purchase — $${course.price}` : 'Login to Purchase'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailPage;
