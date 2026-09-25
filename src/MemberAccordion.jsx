import React, { useState } from "react";
import { User, ChevronDown, CheckCircle2, Code2, Palette, Layers, Terminal, Sparkles } from "lucide-react";
import members from "./members.json";

const roleIcons = [Code2, Palette, Layers, Terminal, Sparkles];
const memberNames = [
  { name: "Frontend Lead", tag: "Interactive Core" },
  { name: "UI/UX Designer", tag: "Visual Identity" },
  { name: "Layout Architect", tag: "Components & FAQ" },
  { name: "Content Strategist", tag: "Research & Data" },
  { name: "Full-Stack Engineer", tag: "AI Bot & Tools" },
];

export default function MemberAccordion() {
  const [expandedId, setExpandedId] = useState("1"); // First member open for immediate visual feedback

  const handleToggle = (id) => {
    setExpandedId((current) => (current === id ? null : id));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {members.map((item, index) => {
        const isOpen = expandedId === item.id;
        const IconComponent = roleIcons[index % roleIcons.length];
        const meta = memberNames[index] || { name: `Builder 0${item.id}`, tag: "Developer" };

        return (
          <div
            key={item.id}
            onClick={() => handleToggle(item.id)}
            className={`cursor-pointer rounded-2xl p-5 border transition-all duration-300 flex flex-col justify-between ${
              isOpen
                ? "bg-white border-[#0eb02c]/50 shadow-md ring-1 ring-[#0eb02c]/20"
                : "bg-[#f0f0f0]/90 border-[#1a1919]/10 hover:border-[#1a1919]/25 hover:bg-white/80"
            }`}
          >
            <div>
              {/* Header Card: Avatar & Badge */}
              <div className="flex items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center font-bold text-sm transition-colors ${
                    isOpen ? "bg-[#0eb02c] text-white shadow-xs" : "bg-white border border-[#1a1919]/10 text-[#1a1919]"
                  }`}>
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={`Team member ${item.id}`}
                        className="w-full h-full object-cover rounded-xl"
                      />
                    ) : (
                      <IconComponent className="w-5 h-5" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-[#1a1919] tracking-tight">{meta.name}</h4>
                    <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-[#0eb02c]/10 text-[#0eb02c] border border-[#0eb02c]/20">
                      {meta.tag}
                    </span>
                  </div>
                </div>

                <div className={`w-7 h-7 rounded-full flex items-center justify-center transition-transform duration-200 ${
                  isOpen ? "bg-[#0eb02c]/10 text-[#0eb02c] rotate-180" : "bg-white/80 text-[#1a1919]/50"
                }`}>
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>

              {/* Work Details Area */}
              <div className={`transition-all duration-300 overflow-hidden ${
                isOpen ? "max-h-48 opacity-100 pt-2 border-t border-[#1a1919]/10" : "max-h-0 opacity-0"
              }`}>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold uppercase tracking-wider text-[#0eb02c]">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Role Contributions</span>
                  </div>
                  <p className="text-xs text-[#1a1919]/80 leading-relaxed font-medium">
                    {item.work}
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom ID pill */}
            <div className="mt-3 pt-2 flex items-center justify-between text-[11px] font-mono text-[#1a1919]/40 border-t border-[#1a1919]/5">
              <span>Member #0{item.id}</span>
              <span className="text-[10px] text-[#0eb02c] font-semibold">Aptech ADSE</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
