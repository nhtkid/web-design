import { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useBlogs } from '@/hooks/useBlogs';
import { useCourses } from '@/hooks/useCourses';
import BlogStatusBadge from '@/components/BlogStatusBadge';
import type { Role } from '@/types';
import {
  PenLine, Plus, Trash2, Edit, Eye, EyeOff,
  BookOpen, Video, Users,
} from 'lucide-react';
import { gsap } from 'gsap';

type Tab = 'blogs' | 'courses' | 'users';

const DashboardPage = () => {
  const { isAdmin, allUsers, updateUserRole, deleteUser, createUser, refreshUsers } = useAuth();
  const { allBlogs, deleteBlog, updateBlog } = useBlogs();
  const { courses, deleteCourse } = useCourses();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [activeTab, setActiveTab] = useState<Tab>('blogs');
  const [showNewUser, setShowNewUser] = useState(false);
  const [newUserForm, setNewUserForm] = useState({ name: '', email: '', password: '', role: 'user-free' as Role });
  const [userError, setUserError] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    refreshUsers();
    const ctx = gsap.context(() => {
      gsap.fromTo('.dash-content', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' });
    });
    return () => ctx.revert();
  }, [refreshUsers]);

  useEffect(() => {
    const tab = searchParams.get('tab');

    if (tab === 'blogs' || tab === 'courses') {
      setActiveTab(tab);
      return;
    }

    if (tab === 'users' && isAdmin) {
      setActiveTab('users');
    }
  }, [searchParams, isAdmin]);

  const tabs: { id: Tab; label: string; icon: React.ReactNode; show: boolean }[] = [
    { id: 'blogs', label: 'Blog', icon: <BookOpen className="w-4 h-4" />, show: true },
    { id: 'courses', label: 'Courses', icon: <Video className="w-4 h-4" />, show: true },
    { id: 'users', label: 'Users', icon: <Users className="w-4 h-4" />, show: isAdmin },
  ];

  const handleTogglePublish = (blogId: string, currentStatus: string) => {
    const newStatus = currentStatus === 'published' ? 'draft' : 'published';
    updateBlog(blogId, { status: newStatus as any });
    // Force re-render by navigating
    navigate('/dashboard', { replace: true });
  };

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    setUserError(null);
    const err = createUser(newUserForm.name, newUserForm.email, newUserForm.password, newUserForm.role);
    if (err) {
      setUserError(err);
      return;
    }
    setShowNewUser(false);
    setNewUserForm({ name: '', email: '', password: '', role: 'user-free' });
  };

  return (
    <div className="min-h-screen py-24 px-6 sm:px-[6vw]">
      <div className="max-w-[1200px] mx-auto">
        <h1 className="dash-content font-display text-[clamp(28px,3vw,48px)] uppercase leading-[0.95] tracking-[-0.02em] text-[#F2F2F2] mb-8 opacity-0">
          Dashboard
        </h1>

        {/* Tabs */}
        <div className="dash-content flex gap-0 mb-8 border-b border-[rgba(242,242,242,0.1)] opacity-0">
          {tabs.filter(t => t.show).map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 pb-3 px-4 font-mono text-xs uppercase tracking-[0.14em] transition-colors border-b-2 ${
                activeTab === tab.id
                  ? 'border-[#D4A24A] text-[#D4A24A]'
                  : 'border-transparent text-[#B8BDC4] hover:text-[#F2F2F2]'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        <div className="dash-content opacity-0">
          {/* BLOG TAB */}
          {activeTab === 'blogs' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg text-[#F2F2F2]">All Posts ({allBlogs.length})</h2>
                <Link to="/dashboard/blog/new" className="btn-primary inline-flex items-center gap-2 text-xs">
                  <PenLine className="w-4 h-4" />
                  New Post
                </Link>
              </div>

              {allBlogs.length === 0 ? (
                <p className="text-[#B8BDC4] text-sm py-8 text-center">No blog posts yet.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-[rgba(242,242,242,0.1)]">
                        <th className="text-left py-3 px-2 font-mono text-[10px] uppercase tracking-wider text-[#B8BDC4]">Title</th>
                        <th className="text-left py-3 px-2 font-mono text-[10px] uppercase tracking-wider text-[#B8BDC4]">Status</th>
                        <th className="text-left py-3 px-2 font-mono text-[10px] uppercase tracking-wider text-[#B8BDC4] hidden sm:table-cell">Publish Date</th>
                        <th className="text-right py-3 px-2 font-mono text-[10px] uppercase tracking-wider text-[#B8BDC4]">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allBlogs.map(post => (
                        <tr key={post.id} className="border-b border-[rgba(242,242,242,0.05)] hover:bg-[rgba(242,242,242,0.02)]">
                          <td className="py-3 px-2">
                            <Link to={`/blog/${post.slug}`} className="text-[#F2F2F2] hover:text-[#D4A24A] transition-colors">
                              {post.title}
                            </Link>
                          </td>
                          <td className="py-3 px-2"><BlogStatusBadge status={post.status} /></td>
                          <td className="py-3 px-2 text-[#B8BDC4] text-xs hidden sm:table-cell">
                            {new Date(post.publishDate).toLocaleDateString()}
                          </td>
                          <td className="py-3 px-2">
                            <div className="flex gap-2 justify-end">
                              <button
                                onClick={() => handleTogglePublish(post.id, post.status)}
                                className="p-1.5 text-[#B8BDC4] hover:text-[#D4A24A] transition-colors"
                                title={post.status === 'published' ? 'Unpublish' : 'Publish'}
                              >
                                {post.status === 'published' ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                              </button>
                              <Link
                                to={`/dashboard/blog/edit/${post.slug}`}
                                className="p-1.5 text-[#B8BDC4] hover:text-[#D4A24A] transition-colors"
                                title="Edit"
                              >
                                <Edit className="w-4 h-4" />
                              </Link>
                              <button
                                onClick={() => { if (confirm('Delete?')) { deleteBlog(post.id); navigate('/dashboard', { replace: true }); } }}
                                className="p-1.5 text-[#B8BDC4] hover:text-red-400 transition-colors"
                                title="Delete"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* COURSES TAB */}
          {activeTab === 'courses' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg text-[#F2F2F2]">All Courses ({courses.length})</h2>
                <Link to="/dashboard/course/new" className="btn-primary inline-flex items-center gap-2 text-xs">
                  <Plus className="w-4 h-4" />
                  New Course
                </Link>
              </div>

              {courses.length === 0 ? (
                <p className="text-[#B8BDC4] text-sm py-8 text-center">No courses yet.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-[rgba(242,242,242,0.1)]">
                        <th className="text-left py-3 px-2 font-mono text-[10px] uppercase tracking-wider text-[#B8BDC4]">Course</th>
                        <th className="text-left py-3 px-2 font-mono text-[10px] uppercase tracking-wider text-[#B8BDC4] hidden sm:table-cell">Price</th>
                        <th className="text-left py-3 px-2 font-mono text-[10px] uppercase tracking-wider text-[#B8BDC4] hidden md:table-cell">Video</th>
                        <th className="text-right py-3 px-2 font-mono text-[10px] uppercase tracking-wider text-[#B8BDC4]">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {courses.map(course => (
                        <tr key={course.id} className="border-b border-[rgba(242,242,242,0.05)] hover:bg-[rgba(242,242,242,0.02)]">
                          <td className="py-3 px-2">
                            <div className="flex items-center gap-3">
                              <img src={course.thumbnail} alt="" className="w-12 h-8 object-cover rounded hidden sm:block" />
                              <Link to={`/courses/${course.id}`} className="text-[#F2F2F2] hover:text-[#D4A24A] transition-colors">
                                {course.title}
                              </Link>
                            </div>
                          </td>
                          <td className="py-3 px-2 text-[#D4A24A] font-mono text-xs hidden sm:table-cell">${course.price}</td>
                          <td className="py-3 px-2 text-[#B8BDC4] text-xs hidden md:table-cell font-mono">{course.videoSrc}</td>
                          <td className="py-3 px-2">
                            <div className="flex gap-2 justify-end">
                              <Link
                                to={`/dashboard/course/edit/${course.id}`}
                                className="p-1.5 text-[#B8BDC4] hover:text-[#D4A24A] transition-colors"
                                title="Edit"
                              >
                                <Edit className="w-4 h-4" />
                              </Link>
                              <button
                                onClick={() => { if (confirm('Delete?')) { deleteCourse(course.id); navigate('/dashboard', { replace: true }); } }}
                                className="p-1.5 text-[#B8BDC4] hover:text-red-400 transition-colors"
                                title="Delete"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* USERS TAB */}
          {activeTab === 'users' && isAdmin && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg text-[#F2F2F2]">All Users ({allUsers.length})</h2>
                <button
                  onClick={() => setShowNewUser(!showNewUser)}
                  className="btn-primary inline-flex items-center gap-2 text-xs"
                >
                  <Plus className="w-4 h-4" />
                  Add User
                </button>
              </div>

              {/* New user form */}
              {showNewUser && (
                <div className="mb-6 p-4 bg-[rgba(242,242,242,0.03)] border border-[rgba(242,242,242,0.1)]">
                  <h3 className="text-sm text-[#F2F2F2] mb-4">Create New User</h3>
                  {userError && (
                    <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 text-red-400 text-sm">{userError}</div>
                  )}
                  <form onSubmit={handleCreateUser} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <input
                      type="text"
                      value={newUserForm.name}
                      onChange={e => setNewUserForm(p => ({ ...p, name: e.target.value }))}
                      placeholder="Name"
                      required
                      className="w-full"
                    />
                    <input
                      type="email"
                      value={newUserForm.email}
                      onChange={e => setNewUserForm(p => ({ ...p, email: e.target.value }))}
                      placeholder="Email"
                      required
                      className="w-full"
                    />
                    <input
                      type="password"
                      value={newUserForm.password}
                      onChange={e => setNewUserForm(p => ({ ...p, password: e.target.value }))}
                      placeholder="Password"
                      required
                      className="w-full"
                    />
                    <div className="flex gap-2">
                      <select
                        value={newUserForm.role}
                        onChange={e => setNewUserForm(p => ({ ...p, role: e.target.value as Role }))}
                        className="flex-1 bg-[rgba(242,242,242,0.05)] border border-[rgba(242,242,242,0.15)] text-[#F2F2F2] px-3 py-2 outline-none"
                      >
                        <option value="user-free">Free</option>
                        <option value="user-paid">Paid</option>
                        <option value="owner">Owner</option>
                        <option value="admin">Admin</option>
                      </select>
                      <button type="submit" className="btn-primary px-4">Add</button>
                    </div>
                  </form>
                </div>
              )}

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[rgba(242,242,242,0.1)]">
                      <th className="text-left py-3 px-2 font-mono text-[10px] uppercase tracking-wider text-[#B8BDC4]">Name</th>
                      <th className="text-left py-3 px-2 font-mono text-[10px] uppercase tracking-wider text-[#B8BDC4] hidden sm:table-cell">Email</th>
                      <th className="text-left py-3 px-2 font-mono text-[10px] uppercase tracking-wider text-[#B8BDC4]">Role</th>
                      <th className="text-right py-3 px-2 font-mono text-[10px] uppercase tracking-wider text-[#B8BDC4]">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allUsers.map(u => (
                      <tr key={u.id} className="border-b border-[rgba(242,242,242,0.05)] hover:bg-[rgba(242,242,242,0.02)]">
                        <td className="py-3 px-2 text-[#F2F2F2]">{u.name}</td>
                        <td className="py-3 px-2 text-[#B8BDC4] text-xs hidden sm:table-cell">{u.email}</td>
                        <td className="py-3 px-2">
                          <select
                            value={u.role}
                            onChange={e => updateUserRole(u.id, e.target.value as Role)}
                            className="bg-[rgba(242,242,242,0.05)] border border-[rgba(242,242,242,0.15)] text-[#F2F2F2] px-2 py-1 text-xs outline-none"
                          >
                            <option value="user-free">Free</option>
                            <option value="user-paid">Paid</option>
                            <option value="owner">Owner</option>
                            <option value="admin">Admin</option>
                          </select>
                        </td>
                        <td className="py-3 px-2 text-right">
                          <button
                            onClick={() => { if (confirm(`Delete ${u.name}?`)) deleteUser(u.id); }}
                            className="p-1.5 text-[#B8BDC4] hover:text-red-400 transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
