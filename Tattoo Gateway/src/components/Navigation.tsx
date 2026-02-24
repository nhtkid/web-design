import { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Navigation = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const lastBrandTapRef = useRef(0);

  const navItems = [
    { label: 'About Me', id: 'philosophy' },
    { label: 'Artwork', id: 'craft' },
    { label: 'Aftercare', id: 'aftercare' },
    { label: 'Studio', id: 'studio' },
    { label: 'Community', id: 'community' },
    { label: 'Contact', id: 'contact' },
  ];

  useEffect(() => {
    const showNav = () => {
      const mobile = window.innerWidth < 768;

      setIsMobile(mobile);

      if (mobile) {
        setIsVisible(true);
        return;
      }

      setIsMobileMenuOpen(false);
      setIsVisible(true);
    };

    showNav();
    window.addEventListener('scroll', showNav, { passive: true });
    window.addEventListener('resize', showNav);

    return () => {
      window.removeEventListener('scroll', showNav);
      window.removeEventListener('resize', showNav);
    };
  }, []);

  useEffect(() => {
    if (navRef.current) {
      gsap.to(navRef.current, {
        y: isVisible ? 0 : -100,
        opacity: isVisible ? 1 : 0,
        duration: 0.4,
        ease: 'power2.out'
      });
    }
  }, [isVisible]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: y, behavior: 'auto' });
    }
  };

  const handleBrandTap = () => {
    if (!isMobile) {
      scrollToSection('hero');
      return;
    }

    const now = Date.now();
    const isDoubleTap = now - lastBrandTapRef.current < 320;

    if (isDoubleTap) {
      scrollToSection('hero');
      setIsMobileMenuOpen(false);
      lastBrandTapRef.current = 0;
      return;
    }

    lastBrandTapRef.current = now;
    setIsMobileMenuOpen((prev) => !prev);
  };

  const handleMenuItemTap = (id: string) => {
    scrollToSection(id);
    if (isMobile) {
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 w-full z-[100] px-[6vw] py-5 md:py-6"
      style={{
        background: 'linear-gradient(to bottom, rgba(11,13,16,0.9) 0%, rgba(11,13,16,0) 100%)',
        backdropFilter: 'blur(8px)',
        opacity: 0,
        transform: 'translateY(-100px)'
      }}
    >
      <div className="flex justify-between items-start md:items-center w-full">
        <div className="flex flex-col items-start">
          <button 
            onClick={handleBrandTap}
            aria-expanded={isMobile ? isMobileMenuOpen : undefined}
            className="font-mono text-[13px] font-semibold uppercase tracking-[0.14em] text-[#F2F2F2] hover:text-[#D4A24A] transition-colors"
          >
            Alis Mind Tattooing
          </button>

          {isMobile && isMobileMenuOpen && (
            <div className="mt-3 flex flex-col gap-2 md:hidden">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleMenuItemTap(item.id)}
                  className="text-left font-mono text-xs uppercase tracking-[0.14em] text-[#B8BDC4] hover:text-[#D4A24A] transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="hidden md:flex gap-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="font-mono text-xs uppercase tracking-[0.14em] text-[#B8BDC4] hover:text-[#D4A24A] transition-colors"
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
