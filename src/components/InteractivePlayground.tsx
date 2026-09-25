import React, { useState } from 'react';
import {
  Play,
  CheckCircle2,
  Cpu,
  Layers,
  Zap,
  Code2,
  Copy,
  Check,
  RotateCcw,
  Sparkles,
  GitCompare,
} from 'lucide-react';

interface PresetTask {
  id: string;
  title: string;
  lang: string;
  sourceCode: string;
  synthesizedCode: string;
  astMetrics: {
    nodesAnalyzed: number;
    latencyMs: number;
    typeSafetyScore: string;
    compressionRatio: string;
  };
  astTree: string[];
}

const PRESETS: PresetTask[] = [
  {
    id: 'sql-prisma',
    title: 'Raw SQL ➔ TypeSafe Prisma AST',
    lang: 'typescript',
    sourceCode: `// Unsafe dynamic query with potential SQL injection & missing relations
async function fetchUserOrders(userId: string, status: string) {
  const query = \`SELECT u.id, u.email, o.id as order_id, o.amount, o.created_at
                 FROM users u 
                 LEFT JOIN orders o ON o.user_id = u.id 
                 WHERE u.id = '\${userId}' AND o.status = '\${status}'\`;
  return await db.raw(query);
}`,
    synthesizedCode: `// [Nexus AST Synthesizer] Verified Type-Safe Query with Strict Relation Select
import { prisma } from "@/lib/db";
import { z } from "zod";

export const UserOrdersFilterSchema = z.object({
  userId: z.string().uuid(),
  status: z.enum(["PENDING", "COMPLETED", "REFUNDED"]),
});

export async function fetchUserOrders(params: z.infer<typeof UserOrdersFilterSchema>) {
  const { userId, status } = UserOrdersFilterSchema.parse(params);
  
  return await prisma.user.findUniqueOrThrow({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      orders: {
        where: { status },
        select: {
          id: true,
          amount: true,
          createdAt: true,
        },
        orderBy: { createdAt: "desc" },
      },
    },
  });
}`,
    astMetrics: {
      nodesAnalyzed: 412,
      latencyMs: 124,
      typeSafetyScore: '100% Sound',
      compressionRatio: '3.4x AST Density',
    },
    astTree: [
      'Program [0..284]',
      ' └─ FunctionDeclaration: fetchUserOrders',
      '     ├─ ASTParamValidator: [z.string().uuid()]',
      '     ├─ SQLSanitizerNode: Parametric Binding',
      '     └─ ReturnStatement -> PrismaRelationJoin(User, Orders)',
    ],
  },
  {
    id: 'js-wasm',
    title: 'JS Vector Math ➔ Rust WASM (SIMD)',
    lang: 'rust',
    sourceCode: `// CPU-bound unvectorized JS vector dot products
function computeDotProducts(vectorsA, vectorsB) {
  const results = new Float64Array(vectorsA.length / 3);
  for (let i = 0; i < vectorsA.length; i += 3) {
    const dot = (vectorsA[i] * vectorsB[i]) + 
                (vectorsA[i+1] * vectorsB[i+1]) + 
                (vectorsA[i+2] * vectorsB[i+2]);
    results[i / 3] = dot;
  }
  return results;
}`,
    synthesizedCode: `// [Nexus AST Synthesizer] SIMD-Accelerated WASM Kernel (AVX2 / NEON)
use wasm_bindgen::prelude::*;
use std::arch::x86_64::*;

#[wasm_bindgen]
pub fn compute_dot_products_simd(a: &[f32], b: &[f32], out: &mut [f32]) {
    assert_eq!(a.len(), b.len());
    let chunks = a.len() / 4;
    
    for i in 0..chunks {
        let idx = i * 4;
        unsafe {
            let va = _mm_loadu_ps(a.as_ptr().add(idx));
            let vb = _mm_loadu_ps(b.as_ptr().add(idx));
            let vprod = _mm_mul_ps(va, vb);
            let mut tmp = [0.0f32; 4];
            _mm_storeu_ps(tmp.as_mut_ptr(), vprod);
            out[i] = tmp[0] + tmp[1] + tmp[2] + tmp[3];
        }
    }
}`,
    astMetrics: {
      nodesAnalyzed: 680,
      latencyMs: 168,
      typeSafetyScore: 'Memory Safe (Rust)',
      compressionRatio: '14.2x Throughput',
    },
    astTree: [
      'WasmModuleRoot [0..512]',
      ' └─ SimdKernelFunction: compute_dot_products_simd',
      '     ├─ MemoryBoundaryGuard [a.len() == b.len()]',
      '     ├─ Vector128_MulPs [va, vb]',
      '     └─ SafeWasmExportBridge',
    ],
  },
  {
    id: 'redux-zustand',
    title: 'Redux Boilerplate ➔ Reactive Zustand Store',
    lang: 'typescript',
    sourceCode: `// Verbose 90-line Redux boilerplate with manual reducers and action types
const ADD_TODO = "ADD_TODO";
const TOGGLE_TODO = "TOGGLE_TODO";
const initialState = { todos: [], filter: "all" };

function todoReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TODO:
      return { ...state, todos: [...state.todos, action.payload] };
    case TOGGLE_TODO:
      return {
        ...state,
        todos: state.todos.map(t => t.id === action.payload ? { ...t, done: !t.done } : t)
      };
    default:
      return state;
  }
}`,
    synthesizedCode: `// [Nexus AST Synthesizer] Minimal Atomic Zustand Store with Immer Mutations
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface Todo {
  id: string;
  title: string;
  done: boolean;
}

interface TodoState {
  todos: Todo[];
  filter: 'all' | 'active' | 'completed';
  addTodo: (title: string) => void;
  toggleTodo: (id: string) => void;
}

export const useTodoStore = create<TodoState>()(
  immer((set) => ({
    todos: [],
    filter: 'all',
    addTodo: (title) => set((state) => {
      state.todos.push({ id: crypto.randomUUID(), title, done: false });
    }),
    toggleTodo: (id) => set((state) => {
      const item = state.todos.find(t => t.id === id);
      if (item) item.done = !item.done;
    }),
  }))
);`,
    astMetrics: {
      nodesAnalyzed: 340,
      latencyMs: 95,
      typeSafetyScore: '100% Strict TypeSafe',
      compressionRatio: '78% LOC Reduction',
    },
    astTree: [
      'StoreDeclaration [useTodoStore]',
      ' └─ MiddlewarePipeline [immer]',
      '     ├─ ActionHandler: addTodo (Immer In-place push)',
      '     ├─ ActionHandler: toggleTodo (Direct mutation proxy)',
      '     └─ TypeScriptStateInterface',
    ],
  },
];

