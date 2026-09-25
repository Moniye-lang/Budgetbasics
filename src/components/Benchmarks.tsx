import React from 'react';
import { BarChart3, TrendingUp, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

export const Benchmarks: React.FC = () => {
  const metrics = [
    {
      name: 'Compiler Syntax Pass Rate',
      nexus: '100.0%',
      copilot: '84.2%',
      rawLlm: '72.6%',
      highlight: true,
      description: 'Percentage of generated code blocks compiling with 0 syntax or type errors.',
    },
    {
      name: 'Multi-File Dependency Integrity',
      nexus: '99.4%',
      copilot: '51.8%',
      rawLlm: '38.0%',
      highlight: true,
      description: 'Preservation of type signatures across cross-module imports.',
    },
    {
      name: 'Average AST Synthesis Latency',
      nexus: '124ms',
      copilot: '840ms',
      rawLlm: '1,420ms',
      highlight: false,
      description: 'End-to-end tokenization, AST constraint verification, and output generation.',
    },
    {
      name: 'Redundant Token Overhead',
      nexus: '-78%',
      copilot: '+12%',
      rawLlm: '+45%',
      highlight: false,
      description: 'Reduction in wasted context window tokens via AST pruning.',
    },
  ];

  return (
    <section id="benchmarks" className="py-20 border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono font-medium text-brand-400 uppercase tracking-wider mb-2">
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Independent Benchmarks</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight">
              Deterministic AST vs. Raw LLM Generation
            </h2>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-100 border border-white/10 text-xs font-mono text-zinc-400">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
            <span>Benchmark Dataset: 10,000 TypeScript & Rust ASTs</span>
          </div>
        </div>

        {/* Benchmark Matrix Table */}
        <div className="glass-card rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-surface-200/90 text-xs font-mono text-zinc-400 uppercase">
                  <th className="py-4 px-6 font-semibold">Evaluation Metric</th>
                  <th className="py-4 px-6 font-semibold text-brand-300 bg-brand-500/10 border-x border-brand-500/20">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-brand-400" />
                      <span>Nexus Engine v3.4</span>
                    </div>
                  </th>
                  <th className="py-4 px-6 font-semibold text-zinc-300">Standard Code Copilots</th>
                  <th className="py-4 px-6 font-semibold text-zinc-400">Raw Frontier LLMs</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-sm">
                {metrics.map((m, idx) => (
                  <tr key={idx} className="hover:bg-surface-100/40 transition-colors">
                    <td className="py-5 px-6">
                      <div className="font-medium text-white">{m.name}</div>
                      <div className="text-xs text-zinc-500 mt-0.5">{m.description}</div>
                    </td>
                    <td className="py-5 px-6 font-mono font-bold text-emerald-400 bg-brand-500/5 border-x border-brand-500/10">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>{m.nexus}</span>
                      </div>
                    </td>
                    <td className="py-5 px-6 font-mono text-zinc-300">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-amber-400/80 shrink-0" />
                        <span>{m.copilot}</span>
                      </div>
                    </td>
                    <td className="py-5 px-6 font-mono text-zinc-400">
                      <div className="flex items-center gap-2">
                        <XCircle className="w-4 h-4 text-red-400/70 shrink-0" />
                        <span>{m.rawLlm}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};
