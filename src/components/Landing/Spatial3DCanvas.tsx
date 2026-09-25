import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { 
  Sparkles, 
  Target, 
  Wand2, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Layers,
  FileText
} from 'lucide-react';

interface Props {
  onStartStudio?: () => void;
}

export const Spatial3DCanvas: React.FC<Props> = ({ onStartStudio }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [activeTab, setActiveTab] = useState<'ats' | 'xyz'>('xyz');

  // Motion values for desktop 3D tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), {
    stiffness: 150,
    damping: 18,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), {
    stiffness: 150,
    damping: 18,
  });

  useEffect(() => {
    // Detect touch-only screen
    const checkTouch = () => {
      setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };
    checkTouch();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouchDevice || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const x = (e.clientX - rect.left) / width - 0.5;
    const y = (e.clientY - rect.top) / height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    if (isTouchDevice) return;
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-5xl mx-auto py-6 sm:py-10 px-2 sm:px-4"
    >
      <div className="text-center space-y-2 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-100 text-zinc-800 text-xs font-semibold border border-zinc-200">
          <Sparkles className="w-3.5 h-3.5 text-zinc-900" />
          <span>Interactive 3D Motion Canvas</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-display font-bold text-zinc-950 tracking-tight">
          Executive Resume Architecture
        </h2>
        <p className="text-xs sm:text-sm text-zinc-600">
          Hover or tilt to explore live ATS parser validation and Google XYZ metric rewrite engines.
        </p>
      </div>

      {/* Perspective Container */}
      <div 
        className="perspective-1000 w-full"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <motion.div
          ref={cardRef}
          style={{
            rotateX: isTouchDevice ? 0 : rotateX,
            rotateY: isTouchDevice ? 0 : rotateY,
            transformStyle: 'preserve-3d',
          }}
          animate={
            isTouchDevice
              ? {
                  rotateX: [2, -2, 2],
                  rotateY: [-3, 3, -3],
                }
              : undefined
          }
          transition={
            isTouchDevice
              ? {
                  duration: 6,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }
              : undefined
          }
          className="w-full bg-white rounded-3xl border border-zinc-200/90 shadow-xl overflow-hidden text-zinc-900 relative transition-shadow hover:shadow-2xl"
        >
          {/* Unified Zinc & Emerald Ambient Backdrop Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-zinc-200/50 rounded-full blur-3xl pointer-events-none -z-10" />

          {/* Header Controls */}
          <div className="bg-zinc-950 text-white px-5 sm:px-8 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-zinc-800">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center shrink-0">
                <FileText className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="font-display font-bold text-sm sm:text-base text-white">
                  AuraCV Studio Pipeline
                </h3>
                <p className="text-[11px] text-zinc-400">
                  Real-time document parser & formula engine
                </p>
              </div>
            </div>

            {/* Segmented Tab Controls */}
            <div className="flex items-center gap-1 bg-zinc-900 p-1 rounded-xl border border-zinc-800 w-full sm:w-auto justify-center">
              <button
                type="button"
                onClick={() => setActiveTab('xyz')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'xyz'
                    ? 'bg-white text-zinc-950 shadow-xs'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Wand2 className="w-3.5 h-3.5" />
                <span>XYZ Bullets</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('ats')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'ats'
                    ? 'bg-white text-zinc-950 shadow-xs'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Target className="w-3.5 h-3.5" />
                <span>ATS Audit</span>
              </button>
            </div>
          </div>

          {/* Studio Body */}
          <div className="p-6 sm:p-8 bg-gradient-to-b from-zinc-50/50 via-white to-zinc-50/30">
            {activeTab === 'xyz' ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-zinc-500 uppercase tracking-wider">
                    Google XYZ Formula
                  </span>
                  <span className="px-2.5 py-0.5 rounded-md text-[11px] font-mono font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                    +48% Recruiter Impact
                  </span>
                </div>

                <div className="p-4 sm:p-5 rounded-2xl bg-white border border-zinc-200/90 shadow-2xs space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-zinc-900">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span>Transformed Experience Outcome:</span>
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-800 leading-relaxed font-body font-medium">
                    "Architected high-throughput CI/CD deployment pipeline delivering 140+ monthly releases, reducing deployment cycle time by 48% across 12 microservices."
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
                  <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-200/80">
                    <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase">Action Verb</span>
                    <p className="font-bold text-zinc-900 mt-0.5">Architected</p>
                  </div>
                  <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-200/80">
                    <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase">Measured Metric</span>
                    <p className="font-bold text-emerald-700 mt-0.5">48% Time Saved</p>
                  </div>
                  <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-200/80">
                    <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase">Scope</span>
                    <p className="font-bold text-zinc-900 mt-0.5">12 Microservices</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-zinc-500 uppercase tracking-wider">
                    Parser Verification
                  </span>
                  <span className="px-2.5 py-0.5 rounded-md text-[11px] font-mono font-bold bg-zinc-950 text-white">
                    98% Parse Index
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-xl bg-white border border-zinc-200/80 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span className="text-xs font-medium text-zinc-800">TypeScript & React</span>
                    </div>
                    <span className="text-[11px] font-mono text-zinc-400">Match 5x</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white border border-zinc-200/80 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span className="text-xs font-medium text-zinc-800">AWS & Infrastructure</span>
                    </div>
                    <span className="text-[11px] font-mono text-zinc-400">Match 3x</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white border border-zinc-200/80 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span className="text-xs font-medium text-zinc-800">CI/CD Pipelines</span>
                    </div>
                    <span className="text-[11px] font-mono text-zinc-400">Match 4x</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white border border-zinc-200/80 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span className="text-xs font-medium text-zinc-800">System Architecture</span>
                    </div>
                    <span className="text-[11px] font-mono text-zinc-400">Match 2x</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer Bar */}
          <div className="bg-zinc-50 px-6 sm:px-8 py-3.5 border-t border-zinc-200 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs text-zinc-600">
              <ShieldCheck className="w-4 h-4 text-zinc-900" />
              <span>Workday & Greenhouse Parser Certified</span>
            </div>
            {onStartStudio && (
              <button
                type="button"
                onClick={onStartStudio}
                className="w-full sm:w-auto px-5 py-2 bg-zinc-950 hover:bg-zinc-800 text-white rounded-xl text-xs font-semibold transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Launch Free Studio</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
