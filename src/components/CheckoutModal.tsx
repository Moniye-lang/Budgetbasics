import React, { useState } from 'react';
import { X, CheckCircle2, CreditCard, Lock, ArrowRight } from 'lucide-react';
import { CartItem } from '../types/store';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  totalAmount: number;
  onOrderSuccess: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  totalAmount,
  onOrderSuccess,
}) => {

  const [step, setStep] = useState<'form' | 'processing' | 'success'>('form');
  const [formData, setFormData] = useState({
    name: 'Alex Vance',
    email: 'alex.vance@studio.audio',
    address: '742 Evergreen Terrace',
    city: 'San Francisco',
    zip: '94107',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('processing');
    setTimeout(() => {
      setStep('success');
      onOrderSuccess();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Dimmed backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-lg bg-[#090b10] border border-white/10 rounded-2xl shadow-2xl p-6 sm:p-8 z-10 font-mono animate-fade-in text-xs">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-surface-100 transition-colors"
          id="close-checkout-modal"
        >
          <X className="w-4 h-4" />
        </button>

        {step === 'form' && (
          <div>
            <div className="flex items-center gap-2 text-brand-400 uppercase text-xs tracking-wider mb-1">
              <Lock className="w-3.5 h-3.5" />
              <span>Encrypted Checkout</span>
            </div>
            <h2 className="text-xl font-bold text-white mb-4">Complete Studio Order</h2>

            <div className="p-3 rounded-lg bg-surface-200 border border-white/5 mb-6 flex justify-between items-center">
              <span className="text-zinc-400">Total Payable:</span>
              <span className="text-lg font-bold text-white font-mono" id="modal-total-display">
                ${totalAmount.toFixed(2)}
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-zinc-400 uppercase text-[10px] mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-surface-300 border border-white/10 text-white focus:outline-none focus:border-brand-400"
                  id="checkout-name-input"
                />
              </div>

              <div>
                <label className="block text-zinc-400 uppercase text-[10px] mb-1">Email (For Tracking &amp; Lossless DSP Keys)</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-surface-300 border border-white/10 text-white focus:outline-none focus:border-brand-400"
                  id="checkout-email-input"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-400 uppercase text-[10px] mb-1">Shipping Address</label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-surface-300 border border-white/10 text-white focus:outline-none focus:border-brand-400"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 uppercase text-[10px] mb-1">City &amp; Zip</label>
                  <input
                    type="text"
                    required
                    value={`${formData.city}, ${formData.zip}`}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-surface-300 border border-white/10 text-white focus:outline-none focus:border-brand-400"
                  />
                </div>
              </div>

              <div className="p-3 rounded-lg bg-surface-300/80 border border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2 text-zinc-300">
                  <CreditCard className="w-4 h-4 text-brand-400" />
                  <span>Card ending in 4242 (Simulated)</span>
                </div>
                <span className="text-[10px] text-emerald-400 font-semibold">Ready</span>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-lg bg-brand-500 hover:bg-brand-600 text-white font-mono text-xs uppercase font-bold tracking-wider shadow-glow flex items-center justify-center gap-2 transition-all active:scale-[0.98] mt-4"
                id="submit-payment-btn"
              >
                <span>Authorize Payment — ${totalAmount.toFixed(2)}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}

        {step === 'processing' && (
          <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-12 h-12 border-2 border-brand-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-sm font-semibold text-white">Securing Studio Batch Allocation...</p>
            <p className="text-zinc-500 text-xs">Validating hardware serial reservation.</p>
          </div>
        )}

        {step === 'success' && (
          <div className="py-8 flex flex-col items-center justify-center text-center space-y-4" id="order-success-view">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white">Order Confirmed!</h3>
            <p className="text-zinc-400 text-xs max-w-xs leading-relaxed">
              Serial <strong className="text-white">#ATH-84920</strong> has been reserved for {formData.name}. Tracking details dispatched to {formData.email}.
            </p>
            <button
              onClick={onClose}
              className="mt-4 px-6 py-2.5 rounded-lg bg-surface-100 hover:bg-surface-50 text-white text-xs font-semibold border border-white/10"
              id="success-dismiss-btn"
            >
              Back to Studio
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
