import React, { useEffect, useRef, useState } from 'react';
import { 
  ArrowRight, 
  TrendingUp, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowUpRight,
  PieChart
} from 'lucide-react';

export const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          // Reset animation so it replays smoothly when scrolling back into the 40-50% zone
          setIsVisible(false);
        }
      },
      { 
        threshold: 0.45 // Activates precisely when 40-50% of the section enters the viewport
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
      id="about" 
      className="py-12 md:py-16 bg-[#f0f0f0] text-[#1a1919] relative overflow-hidden font-sans border-t border-[#1a1919]/10"
    >
      {/* Ambient background glow accents */}
      <div className="absolute top-1/3 -left-48 w-80 h-80 bg-[#0922b0]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-5 -right-48 w-80 h-80 bg-[#0eb02c]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Bold Editorial Headline, Mission & CTA Pills (Taller, Prominent Height) */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8 py-2 sm:py-6 flex flex-col justify-center">
            {/* Eyebrow Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0eb02c]/10 border border-[#0eb02c]/30 text-xs font-semibold text-[#0eb02c] shadow-xs self-start">
              <span className="w-2 h-2 rounded-full bg-[#0eb02c] animate-pulse" />
              <span>THE SMARTBUDGET PHILOSOPHY</span>
            </div>

            {/* Headline with Serif/Editorial Elegance */}
            <h2 className="text-4xl sm:text-5xl xl:text-[56px] font-black tracking-tight text-[#1a1919] leading-[1.05]">
              We don&apos;t just teach budgeting. <br />
              <span className="font-serif italic font-normal text-3xl sm:text-5xl xl:text-[52px] text-[#0922b0] block mt-1">
                We build freedom.
              </span>
            </h2>

            {/* Body Copy */}
            <p className="text-sm sm:text-base text-[#1a1919]/85 font-medium leading-relaxed max-w-lg">
              SmartBudget is a student-first personal finance system pairing visual 3D building blocks with real campus cash flows. We manage money as life habits, not accounting homework — bridging the gap between student loans, part-time paychecks, and real-world clarity.
            </p>

            {/* Dual CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#calculator"
                className="px-8 py-3.5 sm:py-4 rounded-full bg-[#0eb02c] hover:bg-[#0c9626] text-white text-sm font-bold tracking-wide flex items-center gap-3 shadow-lg shadow-[#0eb02c]/25 hover:shadow-xl transition-all duration-200 active:scale-95 group"
              >
                <span>EXPLORE THE METHOD</span>
                <div className="w-6 h-6 rounded-full bg-white text-[#0eb02c] flex items-center justify-center group-hover:translate-x-1 transition-transform">
                  <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
              </a>

              <a
                href="#examples"
                className="px-7 py-3.5 sm:py-4 rounded-full bg-transparent hover:bg-white text-[#1a1919] text-sm font-bold border border-[#1a1919]/25 shadow-xs transition-all duration-200 active:scale-95"
              >
                STUDENT STORIES
              </a>
            </div>
          </div>

          {/* Right Column: Single Unified Box */}
          <div className="lg:col-span-6 relative">
            {/* ONE UNIFIED OUTER BOX */}
            <div className="bg-white rounded-3xl border border-[#1a1919]/15 shadow-xl overflow-hidden relative group hover:border-[#0922b0]/40 transition-all duration-300">
              
              {/* Subtle top ambient gradient accent */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#0922b0] via-[#0eb02c] to-[#0922b0] z-20" />

              {/* 1. TOP CELL: Annual Student Impact (New Dark Rich Background, Static Grounded Content) */}
              <div className="p-7 sm:p-9 bg-[#1a1919] text-white border-b border-white/10 relative overflow-hidden">
                {/* Ambient dark pattern/glow */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-[#0922b0]/15 rounded-full blur-2xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#0eb02c]/10 rounded-full blur-2xl pointer-events-none" />

                <div className="relative z-10">
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-[#0eb02c]">
                      <TrendingUp className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-white/10 text-white/90 border border-white/15">
                      ANNUAL STUDENT IMPACT
                    </span>
                  </div>

                  <div className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-1">
                    $3,400+
                  </div>

                  <div className="text-xs font-mono font-bold uppercase tracking-wider text-white/70 mb-2.5">
                    Average Annual Student Savings Unlocked
                  </div>

                  <p className="text-xs sm:text-sm text-white/80 font-medium leading-relaxed max-w-lg">
                    By replacing manual spreadsheets with 3 automatic visual buckets, students prevent overdraft penalties and save consistently every semester.
                  </p>

                  <div className="mt-4 pt-3.5 border-t border-white/10 flex items-center justify-between text-xs font-bold text-[#0eb02c]">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-[#0eb02c]" />
                      <span className="text-white/80">Based on 12-month cohort tracking</span>
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-white/70" />
                  </div>
                </div>
              </div>

              {/* 2. BOTTOM ROW: Two Cells with Respective Slide-In Animations */}
              <div className="grid grid-cols-1 sm:grid-cols-2 bg-white chevron-pattern">
                
                {/* Bottom Left Cell: Slide-In from Left */}
                <div className="p-6 sm:p-7 sm:border-r border-b sm:border-b-0 border-[#1a1919]/10 relative overflow-hidden">
                  <div 
                    className={`transition-all duration-700 ${
                      isVisible ? 'animate-slide-in-left' : 'opacity-0'
                    }`}
                    style={{ animationDelay: '0.1s' }}
                  >
                    <div className="w-9 h-9 rounded-xl bg-[#0eb02c]/10 border border-[#0eb02c]/20 flex items-center justify-center text-[#0eb02c] mb-3">
                      <PieChart className="w-4 h-4" />
                    </div>

                    <div className="text-2xl sm:text-3xl font-black text-[#0eb02c] tracking-tight mb-0.5">
                      50 / 30 / 20
                    </div>

                    <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#1a1919]/60 mb-1.5">
                      Golden Ratio Blueprint
                    </div>

                    <p className="text-xs text-[#1a1919]/75 font-medium leading-relaxed">
                      50% Needs, 30% Guilt-Free Fun, 20% Emergency cushion & growth.
                    </p>
                  </div>
                </div>

                {/* Bottom Right Cell: Slide-In from Right */}
                <div className="p-6 sm:p-7 relative overflow-hidden">
                  <div 
                    className={`transition-all duration-700 ${
                      isVisible ? 'animate-slide-in-right' : 'opacity-0'
                    }`}
                    style={{ animationDelay: '0.2s' }}
                  >
                    <div className="w-9 h-9 rounded-xl bg-[#d12828]/10 border border-[#d12828]/20 flex items-center justify-center text-[#d12828] mb-3">
                      <ShieldCheck className="w-4 h-4" />
                    </div>

                    <div className="text-2xl sm:text-3xl font-black text-[#1a1919] tracking-tight mb-0.5">
                      15 Mins
                    </div>

                    <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#1a1919]/60 mb-1.5">
                      Weekly Check-In Habit
                    </div>

                    <p className="text-xs text-[#1a1919]/75 font-medium leading-relaxed">
                      No daily manual logging. A 15-min weekly glance to stay stress-free.
                    </p>
                  </div>
                </div>

              </div>
              {/* End Bottom Row */}

            </div>
            {/* End Single Outer Box */}
          </div>
          {/* End Right Column */}

        </div>
      </div>
    </section>
  );
};
