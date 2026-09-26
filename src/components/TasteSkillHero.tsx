import React, { useState, useEffect } from 'react';
import { Check, ArrowRight, ArrowUpRight, Send, X, Clock, Sparkles } from 'lucide-react';
import { DotLottiePlayer } from './DotLottiePlayer';
import { contactEmailLottieJson } from '../data/contactLottie';

interface TasteSkillHeroProps {
  onOpenDocs?: () => void;
  onExploreProducts?: () => void;
  onOpenLearnPage?: () => void;
  onOpenPracticePage?: () => void;
  onOpenResourcesPage?: () => void;
  onOpenConnectPage?: (tab?: 'assistant' | 'about') => void;
  onOpenContactPage?: () => void;
  onOpenConverterModal?: () => void;
  cartCount?: number;
  onOpenCart?: () => void;
}

export const TasteSkillHero: React.FC<TasteSkillHeroProps> = ({
  onOpenLearnPage,
  onOpenPracticePage,
  onOpenResourcesPage,
  onOpenConnectPage,
}) => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [contactSent, setContactSent] = useState(false);
  const [contactEmail, setContactEmail] = useState('');
  const [contactMsg, setContactMsg] = useState('');

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

  const [timeString, setTimeString] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeString(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative pt-6 pb-20 md:pb-28 overflow-hidden paper-texture min-h-[96dvh] flex flex-col justify-between font-sans bg-[#f0f0f0] text-[#1a1919]">
      {/* 1. Welcome Message & Live Information Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mb-6 z-40 relative">
        <div className="flex flex-wrap items-center justify-between gap-3 bg-white/80 backdrop-blur-md rounded-2xl px-4 py-3 border border-[#1a1919]/10 shadow-xs">
          
          {/* Left: Welcome Greeting & Mission Statement */}
          <div className="flex items-center gap-3">
            <span className="flex h-2.5 w-2.5 relative shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0eb02c] opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#0eb02c]" />
            </span>
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
              <span className="text-xs font-bold text-[#1a1919] flex items-center gap-1.5 shrink-0">
                <span>👋 Welcome to BudgetBasics</span>
                <span className="hidden md:inline text-[#1a1919]/30 font-normal">|</span>
              </span>
              <span className="text-[11px] sm:text-xs text-[#1a1919]/75 font-medium">
                The next-generation student financial habit blueprint & interactive budgeting studio.
              </span>
            </div>
          </div>

          {/* Right: Live Clock & Community Metric */}
          <div className="flex items-center gap-2 font-mono text-[11px] shrink-0 ml-auto sm:ml-0">
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-[#0922b0]/10 text-[#0922b0] font-bold border border-[#0922b0]/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>NextGen BudgetBee</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#f0f0f0] border border-[#1a1919]/10 font-bold text-[#1a1919] shadow-inner">
              <Clock className="w-3.5 h-3.5 text-[#0eb02c]" />
              <span>{timeString || '12:00:00 PM'}</span>
            </div>
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
              <button 
                onClick={() => { if (onOpenLearnPage) onOpenLearnPage(); else window.location.hash = 'learn-page'; }}
                className="p-3 rounded-xl bg-[#f0f0f0] hover:bg-[#e4e4e4] border border-[#1a1919]/10 transition-all cursor-pointer text-center"
              >
                <div className="font-black text-[#1a1919] text-base sm:text-lg">50%</div>
                <div className="text-xs text-[#1a1919]/80 font-bold mt-0.5">Needs & Rent</div>
              </button>
              <button 
                onClick={() => { if (onOpenLearnPage) onOpenLearnPage(); else window.location.hash = 'learn-page'; }}
                className="p-3 rounded-xl bg-[#d12828]/10 hover:bg-[#d12828]/20 border border-[#d12828]/30 transition-all cursor-pointer text-center"
              >
                <div className="font-black text-[#d12828] text-base sm:text-lg">30%</div>
                <div className="text-xs text-[#d12828] font-bold mt-0.5">Wants & Fun</div>
              </button>
              <button 
                onClick={() => { if (onOpenPracticePage) onOpenPracticePage(); else window.location.hash = 'practice-page'; }}
                className="p-3 rounded-xl bg-[#0eb02c]/15 hover:bg-[#0eb02c]/25 border border-[#0eb02c]/35 transition-all cursor-pointer text-center"
              >
                <div className="font-black text-[#0eb02c] text-base sm:text-lg">20%</div>
                <div className="text-xs text-[#0eb02c] font-bold mt-0.5">Savings / Future</div>
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3.5 pt-1">
            <button
              onClick={() => {
                if (onOpenLearnPage) onOpenLearnPage();
                else window.location.hash = 'learn-page';
              }}
              className="px-8 py-4 rounded-xl bg-[#0922b0] hover:bg-[#071a8a] text-white text-sm font-bold tracking-wide flex items-center gap-2.5 shadow-lg shadow-[#0922b0]/30 hover:shadow-xl transition-all duration-200 active:scale-95 group cursor-pointer"
              id="hero-primary-btn"
            >
              <span>Learn the Basics</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform stroke-[2.5]" />
            </button>

            <button
              onClick={() => {
                if (onOpenPracticePage) onOpenPracticePage();
                else window.location.hash = 'practice-page';
              }}
              className="px-7 py-4 rounded-xl bg-white hover:bg-[#f0f0f0] text-[#1a1919] text-sm font-bold border border-[#1a1919]/20 shadow-xs transition-all active:scale-95 flex items-center gap-2 cursor-pointer"
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
                className="inline-block h-10 w-8 rounded-full ring-2 ring-white bg-white shadow-xs object-contain p-0.5 hover:scale-125 transition-transform cursor-pointer"
                src="https://cdn3d.iconscout.com/3d/premium/thumb/budget-calculation-3d-icon-png-download-4874122.png"
                alt="Budget Calc 3D"
                title="Budget Calculation 3D"
                onClick={() => { if (onOpenPracticePage) onOpenPracticePage(); else window.location.hash = 'practice-page'; }}
              />
              <img
                className="inline-block h-8 w-8 rounded-full ring-2 ring-white bg-[#132320] shadow-xs object-contain p-0.5 hover:scale-125 transition-transform cursor-pointer"
                src="https://cdn3d.iconscout.com/3d/premium/thumb/budget-3d-icon-png-download-8550550.png"
                alt="Budget Vault 3D"
                title="Treasury Vault 3D"
                onClick={() => { if (onOpenLearnPage) onOpenLearnPage(); else window.location.hash = 'learn-page'; }}
              />
              <img
                className="inline-block h-8 w-8 rounded-full ring-2 ring-white bg-[#d12828]/10 shadow-xs object-contain p-0.5 hover:scale-125 transition-transform cursor-pointer"
                src="https://cdn3d.iconscout.com/3d/premium/thumb/financial-budget-3d-icon-png-download-4042254.png"
                alt="Financial Budget 3D"
                title="Financial Analytics 3D"
                onClick={() => { if (onOpenPracticePage) onOpenPracticePage(); else window.location.hash = 'practice-page'; }}
              />
              <img
                className="inline-block h-8 w-8 rounded-full ring-2 ring-white bg-[#0922b0]/10 shadow-xs object-contain p-0.5 hover:scale-125 transition-transform cursor-pointer"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8-CzvlQwr62VNejdUkWMFDefac5i7m9U1SqaknFE_p8dr17eaa3oF9_Ou&s=10"
                alt="Vault Protocol 3D"
                title="Vault Matrix 3D"
                onClick={() => { if (onOpenResourcesPage) onOpenResourcesPage(); else window.location.hash = 'resources-page'; }}
              />
              <img
                className="inline-block h-8 w-8 rounded-full ring-2 ring-white bg-[#0eb02c]/10 shadow-xs object-contain p-0.5 hover:scale-125 transition-transform cursor-pointer"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGcXcVQty0LzbkF9h7A3eRo_p_zdw6HeNO-Bt9z2aKOg&s=10"
                alt="Orbit Settlement 3D"
                title="Settlement Hub 3D"
                onClick={() => { if (onOpenPracticePage) onOpenPracticePage(); else window.location.hash = 'practice-page'; }}
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
            <div 
              className="absolute w-full card-trajectory-1 cursor-pointer"
              onClick={() => { if (onOpenPracticePage) onOpenPracticePage(); else window.location.hash = 'practice-page'; }}
            >
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
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onOpenPracticePage) onOpenPracticePage();
                    else window.location.hash = 'practice-page';
                  }}
                  className="absolute bottom-4 right-4 px-3.5 py-1.5 rounded-full bg-[#1a1919] hover:bg-[#0eb02c] text-white text-[11px] font-medium tracking-wide flex items-center gap-1.5 shadow-lg transition-all duration-200 group-hover:scale-105 active:scale-95 z-10 cursor-pointer"
                  aria-label="Calculate Budget"
                >
                  <span>Calculate</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Card 2: Budget & Treasury 3D */}
            <div 
              className="absolute w-full card-trajectory-2 cursor-pointer"
              onClick={() => { if (onOpenLearnPage) onOpenLearnPage(); else window.location.hash = 'learn-page'; }}
            >
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
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onOpenLearnPage) onOpenLearnPage();
                    else window.location.hash = 'learn-page';
                  }}
                  className="absolute bottom-4 right-4 px-3.5 py-1.5 rounded-full bg-[#1a1919] hover:bg-[#0922b0] text-white text-[11px] font-medium tracking-wide flex items-center gap-1.5 shadow-lg transition-all duration-200 group-hover:scale-105 active:scale-95 z-10 cursor-pointer"
                  aria-label="Explore Treasury"
                >
                  <span>Treasury</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Card 3: Financial Budget / Connect 3D */}
            <div 
              className="absolute w-full card-trajectory-3 cursor-pointer"
              onClick={() => { if (onOpenConnectPage) onOpenConnectPage('assistant'); else if (onOpenPracticePage) onOpenPracticePage(); else window.location.hash = 'connect-page'; }}
            >
              <div className="w-full h-[240px] sm:h-[260px] bg-white/95 backdrop-blur-xl rounded-3xl p-6 relative flex items-center justify-center border border-[#1a1919]/10 shadow-xl overflow-hidden group hover:border-[#d12828]/50 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-[#d12828]/10 via-[#d12828]/5 to-transparent pointer-events-none rounded-3xl" />
                <div className="absolute top-4 left-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#d12828]/10 border border-[#d12828]/20 text-[10px] font-mono text-[#d12828] font-semibold shadow-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#d12828] animate-pulse" />
                  <span>03 · ASSISTANT</span>
                </div>
                <img
                  src="https://cdn3d.iconscout.com/3d/premium/thumb/financial-budget-3d-icon-png-download-4042254.png"
                  alt="3D Financial Budget"
                  className="w-36 sm:w-44 h-36 sm:h-44 object-contain drop-shadow-2xl animate-float-3d group-hover:scale-105 transition-transform duration-300"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onOpenConnectPage) onOpenConnectPage('assistant');
                    else window.location.hash = 'connect-page';
                  }}
                  className="absolute bottom-4 right-4 px-3.5 py-1.5 rounded-full bg-[#1a1919] hover:bg-[#d12828] text-white text-[11px] font-medium tracking-wide flex items-center gap-1.5 shadow-lg transition-all duration-200 group-hover:scale-105 active:scale-95 z-10 cursor-pointer"
                  aria-label="Ask Assistant"
                >
                  <span>Assistant</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Card 4: Vault Matrix 3D */}
            <div 
              className="absolute w-full card-trajectory-4 cursor-pointer"
              onClick={() => { if (onOpenResourcesPage) onOpenResourcesPage(); else window.location.hash = 'resources-page'; }}
            >
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
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onOpenResourcesPage) onOpenResourcesPage();
                    else window.location.hash = 'resources-page';
                  }}
                  className="absolute bottom-4 right-4 px-3.5 py-1.5 rounded-full bg-[#1a1919] hover:bg-[#0922b0] text-white text-[11px] font-medium tracking-wide flex items-center gap-1.5 shadow-lg transition-all duration-200 group-hover:scale-105 active:scale-95 z-10 cursor-pointer"
                  aria-label="Inspect Vault"
                >
                  <span>Vault</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Card 5: Orbit Settlement 3D */}
            <div 
              className="absolute w-full card-trajectory-5 cursor-pointer"
              onClick={() => { if (onOpenPracticePage) onOpenPracticePage(); else window.location.hash = 'practice-page'; }}
            >
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
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onOpenPracticePage) onOpenPracticePage();
                    else window.location.hash = 'practice-page';
                  }}
                  className="absolute bottom-4 right-4 px-3.5 py-1.5 rounded-full bg-[#1a1919] hover:bg-[#0eb02c] text-white text-[11px] font-medium tracking-wide flex items-center gap-1.5 shadow-lg transition-all duration-200 group-hover:scale-105 active:scale-95 z-10 cursor-pointer"
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
