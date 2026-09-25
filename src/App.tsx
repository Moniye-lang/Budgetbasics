import React from 'react';
import { TasteSkillHero } from './components/TasteSkillHero';
import { LearnBudgetingSection } from './components/LearnBudgetingSection';
import { PracticePlanningSection } from './components/PracticePlanningSection';
import { ExploreResourcesSection } from './components/ExploreResourcesSection';
import { GetHelpConnectSection } from './components/GetHelpConnectSection';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const scrollToLearn = () => {
    const el = document.getElementById('learn');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToPractice = () => {
    const el = document.getElementById('practice');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#f0f0f0] text-[#1a1919] flex flex-col font-sans selection:bg-[#0922b0]/20 selection:text-[#0922b0]">
      {/* 1. Iconic Hero with 3D Slide Stream & Lottie Navbar */}
      <TasteSkillHero
        onOpenDocs={scrollToLearn}
        onExploreProducts={scrollToPractice}
      />

      {/* 2. Main Budget Guide Architecture */}
      <main className="flex-1">
        {/* 01 · Learn Budgeting: The 50/30/20 Blueprint & Student Fundamentals */}
        <LearnBudgetingSection />

        {/* 02 · Practice Planning: Interactive Simulator & Cash Flow Diagnostics */}
        <PracticePlanningSection />

        {/* 03 · Explore Resources: Free Notion Templates, Guides & Discount Vault */}
        <ExploreResourcesSection />

        {/* 04 · Get Help / Connect: Peer Advisor Form, Clinic Hours & FAQs */}
        <GetHelpConnectSection />
      </main>

      {/* 3. Footer */}
      <Footer />
    </div>
  );
};

export default App;
