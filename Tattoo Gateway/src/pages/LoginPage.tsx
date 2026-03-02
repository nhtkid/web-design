import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { gsap } from 'gsap';

const LoginPage = () => {
  const { login, register, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [tab, setTab] = useState<'login' | 'register'>('login');
  const [error, setError] = useState<string | null>(null);

  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [regForm, setRegForm] = useState({ name: '', email: '', password: '', confirm: '' });

  const from = (location.state as { from?: string })?.from || '/';

  useEffect(() => {
    window.scrollTo(0, 0);
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.login-card', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' });
    });
    return () => ctx.revert();
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const err = login(loginForm.email, loginForm.password);
    if (err) setError(err);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (regForm.password !== regForm.confirm) {
      setError('Passwords do not match');
      return;
    }
    if (regForm.password.length < 4) {
      setError('Password must be at least 4 characters');
      return;
    }
    const err = register(regForm.name, regForm.email, regForm.password);
    if (err) setError(err);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="login-card w-full max-w-md bg-[rgba(242,242,242,0.03)] border border-[rgba(242,242,242,0.1)] p-8 opacity-0">
        {/* Tab switcher */}
        <div className="flex gap-0 mb-8 border-b border-[rgba(242,242,242,0.1)]">
          <button
            onClick={() => { setTab('login'); setError(null); }}
            className={`flex-1 pb-3 font-mono text-xs uppercase tracking-[0.14em] transition-colors border-b-2 ${
              tab === 'login' ? 'border-[#D4A24A] text-[#D4A24A]' : 'border-transparent text-[#B8BDC4] hover:text-[#F2F2F2]'
            }`}
          >
            Login
          </button>
          <button
            onClick={() => { setTab('register'); setError(null); }}
            className={`flex-1 pb-3 font-mono text-xs uppercase tracking-[0.14em] transition-colors border-b-2 ${
              tab === 'register' ? 'border-[#D4A24A] text-[#D4A24A]' : 'border-transparent text-[#B8BDC4] hover:text-[#F2F2F2]'
            }`}
          >
            Register
          </button>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
            {error}
          </div>
        )}

        {tab === 'login' ? (
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block font-mono text-[11px] uppercase tracking-[0.14em] text-[#B8BDC4] mb-2">Email</label>
              <input
                type="email"
                value={loginForm.email}
                onChange={e => setLoginForm(p => ({ ...p, email: e.target.value }))}
                required
                className="w-full"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label className="block font-mono text-[11px] uppercase tracking-[0.14em] text-[#B8BDC4] mb-2">Password</label>
              <input
                type="password"
                value={loginForm.password}
                onChange={e => setLoginForm(p => ({ ...p, password: e.target.value }))}
                required
                className="w-full"
                placeholder="••••••••"
              />
            </div>
            <button type="submit" className="btn-primary w-full mt-2">
              Login
            </button>
            <p className="text-center text-[#B8BDC4] text-xs mt-4">
              Demo accounts: <br />
              <span className="text-[#D4A24A]">admin@alismind.studio / admin123</span><br />
              <span className="text-[#D4A24A]">ali@alismind.studio / owner123</span>
            </p>
          </form>
        ) : (
          <form onSubmit={handleRegister} className="space-y-5">
            <div>
              <label className="block font-mono text-[11px] uppercase tracking-[0.14em] text-[#B8BDC4] mb-2">Name</label>
              <input
                type="text"
                value={regForm.name}
                onChange={e => setRegForm(p => ({ ...p, name: e.target.value }))}
                required
                className="w-full"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block font-mono text-[11px] uppercase tracking-[0.14em] text-[#B8BDC4] mb-2">Email</label>
              <input
                type="email"
                value={regForm.email}
                onChange={e => setRegForm(p => ({ ...p, email: e.target.value }))}
                required
                className="w-full"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label className="block font-mono text-[11px] uppercase tracking-[0.14em] text-[#B8BDC4] mb-2">Password</label>
              <input
                type="password"
                value={regForm.password}
                onChange={e => setRegForm(p => ({ ...p, password: e.target.value }))}
                required
                className="w-full"
                placeholder="••••••••"
              />
            </div>
            <div>
              <label className="block font-mono text-[11px] uppercase tracking-[0.14em] text-[#B8BDC4] mb-2">Confirm Password</label>
              <input
                type="password"
                value={regForm.confirm}
                onChange={e => setRegForm(p => ({ ...p, confirm: e.target.value }))}
                required
                className="w-full"
                placeholder="••••••••"
              />
            </div>
            <button type="submit" className="btn-primary w-full mt-2">
              Create Account
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
