import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowRight, 
  RotateCcw, 
  ChevronRight
} from 'lucide-react';
import { DotLottiePlayer } from './DotLottiePlayer';
import { learnBooksLottieJson } from '../data/learnLottie';
import { 
  allChallenges, 
  classifierDatabase, 
  rotatingTips,
  DecisionChallenge
} from '../data/decisionDeckData';

interface HistoryMove {
  index: number;
  wasSmart: boolean;
  impact: number;
  direction: 'right' | 'left' | 'skip';
  skipped?: boolean;
}

interface Bubble {
  id: number;
  size: number;
  left: number;
  duration: number;
}

export const LearnBudgetingSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Deck state
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [filteredDeck, setFilteredDeck] = useState<DecisionChallenge[]>(allChallenges);
  const [currentCardIndex, setCurrentCardIndex] = useState<number>(0);
  const [userScore, setUserScore] = useState<number>(0);
  const [ledgerBalance, setLedgerBalance] = useState<number>(50000);
  const [totalAvoidedDebt, setTotalAvoidedDebt] = useState<number>(0);
  const [historyStack, setHistoryStack] = useState<HistoryMove[]>([]);

  // Card animation state
  const [cardAnimations, setCardAnimations] = useState<Record<number, string>>({});

  // Modal feedback popup state
  const [popupData, setPopupData] = useState<{
    isOpen: boolean;
    isSmart: boolean;
    isFinal?: boolean;
    title: string;
    message: string;
    impactText: string;
    icon: string;
  }>({
    isOpen: false,
    isSmart: true,
    title: '',
    message: '',
    impactText: '',
    icon: '🛡️'
  });

  // Classifier state
  const [activeClassifier, setActiveClassifier] = useState<string>('groceries');

  // Floating tips state
  const [tipIndex, setTipIndex] = useState(0);
  const [isTipVisible, setIsTipVisible] = useState(true);
  const [tipOpacity, setTipOpacity] = useState(1);

  // Bubbles celebration state
  const [bubbles, setBubbles] = useState<Bubble[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.12 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Filter category handler
  const handleFilterCategory = (cat: string) => {
    setSelectedCategory(cat);
    if (cat === 'all') {
      setFilteredDeck(allChallenges);
    } else {
      setFilteredDeck(allChallenges.filter(item => item.category === cat));
    }
    setCurrentCardIndex(0);
    setCardAnimations({});
  };

  // Rotating tips timer
  useEffect(() => {
    const interval = setInterval(() => {
      setTipOpacity(0);
      setTimeout(() => {
        setTipIndex((prev) => (prev + 1) % rotatingTips.length);
        setTipOpacity(1);
      }, 250);
    }, 5500);

    return () => clearInterval(interval);
  }, []);

  // Spawn bubbles function
  const triggerBubbles = (amount: number = 25) => {
    const newBubbles: Bubble[] = Array.from({ length: amount }, (_, i) => ({
      id: Date.now() + i,
      size: Math.random() * 30 + 12,
      left: Math.random() * 95,
      duration: Math.random() * 2.5 + 2.5
    }));

    setBubbles((prev) => [...prev, ...newBubbles]);
    setTimeout(() => {
      setBubbles((prev) => prev.filter((b) => !newBubbles.some((nb) => nb.id === b.id)));
    }, 5500);
  };

  // Decision click handler
  const handleDecision = (index: number, optionIndex: number) => {
    const cardData = filteredDeck[index];
    if (!cardData) return;

    const chosen = cardData.options[optionIndex];
    const isSmart = (chosen.type === 'smart');

    if (isSmart) {
      setUserScore(prev => prev + 1);
      const otherImpact = Math.abs(cardData.options[1 - optionIndex].impact || 4000);
      setTotalAvoidedDebt(prev => prev + otherImpact);
      setLedgerBalance(prev => prev + 2000);
      setCardAnimations(prev => ({ ...prev, [index]: 'slide-out-right' }));
      triggerBubbles(20);
    } else {
      setLedgerBalance(prev => Math.max(8000, prev - 3500));
      setCardAnimations(prev => ({ ...prev, [index]: 'slide-out-left' }));
    }

    const move: HistoryMove = {
      index,
      wasSmart: isSmart,
      impact: chosen.impact,
      direction: isSmart ? 'right' : 'left'
    };
    setHistoryStack(prev => [...prev, move]);

    setTimeout(() => {
      if (isSmart) {
        setPopupData({
          isOpen: true,
          isSmart: true,
          title: 'Disciplined Move!',
          message: cardData.smartFeedback,
          impactText: 'RUNWAY BENEFIT: +₦2,000 preserved in active reserve',
          icon: '🛡️'
        });
      } else {
        setPopupData({
          isOpen: true,
          isSmart: false,
          title: 'Opportunity Cost Incurred',
          message: cardData.wantFeedback,
          impactText: 'OPPORTUNITY COST: -₦3,500 displaced from monthly runway',
          icon: '💡'
        });
      }
    }, 220);
  };

  // Skip card handler
  const handleSkipCard = () => {
    if (currentCardIndex >= filteredDeck.length - 1) return;
    setCardAnimations(prev => ({ ...prev, [currentCardIndex]: 'slide-out-skip' }));
    
    setHistoryStack(prev => [
      ...prev,
      {
        index: currentCardIndex,
        wasSmart: false,
        skipped: true,
        direction: 'skip',
        impact: 0
      }
    ]);

    setTimeout(() => {
      setCurrentCardIndex(prev => prev + 1);
    }, 250);
  };

  // Undo card handler
  const handleUndoCard = () => {
    if (currentCardIndex <= 0 || historyStack.length === 0) return;

    const newStack = [...historyStack];
    const lastMove = newStack.pop();

    if (lastMove) {
      if (lastMove.wasSmart) {
        setUserScore(prev => Math.max(0, prev - 1));
        setLedgerBalance(prev => prev - 2000);
      } else if (!lastMove.skipped) {
        setLedgerBalance(prev => prev + 3500);
      }

      const prevIdx = currentCardIndex - 1;
      let reverseClass = 'slide-in-right-reverse';
      if (lastMove.direction === 'left') {
        reverseClass = 'slide-in-left-reverse';
      } else if (lastMove.direction === 'skip') {
        reverseClass = 'slide-in-skip-reverse';
      }

      setCardAnimations(prev => ({ ...prev, [prevIdx]: reverseClass }));
      setCurrentCardIndex(prevIdx);
      setHistoryStack(newStack);

      setTimeout(() => {
        setCardAnimations(prev => {
          const copy = { ...prev };
          delete copy[prevIdx];
          return copy;
        });
      }, 500);
    }
  };

  // Close popup modal handler
  const handleClosePopup = () => {
    setPopupData(prev => ({ ...prev, isOpen: false }));
    const nextIdx = currentCardIndex + 1;

    if (nextIdx >= filteredDeck.length) {
      // Final celebration
      setPopupData({
        isOpen: true,
        isSmart: true,
        isFinal: true,
        title: 'Simulation Complete!',
        message: `You finished the decision challenges with ${userScore} disciplined allocations! You protected approximately ₦${totalAvoidedDebt.toLocaleString()} in capital.`,
        impactText: `FINAL RUNWAY: ${(ledgerBalance / 13000).toFixed(1)} Months of living security`,
        icon: '🏆'
      });
      triggerBubbles(45);
    } else {
      setCurrentCardIndex(nextIdx);
    }
  };

  // Calculated ledger metrics
  const runwayMonths = (ledgerBalance / 13000).toFixed(1);
  const needsAmount = Math.round(ledgerBalance * 0.64);
  const growthAmount = Math.round(ledgerBalance * 0.22);
  const savingsAmount = Math.max(0, ledgerBalance - needsAmount - growthAmount);
  const curDisplay = Math.min(currentCardIndex + 1, filteredDeck.length);
  const progressPct = filteredDeck.length ? (curDisplay / filteredDeck.length) * 100 : 0;

  const currentClassData = classifierDatabase[activeClassifier] || classifierDatabase.groceries;

  return (
    <section 
      ref={sectionRef}
      id="learn" 
      className="py-16 md:py-24 bg-[#f0f0f0] text-[#1a1919] relative overflow-hidden font-sans border-t border-[#1a1919]/10"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 -left-40 w-96 h-96 bg-[#0922b0]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-[#0eb02c]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Floating Bubbles Celebration Container */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-[450]">
        {bubbles.map((b) => (
          <div
            key={b.id}
            className="bubble"
            style={{
              width: `${b.size}px`,
              height: `${b.size}px`,
              left: `${b.left}%`,
              animationDuration: `${b.duration}s`
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-20">
        
        {/* ========================================================================= */}
        {/* 1. TOP EDITORIAL HERO SPLIT & LIVE CAPITAL RUNWAY LEDGER */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Bold Headline & Editorial Framework */}
          <div className="lg:col-span-6 space-y-6 flex flex-col justify-center">
            
            {/* Eyebrow Pill with Animated Lottie Book */}
            <div 
              className={`inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#0eb02c]/10 border border-[#0eb02c]/30 text-xs font-bold text-[#0eb02c] shadow-xs self-start transition-all duration-700 ${
                isVisible ? 'animate-slide-in-left' : 'opacity-0'
              }`}
            >
              <div className="w-5 h-5 flex items-center justify-center shrink-0">
                <DotLottiePlayer
                  animationData={learnBooksLottieJson}
                  src="/learn-books-lottie.json"
                  className="w-full h-full object-contain"
                />
              </div>
              <span>01 · LEARN BUDGETING & CAPITAL DECISIONS</span>
            </div>

            <h2 
              className={`text-4xl sm:text-5xl xl:text-[54px] font-black tracking-tight text-[#1a1919] leading-[1.04] transition-all duration-700 ${
                isVisible ? 'animate-slide-in-left' : 'opacity-0'
              }`}
              style={{ animationDelay: '0.08s' }}
            >
              Small decisions. <br />
              <span className="font-serif italic font-normal text-3xl sm:text-5xl xl:text-[50px] text-[#0eb02c] block mt-1">
                Unshakable money habits.
              </span>
            </h2>

            <p 
              className={`text-sm sm:text-base text-[#1a1919]/85 font-medium leading-relaxed max-w-lg transition-all duration-700 ${
                isVisible ? 'animate-slide-in-left' : 'opacity-0'
              }`}
              style={{ animationDelay: '0.15s' }}
            >
              BudgetBasics helps students and early earners master exactly <strong>where money comes from</strong>, <strong>how it gets spent</strong>, and how simple pauses build resilient financial runway without complex spreadsheet formulas.
            </p>

            <div 
              className={`flex flex-wrap gap-3 pt-2 transition-all duration-700 ${
                isVisible ? 'animate-slide-in-left' : 'opacity-0'
              }`}
              style={{ animationDelay: '0.22s' }}
            >
              <a
                href="#challenge"
                className="px-5 py-3 rounded-2xl bg-[#1a1919] hover:bg-black text-white text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-sm transition-all hover:scale-[1.02] active:scale-95"
              >
                <span>Launch Decision Deck (1/30)</span>
                <ArrowRight className="w-4 h-4 text-[#0eb02c]" />
              </a>

              <a
                href="#needs-wants"
                className="px-5 py-3 rounded-2xl bg-white hover:bg-slate-100 text-[#1a1919] border border-[#1a1919]/15 text-xs sm:text-sm font-semibold transition-all hover:scale-[1.02] active:scale-95"
              >
                Inspect Needs vs Wants Matrix
              </a>
            </div>
          </div>

          {/* Right Column: Live Interactive Ledger Card */}
          <div className="lg:col-span-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#1a1919]/10 shadow-xl space-y-6 hover:border-[#0922b0]/30 transition-all">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-[11px] font-mono tracking-wider uppercase text-[#1a1919]/60 font-semibold">Active Survival Runway</p>
                  <div className="flex items-baseline gap-2.5 mt-1">
                    <span className="text-3xl sm:text-4xl font-black font-mono text-[#1a1919]">₦{ledgerBalance.toLocaleString()}</span>
                    <span className="text-xs text-[#0eb02c] font-bold bg-[#0eb02c]/10 px-2.5 py-0.5 rounded-full border border-[#0eb02c]/20">
                      {runwayMonths} Mo Safe Reserve
                    </span>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-2xl bg-[#0922b0]/10 border border-[#0922b0]/20 flex items-center justify-center font-bold text-[#0922b0] font-mono text-base">
                  ₦
                </div>
              </div>

              {/* Live Allocation Split Progress Bars */}
              <div className="space-y-4 font-mono text-xs">
                <div>
                  <div className="flex justify-between text-[#1a1919]/80 font-sans mb-1.5 font-medium">
                    <span>Non-Negotiable Needs (64%)</span>
                    <span className="font-bold text-[#1a1919]">₦{needsAmount.toLocaleString()}</span>
                  </div>
                  <div className="h-2.5 rounded-full bg-slate-100 overflow-hidden">
                    <div className="h-full bg-[#1a1919] rounded-full transition-all duration-300" style={{ width: '64%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[#1a1919]/80 font-sans mb-1.5 font-medium">
                    <span>Human Capital & School (22%)</span>
                    <span className="font-bold text-[#0922b0]">₦{growthAmount.toLocaleString()}</span>
                  </div>
                  <div className="h-2.5 rounded-full bg-slate-100 overflow-hidden">
                    <div className="h-full bg-[#0922b0] rounded-full transition-all duration-300" style={{ width: '22%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[#1a1919]/80 font-sans mb-1.5 font-medium">
                    <span>Liquid Buffer & Savings (14%)</span>
                    <span className="font-bold text-[#0eb02c]">₦{savingsAmount.toLocaleString()}</span>
                  </div>
                  <div className="h-2.5 rounded-full bg-slate-100 overflow-hidden">
                    <div className="h-full bg-[#0eb02c] rounded-full transition-all duration-300" style={{ width: '14%' }} />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#1a1919]/10 grid grid-cols-2 gap-3 text-center text-xs">
                <div className="p-3 rounded-2xl bg-[#f0f0f0] border border-[#1a1919]/5">
                  <span className="text-[#1a1919]/60 block text-[10px] font-mono font-bold">HABIT DEFENSE RATIO</span>
                  <strong className="text-[#1a1919] font-mono text-sm">88.4%</strong>
                </div>
                <div className="p-3 rounded-2xl bg-[#0eb02c]/5 border border-[#0eb02c]/20">
                  <span className="text-[#0eb02c] block text-[10px] font-mono font-bold">AVOIDED IMPULSE DEBT</span>
                  <strong className="text-[#0eb02c] font-mono text-sm">₦{totalAvoidedDebt.toLocaleString()}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. THE CASH FLOW ANATOMY: WHERE MONEY COMES FROM & GOES */}
        {/* ========================================================================= */}
        <div id="inflow-outflow" className="scroll-mt-24 space-y-8">
          <div className="max-w-2xl mx-auto text-center space-y-2">
            <p className="text-xs font-mono font-bold tracking-widest text-[#0922b0] uppercase">The Cash Flow Anatomy</p>
            <h3 className="text-3xl md:text-4xl font-extrabold text-[#1a1919]">Where Money Comes From & Goes</h3>
            <p className="text-xs sm:text-sm text-[#1a1919]/70 leading-relaxed">
              Financial literacy begins by understanding inflows and outflows. Without an intentional distribution plan, allowances evaporate into hidden leaks.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-stretch">
            {/* Inflow Panel */}
            <div className="bg-gradient-to-br from-white to-blue-50/40 rounded-3xl p-6 sm:p-8 border border-blue-100 shadow-sm space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-blue-100 text-[#0922b0] flex items-center justify-center font-bold text-lg">
                  ↓
                </div>
                <div>
                  <h4 className="text-lg font-bold text-[#1a1919]">Inflows (Sources of Capital)</h4>
                  <span className="text-xs text-[#1a1919]/60 font-medium">How money arrives in your life</span>
                </div>
              </div>

              <ul className="space-y-3 text-xs font-medium text-[#1a1919]/80">
                <li className="p-3.5 rounded-2xl bg-white border border-slate-200/80 flex items-center justify-between shadow-xs">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500" />
                    Family & Monthly Allowances
                  </span>
                  <span className="font-mono text-[#1a1919]/50">Regular / Predictable</span>
                </li>
                <li className="p-3.5 rounded-2xl bg-white border border-slate-200/80 flex items-center justify-between shadow-xs">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#0eb02c]" />
                    Side Gigs & Freelance Tutoring
                  </span>
                  <span className="font-mono text-[#1a1919]/50">Earned / Elastic</span>
                </li>
                <li className="p-3.5 rounded-2xl bg-white border border-slate-200/80 flex items-center justify-between shadow-xs">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                    Occasional Windfalls & Gifts
                  </span>
                  <span className="font-mono text-[#1a1919]/50">Unplanned / One-Off</span>
                </li>
                <li className="p-3.5 rounded-2xl bg-white border border-slate-200/80 flex items-center justify-between shadow-xs">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-purple-500" />
                    Academic Bursaries & Stipends
                  </span>
                  <span className="font-mono text-[#1a1919]/50">Restricted Use</span>
                </li>
              </ul>
            </div>

            {/* Outflow Allocation Panel */}
            <div className="bg-gradient-to-br from-white to-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-[#0eb02c] flex items-center justify-center font-bold text-lg">
                  ↑
                </div>
                <div>
                  <h4 className="text-lg font-bold text-[#1a1919]">Outflows (Capital Deployment)</h4>
                  <span className="text-xs text-[#1a1919]/60 font-medium">The intentional distribution architecture</span>
                </div>
              </div>

              <ul className="space-y-3 text-xs font-medium text-[#1a1919]/80">
                <li className="p-3.5 rounded-2xl bg-white border border-slate-200/80 flex items-center justify-between shadow-xs">
                  <div>
                    <span className="font-bold text-[#1a1919] block">Stage 1: Non-Negotiables (50–60%)</span>
                    <span className="text-[#1a1919]/60">Food, transport, course supplies, housing</span>
                  </div>
                  <span className="font-mono text-[#0eb02c] font-bold">1st Priority</span>
                </li>
                <li className="p-3.5 rounded-2xl bg-white border border-slate-200/80 flex items-center justify-between shadow-xs">
                  <div>
                    <span className="font-bold text-[#1a1919] block">Stage 2: Pay Yourself First (15–20%)</span>
                    <span className="text-[#1a1919]/60">Emergency buffer, savings vaults, tools</span>
                  </div>
                  <span className="font-mono text-[#0922b0] font-bold">2nd Priority</span>
                </li>
                <li className="p-3.5 rounded-2xl bg-white border border-slate-200/80 flex items-center justify-between shadow-xs">
                  <div>
                    <span className="font-bold text-[#1a1919] block">Stage 3: Elastic Recreation (20–30%)</span>
                    <span className="text-[#1a1919]/60">Eating out, entertainment, fashion items</span>
                  </div>
                  <span className="font-mono text-amber-600 font-bold">Safe Discretionary</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 3. EXPANDED TABULAR NEEDS VS WANTS COMPARISON MATRIX */}
        {/* ========================================================================= */}
        <div id="needs-wants" className="scroll-mt-24 space-y-8">
          <div className="max-w-2xl mx-auto text-center space-y-2">
            <p className="text-xs font-mono font-bold tracking-widest text-[#0eb02c] uppercase">Analytical Taxonomy</p>
            <h3 className="text-3xl md:text-4xl font-extrabold text-[#1a1919]">Needs vs Wants Diagnostic Matrix</h3>
            <p className="text-xs sm:text-sm text-[#1a1919]/70 leading-relaxed">
              Benchmark every outflow against 14 behavioral criteria to eliminate financial leaks before authorizing any transaction.
            </p>
            <div className="inline-flex items-center gap-4 mt-3 px-4 py-1.5 rounded-full bg-white border border-[#1a1919]/10 text-xs font-mono text-[#1a1919]/70">
              <span className="flex items-center gap-1.5"><span className="w-5 h-5 rounded-full bg-emerald-100 text-[#0eb02c] inline-flex items-center justify-center font-bold text-xs">✓</span> Present / Active</span>
              <span className="text-slate-300">|</span>
              <span className="flex items-center gap-1.5"><span className="w-5 h-5 rounded-full bg-slate-100 text-slate-400 inline-flex items-center justify-center font-bold text-xs">∅</span> Null / Inapplicable</span>
            </div>
          </div>

          {/* 14-Row Comprehensive Table */}
          <div className="bg-white rounded-3xl border border-[#1a1919]/10 overflow-x-auto shadow-sm">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 font-mono text-[#1a1919]/70 uppercase text-[11px]">
                  <th className="py-3.5 px-4 font-bold">Evaluation Property</th>
                  <th className="py-3.5 px-4 font-bold text-center text-[#0eb02c] bg-emerald-50/50 w-44">Essential Needs</th>
                  <th className="py-3.5 px-4 font-bold text-center text-[#1a1919] bg-slate-100/50 w-44">Optional Wants</th>
                  <th className="py-3.5 px-4 font-bold">Diagnostic Evaluation Rule</th>
                  <th className="py-3.5 px-4 font-bold text-center w-36">Status Tier</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                <tr className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-[#1a1919] font-mono">1. Physiological Survival Support</td>
                  <td className="py-3.5 px-4 text-center bg-emerald-50/20">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-lg bg-emerald-100 text-[#0eb02c] font-bold">✓</span>
                  </td>
                  <td className="py-3.5 px-4 text-center bg-slate-50/30">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-lg bg-slate-100 text-slate-400 font-bold font-mono">∅</span>
                  </td>
                  <td className="py-3.5 px-4 text-[#1a1919]/75">Sustains baseline biological life, hydration, and safe lodging.</td>
                  <td className="py-3.5 px-4 text-center">
                    <span className="px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-800 font-mono font-bold text-[10px]">MANDATORY</span>
                  </td>
                </tr>

                <tr className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-[#1a1919] font-mono">2. 24-Hour Postponability</td>
                  <td className="py-3.5 px-4 text-center bg-emerald-50/20">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-lg bg-slate-100 text-slate-400 font-bold font-mono">∅</span>
                  </td>
                  <td className="py-3.5 px-4 text-center bg-slate-50/30">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-lg bg-emerald-100 text-[#0eb02c] font-bold">✓</span>
                  </td>
                  <td className="py-3.5 px-4 text-[#1a1919]/75">Can be delayed 24–48 hours without causing structural distress.</td>
                  <td className="py-3.5 px-4 text-center">
                    <span className="px-2.5 py-1 rounded-md bg-blue-100 text-[#0922b0] font-mono font-bold text-[10px]">FLEXIBLE</span>
                  </td>
                </tr>

                <tr className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-[#1a1919] font-mono">3. Structural Penalty on Omission</td>
                  <td className="py-3.5 px-4 text-center bg-emerald-50/20">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-lg bg-emerald-100 text-[#0eb02c] font-bold">✓</span>
                  </td>
                  <td className="py-3.5 px-4 text-center bg-slate-50/30">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-lg bg-slate-100 text-slate-400 font-bold font-mono">∅</span>
                  </td>
                  <td className="py-3.5 px-4 text-[#1a1919]/75">Failure to clear creates failed grades, legal penalties, or eviction.</td>
                  <td className="py-3.5 px-4 text-center">
                    <span className="px-2.5 py-1 rounded-md bg-rose-100 text-[#d12828] font-mono font-bold text-[10px]">CRITICAL</span>
                  </td>
                </tr>

                <tr className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-[#1a1919] font-mono">4. Debt Financing Eligibility</td>
                  <td className="py-3.5 px-4 text-center bg-emerald-50/20">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-lg bg-emerald-100 text-[#0eb02c] font-bold">✓</span>
                  </td>
                  <td className="py-3.5 px-4 text-center bg-slate-50/30">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-lg bg-slate-100 text-slate-400 font-bold font-mono">∅</span>
                  </td>
                  <td className="py-3.5 px-4 text-[#1a1919]/75">Permitted solely in verified health emergencies with confirmed repayment.</td>
                  <td className="py-3.5 px-4 text-center">
                    <span className="px-2.5 py-1 rounded-md bg-slate-200 text-slate-800 font-mono font-bold text-[10px]">RESTRICTED</span>
                  </td>
                </tr>

                <tr className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-[#1a1919] font-mono">5. Zero-Cost Free Substitutes Available</td>
                  <td className="py-3.5 px-4 text-center bg-emerald-50/20">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-lg bg-slate-100 text-slate-400 font-bold font-mono">∅</span>
                  </td>
                  <td className="py-3.5 px-4 text-center bg-slate-50/30">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-lg bg-emerald-100 text-[#0eb02c] font-bold">✓</span>
                  </td>
                  <td className="py-3.5 px-4 text-[#1a1919]/75">Borrowing event fits, using campus library books, public open Wi-Fi.</td>
                  <td className="py-3.5 px-4 text-center">
                    <span className="px-2.5 py-1 rounded-md bg-amber-100 text-amber-800 font-mono font-bold text-[10px]">SUBSTITUTABLE</span>
                  </td>
                </tr>

                <tr className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-[#1a1919] font-mono">6. Post-Purchase Buyer's Remorse Risk</td>
                  <td className="py-3.5 px-4 text-center bg-emerald-50/20">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-lg bg-slate-100 text-slate-400 font-bold font-mono">∅</span>
                  </td>
                  <td className="py-3.5 px-4 text-center bg-slate-50/30">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-lg bg-emerald-100 text-[#0eb02c] font-bold">✓</span>
                  </td>
                  <td className="py-3.5 px-4 text-[#1a1919]/75">High probability of regret once initial purchase excitement fades.</td>
                  <td className="py-3.5 px-4 text-center">
                    <span className="px-2.5 py-1 rounded-md bg-purple-100 text-purple-800 font-mono font-bold text-[10px]">BEHAVIORAL</span>
                  </td>
                </tr>

                <tr className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-[#1a1919] font-mono">7. Threatens Emergency Survival Buffer</td>
                  <td className="py-3.5 px-4 text-center bg-emerald-50/20">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-lg bg-slate-100 text-slate-400 font-bold font-mono">∅</span>
                  </td>
                  <td className="py-3.5 px-4 text-center bg-slate-50/30">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-lg bg-emerald-100 text-[#0eb02c] font-bold">✓</span>
                  </td>
                  <td className="py-3.5 px-4 text-[#1a1919]/75">Invades untouchable reserve capital to fund temporary desires.</td>
                  <td className="py-3.5 px-4 text-center">
                    <span className="px-2.5 py-1 rounded-md bg-rose-100 text-[#d12828] font-mono font-bold text-[10px]">HIGH RISK</span>
                  </td>
                </tr>

                <tr className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-[#1a1919] font-mono">8. Silent Recurring Subscription Risk</td>
                  <td className="py-3.5 px-4 text-center bg-emerald-50/20">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-lg bg-slate-100 text-slate-400 font-bold font-mono">∅</span>
                  </td>
                  <td className="py-3.5 px-4 text-center bg-slate-50/30">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-lg bg-emerald-100 text-[#0eb02c] font-bold">✓</span>
                  </td>
                  <td className="py-3.5 px-4 text-[#1a1919]/75">Unused entertainment and premium trials renewing in the background.</td>
                  <td className="py-3.5 px-4 text-center">
                    <span className="px-2.5 py-1 rounded-md bg-amber-100 text-amber-800 font-mono font-bold text-[10px]">LEAKAGE</span>
                  </td>
                </tr>

                <tr className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-[#1a1919] font-mono">9. Immediate Resale Depreciation</td>
                  <td className="py-3.5 px-4 text-center bg-emerald-50/20">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-lg bg-slate-100 text-slate-400 font-bold font-mono">∅</span>
                  </td>
                  <td className="py-3.5 px-4 text-center bg-slate-50/30">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-lg bg-emerald-100 text-[#0eb02c] font-bold">✓</span>
                  </td>
                  <td className="py-3.5 px-4 text-[#1a1919]/75">Loses 30–70% of market value immediately upon retail purchase.</td>
                  <td className="py-3.5 px-4 text-center">
                    <span className="px-2.5 py-1 rounded-md bg-slate-200 text-slate-800 font-mono font-bold text-[10px]">DEPRECIATES</span>
                  </td>
                </tr>

                <tr className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-[#1a1919] font-mono">10. Expands Future Earning Power</td>
                  <td className="py-3.5 px-4 text-center bg-emerald-50/20">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-lg bg-emerald-100 text-[#0eb02c] font-bold">✓</span>
                  </td>
                  <td className="py-3.5 px-4 text-center bg-slate-50/30">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-lg bg-slate-100 text-slate-400 font-bold font-mono">∅</span>
                  </td>
                  <td className="py-3.5 px-4 text-[#1a1919]/75">Productive tooling, skill workshops, core textbooks, study laptops.</td>
                  <td className="py-3.5 px-4 text-center">
                    <span className="px-2.5 py-1 rounded-md bg-blue-100 text-[#0922b0] font-mono font-bold text-[10px]">PRODUCTIVE</span>
                  </td>
                </tr>

                <tr className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-[#1a1919] font-mono">11. Driven by Peer Pressure / Validation</td>
                  <td className="py-3.5 px-4 text-center bg-emerald-50/20">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-lg bg-slate-100 text-slate-400 font-bold font-mono">∅</span>
                  </td>
                  <td className="py-3.5 px-4 text-center bg-slate-50/30">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-lg bg-emerald-100 text-[#0eb02c] font-bold">✓</span>
                  </td>
                  <td className="py-3.5 px-4 text-[#1a1919]/75">Purchasing to match peer lifestyle expectations or social media image.</td>
                  <td className="py-3.5 px-4 text-center">
                    <span className="px-2.5 py-1 rounded-md bg-purple-100 text-purple-800 font-mono font-bold text-[10px]">STATUS DEBT</span>
                  </td>
                </tr>

                <tr className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-[#1a1919] font-mono">12. Cost-Effective in Bulk Units</td>
                  <td className="py-3.5 px-4 text-center bg-emerald-50/20">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-lg bg-emerald-100 text-[#0eb02c] font-bold">✓</span>
                  </td>
                  <td className="py-3.5 px-4 text-center bg-slate-50/30">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-lg bg-slate-100 text-slate-400 font-bold font-mono">∅</span>
                  </td>
                  <td className="py-3.5 px-4 text-[#1a1919]/75">Non-perishable grains, toiletries, study stationery yield unit savings.</td>
                  <td className="py-3.5 px-4 text-center">
                    <span className="px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-800 font-mono font-bold text-[10px]">UNIT VALUE</span>
                  </td>
                </tr>

                <tr className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-[#1a1919] font-mono">13. Inelastic Demand Under Inflation</td>
                  <td className="py-3.5 px-4 text-center bg-emerald-50/20">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-lg bg-emerald-100 text-[#0eb02c] font-bold">✓</span>
                  </td>
                  <td className="py-3.5 px-4 text-center bg-slate-50/30">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-lg bg-slate-100 text-slate-400 font-bold font-mono">∅</span>
                  </td>
                  <td className="py-3.5 px-4 text-[#1a1919]/75">Must be procured regardless of price surges; demands strict budgeting.</td>
                  <td className="py-3.5 px-4 text-center">
                    <span className="px-2.5 py-1 rounded-md bg-rose-100 text-[#d12828] font-mono font-bold text-[10px]">INELASTIC</span>
                  </td>
                </tr>

                <tr className="hover:bg-slate-50/70 transition-colors bg-slate-50/60">
                  <td className="py-3.5 px-4 font-bold text-[#1a1919] font-mono">14. Direct Budget Allocation Target</td>
                  <td className="py-3.5 px-4 text-center bg-emerald-50/40">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-lg bg-emerald-100 text-[#0eb02c] font-bold">✓</span>
                  </td>
                  <td className="py-3.5 px-4 text-center bg-slate-100/50">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-lg bg-emerald-100 text-[#0eb02c] font-bold">✓</span>
                  </td>
                  <td className="py-3.5 px-4 text-[#1a1919]/75 font-mono text-[11px]">50–60% allocated to Needs; 15–20% max allocated to Wants.</td>
                  <td className="py-3.5 px-4 text-center">
                    <span className="px-2.5 py-1 rounded-md bg-slate-200 text-slate-800 font-mono font-bold text-[10px]">BALANCED</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Quick Outflow Diagnostic Classifier */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#1a1919]/10 shadow-sm space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-mono font-bold text-[#0922b0] uppercase tracking-widest block">Interactive Diagnostic Tool</span>
                <h4 className="text-xl font-bold text-[#1a1919] mt-1">Quick Outflow Classifier</h4>
                <p className="text-xs text-[#1a1919]/60 mt-1">Select any common student expenditure below to evaluate its diagnostic classification.</p>
              </div>
              <div className="flex flex-wrap gap-2 text-xs font-mono">
                {[
                  { key: 'groceries', label: 'Rice & Cooking Oil' },
                  { key: 'delivery', label: 'Fast Food Delivery' },
                  { key: 'antibiotics', label: 'Clinic Medicine' },
                  { key: 'sneakers', label: 'Novelty Sneakers' },
                ].map((item) => (
                  <button
                    key={item.key}
                    onClick={() => setActiveClassifier(item.key)}
                    className={`px-3 py-1.5 rounded-xl font-semibold transition-all ${
                      activeClassifier === item.key
                        ? 'bg-[#1a1919] text-white shadow-xs'
                        : 'bg-[#f0f0f0] hover:bg-slate-200 text-[#1a1919]/80'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid sm:grid-cols-4 gap-4 text-xs font-mono">
              <div className="p-4 rounded-2xl bg-[#f0f0f0]/60 border border-[#1a1919]/5">
                <span className="text-[#1a1919]/50 block text-[10px] uppercase font-bold">CLASSIFICATION</span>
                <strong className={`text-sm block mt-1 ${currentClassData.cls.includes('NEED') ? 'text-[#0eb02c]' : 'text-[#0922b0]'}`}>
                  {currentClassData.cls}
                </strong>
              </div>

              <div className="p-4 rounded-2xl bg-[#f0f0f0]/60 border border-[#1a1919]/5">
                <span className="text-[#1a1919]/50 block text-[10px] uppercase font-bold">POSTPONABILITY</span>
                <strong className="text-[#1a1919] text-sm block mt-1">
                  {currentClassData.postpone}
                </strong>
              </div>

              <div className="p-4 rounded-2xl bg-[#f0f0f0]/60 border border-[#1a1919]/5">
                <span className="text-[#1a1919]/50 block text-[10px] uppercase font-bold">FREE SUBSTITUTE</span>
                <strong className="text-[#1a1919] text-sm block mt-1">
                  {currentClassData.sub}
                </strong>
              </div>

              <div className="p-4 rounded-2xl bg-[#f0f0f0]/60 border border-[#1a1919]/5">
                <span className="text-[#1a1919]/50 block text-[10px] uppercase font-bold">ACTION PROTOCOL</span>
                <strong className="text-[#0922b0] text-sm block mt-1">
                  {currentClassData.act}
                </strong>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 4. 30 OVERLAPPING KINETIC 3D DECISION CHALLENGE DECK */}
        {/* ========================================================================= */}
        <div id="challenge" className="scroll-mt-24 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <p className="text-xs font-mono font-bold tracking-widest text-[#0922b0] uppercase">Interactive Simulation Deck</p>
            <h3 className="text-3xl md:text-4xl font-extrabold text-[#1a1919]">Money Decision Challenge</h3>
            <p className="text-xs sm:text-sm text-[#1a1919]/70 leading-relaxed">
              Smart choices slide <strong className="text-[#0eb02c]">Right</strong>. Impulse choices slide <strong className="text-[#d12828]">Left</strong>. Reveal the financial consequence on your live runway.
            </p>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap justify-center gap-2 pt-4 text-xs font-semibold">
              {[
                { id: 'all', label: 'All 30' },
                { id: 'inflow', label: 'Windfalls & Inflows' },
                { id: 'survival', label: 'Survival Baseline' },
                { id: 'peer', label: 'Peer Boundaries' },
                { id: 'tools', label: 'Tools & Skills' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleFilterCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-full transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-[#1a1919] text-white shadow-xs font-bold'
                      : 'bg-white hover:bg-slate-100 text-[#1a1919]/70 border border-[#1a1919]/10'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Live Stack Progress Indicator */}
            <div className="pt-4 flex items-center justify-center gap-4 text-xs font-mono text-[#1a1919]/70">
              <span>CARD: <strong className="text-[#1a1919]">{curDisplay}</strong> / <span>{filteredDeck.length}</span></span>
              <div className="w-36 sm:w-44 h-2 rounded-full bg-slate-200 overflow-hidden">
                <div className="h-full bg-[#0922b0] transition-all duration-300" style={{ width: `${progressPct}%` }} />
              </div>
              <span>SMART CHOICES: <strong className="text-[#0eb02c] font-bold">{userScore}</strong></span>
            </div>
          </div>

          {/* 3D Overlapping Stack Deck Viewport */}
          <div className="deck-container">
            {filteredDeck.map((challenge, idx) => {
              const diff = idx - currentCardIndex;
              let posClass = 'pos-hidden';
              if (diff === 0) posClass = 'pos-0';
              else if (diff === 1) posClass = 'pos-1';
              else if (diff === 2) posClass = 'pos-2';

              const animationClass = cardAnimations[idx] || '';

              return (
                <div
                  key={challenge.id}
                  className={`stack-card ${challenge.bg} p-6 sm:p-10 flex flex-col justify-between ${posClass} ${animationClass}`}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className={`${challenge.badge} text-[11px] font-mono font-bold tracking-widest uppercase`}>
                        {challenge.tag}
                      </span>
                      <span className="text-xs font-mono font-bold opacity-60">#{challenge.id} of 30</span>
                    </div>

                    <h4 className="text-2xl md:text-3xl font-extrabold mt-3 leading-tight tracking-tight">
                      {challenge.title}
                    </h4>

                    <p className="mt-4 text-sm md:text-base leading-relaxed opacity-85">
                      {challenge.scenario}
                    </p>
                  </div>

                  <div className="mt-8 pt-6 border-t border-black/10 dark:border-white/10 flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => handleDecision(idx, 0)}
                      className={`flex-1 py-3.5 px-4 rounded-2xl font-semibold text-xs sm:text-sm transition-all shadow-md active:scale-95 ${
                        challenge.options[0].type === 'smart'
                          ? 'bg-[#1a1919] text-white hover:bg-black'
                          : 'bg-[#0922b0] text-white hover:bg-[#071a8a]'
                      }`}
                    >
                      {challenge.options[0].text}
                    </button>

                    <button
                      onClick={() => handleDecision(idx, 1)}
                      className={`flex-1 py-3.5 px-4 rounded-2xl font-semibold text-xs sm:text-sm border transition-all active:scale-95 ${
                        challenge.options[1].type === 'smart'
                          ? 'bg-white text-[#1a1919] border-slate-300 hover:bg-slate-50 font-bold'
                          : 'bg-slate-100 text-[#1a1919] border-slate-300 hover:bg-white'
                      }`}
                    >
                      {challenge.options[1].text}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Stack Controls: Undo & Skip */}
          <div className="max-w-[700px] mx-auto flex items-center justify-between px-2">
            <button
              onClick={handleUndoCard}
              disabled={currentCardIndex <= 0}
              className={`px-4 py-2 rounded-2xl border text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all ${
                currentCardIndex > 0
                  ? 'border-slate-300 bg-white hover:bg-slate-50 text-[#1a1919]'
                  : 'border-slate-200 bg-slate-100 text-slate-400 cursor-not-allowed'
              }`}
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Previous Choice</span>
            </button>

            <span className="text-xs text-[#1a1919]/40 font-mono hidden sm:inline">
              Smart → Right | Want → Left
            </span>

            <button
              onClick={handleSkipCard}
              disabled={currentCardIndex >= filteredDeck.length - 1}
              className={`px-4 py-2 rounded-2xl border text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all ${
                currentCardIndex < filteredDeck.length - 1
                  ? 'border-slate-300 bg-white hover:bg-slate-50 text-[#1a1919]'
                  : 'border-slate-200 bg-slate-100 text-slate-400 cursor-not-allowed'
              }`}
            >
              <span>Skip Card</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 5. THE 4-STEP PAUSE FRAMEWORK */}
        {/* ========================================================================= */}
        <div id="guide" className="scroll-mt-24 space-y-8">
          <div className="max-w-2xl mx-auto text-center space-y-2">
            <p className="text-xs font-mono font-bold tracking-widest text-[#0922b0] uppercase">The Pre-Commitment Heuristic</p>
            <h3 className="text-3xl md:text-4xl font-extrabold text-[#1a1919]">Pause Before You Purchase</h3>
            <p className="text-xs sm:text-sm text-[#1a1919]/70 leading-relaxed">
              A practical four-question cognitive checklist for non-essential outflows.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-3xl p-6 text-center border border-[#1a1919]/10 shadow-sm hover:border-[#0922b0]/30 transition-all">
              <div className="mx-auto w-10 h-10 rounded-2xl bg-[#0922b0]/10 text-[#0922b0] font-black flex items-center justify-center text-base">
                1
              </div>
              <h4 className="mt-4 font-bold text-base text-[#1a1919]">Need?</h4>
              <p className="mt-2 text-xs text-[#1a1919]/65 leading-relaxed">
                Does this restore a baseline necessity or is it temporary excitement?
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 text-center border border-[#1a1919]/10 shadow-sm hover:border-[#0922b0]/30 transition-all">
              <div className="mx-auto w-10 h-10 rounded-2xl bg-[#0922b0]/10 text-[#0922b0] font-black flex items-center justify-center text-base">
                2
              </div>
              <h4 className="mt-4 font-bold text-base text-[#1a1919]">Budget?</h4>
              <p className="mt-2 text-xs text-[#1a1919]/65 leading-relaxed">
                Can current cash cover it without touching food or survival reserves?
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 text-center border border-[#1a1919]/10 shadow-sm hover:border-[#0922b0]/30 transition-all">
              <div className="mx-auto w-10 h-10 rounded-2xl bg-[#0922b0]/10 text-[#0922b0] font-black flex items-center justify-center text-base">
                3
              </div>
              <h4 className="mt-4 font-bold text-base text-[#1a1919]">Wait?</h4>
              <p className="mt-2 text-xs text-[#1a1919]/65 leading-relaxed">
                Can I pause 24 hours to clear the immediate impulse loop?
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 text-center border border-[#1a1919]/10 shadow-sm hover:border-[#0922b0]/30 transition-all">
              <div className="mx-auto w-10 h-10 rounded-2xl bg-[#0eb02c]/10 text-[#0eb02c] font-black flex items-center justify-center text-base">
                4
              </div>
              <h4 className="mt-4 font-bold text-base text-[#1a1919]">Decide</h4>
              <p className="mt-2 text-xs text-[#1a1919]/65 leading-relaxed">
                Make an intentional, guilt-free decision backed by your runway.
              </p>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 6. HABIT VELOCITY & CELEBRATION SUMMARY */}
        {/* ========================================================================= */}
        <div id="analytics" className="rounded-3xl p-8 sm:p-12 bg-[#1a1919] text-white text-center space-y-4 shadow-xl border border-white/10">
          <div className="text-4xl">🎓 💰 🌱</div>
          <h3 className="text-3xl md:text-4xl font-black tracking-tight text-white">
            Small decisions build freedom.
          </h3>
          <p className="max-w-xl mx-auto text-white/70 text-xs sm:text-sm leading-relaxed">
            You don't need a corporate salary to make disciplined moves. Start by knowing where your cash arrives, pausing before non-essentials, and growing your runway month by month.
          </p>
          <div className="pt-2">
            <button
              onClick={() => {
                setPopupData({
                  isOpen: true,
                  isSmart: true,
                  isFinal: true,
                  title: 'Decision Summary & Milestone',
                  message: `Current Active Balance: ₦${ledgerBalance.toLocaleString()} (${runwayMonths} Mo Runway). You have avoided ₦${totalAvoidedDebt.toLocaleString()} in impulsive debt across ${userScore} disciplined choices.`,
                  impactText: `LIFETIME DEFENSE: ${(ledgerBalance / 13000).toFixed(1)} Months of living security`,
                  icon: '🏆'
                });
                triggerBubbles(35);
              }}
              className="px-8 py-3.5 rounded-2xl bg-[#0eb02c] hover:bg-[#0c9626] text-white font-bold text-xs sm:text-sm transition-all shadow-md hover:scale-105 active:scale-95"
            >
              Inspect Decision Summary 🎉
            </button>
          </div>
        </div>

      </div>

      {/* Floating Student Tip HUD */}
      {isTipVisible && (
        <div className="student-tip">
          <div className="w-8 h-8 rounded-xl bg-[#0eb02c] text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-sm">
            💡
          </div>
          <p className="text-xs leading-snug">
            <strong>Money Rule:</strong> <span style={{ opacity: tipOpacity, transition: 'opacity 0.25s ease' }}>{rotatingTips[tipIndex]}</span>
          </p>
          <button
            onClick={() => setIsTipVisible(false)}
            className="text-white/60 hover:text-white text-lg ml-auto font-mono cursor-pointer"
            aria-label="Close Tip"
          >
            ×
          </button>
        </div>
      )}

      {/* Decision Feedback Modal / Dialog */}
      {popupData.isOpen && (
        <div 
          className="fixed inset-0 z-50 bg-[#1a1919]/70 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={handleClosePopup}
        >
          <div 
            className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 text-center shadow-2xl border border-[#1a1919]/10 space-y-4 animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-14 h-14 mx-auto rounded-2xl bg-blue-50 text-3xl flex items-center justify-center shadow-xs">
              {popupData.icon}
            </div>

            <h4 className="text-xl sm:text-2xl font-black text-[#1a1919] tracking-tight">
              {popupData.title}
            </h4>

            <p className="text-xs sm:text-sm text-[#1a1919]/70 leading-relaxed">
              {popupData.message}
            </p>

            <div className={`p-3 rounded-2xl text-xs font-mono font-bold ${
              popupData.isSmart ? 'bg-emerald-50 text-[#0eb02c]' : 'bg-amber-50 text-amber-800'
            }`}>
              {popupData.impactText}
            </div>

            <button
              onClick={handleClosePopup}
              className="w-full py-3.5 rounded-2xl bg-[#1a1919] hover:bg-black text-white font-semibold text-xs sm:text-sm transition-all shadow-md"
            >
              {popupData.isFinal ? 'Return to Guide' : 'Continue Simulation →'}
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
