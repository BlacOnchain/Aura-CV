import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2, 
  Zap, 
  Layers, 
  Target, 
  Wand2, 
  FileText,
  Rotate3d,
  MousePointerClick
} from 'lucide-react';

interface Props {
  onStartStudio: () => void;
}

export const Spatial3DCanvas: React.FC<Props> = ({ onStartStudio }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [activeLayer, setActiveLayer] = useState<'all' | 'ats' | 'xyz'>('all');

  // Motion values for 3D spatial tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for fluid 60fps movement
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [18, -18]), {
    stiffness: 180,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-22, 22]), {
    stiffness: 180,
    damping: 20,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <div className="w-full max-w-6xl mx-auto py-8 sm:py-12 px-4 sm:px-6">
      {/* Top Interactive Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-zinc-950 text-white flex items-center justify-center shadow-lg">
            <Rotate3d className="w-5 h-5 text-emerald-400 animate-pulse" />
          </div>
          <div>
            <h3 className="font-display font-bold text-lg sm:text-xl text-zinc-900">
              Interactive 3D Spatial Canvas
            </h3>
            <p className="text-xs text-zinc-500">
              Move your cursor or swipe over the canvas to explore floating 3D document layers
            </p>
          </div>
        </div>

        {/* 3D View Layer Filter Controls */}
        <div className="flex items-center gap-1.5 p-1 bg-zinc-200/70 rounded-2xl border border-zinc-300/80">
          {[
            { id: 'all', label: 'Complete 3D View' },
            { id: 'ats', label: '3D ATS Shield' },
            { id: 'xyz', label: '3D XYZ Formula' },
          ].map((mode) => (
            <button
              key={mode.id}
              type="button"
              onClick={() => setActiveLayer(mode.id as any)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeLayer === mode.id
                  ? 'bg-zinc-950 text-white shadow-md'
                  : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              {mode.label}
            </button>
          ))}
        </div>
      </div>

      {/* 3D Viewport Container */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative w-full min-h-[460px] sm:min-h-[540px] lg:min-h-[600px] rounded-3xl bg-gradient-to-b from-zinc-900 via-zinc-950 to-black p-6 sm:p-12 flex items-center justify-center overflow-hidden border border-zinc-800 shadow-2xl cursor-grab active:cursor-grabbing"
        style={{ perspective: 1200 }}
      >
        {/* Ambient Dynamic Background Lighting */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-500/15 rounded-full blur-[120px]" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-indigo-500/15 rounded-full blur-[120px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal-500/10 rounded-full blur-[140px]" />
          <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:24px_24px] opacity-25" />
        </div>

        {/* 3D Floating Interactive Document Scene */}
        <motion.div
          style={{
            rotateX,
            rotateY,
            transformStyle: 'preserve-3d',
          }}
          className="relative w-full max-w-2xl bg-white/95 backdrop-blur-xl rounded-2xl p-6 sm:p-10 shadow-2xl border border-white/40 text-zinc-900 transition-shadow duration-300"
        >
          {/* Layer 0: Base Resume Document Paper (translateZ: 0px) */}
          <div
            className="space-y-5"
            style={{ transform: 'translateZ(0px)' }}
          >
            {/* Header Block */}
            <div className="flex items-start justify-between pb-4 border-b border-zinc-200">
              <div>
                <h2 className="text-2xl sm:text-3xl font-display font-bold text-zinc-950 tracking-tight">
                  ALEXANDER WRIGHT
                </h2>
                <p className="text-xs sm:text-sm font-semibold text-emerald-700 tracking-wide mt-0.5">
                  Senior Cloud Systems & Platform Architect
                </p>
              </div>
              <div className="text-right text-[10px] text-zinc-400 font-mono space-y-0.5 hidden sm:block">
                <p>alexander@auracv.studio</p>
                <p>San Francisco, CA</p>
                <p>github.com/alexwright</p>
              </div>
            </div>

            {/* Experience Bullet Section */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                  PROFESSIONAL EXPERIENCE
                </h4>
                <span className="text-[10px] font-bold text-zinc-400">2021 – Present</span>
              </div>

              <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200/80 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-zinc-900">Lead Infrastructure Engineer</span>
                  <span className="text-xs text-zinc-500 font-medium">Stripe Inc.</span>
                </div>
                <p className="text-xs text-zinc-600 leading-relaxed font-body">
                  • Architected high-throughput Kubernetes cluster pipelines serving 120M daily transactions with 99.99% availability.
                </p>
              </div>
            </div>

            {/* Core Skills Tags */}
            <div className="pt-2 flex flex-wrap gap-1.5 text-xs">
              {['TypeScript', 'React 19', 'Go', 'Kubernetes', 'AWS Lambda', 'GraphQL', 'PostgreSQL'].map((sk) => (
                <span key={sk} className="px-2.5 py-1 rounded-md bg-zinc-100 text-zinc-700 font-semibold border border-zinc-200 text-[11px]">
                  {sk}
                </span>
              ))}
            </div>
          </div>

          {/* LAYER 1: Floating 3D ATS Audit Shield (translateZ: 60px) */}
          {(activeLayer === 'all' || activeLayer === 'ats') && (
            <motion.div
              style={{ transform: 'translateZ(60px)' }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="absolute -top-6 -right-4 sm:-right-8 bg-zinc-950/95 text-white p-4 sm:p-5 rounded-2xl shadow-2xl border border-zinc-700/80 backdrop-blur-2xl max-w-[240px] sm:max-w-[270px] space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold tracking-tight text-white">
                    ATS Audit Shield
                  </span>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                  98/100
                </span>
              </div>

              <p className="text-[11px] text-zinc-300 leading-snug font-medium">
                100% Workday & Greenhouse parser compliance verified.
              </p>

              <div className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-400 pt-1 border-t border-zinc-800">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>0 Parsing Errors Detected</span>
              </div>
            </motion.div>
          )}

          {/* LAYER 2: Floating 3D XYZ Bullet Formula Card (translateZ: 45px) */}
          {(activeLayer === 'all' || activeLayer === 'xyz') && (
            <motion.div
              style={{ transform: 'translateZ(45px)' }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="absolute -bottom-6 -left-4 sm:-left-8 bg-gradient-to-br from-emerald-900/95 to-zinc-950 text-white p-4 sm:p-5 rounded-2xl shadow-2xl border border-emerald-500/40 backdrop-blur-2xl max-w-[280px] sm:max-w-[320px] space-y-2.5"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Wand2 className="w-4 h-4 text-emerald-400 animate-spin-slow" />
                  <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider">
                    Google XYZ Bullet Engine
                  </span>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-400/20 text-emerald-300">
                  +48% Impact
                </span>
              </div>

              <p className="text-[11px] text-emerald-100/90 leading-relaxed font-mono bg-black/40 p-2.5 rounded-lg border border-emerald-500/20">
                "Reduced P99 deployment cycle time by 48% across 14 microservices."
              </p>
            </motion.div>
          )}
        </motion.div>

        {/* Floating Instruction Callout */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none bg-zinc-900/80 backdrop-blur-md px-4 py-2 rounded-full border border-zinc-700/80 text-xs font-bold text-zinc-300 flex items-center gap-2 shadow-lg">
          <MousePointerClick className="w-3.5 h-3.5 text-emerald-400 animate-bounce" />
          <span>Interactive 3D Perspective Canvas • Hover or Tilt</span>
        </div>
      </div>

      {/* Direct CTA Bar */}
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 bg-zinc-950 text-white p-6 rounded-3xl border border-zinc-800 shadow-xl">
        <div>
          <h4 className="font-display font-bold text-lg text-white">
            Ready to build your 3D-optimized executive resume?
          </h4>
          <p className="text-xs text-zinc-400 mt-0.5">
            Access curated templates, real-time ATS auditing, and instant PDF exports.
          </p>
        </div>

        <button
          type="button"
          onClick={onStartStudio}
          className="w-full sm:w-auto px-7 py-3 bg-white text-zinc-950 hover:bg-zinc-100 text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-lg active:scale-95 whitespace-nowrap"
        >
          Launch Free Studio
        </button>
      </div>
    </div>
  );
};
