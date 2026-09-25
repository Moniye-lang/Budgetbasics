import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Sparkles, HelpCircle, MessageSquare, Send, Check, BookOpen, Sliders, ArrowRight } from "lucide-react";
import { SubpageHeader } from "./components/SubpageHeader";
import { Footer } from "./components/Footer";
import FaqAccordion from "./FaqAccordion";

export default function FaqPage() {
  const [userQuery, setUserQuery] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userQuery.trim()) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setUserQuery("");
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-[#f0f0f0] text-[#1a1919] flex flex-col font-sans paper-texture selection:bg-[#0922b0]/20 selection:text-[#0922b0]">
      {/* 1. Header */}
      <SubpageHeader badgeText="FAQ & Help" />

      {/* 2. Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full space-y-16">
        
        {/* Hero Section */}
        <section className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 sm:p-12 lg:p-16 border border-[#1a1919]/10 shadow-xl relative overflow-hidden">
          <div className="max-w-3xl space-y-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0922b0]/10 border border-[#0922b0]/20 text-xs font-bold text-[#0922b0] shadow-xs">
              <HelpCircle className="w-3.5 h-3.5 text-[#0922b0]" />
              <span>FREQUENTLY ASKED QUESTIONS</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#1a1919] leading-[1.08]">
              Got questions? <br />
              <span className="font-serif italic font-normal text-3xl sm:text-5xl text-[#0922b0]">
                We have practical student answers.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[#1a1919]/80 font-medium leading-relaxed">
              Explore answers to the most common questions about 50/30/20 splits, handling unexpected bills, student loans, and setting realistic daily limits.
            </p>
          </div>
        </section>

        {/* FAQ Accordion Section */}
        <section className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 sm:p-12 border border-[#1a1919]/10 shadow-xl space-y-8">
          <div className="max-w-3xl mx-auto">
            <FaqAccordion />
          </div>

          {/* Ask custom question */}
          <div className="max-w-3xl mx-auto mt-12 p-6 sm:p-8 rounded-3xl bg-[#f0f0f0]/90 border border-[#1a1919]/10 space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#0922b0] uppercase tracking-wider">
              <MessageSquare className="w-4 h-4 text-[#0922b0]" />
              <span>Didn&apos;t find what you were looking for?</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-[#1a1919]">
              Ask our student financial peer mentors
            </h3>
            
            {submitted ? (
              <div className="p-4 rounded-2xl bg-[#0eb02c]/15 text-[#0eb02c] flex items-center gap-2 text-xs font-bold">
                <Check className="w-4 h-4" />
                <span>Question received! A peer mentor will reply shortly.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  required
                  value={userQuery}
                  onChange={(e) => setUserQuery(e.target.value)}
                  placeholder="e.g., How do I budget for textbook season?"
                  className="flex-1 px-4 py-2.5 rounded-xl bg-white border border-[#1a1919]/15 text-xs focus:outline-hidden focus:border-[#0922b0]"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#0922b0] hover:bg-[#071a8a] text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-sm"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Question</span>
                </button>
              </form>
            )}
          </div>
        </section>

      </main>

      {/* 3. Footer */}
      <Footer />
    </div>
  );
}
