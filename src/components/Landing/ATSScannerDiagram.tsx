import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ShieldCheck, RefreshCw, AlertCircle } from 'lucide-react';

interface RolePreset {
  id: string;
  role: string;
  targetCompany: string;
  score: number;
  matchedKeywords: { name: string; frequency: number; status: 'critical' | 'recommended' }[];
  missingKeywords: string[];
  recruiterVerdict: string;
}

const ROLES: RolePreset[] = [
  {
    id: 'swe',
    role: 'Staff Software Engineer',
    targetCompany: 'Enterprise Tech / Cloud',
    score: 96,
    matchedKeywords: [
      { name: 'TypeScript & Next.js', frequency: 5, status: 'critical' },
      { name: 'Distributed Systems', frequency: 3, status: 'critical' },
      { name: 'Micro-frontends & CI/CD', frequency: 3, status: 'critical' },
      { name: 'p99 Latency Optimization', frequency: 2, status: 'recommended' },
    ],
    missingKeywords: ['GraphQL Federation'],
    recruiterVerdict: 'Optimal Recruiter Match — Shortlisted for Technical Interview'
  },
  {
    id: 'pm',
    role: 'Lead Product Manager',
    targetCompany: 'FinTech / SaaS Unicorn',
    score: 94,
    matchedKeywords: [
      { name: 'Customer Discovery', frequency: 4, status: 'critical' },
      { name: 'Retention & ARR Growth', frequency: 4, status: 'critical' },
      { name: 'Roadmap Orchestration', frequency: 3, status: 'critical' },
      { name: 'Cross-functional Squads', frequency: 2, status: 'recommended' },
    ],
    missingKeywords: ['SQL Query Optimization'],
    recruiterVerdict: 'High Impact Narrative — Matches Senior Executive Rubric'
  },
  {
    id: 'arch',
    role: 'Solutions Architect',
    targetCompany: 'Global AI Infrastructure',
    score: 98,
    matchedKeywords: [
      { name: 'Multi-Region Architecture', frequency: 4, status: 'critical' },
      { name: 'Cost Optimization (-38%)', frequency: 2, status: 'critical' },
      { name: 'Zero-Trust Security', frequency: 3, status: 'critical' },
      { name: 'Terraform / IaC', frequency: 3, status: 'recommended' },
    ],
    missingKeywords: ['Kubernetes Helm Charts'],
    recruiterVerdict: 'Exceptional Alignment — 99th Percentile Match Rate'
  }
];

