import React, { useState } from 'react';
import { 
  Sparkles, 
  ShieldCheck, 
  Heart, 
  PiggyBank, 
  ArrowRight, 
  AlertTriangle
} from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';

interface Rule503020PageProps {
  onBackToHome?: () => void;
  onNavigateToPractice?: () => void;
}

export const Rule503020Page: React.FC<Rule503020PageProps> = ({
  onNavigateToPractice
}) => {
  const { formatAmount } = useCurrency();
  const [monthlyIncome, setMonthlyIncome] = useState<number>(1000);
  const [selectedScenario, setSelectedScenario] = useState<string>('standard');

  const needsAmount = monthlyIncome * 0.50;
  const wantsAmount = monthlyIncome * 0.30;
  const savingsAmount = monthlyIncome * 0.20;

  const scenarios = [
    { id: 'standard', name: 'Campus Student ($1,000/mo)', amount: 1000, desc: 'Typical campus dorm allowance + part-time job' },
    { id: 'intern', name: 'Summer Intern ($2,500/mo)', amount: 2500, desc: 'Tech or corporate paid internship stipend' },
    { id: 'frugal', name: 'Low Allowance ($500/mo)', amount: 500, desc: 'Tight budget focusing on essential groceries & transit' },
    { id: 'grad', name: 'New Graduate ($4,000/mo)', amount: 4000, desc: 'First full-time salary entry point' },
  ];

  return (
    <div className="min-h-screen bg-[#f0f0f0] text-[#1a1919] font-sans antialiased pb-24 relative">
      
      {/* Sub-Header Breadcrumb */}
      <div className="border-b border-[#1a1919]/8 bg-white/70 backdrop-blur-md sticky top-[68px] z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono font-bold uppercase text-[#0922b0] bg-[#0922b0]/10 px-2.5 py-1 rounded-lg border border-[#0922b0]/20">
              01 · Learn Module
            </span>
            <span className="text-xs text-[#1a1919]/60 font-medium">
              / 50/30/20 Rule Blueprint
            </span>
          </div>
          <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#0922b0] bg-white px-3 py-1.5 rounded-xl border border-[#1a1919]/10 shadow-xs">
            RATIO BLUEPRINT
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-12">
        
        {/* 1. Hero Introduction */}
        <section className="bg-white rounded-3xl p-8 sm:p-10 border border-[#1a1919]/10 shadow-sm relative overflow-hidden">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0922b0]/10 border border-[#0922b0]/20 text-xs font-mono font-bold text-[#0922b0]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>THE GOLD STANDARD FORMULA</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-[#1a1919] leading-tight">
              The <span className="text-[#0922b0]">50 / 30 / 20</span> Budgeting Rule
            </h1>
            <p className="text-sm sm:text-base text-[#1a1919]/75 leading-relaxed font-medium">
              Popularized by Senator Elizabeth Warren, this timeless formula divides your take-home allowance into three distinct, manageable buckets. It gives you permission to spend on fun without compromising your survival or long-term safety.
            </p>
          </div>
        </section>

        {/* 2. Interactive Quick Ratio Tester */}
        <section className="bg-white rounded-3xl p-8 border border-[#1a1919]/10 shadow-xs space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#1a1919]/8 pb-6">
            <div>
              <h2 className="text-2xl font-black text-[#1a1919]">Live 50/30/20 Calculator</h2>
              <p className="text-xs text-[#1a1919]/60 mt-1">Adjust your monthly allowance to see the instant distribution across the 3 buckets.</p>
            </div>
            
            {/* Quick Presets */}
            <div className="flex flex-wrap items-center gap-2">
              {scenarios.map((sc) => (
                <button
                  key={sc.id}
                  onClick={() => {
                    setSelectedScenario(sc.id);
                    setMonthlyIncome(sc.amount);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedScenario === sc.id
                      ? 'bg-[#0922b0] text-white shadow-xs'
                      : 'bg-slate-100 text-[#1a1919]/70 hover:bg-slate-200'
                  }`}
                >
                  {sc.name}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Slider & Income Input */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-mono font-bold uppercase text-[#1a1919]/70">Monthly Take-Home Allowance</label>
                  <span className="text-2xl font-black text-[#0922b0]">{formatAmount(monthlyIncome)}</span>
                </div>
                <input
                  type="range"
                  min="200"
                  max="5000"
                  step="50"
                  value={monthlyIncome}
                  onChange={(e) => {
                    setMonthlyIncome(Number(e.target.value));
                    setSelectedScenario('custom');
                  }}
                  className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0922b0]"
                />
                <div className="flex justify-between text-[10px] font-mono text-[#1a1919]/40 font-bold">
                  <span>{formatAmount(200)}</span>
                  <span>{formatAmount(2500)}</span>
                  <span>{formatAmount(5000)}</span>
                </div>
              </div>

              {/* Progress Distribution Bar */}
              <div className="space-y-2 pt-2">
                <div className="text-[11px] font-mono font-bold text-[#1a1919]/60 uppercase">Formula Breakdown Bar</div>
                <div className="h-5 w-full bg-slate-100 rounded-xl overflow-hidden flex shadow-inner">
                  <div style={{ width: '50%' }} className="bg-[#0922b0] h-full flex items-center justify-center text-[10px] font-bold text-white tracking-wider" title="50% Needs">50% NEEDS</div>
                  <div style={{ width: '30%' }} className="bg-[#0eb02c] h-full flex items-center justify-center text-[10px] font-bold text-white tracking-wider" title="30% Wants">30% WANTS</div>
                  <div style={{ width: '20%' }} className="bg-[#d12828] h-full flex items-center justify-center text-[10px] font-bold text-white tracking-wider" title="20% Savings">20% SAVINGS</div>
                </div>
              </div>
            </div>

            {/* Three Breakdown Cards */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Needs */}
              <div className="p-5 rounded-2xl bg-blue-50/60 border border-[#0922b0]/20 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded-lg bg-[#0922b0] text-white flex items-center justify-center font-bold text-xs">
                    50%
                  </div>
                  <ShieldCheck className="w-4 h-4 text-[#0922b0]" />
                </div>
                <div className="text-xs font-bold text-[#1a1919]/60">Needs & Survival</div>
                <div className="text-xl font-black text-[#0922b0]">{formatAmount(needsAmount)}</div>
                <p className="text-[11px] text-[#1a1919]/60 leading-tight">Rent, meal plan, commute & essential utilities.</p>
              </div>

              {/* Wants */}
              <div className="p-5 rounded-2xl bg-emerald-50/60 border border-[#0eb02c]/20 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded-lg bg-[#0eb02c] text-white flex items-center justify-center font-bold text-xs">
                    30%
                  </div>
                  <Heart className="w-4 h-4 text-[#0eb02c]" />
                </div>
                <div className="text-xs font-bold text-[#1a1919]/60">Wants & Lifestyle</div>
                <div className="text-xl font-black text-[#0eb02c]">{formatAmount(wantsAmount)}</div>
                <p className="text-[11px] text-[#1a1919]/60 leading-tight">Dining out, Netflix, campus gaming & hobbies.</p>
              </div>

              {/* Savings */}
              <div className="p-5 rounded-2xl bg-red-50/60 border border-[#d12828]/20 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded-lg bg-[#d12828] text-white flex items-center justify-center font-bold text-xs">
                    20%
                  </div>
                  <PiggyBank className="w-4 h-4 text-[#d12828]" />
                </div>
                <div className="text-xs font-bold text-[#1a1919]/60">Savings & Safety</div>
                <div className="text-xl font-black text-[#d12828]">{formatAmount(savingsAmount)}</div>
                <p className="text-[11px] text-[#1a1919]/60 leading-tight">First $500 cushion, debt reduction & investments.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Deep Dive into the 3 Categories */}
        <section className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-3xl font-black text-[#1a1919]">Unpacking Each Percentage</h2>
            <p className="text-xs text-[#1a1919]/70">What fits where? Understand the strict criteria for categorizing your student expenses.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 50% Needs Deep Dive */}
            <div className="bg-white rounded-3xl p-7 border border-[#1a1919]/10 shadow-xs space-y-4 hover:border-[#0922b0]/40 transition-all flex flex-col justify-between">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0922b0]/10 text-[#0922b0] font-mono font-bold text-xs">
                  <ShieldCheck className="w-4 h-4" />
                  <span>50% ESSENTIAL NEEDS</span>
                </div>
                <h3 className="text-xl font-bold text-[#1a1919]">Non-Negotiable Living</h3>
                <p className="text-xs text-[#1a1919]/70 leading-relaxed">
                  These are obligations that you cannot forfeit without severe consequences to your shelter, nutrition, or academic enrollment.
                </p>
                <div className="space-y-2 pt-2">
                  <div className="flex items-center gap-2 text-xs font-medium text-[#1a1919]/80">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0922b0]"></span>
                    <span>Dormitory rent or shared off-campus room</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-medium text-[#1a1919]/80">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0922b0]"></span>
                    <span>Basic groceries & clean water (not takeout)</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-medium text-[#1a1919]/80">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0922b0]"></span>
                    <span>Mandatory course textbooks & course software</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-medium text-[#1a1919]/80">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0922b0]"></span>
                    <span>Campus transit pass or fuel to lectures</span>
                  </div>
                </div>
              </div>
              <div className="p-3.5 rounded-2xl bg-blue-50 text-[11px] font-medium text-[#0922b0] border border-[#0922b0]/15 mt-4">
                💡 Rule of thumb: If you lost your job today, could you live without this for 30 days? If yes, it is not a Need.
              </div>
            </div>

            {/* 30% Wants Deep Dive */}
            <div className="bg-white rounded-3xl p-7 border border-[#1a1919]/10 shadow-xs space-y-4 hover:border-[#0eb02c]/40 transition-all flex flex-col justify-between">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0eb02c]/10 text-[#0eb02c] font-mono font-bold text-xs">
                  <Heart className="w-4 h-4" />
                  <span>30% DISCRETIONARY WANTS</span>
                </div>
                <h3 className="text-xl font-bold text-[#1a1919]">Joy & Campus Experience</h3>
                <p className="text-xs text-[#1a1919]/70 leading-relaxed">
                  The expenses that make college life enjoyable. You could cut them tomorrow without missing a class or getting evicted.
                </p>
                <div className="space-y-2 pt-2">
                  <div className="flex items-center gap-2 text-xs font-medium text-[#1a1919]/80">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0eb02c]"></span>
                    <span>Espresso runs, boba tea & midnight takeout</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-medium text-[#1a1919]/80">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0eb02c]"></span>
                    <span>Streaming (Spotify, Netflix, PlayStation Plus)</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-medium text-[#1a1919]/80">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0eb02c]"></span>
                    <span>Weekend cinema, road trips & party tickets</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-medium text-[#1a1919]/80">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0eb02c]"></span>
                    <span>Fashion sneakers & trend clothing</span>
                  </div>
                </div>
              </div>
              <div className="p-3.5 rounded-2xl bg-emerald-50 text-[11px] font-medium text-[#0eb02c] border border-[#0eb02c]/15 mt-4">
                💡 Guilt-free rule: As long as you stay within 30%, you can spend this money however you want without remorse.
              </div>
            </div>

            {/* 20% Savings Deep Dive */}
            <div className="bg-white rounded-3xl p-7 border border-[#1a1919]/10 shadow-xs space-y-4 hover:border-[#d12828]/40 transition-all flex flex-col justify-between">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#d12828]/10 text-[#d12828] font-mono font-bold text-xs">
                  <PiggyBank className="w-4 h-4" />
                  <span>20% FUTURE SECURITY</span>
                </div>
                <h3 className="text-xl font-bold text-[#1a1919]">Safety Cushion & Growth</h3>
                <p className="text-xs text-[#1a1919]/70 leading-relaxed">
                  Money set aside for unexpected emergency expenses and future independence so you never have to turn to high-interest predatory loans.
                </p>
                <div className="space-y-2 pt-2">
                  <div className="flex items-center gap-2 text-xs font-medium text-[#1a1919]/80">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#d12828]"></span>
                    <span>First $500 starter emergency cushion</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-medium text-[#1a1919]/80">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#d12828]"></span>
                    <span>Laptop repair / replacement fund</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-medium text-[#1a1919]/80">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#d12828]"></span>
                    <span>Post-graduation security deposit fund</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-medium text-[#1a1919]/80">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#d12828]"></span>
                    <span>Early micro-investing (Index funds / ETF)</span>
                  </div>
                </div>
              </div>
              <div className="p-3.5 rounded-2xl bg-red-50 text-[11px] font-medium text-[#d12828] border border-[#d12828]/15 mt-4">
                💡 Automatic transfer: Move this 20% on the day your allowance hits your account so you never risk spending it.
              </div>
            </div>
          </div>
        </section>

        {/* 4. What If Your Rent Exceeds 50%? (Student Reality Check) */}
        <section className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 shadow-xl space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-black">Student Reality: What if Needs exceed 50%?</h3>
              <p className="text-xs text-white/70 mt-0.5">High metropolitan rents or tuition bills frequently distort the standard 50% limit.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3">
              <h4 className="text-base font-bold text-amber-400">The 70 / 20 / 10 Student Variant</h4>
              <p className="text-xs text-white/80 leading-relaxed">
                If off-campus housing eats 65-70% of your allowance, adopt the temporary survival ratio:
              </p>
              <ul className="text-xs space-y-1.5 text-white/70 font-mono">
                <li>• 70% Essential Needs (Rent + Groceries)</li>
                <li>• 20% Wants (Controlled Social Outings)</li>
                <li>• 10% Mini-Buffer Savings (Never drop to 0%)</li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3">
              <h4 className="text-base font-bold text-emerald-400">How to rebalance back to 50/30/20</h4>
              <p className="text-xs text-white/80 leading-relaxed">
                Rebalancing doesn't require living on instant noodles forever. Target the largest fixed expense:
              </p>
              <ul className="text-xs space-y-1.5 text-white/70">
                <li>• Split off-campus utilities with roommates</li>
                <li>• Switch from university meal plan to weekly batch cooking</li>
                <li>• Monetize campus hours with 5-10h/week on-campus work</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 5. CTA to Practice Studio */}
        <section className="bg-[#0922b0] rounded-3xl p-8 sm:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 max-w-xl text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-black">Ready to customize your 50/30/20 budget?</h3>
            <p className="text-xs sm:text-sm text-white/80">
              Open our interactive practice studio to input your custom allowance, dial down expenses, and save your visual plan.
            </p>
          </div>
          <button
            onClick={() => {
              if (onNavigateToPractice) onNavigateToPractice();
              else {
                window.location.hash = '#expense-planner';
              }
            }}
            className="px-6 py-3.5 bg-[#0eb02c] hover:bg-[#0c9626] text-white text-xs font-bold rounded-xl shadow-lg flex items-center gap-2 cursor-pointer transition-all shrink-0 active:scale-95"
          >
            <span>Open Practice Studio</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </section>

      </main>
    </div>
  );
};
