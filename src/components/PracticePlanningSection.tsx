import React, { useState, useId } from 'react';
import { 
  DollarSign, 
  Check, 
  Copy, 
  RotateCcw,
  ShieldCheck,
  Coffee,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { DotLottiePlayer } from './DotLottiePlayer';
import { practiceHandsLottieJson } from '../data/practiceLottie';

export const PracticePlanningSection: React.FC = () => {
  const needsInputId = useId();
  const wantsInputId = useId();
  const savingsInputId = useId();
  const incomeInputId = useId();

  const [income, setIncome] = useState<number>(1400);
  const [needsPct, setNeedsPct] = useState<number>(50);
  const [wantsPct, setWantsPct] = useState<number>(30);
  const [savingsPct, setSavingsPct] = useState<number>(20);
  const [copied, setCopied] = useState<boolean>(false);

  const totalPct = needsPct + wantsPct + savingsPct;
  const isBalanced = totalPct === 100;

  // Monthly breakdown amounts
  const needsAmount = Math.round((income * needsPct) / 100);
  const wantsAmount = Math.round((income * wantsPct) / 100);
  const savingsAmount = Math.round((income * savingsPct) / 100);

  // Derived key metrics
  const dailyFunAllowance = (wantsAmount / 30).toFixed(2);
  const weeklyFunAllowance = (wantsAmount / 4.33).toFixed(0);
  const weeksTo500Cushion = savingsAmount > 0 
    ? Math.max(1, Math.ceil((500 / savingsAmount) * 4.33)) 
    : 0;

  const quickIncomes = [
    { label: 'Campus Job', amount: 950 },
    { label: 'Aid + Part-Time', amount: 1400 },
    { label: 'Shared Apartment', amount: 1850 },
    { label: 'Stipend / Intern', amount: 3200 }
  ];

  const handleCopyPlan = () => {
    const summary = `🎓 BudgetBasics Semester Plan:
• Total Monthly Income: $${income.toLocaleString()}
• 🟢 Needs (50% target): $${needsAmount}/mo (${needsPct}%)
• 🔴 Wants (30% target): $${wantsAmount}/mo (${wantsPct}%) → $${dailyFunAllowance}/day ($${weeklyFunAllowance}/wk)
• 🔵 Savings (20% target): $${savingsAmount}/mo (${savingsPct}%) → $500 cushion in ~${weeksTo500Cushion} weeks
Created with BudgetBasics Interactive Studio.`;

    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const resetToGoldenRatio = () => {
    setNeedsPct(50);
    setWantsPct(30);
    setSavingsPct(20);
  };

  return (
    <section 
      id="practice" 
      className="py-12 md:py-16 min-h-[92dvh] lg:min-h-screen flex flex-col justify-center bg-[#f0f0f0] text-[#1a1919] relative overflow-hidden font-sans border-t border-[#1a1919]/10"
    >
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/4 -left-40 w-96 h-96 bg-[#0eb02c]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-[#0922b0]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* ========================================================================= */}
        {/* 1. COMPACT TOP HEADER & SCENARIO SELECTOR */}
        {/* ========================================================================= */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            {/* Eyebrow Pill with Animated Practice Hands */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#0eb02c]/10 border border-[#0eb02c]/30 text-xs font-bold text-[#0eb02c] shadow-xs mb-3">
              <div className="w-5 h-5 flex items-center justify-center shrink-0">
                <DotLottiePlayer
                  animationData={practiceHandsLottieJson}
                  src="/practice-hands-lottie.json"
                  className="w-full h-full object-contain"
                />
              </div>
              <span>02 · PRACTICE PLANNING</span>
            </div>

            <h2 className="text-3xl sm:text-4xl xl:text-5xl font-black tracking-tight text-[#1a1919] leading-[1.06]">
              Interactive Planning Studio. <br />
              <span className="font-serif italic font-normal text-3xl sm:text-4xl xl:text-5xl text-[#0eb02c]">
                Live <span className="text-[#1a1919] font-semibold">50</span>/<span className="text-[#d12828] font-semibold">30</span>/<span className="text-[#0eb02c] font-semibold">20</span> cash flow architecture.
              </span>
            </h2>
          </div>

          {/* Quick Scenario Preset Buttons */}
          <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#1a1919]/60 mr-1 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#0922b0]" />
              <span>Presets:</span>
            </span>
            {quickIncomes.map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  setIncome(item.amount);
                  resetToGoldenRatio();
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                  income === item.amount && isBalanced
                    ? 'bg-white border-[#0eb02c] text-[#0eb02c] shadow-xs ring-1 ring-[#0eb02c]/30'
                    : 'bg-white/60 hover:bg-white text-[#1a1919]/75 border-[#1a1919]/10'
                }`}
              >
                <span>{item.label}</span>
                <span className="font-mono text-[10px] opacity-75 ml-1">(${item.amount})</span>
              </button>
            ))}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. THE MASTER CASH INFLOW BAR */}
        {/* ========================================================================= */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#1a1919]/15 shadow-sm mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          <div className="flex items-center gap-4 shrink-0">
            <div className="w-10 h-10 rounded-xl bg-[#0922b0]/10 flex items-center justify-center text-[#0922b0]">
              <DollarSign className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#0922b0]/10 text-[#0922b0] border border-[#0922b0]/20">
                  EXPENSE PLANNER
                </span>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#1a1919]/60 block">
                  Monthly Take-Home Cash Flow
                </span>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-[#0922b0] tracking-tight">
                ${income.toLocaleString()}
                <span className="text-xs font-normal text-[#1a1919]/50 ml-1.5 font-sans">/ month</span>
              </div>
            </div>
          </div>

          <div className="flex-1 max-w-xl px-2">
            <label htmlFor={incomeInputId} className="sr-only">Monthly Take-Home Inflow</label>
            <input
              id={incomeInputId}
              type="range"
              min="400"
              max="4500"
              step="50"
              value={income}
              onChange={(e) => setIncome(Number(e.target.value))}
              className="w-full h-2 bg-[#f0f0f0] rounded-lg appearance-none cursor-pointer accent-[#0922b0]"
            />
            <div className="flex justify-between text-[10px] font-mono text-[#1a1919]/50 mt-1">
              <span>$400 Min</span>
              <span>$2,000 Avg</span>
              <span>$4,500 Max</span>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end md:self-auto shrink-0">
            <button
              onClick={resetToGoldenRatio}
              className="px-3.5 py-1.5 rounded-xl bg-[#f0f0f0] hover:bg-[#e4e4e4] text-[#1a1919] text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#0922b0]" />
              <span>Reset 50/30/20</span>
            </button>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* 3. THE 3-PILLAR BUCKET ARCHITECTURE MONOLITHS */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
          
          {/* Pillar 1: Needs (50%) */}
          <div className="bg-white rounded-3xl p-6 border border-[#1a1919]/15 shadow-md flex flex-col justify-between relative group hover:border-[#1a1919]/30 transition-all">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-[#1a1919]/5 text-[#1a1919] border border-[#1a1919]/10">
                  BUCKET 01 · NEEDS
                </span>
                <span className="text-xl font-black text-[#1a1919] font-mono">
                  {needsPct}%
                </span>
              </div>

              <div>
                <div className="text-3xl sm:text-4xl font-black text-[#1a1919] tracking-tight font-mono">
                  ${needsAmount}
                  <span className="text-xs font-normal text-[#1a1919]/50 font-sans ml-1">/ mo</span>
                </div>
                <p className="text-xs text-[#1a1919]/70 font-medium mt-1">
                  Fixed non-negotiable living floor.
                </p>
              </div>

              {/* Slider */}
              <div className="space-y-1 pt-2">
                <label htmlFor={needsInputId} className="sr-only">Essential Needs Percentage</label>
                <input
                  id={needsInputId}
                  type="range"
                  min="20"
                  max="75"
                  value={needsPct}
                  onChange={(e) => setNeedsPct(Number(e.target.value))}
                  className="w-full h-2 bg-[#f0f0f0] rounded-lg appearance-none cursor-pointer accent-[#1a1919]"
                />
              </div>

              {/* Checklist items */}
              <div className="space-y-1.5 pt-2 border-t border-[#1a1919]/10 text-xs text-[#1a1919]/80 font-medium">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1a1919]" />
                  <span>Dorm or apartment rent</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1a1919]" />
                  <span>Groceries & meal plans</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1a1919]" />
                  <span>Tuition minimums & transit</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#1a1919]/10 flex items-center justify-between text-[11px] font-mono text-[#1a1919]/60">
              <span>Weekly Cap:</span>
              <span className="font-bold text-[#1a1919]">${(needsAmount / 4.33).toFixed(0)}/wk</span>
            </div>
          </div>

          {/* Pillar 2: Wants (30%) */}
          <div className="bg-white rounded-3xl p-6 border border-[#d12828]/25 shadow-md flex flex-col justify-between relative group hover:border-[#d12828]/50 transition-all">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-[#d12828]/10 text-[#d12828] border border-[#d12828]/20">
                  BUCKET 02 · WANTS
                </span>
                <span className="text-xl font-black text-[#d12828] font-mono">
                  {wantsPct}%
                </span>
              </div>

              <div>
                <div className="text-3xl sm:text-4xl font-black text-[#d12828] tracking-tight font-mono">
                  ${wantsAmount}
                  <span className="text-xs font-normal text-[#1a1919]/50 font-sans ml-1">/ mo</span>
                </div>
                <p className="text-xs text-[#1a1919]/70 font-medium mt-1">
                  Guilt-free dining, social & streaming.
                </p>
              </div>

              {/* Slider */}
              <div className="space-y-1 pt-2">
                <label htmlFor={wantsInputId} className="sr-only">Wants Percentage</label>
                <input
                  id={wantsInputId}
                  type="range"
                  min="5"
                  max="50"
                  value={wantsPct}
                  onChange={(e) => setWantsPct(Number(e.target.value))}
                  className="w-full h-2 bg-[#f0f0f0] rounded-lg appearance-none cursor-pointer accent-[#d12828]"
                />
              </div>

              {/* Live Daily Allowance Feature Box */}
              <div className="p-3 rounded-2xl bg-[#d12828]/5 border border-[#d12828]/15 space-y-1">
                <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#d12828] flex items-center gap-1.5">
                  <Coffee className="w-3.5 h-3.5" />
                  <span>Daily Fun Money Allowance</span>
                </div>
                <div className="text-xl font-black text-[#d12828]">
                  ${dailyFunAllowance}
                  <span className="text-xs font-normal text-[#1a1919]/60 ml-1">/ day</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#1a1919]/10 flex items-center justify-between text-[11px] font-mono text-[#1a1919]/60">
              <span>Weekend Fund:</span>
              <span className="font-bold text-[#d12828]">${(wantsAmount / 4.33).toFixed(0)}/wk</span>
            </div>
          </div>

          {/* Pillar 3: Savings (20%) */}
          <div className="bg-white rounded-3xl p-6 border border-[#0eb02c]/25 shadow-md flex flex-col justify-between relative group hover:border-[#0eb02c]/50 transition-all">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-[#0eb02c]/10 text-[#0eb02c] border border-[#0eb02c]/20">
                  BUCKET 03 · SAVINGS
                </span>
                <span className="text-xl font-black text-[#0eb02c] font-mono">
                  {savingsPct}%
                </span>
              </div>

              <div>
                <div className="text-3xl sm:text-4xl font-black text-[#0eb02c] tracking-tight font-mono">
                  ${savingsAmount}
                  <span className="text-xs font-normal text-[#1a1919]/50 font-sans ml-1">/ mo</span>
                </div>
                <p className="text-xs text-[#1a1919]/70 font-medium mt-1">
                  Defensive moat & overdraft shield.
                </p>
              </div>

              {/* Slider */}
              <div className="space-y-1 pt-2">
                <label htmlFor={savingsInputId} className="sr-only">Savings Percentage</label>
                <input
                  id={savingsInputId}
                  type="range"
                  min="5"
                  max="50"
                  value={savingsPct}
                  onChange={(e) => setSavingsPct(Number(e.target.value))}
                  className="w-full h-2 bg-[#f0f0f0] rounded-lg appearance-none cursor-pointer accent-[#0eb02c]"
                />
              </div>

              {/* $500 Buffer Velocity Box (Savings Goals) */}
              <div className="p-3 rounded-2xl bg-[#0eb02c]/5 border border-[#0eb02c]/15 space-y-1">
                <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#0eb02c] flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>SAVINGS GOALS · $500 Target</span>
                  </span>
                </div>
                <div className="text-xl font-black text-[#0eb02c]">
                  {savingsAmount > 0 ? `~${weeksTo500Cushion} Weeks` : 'Paused'}
                  <span className="text-xs font-normal text-[#1a1919]/60 ml-1">to complete</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#1a1919]/10 flex items-center justify-between text-[11px] font-mono text-[#1a1919]/60">
              <span>Annual Cushion:</span>
              <span className="font-bold text-[#0eb02c]">${savingsAmount * 12}/yr</span>
            </div>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* 4. MASTER CONTROL COCKPIT FOOTER BAR (MONEY MISTAKES DIAGNOSTIC) */}
        {/* ========================================================================= */}
        <div className="bg-[#1a1919] text-white rounded-2xl p-4 sm:p-5 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full ${isBalanced ? 'bg-[#0eb02c] animate-pulse' : 'bg-[#d12828]'}`} />
            <div className="text-xs">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-white/10 text-[#0eb02c] border border-white/15 mr-2">
                MONEY MISTAKES CHECK
              </span>
              <span className="font-mono font-bold text-white/90">
                RATIO: {needsPct}/{wantsPct}/{savingsPct} ({totalPct}%)
              </span>
              <span className="text-white/60 ml-2 hidden sm:inline">
                {isBalanced ? '· 0% Deficit · Overdraft Risk Shielded' : '· Sliders must total 100%'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button
              onClick={handleCopyPlan}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#0eb02c] hover:bg-[#0c9626] text-white text-xs font-bold tracking-wide flex items-center justify-center gap-2 shadow-md transition-all active:scale-95 cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>PLAN COPIED!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>COPY SEMESTER BLUEPRINT</span>
                </>
              )}
            </button>

            <a
              href="#resources"
              className="hidden lg:inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold transition-colors"
            >
              <span>Toolkits</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>

      </div>
    </section>
  );
};
