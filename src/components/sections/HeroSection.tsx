import React, { useRef } from 'react';
import { ArrowDown, Sparkles } from 'lucide-react';
import { HeroCupScene } from '../3d/HeroCupScene';
import { soundManager } from '../../audio/soundManager';

interface HeroSectionProps {
  pointerPos: { x: number; y: number };
  scrollYProgress: number;
  onExploreMenu: () => void;
  onVisitCafe: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  pointerPos,
  scrollYProgress,
  onExploreMenu,
  onVisitCafe,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden pt-20 pb-12 sm:py-24"
    >
      {/* Background ambient warm gradient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-amber-copper/10 blur-[130px]" />
        <div className="absolute bottom-10 right-10 w-[400px] h-[400px] rounded-full bg-espresso-800/20 blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center z-10 min-h-[80vh]">
        {/* Left Editorial Copy */}
        <div className="lg:col-span-6 flex flex-col justify-center text-left order-2 lg:order-1 pt-4 lg:pt-0">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-copper/30 bg-espresso-900/60 backdrop-blur-sm w-fit mb-6">
            <Sparkles size={12} className="text-amber-copper" />
            <span className="text-[10px] uppercase tracking-widest-luxury text-cream-200 font-medium">
              Small-Batch Roastery & Café
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-light tracking-tight text-cream-100 leading-[1.06] mb-6">
            EMBER & BEAN
            <span className="block mt-2 font-serif italic text-3xl sm:text-5xl md:text-6xl text-amber-copper/90 font-normal">
              Slow mornings.
            </span>
            <span className="block text-cream-200/90">
              Deep conversations.
            </span>
            <span className="block text-cream-300/80">
              Exceptional coffee.
            </span>
          </h1>

          {/* Supporting Text */}
          <p className="text-sm sm:text-base text-cream-300/80 font-light leading-relaxed max-w-lg mb-8">
            Small-batch coffee, carefully roasted and served with intention. We source exceptional micro-lots to turn daily morning routines into lingering rituals.
          </p>

          {/* CTA Group */}
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => {
                soundManager.playClick(600);
                onExploreMenu();
              }}
              className="px-7 py-3.5 rounded-full bg-amber-copper hover:bg-amber-copper-light text-espresso-950 font-semibold text-xs tracking-wider uppercase transition-all duration-300 shadow-xl shadow-amber-copper/20 hover:scale-[1.02] btn-shine"
            >
              Explore the Menu
            </button>

            <button
              onClick={() => {
                soundManager.playClick(520);
                onVisitCafe();
              }}
              className="px-7 py-3.5 rounded-full border border-cream-200/30 hover:border-amber-copper text-cream-100 hover:text-amber-copper font-medium text-xs tracking-wider uppercase transition-all duration-300 hover:bg-white/5"
            >
              Visit the Café
            </button>
          </div>

          {/* Micro Brand Notes */}
          <div className="mt-12 pt-6 border-t border-white/10 grid grid-cols-3 gap-4 max-w-md">
            <div>
              <div className="font-display text-xl sm:text-2xl text-amber-copper font-light">1,950m</div>
              <div className="text-[10px] uppercase tracking-wider text-cream-300/60 mt-0.5">High Elevation</div>
            </div>
            <div>
              <div className="font-display text-xl sm:text-2xl text-cream-100 font-light">6 kg</div>
              <div className="text-[10px] uppercase tracking-wider text-cream-300/60 mt-0.5">Micro Roasts</div>
            </div>
            <div>
              <div className="font-display text-xl sm:text-2xl text-cream-100 font-light">100%</div>
              <div className="text-[10px] uppercase tracking-wider text-cream-300/60 mt-0.5">Direct Trade</div>
            </div>
          </div>
        </div>

        {/* Right 3D Interactive Cup Stage */}
        <div className="lg:col-span-6 h-[440px] sm:h-[540px] md:h-[620px] w-full relative order-1 lg:order-2 flex items-center justify-center">
          <HeroCupScene pointerPos={pointerPos} scrollYProgress={scrollYProgress} />
          
          {/* Subtle 3D Interaction Prompt Badge */}
          <div className="absolute bottom-2 right-4 px-3 py-1 rounded-full bg-espresso-950/60 border border-white/10 backdrop-blur-md pointer-events-none hidden sm:flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-cream-300/50">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-copper animate-ping" />
            Interactive 3D Ceramic
          </div>
        </div>
      </div>

      {/* Elegant Scroll Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none opacity-70 hover:opacity-100 transition-opacity">
        <span className="text-[9px] uppercase tracking-super-wide text-cream-300/60">Scroll to Explore</span>
        <div className="w-5 h-8 rounded-full border border-cream-300/30 flex items-start justify-center p-1">
          <div className="w-1 h-2 rounded-full bg-amber-copper animate-bounce" />
        </div>
      </div>
    </section>
  );
};
