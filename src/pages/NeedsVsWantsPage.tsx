import React, { useState } from 'react';
import { 
  CheckCircle2, 
  RotateCcw, 
  ArrowRight
} from 'lucide-react';

interface NeedsVsWantsPageProps {
  onBackToHome?: () => void;
  onNavigateToPractice?: () => void;
}

interface CardItem {
  id: string;
  name: string;
  category: string;
  cost: number;
  isNeed: boolean;
  explanation: string;
  icon: string;
}

const challengeCards: CardItem[] = [
  { id: '1', name: 'Campus Textbook for Core Class', category: 'Education', cost: 75, isNeed: true, explanation: 'Required for course credits and coursework completion.', icon: '📚' },
  { id: '2', name: 'Late-Night Food Delivery Surge', category: 'Food', cost: 28, isNeed: false, explanation: 'Convenience surge pricing — cooking dorm meal prep costs under $4.', icon: '🍔' },
  { id: '3', name: 'Monthly Dorm Electricity & Wi-Fi', category: 'Housing', cost: 45, isNeed: true, explanation: 'Essential utility for living and studying.', icon: '⚡' },
  { id: '4', name: 'Third Unused Video Streaming App', category: 'Entertainment', cost: 16, isNeed: false, explanation: 'Can be cancelled and rotated when watching a specific show.', icon: '🎬' },
  { id: '5', name: 'Prescription Allergy Medication', category: 'Health', cost: 25, isNeed: true, explanation: 'Health maintenance is a non-negotiable personal priority.', icon: '💊' },
  { id: '6', name: 'Designer Sneakers on Flash Sale', category: 'Shopping', cost: 140, isNeed: false, explanation: 'Impulse discount trap — wait 24h before buying non-essential apparel.', icon: '👟' },
  { id: '7', name: 'Monthly Public Transit Metro Pass', category: 'Transit', cost: 50, isNeed: true, explanation: 'Essential for commuting to campus classes and part-time work.', icon: '🚇' },
  { id: '8', name: 'Daily $7 Caramel Frappuccino', category: 'Dining', cost: 35, isNeed: false, explanation: 'Brewing campus coffee saves $120+ every month.', icon: '☕' }
];

