import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { 
  Sparkles, 
  Target, 
  AlertTriangle, 
  CheckCircle2, 
  Sliders, 
  ArrowRight, 
  RotateCcw, 
  TrendingUp, 
  ShieldAlert, 
  CreditCard, 
  Coffee, 
  Zap, 
  Clock,
  DollarSign
} from "lucide-react";
import { SubpageHeader } from "./components/SubpageHeader";
import { Footer } from "./components/Footer";
import "./SavingsGoals.css";

const mistakesList = [
  {
    icon: Coffee,
    color: "text-[#d12828] bg-[#d12828]/10 border-[#d12828]/20",
    title: "Impulse Buying & Food Runs",
    scenario: "Spontaneous snacks and unplanned weekend deliveries easily drain $150+ in untracked funds.",
    fix: "Implement the 24-Hour Rule: Wait 24 hours before any non-essential purchase over $25."
  },
  {
    icon: CreditCard,
    color: "text-[#0922b0] bg-[#0922b0]/10 border-[#0922b0]/20",
    title: "Unused Subscriptions Leak",
    scenario: "Streaming trials, gaming passes, and gym memberships charge quietly in the background.",
    fix: "Perform a monthly 15-minute subscription audit. Cancel anything unused in the last 30 days."
  },
  {
    icon: Clock,
    color: "text-amber-600 bg-amber-500/10 border-amber-500/20",
    title: "Late Payment Penalties",
    scenario: "Forgetting phone or utility due dates costs more in reconnect fees than the bill itself.",
    fix: "Set calendar alerts 3 days ahead of due dates and keep a dedicated $50 bill buffer."
  },
  {
    icon: Zap,
    color: "text-purple-600 bg-purple-500/10 border-purple-500/20",
    title: "Zero Emergency Cushion",
    scenario: "A flat bike tire, broken laptop charger, or urgent clinic copay forces panic borrowing.",
    fix: "Lock in a starter $500 safety cushion in a separate high-yield student account."
  },
  {
    icon: Sliders,
    color: "text-[#0eb02c] bg-[#0eb02c]/10 border-[#0eb02c]/20",
    title: "Spending Without Categorization",
    scenario: "Treating money as one big pool leads to feast the first week and famine by month's end.",
    fix: "Give every dollar a designated bucket: 50% Needs, 30% Wants, 20% Cushion."
  }
];

