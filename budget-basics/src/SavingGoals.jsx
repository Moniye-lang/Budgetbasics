import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "./SavingsGoals.css";

const money = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
  maximumFractionDigits: 0,
});
const fmt = (n) => money.format(Math.round(Number.isFinite(n) ? n : 0));

const cards = [
  {
    icon: "🛍️",
    title: "Impulse buying",
    scenario:
      "You see a 20% off sale on sneakers and buy a pair you did not plan for. Your transport money for the week is gone.",
    fix: "Wait 24 hours before a non-essential purchase. If it still fits your budget tomorrow, then decide.",
  },
  {
    icon: "🪙",
    title: "Ignoring small expenses",
    scenario:
      "A daily ₦300 snack and ₦500 ride-share can quietly become more than ₦20,000 a month.",
    fix: "Track every expense for one week, no matter how small. The total makes the leaks visible.",
  },
  {
    icon: "📅",
    title: "Late payments",
    scenario:
      "You forget a data renewal date and a late reconnect fee costs more than the original plan.",
    fix: "Set reminders two days before recurring bills and keep a small buffer for surprises.",
  },
  {
    icon: "🔁",
    title: "Unused subscriptions",
    scenario:
      "You subscribe to three streaming services but only use one while all three continue charging.",
    fix: "Audit subscriptions monthly. Cancel anything you have not used in 30 days.",
  },
  {
    icon: "🧭",
    title: "Spending without a plan",
    scenario:
      "Your allowance arrives, you spend freely, and by mid-month you are borrowing for food or transport.",
    fix: "Give every naira a job: needs first, savings second, wants last.",
  },
];

const categories = {
  food: ["Food", "green"],
  transport: ["Transport", "green"],
  education: ["Education", "green"],
  entertainment: ["Entertainment", "amber"],
  shopping: ["Shopping", "rose"],
  utilities: ["Utilities", "blue"],
  miscellaneous: ["Miscellaneous", "violet"],
};

