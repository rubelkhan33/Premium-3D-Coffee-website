import React, { useState, useId } from 'react';
import { CRAFT_PHILOSOPHY } from '../../data/coffeeContent';
import { Sliders, Droplets, Thermometer, Gauge, Sparkles, RefreshCw } from 'lucide-react';
import { soundManager } from '../../audio/soundManager';

export const CraftSection: React.FC = () => {
  const [extractionTime, setExtractionTime] = useState<number>(27);
  const [temperature, setTemperature] = useState<number>(93.5);
  const [ratioMode, setRatioMode] = useState<'ristretto' | 'standard' | 'lungo'>('standard');
  const timeSliderId = useId();
  const tempSliderId = useId();

  // Dynamic calculations based on thermal physics
  const calculateMetrics = () => {
    // Sweet spot centered around 27s and 93.5C
    const timeDelta = extractionTime - 27;
    const tempDelta = temperature - 93.5;

    // Yield % typically ranges between 18.2% and 22.8%
    const yieldPct = Math.min(23.2, Math.max(17.5, 20.4 + timeDelta * 0.32 + tempDelta * 0.28)).toFixed(1);
    // TDS % ranges between 8.5% and 11.2% for espresso
    const tdsPct = Math.min(12.0, Math.max(7.8, 9.8 + timeDelta * 0.18 + tempDelta * 0.12)).toFixed(1);

    let sensory = '';
    let status = '';
    let statusColor = '';

    if (extractionTime < 24) {
      status = 'Under-Extracted (Sour/Fast)';
      statusColor = 'text-amber-600';
      sensory = 'Sharp citric acidity, quick finish, salty undertones with light viscosity.';
    } else if (extractionTime > 30) {
      status = 'Over-Extracted (Bitter/Dry)';
      statusColor = 'text-stone-600';
      sensory = 'Dry astringency, charred walnut, heavy bitterness masking origin florals.';
    } else {
      status = 'Optimal Sweet Spot';
      statusColor = 'text-amber-copper-dark';
      sensory = 'Layered candied bergamot, golden honeycomb sweetness, and silky cocoa butter finish.';
    }

    return { yieldPct, tdsPct, sensory, status, statusColor };
  };

  const metrics = calculateMetrics();

  const handleReset = () => {
    soundManager.playClick(640);
    setExtractionTime(27);
    setTemperature(93.5);
    setRatioMode('standard');
  };

  return (
    <section id="the-craft" className="relative py-28 sm:py-36 bg-cream-50 text-espresso-950 overflow-hidden">
      {/* Decorative background watermark */}
      <div className="absolute top-1/2 -right-16 -translate-y-1/2 pointer-events-none select-none opacity-[0.035] font-display text-[260px] leading-none text-espresso-900 font-bold whitespace-nowrap">
        CRAFT
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-6">
          <span className="w-8 h-[1px] bg-amber-copper" />
          <span className="text-[11px] uppercase tracking-widest-luxury text-amber-copper-dark font-bold">
            The Philosophy of Extraction
          </span>
        </div>

        {/* Main Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left: Editorial Storytelling Typography */}
          <div className="lg:col-span-6 space-y-6">
            <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-light leading-[1.04] text-espresso-950">
              Good coffee <br />
              <span className="italic font-serif text-amber-copper-dark">takes time.</span>
            </h2>

            <p className="text-lg sm:text-xl font-serif italic text-espresso-800/90 leading-relaxed max-w-lg">
              {CRAFT_PHILOSOPHY.lead}
            </p>

            <div className="space-y-4 text-sm sm:text-base text-espresso-700/80 leading-relaxed font-normal max-w-lg">
              {CRAFT_PHILOSOPHY.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            {/* Metrics List */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-espresso-200">
              {CRAFT_PHILOSOPHY.stats.map((stat) => (
                <div key={stat.label}>
                  <div className="font-display text-2xl sm:text-3xl text-espresso-950 font-light">
                    {stat.value}
                  </div>
                  <div className="text-[10px] uppercase tracking-wider text-espresso-600 font-medium mt-0.5">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Interactive Extraction Lab Simulator */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-lg overflow-hidden rounded-3xl bg-espresso-900 p-7 sm:p-9 text-cream-100 shadow-2xl border border-amber-copper/20">
              {/* Composition Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-5 mb-6">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase tracking-widest-luxury text-amber-copper font-semibold">
                      Lab Station 01
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-copper animate-ping" />
                  </div>
                  <div className="font-display text-2xl font-light text-cream-100 mt-0.5">
                    Real-Time Extraction Dial
                  </div>
                </div>

                <button
                  onClick={handleReset}
                  title="Reset to 27s standard"
                  className="p-2 rounded-full border border-white/10 text-cream-300/70 hover:text-amber-copper hover:border-amber-copper transition-colors"
                >
                  <RefreshCw size={14} />
                </button>
              </div>

              {/* Sliders Area */}
              <div className="space-y-5 mb-6">
                {/* 1. Extraction Time Slider */}
                <div>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <label htmlFor={timeSliderId} className="uppercase tracking-wider text-cream-300/80 font-medium flex items-center gap-1.5">
                      <Gauge size={13} className="text-amber-copper" /> Pull Duration
                    </label>
                    <span className="font-mono text-amber-copper font-bold text-sm">
                      {extractionTime} seconds
                    </span>
                  </div>
                  <input
                    id={timeSliderId}
                    type="range"
                    min={20}
                    max={34}
                    step={1}
                    value={extractionTime}
                    onChange={(e) => {
                      setExtractionTime(Number(e.target.value));
                      soundManager.playSteamHiss();
                    }}
                    className="w-full accent-amber-copper cursor-pointer h-2 bg-espresso-800 rounded-lg"
                  />
                  <div className="flex justify-between text-[10px] text-cream-300/40 mt-1 font-mono">
                    <span>20s Fast (Sour)</span>
                    <span className="text-amber-copper">27s Ideal</span>
                    <span>34s Slow (Bitter)</span>
                  </div>
                </div>

                {/* 2. Water Temp Slider */}
                <div>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <label htmlFor={tempSliderId} className="uppercase tracking-wider text-cream-300/80 font-medium flex items-center gap-1.5">
                      <Thermometer size={13} className="text-amber-copper" /> Water Temperature
                    </label>
                    <span className="font-mono text-amber-copper font-bold text-sm">
                      {temperature.toFixed(1)}°C
                    </span>
                  </div>
                  <input
                    id={tempSliderId}
                    type="range"
                    min={90}
                    max={96}
                    step={0.5}
                    value={temperature}
                    onChange={(e) => {
                      setTemperature(Number(e.target.value));
                      soundManager.playClick(600);
                    }}
                    className="w-full accent-amber-copper cursor-pointer h-2 bg-espresso-800 rounded-lg"
                  />
                  <div className="flex justify-between text-[10px] text-cream-300/40 mt-1 font-mono">
                    <span>90.0°C</span>
                    <span className="text-amber-copper">93.5°C Stabilized</span>
                    <span>96.0°C</span>
                  </div>
                </div>
              </div>

              {/* Dynamic Live Metric Readouts */}
              <div className="p-4 rounded-2xl bg-espresso-950/80 border border-white/5 space-y-3">
                <div className="flex items-center justify-between text-xs border-b border-white/5 pb-2.5">
                  <span className="text-cream-300/60 font-medium">Extraction Yield</span>
                  <span className="font-mono text-base text-cream-100 font-semibold">{metrics.yieldPct}%</span>
                </div>

                <div className="flex items-center justify-between text-xs border-b border-white/5 pb-2.5">
                  <span className="text-cream-300/60 font-medium">Total Dissolved Solids (TDS)</span>
                  <span className="font-mono text-base text-cream-100 font-semibold">{metrics.tdsPct}%</span>
                </div>

                <div className="pt-1">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-cream-300/60">Profile Status:</span>
                    <span className={`font-semibold ${metrics.statusColor}`}>{metrics.status}</span>
                  </div>
                  <p className="text-xs text-cream-200/90 italic font-serif leading-relaxed">
                    “{metrics.sensory}”
                  </p>
                </div>
              </div>

              {/* Barista Recommendation Footer */}
              <div className="mt-5 flex items-center justify-between text-[11px] text-cream-300/60 pt-3 border-t border-white/10">
                <span className="flex items-center gap-1.5">
                  <Droplets size={12} className="text-amber-copper" /> 22.0g Dry Dose
                </span>
                <span className="text-amber-copper font-medium">
                  {extractionTime * 1.6 > 40 ? 'Double Lungo' : 'Classic Double Shot'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
