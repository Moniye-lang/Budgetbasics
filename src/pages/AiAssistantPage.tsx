import React, { useState } from 'react';
import { 
  Bot, 
  Send, 
  RotateCcw, 
  ShieldCheck, 
  User, 
  ArrowRight,
  Mail
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  time: string;
}

interface AiAssistantPageProps {
  onBackToHome?: () => void;
  onNavigateToContact?: () => void;
}

export const AiAssistantPage: React.FC<AiAssistantPageProps> = ({
  onNavigateToContact
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'bot',
      text: "👋 Hi! I'm your BudgetBasics Student AI Assistant. Ask me anything about managing allowances, the 50/30/20 rule, avoiding hidden fees, or building your first $500 emergency buffer!",
      time: 'Just now'
    }
  ]);

  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const samplePrompts = [
    "What is the 50/30/20 rule and how does it work?",
    "How do I start an emergency fund on a $800 allowance?",
    "How can I stop overspending on food delivery?",
    "What's the difference between Needs and Wants?"
  ];

  const handleSend = (textToSend?: string) => {
    const query = textToSend || inputVal;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: query.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputVal('');
    setIsTyping(true);

    // AI Simulated Knowledge Matcher
    setTimeout(() => {
      let reply = "That's a great question about student budgeting! As a foundation, remember to prioritize your 50% Needs (rent, basic groceries, transit) before allocating to 30% Wants or 20% Savings.";
      const q = query.toLowerCase();

      if (q.includes('50/30/20') || q.includes('rule') || q.includes('formula')) {
        reply = "💡 The 50/30/20 rule divides your take-home monthly allowance into 3 buckets:\n• 50% Needs: Housing, utilities, groceries, transit & essential supplies.\n• 30% Wants: Weekend dining, streaming, cafes & campus social life.\n• 20% Savings: Emergency cushion ($500 goal) & future security.\n\nTip: You can customize your exact ratios in our interactive Practice Studio!";
      } else if (q.includes('emergency') || q.includes('fund') || q.includes('cushion') || q.includes('buffer')) {
        reply = "🛡️ Starting an emergency buffer is the #1 defense against student debt! We recommend aiming for $500 as your first target milestone. Even saving $25/week gets you to $500 in just 20 weeks. Keep this money in a separate high-yield savings account so you aren't tempted to swipe it.";
      } else if (q.includes('delivery') || q.includes('food') || q.includes('doordash') || q.includes('uber')) {
        reply = "🍔 Food delivery is the #1 stealth money leak for students! A $15 order frequently bills out at $30+ with service fees, tip, and markups. Try batch cooking on Sundays and keep emergency frozen meals on hand. If you do order takeout, walk to pick it up directly to save 40%!";
      } else if (q.includes('need') || q.includes('want') || q.includes('difference')) {
        reply = "🎯 Needs vs Wants Test: Ask yourself — 'If I didn't pay this, would my shelter, basic nutrition, or academic attendance be directly compromised within 30 days?' If no, it belongs to your 30% Wants category!";
      } else if (q.includes('textbook') || q.includes('books')) {
        reply = "📚 Textbook Pro-Tip: Never buy brand-new textbooks before Week 1 of lectures! Check if older editions are accepted, use your campus library 2-hour course reserves, or check OpenStax for free digital editions.";
      }

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: reply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 600);
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: '1',
        sender: 'bot',
        text: "👋 Hi! I'm your BudgetBasics Student AI Assistant. Ask me anything about managing allowances, the 50/30/20 rule, avoiding hidden fees, or building your first $500 emergency buffer!",
        time: 'Just now'
      }
    ]);
  };

  return (
    <div className="min-h-screen bg-[#f0f0f0] text-[#1a1919] font-sans antialiased pb-24 relative selection:bg-[#0922b0]/20 selection:text-[#0922b0]">
      
      {/* Sub-Header Breadcrumb */}
      <div className="border-b border-[#1a1919]/8 bg-white/70 backdrop-blur-md sticky top-[68px] z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono font-bold uppercase text-[#0922b0] bg-[#0922b0]/10 px-2.5 py-1 rounded-lg border border-[#0922b0]/20 flex items-center gap-1.5">
              04 · Connect Module
            </span>
            <span className="text-xs text-[#1a1919]/60 font-medium">
              / AI Q&A Budgeting Assistant
            </span>
          </div>
          <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#0922b0] bg-white px-3 py-1.5 rounded-xl border border-[#1a1919]/10 shadow-xs">
            AI POWERED
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-8">
        
        {/* 1. Hero Introduction */}
        <section className="bg-white rounded-3xl p-8 sm:p-10 border border-[#1a1919]/10 shadow-sm relative overflow-hidden">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0922b0]/10 border border-[#0922b0]/20 text-xs font-mono font-bold text-[#0922b0]">
              <Bot className="w-3.5 h-3.5" />
              <span>24/7 STUDENT AI ADVISOR</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-[#1a1919] leading-tight">
              AI Budgeting <span className="text-[#0922b0]">Assistant</span>
            </h1>
            <p className="text-sm sm:text-base text-[#1a1919]/75 leading-relaxed font-medium">
              Ask any question about student cash flow, managing allowances, splitting roommate costs, or dialing in your 50/30/20 proportions.
            </p>
          </div>
        </section>

        {/* 2. Interactive Chat Workspace */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Chat Interface */}
          <div className="lg:col-span-8 bg-white rounded-3xl border border-[#1a1919]/10 shadow-sm overflow-hidden flex flex-col h-[640px]">
            
            {/* Chat Header */}
            <div className="p-4 border-b border-[#1a1919]/10 bg-slate-50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#0922b0] text-white flex items-center justify-center">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#1a1919]">BudgetBee AI Engine</div>
                  <div className="text-[10px] font-mono text-[#0eb02c] font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0eb02c] animate-pulse"></span>
                    Online & Ready
                  </div>
                </div>
              </div>

              <button
                onClick={handleResetChat}
                className="p-2 text-[#1a1919]/50 hover:text-[#1a1919] hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
                title="Restart conversation"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            {/* Chat Messages Stream */}
            <div className="flex-1 p-5 overflow-y-auto space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.sender === 'bot' && (
                    <div className="w-7 h-7 rounded-lg bg-[#0922b0]/10 text-[#0922b0] flex items-center justify-center shrink-0 mt-0.5">
                      <Bot className="w-4 h-4" />
                    </div>
                  )}

                  <div
                    className={`max-w-[80%] p-4 rounded-2xl text-xs sm:text-sm leading-relaxed whitespace-pre-line shadow-xs ${
                      msg.sender === 'user'
                        ? 'bg-[#0922b0] text-white rounded-br-none'
                        : 'bg-slate-100 text-[#1a1919] rounded-bl-none'
                    }`}
                  >
                    {msg.text}
                    <div
                      className={`text-[9px] font-mono mt-1 text-right ${
                        msg.sender === 'user' ? 'text-white/60' : 'text-[#1a1919]/40'
                      }`}
                    >
                      {msg.time}
                    </div>
                  </div>

                  {msg.sender === 'user' && (
                    <div className="w-7 h-7 rounded-lg bg-slate-900 text-white flex items-center justify-center shrink-0 mt-0.5">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-3 items-center text-xs text-[#1a1919]/50 italic">
                  <div className="w-7 h-7 rounded-lg bg-[#0922b0]/10 text-[#0922b0] flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4" />
                  </div>
                  <span>BudgetBee is typing guidance...</span>
                </div>
              )}
            </div>

            {/* Suggested Starter Chips */}
            <div className="p-3 border-t border-[#1a1919]/8 bg-slate-50/50 flex flex-wrap gap-2">
              {samplePrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(prompt)}
                  className="px-3 py-1.5 rounded-xl bg-white border border-[#1a1919]/10 text-[11px] font-medium text-[#1a1919]/80 hover:border-[#0922b0] hover:text-[#0922b0] transition-colors cursor-pointer text-left"
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Chat Input Box */}
            <div className="p-4 border-t border-[#1a1919]/10 bg-white">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  placeholder="Ask a question about your student budget..."
                  className="flex-1 px-4 py-3 rounded-xl border border-[#1a1919]/15 text-xs sm:text-sm font-medium text-[#1a1919] bg-slate-50 focus:bg-white focus:outline-none focus:border-[#0922b0]"
                />
                <button
                  type="submit"
                  disabled={!inputVal.trim() || isTyping}
                  className="px-5 py-3 rounded-xl bg-[#0922b0] hover:bg-[#071a8a] text-white text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-xs disabled:opacity-50 active:scale-95 shrink-0"
                >
                  <span>Send</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>

          </div>

          {/* Right Sidebar Info & Human Advisor Clinic */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Human Peer Clinic Card */}
            <div className="bg-[#0922b0] text-white rounded-3xl p-7 shadow-xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-mono font-bold">
                <Mail className="w-3.5 h-3.5" />
                <span>HUMAN 1-ON-1 CLINIC</span>
              </div>
              <h3 className="text-xl font-black">Need custom advice from a human student advisor?</h3>
              <p className="text-xs text-white/80 leading-relaxed">
                Book a confidential 15-minute peer advising slot with our trained student finance team or drop by our weekly campus clinic.
              </p>
              <button
                onClick={() => {
                  if (onNavigateToContact) onNavigateToContact();
                  else window.location.hash = '#contact';
                }}
                className="w-full py-3 bg-[#0eb02c] hover:bg-[#0c9626] text-white text-xs font-bold rounded-xl shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95"
              >
                <span>Book Peer Advisor Session</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Disclaimer Card */}
            <div className="bg-white rounded-3xl p-6 border border-[#1a1919]/10 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-[#1a1919]">
                <ShieldCheck className="w-4 h-4 text-[#0eb02c]" />
                <span>Educational Guidance Notice</span>
              </div>
              <p className="text-xs text-[#1a1919]/65 leading-relaxed">
                BudgetBasics AI is designed for educational simulations and financial literacy principles. We never ask for or store bank credentials or real personal identity data.
              </p>
            </div>

          </div>

        </section>

      </main>
    </div>
  );
};