export const NeedsVsWantsPage: React.FC<NeedsVsWantsPageProps> = ({
  onNavigateToPractice
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);
  const [isFinished, setIsFinished] = useState(false);

  const currentCard = challengeCards[currentIndex];

  const handleClassify = (userSaidNeed: boolean) => {
    if (!currentCard || isFinished) return;

    const isCorrect = currentCard.isNeed === userSaidNeed;
    if (isCorrect) setScore((prev) => prev + 1);

    setFeedback({
      isCorrect,
      text: currentCard.explanation
    });
  };

  const handleNext = () => {
    setFeedback(null);
    if (currentIndex < challengeCards.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsFinished(true);
    }
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setScore(0);
    setFeedback(null);
    setIsFinished(false);
  };

  return (
    <div className="min-h-screen bg-[#f0f0f0] text-[#1a1919] font-sans antialiased pb-24 relative">
      
      {/* Sub-Header Breadcrumb */}
      <div className="border-b border-[#1a1919]/8 bg-white/70 backdrop-blur-md sticky top-[68px] z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono font-bold uppercase text-[#0eb02c] bg-[#0eb02c]/10 px-2.5 py-1 rounded-lg border border-[#0eb02c]/20">
              01 · Learn Module
            </span>
            <span className="text-xs text-[#1a1919]/60 font-medium">
              / Needs vs. Wants Interactive Classification Engine
            </span>
          </div>
          <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#0eb02c] bg-white px-3 py-1.5 rounded-xl border border-[#1a1919]/10 shadow-xs">
            SIMULATOR ACTIVE
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-12">
        
        {/* 1. Hero Introduction */}
        <section className="bg-white rounded-3xl p-8 sm:p-10 border border-[#1a1919]/10 shadow-sm relative overflow-hidden">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0eb02c]/10 border border-[#0eb02c]/20 text-xs font-mono font-bold text-[#0eb02c]">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>DISCRETIONARY CLASSIFIER</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-[#1a1919] leading-tight">
              Needs vs. Wants <span className="text-[#0eb02c]">Decision Engine</span>
            </h1>
            <p className="text-sm sm:text-base text-[#1a1919]/75 leading-relaxed font-medium">
              The difference between financial stress and a stress-free semester comes down to how quickly you recognize an artificial want disguised as an urgent need.
            </p>
          </div>
        </section>

        {/* 2. Interactive Simulator Card */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Card Simulator Player */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-[#1a1919]/10 shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#1a1919]/10">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-[#0eb02c]">
                  CARD {currentIndex + 1} OF {challengeCards.length}
                </span>
              </div>
              <div className="font-mono text-xs font-bold text-[#0922b0] bg-[#0922b0]/10 px-2.5 py-1 rounded-lg">
                SCORE: {score}/{challengeCards.length}
              </div>
            </div>

            {!isFinished ? (
              <div className="space-y-6">
                {/* Active Card Display */}
                <div className="p-8 rounded-3xl bg-[#f0f0f0] border border-[#1a1919]/10 text-center space-y-4 shadow-inner">
                  <div className="text-6xl">{currentCard.icon}</div>
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#1a1919]/60 px-2.5 py-1 rounded-md bg-white border border-[#1a1919]/10">
                      {currentCard.category}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-[#1a1919] mt-2">
                      {currentCard.name}
                    </h3>
                  </div>
                  <div className="text-2xl font-mono font-black text-[#0922b0]">
                    ${currentCard.cost}
                  </div>
                </div>

                {/* Answer Feedback Alert */}
                {feedback ? (
                  <div className={`p-4 rounded-2xl border text-xs font-semibold space-y-3 animate-in fade-in ${
                    feedback.isCorrect ? 'bg-[#0eb02c]/10 border-[#0eb02c]/30 text-[#0eb02c]' : 'bg-[#d12828]/10 border-[#d12828]/30 text-[#d12828]'
                  }`}>
                    <div className="flex items-center gap-2 font-bold text-sm">
                      <span>{feedback.isCorrect ? '✓ Spot on!' : '✕ Caution:'}</span>
                      <span className="text-[#1a1919]">{feedback.text}</span>
                    </div>
                    <button
                      onClick={handleNext}
                      className="w-full py-2.5 rounded-xl bg-[#1a1919] hover:bg-[#0922b0] text-white font-bold text-xs transition-all cursor-pointer"
                    >
                      Continue to Next Item →
                    </button>
                  </div>
                ) : (
                  /* Action Buttons: Need or Want */
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => handleClassify(true)}
                      className="py-4 rounded-2xl bg-[#0eb02c] hover:bg-[#0c9625] text-white font-bold text-sm shadow-md transition-all cursor-pointer hover:scale-102 active:scale-95 flex items-center justify-center gap-2"
                    >
                      <span>🟢 Non-Negotiable Need</span>
                    </button>
                    <button
                      onClick={() => handleClassify(false)}
                      className="py-4 rounded-2xl bg-[#d12828] hover:bg-[#b02222] text-white font-bold text-sm shadow-md transition-all cursor-pointer hover:scale-102 active:scale-95 flex items-center justify-center gap-2"
                    >
                      <span>🔴 Discretionary Want</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* Completion Screen */
              <div className="py-10 text-center space-y-4">
                <div className="text-6xl">🏆</div>
                <h3 className="text-2xl font-black text-[#1a1919]">Simulation Complete!</h3>
                <p className="text-sm text-[#1a1919]/75 font-medium max-w-md mx-auto">
                  You scored <strong className="text-[#0eb02c] font-black font-mono">{score} out of {challengeCards.length}</strong> correct classifications.
                </p>
                <button
                  onClick={handleReset}
                  className="px-6 py-3 rounded-xl bg-[#0922b0] hover:bg-[#071a8a] text-white font-bold text-xs inline-flex items-center gap-2 shadow-md cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Restart Challenge</span>
                </button>
              </div>
            )}
          </div>

          {/* 3. The 24-Hour Pause Decision Flowchart */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-[#1a1919]/10 shadow-sm space-y-5">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#0922b0]" />
              <h3 className="font-bold text-base text-[#1a1919]">The 4-Step 24h Pause Matrix</h3>
            </div>
            <p className="text-xs text-[#1a1919]/70 leading-relaxed font-medium">
              When tempted by an unplanned expense over $20, apply this visual filter:
            </p>

            <div className="space-y-3">
              <div className="p-3.5 rounded-2xl bg-[#f0f0f0] border border-[#1a1919]/10 text-xs space-y-1">
                <span className="font-mono font-bold text-[#0922b0] text-[11px]">STEP 1 · IDENTIFY</span>
                <p className="font-medium text-[#1a1919]">Will this item cause academic harm or health risk if you don't buy it today?</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#f0f0f0] border border-[#1a1919]/10 text-xs space-y-1">
                <span className="font-mono font-bold text-[#0eb02c] text-[11px]">STEP 2 · 24-HOUR CLOCK</span>
                <p className="font-medium text-[#1a1919]">If it is a Want, close the app and wait 24 hours. 82% of impulse urges disappear overnight.</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#f0f0f0] border border-[#1a1919]/10 text-xs space-y-1">
                <span className="font-mono font-bold text-[#d12828] text-[11px]">STEP 3 · WORK HOUR COMPARISON</span>
                <p className="font-medium text-[#1a1919]">Divide the price by your hourly wage. Is that jacket worth 8 hours of campus work?</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#0922b0]/5 border border-[#0922b0]/20 text-xs space-y-1">
                <span className="font-mono font-bold text-[#0922b0] text-[11px]">STEP 4 · INTENTIONAL DECISION</span>
                <p className="font-medium text-[#1a1919]">If you still want it after 24h, buy it guilt-free from your 30% Wants envelope.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 4. CTA to Practice Studio */}
        <section className="bg-[#0922b0] rounded-3xl p-8 sm:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 max-w-xl text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-black">Ready to apply Needs vs Wants in your budget?</h3>
            <p className="text-xs sm:text-sm text-white/80">
              Open the 50/30/20 Practice Studio to balance your essential outlays against your guilt-free lifestyle allowance.
            </p>
          </div>
          <button
            onClick={() => {
              if (onNavigateToPractice) onNavigateToPractice();
              else window.location.hash = '#expense-planner';
            }}
            className="px-6 py-3.5 bg-[#0eb02c] hover:bg-[#0c9626] text-white text-xs font-bold rounded-xl shadow-lg flex items-center gap-2 cursor-pointer transition-all shrink-0 active:scale-95"
          >
            <span>Open Practice Studio</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </section>

      </main>
    </div>
  );
};
