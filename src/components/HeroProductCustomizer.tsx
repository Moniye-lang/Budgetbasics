import React, { useState } from 'react';
import { ShoppingBag, Check, ShieldCheck, Zap } from 'lucide-react';
import { Product, ProductColorway } from '../types/store';


interface HeroProductCustomizerProps {
  product: Product;
  onAddToCart: (product: Product, colorway: ProductColorway) => void;
}

export const HeroProductCustomizer: React.FC<HeroProductCustomizerProps> = ({
  product,
  onAddToCart,
}) => {
  const [selectedColorway, setSelectedColorway] = useState<ProductColorway>(product.colorways[0]);
  const [activeAngle, setActiveAngle] = useState<'front' | 'side' | 'exploded'>('front');
  const [addedToast, setAddedToast] = useState(false);

  const handleAdd = () => {
    onAddToCart(product, selectedColorway);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2500);
  };

  return (
    <section id="customizer" className="relative pt-8 md:pt-12 pb-16 overflow-hidden border-b border-white/[0.06]">
      {/* Dynamic ambient glow tailored to selected colorway accent */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] rounded-full blur-[140px] pointer-events-none -z-10 transition-colors duration-700 opacity-20"
        style={{ backgroundColor: selectedColorway.accent }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Eyebrow */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-100/90 border border-white/10 text-xs font-mono text-zinc-300 shadow-inner-specular">
            <span
              className="w-2 h-2 rounded-full animate-pulse transition-colors"
              style={{ backgroundColor: selectedColorway.accent }}
            />
            <span>STUDIO REFERENCE HARDWARE · 70MM PLANAR DRIVER</span>
          </div>

          {/* Headline (Max 2 lines) */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-white max-w-3xl leading-[1.1] mt-4 mb-3">
            Pure Acoustic Fidelity. <br />
            Zero Compromise.
          </h1>

          {/* Subtext (< 20 words) */}
          <p className="text-sm sm:text-base text-zinc-400 max-w-xl leading-relaxed">
            Ultra-thin planar magnetic engineering delivering unmatched transient speed, sub-1ms wireless link, and surgical mastering accuracy.
          </p>
        </div>

        {/* Customizer Interactive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-4">
          {/* Left Column: Visual Angle Selector & Canvas Product Renderer */}
          <div className="lg:col-span-7 flex flex-col items-center">
            {/* Interactive Headphone Graphic Representation */}
            <div className="w-full max-w-lg aspect-square glass-card rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-between relative border border-white/10 shadow-2xl overflow-hidden group">
              {/* Top Angle Bar */}
              <div className="w-full flex items-center justify-between text-xs font-mono z-10">
                <span className="text-zinc-500 uppercase tracking-wider">{selectedColorway.tag}</span>
                <div className="flex items-center gap-1 p-0.5 rounded-lg bg-surface-300 border border-white/5">
                  {(['front', 'side', 'exploded'] as const).map((angle) => (
                    <button
                      key={angle}
                      onClick={() => setActiveAngle(angle)}
                      className={`px-2.5 py-1 rounded capitalize transition-all ${
                        activeAngle === angle
                          ? 'bg-surface-100 text-white font-semibold'
                          : 'text-zinc-500 hover:text-zinc-300'
                      }`}
                      id={`angle-btn-${angle}`}
                    >
                      {angle}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dynamic SVG Audio Hardware Render */}
              <div className="my-auto relative flex items-center justify-center scale-90 sm:scale-100 transition-transform">
                <svg
                  className="w-64 sm:w-72 h-64 sm:h-72 transition-all duration-500 drop-shadow-2xl"
                  viewBox="0 0 240 240"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Headband Arch */}
                  <path
                    d="M 40 130 C 40 40, 200 40, 200 130"
                    stroke={selectedColorway.hex === '#f8fafc' ? '#94a3b8' : '#334155'}
                    strokeWidth="10"
                    strokeLinecap="round"
                  />
                  {/* Soft Cushion inner band */}
                  <path
                    d="M 55 125 C 55 55, 185 55, 185 125"
                    stroke={selectedColorway.accent}
                    strokeWidth="3"
                    strokeDasharray="4 3"
                    opacity="0.8"
                  />

                  {/* Left Ear Cup */}
                  <g className="transition-transform duration-300">
                    <rect
                      x="25"
                      y="110"
                      width="34"
                      height="68"
                      rx="17"
                      fill={selectedColorway.hex}
                      stroke={selectedColorway.accent}
                      strokeWidth="2.5"
                    />
                    {/* Speaker Grille Detail */}
                    <circle cx="42" cy="144" r="8" stroke="#475569" strokeWidth="1" strokeDasharray="2 2" />
                    <line x1="34" y1="130" x2="50" y2="158" stroke={selectedColorway.accent} strokeWidth="1" opacity="0.6" />
                  </g>

                  {/* Right Ear Cup */}
                  <g className="transition-transform duration-300">
                    <rect
                      x="181"
                      y="110"
                      width="34"
                      height="68"
                      rx="17"
                      fill={selectedColorway.hex}
                      stroke={selectedColorway.accent}
                      strokeWidth="2.5"
                    />
                    {/* Speaker Grille Detail */}
                    <circle cx="198" cy="144" r="8" stroke="#475569" strokeWidth="1" strokeDasharray="2 2" />
                    <line x1="190" y1="130" x2="206" y2="158" stroke={selectedColorway.accent} strokeWidth="1" opacity="0.6" />
                  </g>

                  {/* Exploded View Flux Rings if exploded angle selected */}
                  {activeAngle === 'exploded' && (
                    <g className="animate-pulse">
                      <ellipse cx="42" cy="144" rx="22" ry="38" stroke={selectedColorway.accent} strokeWidth="1.5" strokeDasharray="3 3" />
                      <ellipse cx="198" cy="144" rx="22" ry="38" stroke={selectedColorway.accent} strokeWidth="1.5" strokeDasharray="3 3" />
                    </g>
                  )}
                </svg>
              </div>

              {/* Bottom Quick Feature Strip */}
              <div className="w-full flex items-center justify-between text-xs font-mono text-zinc-400 pt-3 border-t border-white/5">
                <span className="flex items-center gap-1.5 text-zinc-300">
                  <Zap className="w-3.5 h-3.5 text-cyanAccent" />
                  0.8ms Wireless Ultra-Link
                </span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  2-Year Studio Warranty
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Customizer Selector & Specs Breakdown */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono uppercase tracking-widest text-zinc-500">Edition Specification</span>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold font-mono text-white">${product.price}</span>
                  {product.originalPrice && (
                    <span className="text-sm font-mono line-through text-zinc-500">${product.originalPrice}</span>
                  )}
                </div>
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight">{product.name}</h2>
              <p className="text-xs text-zinc-400 mt-1">{product.tagline}</p>
            </div>

            {/* Colorway Switcher Bar */}
            <div className="glass-card rounded-xl p-4 border border-white/10 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-zinc-400 uppercase">Select Colorway:</span>
                <span className="font-semibold text-white">{selectedColorway.name}</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {product.colorways.map((cw) => (
                  <button
                    key={cw.name}
                    onClick={() => setSelectedColorway(cw)}
                    className={`p-2.5 rounded-lg border text-left transition-all flex flex-col gap-2 ${
                      selectedColorway.name === cw.name
                        ? 'bg-surface-100 border-white/40 ring-1 ring-white/20'
                        : 'bg-surface-300/80 border-white/5 hover:border-white/20'
                    }`}
                    id={`colorway-btn-${cw.name.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className="w-4 h-4 rounded-full border border-white/20 shadow-inner"
                        style={{ backgroundColor: cw.hex }}
                      />
                      {selectedColorway.name === cw.name && (
                        <Check className="w-3 h-3 text-white" />
                      )}
                    </div>
                    <span className="text-[11px] font-mono text-zinc-300 leading-tight">{cw.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Hardware Specs Matrix */}
            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <div className="p-3 rounded-lg bg-surface-200 border border-white/5">
                <div className="text-[10px] uppercase text-zinc-500">Planar Driver</div>
                <div className="text-zinc-200 font-semibold mt-0.5">{product.specs.driver}</div>
              </div>
              <div className="p-3 rounded-lg bg-surface-200 border border-white/5">
                <div className="text-[10px] uppercase text-zinc-500">Frequency Range</div>
                <div className="text-brand-400 font-semibold mt-0.5">{product.specs.frequency}</div>
              </div>
              <div className="p-3 rounded-lg bg-surface-200 border border-white/5">
                <div className="text-[10px] uppercase text-zinc-500">Harmonic Distortion</div>
                <div className="text-emerald-400 font-semibold mt-0.5">{product.specs.thd}</div>
              </div>
              <div className="p-3 rounded-lg bg-surface-200 border border-white/5">
                <div className="text-[10px] uppercase text-zinc-500">Chassis Weight</div>
                <div className="text-zinc-200 font-semibold mt-0.5">{product.specs.weight}</div>
              </div>
            </div>

            {/* Add to Cart CTA */}
            <div className="space-y-3 pt-2">
              <button
                onClick={handleAdd}
                className="w-full py-3.5 px-6 rounded-lg bg-brand-500 hover:bg-brand-600 text-white font-mono text-xs uppercase font-bold tracking-wider shadow-glow flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
                id="hero-add-to-cart-btn"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Reserve {selectedColorway.name} — ${product.price}</span>
              </button>

              {/* Toast Feedback */}
              {addedToast && (
                <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono text-center flex items-center justify-center gap-2 animate-fade-in">
                  <Check className="w-3.5 h-3.5" />
                  <span>Added to cart! 15-Minute Retention Lock Activated.</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
