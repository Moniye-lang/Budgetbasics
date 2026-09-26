import React, { useState, useRef, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import {
  Home,
  ShoppingCart,
  Zap,
  Utensils,
  Tv,
  Gamepad2,
  ShieldCheck,
  Target,
  TrendingUp,
} from "lucide-react";
import budgetRuleData from "./budgetRule.json";

interface RuleImage {
  src: string;
  alt: string;
}

interface BudgetRuleItem {
  id: string | number;
  label: string;
  title: string;
  text: string;
  tag: string;
  img?: string;
  alt?: string;
  images?: RuleImage[];
}

const budgetRule = budgetRuleData as BudgetRuleItem[];

// Visual interactive cards for each category
const visualCards = [
  // 0: 50% Needs
  [
    {
      icon: <Home className="h-8 w-8 text-[#123cc7]" />,
      name: "Rent & Housing",
      detail: "Campus dorm, shared apartment, or rent baseline",
      pct: "30% of Income",
      color: "#123cc7",
    },
    {
      icon: <ShoppingCart className="h-8 w-8 text-[#123cc7]" />,
      name: "Essential Groceries",
      detail: "Nutritious meal prep & basic home supplies",
      pct: "15% of Income",
      color: "#123cc7",
    },
    {
      icon: <Zap className="h-8 w-8 text-[#123cc7]" />,
      name: "Utilities & Transit",
      detail: "Power, Wi-Fi, bus pass & campus commutes",
      pct: "5% of Income",
      color: "#123cc7",
    },
  ],

  // 1: 30% Wants
  [
    {
      icon: <Utensils className="h-8 w-8 text-[#dc2929]" />,
      name: "Dining & Coffee",
      detail: "Weekend cafe study sessions and social meals",
      pct: "12% of Income",
      color: "#dc2929",
    },
    {
      icon: <Tv className="h-8 w-8 text-[#dc2929]" />,
      name: "Entertainment & Subs",
      detail: "Streaming music, movies & digital apps",
      pct: "8% of Income",
      color: "#dc2929",
    },
    {
      icon: <Gamepad2 className="h-8 w-8 text-[#dc2929]" />,
      name: "Hobbies & Outings",
      detail: "Gym pass, gaming, weekend trips & events",
      pct: "10% of Income",
      color: "#dc2929",
    },
  ],

  // 2: 20% Savings
  [
    {
      icon: <ShieldCheck className="h-8 w-8 text-[#10a83a]" />,
      name: "Starter $500 Cushion",
      detail: "Liquid cash reserve against surprise expenses",
      pct: "10% of Income",
      color: "#10a83a",
    },
    {
      icon: <Target className="h-8 w-8 text-[#10a83a]" />,
      name: "Goal Accelerators",
      detail: "Saving for laptop upgrade or future semester",
      pct: "7% of Income",
      color: "#10a83a",
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-[#10a83a]" />,
      name: "Future Growth Fund",
      detail: "High-yield savings & long-term safety runway",
      pct: "3% of Income",
      color: "#10a83a",
    },
  ],
];

export default function BudgetRule(): React.JSX.Element {
  const targetRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  const [active, setActive] = useState(0);
  const [activeImage, setActiveImage] = useState(0);
  const [isCarouselPaused, setIsCarouselPaused] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    const index = Math.min(
      budgetRule.length - 1,
      Math.max(0, Math.floor(value * budgetRule.length)),
    );

    setActive(index);
  });

  const act = budgetRule[active] || budgetRule[0];

  const currentCardSet =
    visualCards[active] || visualCards[0];

  const activeCardItem =
    currentCardSet[activeImage % currentCardSet.length];

  useEffect(() => {
    setActiveImage(0);
  }, [active]);

  useEffect(() => {
    if (isCarouselPaused) return undefined;

    const intervalId = window.setInterval(() => {
      setActiveImage(
        (current) => (current + 1) % currentCardSet.length,
      );
    }, 2800);

    return () => window.clearInterval(intervalId);
  }, [
    active,
    currentCardSet.length,
    isCarouselPaused,
  ]);

  const showNextImage = () => {
    setActiveImage(
      (current) => (current + 1) % currentCardSet.length,
    );
  };

  const showPreviousImage = () => {
    setActiveImage(
      (current) =>
        (current - 1 + currentCardSet.length) %
        currentCardSet.length,
    );
  };

  return (
    <section
      id="budget"
      ref={targetRef}
      className="
        relative
        h-[300vh]
        w-full
        bg-[#f5f6f4]
      "
    >
      <div
        className="
          sticky top-0
          flex h-screen
          w-full
          flex-col
          justify-center
          overflow-hidden
          px-6
          sm:px-10
          lg:px-16
          xl:px-24
        "
      >
        <div className="mx-auto flex h-full w-full max-w-[1450px] flex-col justify-center">
          {/* =====================================================
              TITLE
          ===================================================== */}
          <div className="flex flex-col pt-8">
            <span
              className="
                inline-flex w-fit
                items-center
                rounded-full
                border border-blue-200
                bg-blue-50
                px-4 py-2
                font-mono
                text-[10px]
                font-bold
                uppercase
                tracking-[0.14em]
                text-[#123cc7]
                sm:text-[11px]
              "
            >
              <span className="mr-2 h-1.5 w-1.5 rounded-full bg-[#123cc7]" />

              {String(active + 1).padStart(2, "0")} · LEARN BUDGETING
            </span>

            <p
              className="
    mt-5
    max-w-[700px]
    text-[clamp(2rem,3.5vw,4rem)]
    font-black
    leading-[0.95]
    tracking-[-0.055em]
    text-[#171717]
  "
            >
              The{" "}
              <span className="text-[#171717]">50</span>
              <span className="text-[#555]">/</span>
              <span className="text-[#dc2929]">30</span>
              <span className="text-[#555]">/</span>
              <span className="text-[#10a83a]">20</span>{" "}
              Budgeting Rule.
            </p>
          </div>

          {/* =====================================================
              MAIN ANIMATION
          ===================================================== */}
          <div
            className="
              flex
              min-h-0
              flex-1
              items-center
              gap-8
              py-8
              lg:gap-12
            "
          >
            {/* LEFT */}
            <div className="animation-main">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className={`
        border-l-[3px]
        pl-6
        py-6
        ${active === 0
                      ? "border-[#171717]"
                      : active === 1
                        ? "border-[#dc2929]"
                        : "border-[#10a83a]"
                    }
      `}
                >
                  <p
                    className="
          mb-2
          font-['Inter']
          text-[11px]
          font-semibold
          uppercase
          tracking-[0.12em]
          text-[#555]
        "
                  >
                    {act.label}
                  </p>

                  <h2
                    className={`
          max-w-[650px]
          font-['Inter']
          text-[clamp(2rem,3.2vw,3.8rem)]
          font-semibold
          italic
          leading-[1.05]
          tracking-[-0.045em]
          ${active === 0
                        ? "text-[#171717]"
                        : active === 1
                          ? "text-[#dc2929]"
                          : "text-[#10a83a]"
                      }
        `}
                  >
                    {act.title}
                  </h2>

                  <p
                    className="
          mt-5
          max-w-[620px]
          font-['Inter']
          text-[15px]
          font-normal
          leading-[1.6]
          text-[#46515c]
          sm:text-[16px]
        "
                  >
                    {act.text}
                  </p>

                  <p className="mt-4 flex items-center gap-2">
                    <span
                      className={`
            h-2 w-2 rounded-full
            ${active === 0
                          ? "bg-[#171717]"
                          : active === 1
                            ? "bg-[#dc2929]"
                            : "bg-[#10a83a]"
                        }
          `}
                    />

                    <span
                      className="
            rounded-full
            border border-[#dfe2df]
            bg-white/70
            px-3 py-1
            font-['Inter']
            text-[11px]
            font-medium
            tracking-wide
            text-[#555]
          "
                    >
                      {act.tag}
                    </span>
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* RIGHT VISUAL */}
            <div
              className="
                relative
                hidden
                w-[40%]
                max-w-[560px]
                shrink-0
                overflow-hidden
                rounded-[24px]
                border
                border-[#dedfdd]
                bg-white
                shadow-[0_20px_60px_rgba(0,0,0,0.08)]
                aspect-[4/3]
                lg:block
              "
              aria-label={`${act.label} visual breakdown`}
              onMouseEnter={() => setIsCarouselPaused(true)}
              onMouseLeave={() => setIsCarouselPaused(false)}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${active}-${activeImage}`}
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
                  transition={{
                    duration: 0.3,
                    ease: "easeOut",
                  }}
                  className="
                    absolute
                    inset-0
                    flex
                    flex-col
                    justify-between
                    p-7
                  "
                  style={{
                    borderTop: `4px solid ${activeCardItem.color}`,
                  }}
                >
                  <div
                    className="
                      flex
                      h-16
                      w-16
                      items-center
                      justify-center
                      rounded-[18px]
                    "
                    style={{
                      background: `${activeCardItem.color}15`,
                    }}
                  >
                    {activeCardItem.icon}
                  </div>

                  <div>
                    <span
                      className="
                        inline-flex
                        rounded-full
                        border
                        px-3
                        py-1.5
                        font-mono
                        text-[10px]
                        font-bold
                        uppercase
                        tracking-[0.08em]
                      "
                      style={{
                        color: activeCardItem.color,
                        borderColor: `${activeCardItem.color}35`,
                        background: `${activeCardItem.color}10`,
                      }}
                    >
                      {activeCardItem.pct}
                    </span>

                    <h4
                      className="
                        mt-4
                        text-[clamp(1.5rem,2.5vw,2.5rem)]
                        font-black
                        leading-[0.95]
                        tracking-[-0.045em]
                        text-[#171717]
                      "
                    >
                      {activeCardItem.name}
                    </h4>

                    <p
                      className="
                        mt-3
                        max-w-[400px]
                        text-sm
                        leading-6
                        text-[#555]
                      "
                    >
                      {activeCardItem.detail}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Carousel controls */}
              <div
                className="
                  absolute
                  inset-x-3
                  bottom-3
                  flex
                  items-center
                  justify-between
                  rounded-full
                  border
                  border-[#e2e3e1]
                  bg-white/90
                  p-1.5
                  pl-3
                  font-mono
                  text-[11px]
                  font-bold
                  text-[#444]
                  backdrop-blur-sm
                "
              >
                <button
                  type="button"
                  onClick={showPreviousImage}
                  aria-label="Previous item"
                  className="
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    rounded-full
                    border-0
                    bg-[#f1f2f0]
                    text-xl
                    leading-none
                    text-[#171717]
                    transition-colors
                    hover:bg-[#e7e9e6]
                  "
                >
                  ‹
                </button>

                <span>
                  {activeImage + 1} / {currentCardSet.length}
                </span>

                <button
                  type="button"
                  onClick={showNextImage}
                  aria-label="Next item"
                  className="
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    rounded-full
                    border-0
                    bg-[#f1f2f0]
                    text-xl
                    leading-none
                    text-[#171717]
                    transition-colors
                    hover:bg-[#e7e9e6]
                  "
                >
                  ›
                </button>
              </div>
            </div>
          </div>

          {/* =====================================================
              PROGRESS
          ===================================================== */}
          <div className="mt-4 w-full pb-8">
            <div
              className="
                h-[3px]
                w-full
                overflow-hidden
                rounded-full
                bg-[#dfe1df]
              "
            >
              <motion.div
                className="
                  h-full
                  w-full
                  origin-left
                  bg-[#123cc7]
                "
                style={{
                  scaleX: scrollYProgress,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}