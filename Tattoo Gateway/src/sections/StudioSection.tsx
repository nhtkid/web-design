import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import InstagramVideo from '../components/InstagramVideo';

gsap.registerPlugin(ScrollTrigger);

interface StudioSectionProps {
  className?: string;
}

const StudioSection = ({ className = '' }: StudioSectionProps) => {
  const assetBase = import.meta.env.BASE_URL;
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=32.5%',
          pin: true,
          scrub: 0.45,
        }
      });

      // ENTRANCE (0%-30%)
      scrollTl.fromTo(bgRef.current,
        { opacity: 0 },
        { opacity: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(paragraphRef.current,
        { x: '-18vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'power2.out' },
        0
      );

      scrollTl.fromTo(circleRef.current,
        { y: '60vh', scale: 0.35, opacity: 0 },
        { y: 0, scale: 1, opacity: 1, ease: 'power2.out' },
        0
      );

      scrollTl.fromTo(headlineRef.current,
        { y: '18vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'power2.out' },
        0.05
      );

      // SETTLE (30%-70%): Elements hold position

      // EXIT (70%-100%)
      scrollTl.fromTo(paragraphRef.current,
        { x: 0, opacity: 1 },
        { x: '-10vw', opacity: 0, ease: 'power2.in' },
        0.70
      );

      scrollTl.fromTo(circleRef.current,
        { y: 0, scale: 1, opacity: 1 },
        { y: '-35vh', scale: 0.85, opacity: 0, ease: 'power2.in' },
        0.70
      );

      scrollTl.fromTo(headlineRef.current,
        { y: 0, opacity: 1 },
        { y: '10vh', opacity: 0, ease: 'power2.in' },
        0.70
      );

      scrollTl.fromTo(bgRef.current,
        { opacity: 1 },
        { opacity: 0.18, ease: 'power2.in' },
        0.85
      );

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="studio"
      className={`section-pinned ${className}`}
    >
      {/* Background Image */}
      <div
        ref={bgRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0 }}
      >
        <img
          src={`${assetBase}studio_bg_interior.jpg`}
          alt="Tattoo studio interior"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[rgba(11,13,16,0.5)]" />
      </div>

      {/* Paragraph Block (Top Left) */}
      <p
        ref={paragraphRef}
        className="absolute left-6 sm:left-[6vw] top-[8vh] sm:top-[10vh] max-w-[88vw] sm:max-w-[34vw] pr-6 sm:pr-0 text-[clamp(13px,1.1vw,16px)] text-[#B8BDC4] font-light leading-relaxed z-10"
        style={{ opacity: 0 }}
      >
        Private appointments, good music, and a calm pace. One client at a time—so you get the focus you came for.
      </p>

      {/* Center Circular Portal - Instagram Video (cycling back to video 1) */}
      <div
        ref={circleRef}
        className="absolute circle-portal section-circle z-[2]"
        style={{ opacity: 0 }}
      >
        <InstagramVideo
          videoSrc={`${assetBase}videos/process.mp4`}
          posterImage={`${assetBase}video_thumb_1.png`}
        />
      </div>

      {/* Bottom Headline */}
      <h2
        ref={headlineRef}
        className="absolute left-1/2 top-[78vh] sm:top-[86vh] -translate-x-1/2 section-headline font-display text-[clamp(30px,4.5vw,72px)] uppercase leading-[1] tracking-[-0.02em] text-[#F2F2F2] z-10 text-center sm:whitespace-nowrap px-4 sm:px-0"
        style={{ opacity: 0 }}
      >
        Studio sessions
      </h2>
    </section>
  );
};

export default StudioSection;
