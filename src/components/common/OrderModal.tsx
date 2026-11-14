import React, { useState } from 'react';
import { X, Plus, Minus, Check, Clock, MapPin, Coffee } from 'lucide-react';
import { MENU_ITEMS, CAFE_INFO } from '../../data/coffeeContent';
import { MenuItem } from '../../types';
import { soundManager } from '../../audio/soundManager';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialItem?: MenuItem | null;
}

export const OrderModal: React.FC<OrderModalProps> = ({ isOpen, onClose, initialItem }) => {
  const [selectedItems, setSelectedItems] = useState<{ [id: string]: number }>(() => {
    return initialItem ? { [initialItem.id]: 1 } : { 'ember-espresso': 1 };
  });
  const [pickupTime, setPickupTime] = useState<string>('15 mins');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleQuantity = (id: string, delta: number) => {
    soundManager.playClick(600);
    setSelectedItems(prev => {
      const current = prev[id] || 0;
      const next = current + delta;
      if (next <= 0) {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      }
      return { ...prev, [id]: next };
    });
  };

  const calculateTotal = () => {
    let total = 0;
    Object.entries(selectedItems).forEach(([id, qty]) => {
      const item = MENU_ITEMS.find(m => m.id === id);
      if (item) {
        const price = parseFloat(item.price.replace('$', ''));
        total += price * qty;
      }
    });
    return total.toFixed(2);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundManager.playClick(720);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
    }, 2800);
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-black/75 backdrop-blur-md transition-opacity duration-300"
      />

      {/* Modal Card */}
      <div 
        role="dialog"
        aria-modal="true"
        aria-labelledby="order-modal-title"
        className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-amber-copper/25 bg-espresso-900/95 p-6 sm:p-8 text-cream-100 shadow-2xl backdrop-blur-xl transition-all"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close order dialog"
          className="absolute top-5 right-5 rounded-full p-2 text-cream-300/60 hover:bg-espresso-800 hover:text-cream-100 transition-colors"
        >
          <X size={20} />
        </button>

        {isSubmitted ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-amber-copper/20 text-amber-copper">
              <Check size={32} />
            </div>
            <h3 className="font-display text-3xl font-light text-cream-100 mb-2">Order Confirmed</h3>
            <p className="text-sm text-cream-300/80 max-w-xs mb-4">
              Your brew will be ready for counter pickup in {pickupTime} at {CAFE_INFO.address}.
            </p>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest-luxury text-amber-copper">
              <Coffee size={14} /> Extraction in progress
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <span className="text-[11px] uppercase tracking-widest-luxury text-amber-copper">
                Café Pick-up Counter
              </span>
              <h2 id="order-modal-title" className="font-display text-3xl sm:text-4xl font-light text-cream-100 mt-1">
                Curate Your Order
              </h2>
              <div className="mt-2 flex items-center gap-3 text-xs text-cream-300/70">
                <span className="flex items-center gap-1">
                  <MapPin size={13} className="text-amber-copper" /> {CAFE_INFO.address}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock size={13} className="text-amber-copper" /> {CAFE_INFO.hoursWeekday}
                </span>
              </div>
            </div>

            {/* Item selector list */}
            <div className="max-h-60 overflow-y-auto pr-1 space-y-3 mb-6">
              {MENU_ITEMS.map((item) => {
                const qty = selectedItems[item.id] || 0;
                return (
                  <div
                    key={item.id}
                    className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                      qty > 0 
                        ? 'border-amber-copper/50 bg-espresso-800/60' 
                        : 'border-white/5 bg-espresso-950/40 hover:border-white/15'
                    }`}
                  >
                    <div className="pr-2">
                      <div className="text-sm font-medium text-cream-100">{item.name}</div>
                      <div className="text-xs text-cream-300/60">{item.price} • {item.temperature}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      {qty > 0 ? (
                        <>
                          <button
                            type="button"
                            onClick={() => handleQuantity(item.id, -1)}
                            className="h-7 w-7 rounded-full bg-espresso-700 hover:bg-espresso-600 flex items-center justify-center text-cream-200 transition-colors"
                          >
                            <Minus size={13} />
                          </button>
                          <span className="w-5 text-center text-sm font-semibold text-amber-copper">
                            {qty}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleQuantity(item.id, 1)}
                            className="h-7 w-7 rounded-full bg-amber-copper text-espresso-950 hover:bg-amber-copper-light flex items-center justify-center transition-colors"
                          >
                            <Plus size={13} />
                          </button>
                        </>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleQuantity(item.id, 1)}
                          className="px-3 py-1.5 text-xs rounded-full border border-amber-copper/40 text-amber-copper hover:bg-amber-copper hover:text-espresso-950 transition-colors"
                        >
                          Add
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Timing options */}
            <div className="mb-6">
              <label className="block text-xs uppercase tracking-widest-luxury text-cream-300/70 mb-2">
                Estimated Pickup Time
              </label>
              <div className="grid grid-cols-3 gap-2">
                {['10 mins', '15 mins', '25 mins'].map((time) => (
                  <button
                    key={time}
                    type="button"
                    onClick={() => {
                      soundManager.playClick(650);
                      setPickupTime(time);
                    }}
                    className={`py-2 text-xs rounded-lg border transition-all ${
                      pickupTime === time
                        ? 'border-amber-copper bg-amber-copper/20 text-cream-100 font-medium'
                        : 'border-white/10 text-cream-300/70 hover:border-white/20'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            {/* Total and submit */}
            <div className="border-t border-white/10 pt-4">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-cream-300/80">Estimated Total</span>
                <span className="font-display text-2xl text-amber-copper font-medium">
                  ${calculateTotal()}
                </span>
              </div>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={Object.keys(selectedItems).length === 0}
                className="w-full py-3.5 rounded-full bg-amber-copper hover:bg-amber-copper-light text-espresso-950 font-semibold text-sm tracking-wider uppercase transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-amber-copper/15"
              >
                Confirm Counter Pickup
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
