import React, { useState } from 'react';
import { 
  Bot, 
  Send, 
  HelpCircle, 
  ChevronDown, 
  Target, 
  Code2, 
  Palette, 
  Layout, 
  BookOpen, 
  Mail, 
  CheckCircle2, 
  ArrowRight
} from 'lucide-react';

interface ConnectPageProps {
  onBackToHome?: () => void;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  time: string;
}

interface TeamMember {
  id: string;
  role: string;
  title: string;
  icon: React.ReactNode;
  tag: string;
  work: string;
}

const teamMembersData: TeamMember[] = [
  {
    id: "1",
    role: "Frontend & Motion Developer",
    title: "Member 01",
    icon: <Layout className="w-5 h-5 text-[#0922b0]" />,
    tag: "Motion & UI",
    work: "Built the 50/30/20 scroll animation on the homepage and the progress bar that tracks each stage."
  },
  {
    id: "2",
    role: "UI/UX & Brand Designer",
    title: "Member 02",
    icon: <Palette className="w-5 h-5 text-[#0eb02c]" />,
    tag: "Design System",
    work: "Designed the visual identity: colors, typography, and the icons used across the guide."
  },
  {
    id: "3",
    role: "Frontend Layout Engineer",
    title: "Member 03",
    icon: <Code2 className="w-5 h-5 text-[#0922b0]" />,
    tag: "Components",
    work: "Coded the FAQ accordion and the About page layout, including the stacking panels."
  },
  {
    id: "4",
    role: "Content & Research Lead",
    title: "Member 04",
    icon: <BookOpen className="w-5 h-5 text-[#d12828]" />,
    tag: "Research & Content",
    work: "Wrote the budgeting guides and student examples, and fact-checked every figure."
  },
  {
    id: "5",
    role: "Full-Stack & AI Engineer",
    title: "Member 05",
    icon: <Bot className="w-5 h-5 text-[#0eb02c]" />,
    tag: "AI & Logic",
    work: "Built the AI chatbot and the interactive budget planner."
  }
];

const faqDataList = [
  {
    id: "panel1",
    question: "What is BudgetBasics?",
    answer: "BudgetBasics is a student-led initiative aimed at simplifying the budgeting process. We provide tools, guides, and resources to help students manage their finances effectively."
  },
  {
    id: "panel2",
    question: "Is my financial data saved anywhere?",
    answer: "No, BudgetBasics does not save any of your financial data. All information you enter is stored locally on your device and is never transmitted to any server."
  },
  {
    id: "panel3",
    question: "Is this a real budgeting app I can use with my actual bank account?",
    answer: "No — BudgetBasics is an educational tool, not a banking service. It's designed to teach budgeting concepts using sample numbers, not to manage real transactions."
  },
  {
    id: "panel4",
    question: "Can the AI chatbot answer any money question?",
    answer: "It's built to answer common budgeting basics (needs vs wants, saving tips, avoiding overspending). For anything outside that scope, it'll let you know rather than guess."
  },
  {
    id: "panel5",
    question: "Who is this site for?",
    answer: "Primarily students managing an allowance, scholarship, or part-time income for the first time — but honestly, anyone new to budgeting can use it."
  }
];

const initialMessages: ChatMessage[] = [
  {
    id: 'msg-1',
    sender: 'bot',
    text: "Hi there! I'm your BudgetBasics AI assistant. Ask me anything about 50/30/20 splits, distinguishing Needs vs Wants, handling campus grocery bills, or setting up your first $500 emergency buffer.",
    time: 'Just now'
  }
];

