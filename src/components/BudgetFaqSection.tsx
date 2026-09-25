import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
  tag: string;
}

export const BudgetFaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FaqItem[] = [
    {
      question: 'What if my income changes every month from part-time hours or tips?',
      answer: 'Base your baseline 50% Needs budget on your lowest estimated monthly income (your guaranteed floor). Whenever you have a higher-earning month, funnel 100% of the surplus directly into your 20% savings buffer or your 30% fun fund. This guarantees your rent and food are always covered regardless of shift cuts.',
      tag: 'Irregular Income',
    },
    {
      question: 'Is 50/30/20 realistic if my rent alone eats up 50% of my income?',
      answer: 'In high-cost-of-living college towns, rent might take 55-60%. If so, don’t stress — adjust temporarily to 60/25/15 or 65/25/10. The goal is building the habit of consistent 3-bucket separation, not mathematical perfection. Any savings rate (even 5% or $25/mo) starts the compounding habit.',
      tag: 'High Rent',
    },
    {
      question: 'How should I handle financial aid or lump-sum scholarship refund checks?',
      answer: 'Never treat a $3,000 semester refund as immediate spending cash. Divide the lump sum by the number of months in the term (usually 4 or 5 months) to give yourself a fixed monthly paycheck transfer. Store the rest in a high-yield savings account until the first of each month.',
      tag: 'Financial Aid',
    },
    {
      question: 'How do I budget for textbooks and course access codes that happen twice a year?',
      answer: 'Treat textbook season as a planned irregular need. If you typically spend $300 per semester on books, allocate $50/month into your Savings bucket labeled "Course Materials". When syllabus week arrives, you pay in cash with zero financial panic.',
      tag: 'Campus Expenses',
    },
    {
      question: 'Do I need to download another budgeting app with bank linking?',
      answer: 'No. Bank-linking apps often disconnect, sell transaction data, and clutter you with ads for high-fee credit cards. SmartBudget is 100% free, runs right in your browser, and focuses on high-level bucket awareness rather than micromanaging every single 50-cent receipt.',
      tag: 'Privacy & Tools',
    },
  ];

  return (
    <section id="faq" className="py-20 md:py-28 bg-[#f0f0f0] text-[#1a1919] relative overflow-hidden font-sans border-t border-[#1a1919]/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0eb02c]/10 border border-[#0eb02c]/30 text-xs font-semibold text-[#0eb02c] shadow-xs mb-4">
            <span className="w-2 h-2 rounded-full bg-[#0eb02c] animate-pulse" />
            <span>COMMONLY ASKED QUESTIONS</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-[#1a1919] leading-[1.12] mb-4">
            Frequently Asked{' '}
            <span className="bg-gradient-to-r from-[#0922b0] to-[#0eb02c] bg-clip-text text-transparent">
              Questions
            </span>
          </h2>

          <p className="text-base sm:text-lg text-[#1a1919]/80 font-medium leading-relaxed">
            Real answers to real questions college students and young adults ask about managing money.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq.question}
                className={`rounded-2xl transition-all duration-200 border ${
                  isOpen
                    ? 'bg-white shadow-md border-[#0922b0]/30'
                    : 'bg-white/80 hover:bg-white border-[#1a1919]/10'
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#f0f0f0] text-[#1a1919]/70 border border-[#1a1919]/10 shrink-0">
                      {faq.tag}
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-[#1a1919] tracking-tight">
                      {faq.question}
                    </h3>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-[#1a1919]/60 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[#0922b0]' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-[#1a1919]/80 font-normal leading-relaxed border-t border-[#1a1919]/5 animate-in fade-in duration-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
