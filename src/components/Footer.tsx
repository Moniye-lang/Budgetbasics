import React from 'react';
import { Sparkles, Shield, BookOpen, GraduationCap, ArrowUpRight, ClipboardList, Search, MessageSquare } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#f0f0f0] text-[#1a1919] font-sans border-t border-[#1a1919]/10">
      {/* Top Value Banner */}
      <div className="border-b border-[#1a1919]/10 py-10 bg-white/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-white/90 border border-[#1a1919]/5 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#0eb02c]/10 border border-[#0eb02c]/20 flex items-center justify-center text-[#0eb02c]">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-[#1a1919] text-xs">100% Free & Open Guide</div>
              <div className="text-[11px] text-[#1a1919]/60 font-medium">No paywalls, courses, or bank links</div>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-white/90 border border-[#1a1919]/5 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#0922b0]/10 border border-[#0922b0]/20 flex items-center justify-center text-[#0922b0]">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-[#1a1919] text-xs">Built for Real Student Budgets</div>
              <div className="text-[11px] text-[#1a1919]/60 font-medium">From campus jobs to first apartments</div>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-white/90 border border-[#1a1919]/5 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#d12828]/10 border border-[#d12828]/20 flex items-center justify-center text-[#d12828]">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-[#1a1919] text-xs">Zero Math Anxiety</div>
              <div className="text-[11px] text-[#1a1919]/60 font-medium">Visual 3D buckets that tell you what to spend</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          {/* Brand Info */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-[#0eb02c] flex items-center justify-center text-white shadow-xs">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="font-black text-base tracking-tight text-[#1a1919]">BudgetBasics</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0eb02c]/10 text-[#0eb02c] font-bold border border-[#0eb02c]/20">
                Visual Guide
              </span>
            </div>
            <p className="text-[#1a1919]/70 text-xs sm:text-sm leading-relaxed max-w-sm font-medium">
              Small steps. Smart money. Empowering students and beginners with visual, stress-free money management blueprints.
            </p>
          </div>

          {/* 1. Learn Budgeting */}
          <div className="md:col-span-2">
            <div className="font-bold text-[#1a1919] uppercase tracking-wider text-xs mb-3 font-mono flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-[#0922b0]" />
              <span>Learn</span>
            </div>
            <ul className="space-y-2 text-xs font-semibold text-[#1a1919]/70">
              <li><a href="#learn" className="hover:text-[#0922b0] transition-colors">50/30/20 Rule</a></li>
              <li><a href="#learn" className="hover:text-[#0922b0] transition-colors">Cash Flow Timing</a></li>
              <li><a href="#learn" className="hover:text-[#0922b0] transition-colors">$500 Cushion Moat</a></li>
              <li><a href="#learn" className="hover:text-[#0922b0] transition-colors">24-Hour Purchase Filter</a></li>
            </ul>
          </div>

          {/* 2. Practice Planning */}
          <div className="md:col-span-2">
            <div className="font-bold text-[#1a1919] uppercase tracking-wider text-xs mb-3 font-mono flex items-center gap-1.5">
              <ClipboardList className="w-3.5 h-3.5 text-[#0eb02c]" />
              <span>Practice</span>
            </div>
            <ul className="space-y-2 text-xs font-semibold text-[#1a1919]/70">
              <li><a href="#practice" className="hover:text-[#0eb02c] transition-colors">Planning Studio</a></li>
              <li><a href="#practice" className="hover:text-[#0eb02c] transition-colors">Student Presets</a></li>
              <li><a href="#practice" className="hover:text-[#0eb02c] transition-colors">Daily Fun Calculator</a></li>
              <li><a href="#practice" className="hover:text-[#0eb02c] transition-colors">Habit Micro-Savings</a></li>
            </ul>
          </div>

          {/* 3. Explore Resources */}
          <div className="md:col-span-2">
            <div className="font-bold text-[#1a1919] uppercase tracking-wider text-xs mb-3 font-mono flex items-center gap-1.5">
              <Search className="w-3.5 h-3.5 text-[#0922b0]" />
              <span>Resources</span>
            </div>
            <ul className="space-y-2 text-xs font-semibold text-[#1a1919]/70">
              <li><a href="#resources" className="hover:text-[#0922b0] transition-colors">Notion Dashboard</a></li>
              <li><a href="#resources" className="hover:text-[#0922b0] transition-colors">Campus Discounts</a></li>
              <li><a href="#resources" className="hover:text-[#0922b0] transition-colors">Decision Flowchart</a></li>
              <li><a href="#resources" className="hover:text-[#0922b0] transition-colors">Roommate Splitter</a></li>
            </ul>
          </div>

          {/* 4. Connect & Help */}
          <div className="md:col-span-2">
            <div className="font-bold text-[#1a1919] uppercase tracking-wider text-xs mb-3 font-mono flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5 text-[#0eb02c]" />
              <span>Connect</span>
            </div>
            <ul className="space-y-2 text-xs font-semibold text-[#1a1919]/70">
              <li><a href="#connect" className="hover:text-[#0eb02c] transition-colors">Peer Budget Clinic</a></li>
              <li><a href="#connect" className="hover:text-[#0eb02c] transition-colors">Student FAQs</a></li>
              <li><a href="https://github.com/Leonxlnx/taste-skill/issues" target="_blank" rel="noreferrer" className="hover:text-[#0eb02c] transition-colors flex items-center gap-1">Community <ArrowUpRight className="w-3 h-3" /></a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#1a1919]/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[#1a1919]/60 text-xs font-medium">
          <div>
            &copy; 2026 BudgetBasics Guide. Open educational resource for students worldwide.
          </div>
          <div className="flex items-center gap-1.5 font-mono text-[11px]">
            <span>Designed with precision · 0% jargon, 100% visual.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