function Reveal({ children, className = "", delay = 0 }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function SectionHeading({ eyebrow, title, text, tone = "green" }) {
  return (
    <Reveal className="sg-section-heading">
      <span className={`sg-eyebrow sg-eyebrow-${tone}`}>{eyebrow}</span>
      <h2>{title}</h2>
      <p>{text}</p>
    </Reveal>
  );
}

function GoalCalculator() {
  const [goalName, setGoalName] = useState("");
  const [target, setTarget] = useState(50000);
  const [current, setCurrent] = useState(5000);
  const [monthly, setMonthly] = useState(5000);
  const [completePulse, setCompletePulse] = useState(false);

  const data = useMemo(() => {
    const safeTarget = Math.max(target, 1);
    const safeCurrent = Math.min(current, safeTarget);
    const remaining = Math.max(safeTarget - safeCurrent, 0);
    const months =
      remaining === 0 ? 0 : Math.ceil(remaining / Math.max(monthly, 1));
    const pct = Math.min(100, Math.round((safeCurrent / safeTarget) * 100));
    return { safeTarget, safeCurrent, remaining, months, pct };
  }, [target, current, monthly]);

  useEffect(() => {
    if (data.pct === 100) {
      setCompletePulse(true);
      const timer = setTimeout(() => setCompletePulse(false), 1200);
      return () => clearTimeout(timer);
    }
  }, [data.pct]);

  const timeline = [0, 25, 50, 75, 100];

  const sliderFill = (value, min, max) =>
    `${((value - min) / (max - min)) * 100}%`;

  return (
    <div className="goal-card">
      <div className="goal-form">
        <label>
          GOAL NAME
          <input
            value={goalName}
            maxLength={60}
            onChange={(e) => setGoalName(e.target.value)}
            placeholder="e.g. New laptop, Emergency fund"
          />
          {goalName.length > 60 && <small>Maximum 60 characters.</small>}
        </label>

        <RangeField
          label="TARGET AMOUNT"
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
          label="CURRENT SAVINGS"
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
          label="MONTHLY CONTRIBUTION"
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

      <div className="goal-result">
        <motion.div
          className={`goal-ring-wrap ${completePulse ? "complete" : ""}`}
          animate={completePulse ? { scale: [1, 1.08, 1] } : { scale: 1 }}
          transition={{ duration: 0.7 }}
        >
          <svg className="goal-ring" viewBox="0 0 200 200">
            <defs>
              <linearGradient
                id="goalGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="var(--green)" />
                <stop offset="100%" stopColor="var(--blue)" />
              </linearGradient>
            </defs>
            <circle className="ring-bg" cx="100" cy="100" r="80" />
            <motion.circle
              className="ring-fg"
              cx="100"
              cy="100"
              r="80"
              strokeDasharray="502.65"
              animate={{ strokeDashoffset: 502.65 * (1 - data.pct / 100) }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            />
          </svg>
          <div className="goal-ring-center">
            <strong>{data.pct}%</strong>
            <span>FUNDED</span>
          </div>
        </motion.div>

        <div className="goal-stats">
          <Stat
            label="Remaining to fund"
            value={fmt(data.remaining)}
            tone="red"
          />
          <Stat
            label="Months to goal"
            value={String(data.months)}
            tone="green"
          />
          <Stat
            label="Monthly needed"
            value={fmt(
              data.months ? Math.ceil(data.remaining / data.months) : 0,
            )}
            tone="green"
          />

          <motion.div className="motivation" layout>
            <motion.span
              className="motivation-emoji"
              key={
                data.pct >= 100
                  ? "celebrate"
                  : data.pct >= 75
                    ? "fire"
                    : data.pct >= 50
                      ? "strong"
                      : "start"
              }
              initial={{ scale: 0.7 }}
              animate={{ scale: 1 }}
            >
              {data.pct >= 100
                ? "🎉"
                : data.pct >= 75
                  ? "🔥"
                  : data.pct >= 50
                    ? "💪"
                    : data.pct >= 25
                      ? "🙂"
                      : "😐"}
            </motion.span>
            <div>
              <strong>
                {data.pct >= 100
                  ? "Goal reached!"
                  : data.pct >= 75
                    ? "Almost there"
                    : data.pct >= 50
                      ? "Halfway"
                      : data.pct >= 25
                        ? "Getting there"
                        : "Just getting started"}
              </strong>
              <p>
                {data.pct >= 100
                  ? "Time to pick a new goal."
                  : "A little more each month goes far."}
              </p>
              <div className="mot-bar">
                <motion.span animate={{ width: `${data.pct}%` }} />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="deduction-strip">
        <span>Deduction from target (already saved)</span>
        <strong>−{fmt(data.safeCurrent)}</strong>
      </div>

      <div className="timeline">
        <div className="timeline-head">
          <strong>Your path</strong>
          <span>
            {data.months === 0
              ? "Goal reached"
              : `~${data.months} ${data.months === 1 ? "month" : "months"}`}
          </span>
        </div>
        <div className="timeline-track">
          <motion.div
            className="timeline-fill"
            animate={{ width: `${data.pct}%` }}
          />
          {timeline.map((cp, i) => (
            <motion.div
              className={`milestone ${data.pct >= cp ? "complete" : ""}`}
              key={cp}
              initial={{ opacity: 0, y: 8, scale: 0.85 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <span />
              <small>
                {cp === 0
                  ? "Now"
                  : cp === 100
                    ? "Goal"
                    : `M${Math.ceil((data.months * cp) / 100)}`}
              </small>
              <b>{fmt((data.safeTarget * cp) / 100)}</b>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function RangeField({
  label,
  value,
  min,
  max,
  step,
  minLabel,
  maxLabel,
  onChange,
  fill,
  danger,
}) {
  return (
    <div className="range-field">
      <div className="range-head">
        <span>{label}</span>
        <strong
          className={
            danger
              ? "value-red"
              : label === "MONTHLY CONTRIBUTION"
                ? "value-green"
                : ""
          }
        >
          {fmt(value)}
        </strong>
      </div>
      <div className="range-wrap">
        <div className="range-track">
          <motion.span
            className={danger ? "range-fill range-fill-red" : "range-fill"}
            animate={{ width: fill }}
          />
        </div>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className={danger ? "danger-slider" : ""}
          aria-label={label}
        />
      </div>
      <div className="range-minmax">
        <span>{minLabel}</span>
        <span>{maxLabel}</span>
      </div>
    </div>
  );
}

function Stat({ label, value, tone }) {
  return (
    <div className={`goal-stat goal-stat-${tone}`}>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function ExpensePlanner({ showToast }) {
  const [budget, setBudget] = useState(50000);
  const [expenses, setExpenses] = useState([]);
  const [form, setForm] = useState({
    date: new Date().toISOString().split("T")[0],
    category: "",
    description: "",
    amount: "",
  });
  const [editing, setEditing] = useState(null);
  const [errors, setErrors] = useState({});

  const spent = expenses.reduce((sum, e) => sum + e.amount, 0);
  const remaining = budget - spent;
  const usage = budget > 0 ? (spent / budget) * 100 : 0;

  const tip =
    remaining < 0
      ? {
          tone: "rose",
          text: `You're over budget by ${fmt(Math.abs(remaining))}. Review entries and see what can be trimmed.`,
        }
      : usage >= 80
        ? {
            tone: "rose",
            text: `Careful — you've used ${Math.round(usage)}% of your budget. Only ${fmt(remaining)} remains.`,
          }
        : usage >= 50
          ? {
              tone: "blue",
              text: `Halfway there. You've spent ${Math.round(usage)}% and have ${fmt(remaining)} left.`,
            }
          : {
              tone: "green",
              text: expenses.length
                ? `Looking good. You have ${fmt(remaining)} remaining.`
                : "Start adding expenses and I'll show you how your budget is holding up.",
            };

  const validate = () => {
    const next = {};
    if (!form.date) next.date = "Please pick a date.";
    if (!form.category) next.category = "Please choose a category.";
    if (!form.description.trim())
      next.description = "Please add a short description.";
    else if (form.description.trim().length > 80)
      next.description = "Too long (max 80 characters).";
    if (!form.amount || Number(form.amount) <= 0)
      next.amount = "Enter an amount greater than zero.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    const entry = {
      date: form.date,
      category: form.category,
      description: form.description.trim(),
      amount: Number(form.amount),
    };
    if (editing !== null) {
      setExpenses((prev) =>
        prev.map((item, i) => (i === editing ? entry : item)),
      );
      setEditing(null);
      showToast("Expense updated");
    } else {
      setExpenses((prev) => [...prev, entry]);
      showToast("Expense added");
    }
    setForm({
      date: new Date().toISOString().split("T")[0],
      category: "",
      description: "",
      amount: "",
    });
    setErrors({});
  };

  const edit = (index) => {
    const item = expenses[index];
    setForm({ ...item, amount: String(item.amount) });
    setEditing(index);
    document
      .getElementById("epForm")
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const remove = (index) => {
    setExpenses((prev) => prev.filter((_, i) => i !== index));
    if (editing === index) setEditing(null);
    showToast("Expense removed");
  };

  return (
    <div className="expense-card">
      <div className="expense-summary">
        <Summary label="MONTHLY BUDGET" value={fmt(budget)} />
        <Summary label="TOTAL SPENT" value={fmt(spent)} tone="red" />
        <Summary
          label="REMAINING"
          value={fmt(remaining)}
          tone={remaining < 0 ? "red-dark" : "dark"}
        />
      </div>

      <form id="epForm" className="expense-form" onSubmit={submit}>
        <Field label="DATE" error={errors.date}>
          <input
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
          />
        </Field>
        <Field label="CATEGORY" error={errors.category}>
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          >
            <option value="">Select a category</option>
            {Object.entries(categories).map(([key, [label]]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
        </Field>
        <Field label="DESCRIPTION" error={errors.description} wide>
          <input
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="e.g. Lunch at campus cafeteria"
          />
        </Field>
        <Field label="AMOUNT (₦)" error={errors.amount}>
          <input
            type="number"
            min="0"
            step="any"
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
            placeholder="1500"
          />
        </Field>
        <Field label="MONTHLY BUDGET (₦)">
          <input
            type="number"
            min="0"
            step="any"
            value={budget}
            onChange={(e) => setBudget(Number(e.target.value) || 0)}
          />
        </Field>
        <div className="form-actions">
          <button className="btn btn-primary" type="submit">
            {editing !== null ? "✓ Update expense" : "+ Add expense"}
          </button>
          <button
            className="btn btn-ghost"
            type="button"
            onClick={() => {
              setExpenses([]);
              setEditing(null);
              showToast("All expenses cleared");
            }}
          >
            Clear all
          </button>
        </div>
      </form>

      <div className="expense-table-wrap">
        {expenses.length === 0 ? (
          <div className="empty-expenses">
            <span>📝</span>
            <p>No expenses yet. Add your first entry above.</p>
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Category</th>
                <th>Description</th>
                <th>Amount</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence initial={false}>
                {expenses.map((exp, i) => {
                  const [label, tone] = categories[exp.category] || [
                    "Other",
                    "blue",
                  ];
                  return (
                    <motion.tr
                      key={`${exp.date}-${exp.description}-${i}`}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                    >
                      <td>{exp.date}</td>
                      <td>
                        <span className={`category-pill ${tone}`}>{label}</span>
                      </td>
                      <td>{exp.description}</td>
                      <td className="amount-red">−{fmt(exp.amount)}</td>
                      <td>
                        <button
                          className="icon-btn"
                          onClick={() => edit(i)}
                          aria-label="Edit"
                        >
                          ✎
                        </button>
                        <button
                          className="icon-btn danger"
                          onClick={() => remove(i)}
                          aria-label="Delete"
                        >
                          ✕
                        </button>
                      </td>
                    </motion.tr>
                  );
                })}
              </AnimatePresence>
            </tbody>
          </table>
        )}
      </div>

      <div className={`expense-tip ${tip.tone}`}>
        <strong>💡 Tip: </strong>
        {tip.text}
      </div>
    </div>
  );
}

function Summary({ label, value, tone = "" }) {
  return (
    <div className={`summary-card ${tone}`}>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function Field({ label, error, wide, children }) {
  return (
    <label className={wide ? "field wide" : "field"}>
      <span>{label}</span>
      {children}
      {error && <small>{error}</small>}
    </label>
  );
}

function MoneyMistakes() {
  const [order, setOrder] = useState(() =>
    cards.map((_, i) => i).sort(() => Math.random() - 0.5),
  );
  const [active, setActive] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [auto, setAuto] = useState(true);
  const timer = useRef(null);

  useEffect(() => {
    if (!auto) return undefined;
    timer.current = window.setInterval(() => {
      setFlipped(false);
      setActive((i) => (i + 1) % order.length);
    }, 4200);
    return () => window.clearInterval(timer.current);
  }, [auto, order.length]);

  const shuffle = () => {
    setOrder((prev) => [...prev].sort(() => Math.random() - 0.5));
    setActive(0);
    setFlipped(false);
  };

  return (
    <div>
      <div className="flash-deck">
        {order.map((cardIndex, position) => {
          const card = cards[cardIndex];
          const rel = (position - active + order.length) % order.length;
          const pos = Math.min(rel, 3);
          return (
            <motion.div
              key={cardIndex}
              className={`flash-card pos-${pos} ${pos === 0 && flipped ? "flipped" : ""}`}
              animate={
                pos === 0
                  ? { x: 0, y: 0, scale: 1, opacity: 1, rotate: 0 }
                  : {
                      x: 0,
                      y: pos * 16,
                      scale: 1 - pos * 0.05,
                      opacity: pos === 1 ? 0.78 : pos === 2 ? 0.5 : 0,
                    }
              }
              transition={{ duration: 0.55, ease: [0.2, 0.8, 0.2, 1] }}
              onClick={() => pos === 0 && setFlipped((v) => !v)}
            >
              <div className="flash-inner">
                <div className="flash-face flash-front">
                  <span className="flash-badge">⚠ COMMON TRAP</span>
                  <h3>
                    {card.icon} {card.title}
                  </h3>
                  <p>{card.scenario}</p>
                  <small>👆 Tap to see the fix</small>
                </div>
                <div className="flash-face flash-back">
                  <span className="flash-badge fix-badge">✓ THE FIX</span>
                  <h3>{card.title}</h3>
                  <p>{card.fix}</p>
                  <small>✓ Remember this one</small>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="flash-controls">
        <button className="btn btn-ghost" onClick={shuffle}>
          🔀 Shuffle
        </button>
        <div className="flash-progress">
          <span>
            {active + 1} / {cards.length}
          </span>
          <div>
            <motion.span
              animate={{ width: `${((active + 1) / cards.length) * 100}%` }}
            />
          </div>
          <span>Auto: {auto ? "ON" : "OFF"}</span>
        </div>
        <button className="btn btn-primary" onClick={() => setAuto((v) => !v)}>
          {auto ? "⏸ Pause" : "▶️ Play"}
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
    <div className="savings-goals">
      <div className="sg-scroll-progress" />

      <header className="sg-header">
        <div className="sg-header-inner">
          <div className="sg-brand">
            <span>₦</span>
            <strong>BudgetBasics</strong>
          </div>
          <nav>
            <a href="#savings-home">Home</a>
            <a className="active" href="#savings">
              Savings Goals
            </a>
          </nav>
        </div>
      </header>

      <Reveal className="sg-hero" id="savings-home">
        <div className="sg-hero-copy">
          <span className="sg-eyebrow">SAVINGS GOALS</span>
          <h1>
            Plan it.
            <br />
            <em>Then watch it grow.</em>
          </h1>
          <p>
            Set savings goals, plan your monthly expenses, and learn the money
            mistakes to avoid — all in one place.
          </p>
          <div className="sg-actions">
            <a className="btn btn-primary" href="#savings">
              Start with a goal →
            </a>
            <a className="btn btn-ghost" href="#mistakes">
              See money mistakes
            </a>
          </div>
        </div>
        <motion.div
          className="sg-hero-visual"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="money-orbit">
            <span>₦</span>
            <i>+</i>
            <b>✓</b>
          </div>
          <p>SMALL STEPS. BIG RESULTS.</p>
        </motion.div>
      </Reveal>

      <main className="sg-main">
        <section id="savings" className="sg-section">
          <SectionHeading
            eyebrow="SAVINGS GOALS — GOAL CALCULATOR"
            title="Watch it fill up."
            text="Drag the sliders. Watch the ring draw. When it hits 100% — we celebrate."
          />
          <GoalCalculator />
        </section>

        <section id="expenses" className="sg-section">
          <SectionHeading
            eyebrow="SAVINGS GOALS — EXPENSE PLANNER"
            title="Add it. Track it. Fix it."
            text="Add sample expenses and watch them add up. Entries exist only during this session — nothing is saved."
          />
          <ExpensePlanner showToast={showToast} />
        </section>

        <section id="mistakes" className="sg-section">
          <SectionHeading
            eyebrow="SAVINGS GOALS — MONEY MISTAKES"
            title="Flip. Learn. Avoid."
            text="A flashcard deck of common money traps. Tap a card to flip it, or let it auto-shuffle."
            tone="rose"
          />
          <MoneyMistakes />
        </section>

        <Reveal className="sg-final">
          <div className="final-icon">✓</div>
          <h2>Practice makes progress.</h2>
          <p>
            Every goal you set, every expense you track, every mistake you avoid
            — it all compounds into better habits.
          </p>
        </Reveal>
      </main>

      <footer className="sg-footer">
        <span>©️ 2026 BudgetBasics</span>
        <span>Savings Goals • Interactive Financial Education</span>
      </footer>

      <AnimatePresence>
        {toast && (
          <motion.div
            className="sg-toast"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
