import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sparkles, ArrowLeft, BookOpen, Sliders, Users, HelpCircle, Github, Star } from 'lucide-react';

interface SubpageHeaderProps {
  currentRoute?: string;
  badgeText?: string;
}

export const SubpageHeader: React.FC<SubpageHeaderProps> = ({
  badgeText = 'Guide'
}) => {
  const location = useLocation();
  const path = location.pathname;

  return (
    <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-6 pb-4 relative z-40">
      <div className="flex items-center justify-between gap-4">
        {/* Left: Brand Pill with Home Link */}
        <Link 
          to="/"
          className="nav-pill rounded-2xl px-4 py-2 flex items-center gap-2.5 shadow-sm hover:border-[#1a1919]/20 transition-all bg-white/90 group"
          aria-label="Back to BudgetBasics Home"
        >
          <div className="w-6 h-6 rounded-lg bg-[#0eb02c] flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
            <Sparkles className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="font-semibold text-sm tracking-tight text-[#1a1919]">BudgetBasics</span>
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#0eb02c]/10 text-[#0eb02c] font-bold border border-[#0eb02c]/20">
            {badgeText}
          </span>
        </Link>

        {/* Center: Main Navigation Pill */}
        <nav className="hidden lg:flex items-center nav-pill rounded-full px-5 py-1.5 gap-2 text-xs font-semibold text-[#1a1919]/75 bg-white/90 shadow-sm">
          <Link
            to="/"
            className={`px-3.5 py-1.5 rounded-full transition-colors flex items-center gap-1.5 ${
              path === '/' ? 'bg-[#1a1919] text-white shadow-xs' : 'hover:text-[#0922b0]'
            }`}
          >
            <span>Overview</span>
          </Link>

          <Link
            to="/budget-rule"
            className={`px-3.5 py-1.5 rounded-full transition-colors flex items-center gap-1.5 ${
              path === '/budget-rule' ? 'bg-[#0922b0] text-white shadow-xs' : 'hover:text-[#0922b0]'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>50/30/20 Rule</span>
          </Link>

          <Link
            to="/savings-goals"
            className={`px-3.5 py-1.5 rounded-full transition-colors flex items-center gap-1.5 ${
              path === '/savings-goals' ? 'bg-[#0eb02c] text-white shadow-xs' : 'hover:text-[#0eb02c]'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Savings Studio</span>
          </Link>

          <Link
            to="/about"
            className={`px-3.5 py-1.5 rounded-full transition-colors flex items-center gap-1.5 ${
              path === '/about' ? 'bg-[#0922b0] text-white shadow-xs' : 'hover:text-[#0922b0]'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>About Us</span>
          </Link>

          <Link
            to="/faq"
            className={`px-3.5 py-1.5 rounded-full transition-colors flex items-center gap-1.5 ${
              path === '/faq' ? 'bg-[#1a1919] text-white shadow-xs' : 'hover:text-[#1a1919]'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>FAQ</span>
          </Link>
        </nav>

        {/* Right: Quick Action & Back to Home Button */}
        <div className="flex items-center gap-2.5">
          <Link
            to="/"
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-[#1a1919]/10 text-xs font-semibold text-[#1a1919] hover:bg-white hover:border-[#1a1919]/25 transition-all shadow-xs"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#0eb02c]" />
            <span className="hidden sm:inline">Landing Page</span>
          </Link>

          <a
            href="https://github.com/Moniye-lang/TW7"
            target="_blank"
            rel="noreferrer"
            className="bg-[#1a1919] hover:bg-[#2b2a2a] text-white rounded-full px-3.5 py-1.5 flex items-center gap-1.5 text-xs font-medium transition-all shadow-sm active:scale-95"
          >
            <Github className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">GitHub</span>
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
          </a>
        </div>
      </div>
    </header>
  );
};
