import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XCircle, CheckCircle2 } from 'lucide-react';

interface BulletSample {
  id: string;
  role: string;
  category: string;
  weakText: string;
  weakFlaws: string[];
  weakScore: number;
  enhancedText: string;
  enhancedBreakdown: { label: string; text: string; type: 'verb' | 'context' | 'metric' | 'outcome' }[];
  enhancedScore: number;
  impactMetrics: string[];
}

const BULLET_SAMPLES: BulletSample[] = [
  {
    id: 'engineering',
    role: 'Software Engineering',
    category: 'Architecture & Scale',
    weakText: 'Worked on web app features, fixed database bugs, and helped the team ship sprint tasks on time.',
    weakFlaws: ['Passive verb ("Worked on")', 'Zero measurable business impact', 'No technical depth specified'],
    weakScore: 51,
    enhancedText: 'Architected high-throughput React & TypeScript micro-services on PostgreSQL, reducing p99 latency by 44% and maintaining 99.99% availability for 1.8M monthly active users.',
    enhancedBreakdown: [
      { label: 'Power Action Verb', text: 'Architected', type: 'verb' },
      { label: 'Technical Stack', text: 'React & TypeScript micro-services on PostgreSQL', type: 'context' },
      { label: 'Quantified Metric', text: 'reducing p99 latency by 44%', type: 'metric' },
      { label: 'Business Scale', text: 'maintaining 99.99% availability for 1.8M monthly active users', type: 'outcome' },
    ],
    enhancedScore: 98,
    impactMetrics: ['-44% Latency', '1.8M MAU', '99.99% Uptime']
  },
  {
    id: 'product',
    role: 'Product Management',
    category: 'Growth & Retention',
    weakText: 'Organized sprint meetings, interviewed customers for feature feedback, and coordinated product releases.',
    weakFlaws: ['Task-based description rather than outcomes', 'No mention of revenue or retention', 'Generic responsibilities'],
    weakScore: 48,
    enhancedText: 'Spearheaded self-serve onboarding redesign across 3 squads, lifting 30-day user activation by 31% and unlocking $1.4M net-new annual recurring revenue within 2 quarters.',
    enhancedBreakdown: [
      { label: 'Executive Action Verb', text: 'Spearheaded', type: 'verb' },
      { label: 'Cross-functional Scope', text: 'self-serve onboarding redesign across 3 squads', type: 'context' },
      { label: 'Core KPI Metric', text: 'lifting 30-day user activation by 31%', type: 'metric' },
      { label: 'Direct Financial Impact', text: 'unlocking $1.4M net-new annual recurring revenue within 2 quarters', type: 'outcome' },
    ],
    enhancedScore: 97,
    impactMetrics: ['+31% Activation', '$1.4M ARR', '2 Quarters']
  },
  {
    id: 'leadership',
    role: 'Engineering Leadership',
    category: 'Team & Delivery',
    weakText: 'Managed a team of 8 developers, reviewed code PRs, and helped hire new engineers.',
    weakFlaws: ['Administrative focus without leadership vision', 'No metrics on team velocity or retention', 'Basic checklist framing'],
    weakScore: 54,
    enhancedText: 'Scaled distributed engineering organization from 8 to 22 engineers, standardizing automated CI/CD pipelines to double release velocity while maintaining zero voluntary turnover.',
    enhancedBreakdown: [
      { label: 'Leadership Action Verb', text: 'Scaled', type: 'verb' },
      { label: 'Organizational Scope', text: 'distributed engineering organization from 8 to 22 engineers', type: 'context' },
      { label: 'Operational Improvement', text: 'standardizing automated CI/CD pipelines to double release velocity', type: 'metric' },
      { label: 'Cultural Outcome', text: 'maintaining zero voluntary turnover across 18 months', type: 'outcome' },
    ],
    enhancedScore: 99,
    impactMetrics: ['2x Release Velocity', '8 to 22 Engineers', '0% Turnover']
  }
];

