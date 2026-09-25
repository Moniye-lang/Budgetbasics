import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Users,
  Sparkles,
  Heart,
  Eye,
  ShieldCheck,
  Code2,
  Palette,
  Layers,
  BookOpen,
  Cpu,
  ArrowRight,
  Github,
  HelpCircle,
  CheckCircle2,
  Check
} from "lucide-react";
import { SubpageHeader } from "./components/SubpageHeader";
import { Footer } from "./components/Footer";
import FaqAccordion from "./FaqAccordion";
import "./AboutPage.css";

const teamMembers = [
  {
    id: "1",
    name: "Member 01",
    role: "Motion & Animation Engineer",
    badge: "Interactive Scroll",
    color: "#0eb02c",
    bgTint: "bg-[#0eb02c]/10",
    borderTint: "border-[#0eb02c]/20",
    textColor: "text-[#0eb02c]",
    initials: "M1",
    deliverables: [
      "Engineered the 50/30/20 interactive scroll stage",
      "Configured continuous progress tracking animations",
      "Implemented hardware-accelerated carousel transitions"
    ],
    skills: ["Framer Motion", "React", "Scroll Physics"]
  },
  {
    id: "2",
    name: "Member 02",
    role: "UI/UX & Brand Designer",
    badge: "Design System",
    color: "#0922b0",
    bgTint: "bg-[#0922b0]/10",
    borderTint: "border-[#0922b0]/20",
    textColor: "text-[#0922b0]",
    initials: "M2",
    deliverables: [
      "Crafted the visual brand identity & color tokens",
      "Designed responsive glassmorphic cards & typography",
      "Standardized 3D card layout & micro-interactions"
    ],
    skills: ["UI/UX Design", "Color Theory", "Tailwind CSS"]
  },
  {
    id: "3",
    name: "Member 03",
    role: "Frontend Layout & Navigation Engineer",
    badge: "Component Architecture",
    color: "#d12828",
    bgTint: "bg-[#d12828]/10",
    borderTint: "border-[#d12828]/20",
    textColor: "text-[#d12828]",
    initials: "M3",
    deliverables: [
      "Built responsive stacking layout & navigation pills",
      "Developed the animated FAQ accordion system",
      "Ensured mobile cross-browser accessibility"
    ],
    skills: ["React Router", "Responsive Grid", "Accessibility"]
  },
  {
    id: "4",
    name: "Member 04",
    role: "Financial Research & Content Lead",
    badge: "Curriculum & Data",
    color: "#0eb02c",
    bgTint: "bg-[#0eb02c]/10",
    borderTint: "border-[#0eb02c]/20",
    textColor: "text-[#0eb02c]",
    initials: "M4",
    deliverables: [
      "Researched student allowance patterns & expense models",
      "Authored the 50/30/20 student implementation guide",
      "Curated the 5 common student money trap scenarios"
    ],
    skills: ["Financial Modeling", "Technical Writing", "Curriculum"]
  },
  {
    id: "5",
    name: "Member 05",
    role: "Interactive Simulator Engineer",
    badge: "Calculation Engine",
    color: "#0922b0",
    bgTint: "bg-[#0922b0]/10",
    borderTint: "border-[#0922b0]/20",
    textColor: "text-[#0922b0]",
    initials: "M5",
    deliverables: [
      "Developed the real-time savings goal calculator ring",
      "Created the interactive semester expense ledger",
      "Engineered the 3D flip deck interaction physics"
    ],
    skills: ["State Machine", "SVG Calculations", "Interactive UI"]
  }
];

const pillars = [
  {
    icon: Heart,
    title: "Zero Judgment, Zero Guilt",
    description: "Budgeting isn't about deprivation. We help you understand where your allowance goes so you spend on what you love without stress.",
    color: "#0eb02c"
  },
  {
    icon: Eye,
    title: "Visual First, Math Second",
    description: "No intimidating 50-row spreadsheets. Interactive radial rings, live dials, and 3D flashcards make financial literacy intuitive.",
    color: "#0922b0"
  },
  {
    icon: Sparkles,
    title: "Real Student Scenarios",
    description: "Calibrated for real student realities: transit fees, hostel food, group projects, and surprise semester costs.",
    color: "#d12828"
  },
  {
    icon: ShieldCheck,
    title: "100% Free & Private",
    description: "No accounts, no ads, no trackers. All simulation data runs locally inside your browser and stays on your machine.",
    color: "#1a1919"
  }
];

