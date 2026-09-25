import React, { useState } from 'react';
import {
  Cpu,
  ShieldCheck,
  Zap,
  Network,
  GitBranch,
  Terminal,
  Activity,
  CheckCircle,
  Clock,
} from 'lucide-react';

export const BentoShowcase: React.FC = () => {
  const [activePipelineStep, setActivePipelineStep] = useState(2);
  const [cacheEngineState, setCacheEngineState] = useState<'hot' | 'warm' | 'cold'>('hot');

  const pipelineSteps = [
    { name: 'Lexer & AST Parser', speed: '14ms', status: 'Optimal' },
    { name: 'Semantic Type Graph', speed: '22ms', status: 'Optimal' },
    { name: 'Multi-Agent Synthesizer', speed: '68ms', status: 'Active' },
    { name: 'Formal Proof Engine', speed: '11ms', status: 'Passed' },
  ];

  return (
    <section id="architecture" className="py-20 border-t border-white/[0.06] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-medium text-cyanAccent uppercase tracking-wider mb-2">
            <Network className="w-3.5 h-3.5" />
            <span>Architecture & Soundness</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight mb-3">
            Engineered for Provable Soundness
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            Unlike probabilistic copilot chat wrappers, Nexus enforces deterministic compiler grammar rules before any pull request is submitted.
          </p>
        </div>

        {/* Bento Grid: 4 Varied Architectural Cells */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Cell 1: Span 7 - Interactive AST Pipeline Engine */}
          <div className="md:col-span-7 glass-card rounded-2xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden group glass-card-hover">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/10 rounded-full blur-[80px] pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center text-brand-400">
                  <Cpu className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-surface-100 border border-white/5 text-zinc-400">
                  Total Engine Latency: <strong className="text-white">115ms</strong>
                </span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                4-Stage Parallel AST Execution Pipeline
              </h3>
              <p className="text-sm text-zinc-400 mb-6 max-w-lg leading-relaxed">
                Source files are tokenized directly into high-dimensional AST vectors. Synthesizers operate purely on validated grammatical nodes rather than raw hallucinated tokens.
              </p>
            </div>

            {/* Pipeline Step Interactive Visualizer */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-4 border-t border-white/5">
              {pipelineSteps.map((step, idx) => (
                <button
                  key={step.name}
                  onClick={() => setActivePipelineStep(idx)}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    activePipelineStep === idx
                      ? 'bg-brand-500/15 border-brand-500/50 text-white shadow-sm'
                      : 'bg-surface-300/80 border-white/5 text-zinc-400 hover:border-white/15'
                  }`}
                >
                  <div className="text-[10px] font-mono text-zinc-500 uppercase mb-1">0{idx + 1}</div>
                  <div className="text-xs font-semibold text-zinc-200 line-clamp-1">{step.name}</div>
                  <div className="text-[11px] font-mono text-brand-400 mt-2 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {step.speed}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Cell 2: Span 5 - Zero Hallucination Guarantee */}
          <div className="md:col-span-5 glass-card rounded-2xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden group glass-card-hover">
            <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-cyanAccent/10 rounded-full blur-[70px] pointer-events-none" />

            <div>
              <div className="w-10 h-10 rounded-xl bg-cyanAccent/10 border border-cyanAccent/20 flex items-center justify-center text-cyanAccent mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Formal AST Type Checker
              </h3>
              <p className="text-sm text-zinc-400 mb-6 leading-relaxed">
                Zero compiler-breaking outputs. Every generated line is run through a sandboxed TypeScript / Rust / Go typechecker before reaching your git tree.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-surface-300/90 border border-white/5 font-mono text-xs space-y-2">
              <div className="flex items-center justify-between text-zinc-400">
                <span>AST Constraint Matrix</span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" />
                  Passed
                </span>
              </div>
              <div className="h-1.5 w-full bg-surface-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full w-full" />
              </div>
              <div className="text-[11px] text-zinc-500 flex justify-between pt-1">
                <span>Cyclomatic Depth &lt; 8</span>
                <span>Type Soundness: 100%</span>
              </div>
            </div>
          </div>

          {/* Cell 3: Span 5 - Sub-10ms Local-First Cache Engine */}
          <div className="md:col-span-5 glass-card rounded-2xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden group glass-card-hover">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <Zap className="w-5 h-5" />
                </div>
                {/* State toggle */}
                <div className="flex items-center gap-1 p-0.5 rounded-md bg-surface-300 border border-white/5 text-[11px] font-mono">
                  {(['hot', 'warm', 'cold'] as const).map((mode) => (
                    <button
                      key={mode}
                      onClick={() => setCacheEngineState(mode)}
                      className={`px-2 py-0.5 rounded capitalize transition-colors ${
                        cacheEngineState === mode
                          ? 'bg-emerald-500/20 text-emerald-300 font-medium'
                          : 'text-zinc-500 hover:text-zinc-300'
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>

              <h3 className="text-xl font-semibold text-white mb-2">
                Local-First Vector Cache
              </h3>
              <p className="text-sm text-zinc-400 mb-6 leading-relaxed">
                Repository embeddings are calculated once and stored locally in memory with sub-10ms warm retrieval.
              </p>
            </div>

            <div className="flex items-baseline justify-between p-4 rounded-xl bg-surface-300/90 border border-white/5 font-mono">
              <div>
                <div className="text-[10px] uppercase text-zinc-500">Cache Latency</div>
                <div className="text-2xl font-bold text-white">
                  {cacheEngineState === 'hot' && '4.2ms'}
                  {cacheEngineState === 'warm' && '18.6ms'}
                  {cacheEngineState === 'cold' && '84.1ms'}
                </div>
              </div>
              <div className="text-right">
                <div className="text-[10px] uppercase text-zinc-500">Hit Rate</div>
                <div className="text-sm font-semibold text-emerald-400">96.8% Average</div>
              </div>
            </div>
          </div>

          {/* Cell 4: Span 7 - Multi-Agent Git Isolation & Security */}
          <div className="md:col-span-7 glass-card rounded-2xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden group glass-card-hover">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                  <GitBranch className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-surface-100 border border-white/5 text-zinc-400">
                  SOC2 Type II Certified
                </span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                eBPF Sandboxed Multi-Agent Orchestrator
              </h3>
              <p className="text-sm text-zinc-400 mb-6 max-w-lg leading-relaxed">
                Agents execute inside ephemeral Linux microVMs with strict network egress filtering. Code never leaves your secure enterprise boundary.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3 rounded-lg bg-surface-300 border border-white/5 flex items-center gap-3">
                <Activity className="w-4 h-4 text-brand-400 shrink-0" />
                <div className="text-xs font-mono">
                  <div className="text-zinc-200 font-medium">Zero-Leakage</div>
                  <div className="text-[10px] text-zinc-500">No telemetry retained</div>
                </div>
              </div>
              <div className="p-3 rounded-lg bg-surface-300 border border-white/5 flex items-center gap-3">
                <Terminal className="w-4 h-4 text-cyanAccent shrink-0" />
                <div className="text-xs font-mono">
                  <div className="text-zinc-200 font-medium">Wasm MicroVM</div>
                  <div className="text-[10px] text-zinc-500">Isolated memory heap</div>
                </div>
              </div>
              <div className="p-3 rounded-lg bg-surface-300 border border-white/5 flex items-center gap-3">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <div className="text-xs font-mono">
                  <div className="text-zinc-200 font-medium">Self-Host Ready</div>
                  <div className="text-[10px] text-zinc-500">On-premise airgap</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
