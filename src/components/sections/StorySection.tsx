import React from 'react';
import { STORY_MILESTONES } from '../../data/coffeeContent';
import { History, Compass } from 'lucide-react';

export const StorySection: React.FC = () => {
  return (
    <section id="story" className="relative py-28 sm:py-36 bg-cream-50 text-espresso-950 overflow-hidden">
      {/* Watermark */}
      <div className="absolute top-1/3 -left-12 pointer-events-none select-none opacity-[0.035] font-display text-[260px] leading-none text-espresso-950 font-bold whitespace-nowrap">
        ORIGIN
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-8 h-[1px] bg-amber-copper" />
            <span className="text-[11px] uppercase tracking-widest-luxury text-amber-copper-dark font-bold">
              Fictional Brand Chronicle
            </span>
          </div>

          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-light text-espresso-950 leading-[1.05]">
            Born from a simple idea: <br />
            <span className="italic font-serif text-amber-copper-dark">make exceptional coffee,</span> slow down, and make room for people.
          </h2>

          <p className="mt-6 text-base sm:text-lg text-espresso-800/85 font-serif italic max-w-2xl leading-relaxed">
            Ember & Bean started without investors, fancy dashboards, or expansion targets. Just a stubborn obsession with dialing in espresso and giving neighbors a quiet place to breathe.
          </p>
        </div>

        {/* Milestone Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {STORY_MILESTONES.map((item, idx) => (
            <div
              key={item.year}
              className="relative p-7 rounded-3xl bg-cream-100/90 border border-amber-copper/20 shadow-sm hover:shadow-md hover:border-amber-copper/50 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-display text-3xl sm:text-4xl text-amber-copper-dark font-light">
                    {item.year}
                  </span>
                  <span className="text-[10px] uppercase tracking-wider font-mono text-espresso-500 font-semibold">
                    0{idx + 1}
                  </span>
                </div>

                <h3 className="font-display text-xl font-medium text-espresso-950 mb-2.5">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-espresso-700/80 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-espresso-200/60 flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-espresso-500 font-medium">
                <Compass size={12} className="text-amber-copper-dark" />
                <span>Ember & Bean Archive</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
