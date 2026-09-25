import React, { useState, useEffect, useRef } from 'react';
import { 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  PieChart, 
  Zap, 
  Clock, 
  ArrowUpRight 
} from 'lucide-react';
import { DotLottiePlayer } from './DotLottiePlayer';
import { learnBooksLottieJson } from '../data/learnLottie';

export const LearnBudgetingSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredBucket, setHoveredBucket] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      },
      { 
        threshold: 0.20 // Triggers when 20% of the section enters the viewport
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="learn" 
      className="py-16 md:py-24 bg-[#f0f0f0] text-[#1a1919] relative overflow-hidden font-sans border-t border-[#1a1919]/10"
    >
      {/* Background ambient accents */}
      <div className="absolute top-1/4 -left-40 w-96 h-96 bg-[#0922b0]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-[#0eb02c]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ========================================================================= */}
        {/* TOP EDITORIAL SPLIT SECTION (MATCHING IMAGE 2 LAYOUT) */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Bold Typography, Subhead & 2 Pill CTAs with Overflow Slide-in */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8 flex flex-col justify-center">
            
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
              <span>01 · LEARN BUDGETING</span>
            </div>

            {/* Headline with Serif Italic Accent */}
            <h2 
              className={`text-4xl sm:text-5xl xl:text-[56px] font-black tracking-tight text-[#1a1919] leading-[1.05] transition-all duration-700 ${
                isVisible ? 'animate-slide-in-left' : 'opacity-0'
              }`}
              style={{ animationDelay: '0.08s' }}
            >
              Master the Fundamentals. <br />
              <span className="font-serif italic font-normal text-3xl sm:text-5xl xl:text-[52px] text-[#0eb02c] block mt-1">
                No complex spreadsheets required.
              </span>
            </h2>

            {/* Editorial Body Copy */}
            <p 
              className={`text-sm sm:text-base text-[#1a1919]/85 font-medium leading-relaxed max-w-lg transition-all duration-700 ${
                isVisible ? 'animate-slide-in-left' : 'opacity-0'
              }`}
              style={{ animationDelay: '0.15s' }}
            >
              Most students abandon budgeting because traditional apps treat money like accounting tests. Our visual frameworks teach practical cash awareness that fits real semester schedules — bridging part-time paychecks, student aid, and daily living.
            </p>

            {/* Dual Pill CTA Buttons (Matching Image 2) */}
            <div 
              className={`flex flex-wrap items-center gap-4 pt-2 transition-all duration-700 ${
                isVisible ? 'animate-slide-in-left' : 'opacity-0'
              }`}
              style={{ animationDelay: '0.22s' }}
            >
              <a
                href="#practice"
                className="px-8 py-3.5 sm:py-4 rounded-full bg-[#0eb02c] hover:bg-[#0c9626] text-white text-xs sm:text-sm font-bold tracking-wide flex items-center gap-3 shadow-lg shadow-[#0eb02c]/25 hover:shadow-xl transition-all duration-200 active:scale-95 group"
              >
                <span>EXPLORE THE METHOD</span>
                <div className="w-6 h-6 rounded-full bg-white text-[#0eb02c] flex items-center justify-center group-hover:translate-x-1 transition-transform">
                  <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
              </a>

              <a
                href="#resources"
                className="px-7 py-3.5 sm:py-4 rounded-full bg-transparent hover:bg-white text-[#1a1919] text-xs sm:text-sm font-bold border border-[#1a1919]/25 shadow-xs transition-all duration-200 active:scale-95"
              >
                STUDENT TOOLKITS
              </a>
            </div>

          </div>

          {/* Right Column: Unified Box with 2x2 Grid & Dynamic Full-Card Hover Coverage */}
          <div className="lg:col-span-6 relative">
            <div 
              onMouseLeave={() => setHoveredBucket(null)}
              className={`rounded-3xl border shadow-xl overflow-hidden relative group transition-all duration-500 ${
                hoveredBucket === 1
                  ? 'bg-[#1a1919]/[0.04] border-[#1a1919]/30 shadow-[#1a1919]/10'
                  : hoveredBucket === 2
                  ? 'bg-[#d12828]/[0.06] border-[#d12828]/40 shadow-[#d12828]/15'
                  : hoveredBucket === 3
                  ? 'bg-[#0eb02c]/[0.06] border-[#0eb02c]/40 shadow-[#0eb02c]/15'
                  : hoveredBucket === 4
                  ? 'bg-[#0922b0]/[0.06] border-[#0922b0]/40 shadow-[#0922b0]/15'
                  : 'bg-white border-[#1a1919]/15 shadow-xl'
              }`}
            >
              
              {/* Dynamic top ambient gradient bar covering card header */}
              <div 
                className={`absolute top-0 left-0 right-0 h-1.5 transition-all duration-500 z-30 ${
                  hoveredBucket === 1
                    ? 'bg-[#1a1919]'
                    : hoveredBucket === 2
                    ? 'bg-[#d12828]'
                    : hoveredBucket === 3
                    ? 'bg-[#0eb02c]'
                    : hoveredBucket === 4
                    ? 'bg-[#0922b0]'
                    : 'bg-gradient-to-r from-[#0922b0] via-[#0eb02c] to-[#0922b0]'
                }`} 
              />

              {/* Dynamic Full-Card Ambient Color Wash & Radial Glow Overlay */}
              <div 
                className={`absolute inset-0 z-0 pointer-events-none transition-all duration-500 ease-out ${
                  hoveredBucket === 1 
                    ? 'opacity-100 bg-gradient-to-br from-[#1a1919]/10 via-[#1a1919]/5 to-transparent' 
                    : hoveredBucket === 2 
                    ? 'opacity-100 bg-gradient-to-br from-[#d12828]/15 via-[#d12828]/8 to-[#d12828]/[0.02]' 
                    : hoveredBucket === 3 
                    ? 'opacity-100 bg-gradient-to-br from-[#0eb02c]/15 via-[#0eb02c]/8 to-[#0eb02c]/[0.02]' 
                    : hoveredBucket === 4 
                    ? 'opacity-100 bg-gradient-to-br from-[#0922b0]/15 via-[#0922b0]/8 to-[#0922b0]/[0.02]' 
                    : 'opacity-0'
                }`} 
              />

              {/* 2x2 Quadrant Grid with dividing borders and transparent backdrop allowing full card coverage */}
              <div className="grid grid-cols-1 sm:grid-cols-2 chevron-pattern divide-y sm:divide-y-0 sm:divide-x divide-[#1a1919]/10 relative z-10">
                
                {/* Quadrant 1 (Top Left): 50% Essential Needs */}
                <div 
                  onMouseEnter={() => setHoveredBucket(1)}
                  className={`p-7 sm:p-8 sm:border-b border-[#1a1919]/10 relative overflow-hidden transition-all duration-300 cursor-pointer ${
                    hoveredBucket === 1 
                      ? 'bg-white/90 shadow-md ring-1 ring-black/5 scale-[1.01] z-20 rounded-tl-2xl' 
                      : hoveredBucket !== null 
                      ? 'bg-transparent opacity-85' 
                      : 'bg-white/40 hover:bg-white/80'
                  }`}
                >
                  <div className={`transition-all duration-700 ${isVisible ? 'animate-slide-in-left' : 'opacity-0'}`}>
                    <div className="flex items-center justify-between mb-3">
                      <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-md transition-colors ${
                        hoveredBucket === 1 ? 'bg-[#1a1919] text-white' : 'bg-[#1a1919]/5 text-[#1a1919]/70 border border-[#1a1919]/10'
                      }`}>
                        BUDGETING BASICS
                      </span>
                      <PieChart className={`w-4 h-4 transition-colors ${hoveredBucket === 1 ? 'text-[#1a1919] scale-110' : 'text-[#1a1919]/50'}`} />
                    </div>

                    <div className="text-4xl sm:text-5xl font-black text-[#1a1919] tracking-tight mb-1">
                      50%
                    </div>

                    <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#1a1919]/70 mb-2">
                      Essential Needs
                    </div>

                    <p className="text-xs text-[#1a1919]/75 font-medium leading-relaxed">
                      Dorm/apartment rent, utilities, meal plans, groceries, and tuition minimums.
                    </p>
                  </div>
                </div>

                {/* Quadrant 2 (Top Right): Needs vs Wants / 30% Guilt-Free Fun */}
                <div 
                  onMouseEnter={() => setHoveredBucket(2)}
                  className={`p-7 sm:p-8 sm:border-b border-[#1a1919]/10 relative overflow-hidden transition-all duration-300 cursor-pointer ${
                    hoveredBucket === 2 
                      ? 'bg-white/90 shadow-md ring-1 ring-[#d12828]/20 scale-[1.01] z-20 rounded-tr-2xl' 
                      : hoveredBucket !== null 
                      ? 'bg-transparent opacity-85' 
                      : 'bg-white/40 hover:bg-white/80'
                  }`}
                >
                  <div 
                    className={`transition-all duration-700 ${isVisible ? 'animate-slide-in-right' : 'opacity-0'}`}
                    style={{ animationDelay: '0.1s' }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-md transition-colors ${
                        hoveredBucket === 2 ? 'bg-[#d12828] text-white shadow-xs' : 'bg-[#d12828]/10 text-[#d12828] border border-[#d12828]/20'
                      }`}>
                        NEEDS VS WANTS
                      </span>
                      <Zap className={`w-4 h-4 transition-colors ${hoveredBucket === 2 ? 'text-[#d12828] scale-110' : 'text-[#d12828]/70'}`} />
                    </div>

                    <div className="text-4xl sm:text-5xl font-black text-[#d12828] tracking-tight mb-1">
                      30%
                    </div>

                    <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#d12828] mb-2">
                      Guilt-Free Fun
                    </div>

                    <p className="text-xs text-[#1a1919]/75 font-medium leading-relaxed">
                      Coffee runs, dining out, concert tickets, streaming, and campus weekend activities.
                    </p>
                  </div>
                </div>

                {/* Quadrant 3 (Bottom Left): Savings Goals / 20% Growth & Cushion */}
                <div 
                  onMouseEnter={() => setHoveredBucket(3)}
                  className={`p-7 sm:p-8 relative overflow-hidden transition-all duration-300 cursor-pointer ${
                    hoveredBucket === 3 
                      ? 'bg-white/90 shadow-md ring-1 ring-[#0eb02c]/20 scale-[1.01] z-20' 
                      : hoveredBucket !== null 
                      ? 'bg-transparent opacity-85' 
                      : 'bg-white/40 hover:bg-white/80'
                  }`}
                >
                  <div 
                    className={`transition-all duration-700 ${isVisible ? 'animate-slide-in-left' : 'opacity-0'}`}
                    style={{ animationDelay: '0.15s' }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-md transition-colors ${
                        hoveredBucket === 3 ? 'bg-[#0eb02c] text-white shadow-xs' : 'bg-[#0eb02c]/10 text-[#0eb02c] border border-[#0eb02c]/20'
                      }`}>
                        SAVINGS GOALS
                      </span>
                      <ShieldCheck className={`w-4 h-4 transition-colors ${hoveredBucket === 3 ? 'text-[#0eb02c] scale-110' : 'text-[#0eb02c]/70'}`} />
                    </div>

                    <div className="text-4xl sm:text-5xl font-black text-[#0eb02c] tracking-tight mb-1">
                      20%
                    </div>

                    <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#0eb02c] mb-2">
                      Growth & Cushion
                    </div>

                    <p className="text-xs text-[#1a1919]/75 font-medium leading-relaxed">
                      $500 starter emergency shield, avoiding overdraft fees, and future savings.
                    </p>
                  </div>
                </div>

                {/* Quadrant 4 (Bottom Right): Expense Planner / 15 Mins Weekly Habit */}
                <div 
                  onMouseEnter={() => setHoveredBucket(4)}
                  className={`p-7 sm:p-8 relative overflow-hidden transition-all duration-300 cursor-pointer ${
                    hoveredBucket === 4 
                      ? 'bg-white/90 shadow-md ring-1 ring-[#0922b0]/20 scale-[1.01] z-20' 
                      : hoveredBucket !== null 
                      ? 'bg-transparent opacity-85' 
                      : 'bg-white/40 hover:bg-white/80'
                  }`}
                >
                  <div 
                    className={`transition-all duration-700 ${isVisible ? 'animate-slide-in-right' : 'opacity-0'}`}
                    style={{ animationDelay: '0.2s' }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-md transition-colors ${
                        hoveredBucket === 4 ? 'bg-[#0922b0] text-white shadow-xs' : 'bg-[#0922b0]/10 text-[#0922b0] border border-[#0922b0]/20'
                      }`}>
                        EXPENSE PLANNER
                      </span>
                      <Clock className={`w-4 h-4 transition-colors ${hoveredBucket === 4 ? 'text-[#0922b0] scale-110' : 'text-[#0922b0]/70'}`} />
                    </div>

                    <div className="text-4xl sm:text-5xl font-black text-[#0922b0] tracking-tight mb-1">
                      15 Mins
                    </div>

                    <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#0922b0] mb-2">
                      Weekly Glance
                    </div>

                    <p className="text-xs text-[#1a1919]/75 font-medium leading-relaxed">
                      Zero tedious daily receipt logging. Just a 15-minute weekly review to stay on track.
                    </p>
                  </div>
                </div>

              </div>
              {/* End 2x2 Grid */}

              {/* Bottom Verification Footer Bar (Money Mistakes Safeguard) */}
              <div 
                className={`px-7 py-3.5 text-white flex items-center justify-between text-xs font-bold relative z-20 transition-colors duration-500 ${
                  hoveredBucket === 1 
                    ? 'bg-[#1a1919]' 
                    : hoveredBucket === 2 
                    ? 'bg-[#1a1919] border-t border-[#d12828]/40' 
                    : hoveredBucket === 3 
                    ? 'bg-[#1a1919] border-t border-[#0eb02c]/40' 
                    : hoveredBucket === 4 
                    ? 'bg-[#1a1919] border-t border-[#0922b0]/40' 
                    : 'bg-[#1a1919]'
                }`}
              >
                <span className="flex items-center gap-2">
                  <CheckCircle2 className={`w-4 h-4 transition-colors duration-300 ${
                    hoveredBucket === 2 ? 'text-[#d12828]' : hoveredBucket === 3 ? 'text-[#0eb02c]' : hoveredBucket === 4 ? 'text-[#0922b0]' : 'text-[#0eb02c]'
                  }`} />
                  <span className="text-white/85">MONEY MISTAKES SAFEGUARD · Protects against overdrafts & surprise fees</span>
                </span>
                <ArrowUpRight className="w-4 h-4 text-white/70" />
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
