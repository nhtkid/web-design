import type { BlogStatus } from '@/types';

const statusConfig: Record<BlogStatus, { label: string; color: string; bg: string }> = {
  draft: { label: 'Draft', color: 'text-yellow-400', bg: 'bg-yellow-400/10 border-yellow-400/30' },
  published: { label: 'Published', color: 'text-green-400', bg: 'bg-green-400/10 border-green-400/30' },
  scheduled: { label: 'Scheduled', color: 'text-blue-400', bg: 'bg-blue-400/10 border-blue-400/30' },
};

const BlogStatusBadge = ({ status }: { status: BlogStatus }) => {
  const config = statusConfig[status];
  return (
    <span className={`inline-flex items-center px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider border ${config.bg} ${config.color}`}>
      {config.label}
    </span>
  );
};

export default BlogStatusBadge;
