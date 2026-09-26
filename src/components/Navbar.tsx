import React, { useState } from 'react';
import { 
  ChevronDown, 
  Menu, 
  X, 
  BookOpen, 
  CheckCircle2, 
  Sliders, 
  Search, 
  Bot, 
  Users, 
  Mail, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck,
  CreditCard,
  FileText
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { CurrencySelector } from './CurrencySelector';
import { DotLottiePlayer } from './DotLottiePlayer';

import { learnBooksLottieJson } from '../data/learnLottie';
import { practiceHandsLottieJson } from '../data/practiceLottie';
import { resourceToolsLottieJson } from '../data/resourceLottie';
import { contactEmailLottieJson } from '../data/contactLottie';

export type PageRoute = 
  | 'home' 
  | 'learn' 
  | 'practice' 
  | 'resources' 
  | 'connect' 
  | 'contact' 
  | 'about'
  | 'budgeting-basics'
  | 'needs-vs-wants'
  | 'rule-503020'
  | 'money-mistakes'
  | 'expense-planner'
  | 'savings-goals'
  | 'expense-table'
  | 'infographics'
  | 'templates'
  | 'student-discounts'
  | 'ai-assistant';

interface NavbarProps {
  currentPage?: PageRoute;
  onNavigateTo?: (page: PageRoute, hashStr?: string) => void;
  onOpenConverterModal?: () => void;
}

interface NavChild {
  label: string;
  desc?: string;
  icon: React.ReactNode;
  page: PageRoute;
  hash: string;
  badge?: string;
}

interface NavItem {
  label: string;
  page: PageRoute;
  icon: React.ReactNode;
  lottieData: object;
  lottieSrc: string;
  themeColor: string;
  children: NavChild[];
}

const navigation: NavItem[] = [
  {
    label: 'Learn Budgeting',
    page: 'learn',
    icon: <BookOpen className="w-4 h-4 text-[#0922b0]" />,
    lottieData: learnBooksLottieJson,
    lottieSrc: '/learn-books-lottie.json',
    themeColor: '#0922b0',
    children: [
      {
        label: 'Budgeting Basics',
        desc: 'Income, fixed expenses & student cash flow baselines',
        icon: <BookOpen className="w-4 h-4 text-[#0922b0]" />,
        page: 'budgeting-basics',
        hash: '#budgeting-basics',
      },
      {
        label: 'Needs vs Wants Engine',
        desc: 'Interactive 30-card swipe simulator & classification',
        icon: <CheckCircle2 className="w-4 h-4 text-[#0eb02c]" />,
        page: 'needs-vs-wants',
        hash: '#needs-vs-wants',
        badge: 'Interactive'
      },
      {
        label: '50 / 30 / 20 Rule Blueprint',
        desc: 'The foundational formula explained with visual ratios',
        icon: <Sparkles className="w-4 h-4 text-[#0922b0]" />,
        page: 'rule-503020',
        hash: '#rule-503020',
      },
      {
        label: 'Money Mistakes Radar',
        desc: 'Avoid delivery surges, hidden traps & compounding debt',
        icon: <ShieldCheck className="w-4 h-4 text-[#d12828]" />,
        page: 'money-mistakes',
        hash: '#money-mistakes',
      },
    ],
  },
  {
    label: 'Practice Planning',
    page: 'practice',
    icon: <Sliders className="w-4 h-4 text-[#0eb02c]" />,
    lottieData: practiceHandsLottieJson,
    lottieSrc: '/practice-hands-lottie.json',
    themeColor: '#0eb02c',
    children: [
      {
        label: '50/30/20 Studio & Sliders',
        desc: 'Input monthly allowance to compute needs/wants/savings',
        icon: <Sliders className="w-4 h-4 text-[#0eb02c]" />,
        page: 'expense-planner',
        hash: '#expense-planner',
      },
      {
        label: 'Savings Goals Studio',
        desc: 'Track $500 cushion velocity & milestones',
        icon: <Sparkles className="w-4 h-4 text-[#0eb02c]" />,
        page: 'savings-goals',
        hash: '#savings-goals',
        badge: 'Popular'
      },
      {
        label: 'Live Expense Planner Table',
        desc: 'Interactive session expense tracker with instant totals',
        icon: <CreditCard className="w-4 h-4 text-[#0922b0]" />,
        page: 'expense-table',
        hash: '#expense-table',
      },
    ],
  },
  {
    label: 'Explore Resources',
    page: 'resources',
    icon: <Search className="w-4 h-4 text-[#0922b0]" />,
    lottieData: resourceToolsLottieJson,
    lottieSrc: '/resource-tools-lottie.json',
    themeColor: '#0922b0',
    children: [
      {
        label: 'Infographics & Vault',
        desc: 'High-res downloadable guides and cheatsheets',
        icon: <FileText className="w-4 h-4 text-[#0922b0]" />,
        page: 'infographics',
        hash: '#infographics',
      },
      {
        label: 'Notion & Google Sheets',
        desc: 'Semester cash flow dashboards & automated spreadsheets',
        icon: <Search className="w-4 h-4 text-[#0eb02c]" />,
        page: 'templates',
        hash: '#templates',
      },
      {
        label: 'Student Discounts Guide',
        desc: 'Verified software, transit, and hardware savings for undergraduates',
        icon: <Sparkles className="w-4 h-4 text-[#0eb02c]" />,
        page: 'student-discounts',
        hash: '#student-discounts',
      },
    ],
  },
  {
    label: 'Connect & About',
    page: 'connect',
    icon: <Users className="w-4 h-4 text-[#0eb02c]" />,
    lottieData: contactEmailLottieJson,
    lottieSrc: '/contact-email-lottie.json',
    themeColor: '#0eb02c',
    children: [
      {
        label: 'AI Q&A Assistant',
        desc: 'Instant answers to student budgeting & allowance questions',
        icon: <Bot className="w-4 h-4 text-[#0922b0]" />,
        page: 'ai-assistant',
        hash: '#ai-assistant',
        badge: 'AI Powered'
      },
      {
        label: 'About Us (Aptech ADSE Team)',
        desc: 'The student creators, mission statement & animated 50/30/20',
        icon: <Users className="w-4 h-4 text-[#0eb02c]" />,
        page: 'about',
        hash: '#about',
      },
      {
        label: 'Contact & Peer Clinic',
        desc: 'Drop-in clinic hours, 1-on-1 advice & message form',
        icon: <Mail className="w-4 h-4 text-[#0922b0]" />,
        page: 'contact',
        hash: '#contact',
      },
    ],
  },
];

export const Navbar: React.FC<NavbarProps> = ({
  currentPage = 'home',
  onNavigateTo,
  onOpenConverterModal,
}) => {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [clinicHovered, setClinicHovered] = useState(false);

  const navigate = (page: PageRoute, hashStr?: string) => {
    if (onNavigateTo) {
      onNavigateTo(page, hashStr);
    } else {
      window.location.hash = hashStr || `${page}-page`;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setOpenMenu(null);
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#1a1919]/10 bg-white/95 backdrop-blur-xl shadow-xs transition-all font-sans">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* 1. BRAND LOGO */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('home', '')}
            className="group flex items-center gap-3 cursor-pointer text-left"
            title="BudgetBasics - Back to Home"
          >
            <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-white border border-[#1a1919]/10 shadow-xs p-1 transition-transform duration-200 group-hover:scale-105">
              <img 
                src="/logo.png" 
                alt="BudgetBasics Logo" 
                className="w-full h-full object-contain" 
              />
            </div>

            <div>
              <div className="text-base font-black tracking-tight text-[#1a1919] flex items-center leading-none">
                <span className="text-[#0922b0]">budget</span>
                <span className="text-[#0eb02c]">basics</span>
              </div>
              <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#1a1919]/50 mt-0.5">
                Visual Student Finance
              </div>
            </div>
          </button>
        </div>

        {/* 2. DESKTOP NAVIGATION ITEMS WITH ON-HOVER LOTTIE ANIMATIONS & RICH DROPDOWNS */}
        <nav className="hidden items-center gap-1.5 lg:flex">
          {navigation.map((item) => {
            const isMenuOpen = openMenu === item.label;
            const isHovered = hoveredLink === item.label || isMenuOpen;
            const isActive = 
              currentPage === item.page ||
              (item.label === 'Learn Budgeting' && (currentPage === 'budgeting-basics' || currentPage === 'needs-vs-wants' || currentPage === 'rule-503020' || currentPage === 'money-mistakes')) ||
              (item.label === 'Practice Planning' && (currentPage === 'expense-planner' || currentPage === 'savings-goals' || currentPage === 'expense-table')) ||
              (item.label === 'Explore Resources' && (currentPage === 'infographics' || currentPage === 'templates' || currentPage === 'student-discounts')) ||
              (item.label === 'Connect & About' && (currentPage === 'ai-assistant' || currentPage === 'about' || currentPage === 'contact'));

            return (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => {
                  setOpenMenu(item.label);
                  setHoveredLink(item.label);
                }}
                onMouseLeave={() => {
                  setOpenMenu(null);
                  setHoveredLink(null);
                }}
              >
                <button
                  onClick={() => navigate(item.page, item.children[0]?.hash)}
                  className={`
                    group relative flex items-center gap-2 rounded-xl px-3.5 py-2
                    text-[13px] font-bold tracking-tight
                    transition-all cursor-pointer
                    ${isActive
                      ? 'bg-[#0922b0]/10 text-[#0922b0] shadow-xs'
                      : 'text-[#1a1919]/75 hover:bg-slate-100/80 hover:text-[#1a1919]'
                    }
                  `}
                >
                  {/* Dynamic Icon with On-Hover Lottie Animation */}
                  <div className="relative w-5 h-5 flex items-center justify-center shrink-0 overflow-hidden">
                    {/* Default Static Icon */}
                    <div 
                      className={`transition-all duration-200 flex items-center justify-center ${
                        isHovered ? 'opacity-0 scale-50' : 'opacity-100 scale-100'
                      }`}
                    >
                      {item.icon}
                    </div>

                    {/* Active Lottie Animation on Hover */}
                    <div 
                      className={`absolute inset-0 flex items-center justify-center transition-all duration-200 pointer-events-none ${
                        isHovered ? 'opacity-100 scale-110' : 'opacity-0 scale-50'
                      }`}
                    >
                      <DotLottiePlayer
                        animationData={item.lottieData}
                        src={item.lottieSrc}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>

                  <span>{item.label}</span>

                  <ChevronDown
                    className={`
                      h-3.5 w-3.5 transition-transform duration-200 opacity-60
                      ${isMenuOpen ? 'rotate-180 opacity-100' : ''}
                    `}
                  />
                </button>

                {/* DROPDOWN FLYOUT CARD */}
                <AnimatePresence>
                  {isMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 6, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.98 }}
                      transition={{ duration: 0.16 }}
                      className="absolute left-1/2 top-full mt-1.5 w-[330px] -translate-x-1/2 rounded-2xl border border-[#1a1919]/10 bg-white p-2.5 shadow-2xl z-50 text-left"
                    >
                      {/* Top Accent Bar with LottieFiles Animation */}
                      <div className="mb-2 px-3 py-1.5 flex items-center justify-between border-b border-[#1a1919]/8 bg-slate-50/70 rounded-xl pb-1.5">
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 flex items-center justify-center shrink-0">
                            <DotLottiePlayer
                              animationData={item.lottieData}
                              src={item.lottieSrc}
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <span 
                            className="text-[11px] font-mono font-bold uppercase tracking-wider"
                            style={{ color: item.themeColor }}
                          >
                            {item.label}
                          </span>
                        </div>
                        <span className="text-[10px] font-mono text-[#1a1919]/40 font-semibold">
                          {item.children.length} Guides
                        </span>
                      </div>

                      {/* Dropdown Options */}
                      <div className="space-y-1">
                        {item.children.map((child) => (
                          <button
                            key={child.label}
                            onClick={() => navigate(child.page, child.hash)}
                            className="group flex w-full items-start gap-3 rounded-xl p-2.5 text-left transition-all hover:bg-slate-50 border border-transparent hover:border-[#1a1919]/8 cursor-pointer"
                          >
                            <div className="mt-0.5 p-1.5 rounded-lg bg-slate-100 group-hover:bg-white group-hover:shadow-xs transition-all shrink-0">
                              {child.icon}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-1.5">
                                <span className="text-xs font-bold text-[#1a1919] group-hover:text-[#0922b0] transition-colors">
                                  {child.label}
                                </span>
                                {child.badge && (
                                  <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-[#0eb02c]/10 text-[#0eb02c] border border-[#0eb02c]/20">
                                    {child.badge}
                                  </span>
                                )}
                              </div>
                              {child.desc && (
                                <p className="text-[11px] text-[#1a1919]/60 leading-tight mt-0.5 truncate">
                                  {child.desc}
                                </p>
                              )}
                            </div>
                            <ArrowRight className="w-3.5 h-3.5 text-[#1a1919]/30 group-hover:text-[#0922b0] group-hover:translate-x-0.5 transition-all self-center shrink-0" />
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </nav>

        {/* 3. RIGHT SIDE CONTROLS: CURRENCY SELECTOR, CTAS, MOBILE MENU */}
        <div className="flex items-center gap-3">
          {/* Currency Selector Pill */}
          <CurrencySelector onOpenConverterModal={onOpenConverterModal} variant="compact" />

          {/* Direct Contact Button with On-Hover Lottie Animation */}
          <button
            onClick={() => navigate('contact', 'contact-page')}
            onMouseEnter={() => setClinicHovered(true)}
            onMouseLeave={() => setClinicHovered(false)}
            className="hidden sm:inline-flex items-center gap-2 rounded-xl bg-[#0922b0] hover:bg-[#071a8a] px-4 py-2 text-xs font-bold text-white transition-all shadow-xs cursor-pointer active:scale-95 group"
          >
            <div className="relative w-4 h-4 flex items-center justify-center overflow-hidden shrink-0">
              <div className={`transition-all duration-200 ${clinicHovered ? 'opacity-0 scale-50' : 'opacity-100 scale-100'}`}>
                <Mail className="w-3.5 h-3.5" />
              </div>
              <div className={`absolute inset-0 flex items-center justify-center transition-all duration-200 pointer-events-none ${clinicHovered ? 'opacity-100 scale-125' : 'opacity-0 scale-50'}`}>
                <DotLottiePlayer
                  animationData={contactEmailLottieJson}
                  src="/contact-email-lottie.json"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
            <span>Peer Clinic</span>
          </button>

          {/* MOBILE HAMBURGER BUTTON */}
          <button
            onClick={() => setMobileOpen((prev) => !prev)}
            className="rounded-xl border border-[#1a1919]/10 bg-white p-2 text-[#1a1919] hover:bg-slate-50 transition-colors lg:hidden cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? (
              <X className="h-5 w-5 text-[#d12828]" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* 4. MOBILE DRAWER WITH COMPLETE NAVIGATION HIERARCHY */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-[#1a1919]/10 bg-white lg:hidden shadow-xl"
          >
            <div className="space-y-3 px-5 py-5 max-h-[80vh] overflow-y-auto">
              {navigation.map((item) => {
                const isOpen = openMenu === item.label;

                return (
                  <div key={item.label} className="border-b border-[#1a1919]/8 pb-2">
                    <button
                      onClick={() => setOpenMenu(isOpen ? null : item.label)}
                      className="flex w-full items-center justify-between py-2 text-left text-sm font-extrabold text-[#1a1919] cursor-pointer"
                    >
                      <span className="flex items-center gap-2">
                        <div className="w-5 h-5 flex items-center justify-center">
                          <DotLottiePlayer
                            animationData={item.lottieData}
                            src={item.lottieSrc}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <span>{item.label}</span>
                      </span>

                      <ChevronDown
                        className={`h-4 w-4 transition-transform text-[#1a1919]/50 ${
                          isOpen ? 'rotate-180 text-[#0922b0]' : ''
                        }`}
                      />
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden pl-3 space-y-1.5 pt-1 pb-2"
                        >
                          {item.children.map((child) => (
                            <button
                              key={child.label}
                              onClick={() => navigate(child.page, child.hash)}
                              className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-xs font-semibold text-[#1a1919]/80 hover:bg-[#0922b0]/10 hover:text-[#0922b0] transition-colors cursor-pointer"
                            >
                              <span>{child.label}</span>
                              <ArrowRight className="w-3.5 h-3.5 text-[#1a1919]/40" />
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}

              <div className="pt-2 space-y-2">
                <button
                  onClick={() => navigate('practice', 'practice-page')}
                  className="w-full rounded-xl bg-[#0eb02c] hover:bg-[#0c9626] py-3 text-xs font-bold text-white shadow-xs flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  <Sliders className="w-4 h-4" />
                  <span>Open Practice Studio</span>
                </button>
                <button
                  onClick={() => navigate('contact', 'contact-page')}
                  className="w-full rounded-xl bg-[#0922b0] hover:bg-[#071a8a] py-3 text-xs font-bold text-white shadow-xs flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  <Mail className="w-4 h-4" />
                  <span>Book Peer Clinic 1-on-1</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};