export const ATSScannerDiagram: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<RolePreset>(ROLES[0]);
  const [isScanning, setIsScanning] = useState(false);
  const [displayScore, setDisplayScore] = useState(ROLES[0].score);

  const runScan = () => {
    setIsScanning(true);
    setDisplayScore(45);
    const interval = setInterval(() => {
      setDisplayScore((prev) => {
        if (prev >= selectedRole.score) {
          clearInterval(interval);
          setIsScanning(false);
          return selectedRole.score;
        }
        return prev + 3;
      });
    }, 40);
  };

  useEffect(() => {
    runScan();
  }, [selectedRole]);

  return (
    <div className="bg-white rounded-2xl sm:rounded-[32px] border border-zinc-200/80 p-4 sm:p-6 md:p-8 shadow-xl shadow-zinc-100/60 overflow-hidden max-w-full">
      {/* Header bar with role selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 sm:pb-6 border-b border-zinc-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">Live Recruiter ATS Simulator</span>
          </div>
          <h4 className="text-lg sm:text-xl font-display font-bold text-zinc-900 mt-1 break-words">
            Recruiter ATS Parsing Engine
          </h4>
        </div>

        {/* Role toggle tabs with Touch-Friendly (min 44x44px) targets */}
        <div className="flex items-center gap-1.5 p-1 bg-zinc-100 rounded-xl overflow-x-auto max-w-full pb-1 sm:pb-1 scrollbar-none">
          {ROLES.map((r) => (
            <button
              key={r.id}
              type="button"
              onClick={() => setSelectedRole(r)}
              className={`min-h-[44px] min-w-[44px] px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap active:scale-95 flex items-center justify-center ${
                selectedRole.id === r.id
                  ? 'bg-white text-zinc-950 shadow-xs'
                  : 'text-zinc-600 hover:text-zinc-950'
              }`}
            >
              {r.role.split(' ')[0]} {r.role.split(' ')[1]}
            </button>
          ))}
        </div>
      </div>

      {/* Main interactive diagram grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-5 sm:pt-6 items-stretch">
        {/* Left: Animated Resume Document with scanning laser */}
        <div className="lg:col-span-6 relative bg-zinc-50 rounded-2xl p-4 sm:p-5 border border-zinc-200/70 overflow-hidden flex flex-col justify-between">
          {/* Animated Scanning Line */}
          <motion.div
            className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent shadow-[0_0_12px_rgba(16,185,129,0.8)] z-20 pointer-events-none"
            animate={{
              top: ['0%', '100%', '0%'],
              opacity: isScanning ? [0.8, 1, 0.8] : [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          {/* Mini Resume Header */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 border-b border-zinc-200/60 pb-3">
              <div className="min-w-0">
                <div className="text-xs font-bold text-zinc-900 uppercase tracking-wider truncate">Julian M. Vane</div>
                <div className="text-[11px] text-zinc-500 font-medium truncate">{selectedRole.role}</div>
                <div className="text-[10px] text-zinc-400 truncate">San Francisco, CA · julian@example.com</div>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-200/80 text-zinc-700 self-start shrink-0">
                A4 · Clean Layout
              </span>
            </div>

            {/* Experience snippet */}
            <div className="space-y-2 text-left">
              <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Selected Experience</div>
              <div className="bg-white p-3 sm:p-3.5 rounded-xl border border-zinc-200/60 text-[11px] space-y-1.5 leading-relaxed text-zinc-700">
                <div className="flex justify-between font-bold text-zinc-900 text-[11px]">
                  <span>Lead Technical Architect</span>
                  <span className="text-zinc-400 font-normal">2022 — Present</span>
                </div>
                <p className="text-zinc-600 break-words">
                  Architected high-throughput{' '}
                  <span className="bg-emerald-100 text-emerald-800 font-semibold px-1 rounded">
                    {selectedRole.matchedKeywords[0]?.name.split(' ')[0] || 'TypeScript'}
                  </span>{' '}
                  platform scaling to 1.4M users, maintaining 99.98% uptime.
                </p>
                <p className="text-zinc-600 break-words">
                  Spearheaded{' '}
                  <span className="bg-emerald-100 text-emerald-800 font-semibold px-1 rounded">
                    {selectedRole.matchedKeywords[1]?.name || 'Distributed Systems'}
                  </span>{' '}
                  refactor reducing p99 response times by 42%.
                </p>
              </div>

              {/* Skills tags recognized */}
              <div className="pt-2">
                <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1.5">
                  Parsed Technical Tokens
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {selectedRole.matchedKeywords.map((kw, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1 text-[10px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200/60 px-2 py-1 rounded-md"
                    >
                      <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                      <span className="truncate max-w-[180px]">{kw.name}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Rescan trigger button - Touch Friendly 44px height */}
          <div className="pt-4 mt-4 border-t border-zinc-200/60 flex flex-wrap items-center justify-between gap-3">
            <span className="text-[10px] text-zinc-500 font-medium">ATS Parser: Workday / Greenhouse</span>
            <button
              type="button"
              onClick={runScan}
              disabled={isScanning}
              className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center gap-2 text-xs font-semibold text-zinc-800 hover:text-zinc-950 bg-white px-3.5 py-2 rounded-xl border border-zinc-200 hover:border-zinc-300 shadow-xs transition-colors cursor-pointer active:scale-95"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isScanning ? 'animate-spin text-emerald-600' : ''}`} />
              <span>Re-scan Document</span>
            </button>
          </div>
        </div>

        {/* Right: Recruiter Evaluation Results */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
          {/* Match Score Display */}
          <div className="p-4 sm:p-5 bg-zinc-900 text-white rounded-2xl flex flex-wrap sm:flex-nowrap items-center justify-between gap-4">
            <div className="min-w-0">
              <div className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                AuraCV Match Alignment
              </div>
              <div className="text-2xl sm:text-3xl font-display font-bold mt-0.5 flex items-baseline gap-2 flex-wrap">
                <span>{displayScore}%</span>
                <span className="text-xs font-sans text-emerald-400 font-semibold">Ready for Recruiter Screening</span>
              </div>
              <div className="text-xs text-zinc-300 mt-1 break-words">{selectedRole.recruiterVerdict}</div>
            </div>
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border-4 border-emerald-500/30 border-t-emerald-400 flex items-center justify-center text-base sm:text-lg font-bold font-mono shrink-0">
              {displayScore}
            </div>
          </div>

          {/* Breakdown checklist */}
          <div className="space-y-2">
            <div className="text-xs font-bold text-zinc-900 uppercase tracking-wider flex items-center justify-between">
              <span>Recruiter Evaluation Matrix</span>
              <span className="text-zinc-400 font-normal text-[11px]">4 / 4 Checks Passed</span>
            </div>

            <div className="grid grid-cols-1 gap-2">
              {selectedRole.matchedKeywords.map((item, idx) => (
                <div
                  key={idx}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-2.5 rounded-xl bg-zinc-50 border border-zinc-100 text-xs text-zinc-700 gap-1.5 sm:gap-2"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="font-semibold text-zinc-900 truncate">{item.name}</span>
                  </div>
                  <div className="flex items-center gap-2 self-start sm:self-auto shrink-0 pl-6 sm:pl-0">
                    <span className="text-[10px] text-zinc-500">Indexed {item.frequency}× in bullets</span>
                    <span className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded bg-zinc-200/60 text-zinc-700">
                      {item.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Gap detection */}
          {selectedRole.missingKeywords.length > 0 && (
            <div className="p-3 bg-amber-50/80 border border-amber-200/70 rounded-xl text-xs flex items-center gap-2.5 text-amber-900">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
              <span className="break-words">
                Optional recommendation: Mention <strong>{selectedRole.missingKeywords.join(', ')}</strong> to push parse score to 99%.
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
