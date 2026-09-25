import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  Target,
  TrendingUp,
  Sliders,
  Wallet,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  RotateCcw,
  Trash2,
  Plus,
  Lightbulb,
  Sparkles,
  ShoppingBag,
  Clock,
  Flame,
  Check,
  Zap,
  Info
} from "lucide-react";
import { SubpageHeader } from "./components/SubpageHeader";
import { Footer } from "./components/Footer";
import "./SavingsGoals.css";

const money = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
  maximumFractionDigits: 0,
});
const fmt = (n) => money.format(Math.round(Number.isFinite(n) ? n : 0));

const mistakesList = [
  {
    icon: ShoppingBag,
    title: "Impulse Flash Sales",
    scenario:
      "You spot a 30% discount on shoes and buy them without checking your month's runway. Your transport & textbook fund is wiped out.",
    fix:
      "Apply the 24-Hour Rule: sleep on any non-essential purchase over ₦5,000. If it still makes sense after 24 hours, review your Wants budget.",
    tag: "Impulse Spending",
  },
  {
    icon: Zap,
    title: "Ignoring Micro-Transactions",
    scenario:
      "A daily ₦500 energy drink and ₦700 ride-share top-up quietly compounds into over ₦36,000 every single month.",
    fix:
      "Audit 7 days of daily receipts. Micro-leaks are almost always where 20-30% of student allowances secretly disappear.",
    tag: "Cash Leaks",
  },
  {
    icon: Clock,
    title: "Overdue Renewal Penalties",
    scenario:
      "You let your WiFi or study subscription lapse, and the reactivation/reconnect fee costs more than the monthly fee itself.",
    fix:
      "Set calendar reminders 48 hours before recurring billing cycles and maintain a ₦5,000 buffer in your primary account.",
    tag: "Late Fees",
  },
  {
    icon: RotateCcw,
    title: "Ghost Subscriptions",
    scenario:
      "You have three active video & music streaming plans running concurrently, but you only actively use one of them.",
    fix:
      "Do a monthly Sunday subscription cull. Cancel anything you haven't opened in 14 days; you can always resubscribe later.",
    tag: "Unused Plans",
  },
  {
    icon: Wallet,
    title: "Zero-Plan Allowance Day",
    scenario:
      "Your monthly stipend drops, you spend freely for the first 10 days, and spend the final 20 days borrowing for basic meals.",
    fix:
      "Execute the 50/30/20 allocation immediately on payday: move 20% into savings and 50% into a dedicated bills account before touching wants.",
    tag: "No Allocation",
  },
];

const categories = {
  food: { label: "Food & Groceries", color: "green" },
  transport: { label: "Campus Transit", color: "blue" },
  education: { label: "Textbooks & Courseware", color: "green" },
  entertainment: { label: "Social & Fun", color: "amber" },
  shopping: { label: "Personal Shopping", color: "rose" },
  utilities: { label: "Data & Utilities", color: "blue" },
  miscellaneous: { label: "Miscellaneous", color: "violet" },
};

function Reveal({ children, className = "", delay = 0 }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function SectionHeading({ eyebrow, title, text, tone = "green" }) {
  return (
    <Reveal className="text-center max-w-2xl mx-auto mb-10 space-y-3">
      <span className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-mono font-bold tracking-wider uppercase border shadow-xs ${
        tone === "rose"
          ? "bg-[#d12828]/10 text-[#d12828] border-[#d12828]/20"
          : tone === "blue"
          ? "bg-[#0922b0]/10 text-[#0922b0] border-[#0922b0]/20"
          : "bg-[#0eb02c]/10 text-[#0eb02c] border-[#0eb02c]/20"
      }`}>
        <Sparkles className="w-3 h-3" />
        <span>{eyebrow}</span>
      </span>
      <h2 className="text-3xl sm:text-4xl font-black text-[#1a1919] tracking-tight">
        {title}
      </h2>
      <p className="text-sm sm:text-base text-[#1a1919]/70 leading-relaxed font-medium">
        {text}
      </p>
    </Reveal>
  );
}

function RangeField({ label, value, min, max, step, minLabel, maxLabel, danger, onChange, fill }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-baseline">
        <span className="text-xs font-mono font-bold text-[#1a1919]/70 tracking-wider">{label}</span>
        <strong className={`font-mono text-base font-black ${danger ? "text-[#d12828]" : "text-[#0eb02c]"}`}>
          {fmt(value)}
        </strong>
      </div>
      <div className="relative h-7 flex items-center">
        <div className="absolute inset-x-0 h-2 bg-[#1a1919]/10 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all ${
              danger ? "bg-gradient-to-r from-[#d12828] to-[#961a1a]" : "bg-gradient-to-r from-[#0eb02c] to-[#0922b0]"
            }`}
            style={{ width: fill }}
          />
        </div>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="relative z-10 w-full h-7 opacity-0 cursor-pointer"
        />
        <div
          className={`absolute w-5 h-5 bg-white border-2 rounded-full shadow-md pointer-events-none transition-transform -translate-x-1/2 ${
            danger ? "border-[#d12828]" : "border-[#0eb02c]"
          }`}
          style={{ left: fill }}
        />
      </div>
      <div className="flex justify-between text-[11px] font-mono text-[#1a1919]/50">
        <span>{minLabel}</span>
        <span>{maxLabel}</span>
      </div>
    </div>
  );
}

