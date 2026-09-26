import React, { useEffect, useState } from "react";
import {
  ArrowRight,
  ChevronRight,
  RotateCcw,
} from "lucide-react";

import {
  allChallenges,
  classifierDatabase,
  rotatingTips,
  DecisionChallenge,
} from "../data/decisionDeckData";
import BudgetRule from "../BudgetRule";

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

interface LearnPageProps {
  onBackToHome?: () => void;
}

const quizQuestions = [
  {
    q: "What percentage belongs to Essential Needs?",
    options: ["30%", "50%", "20%", "70%"],
    correct: 1,
    explanation:
      "The standard 50/30/20 rule allocates 50% to essential needs.",
  },
  {
    q: "Food delivery surcharges are usually classified as:",
    options: [
      "Essential Needs",
      "Discretionary Wants",
      "Academic Outlay",
      "Emergency Buffer",
    ],
    correct: 1,
    explanation:
      "The food may be necessary, but delivery premiums are usually optional.",
  },
  {
    q: "What is the purpose of an emergency cushion?",
    options: [
      "Buying speculative assets",
      "Handling unexpected expenses",
      "Funding holidays",
      "Buying luxury items",
    ],
    correct: 1,
    explanation:
      "An emergency cushion helps prevent unexpected expenses from becoming debt.",
  },
];

