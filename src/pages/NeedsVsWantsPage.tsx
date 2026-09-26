import React, { useState } from "react";
import { 
  ArrowRight, 
  RotateCcw, 
  ChevronRight, 
  CheckCircle2, 
} from "lucide-react";
import {
  allChallenges,
  classifierDatabase,
  DecisionChallenge,
} from "../data/decisionDeckData";

interface HistoryMove {
  index: number;
  wasSmart: boolean;
  impact: number;
  direction: "right" | "left" | "skip";
  skipped?: boolean;
}

interface Bubble {
  id: number;
  size: number;
  left: number;
  duration: number;
}

interface NeedsVsWantsPageProps {
  onBackToHome?: () => void;
  onNavigateToPractice?: () => void;
  onNavigateToBasics?: () => void;
}

export const NeedsVsWantsPage: React.FC<NeedsVsWantsPageProps> = ({
  onNavigateToPractice,
  onNavigateToBasics,
}) => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [filteredDeck, setFilteredDeck] = useState<DecisionChallenge[]>(allChallenges);

  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [userScore, setUserScore] = useState(0);
  const [ledgerBalance, setLedgerBalance] = useState(50000);
  const [totalAvoidedDebt, setTotalAvoidedDebt] = useState(0);
  const [historyStack, setHistoryStack] = useState<HistoryMove[]>([]);
  const [cardAnimations, setCardAnimations] = useState<Record<number, string>>({});

  const [popupData, setPopupData] = useState({
    isOpen: false,
    isSmart: true,
    isFinal: false,
    title: "",
    message: "",
    impactText: "",
    icon: "🛡️",
  });

  const [activeClassifier, setActiveClassifier] = useState("groceries");
  const [bubbles, setBubbles] = useState<Bubble[]>([]);

  const runwayMonths = (ledgerBalance / 13000).toFixed(1);
  const currentDisplay = Math.min(currentCardIndex + 1, filteredDeck.length);
  const progressPct = filteredDeck.length ? (currentDisplay / filteredDeck.length) * 100 : 0;
  const currentClassData = classifierDatabase[activeClassifier] || classifierDatabase.groceries;

  const triggerBubbles = (amount = 25) => {
    const newBubbles: Bubble[] = Array.from({ length: amount }, (_, index) => ({
      id: Date.now() + index,
      size: Math.random() * 30 + 12,
      left: Math.random() * 95,
      duration: Math.random() * 2.5 + 2.5,
    }));

    setBubbles((previous) => [...previous, ...newBubbles]);

    window.setTimeout(() => {
      setBubbles((previous) =>
        previous.filter((b) => !newBubbles.some((nb) => nb.id === b.id))
      );
    }, 5500);
  };

  const handleFilterCategory = (category: string) => {
    setSelectedCategory(category);
    setFilteredDeck(
      category === "all"
        ? allChallenges
        : allChallenges.filter((item) => item.category === category)
    );
    setCurrentCardIndex(0);
    setCardAnimations({});
    setHistoryStack([]);
  };

  const handleDecision = (index: number, optionIndex: number) => {
    const cardData = filteredDeck[index];
    if (!cardData) return;

    const chosen = cardData.options[optionIndex];
    const isSmart = chosen.type === "smart";

    if (isSmart) {
      const otherImpact = Math.abs(cardData.options[1 - optionIndex].impact || 4000);
      setUserScore((previous) => previous + 1);
      setTotalAvoidedDebt((previous) => previous + otherImpact);
      setLedgerBalance((previous) => previous + 2000);
      setCardAnimations((previous) => ({
        ...previous,
        [index]: "slide-out-right",
      }));
      triggerBubbles(20);
    } else {
      setLedgerBalance((previous) => Math.max(8000, previous - 3500));
      setCardAnimations((previous) => ({
        ...previous,
        [index]: "slide-out-left",
      }));
    }

    setHistoryStack((previous) => [
      ...previous,
      {
        index,
        wasSmart: isSmart,
        impact: chosen.impact,
        direction: isSmart ? "right" : "left",
      },
    ]);

    window.setTimeout(() => {
      setPopupData({
        isOpen: true,
        isSmart,
        isFinal: false,
        title: isSmart ? "Disciplined Move!" : "Opportunity Cost",
        message: isSmart ? cardData.smartFeedback : cardData.wantFeedback,
        impactText: isSmart
          ? "RUNWAY BENEFIT: +₦2,000 preserved"
          : "OPPORTUNITY COST: -₦3,500 from runway",
        icon: isSmart ? "🛡️" : "💡",
      });
    }, 220);
  };

  const handleSkipCard = () => {
    if (currentCardIndex >= filteredDeck.length - 1) return;

    setCardAnimations((previous) => ({
      ...previous,
      [currentCardIndex]: "slide-out-skip",
    }));

    setHistoryStack((previous) => [
      ...previous,
      {
        index: currentCardIndex,
        wasSmart: false,
        skipped: true,
        direction: "skip",
        impact: 0,
      },
    ]);

    window.setTimeout(() => {
      setCurrentCardIndex((previous) => previous + 1);
    }, 250);
  };

  const handleUndoCard = () => {
    if (currentCardIndex <= 0 || historyStack.length === 0) return;

    const newStack = [...historyStack];
    const lastMove = newStack.pop();
    if (!lastMove) return;

    if (lastMove.wasSmart) {
      setUserScore((previous) => Math.max(0, previous - 1));
      setLedgerBalance((previous) => previous - 2000);
    } else if (!lastMove.skipped) {
      setLedgerBalance((previous) => previous + 3500);
    }

    const previousIndex = currentCardIndex - 1;
    const reverseClass =
      lastMove.direction === "left"
        ? "slide-in-left-reverse"
        : lastMove.direction === "skip"
          ? "slide-in-skip-reverse"
          : "slide-in-right-reverse";

    setCardAnimations((previous) => ({
      ...previous,
      [previousIndex]: reverseClass,
    }));

    setCurrentCardIndex(previousIndex);
    setHistoryStack(newStack);

    window.setTimeout(() => {
      setCardAnimations((previous) => {
        const copy = { ...previous };
        delete copy[previousIndex];
        return copy;
      });
    }, 500);
  };

  const handleClosePopup = () => {
    setPopupData((previous) => ({
      ...previous,
      isOpen: false,
    }));

    const nextIndex = currentCardIndex + 1;
    if (nextIndex >= filteredDeck.length) {
      setPopupData({
        isOpen: true,
        isSmart: true,
        isFinal: true,
        title: "Simulation Complete!",
        message: `You made ${userScore} disciplined choices and protected approximately ₦${totalAvoidedDebt.toLocaleString()}.`,
        impactText: `FINAL RUNWAY: ${runwayMonths} months`,
        icon: "🏆",
      });
      triggerBubbles(45);
    } else {
      setCurrentCardIndex(nextIndex);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#f0f0f0] pb-24 font-sans text-[#1a1919] antialiased selection:bg-[#0922b0]/20 selection:text-[#0922b0]">
      {/* Celebration Bubbles */}
      <div className="pointer-events-none fixed inset-0 z-[450] overflow-hidden">
        {bubbles.map((bubble) => (
          <div
            key={bubble.id}
            className="bubble"
            style={{
              width: `${bubble.size}px`,
              height: `${bubble.size}px`,
              left: `${bubble.left}%`,
              animationDuration: `${bubble.duration}s`,
            }}
          />
        ))}
      </div>

      {/* Sub-Header Breadcrumb & Runway Bar */}
      <div className="border-b border-[#1a1919]/8 bg-white/70 backdrop-blur-md sticky top-[68px] z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono font-bold uppercase text-[#0eb02c] bg-[#0eb02c]/10 px-2.5 py-1 rounded-lg border border-[#0eb02c]/20">
              01 · Learn Module
            </span>
            <span className="hidden sm:inline text-xs text-[#1a1919]/60 font-medium">
              / Needs vs Wants Engine & 30-Card Decision Simulator
            </span>
          </div>

          <div className="flex items-center gap-3">
            {onNavigateToBasics && (
              <button
                onClick={onNavigateToBasics}
                className="hidden sm:inline-flex text-xs font-semibold text-[#1a1919]/70 hover:text-[#0922b0] transition cursor-pointer"
              >
                ← Back to Cash Flow Basics
              </button>
            )}

            <div className="rounded-xl border border-[#0eb02c]/20 bg-[#edf9ef] px-3 py-1 text-xs font-mono font-bold text-[#0eb02c] shadow-xs">
              RUNWAY: <span>{runwayMonths} Mo</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-6">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0eb02c]/10 border border-[#0eb02c]/20 text-xs font-mono font-bold text-[#0eb02c]">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>IMPULSE CONTROL SIMULATOR</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-[#1a1919] leading-tight">
            Separate Needs from Wants. <br />
            <span className="font-serif italic font-normal text-[#0eb02c]">Master everyday choices.</span>
          </h1>
          <p className="text-sm sm:text-base text-[#1a1919]/75 font-medium leading-relaxed">
            Every choice either builds your survival runway or triggers lifestyle creep. Test yourself against 30 real-world scenarios.
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* 1. Money Decision Challenge (Screenshot 3) */}
        <section id="challenge" className="scroll-mt-24 space-y-6 pt-2">
          <div className="mx-auto max-w-2xl space-y-2 text-center">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1a1919] tracking-tight">
              Money Decision Challenge
            </h2>

            <p className="text-sm sm:text-base text-[#1a1919]/70 leading-relaxed font-medium">
              Choose wisely and watch your runway change.
            </p>

            {/* Filter Pills */}
            <div className="flex flex-wrap justify-center gap-2 pt-3">
              {[
                { id: "all", label: "All 30" },
                { id: "inflow", label: "Inflows" },
                { id: "survival", label: "Survival" },
                { id: "peer", label: "Peer Boundaries" },
                { id: "tools", label: "Tools" },
              ].map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleFilterCategory(category.id)}
                  className={`rounded-full px-4 py-2 text-xs font-semibold transition cursor-pointer ${
                    selectedCategory === category.id
                      ? "bg-[#1a1919] font-bold text-white shadow-xs"
                      : "border border-[#dedede] bg-white text-[#1a1919]/75 hover:bg-slate-50"
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>

            {/* Progress Row */}
            <div className="flex items-center justify-center gap-3 pt-3 text-xs font-mono text-[#1a1919]/70">
              <span>
                CARD: <strong className="text-[#1a1919] font-bold">{currentDisplay}</strong> / {filteredDeck.length}
              </span>

              <div className="h-2 w-32 sm:w-44 overflow-hidden rounded-full bg-[#dedede]">
                <div
                  className="h-full bg-[#0922b0] transition-all duration-300"
                  style={{ width: `${progressPct}%` }}
                />
              </div>

              <span>
                SMART: <strong className="text-[#0eb02c] font-bold">{userScore}</strong>
              </span>
            </div>
          </div>

          {/* 3D Overlapping Kinetic Deck Container */}
          <div className="deck-container">
            {filteredDeck.map((challenge, index) => {
              const difference = index - currentCardIndex;
              let positionClass = "pos-hidden";

              if (difference === 0) positionClass = "pos-0";
              if (difference === 1) positionClass = "pos-1";
              if (difference === 2) positionClass = "pos-2";

              return (
                <div
                  key={challenge.id}
                  className={`stack-card ${challenge.bg} ${positionClass} ${
                    cardAnimations[index] || ""
                  } flex flex-col justify-between p-6 sm:p-10 border shadow-xl`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-3">
                      <span
                        className={`${challenge.badge} text-xs font-mono font-bold uppercase tracking-wider`}
                      >
                        {challenge.tag}
                      </span>

                      <span className="text-xs font-mono opacity-60">
                        #{challenge.id} of 30
                      </span>
                    </div>

                    <h4 className="mt-4 text-2xl sm:text-4xl font-extrabold leading-tight tracking-tight">
                      {challenge.title}
                    </h4>

                    <p className="mt-4 text-sm sm:text-base leading-relaxed opacity-85">
                      {challenge.scenario}
                    </p>
                  </div>

                  <div className="mt-8 flex flex-col gap-3.5 border-t border-black/10 pt-6 sm:flex-row">
                    <button
                      onClick={() => handleDecision(index, 0)}
                      className={`flex-1 rounded-2xl px-5 py-4 text-xs sm:text-sm font-bold shadow-md transition active:scale-95 cursor-pointer ${
                        challenge.options[0].type === "smart"
                          ? "bg-[#1a1919] text-white hover:bg-black"
                          : "bg-[#0922b0] text-white hover:bg-[#071a8a]"
                      }`}
                    >
                      {challenge.options[0].text}
                    </button>

                    <button
                      onClick={() => handleDecision(index, 1)}
                      className={`flex-1 rounded-2xl border px-5 py-4 text-xs sm:text-sm font-bold transition active:scale-95 cursor-pointer ${
                        challenge.options[1].type === "smart"
                          ? "border-slate-300 bg-white text-[#1a1919] hover:bg-slate-50"
                          : "border-slate-300 bg-slate-100 text-[#1a1919] hover:bg-white"
                      }`}
                    >
                      {challenge.options[1].text}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Card Controls */}
          <div className="mx-auto flex max-w-[700px] items-center justify-between px-2 pt-2">
            <button
              onClick={handleUndoCard}
              disabled={currentCardIndex <= 0}
              className={`flex items-center gap-1.5 rounded-2xl border px-4 py-2.5 text-xs font-semibold shadow-xs transition cursor-pointer ${
                currentCardIndex > 0
                  ? "border-[#dedede] bg-white text-[#1a1919] hover:bg-slate-50"
                  : "cursor-not-allowed border-[#dedede]/50 bg-slate-100 text-slate-400"
              }`}
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Previous</span>
            </button>

            <span className="hidden sm:inline text-xs font-mono text-[#1a1919]/50">
              Smart → Right | Want → Left
            </span>

            <button
              onClick={handleSkipCard}
              disabled={currentCardIndex >= filteredDeck.length - 1}
              className={`flex items-center gap-1.5 rounded-2xl border px-4 py-2.5 text-xs font-semibold shadow-xs transition cursor-pointer ${
                currentCardIndex < filteredDeck.length - 1
                  ? "border-[#dedede] bg-white text-[#1a1919] hover:bg-slate-50"
                  : "cursor-not-allowed border-[#dedede]/50 bg-slate-100 text-slate-400"
              }`}
            >
              <span>Skip</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </section>

        {/* 2. Needs vs Wants Simple Classification */}
        <section id="needs-wants-matrix" className="scroll-mt-24 space-y-6">
          <div className="mx-auto max-w-2xl space-y-2 text-center">
            <p className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#0eb02c]">
              SIMPLE CLASSIFICATION
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1a1919]">
              Needs vs Wants
            </h2>
            <p className="text-xs sm:text-sm text-[#1a1919]/70 leading-relaxed font-medium">
              Use these quick checks before spending.
            </p>
          </div>

          <div className="overflow-hidden rounded-3xl border border-[#dedede] bg-white shadow-sm">
            <div className="grid grid-cols-2 border-b border-[#dedede] text-center text-xs font-bold">
              <div className="bg-[#edf9ef] p-4 text-[#0eb02c]">
                Essential Needs
              </div>
              <div className="bg-[#f7f7f5] p-4 text-[#1a1919]">
                Optional Wants
              </div>
            </div>

            <div className="grid grid-cols-2 divide-x divide-[#dedede] text-xs">
              <div className="space-y-3 p-5 sm:p-6 text-[#1a1919]/80 font-medium">
                <p>✓ Supports basic biological or academic living.</p>
                <p>✓ Usually difficult to postpone without major penalties.</p>
                <p>✓ Protects health, shelter, safety, or core courses.</p>
                <p>✓ Should receive first priority upon allowance credit.</p>
              </div>

              <div className="space-y-3 p-5 sm:p-6 text-[#1a1919]/80 font-medium">
                <p>✕ Can usually be delayed 24 to 48 hours safely.</p>
                <p>✕ Often has free or low-cost campus alternatives.</p>
                <p>✕ Often driven by temporary stress or peer impulse.</p>
                <p>✕ Should only be funded from remaining 30% allowance.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Interactive Quick Outflow Classifier */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-[#dedede] shadow-sm space-y-6">
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

        {/* 4. Pause Before You Purchase Framework */}
        <section className="scroll-mt-24 space-y-6">
          <div className="mx-auto max-w-2xl space-y-2 text-center">
            <p className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#0922b0]">
              BEFORE YOU SPEND
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1a1919]">
              Pause Before You Purchase
            </h2>
            <p className="text-xs sm:text-sm text-[#1a1919]/70 font-medium">
              Four quick questions to run through whenever an impulse strikes.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                step: "01",
                q: "Do I already own something that solves this?",
                desc: "Check your dorm room, closet, or kitchen before ordering duplicate items.",
              },
              {
                step: "02",
                q: "Can I wait 24 to 48 hours?",
                desc: "75% of online shopping desires dissolve once the initial dopamine spike settles.",
              },
              {
                step: "03",
                q: "Will this deplete my emergency buffer?",
                desc: "If this purchase leaves you below ₦10,000 for unexpected bills, hold off.",
              },
              {
                step: "04",
                q: "Is this my priority or peer pressure?",
                desc: "Never let someone else's allowance level dictate your monthly budget boundaries.",
              },
            ].map((card) => (
              <div
                key={card.step}
                className="rounded-3xl border border-[#dedede] bg-white p-6 shadow-sm space-y-3"
              >
                <span className="font-mono text-xs font-bold text-[#0922b0]">
                  {card.step}
                </span>
                <h4 className="text-sm font-bold text-[#1a1919] leading-snug">
                  {card.q}
                </h4>
                <p className="text-xs text-[#1a1919]/70 leading-relaxed font-medium">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom CTA to Practice Studio */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-[#dedede] shadow-sm flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            <h3 className="font-bold text-lg text-[#1a1919]">Ready to design your personal budget?</h3>
            <p className="text-xs text-[#1a1919]/60 font-medium">Take your discipline into the interactive 50/30/20 Studio and Savings Goal calculator.</p>
          </div>

          <button
            onClick={onNavigateToPractice}
            className="px-6 py-3 rounded-xl bg-[#0922b0] hover:bg-[#071a8a] text-white text-xs font-bold flex items-center gap-2 shadow-md transition-all cursor-pointer whitespace-nowrap"
          >
            <span>Launch 50/30/20 Studio</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </section>

      </main>

      {/* Feedback & Result Popup Modal */}
      {popupData.isOpen && (
        <div className="fixed inset-0 z-[500] flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md space-y-4 rounded-3xl border border-[#dedede] bg-white p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{popupData.icon}</span>
              <div>
                <h4 className="text-lg font-bold text-[#1a1919]">{popupData.title}</h4>
                <span
                  className={`text-[11px] font-mono font-bold ${
                    popupData.isSmart ? "text-[#0eb02c]" : "text-[#d12828]"
                  }`}
                >
                  {popupData.impactText}
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm leading-relaxed text-[#1a1919]/80 font-medium">
              {popupData.message}
            </p>

            <button
              onClick={handleClosePopup}
              className="w-full rounded-2xl bg-[#1a1919] py-3.5 text-xs font-bold text-white transition hover:bg-black cursor-pointer shadow-md"
            >
              {popupData.isFinal ? "Celebrate & Close" : "Continue Simulation →"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
