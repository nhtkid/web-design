import { useCallback, useEffect, useRef, useState } from 'react';
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

const sectionIds = ['hero', 'philosophy', 'craft', 'aftercare', 'studio', 'community', 'contact'];
const activeSectionVisibilityThreshold = 0.6;

function App() {
  const mainRef = useRef<HTMLDivElement>(null);
  const [activeSectionId, setActiveSectionId] = useState(sectionIds[0]);

  const animateLanding = useCallback((element: HTMLElement) => {
    gsap.fromTo(
      element,
      { opacity: 0.96 },
      { opacity: 1, duration: 0.18, ease: 'power2.out', overwrite: 'auto' }
    );
  }, []);

  const getSectionVisibilityRatio = useCallback((element: HTMLElement) => {
    const rect = element.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const visibleTop = Math.max(rect.top, 0);
    const visibleBottom = Math.min(rect.bottom, viewportHeight);
    const visibleHeight = Math.max(0, visibleBottom - visibleTop);
    const denominator = Math.max(1, Math.min(rect.height, viewportHeight));
    return visibleHeight / denominator;
  }, []);

  const getCurrentSectionIndex = useCallback(() => {
    const entries = sectionIds
      .map((id, index) => ({ id, index, element: document.getElementById(id) }))
      .filter((entry): entry is { id: string; index: number; element: HTMLElement } => Boolean(entry.element))
      .map((entry) => ({
        ...entry,
        ratio: getSectionVisibilityRatio(entry.element),
      }));

    if (entries.length === 0) return 0;

    const eligible = entries
      .filter((entry) => entry.ratio >= activeSectionVisibilityThreshold)
      .sort((left, right) => right.ratio - left.ratio);

    if (eligible.length > 0) {
      return eligible[0].index;
    }

    const bestVisible = entries.reduce((best, current) => {
      return current.ratio > best.ratio ? current : best;
    });

    if (bestVisible.ratio > 0) {
      return bestVisible.index;
    }

    const closest = entries.reduce((best, current) => {
      const bestDistance = Math.abs(best.element.getBoundingClientRect().top);
      const currentDistance = Math.abs(current.element.getBoundingClientRect().top);
      return currentDistance < bestDistance ? current : best;
    });

    return closest.index;
  }, [getSectionVisibilityRatio]);

  const scrollToSection = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (!element) return;

    const y = element.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: y, behavior: 'auto' });
    setActiveSectionId(id);

    requestAnimationFrame(() => {
      ScrollTrigger.update();
      if (id === 'hero') {
        window.dispatchEvent(new CustomEvent('hero:force-visible'));
      }
      animateLanding(element);
    });
  }, [animateLanding]);

  useEffect(() => {
    let lastPageKeyAt = 0;
    let scheduled = false;

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

    const updateActiveSection = () => {
      const currentIndex = getCurrentSectionIndex();
      setActiveSectionId(sectionIds[currentIndex]);
    };

    const handleScroll = () => {
      if (scheduled) return;
      scheduled = true;

      requestAnimationFrame(() => {
        updateActiveSection();
        scheduled = false;
      });
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

    updateActiveSection();

    window.addEventListener('keydown', handleKeyNavigation);
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('keydown', handleKeyNavigation);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, [getCurrentSectionIndex, scrollToSection]);

  return (
    <div ref={mainRef} className="relative">
      {/* Global overlays */}
      <div className="grain-overlay" />
      <div className="vignette-overlay" />
      
      {/* Navigation */}
      <Navigation activeSectionId={activeSectionId} onSectionSelect={scrollToSection} />
      
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
