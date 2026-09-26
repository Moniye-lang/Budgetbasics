import React, { useState } from 'react';
import { 
  FileSpreadsheet, 
  Check, 
  ExternalLink, 
  Star, 
  Search, 
  ArrowRight
} from 'lucide-react';

interface TemplateItem {
  id: string;
  title: string;
  platform: 'Notion' | 'Google Sheets' | 'Excel & PDF';
  version: string;
  downloads: string;
  rating: number;
  description: string;
  highlights: string[];
  templateUrl: string;
}

interface TemplatesPageProps {
  onBackToHome?: () => void;
  onNavigateToDiscounts?: () => void;
}

export const TemplatesPage: React.FC<TemplatesPageProps> = ({
  onNavigateToDiscounts
}) => {
  const [activePlatform, setActivePlatform] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const templatesList: TemplateItem[] = [
    {
      id: 'notion-semester',
      title: 'Semester Cash Flow 3.0 Workspace',
      platform: 'Notion',
      version: 'Notion 3.0',
      downloads: '24.1k',
      rating: 4.9,
      description: 'The definitive all-in-one Notion workspace: monthly allowance track, dorm utilities split, daily fun limits, and textbook fund tracker.',
      highlights: ['Automated 50/30/20 balance formulas', 'Roommate split database', 'Exam week grocery budget lock'],
      templateUrl: 'https://notion.so'
    },
    {
      id: 'sheets-503020',
      title: '50/30/20 Automated Google Sheet',
      platform: 'Google Sheets',
      version: 'Google Sheets & Excel',
      downloads: '38.4k',
      rating: 5.0,
      description: 'Pre-formatted formulas and dynamic conditional formatting charts that allocate any allowance into Needs, Wants, and Savings upon entry.',
      highlights: ['Auto-updating pie & bar charts', 'Zero math required — enter allowance', 'Currency switcher formula'],
      templateUrl: 'https://docs.google.com/spreadsheets'
    },
    {
      id: 'notion-roommate',
      title: 'Roommate Bill & Utility Splitter',
      platform: 'Notion',
      version: 'Notion Template',
      downloads: '16.7k',
      rating: 4.8,
      description: 'Never argue over WiFi, electricity, or bulk toilet paper again. Centralized roommate expense board with transparent payment statuses.',
      highlights: ['Individual balances per roommate', 'Receipt photo attachment fields', 'Venmo/Zelle reminder helper'],
      templateUrl: 'https://notion.so'
    },
    {
      id: 'sheets-mealprep',
      title: 'Student Meal Prep & Grocery Ledger',
      platform: 'Google Sheets',
      version: 'Google Sheets',
      downloads: '19.3k',
      rating: 4.9,
      description: 'Weekly campus grocery list with automatic unit price calculations to ensure grocery bills stay under $35/week.',
      highlights: ['Price-per-serving calculator', '15 built-in dormitory staple recipes', 'Aisle-by-aisle shopping sheet'],
      templateUrl: 'https://docs.google.com/spreadsheets'
    },
    {
      id: 'notion-cushion',
      title: '$500 Emergency Cushion Tracker',
      platform: 'Notion',
      version: 'Notion Template',
      downloads: '11.8k',
      rating: 4.7,
      description: 'Visual progress rings and milestone celebration badges for hitting your first $100, $300, and $500 safety buffers.',
      highlights: ['Gamified milestone rewards', 'Automatic date projection', 'Debt paydown timeline view'],
      templateUrl: 'https://notion.so'
    },
    {
      id: 'pdf-printable',
      title: 'Printable Dorm Desk Budget Planner',
      platform: 'Excel & PDF',
      version: 'High-Res PDF',
      downloads: '14.2k',
      rating: 4.8,
      description: 'A clean, minimalist physical printable weekly tracker for students who prefer pen and paper budgeting beside their study desk.',
      highlights: ['30-day daily fill-in columns', 'Weekly 50/30/20 audit checklist', 'Impulse spend 24h cooling box'],
      templateUrl: '#'
    }
  ];

  const filtered = templatesList.filter(item => {
    const matchesPlatform = activePlatform === 'All' || item.platform === activePlatform;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesPlatform && matchesSearch;
  });

  const handleDuplicate = (id: string, title: string) => {
    setCopiedId(id);
    // Mock opening/duplicating template
    const text = `🎓 BudgetBasics Template: ${title}\nPlatform: ${id}\nLink: https://budgetbasics.edu/templates/${id}\n\nPaste into your workspace to duplicate!`;
    navigator.clipboard.writeText(text);

    setTimeout(() => setCopiedId(null), 2500);
  };

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
              / Notion & Google Sheets Templates
            </span>
          </div>
          <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#0eb02c] bg-white px-3 py-1.5 rounded-xl border border-[#1a1919]/10 shadow-xs">
            READY TEMPLATES
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-12">
        
        {/* 1. Hero Introduction */}
        <section className="bg-white rounded-3xl p-8 sm:p-10 border border-[#1a1919]/10 shadow-sm relative overflow-hidden">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0eb02c]/10 border border-[#0eb02c]/20 text-xs font-mono font-bold text-[#0eb02c]">
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>100% FREE DIGITAL WORKSPACES</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-[#1a1919] leading-tight">
              Notion & <span className="text-[#0eb02c]">Google Sheets</span> Templates
            </h1>
            <p className="text-sm sm:text-base text-[#1a1919]/75 leading-relaxed font-medium">
              Duplicate our battle-tested Notion dashboards and automated Google Sheets templates directly into your account with one click. Pre-programmed with formulas so you never do math by hand.
            </p>
          </div>
        </section>

        {/* 2. Filter & Search Controls */}
        <section className="bg-white rounded-2xl p-4 sm:p-5 border border-[#1a1919]/10 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Platform Filter */}
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            {['All', 'Notion', 'Google Sheets', 'Excel & PDF'].map((plat) => (
              <button
                key={plat}
                onClick={() => setActivePlatform(plat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activePlatform === plat
                    ? 'bg-[#0eb02c] text-white shadow-xs'
                    : 'bg-slate-100 text-[#1a1919]/70 hover:bg-slate-200'
                }`}
              >
                {plat}
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
              placeholder="Search templates & sheets..."
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-[#1a1919]/10 text-xs font-medium text-[#1a1919] bg-slate-50 focus:bg-white focus:outline-none focus:border-[#0eb02c] transition-colors"
            />
          </div>

        </section>

        {/* 3. Templates Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => {
            const isCopied = copiedId === item.id;

            return (
              <div
                key={item.id}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-[#1a1919]/10 shadow-xs hover:border-[#0eb02c]/40 transition-all flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  
                  {/* Platform Tag & Star Rating */}
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-lg bg-[#0eb02c]/10 text-[#0eb02c] border border-[#0eb02c]/20">
                      {item.version}
                    </span>
                    <div className="flex items-center gap-1 text-xs font-bold text-amber-500">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span>{item.rating}</span>
                      <span className="text-[10px] text-[#1a1919]/40 font-mono font-normal">({item.downloads})</span>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h3 className="text-lg font-black text-[#1a1919] group-hover:text-[#0eb02c] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#1a1919]/70 mt-1 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Highlights Checklist */}
                  <div className="space-y-1.5 pt-2">
                    <div className="text-[10px] font-mono uppercase text-[#1a1919]/50 font-bold">Key Inclusions</div>
                    {item.highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs font-medium text-[#1a1919]/80">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0eb02c]"></span>
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>

                </div>

                {/* Duplicate / Copy Button */}
                <div className="pt-6 mt-6 border-t border-[#1a1919]/8">
                  <button
                    onClick={() => handleDuplicate(item.id, item.title)}
                    className={`w-full py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs active:scale-95 ${
                      isCopied
                        ? 'bg-[#0922b0] text-white'
                        : 'bg-[#0eb02c] hover:bg-[#0c9626] text-white'
                    }`}
                  >
                    {isCopied ? <Check className="w-4 h-4" /> : <ExternalLink className="w-4 h-4" />}
                    <span>{isCopied ? 'Link Copied to Clipboard!' : `Duplicate ${item.platform} Template`}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </section>

        {/* 4. Cross Link to Student Discounts */}
        <section className="bg-[#0922b0] text-white rounded-3xl p-8 sm:p-10 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-black">Don't pay full price for software</h3>
            <p className="text-xs sm:text-sm text-white/80">
              Browse our verified guide of student discounts to get GitHub, Notion Plus, Spotify, and Figma 100% free with your .edu email.
            </p>
          </div>
          <button
            onClick={() => {
              if (onNavigateToDiscounts) onNavigateToDiscounts();
              else window.location.hash = '#student-discounts';
            }}
            className="px-6 py-3.5 bg-white text-[#0922b0] hover:bg-slate-100 text-xs font-bold rounded-xl shadow-lg flex items-center gap-2 cursor-pointer transition-all shrink-0 active:scale-95"
          >
            <span>View Student Discounts</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </section>

      </main>
    </div>
  );
};
