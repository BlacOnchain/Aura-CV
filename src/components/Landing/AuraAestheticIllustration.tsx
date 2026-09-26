import React from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  FileText, 
  Wand2, 
  ShieldCheck 
} from 'lucide-react';

interface Props {
  onStart: () => void;
}

export const AuraAestheticIllustration: React.FC<Props> = ({ onStart }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-4xl mx-auto my-6 sm:my-8 p-1 rounded-3xl bg-gradient-to-b from-zinc-200/60 to-zinc-100/40 border border-zinc-200/80 shadow-lg text-left"
    >
      <div className="bg-white rounded-[22px] p-6 sm:p-8 space-y-6">
        
        {/* Mobile-specific simplified view */}
        <div className="block md:hidden space-y-4">
          <div className="flex items-center justify-center gap-2 text-emerald-800 font-mono font-semibold text-xs border border-emerald-200 bg-emerald-50 px-3 py-2 rounded-lg">
             <Sparkles className="w-4 h-4" />
             98% ATS Match
          </div>
          <p className="text-sm text-zinc-700 text-center font-medium leading-relaxed">
            Transform raw duties into quantified achievements using the AuraCV formula.
          </p>
          <button
            type="button"
            onClick={onStart}
            className="w-full px-5 py-3 bg-zinc-900 hover:bg-zinc-800 text-white font-semibold rounded-xl text-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
          >
            <span>Try Free Studio</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Desktop full view */}
        <div className="hidden md:block space-y-6">
          {/* Top Header Bar inside the Illustration */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-zinc-100">
            <div className="flex items-center gap-2.5">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-mono font-bold tracking-wider text-zinc-700 uppercase">
                AuraCV Executive Engine
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs text-zinc-500 font-medium">
              <span className="px-2.5 py-1 rounded-md bg-zinc-100 text-zinc-800 font-mono font-semibold text-[11px] border border-zinc-200/80">
                A4 Print Ready
              </span>
              <span className="px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 font-mono font-semibold text-[11px] border border-emerald-200/80">
                98% ATS Match
              </span>
            </div>
          </div>

          {/* The One Point Visual Illustration: Transformation Arrow */}
          <div className="grid grid-cols-1 md:grid-cols-11 gap-4 items-center pt-2">
            
            {/* Step A: Raw Duties */}
            <div className="md:col-span-5 p-4 sm:p-5 rounded-2xl bg-zinc-50/80 border border-zinc-200/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-wider">
                  Raw Duty Input
                </span>
                <span className="text-[10px] font-mono text-zinc-400">Unoptimized</span>
              </div>
              <p className="text-xs text-zinc-600 leading-relaxed font-body">
                "Responsible for updating API backend services and managing cloud deployment servers."
              </p>
            </div>

            {/* Transformation Point Indicator (Arrow & Badge) */}
            <div className="md:col-span-1 flex flex-col items-center justify-center py-2 md:py-0">
              <div className="w-10 h-10 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 shadow-2xs">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="text-[9px] font-mono font-bold text-emerald-800 uppercase tracking-widest mt-1">
                XYZ Formula
              </span>
            </div>

            {/* Step B: Transformed A4 Bullet Point */}
            <div className="md:col-span-5 p-4 sm:p-5 rounded-2xl bg-white border border-emerald-300/80 shadow-md space-y-2 relative overflow-hidden">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-emerald-700 uppercase tracking-wider flex items-center gap-1">
                  <Wand2 className="w-3 h-3" />
                  Quantified Outcome
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800">
                  +48% Impact
                </span>
              </div>
              <p className="text-xs text-zinc-900 leading-relaxed font-body font-semibold">
                <span className="text-emerald-600 font-bold">•</span> "Architected CI/CD deployment pipelines for 12 microservices, reducing release cycle time by 48% across 2.4M DAU."
              </p>
            </div>

          </div>

          {/* Bottom CTA Bar inside Illustration */}
          <div className="pt-4 border-t border-zinc-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-zinc-500 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Single-Page A4 Guarantee · Workday & Greenhouse Compatible</span>
            </div>

            <button
              type="button"
              onClick={onStart}
              className="w-full sm:w-auto px-5 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-white font-semibold rounded-xl text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <span>Try Free Studio</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </motion.div>
  );
};
