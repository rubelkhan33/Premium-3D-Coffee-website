import React, { useState } from 'react';
import { Sun, Wind, Volume2, TreePine, Sparkles, Sunset, Coffee, Disc } from 'lucide-react';
import { soundManager } from '../../audio/soundManager';

export const AtmosphereSection: React.FC = () => {
  const [timeOfDay, setTimeOfDay] = useState<'morning' | 'afternoon' | 'evening'>('morning');

  const atmospheres = {
    morning: {
      time: '07:30 AM',
      title: 'Morning Sun & Slow Pours',
      desc: 'Clerestory light streams across the raw walnut counter. Quiet steam rising, fresh batch cupping, and the hushed pages of morning reading.',
      soundtrack: 'Soft acoustic room warmth • Gentle steam hiss',
      lightGradient: 'from-amber-crema/25 via-amber-copper/10 to-transparent',
      bgTone: 'bg-espresso-950',
    },
    afternoon: {
      time: '01:30 PM',
      title: 'Open Roastery & Roasted Cedar',
      desc: 'Cast-iron drum humming at 200°C. Green coffee cherries unloaded, intense aromas of toasted hazelnut, and active extraction at the counter bar.',
      soundtrack: 'Low rhythmic drum hum • Grinder burr cadence',
      lightGradient: 'from-amber-copper/30 via-amber-copper-dark/20 to-transparent',
      bgTone: 'bg-espresso-900',
    },
    evening: {
      time: '07:00 PM',
      title: 'Low Amber Glow & Vinyl Grooves',
      desc: 'Warm dim filament pendants. Chilled Smoked Cortados, decaf single origins, intimate whispered conversations, and analog warmth.',
      soundtrack: 'Warm 33 RPM vinyl room tone • Muted brass acoustics',
      lightGradient: 'from-amber-copper-dark/40 via-espresso-800/30 to-transparent',
      bgTone: 'bg-espresso-950',
    },
  };

  const current = atmospheres[timeOfDay];

  const materials = [
    { name: 'Oiled American Walnut', desc: 'Hand-rubbed counter benches crafted from fallen Northern hardwoods', icon: TreePine },
    { name: 'Acoustic Wool Felt', desc: 'Natural sound dampening baffles ensuring quiet conversational privacy', icon: Wind },
    { name: 'Cast Brass & Copper', desc: 'Custom lever-press details patinated naturally with age and steam', icon: Sparkles },
    { name: 'Clerestory Daylight', desc: 'High clerestory windows capturing warm ambient rays throughout the morning', icon: Sun },
  ];

  return (
    <section id="atmosphere" className="relative py-28 sm:py-36 bg-espresso-950 text-cream-100 overflow-hidden">
      {/* Background dynamic ambient glow */}
      <div className="absolute top-1/4 right-1/4 w-[650px] h-[650px] rounded-full bg-amber-copper/10 blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-14 sm:mb-16">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-8 h-[1px] bg-amber-copper" />
            <span className="text-[11px] uppercase tracking-widest-luxury text-amber-copper font-medium">
              Sensory Architecture & Hours
            </span>
          </div>
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-light text-cream-100 leading-[1.06]">
            A sanctuary calibrated for <br />
            <span className="italic font-serif text-amber-copper">unhurried presence.</span>
          </h2>
          <p className="mt-5 text-sm sm:text-base text-cream-300/80 font-light leading-relaxed max-w-2xl">
            We designed our café not as an expedient transaction corridor, but as an intimate domestic shelter. Heavy wood, diffuse morning glare, soft acoustic dampening, and the lingering aroma of roasted cedar and cacao.
          </p>

          {/* Time of Day Switcher Pills */}
          <div className="mt-8 flex flex-wrap items-center gap-2 p-1.5 rounded-full bg-espresso-900/80 border border-white/10 w-fit">
            {(['morning', 'afternoon', 'evening'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => {
                  soundManager.playClick(620);
                  setTimeOfDay(mode);
                }}
                className={`px-4 sm:px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                  timeOfDay === mode
                    ? 'bg-amber-copper text-espresso-950 shadow-md shadow-amber-copper/20'
                    : 'text-cream-300/70 hover:text-cream-100'
                }`}
              >
                {mode === 'morning' && '07:30 AM Morning'}
                {mode === 'afternoon' && '01:30 PM Roastery'}
                {mode === 'evening' && '07:00 PM Evening'}
              </button>
            ))}
          </div>
        </div>

        {/* Layered Architectural Visual Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Main Visual Stage */}
          <div className="lg:col-span-8 relative rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-espresso-900 via-espresso-850 to-espresso-950 p-8 sm:p-12 shadow-2xl transition-all duration-500">
            {/* Dynamic Sunlight Beam / Ambient Atmosphere */}
            <div className="relative h-72 sm:h-84 w-full rounded-2xl overflow-hidden border border-amber-copper/20 bg-espresso-950/80 p-6 flex flex-col justify-between transition-all">
              <div
                className={`absolute -top-20 -left-20 w-[420px] h-[420px] bg-gradient-to-br ${current.lightGradient} rotate-45 pointer-events-none blur-3xl transition-all duration-700`}
              />

              <div className="flex items-center justify-between z-10">
                <span className="text-[10px] uppercase tracking-super-wide text-amber-copper font-bold">
                  27 Willow Street • {current.time}
                </span>
                <span className="text-xs font-mono text-cream-300/60">Acoustics: Restful & Intimate</span>
              </div>

              {/* Composition details */}
              <div className="my-auto py-4 z-10">
                <h3 className="font-display text-3xl sm:text-4xl font-light text-cream-100 mb-2">
                  {current.title}
                </h3>
                <p className="text-sm text-cream-200/80 font-light leading-relaxed max-w-lg">
                  {current.desc}
                </p>
              </div>

              <div className="flex items-center justify-between z-10 text-xs text-cream-300/70 border-t border-white/10 pt-3">
                <span className="flex items-center gap-1.5 italic font-serif">
                  <Disc size={13} className="text-amber-copper" /> {current.soundtrack}
                </span>
                <span className="font-mono text-amber-copper font-semibold">Natural Air & 42 Botanicals</span>
              </div>
            </div>

            {/* Micro Caption */}
            <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-cream-300/70 border-t border-white/10 pt-4">
              <span>Handcrafted by local millworkers in the Old Mill Arts District.</span>
              <span className="text-amber-copper uppercase tracking-wider font-semibold text-[10px]">
                No loud blenders • No rushed transactions
              </span>
            </div>
          </div>

          {/* Right Material Swatch Cards */}
          <div className="lg:col-span-4 space-y-4">
            {materials.map((m) => {
              const Icon = m.icon;
              return (
                <div
                  key={m.name}
                  className="p-5 rounded-2xl border border-white/10 bg-espresso-900/50 backdrop-blur-sm hover:border-amber-copper/40 transition-all duration-300 group"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-lg bg-amber-copper/10 text-amber-copper group-hover:scale-110 transition-transform">
                      <Icon size={16} />
                    </div>
                    <h3 className="font-display text-lg font-medium text-cream-100">
                      {m.name}
                    </h3>
                  </div>
                  <p className="text-xs text-cream-300/70 leading-relaxed pl-9">
                    {m.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
