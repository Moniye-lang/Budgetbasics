import React from 'react';
import { Sparkles } from 'lucide-react';
import AboutPage from '../AboutPage';

interface AboutViewPageProps {
  onBackToHome?: () => void;
  onOpenConverterModal?: () => void;
}

export const AboutViewPage: React.FC<AboutViewPageProps> = () => {
  return (
    <div className="min-h-screen bg-[#f0f0f0] text-[#1a1919] font-sans antialiased selection:bg-[#0922b0]/20 selection:text-[#0922b0] relative">
      {/* Ambient background glows matching homepage */}
      <div className="fixed top-1/4 -left-40 w-96 h-96 bg-[#0eb02c]/5 rounded-full blur-3xl pointer-events-none z-0" />
      <div className="fixed bottom-10 -right-40 w-96 h-96 bg-[#0922b0]/5 rounded-full blur-3xl pointer-events-none z-0" />

      {/* In-Page Sub-Header */}
      <div className="border-b border-[#1a1919]/8 bg-white/60 backdrop-blur-xs relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono font-bold uppercase text-[#0eb02c] bg-[#0eb02c]/10 px-2.5 py-1 rounded-lg">
              05 · About Us
            </span>
            <span className="hidden sm:inline text-xs text-[#1a1919]/60 font-medium">
              / Mission, Aptech ADSE Team & Interactive 50/30/20 Showcase
            </span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0eb02c]/10 text-[#0eb02c] border border-[#0eb02c]/20 text-[11px] font-mono font-bold">
            <Sparkles className="w-3 h-3 text-[#0eb02c]" />
            <span>Aptech ADSE Team</span>
          </div>
        </div>
      </div>

      {/* Main Animated About Stacking Experience */}
      <main className="relative z-10">
        <AboutPage />
      </main>
    </div>
  );
};
