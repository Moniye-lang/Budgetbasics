import React, { useState } from 'react';
import { 
  Sliders, 
  RotateCcw, 
  Copy, 
  Check, 
  ShieldCheck, 
  AlertTriangle, 
  Sparkles, 
  TrendingUp, 
  ArrowRight
} from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';

interface ExpensePlannerPageProps {
  onBackToHome?: () => void;
  onNavigateToSavings?: () => void;
  onNavigateToTable?: () => void;
}

export const ExpensePlannerPage: React.FC<ExpensePlannerPageProps> = ({
  onNavigateToSavings,
  onNavigateToTable
}) => {
  const { currentCurrency, formatAmount } = useCurrency();

  // Planner state
  const [income, setIncome] = useState<number>(1400);
  const [needsPct, setNeedsPct] = useState<number>(50);
  const [wantsPct, setWantsPct] = useState<number>(30);
  const [savingsPct, setSavingsPct] = useState<number>(20);
  const [copied, setCopied] = useState<boolean>(false);

  const totalPct = needsPct + wantsPct + savingsPct;
  const isBalanced = totalPct === 100;

  const needsAmount = Math.round((income * needsPct) / 100);
  const wantsAmount = Math.round((income * wantsPct) / 100);
  const savingsAmount = Math.round((income * savingsPct) / 100);

  const dailyFunAllowance = (wantsAmount / 30).toFixed(2);
  const weeklyFunAllowance = (wantsAmount / 4.33).toFixed(0);
  const weeksTo500Cushion = savingsAmount > 0 
    ? Math.max(1, Math.ceil((500 / savingsAmount) * 4.33)) 
    : 0;

  const handleResetDefaults = () => {
    setNeedsPct(50);
    setWantsPct(30);
    setSavingsPct(20);
  };

  const handleCopyPlan = () => {
    const sym = currentCurrency.symbol;
    const summary = `🎓 BudgetBasics Semester Plan (${currentCurrency.code}):
• Total Monthly Allowance: ${sym}${income.toLocaleString()}
• 🟢 Needs (50% target): ${sym}${needsAmount.toLocaleString()}/mo (${needsPct}%)
• 🔴 Wants (30% target): ${sym}${wantsAmount.toLocaleString()}/mo (${wantsPct}%) → ${sym}${dailyFunAllowance}/day (${sym}${weeklyFunAllowance}/wk)
• 🔵 Savings (20% target): ${sym}${savingsAmount.toLocaleString()}/mo (${savingsPct}%) → ${sym}500 emergency buffer in ~${weeksTo500Cushion} weeks
Generated with BudgetBasics Interactive Studio.`;

    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <div className="min-h-screen bg-[#f0f0f0] text-[#1a1919] font-sans antialiased pb-24 relative selection:bg-[#0eb02c]/20 selection:text-[#0eb02c]">
      
      {/* Sub-Header Breadcrumb */}
      <div className="border-b border-[#1a1919]/8 bg-white/70 backdrop-blur-md sticky top-[68px] z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono font-bold uppercase text-[#0eb02c] bg-[#0eb02c]/10 px-2.5 py-1 rounded-lg border border-[#0eb02c]/20 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0eb02c] animate-ping" />
              02 · Practice Studio
            </span>
            <span className="text-xs text-[#1a1919]/60 font-medium">
              / 50/30/20 Studio & Sliders
            </span>
          </div>
          <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#0eb02c] bg-white px-3 py-1.5 rounded-xl border border-[#1a1919]/10 shadow-xs">
            LIVE SIMULATOR
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-12">
        
        {/* 1. Hero Introduction */}
        <section className="bg-white rounded-3xl p-8 sm:p-10 border border-[#1a1919]/10 shadow-sm relative overflow-hidden">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0eb02c]/10 border border-[#0eb02c]/20 text-xs font-mono font-bold text-[#0eb02c]">
              <Sliders className="w-3.5 h-3.5" />
              <span>DYNAMIC CASH FLOW ADJUSTER</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-[#1a1919] leading-tight">
              50/30/20 <span className="text-[#0eb02c]">Studio & Sliders</span>
            </h1>
            <p className="text-sm sm:text-base text-[#1a1919]/75 leading-relaxed font-medium">
              Input your monthly take-home allowance, adjust the three percentage knobs to fit your unique living situation, and get your daily and weekly spending numbers instantly.
            </p>
          </div>
        </section>

        {/* 2. Main Interactive Studio Workspace */}
        <section className="bg-white rounded-3xl p-6 sm:p-10 border border-[#1a1919]/10 shadow-sm space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1a1919]/8 pb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-[#1a1919]">Allowance & Percentage Knobs</h2>
              <p className="text-xs text-[#1a1919]/60 mt-0.5">Drag any slider. The totals update seamlessly in real time.</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleResetDefaults}
                className="px-3 py-2 rounded-xl text-xs font-bold text-[#1a1919]/70 bg-slate-100 hover:bg-slate-200 flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset 50/30/20</span>
              </button>
              <button
                onClick={handleCopyPlan}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-[#0922b0] hover:bg-[#071a8a] text-white flex items-center gap-1.5 transition-all cursor-pointer shadow-xs active:scale-95"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Plan Copied!' : 'Copy Plan'}</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Controls: Sliders */}
            <div className="lg:col-span-6 space-y-6">
              
              {/* Income Slider */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-[#1a1919]/8 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-mono font-bold uppercase text-[#1a1919]/80">Monthly Income / Allowance</label>
                  <span className="text-2xl font-black text-[#0922b0]">{formatAmount(income)}</span>
                </div>
                <input
                  type="range"
                  min="200"
                  max="5000"
                  step="50"
                  value={income}
                  onChange={(e) => setIncome(Number(e.target.value))}
                  className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0922b0]"
                />
                <div className="flex justify-between text-[10px] font-mono text-[#1a1919]/40 font-bold">
                  <span>{formatAmount(200)}</span>
                  <span>{formatAmount(2500)}</span>
                  <span>{formatAmount(5000)}</span>
                </div>
              </div>

              {/* Needs Slider */}
              <div className="p-5 rounded-2xl bg-blue-50/60 border border-[#0922b0]/20 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#0922b0]"></span>
                    <label className="text-xs font-bold text-[#1a1919]">1. Essential Needs</label>
                  </div>
                  <div className="text-right">
                    <span className="text-base font-black text-[#0922b0]">{needsPct}%</span>
                    <span className="text-xs font-bold text-[#1a1919]/60 ml-2">({formatAmount(needsAmount)})</span>
                  </div>
                </div>
                <input
                  type="range"
                  min="20"
                  max="80"
                  value={needsPct}
                  onChange={(e) => setNeedsPct(Number(e.target.value))}
                  className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-[#0922b0]"
                />
                <p className="text-[11px] text-[#1a1919]/60">Rent, groceries, utilities & essential campus transport.</p>
              </div>

              {/* Wants Slider */}
              <div className="p-5 rounded-2xl bg-emerald-50/60 border border-[#0eb02c]/20 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#0eb02c]"></span>
                    <label className="text-xs font-bold text-[#1a1919]">2. Flexible Wants</label>
                  </div>
                  <div className="text-right">
                    <span className="text-base font-black text-[#0eb02c]">{wantsPct}%</span>
                    <span className="text-xs font-bold text-[#1a1919]/60 ml-2">({formatAmount(wantsAmount)})</span>
                  </div>
                </div>
                <input
                  type="range"
                  min="10"
                  max="60"
                  value={wantsPct}
                  onChange={(e) => setWantsPct(Number(e.target.value))}
                  className="w-full h-2 bg-emerald-200 rounded-lg appearance-none cursor-pointer accent-[#0eb02c]"
                />
                <p className="text-[11px] text-[#1a1919]/60">Dining out, streaming, campus lifestyle & fun.</p>
              </div>

              {/* Savings Slider */}
              <div className="p-5 rounded-2xl bg-red-50/60 border border-[#d12828]/20 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#d12828]"></span>
                    <label className="text-xs font-bold text-[#1a1919]">3. Emergency Savings</label>
                  </div>
                  <div className="text-right">
                    <span className="text-base font-black text-[#d12828]">{savingsPct}%</span>
                    <span className="text-xs font-bold text-[#1a1919]/60 ml-2">({formatAmount(savingsAmount)})</span>
                  </div>
                </div>
                <input
                  type="range"
                  min="0"
                  max="50"
                  value={savingsPct}
                  onChange={(e) => setSavingsPct(Number(e.target.value))}
                  className="w-full h-2 bg-red-200 rounded-lg appearance-none cursor-pointer accent-[#d12828]"
                />
                <p className="text-[11px] text-[#1a1919]/60">Buffer cushion, gadget replacements & future emergency fund.</p>
              </div>

              {/* Ratio Balance Alert */}
              <div className={`p-4 rounded-2xl border flex items-center justify-between text-xs font-bold transition-all ${
                isBalanced 
                  ? 'bg-emerald-50 text-[#0eb02c] border-[#0eb02c]/30' 
                  : 'bg-amber-50 text-amber-700 border-amber-300'
              }`}>
                <div className="flex items-center gap-2">
                  {isBalanced ? <ShieldCheck className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
                  <span>{isBalanced ? 'Formula Perfectly Balanced (100%)' : `Total is ${totalPct}% (Must equal 100%)`}</span>
                </div>
                {!isBalanced && (
                  <button
                    onClick={handleResetDefaults}
                    className="underline text-xs cursor-pointer"
                  >
                    Auto-balance
                  </button>
                )}
              </div>

            </div>

            {/* Right Live Insights & Daily Breakdown */}
            <div className="lg:col-span-6 space-y-6">
              
              {/* Daily & Weekly Fun Allowance Card */}
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-3xl p-7 shadow-xl space-y-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-mono uppercase tracking-wider text-white/80">Discretionary Fun Meter</span>
                  </div>
                  <span className="text-[11px] font-mono font-bold px-2 py-0.5 bg-white/10 rounded text-emerald-400">
                    Guilt-Free
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                    <div className="text-[11px] font-mono text-white/60">Daily Spending Limit</div>
                    <div className="text-2xl sm:text-3xl font-black text-emerald-400 mt-1">
                      {currentCurrency.symbol}{dailyFunAllowance}
                    </div>
                    <div className="text-[10px] text-white/50 mt-1">Per day for snacks, coffee & fun</div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                    <div className="text-[11px] font-mono text-white/60">Weekly Fun Budget</div>
                    <div className="text-2xl sm:text-3xl font-black text-white mt-1">
                      {currentCurrency.symbol}{weeklyFunAllowance}
                    </div>
                    <div className="text-[10px] text-white/50 mt-1">Safe weekend dining & outings</div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs text-white/80 space-y-2">
                  <div className="font-bold text-white flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-[#0922b0]" />
                    Emergency Buffer Velocity:
                  </div>
                  <p className="text-xs text-white/70 leading-relaxed">
                    At your current monthly savings of <span className="text-white font-bold">{formatAmount(savingsAmount)}/mo</span>, you will hit your first <span className="text-emerald-400 font-bold">$500 emergency buffer</span> in approximately <span className="text-white font-bold">{weeksTo500Cushion} weeks</span>.
                  </p>
                </div>
              </div>

              {/* Quick Navigation Cards to Other Practice Tools */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div 
                  onClick={() => {
                    if (onNavigateToSavings) onNavigateToSavings();
                    else window.location.hash = '#savings-goals';
                  }}
                  className="p-5 rounded-2xl bg-white border border-[#1a1919]/10 shadow-xs hover:border-[#0eb02c]/50 transition-all cursor-pointer space-y-2 group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-[#0eb02c]">MODULE 02</span>
                    <ArrowRight className="w-4 h-4 text-[#1a1919]/30 group-hover:text-[#0eb02c] group-hover:translate-x-1 transition-all" />
                  </div>
                  <h4 className="text-sm font-bold text-[#1a1919]">Savings Goals Studio</h4>
                  <p className="text-xs text-[#1a1919]/60">Track your $500 cushion countdown & milestone timelines.</p>
                </div>

                <div 
                  onClick={() => {
                    if (onNavigateToTable) onNavigateToTable();
                    else window.location.hash = '#expense-table';
                  }}
                  className="p-5 rounded-2xl bg-white border border-[#1a1919]/10 shadow-xs hover:border-[#0922b0]/50 transition-all cursor-pointer space-y-2 group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-[#0922b0]">MODULE 03</span>
                    <ArrowRight className="w-4 h-4 text-[#1a1919]/30 group-hover:text-[#0922b0] group-hover:translate-x-1 transition-all" />
                  </div>
                  <h4 className="text-sm font-bold text-[#1a1919]">Live Expense Table</h4>
                  <p className="text-xs text-[#1a1919]/60">Log specific expenses item by item and compare to budget limit.</p>
                </div>
              </div>

            </div>

          </div>
        </section>

      </main>
    </div>
  );
};
