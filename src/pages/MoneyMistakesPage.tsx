import React, { useState } from 'react';
import { 
  ShieldAlert, 
  AlertTriangle, 
  Coffee, 
  Truck, 
  CreditCard, 
  BookX, 
  Repeat, 
  Calculator, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles
} from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';

interface MoneyMistakesPageProps {
  onBackToHome?: () => void;
  onNavigateToPractice?: () => void;
}

export const MoneyMistakesPage: React.FC<MoneyMistakesPageProps> = ({
  onNavigateToPractice
}) => {
  const { formatAmount } = useCurrency();

  // Leakage calculator state
  const [deliveryCount, setDeliveryCount] = useState<number>(3); // per week
  const [coffeeCount, setCoffeeCount] = useState<number>(4); // per week
  const [zombieSubs, setZombieSubs] = useState<number>(3); // count of subs
  const [bnplOrders, setBnplOrders] = useState<number>(1); // active monthly bnpl

  // Calculations
  const deliveryMonthly = deliveryCount * 12 * 4.33; // avg $12 extra in fees/tips
  const coffeeMonthly = coffeeCount * 5.5 * 4.33; // avg $5.50 per latte/boba
  const subsMonthly = zombieSubs * 11; // avg $11 per streaming/app
  const bnplMonthly = bnplOrders * 45; // avg $45/mo installment

  const totalMonthlyWaste = deliveryMonthly + coffeeMonthly + subsMonthly + bnplMonthly;
  const totalAnnualWaste = totalMonthlyWaste * 12;

  const mistakesList = [
    {
      id: 'delivery',
      icon: <Truck className="w-6 h-6 text-[#d12828]" />,
      title: "Food Delivery & Hidden Service Surge",
      subtitle: "The $14 burrito that bills out at $34 after fees, surge & tip",
      impact: "Avg. student drain: $180 - $350 / month",
      description: "Delivery apps add menu markups (15-25%), service fees, delivery charges, and tip. Ordering 3 times a week drains over $2,000 across a 9-month academic year.",
      fix: "Batch meal prep on Sundays, keep emergency frozen dumplings/pasta, and order pickup directly if dining out."
    },
    {
      id: 'subs',
      icon: <Repeat className="w-6 h-6 text-[#d12828]" />,
      title: "Zombie Subscriptions & Free Trial Traps",
      subtitle: "Silent $9.99 monthly charges for forgotten apps and gyms",
      impact: "Avg. student drain: $45 - $90 / month",
      description: "Signing up for free trials during midterms and forgetting to cancel creates recurring micro-drains that hide on mobile store statements without notification.",
      fix: "Set an instant calendar alarm for 24h before trial expiration the moment you sign up, or use prepaid single-use virtual cards."
    },
    {
      id: 'bnpl',
      icon: <CreditCard className="w-6 h-6 text-[#d12828]" />,
      title: "Buy Now Pay Later (BNPL) Illusion",
      subtitle: "'Only 4 payments of $25' detaches your brain from true cost",
      impact: "Avg. student drain: $120 - $250 / month in future debt",
      description: "Klarna, Afterpay, and Affirm fragment purchases into painless bites, tricking students into committing future allowances they haven't earned yet.",
      fix: "Adopt the strict 24-Hour Rule: If you cannot pay 100% upfront in cash from your checking account today, you cannot afford it."
    },
    {
      id: 'textbooks',
      icon: <BookX className="w-6 h-6 text-[#d12828]" />,
      title: "Buying Brand-New Campus Textbooks",
      subtitle: "Paying $280 at the campus bookstore on Day 1",
      impact: "Avg. student drain: $400 - $800 / semester",
      description: "Publishers release minor edition tweaks to justify $250 price tags. Freshmen frequently purchase all books before their first syllabus lecture.",
      fix: "Never buy books before Week 1. Ask the professor if older editions work, check university library reserves, or rent digital copies on LibGen/Chegg."
    },
    {
      id: 'coffee',
      icon: <Coffee className="w-6 h-6 text-[#d12828]" />,
      title: "The Stealth Daily $6 Beverage Habit",
      subtitle: "Specialty iced matcha & cold brews adding up to rent money",
      impact: "Avg. student drain: $120 - $180 / month",
      description: "A single $6 iced drink each weekday feels insignificant, but aggregates to $1,440 over a school year — equal to 2 months of dormitory rent.",
      fix: "Invest $25 in a French press or cold brew pitcher for your dorm, and treat specialty cafe drinks as a weekend social reward."
    },
    {
      id: 'overdraft',
      icon: <AlertTriangle className="w-6 h-6 text-[#d12828]" />,
      title: "Overdraft & ATM Out-of-Network Fees",
      subtitle: "A $35 bank fee triggered by a $4 vending machine charge",
      impact: "Avg. student drain: $35 - $105 / semester",
      description: "Banks default account holders into 'overdraft protection' which approves small charges at the cost of a $35 penalty fee per transaction.",
      fix: "Opt OUT of overdraft protection with your bank so transactions simply decline for free if funds are insufficient, and maintain a $50 checking buffer."
    }
  ];

  return (
    <div className="min-h-screen bg-[#f0f0f0] text-[#1a1919] font-sans antialiased pb-24 relative">
      
      {/* Sub-Header Breadcrumb */}
      <div className="border-b border-[#1a1919]/8 bg-white/70 backdrop-blur-md sticky top-[68px] z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono font-bold uppercase text-[#d12828] bg-[#d12828]/10 px-2.5 py-1 rounded-lg border border-[#d12828]/20">
              01 · Learn Module
            </span>
            <span className="text-xs text-[#1a1919]/60 font-medium">
              / Money Mistakes Radar & Traps
            </span>
          </div>
          <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#d12828] bg-white px-3 py-1.5 rounded-xl border border-[#1a1919]/10 shadow-xs">
            RADAR & DEFENSE
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-12">
        
        {/* 1. Hero Introduction */}
        <section className="bg-white rounded-3xl p-8 sm:p-10 border border-[#1a1919]/10 shadow-sm relative overflow-hidden">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#d12828]/10 border border-[#d12828]/20 text-xs font-mono font-bold text-[#d12828]">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>FINANCIAL DEFENSE RADAR</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-[#1a1919] leading-tight">
              Top 6 <span className="text-[#d12828]">Student Money Mistakes</span> to Avoid
            </h1>
            <p className="text-sm sm:text-base text-[#1a1919]/75 leading-relaxed font-medium">
              Most college students don’t go broke from major catastrophes — they go broke from dozens of stealth micro-leaks. Discover the 6 most dangerous student traps and how to bulletproof your checking account.
            </p>
          </div>
        </section>

        {/* 2. Interactive Stealth Leakage Calculator */}
        <section className="bg-white rounded-3xl p-8 sm:p-10 border border-[#1a1919]/10 shadow-sm space-y-8">
          <div className="flex items-center gap-3 border-b border-[#1a1919]/8 pb-5">
            <div className="p-2.5 rounded-2xl bg-[#d12828]/10 text-[#d12828]">
              <Calculator className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-[#1a1919]">Interactive Money Leakage Calculator</h2>
              <p className="text-xs text-[#1a1919]/60">Adjust your habits below to see how much money is quietly leaking from your budget.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Sliders Area */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Delivery Orders */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-bold">
                  <span className="flex items-center gap-2 text-[#1a1919]">
                    <Truck className="w-4 h-4 text-[#d12828]" />
                    Food Delivery Orders (per week)
                  </span>
                  <span className="font-mono text-[#d12828] bg-red-50 px-2.5 py-0.5 rounded-lg">
                    {deliveryCount} times / wk (~{formatAmount(deliveryMonthly)}/mo)
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="10"
                  value={deliveryCount}
                  onChange={(e) => setDeliveryCount(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#d12828]"
                />
              </div>

              {/* Cafe & Drinks */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-bold">
                  <span className="flex items-center gap-2 text-[#1a1919]">
                    <Coffee className="w-4 h-4 text-amber-600" />
                    Specialty Coffees / Boba (per week)
                  </span>
                  <span className="font-mono text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded-lg">
                    {coffeeCount} drinks / wk (~{formatAmount(coffeeMonthly)}/mo)
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="14"
                  value={coffeeCount}
                  onChange={(e) => setCoffeeCount(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
                />
              </div>

              {/* Subscriptions */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-bold">
                  <span className="flex items-center gap-2 text-[#1a1919]">
                    <Repeat className="w-4 h-4 text-[#0922b0]" />
                    Recurring Streaming & App Subscriptions
                  </span>
                  <span className="font-mono text-[#0922b0] bg-blue-50 px-2.5 py-0.5 rounded-lg">
                    {zombieSubs} active (~{formatAmount(subsMonthly)}/mo)
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="8"
                  value={zombieSubs}
                  onChange={(e) => setZombieSubs(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0922b0]"
                />
              </div>

              {/* BNPL Purchases */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-bold">
                  <span className="flex items-center gap-2 text-[#1a1919]">
                    <CreditCard className="w-4 h-4 text-purple-600" />
                    Active BNPL Pay-in-4 Installments
                  </span>
                  <span className="font-mono text-purple-600 bg-purple-50 px-2.5 py-0.5 rounded-lg">
                    {bnplOrders} orders (~{formatAmount(bnplMonthly)}/mo)
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="5"
                  value={bnplOrders}
                  onChange={(e) => setBnplOrders(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                />
              </div>
            </div>

            {/* Live Impact Card */}
            <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-3xl p-7 shadow-xl space-y-5">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <span className="text-xs font-mono uppercase tracking-wider text-white/60">Estimated Stealth Burn</span>
                <span className="text-xs font-bold px-2.5 py-0.5 bg-[#d12828] text-white rounded-md">Real Cost</span>
              </div>

              <div>
                <div className="text-[11px] font-mono text-white/60">Monthly Drain</div>
                <div className="text-3xl sm:text-4xl font-black text-[#d12828] mt-0.5">
                  {formatAmount(totalMonthlyWaste)}
                  <span className="text-xs font-normal text-white/60"> / mo</span>
                </div>
              </div>

              <div>
                <div className="text-[11px] font-mono text-white/60">Annual Academic Year Drain</div>
                <div className="text-2xl sm:text-3xl font-black text-amber-400 mt-0.5">
                  {formatAmount(totalAnnualWaste)}
                  <span className="text-xs font-normal text-white/60"> / yr</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs text-white/80 space-y-1">
                <div className="font-bold text-white flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  What this leak could fund instead:
                </div>
                <p className="text-[11px] text-white/70">
                  {totalAnnualWaste > 1500 
                    ? "✨ 1 full year emergency buffer + complete course textbooks + flight home."
                    : "✨ A solid $500 emergency buffer + new course laptop fund."}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 3. The 6 Traps Grid */}
        <section className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-3xl font-black text-[#1a1919]">The 6 Most Dangerous Traps</h2>
            <p className="text-xs text-[#1a1919]/70">Examine how these pitfalls operate and apply the verified tactical fixes.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mistakesList.map((item) => (
              <div 
                key={item.id} 
                className="bg-white rounded-3xl p-6 sm:p-7 border border-[#1a1919]/10 shadow-xs flex flex-col justify-between hover:border-[#d12828]/40 transition-all group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center group-hover:scale-105 transition-transform">
                      {item.icon}
                    </div>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-red-100/60 text-[#d12828]">
                      HIGH RISK
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-black text-[#1a1919]">{item.title}</h3>
                    <p className="text-xs font-semibold text-[#d12828] mt-0.5">{item.subtitle}</p>
                  </div>

                  <p className="text-xs text-[#1a1919]/70 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="p-2.5 rounded-xl bg-slate-50 border border-[#1a1919]/5 text-[11px] font-mono font-bold text-[#1a1919]/80">
                    {item.impact}
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-[#1a1919]/8 space-y-1">
                  <div className="text-[11px] font-bold text-[#0eb02c] flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                    Tactical Fix:
                  </div>
                  <p className="text-[11px] text-[#1a1919]/75 leading-tight">
                    {item.fix}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. The 24-Hour Rule Decision Shield */}
        <section className="bg-white rounded-3xl p-8 sm:p-10 border border-[#1a1919]/10 shadow-sm space-y-6">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0eb02c]/10 text-[#0eb02c] font-mono font-bold text-xs">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>THE 24-HOUR PAUSE PROTOCOL</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#1a1919]">
              How to instantly stop impulse purchases
            </h2>
            <p className="text-xs sm:text-sm text-[#1a1919]/70 leading-relaxed">
              When browsing online or walking past campus retail, dopamine peaks before the purchase. Implement this 4-step mental filter before tapping your card:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            <div className="p-5 rounded-2xl bg-slate-50 border border-[#1a1919]/8 space-y-2">
              <span className="text-xs font-mono font-bold text-[#0922b0]">STEP 01</span>
              <h4 className="text-sm font-bold text-[#1a1919]">Cart Freeze</h4>
              <p className="text-xs text-[#1a1919]/70">Add the item to your digital cart or wishlist, then immediately close the app.</p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-[#1a1919]/8 space-y-2">
              <span className="text-xs font-mono font-bold text-[#0922b0]">STEP 02</span>
              <h4 className="text-sm font-bold text-[#1a1919]">Calculate Work Hours</h4>
              <p className="text-xs text-[#1a1919]/70">Divide item cost by your hourly wage. Is a $60 sweater worth 4 hours of shifts?</p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-[#1a1919]/8 space-y-2">
              <span className="text-xs font-mono font-bold text-[#0922b0]">STEP 03</span>
              <h4 className="text-sm font-bold text-[#1a1919]">Wait 24 Hours</h4>
              <p className="text-xs text-[#1a1919]/70">Sleep on it. In over 70% of trials, the impulse excitement evaporates by morning.</p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-[#1a1919]/8 space-y-2">
              <span className="text-xs font-mono font-bold text-[#0eb02c]">STEP 04</span>
              <h4 className="text-sm font-bold text-[#1a1919]">Guilt-Free Buy</h4>
              <p className="text-xs text-[#1a1919]/70">If it’s still essential and within your 30% Wants budget after 24h, buy it guilt-free!</p>
            </div>
          </div>
        </section>

        {/* 5. CTA to Practice & Plan */}
        <section className="bg-[#d12828] rounded-3xl p-8 sm:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 max-w-xl text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-black">Ready to lock in your student budget?</h3>
            <p className="text-xs sm:text-sm text-white/90">
              Put defensive budgeting into action with our interactive expense planner and savings goal tracker.
            </p>
          </div>
          <button
            onClick={() => {
              if (onNavigateToPractice) onNavigateToPractice();
              else {
                window.location.hash = '#expense-planner';
              }
            }}
            className="px-6 py-3.5 bg-white text-[#d12828] hover:bg-slate-100 text-xs font-bold rounded-xl shadow-lg flex items-center gap-2 cursor-pointer transition-all shrink-0 active:scale-95"
          >
            <span>Launch Expense Planner</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </section>

      </main>
    </div>
  );
};
