import React, { useState } from "react";
import { ChevronDown, HelpCircle, Sparkles } from "lucide-react";
import faqData from "./faqData.json";

export default function FaqAccordion() {
  const [expandedId, setExpandedId] = useState("1"); // First question open by default

  const handleToggle = (id) => {
    setExpandedId((current) => (current === id ? null : id));
  };

  return (
    <div className="space-y-3.5">
      {faqData.map((item, index) => {
        const isOpen = expandedId === item.id;
        return (
          <div
            key={item.id}
            className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
              isOpen
                ? "bg-white border-[#0922b0]/30 shadow-md ring-1 ring-[#0922b0]/15"
                : "bg-[#f0f0f0]/80 border-[#1a1919]/10 hover:border-[#1a1919]/25 hover:bg-white/60"
            }`}
          >
            <button
              className="w-full p-4 sm:p-5 flex items-center justify-between gap-4 text-left cursor-pointer transition-colors"
              onClick={() => handleToggle(item.id)}
              aria-expanded={isOpen}
              aria-controls={`faq-${item.id}-content`}
              id={`faq-${item.id}-header`}
            >
              <div className="flex items-center gap-3">
                <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-mono font-bold shrink-0 transition-colors ${
                  isOpen ? "bg-[#0922b0] text-white" : "bg-white border border-[#1a1919]/10 text-[#1a1919]/60"
                }`}>
                  {index + 1 < 10 ? `0${index + 1}` : index + 1}
                </span>
                <span className="font-bold text-sm sm:text-base text-[#1a1919] tracking-tight">
                  {item.question}
                </span>
              </div>

              <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                isOpen ? "bg-[#0922b0]/10 text-[#0922b0] rotate-180" : "bg-white text-[#1a1919]/40"
              }`}>
                <ChevronDown className="w-4 h-4" />
              </div>
            </button>

            <div
              id={`faq-${item.id}-content`}
              role="region"
              aria-labelledby={`faq-${item.id}-header`}
              className={`transition-all duration-300 overflow-hidden ${
                isOpen ? "max-h-96 opacity-100 px-4 sm:px-5 pb-5 pt-1" : "max-h-0 opacity-0"
              }`}
            >
              <div className="pt-2 border-t border-[#1a1919]/10 text-xs sm:text-sm text-[#1a1919]/80 font-medium leading-relaxed">
                {item.answer}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
