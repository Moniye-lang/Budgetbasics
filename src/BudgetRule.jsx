import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkles, 
  ShieldCheck, 
  HeartHandshake, 
  TrendingUp, 
  ArrowRight, 
  CheckCircle2, 
  PieChart, 
  Sliders, 
  DollarSign, 
  HelpCircle,
  BookOpen
} from "lucide-react";
import { SubpageHeader } from "./components/SubpageHeader";
import { Footer } from "./components/Footer";
import budgetRuleData from "./budgetRule.json";
import "./BudgetRule.css";

const ruleMeta = [
  {
    pct: "50%",
    name: "Needs",
    theme: "text-[#1a1919]",
    badgeBg: "bg-[#1a1919]/10 text-[#1a1919] border-[#1a1919]/20",
    barColor: "bg-[#1a1919]",
    activeBorder: "border-[#1a1919]",
    icon: ShieldCheck,
    examples: ["Shared rent / dorm", "Essential groceries & meal plans", "Course texts & lab kits", "Transport pass", "Phone & basic data"]
  },
  {
    pct: "30%",
    name: "Wants",
    theme: "text-[#d12828]",
    badgeBg: "bg-[#d12828]/10 text-[#d12828] border-[#d12828]/20",
    barColor: "bg-[#d12828]",
    activeBorder: "border-[#d12828]",
    icon: HeartHandshake,
    examples: ["Weekend hangouts & dining out", "Netflix & Spotify subscriptions", "Gaming & hobby supplies", "Fashion & gear upgrades", "Spontaneous campus coffee"]
  },
  {
    pct: "20%",
    name: "Savings & Cushion",
    theme: "text-[#0eb02c]",
    badgeBg: "bg-[#0eb02c]/10 text-[#0eb02c] border-[#0eb02c]/20",
    barColor: "bg-[#0eb02c]",
    activeBorder: "border-[#0eb02c]",
    icon: TrendingUp,
    examples: ["$500 Emergency safety fund", "Semester gear / laptop fund", "Future graduation cushion", "High-yield student stash", "Zero-debt peace of mind"]
  }
];

