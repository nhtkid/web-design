import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';

const AboutPage = () => {
  const assetBase = import.meta.env.BASE_URL;
  const navigate = useNavigate();
  const heroRef = useRef<HTMLDivElement>(null);
  const philRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.about-hero-content',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out', stagger: 0.12 }
      );
      gsap.fromTo(
        '.about-phil-content',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out', stagger: 0.12, delay: 0.3 }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src={`${assetBase}hero_bg_ink_texture.jpg`}
            alt="Tattoo ink texture"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[rgba(11,13,16,0.55)]" />
        </div>

        {/* Left panel gradient */}
        <div
          className="absolute left-0 top-0 w-[72vw] sm:w-[42vw] h-full"
          style={{
            background: 'linear-gradient(to right, #07080A 0%, #07080A 80%, transparent 100%)',
          }}
        />

        {/* Content */}
        <div className="relative z-10 px-6 sm:px-[6vw] max-w-[88vw] sm:max-w-[44vw]">
          <h1 className="about-hero-content font-display text-[clamp(42px,5.5vw,96px)] uppercase leading-[0.95] tracking-[-0.02em] text-[#F2F2F2] mb-8 opacity-0">
            Ink that<br />feels like<br />a memory
          </h1>
          <p className="about-hero-content text-[clamp(14px,1.2vw,18px)] text-[#B8BDC4] font-light leading-relaxed mb-8 opacity-0">
            Custom tattoos, drawn with intention.
          </p>
          <div className="about-hero-content flex gap-4 flex-wrap opacity-0">
            <button onClick={() => navigate('/contact')} className="btn-primary">
              Book a consultation
            </button>
            <button onClick={() => navigate('/courses')} className="btn-secondary">
              View courses
            </button>
          </div>
        </div>

        {/* Circle portal */}
        <div className="about-hero-content hidden sm:block absolute right-[6vw] bottom-[12vh] w-[min(30vw,360px)] h-[min(30vw,360px)] rounded-full overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.55)] opacity-0">
          <img
            src={`${assetBase}hero_circle_detail.jpg`}
            alt="Tattoo detail"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Micro label */}
        <span className="about-hero-content absolute left-[6vw] bottom-[6vh] font-mono text-[12px] uppercase tracking-[0.14em] text-[#B8BDC4] opacity-0">
          BEST OF TIMES - MILANO, ITALY 🌸
        </span>
      </section>

      {/* Philosophy Section */}
      <section ref={philRef} className="relative min-h-[80vh] flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src={`${assetBase}philosophy_bg_alice.jpg`}
            alt="Alice Rossetti"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[rgba(11,13,16,0.5)]" />
        </div>

        <div className="relative z-10 w-full px-6 sm:px-[6vw] py-20">
          <p className="about-phil-content max-w-[88vw] sm:max-w-[38vw] text-[clamp(13px,1.1vw,16px)] text-[#B8BDC4] font-light leading-relaxed mb-12 opacity-0">
            I design tattoos as visual sentences—symbols, composition, and negative space working together so the piece feels inevitable.
          </p>

          <h2 className="about-phil-content font-display text-[clamp(30px,4.5vw,72px)] uppercase leading-[1] tracking-[-0.02em] text-[#F2F2F2] opacity-0">
            Every line is a choice
          </h2>
        </div>

        {/* Circle portal */}
        <div className="about-phil-content hidden sm:block absolute right-[6vw] bottom-[12vh] w-[min(28vw,320px)] h-[min(28vw,320px)] rounded-full overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.55)] opacity-0">
          <img
            src={`${assetBase}philosophy_circle_hand.jpg`}
            alt="Tattooed hand"
            className="w-full h-full object-cover"
          />
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
