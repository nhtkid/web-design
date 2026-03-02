import { useEffect } from 'react';
import { gsap } from 'gsap';

const StudioPage = () => {
  const assetBase = import.meta.env.BASE_URL;

  useEffect(() => {
    window.scrollTo(0, 0);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.studio-content',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out', stagger: 0.12 }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <div>
      {/* Hero banner */}
      <section className="relative min-h-[70vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={`${assetBase}studio_bg_interior.jpg`}
            alt="Tattoo studio interior"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[rgba(11,13,16,0.55)]" />
        </div>
        <div className="relative z-10 w-full px-6 sm:px-[6vw] pb-16">
          <h1 className="studio-content font-display text-[clamp(42px,5.5vw,80px)] uppercase leading-[0.95] tracking-[-0.02em] text-[#F2F2F2] mb-4 opacity-0">
            The Studio
          </h1>
          <p className="studio-content text-[clamp(14px,1.2vw,18px)] text-[#B8BDC4] font-light leading-relaxed max-w-[600px] opacity-0">
            Private appointments, good music, and a calm pace. One client at a time—so you get the focus you came for.
          </p>
        </div>
      </section>

      {/* Details */}
      <section className="px-6 sm:px-[6vw] py-20 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          <div className="studio-content opacity-0">
            <h3 className="font-display text-2xl text-[#F2F2F2] mb-4">Private Sessions</h3>
            <p className="text-[#B8BDC4] text-sm leading-relaxed">
              Every session is one-on-one. No distractions, no rush. Just the artist, the client, and the work. Sessions are booked 2–4 weeks in advance.
            </p>
          </div>
          <div className="studio-content opacity-0">
            <h3 className="font-display text-2xl text-[#F2F2F2] mb-4">Custom Design</h3>
            <p className="text-[#B8BDC4] text-sm leading-relaxed">
              Every piece is designed from scratch based on your story, body placement, and style preferences. No flash, no repeats — unless it's Flash Day.
            </p>
          </div>
          <div className="studio-content opacity-0">
            <h3 className="font-display text-2xl text-[#F2F2F2] mb-4">Location</h3>
            <p className="text-[#B8BDC4] text-sm leading-relaxed">
              Based in Milan, Italy. The exact address is shared after booking confirmation. Located in a quiet residential area with easy metro access.
            </p>
          </div>
        </div>

        {/* Gallery placeholder */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4">
          {['hero_circle_detail.jpg', 'philosophy_circle_hand.jpg', 'hero_bg_ink_texture.jpg', 'studio_bg_interior.jpg'].map((img, i) => (
            <div key={i} className="studio-content aspect-square overflow-hidden opacity-0">
              <img
                src={`${assetBase}${img}`}
                alt={`Studio gallery ${i + 1}`}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default StudioPage;