export default function AboutPage() {
  const [activeMember, setActiveMember] = useState(teamMembers[0].id);

  const selected = teamMembers.find((m) => m.id === activeMember) || teamMembers[0];

  return (
    <div className="min-h-screen bg-[#f0f0f0] text-[#1a1919] flex flex-col font-sans paper-texture selection:bg-[#0922b0]/20 selection:text-[#0922b0]">
      {/* 1. Unified Navigation Header */}
      <SubpageHeader badgeText="About & Team" />

      {/* 2. Hero Section */}
      <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12 w-full">
        <div className="bg-white/90 backdrop-blur-xl border border-[#1a1919]/10 rounded-3xl p-8 sm:p-12 lg:p-16 shadow-xl relative overflow-hidden">
          <div className="max-w-3xl space-y-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0922b0]/10 border border-[#0922b0]/20 text-xs font-bold text-[#0922b0] shadow-xs">
              <Users className="w-3.5 h-3.5 text-[#0922b0]" />
              <span>ABOUT BUDGETBASICS · APTECH ADSE INITIATIVE</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#1a1919] leading-[1.06]">
              Built by students. <br />
              <span className="font-serif italic font-normal text-3xl sm:text-5xl text-[#0922b0]">
                For students who want clear finances.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[#1a1919]/80 font-medium leading-relaxed max-w-2xl">
              BudgetBasics was created by a team of 5 Aptech ADSE software engineering students. We combined what we're learning in frontend architecture and UI/UX design to solve the universal student challenge: having no idea where money goes by mid-semester.
            </p>

            <div className="flex flex-wrap gap-2.5 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#f0f0f0] border border-[#1a1919]/10 text-xs font-semibold text-[#1a1919]">
                <Check className="w-3.5 h-3.5 text-[#0eb02c]" />
                <span>5 Student Contributors</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#f0f0f0] border border-[#1a1919]/10 text-xs font-semibold text-[#1a1919]">
                <Check className="w-3.5 h-3.5 text-[#0922b0]" />
                <span>100% Free & Open Source</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#f0f0f0] border border-[#1a1919]/10 text-xs font-semibold text-[#1a1919]">
                <Check className="w-3.5 h-3.5 text-[#d12828]" />
                <span>50/30/20 Framework</span>
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* 3. Main About Us Architecture */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full space-y-20">
        
        {/* Section 1: Our Core Pillars */}
        <section className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-mono font-bold tracking-wider uppercase bg-[#0eb02c]/10 text-[#0eb02c] border border-[#0eb02c]/20 shadow-xs">
              <Sparkles className="w-3 h-3" />
              <span>01 · OUR PHILOSOPHY</span>
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#1a1919] tracking-tight">
              Why BudgetBasics Exists
            </h2>
            <p className="text-sm sm:text-base text-[#1a1919]/70 leading-relaxed font-medium">
              Most budgeting tools are built for high-income corporate earners. We designed BudgetBasics around real student habits and psychology.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {pillars.map((p, idx) => {
              const IconComp = p.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-3xl bg-white/90 backdrop-blur-xl border border-[#1a1919]/10 shadow-md hover:shadow-lg transition-all space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div
                      className="w-10 h-10 rounded-2xl flex items-center justify-center text-white shadow-xs"
                      style={{ backgroundColor: p.color }}
                    >
                      <IconComp className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold text-[#1a1919] tracking-tight">
                      {p.title}
                    </h3>
                    <p className="text-xs text-[#1a1919]/70 leading-relaxed font-medium">
                      {p.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Section 2: Meet The Team Interactive Showcase */}
        <section id="team" className="space-y-8 scroll-mt-24">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-mono font-bold tracking-wider uppercase bg-[#0922b0]/10 text-[#0922b0] border border-[#0922b0]/20 shadow-xs">
              <Users className="w-3 h-3" />
              <span>02 · THE ADSE DEVELOPERS</span>
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#1a1919] tracking-tight">
              Meet The Project Team
            </h2>
            <p className="text-sm sm:text-base text-[#1a1919]/70 leading-relaxed font-medium">
              Click any team member below to view what they engineered for the BudgetBasics platform.
            </p>
          </div>

          {/* Member Card Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {teamMembers.map((m) => {
              const isSelected = m.id === activeMember;
              return (
                <button
                  key={m.id}
                  onClick={() => setActiveMember(m.id)}
                  className={`p-5 rounded-3xl text-left transition-all border cursor-pointer flex flex-col justify-between space-y-4 ${
                    isSelected
                      ? "bg-white border-[#1a1919] shadow-xl scale-[1.02]"
                      : "bg-white/80 border-[#1a1919]/10 hover:bg-white hover:border-[#1a1919]/25 shadow-sm"
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-white font-mono shadow-xs text-sm"
                      style={{ backgroundColor: m.color }}
                    >
                      {m.initials}
                    </div>
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${m.bgTint} ${m.borderTint} ${m.textColor}`}>
                      {m.badge}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-bold text-base text-[#1a1919] tracking-tight">
                      {m.name}
                    </h4>
                    <p className="text-xs text-[#1a1919]/65 font-medium mt-0.5">
                      {m.role}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-[#1a1919]/10 text-[11px] font-semibold text-[#0922b0]">
                    <span>{isSelected ? "Active View" : "View Work"}</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Selected Member Detail Box */}
          <div className="bg-white/95 backdrop-blur-xl border border-[#1a1919]/15 rounded-3xl p-6 sm:p-10 shadow-xl max-w-4xl mx-auto space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#1a1919]/10">
              <div className="flex items-center gap-4">
                <div
                  className="w-16 h-16 rounded-3xl flex items-center justify-center font-bold text-white font-mono shadow-md text-xl"
                  style={{ backgroundColor: selected.color }}
                >
                  {selected.initials}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl sm:text-2xl font-black text-[#1a1919] tracking-tight">
                      {selected.name}
                    </h3>
                    <span className={`text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${selected.bgTint} ${selected.borderTint} ${selected.textColor}`}>
                      {selected.badge}
                    </span>
                  </div>
                  <p className="text-sm text-[#1a1919]/70 font-semibold mt-0.5">
                    {selected.role}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {selected.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-lg bg-[#f0f0f0] border border-[#1a1919]/10 text-[11px] font-mono font-bold text-[#1a1919]/75"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-mono font-bold text-[#1a1919]/60 uppercase tracking-wider">
                What they built for BudgetBasics
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {selected.deliverables.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-[#f0f0f0]/70 border border-[#1a1919]/10 flex items-start gap-2.5"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#0eb02c] shrink-0 mt-0.5" />
                    <span className="text-xs font-semibold text-[#1a1919]/80 leading-relaxed">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Interactive Quick Jump to 50/30/20 & Studio */}
        <section className="bg-gradient-to-br from-[#0922b0] to-[#071a8a] text-white rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          <div className="max-w-3xl space-y-5 relative z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-white/15 text-white border border-white/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>READY TO TAKE CONTROL?</span>
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
              Try the Interactive 50/30/20 Rule & Savings Studio
            </h2>
            <p className="text-sm sm:text-base text-white/80 leading-relaxed font-medium">
              Explore how small adjustments in your daily spending can free up thousands of Naira for semester cushions and long-term goals.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                to="/budget-rule"
                className="px-5 py-2.5 rounded-full bg-[#0eb02c] hover:bg-[#0c9626] text-white text-xs font-bold flex items-center gap-2 transition-all shadow-md"
              >
                <span>50/30/20 Guide</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                to="/savings-goals"
                className="px-5 py-2.5 rounded-full bg-white text-[#1a1919] hover:bg-[#f0f0f0] text-xs font-bold flex items-center gap-2 transition-all shadow-md"
              >
                <span>Savings Studio</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Section 4: Integrated FAQ */}
        <section id="faq" className="space-y-8 scroll-mt-24">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-mono font-bold tracking-wider uppercase bg-[#d12828]/10 text-[#d12828] border border-[#d12828]/20 shadow-xs">
              <HelpCircle className="w-3 h-3" />
              <span>03 · QUESTIONS & ANSWERS</span>
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#1a1919] tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-sm sm:text-base text-[#1a1919]/70 leading-relaxed font-medium">
              Clear answers to the most common questions about student budgeting, allowance allocation, and emergency cushions.
            </p>
          </div>

          <div className="max-w-3xl mx-auto bg-white/90 backdrop-blur-xl border border-[#1a1919]/10 rounded-3xl p-6 sm:p-10 shadow-xl">
            <FaqAccordion />
          </div>
        </section>

      </main>

      {/* 4. Footer */}
      <div className="mt-20">
        <Footer />
      </div>
    </div>
  );
}
