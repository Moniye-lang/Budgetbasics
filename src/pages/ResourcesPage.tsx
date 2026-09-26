import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Download, 
  FileText, 
  Sparkles, 
  Percent, 
  Laptop, 
  Music, 
  Check, 
  Copy
} from 'lucide-react';
import { DotLottiePlayer } from '../components/DotLottiePlayer';
import { resourceToolsLottieJson } from '../data/resourceLottie';

interface ResourcesPageProps {
  onBackToHome?: () => void;
}

interface ResourceItem {
  id: string;
  title: string;
  category: 'notion' | 'sheets' | 'pdf' | 'infographic';
  tag: string;
  downloads: string;
  description: string;
  link: string;
  rating: number;
}

const resourcesList: ResourceItem[] = [
  {
    id: 'notion-semester',
    title: 'Semester Cash Flow Dashboard',
    category: 'notion',
    tag: 'Notion 3.0',
    downloads: '14.2k',
    description: 'Track allowances, textbook budgets, roommate utility splits, and daily limits.',
    link: '#',
    rating: 4.9
  },
  {
    id: 'sheets-503020',
    title: '50/30/20 Automated Google Sheet',
    category: 'sheets',
    tag: 'Google Sheets',
    downloads: '18.9k',
    description: 'Pre-formatted formulas that distribute any allowance instantly across needs and wants.',
    link: '#',
    rating: 5.0
  },
  {
    id: 'info-anatomy',
    title: 'Cash Flow Anatomy Infographic',
    category: 'infographic',
    tag: 'Visual Chart',
    downloads: '9.4k',
    description: 'High-res visual breakdown of student inflows, fixed outlays, and buffer security.',
    link: '#',
    rating: 4.8
  },
  {
    id: 'pdf-mealprep',
    title: 'The $35 Weekly Student Meal Prep Guide',
    category: 'pdf',
    tag: 'PDF Guide',
    downloads: '22.1k',
    description: '15 easy campus recipes with full grocery store shopping lists and price guides.',
    link: '#',
    rating: 4.9
  },
  {
    id: 'notion-goals',
    title: 'Emergency Buffer & Goal Tracker',
    category: 'notion',
    tag: 'Notion Template',
    downloads: '8.7k',
    description: 'Visual progress rings for your first $500 cushion and study gadget funds.',
    link: '#',
    rating: 4.7
  },
  {
    id: 'info-pause',
    title: 'The 4-Step 24h Spend Pause Flowchart',
    category: 'infographic',
    tag: 'Decision Matrix',
    downloads: '11.3k',
    description: 'Printable flowchart to hang near your study desk to block impulse buying.',
    link: '#',
    rating: 4.9
  }
];

const perksList = [
  { id: 'github', name: 'GitHub Student Developer Pack', discount: 'Free $200k+ tools', icon: Laptop, category: 'Software', badge: '100% Free' },
  { id: 'spotify', name: 'Spotify + Hulu Student Bundle', discount: '$5.99/mo (Save 50%)', icon: Music, category: 'Entertainment', badge: '50% Off' },
  { id: 'notion-edu', name: 'Notion Plus for Students', discount: 'Free Unlimited Blocks', icon: FileText, category: 'Productivity', badge: '100% Free' },
  { id: 'figma', name: 'Figma Professional Plan', discount: 'Free Education Access', icon: Sparkles, category: 'Design', badge: '100% Free' }
];

