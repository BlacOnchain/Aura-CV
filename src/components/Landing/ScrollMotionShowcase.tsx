import React from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  Wand2, 
  CheckCircle2, 
  Target, 
  Layers, 
  ArrowRight,
  ShieldCheck,
  TrendingUp
} from 'lucide-react';

interface Props {
  onStartStudio: () => void;
}

export const ScrollMotionShowcase: React.FC<Props> = ({ onStartStudio }) => {
  return (
    <div className="w-full max-w-5xl mx-auto py-8 sm:py-12 overflow-hidden">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
        className="text-center space-y-2 mb-8 sm:mb-12 max-w-2xl mx-auto px-4"
      >
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-100 text-zinc-800 text-xs font-semibold border border-zinc-200">
          <Sparkles className="w-3.5 h-3.5 text-zinc-900" />
          <span>Scroll-Triggered Motion Pipeline</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-display font-bold text-zinc-950 tracking-tight">
          Watch Responsibilities Elevate In Real-Time
        </h2>
        <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
          As you scroll, experience how AuraCV's formula engine audits ATS keyword density and structures bullet points into measurable executive outcomes.
        </p>
      </motion.div>

      {/* 3D Perspective Motion Pipeline Stage */}
      <div className="relative perspective-1000 px-2 sm:px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          
          {/* Card 1: Unformatted Draft Input */}
          <motion.div
            initial={{ opacity: 0, y: 40, rotateX: 12, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.25 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm flex flex-col justify-between space-y-4 hover:border-zinc-300 transition-all"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-zinc-100">
                <span className="text-[11px] font-mono font-bold text-zinc-400 uppercase tracking-wider">
                  01. Raw Input
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-zinc-100 text-zinc-600 border border-zinc-200">
                  Before AI
                </span>
              </div>

              <h3 className="font-bold text-sm text-zinc-900">
                Generic Responsibility Bullet
              </h3>

              <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-100 text-xs text-zinc-600 leading-relaxed font-body">
                "Responsible for managing cloud servers and updating backend API code for customer apps."
              </div>
            </div>

            <div className="pt-3 border-t border-zinc-100 flex items-center justify-between text-[11px] text-zinc-500">
              <span>Recruiter Score: <strong className="text-zinc-800">42%</strong></span>
              <span className="text-rose-600 font-semibold">Missing Metrics</span>
            </div>
          </motion.div>

          {/* Card 2: AI Transformation Engine (Interactive Center Card) */}
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.92 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.25 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="bg-zinc-950 text-white p-6 rounded-2xl shadow-xl flex flex-col justify-between space-y-4 border border-zinc-800 relative overflow-hidden"
          >
            {/* Ambient Pulse Glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

            <div className="space-y-3 relative z-10">
              <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
                <span className="text-[11px] font-mono font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Wand2 className="w-3.5 h-3.5" />
                  02. XYZ Formula Engine
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Processing
                </span>
              </div>

              <h3 className="font-bold text-sm text-white">
                Google Metric Quantification
              </h3>

              {/* Animated Progress Bars */}
              <div className="space-y-2.5 pt-1">
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] font-mono text-zinc-400">
                    <span>Action Verb Impact</span>
                    <span className="text-emerald-400 font-bold">100%</span>
                  </div>
                  <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: '100%' }}
                      viewport={{ once: false }}
                      transition={{ duration: 0.8, delay: 0.3 }}
                      className="bg-emerald-500 h-full rounded-full"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] font-mono text-zinc-400">
                    <span>ATS Keyword Matching</span>
                    <span className="text-emerald-400 font-bold">98%</span>
                  </div>
                  <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: '98%' }}
                      viewport={{ once: false }}
                      transition={{ duration: 0.8, delay: 0.45 }}
                      className="bg-emerald-400 h-full rounded-full"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-zinc-800 flex items-center justify-between text-[11px] text-zinc-400 relative z-10">
              <span className="flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                Quantified Outcome
              </span>
              <span className="text-emerald-400 font-mono font-bold">+56% Impact</span>
            </div>
          </motion.div>

          {/* Card 3: Executive Output Sheet */}
          <motion.div
            initial={{ opacity: 0, y: 40, rotateX: -12, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.25 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm flex flex-col justify-between space-y-4 hover:border-zinc-300 transition-all"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-zinc-100">
                <span className="text-[11px] font-mono font-bold text-zinc-400 uppercase tracking-wider">
                  03. Print-Ready A4
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-zinc-950 text-white">
                  Verified
                </span>
              </div>

              <h3 className="font-bold text-sm text-zinc-900">
                High-Impact Bullet Point
              </h3>

              <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-900 leading-relaxed font-body font-medium">
                <span className="font-bold text-zinc-950">•</span> Engineered multi-region AWS cloud infrastructure supporting 2.4M DAU, achieving 99.99% uptime and reducing latency by 35%.
              </div>
            </div>

            <div className="pt-3 border-t border-zinc-100 flex items-center justify-between text-[11px]">
              <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Workday & Greenhouse Pass
              </span>
              <button
                type="button"
                onClick={onStartStudio}
                className="text-xs font-bold text-zinc-900 hover:underline flex items-center gap-0.5 cursor-pointer"
              >
                Build Yours <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};
