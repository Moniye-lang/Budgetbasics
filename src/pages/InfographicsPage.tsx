import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import articlesData from "../data/galleryArticles.json";

/* =========================================================
   SHARED
========================================================= */

const COLORS = {
  ink: "#171717",
  text: "#525252",
  border: "#dedede",
  surface: "#f7f7f5",
  white: "#ffffff",
  blue: "#0922b0",
  blueTint: "#eef1ff",
  green: "#0eb02c",
  greenTint: "#edf9ef",
  amber: "#d99a00",
  amberTint: "#fff7df",
  rose: "#d12828",
  roseTint: "#fff0f0",
};

interface ArticleItem {
  id: number;
  title: string;
  readTime: string;
  content: string[];
}

interface GalleryItem {
  id: number;
  title: string;
  topic: string;
  kicker: string;
  Visual: React.FC;
  caption: string;
  details: string;
  altText: string;
}

interface InfographicsPageProps {
  onBackToHome?: () => void;
  onNavigateToTemplates?: () => void;
}

/* =========================================================
   CREDIT SCORE
========================================================= */

function CreditScoreDiagram() {
  const segments = [
    {
      label: "Payment (35%)",
      width: 98,
      x: 10,
      center: 59,
      color: COLORS.blue,
      position: "top",
      delay: 0,
    },
    {
      label: "Util (30%)",
      width: 84,
      x: 98,
      center: 140,
      color: COLORS.green,
      position: "bottom",
      delay: 0.2,
    },
    {
      label: "Age (15%)",
      width: 42,
      x: 182,
      center: 203,
      color: COLORS.amber,
      position: "top",
      delay: 0.4,
    },
    {
      label: "New (10%)",
      width: 28,
      x: 224,
      center: 238,
      color: COLORS.rose,
      position: "bottom",
      delay: 0.6,
    },
    {
      label: "Mix (10%)",
      width: 38,
      x: 252,
      center: 275,
      color: COLORS.ink,
      position: "top",
      delay: 0.8,
    },
  ];

  return (
    <div className="flex h-full w-full items-center justify-center p-4">
      <svg
        viewBox="0 0 300 120"
        className="h-auto w-full max-w-[420px]"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Track */}
        <rect
          x="10"
          y="40"
          width="280"
          height="20"
          rx="10"
          fill={COLORS.surface}
          stroke={COLORS.border}
        />

        {segments.map((segment, index) => (
          <g key={segment.label}>
            <motion.rect
              x={segment.x}
              y="40"
              height="20"
              rx={index === 0 || index === segments.length - 1 ? 10 : 0}
              fill={segment.color}
              initial={{ width: 0 }}
              whileInView={{ width: segment.width }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: segment.delay,
              }}
            />

            <text
              x={segment.center}
              y={segment.position === "top" ? 30 : 75}
              fontSize="10"
              fill={segment.color}
              textAnchor="middle"
              fontWeight="700"
            >
              {segment.label}
            </text>

            <path
              d={
                segment.position === "top"
                  ? `M ${segment.center} 34 L ${segment.center} 40`
                  : `M ${segment.center} 60 L ${segment.center} 66`
              }
              stroke={segment.color}
              strokeWidth="1"
            />
          </g>
        ))}

        {/* Corner fixes */}
        {[
          [98, COLORS.blue, 0.5],
          [182, COLORS.green, 0.7],
          [224, COLORS.amber, 0.9],
          [252, COLORS.rose, 1.1],
        ].map(([x, color, delay]) => (
          <motion.rect
            key={x}
            x={x}
            y="40"
            width="10"
            height="20"
            fill={color as string}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: Number(delay) }}
          />
        ))}
      </svg>
    </div>
  );
}

/* =========================================================
   DEBT REPAYMENT
========================================================= */

