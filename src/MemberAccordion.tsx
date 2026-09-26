import React, { useState } from "react";
import {
  Layout,
  Palette,
  Code2,
  BookOpen,
  Bot,
  ChevronDown,
} from "lucide-react";

interface TeamMemberMeta {
  id: string;
  name: string;
  role: string;
  tag: string;
  image: string;
  avatarIcon: React.ReactNode;
  accent: string;
  bgGradient: string;
  work: string;
}

const teamMembers: TeamMemberMeta[] = [
  {
    id: "1",
    name: "Member 01",
    role: "Motion & UI Lead",
    tag: "React & Framer",
    image: "/team/member-01.jpg",
    avatarIcon: <Layout className="h-7 w-7" />,
    accent: "#0922b0",
    bgGradient:
      "linear-gradient(135deg, rgba(9,34,176,0.10) 0%, rgba(9,34,176,0.02) 100%)",
    work:
      "Built the 50/30/20 scroll animation on the homepage and the progress bar that tracks each stage.",
  },
  {
    id: "2",
    name: "Member 02",
    role: "Brand & UI/UX",
    tag: "Figma & Systems",
    image: "/team/member-02.jpg",
    avatarIcon: <Palette className="h-7 w-7" />,
    accent: "#0eb02c",
    bgGradient:
      "linear-gradient(135deg, rgba(14,176,44,0.10) 0%, rgba(14,176,44,0.02) 100%)",
    work:
      "Designed the visual identity: colors, typography, and the icons used across the entire guide.",
  },
  {
    id: "3",
    name: "Member 03",
    role: "Frontend Engineer",
    tag: "Stacking & CSS",
    image: "/team/member-03.jpg",
    avatarIcon: <Code2 className="h-7 w-7" />,
    accent: "#0922b0",
    bgGradient:
      "linear-gradient(135deg, rgba(9,34,176,0.10) 0%, rgba(9,34,176,0.02) 100%)",
    work:
      "Coded the FAQ accordion and the About page layout, including the sticky stacking panels.",
  },
  {
    id: "4",
    name: "Member 04",
    role: "Research & Content",
    tag: "Economics & Data",
    image: "/team/member-04.jpg",
    avatarIcon: <BookOpen className="h-7 w-7" />,
    accent: "#0eb02c",
    bgGradient:
      "linear-gradient(135deg, rgba(14,176,44,0.10) 0%, rgba(14,176,44,0.02) 100%)",
    work:
      "Wrote the budgeting guides and student examples, and fact-checked every financial figure.",
  },
  {
    id: "5",
    name: "Member 05",
    role: "AI & Fullstack",
    tag: "Chatbot & Tools",
    image: "/team/member-05.jpg",
    avatarIcon: <Bot className="h-7 w-7" />,
    accent: "#0922b0",
    bgGradient:
      "linear-gradient(135deg, rgba(9,34,176,0.10) 0%, rgba(9,34,176,0.02) 100%)",
    work:
      "Built the AI chatbot assistant and the interactive budget calculators.",
  },
];

export default function MemberAccordion(): React.JSX.Element {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleToggle = (id: string) => {
    setExpandedId((current) => (current === id ? null : id));
  };

  return (
    <div
      className="
        flex w-full
        flex-row flex-nowrap
        gap-4
        overflow-x-auto
        px-1 pb-4
        [scrollbar-width:none]
        [&::-webkit-scrollbar]:hidden
      "
    >
      {teamMembers.map((item) => {
        const isOpen = expandedId === item.id;

        return (
          <div
            key={item.id}
            className="
              group
              w-[210px]
              min-w-[210px]
              overflow-hidden
              rounded-[20px]
              border border-black/[0.07]
              bg-white
              shadow-[0_12px_35px_rgba(0,0,0,0.07)]
              transition-shadow duration-300
              hover:shadow-[0_18px_45px_rgba(0,0,0,0.11)]
              sm:w-[225px]
              sm:min-w-[225px]
              lg:w-[235px]
              lg:min-w-[235px]
            "
          >
            {/* IMAGE */}
            <div className="p-3 pb-0">
              <div className="relative aspect-square overflow-hidden rounded-[15px] bg-[#eef0ed]">
                <img
                  src={item.image}
                  alt={item.name}
                  className="
                    h-full
                    w-full
                    object-cover
                    transition-transform
                    duration-500
                    group-hover:scale-[1.03]
                  "
                />

                {/* Small category badge */}
                <div
                  className="
                    absolute
                    left-3
                    top-3
                    flex
                    items-center
                    gap-1.5
                    rounded-full
                    border
                    bg-white/90
                    px-2.5
                    py-1.5
                    font-mono
                    text-[8px]
                    font-bold
                    uppercase
                    tracking-[0.12em]
                    backdrop-blur-md
                  "
                  style={{
                    color: item.accent,
                    borderColor: `${item.accent}25`,
                  }}
                >
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ backgroundColor: item.accent }}
                  />

                  {item.tag}
                </div>
              </div>
            </div>

            {/* MEMBER INFORMATION */}
            <div className="px-4 pt-4">
              <div className="flex items-start gap-3">
                <div
                  className="
                    flex h-9 w-9 shrink-0
                    items-center justify-center
                    rounded-xl
                  "
                  style={{
                    background: item.bgGradient,
                    color: item.accent,
                  }}
                >
                  {item.avatarIcon}
                </div>

                <div className="min-w-0">
                  <p
                    className="
                      font-mono
                      text-[9px]
                      font-bold
                      uppercase
                      tracking-[0.12em]
                      text-[#737373]
                    "
                  >
                    {item.name}
                  </p>

                  <h3
                    className="
                      mt-1
                      font-['Inter']
                      text-[15px]
                      font-extrabold
                      leading-[1.05]
                      tracking-[-0.025em]
                      text-[#171717]
                    "
                  >
                    {item.role}
                  </h3>
                </div>
              </div>
            </div>

            {/* ACCORDION BUTTON */}
            <button
              type="button"
              onClick={() => handleToggle(item.id)}
              aria-expanded={isOpen}
              aria-controls={`${item.id}-content`}
              id={`${item.id}-header`}
              className="
                mt-4
                flex
                w-full
                items-center
                justify-between
                border-t
                border-[#171717]/[0.07]
                bg-transparent
                px-4
                py-3.5
                text-left
                font-['Inter']
                text-[11px]
                font-semibold
                text-[#303030]
                transition-colors
                hover:bg-[#f7f8f6]
              "
            >
              <span>What did they work on?</span>

              <span
                className={`
                  flex h-6 w-6
                  items-center justify-center
                  rounded-full
                  transition-all duration-250
                  ${isOpen
                    ? "rotate-180 bg-[#171717] text-white"
                    : "bg-[#f0f1ef] text-[#171717]"
                  }
                `}
              >
                <ChevronDown className="h-3.5 w-3.5" />
              </span>
            </button>

            {/* ACCORDION CONTENT
                Animation intentionally preserved */}
            <div
              id={`${item.id}-content`}
              role="region"
              aria-labelledby={`${item.id}-header`}
              className={`
                overflow-hidden
                transition-[max-height]
                duration-300
                ease-out
                ${isOpen ? "max-h-[300px]" : "max-h-0"}
              `}
            >
              <p
                className="
                  border-t
                  border-[#171717]/[0.07]
                  px-4
                  py-4
                  font-['Inter']
                  text-[12px]
                  leading-[1.55]
                  text-[#555]
                "
              >
                {item.work}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}