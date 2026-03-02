import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { useCourses } from '@/hooks/useCourses';
import { useAuth } from '@/contexts/AuthContext';
import CourseCard from '@/components/CourseCard';
import { Edit, Plus } from 'lucide-react';

const CoursesPage = () => {
  const { courses, hasPurchased } = useCourses();
  const { isOwnerOrAdmin } = useAuth();

  useEffect(() => {
    window.scrollTo(0, 0);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.course-item',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out', stagger: 0.08 }
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
            <h1 className="course-item font-display text-[clamp(36px,4vw,64px)] uppercase leading-[0.95] tracking-[-0.02em] text-[#F2F2F2] opacity-0">
              Courses
            </h1>
            <p className="course-item mt-3 text-[#B8BDC4] text-sm opacity-0">
              Learn the craft. From fundamentals to advanced techniques.
            </p>
          </div>
          {isOwnerOrAdmin && (
            <div className="course-item flex items-center gap-2 opacity-0">
              <Link to="/dashboard?tab=courses" className="btn-secondary inline-flex items-center gap-2">
                <Edit className="w-4 h-4" />
                Edit
              </Link>
              <Link to="/dashboard/course/new" className="btn-primary inline-flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Add Course
              </Link>
            </div>
          )}
        </div>

        {/* Course grid */}
        {courses.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-[#B8BDC4] text-lg">No courses available yet. Check back soon.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {courses.map(course => (
              <div key={course.id} className="course-item opacity-0">
                <CourseCard course={course} purchased={hasPurchased(course.id)} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CoursesPage;