function DebtRepaymentDiagram() {
  return (
    <div className="flex h-full w-full items-center justify-center p-3">
      <svg
        viewBox="0 0 300 160"
        className="h-auto w-full max-w-[420px]"
      >
        {/* Snowball */}
        <text
          x="10"
          y="30"
          fontSize="12"
          fontWeight="700"
          fill={COLORS.ink}
        >
          Snowball
        </text>

        <text
          x="10"
          y="45"
          fontSize="10"
          fill={COLORS.text}
          fontStyle="italic"
        >
          Smallest Balance First
        </text>

        <circle cx="130" cy="35" r="8" fill={COLORS.green} />
        <text
          x="130"
          y="38"
          fontSize="8"
          fill="#fff"
          textAnchor="middle"
          fontWeight="700"
        >
          1
        </text>

        <circle
          cx="190"
          cy="35"
          r="14"
          fill={COLORS.surface}
          stroke={COLORS.border}
          strokeWidth="2"
        />

        <text
          x="190"
          y="38"
          fontSize="8"
          fill={COLORS.text}
          textAnchor="middle"
          fontWeight="700"
        >
          2
        </text>

        <circle
          cx="260"
          cy="35"
          r="22"
          fill={COLORS.surface}
          stroke={COLORS.border}
          strokeWidth="2"
        />

        <text
          x="260"
          y="38"
          fontSize="10"
          fill={COLORS.text}
          textAnchor="middle"
          fontWeight="700"
        >
          3
        </text>

        <motion.path
          d="M 142 35 L 172 35"
          stroke={COLORS.green}
          strokeWidth="2"
          strokeDasharray="4 2"
          fill="none"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        />

        <motion.path
          d="M 208 35 L 234 35"
          stroke={COLORS.green}
          strokeWidth="2"
          strokeDasharray="4 2"
          fill="none"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.7 }}
        />

        {/* Divider */}
        <line
          x1="10"
          y1="80"
          x2="290"
          y2="80"
          stroke={COLORS.border}
          strokeDasharray="4 4"
        />

        {/* Avalanche */}
        <text
          x="10"
          y="115"
          fontSize="12"
          fontWeight="700"
          fill={COLORS.ink}
        >
          Avalanche
        </text>

        <text
          x="10"
          y="130"
          fontSize="10"
          fill={COLORS.text}
          fontStyle="italic"
        >
          Highest Rate First
        </text>

        <circle cx="130" cy="120" r="22" fill={COLORS.rose} />

        <text
          x="130"
          y="123"
          fontSize="10"
          fill="#fff"
          textAnchor="middle"
          fontWeight="700"
        >
          1
        </text>

        <text
          x="130"
          y="94"
          fontSize="9"
          fill={COLORS.rose}
          textAnchor="middle"
          fontWeight="700"
        >
          24% APR
        </text>

        <circle
          cx="200"
          cy="120"
          r="8"
          fill={COLORS.surface}
          stroke={COLORS.border}
          strokeWidth="2"
        />

        <text
          x="200"
          y="123"
          fontSize="8"
          fill={COLORS.text}
          textAnchor="middle"
          fontWeight="700"
        >
          2
        </text>

        <text
          x="200"
          y="106"
          fontSize="9"
          fill={COLORS.text}
          textAnchor="middle"
        >
          12% APR
        </text>

        <circle
          cx="260"
          cy="120"
          r="14"
          fill={COLORS.surface}
          stroke={COLORS.border}
          strokeWidth="2"
        />

        <text
          x="260"
          y="123"
          fontSize="8"
          fill={COLORS.text}
          textAnchor="middle"
          fontWeight="700"
        >
          3
        </text>

        <text
          x="260"
          y="100"
          fontSize="9"
          fill={COLORS.text}
          textAnchor="middle"
        >
          5% APR
        </text>

        <motion.path
          d="M 156 120 L 188 120"
          stroke={COLORS.rose}
          strokeWidth="2"
          strokeDasharray="4 2"
          fill="none"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        />

        <motion.path
          d="M 212 120 L 242 120"
          stroke={COLORS.rose}
          strokeWidth="2"
          strokeDasharray="4 2"
          fill="none"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.7 }}
        />
      </svg>
    </div>
  );
}

/* =========================================================
   INVESTMENT
========================================================= */

