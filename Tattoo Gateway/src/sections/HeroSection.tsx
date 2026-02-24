import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
  className?: string;
}

const HeroSection = ({ className = '' }: HeroSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const microLeftRef = useRef<HTMLSpanElement>(null);
  const microRightRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Auto-play entrance animation
      const tl = gsap.timeline({ delay: 0.3 });

      // Background fade in
      tl.fromTo(bgRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6, ease: 'power2.out' },
        0
      );

      // Left panel slide in
      tl.fromTo(panelRef.current,
        { x: '-40vw', opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
        0
      );

      // Headline words stagger
      const words = headlineRef.current?.querySelectorAll('.word');
      if (words) {
        tl.fromTo(words,
          { y: 40, opacity: 0, rotateX: 25 },
          { y: 0, opacity: 1, rotateX: 0, duration: 0.6, stagger: 0.04, ease: 'power3.out' },
          0.3
        );
      }

      // Subheadline
      tl.fromTo(subheadRef.current,
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' },
        0.6
      );

      // CTAs
      tl.fromTo(ctaRef.current?.children || [],
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: 'power2.out' },
        0.7
      );

      // Circle portal
      tl.fromTo(circleRef.current,
        { scale: 0.65, opacity: 0, x: '10vw' },
        { scale: 1, opacity: 1, x: 0, duration: 1, ease: 'power3.out' },
        0.2
      );

      // Micro labels
      tl.fromTo([microLeftRef.current, microRightRef.current],
        { opacity: 0 },
        { opacity: 1, duration: 0.4, stagger: 0.1 },
        0.9
      );

      // Scroll-driven EXIT animation
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=32.5%',
          pin: true,
          scrub: 0.45,
          onLeaveBack: () => {
            // Reset all elements to visible when scrolling back to top
            gsap.set([bgRef.current, panelRef.current, headlineRef.current, subheadRef.current, circleRef.current], {
              opacity: 1, x: 0, scale: 1
            });
            gsap.set(ctaRef.current?.children || [], { opacity: 1, x: 0 });
          }
        }
      });

      // ENTRANCE (0%-30%): Hold settle state (no entrance transforms - handled by load animation)
      // SETTLE (30%-70%): Hold

      // EXIT (70%-100%)
      scrollTl.fromTo(headlineRef.current,
        { x: 0, opacity: 1 },
        { x: '-18vw', opacity: 0, ease: 'power2.in' },
        0.70
      );

      scrollTl.fromTo(subheadRef.current,
        { x: 0, opacity: 1 },
        { x: '-12vw', opacity: 0, ease: 'power2.in' },
        0.72
      );

      scrollTl.fromTo(ctaRef.current,
        { x: 0, opacity: 1 },
        { x: '-10vw', opacity: 0, ease: 'power2.in' },
        0.74
      );

      scrollTl.fromTo(circleRef.current,
        { x: 0, scale: 1, opacity: 1 },
        { x: '-22vw', scale: 0.85, opacity: 0, ease: 'power2.in' },
        0.70
      );

      scrollTl.fromTo(panelRef.current,
        { x: 0, opacity: 1 },
        { x: '-45vw', opacity: 0.2, ease: 'power2.in' },
        0.70
      );

      scrollTl.fromTo([microLeftRef.current, microRightRef.current],
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.80
      );

    }, section);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: y, behavior: 'auto' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className={`section-pinned ${className}`}
    >
      {/* Background Image */}
      <div
        ref={bgRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0 }}
      >
        <img
          src="/hero_bg_ink_texture.jpg"
          alt="Tattoo ink texture"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[rgba(11,13,16,0.4)]" />
      </div>

      {/* Left Ink Panel */}
      <div
        ref={panelRef}
        className="absolute left-0 top-0 w-[72vw] sm:w-[38vw] h-full bg-[#07080A]"
        style={{
          background: 'linear-gradient(to right, #07080A 0%, #07080A 85%, transparent 100%)',
          opacity: 0
        }}
      />

      {/* Content Container */}
      <div className="absolute inset-0 flex items-center">
        {/* Text Block */}
        <div className="relative z-10 pl-6 sm:pl-[6vw] pr-6 sm:pr-0 max-w-[88vw] sm:max-w-[40vw]">
          <h1
            ref={headlineRef}
            className="font-display text-[clamp(42px,5.5vw,96px)] uppercase leading-[0.95] tracking-[-0.02em] text-[#F2F2F2] mb-8"
            style={{ perspective: '1000px' }}
          >
            <span className="word inline-block">Ink</span>{' '}
            <span className="word inline-block">that</span>
            <br />
            <span className="word inline-block">feels</span>{' '}
            <span className="word inline-block">like</span>
            <br />
            <span className="word inline-block">a</span>{' '}
            <span className="word inline-block">memory</span>
          </h1>

          <p
            ref={subheadRef}
            className="text-[clamp(14px,1.2vw,18px)] text-[#B8BDC4] font-light leading-relaxed mb-8"
            style={{ opacity: 0 }}
          >
            Custom tattoos, drawn with intention.
          </p>

          <div ref={ctaRef} className="flex gap-4 flex-wrap">
            <button
              onClick={() => scrollToSection('contact')}
              className="btn-primary"
            >
              Book a consultation
            </button>
            <button
              onClick={() => scrollToSection('community')}
              className="btn-secondary"
            >
              View selected work
            </button>
          </div>
        </div>

        {/* Circular Portal */}
        <div
          ref={circleRef}
          className="absolute circle-portal section-circle"
          style={{ opacity: 0 }}
        >
          <img
            src="/hero_circle_detail.jpg"
            alt="Tattoo detail"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Micro Labels */}
      <span
        ref={microLeftRef}
        className="absolute left-[6vw] bottom-[6vh] font-mono text-[12px] uppercase tracking-[0.14em] text-[#B8BDC4]"
        style={{ opacity: 0 }}
      >
        BEST OF TIMES - MILANO, ITALY 🌸
      </span>

      <span
        ref={microRightRef}
        className="hidden sm:block absolute right-[6vw] bottom-[6vh] font-mono text-[11px] uppercase tracking-[0.14em] text-[#B8BDC4]"
        style={{ opacity: 0 }}
      >
        Scroll
      </span>
    </section>
  );
};

export default HeroSection;
