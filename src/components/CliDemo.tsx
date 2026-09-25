import React, { useState } from 'react';
import { Terminal as TerminalIcon, CornerDownLeft, Sparkles, Check, Copy } from 'lucide-react';

const CLI_PRESETS: Record<string, string[]> = {
  'nexus doctor': [
    '✓ Nexus AST Engine v3.4.2 [x86_64-windows-msvc]',
    '✓ Local Node.js runtime: v20.12.0',
    '✓ TypeScript compiler: 5.7.2 (AST parser operational)',
    '✓ Rust LLVM toolchain: 1.84.0 (SIMD target ready)',
    '✓ Local embedding cache: 1.4 GB / In-Memory Sub-10ms active',
    '✓ 0 configuration errors detected. System is optimal.',
  ],
  'nexus optimize --ast': [
    '➔ Parsing workspace AST graph (1,248 files)... [34ms]',
    '➔ Identifying dead branch trees & circular dependencies...',
    '✓ Removed 42 unused export symbols across 8 modules.',
    '✓ Converted 16 unmemoized pure calculations to static AST constants.',
    '✓ Bundle footprint reduced by 142 KB (-18.4%).',
    '✨ AST optimization complete in 86ms. Zero syntax regressions.',
  ],
  'nexus agent --task refactor-auth': [
    '➔ Spawning isolated eBPF worker sandbox...',
    '➔ Ingesting schema: Prisma + NextAuth v5 + JWT RBAC...',
    '➔ Synthesizing multi-tenant middleware and route guards...',
    '✓ Created: src/middleware/auth-guard.ts (Verified TypeSafe)',
    '✓ Created: src/lib/rbac.ts (Formal AST proof passed)',
    '✓ Generated test suite: 14 unit tests passing (100% coverage)',
    '✨ PR #42 ready for merge with zero reviewer overhead.',
  ],
  'nexus benchmark': [
    '➔ Running 1,000 synthetic AST transformation benchmarks...',
    '-------------------------------------------------------',
    'Engine                | AST Throughput | Zero-Error Rate',
    '-------------------------------------------------------',
    'Nexus-v3.4 (Verified) | 2,400 tokens/s | 100.0% Sound',
    'Standard GPT-4o       |   620 tokens/s |  84.2% (Runtime errors)',
    'Raw Copilot Llama-70B |   810 tokens/s |  79.1% (Hallucinations)',
    '-------------------------------------------------------',
    '✨ Nexus is 3.8x faster with 0 broken syntax trees.',
  ],
};

export const CliDemo: React.FC = () => {
  const [activeCmd, setActiveCmd] = useState<string>('nexus optimize --ast');
  const [inputVal, setInputVal] = useState<string>('nexus optimize --ast');
  const [logs, setLogs] = useState<string[]>(CLI_PRESETS['nexus optimize --ast']);
  const [copied, setCopied] = useState(false);

  const handleRunCommand = (cmd: string) => {
    setActiveCmd(cmd);
    setInputVal(cmd);
    if (CLI_PRESETS[cmd]) {
      setLogs(CLI_PRESETS[cmd]);
    } else {
      setLogs([
        `$ ${cmd}`,
        `➔ Dispatching command to local Nexus AST runtime...`,
        `✓ Executed in 48ms. Command "${cmd}" finished with exit code 0.`,
      ]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputVal.trim()) {
      handleRunCommand(inputVal.trim());
    }
  };

  const handleCopyLogs = () => {
    navigator.clipboard.writeText(logs.join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="cli" className="py-20 border-t border-white/[0.06] bg-surface-300/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-12">
          {/* Left Column: Context & Feature Highlights */}
          <div className="lg:w-5/12">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-medium text-brand-400 uppercase tracking-wider mb-2">
              <TerminalIcon className="w-3.5 h-3.5" />
              <span>Developer-First CLI</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight mb-4">
              Native to Your Terminal &amp; CI/CD Pipelines
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed mb-6">
              Run continuous AST verification in GitHub Actions, GitLab CI, or straight from your local terminal with instant zero-overhead execution.
            </p>

            {/* Command chips */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider block mb-2">
                Click to Execute Live:
              </span>
              {Object.keys(CLI_PRESETS).map((cmd) => (
                <button
                  key={cmd}
                  onClick={() => handleRunCommand(cmd)}
                  className={`w-full text-left px-3.5 py-2.5 rounded-lg border font-mono text-xs flex items-center justify-between transition-all ${
                    activeCmd === cmd
                      ? 'bg-brand-500/15 border-brand-500/40 text-brand-300 font-medium'
                      : 'bg-surface-200/80 border-white/5 text-zinc-400 hover:text-zinc-200 hover:border-white/10'
                  }`}
                  id={`cli-chip-${cmd.replace(/[^a-zA-Z0-9]/g, '-')}`}
                >
                  <span className="flex items-center gap-2">
                    <span className="text-zinc-500">$</span>
                    <span>{cmd}</span>
                  </span>
                  <span className="text-[10px] uppercase text-zinc-500">Run</span>
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Interactive Terminal Box */}
          <div className="lg:w-7/12">
            <div className="glass-card rounded-xl overflow-hidden border border-white/10 shadow-2xl bg-[#090b10]">
              {/* Terminal Title Bar */}
              <div className="px-4 py-3 border-b border-white/10 bg-surface-200/90 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-red-500/80" />
                    <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className="text-xs font-mono text-zinc-400 ml-2">bash — nexus-daemon</span>
                </div>

                <button
                  onClick={handleCopyLogs}
                  className="px-2 py-1 rounded bg-surface-100 hover:bg-surface-50 border border-white/10 text-[11px] font-mono text-zinc-400 hover:text-white flex items-center gap-1 transition-colors"
                >
                  {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copied ? 'Copied' : 'Copy Logs'}</span>
                </button>
              </div>

              {/* Terminal Output */}
              <div className="p-5 font-mono text-xs text-zinc-300 min-h-[260px] max-h-[340px] overflow-y-auto space-y-2 selection:bg-brand-500/30">
                <div className="text-zinc-500 text-[11px] pb-2 border-b border-white/5 flex items-center justify-between">
                  <span>Nexus AST Daemon v3.4.2 (PID: 4092)</span>
                  <span className="text-emerald-400 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    Interactive
                  </span>
                </div>

                {logs.map((log, i) => (
                  <div
                    key={i}
                    className={`leading-relaxed ${
                      log.startsWith('✓') || log.startsWith('✨')
                        ? 'text-emerald-400 font-medium'
                        : log.startsWith('➔')
                        ? 'text-cyanAccent'
                        : log.startsWith('-') || log.includes('|')
                        ? 'text-zinc-400'
                        : 'text-zinc-300'
                    }`}
                  >
                    {log}
                  </div>
                ))}
              </div>

              {/* Terminal Input Line */}
              <div className="px-4 py-3 border-t border-white/10 bg-surface-300/80 flex items-center gap-2">
                <span className="text-brand-400 font-mono text-xs font-bold">$</span>
                <input
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type a nexus command or press Enter..."
                  className="flex-1 bg-transparent border-none outline-none font-mono text-xs text-white placeholder:text-zinc-600 focus:ring-0"
                  id="cli-input-field"
                />
                <button
                  onClick={() => handleRunCommand(inputVal)}
                  className="p-1.5 rounded bg-surface-100 hover:bg-surface-50 text-zinc-400 hover:text-white border border-white/10 transition-colors"
                  title="Execute command"
                >
                  <CornerDownLeft className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
