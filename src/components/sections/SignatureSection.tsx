import React, { useState } from 'react';
import { SIGNATURE_DRINK } from '../../data/coffeeContent';
import { SignatureCupScene } from '../3d/SignatureCupScene';
import { Sparkles, GlassWater, Compass } from 'lucide-react';
import { soundManager } from '../../audio/soundManager';
import { Lazy3DSection } from '../common/Lazy3DSection';

interface SignatureSectionProps {
  onOrderSignature: () => void;
}

export const SignatureSection: React.FC<SignatureSectionProps> = ({ onOrderSignature }) => {
  const [pointerPos, setPointerPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    setPointerPos({ x, y });
  };

  return (
    <section
      id="signature"
      onMouseMove={handleMouseMove}
      className="relative py-28 sm:py-36 bg-espresso-950 text-cream-100 overflow-hidden border-t border-b border-white/5"
    >
      {/* Background warm radial halo */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-amber-copper/10 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: 3D Interactive Glass Scene */}
          <div className="lg:col-span-7 h-[460px] sm:h-[560px] md:h-[620px] w-full rounded-3xl bg-espresso-900/30 border border-amber-copper/20 relative overflow-hidden shadow-2xl">
            <Lazy3DSection minHeight="460px">
              <SignatureCupScene pointerPos={pointerPos} />
            </Lazy3DSection>

            {/* Interaction note */}
            <div className="absolute bottom-5 left-5 flex items-center gap-2 text-[11px] text-cream-300/60 bg-espresso-950/70 px-3.5 py-1.5 rounded-full border border-white/10 backdrop-blur-md pointer-events-none">
              <Compass size={13} className="text-amber-copper" />
              <span>Drag to rotate glass • Hover ingredient tags</span>
            </div>
          </div>

          {/* Right: Editorial Craft Breakdown */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-amber-copper/30 bg-espresso-900/60 backdrop-blur-sm">
              <Sparkles size={12} className="text-amber-copper" />
              <span className="text-[10px] uppercase tracking-widest-luxury text-amber-copper font-medium">
                {SIGNATURE_DRINK.subtitle}
              </span>
            </div>

            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-light text-cream-100 leading-tight">
              {SIGNATURE_DRINK.name}
            </h2>

            <p className="text-sm sm:text-base text-cream-300/80 font-light leading-relaxed">
              {SIGNATURE_DRINK.description}
            </p>

            {/* Ingredient List */}
            <div className="space-y-3 pt-2">
              {SIGNATURE_DRINK.ingredients.map((ing) => (
                <div
                  key={ing.name}
                  className="p-3.5 rounded-xl border border-white/10 bg-espresso-900/40 hover:border-amber-copper/40 transition-colors"
                >
                  <div className="text-[10px] uppercase font-bold tracking-widest-luxury text-amber-copper">
                    {ing.name}
                  </div>
                  <div className="text-xs text-cream-200 mt-0.5">
                    {ing.detail}
                  </div>
                </div>
              ))}
            </div>

            {/* Tasting Notes */}
            <div className="pt-2">
              <div className="text-[10px] uppercase tracking-widest-luxury text-cream-300/60 mb-2 font-medium">
                Sensory Profile
              </div>
              <div className="flex flex-wrap gap-2">
                {SIGNATURE_DRINK.tastingNotes.map((note) => (
                  <span
                    key={note}
                    className="px-3 py-1 rounded-full text-xs font-serif italic text-cream-100 bg-amber-copper/15 border border-amber-copper/30"
                  >
                    {note}
                  </span>
                ))}
              </div>
            </div>

            {/* Order Action */}
            <div className="pt-4 flex items-center justify-between border-t border-white/10">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-cream-300/60">House Spec Price</span>
                <div className="font-display text-3xl font-light text-amber-copper">{SIGNATURE_DRINK.price}</div>
              </div>

              <button
                onClick={() => {
                  soundManager.playClick(650);
                  onOrderSignature();
                }}
                className="px-7 py-3.5 rounded-full bg-amber-copper hover:bg-amber-copper-light text-espresso-950 font-semibold text-xs tracking-wider uppercase transition-all duration-300 shadow-xl shadow-amber-copper/20 hover:scale-[1.02] btn-shine"
              >
                Order Signature
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
