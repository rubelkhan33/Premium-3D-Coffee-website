import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu as MenuIcon, X, Coffee } from 'lucide-react';
import { soundManager } from '../../audio/soundManager';
import { CAFE_INFO } from '../../data/coffeeContent';

interface NavbarProps {
  onOpenOrder: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenOrder }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSoundOn, setIsSoundOn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSoundToggle = () => {
    const newState = soundManager.toggleSound();
    setIsSoundOn(newState);
  };

  const navLinks = [
    { label: 'The Craft', href: '#the-craft' },
    { label: 'Coffee Beans', href: '#beans-experience' },
    { label: 'Menu', href: '#menu' },
    { label: 'Signature', href: '#signature' },
    { label: 'Bean to Cup', href: '#bean-to-cup' },
    { label: 'Atmosphere', href: '#atmosphere' },
    { label: 'Our Story', href: '#story' },
    { label: 'Visit', href: '#visit' },
  ];

  const handleLinkClick = (href: string) => {
    soundManager.playClick(500);
    setIsMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'py-3.5 bg-espresso-950/85 backdrop-blur-md border-b border-amber-copper/15 shadow-xl shadow-black/40'
            : 'py-6 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between">
          {/* Logo Wordmark */}
          <a
            href="#"
            className="group flex items-center gap-2.5 text-cream-100 transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-amber-copper rounded-sm"
          >
            <div className="w-8 h-8 rounded-full border border-amber-copper/40 flex items-center justify-center group-hover:border-amber-copper transition-colors bg-espresso-900/40">
              <Coffee size={14} className="text-amber-copper" />
            </div>
            <div className="flex flex-col">
              <span className="font-display tracking-[0.25em] text-lg sm:text-xl font-medium uppercase leading-tight text-cream-100">
                EMBER & BEAN
              </span>
              <span className="text-[8px] uppercase tracking-widest-luxury text-amber-copper -mt-0.5">
                Specialty Roasters
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.href);
                }}
                className="text-xs uppercase tracking-widest-luxury text-cream-200/80 hover:text-amber-copper transition-colors duration-200 font-medium relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-amber-copper hover:after:w-full after:transition-all after:duration-300"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action Icons & CTA */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Audio Toggle */}
            <button
              onClick={handleSoundToggle}
              aria-label={isSoundOn ? 'Mute ambient café sounds' : 'Enable ambient café sounds'}
              className={`p-2.5 rounded-full border transition-all duration-300 ${
                isSoundOn
                  ? 'border-amber-copper bg-amber-copper/20 text-amber-copper shadow-sm shadow-amber-copper/30'
                  : 'border-white/10 text-cream-300/60 hover:border-white/25 hover:text-cream-100'
              }`}
              title={isSoundOn ? 'Café Ambience: ON (Click to mute)' : 'Café Ambience: OFF (Click to listen)'}
            >
              {isSoundOn ? <Volume2 size={16} /> : <VolumeX size={16} />}
            </button>

            {/* Order Coffee CTA */}
            <button
              onClick={() => {
                soundManager.playClick(620);
                onOpenOrder();
              }}
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-cream-100 text-espresso-950 text-xs font-semibold uppercase tracking-wider hover:bg-amber-copper hover:text-espresso-950 transition-all duration-300 shadow-md hover:shadow-amber-copper/20 btn-shine"
            >
              Order Coffee
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => {
                soundManager.playClick(520);
                setIsMobileMenuOpen(!isMobileMenuOpen);
              }}
              aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="lg:hidden p-2 text-cream-100 hover:text-amber-copper transition-colors"
            >
              {isMobileMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Full-Screen Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-espresso-950/98 backdrop-blur-2xl flex flex-col justify-between px-8 py-24 transition-all duration-500 lg:hidden ${
          isMobileMenuOpen
            ? 'opacity-100 pointer-events-auto translate-y-0'
            : 'opacity-0 pointer-events-none -translate-y-8'
        }`}
      >
        <div className="space-y-6 pt-4">
          <span className="text-[10px] uppercase tracking-widest-luxury text-amber-copper block mb-4">
            Navigation Menu
          </span>
          {navLinks.map((link, idx) => (
            <div key={link.label} className="overflow-hidden">
              <a
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.href);
                }}
                className="block font-display text-3xl sm:text-4xl font-light text-cream-100 hover:text-amber-copper transition-colors py-1"
                style={{ transitionDelay: `${idx * 40}ms` }}
              >
                {link.label}
              </a>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 pt-6 space-y-4">
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              onOpenOrder();
            }}
            className="w-full py-4 rounded-full bg-amber-copper text-espresso-950 font-semibold uppercase tracking-wider text-xs shadow-lg shadow-amber-copper/20"
          >
            Order Coffee Ahead
          </button>
          <div className="flex items-center justify-between text-xs text-cream-300/60 pt-2">
            <span>{CAFE_INFO.address}</span>
            <span>{CAFE_INFO.hoursWeekday}</span>
          </div>
        </div>
      </div>
    </>
  );
};
