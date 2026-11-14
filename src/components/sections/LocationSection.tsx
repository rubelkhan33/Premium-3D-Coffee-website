import React, { useState } from 'react';
import { CAFE_INFO } from '../../data/coffeeContent';
import { MapPin, Clock, Phone, Mail, Navigation, ExternalLink, Coffee } from 'lucide-react';
import { soundManager } from '../../audio/soundManager';

interface LocationSectionProps {
  onOrderAhead: () => void;
}

export const LocationSection: React.FC<LocationSectionProps> = ({ onOrderAhead }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = () => {
    soundManager.playClick(600);
    navigator.clipboard?.writeText?.(`${CAFE_INFO.name}, ${CAFE_INFO.address}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="visit" className="relative py-28 sm:py-36 bg-espresso-900 text-cream-100 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-amber-copper/5 blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Details */}
          <div className="lg:col-span-6 space-y-8">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="w-8 h-[1px] bg-amber-copper" />
                <span className="text-[11px] uppercase tracking-widest-luxury text-amber-copper font-medium">
                  Destination & Hours
                </span>
              </div>
              <h2 className="font-display text-4xl sm:text-6xl font-light text-cream-100 leading-tight">
                Visit the Café
              </h2>
              <p className="mt-4 text-sm sm:text-base text-cream-300/80 font-light max-w-lg leading-relaxed">
                Step into our light-filled Willow Street haven. We brew each offering to order with calm care and deliberate intention.
              </p>
            </div>

            {/* Structured Info Grid */}
            <div className="space-y-4">
              {/* Address card */}
              <div className="p-5 rounded-2xl border border-white/10 bg-espresso-850/80 backdrop-blur-sm flex items-start gap-4">
                <div className="p-3 rounded-xl bg-amber-copper/10 text-amber-copper shrink-0 mt-0.5">
                  <MapPin size={20} />
                </div>
                <div className="flex-1">
                  <div className="text-[10px] uppercase tracking-widest-luxury text-amber-copper font-semibold">
                    Address & District
                  </div>
                  <div className="font-display text-2xl text-cream-100 mt-1">
                    {CAFE_INFO.address}
                  </div>
                  <div className="text-xs text-cream-300/70 mt-0.5">
                    {CAFE_INFO.neighborhood}
                  </div>
                </div>
                <button
                  onClick={handleCopyAddress}
                  className="px-3 py-1.5 rounded-lg border border-white/15 text-xs text-cream-200 hover:border-amber-copper hover:text-amber-copper transition-colors self-center"
                >
                  {copied ? 'Copied' : 'Copy'}
                </button>
              </div>

              {/* Hours card */}
              <div className="p-5 rounded-2xl border border-white/10 bg-espresso-850/80 backdrop-blur-sm flex items-start gap-4">
                <div className="p-3 rounded-xl bg-amber-copper/10 text-amber-copper shrink-0 mt-0.5">
                  <Clock size={20} />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-widest-luxury text-amber-copper font-semibold">
                    Service Hours
                  </div>
                  <div className="font-display text-2xl text-cream-100 mt-1">
                    Open Daily: {CAFE_INFO.hoursWeekday}
                  </div>
                  <div className="text-xs text-cream-300/70 mt-0.5">
                    Slow morning pour-overs begin at 7:00 AM sharp
                  </div>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(CAFE_INFO.name + ' ' + CAFE_INFO.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundManager.playClick(600)}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-cream-100 text-espresso-950 font-semibold text-xs tracking-wider uppercase hover:bg-amber-copper transition-all duration-300 shadow-xl btn-shine"
              >
                <Navigation size={14} /> Get Directions
              </a>

              <button
                onClick={() => {
                  soundManager.playClick(640);
                  onOrderAhead();
                }}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-amber-copper/40 text-cream-100 hover:border-amber-copper hover:text-amber-copper font-semibold text-xs tracking-wider uppercase transition-all duration-300 bg-espresso-950/50"
              >
                <Coffee size={14} className="text-amber-copper" /> Order Ahead
              </button>
            </div>
          </div>

          {/* Right Artistic Map-Inspired Visual (Rule 17) */}
          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden border border-amber-copper/25 bg-espresso-950 p-6 sm:p-8 shadow-2xl">
              {/* Map SVG Canvas */}
              <div className="relative h-96 w-full rounded-2xl overflow-hidden bg-espresso-900 border border-white/5 p-4 flex items-center justify-center">
                <svg viewBox="0 0 600 400" className="w-full h-full opacity-70">
                  {/* District Roads / Blocks */}
                  <rect x="0" y="0" width="600" height="400" fill="#130e0b" />

                  {/* Minor Grid streets */}
                  <path d="M 0 80 L 600 80" stroke="#251b16" strokeWidth="16" />
                  <path d="M 0 180 L 600 180" stroke="#251b16" strokeWidth="22" />
                  <path d="M 0 310 L 600 310" stroke="#251b16" strokeWidth="18" />

                  <path d="M 120 0 L 120 400" stroke="#251b16" strokeWidth="18" />
                  <path d="M 280 0 L 280 400" stroke="#251b16" strokeWidth="24" />
                  <path d="M 450 0 L 450 400" stroke="#251b16" strokeWidth="16" />

                  {/* River / canal curve */}
                  <path
                    d="M -10 380 Q 200 320 380 390 T 620 340"
                    fill="none"
                    stroke="#1c2528"
                    strokeWidth="38"
                  />

                  {/* Willow Street Highlight */}
                  <path d="M 0 180 L 600 180" stroke="#c68449" strokeWidth="4" strokeOpacity="0.4" />
                  <path d="M 280 0 L 280 400" stroke="#c68449" strokeWidth="4" strokeOpacity="0.4" />

                  {/* Street Labels */}
                  <text x="35" y="170" fill="#a39b94" fontSize="11" letterSpacing="3" fontFamily="monospace">
                    WILLOW STREET
                  </text>
                  <text x="295" y="50" fill="#a39b94" fontSize="11" letterSpacing="3" fontFamily="monospace">
                    MILL CROSSING AVE
                  </text>

                  {/* Coffee Shop Location Beacon */}
                  <circle cx="280" cy="180" r="28" fill="#c68449" fillOpacity="0.15" />
                  <circle cx="280" cy="180" r="14" fill="#c68449" fillOpacity="0.3" />
                  <circle cx="280" cy="180" r="6" fill="#f6f2ea" stroke="#c68449" strokeWidth="2" />
                </svg>

                {/* Pin Card Overlay */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-12 bg-espresso-950/95 border border-amber-copper/40 p-4 rounded-2xl shadow-2xl backdrop-blur-md text-center max-w-xs">
                  <div className="inline-flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-widest-luxury text-amber-copper mb-1">
                    <MapPin size={12} /> Café & Roastery
                  </div>
                  <div className="font-display text-xl text-cream-100 font-light">
                    {CAFE_INFO.name}
                  </div>
                  <div className="text-xs text-cream-300/70 mt-1">
                    {CAFE_INFO.address} • Daily from 7:00 AM
                  </div>
                </div>
              </div>

              {/* Map Footer Note */}
              <div className="mt-4 flex items-center justify-between text-xs text-cream-300/60 pt-2">
                <span>Free 2-hour customer parking behind building</span>
                <span className="text-amber-copper font-medium">Bicycle rack on patio</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
