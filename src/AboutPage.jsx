import React from "react";
import { Link } from "react-router-dom";
import { Sparkles, Users, Heart, Target, Lightbulb, BookOpen, Sliders, ArrowRight, ShieldCheck } from "lucide-react";
import { SubpageHeader } from "./components/SubpageHeader";
import { Footer } from "./components/Footer";
import MemberAccordion from "./MemberAccordion";
import FaqAccordion from "./FaqAccordion";
import "./AboutPage.css";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#f0f0f0] text-[#1a1919] flex flex-col font-sans paper-texture selection:bg-[#0922b0]/20 selection:text-[#0922b0]">
      {/* 1. Header Navigation */}
      <SubpageHeader badgeText="About Us" />

      {/* 2. Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full space-y-16">
        
        {/* Section 1: Hero Editorial Mission */}
        <section className="relative bg-white/90 backdrop-blur-xl rounded-3xl p-8 sm:p-12 lg:p-16 border border-[#1a1919]/10 shadow-xl overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#0922b0]/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#0eb02c]/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0922b0]/10 border border-[#0922b0]/20 text-xs font-bold text-[#0922b0] shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#0922b0]" />
              <span>01 · MISSION & VISION</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#1a1919] leading-[1.08]">
              Built by students, <br />
              <span className="font-serif italic font-normal text-3xl sm:text-5xl text-[#0922b0]">
                engineered for real campus cash flow.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[#1a1919]/80 leading-relaxed font-medium">
              We know what it&apos;s like to receive a monthly allowance, scholarship stipend, or part-time paycheck and have absolutely no idea where it vanished by mid-month. BudgetBasics was built to replace confusing accounting jargon with intuitive, visual clarity.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <div className="p-5 rounded-2xl bg-[#f0f0f0]/80 border border-[#1a1919]/10 space-y-2">
                <div className="w-8 h-8 rounded-xl bg-[#0eb02c]/15 text-[#0eb02c] flex items-center justify-center font-bold">
                  <Target className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-[#1a1919]">Zero Jargon</h4>
                <p className="text-xs text-[#1a1919]/70 leading-relaxed">
                  Clear 50/30/20 rules without complicated accounting tests.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#f0f0f0]/80 border border-[#1a1919]/10 space-y-2">
                <div className="w-8 h-8 rounded-xl bg-[#0922b0]/15 text-[#0922b0] flex items-center justify-center font-bold">
                  <Heart className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-[#1a1919]">100% Non-Judgmental</h4>
                <p className="text-xs text-[#1a1919]/70 leading-relaxed">
                  A safe space to simulate semester expenses and build habits.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#f0f0f0]/80 border border-[#1a1919]/10 space-y-2">
                <div className="w-8 h-8 rounded-xl bg-[#d12828]/15 text-[#d12828] flex items-center justify-center font-bold">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-[#1a1919]">Safety Cushion</h4>
                <p className="text-xs text-[#1a1919]/70 leading-relaxed">
                  $500 emergency buffer mechanics so surprises won&apos;t derail you.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Meet The Team */}
        <section className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 sm:p-12 lg:p-16 border border-[#1a1919]/10 shadow-xl relative overflow-hidden">
          <div className="max-w-2xl mb-8 space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0eb02c]/10 border border-[#0eb02c]/20 text-xs font-bold text-[#0eb02c] shadow-xs">
              <Users className="w-3.5 h-3.5 text-[#0eb02c]" />
              <span>02 · ENGINEERING & DESIGN TEAM</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[#1a1919]">
              Meet The Creators. <br />
              <span className="font-serif italic font-normal text-2xl sm:text-3xl text-[#0eb02c]">
                Aptech ADSE frontend engineers & UI/UX builders.
              </span>
            </h2>
            <p className="text-sm sm:text-base text-[#1a1919]/75 font-medium">
              Hover over and expand each team card to see their specific architectural role in building BudgetBasics.
            </p>
          </div>

          <MemberAccordion />
        </section>

        {/* Section 3: FAQ */}
        <section className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 sm:p-12 lg:p-16 border border-[#1a1919]/10 shadow-xl relative overflow-hidden" id="faq">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0922b0]/10 border border-[#0922b0]/20 text-xs font-bold text-[#0922b0] shadow-xs">
              <Lightbulb className="w-3.5 h-3.5 text-[#0922b0]" />
              <span>03 · ANSWERS & GUIDANCE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[#1a1919]">
              Frequently Asked Questions. <br />
              <span className="font-serif italic font-normal text-2xl sm:text-3xl text-[#0922b0]">
                Everything you need to master your student budget.
              </span>
            </h2>
          </div>

          <div className="max-w-3xl mx-auto">
            <FaqAccordion />
          </div>

          {/* Bottom Action Card */}
          <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-[#0922b0]/10 via-[#0eb02c]/10 to-transparent border border-[#0922b0]/20 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="text-base font-bold text-[#1a1919]">Ready to practice your budget?</h4>
              <p className="text-xs text-[#1a1919]/70">Explore the interactive 50/30/20 studio and simulation sliders.</p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                to="/budget-rule"
                className="px-4 py-2 rounded-xl bg-[#0922b0] hover:bg-[#071a8a] text-white text-xs font-semibold flex items-center gap-2 transition-all shadow-sm"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>50/30/20 Guide</span>
              </Link>
              <Link
                to="/savings-goals"
                className="px-4 py-2 rounded-xl bg-[#0eb02c] hover:bg-[#0c9626] text-white text-xs font-semibold flex items-center gap-2 transition-all shadow-sm"
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>Savings Studio</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

      </main>

      {/* 3. Footer */}
      <Footer />
    </div>
  );
}