function Stat({ label, value, tone = "green" }) {
  return (
    <div className={`flex justify-between items-center p-3.5 rounded-2xl border ${
      tone === "red"
        ? "bg-[#d12828]/5 border-[#d12828]/20"
        : tone === "blue"
        ? "bg-[#0922b0]/5 border-[#0922b0]/20"
        : "bg-[#0eb02c]/5 border-[#0eb02c]/20"
    }`}>
      <span className="text-xs font-semibold text-[#1a1919]/75">{label}</span>
      <strong className={`font-mono text-sm font-black ${
        tone === "red" ? "text-[#d12828]" : tone === "blue" ? "text-[#0922b0]" : "text-[#0eb02c]"
      }`}>
        {value}
      </strong>
    </div>
  );
}

function GoalCalculator() {
  const [goalName, setGoalName] = useState("");
  const [target, setTarget] = useState(60000);
  const [current, setCurrent] = useState(15000);
  const [monthly, setMonthly] = useState(7500);
  const [completePulse, setCompletePulse] = useState(false);

  const data = useMemo(() => {
    const safeTarget = Math.max(target, 1);
    const safeCurrent = Math.min(current, safeTarget);
    const remaining = Math.max(safeTarget - safeCurrent, 0);
    const months = remaining === 0 ? 0 : Math.ceil(remaining / Math.max(monthly, 1));
    const pct = Math.min(100, Math.round((safeCurrent / safeTarget) * 100));
    return { safeTarget, safeCurrent, remaining, months, pct };
  }, [target, current, monthly]);

  useEffect(() => {
    if (data.pct === 100) {
      setCompletePulse(true);
      const timer = setTimeout(() => setCompletePulse(false), 1400);
      return () => clearTimeout(timer);
    }
  }, [data.pct]);

  const sliderFill = (value, min, max) =>
    `${((value - min) / (max - min)) * 100}%`;

  return (
    <div className="bg-white/95 backdrop-blur-xl border border-[#1a1919]/10 rounded-3xl p-6 sm:p-10 shadow-xl max-w-4xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Controls Column */}
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-mono font-bold text-[#1a1919]/70 tracking-wider">
              TARGET PURPOSE / GOAL TITLE
            </label>
            <input
              value={goalName}
              maxLength={60}
              onChange={(e) => setGoalName(e.target.value)}
              placeholder="e.g. New Coding Laptop, Emergency Cushion"
              className="w-full h-11 px-4 rounded-xl bg-[#f0f0f0]/60 border border-[#1a1919]/15 text-sm font-medium text-[#1a1919] focus:outline-hidden focus:border-[#0eb02c] focus:bg-white transition-colors"
            />
          </div>

          <RangeField
            label="TARGET TOTAL NEEDED"
            value={target}
            min={5000}
            max={500000}
            step={1000}
            minLabel="₦5K"
            maxLabel="₦500K"
            onChange={(v) => {
              setTarget(v);
              if (current > v) setCurrent(v);
            }}
            fill={sliderFill(target, 5000, 500000)}
          />

          <RangeField
            label="CURRENT AMOUNT SAVED"
            value={current}
            min={0}
            max={500000}
            step={1000}
            minLabel="₦0"
            maxLabel="₦500K"
            danger
            onChange={(v) => setCurrent(Math.min(v, target))}
            fill={sliderFill(current, 0, 500000)}
          />

          <RangeField
            label="MONTHLY DEPOSIT VELOCITY"
            value={monthly}
            min={500}
            max={100000}
            step={500}
            minLabel="₦500"
            maxLabel="₦100K"
            onChange={setMonthly}
            fill={sliderFill(monthly, 500, 100000)}
          />
        </div>

        {/* Dynamic Visual Ring & Stats Column */}
        <div className="flex flex-col items-center justify-center p-6 rounded-3xl bg-[#f0f0f0]/70 border border-[#1a1919]/10 space-y-6">
          <motion.div
            className="relative w-48 h-48 flex items-center justify-center"
            animate={completePulse ? { scale: [1, 1.08, 1] } : { scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <svg className="w-full h-full -rotate-90" viewBox="0 0 200 200">
              <defs>
                <linearGradient id="goalRingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#0eb02c" />
                  <stop offset="100%" stopColor="#0922b0" />
                </linearGradient>
              </defs>
              <circle
                cx="100"
                cy="100"
                r="78"
                className="stroke-[#1a1919]/10 fill-none"
                strokeWidth="14"
              />
              <motion.circle
                cx="100"
                cy="100"
                r="78"
                className="fill-none"
                stroke="url(#goalRingGradient)"
                strokeWidth="14"
                strokeLinecap="round"
                strokeDasharray="490.08"
                animate={{ strokeDashoffset: 490.08 * (1 - data.pct / 100) }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              />
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="font-mono text-4xl font-black text-[#1a1919] tracking-tight">
                {data.pct}%
              </span>
              <span className="text-[10px] font-mono font-bold tracking-widest text-[#0eb02c] uppercase">
                {data.pct >= 100 ? "GOAL ACHIEVED" : "FUNDED"}
              </span>
            </div>
          </motion.div>

          {/* Quick Metrics Breakdown */}
          <div className="w-full space-y-2">
            <Stat label="Remaining to save" value={fmt(data.remaining)} tone="red" />
            <Stat
              label="Estimated time to completion"
              value={data.months === 0 ? "Goal Funded!" : `${data.months} month${data.months > 1 ? "s" : ""}`}
              tone="green"
            />
            <Stat
              label="Monthly savings pace"
              value={`${fmt(monthly)} / mo`}
              tone="blue"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function ExpensePlanner({ showToast }) {
  const [expenses, setExpenses] = useState([
    { id: 1, name: "Campus Lunch & Snacks", category: "food", amount: 12000 },
    { id: 2, name: "Weekly Shuttle / Bike Fare", category: "transport", amount: 6500 },
    { id: 3, name: "Courseware & Lab Prints", category: "education", amount: 4000 },
    { id: 4, name: "Monthly 4G Data Bundle", category: "utilities", amount: 5000 },
  ]);

  const [name, setName] = useState("");
  const [category, setCategory] = useState("food");
  const [amount, setAmount] = useState("");

  const total = useMemo(
    () => expenses.reduce((sum, item) => sum + item.amount, 0),
    [expenses]
  );

  const handleAdd = (e) => {
    e.preventDefault();
    const parsed = parseFloat(amount);
    if (!name.trim() || isNaN(parsed) || parsed <= 0) return;

    const newItem = {
      id: Date.now(),
      name: name.trim(),
      category,
      amount: parsed,
    };
    setExpenses((prev) => [newItem, ...prev]);
    setName("");
    setAmount("");
    showToast(`Added "${newItem.name}" (${fmt(parsed)})`);
  };

  const handleDelete = (id, itemName) => {
    setExpenses((prev) => prev.filter((item) => item.id !== id));
    showToast(`Removed "${itemName}"`);
  };

  const loadPreset = (presetType) => {
    if (presetType === "fresher") {
      setExpenses([
        { id: 101, name: "Hostel Essentials & Groceries", category: "food", amount: 22000 },
        { id: 102, name: "Textbooks & Lecture Notes", category: "education", amount: 15000 },
        { id: 103, name: "Campus Transport Pass", category: "transport", amount: 8000 },
        { id: 104, name: "Night Study Data Top-up", category: "utilities", amount: 6000 },
      ]);
      showToast("Loaded 'Fresher Semester' template");
    } else if (presetType === "lean") {
      setExpenses([
        { id: 201, name: "Bulk Cooking Groceries", category: "food", amount: 14000 },
        { id: 202, name: "Library WiFi & PDF Packs", category: "education", amount: 2000 },
        { id: 203, name: "Shared Campus Shuttle", category: "transport", amount: 4500 },
      ]);
      showToast("Loaded 'Ultra-Lean Budget' template");
    }
  };

  return (
    <div className="bg-white/95 backdrop-blur-xl border border-[#1a1919]/10 rounded-3xl p-6 sm:p-10 shadow-xl max-w-4xl mx-auto space-y-8">
      {/* Top Ledger Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-[#f0f0f0] border border-[#1a1919]/10">
          <span className="text-[11px] font-mono font-bold text-[#1a1919]/60 uppercase tracking-wider">
            Total Monthly Spend
          </span>
          <strong className="block text-2xl font-black text-[#1a1919] font-mono mt-1">
            {fmt(total)}
          </strong>
        </div>

        <div className="p-4 rounded-2xl bg-[#0eb02c]/10 border border-[#0eb02c]/20">
          <span className="text-[11px] font-mono font-bold text-[#0eb02c] uppercase tracking-wider">
            Active Entries
          </span>
          <strong className="block text-2xl font-black text-[#0eb02c] font-mono mt-1">
            {expenses.length} Items
          </strong>
        </div>

        <div className="p-4 rounded-2xl bg-[#0922b0]/10 border border-[#0922b0]/20 flex flex-col justify-between">
          <span className="text-[11px] font-mono font-bold text-[#0922b0] uppercase tracking-wider">
            Quick Load Template
          </span>
          <div className="flex gap-2 mt-1">
            <button
              onClick={() => loadPreset("fresher")}
              className="text-xs font-bold px-2.5 py-1 rounded-lg bg-[#0922b0] text-white hover:bg-[#071a8a] transition-colors cursor-pointer"
            >
              Fresher
            </button>
            <button
              onClick={() => loadPreset("lean")}
              className="text-xs font-bold px-2.5 py-1 rounded-lg bg-white border border-[#0922b0]/30 text-[#0922b0] hover:bg-[#0922b0]/10 transition-colors cursor-pointer"
            >
              Lean
            </button>
          </div>
        </div>
      </div>

      {/* Add Expense Form */}
      <form onSubmit={handleAdd} className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-[#f0f0f0]/60 border border-[#1a1919]/10">
        <div className="space-y-1">
          <label className="text-[11px] font-mono font-bold text-[#1a1919]/70">EXPENSE NAME</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Lunch with study group"
            required
            className="w-full h-10 px-3 rounded-xl bg-white border border-[#1a1919]/15 text-xs font-medium focus:outline-hidden focus:border-[#0eb02c]"
          />
        </div>

        <div className="space-y-1">
          <label className="text-[11px] font-mono font-bold text-[#1a1919]/70">CATEGORY</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full h-10 px-3 rounded-xl bg-white border border-[#1a1919]/15 text-xs font-medium focus:outline-hidden focus:border-[#0eb02c]"
          >
            {Object.entries(categories).map(([k, v]) => (
              <option key={k} value={k}>{v.label}</option>
            ))}
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-[11px] font-mono font-bold text-[#1a1919]/70">AMOUNT (₦)</label>
          <div className="flex gap-2">
            <input
              type="number"
              min="100"
              step="100"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="e.g. 3500"
              required
              className="flex-1 h-10 px-3 rounded-xl bg-white border border-[#1a1919]/15 text-xs font-medium font-mono focus:outline-hidden focus:border-[#0eb02c]"
            />
            <button
              type="submit"
              className="px-4 h-10 rounded-xl bg-[#0eb02c] hover:bg-[#0c9626] text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add</span>
            </button>
          </div>
        </div>
      </form>

      {/* Expense Items Table */}
      <div className="border border-[#1a1919]/10 rounded-2xl overflow-hidden bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#f0f0f0] border-b border-[#1a1919]/10 font-mono text-[10px] text-[#1a1919]/70 uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">Item</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4 text-right">Amount</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1a1919]/5">
              {expenses.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-[#1a1919]/50 font-medium">
                    No expense entries yet. Add your first expense above.
                  </td>
                </tr>
              ) : (
                expenses.map((item) => (
                  <tr key={item.id} className="hover:bg-[#f0f0f0]/40 transition-colors">
                    <td className="py-3 px-4 font-semibold text-[#1a1919]">{item.name}</td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-[#0eb02c]/10 text-[#0eb02c] border border-[#0eb02c]/20">
                        {categories[item.category]?.label || item.category}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-mono font-black text-right text-[#d12828]">
                      {fmt(item.amount)}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => handleDelete(item.id, item.name)}
                        className="p-1.5 rounded-lg text-[#1a1919]/40 hover:text-[#d12828] hover:bg-[#d12828]/10 transition-colors cursor-pointer"
                        title="Delete expense"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function MoneyMistakes() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const card = mistakesList[activeIdx];
  const IconComponent = card.icon;

  const nextCard = () => {
    setFlipped(false);
    setActiveIdx((prev) => (prev + 1) % mistakesList.length);
  };

  const prevCard = () => {
    setFlipped(false);
    setActiveIdx((prev) => (prev - 1 + mistakesList.length) % mistakesList.length);
  };

  return (
    <div className="max-w-xl mx-auto space-y-6">
      {/* 3D Flip Card Container */}
      <div
        onClick={() => setFlipped(!flipped)}
        className="cursor-pointer select-none perspective-[1200px]"
      >
        <motion.div
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full min-h-[300px] transform-style-3d shadow-xl rounded-3xl"
        >
          {/* Front Face (The Trap) */}
          <div className="absolute inset-0 backface-hidden bg-[#1a1919] text-white p-8 rounded-3xl border border-white/10 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-[#d12828]/20 text-[#ff7373] border border-[#d12828]/40">
                  <AlertTriangle className="w-3 h-3 text-[#ff7373]" />
                  <span>TRAP · {card.tag}</span>
                </span>
                <span className="text-xs font-mono text-white/50">
                  {activeIdx + 1} of {mistakesList.length}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-white tracking-tight mt-5">
                {card.title}
              </h3>
              <p className="text-sm text-white/80 leading-relaxed mt-3">
                {card.scenario}
              </p>
            </div>

            <div className="flex items-center justify-between text-xs font-mono text-[#0eb02c] pt-4 border-t border-white/10">
              <span className="flex items-center gap-1.5">
                <Lightbulb className="w-3.5 h-3.5" />
                <span>Tap to flip for solution</span>
              </span>
              <span>↻ Flip</span>
            </div>
          </div>

          {/* Back Face (The Fix) */}
          <div className="absolute inset-0 backface-hidden rotate-y-180 bg-white text-[#1a1919] p-8 rounded-3xl border border-[#1a1919]/15 flex flex-col justify-between shadow-2xl">
            <div>
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-[#0eb02c]/10 text-[#0eb02c] border border-[#0eb02c]/20">
                  <CheckCircle2 className="w-3 h-3 text-[#0eb02c]" />
                  <span>ACTIONABLE FIX</span>
                </span>
                <span className="text-xs font-mono text-[#1a1919]/50">
                  {activeIdx + 1} of {mistakesList.length}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-[#1a1919] tracking-tight mt-5">
                The Smart Habit
              </h3>
              <p className="text-sm text-[#1a1919]/80 leading-relaxed mt-3 font-medium">
                {card.fix}
              </p>
            </div>

            <div className="flex items-center justify-between text-xs font-mono text-[#0922b0] pt-4 border-t border-[#1a1919]/10">
              <span>Verified Student Strategy</span>
              <span>Tap to flip back</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Deck Controls */}
      <div className="flex items-center justify-between">
        <button
          onClick={prevCard}
          className="px-4 py-2 rounded-xl bg-white border border-[#1a1919]/15 text-xs font-bold text-[#1a1919] hover:bg-[#f0f0f0] transition-colors cursor-pointer shadow-xs"
        >
          ← Previous
        </button>

        <div className="flex gap-1.5">
          {mistakesList.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setFlipped(false);
                setActiveIdx(i);
              }}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                activeIdx === i ? "w-6 bg-[#0eb02c]" : "w-2 bg-[#1a1919]/20"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        <button
          onClick={nextCard}
          className="px-4 py-2 rounded-xl bg-[#1a1919] text-white text-xs font-bold hover:bg-[#2e2d2d] transition-colors cursor-pointer shadow-xs"
        >
          Next Card →
        </button>
      </div>
    </div>
  );
}

export default function SavingsGoals() {
  const [toast, setToast] = useState("");
  const toastTimer = useRef(null);

  const showToast = (message) => {
    setToast(message);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(""), 2400);
  };

  useEffect(() => () => clearTimeout(toastTimer.current), []);

  return (
    <div className="min-h-screen bg-[#f0f0f0] text-[#1a1919] flex flex-col font-sans paper-texture selection:bg-[#0922b0]/20 selection:text-[#0922b0]">
      {/* 1. Standard Unified Navigation Pill Header */}
      <SubpageHeader badgeText="Savings Studio" />

      {/* 2. Hero Section */}
      <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12 w-full">
        <div className="bg-white/90 backdrop-blur-xl border border-[#1a1919]/10 rounded-3xl p-8 sm:p-12 lg:p-16 shadow-xl relative overflow-hidden">
          <div className="max-w-3xl space-y-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0eb02c]/10 border border-[#0eb02c]/20 text-xs font-bold text-[#0eb02c] shadow-xs">
              <Target className="w-3.5 h-3.5 text-[#0eb02c]" />
              <span>SAVINGS GOALS & CASHFLOW STUDIO</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#1a1919] leading-[1.06]">
              Plan your milestones. <br />
              <span className="font-serif italic font-normal text-3xl sm:text-5xl text-[#0eb02c]">
                Then watch your money compound.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[#1a1919]/80 font-medium leading-relaxed max-w-2xl">
              Set savings goals with live animated progress rings, simulate semester expenses with our interactive ledger, and master the money mistakes to avoid.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href="#calculator"
                className="px-5 py-2.5 rounded-full bg-[#0eb02c] hover:bg-[#0c9626] text-white text-xs font-bold flex items-center gap-2 transition-all shadow-sm"
              >
                <span>Goal Calculator</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
              <a
                href="#planner"
                className="px-5 py-2.5 rounded-full bg-[#f0f0f0] hover:bg-[#e4e4e4] border border-[#1a1919]/10 text-[#1a1919] text-xs font-bold flex items-center gap-2 transition-all"
              >
                <span>Expense Ledger</span>
              </a>
              <a
                href="#mistakes"
                className="px-5 py-2.5 rounded-full bg-[#f0f0f0] hover:bg-[#e4e4e4] border border-[#1a1919]/10 text-[#1a1919] text-xs font-bold flex items-center gap-2 transition-all"
              >
                <span>Money Mistakes</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* 3. Main Interactive Tools */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full space-y-20">
        {/* Section 1: Goal Calculator */}
        <section id="calculator" className="scroll-mt-24">
          <SectionHeading
            eyebrow="01 · INTERACTIVE TARGETS"
            title="Watch Your Goal Fill Up in Real-Time"
            text="Adjust target sums and monthly deposit velocity. Watch the radial ring calculate your completion date."
            tone="green"
          />
          <GoalCalculator />
        </section>

        {/* Section 2: Expense Planner */}
        <section id="planner" className="scroll-mt-24">
          <SectionHeading
            eyebrow="02 · SEMESTER EXPENSE LEDGER"
            title="Track, Categorize & Plug Micro-Leaks"
            text="Add your typical campus expenses to visualize outflows and prevent end-of-month allowance dryouts."
            tone="blue"
          />
          <ExpensePlanner showToast={showToast} />
        </section>

        {/* Section 3: Money Mistakes Flashcards */}
        <section id="mistakes" className="scroll-mt-24">
          <SectionHeading
            eyebrow="03 · 3D TRAP CARDS"
            title="5 Costly Money Traps & How to Dodge Them"
            text="Flip through the flashcard deck to learn the most common student spending traps and their fixes."
            tone="rose"
          />
          <MoneyMistakes />
        </section>
      </main>

      {/* 4. Footer */}
      <div className="mt-20">
        <Footer />
      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            className="fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-2xl bg-[#1a1919] text-white text-xs font-bold shadow-2xl border border-white/10 flex items-center gap-2"
          >
            <Check className="w-3.5 h-3.5 text-[#0eb02c]" />
            <span>{toast}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
