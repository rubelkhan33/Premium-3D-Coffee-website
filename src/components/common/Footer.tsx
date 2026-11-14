import React from 'react';
import { CAFE_INFO } from '../../data/coffeeContent';
import { Coffee, ArrowUp, Instagram, Mail, MapPin, Linkedin } from 'lucide-react';
import { soundManager } from '../../audio/soundManager';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    soundManager.playClick(650);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-espresso-950 text-cream-100 pt-20 pb-12 border-t border-white/10 overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-amber-copper/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          {/* Brand Info */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full border border-amber-copper/50 flex items-center justify-center bg-espresso-900">
                <Coffee size={14} className="text-amber-copper" />
              </div>
              <span className="font-display tracking-[0.25em] text-xl font-medium uppercase text-cream-100">
                EMBER & BEAN
              </span>
            </div>

            <p className="font-serif italic text-lg sm:text-xl text-cream-200/90 max-w-sm">
              Slow mornings. Deep conversations. Exceptional coffee.
            </p>

            <p className="text-xs text-cream-300/60 max-w-md leading-relaxed font-light">
              An independent roastery and coffee sanctuary dedicated to micro-lot sourcing, precision extraction, and quiet hospitality.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-cream-300/70">
              <span className="flex items-center gap-1">
                <MapPin size={13} className="text-amber-copper" /> {CAFE_INFO.address}
              </span>
              <span>•</span>
              <a
                href={`mailto:${CAFE_INFO.email}`}
                className="flex items-center gap-1 hover:text-amber-copper transition-colors"
              >
                <Mail size={13} className="text-amber-copper" /> {CAFE_INFO.email}
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-[10px] uppercase tracking-widest-luxury text-amber-copper font-semibold block mb-4">
              Navigation
            </span>
            <ul className="space-y-2 text-xs uppercase tracking-wider text-cream-300/70">
              <li>
                <a href="#the-craft" className="hover:text-amber-copper transition-colors">The Craft</a>
              </li>
              <li>
                <a href="#menu" className="hover:text-amber-copper transition-colors">Menu</a>
              </li>
              <li>
                <a href="#signature" className="hover:text-amber-copper transition-colors">Signature Drink</a>
              </li>
              <li>
                <a href="#bean-to-cup" className="hover:text-amber-copper transition-colors">Bean to Cup</a>
              </li>
              <li>
                <a href="#story" className="hover:text-amber-copper transition-colors">Our Story</a>
              </li>
              <li>
                <a href="#visit" className="hover:text-amber-copper transition-colors">Visit Café</a>
              </li>
            </ul>
          </div>

          {/* Connect & Newsletter */}
          <div className="md:col-span-3 space-y-4">
            <span className="text-[10px] uppercase tracking-widest-luxury text-amber-copper font-semibold block mb-4">
              Journal & Notes
            </span>
            <p className="text-xs text-cream-300/70 leading-relaxed font-light">
              Receive seasonal harvest arrivals, cupping invitations, and brewing recipes.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                soundManager.playClick(700);
                alert('Thank you for joining our slow morning dispatch.');
              }}
              className="flex items-center gap-2"
            >
              <input
                type="email"
                required
                placeholder="morning@coffee.com"
                className="w-full px-4 py-2.5 rounded-full bg-espresso-900 border border-white/10 text-xs text-cream-100 placeholder-cream-400/40 focus:outline-none focus:border-amber-copper"
              />
              <button
                type="submit"
                className="px-4 py-2.5 rounded-full bg-amber-copper hover:bg-amber-copper-light text-espresso-950 font-semibold text-xs tracking-wider uppercase transition-colors shrink-0"
              >
                Join
              </button>
            </form>

            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-full border border-white/10 text-cream-300/70 hover:border-amber-copper hover:text-amber-copper transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={15} />
              </a>
              <a
                href="https://www.linkedin.com/in/rubelkhan-ai"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full border border-white/10 text-cream-300/70 hover:border-amber-copper hover:text-amber-copper transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={15} />
              </a>
              <span className="text-xs text-cream-300/50">@emberandbean</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar with subtle final coffee-bean animation */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-cream-300/50">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            {/* Subtle animated coffee bean icon */}
            <div className="w-5 h-5 relative flex items-center justify-center animate-pulse-subtle shrink-0">
              <svg viewBox="0 0 24 24" className="w-full h-full text-amber-copper">
                <ellipse cx="12" cy="12" rx="7" ry="10" fill="none" stroke="currentColor" strokeWidth="2" />
                <path d="M12 4 Q14 12 10 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <span>© 2026 EMBER & BEAN Roasting Co. All rights reserved.</span>
            <span className="text-cream-300/30 hidden sm:inline">|</span>
            <span className="inline-flex flex-wrap items-center gap-1.5">
              <span>Contact Us:</span>
              <a
                href="https://wa.me/8801768877746"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-copper hover:text-amber-copper-light hover:underline transition-colors font-medium"
              >
                +88 01768-877746
              </a>
              <span className="text-cream-300/30">/</span>
              <a
                href="https://www.linkedin.com/in/rubelkhan-ai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-copper hover:text-amber-copper-light hover:underline transition-colors font-medium inline-flex items-center gap-1"
              >
                <Linkedin size={12} />
                <span>LinkedIn</span>
              </a>
            </span>
          </div>

          <div className="flex items-center gap-6">
            <span className="text-[11px] text-cream-300/40">Fictional Specialty Brand Experience</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-cream-300/70 hover:text-amber-copper transition-colors text-xs uppercase tracking-wider"
            >
              <span>Back to top</span>
              <ArrowUp size={14} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
