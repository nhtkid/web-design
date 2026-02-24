import { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, MapPin, Calendar, Instagram } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ContactSectionProps {
  className?: string;
}

const ContactSection = ({ className = '' }: ContactSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const submitRef = useRef<HTMLButtonElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    placement: '',
    idea: '',
    dates: ''
  });

  const [submitted, setSubmitted] = useState(false);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Flowing section - elements animate in as they enter viewport
      gsap.fromTo(leftColRef.current,
        { x: '-8vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      gsap.fromTo(formRef.current,
        { x: '8vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      gsap.fromTo(submitRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 60%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', placement: '', idea: '', dates: '' });
      setSubmitted(false);
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className={`relative min-h-screen bg-[#14181D] py-[12vh] px-[6vw] ${className}`}
    >
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
        {/* Left Column - Contact Info */}
        <div ref={leftColRef} className="space-y-8" style={{ opacity: 0 }}>
          <h2 className="font-display text-[clamp(42px,5vw,80px)] uppercase leading-[0.95] tracking-[-0.02em] text-[#F2F2F2]">
            Start your<br />project
          </h2>

          <p className="text-[clamp(14px,1.1vw,17px)] text-[#B8BDC4] font-light leading-relaxed max-w-[400px]">
            Tell me what you're imagining. I'll come back with questions, a timeline, and a clear plan.
          </p>

          <div className="space-y-4 pt-4">
            <div className="flex items-center gap-4">
              <Mail className="w-5 h-5 text-[#D4A24A]" />
              <span className="text-[#F2F2F2] text-sm">hello@alismind.studio</span>
            </div>
            <div className="flex items-center gap-4">
              <MapPin className="w-5 h-5 text-[#D4A24A]" />
              <span className="text-[#B8BDC4] text-sm">Milan — Private studio</span>
            </div>
            <div className="flex items-center gap-4">
              <Calendar className="w-5 h-5 text-[#D4A24A]" />
              <span className="text-[#B8BDC4] text-sm">Booking: 2–4 weeks ahead</span>
            </div>
          </div>

          <div className="pt-6">
            <a
              href="https://instagram.com/alismindtattooing"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 text-[#B8BDC4] hover:text-[#D4A24A] transition-colors"
            >
              <Instagram className="w-5 h-5" />
              <span className="font-mono text-xs uppercase tracking-[0.14em]">@alismindtattooing</span>
            </a>
          </div>
        </div>

        {/* Right Column - Form */}
        <div ref={formRef} className="bg-[rgba(242,242,242,0.03)] border border-[rgba(242,242,242,0.1)] p-8 lg:p-10" style={{ opacity: 0 }}>
          {submitted ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <div className="w-16 h-16 rounded-full bg-[#D4A24A] flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-[#0B0D10]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="font-display text-2xl text-[#F2F2F2] mb-2">Inquiry sent</h3>
              <p className="text-[#B8BDC4] text-sm">I'll be in touch within 24-48 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block font-mono text-[11px] uppercase tracking-[0.14em] text-[#B8BDC4] mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[11px] uppercase tracking-[0.14em] text-[#B8BDC4] mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono text-[11px] uppercase tracking-[0.14em] text-[#B8BDC4] mb-2">
                  Placement
                </label>
                <input
                  type="text"
                  name="placement"
                  value={formData.placement}
                  onChange={handleChange}
                  required
                  className="w-full"
                  placeholder="e.g. forearm, back, ribcage"
                />
              </div>

              <div>
                <label className="block font-mono text-[11px] uppercase tracking-[0.14em] text-[#B8BDC4] mb-2">
                  Idea & references
                </label>
                <textarea
                  name="idea"
                  value={formData.idea}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full resize-none"
                  placeholder="Describe your idea, style preferences, and any reference images..."
                />
              </div>

              <div>
                <label className="block font-mono text-[11px] uppercase tracking-[0.14em] text-[#B8BDC4] mb-2">
                  Preferred dates
                </label>
                <input
                  type="text"
                  name="dates"
                  value={formData.dates}
                  onChange={handleChange}
                  className="w-full"
                  placeholder="e.g. Weekends in March, flexible"
                />
              </div>

              <button
                ref={submitRef}
                type="submit"
                className="btn-primary w-full mt-4"
                style={{ opacity: 0 }}
              >
                Send inquiry
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-10 md:mt-0 md:absolute md:bottom-6 md:right-[6vw] text-center md:text-right">
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[rgba(184,189,196,0.5)]">
          No walk-ins. Consultations by appointment.
        </span>
      </div>
    </section>
  );
};

export default ContactSection;
