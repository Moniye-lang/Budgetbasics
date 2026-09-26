import React, { useState } from 'react';
import { 
  DollarSign, 
  HelpCircle, 
  ArrowRight, 
  ShieldCheck, 
  TrendingUp,
  Sparkles
} from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';
import { classifierDatabase } from '../data/decisionDeckData';

interface BudgetingBasicsPageProps {
  onBackToHome?: () => void;
  onNavigateToPractice?: () => void;
  onNavigateToNeedsVsWants?: () => void;
  onOpenConverterModal?: () => void;
}

export const BudgetingBasicsPage: React.FC<BudgetingBasicsPageProps> = ({
  onNavigateToPractice,
  onNavigateToNeedsVsWants,
  onOpenConverterModal,
}) => {
  const { currentCurrency } = useCurrency();
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [activeClassifier, setActiveClassifier] = useState<string>("groceries");

  const currentClassData = classifierDatabase[activeClassifier] || classifierDatabase.groceries;

  const quizQuestion = {
    question: `You receive your monthly allowance of ${currentCurrency.symbol}${currentCurrency.code === 'NGN' ? '50,000' : '1,000'}. Your rent share is ${currentCurrency.symbol}${currentCurrency.code === 'NGN' ? '22,500' : '450'} and basic groceries are ${currentCurrency.symbol}${currentCurrency.code === 'NGN' ? '7,500' : '150'}. Which category does this belong to?`,
    options: [
      { id: 0, text: "30% Wants & Fun", isCorrect: false, explanation: "Housing and basic food are vital for survival and academic attendance, making them non-negotiable Needs." },
      { id: 1, text: "50% Non-Negotiable Needs", isCorrect: true, explanation: "Correct! Rent and basic nutrition are essential fixed/baseline outlays that must be paid before any discretionary spending." },
      { id: 2, text: "20% Emergency Savings", isCorrect: false, explanation: "Savings are set aside for future reserves, not immediate monthly rent or grocery bills." }
    ]
  };

  const handleQuizSelect = (id: number) => {
    setSelectedAnswer(id);
    setQuizSubmitted(true);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#f0f0f0] text-[#1a1919] font-sans antialiased pb-24 relative selection:bg-[#0922b0]/20 selection:text-[#0922b0]">
      
      {/* Sub-Header Breadcrumb & Quick Bar */}
      <div className="border-b border-[#1a1919]/8 bg-white/70 backdrop-blur-md sticky top-[68px] z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono font-bold uppercase text-[#0922b0] bg-[#0922b0]/10 px-2.5 py-1 rounded-lg border border-[#0922b0]/20">
              01 · Learn Module
            </span>
            <span className="hidden sm:inline text-xs text-[#1a1919]/60 font-medium">
              / Budgeting Fundamentals & Swipe Simulator
            </span>
          </div>

          <div className="flex items-center gap-4">
            <nav className="hidden md:flex items-center gap-4 text-xs font-semibold text-[#1a1919]/75">
              <button 
                onClick={() => scrollToSection('cash-flow-section')}
                className="hover:text-[#0922b0] transition-colors cursor-pointer"
              >
                Cash Flow
              </button>
              <button 
                onClick={() => onNavigateToNeedsVsWants ? onNavigateToNeedsVsWants() : scrollToSection('classifier-section')}
                className="hover:text-[#0922b0] transition-colors cursor-pointer"
              >
                Needs vs Wants
              </button>
              <button 
                onClick={() => onNavigateToNeedsVsWants ? onNavigateToNeedsVsWants() : null}
                className="flex items-center gap-1.5 font-bold text-[#0922b0] hover:text-[#071a8a] transition-colors cursor-pointer"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[#0922b0] animate-pulse" />
                30-Card Challenge
              </button>
              <button 
                onClick={() => scrollToSection('baseline-section')}
                className="hover:text-[#0922b0] transition-colors cursor-pointer"
              >
                Pause Framework
              </button>
            </nav>

            <div className="rounded-xl border border-[#0eb02c]/20 bg-[#edf9ef] px-3 py-1 text-xs font-mono font-bold text-[#0eb02c] shadow-xs">
              RUNWAY: <span>3.8 Mo</span>
            </div>
          </div>
        </div>
      </div>

      {/* 1. Hero Section (Screenshot 1) */}
      <section className="mx-auto grid max-w-7xl items-center gap-8 px-4 pb-12 pt-10 sm:px-6 md:grid-cols-[1.05fr_.95fr] md:pt-14 lg:px-8">
        <div className="space-y-5">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#1a1919]/10 bg-white px-3.5 py-1.5 text-[11px] font-semibold tracking-wider text-[#1a1919]/75 shadow-xs">
            <span className="h-2 w-2 rounded-full bg-[#0eb02c] animate-pulse" />
            LEARN BETTER MONEY HABITS
          </div>

          <h1 className="text-4xl font-black leading-[1.05] tracking-tight md:text-6xl text-[#1a1919]">
            Small decisions.
            <br />
            <span className="font-serif text-3xl font-normal italic text-[#0eb02c] md:text-5xl">
              Better money habits.
            </span>
          </h1>

          <p className="max-w-xl text-sm leading-relaxed text-[#1a1919]/75 md:text-base">
            Learn where your money goes, separate needs from wants, and practice making smarter everyday decisions.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={() => onNavigateToNeedsVsWants && onNavigateToNeedsVsWants()}
              className="flex items-center gap-2 rounded-full bg-[#1a1919] px-6 py-3.5 text-xs font-semibold text-white shadow-md transition hover:bg-black cursor-pointer"
            >
              <span>Start Challenge</span>
              <ArrowRight className="h-4 w-4 text-[#0eb02c]" />
            </button>

            <button
              onClick={() => onNavigateToNeedsVsWants && onNavigateToNeedsVsWants()}
              className="rounded-full border border-[#1a1919]/15 bg-white px-6 py-3.5 text-xs font-semibold text-[#1a1919] transition hover:bg-slate-100 cursor-pointer shadow-xs"
            >
              View Needs vs Wants
            </button>
          </div>
        </div>

        {/* Active Runway Card (Screenshot 1 Right) */}
        <div className="space-y-5 rounded-3xl border border-[#dedede] bg-white p-6 sm:p-8 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[10px] font-mono font-semibold uppercase tracking-wider text-[#1a1919]/60">
                ACTIVE RUNWAY
              </p>

              <div className="mt-1 flex flex-wrap items-baseline gap-2.5">
                <span className="text-3xl font-black font-mono sm:text-4xl text-[#1a1919]">
                  ₦50,000
                </span>

                <span className="rounded-full border border-[#0eb02c]/20 bg-[#edf9ef] px-2.5 py-0.5 text-xs font-bold text-[#0eb02c]">
                  3.8 Mo
                </span>
              </div>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-[#0922b0]/20 bg-[#eef1ff] font-mono font-bold text-[#0922b0] shadow-xs">
              ₦
            </div>
          </div>

          <div className="space-y-4 text-xs font-medium">
            <div>
              <div className="mb-1.5 flex justify-between gap-3 text-[#1a1919]">
                <span>Essential Needs</span>
                <strong className="font-mono font-bold">₦32,000</strong>
              </div>
              <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
                <div className="h-full rounded-full bg-[#1a1919]" style={{ width: "64%" }} />
              </div>
            </div>

            <div>
              <div className="mb-1.5 flex justify-between gap-3">
                <span className="text-[#1a1919]">School & Growth</span>
                <strong className="font-mono font-bold text-[#0922b0]">₦11,000</strong>
              </div>
              <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
                <div className="h-full rounded-full bg-[#0922b0]" style={{ width: "22%" }} />
              </div>
            </div>

            <div>
              <div className="mb-1.5 flex justify-between gap-3">
                <span className="text-[#1a1919]">Savings Buffer</span>
                <strong className="font-mono font-bold text-[#0eb02c]">₦7,000</strong>
              </div>
              <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
                <div className="h-full rounded-full bg-[#0eb02c]" style={{ width: "14%" }} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 border-t border-[#dedede] pt-4 text-center">
            <div className="rounded-2xl bg-[#f7f7f5] p-3 border border-[#dedede]/60">
              <span className="block text-[9px] font-mono font-bold text-[#1a1919]/50 uppercase tracking-wider">
                HABIT DEFENSE
              </span>
              <strong className="font-mono text-sm text-[#1a1919]">88.4%</strong>
            </div>

            <div className="rounded-2xl border border-[#0eb02c]/20 bg-[#edf9ef]/60 p-3">
              <span className="block text-[9px] font-mono font-bold text-[#0eb02c] uppercase tracking-wider">
                AVOIDED DEBT
              </span>
              <strong className="font-mono text-sm text-[#0eb02c]">
                ₦0
              </strong>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

        {/* 2. Cash Flow Basics: Where Your Money Goes (Screenshot 2) */}
        <section id="cash-flow-section" className="scroll-mt-24 space-y-8">
          <div className="mx-auto max-w-2xl space-y-2 text-center">
            <p className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#0922b0]">
              CASH FLOW BASICS
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1a1919] tracking-tight">
              Where Your Money Goes
            </h2>
            <p className="text-sm sm:text-base text-[#1a1919]/70 leading-relaxed font-medium">
              Know what comes in, what goes out, and what deserves priority.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Money In Card */}
            <div className="bg-white rounded-3xl border border-[#dedede] p-6 sm:p-8 shadow-sm space-y-5">
              <div>
                <h3 className="text-xl font-bold text-[#1a1919]">Money In</h3>
                <p className="mt-1 text-xs text-[#1a1919]/60 font-medium">Common income sources</p>
              </div>

              <div className="space-y-3">
                {[
                  "Family allowances",
                  "Freelance and side gigs",
                  "Gifts and windfalls",
                  "Scholarships and stipends"
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-[#dedede]/80 bg-[#fbfbfb] p-4 text-xs font-semibold text-[#1a1919] hover:border-[#0922b0]/40 hover:bg-white transition-all shadow-xs"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Money Out Card */}
            <div className="bg-white rounded-3xl border border-[#dedede] p-6 sm:p-8 shadow-sm space-y-5">
              <div>
                <h3 className="text-xl font-bold text-[#1a1919]">Money Out</h3>
                <p className="mt-1 text-xs text-[#1a1919]/60 font-medium">Give each expense a priority</p>
              </div>

              <div className="space-y-3">
                {[
                  "Needs: food, housing, transport",
                  "Savings: emergency buffer",
                  "Growth: school and useful tools",
                  "Wants: entertainment and outings"
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-[#dedede]/80 bg-[#fbfbfb] p-4 text-xs font-semibold text-[#1a1919] hover:border-[#0eb02c]/40 hover:bg-white transition-all shadow-xs"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 3. Three Core Inflow & Outflow Pillars */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#dedede] shadow-sm space-y-4 hover:border-[#0922b0]/40 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-[#0922b0]/10 text-[#0922b0] flex items-center justify-center font-bold">
              <DollarSign className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#1a1919]">1. Income & Inflows</h3>
            <p className="text-xs text-[#1a1919]/70 leading-relaxed font-medium">
              All cash entering your accounts: monthly student allowance, scholarships, side gigs, internships, or campus stipends.
            </p>
            <div className="p-3 rounded-xl bg-[#f7f7f5] text-[11px] font-mono text-[#1a1919]/80 border border-[#dedede]/60">
              Rule: Always calculate net take-home cash, not gross promises.
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#dedede] shadow-sm space-y-4 hover:border-[#0eb02c]/40 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-[#0eb02c]/10 text-[#0eb02c] flex items-center justify-center font-bold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#1a1919]">2. Fixed vs Variable Outlays</h3>
            <p className="text-xs text-[#1a1919]/70 leading-relaxed font-medium">
              <strong>Fixed:</strong> Rent and Wi-Fi that stay predictable. <br />
              <strong>Variable:</strong> Groceries and transit that fluctuate weekly based on habits.
            </p>
            <div className="p-3 rounded-xl bg-[#f7f7f5] text-[11px] font-mono text-[#1a1919]/80 border border-[#dedede]/60">
              Tip: Lock in fixed costs on day one of the month.
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#dedede] shadow-sm space-y-4 hover:border-[#d12828]/40 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-[#d12828]/10 text-[#d12828] flex items-center justify-center font-bold">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#1a1919]">3. The Safety Cushion</h3>
            <p className="text-xs text-[#1a1919]/70 leading-relaxed font-medium">
              Setting aside 10%–20% creates an emergency buffer that stops unexpected laptop repairs or medical fees from causing compounding debt.
            </p>
            <div className="p-3 rounded-xl bg-[#f7f7f5] text-[11px] font-mono text-[#1a1919]/80 border border-[#dedede]/60">
              Target: Reach a 1-month living buffer by mid-semester.
            </div>
          </div>
        </section>

        {/* 4. Interactive Quick Outflow Classifier */}
        <section id="classifier-section" className="bg-white rounded-3xl p-6 sm:p-8 border border-[#dedede] shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#0922b0]">
                INTERACTIVE TOOL
              </p>
              <h3 className="mt-1 text-xl font-bold text-[#1a1919]">Quick Outflow Classifier</h3>
              <p className="mt-1 text-xs text-[#1a1919]/60 font-medium">
                Select an expense to inspect its classification and decision rule.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {[
                { key: "groceries", label: "Groceries" },
                { key: "delivery", label: "Food Delivery" },
                { key: "antibiotics", label: "Medicine" },
                { key: "sneakers", label: "Sneakers" },
              ].map((item) => (
                <button
                  key={item.key}
                  onClick={() => setActiveClassifier(item.key)}
                  className={`rounded-xl px-3.5 py-2 text-xs font-semibold transition cursor-pointer ${
                    activeClassifier === item.key
                      ? "bg-[#1a1919] text-white shadow-xs"
                      : "bg-[#f7f7f5] text-[#1a1919]/80 hover:bg-slate-200 border border-[#dedede]/60"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Classification", currentClassData.cls],
              ["Postponability", currentClassData.postpone],
              ["Free Substitute", currentClassData.sub],
              ["Action", currentClassData.act],
            ].map(([label, value]) => (
              <div
                key={label}
                className="rounded-2xl border border-[#dedede]/60 bg-[#f7f7f5] p-4 space-y-1"
              >
                <span className="block text-[10px] font-mono font-bold uppercase text-[#1a1919]/50">
                  {label}
                </span>
                <strong className="block text-sm text-[#1a1919]">
                  {value}
                </strong>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Sample Student Monthly Cash Flow Model */}
        <section id="baseline-section" className="bg-white rounded-3xl p-6 sm:p-8 border border-[#dedede] shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#dedede]">
            <div>
              <h2 className="text-xl font-bold text-[#1a1919]">Sample Student Monthly Budget Baseline</h2>
              <p className="text-xs text-[#1a1919]/60 font-mono">Standard Undergraduate Allocation Model ({currentCurrency.code})</p>
            </div>
            <span className="px-3 py-1 rounded-full bg-[#edf9ef] text-[#0eb02c] text-xs font-bold font-mono border border-[#0eb02c]/20 self-start sm:self-auto">
              Balanced Runway
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-[#0922b0]/5 border border-[#0922b0]/20 space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-bold text-sm text-[#0922b0]">Essential Needs</span>
                <span className="font-mono text-xs font-bold text-[#0922b0]">50%</span>
              </div>
              <ul className="text-xs space-y-2 text-[#1a1919]/75 font-medium">
                <li className="flex justify-between"><span>Dorm / Rent Share</span><span className="font-mono">{currentCurrency.symbol}500</span></li>
                <li className="flex justify-between"><span>Basic Groceries</span><span className="font-mono">{currentCurrency.symbol}150</span></li>
                <li className="flex justify-between"><span>Campus Transit & Wi-Fi</span><span className="font-mono">{currentCurrency.symbol}50</span></li>
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-[#d12828]/5 border border-[#d12828]/20 space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-bold text-sm text-[#d12828]">Wants & Lifestyle</span>
                <span className="font-mono text-xs font-bold text-[#d12828]">30%</span>
              </div>
              <ul className="text-xs space-y-2 text-[#1a1919]/75 font-medium">
                <li className="flex justify-between"><span>Weekend Dining & Coffee</span><span className="font-mono">{currentCurrency.symbol}180</span></li>
                <li className="flex justify-between"><span>Music & Streaming Apps</span><span className="font-mono">{currentCurrency.symbol}40</span></li>
                <li className="flex justify-between"><span>Hobbies & Recreation</span><span className="font-mono">{currentCurrency.symbol}80</span></li>
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-[#0eb02c]/5 border border-[#0eb02c]/20 space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-bold text-sm text-[#0eb02c]">Emergency Reserve</span>
                <span className="font-mono text-xs font-bold text-[#0eb02c]">20%</span>
              </div>
              <ul className="text-xs space-y-2 text-[#1a1919]/75 font-medium">
                <li className="flex justify-between"><span>$500 Buffer Fund Deposit</span><span className="font-mono">{currentCurrency.symbol}150</span></li>
                <li className="flex justify-between"><span>Tech / Textbook Fund</span><span className="font-mono">{currentCurrency.symbol}50</span></li>
                <li className="flex justify-between"><span>Total Saved / Month</span><span className="font-mono font-bold text-[#0eb02c]">{currentCurrency.symbol}200</span></li>
              </ul>
            </div>
          </div>
        </section>

        {/* 6. Interactive Knowledge Check */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-[#dedede] shadow-sm space-y-6">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#0922b0]/10 text-[#0922b0] flex items-center justify-center font-bold">
              <HelpCircle className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-base text-[#1a1919]">Interactive Knowledge Check</h3>
              <p className="text-xs text-[#1a1919]/60 font-mono">Test your classification instinct</p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#f7f7f5] border border-[#dedede] space-y-4">
            <p className="text-sm font-semibold text-[#1a1919]">{quizQuestion.question}</p>
            <div className="space-y-2.5">
              {quizQuestion.options.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleQuizSelect(option.id)}
                  className={`w-full p-4 rounded-xl text-xs font-bold text-left transition-all flex items-center justify-between cursor-pointer ${
                    selectedAnswer === option.id
                      ? option.isCorrect
                        ? 'bg-[#0eb02c] text-white shadow-sm'
                        : 'bg-[#d12828] text-white shadow-sm'
                      : 'bg-white hover:bg-slate-100 text-[#1a1919] border border-[#dedede]'
                  }`}
                >
                  <span>{option.text}</span>
                  {selectedAnswer === option.id && (
                    <span>{option.isCorrect ? '✓ Correct' : '✕ Try Again'}</span>
                  )}
                </button>
              ))}
            </div>

            {quizSubmitted && selectedAnswer !== null && (
              <div className="p-3.5 rounded-xl bg-white border border-[#dedede] text-xs text-[#1a1919]/80 animate-in fade-in">
                <strong>Explanation: </strong> {quizQuestion.options[selectedAnswer].explanation}
              </div>
            )}
          </div>

          <div className="pt-2 flex flex-col sm:flex-row justify-between items-center gap-4">
            <button
              onClick={() => onNavigateToNeedsVsWants && onNavigateToNeedsVsWants()}
              className="px-6 py-3 rounded-xl bg-[#1a1919] hover:bg-black text-white text-xs font-bold flex items-center gap-2 shadow-sm transition-all cursor-pointer w-full sm:w-auto justify-center"
            >
              <Sparkles className="w-4 h-4 text-[#0eb02c]" />
              <span>Launch 30-Card Decision Engine</span>
            </button>

            <button
              onClick={onNavigateToPractice}
              className="px-6 py-3 rounded-xl bg-[#0922b0] hover:bg-[#071a8a] text-white text-xs font-bold flex items-center gap-2 shadow-md transition-all cursor-pointer w-full sm:w-auto justify-center"
            >
              <span>Next: Try the 50/30/20 Studio</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </section>

      </main>
    </div>
  );
};