export const LearnPage: React.FC<LearnPageProps> = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [filteredDeck, setFilteredDeck] =
    useState<DecisionChallenge[]>(allChallenges);

  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [userScore, setUserScore] = useState(0);
  const [ledgerBalance, setLedgerBalance] = useState(50000);
  const [totalAvoidedDebt, setTotalAvoidedDebt] = useState(0);
  const [historyStack, setHistoryStack] = useState<HistoryMove[]>([]);
  const [cardAnimations, setCardAnimations] = useState<
    Record<number, string>
  >({});

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

  const [tipIndex, setTipIndex] = useState(0);
  const [isTipVisible, setIsTipVisible] = useState(true);
  const [tipOpacity, setTipOpacity] = useState(1);

  const [bubbles, setBubbles] = useState<Bubble[]>([]);

  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const runwayMonths = (ledgerBalance / 13000).toFixed(1);
  const needsAmount = Math.round(ledgerBalance * 0.64);
  const growthAmount = Math.round(ledgerBalance * 0.22);
  const savingsAmount = Math.max(
    0,
    ledgerBalance - needsAmount - growthAmount,
  );

  const currentDisplay = Math.min(
    currentCardIndex + 1,
    filteredDeck.length,
  );

  const progressPct = filteredDeck.length
    ? (currentDisplay / filteredDeck.length) * 100
    : 0;

  const currentClassData =
    classifierDatabase[activeClassifier] ||
    classifierDatabase.groceries;

  useEffect(() => {
    const interval = window.setInterval(() => {
      setTipOpacity(0);

      window.setTimeout(() => {
        setTipIndex((previous) => (previous + 1) % rotatingTips.length);
        setTipOpacity(1);
      }, 250);
    }, 5500);

    return () => window.clearInterval(interval);
  }, []);

  const triggerBubbles = (amount = 25) => {
    const newBubbles: Bubble[] = Array.from(
      { length: amount },
      (_, index) => ({
        id: Date.now() + index,
        size: Math.random() * 30 + 12,
        left: Math.random() * 95,
        duration: Math.random() * 2.5 + 2.5,
      }),
    );

    setBubbles((previous) => [...previous, ...newBubbles]);

    window.setTimeout(() => {
      setBubbles((previous) =>
        previous.filter(
          (bubble) =>
            !newBubbles.some(
              (newBubble) => newBubble.id === bubble.id,
            ),
        ),
      );
    }, 5500);
  };

  const handleFilterCategory = (category: string) => {
    setSelectedCategory(category);

    setFilteredDeck(
      category === "all"
        ? allChallenges
        : allChallenges.filter((item) => item.category === category),
    );

    setCurrentCardIndex(0);
    setCardAnimations({});
    setHistoryStack([]);
  };

  const handleDecision = (
    index: number,
    optionIndex: number,
  ) => {
    const cardData = filteredDeck[index];

    if (!cardData) return;

    const chosen = cardData.options[optionIndex];
    const isSmart = chosen.type === "smart";

    if (isSmart) {
      const otherImpact = Math.abs(
        cardData.options[1 - optionIndex].impact || 4000,
      );

      setUserScore((previous) => previous + 1);
      setTotalAvoidedDebt((previous) => previous + otherImpact);
      setLedgerBalance((previous) => previous + 2000);
      setCardAnimations((previous) => ({
        ...previous,
        [index]: "slide-out-right",
      }));

      triggerBubbles(20);
    } else {
      setLedgerBalance((previous) =>
        Math.max(8000, previous - 3500),
      );

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
        title: isSmart
          ? "Disciplined Move!"
          : "Opportunity Cost",
        message: isSmart
          ? cardData.smartFeedback
          : cardData.wantFeedback,
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
    if (currentCardIndex <= 0 || historyStack.length === 0) {
      return;
    }

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

      {/* In-Page Sub-Navigation & Runway Quick Bar */}
      <div className="border-b border-[#1a1919]/8 bg-white/60 backdrop-blur-xs">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono font-bold uppercase text-[#0922b0] bg-[#0922b0]/10 px-2.5 py-1 rounded-lg">
              01 · Learn Module
            </span>
            <span className="hidden sm:inline text-xs text-[#1a1919]/60 font-medium">
              / Budgeting Fundamentals & Swipe Simulator
            </span>
          </div>

          <div className="flex items-center gap-4">
            <nav className="hidden items-center gap-4 text-xs font-semibold text-[#1a1919]/75 md:flex">
              <a href="#inflow-outflow" className="hover:text-[#0922b0] transition-colors">
                Cash Flow
              </a>
              <a href="#needs-wants" className="hover:text-[#0922b0] transition-colors">
                Needs vs Wants
              </a>
              <a
                href="#challenge"
                className="flex items-center gap-1.5 font-bold text-[#0922b0] hover:text-[#071a8a] transition-colors"
              >
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#0922b0]" />
                30-Card Challenge
              </a>
              <a href="#guide" className="hover:text-[#0922b0] transition-colors">
                Pause Framework
              </a>
            </nav>

            <div className="rounded-xl border border-[#1a1919]/10 bg-white px-3 py-1 text-xs font-mono font-bold text-[#0eb02c] shadow-xs">
              RUNWAY: <span>{runwayMonths} Mo</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="mx-auto grid max-w-7xl items-center gap-8 px-4 pb-12 pt-12 sm:px-6 md:grid-cols-[1.05fr_.95fr] md:pt-16 lg:px-8">
        <div className="space-y-5">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#1a1919]/10 bg-white px-3 py-1.5 text-[10px] font-semibold tracking-wider text-[#1a1919]/70 shadow-sm">
            <span className="h-2 w-2 animate-pulse rounded-full bg-[#0eb02c]" />
            LEARN BETTER MONEY HABITS
          </div>

          <h1 className="text-4xl font-black leading-[1.02] tracking-tight md:text-6xl">
            Small decisions.
            <br />
            <span className="font-serif text-3xl font-normal italic text-[#0eb02c] md:text-5xl">
              Better money habits.
            </span>
          </h1>

          <p className="max-w-xl text-sm leading-relaxed text-[#1a1919]/75 md:text-base">
            Learn where your money goes, separate needs from wants,
            and practice making smarter everyday decisions.
          </p>

          <div className="flex flex-wrap gap-3">
            <a
              href="#challenge"
              className="flex items-center gap-2 rounded-2xl bg-[#1a1919] px-5 py-3 text-xs font-semibold text-white shadow-md transition hover:bg-black"
            >
              Start Challenge
              <ArrowRight className="h-4 w-4 text-[#0eb02c]" />
            </a>

            <a
              href="#needs-wants"
              className="rounded-2xl border border-[#1a1919]/15 bg-white px-5 py-3 text-xs font-semibold transition hover:bg-slate-100"
            >
              View Needs vs Wants
            </a>
          </div>
        </div>

        {/* Runway Card */}
        <div className="space-y-5 rounded-3xl border border-[#1a1919]/10 bg-white p-5 shadow-xl sm:p-7">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[10px] font-mono font-semibold uppercase tracking-wider text-[#1a1919]/60">
                Active Runway
              </p>

              <div className="mt-1 flex flex-wrap items-baseline gap-2">
                <span className="text-3xl font-black font-mono sm:text-4xl">
                  ₦{ledgerBalance.toLocaleString()}
                </span>

                <span className="rounded-full border border-[#0eb02c]/20 bg-[#0eb02c]/10 px-2 py-0.5 text-xs font-bold text-[#0eb02c]">
                  {runwayMonths} Mo
                </span>
              </div>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-[#0922b0]/20 bg-[#0922b0]/10 font-mono font-bold text-[#0922b0]">
              ₦
            </div>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <div className="mb-1.5 flex justify-between gap-3">
                <span>Essential Needs</span>
                <strong>₦{needsAmount.toLocaleString()}</strong>
              </div>

              <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-[#1a1919]"
                  style={{ width: "64%" }}
                />
              </div>
            </div>

            <div>
              <div className="mb-1.5 flex justify-between gap-3">
                <span>School & Growth</span>
                <strong className="text-[#0922b0]">
                  ₦{growthAmount.toLocaleString()}
                </strong>
              </div>

              <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-[#0922b0]"
                  style={{ width: "22%" }}
                />
              </div>
            </div>

            <div>
              <div className="mb-1.5 flex justify-between gap-3">
                <span>Savings Buffer</span>
                <strong className="text-[#0eb02c]">
                  ₦{savingsAmount.toLocaleString()}
                </strong>
              </div>

              <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-[#0eb02c]"
                  style={{ width: "14%" }}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 border-t border-[#1a1919]/10 pt-4 text-center">
            <div className="rounded-2xl bg-[#f0f0f0] p-3">
              <span className="block text-[9px] font-mono font-bold text-[#1a1919]/50">
                HABIT DEFENSE
              </span>
              <strong className="font-mono text-sm">88.4%</strong>
            </div>

            <div className="rounded-2xl border border-[#0eb02c]/20 bg-[#0eb02c]/5 p-3">
              <span className="block text-[9px] font-mono font-bold text-[#0eb02c]">
                AVOIDED DEBT
              </span>
              <strong className="font-mono text-sm text-[#0eb02c]">
                ₦{totalAvoidedDebt.toLocaleString()}
              </strong>
            </div>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-7xl space-y-16 px-4 sm:px-6 lg:px-8">
        {/* The 50/30/20 Animated Stage */}
        <section id="budget-rule-stage" className="scroll-mt-24 space-y-6">
          <div className="mx-auto max-w-2xl space-y-2 text-center">
            <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#0922b0]">
              The Foundational Rule
            </p>
            <h2 className="text-2xl font-extrabold md:text-4xl">
              The 50/30/20 Budgeting Rule
            </h2>
            <p className="text-xs leading-relaxed text-[#1a1919]/70 sm:text-sm">
              Scroll through the stage below to see how essentials, lifestyle, and savings interact.
            </p>
          </div>

          <div className="rounded-3xl border border-[#1a1919]/10 shadow-sm bg-white overflow-hidden">
            <BudgetRule />
          </div>
        </section>

        {/* Cash Flow */}
        <section id="inflow-outflow" className="scroll-mt-24 space-y-6">
          <div className="mx-auto max-w-2xl space-y-2 text-center">
            <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#0922b0]">
              Cash Flow Basics
            </p>

            <h2 className="text-2xl font-extrabold md:text-4xl">
              Where Your Money Goes
            </h2>

            <p className="text-xs leading-relaxed text-[#1a1919]/70 sm:text-sm">
              Know what comes in, what goes out, and what deserves
              priority.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-5 rounded-3xl border border-[#dedede] bg-white p-6 sm:p-8 shadow-sm">
              <div>
                <h3 className="text-xl font-bold text-[#1a1919]">Money In</h3>
                <p className="mt-1 text-xs text-[#1a1919]/60 font-medium">
                  Common income sources
                </p>
              </div>

              <div className="space-y-3">
                {[
                  "Family allowances",
                  "Freelance and side gigs",
                  "Gifts and windfalls",
                  "Scholarships and stipends",
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

            <div className="space-y-5 rounded-3xl border border-[#dedede] bg-white p-6 sm:p-8 shadow-sm">
              <div>
                <h3 className="text-xl font-bold text-[#1a1919]">Money Out</h3>
                <p className="mt-1 text-xs text-[#1a1919]/60 font-medium">
                  Give each expense a priority
                </p>
              </div>

              <div className="space-y-3">
                {[
                  "Needs: food, housing, transport",
                  "Savings: emergency buffer",
                  "Growth: school and useful tools",
                  "Wants: entertainment and outings",
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

          {/* Short Knowledge Check */}
          <div className="space-y-5 rounded-3xl border border-[#1a1919]/10 bg-white p-5 shadow-sm sm:p-7">
            <div className="flex items-center justify-between gap-3 border-b border-[#1a1919]/10 pb-4">
              <div>
                <h3 className="font-bold">Quick Knowledge Check</h3>
                <p className="mt-1 text-[11px] text-[#1a1919]/60">
                  Test what you learned
                </p>
              </div>

              {quizSubmitted && (
                <button
                  onClick={() => {
                    setQuizAnswers({});
                    setQuizSubmitted(false);
                  }}
                  className="rounded-xl bg-[#f0f0f0] px-3 py-1.5 text-xs font-semibold"
                >
                  Retake
                </button>
              )}
            </div>

            <div className="space-y-5">
              {quizQuestions.map((question, questionIndex) => {
                const selected = quizAnswers[questionIndex];
                const isCorrect = selected === question.correct;

                return (
                  <div
                    key={questionIndex}
                    className="space-y-3 rounded-2xl border border-[#1a1919]/5 bg-[#f0f0f0]/50 p-4"
                  >
                    <p className="text-xs font-bold">
                      {questionIndex + 1}. {question.q}
                    </p>

                    <div className="grid gap-2 sm:grid-cols-2">
                      {question.options.map((option, optionIndex) => {
                        const isChosen = selected === optionIndex;

                        let style =
                          "border-[#1a1919]/10 bg-white text-[#1a1919]";

                        if (quizSubmitted) {
                          if (optionIndex === question.correct) {
                            style =
                              "border-[#0eb02c] bg-[#0eb02c]/10 text-[#0eb02c] font-bold";
                          } else if (isChosen && !isCorrect) {
                            style =
                              "border-[#d12828] bg-[#d12828]/10 text-[#d12828] font-bold";
                          }
                        } else if (isChosen) {
                          style = "border-[#0922b0] bg-[#0922b0] text-white";
                        }

                        return (
                          <button
                            key={optionIndex}
                            disabled={quizSubmitted}
                            onClick={() =>
                              setQuizAnswers((previous) => ({
                                ...previous,
                                [questionIndex]: optionIndex,
                              }))
                            }
                            className={`rounded-xl border p-3 text-left text-xs transition ${style}`}
                          >
                            {option}
                          </button>
                        );
                      })}
                    </div>

                    {quizSubmitted && (
                      <div
                        className={`rounded-xl p-3 text-xs leading-relaxed ${isCorrect
                            ? "border border-[#0eb02c]/20 bg-[#0eb02c]/10 text-[#0eb02c]"
                            : "border border-[#d12828]/20 bg-[#d12828]/10 text-[#d12828]"
                          }`}
                      >
                        <strong>
                          {isCorrect ? "✓ Correct! " : "Review: "}
                        </strong>
                        {question.explanation}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {!quizSubmitted &&
              Object.keys(quizAnswers).length ===
              quizQuestions.length && (
                <button
                  onClick={() => setQuizSubmitted(true)}
                  className="w-full rounded-2xl bg-[#0922b0] py-3 text-xs font-bold text-white transition hover:bg-[#071a8a]"
                >
                  Submit Answers
                </button>
              )}
          </div>
        </section>

        {/* Needs vs Wants */}
        <section id="needs-wants" className="scroll-mt-24 space-y-6">
          <div className="mx-auto max-w-2xl space-y-2 text-center">
            <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#0eb02c]">
              Simple Classification
            </p>

            <h2 className="text-2xl font-extrabold md:text-4xl">
              Needs vs Wants
            </h2>

            <p className="text-xs leading-relaxed text-[#1a1919]/70 sm:text-sm">
              Use these quick checks before spending.
            </p>
          </div>

          <div className="overflow-hidden rounded-3xl border border-[#1a1919]/10 bg-white shadow-sm">
            <div className="grid grid-cols-2 border-b border-[#1a1919]/10 text-center text-xs font-bold">
              <div className="bg-[#0eb02c]/10 p-4 text-[#0eb02c]">
                Essential Needs
              </div>
              <div className="bg-[#f0f0f0] p-4">
                Optional Wants
              </div>
            </div>

            <div className="grid grid-cols-2 divide-x divide-[#1a1919]/10 text-xs">
              <div className="space-y-3 p-4">
                <p>Supports basic living.</p>
                <p>Usually difficult to postpone.</p>
                <p>Protects health, safety, or school.</p>
                <p>Should receive priority.</p>
              </div>

              <div className="space-y-3 p-4">
                <p>Can usually be delayed.</p>
                <p>Often has free alternatives.</p>
                <p>May be driven by impulse.</p>
                <p>Should fit the remaining budget.</p>
              </div>
            </div>
          </div>

          {/* Classifier */}
          <div className="space-y-5 rounded-3xl border border-[#1a1919]/10 bg-white p-5 shadow-sm sm:p-7">
            <div>
              <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#0922b0]">
                Interactive Tool
              </p>

              <h3 className="mt-1 font-bold">Quick Outflow Classifier</h3>

              <p className="mt-1 text-xs text-[#1a1919]/60">
                Select an expense to inspect its classification.
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
                  className={`rounded-xl px-3 py-2 text-xs font-semibold transition ${activeClassifier === item.key
                      ? "bg-[#1a1919] text-white"
                      : "bg-[#f0f0f0] text-[#1a1919]/80 hover:bg-slate-200"
                    }`}
                >
                  {item.label}
                </button>
              ))}
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
                  className="rounded-2xl border border-[#1a1919]/5 bg-[#f0f0f0]/60 p-4"
                >
                  <span className="block text-[10px] font-bold uppercase text-[#1a1919]/50">
                    {label}
                  </span>

                  <strong className="mt-1 block text-sm">
                    {value}
                  </strong>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Decision Challenge */}
        <section id="challenge" className="scroll-mt-24 space-y-6">
          <div className="mx-auto max-w-2xl space-y-2 text-center">
            <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#0922b0]">
              Interactive Simulation
            </p>

            <h2 className="text-2xl font-extrabold md:text-4xl">
              Money Decision Challenge
            </h2>

            <p className="text-xs leading-relaxed text-[#1a1919]/70 sm:text-sm">
              Choose wisely and watch your runway change.
            </p>

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
                  className={`rounded-full px-3 py-1.5 text-xs transition ${selectedCategory === category.id
                      ? "bg-[#1a1919] font-bold text-white"
                      : "border border-[#1a1919]/10 bg-white text-[#1a1919]/70 hover:bg-slate-100"
                    }`}
                >
                  {category.label}
                </button>
              ))}
            </div>

            <div className="flex items-center justify-center gap-3 pt-3 text-xs font-mono text-[#1a1919]/70">
              <span>
                CARD:{" "}
                <strong className="text-[#1a1919]">
                  {currentDisplay}
                </strong>{" "}
                / {filteredDeck.length}
              </span>

              <div className="h-2 w-28 overflow-hidden rounded-full bg-slate-200 sm:w-40">
                <div
                  className="h-full bg-[#0922b0] transition-all"
                  style={{ width: `${progressPct}%` }}
                />
              </div>

              <span>
                SMART:{" "}
                <strong className="text-[#0eb02c]">
                  {userScore}
                </strong>
              </span>
            </div>
          </div>

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
                  className={`stack-card ${challenge.bg} ${positionClass} ${cardAnimations[index] || ""
                    } flex flex-col justify-between p-5 sm:p-8`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-3">
                      <span
                        className={`${challenge.badge} text-[10px] font-mono font-bold uppercase tracking-widest`}
                      >
                        {challenge.tag}
                      </span>

                      <span className="text-xs font-mono opacity-60">
                        #{challenge.id} of 30
                      </span>
                    </div>

                    <h4 className="mt-3 text-2xl font-extrabold leading-tight tracking-tight md:text-3xl">
                      {challenge.title}
                    </h4>

                    <p className="mt-4 text-sm leading-relaxed opacity-85">
                      {challenge.scenario}
                    </p>
                  </div>

                  <div className="mt-8 flex flex-col gap-3 border-t border-black/10 pt-5 sm:flex-row">
                    <button
                      onClick={() => handleDecision(index, 0)}
                      className={`flex-1 rounded-2xl px-4 py-3.5 text-xs font-semibold shadow-md transition active:scale-95 sm:text-sm ${challenge.options[0].type === "smart"
                          ? "bg-[#1a1919] text-white hover:bg-black"
                          : "bg-[#0922b0] text-white hover:bg-[#071a8a]"
                        }`}
                    >
                      {challenge.options[0].text}
                    </button>

                    <button
                      onClick={() => handleDecision(index, 1)}
                      className={`flex-1 rounded-2xl border px-4 py-3.5 text-xs font-semibold transition active:scale-95 sm:text-sm ${challenge.options[1].type === "smart"
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

          <div className="mx-auto flex max-w-[700px] items-center justify-between px-2">
            <button
              onClick={handleUndoCard}
              disabled={currentCardIndex <= 0}
              className={`flex items-center gap-1.5 rounded-2xl border px-4 py-2 text-xs font-semibold shadow-sm transition ${currentCardIndex > 0
                  ? "border-slate-300 bg-white hover:bg-slate-50"
                  : "cursor-not-allowed border-slate-200 bg-slate-100 text-slate-400"
                }`}
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Previous
            </button>

            <span className="hidden text-xs font-mono text-[#1a1919]/40 sm:inline">
              Smart → Right | Want → Left
            </span>

            <button
              onClick={handleSkipCard}
              disabled={currentCardIndex >= filteredDeck.length - 1}
              className={`flex items-center gap-1.5 rounded-2xl border px-4 py-2 text-xs font-semibold shadow-sm transition ${currentCardIndex < filteredDeck.length - 1
                  ? "border-slate-300 bg-white hover:bg-slate-50"
                  : "cursor-not-allowed border-slate-200 bg-slate-100 text-slate-400"
                }`}
            >
              Skip
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </section>

        {/* Pause Framework */}
        <section id="guide" className="scroll-mt-24 space-y-6">
          <div className="mx-auto max-w-2xl space-y-2 text-center">
            <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#0922b0]">
              Before You Spend
            </p>

            <h2 className="text-2xl font-extrabold md:text-4xl">
              Pause Before You Purchase
            </h2>

            <p className="text-xs leading-relaxed text-[#1a1919]/70 sm:text-sm">
              Four quick questions for better decisions.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["1", "Need?", "Is this necessary or temporary excitement?"],
              ["2", "Budget?", "Can I afford it without touching essentials?"],
              ["3", "Wait?", "Can I wait 24 hours before buying?"],
              ["4", "Decide", "Does this choice support my goals?"],
            ].map(([number, title, description], index) => (
              <div
                key={number}
                className="rounded-3xl border border-[#1a1919]/10 bg-white p-5 text-center shadow-sm"
              >
                <div
                  className={`mx-auto flex h-10 w-10 items-center justify-center rounded-2xl font-black ${index === 3
                      ? "bg-[#0eb02c]/10 text-[#0eb02c]"
                      : "bg-[#0922b0]/10 text-[#0922b0]"
                    }`}
                >
                  {number}
                </div>

                <h3 className="mt-3 font-bold">{title}</h3>

                <p className="mt-2 text-xs leading-relaxed text-[#1a1919]/65">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Final Message */}
        <section
          id="analytics"
          className="space-y-4 rounded-3xl bg-[#1a1919] p-7 text-center text-white shadow-xl sm:p-10"
        >
          <div className="text-3xl">🎓 💰 🌱</div>

          <h2 className="text-2xl font-black tracking-tight md:text-4xl">
            Small decisions build freedom.
          </h2>

          <p className="mx-auto max-w-xl text-xs leading-relaxed text-white/70 sm:text-sm">
            Understand your cash, pause before spending, and build
            better habits one decision at a time.
          </p>

          <button
            onClick={() => {
              setPopupData({
                isOpen: true,
                isSmart: true,
                isFinal: true,
                title: "Decision Summary",
                message: `Current balance: ₦${ledgerBalance.toLocaleString()}. You avoided ₦${totalAvoidedDebt.toLocaleString()} across ${userScore} disciplined choices.`,
                impactText: `${runwayMonths} months of runway`,
                icon: "🏆",
              });

              triggerBubbles(35);
            }}
            className="rounded-2xl bg-[#0eb02c] px-6 py-3.5 text-xs font-bold text-white shadow-md transition hover:bg-[#0c9626]"
          >
            Inspect Summary 🎉
          </button>
        </section>
      </main>

      {/* Floating Tip */}
      {isTipVisible && (
        <div className="student-tip">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#0eb02c] text-sm font-bold text-white shadow-sm">
            💡
          </div>

          <p className="text-xs leading-snug">
            <strong>Money Rule:</strong>{" "}
            <span
              style={{
                opacity: tipOpacity,
                transition: "opacity 0.25s ease",
              }}
            >
              {rotatingTips[tipIndex]}
            </span>
          </p>

          <button
            onClick={() => setIsTipVisible(false)}
            className="ml-auto cursor-pointer text-lg font-mono text-white/60 hover:text-white"
            aria-label="Close Tip"
          >
            ×
          </button>
        </div>
      )}

      {/* Feedback Modal */}
      {popupData.isOpen && (
        <div
          className="fixed inset-0 z-[500] flex items-center justify-center bg-[#1a1919]/70 p-4 backdrop-blur-md"
          onClick={handleClosePopup}
        >
          <div
            className="w-full max-w-md space-y-4 rounded-3xl border border-[#1a1919]/10 bg-white p-6 text-center shadow-2xl sm:p-8"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-3xl">
              {popupData.icon}
            </div>

            <h4 className="text-xl font-black tracking-tight sm:text-2xl">
              {popupData.title}
            </h4>

            <p className="text-xs leading-relaxed text-[#1a1919]/70 sm:text-sm">
              {popupData.message}
            </p>

            <div
              className={`rounded-2xl p-3 text-xs font-mono font-bold ${popupData.isSmart
                  ? "bg-emerald-50 text-[#0eb02c]"
                  : "bg-amber-50 text-amber-800"
                }`}
            >
              {popupData.impactText}
            </div>

            <button
              onClick={handleClosePopup}
              className="w-full rounded-2xl bg-[#1a1919] py-3.5 text-xs font-semibold text-white shadow-md transition hover:bg-black sm:text-sm"
            >
              {popupData.isFinal
                ? "Return to Guide"
                : "Continue Simulation →"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};