export const ConnectPage: React.FC<ConnectPageProps> = () => {
  const [activeTab, setActiveTab] = useState<'assistant' | 'about'>('assistant');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(initialMessages);
  const [inputQuestion, setInputQuestion] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [expandedMemberId, setExpandedMemberId] = useState<string | null>(null);
  const [expandedFaqId, setExpandedFaqId] = useState<string | null>('panel1');

  // Contact form state
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const samplePrompts = [
    "How do I balance a $1,200 monthly allowance?",
    "Is daily coffee a Need or a Want?",
    "How fast can I save a $500 emergency cushion?",
    "How to split rent and grocery costs with roommates?"
  ];

  const handleSendMessage = (textToSend?: string) => {
    const q = textToSend || inputQuestion;
    if (!q.trim()) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: q,
      time: 'Just now'
    };

    setChatMessages((prev) => [...prev, userMsg]);
    setInputQuestion('');
    setIsTyping(true);

    // Dynamic AI response generator
    setTimeout(() => {
      let reply = "Under the 50/30/20 rule, your fixed living essentials (needs) get 50%, discretionary fun gets 30%, and 20% is set aside for your emergency cushion and future savings.";

      const lower = q.toLowerCase();
      if (lower.includes('coffee') || lower.includes('dining')) {
        reply = "Daily specialty coffee runs and dining out are classified as 'Optional Wants'. If you make coffee at home 4 days a week and buy cafe drinks only on Fridays, you can easily save $60–$80 every month!";
      } else if (lower.includes('500') || lower.includes('cushion') || lower.includes('emergency')) {
        reply = "A $500 emergency cushion is your best defense against unexpected laptop repairs or urgent fees. Saving just $25/week gets you fully protected in approximately 20 weeks!";
      } else if (lower.includes('roommate') || lower.includes('rent')) {
        reply = "For shared living expenses, use an equal split for fixed utilities (Wi-Fi, power) and individual allocations for personal groceries. Use our Semester Notion Dashboard from the Resources page to track it easily!";
      }

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: reply,
        time: 'Just now'
      };

      setChatMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 900);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactEmail) return;
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setContactName('');
      setContactEmail('');
      setContactMessage('');
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-[#f0f0f0] text-[#1a1919] font-sans antialiased selection:bg-[#0eb02c]/20 selection:text-[#0eb02c] pb-24 relative">
      
      {/* In-Page Sub-Header & Connect Mode Switcher */}
      <div className="border-b border-[#1a1919]/8 bg-white/60 backdrop-blur-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono font-bold uppercase text-[#0eb02c] bg-[#0eb02c]/10 px-2.5 py-1 rounded-lg">
              04 · Connect & Assistant
            </span>
            <span className="hidden sm:inline text-xs text-[#1a1919]/60 font-medium">
              / AI Financial Bot & Aptech ADSE Team
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('assistant')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'assistant'
                  ? 'bg-[#0eb02c] text-white shadow-xs'
                  : 'bg-white text-[#1a1919]/70 hover:text-[#1a1919] border border-[#1a1919]/10'
              }`}
            >
              AI Q&A Assistant
            </button>
            <button
              onClick={() => setActiveTab('about')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'about'
                  ? 'bg-[#0922b0] text-white shadow-xs'
                  : 'bg-white text-[#1a1919]/70 hover:text-[#1a1919] border border-[#1a1919]/10'
              }`}
            >
              About Us & Team
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-12">
        
        {/* ============================================================ */}
        {/* TAB 1: AI Q&A ASSISTANT & PEER ADVISOR CLINIC                */}
        {/* ============================================================ */}
        {(activeTab === 'assistant') && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-in fade-in duration-300">
            {/* Left Column: Interactive Chat Interface */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-[#1a1919]/10 shadow-sm flex flex-col justify-between min-h-[560px]">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-[#1a1919]/10 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-[#0eb02c]/10 text-[#0eb02c] flex items-center justify-center font-bold">
                      <Bot className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-[#1a1919]">BudgetBasics AI Q&A</h3>
                      <span className="text-xs text-[#0eb02c] font-semibold flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#0eb02c] animate-pulse" />
                        Online & Ready to Advise
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#f0f0f0] text-[#1a1919]/70 font-bold">
                    AI 2.0
                  </span>
                </div>

                {/* Chat Messages List */}
                <div className="space-y-4 max-h-[340px] overflow-y-auto pr-2">
                  {chatMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      {msg.sender === 'bot' && (
                        <div className="w-8 h-8 rounded-xl bg-[#0eb02c] text-white flex items-center justify-center shrink-0 font-bold text-xs">
                          AI
                        </div>
                      )}
                      <div
                        className={`p-4 rounded-2xl max-w-[85%] text-xs sm:text-sm leading-relaxed ${
                          msg.sender === 'user'
                            ? 'bg-[#1a1919] text-white rounded-tr-xs'
                            : 'bg-[#f0f0f0] text-[#1a1919] rounded-tl-xs border border-[#1a1919]/5'
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))}

                  {isTyping && (
                    <div className="flex gap-2 items-center text-xs text-[#1a1919]/50 font-mono">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0eb02c] animate-bounce" />
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0eb02c] animate-bounce [animation-delay:0.2s]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0eb02c] animate-bounce [animation-delay:0.4s]" />
                      <span>AI is thinking...</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Chat Input & Chips */}
              <div className="pt-4 border-t border-[#1a1919]/10 space-y-3 mt-4">
                {/* Prompt Suggestions */}
                <div className="flex flex-wrap gap-1.5">
                  {samplePrompts.map((prompt) => (
                    <button
                      key={prompt}
                      onClick={() => handleSendMessage(prompt)}
                      className="px-2.5 py-1 rounded-xl bg-[#f0f0f0] hover:bg-slate-200 text-[#1a1919]/70 text-[11px] font-medium transition-colors text-left"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>

                {/* Input Bar */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="flex gap-2"
                >
                  <input
                    type="text"
                    placeholder="Ask any question about student budgeting..."
                    value={inputQuestion}
                    onChange={(e) => setInputQuestion(e.target.value)}
                    className="flex-1 px-4 py-2.5 rounded-2xl bg-[#f0f0f0] border border-transparent focus:border-[#0eb02c] text-xs sm:text-sm font-medium focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-2xl bg-[#0eb02c] hover:bg-[#0c9626] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Send</span>
                  </button>
                </form>
              </div>
            </div>

            {/* Right Column: Peer Financial Advisor Clinic */}
            <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-[#1a1919]/10 shadow-sm space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-[#1a1919]/10">
                <div className="w-10 h-10 rounded-2xl bg-[#0922b0]/10 text-[#0922b0] flex items-center justify-center font-bold">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-[#1a1919]">Peer Advisor Clinic</h3>
                  <span className="text-xs text-[#1a1919]/60 font-mono">1-on-1 Confidential Guidance</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#1a1919]/75 leading-relaxed">
                Have a unique student aid question or semester spending dilemma? Leave a message and a student peer financial mentor will get back to you within 24 hours.
              </p>

              {isSubmitted ? (
                <div className="p-6 rounded-2xl bg-[#0eb02c]/10 border border-[#0eb02c]/20 text-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-[#0eb02c] mx-auto" />
                  <h4 className="font-bold text-sm text-[#1a1919]">Message Dispatched!</h4>
                  <p className="text-xs text-[#1a1919]/70">We will reach out to {contactEmail} shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-3">
                  <div>
                    <label className="text-xs font-semibold text-[#1a1919]/70 block mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-[#f0f0f0] border border-transparent focus:border-[#0922b0] text-xs font-medium focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#1a1919]/70 block mb-1">Student Email</label>
                    <input
                      type="email"
                      required
                      placeholder="alex@university.edu"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-[#f0f0f0] border border-transparent focus:border-[#0922b0] text-xs font-medium focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#1a1919]/70 block mb-1">Your Question or Situation</label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Tell us what you need advice on..."
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-[#f0f0f0] border border-transparent focus:border-[#0922b0] text-xs font-medium focus:outline-none resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-[#1a1919] hover:bg-black text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-xs"
                  >
                    <span>Send Message to Peer Mentors</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#0eb02c]" />
                  </button>
                </form>
              )}
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 2: ABOUT US, APTECH TEAM & FAQS                          */}
        {/* ============================================================ */}
        {(activeTab === 'about') && (
          <div className="space-y-12 animate-in fade-in duration-300">
            {/* 01 · ABOUT US */}
            <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#1a1919]/10 shadow-sm relative overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                <div className="lg:col-span-6 space-y-6 border-l-4 border-[#0922b0] pl-6">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0922b0]/10 text-xs font-mono text-[#0922b0] font-bold">
                    01 · ORIGIN STORY
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-black text-[#1a1919] tracking-tight">
                    About <span className="text-[#0eb02c]">BudgetBasics</span>
                  </h2>
                  <p className="text-sm text-[#1a1919]/80 leading-relaxed">
                    BudgetBasics was built by students, for students. We know what it's like to get a monthly allowance, a scholarship stipend, or your first part-time paycheck and have absolutely no idea where it went by the end of the month. This site exists to change that — one small habit at a time.
                  </p>
                </div>

                <div className="lg:col-span-6 bg-[#f0f0f0]/70 rounded-2xl p-6 sm:p-8 border border-[#1a1919]/10 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#0eb02c]/10 text-[#0eb02c] flex items-center justify-center font-bold">
                      <Target className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-[#1a1919]">Our Mission</h3>
                      <span className="text-xs font-mono text-[#1a1919]/60">Common Sense Financial Literacy</span>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-[#1a1919]/75 leading-relaxed">
                    Our mission is simple: make budgeting feel less like homework and more like common sense. We believe financial literacy shouldn't be locked behind confusing jargon or expensive courses.
                  </p>
                </div>
              </div>
            </div>

            {/* 02 · MEET THE TEAM */}
            <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#1a1919]/10 shadow-sm space-y-8">
              <div className="border-l-4 border-[#0eb02c] pl-6 space-y-2">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0eb02c]/10 text-xs font-mono text-[#0eb02c] font-bold">
                  02 · APTECH ADSE TEAM
                </div>
                <h2 className="text-3xl sm:text-4xl font-black text-[#1a1919]">
                  Meet The <span className="text-[#0eb02c]">Team</span>
                </h2>
                <p className="text-sm text-[#1a1919]/80">
                  We're a team of Aptech ADSE students who combined what we're learning in frontend development and UI/UX design to build something we'd actually want to use ourselves.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {teamMembersData.map((member) => {
                  const isOpen = expandedMemberId === member.id;
                  return (
                    <div
                      key={member.id}
                      className={`bg-[#f0f0f0]/60 rounded-2xl border transition-all duration-300 overflow-hidden flex flex-col justify-between ${
                        isOpen ? 'border-[#0eb02c] shadow-md bg-white' : 'border-[#1a1919]/10 hover:bg-white'
                      }`}
                      onMouseEnter={() => setExpandedMemberId(member.id)}
                      onMouseLeave={() => setExpandedMemberId(null)}
                    >
                      <div className="p-5 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="w-9 h-9 rounded-xl bg-white border border-[#1a1919]/10 flex items-center justify-center shadow-xs">
                            {member.icon}
                          </div>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white text-[#1a1919]/70 font-bold border border-[#1a1919]/10">
                            {member.tag}
                          </span>
                        </div>
                        <div>
                          <h4 className="font-bold text-sm text-[#1a1919]">{member.title}</h4>
                          <p className="text-xs text-[#1a1919]/60">{member.role}</p>
                        </div>
                      </div>

                      <div className="border-t border-[#1a1919]/10 bg-white/60">
                        <button
                          onClick={() => setExpandedMemberId(current => current === member.id ? null : member.id)}
                          className="w-full px-4 py-3 flex items-center justify-between text-xs font-semibold text-[#1a1919]/80 hover:text-[#0922b0] transition-colors text-left"
                        >
                          <span>What did they work on?</span>
                          <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                        </button>
                        <div className={`transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-48 opacity-100 p-4 pt-0' : 'max-h-0 opacity-0 p-0'}`}>
                          <p className="text-xs text-[#1a1919]/75 bg-[#f0f0f0] p-2.5 rounded-xl border border-[#1a1919]/5">
                            {member.work}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 03 · FAQS */}
            <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#1a1919]/10 shadow-sm space-y-6">
              <div className="text-center max-w-xl mx-auto space-y-2 pb-6 border-b border-[#1a1919]/10">
                <span className="text-xs font-mono font-bold text-[#d12828] uppercase bg-[#d12828]/10 px-3 py-1 rounded-full">
                  03 · FAQ
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-[#1a1919]">Frequently Asked Questions</h3>
              </div>

              <div className="max-w-3xl mx-auto space-y-3">
                {faqDataList.map((faq) => {
                  const isOpen = expandedFaqId === faq.id;
                  return (
                    <div
                      key={faq.id}
                      className={`rounded-2xl border transition-all ${
                        isOpen ? 'border-[#0922b0]/40 bg-[#0922b0]/5' : 'border-[#1a1919]/10 bg-white'
                      }`}
                    >
                      <button
                        onClick={() => setExpandedFaqId(current => current === faq.id ? null : faq.id)}
                        className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                      >
                        <span className="font-bold text-sm text-[#1a1919] flex items-center gap-2">
                          <HelpCircle className="w-4 h-4 text-[#0922b0]" />
                          {faq.question}
                        </span>
                        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                      </button>

                      {isOpen && (
                        <div className="px-5 pb-5 text-xs sm:text-sm text-[#1a1919]/75 border-t border-[#1a1919]/10 pt-3">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
};
