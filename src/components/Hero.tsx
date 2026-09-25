import React, { useState } from 'react';
import { Sparkles, ArrowRight, Check, Copy, Code2, Cpu } from 'lucide-react';

interface HeroProps {
  onExplorePlayground: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExplorePlayground }) => {
  const [copied, setCopied] = useState(false);
  const installCmd = 'npm install -g @nexus-ai/engine';

  const handleCopy = () => {
    navigator.clipboard.writeText(installCmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative pt-12 md:pt-16 pb-16 overflow-hidden border-b border-white/[0.06]">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[360px] bg-brand-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[300px] h-[200px] bg-cyanAccent/10 rounded-full blur-[90px] pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* 1. Eyebrow */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-100/90 border border-white/10 text-xs font-mono text-zinc-300 mb-6 animate-fade-in shadow-inner-specular">
          <span className="flex h-2 w-2 rounded-full bg-cyanAccent animate-pulse" />
          <span>ENGINEERING RUNTIME 3.4 · AST MULTI-AGENT</span>
        </div>

        {/* 2. Headline (Strict Max 2 lines) */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-white max-w-4xl leading-[1.1] mb-5">
          Deterministic Code Synthesis <br className="hidden sm:inline" />
          at <span className="bg-gradient-to-r from-brand-400 via-indigo-200 to-cyanAccent bg-clip-text text-transparent">Compiler Speed</span>.
        </h1>

        {/* 3. Subtext (Strict < 20 words, max 2-3 lines) */}
        <p className="text-base sm:text-lg text-zinc-400 max-w-2xl leading-relaxed mb-8">
          AST-aware autonomous multi-agent synthesis that parses, formally verifies, and commits type-safe pull requests in milliseconds.
        </p>

        {/* 4. CTAs (Primary + Secondary) */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto mb-10">
          <button
            onClick={onExplorePlayground}
            className="w-full sm:w-auto px-6 py-3 rounded-lg bg-brand-500 hover:bg-brand-600 text-white font-medium text-sm flex items-center justify-center gap-2 shadow-glow transition-all active:scale-[0.98]"
            id="hero-primary-cta"
          >
            <Sparkles className="w-4 h-4" />
            <span>Open Interactive Playground</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <a
            href="#architecture"
            className="w-full sm:w-auto px-6 py-3 rounded-lg bg-surface-100 hover:bg-surface-50 text-zinc-200 hover:text-white border border-white/10 font-medium text-sm flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
            id="hero-secondary-cta"
          >
            <Cpu className="w-4 h-4 text-zinc-400" />
            <span>View Architecture</span>
          </a>
        </div>

        {/* CLI Fast Install Chip */}
        <div className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-surface-200 border border-white/10 text-xs font-mono text-zinc-300">
          <Code2 className="w-3.5 h-3.5 text-brand-400" />
          <span className="text-zinc-500">$</span>
          <span>{installCmd}</span>
          <button
            onClick={handleCopy}
            className="ml-2 p-1 rounded hover:bg-white/10 text-zinc-400 hover:text-zinc-100 transition-colors"
            title="Copy command"
            id="hero-copy-cmd-btn"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>
    </section>
  );
};
