import React from 'react';
import { MenuItem } from '../../types';
import { X, Flame, Thermometer, MapPin, Coffee, Droplets, Clock, ArrowRight } from 'lucide-react';
import { soundManager } from '../../audio/soundManager';

interface ProductDetailModalProps {
  item: MenuItem | null;
  isOpen: boolean;
  onClose: () => void;
  onOrder: (item: MenuItem) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  item,
  isOpen,
  onClose,
  onOrder,
}) => {
  if (!isOpen || !item) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-300"
      />

      {/* Modal Content */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-modal-title"
        className="relative w-full max-w-xl overflow-hidden rounded-3xl border border-amber-copper/30 bg-espresso-950/98 p-7 sm:p-9 text-cream-100 shadow-2xl backdrop-blur-2xl transition-all"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close product details"
          className="absolute top-5 right-5 rounded-full p-2 text-cream-300/60 hover:bg-espresso-800 hover:text-cream-100 transition-colors"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[10px] uppercase font-bold tracking-widest-luxury text-amber-copper">
              {item.category} • Spec Sheet
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-copper" />
          </div>

          <h2 id="product-modal-title" className="font-display text-3xl sm:text-4xl font-light text-cream-100">
            {item.name}
          </h2>

          <div className="flex items-center gap-3 mt-2 text-sm text-amber-copper font-serif italic">
            <span>{item.origin || 'Artisanal Blend'}</span>
            <span>•</span>
            <span className="font-display text-xl text-cream-100 not-italic font-light">{item.price}</span>
          </div>
        </div>

        {/* Narrative Description */}
        <p className="text-sm text-cream-300/80 font-light leading-relaxed mb-6">
          {item.description}
        </p>

        {/* Sensory Flavor Wheel Chips */}
        <div className="mb-6">
          <span className="text-[10px] uppercase tracking-widest-luxury text-cream-300/70 font-semibold block mb-2.5">
            Sensory Tasting Profile
          </span>
          <div className="flex flex-wrap gap-2">
            {item.notes.map((note) => (
              <span
                key={note}
                className="px-3.5 py-1.5 rounded-full text-xs font-serif italic bg-amber-copper/15 border border-amber-copper/30 text-cream-100"
              >
                {note}
              </span>
            ))}
          </div>
        </div>

        {/* Brewing & Technical Parameters Grid */}
        <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-espresso-900/60 border border-white/5 mb-6 text-center">
          <div>
            <div className="flex items-center justify-center gap-1 text-[10px] uppercase tracking-wider text-cream-300/60 mb-1">
              <Flame size={12} className="text-amber-copper" /> Roast
            </div>
            <div className="text-sm font-medium text-cream-100">{item.roastLevel}</div>
          </div>

          <div className="border-x border-white/10">
            <div className="flex items-center justify-center gap-1 text-[10px] uppercase tracking-wider text-cream-300/60 mb-1">
              <Thermometer size={12} className="text-amber-copper" /> Temp
            </div>
            <div className="text-sm font-medium text-cream-100">{item.temperature}</div>
          </div>

          <div>
            <div className="flex items-center justify-center gap-1 text-[10px] uppercase tracking-wider text-cream-300/60 mb-1">
              <Droplets size={12} className="text-amber-copper" /> Ratio
            </div>
            <div className="text-sm font-medium text-cream-100">1:2.0 Precise</div>
          </div>
        </div>

        {/* Footer Order Button */}
        <div className="flex items-center justify-between pt-2 border-t border-white/10">
          <button
            type="button"
            onClick={onClose}
            className="text-xs uppercase tracking-wider text-cream-300/60 hover:text-cream-100 transition-colors"
          >
            Back to Menu
          </button>

          <button
            type="button"
            onClick={() => {
              soundManager.playClick(650);
              onOrder(item);
              onClose();
            }}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-amber-copper hover:bg-amber-copper-light text-espresso-950 font-semibold text-xs uppercase tracking-wider transition-all duration-200 shadow-lg shadow-amber-copper/20 btn-shine"
          >
            <span>Add to Counter Order</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};