function InvestmentDiagram() {
  return (
    <div className="flex h-full w-full items-center justify-center p-4">
      <svg
        viewBox="0 0 400 200"
        className="h-auto w-full max-w-[500px]"
        fill="none"
      >
        {/* Axes */}
        <line
          x1="40"
          y1="160"
          x2="360"
          y2="160"
          stroke={COLORS.border}
          strokeWidth="2"
        />

        <line
          x1="40"
          y1="160"
          x2="40"
          y2="20"
          stroke={COLORS.border}
          strokeWidth="2"
        />

        {/* Grid */}
        {[113.3, 66.6, 20].map((y) => (
          <line
            key={y}
            x1="40"
            y1={y}
            x2="360"
            y2={y}
            stroke={COLORS.border}
            strokeDasharray="4 4"
          />
        ))}

        {/* Savings */}
        <path
          d="M 40 160 L 340 110"
          stroke={COLORS.text}
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Investing */}
        <path
          d="M 40 160 Q 200 150 340 30"
          stroke={COLORS.green}
          strokeWidth="4"
          strokeLinecap="round"
        />

        <circle cx="340" cy="110" r="4" fill={COLORS.text} />
        <circle cx="340" cy="30" r="6" fill={COLORS.green} />

        <text
          x="350"
          y="115"
          fill={COLORS.text}
          fontSize="12"
          fontWeight="500"
        >
          Savings
        </text>

        <text
          x="350"
          y="35"
          fill={COLORS.green}
          fontSize="14"
          fontWeight="700"
        >
          Investing
        </text>

        <text
          x="200"
          y="190"
          fill={COLORS.text}
          fontSize="12"
          textAnchor="middle"
        >
          Time (Years)
        </text>

        {/* Concept tags */}
        <g transform="translate(100, 40)">
          <rect
            width="80"
            height="24"
            rx="12"
            fill={COLORS.blueTint}
            stroke={COLORS.blue}
          />

          <text
            x="40"
            y="16"
            fill={COLORS.blue}
            fontSize="10"
            fontWeight="600"
            textAnchor="middle"
          >
            Shares
          </text>
        </g>

        <g transform="translate(200, 70)">
          <rect
            width="90"
            height="24"
            rx="12"
            fill={COLORS.blueTint}
            stroke={COLORS.blue}
          />

          <text
            x="45"
            y="16"
            fill={COLORS.blue}
            fontSize="10"
            fontWeight="600"
            textAnchor="middle"
          >
            Mutual Funds
          </text>
        </g>
      </svg>
    </div>
  );
}

/* =========================================================
   MONEY MISTAKES
========================================================= */

function MoneyMistakesDiagram() {
  const mistakes = [
    "Impulse buying",
    "Unused subscriptions",
    "Spending without a plan",
  ];

  return (
    <div className="flex w-full flex-col gap-2.5">
      {mistakes.map((mistake) => (
        <div
          key={mistake}
          className="flex items-center gap-2.5 rounded-lg border border-[#dedede] bg-white px-3 py-2 font-sans text-sm text-[#171717]"
        >
          <span className="font-bold text-[#d12828]">✕</span>
          <span>{mistake}</span>
        </div>
      ))}
    </div>
  );
}

/* =========================================================
   SAVINGS BUFFER
========================================================= */

