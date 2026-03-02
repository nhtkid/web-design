import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import AboutPage from './pages/AboutPage';
import StudioPage from './pages/StudioPage';
import BlogListPage from './pages/BlogListPage';
import BlogPostPage from './pages/BlogPostPage';
import CoursesPage from './pages/CoursesPage';
import CourseDetailPage from './pages/CourseDetailPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import BlogEditor from './components/BlogEditor';
import CourseEditor from './components/CourseEditor';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          {/* Public routes */}
          <Route path="/" element={<AboutPage />} />
          <Route path="/studio" element={<StudioPage />} />
          <Route path="/blog" element={<BlogListPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/courses/:id" element={<CourseDetailPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Protected: owner + admin */}
          <Route element={<ProtectedRoute allowedRoles={['owner', 'admin']} />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/dashboard/blog/new" element={<BlogEditor />} />
            <Route path="/dashboard/blog/edit/:slug" element={<BlogEditor />} />
            <Route path="/dashboard/course/new" element={<CourseEditor />} />
            <Route path="/dashboard/course/edit/:id" element={<CourseEditor />} />
          </Route>
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
