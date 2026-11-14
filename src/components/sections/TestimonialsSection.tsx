import React from 'react';
import { TESTIMONIALS } from '../../data/coffeeContent';
import { Coffee, Quote } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  return (
    <section id="testimonials" className="relative py-28 sm:py-36 bg-espresso-950 text-cream-100 overflow-hidden border-t border-white/5">
      {/* Subtle ambient light */}
      <div className="absolute bottom-10 left-1/3 w-96 h-96 rounded-full bg-amber-copper/5 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-copper/30 bg-espresso-900/60 backdrop-blur-sm mb-4">
            <Quote size={12} className="text-amber-copper" />
            <span className="text-[10px] uppercase tracking-widest-luxury text-amber-copper font-medium">
              Community Reflections
            </span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-light text-cream-100 leading-tight">
            Voices from the Counter
          </h2>
          <p className="mt-4 text-sm text-cream-300/70 font-light max-w-md mx-auto">
            Quiet words shared over morning cups by our neighbors, makers, and friends.
          </p>
        </div>

        {/* 3 Refined Editorial Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="relative p-8 sm:p-9 rounded-3xl border border-white/10 bg-espresso-900/50 backdrop-blur-sm hover:border-amber-copper/40 transition-all duration-500 flex flex-col justify-between shadow-xl"
            >
              <div>
                {/* Quote Icon */}
                <div className="font-serif text-5xl text-amber-copper/40 leading-none mb-4 select-none">
                  “
                </div>

                {/* Body Quote */}
                <p className="font-serif italic text-base sm:text-lg text-cream-100/90 leading-relaxed mb-8">
                  {t.quote}
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-6 border-t border-white/10">
                <div className="font-display text-xl text-cream-100 font-medium">
                  {t.name}
                </div>
                <div className="text-xs text-cream-300/60 mt-0.5">
                  {t.role}
                </div>
                <div className="mt-3 flex items-center gap-1.5 text-[11px] text-amber-copper font-medium">
                  <Coffee size={12} />
                  <span>Favorite: {t.favoriteOrder}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