export const InteractivePlayground: React.FC = () => {
  const [activePreset, setActivePreset] = useState<PresetTask>(PRESETS[0]);
  const [selectedModel, setSelectedModel] = useState<'nexus' | 'claude' | 'deepseek'>('nexus');
  const [activeTab, setActiveTab] = useState<'diff' | 'ast' | 'source'>('diff');
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [synthesisStep, setSynthesisStep] = useState(0);
  const [copied, setCopied] = useState(false);

  const handleRunSynthesis = () => {
    setIsSynthesizing(true);
    setSynthesisStep(1);

    setTimeout(() => setSynthesisStep(2), 250);
    setTimeout(() => setSynthesisStep(3), 500);
    setTimeout(() => {
      setSynthesisStep(4);
      setIsSynthesizing(false);
    }, 750);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(activePreset.synthesizedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="playground" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono font-medium text-brand-400 uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Live Engine Sandbox</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">
              Test AST-Guided Synthesis in Real Time
            </h2>
          </div>

          {/* Model Selector Bar */}
          <div className="flex items-center gap-1.5 p-1 rounded-lg bg-surface-200 border border-white/10 text-xs font-mono">
            <button
              onClick={() => setSelectedModel('nexus')}
              className={`px-3 py-1.5 rounded-md transition-all flex items-center gap-1.5 ${
                selectedModel === 'nexus'
                  ? 'bg-brand-500 text-white shadow-sm font-medium'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
              id="model-select-nexus"
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>Nexus-v3.4 (Verified)</span>
            </button>
            <button
              onClick={() => setSelectedModel('claude')}
              className={`px-3 py-1.5 rounded-md transition-all ${
                selectedModel === 'claude'
                  ? 'bg-surface-50 text-white border border-white/10 font-medium'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Claude-3.7
            </button>
            <button
              onClick={() => setSelectedModel('deepseek')}
              className={`px-3 py-1.5 rounded-md transition-all ${
                selectedModel === 'deepseek'
                  ? 'bg-surface-50 text-white border border-white/10 font-medium'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              DeepSeek-V3
            </button>
          </div>
        </div>

        {/* Presets Task Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-4 scrollbar-none">
          <span className="text-xs font-mono text-zinc-500 uppercase shrink-0 mr-1">Presets:</span>
          {PRESETS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => {
                setActivePreset(preset);
                setSynthesisStep(0);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono whitespace-nowrap transition-all border ${
                activePreset.id === preset.id
                  ? 'bg-brand-500/10 border-brand-500/40 text-brand-300 font-medium'
                  : 'bg-surface-200/80 border-white/5 text-zinc-400 hover:text-zinc-200 hover:border-white/10'
              }`}
            >
              {preset.title}
            </button>
          ))}
        </div>

        {/* Editor Main Container */}
        <div className="glass-card rounded-xl overflow-hidden border border-white/10 shadow-2xl">
          {/* Top Control Bar */}
          <div className="px-4 py-3 border-b border-white/10 bg-surface-200/90 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 mr-2">
                <span className="w-3 h-3 rounded-full bg-red-500/80" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
              </div>
              <div className="flex items-center gap-1 p-0.5 rounded-md bg-surface-300 border border-white/5 text-xs font-mono">
                <button
                  onClick={() => setActiveTab('diff')}
                  className={`px-2.5 py-1 rounded flex items-center gap-1.5 transition-colors ${
                    activeTab === 'diff' ? 'bg-surface-100 text-white font-medium' : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                  id="playground-tab-diff"
                >
                  <GitCompare className="w-3 h-3 text-brand-400" />
                  <span>Synthesized Diff</span>
                </button>
                <button
                  onClick={() => setActiveTab('ast')}
                  className={`px-2.5 py-1 rounded flex items-center gap-1.5 transition-colors ${
                    activeTab === 'ast' ? 'bg-surface-100 text-white font-medium' : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                  id="playground-tab-ast"
                >
                  <Layers className="w-3 h-3 text-cyanAccent" />
                  <span>AST Tree Proof</span>
                </button>
                <button
                  onClick={() => setActiveTab('source')}
                  className={`px-2.5 py-1 rounded flex items-center gap-1.5 transition-colors ${
                    activeTab === 'source' ? 'bg-surface-100 text-white font-medium' : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  <Code2 className="w-3 h-3 text-zinc-400" />
                  <span>Raw Source</span>
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyCode}
                className="px-2.5 py-1.5 rounded-md bg-surface-100 hover:bg-surface-50 border border-white/10 text-xs font-mono text-zinc-300 hover:text-white flex items-center gap-1.5 transition-colors"
                id="playground-copy-btn"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy Output'}</span>
              </button>

              <button
                onClick={handleRunSynthesis}
                disabled={isSynthesizing}
                className="px-4 py-1.5 rounded-md bg-brand-500 hover:bg-brand-600 disabled:opacity-70 text-white text-xs font-mono font-medium flex items-center gap-1.5 shadow-glow transition-all active:scale-[0.98]"
                id="playground-run-btn"
              >
                {isSynthesizing ? (
                  <>
                    <RotateCcw className="w-3.5 h-3.5 animate-spin" />
                    <span>Analyzing AST...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Transform & Verify</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Live Progress Phase Bar */}
          {isSynthesizing && (
            <div className="bg-surface-300 px-4 py-2 border-b border-white/10 flex items-center justify-between text-xs font-mono text-zinc-400">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-brand-400 animate-ping" />
                <span>
                  {synthesisStep === 1 && 'Phase 1/4: Parsing Lexical AST Tokens...'}
                  {synthesisStep === 2 && 'Phase 2/4: Static Flow Constraints Analysis...'}
                  {synthesisStep === 3 && 'Phase 3/4: Multi-Agent Parallel Synthesis...'}
                  {synthesisStep === 4 && 'Phase 4/4: Formal Type-Soundness Verification...'}
                </span>
              </div>
              <span className="text-brand-400">{synthesisStep * 25}%</span>
            </div>
          )}

          {/* Split Pane View */}
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[380px] bg-surface-300/90 font-mono text-xs">
            {/* Left Source Code Pane */}
            <div className="lg:col-span-5 p-4 border-b lg:border-b-0 lg:border-r border-white/10 overflow-auto bg-[#07080c]">
              <div className="flex items-center justify-between text-[11px] uppercase tracking-wider text-zinc-500 mb-3 pb-2 border-b border-white/5">
                <span>Input Fragment (Target)</span>
                <span className="text-zinc-600">UNOPTIMIZED</span>
              </div>
              <pre className="text-zinc-400 leading-relaxed overflow-x-auto selection:bg-brand-500/20">
                <code>{activePreset.sourceCode}</code>
              </pre>
            </div>

            {/* Right Output / AST Pane */}
            <div className="lg:col-span-7 p-4 overflow-auto bg-[#0b0d13]">
              <div className="flex items-center justify-between text-[11px] uppercase tracking-wider text-zinc-500 mb-3 pb-2 border-b border-white/5">
                <span>
                  {activeTab === 'diff' && 'Synthesized Code Output'}
                  {activeTab === 'ast' && 'AST Semantic Graph Nodes'}
                  {activeTab === 'source' && 'Uncompiled Token Dump'}
                </span>
                <span className="text-emerald-400 flex items-center gap-1 font-mono">
                  <CheckCircle2 className="w-3 h-3" />
                  {activePreset.astMetrics.typeSafetyScore}
                </span>
              </div>

              {activeTab === 'diff' && (
                <pre className="text-zinc-100 leading-relaxed overflow-x-auto selection:bg-brand-500/30">
                  <code>{activePreset.synthesizedCode}</code>
                </pre>
              )}

              {activeTab === 'ast' && (
                <div className="space-y-2 py-2">
                  {activePreset.astTree.map((node, i) => (
                    <div
                      key={i}
                      className="p-2 rounded bg-surface-200/80 border border-white/5 font-mono text-zinc-300 flex items-center justify-between"
                    >
                      <span className="text-cyanAccent">{node}</span>
                      <span className="text-[10px] text-zinc-500">VALIDATED</span>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'source' && (
                <pre className="text-zinc-400 leading-relaxed overflow-x-auto">
                  <code>{JSON.stringify({ preset: activePreset.id, model: selectedModel, timestamp: Date.now() }, null, 2)}</code>
                </pre>
              )}
            </div>
          </div>

          {/* Bottom Telemetry Bar */}
          <div className="px-4 py-3 border-t border-white/10 bg-surface-200/60 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
            <div className="flex flex-col">
              <span className="text-zinc-500 text-[10px] uppercase">AST Nodes</span>
              <span className="text-zinc-200 font-semibold">{activePreset.astMetrics.nodesAnalyzed} Nodes</span>
            </div>
            <div className="flex flex-col">
              <span className="text-zinc-500 text-[10px] uppercase">Synthesis Latency</span>
              <span className="text-brand-400 font-semibold flex items-center gap-1">
                <Zap className="w-3 h-3" />
                {activePreset.astMetrics.latencyMs}ms
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-zinc-500 text-[10px] uppercase">Verification Status</span>
              <span className="text-emerald-400 font-semibold">{activePreset.astMetrics.typeSafetyScore}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-zinc-500 text-[10px] uppercase">AST Efficiency</span>
              <span className="text-cyanAccent font-semibold">{activePreset.astMetrics.compressionRatio}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
