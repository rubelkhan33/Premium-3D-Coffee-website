import React, { useState } from 'react';
import { BEAN_TO_CUP_STAGES } from '../../data/coffeeContent';
import { ArrowLeft, ArrowRight, CheckCircle2, Sprout, Flame, Cog, Coffee, Wine } from 'lucide-react';
import { soundManager } from '../../audio/soundManager';

export const BeanToCupSection: React.FC = () => {
  const [activeStage, setActiveStage] = useState(0);

  const icons = [Sprout, Flame, Cog, Coffee, Wine];

  const stageIllustrations = [
    // 01 Source
    (
      <svg viewBox="0 0 200 140" className="w-48 h-32 text-amber-copper">
        <path d="M 20 120 Q 60 40 100 80 T 180 30" fill="none" stroke="currentColor" strokeWidth="2.5" strokeDasharray="4 4" />
        <circle cx="100" cy="80" r="14" fill="#c68449" fillOpacity="0.2" />
        <circle cx="100" cy="80" r="5" fill="#f6f2ea" />
        <text x="75" y="115" fill="#c68449" fontSize="10" fontFamily="monospace" letterSpacing="1">1,950m BRIX</text>
      </svg>
    ),
    // 02 Roast
    (
      <svg viewBox="0 0 200 140" className="w-48 h-32 text-amber-copper">
        <circle cx="100" cy="70" r="45" fill="none" stroke="currentColor" strokeWidth="2.5" />
        <path d="M 75 70 Q 100 50 125 70 T 100 90 Z" fill="#c68449" fillOpacity="0.3" />
        <path d="M 60 120 Q 100 95 140 120" fill="none" stroke="#dfa26b" strokeWidth="3" />
        <text x="65" y="132" fill="#c68449" fontSize="10" fontFamily="monospace" letterSpacing="1">CAST DRUM</text>
      </svg>
    ),
    // 03 Grind
    (
      <svg viewBox="0 0 200 140" className="w-48 h-32 text-amber-copper">
        <circle cx="100" cy="70" r="48" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="6 4" />
        <circle cx="100" cy="70" r="28" fill="none" stroke="currentColor" strokeWidth="2.5" />
        <line x1="100" y1="22" x2="100" y2="42" stroke="currentColor" strokeWidth="2" />
        <line x1="100" y1="98" x2="100" y2="118" stroke="currentColor" strokeWidth="2" />
        <line x1="52" y1="70" x2="72" y2="70" stroke="currentColor" strokeWidth="2" />
        <line x1="128" y1="70" x2="148" y2="70" stroke="currentColor" strokeWidth="2" />
        <text x="68" y="132" fill="#c68449" fontSize="10" fontFamily="monospace" letterSpacing="1">98mm BURR</text>
      </svg>
    ),
    // 04 Brew
    (
      <svg viewBox="0 0 200 140" className="w-48 h-32 text-amber-copper">
        <path d="M 50 40 L 150 40 L 120 100 L 80 100 Z" fill="none" stroke="currentColor" strokeWidth="2.5" />
        <line x1="100" y1="100" x2="100" y2="125" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <circle cx="100" cy="132" r="3" fill="#c68449" />
        <text x="65" y="30" fill="#c68449" fontSize="10" fontFamily="monospace" letterSpacing="1">93.5°C TDS</text>
      </svg>
    ),
    // 05 Serve
    (
      <svg viewBox="0 0 200 140" className="w-48 h-32 text-amber-copper">
        <path d="M 60 60 L 70 110 Q 100 120 130 110 L 140 60 Z" fill="none" stroke="currentColor" strokeWidth="2.5" />
        <path d="M 137 72 Q 155 72 155 88 Q 155 102 134 102" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M 90 45 Q 95 30 90 20" fill="none" stroke="#dfa26b" strokeWidth="1.5" />
        <path d="M 105 48 Q 110 32 105 18" fill="none" stroke="#dfa26b" strokeWidth="1.5" />
        <text x="68" y="134" fill="#c68449" fontSize="10" fontFamily="monospace" letterSpacing="1">STONEWARE</text>
      </svg>
    )
  ];

  const handleNext = () => {
    soundManager.playClick(620);
    setActiveStage((prev) => Math.min(prev + 1, BEAN_TO_CUP_STAGES.length - 1));
  };

  const handlePrev = () => {
    soundManager.playClick(580);
    setActiveStage((prev) => Math.max(prev - 1, 0));
  };

  return (
    <section id="bean-to-cup" className="relative py-28 sm:py-36 bg-cream-100 text-espresso-950 overflow-hidden">
      {/* Background Section Watermark */}
      <div className="absolute top-1/2 left-10 -translate-y-1/2 pointer-events-none select-none opacity-[0.035] font-display text-[220px] leading-none text-espresso-950 font-bold whitespace-nowrap">
        JOURNEY
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-[1px] bg-amber-copper" />
              <span className="text-[11px] uppercase tracking-widest-luxury text-amber-copper-dark font-bold">
                Traceability & Process
              </span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl font-light leading-tight text-espresso-950">
              From Bean to Cup
            </h2>
          </div>

          {/* Desktop Stage Navigator */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={handlePrev}
              disabled={activeStage === 0}
              aria-label="Previous coffee stage"
              className="p-3.5 rounded-full border border-espresso-300 hover:border-amber-copper text-espresso-800 disabled:opacity-30 disabled:hover:border-espresso-300 transition-colors"
            >
              <ArrowLeft size={18} />
            </button>
            <div className="text-xs font-mono font-medium text-espresso-600">
              0{activeStage + 1} / 0{BEAN_TO_CUP_STAGES.length}
            </div>
            <button
              onClick={handleNext}
              disabled={activeStage === BEAN_TO_CUP_STAGES.length - 1}
              aria-label="Next coffee stage"
              className="p-3.5 rounded-full border border-espresso-300 hover:border-amber-copper text-espresso-800 disabled:opacity-30 disabled:hover:border-espresso-300 transition-colors"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        {/* Progress Timeline Tracker Bar (Desktop) */}
        <div className="hidden lg:block mb-12">
          <div className="grid grid-cols-5 gap-4 relative">
            {/* Connecting baseline */}
            <div className="absolute top-4 left-0 right-0 h-[2px] bg-cream-300 z-0" />
            <div
              className="absolute top-4 left-0 h-[2px] bg-amber-copper transition-all duration-500 z-0"
              style={{ width: `${(activeStage / (BEAN_TO_CUP_STAGES.length - 1)) * 100}%` }}
            />

            {BEAN_TO_CUP_STAGES.map((st, idx) => {
              const IconComp = icons[idx];
              const isCurrent = activeStage === idx;
              const isPast = activeStage >= idx;
              return (
                <button
                  key={st.step}
                  onClick={() => {
                    soundManager.playClick(600);
                    setActiveStage(idx);
                  }}
                  className="relative z-10 flex flex-col items-center text-center group cursor-pointer"
                >
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isCurrent
                        ? 'bg-espresso-950 text-cream-100 ring-4 ring-amber-copper/40 scale-110 shadow-lg'
                        : isPast
                        ? 'bg-amber-copper text-espresso-950'
                        : 'bg-cream-200 text-espresso-600 group-hover:bg-cream-300'
                    }`}
                  >
                    <IconComp size={15} />
                  </div>
                  <span className={`mt-3 text-[11px] uppercase tracking-widest-luxury font-bold transition-colors ${
                    isCurrent ? 'text-espresso-950' : 'text-espresso-600'
                  }`}>
                    {st.step} — {st.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Desktop Single Focused Stage Card */}
        <div className="hidden lg:block">
          {(() => {
            const current = BEAN_TO_CUP_STAGES[activeStage];
            const Icon = icons[activeStage];
            return (
              <div className="grid grid-cols-12 gap-8 bg-cream-50 rounded-3xl p-10 sm:p-12 border border-amber-copper/20 shadow-xl transition-all duration-500">
                <div className="col-span-7 space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-amber-copper/15 flex items-center justify-center text-amber-copper-dark">
                      <Icon size={20} />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-widest-luxury text-amber-copper-dark font-bold">
                        Stage {current.step}
                      </span>
                      <h3 className="font-display text-4xl font-light text-espresso-950">
                        {current.title} • <span className="italic font-serif text-espresso-700">{current.subtitle}</span>
                      </h3>
                    </div>
                  </div>

                  <p className="text-base text-espresso-800/80 leading-relaxed font-normal">
                    {current.description}
                  </p>

                  <div className="space-y-2.5 pt-2">
                    {current.details.map((detail, dIdx) => (
                      <div key={dIdx} className="flex items-center gap-2.5 text-sm text-espresso-700">
                        <CheckCircle2 size={16} className="text-amber-copper-dark shrink-0" />
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="col-span-5 flex flex-col justify-between items-center bg-espresso-950 text-cream-100 rounded-2xl p-8 text-center relative overflow-hidden shadow-inner">
                  <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-amber-copper/15 blur-2xl pointer-events-none" />
                  
                  {/* Technical Graphic */}
                  <div className="py-2">
                    {stageIllustrations[activeStage]}
                  </div>

                  <div>
                    <span className="text-[10px] uppercase tracking-super-wide text-amber-copper font-medium">
                      {current.metricLabel}
                    </span>
                    <div className="font-display text-5xl font-light text-cream-100 my-2">
                      {current.metric}
                    </div>
                    <p className="text-xs text-cream-300/70 max-w-xs">
                      Rigorous quality threshold verified batch-by-batch in our roasting lab.
                    </p>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>

        {/* Mobile Vertical Sequential Storytelling Cards */}
        <div className="lg:hidden space-y-6">
          {BEAN_TO_CUP_STAGES.map((st, idx) => {
            const Icon = icons[idx];
            return (
              <div
                key={st.step}
                className="bg-cream-50 rounded-2xl p-6 border border-amber-copper/20 shadow-md space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-amber-copper/20 flex items-center justify-center text-amber-copper-dark">
                      <Icon size={16} />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-widest-luxury text-amber-copper-dark font-bold">
                        Stage {st.step}
                      </span>
                      <h3 className="font-display text-2xl font-light text-espresso-950">
                        {st.title}
                      </h3>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-display text-xl text-espresso-950 font-medium">{st.metric}</div>
                    <div className="text-[9px] uppercase tracking-wider text-espresso-600">{st.metricLabel}</div>
                  </div>
                </div>

                <div className="text-xs font-serif italic text-amber-copper-dark">
                  {st.subtitle}
                </div>

                <p className="text-xs text-espresso-800/80 leading-relaxed">
                  {st.description}
                </p>

                <div className="pt-2 border-t border-espresso-200/60 space-y-1.5">
                  {st.details.map((detail, dIdx) => (
                    <div key={dIdx} className="flex items-center gap-2 text-xs text-espresso-700">
                      <CheckCircle2 size={13} className="text-amber-copper-dark shrink-0" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
