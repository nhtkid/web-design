import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface PhilosophySectionProps {
  className?: string;
}

const PhilosophySection = ({ className = '' }: PhilosophySectionProps) => {
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
          scrub: true,
          onEnter: () => {
            gsap.set(paragraphRef.current, { x: 0, opacity: 1 });
            gsap.set(circleRef.current, { y: 0, scale: 1, opacity: 1 });
            gsap.set(headlineRef.current, { y: 0, opacity: 1 });
          },
          onEnterBack: () => {
            gsap.set(paragraphRef.current, { x: 0, opacity: 1 });
            gsap.set(circleRef.current, { y: 0, scale: 1, opacity: 1 });
            gsap.set(headlineRef.current, { y: 0, opacity: 1 });
          },
        }
      });

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

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="philosophy"
      className={`section-pinned ${className}`}
    >
      {/* Background Image - Alice Portrait */}
      <div
        ref={bgRef}
        className="absolute inset-0 w-full h-full"
      >
        <img
          src={`${assetBase}philosophy_bg_alice.jpg`}
          alt="Alice Rossetti - Tattoo Artist"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[rgba(11,13,16,0.4)]" />
      </div>

      {/* Paragraph Block (Top Left) */}
      <p
        ref={paragraphRef}
        className="absolute left-6 sm:left-[6vw] top-[8vh] sm:top-[10vh] max-w-[88vw] sm:max-w-[34vw] pr-6 sm:pr-0 text-[clamp(13px,1.1vw,16px)] text-[#B8BDC4] font-light leading-relaxed z-10"
      >
        I design tattoos as visual sentences—symbols, composition, and negative space working together so the piece feels inevitable.
      </p>

      {/* Center Circular Portal */}
      <div
        ref={circleRef}
        className="absolute circle-portal section-circle z-[2]"
      >
        <img
          src={`${assetBase}philosophy_circle_hand.jpg`}
          alt="Tattooed hand with leaf"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Bottom Headline */}
      <h2
        ref={headlineRef}
        className="absolute left-1/2 top-[78vh] sm:top-[86vh] -translate-x-1/2 section-headline font-display text-[clamp(30px,4.5vw,72px)] uppercase leading-[1] tracking-[-0.02em] text-[#F2F2F2] z-10 text-center sm:whitespace-nowrap px-4 sm:px-0"
      >
        Every line is a choice
      </h2>
    </section>
  );
};

export default PhilosophySection;