export const ResourcesPage: React.FC<ResourcesPageProps> = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'notion' | 'sheets' | 'pdf' | 'infographic'>('all');
  const [sortBy, setSortBy] = useState<'popular' | 'rating' | 'title'>('popular');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredResources = resourcesList
    .filter((item) => {
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            item.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      return parseFloat(b.downloads) - parseFloat(a.downloads);
    });

  const handleCopyLink = (id: string) => {
    navigator.clipboard.writeText(`https://budgetbasics.org/vault/${id}`);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="min-h-screen bg-[#f0f0f0] text-[#1a1919] font-sans antialiased selection:bg-[#0922b0]/20 selection:text-[#0922b0] pb-24 relative">
      
      {/* In-Page Sub-Header */}
      <div className="border-b border-[#1a1919]/8 bg-white/60 backdrop-blur-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono font-bold uppercase text-[#0922b0] bg-[#0922b0]/10 px-2.5 py-1 rounded-lg">
              03 · Resource Vault
            </span>
            <span className="hidden sm:inline text-xs text-[#1a1919]/60 font-medium">
              / Infographics, Calculators & Notion Templates
            </span>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#0922b0] bg-white px-3 py-1.5 rounded-xl border border-[#1a1919]/10 shadow-xs">
            VAULT: {filteredResources.length} ITEMS
          </div>
        </div>
      </div>

      {/* 2. Hero Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-8">
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#1a1919]/10 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
          <div className="space-y-3 max-w-2xl relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0922b0]/10 border border-[#0922b0]/20 text-xs font-mono font-bold text-[#0922b0]">
              <span className="w-2 h-2 rounded-full bg-[#0922b0] animate-pulse" />
              <span>03 · RESOURCE VAULT & INFOGRAPHICS</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#1a1919]">
              Free Templates, Guides & <span className="text-[#0922b0]">Infographics</span>
            </h1>
            <p className="text-sm sm:text-base text-[#1a1919]/75 font-normal leading-relaxed">
              Download battle-tested student budgeting systems, visual decision trees, and meal-prep frameworks without subscription paywalls.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-[#0922b0]/10 border border-[#0922b0]/20 flex items-center justify-center p-3 shrink-0">
              <DotLottiePlayer
                animationData={resourceToolsLottieJson}
                src="/resource-tools-lottie.json"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="hidden sm:block px-4 py-3 rounded-2xl bg-[#0922b0]/10 border border-[#0922b0]/20 text-center">
              <span className="text-2xl font-black font-mono text-[#0922b0] block">100%</span>
              <span className="text-[10px] font-mono font-bold text-[#0922b0] uppercase">Free & Open</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Search, Sort & Filter Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="bg-white rounded-3xl p-4 sm:p-6 border border-[#1a1919]/10 shadow-sm space-y-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            
            {/* Search input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#1a1919]/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search templates, cheat sheets, meal prep, Notion..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-[#f0f0f0] border border-transparent focus:border-[#0922b0] text-xs sm:text-sm font-medium focus:outline-none transition-all"
              />
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-[#1a1919]/60 shrink-0">Sort By:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-2.5 rounded-2xl bg-[#f0f0f0] border border-transparent text-xs font-semibold focus:outline-none cursor-pointer"
              >
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated</option>
                <option value="title">Alphabetical</option>
              </select>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-[#1a1919]/10">
            {[
              { id: 'all', label: 'All Resources' },
              { id: 'notion', label: 'Notion Templates' },
              { id: 'sheets', label: 'Google Sheets' },
              { id: 'infographic', label: 'Infographics' },
              { id: 'pdf', label: 'PDF Guides' }
            ].map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id as any)}
                  className={`relative px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer select-none ${
                    isActive
                      ? 'text-white shadow-xs'
                      : 'text-[#1a1919]/70 hover:text-[#1a1919] hover:bg-slate-200/80 active:scale-95'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="resourceActiveCatPill"
                      className="absolute inset-0 bg-[#0922b0] rounded-xl shadow-xs z-0"
                      transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1.5">
                    <span>{cat.label}</span>
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                    )}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Infographics & Learning Gallery Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {filteredResources.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-[#1a1919]/10 shadow-sm space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-[#0922b0]/10 text-[#0922b0] flex items-center justify-center mx-auto">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-[#1a1919]">No resources matched your search</h3>
            <p className="text-xs text-[#1a1919]/70 max-w-sm mx-auto">
              Try adjusting your keywords or reset your category filters to browse all available guides and dashboards.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="px-5 py-2.5 rounded-xl bg-[#0922b0] text-white text-xs font-bold hover:bg-[#071a8a] transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-3xl p-6 border border-[#1a1919]/10 shadow-sm hover:border-[#0922b0]/30 hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-[#0922b0]/10 text-[#0922b0] uppercase">
                      {item.tag}
                    </span>
                    <span className="text-xs font-mono font-bold text-[#1a1919]/60">
                      ★ {item.rating} ({item.downloads})
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#1a1919] group-hover:text-[#0922b0] transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs text-[#1a1919]/70 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[#1a1919]/10 flex items-center justify-between gap-3">
                  <button
                    onClick={() => handleCopyLink(item.id)}
                    className="p-2 rounded-xl bg-[#f0f0f0] hover:bg-slate-200 text-[#1a1919]/70 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                    title="Copy direct link"
                  >
                    {copiedId === item.id ? <Check className="w-3.5 h-3.5 text-[#0eb02c]" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedId === item.id ? 'Copied' : 'Share'}</span>
                  </button>

                  <a
                    href={item.link}
                    className="px-4 py-2 rounded-xl bg-[#0922b0] hover:bg-[#071a8a] text-white text-xs font-semibold flex items-center gap-2 transition-colors shadow-xs"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Free</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Student Perks Section */}
        <div className="bg-white rounded-3xl p-8 border border-[#1a1919]/10 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#1a1919]/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#0eb02c]/10 text-[#0eb02c] flex items-center justify-center font-bold">
                <Percent className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#1a1919]">Verified Student Discounts Vault</h3>
                <p className="text-xs text-[#1a1919]/60 font-mono">Unlock over $200k in educational software perks</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {perksList.map((perk) => (
              <div
                key={perk.id}
                className="p-4 rounded-2xl bg-[#f0f0f0]/60 border border-[#1a1919]/5 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <perk.icon className="w-5 h-5 text-[#0922b0]" />
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#0eb02c]/10 text-[#0eb02c]">
                    {perk.badge}
                  </span>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#1a1919]">{perk.name}</h4>
                  <p className="text-xs text-[#1a1919]/70 mt-0.5">{perk.discount}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};
