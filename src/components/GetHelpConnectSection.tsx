import React, { useState, useEffect, useRef } from 'react';
import { 
  Send, 
  Sparkles, 
  Bot, 
  User, 
  Users, 
  GraduationCap, 
  ShieldCheck, 
  HeartHandshake,
  ArrowRight,
  ThumbsUp,
  Copy,
  Check,
  RotateCcw
} from 'lucide-react';
import { DotLottiePlayer } from './DotLottiePlayer';
import { contactEmailLottieJson } from '../data/contactLottie';

interface AiMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  isStreaming?: boolean;
}

export const GetHelpConnectSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'ai-assistant' | 'about-us'>('ai-assistant');
  const [messages, setMessages] = useState<AiMessage[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: 'Hey there! 👋 I am your BudgetBasics AI Assistant. Ask me anything about 50/30/20 budgeting, managing semester refunds, splitting rent with roommates, or building your first $500 safety cushion.'
    }
  ]);
  const [inputQuestion, setInputQuestion] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [copiedMsgId, setCopiedMsgId] = useState<string | null>(null);
  const [likedMsgId, setLikedMsgId] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const sectionRef = useRef<HTMLElement>(null);
  const chatBottomRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const presetPrompts = [
    { label: 'Off-Campus Rent 60%', query: 'What if my rent eats up 60% of my income?' },
    { label: 'Work-Study Fluctuations', query: 'How do I budget variable work-study hours?' },
    { label: '$500 Cushion Sprint', query: 'How do I build a $500 cushion on a tight budget?' },
    { label: 'Roommate Expense Split', query: 'Best way to split groceries and utilities with roommates?' }
  ];

  // Streaming typewriter effect simulation for AI responses
  const streamAiResponse = (fullText: string) => {
    const messageId = `ai-${Date.now()}`;
    setMessages(prev => [...prev, { id: messageId, sender: 'ai', text: '', isStreaming: true }]);
    setIsTyping(false);

    let currentIndex = 0;
    const words = fullText.split(' ');
    
    const interval = setInterval(() => {
      if (currentIndex < words.length) {
        currentIndex += 1;
        const currentText = words.slice(0, currentIndex).join(' ');
        setMessages(prev => 
          prev.map(m => m.id === messageId ? { ...m, text: currentText, isStreaming: currentIndex < words.length } : m)
        );
      } else {
        clearInterval(interval);
      }
    }, 45);
  };

  const handleSendQuestion = (questionToSend?: string) => {
    const q = questionToSend || inputQuestion;
    if (!q.trim()) return;

    const userMsg: AiMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: q
    };

    setMessages(prev => [...prev, userMsg]);
    setInputQuestion('');
    setIsTyping(true);

    setTimeout(() => {
      let reply = 'Here is the recommended BudgetBasics framework: When cash is tight, prioritize keeping 50% for Needs, cap Wants at 30%, and channel the remaining 20% directly into your $500 emergency buffer before any discretionary spending.';
      
      const lower = q.toLowerCase();
      if (lower.includes('rent') || lower.includes('60%') || lower.includes('50%')) {
        reply = 'If dorm or off-campus rent absorbs 60% of your cashflow, shift your formula temporarily to 60% Needs / 20% Wants / 20% Savings. Never reduce the 20% cushion to zero, as unexpected campus fees will force reliance on high-interest credit cards.';
      } else if (lower.includes('variable') || lower.includes('work-study') || lower.includes('hours') || lower.includes('paycheck')) {
        reply = 'Calculate your "Baseline Floor" using your lowest guaranteed monthly paycheck. Treat any extra shifts or overtime tips as bonus income that flows 100% into your Savings Cushion buffer to subsidize lighter exam weeks.';
      } else if (lower.includes('500') || lower.includes('cushion') || lower.includes('tight')) {
        reply = 'To build a $500 emergency cushion on a tight budget: (1) Automate a $15/week transfer right on payday, (2) Batch cook 4 dorm meals weekly (saving ~$180/mo), and (3) Activate student discounts for Spotify, Apple, and GitHub.';
      } else if (lower.includes('roommate') || lower.includes('split') || lower.includes('groceries')) {
        reply = 'Use the "Separation Rule": Keep personal groceries and takeout completely separate. Split only household essentials (WiFi, cleaning supplies, paper towels) using a shared digital group with an auto-settle date on the 1st of every month.';
      }

      streamAiResponse(reply);
    }, 600);
  };

  const handleCopyMessage = (id: string, text: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedMsgId(id);
    setTimeout(() => setCopiedMsgId(null), 2000);
  };

  return (
    <section 
      ref={sectionRef}
      id="connect" 
      className="py-16 md:py-24 bg-[#f0f0f0] text-[#1a1919] relative overflow-hidden font-sans border-t border-[#1a1919]/10"
    >
      {/* Ambient background glowing orbs */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#0eb02c]/6 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#0922b0]/6 rounded-full blur-3xl pointer-events-none animate-pulse [animation-delay:2.5s]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ========================================================================= */}
        {/* SECTION HEADER & DUAL NAVIGATION (AI Q&A ASSISTANT & ABOUT US) */}
        {/* ========================================================================= */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            {/* Eyebrow Pill with Animated Lottie Envelope */}
            <div 
              className={`inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#0eb02c]/10 border border-[#0eb02c]/30 text-xs font-bold text-[#0eb02c] shadow-xs mb-3 transition-all duration-700 ${
                isVisible ? 'animate-slide-in-left' : 'opacity-0'
              }`}
            >
              <div className="w-5 h-5 flex items-center justify-center shrink-0">
                <DotLottiePlayer
                  animationData={contactEmailLottieJson}
                  src="/contact-lottie.json"
                  className="w-full h-full object-contain"
                />
              </div>
              <span>04 · GET HELP / CONNECT & ABOUT US</span>
            </div>

            <h2 
              className={`text-3xl sm:text-5xl font-black tracking-tight text-[#1a1919] leading-[1.08] transition-all duration-700 ${
                isVisible ? 'animate-slide-in-left' : 'opacity-0'
              }`}
              style={{ animationDelay: '0.08s' }}
            >
              Instant Advice & Community. <br />
              <span className="text-[#0922b0] font-serif italic font-normal text-3xl sm:text-5xl">
                AI Q&A Assistant and peer mentor network.
              </span>
            </h2>
          </div>

          {/* Module Switcher Tabs: AI Q&A Assistant vs About Us */}
          <div 
            className={`flex items-center gap-1.5 p-1.5 bg-white/90 backdrop-blur-md rounded-2xl border border-[#1a1919]/12 shadow-sm self-start md:self-auto transition-all duration-700 ${
              isVisible ? 'animate-slide-in-right' : 'opacity-0'
            }`}
          >
            <button
              onClick={() => setActiveTab('ai-assistant')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'ai-assistant'
                  ? 'bg-[#0922b0] text-white shadow-xs scale-102'
                  : 'text-[#1a1919]/70 hover:text-[#1a1919] hover:bg-[#f0f0f0]'
              }`}
            >
              <Bot className="w-4 h-4" />
              <span>AI Q&A Assistant</span>
            </button>

            <button
              onClick={() => setActiveTab('about-us')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'about-us'
                  ? 'bg-[#0922b0] text-white shadow-xs scale-102'
                  : 'text-[#1a1919]/70 hover:text-[#1a1919] hover:bg-[#f0f0f0]'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>About Us</span>
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 1. AI Q&A ASSISTANT MODULE */}
        {/* ========================================================================= */}
        {activeTab === 'ai-assistant' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Preset Prompts & Confidence Cards (4 Cols) */}
            <div className="lg:col-span-4 space-y-4">
              <div className="bg-white rounded-3xl p-6 border border-[#1a1919]/15 shadow-md space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#0922b0]" />
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#1a1919]">
                      Instant Scenarios
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-[#0eb02c] font-bold bg-[#0eb02c]/10 px-2 py-0.5 rounded-full">
                    1-CLICK ASK
                  </span>
                </div>
                
                <p className="text-xs text-[#1a1919]/70 font-medium leading-relaxed">
                  Select a common student money scenario to see the AI analyze it in real time:
                </p>

                <div className="space-y-2">
                  {presetPrompts.map((p, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendQuestion(p.query)}
                      className="w-full text-left p-3 rounded-2xl bg-[#f0f0f0]/80 hover:bg-[#0922b0]/10 hover:border-[#0922b0]/30 border border-[#1a1919]/10 text-xs font-bold text-[#1a1919] transition-all cursor-pointer flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0922b0]" />
                        <span className="group-hover:text-[#0922b0] transition-colors">{p.label}</span>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-[#1a1919]/40 group-hover:text-[#0922b0] shrink-0 group-hover:translate-x-0.5 transition-all" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Confidence Badge */}
              <div className="p-5 rounded-3xl bg-gradient-to-br from-[#0eb02c]/10 via-[#0eb02c]/5 to-transparent border border-[#0eb02c]/20 flex items-start gap-3 shadow-xs">
                <ShieldCheck className="w-5 h-5 text-[#0eb02c] shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-[#0eb02c]">Trained on 50/30/20 Principles</div>
                  <div className="text-[11px] text-[#1a1919]/75 mt-0.5 leading-relaxed">
                    Zero sales pitches, zero credit card ads. 100% focused on student cashflow resilience.
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Live Chat Interface with Streaming Typewriter (8 Cols) */}
            <div className="lg:col-span-8 bg-white rounded-3xl border border-[#1a1919]/15 shadow-xl overflow-hidden flex flex-col h-[540px]">
              
              {/* Chat Header */}
              <div className="p-4 bg-[#1a1919] text-white flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-2xl bg-[#0eb02c] flex items-center justify-center text-white shadow-md shadow-[#0eb02c]/30">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white flex items-center gap-2">
                      <span>BudgetBasics AI Money Advisor</span>
                      <span className="w-2 h-2 rounded-full bg-[#0eb02c] animate-ping" />
                    </div>
                    <div className="text-[10px] font-mono text-white/70">Online · Instant Answers</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono uppercase font-bold px-2.5 py-0.5 rounded-full bg-white/10 text-white border border-white/15 hidden sm:inline">
                    AI Q&A Assistant
                  </span>
                  <button
                    onClick={() => setMessages([{ id: 'welcome', sender: 'ai', text: 'Chat reset! How can I help with your semester budget?' }])}
                    className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-colors cursor-pointer"
                    title="Reset Chat"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Messages Scroll Area */}
              <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-[#f0f0f0]/40">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex items-start gap-3 ${
                      msg.sender === 'user' ? 'flex-row-reverse' : ''
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                        msg.sender === 'user'
                          ? 'bg-[#0922b0] text-white'
                          : 'bg-[#1a1919] text-[#0eb02c]'
                      }`}
                    >
                      {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                    </div>

                    <div className="space-y-1.5 max-w-lg">
                      <div
                        className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed font-medium ${
                          msg.sender === 'user'
                            ? 'bg-[#0922b0] text-white rounded-tr-xs shadow-sm'
                            : 'bg-white text-[#1a1919] border border-[#1a1919]/10 shadow-xs rounded-tl-xs'
                        }`}
                      >
                        {msg.text}
                        {msg.isStreaming && (
                          <span className="inline-block w-1.5 h-3.5 bg-[#0eb02c] ml-1 animate-pulse" />
                        )}
                      </div>

                      {/* Micro reaction bar for AI messages */}
                      {msg.sender === 'ai' && !msg.isStreaming && (
                        <div className="flex items-center gap-2 pl-1">
                          <button
                            onClick={() => setLikedMsgId(msg.id)}
                            className={`p-1 rounded-md text-[10px] flex items-center gap-1 transition-colors cursor-pointer ${
                              likedMsgId === msg.id 
                                ? 'text-[#0eb02c] font-bold bg-[#0eb02c]/10' 
                                : 'text-[#1a1919]/40 hover:text-[#1a1919]'
                            }`}
                          >
                            <ThumbsUp className="w-3 h-3" />
                            <span>Helpful</span>
                          </button>

                          <button
                            onClick={() => handleCopyMessage(msg.id, msg.text)}
                            className="p-1 rounded-md text-[10px] text-[#1a1919]/40 hover:text-[#1a1919] flex items-center gap-1 transition-colors cursor-pointer"
                          >
                            {copiedMsgId === msg.id ? (
                              <>
                                <Check className="w-3 h-3 text-[#0eb02c]" />
                                <span className="text-[#0eb02c]">Copied</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                <span>Copy</span>
                              </>
                            )}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-[#1a1919] text-[#0eb02c] flex items-center justify-center">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div className="p-3 bg-white border border-[#1a1919]/10 rounded-2xl text-xs text-[#1a1919]/70 flex items-center gap-2 shadow-xs">
                      <span className="w-2 h-2 rounded-full bg-[#0eb02c] animate-ping" />
                      <span className="font-mono text-[11px] font-bold text-[#0922b0]">Formulating 50/30/20 advice...</span>
                    </div>
                  </div>
                )}

                <div ref={chatBottomRef} />
              </div>

              {/* Chat Input Bar */}
              <form 
                onSubmit={(e) => { e.preventDefault(); handleSendQuestion(); }}
                className="p-4 bg-white border-t border-[#1a1919]/10 flex items-center gap-3"
              >
                <input
                  type="text"
                  value={inputQuestion}
                  onChange={(e) => setInputQuestion(e.target.value)}
                  placeholder="Ask about 50/30/20, variable shifts, campus food..."
                  className="flex-1 px-4 py-2.5 rounded-xl bg-[#f0f0f0] border border-[#1a1919]/10 text-xs text-[#1a1919] focus:outline-none focus:ring-2 focus:ring-[#0922b0]/20 focus:border-[#0922b0]"
                />
                <button
                  type="submit"
                  disabled={!inputQuestion.trim()}
                  className="px-5 py-2.5 rounded-xl bg-[#0922b0] hover:bg-[#071a8a] disabled:opacity-40 text-white text-xs font-bold flex items-center gap-2 shadow-md cursor-pointer transition-all active:scale-95"
                >
                  <span>Ask AI</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>

            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* 2. ABOUT US MODULE */}
        {/* ========================================================================= */}
        {activeTab === 'about-us' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Mission Statement (7 Cols) */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-7 sm:p-9 border border-[#1a1919]/15 shadow-xl flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0922b0]/10 text-[#0922b0] border border-[#0922b0]/20 text-xs font-bold font-mono">
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span>OUR STUDENT-FIRST MISSION</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-[#1a1919] tracking-tight leading-tight">
                  Built by students, for students. Ending campus overdraft anxiety forever.
                </h3>

                <p className="text-xs sm:text-sm text-[#1a1919]/80 font-medium leading-relaxed">
                  Traditional financial education is broken. Banks offer generic advice designed to sell credit cards, while complex spreadsheets require hours of tedious formula maintenance. BudgetBasics was founded at university to give undergraduate and graduate students a zero-stress visual framework.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <div className="p-4 rounded-2xl bg-[#f0f0f0] border border-[#1a1919]/10">
                    <div className="text-2xl font-black text-[#0922b0]">12,400+</div>
                    <div className="text-[11px] font-mono text-[#1a1919]/60 font-bold uppercase mt-0.5">Students Guided</div>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#f0f0f0] border border-[#1a1919]/10">
                    <div className="text-2xl font-black text-[#0eb02c]">$740 avg</div>
                    <div className="text-[11px] font-mono text-[#1a1919]/60 font-bold uppercase mt-0.5">Semester Cushion</div>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#f0f0f0] border border-[#1a1919]/10">
                    <div className="text-2xl font-black text-[#d12828]">100%</div>
                    <div className="text-[11px] font-mono text-[#1a1919]/60 font-bold uppercase mt-0.5">Free & Open</div>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#1a1919] text-white flex items-center justify-between text-xs font-bold">
                <span className="flex items-center gap-2">
                  <HeartHandshake className="w-4 h-4 text-[#0eb02c]" />
                  <span>Independent student financial wellness project</span>
                </span>
                <span className="font-mono text-[10px] text-white/60">EST. 2024</span>
              </div>
            </div>

            {/* Peer Mentors & Advisory Team (5 Cols) */}
            <div className="lg:col-span-5 bg-white rounded-3xl p-7 sm:p-8 border border-[#1a1919]/15 shadow-xl flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#1a1919]/60">
                    Campus Peer Advisory Team
                  </span>
                  <span className="text-[10px] font-mono font-bold text-[#0eb02c] flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0eb02c] animate-pulse" />
                    <span>Active Office Hours</span>
                  </span>
                </div>

                <div className="space-y-3">
                  {[
                    {
                      name: 'Elena Rostova',
                      role: 'Graduate Economics Lead',
                      university: 'Financial Wellness Clinic',
                      focus: '50/30/20 Rule & Rent Buffer',
                      questionPreset: 'How should I handle high rent in a college town?'
                    },
                    {
                      name: 'Marcus Chen',
                      role: 'Senior Peer Mentor',
                      university: 'Work-Study Advisory Council',
                      focus: 'Variable Paychecks & Shift Smoothing',
                      questionPreset: 'How do I budget with irregular work-study hours?'
                    },
                    {
                      name: 'Amara Okafor',
                      role: 'Student Aid Coordinator',
                      university: 'Financial Literacy Coalition',
                      focus: 'Refund Management & Credit Safety',
                      questionPreset: 'How should I allocate my semester aid refund check?'
                    }
                  ].map((mentor, i) => (
                    <div key={i} className="p-3.5 rounded-2xl bg-[#f0f0f0]/80 border border-[#1a1919]/10 hover:bg-white hover:shadow-xs transition-all">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="text-xs font-bold text-[#1a1919]">{mentor.name}</div>
                          <div className="text-[11px] font-bold text-[#0922b0]">{mentor.role}</div>
                        </div>
                        <button
                          onClick={() => {
                            setActiveTab('ai-assistant');
                            handleSendQuestion(mentor.questionPreset);
                          }}
                          className="px-2.5 py-1 rounded-lg bg-[#0922b0]/10 hover:bg-[#0922b0] text-[#0922b0] hover:text-white text-[10px] font-bold transition-colors cursor-pointer flex items-center gap-1"
                          title="Ask question based on mentor's focus"
                        >
                          <span>Ask AI</span>
                          <ArrowRight className="w-2.5 h-2.5" />
                        </button>
                      </div>
                      <div className="text-[10px] text-[#1a1919]/60 mt-1">{mentor.university}</div>
                      <div className="text-[10px] text-[#0eb02c] font-medium mt-0.5">Focus: {mentor.focus}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-[#1a1919]/10">
                <button
                  onClick={() => setActiveTab('ai-assistant')}
                  className="w-full py-2.5 rounded-xl bg-[#0922b0] hover:bg-[#071a8a] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer active:scale-95"
                >
                  <Bot className="w-3.5 h-3.5" />
                  <span>Launch Interactive AI Q&A Assistant</span>
                </button>
              </div>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
