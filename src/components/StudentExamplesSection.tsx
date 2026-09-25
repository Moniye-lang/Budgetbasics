import React, { useState } from 'react';
import { 
  GraduationCap, 
  CheckCircle, 
  Quote
} from 'lucide-react';

interface StudentProfile {
  id: string;
  name: string;
  major: string;
  school: string;
  income: string;
  source: string;
  story: string;
  takeaway: string;
  breakdown: {
    needs: { amount: string; pct: string; desc: string };
    wants: { amount: string; pct: string; desc: string };
    savings: { amount: string; pct: string; desc: string };
  };
}

export const StudentExamplesSection: React.FC = () => {
  const students: StudentProfile[] = [
    {
      id: 'maya',
      name: 'Maya Chen',
      major: 'Sophomore · Graphic Design',
      school: 'University of Washington',
      income: '$1,350/mo',
      source: 'Campus Cafe (15 hrs/wk) + Freelance',
      story: 'Before using SmartBudget, I constantly felt guilty whenever I bought boba with friends or a new sketchbook. Setting a dedicated $405/mo Wants bucket gave me full freedom to enjoy campus life without touching my rent money.',
      takeaway: 'Saved $800 emergency fund in 3 months while still eating out twice a week.',
      breakdown: {
        needs: { amount: '$675', pct: '50%', desc: 'Dorm meal plan split, transit card & software subscriptions' },
        wants: { amount: '$405', pct: '30%', desc: 'Coffee runs, concert tickets & weekend road trips' },
        savings: { amount: '$270', pct: '20%', desc: 'Emergency cushion & laptop upgrade fund' },
      },
    },
    {
      id: 'liam',
      name: 'Liam Vance',
      major: 'Senior · Mechanical Engineering',
      school: 'Purdue University',
      income: '$2,100/mo',
      source: 'Engineering Co-op + Research Stipend',
      story: 'Off-campus housing with 3 roommates meant variable heating bills and grocery runs. The 50/30/20 framework let me lock in fixed shared expenses first, so we never had an awkward split argument.',
      takeaway: 'Eliminated overdraft fees completely and paid for graduation trip in full.',
      breakdown: {
        needs: { amount: '$1,050', pct: '50%', desc: 'Room rent, electric, Wi-Fi & bulk meal prep' },
        wants: { amount: '$630', pct: '30%', desc: 'Gym membership, gaming, dining out with roommates' },
        savings: { amount: '$420', pct: '20%', desc: 'Moving deposit for post-grad job in Austin' },
      },
    },
    {
      id: 'jordan',
      name: 'Jordan Taylor',
      major: 'Junior · Nursing',
      school: 'Ohio State University',
      income: '$1,750/mo',
      source: 'Hospital Tech Weekend Shifts',
      story: 'Clinical rotations required car insurance and lots of gas. Categorizing auto costs as non-negotiable Needs prevented me from running out of money before my next biweekly shift deposit.',
      takeaway: 'Automated 20% into high-yield savings before even seeing the checking balance.',
      breakdown: {
        needs: { amount: '$875', pct: '50%', desc: 'Gas, scrubs, auto insurance, phone & groceries' },
        wants: { amount: '$525', pct: '30%', desc: 'Post-shift takeout, thrift shopping & streaming' },
        savings: { amount: '$350', pct: '20%', desc: 'NCLEX exam prep materials & emergency tire fund' },
      },
    },
  ];

  const [activeStudent, setActiveStudent] = useState<StudentProfile>(students[0]);

  return (
    <section id="examples" className="py-20 md:py-28 bg-[#f0f0f0] text-[#1a1919] relative overflow-hidden font-sans border-t border-[#1a1919]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0eb02c]/10 border border-[#0eb02c]/30 text-xs font-semibold text-[#0eb02c] shadow-xs mb-4">
            <span className="w-2 h-2 rounded-full bg-[#0eb02c] animate-pulse" />
            <span>REAL STUDENT SCENARIOS · PROVEN BLUEPRINTS</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-[#1a1919] leading-[1.12] mb-4">
            How Real Students Budget on{' '}
            <span className="bg-gradient-to-r from-[#0922b0] to-[#0eb02c] bg-clip-text text-transparent">
              Real Paychecks
            </span>
          </h2>

          <p className="text-base sm:text-lg text-[#1a1919]/80 font-medium leading-relaxed">
            No fictional corporate salaries. See the exact numbers, budget splits, and real-life tactics students use every month to stay ahead.
          </p>
        </div>

        {/* Student Selector Tabs */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          {students.map((student) => (
            <button
              key={student.id}
              onClick={() => setActiveStudent(student)}
              className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2.5 transition-all ${
                activeStudent.id === student.id
                  ? 'bg-[#1a1919] text-white shadow-md scale-102'
                  : 'bg-white hover:bg-zinc-100 text-[#1a1919]/80 border border-[#1a1919]/10'
              }`}
            >
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                activeStudent.id === student.id ? 'bg-[#0eb02c] text-white' : 'bg-[#f0f0f0] text-[#1a1919]'
              }`}>
                {student.name.charAt(0)}
              </div>
              <span>{student.name}</span>
              <span className="text-[11px] font-mono opacity-70">({student.income})</span>
            </button>
          ))}
        </div>

        {/* Active Profile Card */}
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 sm:p-12 border border-[#1a1919]/10 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Student Bio & Story */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#0922b0] text-white font-black text-xl flex items-center justify-center shadow-md">
                {activeStudent.name.charAt(0)}
              </div>
              <div>
                <h3 className="text-2xl font-black text-[#1a1919] tracking-tight">
                  {activeStudent.name}
                </h3>
                <div className="flex items-center gap-2 text-xs font-semibold text-[#1a1919]/60">
                  <GraduationCap className="w-4 h-4 text-[#0922b0]" />
                  <span>{activeStudent.major}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-[#f0f0f0] border border-[#1a1919]/5">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#1a1919]/50 font-bold block">
                  Monthly Income
                </span>
                <span className="text-base font-black text-[#0922b0]">{activeStudent.income}</span>
              </div>
              <div className="p-3 rounded-xl bg-[#f0f0f0] border border-[#1a1919]/5">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#1a1919]/50 font-bold block">
                  Income Source
                </span>
                <span className="text-xs font-bold text-[#1a1919] truncate block">{activeStudent.source}</span>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#0922b0]/5 border border-[#0922b0]/15 relative">
              <Quote className="w-6 h-6 text-[#0922b0]/20 absolute top-4 right-4" />
              <p className="text-xs sm:text-sm text-[#1a1919]/85 font-medium leading-relaxed italic">
                "{activeStudent.story}"
              </p>
            </div>

            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[#0eb02c]/10 border border-[#0eb02c]/20 text-xs font-bold text-[#0eb02c]">
              <CheckCircle className="w-4 h-4 shrink-0" />
              <span>Result: {activeStudent.takeaway}</span>
            </div>
          </div>

          {/* Right Column: Visual Breakdown Graph & Buckets */}
          <div className="lg:col-span-6 space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#1a1919]/60">
              Monthly Budget Allocation Breakdown
            </h4>

            {/* Needs Card */}
            <div className="p-4 rounded-2xl bg-[#f0f0f0] border border-[#1a1919]/10 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2 h-2 rounded-full bg-[#1a1919]" />
                  <span className="text-xs font-mono font-bold uppercase text-[#1a1919]">50% Needs</span>
                </div>
                <p className="text-[11px] text-[#1a1919]/70 font-medium max-w-[280px]">
                  {activeStudent.breakdown.needs.desc}
                </p>
              </div>
              <div className="text-right">
                <span className="text-xl font-black text-[#1a1919]">
                  {activeStudent.breakdown.needs.amount}
                </span>
                <span className="block text-[10px] font-mono text-[#1a1919]/50">/month</span>
              </div>
            </div>

            {/* Wants Card */}
            <div className="p-4 rounded-2xl bg-[#d12828]/10 border border-[#d12828]/25 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2 h-2 rounded-full bg-[#d12828]" />
                  <span className="text-xs font-mono font-bold uppercase text-[#d12828]">30% Wants (Fun)</span>
                </div>
                <p className="text-[11px] text-[#1a1919]/70 font-medium max-w-[280px]">
                  {activeStudent.breakdown.wants.desc}
                </p>
              </div>
              <div className="text-right">
                <span className="text-xl font-black text-[#d12828]">
                  {activeStudent.breakdown.wants.amount}
                </span>
                <span className="block text-[10px] font-mono text-[#d12828]/70">/month</span>
              </div>
            </div>

            {/* Savings Card */}
            <div className="p-4 rounded-2xl bg-[#0eb02c]/15 border border-[#0eb02c]/30 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2 h-2 rounded-full bg-[#0eb02c]" />
                  <span className="text-xs font-mono font-bold uppercase text-[#0eb02c]">20% Future Growth</span>
                </div>
                <p className="text-[11px] text-[#1a1919]/70 font-medium max-w-[280px]">
                  {activeStudent.breakdown.savings.desc}
                </p>
              </div>
              <div className="text-right">
                <span className="text-xl font-black text-[#0eb02c]">
                  {activeStudent.breakdown.savings.amount}
                </span>
                <span className="block text-[10px] font-mono text-[#0eb02c]/70">/month</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
