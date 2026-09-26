import React, { useState } from 'react';
import { 
  ChevronDown, 
  HelpCircle, 
  Target, 
  GraduationCap, 
  Code2, 
  Palette, 
  Layout, 
  BookOpen, 
  Bot
} from 'lucide-react';

interface TeamMember {
  id: string;
  role: string;
  title: string;
  icon: React.ReactNode;
  tag: string;
  work: string;
}

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

const teamMembersData: TeamMember[] = [
  {
    id: "1",
    role: "Frontend & Motion Developer",
    title: "Member 01",
    icon: <Layout className="w-5 h-5 text-[#0922b0]" />,
    tag: "Motion & UI",
    work: "Built the 50/30/20 scroll animation on the homepage and the progress bar that tracks each stage."
  },
  {
    id: "2",
    role: "UI/UX & Brand Designer",
    title: "Member 02",
    icon: <Palette className="w-5 h-5 text-[#0eb02c]" />,
    tag: "Design System",
    work: "Designed the visual identity: colors, typography, and the icons used across the guide."
  },
  {
    id: "3",
    role: "Frontend Layout Engineer",
    title: "Member 03",
    icon: <Code2 className="w-5 h-5 text-[#0922b0]" />,
    tag: "Components",
    work: "Coded the FAQ accordion and the About page layout, including the stacking panels."
  },
  {
    id: "4",
    role: "Content & Research Lead",
    title: "Member 04",
    icon: <BookOpen className="w-5 h-5 text-[#d12828]" />,
    tag: "Research & Content",
    work: "Wrote the budgeting guides and student examples, and fact-checked every figure."
  },
  {
    id: "5",
    role: "Full-Stack & AI Engineer",
    title: "Member 05",
    icon: <Bot className="w-5 h-5 text-[#0eb02c]" />,
    tag: "AI & Logic",
    work: "Built the AI chatbot and the interactive budget planner."
  }
];

const faqDataList: FaqItem[] = [
  {
    id: "panel1",
    question: "What is BudgetBasics?",
    answer: "BudgetBasics is a student-led initiative aimed at simplifying the budgeting process. We provide tools, guides, and resources to help students manage their finances effectively."
  },
  {
    id: "panel2",
    question: "Is my financial data saved anywhere?",
    answer: "No, BudgetBasics does not save any of your financial data. All information you enter is stored locally on your device and is never transmitted to any server."
  },
  {
    id: "panel3",
    question: "Is this a real budgeting app I can use with my actual bank account?",
    answer: "No — BudgetBasics is an educational tool, not a banking service. It's designed to teach budgeting concepts using sample numbers, not to manage real transactions."
  },
  {
    id: "panel4",
    question: "Can the AI chatbot answer any money question?",
    answer: "It's built to answer common budgeting basics (needs vs wants, saving tips, avoiding overspending). For anything outside that scope, it'll let you know rather than guess."
  },
  {
    id: "panel5",
    question: "Who is this site for?",
    answer: "Primarily students managing an allowance, scholarship, or part-time income for the first time — but honestly, anyone new to budgeting can use it."
  }
];

