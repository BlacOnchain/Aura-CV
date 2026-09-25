import React from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle2, 
  Sparkles, 
  FileText, 
  Wand2, 
  Target, 
  ShieldCheck, 
  ArrowUpRight 
} from 'lucide-react';

interface Props {
  onStart: () => void;
}

export const MinimalStudioHeroCard: React.FC<Props> = ({ onStart }) => {
  return (
    <div className="w-full max-w-4xl mx-auto rounded-3xl border border-zinc-200/90 bg-white shadow-xl overflow-hidden font-body text-zinc-900 transition-all hover:border-zinc-300">
      {/* Studio Header Bar */}
      <div className="bg-zinc-950 text-white px-5 sm:px-8 py-4 flex items-center justify-between border-b border-zinc-800">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
          <span className="text-xs font-mono font-semibold tracking-wider text-zinc-300 uppercase">
            AuraCV Executive Workspace
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold bg-zinc-800 text-zinc-300 border border-zinc-700">
            A4 Print Engine
          </span>
          <span className="hidden sm:inline-flex px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            98% ATS Compatibility
          </span>
        </div>
      </div>

      {/* Main Studio Preview Content */}
      <div className="p-6 sm:p-8 bg-gradient-to-b from-zinc-50/80 via-white to-zinc-50/40 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Left Column: Interactive Feature Highlights */}
        <div className="md:col-span-7 space-y-4 text-left">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-zinc-100 text-zinc-800 text-[11px] font-mono font-semibold border border-zinc-200">
            <Wand2 className="w-3.5 h-3.5 text-zinc-700" />
            <span>Google XYZ Bullet Optimizer</span>
          </div>

          <h3 className="text-lg sm:text-xl font-display font-bold text-zinc-950 leading-snug">
            Transform Responsibilities Into Recruiter-Approved Outcomes
          </h3>

          <div className="p-4 rounded-xl bg-white border border-zinc-200/90 shadow-2xs space-y-2">
            <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500">
              <span className="text-zinc-900 font-bold">Quantified Action Bullet:</span>
              <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                +48% Efficiency
              </span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-800 font-medium leading-relaxed">
              <span className="text-zinc-950 font-bold">•</span> Architected automated CI/CD deployment pipeline delivering 140+ monthly releases, reducing cycle time by 48% across 12 microservices.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-zinc-600 font-medium">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-zinc-900" />
              Workday Parsed
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-zinc-900" />
              Greenhouse Verified
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-zinc-900" />
              Single-Page A4 Guarantee
            </span>
          </div>
        </div>

        {/* Right Column: Sleek Document Mockup */}
        <div className="md:col-span-5 bg-white p-5 rounded-2xl border border-zinc-200 shadow-md space-y-3 relative overflow-hidden">
          <div className="pb-3 border-b border-zinc-200 flex justify-between items-start">
            <div>
              <h4 className="font-display font-bold text-sm text-zinc-950 tracking-tight">
                ALEXANDER WRIGHT
              </h4>
              <p className="text-[11px] text-zinc-500 font-medium">
                Senior Software Architect & Technical Lead
              </p>
            </div>
            <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-zinc-950 text-white">
              PDF READY
            </span>
          </div>

          <div className="space-y-2 text-[11px]">
            <span className="font-mono font-bold text-zinc-400 uppercase tracking-wider text-[9px]">
              EXPERIENCE HIGHLIGHTS
            </span>
            <div className="p-2.5 rounded-lg bg-zinc-50 border border-zinc-100 space-y-1.5">
              <div className="flex justify-between font-bold text-zinc-900 text-[11px]">
                <span>Lead Cloud Infrastructure Engineer</span>
                <span className="text-zinc-400 font-normal">2021 — Present</span>
              </div>
              <p className="text-zinc-600 leading-normal text-[10px]">
                Managed multi-region Kubernetes deployments serving 2.4M daily active users with 99.99% system availability.
              </p>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between text-[10px] font-mono text-zinc-500 border-t border-zinc-100">
            <span>ATS Match: 98%</span>
            <span className="text-zinc-900 font-bold flex items-center gap-0.5">
              A4 Studio Template <ArrowUpRight className="w-3 h-3 text-zinc-700" />
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Quick Action Bar */}
      <div className="bg-zinc-50 px-6 sm:px-8 py-3.5 border-t border-zinc-200 flex flex-col sm:flex-row items-center justify-between gap-3">
        <span className="text-xs font-medium text-zinc-600">
          Ready to build your single-page executive resume?
        </span>
        <button
          type="button"
          onClick={onStart}
          className="w-full sm:w-auto px-5 py-2 bg-zinc-950 hover:bg-zinc-800 text-white rounded-xl text-xs font-semibold transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <span>Open Studio Workspace</span>
          <ArrowUpRight className="w-3.5 h-3.5 text-zinc-300" />
        </button>
      </div>
    </div>
  );
};
