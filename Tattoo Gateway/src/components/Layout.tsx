import { Outlet } from 'react-router-dom';
import Navigation from './NavigationNew';

const Layout = () => {
  return (
    <div className="relative min-h-screen">
      {/* Global overlays */}
      <div className="grain-overlay" />
      <div className="vignette-overlay" />

      {/* Navigation */}
      <Navigation />

      {/* Page content */}
      <main className="relative pt-16">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="relative border-t border-[rgba(242,242,242,0.08)] py-8 px-[6vw]">
        <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[rgba(184,189,196,0.5)]">
            © 2026 Alis Mind Tattooing — Milan, Italy
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[rgba(184,189,196,0.5)]">
            No walk-ins. Consultations by appointment.
          </span>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
