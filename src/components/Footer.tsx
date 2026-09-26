import React, { useState } from 'react';
import { 
  Sparkles, 
  Shield, 
  BookOpen, 
  GraduationCap, 
  ClipboardList, 
  Search, 
  MessageSquare,
  ArrowUp,
  MapPin,
  Heart,
  ShieldCheck,
  X,
  Check,
  Send
} from 'lucide-react';

interface FooterProps {
  onNavigateTo?: (page: 'home' | 'learn' | 'practice' | 'resources' | 'connect' | 'contact', hash?: string) => void;
  onOpenConverterModal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateTo, onOpenConverterModal }) => {
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [feedbackRating, setFeedbackRating] = useState<number>(5);
  const [feedbackText, setFeedbackText] = useState('');
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  const [isSitemapModalOpen, setIsSitemapModalOpen] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNav = (page: 'home' | 'learn' | 'practice' | 'resources' | 'connect' | 'contact', hash?: string) => {
    setIsSitemapModalOpen(false);
    if (onNavigateTo) {
      onNavigateTo(page, hash);
    } else {
      window.location.hash = hash || `${page}-page`;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFeedbackSubmitted(true);
    setTimeout(() => {
      setFeedbackSubmitted(false);
      setIsFeedbackModalOpen(false);
      setFeedbackText('');
    }, 2200);
  };

  return (
    <footer className="bg-[#f0f0f0] text-[#1a1919] font-sans border-t border-[#1a1919]/10 relative">
      
      {/* 1. Top Value Trust Banners */}
      <div className="border-b border-[#1a1919]/10 py-10 bg-white/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-white/90 border border-[#1a1919]/5 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#0eb02c]/10 border border-[#0eb02c]/20 flex items-center justify-center text-[#0eb02c]">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-[#1a1919] text-xs">100% Free Educational Resource</div>
              <div className="text-[11px] text-[#1a1919]/60 font-medium">No paywalls, ads, or data tracking</div>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-white/90 border border-[#1a1919]/5 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#0922b0]/10 border border-[#0922b0]/20 flex items-center justify-center text-[#0922b0]">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-[#1a1919] text-xs">Aptech ADSE Student Project</div>
              <div className="text-[11px] text-[#1a1919]/60 font-medium">Built by students, for real semester life</div>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-white/90 border border-[#1a1919]/5 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#d12828]/10 border border-[#d12828]/20 flex items-center justify-center text-[#d12828]">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-[#1a1919] text-xs">Zero Financial Jargon</div>
              <div className="text-[11px] text-[#1a1919]/60 font-medium">Visual 50/30/20 & stress-free tools</div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Footer Links & Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          {/* Brand & Purpose */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              <img 
                src="/logo.png" 
                alt="BudgetBasics Logo" 
                className="w-8 h-8 rounded-lg object-contain shrink-0" 
              />
              <span className="font-extrabold text-base tracking-tight text-[#1a1919] flex items-center">
                <span className="text-[#0922b0]">budget</span>
                <span className="text-[#0eb02c]">basics</span>
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0eb02c]/10 text-[#0eb02c] font-bold border border-[#0eb02c]/20">
                Visual Blueprint
              </span>
            </div>
            <p className="text-[#1a1919]/70 text-xs sm:text-sm leading-relaxed max-w-sm font-medium">
              A student-first financial decision engine helping undergraduates and early earners master money habits with clarity.
            </p>

            {/* Educational Disclaimer & Privacy Note */}
            <div className="p-3.5 rounded-2xl bg-[#f0f0f0] border border-[#1a1919]/10 space-y-1.5 text-[11px] text-[#1a1919]/70 max-w-sm">
              <div className="font-bold text-[#1a1919] flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#0eb02c]" />
                <span>Educational Disclaimer & Privacy Note</span>
              </div>
              <p className="leading-normal">
                BudgetBasics is an educational learning framework, not a financial advisor or banking service. No financial data or personal accounts are stored or transmitted.
              </p>
            </div>
          </div>

          {/* 1. Learn Budgeting Branch */}
          <div className="md:col-span-2">
            <div className="font-bold text-[#1a1919] uppercase tracking-wider text-xs mb-3 font-mono flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-[#0922b0]" />
              <span>Learn</span>
            </div>
            <ul className="space-y-2 text-xs font-semibold text-[#1a1919]/70">
              <li><button onClick={() => handleNav('learn', 'learn-page')} className="hover:text-[#0922b0] transition-colors text-left">Budgeting Basics</button></li>
              <li><button onClick={() => handleNav('learn', 'learn-page')} className="hover:text-[#0922b0] transition-colors text-left">Needs vs Wants (30 Deck)</button></li>
              <li><button onClick={() => handleNav('learn', 'learn-page')} className="hover:text-[#0922b0] transition-colors text-left">50/30/20 Rule Formula</button></li>
              <li><button onClick={() => handleNav('learn', 'learn-page')} className="hover:text-[#0922b0] transition-colors text-left">Money Mistakes Guide</button></li>
            </ul>
          </div>

          {/* 2. Practice Planning Branch */}
          <div className="md:col-span-2">
            <div className="font-bold text-[#1a1919] uppercase tracking-wider text-xs mb-3 font-mono flex items-center gap-1.5">
              <ClipboardList className="w-3.5 h-3.5 text-[#0eb02c]" />
              <span>Practice</span>
            </div>
            <ul className="space-y-2 text-xs font-semibold text-[#1a1919]/70">
              <li><button onClick={() => handleNav('practice', 'practice-page')} className="hover:text-[#0eb02c] transition-colors text-left">Expense Planner</button></li>
              <li><button onClick={() => handleNav('practice', 'practice-page')} className="hover:text-[#0eb02c] transition-colors text-left">Savings Goals Studio</button></li>
              <li><button onClick={() => handleNav('practice', 'practice-page')} className="hover:text-[#0eb02c] transition-colors text-left">Daily Fun Allowance</button></li>
              <li><button onClick={() => handleNav('practice', 'practice-page')} className="hover:text-[#0eb02c] transition-colors text-left">Money Traps Radar</button></li>
            </ul>
          </div>

          {/* 3. Explore Resources Branch */}
          <div className="md:col-span-2">
            <div className="font-bold text-[#1a1919] uppercase tracking-wider text-xs mb-3 font-mono flex items-center gap-1.5">
              <Search className="w-3.5 h-3.5 text-[#0922b0]" />
              <span>Resources</span>
            </div>
            <ul className="space-y-2 text-xs font-semibold text-[#1a1919]/70">
              <li><button onClick={() => handleNav('resources', 'resources-page')} className="hover:text-[#0922b0] transition-colors text-left">Infographics Gallery</button></li>
              <li><button onClick={() => handleNav('resources', 'resources-page')} className="hover:text-[#0922b0] transition-colors text-left">Notion Dashboards</button></li>
              <li><button onClick={() => onOpenConverterModal ? onOpenConverterModal() : handleNav('practice', 'practice-page')} className="hover:text-[#0eb02c] transition-colors text-left font-bold text-[#0eb02c]">Currency Converter 💱</button></li>
              <li><button onClick={() => handleNav('resources', 'resources-page')} className="hover:text-[#0922b0] transition-colors text-left">Student Discounts</button></li>
            </ul>
          </div>

          {/* 4. Connect, About & Sitemap */}
          <div className="md:col-span-2">
            <div className="font-bold text-[#1a1919] uppercase tracking-wider text-xs mb-3 font-mono flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5 text-[#0eb02c]" />
              <span>Connect</span>
            </div>
            <ul className="space-y-2 text-xs font-semibold text-[#1a1919]/70">
              <li><button onClick={() => handleNav('connect', 'connect-page')} className="hover:text-[#0eb02c] transition-colors text-left">AI Q&A Assistant</button></li>
              <li><button onClick={() => handleNav('contact', 'contact-page')} className="hover:text-[#0922b0] transition-colors text-left font-bold text-[#0922b0]">Contact Us & Clinic ↗</button></li>
              <li><button onClick={() => handleNav('connect', 'about-page')} className="hover:text-[#0eb02c] transition-colors text-left">About Us (Aptech Team)</button></li>
              <li><button onClick={() => setIsFeedbackModalOpen(true)} className="hover:text-[#0eb02c] transition-colors text-left flex items-center gap-1">Leave Feedback <Sparkles className="w-3 h-3 text-[#0eb02c]" /></button></li>
              <li><button onClick={() => setIsSitemapModalOpen(true)} className="hover:text-[#0922b0] transition-colors text-left font-bold text-[#0922b0]">Site Architecture Map ↗</button></li>
            </ul>
          </div>
        </div>

        {/* 3. Bottom Utility Bar with Back-to-Top Button */}
        <div className="pt-8 border-t border-[#1a1919]/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[#1a1919]/60 text-xs font-medium">
          <div>
            &copy; 2026 BudgetBasics Guide · Aptech ADSE Team Project.
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSitemapModalOpen(true)}
              className="hover:text-[#1a1919] transition-colors underline cursor-pointer"
            >
              Sitemap
            </button>
            <span>·</span>
            <button
              onClick={() => setIsFeedbackModalOpen(true)}
              className="hover:text-[#1a1919] transition-colors underline cursor-pointer"
            >
              Feedback
            </button>
            <span>·</span>
            <button
              onClick={() => handleNav('contact', 'contact-page')}
              className="hover:text-[#1a1919] transition-colors underline cursor-pointer"
            >
              Contact Us
            </button>
            <span>·</span>
            <button
              onClick={() => handleNav('connect', 'about-page')}
              className="hover:text-[#1a1919] transition-colors underline cursor-pointer"
            >
              About Us
            </button>
            <span>·</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-xl bg-white hover:bg-slate-200 text-[#1a1919] border border-[#1a1919]/10 shadow-xs flex items-center gap-1.5 text-xs font-bold transition-all hover:-translate-y-0.5 cursor-pointer ml-2"
              title="Scroll smoothly back to the top"
            >
              <ArrowUp className="w-3.5 h-3.5 text-[#0eb02c]" />
              <span>Back to Top</span>
            </button>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* SITEMAP INTERACTIVE MODAL                                    */}
      {/* ============================================================ */}
      {isSitemapModalOpen && (
        <div className="fixed inset-0 z-[500] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full border border-[#1a1919]/15 shadow-2xl relative space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-[#1a1919]/10">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#0922b0]/10 text-[#0922b0] flex items-center justify-center font-bold">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-[#1a1919]">BudgetBasics Site Architecture Map</h3>
                  <span className="text-[11px] text-[#1a1919]/60 font-mono">Complete Navigation Index</span>
                </div>
              </div>

              <button
                onClick={() => setIsSitemapModalOpen(false)}
                className="p-2 rounded-xl hover:bg-slate-100 text-[#1a1919]/60 hover:text-[#1a1919]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Sitemap Tree Structure */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-medium">
              {/* 1. Landing Page */}
              <div className="p-4 rounded-2xl bg-[#f0f0f0] border border-[#1a1919]/10 space-y-2">
                <button onClick={() => handleNav('home')} className="font-bold text-sm text-[#1a1919] hover:text-[#0eb02c] flex items-center gap-2 text-left">
                  <span>🏠 Landing Page (Home)</span>
                </button>
                <ul className="pl-4 space-y-1 text-[#1a1919]/70 list-disc">
                  <li>Hero with 3D Slide Stream & Navbar</li>
                  <li>Visitor Counter & Live Clock</li>
                  <li>Motivational Quote Ticker</li>
                  <li>50/30/20 Quad Overview</li>
                </ul>
              </div>

              {/* 2. Learn Budgeting */}
              <div className="p-4 rounded-2xl bg-[#0922b0]/5 border border-[#0922b0]/20 space-y-2">
                <button onClick={() => handleNav('learn', 'learn-page')} className="font-bold text-sm text-[#0922b0] hover:underline flex items-center gap-2 text-left">
                  <span>📖 Learn Budgeting</span>
                </button>
                <ul className="pl-4 space-y-1 text-[#1a1919]/70 list-disc">
                  <li>Budgeting Basics & Knowledge Check</li>
                  <li>Needs vs Wants (30-Card Deck)</li>
                  <li>14-Row Diagnostic Matrix</li>
                  <li>Savings Goals & Expense Planner Guide</li>
                  <li>Money Mistakes Common Traps</li>
                </ul>
              </div>

              {/* 3. Practice Planning */}
              <div className="p-4 rounded-2xl bg-[#0eb02c]/5 border border-[#0eb02c]/20 space-y-2">
                <button onClick={() => handleNav('practice', 'practice-page')} className="font-bold text-sm text-[#0eb02c] hover:underline flex items-center gap-2 text-left">
                  <span>📋 Practice Planning</span>
                </button>
                <ul className="pl-4 space-y-1 text-[#1a1919]/70 list-disc">
                  <li>Interactive Expense Planner Studio</li>
                  <li>Daily Fun Limit ($/day) Calculator</li>
                  <li>Savings Goals & Timeline Simulator</li>
                  <li>Money Traps Self-Diagnostic Radar</li>
                </ul>
              </div>

              {/* 4. Explore Resources */}
              <div className="p-4 rounded-2xl bg-[#0922b0]/5 border border-[#0922b0]/20 space-y-2">
                <button onClick={() => handleNav('resources', 'resources-page')} className="font-bold text-sm text-[#0922b0] hover:underline flex items-center gap-2 text-left">
                  <span>🔍 Explore Resources</span>
                </button>
                <ul className="pl-4 space-y-1 text-[#1a1919]/70 list-disc">
                  <li>Infographics & Learning Gallery</li>
                  <li>Search, Sort & Filter Vault</li>
                  <li>Notion & Google Sheet Downloads</li>
                  <li>Student Software Discounts</li>
                </ul>
              </div>

              {/* 5. Get Help / Connect */}
              <div className="p-4 rounded-2xl bg-[#0eb02c]/5 border border-[#0eb02c]/20 space-y-2">
                <button onClick={() => handleNav('connect', 'connect-page')} className="font-bold text-sm text-[#0eb02c] hover:underline flex items-center gap-2 text-left">
                  <span>💬 Get Help / Connect</span>
                </button>
                <ul className="pl-4 space-y-1 text-[#1a1919]/70 list-disc">
                  <li>AI Q&A Financial Assistant (Interactive Chatbot)</li>
                  <li>About Us & Aptech ADSE Team Disclosures</li>
                  <li>Peer Advisor Clinic 1-on-1 Request Form</li>
                  <li>Frequently Asked Questions (FAQ) Accordion</li>
                </ul>
              </div>

              {/* 6. Contact & Peer Clinic */}
              <div className="p-4 rounded-2xl bg-[#0922b0]/5 border border-[#0922b0]/20 space-y-2">
                <button onClick={() => handleNav('contact', 'contact-page')} className="font-bold text-sm text-[#0922b0] hover:underline flex items-center gap-2 text-left">
                  <span>✉️ Contact & Peer Clinic</span>
                </button>
                <ul className="pl-4 space-y-1 text-[#1a1919]/70 list-disc">
                  <li>Direct Peer Support & Office Hours</li>
                  <li>Client-Side Validated Inquiry Form</li>
                  <li>Campus Hub Lab 04 Drop-in Details</li>
                  <li>Communication & Support FAQs</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* FEEDBACK CLIENT-SIDE MODAL                                   */}
      {/* ============================================================ */}
      {isFeedbackModalOpen && (
        <div className="fixed inset-0 z-[500] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-[#1a1919]/15 shadow-2xl relative space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#1a1919]/10">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-[#0eb02c]" />
                <h3 className="font-bold text-base text-[#1a1919]">Student Feedback</h3>
              </div>
              <button
                onClick={() => setIsFeedbackModalOpen(false)}
                className="p-1.5 rounded-xl hover:bg-slate-100 text-[#1a1919]/60"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {feedbackSubmitted ? (
              <div className="py-6 text-center space-y-2">
                <Check className="w-10 h-10 text-[#0eb02c] mx-auto" />
                <h4 className="font-bold text-base text-[#1a1919]">Thank You for Your Feedback!</h4>
                <p className="text-xs text-[#1a1919]/70">Your rating helps improve BudgetBasics for future students.</p>
              </div>
            ) : (
              <form onSubmit={handleFeedbackSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-[#1a1919]/70 block mb-2">How helpful was BudgetBasics?</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setFeedbackRating(star)}
                        className={`p-2 rounded-xl text-sm transition-all ${
                          star <= feedbackRating ? 'bg-[#0eb02c] text-white' : 'bg-[#f0f0f0] text-gray-400'
                        }`}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#1a1919]/70 block mb-1">Your Suggestions or Thoughts</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Tell us what tool or calculator you want next..."
                    value={feedbackText}
                    onChange={(e) => setFeedbackText(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#f0f0f0] border border-transparent focus:border-[#0eb02c] text-xs font-medium focus:outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[#0eb02c] hover:bg-[#0c9626] text-white text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-sm"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Anonymous Feedback</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}

    </footer>
  );
};
