import React, { useState } from 'react';
import { 
  Target, 
  Sparkles, 
  Clock, 
  ArrowRight
} from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';

interface SavingsGoalsPageProps {
  onBackToHome?: () => void;
  onNavigateToPlanner?: () => void;
}

export const SavingsGoalsPage: React.FC<SavingsGoalsPageProps> = ({
  onNavigateToPlanner
}) => {
  const { currentCurrency, formatAmount } = useCurrency();

  // Savings Goal state
  const [goalName, setGoalName] = useState<string>('Emergency Cushion');
  const [goalTarget, setGoalTarget] = useState<number>(500);
  const [goalMonthly, setGoalMonthly] = useState<number>(100);

  // Preset goals
  const presetGoals = [
    { name: 'Starter Emergency Fund', target: 500, icon: '🛡️', desc: 'Avoid credit card debt on sudden repairs' },
    { name: 'New Course Laptop / iPad', target: 1200, icon: '💻', desc: 'Hardware upgrade for coursework' },
    { name: 'Off-Campus Security Deposit', target: 800, icon: '🔑', desc: 'First/last month lease deposit' },
    { name: 'Spring Break Road Trip', target: 350, icon: '✈️', desc: 'Guilt-free student travel' },
  ];

  // Calculations
  const monthsToGoal = goalMonthly > 0 ? (goalTarget / goalMonthly).toFixed(1) : '∞';
  const weeksToGoal = goalMonthly > 0 ? Math.ceil((goalTarget / (goalMonthly / 4.33))) : 0;
  const dailySavingsNeeded = goalMonthly > 0 ? (goalMonthly / 30).toFixed(2) : '0';

  const selectPreset = (preset: { name: string; target: number }) => {
    setGoalName(preset.name);
    setGoalTarget(preset.target);
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
              / Savings Goals & Emergency Cushion Studio
            </span>
          </div>
          <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#0eb02c] bg-white px-3 py-1.5 rounded-xl border border-[#1a1919]/10 shadow-xs">
            GOAL VELOCITY
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-12">
        
        {/* 1. Hero Introduction */}
        <section className="bg-white rounded-3xl p-8 sm:p-10 border border-[#1a1919]/10 shadow-sm relative overflow-hidden">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0eb02c]/10 border border-[#0eb02c]/20 text-xs font-mono font-bold text-[#0eb02c]">
              <Target className="w-3.5 h-3.5" />
              <span>SAVINGS VELOCITY ENGINE</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-[#1a1919] leading-tight">
              Student <span className="text-[#0eb02c]">Savings Goals</span> Studio
            </h1>
            <p className="text-sm sm:text-base text-[#1a1919]/75 leading-relaxed font-medium">
              Build your first $500 emergency buffer or plan major milestones like a laptop upgrade. Track exactly how many weeks of small daily habits it takes to cross the finish line.
            </p>
          </div>
        </section>

        {/* 2. Interactive Goal Planner Workspace */}
        <section className="bg-white rounded-3xl p-6 sm:p-10 border border-[#1a1919]/10 shadow-sm space-y-8">
          
          {/* Preset Quick Selectors */}
          <div className="space-y-3">
            <div className="text-xs font-mono font-bold uppercase text-[#1a1919]/60">Select a Common Student Milestone</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {presetGoals.map((preset) => {
                const isSelected = goalName === preset.name && goalTarget === preset.target;
                return (
                  <button
                    key={preset.name}
                    onClick={() => selectPreset(preset)}
                    className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'border-[#0eb02c] bg-emerald-50/50 shadow-xs'
                        : 'border-[#1a1919]/10 bg-slate-50 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-2xl">{preset.icon}</span>
                      <span className="text-xs font-black text-[#0eb02c] font-mono">{formatAmount(preset.target)}</span>
                    </div>
                    <div className="mt-2">
                      <div className="text-xs font-bold text-[#1a1919]">{preset.name}</div>
                      <div className="text-[10px] text-[#1a1919]/60 mt-0.5 leading-tight">{preset.desc}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-4 border-t border-[#1a1919]/8">
            
            {/* Left Controls */}
            <div className="lg:col-span-6 space-y-6">
              
              {/* Custom Goal Name */}
              <div className="space-y-2">
                <label className="text-xs font-mono font-bold uppercase text-[#1a1919]/70">Target Goal Name</label>
                <input
                  type="text"
                  value={goalName}
                  onChange={(e) => setGoalName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-[#1a1919]/15 text-sm font-bold text-[#1a1919] focus:outline-none focus:border-[#0eb02c] bg-slate-50 focus:bg-white transition-colors"
                  placeholder="e.g. Course Laptop, Semester Buffer..."
                />
              </div>

              {/* Target Amount Slider */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-[#1a1919]/8 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-mono font-bold uppercase text-[#1a1919]/80">Target Goal Cost</label>
                  <span className="text-2xl font-black text-[#0eb02c]">{formatAmount(goalTarget)}</span>
                </div>
                <input
                  type="range"
                  min="100"
                  max="3000"
                  step="50"
                  value={goalTarget}
                  onChange={(e) => setGoalTarget(Number(e.target.value))}
                  className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0eb02c]"
                />
                <div className="flex justify-between text-[10px] font-mono text-[#1a1919]/40 font-bold">
                  <span>{formatAmount(100)}</span>
                  <span>{formatAmount(1500)}</span>
                  <span>{formatAmount(3000)}</span>
                </div>
              </div>

              {/* Monthly Contribution Slider */}
              <div className="p-5 rounded-2xl bg-emerald-50/60 border border-[#0eb02c]/20 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-mono font-bold uppercase text-[#1a1919]/80">Monthly Savings Contribution</label>
                  <span className="text-2xl font-black text-[#0eb02c]">{formatAmount(goalMonthly)} / mo</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="500"
                  step="10"
                  value={goalMonthly}
                  onChange={(e) => setGoalMonthly(Number(e.target.value))}
                  className="w-full h-2.5 bg-emerald-200 rounded-lg appearance-none cursor-pointer accent-[#0eb02c]"
                />
                <div className="flex justify-between text-[10px] font-mono text-[#1a1919]/40 font-bold">
                  <span>{formatAmount(20)}/mo</span>
                  <span>{formatAmount(250)}/mo</span>
                  <span>{formatAmount(500)}/mo</span>
                </div>
              </div>

            </div>

            {/* Right Live Velocity Results Card */}
            <div className="lg:col-span-6 bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-3xl p-7 shadow-xl space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-white/60">Estimated Timeline for</span>
                  <h3 className="text-lg font-black text-white">{goalName}</h3>
                </div>
                <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
                  <Clock className="w-5 h-5" />
                </div>
              </div>

              {/* Milestone Metrics */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <div className="text-[11px] font-mono text-white/60">Time to Goal</div>
                  <div className="text-3xl font-black text-emerald-400 mt-1">
                    {weeksToGoal} <span className="text-xs font-normal text-white/60">Weeks</span>
                  </div>
                  <div className="text-[11px] text-white/60 mt-0.5">(~{monthsToGoal} Months)</div>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <div className="text-[11px] font-mono text-white/60">Daily Discipline Required</div>
                  <div className="text-3xl font-black text-white mt-1">
                    {currentCurrency.symbol}{dailySavingsNeeded}
                  </div>
                  <div className="text-[11px] text-white/60 mt-0.5">Per day (~1 less coffee)</div>
                </div>
              </div>

              {/* Velocity Breakdown */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white/70">Progress Velocity:</span>
                  <span className="text-emerald-400 font-bold font-mono">{(goalMonthly / (goalTarget || 1) * 100).toFixed(0)}% per month</span>
                </div>
                <div className="h-3 w-full bg-white/10 rounded-full overflow-hidden">
                  <div 
                    style={{ width: `${Math.min(100, (goalMonthly / (goalTarget || 1) * 100))}%` }} 
                    className="h-full bg-gradient-to-r from-emerald-500 to-[#0eb02c] rounded-full transition-all duration-300"
                  />
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/20 text-xs text-emerald-200/90 flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  By transferring <span className="text-white font-bold">{formatAmount(goalMonthly)}</span> on allowance day, you protect your future self without feeling deprived.
                </span>
              </div>
            </div>

          </div>
        </section>

        {/* 3. The 3-Tier Student Savings Roadmap */}
        <section className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-3xl font-black text-[#1a1919]">The 3-Tier Student Savings Roadmap</h2>
            <p className="text-xs text-[#1a1919]/70">Follow this progression to build bulletproof financial stability before graduation.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Level 1 */}
            <div className="bg-white rounded-3xl p-7 border border-[#1a1919]/10 shadow-xs space-y-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0922b0] flex items-center justify-center font-black text-sm">
                01
              </div>
              <div>
                <h3 className="text-base font-black text-[#1a1919]">Level 1: $100 Mini-Cushion</h3>
                <p className="text-xs font-semibold text-[#0922b0] mt-0.5">The Parking Ticket & Pharmacy Shield</p>
              </div>
              <p className="text-xs text-[#1a1919]/70 leading-relaxed">
                Covers small sudden surprises like an urgent prescription, campus parking fee, or urgent course printing so you never drop below zero.
              </p>
            </div>

            {/* Level 2 */}
            <div className="bg-white rounded-3xl p-7 border border-[#0eb02c]/30 shadow-xs space-y-4 bg-emerald-50/20">
              <div className="w-10 h-10 rounded-xl bg-[#0eb02c] text-white flex items-center justify-center font-black text-sm">
                02
              </div>
              <div>
                <h3 className="text-base font-black text-[#1a1919]">Level 2: $500 Safety Fortress</h3>
                <p className="text-xs font-semibold text-[#0eb02c] mt-0.5">The Primary Student Milestone</p>
              </div>
              <p className="text-xs text-[#1a1919]/70 leading-relaxed">
                Absorbs major crises: broken smartphone screens, emergency dentist visits, or sudden travel home without relying on high-interest loans.
              </p>
            </div>

            {/* Level 3 */}
            <div className="bg-white rounded-3xl p-7 border border-[#1a1919]/10 shadow-xs space-y-4">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-black text-sm">
                03
              </div>
              <div>
                <h3 className="text-base font-black text-[#1a1919]">Level 3: 1-Month Living Reserve</h3>
                <p className="text-xs font-semibold text-purple-600 mt-0.5">Post-Graduation Launchpad</p>
              </div>
              <p className="text-xs text-[#1a1919]/70 leading-relaxed">
                Covers a full 30 days of living expenses ($1,000–$2,000) for security deposits when transitioning from campus to your first career job.
              </p>
            </div>

          </div>
        </section>

        {/* 4. CTA Back to Sliders */}
        <section className="bg-[#0eb02c] rounded-3xl p-8 sm:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 max-w-xl text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-black">Want to allocate this in your monthly budget?</h3>
            <p className="text-xs sm:text-sm text-white/90">
              Switch over to the 50/30/20 Studio to balance your needs, wants, and savings percentages together.
            </p>
          </div>
          <button
            onClick={() => {
              if (onNavigateToPlanner) onNavigateToPlanner();
              else window.location.hash = '#expense-planner';
            }}
            className="px-6 py-3.5 bg-white text-[#0eb02c] hover:bg-slate-100 text-xs font-bold rounded-xl shadow-lg flex items-center gap-2 cursor-pointer transition-all shrink-0 active:scale-95"
          >
            <span>Open 50/30/20 Studio</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </section>

      </main>
    </div>
  );
};
