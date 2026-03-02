import { Link } from 'react-router-dom';
import type { Course } from '@/types';
import { Clock, DollarSign, CheckCircle } from 'lucide-react';

interface CourseCardProps {
  course: Course;
  purchased?: boolean;
}

const formatDuration = (seconds: number): string => {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
};

const CourseCard = ({ course, purchased = false }: CourseCardProps) => {
  return (
    <Link
      to={`/courses/${course.id}`}
      className="group block bg-[rgba(242,242,242,0.02)] hover:bg-[rgba(242,242,242,0.04)] transition-all duration-300 overflow-hidden rounded-lg"
    >
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden bg-[#14181D]">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="225" fill="%2314181D"%3E%3Crect width="400" height="225"/%3E%3Ctext x="200" y="112" fill="%23555" text-anchor="middle" font-family="monospace" font-size="14"%3ENo Thumbnail%3C/text%3E%3C/svg%3E';
          }}
        />
        {/* Duration badge */}
        <div className="absolute bottom-2 right-2 px-1.5 py-0.5 bg-[rgba(11,13,16,0.85)] text-[11px] font-mono text-[#F2F2F2] rounded">
          {formatDuration(course.duration)}
        </div>
        {/* Preview badge */}
        <div className="absolute top-2 left-2 px-1.5 py-0.5 bg-[rgba(11,13,16,0.85)] text-[10px] font-mono uppercase tracking-wider text-[#D4A24A] rounded">
          {course.previewDuration}s preview
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="font-display text-base text-[#F2F2F2] leading-tight mb-2 group-hover:text-[#D4A24A] transition-colors line-clamp-2">
          {course.title}
        </h3>
        <p className="text-xs text-[#B8BDC4] line-clamp-2 mb-3">
          {course.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-[#D4A24A] flex items-center justify-center text-[10px] font-mono text-[#0B0D10] font-bold">
              {course.instructorName.charAt(0).toUpperCase()}
            </div>
            <span className="font-mono text-[11px] text-[#B8BDC4]">{course.instructorName}</span>
          </div>

          <div className="flex items-center gap-1">
            {purchased ? (
              <span className="inline-flex items-center gap-1 text-green-400 text-[11px] font-mono">
                <CheckCircle className="w-3.5 h-3.5" />
                Owned
              </span>
            ) : (
              <>
                <DollarSign className="w-3 h-3 text-[#D4A24A]" />
                <span className="text-[#D4A24A] font-mono text-sm font-semibold">{course.price}</span>
              </>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1 mt-2">
          <Clock className="w-3 h-3 text-[#B8BDC4]" />
          <span className="text-[10px] font-mono text-[#B8BDC4]">{formatDuration(course.duration)}</span>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
