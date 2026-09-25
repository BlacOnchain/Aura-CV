import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Target, Zap, Check, ShieldCheck } from 'lucide-react';

export const HeroStudioDiagram: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'ats' | 'editor'>('ats');

  return (
    <div className="w-full relative max-w-full overflow-hidden">
      {/* Decorative subtle background aura */}
      <div className="absolute -top-6 -right-6 w-64 h-64 bg-zinc-200/50 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Main Studio Diagram Card */}
      <div className="bg-white rounded-2xl sm:rounded-3xl border border-zinc-200 shadow-xl shadow-zinc-200/60 p-4 sm:p-6 md:p-7 relative overflow-hidden">
        {/* Top Control Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-zinc-100">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            <span className="text-[11px] font-mono text-zinc-400 ml-1.5">AuraCV Studio v2.4</span>
          </div>

          {/* Interactive Mode Toggle with Touch-Friendly (min 44x44px) Targets */}
          <div className="flex items-center gap-1 bg-zinc-100 p-1 rounded-xl">
            <button
              type="button"
              onClick={() => setActiveTab('ats')}
              className={`min-h-[44px] min-w-[44px] px-3.5 py-2 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 ${
                activeTab === 'ats'
                  ? 'bg-white text-zinc-950 shadow-xs'
                  : 'text-zinc-600 hover:text-zinc-950'
              }`}
              aria-label="View ATS Recruiter Audit"
            >
              <Target className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>ATS Audit</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('editor')}
              className={`min-h-[44px] min-w-[44px] px-3.5 py-2 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 ${
                activeTab === 'editor'
                  ? 'bg-white text-zinc-950 shadow-xs'
                  : 'text-zinc-600 hover:text-zinc-950'
              }`}
              aria-label="View Google XYZ Bullets"
            >
              <Zap className="w-3.5 h-3.5 text-zinc-700 shrink-0" />
              <span>XYZ Bullets</span>
            </button>
          </div>
        </div>

        {/* Live Resume Document Body */}
        <div className="bg-zinc-50/70 rounded-xl sm:rounded-2xl p-3.5 sm:p-5 border border-zinc-200/60 space-y-3.5 sm:space-y-4">
          {/* Candidate Header - Mobile responsive flex-col on very small screens */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-zinc-200/60 pb-3">
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-bold text-zinc-900 truncate">Julian M. Vane</span>
                <span className="text-[10px] font-semibold bg-zinc-200/80 text-zinc-700 px-2 py-0.5 rounded">
                  Staff Tier
                </span>
              </div>
              <div className="text-xs text-zinc-500 font-medium truncate mt-0.5">Principal Software Architect</div>
              <div className="text-[10px] text-zinc-400 mt-0.5 truncate">San Francisco, CA · Workday Verified ID: 89412</div>
            </div>

            {/* Score Ring Widget */}
            <div className="flex items-center gap-2.5 bg-white px-3 py-1.5 rounded-xl border border-zinc-200/80 shadow-xs self-start sm:self-auto shrink-0">
              <div className="text-right">
                <div className="text-[9px] font-bold uppercase tracking-wider text-zinc-400 leading-none">Match Score</div>
                <div className="text-base font-display font-bold text-zinc-900 leading-none mt-1">98%</div>
              </div>
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs shrink-0">
                <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[3]" />
              </div>
            </div>
          </div>

          {/* Dynamic Content based on activeTab */}
          <AnimatePresence mode="wait">
            {activeTab === 'ats' ? (
              <motion.div
                key="ats-view"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="space-y-3"
              >
                <div className="flex flex-wrap items-center justify-between gap-1 text-[11px] text-zinc-500">
                  <span className="font-semibold text-zinc-700">Recruiter Filter Verification:</span>
                  <span className="text-emerald-700 font-medium bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/60">
                    Passed 4/4 Checks
                  </span>
                </div>

                {/* Parsed Keyword Tokens - 1 col on mobile, 2 cols on tablet+ */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {[
                    { name: 'TypeScript & Next.js', hits: '5x' },
                    { name: 'Distributed Systems', hits: '3x' },
                    { name: 'p99 Latency Optimization', hits: '2x' },
                    { name: 'Team Mentorship & Growth', hits: '3x' },
                  ].map((kw, i) => (
                    <div
                      key={i}
                      className="p-2 sm:p-2.5 bg-white rounded-lg border border-zinc-200/60 flex items-center justify-between gap-1.5"
                    >
                      <div className="flex items-center gap-1.5 truncate">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span className="font-medium text-zinc-800 text-[11px] truncate">{kw.name}</span>
                      </div>
                      <span className="text-[10px] font-mono text-zinc-400 shrink-0">{kw.hits}</span>
                    </div>
                  ))}
                </div>

                {/* Live Resume Bullet with Highlight */}
                <div className="bg-white p-3 rounded-xl border border-zinc-200/60 text-xs text-zinc-700 space-y-1">
                  <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                    Experience · Technical Lead
                  </div>
                  <p className="leading-relaxed text-[11px] break-words">
                    "Architected high-throughput{' '}
                    <span className="bg-emerald-100 text-emerald-800 font-semibold px-1 rounded">
                      micro-services
                    </span>{' '}
                    cutting latency by{' '}
                    <span className="bg-emerald-100 text-emerald-800 font-semibold px-1 rounded">44%</span>{' '}
                    for 1.8M active users."
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="editor-view"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="space-y-3"
              >
                <div className="flex flex-wrap items-center justify-between gap-1 text-[11px]">
                  <span className="font-semibold text-zinc-700">Google XYZ Formula:</span>
                  <span className="text-zinc-500 font-mono text-[10px]">Action + Metric + Outcome</span>
                </div>

                <div className="p-3 bg-white rounded-xl border border-zinc-200/60 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                    <span className="text-[11px] font-bold text-zinc-900">Optimized Narrative:</span>
                  </div>
                  <p className="text-[11px] text-zinc-700 leading-relaxed break-words">
                    "Spearheaded onboarding overhaul across 3 squads, lifting retention by{' '}
                    <strong className="text-emerald-700 font-semibold">31%</strong> and generating{' '}
                    <strong className="text-emerald-700 font-semibold">$1.4M ARR</strong>."
                  </p>
                  <div className="flex flex-wrap items-center gap-1.5 pt-1 border-t border-zinc-100 text-[10px] text-zinc-500">
                    <span className="bg-zinc-100 px-2 py-0.5 rounded font-mono">+31% Retention</span>
                    <span className="bg-zinc-100 px-2 py-0.5 rounded font-mono">$1.4M ARR</span>
                    <span className="text-emerald-600 font-semibold ml-auto">98/100 Impact</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom Metrics Bar */}
        <div className="mt-3.5 pt-3 border-t border-zinc-100 flex items-center justify-between text-xs text-zinc-500">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-zinc-700 shrink-0" />
            <span className="text-[11px] font-medium text-zinc-600">A4 Budget: Exact 1 Page</span>
          </div>
          <span className="text-[11px] font-semibold text-zinc-800">Ready to Export</span>
        </div>
      </div>
    </div>
  );
};
