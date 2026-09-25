import React from 'react';
import { 
  Clock, 
  ShieldCheck, 
  Zap, 
  ArrowRight, 
  Target
} from 'lucide-react';

export const VisualMethodBento: React.FC = () => {
  return (
    <section id="guide" className="py-20 md:py-28 bg-[#f0f0f0] text-[#1a1919] relative overflow-hidden font-sans border-t border-[#1a1919]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0922b0]/10 border border-[#0922b0]/30 text-xs font-semibold text-[#0922b0] shadow-xs mb-4">
            <span className="w-2 h-2 rounded-full bg-[#0922b0] animate-pulse" />
            <span>THE SMARTBUDGET BLUEPRINT · 4 HABITS</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-[#1a1919] leading-[1.12] mb-4">
            4 Visual Habits to Master Your Money in{' '}
            <span className="bg-gradient-to-r from-[#0922b0] via-[#0eb02c] to-[#0922b0] bg-clip-text text-transparent">
              10 Minutes a Week
            </span>
          </h2>

          <p className="text-base sm:text-lg text-[#1a1919]/80 font-medium leading-relaxed">
            No daily manual tracking or spreadsheets. Implement these four rules once and let your money organize itself.
          </p>
        </div>

        {/* Bento Grid (4 Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Card 1: Span 7 - The 24-Hour Purchase Rule */}
          <div className="md:col-span-7 bg-white/95 backdrop-blur-md rounded-3xl p-8 border border-[#1a1919]/10 shadow-sm hover:border-[#0922b0]/40 transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-[#0922b0]/10 border border-[#0922b0]/20 flex items-center justify-center text-[#0922b0] group-hover:scale-110 transition-transform">
                  <Clock className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-[#0922b0]/10 text-[#0922b0]">
                  Habit #1 · Impulse Shield
                </span>
              </div>

              <h3 className="text-2xl font-black text-[#1a1919] tracking-tight mb-3">
                The 24-Hour Rule for Non-Essential Buys
              </h3>

              <p className="text-xs sm:text-sm text-[#1a1919]/75 font-normal leading-relaxed mb-6">
                Whenever you see something non-essential over $30 (clothes, tech gadgets, video games), bookmark it and wait 24 hours. Over 70% of impulse buying urges disappear overnight.
              </p>

              <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-[#f0f0f0] border border-[#1a1919]/5 text-xs font-semibold">
                <div className="flex items-center gap-2 text-[#d12828]">
                  <span className="w-2 h-2 rounded-full bg-[#d12828]" />
                  <span>Instant Buy: Immediate regret</span>
                </div>
                <div className="flex items-center gap-2 text-[#0eb02c]">
                  <span className="w-2 h-2 rounded-full bg-[#0eb02c]" />
                  <span>24hr Pause: $180+/mo saved</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-[#1a1919]/5 flex items-center justify-between">
              <span className="text-xs text-[#1a1919]/60 font-mono font-semibold">Average Student Savings: $2,100/yr</span>
              <ArrowRight className="w-4 h-4 text-[#0922b0] group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 2: Span 5 - The $500 Starter Cushion */}
          <div className="md:col-span-5 bg-white/95 backdrop-blur-md rounded-3xl p-8 border border-[#1a1919]/10 shadow-sm hover:border-[#0eb02c]/40 transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-[#0eb02c]/10 border border-[#0eb02c]/20 flex items-center justify-center text-[#0eb02c] group-hover:scale-110 transition-transform">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-[#0eb02c]/10 text-[#0eb02c]">
                  Habit #2 · Peace of Mind
                </span>
              </div>

              <h3 className="text-2xl font-black text-[#1a1919] tracking-tight mb-3">
                The $500 Emergency Cushion
              </h3>

              <p className="text-xs sm:text-sm text-[#1a1919]/75 font-normal leading-relaxed mb-6">
                Flat tire? Broken laptop charger? Lab fee? Before investing or aggressive debt payoffs, keep a dedicated $500 cash buffer to stop unexpected shocks from putting you in high-interest debt.
              </p>

              <div className="p-4 rounded-2xl bg-[#0eb02c]/10 border border-[#0eb02c]/20 text-xs font-bold text-[#0eb02c] flex items-center justify-between">
                <span>Starter Goal:</span>
                <span className="text-base font-black">$500 Buffer</span>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-[#1a1919]/5 flex items-center justify-between">
              <span className="text-xs text-[#1a1919]/60 font-mono font-semibold">Zero Overdraft Anxiety</span>
              <ArrowRight className="w-4 h-4 text-[#0eb02c] group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 3: Span 5 - Automated Split on Payday */}
          <div className="md:col-span-5 bg-white/95 backdrop-blur-md rounded-3xl p-8 border border-[#1a1919]/10 shadow-sm hover:border-[#0922b0]/40 transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-[#0922b0]/10 border border-[#0922b0]/20 flex items-center justify-center text-[#0922b0] group-hover:scale-110 transition-transform">
                  <Zap className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-[#0922b0]/10 text-[#0922b0]">
                  Habit #3 · Pay Yourself First
                </span>
              </div>

              <h3 className="text-2xl font-black text-[#1a1919] tracking-tight mb-3">
                Automated Payday Rule
              </h3>

              <p className="text-xs sm:text-sm text-[#1a1919]/75 font-normal leading-relaxed mb-6">
                Set up an auto-transfer of your 20% savings bucket the moment your paycheck drops. If you never see the money in your checking account, you'll never accidentally spend it.
              </p>

              <div className="p-4 rounded-2xl bg-[#f0f0f0] border border-[#1a1919]/10 text-xs font-semibold text-[#1a1919]/80 space-y-1.5">
                <div className="flex justify-between font-bold">
                  <span>Paycheck arrives:</span>
                  <span className="text-[#0922b0]">Auto-route 20%</span>
                </div>
                <div className="flex justify-between text-[#1a1919]/60">
                  <span>Effort required:</span>
                  <span>Set once, runs forever</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-[#1a1919]/5 flex items-center justify-between">
              <span className="text-xs text-[#1a1919]/60 font-mono font-semibold">100% Hands-Off Automation</span>
              <ArrowRight className="w-4 h-4 text-[#0922b0] group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 4: Span 7 - Student Perk Optimization */}
          <div className="md:col-span-7 bg-white/95 backdrop-blur-md rounded-3xl p-8 border border-[#1a1919]/10 shadow-sm hover:border-[#0eb02c]/40 transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-[#0eb02c]/10 border border-[#0eb02c]/20 flex items-center justify-center text-[#0eb02c] group-hover:scale-110 transition-transform">
                  <Target className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-[#0eb02c]/10 text-[#0eb02c]">
                  Habit #4 · College Perks
                </span>
              </div>

              <h3 className="text-2xl font-black text-[#1a1919] tracking-tight mb-3">
                Stack Student Discounts on Recurring Bills
              </h3>

              <p className="text-xs sm:text-sm text-[#1a1919]/75 font-normal leading-relaxed mb-6">
                Your university email address is worth thousands of dollars. Spotify + Hulu ($5.99 vs $20), GitHub Student Pack ($200+ free software), transit cards, and museum memberships cut your fixed monthly needs drastically.
              </p>

              <div className="grid grid-cols-3 gap-2.5 text-center text-xs">
                <div className="p-3 rounded-xl bg-[#0922b0]/10 border border-[#0922b0]/20">
                  <span className="font-bold text-[#0922b0] block">Spotify Student</span>
                  <span className="text-[11px] text-[#1a1919]/60 font-medium">Save $14/mo</span>
                </div>
                <div className="p-3 rounded-xl bg-[#0eb02c]/10 border border-[#0eb02c]/20">
                  <span className="font-bold text-[#0eb02c] block">Transit Pass</span>
                  <span className="text-[11px] text-[#1a1919]/60 font-medium">Save $45/mo</span>
                </div>
                <div className="p-3 rounded-xl bg-[#d12828]/10 border border-[#d12828]/20">
                  <span className="font-bold text-[#d12828] block">Tech & Software</span>
                  <span className="text-[11px] text-[#1a1919]/60 font-medium">Save $60+/mo</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-[#1a1919]/5 flex items-center justify-between">
              <span className="text-xs text-[#1a1919]/60 font-mono font-semibold">Total Savings: $1,400+/year</span>
              <ArrowRight className="w-4 h-4 text-[#0eb02c] group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
