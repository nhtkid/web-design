import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HeroSection from './sections/HeroSection';
import PhilosophySection from './sections/PhilosophySection';
import CraftSection from './sections/CraftSection';
import AftercareSection from './sections/AftercareSection';
import StudioSection from './sections/StudioSection';
import CommunitySection from './sections/CommunitySection';
import ContactSection from './sections/ContactSection';
import Navigation from './components/Navigation';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const mainRef = useRef<HTMLDivElement>(null);
  const sectionIds = ['hero', 'philosophy', 'craft', 'aftercare', 'studio', 'community', 'contact'];

  useEffect(() => {
    let lastPageKeyAt = 0;

    const scrollToSection = (id: string) => {
      const element = document.getElementById(id);
      if (!element) return;

      const y = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: y, behavior: 'auto' });
    };

    const isEditableTarget = (target: EventTarget | null) => {
      if (!(target instanceof HTMLElement)) return false;

      const tag = target.tagName;
      return (
        target.isContentEditable ||
        tag === 'INPUT' ||
        tag === 'TEXTAREA' ||
        tag === 'SELECT'
      );
    };

    const getCurrentSectionIndex = () => {
      const entries = sectionIds
        .map((id, index) => ({ id, index, element: document.getElementById(id) }))
        .filter((entry): entry is { id: string; index: number; element: HTMLElement } => Boolean(entry.element));

      if (entries.length === 0) return 0;

      const viewportCenter = window.innerHeight * 0.5;
      const centered = entries.find(({ element }) => {
        const rect = element.getBoundingClientRect();
        return rect.top <= viewportCenter && rect.bottom >= viewportCenter;
      });

      if (centered) return centered.index;

      const closest = entries.reduce((best, current) => {
        const bestDistance = Math.abs(best.element.getBoundingClientRect().top);
        const currentDistance = Math.abs(current.element.getBoundingClientRect().top);
        return currentDistance < bestDistance ? current : best;
      });

      return closest.index;
    };

    const handleKeyNavigation = (event: KeyboardEvent) => {
      if (event.key !== 'PageDown' && event.key !== 'PageUp') return;
      if (isEditableTarget(event.target)) return;

      const now = Date.now();
      if (now - lastPageKeyAt < 280) return;
      lastPageKeyAt = now;

      event.preventDefault();

      const currentIndex = getCurrentSectionIndex();
      const nextIndex = event.key === 'PageDown'
        ? Math.min(currentIndex + 1, sectionIds.length - 1)
        : Math.max(currentIndex - 1, 0);

      scrollToSection(sectionIds[nextIndex]);
    };

    window.addEventListener('keydown', handleKeyNavigation);

    return () => {
      window.removeEventListener('keydown', handleKeyNavigation);
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <div ref={mainRef} className="relative">
      {/* Global overlays */}
      <div className="grain-overlay" />
      <div className="vignette-overlay" />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Sections */}
      <main className="relative">
        <HeroSection className="z-10" />
        <PhilosophySection className="z-20" />
        <CraftSection className="z-30" />
        <AftercareSection className="z-40" />
        <StudioSection className="z-50" />
        <CommunitySection className="z-60" />
        <ContactSection className="z-70" />
      </main>
    </div>
  );
}

export default App;
