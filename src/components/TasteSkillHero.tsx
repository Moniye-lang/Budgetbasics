import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Check, ArrowRight, Github, Star, Sparkles, ShoppingBag, ArrowUpRight, Mail, MessageSquare, Send, X, ExternalLink, BookOpen, Sliders } from 'lucide-react';
import { DotLottiePlayer } from './DotLottiePlayer';
import { contactEmailLottieJson } from '../data/contactLottie';
import { learnBooksLottieJson } from '../data/learnLottie';
import { practiceHandsLottieJson } from '../data/practiceLottie';

interface TasteSkillHeroProps {
  onOpenDocs?: () => void;
  onExploreProducts?: () => void;
  cartCount?: number;
  onOpenCart?: () => void;
}

export const TasteSkillHero: React.FC<TasteSkillHeroProps> = ({
  onOpenDocs,
  onExploreProducts,
  cartCount = 0,
  onOpenCart,
}) => {
  const [isLearnHovered, setIsLearnHovered] = useState(false);
  const [isPracticeHovered, setIsPracticeHovered] = useState(false);
  const [isContactHovered, setIsContactHovered] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [contactSent, setContactSent] = useState(false);
  const [contactEmail, setContactEmail] = useState('');
  const [contactMsg, setContactMsg] = useState('');

  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const learnTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const practiceTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleLearnMouseEnter = () => {
    if (learnTimeoutRef.current) clearTimeout(learnTimeoutRef.current);
    setIsLearnHovered(true);
  };

  const handleLearnMouseLeave = () => {
    learnTimeoutRef.current = setTimeout(() => {
      setIsLearnHovered(false);
    }, 250);
  };

  const handlePracticeMouseEnter = () => {
    if (practiceTimeoutRef.current) clearTimeout(practiceTimeoutRef.current);
    setIsPracticeHovered(true);
  };

  const handlePracticeMouseLeave = () => {
    practiceTimeoutRef.current = setTimeout(() => {
      setIsPracticeHovered(false);
    }, 250);
  };

  const handleContactMouseEnter = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setIsContactHovered(true);
  };

  const handleContactMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setIsContactHovered(false);
    }, 250);
  };

  const handleSendContactMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactEmail) return;
    setContactSent(true);
    setTimeout(() => {
      setContactSent(false);
      setIsContactModalOpen(false);
      setContactEmail('');
      setContactMsg('');
    }, 2200);
  };

  return (
    <section className="relative pt-6 pb-20 md:pb-28 overflow-hidden paper-texture min-h-[96dvh] flex flex-col justify-between font-sans bg-[#f0f0f0] text-[#1a1919]">
      {/* 1. Top Floating Iconic Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mb-8 md:mb-12 z-40 relative">
        <div className="flex items-center justify-between">
          {/* Left Brand Pill */}
          <div className="nav-pill rounded-2xl px-4 py-2 flex items-center gap-2.5 cursor-pointer shadow-sm hover:border-[#1a1919]/20 transition-all bg-white/90">
            <div className="w-6 h-6 rounded-lg bg-[#0eb02c] flex items-center justify-center text-white shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-semibold text-sm tracking-tight text-[#1a1919]">BudgetBasics</span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#0eb02c]/10 text-[#0eb02c] font-bold border border-[#0eb02c]/20">
              Guide
            </span>
          </div>

          {/* Center & Right Navigation Pills */}
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center nav-pill rounded-full px-5 py-1.5 gap-4 text-xs font-semibold text-[#1a1919]/75 relative bg-white/90">
              {/* 1. Learn Navigation Item with Books Lottie Swap & Hover Flyout */}
              <div
                className="relative cursor-pointer group"
                onMouseEnter={handleLearnMouseEnter}
                onMouseLeave={handleLearnMouseLeave}
              >
                <a
                  href="#learn"
                  className={`relative px-3.5 py-1.5 rounded-full transition-all duration-200 flex items-center justify-center min-w-[74px] ${isLearnHovered
                      ? 'bg-[#0922b0]/10 text-[#0922b0]'
                      : 'hover:text-[#0922b0]'
                    }`}
                  aria-label="Learn Budgeting"
                >
                  {/* Idle State: Text "Learn" + Indicator Dot */}
                  <span
                    className={`font-semibold text-xs tracking-tight transition-all duration-200 flex items-center justify-center gap-1.5 ${isLearnHovered ? 'opacity-0 scale-75' : 'opacity-100 scale-100'
                      }`}
                  >
                    <span>Learn</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0922b0]" title="50/30/20" />
                  </span>

                  {/* Hover State: Books Lottie Animation */}
                  <div
                    className={`absolute inset-0 m-auto flex items-center justify-center transition-all duration-200 pointer-events-none ${isLearnHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
                      }`}
                  >
                    <div className="w-7 h-7 flex items-center justify-center shrink-0">
                      <DotLottiePlayer
                        animationData={learnBooksLottieJson}
                        src="/learn-books-lottie.json"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>
                </a>

                {/* Floating Quick Actions Flyout for Learn */}
                {isLearnHovered && (
                  <div
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-80 bg-white/95 backdrop-blur-2xl rounded-3xl p-5 shadow-2xl border border-[#1a1919]/10 z-50 text-left transition-all animate-in fade-in zoom-in-95 duration-200 cursor-default"
                    onMouseEnter={handleLearnMouseEnter}
                    onMouseLeave={handleLearnMouseLeave}
                  >
                    {/* Glowing Accent Top Bar */}
                    <div className="absolute top-0 left-6 right-6 h-0.5 bg-gradient-to-r from-[#0922b0] via-[#0eb02c] to-[#0922b0] rounded-full" />

                    {/* Centered LottieFiles Animation */}
                    <div className="flex flex-col items-center justify-center pt-1 pb-2">
                      <div className="w-20 h-20 relative flex items-center justify-center rounded-2xl bg-gradient-to-br from-[#0922b0]/5 via-white to-[#0eb02c]/5 border border-[#0922b0]/15 shadow-inner overflow-hidden mb-3 p-2">
                        <DotLottiePlayer
                          animationData={learnBooksLottieJson}
                          src="/learn-books-lottie.json"
                          className="w-full h-full object-contain"
                        />
                      </div>

                      <div className="text-center space-y-1">
                        <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#0922b0]/10 border border-[#0922b0]/20 text-[10px] font-mono text-[#0922b0] font-semibold">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#0922b0] animate-pulse" />
                          <span>01 · 50/30/20 BLUEPRINT</span>
                        </div>
                        <h4 className="text-sm font-bold text-[#1a1919] tracking-tight pt-1">
                          Master The Fundamentals
                        </h4>
                        <p className="text-[11px] text-[#1a1919]/65 leading-relaxed max-w-[240px]">
                          Understand Needs, Wants & Cushion without spreadsheet math.
                        </p>
                      </div>
                    </div>

                    {/* Action Buttons in Hover Card */}
                    {/* Action Buttons in Hover Card */}
                    <div className="space-y-2 pt-2 border-t border-[#1a1919]/10">
                      <Link
                        to="/budget-rule"
                        onClick={() => setIsLearnHovered(false)}
                        className="w-full py-2 px-3 rounded-xl bg-[#0922b0] hover:bg-[#071a8a] text-white text-xs font-medium flex items-center justify-between transition-colors shadow-sm group/btn"
                      >
                        <span className="flex items-center gap-2">
                          <BookOpen className="w-3.5 h-3.5 text-white/80 group-hover/btn:text-white" />
                          <span>Jump to 50/30/20 Guide</span>
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 text-white/80 group-hover/btn:text-white" />
                      </Link>

                      <a
                        href="#resources"
                        onClick={() => setIsLearnHovered(false)}
                        className="w-full py-2 px-3 rounded-xl bg-[#f0f0f0] hover:bg-[#e4e4e4] text-[#1a1919] text-xs font-medium flex items-center justify-between transition-colors"
                      >
                        <span className="flex items-center gap-2">
                          <Sparkles className="w-3.5 h-3.5 text-[#1a1919]/70" />
                          <span>Free Notion Toolkits</span>
                        </span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-[#1a1919]/40" />
                      </a>
                    </div>
                  </div>
                )}
              </div>

              {/* 2. Practice Navigation Item with Hands Lottie Swap & Hover Flyout */}
              <div
                className="relative cursor-pointer group"
                onMouseEnter={handlePracticeMouseEnter}
                onMouseLeave={handlePracticeMouseLeave}
              >
                <a
                  href="#practice"
                  className={`relative px-3.5 py-1.5 rounded-full transition-all duration-200 flex items-center justify-center min-w-[84px] ${
                    isPracticeHovered
                      ? 'bg-[#0eb02c]/10 text-[#0eb02c]'
                      : 'hover:text-[#0eb02c]'
                  }`}
                  aria-label="Practice Planning"
                >
                  {/* Idle State: Text "Practice" + Indicator Dot */}
                  <span
                    className={`font-semibold text-xs tracking-tight transition-all duration-200 flex items-center justify-center gap-1.5 ${
                      isPracticeHovered ? 'opacity-0 scale-75' : 'opacity-100 scale-100'
                    }`}
                  >
                    <span>Practice</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0eb02c]" title="Studio" />
                  </span>

                  {/* Hover State: Hands Lottie Animation */}
                  <div
                    className={`absolute inset-0 m-auto flex items-center justify-center transition-all duration-200 pointer-events-none ${
                      isPracticeHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
                    }`}
                  >
                    <div className="w-7 h-7 flex items-center justify-center shrink-0">
                      <DotLottiePlayer
                        animationData={practiceHandsLottieJson}
                        src="/practice-hands-lottie.json"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>
                </a>

                {/* Floating Quick Actions Flyout for Practice */}
                {isPracticeHovered && (
                  <div
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-80 bg-white/95 backdrop-blur-2xl rounded-3xl p-5 shadow-2xl border border-[#1a1919]/10 z-50 text-left transition-all animate-in fade-in zoom-in-95 duration-200 cursor-default"
                    onMouseEnter={handlePracticeMouseEnter}
                    onMouseLeave={handlePracticeMouseLeave}
                  >
                    {/* Glowing Accent Top Bar */}
                    <div className="absolute top-0 left-6 right-6 h-0.5 bg-gradient-to-r from-[#0eb02c] via-[#0922b0] to-[#0eb02c] rounded-full" />

                    {/* Centered LottieFiles Animation */}
                    <div className="flex flex-col items-center justify-center pt-1 pb-2">
                      <div className="w-20 h-20 relative flex items-center justify-center rounded-2xl bg-gradient-to-br from-[#0eb02c]/5 via-white to-[#0922b0]/5 border border-[#0eb02c]/15 shadow-inner overflow-hidden mb-3 p-2">
                        <DotLottiePlayer
                          animationData={practiceHandsLottieJson}
                          src="/practice-hands-lottie.json"
                          className="w-full h-full object-contain"
                        />
                      </div>

                      <div className="text-center space-y-1">
                        <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#0eb02c]/10 border border-[#0eb02c]/20 text-[10px] font-mono text-[#0eb02c] font-semibold">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#0eb02c] animate-pulse" />
                          <span>02 · INTERACTIVE STUDIO</span>
                        </div>
                        <h4 className="text-sm font-bold text-[#1a1919] tracking-tight pt-1">
                          Simulate Semester Cashflow
                        </h4>
                        <p className="text-[11px] text-[#1a1919]/65 leading-relaxed max-w-[240px]">
                          Adjust live sliders to find daily fun limits & $500 cushion velocity.
                        </p>
                      </div>
                    </div>

                    {/* Action Buttons in Hover Card */}
                    <div className="space-y-2 pt-2 border-t border-[#1a1919]/10">
                      <Link
                        to="/savings-goals"
                        onClick={() => setIsPracticeHovered(false)}
                        className="w-full py-2 px-3 rounded-xl bg-[#0eb02c] hover:bg-[#0c9626] text-white text-xs font-medium flex items-center justify-between transition-colors shadow-sm group/btn"
                      >
                        <span className="flex items-center gap-2">
                          <Sliders className="w-3.5 h-3.5 text-white/80 group-hover/btn:text-white" />
                          <span>Open Planning Studio</span>
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 text-white/80 group-hover/btn:text-white" />
                      </Link>

                      <a
                        href="#practice"
                        onClick={() => setIsPracticeHovered(false)}
                        className="w-full py-2 px-3 rounded-xl bg-[#f0f0f0] hover:bg-[#e4e4e4] text-[#1a1919] text-xs font-medium flex items-center justify-between transition-colors"
                      >
                        <span className="flex items-center gap-2">
                          <Sparkles className="w-3.5 h-3.5 text-[#1a1919]/70" />
                          <span>Calculate Daily $/day</span>
                        </span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-[#1a1919]/40" />
                      </a>
                    </div>
                  </div>
                )}
              </div>

              {/* 3. About Us Navigation Item */}
              <Link 
                to="/about" 
                className="px-3 py-1.5 rounded-full hover:text-[#0922b0] transition-colors font-semibold"
              >
                About Us
              </Link>

              {/* 4. FAQ Navigation Item */}
              <Link 
                to="/faq" 
                className="px-3 py-1.5 rounded-full hover:text-[#0eb02c] transition-colors font-semibold"
              >
                FAQ
              </Link>

              {/* Iconic Contact Navigation Link with Text -> Lottie Animation Swap on Hover */}
              <div
                className="relative cursor-pointer group"
                onMouseEnter={handleContactMouseEnter}
                onMouseLeave={handleContactMouseLeave}
              >
                <button
                  onClick={() => setIsContactModalOpen(true)}
                  className={`relative px-3.5 py-1.5 rounded-full transition-all duration-200 flex items-center justify-center cursor-pointer min-w-[80px] ${isContactHovered
                      ? 'bg-[#0922b0]/10 text-[#0922b0]'
                      : 'hover:text-[#0922b0]'
                    }`}
                  aria-label="Contact Us"
                >
                  {/* 1. Idle State: Text "Contact" */}
                  <span
                    className={`font-semibold text-xs tracking-tight transition-all duration-200 flex items-center justify-center gap-1.5 ${isContactHovered ? 'opacity-0 scale-75' : 'opacity-100 scale-100'
                      }`}
                  >
                    <span>Contact</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0922b0]" title="Online" />
                  </span>

                  {/* 2. Hover State: Email Lottie Animation */}
                  <div
                    className={`absolute inset-0 m-auto flex items-center justify-center transition-all duration-200 pointer-events-none ${isContactHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
                      }`}
                  >
                    <div className="w-7 h-7 flex items-center justify-center shrink-0">
                      <DotLottiePlayer
                        animationData={contactEmailLottieJson}
                        src="/contact-email-lottie.json"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>
                </button>

                {/* Floating Quick Actions Flyout */}
                {isContactHovered && (
                  <div
                    className="absolute top-full right-0 mt-3 w-80 bg-white/95 backdrop-blur-2xl rounded-3xl p-5 shadow-2xl border border-[#1a1919]/10 z-50 text-left transition-all animate-in fade-in zoom-in-95 duration-200 cursor-default"
                    onMouseEnter={handleContactMouseEnter}
                    onMouseLeave={handleContactMouseLeave}
                  >
                    {/* Glowing Accent Top Bar */}
                    <div className="absolute top-0 left-6 right-6 h-0.5 bg-gradient-to-r from-[#0922b0] via-[#0eb02c] to-[#0922b0] rounded-full" />

                    {/* Centered LottieFiles Animation */}
                    <div className="flex flex-col items-center justify-center pt-1 pb-2">
                      <div className="w-20 h-20 relative flex items-center justify-center rounded-2xl bg-gradient-to-br from-[#0922b0]/5 via-white to-[#0eb02c]/5 border border-[#0922b0]/15 shadow-inner overflow-hidden mb-3 p-2">
                        <DotLottiePlayer
                          animationData={contactEmailLottieJson}
                          src="/contact-email-lottie.json"
                          className="w-full h-full object-contain"
                        />
                      </div>

                      <div className="text-center space-y-1">
                        <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#0922b0]/10 border border-[#0922b0]/20 text-[10px] font-mono text-[#0922b0] font-semibold">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#0922b0] animate-pulse" />
                          <span>Average Response: &lt; 15 mins</span>
                        </div>
                        <h4 className="text-sm font-bold text-[#1a1919] tracking-tight pt-1">
                          Let&apos;s build together
                        </h4>
                        <p className="text-[11px] text-[#1a1919]/65 leading-relaxed max-w-[240px]">
                          Looking for custom budget calculators or educational integrations?
                        </p>
                      </div>
                    </div>

                    {/* Action Buttons in Hover Card */}
                    <div className="space-y-2 pt-2 border-t border-[#1a1919]/10">
                      <button
                        onClick={() => {
                          setIsContactHovered(false);
                          setIsContactModalOpen(true);
                        }}
                        className="w-full py-2 px-3 rounded-xl bg-[#0922b0] hover:bg-[#071a8a] text-white text-xs font-medium flex items-center justify-between transition-colors shadow-sm group/btn"
                      >
                        <span className="flex items-center gap-2">
                          <Mail className="w-3.5 h-3.5 text-white/80 group-hover/btn:text-white" />
                          <span>Send Quick Message</span>
                        </span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-white/80 group-hover/btn:text-white" />
                      </button>

                      <a
                        href="https://github.com/Leonxlnx/taste-skill"
                        target="_blank"
                        rel="noreferrer"
                        className="w-full py-2 px-3 rounded-xl bg-[#f0f0f0] hover:bg-[#e4e4e4] text-[#1a1919] text-xs font-medium flex items-center justify-between transition-colors"
                      >
                        <span className="flex items-center gap-2">
                          <MessageSquare className="w-3.5 h-3.5 text-[#1a1919]/70" />
                          <span>Community Forum</span>
                        </span>
                        <ExternalLink className="w-3.5 h-3.5 text-[#1a1919]/40" />
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* GitHub Stars Pill */}
            <a
              href="https://github.com/Leonxlnx/taste-skill"
              target="_blank"
              rel="noreferrer"
              className="bg-[#1a1919] hover:bg-[#2b2a2a] text-white rounded-full px-3.5 py-1.5 flex items-center gap-1.5 text-xs font-medium transition-all shadow-sm active:scale-95"
            >
              <Github className="w-3.5 h-3.5" />
              <span>88,465</span>
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            </a>

            {/* Cart Trigger Button for E-Commerce */}
            {onOpenCart && (
              <button
                onClick={onOpenCart}
                className="nav-pill rounded-full p-2 text-[#1a1919] hover:bg-white relative bg-white/90"
                id="hero-cart-btn"
                aria-label="Open Cart"
              >
                <ShoppingBag className="w-4 h-4" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#d12828] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Interactive Contact Modal / Drawer */}
      {isContactModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-[#1a1919]/10 relative overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Close Button */}
            <button
              onClick={() => setIsContactModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-[#f0f0f0] hover:bg-[#e4e4e4] text-[#1a1919] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header with Lottie Animation */}
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-2xl bg-[#0922b0]/10 border border-[#0922b0]/20 flex items-center justify-center overflow-hidden shrink-0 shadow-inner">
                <DotLottiePlayer
                  animationData={contactEmailLottieJson}
                  src="/contact-email-lottie.json"
                  className="w-full h-full scale-110"
                />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#1a1919] tracking-tight">Direct Contact</h3>
                <p className="text-xs text-[#1a1919]/60">Reach the BudgetBasics education & engineering team</p>
              </div>
            </div>

            {contactSent ? (
              <div className="py-8 text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-[#0eb02c]/15 text-[#0eb02c] flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-[#1a1919]">Message Dispatched!</h4>
                <p className="text-xs text-[#1a1919]/60">We will respond to {contactEmail} shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSendContactMessage} className="space-y-3">
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-[#1a1919]/60 mb-1">
                    Your Email
                  </label>
                  <input
                    type="email"
                    required
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder="student@university.edu"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#1a1919]/15 text-xs text-[#1a1919] focus:outline-none focus:ring-2 focus:ring-[#0922b0]/20 focus:border-[#0922b0] bg-[#f0f0f0]/50"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-[#1a1919]/60 mb-1">
                    Message / Question
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={contactMsg}
                    onChange={(e) => setContactMsg(e.target.value)}
                    placeholder="Ask anything about the budget guides or tools..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#1a1919]/15 text-xs text-[#1a1919] focus:outline-none focus:ring-2 focus:ring-[#0922b0]/20 focus:border-[#0922b0] bg-[#f0f0f0]/50 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[#0922b0] hover:bg-[#071a8a] text-white text-xs font-semibold tracking-wide flex items-center justify-center gap-2 shadow-lg shadow-[#0922b0]/20 transition-colors mt-2"
                >
                  <span>Send Message</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* 2. Main Hero Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center my-auto">
        {/* Left Column: Typography, Terminal Box & CTAs (Expanded to lg:col-span-7) */}
        <div className="lg:col-span-7 space-y-7 z-20 max-w-2xl">
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0eb02c]/10 border border-[#0eb02c]/30 text-xs font-semibold text-[#0eb02c] shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#0eb02c] animate-pulse" />
            <span>Interactive Visual Guide · For Students & Beginners</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#0eb02c]" />
          </div>

          {/* Headline */}
          <div className="space-y-2">
            <h1 className="text-4xl sm:text-6xl lg:text-[76px] font-black tracking-tight text-[#1a1919] leading-[1.04]">
              Small Steps. <br />
              <span className="bg-gradient-to-r from-[#0922b0] via-[#0eb02c] to-[#0922b0] bg-clip-text text-transparent drop-shadow-xs">
                Smart Money.
              </span>
            </h1>
          </div>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-[#1a1919]/90 font-medium leading-relaxed max-w-2xl">
            Learn budgeting the easy way — with visual guides, real student examples, and tools that make managing money actually make sense.
          </p>

          {/* 50 / 30 / 20 Interactive Visual Blueprint Pill */}
          <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-[#1a1919]/15 shadow-sm max-w-xl">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#0eb02c]" />
                <span className="text-xs font-mono font-extrabold uppercase tracking-wider text-[#0eb02c] bg-[#0eb02c]/10 px-2.5 py-1 rounded-md border border-[#0eb02c]/30">
                  50 / 30 / 20 Rule Blueprint
                </span>
              </div>
              <span className="text-xs font-mono font-semibold text-[#1a1919]/60">Essential Guide</span>
            </div>
            <div className="grid grid-cols-3 gap-2.5 text-center text-xs">
              <div className="p-3 rounded-xl bg-[#f0f0f0] border border-[#1a1919]/10">
                <div className="font-black text-[#1a1919] text-base sm:text-lg">50%</div>
                <div className="text-xs text-[#1a1919]/80 font-bold mt-0.5">Needs & Rent</div>
              </div>
              <div className="p-3 rounded-xl bg-[#d12828]/10 border border-[#d12828]/30">
                <div className="font-black text-[#d12828] text-base sm:text-lg">30%</div>
                <div className="text-xs text-[#d12828] font-bold mt-0.5">Wants & Fun</div>
              </div>
              <div className="p-3 rounded-xl bg-[#0eb02c]/15 border border-[#0eb02c]/35">
                <div className="font-black text-[#0eb02c] text-base sm:text-lg">20%</div>
                <div className="text-xs text-[#0eb02c] font-bold mt-0.5">Savings / Future</div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3.5 pt-1">
            <button
              onClick={onExploreProducts}
              className="px-8 py-4 rounded-xl bg-[#0922b0] hover:bg-[#071a8a] text-white text-sm font-bold tracking-wide flex items-center gap-2.5 shadow-lg shadow-[#0922b0]/30 hover:shadow-xl transition-all duration-200 active:scale-95 group"
              id="hero-primary-btn"
            >
              <span>Learn the Basics</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform stroke-[2.5]" />
            </button>

            <button
              onClick={onOpenDocs}
              className="px-7 py-4 rounded-xl bg-white hover:bg-[#f0f0f0] text-[#1a1919] text-sm font-bold border border-[#1a1919]/20 shadow-xs transition-all active:scale-95 flex items-center gap-2"
              id="hero-docs-btn"
            >
              <span>Explore Budget Tools</span>
              <ArrowRight className="w-4 h-4 text-[#1a1919]/60 stroke-[2.5]" />
            </button>
          </div>

          {/* 3D Asset Stack Live Indicators */}
          <div className="pt-3 border-t border-[#1a1919]/10 flex items-center gap-3">
            <div className="flex -space-x-2 overflow-hidden items-center">
              <img
                className="inline-block h-10 w-8 rounded-full ring-2 ring-white bg-white shadow-xs object-contain p-0.5 hover:scale-125 transition-transform"
                src="https://cdn3d.iconscout.com/3d/premium/thumb/budget-calculation-3d-icon-png-download-4874122.png"
                alt="Budget Calc 3D"
                title="Budget Calculation 3D"
              />
              <img
                className="inline-block h-8 w-8 rounded-full ring-2 ring-white bg-[#132320] shadow-xs object-contain p-0.5 hover:scale-125 transition-transform"
                src="https://cdn3d.iconscout.com/3d/premium/thumb/budget-3d-icon-png-download-8550550.png"
                alt="Budget Vault 3D"
                title="Treasury Vault 3D"
              />
              <img
                className="inline-block h-8 w-8 rounded-full ring-2 ring-white bg-[#d12828]/10 shadow-xs object-contain p-0.5 hover:scale-125 transition-transform"
                src="https://cdn3d.iconscout.com/3d/premium/thumb/financial-budget-3d-icon-png-download-4042254.png"
                alt="Financial Budget 3D"
                title="Financial Analytics 3D"
              />
              <img
                className="inline-block h-8 w-8 rounded-full ring-2 ring-white bg-[#0922b0]/10 shadow-xs object-contain p-0.5 hover:scale-125 transition-transform"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8-CzvlQwr62VNejdUkWMFDefac5i7m9U1SqaknFE_p8dr17eaa3oF9_Ou&s=10"
                alt="Vault Protocol 3D"
                title="Vault Matrix 3D"
              />
              <img
                className="inline-block h-8 w-8 rounded-full ring-2 ring-white bg-[#0eb02c]/10 shadow-xs object-contain p-0.5 hover:scale-125 transition-transform"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGcXcVQty0LzbkF9h7A3eRo_p_zdw6HeNO-Bt9z2aKOg&s=10"
                alt="Orbit Settlement 3D"
                title="Settlement Hub 3D"
              />
            </div>
            <div className="text-xs text-[#1a1919]/70 font-mono">
              <span className="font-extrabold text-[#1a1919]">5 Visual 3D Modules</span> synchronized
            </div>
          </div>
        </div>

        {/* Right Column: Emotive 3D Perspective Sliding Stream (lg:col-span-5) */}
        <div className="lg:col-span-5 relative h-[560px] sm:h-[620px] flex items-center justify-center perspective-container overflow-visible select-none pause-stream">
          <div className="relative w-full max-w-[420px] sm:max-w-[460px] h-[240px] sm:h-[260px] flex items-center justify-center">

            {/* Card 1: Budget Calculation 3D */}
            <div className="absolute w-full card-trajectory-1 cursor-pointer">
              <div className="w-full h-[240px] sm:h-[260px] bg-white/95 backdrop-blur-xl rounded-3xl p-6 relative flex items-center justify-center border border-[#1a1919]/10 shadow-xl overflow-hidden group hover:border-[#0eb02c]/50 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-[#0eb02c]/10 via-[#0eb02c]/5 to-transparent pointer-events-none rounded-3xl" />
                <div className="absolute top-4 left-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#0eb02c]/10 border border-[#0eb02c]/20 text-[10px] font-mono text-[#0eb02c] font-semibold shadow-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0eb02c] animate-pulse" />
                  <span>01 · CALCULATION</span>
                </div>
                <img
                  src="https://cdn3d.iconscout.com/3d/premium/thumb/budget-calculation-3d-icon-png-download-4874122.png"
                  alt="3D Budget Calculation"
                  className="w-36 sm:w-44 h-36 sm:h-44 object-contain drop-shadow-2xl animate-float-3d group-hover:scale-105 transition-transform duration-300"
                />
                <button
                  onClick={onExploreProducts}
                  className="absolute bottom-4 right-4 px-3.5 py-1.5 rounded-full bg-[#1a1919] hover:bg-[#0eb02c] text-white text-[11px] font-medium tracking-wide flex items-center gap-1.5 shadow-lg transition-all duration-200 group-hover:scale-105 active:scale-95 z-10"
                  aria-label="Calculate Budget"
                >
                  <span>Calculate</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Card 2: Budget & Treasury 3D */}
            <div className="absolute w-full card-trajectory-2 cursor-pointer">
              <div className="w-full h-[240px] sm:h-[260px] bg-white/95 backdrop-blur-xl rounded-3xl p-6 relative flex items-center justify-center border border-[#1a1919]/10 shadow-xl overflow-hidden group hover:border-[#0922b0]/50 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-[#0922b0]/10 via-[#0922b0]/5 to-transparent pointer-events-none rounded-3xl" />
                <div className="absolute top-4 left-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#0922b0]/10 border border-[#0922b0]/20 text-[10px] font-mono text-[#0922b0] font-semibold shadow-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0922b0] animate-pulse" />
                  <span>02 · TREASURY</span>
                </div>
                <img
                  src="https://cdn3d.iconscout.com/3d/premium/thumb/budget-3d-icon-png-download-8550550.png"
                  alt="3D Budget Treasury"
                  className="w-36 sm:w-44 h-36 sm:h-44 object-contain drop-shadow-2xl animate-float-3d group-hover:scale-105 transition-transform duration-300"
                />
                <button
                  onClick={onExploreProducts}
                  className="absolute bottom-4 right-4 px-3.5 py-1.5 rounded-full bg-[#1a1919] hover:bg-[#0922b0] text-white text-[11px] font-medium tracking-wide flex items-center gap-1.5 shadow-lg transition-all duration-200 group-hover:scale-105 active:scale-95 z-10"
                  aria-label="Explore Treasury"
                >
                  <span>Treasury</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Card 3: Financial Budget 3D */}
            <div className="absolute w-full card-trajectory-3 cursor-pointer">
              <div className="w-full h-[240px] sm:h-[260px] bg-white/95 backdrop-blur-xl rounded-3xl p-6 relative flex items-center justify-center border border-[#1a1919]/10 shadow-xl overflow-hidden group hover:border-[#d12828]/50 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-[#d12828]/10 via-[#d12828]/5 to-transparent pointer-events-none rounded-3xl" />
                <div className="absolute top-4 left-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#d12828]/10 border border-[#d12828]/20 text-[10px] font-mono text-[#d12828] font-semibold shadow-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#d12828] animate-pulse" />
                  <span>03 · EXPENSES</span>
                </div>
                <img
                  src="https://cdn3d.iconscout.com/3d/premium/thumb/financial-budget-3d-icon-png-download-4042254.png"
                  alt="3D Financial Budget"
                  className="w-36 sm:w-44 h-36 sm:h-44 object-contain drop-shadow-2xl animate-float-3d group-hover:scale-105 transition-transform duration-300"
                />
                <button
                  onClick={onExploreProducts}
                  className="absolute bottom-4 right-4 px-3.5 py-1.5 rounded-full bg-[#1a1919] hover:bg-[#d12828] text-white text-[11px] font-medium tracking-wide flex items-center gap-1.5 shadow-lg transition-all duration-200 group-hover:scale-105 active:scale-95 z-10"
                  aria-label="View Expenses"
                >
                  <span>Expenses</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Card 4: Vault Matrix 3D */}
            <div className="absolute w-full card-trajectory-4 cursor-pointer">
              <div className="w-full h-[240px] sm:h-[260px] bg-white/95 backdrop-blur-xl rounded-3xl p-6 relative flex items-center justify-center border border-[#1a1919]/10 shadow-xl overflow-hidden group hover:border-[#0922b0]/50 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-[#0922b0]/10 via-[#0922b0]/5 to-transparent pointer-events-none rounded-3xl" />
                <div className="absolute top-4 left-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#0922b0]/10 border border-[#0922b0]/20 text-[10px] font-mono text-[#0922b0] font-semibold shadow-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0922b0] animate-pulse" />
                  <span>04 · VAULT</span>
                </div>
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8-CzvlQwr62VNejdUkWMFDefac5i7m9U1SqaknFE_p8dr17eaa3oF9_Ou&s=10"
                  alt="3D Vault Matrix"
                  className="w-36 sm:w-44 h-36 sm:h-44 object-contain drop-shadow-2xl rounded-2xl animate-float-3d group-hover:scale-105 transition-transform duration-300"
                />
                <button
                  onClick={onExploreProducts}
                  className="absolute bottom-4 right-4 px-3.5 py-1.5 rounded-full bg-[#1a1919] hover:bg-[#0922b0] text-white text-[11px] font-medium tracking-wide flex items-center gap-1.5 shadow-lg transition-all duration-200 group-hover:scale-105 active:scale-95 z-10"
                  aria-label="Inspect Vault"
                >
                  <span>Vault</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Card 5: Orbit Settlement 3D */}
            <div className="absolute w-full card-trajectory-5 cursor-pointer">
              <div className="w-full h-[240px] sm:h-[260px] bg-white/95 backdrop-blur-xl rounded-3xl p-6 relative flex items-center justify-center border border-[#1a1919]/10 shadow-xl overflow-hidden group hover:border-[#0eb02c]/50 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-[#0eb02c]/10 via-[#0eb02c]/5 to-transparent pointer-events-none rounded-3xl" />
                <div className="absolute top-4 left-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#0eb02c]/10 border border-[#0eb02c]/20 text-[10px] font-mono text-[#0eb02c] font-semibold shadow-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0eb02c] animate-pulse" />
                  <span>05 · GROWTH</span>
                </div>
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGcXcVQty0LzbkF9h7A3eRo_p_zdw6HeNO-Bt9z2aKOg&s=10"
                  alt="3D Orbit Growth"
                  className="w-36 sm:w-44 h-36 sm:h-44 object-contain drop-shadow-2xl rounded-2xl animate-float-3d group-hover:scale-105 transition-transform duration-300"
                />
                <button
                  onClick={onExploreProducts}
                  className="absolute bottom-4 right-4 px-3.5 py-1.5 rounded-full bg-[#1a1919] hover:bg-[#0eb02c] text-white text-[11px] font-medium tracking-wide flex items-center gap-1.5 shadow-lg transition-all duration-200 group-hover:scale-105 active:scale-95 z-10"
                  aria-label="Growth Goals"
                >
                  <span>Goals</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Ambient pause hint & stream pill */}
            <div className="absolute -bottom-10 flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/95 border border-[#1a1919]/10 shadow-sm text-[10px] font-mono text-[#1a1919]/60 backdrop-blur-md z-30">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0eb02c] animate-pulse" />
              <span>Hover to pause · Organic 3D Stream</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
