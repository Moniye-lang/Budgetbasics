import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, Clock, ShieldCheck, Tag, ArrowRight, ShoppingBag } from 'lucide-react';
import { CartItem } from '../types/store';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  retentionSeconds: number;
  onUpdateQuantity: (index: number, newQty: number) => void;
  onRemoveItem: (index: number) => void;
  onCheckout: () => void;
  appliedDiscount: number;
  onApplyPromoCode: (code: string) => boolean;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  retentionSeconds,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  appliedDiscount,
  onApplyPromoCode,
}) => {
  const [promoInput, setPromoInput] = useState('');
  const [promoMessage, setPromoMessage] = useState<{ text: string; isError: boolean } | null>(null);

  if (!isOpen) return null;

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const rawSubtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountAmount = rawSubtotal * appliedDiscount;
  const finalTotal = rawSubtotal - discountAmount;

  // Format retention timer MM:SS
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins}:${s < 10 ? '0' : ''}${s}`;
  };

  const handlePromoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const success = onApplyPromoCode(promoInput.trim());
    if (success) {
      setPromoMessage({ text: 'Promo code applied! 20% discount unlocked.', isError: false });
    } else {
      setPromoMessage({ text: 'Invalid promo code. Try "TASTE20" or "STUDIO10".', isError: true });
    }
  };

  // 15 min = 900s
  const retentionPercent = Math.min(100, Math.max(0, (retentionSeconds / 900) * 100));

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Dimmed backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        id="cart-backdrop"
      />

      {/* Slide-over Drawer */}
      <div className="relative w-full max-w-md h-full bg-[#090b10] border-l border-white/10 shadow-2xl flex flex-col z-10 animate-fade-in font-mono">
        {/* Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between bg-surface-200/90">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-brand-400" />
            <h2 className="text-sm font-semibold uppercase text-white tracking-wider">
              Studio Cart ({totalItems})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-surface-100 transition-colors"
            id="close-cart-btn"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Cart Item Retention Period Warning Bar */}
        {cart.length > 0 && (
          <div className="bg-surface-300 px-5 py-3 border-b border-white/10 space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-zinc-400 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>Cart Item Retention Lock:</span>
              </span>
              <span className="font-bold text-white text-xs" id="retention-timer-display">
                {formatTime(retentionSeconds)}
              </span>
            </div>
            {/* Progress Bar */}
            <div className="h-1.5 w-full bg-surface-100 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-1000 rounded-full ${
                  retentionSeconds < 180 ? 'bg-red-500' : 'bg-brand-400'
                }`}
                style={{ width: `${retentionPercent}%` }}
              />
            </div>
            <p className="text-[10px] text-zinc-500 leading-tight">
              Due to limited planar batch runs, stock is held for 15 minutes before release.
            </p>
          </div>
        )}

        {/* Items Scroll List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center text-zinc-500 py-12">
              <ShoppingBag className="w-12 h-12 stroke-[1] mb-3 text-zinc-600" />
              <p className="text-sm text-zinc-300 font-semibold mb-1">Your cart is empty</p>
              <p className="text-xs text-zinc-500 max-w-xs">
                Explore our reference planar headphones and modular studio DACs.
              </p>
            </div>
          ) : (
            cart.map((item, idx) => (
              <div
                key={`${item.product.id}-${item.selectedColorway.name}`}
                className="p-3.5 rounded-xl bg-surface-200/80 border border-white/5 flex gap-3 text-xs"
              >
                {/* Color Swatch Icon */}
                <div
                  className="w-12 h-12 rounded-lg border border-white/10 flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${item.selectedColorway.accent}15` }}
                >
                  <span
                    className="w-5 h-5 rounded-full border border-white/20"
                    style={{ backgroundColor: item.selectedColorway.hex }}
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold text-white truncate">{item.product.name}</h3>
                    <span className="font-bold text-white shrink-0">${item.product.price * item.quantity}</span>
                  </div>
                  <div className="text-[11px] text-zinc-400 mt-0.5">{item.selectedColorway.name}</div>

                  {/* Quantity Controls & Delete */}
                  <div className="flex items-center justify-between mt-3 pt-2 border-t border-white/5">
                    <div className="flex items-center gap-1.5 p-0.5 rounded bg-surface-300 border border-white/5">
                      <button
                        onClick={() => onUpdateQuantity(idx, item.quantity - 1)}
                        className="p-1 rounded hover:bg-surface-100 text-zinc-400 hover:text-white"
                        id={`qty-decrease-${idx}`}
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 text-xs font-bold text-white">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(idx, item.quantity + 1)}
                        className="p-1 rounded hover:bg-surface-100 text-zinc-400 hover:text-white"
                        id={`qty-increase-${idx}`}
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      onClick={() => onRemoveItem(idx)}
                      className="text-zinc-500 hover:text-red-400 p-1 transition-colors"
                      title="Remove item"
                      id={`remove-item-${idx}`}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Summary & Checkout */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-white/10 bg-surface-200/95 space-y-4">
            {/* Promo Code Input */}
            <form onSubmit={handlePromoSubmit} className="flex gap-2">
              <div className="relative flex-1">
                <Tag className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Promo code (e.g. TASTE20)"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-surface-300 border border-white/10 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-brand-400"
                  id="promo-code-input"
                />
              </div>
              <button
                type="submit"
                className="px-3 py-1.5 rounded-lg bg-surface-100 hover:bg-surface-50 text-xs font-semibold text-white border border-white/10 transition-colors"
                id="apply-promo-btn"
              >
                Apply
              </button>
            </form>

            {promoMessage && (
              <div
                className={`text-[11px] ${
                  promoMessage.isError ? 'text-red-400' : 'text-emerald-400'
                }`}
              >
                {promoMessage.text}
              </div>
            )}

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 text-xs text-zinc-400 pt-1">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-white">${rawSubtotal.toFixed(2)}</span>
              </div>
              {appliedDiscount > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>Promo Discount ({(appliedDiscount * 100).toFixed(0)}%)</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Studio Express Shipping</span>
                <span className="text-emerald-400">FREE Worldwide</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-white/10">
                <span>Total Due</span>
                <span className="font-mono text-base text-brand-300" id="cart-total-amount">
                  ${finalTotal.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={onCheckout}
              className="w-full py-3.5 rounded-lg bg-brand-500 hover:bg-brand-600 text-white font-mono text-xs uppercase font-bold tracking-wider shadow-glow flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
              id="checkout-btn"
            >
              <span>Instant Express Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-2 text-[10px] text-zinc-500">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>256-Bit Encrypted · 30-Day Money Back Guarantee</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
