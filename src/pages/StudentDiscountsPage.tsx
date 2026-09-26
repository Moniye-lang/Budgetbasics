import React, { useState } from 'react';
import { 
  ExternalLink, 
  CheckCircle2, 
  Search, 
  Gift
} from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';

interface DiscountItem {
  id: string;
  name: string;
  category: 'Software' | 'Productivity' | 'Streaming' | 'Hardware';
  value: string;
  annualSavings: number; // in USD
  badge: string;
  verificationReq: string;
  description: string;
  link: string;
}

interface StudentDiscountsPageProps {
  onBackToHome?: () => void;
  onNavigateToTemplates?: () => void;
}

export const StudentDiscountsPage: React.FC<StudentDiscountsPageProps> = () => {
  const { formatAmount } = useCurrency();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [claimedIds, setClaimedIds] = useState<string[]>([]);

  const discountsList: DiscountItem[] = [
    {
      id: 'github',
      name: 'GitHub Student Developer Pack',
      category: 'Software',
      value: 'Free $200k+ Suite',
      annualSavings: 1200,
      badge: '100% Free',
      verificationReq: 'Valid .edu email or campus student ID',
      description: 'Free GitHub Copilot, Canva Pro, Namecheap domains, DigitalOcean $200 credits, and 80+ elite developer tools.',
      link: 'https://education.github.com/pack'
    },
    {
      id: 'notion',
      name: 'Notion Plus for Students & Educators',
      category: 'Productivity',
      value: 'Free ($120/yr value)',
      annualSavings: 120,
      badge: '100% Free',
      verificationReq: '.edu email verification',
      description: 'Unlimited file uploads, 30-day page history, and unlimited collaborative workspace blocks for coursework.',
      link: 'https://www.notion.so/students'
    },
    {
      id: 'figma',
      name: 'Figma Professional Education Plan',
      category: 'Productivity',
      value: 'Free ($144/yr value)',
      annualSavings: 144,
      badge: '100% Free',
      verificationReq: 'Proof of enrollment / student status',
      description: 'Full team libraries, unlimited version history, and unlimited Figma design + FigJam whiteboard projects.',
      link: 'https://www.figma.com/education'
    },
    {
      id: 'spotify',
      name: 'Spotify Premium + Hulu Student Bundle',
      category: 'Streaming',
      value: '$5.99/mo (Save 50%)',
      annualSavings: 144,
      badge: '50% Off',
      verificationReq: 'SheerID campus verification',
      description: 'Full ad-free Spotify Premium music combined with Hulu streaming for half the regular price of a single subscription.',
      link: 'https://www.spotify.com/us/student/'
    },
    {
      id: 'apple',
      name: 'Apple Education Store & Back to School',
      category: 'Hardware',
      value: '$100-$150 Gift Card + 10% Off',
      annualSavings: 250,
      badge: 'Hardware Deal',
      verificationReq: 'UNiDAYS student status',
      description: 'Discounted MacBooks and iPads with AppleCare+ student discounts and seasonal gift card promotions.',
      link: 'https://www.apple.com/us-edu/shop'
    },
    {
      id: 'jetbrains',
      name: 'JetBrains All Products Student Pack',
      category: 'Software',
      value: 'Free ($289/yr value)',
      annualSavings: 289,
      badge: '100% Free',
      verificationReq: '.edu email or ISIC card',
      description: 'Professional IDE licenses for IntelliJ IDEA, WebStorm, PyCharm, CLion, and DataGrip updated every year.',
      link: 'https://www.jetbrains.com/community/education/#students'
    },
    {
      id: 'amazon',
      name: 'Amazon Prime Student',
      category: 'Streaming',
      value: '6 Months Free Trial + 50% Off',
      annualSavings: 80,
      badge: '6 Mo Free',
      verificationReq: '.edu email verification',
      description: 'Free 2-day delivery on course supplies, Prime Video streaming, Grubhub+ food delivery perks, and exclusive textbook discounts.',
      link: 'https://www.amazon.com/joinstudent'
    },
    {
      id: 'transit',
      name: 'Campus Regional Transit Subsidy Pass',
      category: 'Hardware',
      value: '30% - 50% Transit Discount',
      annualSavings: 360,
      badge: '30-50% Off',
      verificationReq: 'Campus Student Affairs or ID Office',
      description: 'Most city metro and municipal bus networks provide half-fare passes when purchased via campus transit desks.',
      link: '#'
    }
  ];

  const toggleClaim = (id: string) => {
    setClaimedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const filtered = discountsList.filter(item => {
    const matchesCat = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const totalPossibleAnnualSavings = discountsList.reduce((acc, curr) => acc + curr.annualSavings, 0);
  const userClaimedAnnualSavings = claimedIds.reduce((acc, id) => {
    const item = discountsList.find(d => d.id === id);
    return acc + (item ? item.annualSavings : 0);
  }, 0);

  return (
    <div className="min-h-screen bg-[#f0f0f0] text-[#1a1919] font-sans antialiased pb-24 relative selection:bg-[#0eb02c]/20 selection:text-[#0eb02c]">
      
      {/* Sub-Header Breadcrumb */}
      <div className="border-b border-[#1a1919]/8 bg-white/70 backdrop-blur-md sticky top-[68px] z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono font-bold uppercase text-[#0eb02c] bg-[#0eb02c]/10 px-2.5 py-1 rounded-lg border border-[#0eb02c]/20 flex items-center gap-1.5">
              03 · Explore Resources
            </span>
            <span className="text-xs text-[#1a1919]/60 font-medium">
              / Verified Student Discounts & Tech Perks Guide
            </span>
          </div>
          <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#0eb02c] bg-white px-3 py-1.5 rounded-xl border border-[#1a1919]/10 shadow-xs">
            PERKS CATALOG
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-12">
        
        {/* 1. Hero Introduction */}
        <section className="bg-white rounded-3xl p-8 sm:p-10 border border-[#1a1919]/10 shadow-sm relative overflow-hidden">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0eb02c]/10 border border-[#0eb02c]/20 text-xs font-mono font-bold text-[#0eb02c]">
              <Gift className="w-3.5 h-3.5" />
              <span>VERIFIED .EDU SAVINGS</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-[#1a1919] leading-tight">
              Verified Student <span className="text-[#0eb02c]">Discounts & Perks</span>
            </h1>
            <p className="text-sm sm:text-base text-[#1a1919]/75 leading-relaxed font-medium">
              Your student ID and .edu email unlock thousands of dollars in free software, cloud services, and entertainment bundles. Never pay full retail price while enrolled.
            </p>
          </div>
        </section>

        {/* 2. Live Savings Tracker Banner */}
        <section className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-3xl p-7 sm:p-8 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <div className="text-xs font-mono uppercase text-emerald-400 font-bold">Interactive Perk Claim Tracker</div>
            <h2 className="text-2xl sm:text-3xl font-black">
              {claimedIds.length} of {discountsList.length} Perks Claimed
            </h2>
            <p className="text-xs text-white/70">
              Check off the perks you currently use to calculate your annual savings.
            </p>
          </div>

          <div className="flex items-center gap-6 bg-white/5 border border-white/10 p-4 rounded-2xl">
            <div>
              <div className="text-[10px] font-mono text-white/60">Your Annual Savings</div>
              <div className="text-2xl sm:text-3xl font-black text-emerald-400">
                {formatAmount(userClaimedAnnualSavings)}
              </div>
            </div>
            <div className="border-l border-white/10 pl-6">
              <div className="text-[10px] font-mono text-white/60">Max Potential Savings</div>
              <div className="text-2xl sm:text-3xl font-black text-white">
                {formatAmount(totalPossibleAnnualSavings)}
              </div>
            </div>
          </div>
        </section>

        {/* 3. Filter & Search Controls */}
        <section className="bg-white rounded-2xl p-4 sm:p-5 border border-[#1a1919]/10 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Category Filter */}
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            {['All', 'Software', 'Productivity', 'Streaming', 'Hardware'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-[#0eb02c] text-white shadow-xs'
                    : 'bg-slate-100 text-[#1a1919]/70 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-[#1a1919]/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search discounts & deals..."
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-[#1a1919]/10 text-xs font-medium text-[#1a1919] bg-slate-50 focus:bg-white focus:outline-none focus:border-[#0eb02c] transition-colors"
            />
          </div>

        </section>

        {/* 4. Discounts Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => {
            const isClaimed = claimedIds.includes(item.id);

            return (
              <div
                key={item.id}
                className={`bg-white rounded-3xl p-6 sm:p-7 border transition-all flex flex-col justify-between group shadow-xs ${
                  isClaimed ? 'border-[#0eb02c] ring-2 ring-[#0eb02c]/20' : 'border-[#1a1919]/10 hover:border-[#0eb02c]/40'
                }`}
              >
                <div className="space-y-4">
                  
                  {/* Badge & Claim Checkbox */}
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-lg bg-emerald-100 text-[#0eb02c]">
                      {item.badge}
                    </span>
                    
                    <button
                      onClick={() => toggleClaim(item.id)}
                      className={`text-xs font-bold px-3 py-1 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer ${
                        isClaimed
                          ? 'bg-[#0eb02c] text-white shadow-xs'
                          : 'bg-slate-100 text-[#1a1919]/60 hover:bg-slate-200'
                      }`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{isClaimed ? 'Claimed' : 'Mark Used'}</span>
                    </button>
                  </div>

                  {/* Title & Value */}
                  <div>
                    <h3 className="text-lg font-black text-[#1a1919] group-hover:text-[#0eb02c] transition-colors">
                      {item.name}
                    </h3>
                    <div className="text-xs font-mono font-bold text-[#0eb02c] mt-0.5">
                      {item.value} (~{formatAmount(item.annualSavings)}/yr value)
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-[#1a1919]/70 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Verification Note */}
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-[#1a1919]/5 text-[11px] text-[#1a1919]/75 space-y-0.5">
                    <span className="font-bold text-[#1a1919] block">Verification required:</span>
                    <span>{item.verificationReq}</span>
                  </div>

                </div>

                {/* Claim Button */}
                <div className="pt-6 mt-6 border-t border-[#1a1919]/8">
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 rounded-xl text-xs font-bold bg-[#0922b0] hover:bg-[#071a8a] text-white flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs active:scale-95"
                  >
                    <span>Claim via Official Portal</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </section>

      </main>
    </div>
  );
};