export const AboutSection: React.FC = () => {
  const [expandedMemberId, setExpandedMemberId] = useState<string | null>(null);
  const [expandedFaqId, setExpandedFaqId] = useState<string | null>('panel1');

  const handleMemberToggle = (id: string) => {
    setExpandedMemberId((current) => (current === id ? null : id));
  };

  const handleFaqToggle = (id: string) => {
    setExpandedFaqId((current) => (current === id ? null : id));
  };

  return (
    <section id="about" className="py-20 md:py-28 bg-[#f0f0f0] text-[#1a1919] relative overflow-hidden font-sans border-t border-[#1a1919]/10">
      {/* Decorative Grid Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#1a1919_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.03] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-24">
        
        {/* ============================================================ */}
        {/* 01 · ABOUT US & OUR MISSION PANEL                            */}
        {/* ============================================================ */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#1a1919]/10 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between mb-8 pb-6 border-b border-[#1a1919]/10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0922b0]/10 border border-[#0922b0]/20 text-xs font-mono text-[#0922b0] font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#0922b0] animate-pulse" />
              <span>01 · ABOUT US</span>
            </div>
            <span className="text-xs font-mono font-bold text-[#1a1919]/50 uppercase tracking-widest">
              Origin & Purpose
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left: Headline & Story */}
            <div className="lg:col-span-6 space-y-6 border-l-4 border-[#0922b0] pl-6">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#1a1919] tracking-tight leading-tight">
                About <span className="text-[#0eb02c]">BudgetBasics</span>
              </h2>
              <p className="text-sm sm:text-base text-[#1a1919]/80 leading-relaxed font-normal">
                BudgetBasics was built by students, for students. We know what it's like to get a monthly allowance, a scholarship stipend, or your first part-time paycheck and have absolutely no idea where it went by the end of the month. This site exists to change that — one small habit at a time.
              </p>
            </div>

            {/* Right: Our Mission Statement Card */}
            <div className="lg:col-span-6 bg-[#f0f0f0]/70 rounded-2xl p-6 sm:p-8 border border-[#1a1919]/10 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#0eb02c]/10 border border-[#0eb02c]/20 flex items-center justify-center text-[#0eb02c]">
                  <Target className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#1a1919]">Our Mission</h3>
                  <span className="text-xs font-mono text-[#1a1919]/60">Common Sense Financial Literacy</span>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-[#1a1919]/75 leading-relaxed">
                Our mission is simple: make budgeting feel less like homework and more like common sense. We believe financial literacy shouldn't be locked behind confusing jargon or expensive courses. Through simple guides, visual breakdowns, and hands-on tools, BudgetBasics helps you understand where your money comes from, where it's going, and how small decisions today can add up to real savings tomorrow. This isn't a bank, and it won't judge your spending — it's a space to learn, experiment, and build habits that actually stick.
              </p>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* 02 · MEET THE TEAM PANEL                                     */}
        {/* ============================================================ */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#1a1919]/10 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between mb-8 pb-6 border-b border-[#1a1919]/10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0eb02c]/10 border border-[#0eb02c]/20 text-xs font-mono text-[#0eb02c] font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#0eb02c] animate-pulse" />
              <span>02 · MEET THE TEAM</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#1a1919]/60 font-semibold">
              <GraduationCap className="w-4 h-4 text-[#0eb02c]" />
              <span>Aptech ADSE Team</span>
            </div>
          </div>

          <div className="space-y-4 mb-10 max-w-3xl border-l-4 border-[#0eb02c] pl-6">
            <h2 className="text-3xl sm:text-4xl font-black text-[#1a1919] tracking-tight">
              Meet The <span className="text-[#0eb02c]">Team</span>
            </h2>
            <p className="text-sm sm:text-base text-[#1a1919]/80 leading-relaxed font-normal">
              We're a team of Aptech ADSE students who combined what we're learning in frontend development and UI/UX design to build something we'd actually want to use ourselves.
            </p>
          </div>

          {/* 5-Member Interactive Cards Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {teamMembersData.map((member) => {
              const isOpen = expandedMemberId === member.id;
              return (
                <div
                  key={member.id}
                  className={`bg-[#f0f0f0]/60 rounded-2xl border transition-all duration-300 overflow-hidden flex flex-col justify-between ${
                    isOpen 
                      ? 'border-[#0eb02c] shadow-md bg-white' 
                      : 'border-[#1a1919]/10 hover:border-[#1a1919]/25 hover:bg-white'
                  }`}
                  onMouseEnter={() => setExpandedMemberId(member.id)}
                  onMouseLeave={() => setExpandedMemberId(null)}
                >
                  {/* Card Header & Avatar Area */}
                  <div className="p-5 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-white border border-[#1a1919]/10 flex items-center justify-center shadow-xs">
                        {member.icon}
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white text-[#1a1919]/70 font-bold border border-[#1a1919]/10">
                        {member.tag}
                      </span>
                    </div>

                    <div>
                      <h4 className="font-bold text-sm text-[#1a1919]">{member.title}</h4>
                      <p className="text-xs text-[#1a1919]/60 font-medium">{member.role}</p>
                    </div>
                  </div>

                  {/* Accordion Trigger & Disclosure */}
                  <div className="border-t border-[#1a1919]/10 bg-white/60">
                    <button
                      onClick={() => handleMemberToggle(member.id)}
                      className="w-full px-4 py-3 flex items-center justify-between text-xs font-semibold text-[#1a1919]/80 hover:text-[#0922b0] transition-colors text-left"
                      aria-expanded={isOpen}
                    >
                      <span>What did they work on?</span>
                      <ChevronDown className={`w-4 h-4 transition-transform duration-200 text-[#0922b0] ${isOpen ? 'rotate-180' : ''}`} />
                    </button>

                    <div 
                      className={`transition-all duration-300 overflow-hidden ${
                        isOpen ? 'max-h-48 opacity-100 p-4 pt-0' : 'max-h-0 opacity-0 p-0'
                      }`}
                    >
                      <p className="text-xs text-[#1a1919]/75 leading-relaxed bg-[#f0f0f0] p-3 rounded-xl border border-[#1a1919]/5">
                        {member.work}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ============================================================ */}
        {/* 03 · FREQUENTLY ASKED QUESTIONS PANEL                        */}
        {/* ============================================================ */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#1a1919]/10 shadow-sm relative overflow-hidden">
          <div className="flex flex-col items-center text-center space-y-3 mb-10 pb-6 border-b border-[#1a1919]/10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#d12828]/10 border border-[#d12828]/20 text-xs font-mono text-[#d12828] font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#d12828] animate-pulse" />
              <span>03 · FAQ</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#1a1919] tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-[#1a1919]/70 max-w-lg">
              Got questions about BudgetBasics? Here is everything you need to know about our student-first philosophy.
            </p>
          </div>

          {/* FAQ Accordion List */}
          <div className="max-w-3xl mx-auto space-y-3">
            {faqDataList.map((faq) => {
              const isOpen = expandedFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                    isOpen 
                      ? 'border-[#0922b0]/40 bg-[#0922b0]/5 shadow-xs' 
                      : 'border-[#1a1919]/10 bg-white hover:border-[#1a1919]/20'
                  }`}
                >
                  <button
                    onClick={() => handleFaqToggle(faq.id)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span className="font-bold text-sm sm:text-base text-[#1a1919] flex items-center gap-2.5">
                      <HelpCircle className={`w-4 h-4 shrink-0 transition-colors ${isOpen ? 'text-[#0922b0]' : 'text-[#1a1919]/40'}`} />
                      {faq.question}
                    </span>
                    <span className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 border transition-all ${
                      isOpen 
                        ? 'bg-[#0922b0] text-white border-[#0922b0] rotate-180' 
                        : 'bg-white text-[#1a1919]/60 border-[#1a1919]/15'
                    }`}>
                      <ChevronDown className="w-4 h-4" />
                    </span>
                  </button>

                  <div
                    className={`transition-all duration-300 overflow-hidden ${
                      isOpen ? 'max-h-48 opacity-100 px-5 pb-5' : 'max-h-0 opacity-0 px-5 pb-0'
                    }`}
                  >
                    <p className="text-xs sm:text-sm text-[#1a1919]/75 leading-relaxed pt-2 border-t border-[#1a1919]/10">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
