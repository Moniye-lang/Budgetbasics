import React, { useState } from 'react';
import { 
  Send, 
  Mail, 
  MessageSquare, 
  MapPin, 
  Clock, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  Calendar, 
  ChevronDown, 
  HelpCircle, 
  GraduationCap, 
  Bot,
  AlertCircle
} from 'lucide-react';
import { DotLottiePlayer } from '../components/DotLottiePlayer';
import { contactEmailLottieJson } from '../data/contactLottie';

interface ContactPageProps {
  onBackToHome?: () => void;
  onNavigateTo?: (page: 'home' | 'learn' | 'practice' | 'resources' | 'connect' | 'contact', hash?: string) => void;
  onOpenConverterModal?: () => void;
}

interface ContactInquiry {
  fullName: string;
  email: string;
  institution: string;
  category: string;
  urgency: string;
  message: string;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigateTo }) => {
  const [formData, setFormData] = useState<ContactInquiry>({
    fullName: '',
    email: '',
    institution: '',
    category: 'Budgeting Question',
    urgency: 'Normal',
    message: ''
  });

  const [formErrors, setFormErrors] = useState<Partial<Record<keyof ContactInquiry, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<ContactInquiry | null>(null);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const contactFaqs = [
    {
      q: "How quickly does the peer team respond to inquiries?",
      a: "Our student advisors review incoming clinic submissions within 24 to 48 hours during active semester weeks (Mon–Fri)."
    },
    {
      q: "Can I book a 1-on-1 virtual budgeting session?",
      a: "Yes! Select 'Peer Clinic 1-on-1 Request' in the form above and mention your preferred time slots. We'll send you a private calendar link."
    },
    {
      q: "Is my personal financial information safe when I send a message?",
      a: "All form checks and interactions on BudgetBasics are client-side only. We do not store or transmit financial passwords or account numbers."
    },
    {
      q: "Can the AI Assistant answer my question immediately?",
      a: "Yes! For instant answers on 50/30/20 splits, emergency cushion benchmarks, or student cashflow formulas, check out our AI Q&A Assistant."
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formErrors[name as keyof ContactInquiry]) {
      setFormErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = () => {
    const errors: Partial<Record<keyof ContactInquiry, string>> = {};
    if (!formData.fullName.trim()) errors.fullName = 'Please provide your name';
    if (!formData.email.trim()) {
      errors.email = 'Please provide your email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please provide a valid email address';
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters';
    }
    return errors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedData({ ...formData });
      setFormData({
        fullName: '',
        email: '',
        institution: '',
        category: 'Budgeting Question',
        urgency: 'Normal',
        message: ''
      });
    }, 900);
  };

  return (
    <div className="min-h-screen bg-[#f0f0f0] text-[#1a1919] font-sans selection:bg-[#0922b0]/20 selection:text-[#0922b0]">
      {/* In-Page Sub-Header */}
      <div className="border-b border-[#1a1919]/8 bg-white/60 backdrop-blur-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono font-bold uppercase text-[#0922b0] bg-[#0922b0]/10 px-2.5 py-1 rounded-lg">
              06 · Contact & Clinic
            </span>
            <span className="hidden sm:inline text-xs text-[#1a1919]/60 font-medium">
              / Peer Advisory Clinic & Direct Support Inquiry
            </span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0eb02c]/10 text-[#0eb02c] border border-[#0eb02c]/20 text-[11px] font-mono font-bold">
            <span className="w-2 h-2 rounded-full bg-[#0eb02c] animate-pulse" />
            <span>Clinic Open · Drop-in Available</span>
          </div>
        </div>
      </div>

      {/* 2. Hero Section */}
      <section className="pt-10 pb-12 sm:pt-14 sm:pb-16 border-b border-[#1a1919]/10 relative overflow-hidden bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0922b0]/10 border border-[#0922b0]/20 text-xs font-mono font-bold text-[#0922b0]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>STUDENT SUPPORT & ADVICE CLINIC</span>
              </div>
              
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1a1919] tracking-tight leading-[1.15]">
                Get In Touch With The <br className="hidden sm:inline" />
                <span className="font-serif italic font-normal text-[#0922b0]">BudgetBasics</span> Team.
              </h1>

              <p className="text-[#1a1919]/70 text-sm sm:text-base leading-relaxed max-w-xl font-medium">
                Have a question about your monthly allocation, need help with our interactive planners, or want to book a free 1-on-1 peer financial guidance session? We’re here to help.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3 text-xs font-semibold text-[#1a1919]/70">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#1a1919]/10 shadow-2xs">
                  <Clock className="w-4 h-4 text-[#0eb02c]" />
                  <span>Avg Reply: &lt; 24h</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#1a1919]/10 shadow-2xs">
                  <GraduationCap className="w-4 h-4 text-[#0922b0]" />
                  <span>Aptech ADSE Student Advisors</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#1a1919]/10 shadow-2xs">
                  <ShieldCheck className="w-4 h-4 text-[#0eb02c]" />
                  <span>100% Free & Confidential</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-sm p-6 rounded-3xl bg-white border border-[#1a1919]/10 shadow-xl relative text-center space-y-4">
                <div className="w-24 h-24 mx-auto relative flex items-center justify-center rounded-2xl bg-gradient-to-br from-[#0922b0]/5 via-white to-[#0eb02c]/5 border border-[#0922b0]/15 shadow-inner overflow-hidden p-2">
                  <DotLottiePlayer
                    animationData={contactEmailLottieJson}
                    src="/contact-email-lottie.json"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#1a1919]">Need Instant Answers?</h3>
                  <p className="text-xs text-[#1a1919]/65 mt-1">
                    Try our AI Q&A Assistant trained specifically on student budgeting rules.
                  </p>
                </div>
                <button
                  onClick={() => {
                    if (onNavigateTo) onNavigateTo('connect', 'connect-page');
                    else window.location.hash = 'connect-page';
                  }}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#0922b0] hover:bg-[#071a8a] text-white text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Bot className="w-4 h-4" />
                  <span>Launch AI Assistant ↗</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Main Content: Contact Form & Quick Channels */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: Client-side Contact Form */}
            <div className="lg:col-span-7 space-y-6">
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#1a1919]/10 shadow-sm relative">
                <div className="flex items-center justify-between pb-5 border-b border-[#1a1919]/10 mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-[#1a1919] tracking-tight">Send a Message</h2>
                    <p className="text-xs text-[#1a1919]/60 mt-0.5 font-medium">
                      Fill out the details below and our team will get back to you.
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-2xl bg-[#0eb02c]/10 text-[#0eb02c] flex items-center justify-center font-bold">
                    <Mail className="w-5 h-5" />
                  </div>
                </div>

                {submittedData ? (
                  <div className="py-8 px-6 text-center space-y-4 bg-[#0eb02c]/5 rounded-2xl border border-[#0eb02c]/20 animate-in fade-in zoom-in-95">
                    <div className="w-12 h-12 rounded-full bg-[#0eb02c] text-white flex items-center justify-center mx-auto shadow-md">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-lg font-bold text-[#1a1919]">Message Prepared Successfully!</h3>
                      <p className="text-xs text-[#1a1919]/70 max-w-md mx-auto">
                        Thank you <span className="font-bold text-[#1a1919]">{submittedData.fullName}</span>. Your inquiry regarding <span className="font-bold text-[#0922b0]">{submittedData.category}</span> has been simulated in this client-side demo environment.
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-white border border-[#1a1919]/10 text-left text-xs font-mono text-[#1a1919]/70 space-y-1 max-w-sm mx-auto">
                      <div><span className="text-[#1a1919]/40">Email:</span> {submittedData.email}</div>
                      <div><span className="text-[#1a1919]/40">Urgency:</span> {submittedData.urgency}</div>
                      <div><span className="text-[#1a1919]/40">Status:</span> Client-side verified ✓</div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setSubmittedData(null)}
                      className="px-5 py-2.5 rounded-xl bg-[#0922b0] hover:bg-[#071a8a] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Full Name */}
                      <div>
                        <label className="text-xs font-bold text-[#1a1919] block mb-1.5">
                          Full Name <span className="text-[#d12828]">*</span>
                        </label>
                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          placeholder="e.g. Alex Morgan"
                          className={`w-full px-4 py-2.5 rounded-xl bg-[#f0f0f0] border text-xs font-medium text-[#1a1919] focus:outline-none transition-all ${
                            formErrors.fullName 
                              ? 'border-[#d12828] focus:border-[#d12828]' 
                              : 'border-transparent focus:border-[#0922b0] focus:bg-white'
                          }`}
                        />
                        {formErrors.fullName && (
                          <span className="text-[11px] text-[#d12828] font-medium mt-1 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" /> {formErrors.fullName}
                          </span>
                        )}
                      </div>

                      {/* Email Address */}
                      <div>
                        <label className="text-xs font-bold text-[#1a1919] block mb-1.5">
                          Student / Personal Email <span className="text-[#d12828]">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="alex@university.edu"
                          className={`w-full px-4 py-2.5 rounded-xl bg-[#f0f0f0] border text-xs font-medium text-[#1a1919] focus:outline-none transition-all ${
                            formErrors.email 
                              ? 'border-[#d12828] focus:border-[#d12828]' 
                              : 'border-transparent focus:border-[#0922b0] focus:bg-white'
                          }`}
                        />
                        {formErrors.email && (
                          <span className="text-[11px] text-[#d12828] font-medium mt-1 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" /> {formErrors.email}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Institution */}
                      <div>
                        <label className="text-xs font-bold text-[#1a1919] block mb-1.5">
                          Institution / Campus <span className="text-[#1a1919]/40">(Optional)</span>
                        </label>
                        <input
                          type="text"
                          name="institution"
                          value={formData.institution}
                          onChange={handleInputChange}
                          placeholder="e.g. Aptech Center / University"
                          className="w-full px-4 py-2.5 rounded-xl bg-[#f0f0f0] border border-transparent focus:border-[#0922b0] focus:bg-white text-xs font-medium text-[#1a1919] focus:outline-none transition-all"
                        />
                      </div>

                      {/* Category */}
                      <div>
                        <label className="text-xs font-bold text-[#1a1919] block mb-1.5">
                          Inquiry Category
                        </label>
                        <select
                          name="category"
                          value={formData.category}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2.5 rounded-xl bg-[#f0f0f0] border border-transparent focus:border-[#0922b0] focus:bg-white text-xs font-medium text-[#1a1919] focus:outline-none transition-all cursor-pointer"
                        >
                          <option value="Budgeting Question">Budgeting Question / 50-30-20</option>
                          <option value="Peer Clinic 1-on-1 Request">Peer Clinic 1-on-1 Request</option>
                          <option value="Feature Suggestion">Feature / Tool Suggestion</option>
                          <option value="Report an Issue">Report a Bug / Calculation Typo</option>
                          <option value="General Inquiry">General Project Inquiry</option>
                        </select>
                      </div>
                    </div>

                    {/* Urgency */}
                    <div>
                      <label className="text-xs font-bold text-[#1a1919] block mb-1.5">
                        Urgency Level
                      </label>
                      <div className="grid grid-cols-3 gap-2.5">
                        {['Casual / General', 'Normal', 'Urgent (Semester Deadline)'].map((lvl) => (
                          <button
                            type="button"
                            key={lvl}
                            onClick={() => setFormData(prev => ({ ...prev, urgency: lvl }))}
                            className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all text-center ${
                              formData.urgency === lvl
                                ? 'bg-[#0922b0] text-white border-[#0922b0] shadow-2xs'
                                : 'bg-[#f0f0f0] hover:bg-slate-200 text-[#1a1919]/70 border-transparent'
                            }`}
                          >
                            {lvl}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-xs font-bold text-[#1a1919]">
                          Message / Case Description <span className="text-[#d12828]">*</span>
                        </label>
                        <span className="text-[11px] font-mono text-[#1a1919]/50">
                          {formData.message.length} chars
                        </span>
                      </div>
                      <textarea
                        rows={4}
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Tell us what you need help with (e.g., 'I want help splitting my $800 semester allowance between groceries and rent...')"
                        className={`w-full px-4 py-3 rounded-xl bg-[#f0f0f0] border text-xs font-medium text-[#1a1919] focus:outline-none transition-all resize-none ${
                          formErrors.message 
                            ? 'border-[#d12828] focus:border-[#d12828]' 
                            : 'border-transparent focus:border-[#0922b0] focus:bg-white'
                        }`}
                      />
                      {formErrors.message && (
                        <span className="text-[11px] text-[#d12828] font-medium mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {formErrors.message}
                        </span>
                      )}
                    </div>

                    {/* Privacy Note */}
                    <div className="p-3 rounded-xl bg-[#f0f0f0] border border-[#1a1919]/10 text-[11px] text-[#1a1919]/60 flex items-start gap-2">
                      <ShieldCheck className="w-4 h-4 text-[#0eb02c] shrink-0 mt-0.5" />
                      <p>
                        Client-side privacy pledge: Submissions are strictly educational. We do not store or transmit financial credentials or bank passwords.
                      </p>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 px-6 rounded-xl bg-[#0922b0] hover:bg-[#071a8a] text-white text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-sm hover:shadow-md cursor-pointer disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Validating Submission...</span>
                        </span>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Send Message to Peer Advisors</span>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Right Column: Direct Channels & Hours */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Card 1: Peer Clinic Hours */}
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#1a1919]/10 shadow-sm space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#0eb02c]/10 text-[#0eb02c] flex items-center justify-center font-bold">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-[#1a1919]">Peer Clinic Hours</h3>
                    <p className="text-[11px] text-[#1a1919]/60 font-medium">Drop-in virtual & campus sessions</p>
                  </div>
                </div>

                <div className="space-y-2.5 text-xs font-medium">
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#f0f0f0]">
                    <span className="text-[#1a1919]">Monday – Thursday</span>
                    <span className="font-mono font-bold text-[#0922b0]">2:00 PM – 5:00 PM</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#f0f0f0]">
                    <span className="text-[#1a1919]">Friday Review Lab</span>
                    <span className="font-mono font-bold text-[#0eb02c]">1:00 PM – 4:00 PM</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#f0f0f0]">
                    <span className="text-[#1a1919]">Weekends & Recess</span>
                    <span className="font-mono text-[#1a1919]/50">AI Assistant Only</span>
                  </div>
                </div>
              </div>

              {/* Card 2: Quick Connect Channels */}
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#1a1919]/10 shadow-sm space-y-4">
                <h3 className="font-bold text-sm text-[#1a1919]">Direct Connect Channels</h3>

                <div className="space-y-3">
                  <div className="p-3.5 rounded-2xl bg-[#f0f0f0] border border-[#1a1919]/5 flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-[#0922b0]/10 text-[#0922b0] flex items-center justify-center shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#1a1919]">Official Email</div>
                      <div className="text-[11px] font-mono text-[#0922b0] font-semibold">support@budgetbasics.guide</div>
                      <div className="text-[10px] text-[#1a1919]/50 mt-0.5">Checked twice daily by the research team</div>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-[#f0f0f0] border border-[#1a1919]/5 flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-[#0eb02c]/10 text-[#0eb02c] flex items-center justify-center shrink-0">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#1a1919]">Campus Hub</div>
                      <div className="text-[11px] text-[#1a1919]/70 font-medium">Aptech ADSE Innovation Center · Lab 04</div>
                      <div className="text-[10px] text-[#1a1919]/50 mt-0.5">Student development incubator</div>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-[#f0f0f0] border border-[#1a1919]/5 flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-[#d12828]/10 text-[#d12828] flex items-center justify-center shrink-0">
                      <MessageSquare className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#1a1919]">Community Chat</div>
                      <div className="text-[11px] text-[#1a1919]/70 font-medium">Weekly Discord & Zoom budget workshops</div>
                      <div className="text-[10px] text-[#1a1919]/50 mt-0.5">Open to all participating undergraduates</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 3: Quick Navigation to Other Modules */}
              <div className="p-5 rounded-3xl bg-gradient-to-br from-[#0922b0]/5 via-white to-[#0eb02c]/5 border border-[#0922b0]/15 space-y-3">
                <h4 className="text-xs font-bold text-[#1a1919] uppercase tracking-wider font-mono">Explore Other Modules</h4>
                <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
                  <button
                    onClick={() => {
                      if (onNavigateTo) onNavigateTo('learn', 'learn-page');
                      else window.location.hash = 'learn-page';
                    }}
                    className="p-2.5 rounded-xl bg-white hover:bg-slate-50 border border-[#1a1919]/10 text-left transition-all hover:text-[#0922b0]"
                  >
                    📖 Learn (30 Deck)
                  </button>
                  <button
                    onClick={() => {
                      if (onNavigateTo) onNavigateTo('practice', 'practice-page');
                      else window.location.hash = 'practice-page';
                    }}
                    className="p-2.5 rounded-xl bg-white hover:bg-slate-50 border border-[#1a1919]/10 text-left transition-all hover:text-[#0eb02c]"
                  >
                    📋 Practice Studio
                  </button>
                  <button
                    onClick={() => {
                      if (onNavigateTo) onNavigateTo('resources', 'resources-page');
                      else window.location.hash = 'resources-page';
                    }}
                    className="p-2.5 rounded-xl bg-white hover:bg-slate-50 border border-[#1a1919]/10 text-left transition-all hover:text-[#0922b0]"
                  >
                    🔍 Resource Vault
                  </button>
                  <button
                    onClick={() => {
                      if (onNavigateTo) onNavigateTo('connect', 'about-page');
                      else window.location.hash = 'about-page';
                    }}
                    className="p-2.5 rounded-xl bg-white hover:bg-slate-50 border border-[#1a1919]/10 text-left transition-all hover:text-[#0eb02c]"
                  >
                    👥 About Us Team
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Frequently Asked Questions Section */}
      <section className="py-12 bg-white/70 border-t border-[#1a1919]/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="text-center space-y-1.5">
            <h2 className="text-2xl font-bold text-[#1a1919] tracking-tight">Contact & Clinic FAQs</h2>
            <p className="text-xs sm:text-sm text-[#1a1919]/60 font-medium">Quick answers to common student communication inquiries.</p>
          </div>

          <div className="space-y-3">
            {contactFaqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div 
                  key={idx}
                  className="rounded-2xl bg-white border border-[#1a1919]/10 overflow-hidden shadow-2xs transition-all"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full p-4 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/50"
                  >
                    <span className="font-bold text-xs sm:text-sm text-[#1a1919] flex items-center gap-2">
                      <HelpCircle className="w-4 h-4 text-[#0922b0] shrink-0" />
                      <span>{faq.q}</span>
                    </span>
                    <ChevronDown className={`w-4 h-4 text-[#1a1919]/40 transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180 text-[#0922b0]' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 pt-1 text-xs text-[#1a1919]/70 leading-relaxed border-t border-[#1a1919]/5">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
