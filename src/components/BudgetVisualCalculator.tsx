import React, { useState } from 'react';
import { 
  DollarSign, 
  Sparkles, 
  Check, 
  Coffee, 
  Home, 
  PiggyBank, 
  ShieldCheck
} from 'lucide-react';

export const BudgetVisualCalculator: React.FC = () => {
  const [monthlyIncome, setMonthlyIncome] = useState<number>(1600);
  const [copied, setCopied] = useState(false);

  // 50/30/20 Calculations
  const needs = Math.round(monthlyIncome * 0.5);
  const wants = Math.round(monthlyIncome * 0.3);
  const savings = Math.round(monthlyIncome * 0.2);

  // Daily allowance estimates
  const dailyWants = Math.round((wants / 30) * 10) / 10;
  const yearlySavings = savings * 12;

  const presets = [
    { label: 'Campus Work-Study', amount: 900 },
    { label: 'Part-Time Student', amount: 1600 },
    { label: 'Summer Intern', amount: 2800 },
    { label: 'New Graduate', amount: 4200 },
  ];

  const handleCopyPlan = () => {
    const text = `SmartBudget Blueprint ($${monthlyIncome}/mo):\n- 50% Needs: $${needs}/mo (Rent, Utilities, Groceries, Tuition)\n- 30% Wants: $${wants}/mo (~$${dailyWants}/day for Coffee, Social & Hobbies)\n- 20% Savings: $${savings}/mo ($${yearlySavings.toLocaleString()}/yr Future Growth)`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="calculator" className="py-20 md:py-28 bg-[#f0f0f0] text-[#1a1919] relative overflow-hidden font-sans border-t border-[#1a1919]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0922b0]/10 border border-[#0922b0]/30 text-xs font-semibold text-[#0922b0] shadow-xs mb-4">
            <span className="w-2 h-2 rounded-full bg-[#0922b0] animate-pulse" />
            <span>INTERACTIVE TOOL · REAL-TIME BREAKDOWN</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-[#1a1919] leading-[1.12] mb-4">
            See Your Numbers in{' '}
            <span className="bg-gradient-to-r from-[#0922b0] via-[#0eb02c] to-[#0922b0] bg-clip-text text-transparent">
              3 Clear Buckets
            </span>
          </h2>

          <p className="text-base sm:text-lg text-[#1a1919]/80 font-medium leading-relaxed">
            Drag the slider or choose a student profile below. Instant clarity on rent limits, guilt-free weekend cash, and your annual emergency cushion.
          </p>
        </div>

        {/* Calculator Main Studio Card */}
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 sm:p-10 border border-[#1a1919]/10 shadow-xl max-w-5xl mx-auto">
          {/* Top Controls: Preset Badges & Income Slider */}
          <div className="space-y-6 pb-8 border-b border-[#1a1919]/10">
            {/* Quick Profile Presets */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#1a1919]/60">
                Quick Student Scenarios:
              </span>
              <div className="flex flex-wrap items-center gap-2">
                {presets.map((p) => (
                  <button
                    key={p.label}
                    onClick={() => setMonthlyIncome(p.amount)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      monthlyIncome === p.amount
                        ? 'bg-[#0922b0] text-white shadow-xs scale-105'
                        : 'bg-[#f0f0f0] hover:bg-[#e4e4e4] text-[#1a1919]/80'
                    }`}
                  >
                    {p.label} (${p.amount})
                  </button>
                ))}
              </div>
            </div>

            {/* Income Display & Slider */}
            <div className="bg-[#f0f0f0]/80 rounded-2xl p-6 border border-[#1a1919]/10">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <div>
                  <label className="text-xs font-mono font-bold uppercase tracking-wider text-[#1a1919]/60">
                    Estimated Monthly Income / Allowance
                  </label>
                  <p className="text-xs text-[#1a1919]/60">Includes jobs, scholarships, stipends, or family support</p>
                </div>
                <div className="flex items-center gap-1.5 bg-white px-4 py-2 rounded-xl border border-[#1a1919]/15 shadow-inner">
                  <DollarSign className="w-5 h-5 text-[#0922b0]" />
                  <input
                    type="number"
                    min={400}
                    max={10000}
                    step={50}
                    value={monthlyIncome}
                    onChange={(e) => setMonthlyIncome(Number(e.target.value) || 0)}
                    className="text-2xl sm:text-3xl font-black text-[#1a1919] w-28 focus:outline-none bg-transparent"
                  />
                  <span className="text-xs font-mono font-bold text-[#1a1919]/50">/mo</span>
                </div>
              </div>

              {/* Range Slider */}
              <input
                type="range"
                min={400}
                max={6000}
                step={50}
                value={monthlyIncome}
                onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                className="w-full h-2.5 bg-white rounded-lg appearance-none cursor-pointer accent-[#0922b0] border border-[#1a1919]/10"
              />
              <div className="flex justify-between text-[10px] font-mono text-[#1a1919]/50 mt-2 font-bold">
                <span>$400/mo</span>
                <span>$3,000/mo</span>
                <span>$6,000/mo</span>
              </div>
            </div>
          </div>

          {/* 3 Calculated Buckets (50% / 30% / 20%) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8">
            {/* 1. Needs (50%) */}
            <div className="p-6 rounded-2xl bg-[#f0f0f0]/60 border border-[#1a1919]/10 relative overflow-hidden flex flex-col justify-between">
              <div className="absolute top-0 left-0 right-0 h-1 bg-[#1a1919]" />
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-[#1a1919] text-white flex items-center justify-center">
                      <Home className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#1a1919]">
                      50% Needs
                    </span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#1a1919]/10 text-[#1a1919] font-bold">
                    Essential
                  </span>
                </div>

                <div className="text-3xl font-black text-[#1a1919] mb-1">
                  ${needs.toLocaleString()}
                  <span className="text-xs font-normal text-[#1a1919]/60"> /mo</span>
                </div>
                <p className="text-xs text-[#1a1919]/70 font-medium mb-4">
                  Rent, shared utilities, groceries, transit pass, phone & health essentials.
                </p>

                <div className="space-y-2 text-xs font-medium text-[#1a1919]/80 pt-3 border-t border-[#1a1919]/10">
                  <div className="flex justify-between">
                    <span>Rent + Utilities Target:</span>
                    <span className="font-bold text-[#1a1919]">${Math.round(needs * 0.7)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Groceries & Transit:</span>
                    <span className="font-bold text-[#1a1919]">${Math.round(needs * 0.3)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Wants (30%) */}
            <div className="p-6 rounded-2xl bg-[#d12828]/5 border border-[#d12828]/25 relative overflow-hidden flex flex-col justify-between">
              <div className="absolute top-0 left-0 right-0 h-1 bg-[#d12828]" />
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-[#d12828] text-white flex items-center justify-center">
                      <Coffee className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#d12828]">
                      30% Wants
                    </span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#d12828]/10 text-[#d12828] font-bold">
                    Guilt-Free
                  </span>
                </div>

                <div className="text-3xl font-black text-[#d12828] mb-1">
                  ${wants.toLocaleString()}
                  <span className="text-xs font-normal text-[#d12828]/70"> /mo</span>
                </div>
                <p className="text-xs text-[#1a1919]/70 font-medium mb-4">
                  Dining out, Spotify, concerts, weekend road trips, campus events & shopping.
                </p>

                <div className="space-y-2 text-xs font-medium text-[#1a1919]/80 pt-3 border-t border-[#d12828]/15">
                  <div className="flex justify-between">
                    <span>Daily Fun Allowance:</span>
                    <span className="font-bold text-[#d12828]">~${dailyWants}/day</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Weekend Buffer:</span>
                    <span className="font-bold text-[#d12828]">${Math.round(wants * 0.4)}/wknd</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Savings & Future (20%) */}
            <div className="p-6 rounded-2xl bg-[#0eb02c]/10 border border-[#0eb02c]/30 relative overflow-hidden flex flex-col justify-between">
              <div className="absolute top-0 left-0 right-0 h-1 bg-[#0eb02c]" />
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-[#0eb02c] text-white flex items-center justify-center">
                      <PiggyBank className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#0eb02c]">
                      20% Savings
                    </span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0eb02c]/20 text-[#0eb02c] font-bold">
                    Growth
                  </span>
                </div>

                <div className="text-3xl font-black text-[#0eb02c] mb-1">
                  ${savings.toLocaleString()}
                  <span className="text-xs font-normal text-[#0eb02c]/70"> /mo</span>
                </div>
                <p className="text-xs text-[#1a1919]/70 font-medium mb-4">
                  Emergency cushion, travel fund, textbook buffer, student loan prepayment.
                </p>

                <div className="space-y-2 text-xs font-medium text-[#1a1919]/80 pt-3 border-t border-[#0eb02c]/20">
                  <div className="flex justify-between">
                    <span>1-Year Cash Growth:</span>
                    <span className="font-bold text-[#0eb02c]">+${yearlySavings.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>$500 Emergency Goal:</span>
                    <span className="font-bold text-[#0eb02c]">
                      {Math.ceil(500 / (savings || 1))} months
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Bar: Copy / Export Plan */}
          <div className="pt-6 border-t border-[#1a1919]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-[#1a1919]/70 font-medium">
              <ShieldCheck className="w-4 h-4 text-[#0eb02c]" />
              <span>Calculated with zero tracking or stored personal information.</span>
            </div>

            <button
              onClick={handleCopyPlan}
              className="px-6 py-3 rounded-xl bg-[#0922b0] hover:bg-[#071a8a] text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-[#0922b0]/25 transition-all active:scale-95"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-300" />
                  <span>Budget Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Copy Monthly Budget Plan</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
