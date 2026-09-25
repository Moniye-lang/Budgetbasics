import React, { useState } from 'react';
import { Check, Sparkles, Shield, Zap, ArrowRight } from 'lucide-react';

export const PricingCalculator: React.FC = () => {
  const [isAnnual, setIsAnnual] = useState(true);
  const [seats, setSeats] = useState(5);
  const [syntheses, setSyntheses] = useState(25); // in thousands

  // Base price calculation
  const basePerSeat = isAnnual ? 24 : 30;
  const synthesesAddon = Math.floor(syntheses / 10) * (isAnnual ? 12 : 15);
  const teamMonthlyTotal = seats * basePerSeat + synthesesAddon;

  return (
    <section id="pricing" className="py-20 border-t border-white/[0.06] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-medium text-brand-400 uppercase tracking-wider mb-2">
            <Zap className="w-3.5 h-3.5" />
            <span>Transparent Pricing</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight mb-4">
            Pay for Verified Compute, Not Empty Prompts
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            Free forever for open source developers. Scale deterministically with team volume.
          </p>

          {/* Billing Toggle */}
          <div className="mt-8 inline-flex items-center gap-3 p-1 rounded-full bg-surface-200 border border-white/10 text-xs font-mono">
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-4 py-1.5 rounded-full transition-colors ${
                !isAnnual ? 'bg-brand-500 text-white font-medium shadow-sm' : 'text-zinc-400 hover:text-white'
              }`}
              id="pricing-toggle-monthly"
            >
              Monthly
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-4 py-1.5 rounded-full flex items-center gap-1.5 transition-colors ${
                isAnnual ? 'bg-brand-500 text-white font-medium shadow-sm' : 'text-zinc-400 hover:text-white'
              }`}
              id="pricing-toggle-annual"
            >
              <span>Annual</span>
              <span className="px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                -20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {/* Tier 1: Developer Solo */}
          <div className="glass-card rounded-2xl p-8 flex flex-col justify-between border border-white/10 hover:border-white/20 transition-all">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono uppercase tracking-wider text-zinc-400">Open Source</span>
                <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-surface-100 text-zinc-300 border border-white/5">
                  Solo
                </span>
              </div>
              <div className="text-3xl font-bold text-white mb-2">$0</div>
              <p className="text-xs text-zinc-400 mb-6">
                Full AST compiler verification for personal repositories &amp; open source maintainers.
              </p>

              <div className="space-y-3 pt-6 border-t border-white/5 text-xs text-zinc-300">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-brand-400" />
                  <span>Up to 1,000 AST syntheses / month</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-brand-400" />
                  <span>Local CLI &amp; VS Code Extension</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-brand-400" />
                  <span>TypeScript &amp; Rust parsers</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-brand-400" />
                  <span>Community Discord support</span>
                </div>
              </div>
            </div>

            <button
              className="mt-8 w-full py-2.5 rounded-lg bg-surface-100 hover:bg-surface-50 text-white text-xs font-medium border border-white/10 transition-colors"
              id="tier-solo-btn"
            >
              Get Started Free
            </button>
          </div>

          {/* Tier 2: Dynamic Team Calculator (Highlighted) */}
          <div className="glass-card rounded-2xl p-8 flex flex-col justify-between border-2 border-brand-500/50 shadow-glow relative bg-surface-100/90">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-brand-500 text-white text-[11px] font-mono font-semibold uppercase tracking-wider flex items-center gap-1 shadow-md">
              <Sparkles className="w-3 h-3" />
              Most Popular
            </div>

            <div>
              <div className="flex items-center justify-between mb-4 mt-2">
                <span className="text-xs font-mono uppercase tracking-wider text-brand-300 font-semibold">
                  Engineering Team
                </span>
                <span className="text-[11px] font-mono text-zinc-400">Custom Volume</span>
              </div>

              {/* Dynamic Price Display */}
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-4xl font-bold text-white font-mono" id="calculated-price">
                  ${teamMonthlyTotal}
                </span>
                <span className="text-xs text-zinc-400 font-mono">/ month</span>
              </div>
              <p className="text-xs text-zinc-400 mb-6">
                Deterministic multi-agent synthesis with CI/CD gates and team telemetry.
              </p>

              {/* Sliders */}
              <div className="space-y-4 py-4 border-y border-white/10 text-xs font-mono">
                <div>
                  <div className="flex justify-between text-zinc-300 mb-1.5">
                    <span>Team Seats:</span>
                    <span className="text-brand-400 font-bold" id="seats-display">{seats} engineers</span>
                  </div>
                  <input
                    type="range"
                    min="2"
                    max="50"
                    value={seats}
                    onChange={(e) => setSeats(Number(e.target.value))}
                    className="w-full h-1.5 bg-surface-300 rounded-lg appearance-none cursor-pointer accent-brand-500"
                    id="seats-slider"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-zinc-300 mb-1.5">
                    <span>Syntheses Volume:</span>
                    <span className="text-cyanAccent font-bold">{syntheses}k AST runs / mo</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="100"
                    step="5"
                    value={syntheses}
                    onChange={(e) => setSyntheses(Number(e.target.value))}
                    className="w-full h-1.5 bg-surface-300 rounded-lg appearance-none cursor-pointer accent-cyanAccent"
                    id="syntheses-slider"
                  />
                </div>
              </div>

              {/* Features List */}
              <div className="space-y-2.5 pt-4 text-xs text-zinc-300">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Unlimited local CLI &amp; CI/CD pipeline runs</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Sub-10ms shared AST repository cache</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Multi-agent PR automatic review &amp; refactor</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Priority 24/7 engineering SLA</span>
                </div>
              </div>
            </div>

            <button
              className="mt-8 w-full py-3 rounded-lg bg-brand-500 hover:bg-brand-600 text-white text-xs font-semibold shadow-glow flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
              id="tier-team-cta"
            >
              <span>Deploy for Team</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Tier 3: Enterprise Airgap */}
          <div className="glass-card rounded-2xl p-8 flex flex-col justify-between border border-white/10 hover:border-white/20 transition-all">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono uppercase tracking-wider text-zinc-400">Enterprise</span>
                <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-surface-100 text-zinc-300 border border-white/5">
                  Airgap
                </span>
              </div>
              <div className="text-3xl font-bold text-white mb-2">Custom</div>
              <p className="text-xs text-zinc-400 mb-6">
                On-premise deployment inside your VPC / Kubernetes cluster with complete zero-egress guarantee.
              </p>

              <div className="space-y-3 pt-6 border-t border-white/5 text-xs text-zinc-300">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-emerald-400" />
                  <span>Self-hosted on AWS, GCP, or bare metal</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-emerald-400" />
                  <span>Bring-your-own-weights (Fine-tuned models)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-emerald-400" />
                  <span>SOC2 Type II, HIPAA &amp; FedRAMP compliance</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-emerald-400" />
                  <span>Dedicated solutions architect</span>
                </div>
              </div>
            </div>

            <button
              className="mt-8 w-full py-2.5 rounded-lg bg-surface-100 hover:bg-surface-50 text-white text-xs font-medium border border-white/10 transition-colors"
              id="tier-enterprise-btn"
            >
              Contact Enterprise Engineering
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