export default function SavingsGoals() {
  const [currency, setCurrency] = useState("$");
  const [income, setIncome] = useState(800);
  const [targetGoal, setTargetGoal] = useState(500);
  const [monthlySaved, setMonthlySaved] = useState(160);

  const monthsToTarget = useMemo(() => {
    if (monthlySaved <= 0) return 99;
    return Math.ceil(targetGoal / monthlySaved);
  }, [targetGoal, monthlySaved]);

  const recommendedSavings = Math.round(income * 0.2);

  return (
    <div className="min-h-screen bg-[#f0f0f0] text-[#1a1919] flex flex-col font-sans paper-texture selection:bg-[#0922b0]/20 selection:text-[#0922b0]">
      {/* 1. Header */}
      <SubpageHeader badgeText="Savings & Studio" />

      {/* 2. Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full space-y-16">
        
        {/* Hero Section */}
        <section className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 sm:p-12 lg:p-16 border border-[#1a1919]/10 shadow-xl relative overflow-hidden">
          <div className="max-w-3xl space-y-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0eb02c]/10 border border-[#0eb02c]/20 text-xs font-bold text-[#0eb02c] shadow-xs">
              <Target className="w-3.5 h-3.5 text-[#0eb02c]" />
              <span>SAVINGS GOAL SIMULATOR</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#1a1919] leading-[1.08]">
              Build your $500 safety cushion, <br />
              <span className="font-serif italic font-normal text-3xl sm:text-5xl text-[#0922b0]">
                one semester week at a time.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[#1a1919]/80 font-medium leading-relaxed">
              Having a starter $500 emergency buffer protects 87% of student budgets from unexpected fees, late fines, or panic debt. Use this live calculator to see your exact timeline.
            </p>

            {/* Currency Selector */}
            <div className="flex items-center gap-2 pt-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#1a1919]/60">
                Currency:
              </span>
              {["$", "₦", "€", "£"].map((curr) => (
                <button
                  key={curr}
                  onClick={() => setCurrency(curr)}
                  className={`w-8 h-8 rounded-lg text-xs font-mono font-bold flex items-center justify-center transition-all cursor-pointer ${
                    currency === curr
                      ? "bg-[#1a1919] text-white shadow-xs"
                      : "bg-[#f0f0f0] text-[#1a1919]/70 hover:bg-white border border-[#1a1919]/10"
                  }`}
                >
                  {curr}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Interactive Savings Calculator */}
        <section className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 sm:p-12 border border-[#1a1919]/10 shadow-xl space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Controls Left */}
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-1">
                <h3 className="text-2xl font-black text-[#1a1919] tracking-tight">Set Your Target & Monthly Stash</h3>
                <p className="text-xs sm:text-sm text-[#1a1919]/70">Adjust the sliders to simulate your completion velocity.</p>
              </div>

              {/* Slider 1: Target Goal */}
              <div className="space-y-2 p-4 rounded-2xl bg-[#f0f0f0]/90 border border-[#1a1919]/10">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-[#1a1919] flex items-center gap-1.5">
                    <Target className="w-3.5 h-3.5 text-[#0eb02c]" />
                    <span>Target Emergency Cushion</span>
                  </label>
                  <span className="font-mono font-bold text-sm text-[#0eb02c] bg-white px-2.5 py-0.5 rounded-lg border border-[#0eb02c]/20">
                    {currency}{targetGoal}
                  </span>
                </div>
                <input
                  type="range"
                  min={100}
                  max={2000}
                  step={50}
                  value={targetGoal}
                  onChange={(e) => setTargetGoal(Number(e.target.value))}
                  className="w-full h-2 bg-white rounded-lg appearance-none cursor-pointer accent-[#0eb02c]"
                />
                <div className="flex justify-between text-[10px] font-mono text-[#1a1919]/50">
                  <span>{currency}100</span>
                  <span>{currency}500 (Starter)</span>
                  <span>{currency}2,000</span>
                </div>
              </div>

              {/* Slider 2: Monthly Income */}
              <div className="space-y-2 p-4 rounded-2xl bg-[#f0f0f0]/90 border border-[#1a1919]/10">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-[#1a1919] flex items-center gap-1.5">
                    <DollarSign className="w-3.5 h-3.5 text-[#0922b0]" />
                    <span>Monthly Income / Allowance</span>
                  </label>
                  <span className="font-mono font-bold text-sm text-[#0922b0] bg-white px-2.5 py-0.5 rounded-lg border border-[#0922b0]/20">
                    {currency}{income}/mo
                  </span>
                </div>
                <input
                  type="range"
                  min={200}
                  max={3000}
                  step={50}
                  value={income}
                  onChange={(e) => {
                    const newInc = Number(e.target.value);
                    setIncome(newInc);
                    setMonthlySaved(Math.round(newInc * 0.2));
                  }}
                  className="w-full h-2 bg-white rounded-lg appearance-none cursor-pointer accent-[#0922b0]"
                />
                <div className="flex justify-between text-[10px] font-mono text-[#1a1919]/50">
                  <span>{currency}200</span>
                  <span>{currency}800</span>
                  <span>{currency}3,000</span>
                </div>
              </div>

              {/* Slider 3: Monthly Allocation to Savings */}
              <div className="space-y-2 p-4 rounded-2xl bg-[#f0f0f0]/90 border border-[#1a1919]/10">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-[#1a1919] flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5 text-[#0eb02c]" />
                    <span>Monthly Stash (20% Recommended: {currency}{recommendedSavings})</span>
                  </label>
                  <span className="font-mono font-bold text-sm text-[#0eb02c] bg-white px-2.5 py-0.5 rounded-lg border border-[#0eb02c]/20">
                    {currency}{monthlySaved}/mo
                  </span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={Math.max(income * 0.5, 100)}
                  step={10}
                  value={monthlySaved}
                  onChange={(e) => setMonthlySaved(Number(e.target.value))}
                  className="w-full h-2 bg-white rounded-lg appearance-none cursor-pointer accent-[#0eb02c]"
                />
              </div>
            </div>

            {/* Diagnostic Results Card Right */}
            <div className="lg:col-span-6 bg-gradient-to-br from-[#0922b0]/5 via-white to-[#0eb02c]/5 rounded-3xl p-8 border border-[#0922b0]/15 shadow-inner space-y-6 text-center sm:text-left">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider font-bold text-[#0922b0]">
                    Projected Velocity
                  </span>
                  <h4 className="text-3xl sm:text-4xl font-black text-[#1a1919] tracking-tight mt-1">
                    {monthsToTarget} {monthsToTarget === 1 ? "Month" : "Months"}
                  </h4>
                </div>
                <div className="px-4 py-2 rounded-2xl bg-[#0eb02c]/10 border border-[#0eb02c]/20 text-xs font-bold text-[#0eb02c] flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  <span>{Math.round(monthlySaved / 30)} {currency}/day pace</span>
                </div>
              </div>

              {/* Progress Bar Visual */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold text-[#1a1919]">
                  <span>1-Semester Completion</span>
                  <span>{Math.min(100, Math.round((monthlySaved * 4 / targetGoal) * 100))}%</span>
                </div>
                <div className="w-full h-4 bg-[#f0f0f0] rounded-full overflow-hidden p-0.5 border border-[#1a1919]/10">
                  <div 
                    className="h-full bg-gradient-to-r from-[#0922b0] to-[#0eb02c] rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(100, Math.round((monthlySaved * 4 / targetGoal) * 100))}%` }}
                  />
                </div>
                <p className="text-[11px] text-[#1a1919]/60 leading-relaxed">
                  Saving {currency}{monthlySaved}/month reaches your {currency}{targetGoal} target in approximately {monthsToTarget} months.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-2xl bg-white border border-[#1a1919]/10 text-left">
                  <span className="text-[10px] font-mono text-[#1a1919]/60 block font-semibold">WEEKLY CONTRIBUTION</span>
                  <span className="text-base font-bold text-[#1a1919] font-mono">{currency}{Math.round(monthlySaved / 4)}/wk</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-white border border-[#1a1919]/10 text-left">
                  <span className="text-[10px] font-mono text-[#1a1919]/60 block font-semibold">SAFETY CUSHION STATUS</span>
                  <span className="text-base font-bold text-[#0eb02c] font-mono">Guaranteed</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: 5 Common Money Mistakes Safeguard */}
        <section className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 sm:p-12 border border-[#1a1919]/10 shadow-xl space-y-8">
          <div className="max-w-2xl space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#d12828]/10 border border-[#d12828]/20 text-xs font-bold text-[#d12828] shadow-xs">
              <ShieldAlert className="w-3.5 h-3.5 text-[#d12828]" />
              <span>PREVENTION GUIDE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[#1a1919]">
              5 Student Traps to Avoid. <br />
              <span className="font-serif italic font-normal text-2xl sm:text-3xl text-[#d12828]">
                Simple habits that save thousands per year.
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {mistakesList.map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={item.title}
                  className="p-5 rounded-2xl bg-[#f0f0f0]/90 border border-[#1a1919]/10 space-y-3 hover:bg-white hover:border-[#1a1919]/25 transition-all duration-200"
                >
                  <div className="flex items-center justify-between">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center border font-bold ${item.color}`}>
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-mono font-bold text-[#1a1919]/40">TRAP 0{idx + 1}</span>
                  </div>

                  <h4 className="font-bold text-sm text-[#1a1919]">{item.title}</h4>
                  
                  <div className="space-y-1 text-xs leading-relaxed">
                    <p className="text-[#1a1919]/70 font-medium">{item.scenario}</p>
                    <div className="pt-2 border-t border-[#1a1919]/10 text-[#0eb02c] font-semibold flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-0.5 text-[#0eb02c]" />
                      <span>{item.fix}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

      </main>

      {/* 3. Footer */}
      <Footer />
    </div>
  );
}
