import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FaqItem {
  q: string;
  a: string;
}

const FAQS: FaqItem[] = [
  {
    q: 'How does AST-aware synthesis differ from standard LLM code generation?',
    a: 'Standard LLMs predict raw token streams probabilistically, often generating subtle syntax errors, hallucinated API methods, and type mismatches. Nexus tokenizes source files directly into Abstract Syntax Trees (ASTs), executes multi-agent graph traversals, and enforces compiler verification before outputting code.',
  },
  {
    q: 'Is my proprietary source code ever used to train public models?',
    a: 'No. Nexus enforces a strict zero-retention data privacy architecture. Embeddings and vector representations are computed in-memory or on-premise, and telemetry logs never store raw source code or intellectual property.',
  },
  {
    q: 'Can Nexus be integrated directly into our CI/CD pipelines?',
    a: 'Yes. The Nexus CLI can run as a native GitHub Action, GitLab CI step, or pre-commit hook (nexus check --ci). It blocks PR merges that violate AST type constraints or introduce dead execution branches.',
  },
  {
    q: 'Which programming languages and compilers are currently supported?',
    a: 'Nexus v3.4 natively supports TypeScript / JavaScript (v8 / swc AST), Rust (rustc / syn AST), Go (golang ast), Python (CPython ast / mypy), and SQL (PostgreSQL / SQLite dialect parsers).',
  },
  {
    q: 'Can we self-host Nexus on air-gapped infrastructure?',
    a: 'Yes. The Enterprise Airgap tier provides self-contained Docker and Helm charts that can be deployed on AWS EKS, GCP GKE, or bare-metal Kubernetes with zero outbound internet connectivity.',
  },
];

export const FaqAccordion: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section className="py-20 border-t border-white/[0.06] bg-surface-300/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-medium text-brand-400 uppercase tracking-wider mb-2">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Technical FAQ</span>
          </div>
          <h2 className="text-3xl font-semibold text-white tracking-tight">
            Frequently Asked Engineering Questions
          </h2>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="glass-card rounded-xl border border-white/10 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 font-medium text-white hover:text-brand-300 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base">{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-zinc-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-brand-400' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-4 pt-1 text-sm text-zinc-400 leading-relaxed border-t border-white/5">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
