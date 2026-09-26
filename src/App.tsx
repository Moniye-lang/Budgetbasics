import React, { useState, useEffect } from 'react';
import { Navbar, PageRoute } from './components/Navbar';
import { TasteSkillHero } from './components/TasteSkillHero';
import { LearnBudgetingSection } from './components/LearnBudgetingSection';
import { PracticePlanningSection } from './components/PracticePlanningSection';
import { ExploreResourcesSection } from './components/ExploreResourcesSection';
import { GetHelpConnectSection } from './components/GetHelpConnectSection';
import { Footer } from './components/Footer';

// Currency & Utility Components
import { CurrencyProvider } from './context/CurrencyContext';
import { CurrencyConverterModal } from './components/CurrencyConverterModal';

// Dedicated Sub-Pages & Guides
import { LearnPage } from './pages/LearnPage';
import { PracticePage } from './pages/PracticePage';
import { ResourcesPage } from './pages/ResourcesPage';
import { ConnectPage } from './pages/ConnectPage';
import { ContactPage } from './pages/ContactPage';
import { AboutViewPage } from './pages/AboutViewPage';

// Sub-dropdown Individual Dedicated Pages
import { BudgetingBasicsPage } from './pages/BudgetingBasicsPage';
import { NeedsVsWantsPage } from './pages/NeedsVsWantsPage';
import { Rule503020Page } from './pages/Rule503020Page';
import { MoneyMistakesPage } from './pages/MoneyMistakesPage';
import { ExpensePlannerPage } from './pages/ExpensePlannerPage';
import { SavingsGoalsPage } from './pages/SavingsGoalsPage';
import { ExpenseTablePage } from './pages/ExpenseTablePage';
import { InfographicsPage } from './pages/InfographicsPage';
import { TemplatesPage } from './pages/TemplatesPage';
import { StudentDiscountsPage } from './pages/StudentDiscountsPage';
import { AiAssistantPage } from './pages/AiAssistantPage';

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageRoute>('home');
  const [isConverterOpen, setIsConverterOpen] = useState(false);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase();
      
      // Learn Module Pages
      if (hash === '#budgeting-basics' || hash === '#basics') {
        setCurrentPage('budgeting-basics');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '#needs-vs-wants' || hash === '#needs-wants' || hash === '#decision-engine') {
        setCurrentPage('needs-vs-wants');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '#rule-503020' || hash === '#50-30-20' || hash === '#503020' || hash === '#blueprint') {
        setCurrentPage('rule-503020');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '#money-mistakes' || hash === '#traps' || hash === '#mistakes') {
        setCurrentPage('money-mistakes');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '#learn-page' || hash === '#learn' || hash === '#learn-guide') {
        setCurrentPage('learn');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      
      // Practice Module Pages
      else if (hash === '#expense-planner' || hash === '#planner' || hash === '#sliders') {
        setCurrentPage('expense-planner');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '#savings-goals' || hash === '#goals' || hash === '#cushion') {
        setCurrentPage('savings-goals');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '#expense-table' || hash === '#table' || hash === '#tracker') {
        setCurrentPage('expense-table');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '#practice-page' || hash === '#practice') {
        setCurrentPage('practice');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      
      // Resources Module Pages
      else if (hash === '#infographics' || hash === '#vault' || hash === '#guides') {
        setCurrentPage('infographics');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '#templates' || hash === '#notion' || hash === '#sheets') {
        setCurrentPage('templates');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '#student-discounts' || hash === '#discounts' || hash === '#perks') {
        setCurrentPage('student-discounts');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '#resources-page' || hash === '#resources') {
        setCurrentPage('resources');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      
      // Connect & About Pages
      else if (hash === '#ai-assistant' || hash === '#assistant' || hash === '#bot' || hash === '#ai') {
        setCurrentPage('ai-assistant');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '#about' || hash === '#about-page' || hash === '#team') {
        setCurrentPage('about');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '#contact-page' || hash === '#contact' || hash === '#contact-us' || hash === '#contactus' || hash === '#clinic') {
        setCurrentPage('contact');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '#connect-page' || hash === '#connect') {
        setCurrentPage('connect');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      
      // Default / Home
      else if (hash === '#home' || hash === '') {
        setCurrentPage('home');
        window.scrollTo(0, 0);
      }
    };

    // Initial check and ensure page starts at the top
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (page: PageRoute, hashStr?: string) => {
    setCurrentPage(page);
    window.location.hash = hashStr || `#${page}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const backToHome = () => {
    setCurrentPage('home');
    window.location.hash = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSectionOnHome = (sectionId: string) => {
    if (currentPage !== 'home') {
      setCurrentPage('home');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const renderContent = () => {
    // 1. LEARN DROPDOWN PAGES
    if (currentPage === 'budgeting-basics') {
      return (
        <BudgetingBasicsPage 
          onBackToHome={backToHome} 
          onNavigateToPractice={() => navigateTo('expense-planner', '#expense-planner')} 
          onNavigateToNeedsVsWants={() => navigateTo('needs-vs-wants', '#needs-vs-wants')}
        />
      );
    }
    if (currentPage === 'needs-vs-wants') {
      return (
        <NeedsVsWantsPage 
          onBackToHome={backToHome} 
          onNavigateToPractice={() => navigateTo('expense-planner', '#expense-planner')} 
          onNavigateToBasics={() => navigateTo('budgeting-basics', '#budgeting-basics')}
        />
      );
    }
    if (currentPage === 'rule-503020') {
      return (
        <Rule503020Page 
          onBackToHome={backToHome} 
          onNavigateToPractice={() => navigateTo('expense-planner', '#expense-planner')} 
        />
      );
    }
    if (currentPage === 'money-mistakes') {
      return (
        <MoneyMistakesPage 
          onBackToHome={backToHome} 
          onNavigateToPractice={() => navigateTo('expense-planner', '#expense-planner')} 
        />
      );
    }
    if (currentPage === 'learn') {
      return <LearnPage onBackToHome={backToHome} />;
    }

    // 2. PRACTICE DROPDOWN PAGES
    if (currentPage === 'expense-planner') {
      return (
        <ExpensePlannerPage 
          onBackToHome={backToHome} 
          onNavigateToSavings={() => navigateTo('savings-goals', '#savings-goals')}
          onNavigateToTable={() => navigateTo('expense-table', '#expense-table')}
        />
      );
    }
    if (currentPage === 'savings-goals') {
      return (
        <SavingsGoalsPage 
          onBackToHome={backToHome} 
          onNavigateToPlanner={() => navigateTo('expense-planner', '#expense-planner')} 
        />
      );
    }
    if (currentPage === 'expense-table') {
      return (
        <ExpenseTablePage 
          onBackToHome={backToHome} 
          onNavigateToPlanner={() => navigateTo('expense-planner', '#expense-planner')} 
        />
      );
    }
    if (currentPage === 'practice') {
      return <PracticePage onBackToHome={backToHome} onOpenConverterModal={() => setIsConverterOpen(true)} />;
    }

    // 3. RESOURCES DROPDOWN PAGES
    if (currentPage === 'infographics') {
      return (
        <InfographicsPage 
          onBackToHome={backToHome} 
          onNavigateToTemplates={() => navigateTo('templates', '#templates')} 
        />
      );
    }
    if (currentPage === 'templates') {
      return (
        <TemplatesPage 
          onBackToHome={backToHome} 
          onNavigateToDiscounts={() => navigateTo('student-discounts', '#student-discounts')} 
        />
      );
    }
    if (currentPage === 'student-discounts') {
      return (
        <StudentDiscountsPage 
          onBackToHome={backToHome} 
          onNavigateToTemplates={() => navigateTo('templates', '#templates')} 
        />
      );
    }
    if (currentPage === 'resources') {
      return <ResourcesPage onBackToHome={backToHome} />;
    }

    // 4. CONNECT & ABOUT DROPDOWN PAGES
    if (currentPage === 'ai-assistant') {
      return (
        <AiAssistantPage 
          onBackToHome={backToHome} 
          onNavigateToContact={() => navigateTo('contact', '#contact')} 
        />
      );
    }
    if (currentPage === 'about') {
      return <AboutViewPage onBackToHome={backToHome} onOpenConverterModal={() => setIsConverterOpen(true)} />;
    }
    if (currentPage === 'contact') {
      return <ContactPage onBackToHome={backToHome} onNavigateTo={navigateTo} />;
    }
    if (currentPage === 'connect') {
      return <ConnectPage onBackToHome={backToHome} />;
    }

    // 0. Default Landing Page (Home Overview)
    return (
      <div className="flex flex-col">
        {/* 1. Iconic Hero with 3D Slide Stream */}
        <TasteSkillHero
          onOpenDocs={() => scrollToSectionOnHome('learn')}
          onExploreProducts={() => scrollToSectionOnHome('practice')}
          onOpenLearnPage={() => navigateTo('learn')}
          onOpenPracticePage={() => navigateTo('practice')}
          onOpenResourcesPage={() => navigateTo('resources')}
          onOpenConnectPage={(tab) => navigateTo(tab === 'about' ? 'about' : 'connect', tab === 'about' ? '#about' : '#connect')}
          onOpenContactPage={() => navigateTo('contact', '#contact')}
          onOpenConverterModal={() => setIsConverterOpen(true)}
        />

        {/* 2. Main Budget Guide Architecture Overview */}
        <div>
          {/* 01 · Learn Budgeting: 50/30/20 Blueprint & Student Fundamentals */}
          <LearnBudgetingSection onOpenLearnPage={() => navigateTo('learn')} />

          {/* 02 · Practice Planning: Interactive Simulator & Cash Flow Diagnostics */}
          <PracticePlanningSection />

          {/* 03 · Explore Resources: Free Notion Templates, Guides & Discount Vault */}
          <ExploreResourcesSection />

          {/* 04 · Get Help / Connect: Peer Advisor Form, Clinic Hours & Community */}
          <GetHelpConnectSection />
        </div>
      </div>
    );
  };

  return (
    <CurrencyProvider>
      <div className="min-h-screen bg-[#f0f0f0] text-[#1a1919] flex flex-col font-sans selection:bg-[#0922b0]/20 selection:text-[#0922b0]">
        {/* Global Consistent Header / Navigation Bar across all pages */}
        <Navbar
          currentPage={currentPage}
          onNavigateTo={navigateTo}
          onOpenConverterModal={() => setIsConverterOpen(true)}
        />

        {/* Page Content View */}
        <main className="flex-1">
          {renderContent()}
        </main>

        {/* Global Footer across all pages */}
        <Footer
          onNavigateTo={navigateTo}
          onOpenConverterModal={() => setIsConverterOpen(true)}
        />

        {/* Currency Converter Modal */}
        <CurrencyConverterModal
          isOpen={isConverterOpen}
          onClose={() => setIsConverterOpen(false)}
        />
      </div>
    </CurrencyProvider>
  );
};

export default App;