export default function BudgetRule() {
  const [activeTab, setActiveTab] = useState(0);
  const [monthlyAllowance, setMonthlyAllowance] = useState(600);

  const activeRule = budgetRuleData[activeTab];
  const meta = ruleMeta[activeTab];
  const IconComp = meta.icon;

  const needsCalc = Math.round(monthlyAllowance * 0.5);
  const wantsCalc = Math.round(monthlyAllowance * 0.3);
  const savingsCalc = Math.round(monthlyAllowance * 0.2);

  return (
    <div className="min-h-screen bg-[#f0f0f0] text-[#1a1919] flex flex-col font-sans paper-texture selection:bg-[#0922b0]/20 selection:text-[#0922b0]">
      {/* 1. Header */}
      <SubpageHeader badgeText="50/30/20 Blueprint" />

      {/* 2. Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full space-y-16">
        
        {/* Top Hero Banner */}
        <section className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 sm:p-12 lg:p-16 border border-[#1a1919]/10 shadow-xl relative overflow-hidden">
          <div className="max-w-3xl space-y-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0922b0]/10 border border-[#0922b0]/20 text-xs font-bold text-[#0922b0] shadow-xs">
              <BookOpen className="w-3.5 h-3.5 text-[#0922b0]" />
              <span>THE GOLD STANDARD FRAMEWORK</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#1a1919] leading-[1.08]">
              The 50/30/20 Rule, <br />
              <span className="font-serif italic font-normal text-3xl sm:text-5xl text-[#0eb02c]">
                decoded for student reality.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[#1a1919]/80 font-medium leading-relaxed">
              Originated by Harvard bankruptcy experts, the 50/30/20 formula splits your income into three clear, stress-free buckets so you never run out of cash before the semester ends.
            </p>

            {/* Quick 3-Pill Interactive Switcher */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {ruleMeta.map((item, idx) => (
                <button
                  key={item.name}
                  onClick={() => setActiveTab(idx)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold tracking-tight flex items-center gap-2 transition-all cursor-pointer shadow-sm ${
                    activeTab === idx
                      ? `${item.barColor} text-white scale-105 shadow-md`
                      : "bg-[#f0f0f0] hover:bg-white text-[#1a1919]/70 border border-[#1a1919]/10"
                  }`}
                >
                  <span className="font-mono">{item.pct}</span>
                  <span>{item.name}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Section 2: Interactive Deep-Dive Card */}
        <section className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 sm:p-12 border border-[#1a1919]/10 shadow-xl space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left Col: Dynamic Detail & Explanation */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-lg shadow-sm ${meta.barColor} text-white`}>
                  <IconComp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono font-bold ${meta.badgeBg}`}>
                    <span>BUCKET {activeTab + 1} OF 3</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-[#1a1919] tracking-tight mt-1">
                    {activeRule.label}
                  </h2>
                </div>
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-[#1a1919]/90">
                {activeRule.title}
              </h3>

              <p className="text-sm sm:text-base text-[#1a1919]/80 leading-relaxed font-medium">
                {activeRule.text}
              </p>

              <div className="p-5 rounded-2xl bg-[#f0f0f0]/90 border border-[#1a1919]/10 space-y-3">
                <h4 className="text-xs font-mono uppercase tracking-wider font-bold text-[#1a1919]/70 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#0eb02c]" />
                  <span>Real Campus Examples</span>
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-medium text-[#1a1919]/85">
                  {meta.examples.map((ex) => (
                    <li key={ex} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0eb02c]" />
                      <span>{ex}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Col: Instant Live Simulator */}
            <div className="lg:col-span-5 bg-[#f0f0f0]/90 rounded-3xl p-6 sm:p-8 border border-[#1a1919]/10 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm text-[#1a1919]">Live Split Calculator</h4>
                  <p className="text-xs text-[#1a1919]/60">See exact numbers on your allowance</p>
                </div>
                <div className="px-3 py-1 rounded-xl bg-white border border-[#1a1919]/10 text-xs font-mono font-bold text-[#0922b0]">
                  ${monthlyAllowance}/mo
                </div>
              </div>

              <div>
                <label className="text-[11px] font-mono text-[#1a1919]/60 font-semibold mb-2 block">
                  Slide Monthly Budget / Income:
                </label>
                <input
                  type="range"
                  min={200}
                  max={2500}
                  step={50}
                  value={monthlyAllowance}
                  onChange={(e) => setMonthlyAllowance(Number(e.target.value))}
                  className="w-full h-2 bg-white rounded-lg appearance-none cursor-pointer accent-[#0eb02c]"
                />
                <div className="flex justify-between text-[10px] font-mono text-[#1a1919]/50 mt-1">
                  <span>$200/mo</span>
                  <span>$1,200/mo</span>
                  <span>$2,500/mo</span>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <div className="p-3.5 rounded-2xl bg-white border border-[#1a1919]/10 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="w-3 h-3 rounded-full bg-[#1a1919]" />
                    <div>
                      <span className="text-xs font-bold text-[#1a1919] block">50% Needs</span>
                      <span className="text-[10px] text-[#1a1919]/60 font-mono">Rent, groceries, bills</span>
                    </div>
                  </div>
                  <span className="font-mono font-bold text-sm text-[#1a1919]">${needsCalc}</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-white border border-[#1a1919]/10 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="w-3 h-3 rounded-full bg-[#d12828]" />
                    <div>
                      <span className="text-xs font-bold text-[#1a1919] block">30% Wants</span>
                      <span className="text-[10px] text-[#1a1919]/60 font-mono">Social, dining, fun</span>
                    </div>
                  </div>
                  <span className="font-mono font-bold text-sm text-[#d12828]">${wantsCalc}</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-white border border-[#1a1919]/10 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="w-3 h-3 rounded-full bg-[#0eb02c]" />
                    <div>
                      <span className="text-xs font-bold text-[#1a1919] block">20% Cushion</span>
                      <span className="text-[10px] text-[#1a1919]/60 font-mono">Savings & emergency</span>
                    </div>
                  </div>
                  <span className="font-mono font-bold text-sm text-[#0eb02c]">${savingsCalc}</span>
                </div>
              </div>

              <Link
                to="/savings-goals"
                className="w-full py-3 rounded-xl bg-[#0eb02c] hover:bg-[#0c9626] text-white text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-md group"
              >
                <Sliders className="w-4 h-4 text-white/80 group-hover:text-white" />
                <span>Open Full Interactive Studio</span>
                <ArrowRight className="w-4 h-4 text-white/80 group-hover:text-white" />
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