function SavingsBufferDiagram() {
  const buffer = [
    { label: "1 month", filled: true },
    { label: "3 months", filled: true },
    { label: "6 months", filled: false },
  ];

  return (
    <div className="flex w-full flex-col gap-3">
      <p className="m-0 text-center font-sans text-xs text-[#525252]">
        Emergency fund coverage
      </p>

      <div className="flex w-full flex-col gap-2">
        {buffer.map((step, index) => (
          <div key={step.label} className="flex items-center gap-2.5">
            <span className="w-[60px] shrink-0 font-sans text-xs text-[#525252]">
              {step.label}
            </span>

            <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-[#dedede]">
              <motion.div
                className={`h-full rounded-full ${
                  step.filled ? "bg-[#0eb02c]" : "bg-[#d99a00]"
                }`}
                initial={{ width: 0 }}
                whileInView={{
                  width: step.filled ? "100%" : "35%",
                }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.15,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* =========================================================
   BUDGET CYCLE
========================================================= */

function BudgetCycleDiagram() {
  const stages = [
    "1. Plan",
    "2. Track",
    "3. Review",
    "4. Adjust",
  ];

  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
      {/* Glow */}
      <div
        className="absolute inset-[-20px] rounded-full opacity-[0.08] blur-xl"
        style={{
          background:
            "conic-gradient(#0922b0, #d99a00, #0eb02c, #0922b0)",
          animation: "budgetCycleSpin 8s linear infinite",
        }}
      />

      <div className="relative z-10 grid grid-cols-2 gap-2.5">
        {stages.map((stage, index) => (
          <motion.div
            key={stage}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.3,
              delay: index * 0.12,
            }}
            className="rounded-[10px] border border-[#dedede] bg-white px-5 py-3 text-center font-sans text-sm font-semibold text-[#171717] shadow-sm"
          >
            {stage}
          </motion.div>
        ))}
      </div>

      <style>{`
        @keyframes budgetCycleSpin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}

/* =========================================================
   50 / 30 / 20
========================================================= */

function SplitDonutChart() {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;

  const needs = circumference * 0.5;
  const wants = circumference * 0.3;
  const savings = circumference * 0.2;

  return (
    <div className="flex flex-col items-center gap-3">
      <svg viewBox="0 0 160 160" className="h-[140px] w-[140px]">
        <circle
          cx="80"
          cy="80"
          r={radius}
          fill="none"
          stroke={COLORS.border}
          strokeWidth="80"
        />

        <motion.circle
          cx="80"
          cy="80"
          r={radius}
          fill="none"
          stroke={COLORS.blue}
          strokeWidth="80"
          strokeDasharray={`${needs} ${circumference}`}
          initial={{ strokeDashoffset: circumference }}
          whileInView={{ strokeDashoffset: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          transform="rotate(-90 80 80)"
        />

        <motion.circle
          cx="80"
          cy="80"
          r={radius}
          fill="none"
          stroke={COLORS.amber}
          strokeWidth="80"
          strokeDasharray={`${wants} ${circumference}`}
          initial={{ strokeDashoffset: circumference }}
          whileInView={{ strokeDashoffset: -needs }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            delay: 0.2,
            ease: "easeOut",
          }}
          transform="rotate(-90 80 80)"
        />

        <motion.circle
          cx="80"
          cy="80"
          r={radius}
          fill="none"
          stroke={COLORS.green}
          strokeWidth="80"
          strokeDasharray={`${savings} ${circumference}`}
          initial={{ strokeDashoffset: circumference }}
          whileInView={{
            strokeDashoffset: -(needs + wants),
          }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            delay: 0.4,
            ease: "easeOut",
          }}
          transform="rotate(-90 80 80)"
        />
      </svg>

      <div className="flex flex-wrap justify-center gap-2">
        <span className="rounded-lg bg-[#eef1ff] px-2.5 py-1 text-xs font-semibold text-[#0922b0]">
          50% Needs
        </span>

        <span className="rounded-lg bg-[#fff7df] px-2.5 py-1 text-xs font-semibold text-[#d99a00]">
          30% Wants
        </span>

        <span className="rounded-lg bg-[#edf9ef] px-2.5 py-1 text-xs font-semibold text-[#0eb02c]">
          20% Savings
        </span>
      </div>
    </div>
  );
}

/* =========================================================
   NEEDS VS WANTS
========================================================= */

function NeedsWantsDiagram() {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="rounded-xl border border-[#dedede] bg-white px-5 py-3 text-center font-sans text-sm font-semibold text-[#171717]">
        Essential for health/school?
      </div>

      <svg width="140" height="24">
        <motion.path
          d="M 70 0 L 40 24 M 70 0 L 100 24"
          stroke={COLORS.text}
          strokeWidth="1.5"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        />
      </svg>

      <div className="flex gap-2.5">
        <div className="rounded-lg bg-[#edf9ef] px-3 py-1.5 text-xs font-semibold text-[#0eb02c]">
          <span className="font-extrabold">YES</span> → Need (50%)
        </div>

        <div className="rounded-lg bg-[#fff7df] px-3 py-1.5 text-xs font-semibold text-[#d99a00]">
          <span className="font-extrabold">NO</span> → Delay 30 Days
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   GALLERY DATA
========================================================= */

const galleryItems: GalleryItem[] = [
  {
    id: 9,
    title: "How Credit Scores Work",
    topic: "Credit",
    kicker: "Anatomy of a FICO Score",
    Visual: CreditScoreDiagram,
    caption:
      "A breakdown of the five factors that make up your credit score and influence your borrowing power.",
    details:
      "Your credit score is primarily driven by your Payment History (35%) and Credit Utilization (30%). Keeping balances low and never missing a payment are the fastest ways to build strong credit. Length of history (15%), new credit (10%), and credit mix (10%) make up the rest.",
    altText:
      "A bar chart breaking down the components of a credit score.",
  },
  {
    id: 1,
    title: "The 50/30/20 Rule Anatomy",
    topic: "Budgeting",
    kicker: "Core Framework",
    Visual: SplitDonutChart,
    caption:
      "How to distribute any income into 50% Essentials, 30% Lifestyle, and 20% Future Reserves.",
    details:
      "This intuitive framework suggests you allocate 50% of your after-tax income to Needs, 30% to Wants, and the remaining 20% directly into Savings and debt repayment. It's a great baseline for beginners because it gives clear boundaries without needing to micromanage every transaction.",
    altText:
      "A split donut chart illustrating the 50/30/20 budgeting rule.",
  },
  {
    id: 6,
    title: "Common Money Mistakes",
    topic: "Spending",
    kicker: "Avoid These",
    Visual: MoneyMistakesDiagram,
    caption:
      "Three habits that quietly drain a budget faster than anything else.",
    details:
      "Impulse buying skips the pause that would've caught an unnecessary purchase. Unused subscriptions rack up small recurring charges nobody remembers signing up for. And spending without a plan means you find out you're over budget only after it's too late to fix that month.",
    altText:
      "A visual list of common money mistakes.",
  },
  {
    id: 8,
    title: "Debt Payoff Strategies",
    topic: "Debt",
    kicker: "Snowball vs Avalanche",
    Visual: DebtRepaymentDiagram,
    caption:
      "Compare the psychological wins of the Debt Snowball vs the mathematical savings of the Debt Avalanche.",
    details:
      "The Snowball method focuses on paying off your smallest balance first, regardless of interest rate, giving you quick psychological wins. The Avalanche method targets the highest interest rate first, which saves you the most money over time but requires more patience.",
    altText:
      "A diagram comparing the snowball and avalanche debt payoff methods.",
  },
  {
    id: 2,
    title: "Needs vs Wants Decision Filter",
    topic: "Spending",
    kicker: "Decision Guide",
    Visual: NeedsWantsDiagram,
    caption:
      'A simple step-by-step logic flow to evaluate any potential purchase before tapping "Buy".',
    details:
      "Needs are essential expenses like housing, groceries, utilities, and transportation. Wants are discretionary purchases like dining out and entertainment. Running a purchase through a quick filter like this one helps you catch impulse spending before it happens.",
    altText:
      "A flow chart determining whether a purchase is a need or want.",
  },
  {
    id: 7,
    title: "Growth: Saving vs. Investing",
    topic: "Investing",
    kicker: "Wealth Building",
    Visual: InvestmentDiagram,
    caption:
      "Understand the difference between holding cash and buying shares or mutual funds to build wealth over time.",
    details:
      "Saving is great for protecting money in the short term, but due to inflation, cash loses some purchasing power. Investing in shares or mutual funds puts your money to work and can provide compound growth over long periods, while also carrying investment risk.",
    altText:
      "A graph comparing savings and investing over time.",
  },
  {
    id: 3,
    title: "The 4-Stage Student Budget Cycle",
    topic: "Budgeting",
    kicker: "Monthly Process",
    Visual: BudgetCycleDiagram,
    caption:
      "The repeating cycle of Plan, Track, Review, and Adjust for lifelong money mastery.",
    details:
      "A budget isn't a set-it-and-forget-it document — it's a living cycle. At the start of the month you Plan, throughout the month you Track spending, at month's end you Review where you overspent or underspent, then Adjust for next month. Repetition is what makes it work.",
    altText:
      "A circular cycle diagram showing four stages of budgeting.",
  },
  {
    id: 5,
    title: "The Emergency Fund Ladder",
    topic: "Saving",
    kicker: "Safety Net",
    Visual: SavingsBufferDiagram,
    caption:
      "Build your buffer in stages — 1 month covered is safer than none, 3 is solid, 6 is the gold standard.",
    details:
      "An emergency fund doesn't need to be built all at once. Starting with even one month of expenses covered gives you a real cushion against a sudden cost. Three months handles many unexpected setbacks, and six months is a common longer-term target.",
    altText:
      "A ladder showing different stages of building an emergency fund.",
  },
];

const topics = [
  "All",
  "Budgeting",
  "Saving",
  "Spending",
  "Investing",
  "Debt",
  "Credit",
];

/* =========================================================
   MAIN INFOGRAPHICS PAGE
========================================================= */

export const InfographicsPage: React.FC<InfographicsPageProps> = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [activeArticleId, setActiveArticleId] = useState<number | null>(null);

  const closeModalRef = useRef<HTMLButtonElement | null>(null);

  /* -----------------------------
     Modal behavior
  ----------------------------- */

  useEffect(() => {
    if (!activeArticleId) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveArticleId(null);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    requestAnimationFrame(() => {
      closeModalRef.current?.focus();
    });

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [activeArticleId]);

  /* -----------------------------
     Filtering
  ----------------------------- */

  const filteredItems = galleryItems
    .filter(
      (item) =>
        activeFilter === "All" || item.topic === activeFilter
    )
    .sort((a, b) => {
      if (a.id === expandedId) return -1;
      if (b.id === expandedId) return 1;

      return a.id - b.id;
    });

  const activeArticle = (articlesData as ArticleItem[]).find(
    (article) => article.id === activeArticleId
  );

  return (
    <div className="min-h-screen bg-[#f0f0f0] text-[#1a1919] font-sans antialiased pb-24 relative selection:bg-[#0922b0]/20 selection:text-[#0922b0]">
      
      {/* Sub-Header Breadcrumb */}
      <div className="border-b border-[#1a1919]/8 bg-white/70 backdrop-blur-md sticky top-[68px] z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono font-bold uppercase text-[#0922b0] bg-[#0922b0]/10 px-2.5 py-1 rounded-lg border border-[#0922b0]/20 flex items-center gap-1.5">
              03 · Explore Resources
            </span>
            <span className="text-xs text-[#1a1919]/60 font-medium">
              / Visual Learning Gallery & Infographics
            </span>
          </div>
          <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#0922b0] bg-white px-3 py-1.5 rounded-xl border border-[#1a1919]/10 shadow-xs">
            VISUAL GALLERY
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6">
        <section className="rounded-[28px] bg-[#f7f7f5] px-4 py-10 sm:px-6 sm:py-14 lg:px-8 border border-[#dedede] shadow-xs">
          <div className="mx-auto max-w-7xl">
            {/* =========================================
                HEADER
            ========================================= */}

            <header className="mx-auto mb-8 max-w-3xl text-center">
              <span className="inline-flex rounded-full border border-[#dedede] bg-white px-3 py-1 font-sans text-[11px] font-bold tracking-[0.08em] text-[#525252]">
                VISUAL LEARNING GALLERY
              </span>

              <h2 className="mt-4 font-sans text-3xl font-extrabold leading-tight tracking-tight text-[#171717] sm:text-4xl lg:text-5xl">
                Learning Gallery &amp; Financial Infographics
              </h2>

              <p className="mx-auto mt-4 max-w-2xl font-sans text-sm leading-7 text-[#525252] sm:text-base">
                Dive into visual guides that break down complex money
                concepts—from budgeting to investing—into simple,
                easy-to-understand diagrams.
              </p>
            </header>

            {/* =========================================
                FILTER BAR
            ========================================= */}

            <div className="mb-8 flex flex-col gap-4 border-b border-[#dedede] pb-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex min-w-0 items-center gap-2 overflow-x-auto pb-1">
                <span className="mr-1 shrink-0 font-sans text-sm font-medium text-[#525252]">
                  Filter Topic:
                </span>

                {topics.map((topic) => {
                  const active = activeFilter === topic;

                  return (
                    <button
                      key={topic}
                      type="button"
                      onClick={() => setActiveFilter(topic)}
                      className={[
                        "shrink-0 rounded-full border px-4 py-2 font-sans text-sm font-medium transition-all duration-200 cursor-pointer",
                        active
                          ? "border-[#0922b0] bg-[#0922b0] text-white"
                          : "border-[#dedede] bg-white text-[#525252] hover:border-[#0922b0] hover:text-[#0922b0]",
                      ].join(" ")}
                    >
                      {topic}
                    </button>
                  );
                })}
              </div>

              <span className="shrink-0 font-sans text-xs text-[#737373]">
                {filteredItems.length}{" "}
                {filteredItems.length === 1 ? "guide" : "guides"}
              </span>
            </div>

            {/* =========================================
                GALLERY
            ========================================= */}

            <motion.div
              layout
              className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4"
            >
              <AnimatePresence mode="popLayout">
                {filteredItems.map((item) => {
                  const isExpanded = expandedId === item.id;
                  const Visual = item.Visual;

                  return (
                    <motion.article
                      layout
                      key={item.id}
                      initial={{
                        opacity: 0,
                        scale: 0.95,
                      }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                      }}
                      exit={{
                        opacity: 0,
                        scale: 0.95,
                      }}
                      transition={{ duration: 0.3 }}
                      className={[
                        "group cursor-pointer overflow-hidden rounded-2xl border border-[#dedede] bg-white shadow-sm outline-none transition-all duration-300",
                        "hover:-translate-y-1 hover:shadow-lg",
                        "focus-visible:ring-2 focus-visible:ring-[#0922b0] focus-visible:ring-offset-2",
                        isExpanded
                          ? "md:col-span-2 xl:col-span-4"
                          : "",
                      ].join(" ")}
                      data-topic={item.topic}
                      role="button"
                      tabIndex={0}
                      onClick={() =>
                        setExpandedId(
                          isExpanded ? null : item.id
                        )
                      }
                      onKeyDown={(event) => {
                        if (
                          event.key === "Enter" ||
                          event.key === " "
                        ) {
                          event.preventDefault();

                          setExpandedId(
                            isExpanded ? null : item.id
                          );
                        }
                      }}
                    >
                      <div
                        className={[
                          "border-t-[3px] border-transparent transition-colors duration-300",
                          item.topic === "Budgeting"
                            ? "group-hover:border-[#0922b0]"
                            : "",
                          item.topic === "Spending"
                            ? "group-hover:border-[#d99a00]"
                            : "",
                          item.topic === "Saving"
                            ? "group-hover:border-[#d99a00]"
                            : "",
                          item.topic === "Goals"
                            ? "group-hover:border-[#0eb02c]"
                            : "",
                          item.topic === "Credit"
                            ? "group-hover:border-[#0922b0]"
                            : "",
                          item.topic === "Debt"
                            ? "group-hover:border-[#d12828]"
                            : "",
                          item.topic === "Investing"
                            ? "group-hover:border-[#0eb02c]"
                            : "",
                        ].join(" ")}
                      >
                        {/* =================================
                            VISUAL
                        ================================= */}

                        <div
                          role="img"
                          aria-label={item.altText}
                          className={[
                            "flex min-h-[210px] items-center justify-center overflow-hidden bg-[#f7f7f5] p-5",
                            isExpanded
                              ? "md:min-h-[300px] md:w-[40%] md:shrink-0"
                              : "",
                          ].join(" ")}
                        >
                          <Visual />
                        </div>

                        {/* =================================
                            CONTENT
                        ================================= */}

                        <div
                          className={[
                            "flex flex-1 flex-col p-5 sm:p-6",
                            isExpanded
                              ? "md:justify-center md:p-10"
                              : "",
                          ].join(" ")}
                        >
                          <div className="mb-2 flex items-center justify-between gap-3">
                            <span className="font-sans text-sm text-[#525252]">
                              {item.topic}
                            </span>

                            <span className="text-right font-sans text-[10px] font-bold uppercase tracking-[0.06em] text-[#d99a00]">
                              {item.kicker}
                            </span>
                          </div>

                          <h3 className="m-0 text-xl font-bold leading-tight text-[#171717]">
                            {item.title}
                          </h3>

                          <p className="mt-2 text-sm leading-6 text-[#525252]">
                            {item.caption}
                          </p>

                          {/* Article button */}

                          <button
                            type="button"
                            onClick={(event) => {
                              event.stopPropagation();
                              setActiveArticleId(item.id);
                            }}
                            className="mt-4 self-start rounded-lg border border-[#dedede] bg-white px-4 py-2 text-xs font-semibold text-[#0922b0] transition-colors hover:border-[#0922b0] hover:bg-[#eef1ff] cursor-pointer"
                          >
                            📖 Read Article
                          </button>

                          {/* Expanded details */}

                          <AnimatePresence initial={false}>
                            {isExpanded && (
                              <motion.div
                                initial={{
                                  height: 0,
                                  opacity: 0,
                                }}
                                animate={{
                                  height: "auto",
                                  opacity: 1,
                                }}
                                exit={{
                                  height: 0,
                                  opacity: 0,
                                }}
                                transition={{
                                  duration: 0.3,
                                }}
                                className="overflow-hidden"
                              >
                                <div className="my-5 border-t border-[#dedede]" />

                                <h4 className="text-sm font-bold uppercase tracking-wide text-[#171717]">
                                  Deep Dive
                                </h4>

                                <p className="mt-2 max-w-3xl text-sm leading-7 text-[#525252]">
                                  {item.details}
                                </p>

                                <span className="mt-4 block text-right text-xs font-semibold text-[#0922b0]">
                                  Click anywhere to collapse ↑
                                </span>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                    </motion.article>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>
      </div>

      {/* =================================================
          ARTICLE MODAL
      ================================================= */}

      <AnimatePresence>
        {activeArticleId && (
          <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#12142b]/40 p-4 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveArticleId(null)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="article-title"
              className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-[#dedede] bg-[#f7f7f5] p-6 shadow-2xl sm:p-10"
              initial={{
                y: 50,
                opacity: 0,
              }}
              animate={{
                y: 0,
                opacity: 1,
              }}
              exit={{
                y: 50,
                opacity: 0,
              }}
              onClick={(event) => event.stopPropagation()}
            >
              {/* Close */}

              <button
                ref={closeModalRef}
                type="button"
                onClick={() => setActiveArticleId(null)}
                aria-label="Close article"
                className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full border border-[#dedede] bg-white text-xl text-[#525252] transition-colors hover:border-[#d12828] hover:bg-[#fff0f0] hover:text-[#d12828] focus:outline-none focus:ring-2 focus:ring-[#0922b0] cursor-pointer"
              >
                ×
              </button>

              {activeArticle ? (
                <>
                  <span className="mb-3 block font-sans text-xs font-bold uppercase tracking-[0.08em] text-[#d99a00]">
                    {activeArticle.readTime}
                  </span>

                  <h2
                    id="article-title"
                    className="pr-10 text-2xl font-bold leading-tight text-[#171717] sm:text-3xl"
                  >
                    {activeArticle.title}
                  </h2>

                  <div className="mt-6 space-y-4">
                    {activeArticle.content.map(
                      (paragraph, index) => {
                        const isBold =
                          paragraph.startsWith("**") &&
                          paragraph.includes("**:");

                        if (isBold) {
                          const parts = paragraph.split("**:");

                          return (
                            <p
                              key={index}
                              className="text-sm leading-7 text-[#525252] sm:text-base"
                            >
                              <strong className="font-semibold text-[#171717]">
                                {parts[0].replace(
                                  "**",
                                  ""
                                )}
                                :
                              </strong>
                              {parts[1]}
                            </p>
                          );
                        }

                        return (
                          <p
                            key={index}
                            className="text-sm leading-7 text-[#525252] sm:text-base"
                          >
                            {paragraph}
                          </p>
                        );
                      }
                    )}
                  </div>
                </>
              ) : (
                <p className="text-[#525252]">
                  Article not found.
                </p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InfographicsPage;
