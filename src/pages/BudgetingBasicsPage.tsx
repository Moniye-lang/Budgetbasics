import React, { useState } from 'react';
import { 
  BookOpen, 
  DollarSign, 
  HelpCircle, 
  ArrowRight, 
  ShieldCheck, 
  TrendingUp
} from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';

interface BudgetingBasicsPageProps {
  onBackToHome?: () => void;
  onNavigateToPractice?: () => void;
}

export const BudgetingBasicsPage: React.FC<BudgetingBasicsPageProps> = ({
  onNavigateToPractice
}) => {
  const { currentCurrency } = useCurrency();
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);

  const quizQuestion = {
    question: "You receive your monthly allowance of $1,000. Your rent share is $450 and basic groceries are $150. Which category does this $600 belong to?",
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

  return (
    <div className="min-h-screen bg-[#f0f0f0] text-[#1a1919] font-sans antialiased pb-24 relative">
      
      {/* Sub-Header Breadcrumb */}
      <div className="border-b border-[#1a1919]/8 bg-white/70 backdrop-blur-md sticky top-[68px] z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono font-bold uppercase text-[#0922b0] bg-[#0922b0]/10 px-2.5 py-1 rounded-lg border border-[#0922b0]/20">
              01 · Learn Module
            </span>
            <span className="text-xs text-[#1a1919]/60 font-medium">
              / Budgeting Basics & Cash Flow Blueprint
            </span>
          </div>
          <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#0922b0] bg-white px-3 py-1.5 rounded-xl border border-[#1a1919]/10 shadow-xs">
            FOUNDATION GUIDE
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-12">
        
        {/* 1. Hero Introduction */}
        <section className="bg-white rounded-3xl p-8 sm:p-10 border border-[#1a1919]/10 shadow-sm relative overflow-hidden">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0922b0]/10 border border-[#0922b0]/20 text-xs font-mono font-bold text-[#0922b0]">
              <BookOpen className="w-3.5 h-3.5" />
              <span>CORE PRINCIPLES</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-[#1a1919] leading-tight">
              Mastering the <span className="text-[#0922b0]">Basics of Budgeting</span>
            </h1>
            <p className="text-sm sm:text-base text-[#1a1919]/75 leading-relaxed font-medium">
              A budget is not a restriction on your freedom — it is an intentional plan that gives every dollar or naira a job before the semester starts.
            </p>
          </div>
        </section>

        {/* 2. Three Core Inflow & Outflow Pillars */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#1a1919]/10 shadow-xs space-y-4 hover:border-[#0922b0]/40 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-[#0922b0]/10 text-[#0922b0] flex items-center justify-center font-bold">
              <DollarSign className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#1a1919]">1. Income & Inflows</h3>
            <p className="text-xs text-[#1a1919]/70 leading-relaxed">
              All money entering your checking account: monthly student allowance, scholarships, part-time jobs, internships, or campus stipends.
            </p>
            <div className="p-3 rounded-xl bg-[#f0f0f0] text-[11px] font-mono text-[#1a1919]/80">
              Rule: Always calculate net take-home cash, not gross promises.
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#1a1919]/10 shadow-xs space-y-4 hover:border-[#0eb02c]/40 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-[#0eb02c]/10 text-[#0eb02c] flex items-center justify-center font-bold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#1a1919]">2. Fixed vs Variable Outlays</h3>
            <p className="text-xs text-[#1a1919]/70 leading-relaxed">
              <strong>Fixed:</strong> Rent and Wi-Fi that stay predictable. <br />
              <strong>Variable:</strong> Groceries and transit that fluctuate weekly based on habits.
            </p>
            <div className="p-3 rounded-xl bg-[#f0f0f0] text-[11px] font-mono text-[#1a1919]/80">
              Tip: Lock in fixed costs on day one of the month.
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#1a1919]/10 shadow-xs space-y-4 hover:border-[#d12828]/40 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-[#d12828]/10 text-[#d12828] flex items-center justify-center font-bold">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#1a1919]">3. The $500 Safety Cushion</h3>
            <p className="text-xs text-[#1a1919]/70 leading-relaxed">
              Setting aside even 10%–20% creates an emergency buffer that stops unexpected laptop repairs or medical fees from causing compounding debt.
            </p>
            <div className="p-3 rounded-xl bg-[#f0f0f0] text-[11px] font-mono text-[#1a1919]/80">
              Target: Reach a 1-month living buffer by mid-semester.
            </div>
          </div>
        </section>

        {/* 3. Sample Student Monthly Cash Flow Model */}
        <section className="bg-white rounded-3xl p-8 border border-[#1a1919]/10 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#1a1919]/10">
            <div>
              <h2 className="text-xl font-bold text-[#1a1919]">Sample Student Monthly Budget Baseline</h2>
              <p className="text-xs text-[#1a1919]/60 font-mono">Standard Undergraduate Allocation Model ({currentCurrency.code})</p>
            </div>
            <span className="px-3 py-1 rounded-full bg-[#0eb02c]/10 text-[#0eb02c] text-xs font-bold font-mono">
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

        {/* 4. Interactive Knowledge Check */}
        <section className="bg-white rounded-3xl p-8 border border-[#1a1919]/10 shadow-sm space-y-6">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#0922b0]/10 text-[#0922b0] flex items-center justify-center font-bold">
              <HelpCircle className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-base text-[#1a1919]">Interactive Knowledge Check</h3>
              <p className="text-xs text-[#1a1919]/60 font-mono">Test your classification instinct</p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#f0f0f0] border border-[#1a1919]/10 space-y-4">
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
                      : 'bg-white hover:bg-slate-100 text-[#1a1919] border border-[#1a1919]/10'
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
              <div className="p-3.5 rounded-xl bg-white border border-[#1a1919]/10 text-xs text-[#1a1919]/80 animate-in fade-in">
                <strong>Explanation: </strong> {quizQuestion.options[selectedAnswer].explanation}
              </div>
            )}
          </div>

          <div className="pt-2 flex justify-end">
            <button
              onClick={onNavigateToPractice}
              className="px-6 py-3 rounded-xl bg-[#0922b0] hover:bg-[#071a8a] text-white text-xs font-bold flex items-center gap-2 shadow-md transition-all cursor-pointer"
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
