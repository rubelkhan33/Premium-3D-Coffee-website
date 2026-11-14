import React, { useState } from 'react';
import { FloatingBeans } from '../3d/FloatingBeans';
import { Sparkles, Compass } from 'lucide-react';
import { Lazy3DSection } from '../common/Lazy3DSection';

export const BeansSection: React.FC = () => {
  const [pointerPos, setPointerPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    setPointerPos({ x, y });
  };

  return (
    <section
      id="beans-experience"
      onMouseMove={handleMouseMove}
      className="relative py-24 sm:py-32 bg-espresso-950 text-cream-100 overflow-hidden border-t border-b border-amber-copper/10"
    >
      {/* Background warm radial wash */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full bg-amber-copper/5 blur-[140px]" />
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-copper/30 bg-espresso-900/60 backdrop-blur-sm mb-4">
            <Sparkles size={12} className="text-amber-copper" />
            <span className="text-[10px] uppercase tracking-widest-luxury text-amber-copper font-medium">
              Interactive 3D Simulation
            </span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-light text-cream-100 leading-tight">
            The Living Bean
          </h2>
          <p className="mt-4 text-sm sm:text-base text-cream-300/70 font-light leading-relaxed">
            Move your cursor across the space. Watch how freshly roasted single-origin Geisha & Bourbon beans respond to kinetic touch.
          </p>
        </div>

        {/* 3D Canvas Stage */}
        <div className="relative h-[480px] sm:h-[580px] w-full rounded-3xl border border-white/10 bg-espresso-900/40 backdrop-blur-sm overflow-hidden shadow-2xl">
          <Lazy3DSection minHeight="480px">
            <FloatingBeans pointerPos={pointerPos} />
          </Lazy3DSection>

          {/* Interactive Hint Badge */}
          <div className="absolute bottom-6 left-6 flex items-center gap-2 text-xs text-cream-300/60 bg-espresso-950/70 border border-white/10 px-3.5 py-1.5 rounded-full backdrop-blur-md pointer-events-none">
            <Compass size={13} className="text-amber-copper" />
            <span>Hover or drag near any bean to repel & rotate</span>
          </div>

          {/* Roast Spec Overlay */}
          <div className="absolute top-6 right-6 hidden sm:flex flex-col items-end text-right text-xs pointer-events-none">
            <span className="text-[9px] uppercase tracking-widest-luxury text-amber-copper">Terroir Spec</span>
            <span className="text-cream-200 font-serif italic text-sm mt-0.5">Antioquia Anaerobic Natural</span>
            <span className="text-cream-300/50 text-[10px]">Density: 712g/L • Moisture: 10.4%</span>
          </div>
        </div>
      </div>
    </section>
  );
};
