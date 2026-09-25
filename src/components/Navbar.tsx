import React, { useState } from 'react';
import { ShoppingBag, Radio, Sparkles, Menu, X } from 'lucide-react';
import { CartItem } from '../types/store';


interface NavbarProps {
  cart: CartItem[];
  retentionSeconds: number;
  onOpenCart: () => void;
  onExploreCustomizer: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cart,
  retentionSeconds,
  onOpenCart,
  onExploreCustomizer,
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Format retention time MM:SS
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.08] bg-background/85 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-surface-100 border border-white/10 flex items-center justify-center text-white group-hover:border-brand-400 group-hover:scale-105 transition-all">
            <Radio className="w-4 h-4 text-brand-400" />
          </div>
          <span className="font-mono font-semibold text-lg tracking-tight text-white flex items-center gap-1.5">
            AETHER<span className="text-zinc-500 font-normal text-xs uppercase tracking-widest ml-1">AUDIO</span>
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-xs font-mono uppercase tracking-wider text-zinc-400">
          <a href="#customizer" className="hover:text-white transition-colors">
            Horizon-1
          </a>
          <a href="#catalog" className="hover:text-white transition-colors">
            Catalog
          </a>
          <a href="#acoustic-specs" className="hover:text-white transition-colors">
            Acoustic Specs
          </a>
          <a href="#reviews" className="hover:text-white transition-colors">
            Reviews
          </a>
        </nav>

        {/* Right Actions: Cart & Quick Reserve */}
        <div className="flex items-center gap-3">
          {/* Cart Retention Indicator if items exist */}
          {totalItems > 0 && retentionSeconds > 0 && (
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-100 border border-brand-500/30 text-[11px] font-mono text-zinc-300 animate-pulse">
              <span className="w-2 h-2 rounded-full bg-brand-400" />
              <span>Cart Reserved: <strong className="text-white">{formatTime(retentionSeconds)}</strong></span>
            </div>
          )}

          {/* Cart Trigger Button */}
          <button
            onClick={onOpenCart}
            className="relative p-2.5 rounded-lg bg-surface-100 hover:bg-surface-50 border border-white/10 text-zinc-300 hover:text-white transition-all active:scale-[0.98]"
            id="nav-cart-btn"
            aria-label="View shopping cart"
          >
            <ShoppingBag className="w-4 h-4" />
            {totalItems > 0 && (
              <span
                className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-brand-500 text-white text-[10px] font-mono font-bold flex items-center justify-center shadow-glow animate-fade-in"
                id="cart-badge-count"
              >
                {totalItems}
              </span>
            )}
          </button>

          {/* Primary Quick Reserve CTA */}
          <button
            onClick={onExploreCustomizer}
            className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-lg bg-brand-500 hover:bg-brand-600 text-white text-xs font-mono uppercase font-semibold shadow-glow transition-all active:scale-[0.98]"
            id="nav-reserve-btn"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Customize</span>
          </button>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-surface-100"
            aria-label="Toggle mobile menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileOpen && (
        <div className="md:hidden px-4 pt-2 pb-6 border-b border-white/10 bg-surface-200/95 backdrop-blur-xl flex flex-col gap-3 font-mono text-xs uppercase tracking-wider">
          <a
            href="#customizer"
            onClick={() => setMobileOpen(false)}
            className="px-3 py-2.5 rounded-md text-zinc-300 hover:bg-surface-100"
          >
            Horizon-1 Customizer
          </a>
          <a
            href="#catalog"
            onClick={() => setMobileOpen(false)}
            className="px-3 py-2.5 rounded-md text-zinc-300 hover:bg-surface-100"
          >
            Studio Catalog
          </a>
          <a
            href="#acoustic-specs"
            onClick={() => setMobileOpen(false)}
            className="px-3 py-2.5 rounded-md text-zinc-300 hover:bg-surface-100"
          >
            Acoustic Specs
          </a>
          <a
            href="#reviews"
            onClick={() => setMobileOpen(false)}
            className="px-3 py-2.5 rounded-md text-zinc-300 hover:bg-surface-100"
          >
            Reviews &amp; Proof
          </a>
          <button
            onClick={() => {
              setMobileOpen(false);
              onExploreCustomizer();
            }}
            className="w-full mt-2 py-3 rounded-lg bg-brand-500 text-white text-xs font-semibold uppercase flex items-center justify-center gap-2"
          >
            <span>Customize Horizon-1</span>
          </button>
        </div>
      )}
    </header>
  );
};
