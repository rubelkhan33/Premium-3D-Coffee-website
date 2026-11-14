import React, { useState } from 'react';
import { MENU_ITEMS } from '../../data/coffeeContent';
import { MenuCategory, MenuItem } from '../../types';
import { Plus, Flame, Thermometer, Info } from 'lucide-react';
import { soundManager } from '../../audio/soundManager';
import { ProductDetailModal } from '../common/ProductDetailModal';

interface MenuSectionProps {
  onSelectItem: (item: MenuItem) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({ onSelectItem }) => {
  const [activeCategory, setActiveCategory] = useState<MenuCategory | 'ALL'>('ALL');
  const [inspectingItem, setInspectingItem] = useState<MenuItem | null>(null);

  const categories: Array<MenuCategory | 'ALL'> = ['ALL', 'ESPRESSO', 'FILTER', 'SIGNATURE', 'COLD'];

  const filteredItems = activeCategory === 'ALL'
    ? MENU_ITEMS
    : MENU_ITEMS.filter((item) => item.category === activeCategory);

  return (
    <section id="menu" className="relative py-28 sm:py-36 bg-espresso-900 text-cream-100 overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-1/3 left-10 w-96 h-96 rounded-full bg-amber-copper/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div>
            <span className="text-[11px] uppercase tracking-widest-luxury text-amber-copper font-semibold block mb-2">
              Curated Daily Extractions
            </span>
            <h2 className="font-display text-4xl sm:text-6xl font-light text-cream-100 leading-tight">
              The Seasonal Menu
            </h2>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-full bg-espresso-950/80 border border-white/10 backdrop-blur-md">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  soundManager.playClick(580);
                  setActiveCategory(cat);
                }}
                className={`px-4 sm:px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-amber-copper text-espresso-950 shadow-md shadow-amber-copper/20'
                    : 'text-cream-300/70 hover:text-cream-100 hover:bg-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Editorial Menu Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group relative flex flex-col justify-between rounded-3xl border border-white/10 bg-espresso-850/70 p-7 sm:p-8 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-amber-copper/40 hover:bg-espresso-800/80 hover:shadow-2xl hover:shadow-black/50 cursor-pointer"
              onClick={() => {
                soundManager.playClick(600);
                setInspectingItem(item);
              }}
            >
              <div>
                {/* Header: Category & Price */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] uppercase tracking-widest-luxury text-amber-copper font-medium">
                    {item.category}
                  </span>
                  <span className="font-display text-2xl font-light text-cream-100 group-hover:text-amber-copper transition-colors">
                    {item.price}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-display text-2xl sm:text-3xl font-normal text-cream-100 mb-2.5 group-hover:translate-x-0.5 transition-transform duration-300">
                  {item.name}
                </h3>

                {/* Origin */}
                {item.origin && (
                  <div className="text-xs text-amber-copper/80 italic font-serif mb-3">
                    {item.origin}
                  </div>
                )}

                {/* Description */}
                <p className="text-xs sm:text-sm text-cream-300/80 font-light leading-relaxed mb-6 line-clamp-3">
                  {item.description}
                </p>

                {/* Tasting Notes Tags */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {item.notes.map((note) => (
                    <span
                      key={note}
                      className="px-2.5 py-1 rounded-md text-[10px] uppercase tracking-wider bg-espresso-950/60 text-cream-200/80 border border-white/5"
                    >
                      {note}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer: Roast / Temp & Add Button */}
              <div className="pt-4 border-t border-white/5 flex items-center justify-between mt-auto">
                <div className="flex items-center gap-3 text-[11px] text-cream-300/60">
                  <span className="flex items-center gap-1">
                    <Flame size={12} className="text-amber-copper" /> {item.roastLevel}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Thermometer size={12} className="text-amber-copper" /> {item.temperature}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    title="View tasting notes & specs"
                    onClick={(e) => {
                      e.stopPropagation();
                      soundManager.playClick(600);
                      setInspectingItem(item);
                    }}
                    className="p-1.5 rounded-full border border-white/10 text-cream-300/60 hover:text-amber-copper hover:border-amber-copper transition-colors"
                  >
                    <Info size={13} />
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      soundManager.playClick(640);
                      onSelectItem(item);
                    }}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium border border-amber-copper/30 text-cream-200 hover:bg-amber-copper hover:text-espresso-950 hover:border-amber-copper transition-all duration-300"
                  >
                    <Plus size={13} /> Order
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Product Deep Dive Modal */}
      <ProductDetailModal
        item={inspectingItem}
        isOpen={Boolean(inspectingItem)}
        onClose={() => setInspectingItem(null)}
        onOrder={(item) => onSelectItem(item)}
      />
    </section>
  );
};
