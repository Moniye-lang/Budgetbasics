import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  Download, 
  FileText, 
  Check, 
  Eye, 
  X, 
  Percent, 
  Sparkles,
  TrendingUp,
  ShieldCheck,
  ArrowRight,
  Flame,
  CheckCircle2,
  ExternalLink,
  Utensils,
  Laptop,
  Music,
  GraduationCap,
  Zap,
  Layers
} from 'lucide-react';

interface PerkItem {
  id: string;
  name: string;
  category: 'software' | 'campus' | 'lifestyle';
  discount: string;
  originalPrice: string;
  icon: React.ElementType;
  description: string;
  link: string;
  badge: string;
}

export const ExploreResourcesSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'notion' | 'sheets' | 'pdf'>('notion');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activePerkCategory, setActivePerkCategory] = useState<'all' | 'software' | 'campus' | 'lifestyle'>('all');
  const [mealsCooked, setMealsCooked] = useState<number>(6);
  const [activeDrawer, setActiveDrawer] = useState<'notion' | 'perks' | 'mealprep' | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Mouse tracking spotlight effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.20 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const handleCopyAction = (id: string, textToCopy: string) => {
    navigator.clipboard?.writeText(textToCopy);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  // Perks Dataset
  const perks: PerkItem[] = [
    {
      id: 'spotify-hulu',
      name: 'Spotify Premium + Hulu + Showtime',
      category: 'lifestyle',
      discount: '$5.99 / mo',
      originalPrice: '$21.99 / mo',
      icon: Music,
      description: 'Full student bundle with ad-free music and entertainment streaming.',
      link: 'https://spotify.com/student',
      badge: 'POPULAR'
    },
    {
      id: 'github-pack',
      name: 'GitHub Student Developer Pack',
      category: 'software',
      discount: '100% Free',
      originalPrice: '$200k in value',
      icon: Laptop,
      description: 'Free Copilot, Canva Pro, JetBrains IDEs, and $100 DigitalOcean credits.',
      link: 'https://education.github.com/pack',
      badge: 'VERIFIED'
    },
    {
      id: 'apple-edu',
      name: 'Apple Education Pricing + $150 Card',
      category: 'campus',
      discount: '10%–20% Off',
      originalPrice: 'Retail Price',
      icon: GraduationCap,
      description: 'Discounts on MacBook Air, iPad Pro + AppleCare student rate.',
      link: 'https://apple.com/education',
      badge: 'HARDWARE'
    },
    {
      id: 'adobe-cc',
      name: 'Adobe Creative Cloud All Apps',
      category: 'software',
      discount: '60% Off ($19.99/mo)',
      originalPrice: '$54.99 / mo',
      icon: Laptop,
      description: 'Photoshop, Illustrator, Premiere Pro, and Figma student tier.',
      link: 'https://adobe.com/students',
      badge: '60% OFF'
    }
  ];

  const filteredPerks = perks.filter(p => {
    const matchesCat = activePerkCategory === 'all' || p.category === activePerkCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  // Meal Prep Savings Math: Cafeteria is $14.00, Dorm batch meal is $3.50. Difference = $10.50 per meal.
  const monthlySavingsFood = Math.round(mealsCooked * 10.50 * 4.33);

  return (
    <section 
      ref={sectionRef}
      id="resources" 
      className="py-16 md:py-24 bg-[#f0f0f0] text-[#1a1919] relative overflow-hidden font-sans border-t border-[#1a1919]/10"
    >
      {/* Dynamic ambient background glows */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-[#0922b0]/6 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#0eb02c]/6 rounded-full blur-3xl pointer-events-none animate-pulse [animation-delay:2s]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ========================================================================= */}
        {/* 1. EDITORIAL HEADER */}
        {/* ========================================================================= */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            {/* Eyebrow Pill with Live Pulse Dot */}
            <div 
              className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0922b0]/10 border border-[#0922b0]/25 text-xs font-bold text-[#0922b0] shadow-xs mb-3 transition-all duration-700 ${
                isVisible ? 'animate-slide-in-left' : 'opacity-0'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-[#0922b0] animate-ping shrink-0" />
              <span>03 · EXPLORE RESOURCES & LEARNING GALLERY</span>
            </div>

            {/* Headline */}
            <h2 
              className={`text-3xl sm:text-5xl font-black tracking-tight text-[#1a1919] leading-[1.06] transition-all duration-700 ${
                isVisible ? 'animate-slide-in-left' : 'opacity-0'
              }`}
              style={{ animationDelay: '0.08s' }}
            >
              Curated Resource Vault. <br />
              <span className="text-[#0eb02c] font-serif italic font-normal text-3xl sm:text-5xl">
                Battle-tested student kits & research.
              </span>
            </h2>
          </div>

          <div 
            className={`text-xs font-mono text-[#1a1919]/70 bg-white/80 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-[#1a1919]/10 shadow-sm self-start md:self-auto flex items-center gap-2 transition-all duration-700 ${
              isVisible ? 'animate-slide-in-right' : 'opacity-0'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-[#0eb02c]" />
            <span><strong className="text-[#1a1919]">100% Free</strong> · No Paywalls or Subscriptions</span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SEARCH, SORT & FILTER CONTROL BAR */}
        {/* ========================================================================= */}
        <div className="bg-white/90 backdrop-blur-md rounded-2xl p-3 sm:p-4 border border-[#1a1919]/12 shadow-sm mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#1a1919]/60 mr-1 hidden sm:inline">
              Filter:
            </span>
            {[
              { id: 'all', label: 'All Artifacts' },
              { id: 'software', label: 'Tech & Dev Packs' },
              { id: 'campus', label: 'Campus Hardware' },
              { id: 'lifestyle', label: 'Streaming & Food' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActivePerkCategory(tab.id as any)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activePerkCategory === tab.id
                    ? 'bg-[#1a1919] text-white shadow-xs scale-102'
                    : 'bg-transparent text-[#1a1919]/70 hover:bg-[#f0f0f0] hover:text-[#1a1919]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-[#1a1919]/40 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Notion, Spotify, Adobe..."
              className="w-full pl-9 pr-4 py-1.5 text-xs rounded-xl bg-[#f0f0f0] border border-[#1a1919]/10 focus:outline-none focus:ring-2 focus:ring-[#0922b0]/20 focus:border-[#0922b0] text-[#1a1919]"
            />
          </div>
        </div>

        {/* Gallery Label */}
        <div className="flex items-center justify-between mb-4 px-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#0eb02c] animate-pulse" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#1a1919]/80">
              INFOGRAPHICS & LEARNING GALLERY
            </span>
          </div>
          <span className="text-xs font-mono text-[#1a1919]/60">3 Flagship Toolkits</span>
        </div>

        {/* ========================================================================= */}
        {/* 2. ASYMMETRICAL GLASSMORPHIC BENTO SPOTLIGHT */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* ----------------------------------------------------------------------- */}
          {/* PANEL 1 (LEFT 7 COLS): THE MASTER 50/30/20 NOTION & SHEETS SYSTEM */}
          {/* ----------------------------------------------------------------------- */}
          <div 
            onMouseMove={handleMouseMove}
            className="lg:col-span-7 bg-white/95 backdrop-blur-xl rounded-3xl p-7 sm:p-9 border border-[#1a1919]/15 shadow-xl hover:shadow-2xl hover:border-[#0922b0]/50 transition-all duration-300 relative overflow-hidden group flex flex-col justify-between"
            style={{
              background: 'radial-gradient(650px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(9, 34, 176, 0.08), transparent 80%), #ffffff'
            }}
          >
            {/* Top Accent Gradient */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#0922b0] via-[#0eb02c] to-[#0922b0]" />

            <div>
              {/* Header Badge & Downloads Count */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#0922b0]/10 text-[#0922b0] border border-[#0922b0]/20 flex items-center gap-1.5">
                    <Flame className="w-3 h-3 text-[#0922b0]" />
                    <span>FLAGSHIP TOOLKIT</span>
                  </span>
                  <span className="text-[10px] font-mono font-bold text-[#1a1919]/60 bg-[#1a1919]/5 px-2.5 py-1 rounded-full border border-[#1a1919]/10">
                    Version 3.4
                  </span>
                </div>

                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0eb02c]/10 text-[#0eb02c] border border-[#0eb02c]/20 text-xs font-bold font-mono">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>14,280+ Duplicated</span>
                </div>
              </div>

              {/* Title & Editorial Description */}
              <h3 className="text-2xl sm:text-3xl font-black text-[#1a1919] tracking-tight leading-tight mb-2">
                50/30/20 Student Operating System
              </h3>
              <p className="text-xs sm:text-sm text-[#1a1919]/80 font-medium leading-relaxed mb-6">
                A streamlined command center configured for semester living. Includes automated paycheck smoothing, financial aid distribution calculators, and zero complex math.
              </p>

              {/* Format Switcher Tabs */}
              <div className="flex items-center gap-2 p-1.5 bg-[#f0f0f0] rounded-2xl border border-[#1a1919]/10 mb-6 w-fit">
                <button
                  onClick={() => setActiveTab('notion')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'notion'
                      ? 'bg-white text-[#1a1919] shadow-xs'
                      : 'text-[#1a1919]/70 hover:text-[#1a1919]'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5 text-[#0922b0]" />
                  <span>Notion OS</span>
                </button>
                <button
                  onClick={() => setActiveTab('sheets')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'sheets'
                      ? 'bg-white text-[#1a1919] shadow-xs'
                      : 'text-[#1a1919]/70 hover:text-[#1a1919]'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5 text-[#0eb02c]" />
                  <span>Google Sheets</span>
                </button>
                <button
                  onClick={() => setActiveTab('pdf')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'pdf'
                      ? 'bg-white text-[#1a1919] shadow-xs'
                      : 'text-[#1a1919]/70 hover:text-[#1a1919]'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#d12828]" />
                  <span>Printable Blueprint</span>
                </button>
              </div>

              {/* Interactive Mockup Preview Box */}
              <div className="p-5 rounded-2xl bg-[#f0f0f0]/90 border border-[#1a1919]/10 space-y-3 mb-6 transition-all">
                <div className="flex items-center justify-between text-xs font-mono font-bold uppercase tracking-wider text-[#1a1919]/70">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#0eb02c]" />
                    <span>Included Architecture Modules:</span>
                  </span>
                  <span className="text-[10px] text-[#0922b0]">Interactive Preview</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                  <div className="p-3 rounded-xl bg-white border border-[#1a1919]/10 shadow-2xs hover:border-[#1a1919]/30 transition-all">
                    <div className="text-[10px] font-mono text-[#1a1919]/60 font-bold uppercase">50% Needs</div>
                    <div className="text-sm font-black text-[#1a1919] mt-0.5">Rent & Dining</div>
                    <div className="text-[10px] text-[#0eb02c] font-medium mt-1 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Auto-splits
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-white border border-[#1a1919]/10 shadow-2xs hover:border-[#d12828]/30 transition-all">
                    <div className="text-[10px] font-mono text-[#d12828] font-bold uppercase">30% Fun</div>
                    <div className="text-sm font-black text-[#d12828] mt-0.5">Discretionary</div>
                    <div className="text-[10px] text-[#d12828] font-medium mt-1 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Live $/day
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-white border border-[#1a1919]/10 shadow-2xs hover:border-[#0eb02c]/30 transition-all">
                    <div className="text-[10px] font-mono text-[#0eb02c] font-bold uppercase">20% Growth</div>
                    <div className="text-sm font-black text-[#0eb02c] mt-0.5">$500 Cushion</div>
                    <div className="text-[10px] text-[#0eb02c] font-medium mt-1 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Goal tracker
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-[#1a1919]/10">
              <button
                onClick={() => handleCopyAction('notion-main', 'https://budgetbasics.app/templates/student-notion-503020')}
                className="flex-1 py-3 px-5 rounded-2xl bg-[#0922b0] hover:bg-[#071a8a] text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-[#0922b0]/20 hover:shadow-xl transition-all cursor-pointer active:scale-95 group"
              >
                {copiedId === 'notion-main' ? (
                  <>
                    <Check className="w-4 h-4 text-[#0eb02c]" />
                    <span>Template Link Copied!</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
                    <span>Duplicate Free Template ({activeTab.toUpperCase()})</span>
                  </>
                )}
              </button>

              <button
                onClick={() => setActiveDrawer('notion')}
                className="py-3 px-4 rounded-2xl bg-white hover:bg-[#f0f0f0] text-[#1a1919] border border-[#1a1919]/20 text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer active:scale-95"
              >
                <Eye className="w-4 h-4 text-[#0922b0]" />
                <span>Deep-Dive Preview</span>
              </button>
            </div>

          </div>

          {/* ----------------------------------------------------------------------- */}
          {/* PANEL 2 (TOP RIGHT 5 COLS): VERIFIED STUDENT PERK VAULT ($1,200/YR) */}
          {/* ----------------------------------------------------------------------- */}
          <div 
            onMouseMove={handleMouseMove}
            className="lg:col-span-5 bg-white/95 backdrop-blur-xl rounded-3xl p-7 sm:p-8 border border-[#1a1919]/15 shadow-xl hover:shadow-2xl hover:border-[#0eb02c]/50 transition-all duration-300 relative overflow-hidden group flex flex-col justify-between"
            style={{
              background: 'radial-gradient(500px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(14, 176, 44, 0.08), transparent 80%), #ffffff'
            }}
          >
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#0eb02c]" />

            <div>
              {/* Header */}
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#0eb02c]/10 text-[#0eb02c] border border-[#0eb02c]/20 flex items-center gap-1">
                  <Zap className="w-3 h-3" />
                  <span>PERK DIRECTORY</span>
                </span>
                <span className="text-[11px] font-mono font-bold text-[#0eb02c] bg-[#0eb02c]/10 px-2.5 py-0.5 rounded-md">
                  $1,200+ / yr in Savings
                </span>
              </div>

              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-2xl bg-[#0eb02c]/10 flex items-center justify-center shrink-0">
                  <Percent className="w-5 h-5 text-[#0eb02c]" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#1a1919] tracking-tight leading-snug">
                    Verified .edu Discount Vault
                  </h3>
                  <p className="text-[11px] font-mono text-[#1a1919]/60">40+ Active Verified Student Rates</p>
                </div>
              </div>

              <p className="text-xs text-[#1a1919]/80 font-medium leading-relaxed mb-4">
                Stop paying retail price. Instant access to verified student pricing for software, hardware, transit passes, and grocery co-ops.
              </p>

              {/* Perk Cards Stack */}
              <div className="space-y-2 mb-6">
                {filteredPerks.map((perk) => {
                  const Icon = perk.icon;
                  return (
                    <div 
                      key={perk.id}
                      className="p-2.5 rounded-xl bg-[#f0f0f0]/80 border border-[#1a1919]/10 flex items-center justify-between gap-3 hover:bg-white hover:shadow-xs transition-all"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-7 h-7 rounded-lg bg-white flex items-center justify-center shrink-0 border border-[#1a1919]/10">
                          <Icon className="w-3.5 h-3.5 text-[#1a1919]" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs font-bold text-[#1a1919] truncate">{perk.name}</div>
                          <div className="text-[10px] text-[#1a1919]/60 truncate">{perk.description}</div>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <div className="text-xs font-black text-[#0eb02c] font-mono">{perk.discount}</div>
                        <div className="text-[9px] text-[#1a1919]/40 line-through">{perk.originalPrice}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center gap-2 pt-3 border-t border-[#1a1919]/10">
              <button
                onClick={() => setActiveDrawer('perks')}
                className="w-full py-2.5 px-4 rounded-xl bg-[#1a1919] hover:bg-[#333] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm cursor-pointer active:scale-95 transition-all"
              >
                <span>Browse Full 40+ Discount Vault</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

          {/* ----------------------------------------------------------------------- */}
          {/* PANEL 3 (BOTTOM 12 COLS): MEAL PREP & DECISION TOOLS */}
          {/* ----------------------------------------------------------------------- */}
          <div 
            onMouseMove={handleMouseMove}
            className="lg:col-span-12 bg-white/95 backdrop-blur-xl rounded-3xl p-7 sm:p-8 border border-[#1a1919]/15 shadow-xl hover:shadow-2xl hover:border-[#d12828]/40 transition-all duration-300 relative overflow-hidden group"
            style={{
              background: 'radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(209, 40, 40, 0.06), transparent 80%), #ffffff'
            }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Side: Interactive Dorm Meal Prep Calculator */}
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#d12828]/10 text-[#d12828] border border-[#d12828]/20 flex items-center gap-1.5">
                    <Utensils className="w-3 h-3 text-[#d12828]" />
                    <span>VARIABLE EXPENSE HACK</span>
                  </span>
                  <span className="text-xs font-mono text-[#1a1919]/60">Dorm Batch Cooking Calculator</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-[#1a1919] tracking-tight">
                  Cafeteria Dining ($14.00) vs. Dorm Prep ($3.50)
                </h3>
                <p className="text-xs text-[#1a1919]/80 font-medium leading-relaxed">
                  Food is the single largest variable drain on student cash. Adjust the slider to see how cooking just a few meals a week creates instant emergency cushion.
                </p>

                {/* Slider Component */}
                <div className="p-4 rounded-2xl bg-[#f0f0f0] border border-[#1a1919]/10 space-y-3">
                  <div className="flex justify-between items-center text-xs font-bold text-[#1a1919]">
                    <span>Meals Prepared in Dorm / Week:</span>
                    <span className="font-mono text-sm text-[#d12828] bg-white px-3 py-0.5 rounded-lg border border-[#1a1919]/10">
                      {mealsCooked} meals / week
                    </span>
                  </div>

                  <input 
                    type="range" 
                    min="1" 
                    max="14" 
                    value={mealsCooked}
                    onChange={(e) => setMealsCooked(Number(e.target.value))}
                    className="w-full accent-[#d12828] cursor-pointer"
                  />

                  <div className="flex justify-between text-[10px] font-mono text-[#1a1919]/50">
                    <span>1 meal (light habit)</span>
                    <span>7 meals (1/day)</span>
                    <span>14 meals (full prep)</span>
                  </div>
                </div>
              </div>

              {/* Right Side: Live Savings Counter & Download */}
              <div className="lg:col-span-5 flex flex-col justify-center p-6 rounded-2xl bg-gradient-to-br from-[#d12828]/10 via-[#d12828]/5 to-transparent border border-[#d12828]/20 space-y-4">
                <div>
                  <div className="text-[10px] font-mono uppercase font-bold text-[#d12828] tracking-wider">
                    Calculated Monthly Discretionary Surge
                  </div>
                  <div className="text-4xl sm:text-5xl font-black text-[#d12828] tracking-tight mt-1">
                    +${monthlySavingsFood} <span className="text-sm font-mono font-normal text-[#1a1919]/60">/ month</span>
                  </div>
                  <div className="text-xs text-[#1a1919]/75 font-medium mt-1">
                    That is <strong className="text-[#0eb02c]">+${monthlySavingsFood * 4}</strong> back in your pocket over a 4-month semester.
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-[#d12828]/20">
                  <button
                    onClick={() => handleCopyAction('recipe-pdf', 'https://budgetbasics.app/guides/15-min-dorm-recipes.pdf')}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-[#d12828] hover:bg-[#b01e1e] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md cursor-pointer active:scale-95 transition-all"
                  >
                    {copiedId === 'recipe-pdf' ? (
                      <>
                        <Check className="w-4 h-4 text-white" />
                        <span>Recipe Guide Copied!</span>
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4" />
                        <span>Get 10 Cheap Dorm Recipes PDF</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => setActiveDrawer('mealprep')}
                    className="p-2.5 rounded-xl bg-white hover:bg-[#f0f0f0] text-[#1a1919] border border-[#1a1919]/10 cursor-pointer"
                    title="View Breakdown"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>

      {/* ========================================================================= */}
      {/* 3. SLIDE-OVER DEEP DIVE DRAWER */}
      {/* ========================================================================= */}
      {activeDrawer && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs animate-in fade-in duration-300">
          <div className="w-full max-w-xl bg-white h-full shadow-2xl border-l border-[#1a1919]/15 p-6 sm:p-9 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-300">
            <div>
              {/* Drawer Top */}
              <div className="flex items-center justify-between pb-4 border-b border-[#1a1919]/10 mb-6">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-3 py-0.5 rounded-full bg-[#0922b0]/10 text-[#0922b0] border border-[#0922b0]/20">
                  DEEP-DIVE DOCUMENTATION
                </span>

                <button
                  onClick={() => setActiveDrawer(null)}
                  className="p-2 rounded-full bg-[#f0f0f0] hover:bg-[#e4e4e4] text-[#1a1919] transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {activeDrawer === 'notion' && (
                <div className="space-y-4">
                  <h3 className="text-2xl font-black text-[#1a1919] tracking-tight">
                    50/30/20 Notion & Sheets System Architecture
                  </h3>
                  <p className="text-xs sm:text-sm text-[#1a1919]/80 leading-relaxed">
                    Designed for students who dislike traditional expense tracking. This dashboard splits your monthly cashflow into 3 visible buckets automatically.
                  </p>

                  <div className="p-4 rounded-2xl bg-[#f0f0f0] border border-[#1a1919]/10 space-y-2">
                    <div className="text-xs font-bold text-[#1a1919]">Key Technical Features:</div>
                    <div className="text-xs text-[#1a1919]/80 flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#0eb02c]" />
                      <span>One-click duplication for both Notion & Google Sheets</span>
                    </div>
                    <div className="text-xs text-[#1a1919]/80 flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#0eb02c]" />
                      <span>Semester Aid Lump-Sum Amortizer (Distributes refund checks across 16 weeks)</span>
                    </div>
                    <div className="text-xs text-[#1a1919]/80 flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#0eb02c]" />
                      <span>Bi-weekly shift wage aggregator for campus workers</span>
                    </div>
                  </div>
                </div>
              )}

              {activeDrawer === 'perks' && (
                <div className="space-y-4">
                  <h3 className="text-2xl font-black text-[#1a1919] tracking-tight">
                    Complete 40+ Student Perks Directory
                  </h3>
                  <p className="text-xs sm:text-sm text-[#1a1919]/80 leading-relaxed">
                    All verified discounts requiring only an active student email (.edu) or university ID card.
                  </p>

                  <div className="space-y-2">
                    {perks.map(p => (
                      <div key={p.id} className="p-3 rounded-xl bg-[#f0f0f0] border border-[#1a1919]/10 flex items-center justify-between">
                        <div>
                          <div className="text-xs font-bold text-[#1a1919]">{p.name}</div>
                          <div className="text-[10px] text-[#1a1919]/60">{p.description}</div>
                        </div>
                        <a 
                          href={p.link} 
                          target="_blank" 
                          rel="noreferrer"
                          className="px-3 py-1 rounded-lg bg-white text-xs font-bold text-[#0922b0] border border-[#1a1919]/10 hover:bg-[#0922b0] hover:text-white transition-all flex items-center gap-1"
                        >
                          <span>Claim</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeDrawer === 'mealprep' && (
                <div className="space-y-4">
                  <h3 className="text-2xl font-black text-[#1a1919] tracking-tight">
                    The 15-Minute Dorm Meal Prep Framework
                  </h3>
                  <p className="text-xs sm:text-sm text-[#1a1919]/80 leading-relaxed">
                    Campus dining hall meals cost an average of $13.50–$15.00 per entry. By preparing high-protein batch ingredients on Sundays (rice bowls, sheet-pan fajitas, overnight oats), each meal averages $3.50.
                  </p>

                  <div className="p-4 rounded-2xl bg-[#0eb02c]/10 border border-[#0eb02c]/20 space-y-2">
                    <div className="text-xs font-bold text-[#0eb02c]">Semester Cash Impact:</div>
                    <div className="text-xs text-[#1a1919]/80">
                      Preparing 6 meals per week = <strong>$1,080 saved</strong> per semester, enough to fully fund your $500 emergency buffer and eliminate textbook debt.
                    </div>
                  </div>
                </div>
              )}

            </div>

            {/* Bottom Drawer Action */}
            <div className="pt-6 border-t border-[#1a1919]/10 space-y-2">
              <button
                onClick={() => {
                  handleCopyAction('drawer-copy', 'https://budgetbasics.app/resources/student-suite');
                  setTimeout(() => setActiveDrawer(null), 1200);
                }}
                className="w-full py-3 rounded-2xl bg-[#0922b0] hover:bg-[#071a8a] text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-lg cursor-pointer active:scale-95 transition-all"
              >
                <Download className="w-4 h-4" />
                <span>Download / Copy Artifacts</span>
              </button>

              <button
                onClick={() => setActiveDrawer(null)}
                className="w-full py-2 rounded-xl text-xs font-bold text-[#1a1919]/60 hover:text-[#1a1919] transition-colors cursor-pointer"
              >
                Close Panel
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
