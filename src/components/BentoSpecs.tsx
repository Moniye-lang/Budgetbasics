import React, { useState } from 'react';
import { Activity, Layers, ShieldCheck, Radio } from 'lucide-react';

export const BentoSpecs: React.FC = () => {
  const [eqPreset, setEqPreset] = useState<'flat' | 'bass' | 'air'>('flat');

  return (
    <section id="acoustic-specs" className="py-20 border-b border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-medium text-brand-400 uppercase tracking-wider mb-2">
            <Layers className="w-3.5 h-3.5" />
            <span>Acoustic Engineering</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight mb-3">
            Architected for Surgical Mastering
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            Every component is machined within 5-micron tolerances to guarantee zero phase distortion across the audible spectrum.
          </p>
        </div>

        {/* Bento Grid: 4 Varied Architectural Cells */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Cell 1: Span 7 - Interactive Frequency Curve Visualizer */}
          <div className="md:col-span-7 glass-card rounded-2xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden group glass-card-hover">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center text-brand-400">
                  <Activity className="w-5 h-5" />
                </div>
                {/* EQ Preset Selector */}
                <div className="flex items-center gap-1 p-0.5 rounded-lg bg-surface-300 border border-white/5 text-xs font-mono">
                  {(['flat', 'bass', 'air'] as const).map((preset) => (
                    <button
                      key={preset}
                      onClick={() => setEqPreset(preset)}
                      className={`px-3 py-1 rounded capitalize transition-all ${
                        eqPreset === preset
                          ? 'bg-brand-500 text-white font-medium shadow-sm'
                          : 'text-zinc-400 hover:text-white'
                      }`}
                      id={`eq-preset-${preset}`}
                    >
                      {preset === 'flat' && 'Flat Reference'}
                      {preset === 'bass' && 'Sub-Bass Boost'}
                      {preset === 'air' && 'Treble Air'}
                    </button>
                  ))}
                </div>
              </div>

              <h3 className="text-xl font-semibold text-white mb-2">
                Linear Phase Frequency Response
              </h3>
              <p className="text-sm text-zinc-400 mb-6 max-w-lg leading-relaxed">
                Calibrated across 5 Hz – 55 kHz with near-zero phase smearing. Test different DSP profiles directly on the hardware FPGA.
              </p>
            </div>

            {/* Dynamic Interactive SVG Curve */}
            <div className="p-4 rounded-xl bg-surface-300/90 border border-white/5 relative">
              <div className="flex justify-between text-[10px] font-mono text-zinc-500 mb-2">
                <span>20 Hz (Sub-Bass)</span>
                <span>1 kHz (Midrange)</span>
                <span>20 kHz (Highs)</span>
                <span>55 kHz (Air)</span>
              </div>
              <svg className="w-full h-24 overflow-visible" viewBox="0 0 400 80">
                {/* Grid guidelines */}
                <line x1="0" y1="40" x2="400" y2="40" stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />
                <line x1="100" y1="0" x2="100" y2="80" stroke="rgba(255,255,255,0.05)" />
                <line x1="200" y1="0" x2="200" y2="80" stroke="rgba(255,255,255,0.05)" />
                <line x1="300" y1="0" x2="300" y2="80" stroke="rgba(255,255,255,0.05)" />

                {/* Response Curve based on selected EQ */}
                <path
                  d={
                    eqPreset === 'flat'
                      ? 'M 0 42 Q 100 40, 200 40 T 300 40 T 400 41'
                      : eqPreset === 'bass'
                      ? 'M 0 20 Q 80 25, 150 40 T 250 40 T 400 40'
                      : 'M 0 40 Q 150 40, 250 38 T 350 22 T 400 18'
                  }
                  fill="none"
                  stroke="#6366f1"
                  strokeWidth="3"
                  className="transition-all duration-500"
                />
              </svg>
              <div className="text-[11px] font-mono text-emerald-400 mt-2 flex items-center justify-between">
                <span>Phase Alignment: &plusmn;0.2&deg;</span>
                <span>THD+N: 0.003%</span>
              </div>
            </div>
          </div>

          {/* Cell 2: Span 5 - Planar Magnetic Driver */}
          <div className="md:col-span-5 glass-card rounded-2xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden group glass-card-hover">
            <div>
              <div className="w-10 h-10 rounded-xl bg-cyanAccent/10 border border-cyanAccent/20 flex items-center justify-center text-cyanAccent mb-4">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                70mm Uniforce&trade; Diaphragm
              </h3>
              <p className="text-sm text-zinc-400 mb-6 leading-relaxed">
                Sub-micron etched aluminum trace suspended between symmetric N52 Neodymium flux arrays.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-surface-300/90 border border-white/5 font-mono text-xs space-y-2">
              <div className="flex justify-between text-zinc-400">
                <span>Magnetic Flux Density</span>
                <span className="text-cyanAccent font-bold">1.85 Tesla</span>
              </div>
              <div className="h-1.5 w-full bg-surface-100 rounded-full overflow-hidden">
                <div className="h-full bg-cyanAccent rounded-full w-4/5" />
              </div>
              <div className="text-[11px] text-zinc-500 flex justify-between pt-1">
                <span>Diaphragm: 0.5 &mu;m</span>
                <span>Transient Response: &lt; 8 &mu;s</span>
              </div>
            </div>
          </div>

          {/* Cell 3: Span 5 - CNC Aerospace Chassis */}
          <div className="md:col-span-5 glass-card rounded-2xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden group glass-card-hover">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Acoustic Isolation Chassis
              </h3>
              <p className="text-sm text-zinc-400 mb-6 leading-relaxed">
                Milled from a solid billet of 6000-series aerospace aluminium to eliminate standing waves and cabinet resonance.
              </p>
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl bg-surface-300/90 border border-white/5 font-mono text-xs">
              <div>
                <div className="text-[10px] uppercase text-zinc-500">Acoustic Damping</div>
                <div className="text-lg font-bold text-white">-32 dB Passive</div>
              </div>
              <div className="text-right">
                <div className="text-[10px] uppercase text-zinc-500">Milling Precision</div>
                <div className="text-sm font-semibold text-emerald-400">&plusmn;5 Microns</div>
              </div>
            </div>
          </div>

          {/* Cell 4: Span 7 - 0.8ms Lossless Wireless Transceiver */}
          <div className="md:col-span-7 glass-card rounded-2xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden group glass-card-hover">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                  <Radio className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-surface-100 border border-white/5 text-zinc-400">
                  Zero Audio Buffer Drop
                </span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Ultra-Link 2.4GHz / Lossless Wi-Fi Audio
              </h3>
              <p className="text-sm text-zinc-400 mb-6 max-w-lg leading-relaxed">
                Custom low-jitter RF protocol transmitting uncompressed 24-bit/96kHz audio with latency imperceptible to human hearing.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3 rounded-lg bg-surface-300 border border-white/5 text-xs font-mono">
                <div className="text-zinc-200 font-medium">0.8ms Latency</div>
                <div className="text-[10px] text-zinc-500">Direct RF connection</div>
              </div>
              <div className="p-3 rounded-lg bg-surface-300 border border-white/5 text-xs font-mono">
                <div className="text-zinc-200 font-medium">24-bit / 96kHz</div>
                <div className="text-[10px] text-zinc-500">Bit-perfect stream</div>
              </div>
              <div className="p-3 rounded-lg bg-surface-300 border border-white/5 text-xs font-mono">
                <div className="text-zinc-200 font-medium">40-Hour Battery</div>
                <div className="text-[10px] text-zinc-500">USB-C Fast Charging</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
