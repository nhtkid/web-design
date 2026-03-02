import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Menu, X, User, LogOut, LayoutDashboard, LogIn } from 'lucide-react';

const navItems = [
  { label: 'About Me', to: '/' },
  { label: 'Studio', to: '/studio' },
  { label: 'Blog', to: '/blog' },
  { label: 'Courses', to: '/courses' },
  { label: 'Contact', to: '/contact' },
];

const Navigation = () => {
  const { user, isOwnerOrAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
    navigate('/');
  };

  return (
    <nav
      className="fixed top-0 left-0 w-full z-[100] px-4 sm:px-[6vw] py-4 md:py-5"
      style={{
        background: 'linear-gradient(to bottom, rgba(11,13,16,0.92) 0%, rgba(11,13,16,0.6) 70%, transparent 100%)',
        backdropFilter: 'blur(10px)',
      }}
    >
      <div className="flex justify-between items-center w-full">
        {/* Brand */}
        <NavLink
          to="/"
          onClick={() => setMobileOpen(false)}
          className="font-mono text-[13px] font-semibold uppercase tracking-[0.14em] text-[#F2F2F2] hover:text-[#D4A24A] transition-colors"
        >
          Alis Mind Tattooing
        </NavLink>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {navItems.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `font-mono text-xs uppercase tracking-[0.14em] transition-colors ${
                  isActive ? 'text-[#D4A24A]' : 'text-[#B8BDC4] hover:text-[#D4A24A]'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}

          {/* User button */}
          <div className="relative ml-4">
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="w-8 h-8 rounded-full border border-[rgba(242,242,242,0.2)] flex items-center justify-center text-[#B8BDC4] hover:text-[#D4A24A] hover:border-[#D4A24A] transition-colors"
            >
              <User className="w-4 h-4" />
            </button>

            {userMenuOpen && (
              <div className="absolute right-0 top-10 w-48 bg-[#14181D] border border-[rgba(242,242,242,0.1)] shadow-xl py-1 z-50">
                {user ? (
                  <>
                    <div className="px-4 py-2 border-b border-[rgba(242,242,242,0.1)]">
                      <p className="text-sm text-[#F2F2F2] truncate">{user.name}</p>
                      <p className="text-[10px] font-mono uppercase tracking-wider text-[#B8BDC4]">
                        {user.role}
                      </p>
                    </div>
                    {isOwnerOrAdmin && (
                      <button
                        onClick={() => { navigate('/dashboard'); setUserMenuOpen(false); }}
                        className="w-full flex items-center gap-3 px-4 py-2 text-sm text-[#B8BDC4] hover:text-[#D4A24A] hover:bg-[rgba(242,242,242,0.03)] transition-colors"
                      >
                        <LayoutDashboard className="w-4 h-4" />
                        Dashboard
                      </button>
                    )}
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-2 text-sm text-[#B8BDC4] hover:text-[#D4A24A] hover:bg-[rgba(242,242,242,0.03)] transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => { navigate('/login'); setUserMenuOpen(false); }}
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-[#B8BDC4] hover:text-[#D4A24A] hover:bg-[rgba(242,242,242,0.03)] transition-colors"
                  >
                    <LogIn className="w-4 h-4" />
                    Login / Register
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-[#F2F2F2] hover:text-[#D4A24A] transition-colors"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden mt-4 pb-4 border-t border-[rgba(242,242,242,0.1)] pt-4 space-y-3">
          {navItems.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `block font-mono text-xs uppercase tracking-[0.14em] transition-colors py-1 ${
                  isActive ? 'text-[#D4A24A]' : 'text-[#B8BDC4] hover:text-[#D4A24A]'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
          <div className="border-t border-[rgba(242,242,242,0.1)] pt-3 mt-3">
            {user ? (
              <>
                <p className="text-sm text-[#F2F2F2] mb-1">{user.name}</p>
                <p className="text-[10px] font-mono uppercase tracking-wider text-[#B8BDC4] mb-3">
                  {user.role}
                </p>
                {isOwnerOrAdmin && (
                  <NavLink
                    to="/dashboard"
                    onClick={() => setMobileOpen(false)}
                    className="block font-mono text-xs uppercase tracking-[0.14em] text-[#B8BDC4] hover:text-[#D4A24A] py-1 transition-colors"
                  >
                    Dashboard
                  </NavLink>
                )}
                <button
                  onClick={() => { handleLogout(); setMobileOpen(false); }}
                  className="font-mono text-xs uppercase tracking-[0.14em] text-[#B8BDC4] hover:text-[#D4A24A] py-1 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <NavLink
                to="/login"
                onClick={() => setMobileOpen(false)}
                className="block font-mono text-xs uppercase tracking-[0.14em] text-[#B8BDC4] hover:text-[#D4A24A] py-1 transition-colors"
              >
                Login / Register
              </NavLink>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
