import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowRight, 
  ArrowUpRight, 
  PieChart, 
  Zap, 
  ShieldCheck, 
  Clock, 
  CheckCircle2 
} from 'lucide-react';

interface LearnBudgetingSectionProps {
  onOpenLearnPage?: () => void;
}

export const LearnBudgetingSection: React.FC<LearnBudgetingSectionProps> = ({ onOpenLearnPage }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredBucket, setHoveredBucket] = useState<'bucket1' | 'bucket2' | 'bucket3' | 'habit' | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { 
        threshold: 0.25 
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleOpenLearn = () => {
    if (onOpenLearnPage) {
      onOpenLearnPage();
    } else {
      window.location.hash = 'learn-page';
    }
  };

  // Determine dynamic container background wash based on hovered quadrant
  const getContainerBgClass = () => {
    switch (hoveredBucket) {
      case 'bucket2':
        return 'bg-gradient-to-br from-white via-white to-red-500/10 border-[#d12828]/40 shadow-2xl shadow-[#d12828]/10';
      case 'bucket3':
        return 'bg-gradient-to-br from-white via-white to-[#0eb02c]/10 border-[#0eb02c]/40 shadow-2xl shadow-[#0eb02c]/10';
      case 'habit':
        return 'bg-gradient-to-br from-white via-white to-[#0922b0]/10 border-[#0922b0]/40 shadow-2xl shadow-[#0922b0]/10';
      case 'bucket1':
        return 'bg-gradient-to-br from-white via-white to-slate-100/60 border-[#1a1919]/30 shadow-2xl';
      default:
        return 'bg-white border-[#1a1919]/15 shadow-xl';
    }
  };

  return (
    <section 
      ref={sectionRef}
      id="learn" 
      className="py-20 md:py-28 bg-[#f0f0f0] text-[#1a1919] relative overflow-hidden font-sans border-t border-[#1a1919]/10"
    >
      {/* Ambient background glow */}
      <div className="absolute top-1/4 -left-40 w-96 h-96 bg-[#0eb02c]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-40 w-96 h-96 bg-[#0922b0]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* ============================================================ */}
          {/* LEFT COLUMN: Slide in from Left Overflow Animation           */}
          {/* ============================================================ */}
          <div 
            className={`lg:col-span-6 space-y-6 sm:space-y-8 transition-all duration-700 ease-out transform ${
              isVisible 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 -translate-x-16 pointer-events-none'
            }`}
          >
            {/* 01 · LEARN BUDGETING Eyebrow Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0eb02c]/10 border border-[#0eb02c]/30 text-xs font-mono font-bold text-[#0eb02c] shadow-xs self-start">
              <span className="w-2 h-2 rounded-full bg-[#0eb02c] animate-pulse" />
              <span>01 · LEARN BUDGETING</span>
            </div>

            {/* Headline */}
            <div className="space-y-1">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#1a1919] leading-[1.05]">
                Master the <br />
                Fundamentals.
              </h2>
              <span className="font-serif italic font-normal text-3xl sm:text-5xl md:text-6xl text-[#0eb02c] block mt-1">
                No complex spreadsheets required.
              </span>
            </div>

            {/* Body Copy */}
            <p className="text-sm sm:text-base text-[#1a1919]/80 font-normal leading-relaxed max-w-xl">
              Most students abandon budgeting because traditional apps treat money like accounting tests. Our visual frameworks teach practical cash awareness that fits real semester schedules — bridging part-time paychecks, student aid, and daily living.
            </p>

            {/* Dual CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={handleOpenLearn}
                className="px-8 py-4 rounded-full bg-[#0eb02c] hover:bg-[#0c9626] text-white text-xs sm:text-sm font-bold tracking-wider flex items-center gap-3 shadow-lg shadow-[#0eb02c]/25 hover:shadow-xl transition-all duration-200 active:scale-95 group uppercase"
              >
                <span>EXPLORE THE METHOD</span>
                <div className="w-6 h-6 rounded-full bg-white text-[#0eb02c] flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
                  <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
              </button>

              <a
                href="#resources"
                className="px-8 py-4 rounded-full bg-[#f0f0f0] hover:bg-white text-[#1a1919] text-xs sm:text-sm font-bold tracking-wider border border-[#1a1919]/15 shadow-xs transition-all duration-200 active:scale-95 uppercase"
              >
                STUDENT TOOLKITS
              </a>
            </div>
          </div>

          {/* ============================================================ */}
          {/* RIGHT COLUMN: Slide in from Right Overflow Animation          */}
          {/* ============================================================ */}
          <div 
            className={`lg:col-span-6 transition-all duration-700 ease-out transform ${
              isVisible 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 translate-x-16 pointer-events-none'
            }`}
          >
            {/* Main 4-Quadrant Container with Dynamic Hover Reflection */}
            <div className={`rounded-3xl border overflow-hidden transition-all duration-300 relative ${getContainerBgClass()}`}>
              
              {/* Glowing Top Ambient Accent Bar */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#0922b0] via-[#0eb02c] to-[#d12828] z-20" />

              {/* 2x2 Quadrant Grid */}
              <div className="grid grid-cols-2 divide-x divide-y divide-[#1a1919]/10 pt-1.5">
                
                {/* 1. TOP-LEFT: BUCKET 01 · 50% ESSENTIAL NEEDS */}
                <div 
                  className={`p-6 sm:p-8 transition-colors duration-200 cursor-pointer ${
                    hoveredBucket === 'bucket1' ? 'bg-[#1a1919]/[0.02]' : ''
                  }`}
                  onMouseEnter={() => setHoveredBucket('bucket1')}
                  onMouseLeave={() => setHoveredBucket(null)}
                  onClick={handleOpenLearn}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded bg-[#f0f0f0] text-[#1a1919]/70 border border-[#1a1919]/10 uppercase">
                      BUCKET 01
                    </span>
                    <PieChart className="w-5 h-5 text-[#1a1919]/40" />
                  </div>

                  <div className="text-4xl sm:text-5xl font-black text-[#1a1919] tracking-tight mb-2">
                    50%
                  </div>

                  <div className="text-xs font-bold uppercase tracking-wider text-[#1a1919]/80 mb-2">
                    ESSENTIAL NEEDS
                  </div>

                  <p className="text-xs text-[#1a1919]/70 leading-relaxed">
                    Dorm/apartment rent, utilities, meal plans, groceries, and tuition minimums.
                  </p>
                </div>

                {/* 2. TOP-RIGHT: BUCKET 02 · 30% GUILT-FREE FUN */}
                <div 
                  className={`p-6 sm:p-8 transition-colors duration-200 cursor-pointer ${
                    hoveredBucket === 'bucket2' ? 'bg-[#d12828]/5' : ''
                  }`}
                  onMouseEnter={() => setHoveredBucket('bucket2')}
                  onMouseLeave={() => setHoveredBucket(null)}
                  onClick={handleOpenLearn}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded bg-[#d12828]/10 text-[#d12828] border border-[#d12828]/20 uppercase">
                      BUCKET 02
                    </span>
                    <Zap className="w-5 h-5 text-[#d12828]" />
                  </div>

                  <div className="text-4xl sm:text-5xl font-black text-[#d12828] tracking-tight mb-2">
                    30%
                  </div>

                  <div className="text-xs font-bold uppercase tracking-wider text-[#d12828] mb-2">
                    GUILT-FREE FUN
                  </div>

                  <p className="text-xs text-[#1a1919]/70 leading-relaxed">
                    Coffee runs, dining out, concert tickets, streaming, and campus weekend activities.
                  </p>
                </div>

                {/* 3. BOTTOM-LEFT: BUCKET 03 · 20% GROWTH & CUSHION */}
                <div 
                  className={`p-6 sm:p-8 transition-colors duration-200 cursor-pointer ${
                    hoveredBucket === 'bucket3' ? 'bg-[#0eb02c]/5' : ''
                  }`}
                  onMouseEnter={() => setHoveredBucket('bucket3')}
                  onMouseLeave={() => setHoveredBucket(null)}
                  onClick={handleOpenLearn}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded bg-[#0eb02c]/10 text-[#0eb02c] border border-[#0eb02c]/20 uppercase">
                      BUCKET 03
                    </span>
                    <ShieldCheck className="w-5 h-5 text-[#0eb02c]" />
                  </div>

                  <div className="text-4xl sm:text-5xl font-black text-[#0eb02c] tracking-tight mb-2">
                    20%
                  </div>

                  <div className="text-xs font-bold uppercase tracking-wider text-[#0eb02c] mb-2">
                    GROWTH & CUSHION
                  </div>

                  <p className="text-xs text-[#1a1919]/70 leading-relaxed">
                    $500 starter emergency shield, avoiding overdraft fees, and future savings.
                  </p>
                </div>

                {/* 4. BOTTOM-RIGHT: HABIT SYSTEM · 15 MINS WEEKLY GLANCE */}
                <div 
                  className={`p-6 sm:p-8 transition-colors duration-200 cursor-pointer ${
                    hoveredBucket === 'habit' ? 'bg-[#0922b0]/5' : ''
                  }`}
                  onMouseEnter={() => setHoveredBucket('habit')}
                  onMouseLeave={() => setHoveredBucket(null)}
                  onClick={handleOpenLearn}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded bg-[#0922b0]/10 text-[#0922b0] border border-[#0922b0]/20 uppercase">
                      HABIT SYSTEM
                    </span>
                    <Clock className="w-5 h-5 text-[#0922b0]" />
                  </div>

                  <div className="text-4xl sm:text-5xl font-black text-[#0922b0] tracking-tight mb-2">
                    15 Mins
                  </div>

                  <div className="text-xs font-bold uppercase tracking-wider text-[#0922b0] mb-2">
                    WEEKLY GLANCE
                  </div>

                  <p className="text-xs text-[#1a1919]/70 leading-relaxed">
                    Zero tedious daily receipt logging. Just a 15-minute weekly review to stay on track.
                  </p>
                </div>

              </div>

              {/* Bottom Dark Status Bar */}
              <div 
                onClick={handleOpenLearn}
                className="bg-[#1a1919] hover:bg-black text-white p-4 px-6 flex items-center justify-between cursor-pointer transition-colors group"
              >
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#0eb02c] shrink-0" />
                  <span className="text-xs sm:text-sm font-semibold text-white/95">
                    Proven framework for undergraduate & grad students
                  </span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-white/60 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