export const BulletNarrativeEngine: React.FC = () => {
  const [activeSample, setActiveSample] = useState<BulletSample>(BULLET_SAMPLES[0]);
  const [viewState, setViewState] = useState<'enhanced' | 'comparison'>('comparison');

  return (
    <div className="bg-white rounded-2xl sm:rounded-[32px] border border-zinc-200/80 p-4 sm:p-6 md:p-8 shadow-xl shadow-zinc-100/60 overflow-hidden max-w-full">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 sm:pb-6 border-b border-zinc-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-zinc-900 shrink-0" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">
              XYZ Formula · Google & Recruiter Standard
            </span>
          </div>
          <h4 className="text-lg sm:text-xl font-display font-bold text-zinc-900 mt-1 break-words">
            Precision AI Bullet Enhancer
          </h4>
        </div>

        {/* Tab buttons with Touch-Friendly (min 44x44px) targets */}
        <div className="flex items-center gap-1.5 p-1 bg-zinc-100 rounded-xl overflow-x-auto max-w-full pb-1 sm:pb-1 scrollbar-none">
          {BULLET_SAMPLES.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setActiveSample(s)}
              className={`min-h-[44px] min-w-[44px] px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap active:scale-95 flex items-center justify-center ${
                activeSample.id === s.id
                  ? 'bg-white text-zinc-950 shadow-xs'
                  : 'text-zinc-600 hover:text-zinc-950'
              }`}
            >
              {s.role.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="pt-5 sm:pt-6 space-y-5 sm:space-y-6">
        {/* Toggle View Mode */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <span className="text-xs text-zinc-500 font-medium">
            Category: <strong className="text-zinc-900">{activeSample.category}</strong>
          </span>
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <button
              type="button"
              onClick={() => setViewState('comparison')}
              className={`min-h-[44px] px-3.5 py-2 rounded-xl font-medium transition-colors cursor-pointer active:scale-95 flex items-center justify-center ${
                viewState === 'comparison'
                  ? 'bg-zinc-950 text-white shadow-xs'
                  : 'bg-zinc-100 text-zinc-600 hover:text-zinc-900'
              }`}
            >
              Side-by-Side Comparison
            </button>
            <button
              type="button"
              onClick={() => setViewState('enhanced')}
              className={`min-h-[44px] px-3.5 py-2 rounded-xl font-medium transition-colors cursor-pointer active:scale-95 flex items-center justify-center ${
                viewState === 'enhanced'
                  ? 'bg-zinc-950 text-white shadow-xs'
                  : 'bg-zinc-100 text-zinc-600 hover:text-zinc-900'
              }`}
            >
              Executive Analysis
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {viewState === 'comparison' ? (
            <motion.div
              key="comparison"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 items-stretch"
            >
              {/* Weak / Standard Bullet */}
              <div className="p-4 sm:p-5 rounded-2xl bg-zinc-50/80 border border-zinc-200/60 flex flex-col justify-between space-y-4">
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600 flex items-center gap-1.5">
                      <XCircle className="w-3.5 h-3.5 shrink-0" />
                      Typical Candidate Draft
                    </span>
                    <span className="text-xs font-mono font-bold text-zinc-500">
                      Score: {activeSample.weakScore}/100
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-600 italic bg-white p-3 sm:p-3.5 rounded-xl border border-zinc-200/40 leading-relaxed break-words">
                    "{activeSample.weakText}"
                  </p>
                </div>

                <div className="space-y-1.5 pt-3 border-t border-zinc-200/50">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Identified Gaps</div>
                  {activeSample.weakFlaws.map((flaw, i) => (
                    <div key={i} className="text-xs text-rose-700/80 flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-rose-500 shrink-0" />
                      <span className="break-words">{flaw}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Enhanced Bullet */}
              <div className="p-4 sm:p-5 rounded-2xl bg-zinc-950 text-white border border-zinc-900 flex flex-col justify-between space-y-4 shadow-lg shadow-zinc-200/40">
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                      AuraCV Optimized Narrative
                    </span>
                    <span className="text-xs font-mono font-bold text-emerald-400">
                      Score: {activeSample.enhancedScore}/100
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-100 bg-zinc-900/90 p-3 sm:p-3.5 rounded-xl border border-zinc-800 leading-relaxed font-medium break-words">
                    "{activeSample.enhancedText}"
                  </p>
                </div>

                <div className="pt-3 border-t border-zinc-800 flex flex-wrap items-center justify-between gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Impact Indicators</span>
                  <div className="flex flex-wrap gap-1.5">
                    {activeSample.impactMetrics.map((m, i) => (
                      <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-emerald-400 font-semibold">
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="enhanced"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="p-4 sm:p-6 rounded-2xl bg-zinc-50 border border-zinc-200/80 space-y-4 sm:space-y-5"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                  Syntactic & Impact Breakdown
                </span>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded">
                  +47 Point Uplift
                </span>
              </div>

              <div className="p-3.5 sm:p-4 rounded-xl bg-white border border-zinc-200/60 text-xs sm:text-sm leading-relaxed text-zinc-900 font-medium break-words">
                "{activeSample.enhancedText}"
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {activeSample.enhancedBreakdown.map((part, i) => (
                  <div key={i} className="p-3 bg-white rounded-xl border border-zinc-200/50 space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                      {part.label}
                    </span>
                    <div className="text-xs font-semibold text-zinc-800 break-words">
                      {part.text}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
