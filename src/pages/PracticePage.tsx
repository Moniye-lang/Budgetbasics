import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  DollarSign, 
  RotateCcw, 
  Copy, 
  Check, 
  ShieldCheck, 
  AlertTriangle, 
  Target, 
  Coffee, 
  CheckCircle2,
  Sliders,
  MousePointerClick
} from 'lucide-react';
import { DotLottiePlayer } from '../components/DotLottiePlayer';
import { practiceHandsLottieJson } from '../data/practiceLottie';
import { useCurrency } from '../context/CurrencyContext';

interface PracticePageProps {
  onBackToHome?: () => void;
  onOpenConverterModal?: () => void;
}

export const PracticePage: React.FC<PracticePageProps> = () => {
  const { currentCurrency } = useCurrency();

  // Active Tab within Practice Page
  const [activeTab, setActiveTab] = useState<'planner' | 'goals' | 'mistakes'>('planner');

  // Planner state
  const [income, setIncome] = useState<number>(1400);
  const [needsPct, setNeedsPct] = useState<number>(50);
  const [wantsPct, setWantsPct] = useState<number>(30);
  const [savingsPct, setSavingsPct] = useState<number>(20);
  const [copied, setCopied] = useState<boolean>(false);

  // Savings Goal state
  const [goalName, setGoalName] = useState<string>('Emergency Cushion');
  const [goalTarget, setGoalTarget] = useState<number>(500);
  const [goalMonthly, setGoalMonthly] = useState<number>(100);

  // Session-only Expense Planner Table state
  const [expensesList, setExpensesList] = useState<Array<{ id: string; name: string; amount: number; category: 'Needs' | 'Wants' | 'Savings' }>>([
    { id: '1', name: 'Campus Dorm / Rent Share', amount: 550, category: 'Needs' },
    { id: '2', name: 'Basic Groceries & Supplies', amount: 240, category: 'Needs' },
    { id: '3', name: 'Weekend Dining & Coffee', amount: 130, category: 'Wants' },
    { id: '4', name: 'Music & App Subscriptions', amount: 25, category: 'Wants' },
    { id: '5', name: 'Emergency Cushion Deposit', amount: 150, category: 'Savings' }
  ]);

  const [newExpName, setNewExpName] = useState('');
  const [newExpAmount, setNewExpAmount] = useState('');
  const [newExpCat, setNewExpCat] = useState<'Needs' | 'Wants' | 'Savings'>('Needs');

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newExpName.trim() || !newExpAmount) return;
    const item = {
      id: `exp-${Date.now()}`,
      name: newExpName.trim(),
      amount: parseFloat(newExpAmount) || 0,
      category: newExpCat
    };
    setExpensesList(prev => [...prev, item]);
    setNewExpName('');
    setNewExpAmount('');
  };

  const handleRemoveExpense = (id: string) => {
    setExpensesList(prev => prev.filter(item => item.id !== id));
  };

  // Money Mistakes Calculator State
  const [selectedTraps, setSelectedTraps] = useState<string[]>(['delivery', 'subscriptions']);

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

  // Goals calculations
  const monthsToGoal = goalMonthly > 0 ? (goalTarget / goalMonthly).toFixed(1) : '∞';
  const weeksToGoal = goalMonthly > 0 ? Math.ceil((goalTarget / (goalMonthly / 4.33))) : 0;

  // Mistakes traps catalog
  const trapsList = [
    { id: 'delivery', name: 'Food Delivery Surge & Fees', costPerMonth: 85, icon: '🍔', tip: 'Batch meal prep on Sundays saves $85+/mo.' },
    { id: 'subscriptions', name: 'Silent Auto-Renewing Subscriptions', costPerMonth: 32, icon: '📱', tip: 'Audit active app store subscriptions once a month.' },
    { id: 'bnpl', name: 'Buy Now Pay Later (BNPL) Stacking', costPerMonth: 120, icon: '💳', tip: 'Use the 24-hour pause before taking deferred installments.' },
    { id: 'textbooks', name: 'New Bookstore Retail Textbooks', costPerMonth: 55, icon: '📚', tip: 'Borrow library copies or search open academic repos.' },
    { id: 'overdraft', name: 'Bank Account Overdraft / Low Balance Fees', costPerMonth: 35, icon: '⚠️', tip: 'Keep a $100 minimum checking buffer with low-balance alerts.' },
    { id: 'coffee', name: 'Daily Campus Coffee Runs', costPerMonth: 60, icon: '☕', tip: 'Campus mug refills cut monthly drink costs by 65%.' }
  ];

  const totalLeakage = selectedTraps.reduce((acc, id) => {
    const item = trapsList.find(t => t.id === id);
    return acc + (item ? item.costPerMonth : 0);
  }, 0);

  const toggleTrap = (id: string) => {
    setSelectedTraps(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleCopyPlan = () => {
    const sym = currentCurrency.symbol;
    const summary = `🎓 BudgetBasics Semester Plan (${currentCurrency.code}):
• Total Monthly Income: ${sym}${income.toLocaleString()}
• 🟢 Needs (50% target): ${sym}${needsAmount}/mo (${needsPct}%)
• 🔴 Wants (30% target): ${sym}${wantsAmount}/mo (${wantsPct}%) → ${sym}${dailyFunAllowance}/day (${sym}${weeklyFunAllowance}/wk)
• 🔵 Savings (20% target): ${sym}${savingsAmount}/mo (${savingsPct}%) → ${sym}500 cushion in ~${weeksTo500Cushion} weeks
Created with BudgetBasics Interactive Studio.`;

    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <div className="min-h-screen bg-[#f0f0f0] text-[#1a1919] font-sans antialiased selection:bg-[#0eb02c]/20 selection:text-[#0eb02c] pb-24 relative">
      
      {/* In-Page Sub-Header & Studio Mode Switcher */}
      <div className="border-b border-[#1a1919]/8 bg-white/70 backdrop-blur-md sticky top-[68px] z-30 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono font-bold uppercase text-[#0eb02c] bg-[#0eb02c]/10 px-2.5 py-1 rounded-lg border border-[#0eb02c]/20 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0eb02c] animate-ping" />
              02 · Practice Studio
            </span>
            <span className="hidden sm:inline text-xs text-[#1a1919]/60 font-medium">
              / Interactive Calculators & Simulators
            </span>
          </div>

          {/* Interactive Mode Switcher with Fluid Pill Animation & Click Affordances */}
          <div className="flex items-center gap-2">
            <span className="hidden lg:flex items-center gap-1 text-[11px] font-mono font-semibold text-[#1a1919]/55 uppercase tracking-wider">
              <MousePointerClick className="w-3.5 h-3.5 text-[#0eb02c] animate-bounce" />
              Switch Tab:
            </span>

            <div className="bg-[#1a1919]/6 p-1 rounded-2xl border border-[#1a1919]/10 shadow-xs flex items-center gap-1 relative">
              {[
                { 
                  id: 'planner', 
                  label: 'Expense Planner', 
                  icon: Sliders, 
                  activeBg: 'bg-[#0eb02c]', 
                  textHover: 'hover:text-[#0eb02c]',
                  iconColor: 'text-[#0eb02c]'
                },
                { 
                  id: 'goals', 
                  label: 'Savings Goals', 
                  icon: Target, 
                  activeBg: 'bg-[#0922b0]', 
                  textHover: 'hover:text-[#0922b0]',
                  iconColor: 'text-[#0922b0]'
                },
                { 
                  id: 'mistakes', 
                  label: 'Money Mistakes', 
                  icon: AlertTriangle, 
                  activeBg: 'bg-[#d12828]', 
                  textHover: 'hover:text-[#d12828]',
                  iconColor: 'text-[#d12828]'
                }
              ].map((tab) => {
                const isActive = activeTab === tab.id;
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`relative px-3 sm:px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer flex items-center gap-1.5 group select-none ${
                      isActive
                        ? 'text-white shadow-sm'
                        : `text-[#1a1919]/75 ${tab.textHover} hover:bg-white/80 hover:shadow-xs hover:scale-102 active:scale-95`
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="practiceActiveTabPill"
                        className={`absolute inset-0 ${tab.activeBg} rounded-xl shadow-sm z-0`}
                        transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-1.5">
                      <Icon className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        isActive ? 'scale-110 text-white animate-pulse' : 'group-hover:scale-125 group-hover:rotate-6 ' + tab.iconColor
                      }`} />
                      <span>{tab.label}</span>
                      {isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping ml-0.5" />
                      )}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* 2. Hero Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-8">
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#1a1919]/10 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
          <div className="space-y-3 max-w-2xl relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0eb02c]/10 border border-[#0eb02c]/20 text-xs font-mono font-bold text-[#0eb02c]">
              <span className="w-2 h-2 rounded-full bg-[#0eb02c] animate-pulse" />
              <span>02 · PRACTICE PLANNING SUITE</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#1a1919]">
              Hands-On Budget <span className="text-[#0eb02c]">Laboratory</span>
            </h1>
            <p className="text-sm sm:text-base text-[#1a1919]/75 font-normal leading-relaxed">
              Test your numbers, model semester living expenses, project savings goal timelines, and discover hidden impulse leaks before spending a dime.
            </p>
          </div>

          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-[#0eb02c]/10 border border-[#0eb02c]/20 flex items-center justify-center p-3 shrink-0">
            <DotLottiePlayer
              animationData={practiceHandsLottieJson}
              src="/practice-hands-lottie.json"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </section>

      {/* 3. Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* ============================================================ */}
        {/* SECTION 1: EXPENSE PLANNER STUDIO                            */}
        {/* ============================================================ */}
        {(activeTab === 'planner') && (
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-in fade-in duration-300">
            {/* Left Controller: Income & Knobs */}
            <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-[#1a1919]/10 shadow-sm space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#1a1919]/10">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-[#0eb02c]/10 text-[#0eb02c] flex items-center justify-center font-bold">
                    <DollarSign className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-[#1a1919]">Monthly Cash Flow Input</h3>
                    <p className="text-xs text-[#1a1919]/60 font-mono">Real semester baseline</p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setIncome(1400);
                    setNeedsPct(50);
                    setWantsPct(30);
                    setSavingsPct(20);
                  }}
                  className="p-2 rounded-xl bg-[#f0f0f0] hover:bg-slate-200 text-[#1a1919]/70 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  title="Reset to 50/30/20 Standard"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </button>
              </div>

              {/* Income Slider */}
              <div className="space-y-3 bg-[#f0f0f0]/60 p-4 rounded-2xl border border-[#1a1919]/5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#1a1919]/70">Monthly Take-Home Allowance / Income</span>
                  <span className="text-lg font-mono font-bold text-[#1a1919]">${income.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="400"
                  max="4500"
                  step="50"
                  value={income}
                  onChange={(e) => setIncome(Number(e.target.value))}
                  className="w-full accent-[#0eb02c] cursor-pointer"
                />
              </div>

              {/* Sliders for Needs, Wants, Savings */}
              <div className="space-y-4">
                {/* Needs Slider */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-[#1a1919] flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#1a1919]" />
                      Needs (Essentials: Rent, Food, Transit)
                    </span>
                    <span className="font-mono">{needsPct}% (${needsAmount})</span>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="80"
                    value={needsPct}
                    onChange={(e) => setNeedsPct(Number(e.target.value))}
                    className="w-full accent-[#1a1919] cursor-pointer"
                  />
                </div>

                {/* Wants Slider */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-[#d12828] flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#d12828]" />
                      Wants (Lifestyle, Coffee, Dining Out)
                    </span>
                    <span className="font-mono text-[#d12828]">{wantsPct}% (${wantsAmount})</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="60"
                    value={wantsPct}
                    onChange={(e) => setWantsPct(Number(e.target.value))}
                    className="w-full accent-[#d12828] cursor-pointer"
                  />
                </div>

                {/* Savings Slider */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-[#0eb02c] flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#0eb02c]" />
                      Savings & Buffer (Emergency Shield)
                    </span>
                    <span className="font-mono text-[#0eb02c]">{savingsPct}% (${savingsAmount})</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="50"
                    value={savingsPct}
                    onChange={(e) => setSavingsPct(Number(e.target.value))}
                    className="w-full accent-[#0eb02c] cursor-pointer"
                  />
                </div>
              </div>

              {/* Allocation Progress Bar */}
              <div className="space-y-2 pt-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span>Total Split Status:</span>
                  <span className={`font-mono ${isBalanced ? 'text-[#0eb02c]' : 'text-[#d12828]'}`}>
                    {totalPct}% {isBalanced ? '✓ Balanced' : '⚠️ Adjust to 100%'}
                  </span>
                </div>
                <div className="h-3 rounded-full bg-gray-200 overflow-hidden flex">
                  <div style={{ width: `${needsPct}%` }} className="bg-[#1a1919]" title="Needs" />
                  <div style={{ width: `${wantsPct}%` }} className="bg-[#d12828]" title="Wants" />
                  <div style={{ width: `${savingsPct}%` }} className="bg-[#0eb02c]" title="Savings" />
                </div>
              </div>
            </div>

            {/* Right Output: Spending Allowance & Projection Cards */}
            <div className="lg:col-span-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-3xl p-6 border border-[#1a1919]/10 shadow-sm space-y-2">
                  <div className="flex items-center justify-between text-[#d12828]">
                    <Coffee className="w-5 h-5" />
                    <span className="text-[10px] font-mono font-bold uppercase bg-[#d12828]/10 px-2 py-0.5 rounded">Daily Fun Limit</span>
                  </div>
                  <div className="text-3xl font-black font-mono text-[#1a1919]">${dailyFunAllowance}</div>
                  <p className="text-xs text-[#1a1919]/60">Safe guilt-free spending every single day</p>
                </div>

                <div className="bg-white rounded-3xl p-6 border border-[#1a1919]/10 shadow-sm space-y-2">
                  <div className="flex items-center justify-between text-[#0eb02c]">
                    <ShieldCheck className="w-5 h-5" />
                    <span className="text-[10px] font-mono font-bold uppercase bg-[#0eb02c]/10 px-2 py-0.5 rounded">$500 Buffer</span>
                  </div>
                  <div className="text-3xl font-black font-mono text-[#1a1919]">~{weeksTo500Cushion} Wks</div>
                  <p className="text-xs text-[#1a1919]/60">Time required to fully fund emergency shield</p>
                </div>
              </div>

              {/* Summary Card */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#1a1919]/10 shadow-sm space-y-4">
                <h4 className="font-bold text-base text-[#1a1919]">Personalized Action Summary</h4>
                <div className="space-y-2.5 text-xs text-[#1a1919]/80 font-medium">
                  <div className="flex justify-between p-3 rounded-xl bg-[#f0f0f0]">
                    <span>Living Baseline (Needs)</span>
                    <strong className="font-mono text-[#1a1919]">${needsAmount} / month</strong>
                  </div>
                  <div className="flex justify-between p-3 rounded-xl bg-[#d12828]/5 text-[#d12828]">
                    <span>Discretionary Entertainment</span>
                    <strong className="font-mono">${wantsAmount} / month (${weeklyFunAllowance}/wk)</strong>
                  </div>
                  <div className="flex justify-between p-3 rounded-xl bg-[#0eb02c]/5 text-[#0eb02c]">
                    <span>Monthly Savings Accumulation</span>
                    <strong className="font-mono">${savingsAmount} / month</strong>
                  </div>
                </div>

                <button
                  onClick={handleCopyPlan}
                  className="w-full py-3 px-4 rounded-2xl bg-[#1a1919] hover:bg-black text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-sm"
                >
                  {copied ? <Check className="w-4 h-4 text-[#0eb02c]" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? 'Plan Copied to Clipboard!' : 'Copy Semester Plan Summary'}</span>
                </button>
              </div>
            </div>

            {/* Session-Only Expense Planner Table */}
            <div className="lg:col-span-12 bg-white rounded-3xl p-6 sm:p-8 border border-[#1a1919]/10 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#1a1919]/10">
                <div>
                  <h3 className="font-bold text-lg text-[#1a1919]">Session Expense Ledger</h3>
                  <p className="text-xs text-[#1a1919]/60 font-mono">Add, edit, or remove line items for your active semester scenario</p>
                </div>
                <div className="flex items-center gap-3 font-mono text-xs">
                  <span className="p-2 rounded-xl bg-[#f0f0f0] border border-[#1a1919]/10">
                    Total: <strong>${expensesList.reduce((acc, curr) => acc + curr.amount, 0)}</strong>
                  </span>
                  <span className={`p-2 rounded-xl border ${
                    (income - expensesList.reduce((acc, curr) => acc + curr.amount, 0)) >= 0
                      ? 'bg-[#0eb02c]/10 text-[#0eb02c] border-[#0eb02c]/20 font-bold'
                      : 'bg-[#d12828]/10 text-[#d12828] border-[#d12828]/20 font-bold'
                  }`}>
                    {(income - expensesList.reduce((acc, curr) => acc + curr.amount, 0)) >= 0
                      ? `Surplus: +$${income - expensesList.reduce((acc, curr) => acc + curr.amount, 0)}`
                      : `Deficit: -$${Math.abs(income - expensesList.reduce((acc, curr) => acc + curr.amount, 0))}`
                    }
                  </span>
                </div>
              </div>

              {/* Add Expense Form */}
              <form onSubmit={handleAddExpense} className="grid grid-cols-1 sm:grid-cols-12 gap-3 p-4 rounded-2xl bg-[#f0f0f0]/60 border border-[#1a1919]/5">
                <div className="sm:col-span-5">
                  <input
                    type="text"
                    required
                    placeholder="Expense name (e.g. Lab fee, Groceries, WiFi)"
                    value={newExpName}
                    onChange={(e) => setNewExpName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#1a1919]/10 text-xs font-medium focus:outline-none focus:border-[#0eb02c]"
                  />
                </div>
                <div className="sm:col-span-3">
                  <input
                    type="number"
                    required
                    min="1"
                    placeholder="Amount ($)"
                    value={newExpAmount}
                    onChange={(e) => setNewExpAmount(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#1a1919]/10 text-xs font-medium focus:outline-none focus:border-[#0eb02c]"
                  />
                </div>
                <div className="sm:col-span-2">
                  <select
                    value={newExpCat}
                    onChange={(e) => setNewExpCat(e.target.value as any)}
                    className="w-full px-3 py-2.5 rounded-xl bg-white border border-[#1a1919]/10 text-xs font-semibold focus:outline-none cursor-pointer"
                  >
                    <option value="Needs">Needs</option>
                    <option value="Wants">Wants</option>
                    <option value="Savings">Savings</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    className="w-full py-2.5 px-3 rounded-xl bg-[#0eb02c] hover:bg-[#0c9626] text-white text-xs font-bold transition-colors shadow-xs"
                  >
                    + Add Row
                  </button>
                </div>
              </form>

              {/* Expense Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="bg-[#f0f0f0] border-b border-[#1a1919]/10 font-mono text-[#1a1919]/70 uppercase text-[11px]">
                      <th className="py-3 px-4">Expense Description</th>
                      <th className="py-3 px-4 text-center">Category Bucket</th>
                      <th className="py-3 px-4 text-right">Planned Amount</th>
                      <th className="py-3 px-4 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    {expensesList.map((exp) => (
                      <tr key={exp.id} className="hover:bg-[#f0f0f0]/40 transition-colors">
                        <td className="py-3 px-4 text-[#1a1919] font-semibold">{exp.name}</td>
                        <td className="py-3 px-4 text-center">
                          <span className={`px-2.5 py-0.5 rounded-md font-mono text-[10px] font-bold ${
                            exp.category === 'Needs' ? 'bg-[#1a1919]/10 text-[#1a1919]' :
                            exp.category === 'Wants' ? 'bg-[#d12828]/10 text-[#d12828]' :
                            'bg-[#0eb02c]/10 text-[#0eb02c]'
                          }`}>
                            {exp.category}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right font-mono font-bold text-[#1a1919]">${exp.amount.toLocaleString()}</td>
                        <td className="py-3 px-4 text-center">
                          <button
                            onClick={() => handleRemoveExpense(exp.id)}
                            className="text-[#d12828] hover:text-red-700 font-bold px-2 py-1 rounded hover:bg-red-50 text-[11px]"
                            title="Remove line item"
                          >
                            ✕ Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

        {/* ============================================================ */}
        {/* SECTION 2: SAVINGS GOALS SIMULATOR                           */}
        {/* ============================================================ */}
        {(activeTab === 'goals') && (
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-in fade-in duration-300">
            <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-[#1a1919]/10 shadow-sm space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-[#1a1919]/10">
                <div className="w-10 h-10 rounded-xl bg-[#0922b0]/10 text-[#0922b0] flex items-center justify-center font-bold">
                  <Target className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-[#1a1919]">Target Goal Configuration</h3>
                  <p className="text-xs text-[#1a1919]/60 font-mono">Custom Milestone Modeling</p>
                </div>
              </div>

              {/* Goal Presets */}
              <div className="space-y-2">
                <span className="text-xs font-semibold text-[#1a1919]/70">Choose Goal Preset</span>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { name: 'Emergency Cushion', target: 500 },
                    { name: 'Laptop Repair / Upgrade', target: 1200 },
                    { name: 'Break Trip Fund', target: 800 },
                    { name: 'Post-Grad Security', target: 2500 }
                  ].map((preset) => (
                    <button
                      key={preset.name}
                      onClick={() => {
                        setGoalName(preset.name);
                        setGoalTarget(preset.target);
                      }}
                      className={`p-3 rounded-2xl border text-left text-xs transition-all ${
                        goalName === preset.name
                          ? 'bg-[#0922b0]/10 border-[#0922b0] text-[#0922b0] font-bold'
                          : 'bg-[#f0f0f0] border-transparent text-[#1a1919]/80 hover:border-[#1a1919]/20'
                      }`}
                    >
                      <div className="truncate">{preset.name}</div>
                      <div className="font-mono text-[11px] opacity-70 mt-0.5">${preset.target}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Target Slider */}
              <div className="space-y-3 bg-[#f0f0f0]/60 p-4 rounded-2xl border border-[#1a1919]/5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#1a1919]/70">Target Amount</span>
                  <span className="text-lg font-mono font-bold text-[#0922b0]">${goalTarget.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="200"
                  max="5000"
                  step="50"
                  value={goalTarget}
                  onChange={(e) => setGoalTarget(Number(e.target.value))}
                  className="w-full accent-[#0922b0] cursor-pointer"
                />
              </div>

              {/* Monthly Contribution Slider */}
              <div className="space-y-3 bg-[#f0f0f0]/60 p-4 rounded-2xl border border-[#1a1919]/5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#1a1919]/70">Monthly Deposit Speed</span>
                  <span className="text-lg font-mono font-bold text-[#0eb02c]">${goalMonthly}/mo</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="600"
                  step="10"
                  value={goalMonthly}
                  onChange={(e) => setGoalMonthly(Number(e.target.value))}
                  className="w-full accent-[#0eb02c] cursor-pointer"
                />
              </div>
            </div>

            {/* Right Output: Projection Timeline */}
            <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-[#1a1919]/10 shadow-sm space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono font-bold uppercase text-[#0922b0] bg-[#0922b0]/10 px-2.5 py-1 rounded-full">
                    TIMELINE PROJECTION
                  </span>
                  <h4 className="text-2xl font-black text-[#1a1919] mt-2">{goalName}</h4>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-black font-mono text-[#0922b0]">{monthsToGoal}</div>
                  <span className="text-xs text-[#1a1919]/60 font-mono">Months to complete</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#0eb02c]/10 border border-[#0eb02c]/20 space-y-1">
                <div className="flex justify-between items-center text-xs font-bold text-[#0eb02c]">
                  <span>Weekly Target: ${(goalMonthly / 4.33).toFixed(1)} / week</span>
                  <span>~{weeksToGoal} Weeks Total</span>
                </div>
                <p className="text-[11px] text-[#0eb02c]/80">
                  That is just 1 skipped takeout dinner or 3 skipped coffee orders each week!
                </p>
              </div>

              {/* Milestones */}
              <div className="space-y-3">
                <span className="text-xs font-bold text-[#1a1919] uppercase tracking-wider block">Goal Milestones</span>
                <div className="space-y-2">
                  <div className="p-3 rounded-xl bg-[#f0f0f0] flex items-center justify-between text-xs">
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#0eb02c]" />
                      25% Quick Momentum
                    </span>
                    <strong className="font-mono">${(goalTarget * 0.25).toFixed(0)}</strong>
                  </div>
                  <div className="p-3 rounded-xl bg-[#f0f0f0] flex items-center justify-between text-xs">
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#0922b0]" />
                      50% Halfway Shield
                    </span>
                    <strong className="font-mono">${(goalTarget * 0.5).toFixed(0)}</strong>
                  </div>
                  <div className="p-3 rounded-xl bg-[#f0f0f0] flex items-center justify-between text-xs">
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#1a1919]" />
                      100% Goal Realization
                    </span>
                    <strong className="font-mono text-[#0eb02c]">${goalTarget}</strong>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ============================================================ */}
        {/* SECTION 3: MONEY MISTAKES DIAGNOSTIC RADAR                   */}
        {/* ============================================================ */}
        {(activeTab === 'mistakes') && (
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-in fade-in duration-300">
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-[#1a1919]/10 shadow-sm space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-[#1a1919]/10">
                <div className="w-10 h-10 rounded-xl bg-[#d12828]/10 text-[#d12828] flex items-center justify-center font-bold">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-[#1a1919]">Student Money Trap Diagnostic</h3>
                  <p className="text-xs text-[#1a1919]/60 font-mono">Select any habits that apply to you</p>
                </div>
              </div>

              <div className="space-y-3">
                {trapsList.map((trap) => {
                  const isSelected = selectedTraps.includes(trap.id);
                  return (
                    <div
                      key={trap.id}
                      onClick={() => toggleTrap(trap.id)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-4 ${
                        isSelected
                          ? 'bg-[#d12828]/5 border-[#d12828] shadow-xs'
                          : 'bg-[#f0f0f0]/60 border-transparent hover:border-[#1a1919]/20'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">{trap.icon}</span>
                        <div>
                          <h4 className="text-sm font-bold text-[#1a1919]">{trap.name}</h4>
                          <p className="text-xs text-[#1a1919]/70 mt-1">{trap.tip}</p>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="font-mono font-bold text-xs text-[#d12828] block">
                          -${trap.costPerMonth}/mo
                        </span>
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded mt-1 inline-block ${
                          isSelected ? 'bg-[#d12828] text-white font-bold' : 'bg-gray-200 text-gray-700'
                        }`}>
                          {isSelected ? 'ACTIVE LEAK' : 'TEST'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Output: Annual Impact */}
            <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-[#1a1919]/10 shadow-sm space-y-6">
              <div>
                <span className="text-xs font-mono font-bold uppercase text-[#d12828] bg-[#d12828]/10 px-2.5 py-1 rounded-full">
                  ANNUAL LEAKAGE REPORT
                </span>
                <h4 className="text-3xl font-black text-[#1a1919] mt-3">
                  ${(totalLeakage * 12).toLocaleString()} <span className="text-sm font-normal text-[#1a1919]/60">/ year</span>
                </h4>
                <p className="text-xs text-[#1a1919]/70 mt-1">
                  Estimated capital draining into impulse leaks every semester.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#0eb02c]/10 border border-[#0eb02c]/20 space-y-2">
                <div className="flex items-center gap-2 text-[#0eb02c] font-bold text-xs">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>The 10-Minute Weekly Fix</span>
                </div>
                <p className="text-xs text-[#1a1919]/80 leading-relaxed">
                  By reviewing your accounts every Sunday for 10 minutes and placing a 24-hour pause on non-essentials, you can reclaim over <strong>80%</strong> of this money without changing your lifestyle!
                </p>
              </div>
            </div>
          </section>
        )}

      </main>
    </div>
  );
};
