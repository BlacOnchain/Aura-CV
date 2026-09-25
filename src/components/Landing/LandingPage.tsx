import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Target, 
  ArrowRight, 
  FileText, 
  Zap, 
  CheckCircle2, 
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { HeroStudioDiagram } from './HeroStudioDiagram';
import { ATSScannerDiagram } from './ATSScannerDiagram';
import { BulletNarrativeEngine } from './BulletNarrativeEngine';
import { WorkflowDiagram } from './WorkflowDiagram';
import { PrivacyPolicyModal } from '../Legal/PrivacyPolicyModal';
import { TermsModal } from '../Legal/TermsModal';
import { CookieConsentBanner } from '../Legal/CookieConsentBanner';
import { useDocumentMetadata } from '../../hooks/useDocumentMetadata';

interface Props {
  onStart: (mode?: 'login' | 'register') => void;
}

export const LandingPage: React.FC<Props> = ({ onStart }) => {
  // Enforce dynamic OpenGraph, Twitter, and document metadata for social sharing
  useDocumentMetadata('landing');

  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-zinc-50/50 overflow-x-hidden selection:bg-zinc-900 selection:text-white font-body text-zinc-900 w-full max-w-full">
      {/* Top Navigation Bar with strict 44x44px touch targets */}
      <header className="fixed top-0 left-0 right-0 h-16 sm:h-20 z-50 px-4 sm:px-8 lg:px-12 flex items-center justify-between glass-surface border-x-0 border-t-0">
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          <div className="w-8 h-8 sm:w-9 sm:h-9 bg-zinc-950 rounded-lg flex items-center justify-center shadow-xs shrink-0">
            <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-base sm:text-xl font-display font-bold text-zinc-900 tracking-tight leading-none">
              AuraCV Studio
            </span>
            <span className="text-[9px] sm:text-[10px] text-zinc-400 font-medium tracking-wide">
              Resume Builder & ATS Optimizer
            </span>
          </div>
        </div>
        
        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-xs font-semibold text-zinc-500">
          <a href="#hero" className="hover:text-zinc-900 transition-colors">Overview</a>
          <a href="#pipeline" className="hover:text-zinc-900 transition-colors">How It Works</a>
          <a href="#scanner-demo" className="hover:text-zinc-900 transition-colors">ATS Simulator</a>
          <a href="#bullet-engine" className="hover:text-zinc-900 transition-colors">Bullet Enhancer</a>
        </nav>

        {/* Action Buttons with 44x44px Minimum Touch Targets */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button 
            type="button"
            onClick={() => onStart('login')}
            className="min-h-[44px] min-w-[44px] px-3.5 sm:px-4 py-2 text-xs font-semibold text-zinc-600 hover:text-zinc-950 transition-colors cursor-pointer flex items-center justify-center rounded-xl active:bg-zinc-100"
            aria-label="Sign In"
          >
            Sign In
          </button>
          <button 
            type="button"
            onClick={() => onStart('register')}
            className="min-h-[44px] min-w-[44px] px-3.5 sm:px-5 py-2.5 bg-zinc-950 text-white rounded-xl text-xs font-semibold hover:bg-zinc-800 transition-all active:scale-95 cursor-pointer shadow-md shadow-zinc-200/60 flex items-center justify-center gap-1.5 sm:gap-2 shrink-0"
            aria-label="Open Studio / Register"
          >
            <span>Open Studio</span>
            <ArrowRight className="w-3.5 h-3.5 shrink-0" />
          </button>
        </div>
      </header>

      {/* Hero Section: Responsive Split with Diagram */}
      <section id="hero" className="relative pt-20 sm:pt-28 lg:pt-32 pb-14 sm:pb-20 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Clear, concise introduction */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-6 space-y-5 sm:space-y-6 text-left"
          >
            {/* Kicker Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-200 bg-white text-zinc-700 text-xs font-semibold shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
              <span className="truncate">Intelligent Career Studio</span>
            </div>

            {/* Clear, readable headline with responsive text size and word breaking */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display text-zinc-900 leading-[1.12] sm:leading-[1.08] tracking-tight font-bold break-words">
              Build ATS-Ready Resumes <br className="hidden sm:block" />
              <span className="italic font-normal text-zinc-700">That Land Interviews.</span>
            </h1>

            {/* Concise, readable description */}
            <p className="text-sm sm:text-base lg:text-lg text-zinc-600 font-normal leading-relaxed max-w-xl break-words">
              Turn everyday experience into high-impact bullet points with Google XYZ formulas, audit your keywords against real recruiter filters, and export pixel-perfect A4 resumes.
            </p>

            {/* Single Clear Primary CTA with 48px Touch Target */}
            <div className="flex flex-col sm:flex-row gap-3 pt-1">
              <button 
                type="button"
                onClick={() => onStart('register')}
                className="min-h-[48px] min-w-[48px] w-full sm:w-auto px-7 py-3.5 bg-zinc-950 hover:bg-zinc-800 text-white rounded-xl font-semibold flex items-center justify-center gap-2.5 shadow-lg shadow-zinc-200 transition-all active:scale-[0.98] cursor-pointer text-sm sm:text-base"
              >
                <span>Start Building Free</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </button>

              <a 
                href="#scanner-demo"
                className="min-h-[48px] min-w-[48px] w-full sm:w-auto px-6 py-3.5 bg-white hover:bg-zinc-100 text-zinc-800 border border-zinc-200 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer text-sm sm:text-base shadow-xs active:scale-[0.98]"
              >
                <span>Try ATS Scanner</span>
                <Target className="w-4 h-4 text-zinc-500 shrink-0" />
              </a>
            </div>

            {/* Unboxed trust markers with typographic separators */}
            <div className="pt-2 flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-zinc-500">
              <span className="flex items-center gap-1.5 font-medium text-zinc-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                Workday & Greenhouse Tested
              </span>
              <span aria-hidden="true" className="text-zinc-300">·</span>
              <span className="font-medium text-zinc-700">Strict 1-Page A4 Budget</span>
              <span aria-hidden="true" className="text-zinc-300">·</span>
              <span className="font-medium text-zinc-700">Instant PDF Export</span>
            </div>
          </motion.div>

          {/* Right Column: Hero Studio Diagram */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="lg:col-span-6 w-full max-w-full overflow-hidden"
          >
            <HeroStudioDiagram />
          </motion.div>

        </div>
      </section>

      {/* 4-STAGE PIPELINE SECTION */}
      <section id="pipeline" className="py-14 sm:py-20 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto overflow-hidden">
        <WorkflowDiagram />
      </section>

      {/* LIVE ATS SCANNER SIMULATOR SECTION */}
      <section id="scanner-demo" className="py-14 sm:py-20 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto space-y-6 sm:space-y-8 overflow-hidden">
        <div className="max-w-2xl mx-auto text-center space-y-2 sm:space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-100 text-zinc-700 text-xs font-semibold">
            <Target className="w-3.5 h-3.5 text-zinc-900 shrink-0" />
            <span>Recruiter ATS Simulation</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display text-zinc-900 font-bold break-words">
            Simulate Recruiter Filters Before Applying
          </h2>
          <p className="text-zinc-500 text-xs sm:text-sm md:text-base leading-relaxed break-words">
            Audit your resume keywords, section syntax, and parse scores in real-time.
          </p>
        </div>

        {/* ATS Diagram */}
        <ATSScannerDiagram />
      </section>

      {/* AI BULLET NARRATIVE ENHANCER SECTION */}
      <section id="bullet-engine" className="py-14 sm:py-20 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto space-y-6 sm:space-y-8 overflow-hidden">
        <div className="max-w-2xl mx-auto text-center space-y-2 sm:space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-100 text-zinc-700 text-xs font-semibold">
            <Zap className="w-3.5 h-3.5 text-zinc-900 shrink-0" />
            <span>Executive Bullet Rewriter</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display text-zinc-900 font-bold break-words">
            Elevate Tasks Into Measurable Achievements
          </h2>
          <p className="text-zinc-500 text-xs sm:text-sm md:text-base leading-relaxed break-words">
            Apply the proven Google XYZ formula: Accomplished [X], measured by [Y], by doing [Z].
          </p>
        </div>

        {/* Bullet Engine Component */}
        <BulletNarrativeEngine />
      </section>

      {/* CORE FEATURES (CLEAR IMAGES & SUCCINCT COPY) */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto space-y-8 sm:space-y-10 overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4 pb-4 border-b border-zinc-200">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Complete Career Suite</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display text-zinc-900 font-bold mt-1 break-words">
              Engineered For Career Readiness
            </h2>
          </div>
          <p className="text-zinc-500 text-xs sm:text-sm max-w-xs break-words">
            Purpose-built tools to eliminate guesswork and maximize interview callbacks.
          </p>
        </div>

        {/* 3 Prominent Feature Cards with Optimized Images and Alt Text */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
          {/* Card 1: AI Bullet Polish */}
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-zinc-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col">
            <div className="relative aspect-[16/10] sm:aspect-[4/3] w-full overflow-hidden bg-zinc-100">
              <img 
                src="/src/assets/images/resume_bullet_editor_1790341257964.jpg" 
                alt="AI Resume bullet editor showing impact metrics and Google XYZ formula suggestions"
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute top-3 left-3 bg-white/95 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider text-zinc-800 shadow-xs border border-zinc-200">
                AI Bullet Polish
              </div>
            </div>
            <div className="p-4 sm:p-6 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <h3 className="text-base sm:text-lg lg:text-xl font-display font-bold text-zinc-900 break-words">
                  Precision Narrative Writing
                </h3>
                <p className="text-zinc-500 text-xs sm:text-sm leading-relaxed mt-1.5 break-words">
                  Generate strong action verbs, eliminate passive wording, and quantify daily accomplishments.
                </p>
              </div>
              <div className="pt-3 border-t border-zinc-100 flex items-center justify-between text-xs text-zinc-600 font-medium">
                <span>4.2x Impact Increase</span>
                <span className="text-zinc-400 font-mono text-[11px]">XYZ Formula</span>
              </div>
            </div>
          </div>

          {/* Card 2: ATS Scanner */}
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-zinc-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col">
            <div className="relative aspect-[16/10] sm:aspect-[4/3] w-full overflow-hidden bg-zinc-100">
              <img 
                src="/src/assets/images/ats_recruiter_scanner_1790341245736.jpg" 
                alt="Recruiter workstation reviewing candidates with automated keyword match scoring"
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute top-3 left-3 bg-white/95 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider text-zinc-800 shadow-xs border border-zinc-200">
                Recruiter ATS Audit
              </div>
            </div>
            <div className="p-4 sm:p-6 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <h3 className="text-base sm:text-lg lg:text-xl font-display font-bold text-zinc-900 break-words">
                  ATS Recruiter Matcher
                </h3>
                <p className="text-zinc-500 text-xs sm:text-sm leading-relaxed mt-1.5 break-words">
                  Scan candidate profiles against job requirements to spot missing skills and formatting errors.
                </p>
              </div>
              <div className="pt-3 border-t border-zinc-100 flex items-center justify-between text-xs text-zinc-600 font-medium">
                <span>99.2% Parse Reliability</span>
                <span className="text-zinc-400 font-mono text-[11px]">Workday Ready</span>
              </div>
            </div>
          </div>

          {/* Card 3: Matched Application Suite */}
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-zinc-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col sm:col-span-2 lg:col-span-1">
            <div className="relative aspect-[16/10] sm:aspect-[4/3] w-full overflow-hidden bg-zinc-100">
              <img 
                src="/src/assets/images/portfolio_coverletter_package_1790341270829.jpg" 
                alt="Cohesive job application package showing matching resume and cover letter documents"
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute top-3 left-3 bg-white/95 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider text-zinc-800 shadow-xs border border-zinc-200">
                Application Suite
              </div>
            </div>
            <div className="p-4 sm:p-6 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <h3 className="text-base sm:text-lg lg:text-xl font-display font-bold text-zinc-900 break-words">
                  Matched Cover Letter & Suite
                </h3>
                <p className="text-zinc-500 text-xs sm:text-sm leading-relaxed mt-1.5 break-words">
                  Export consistent styling across your resume and cover letter in print-ready A4 PDF format.
                </p>
              </div>
              <div className="pt-3 border-t border-zinc-100 flex items-center justify-between text-xs text-zinc-600 font-medium">
                <span>One-Click Multi-Format</span>
                <span className="text-zinc-400 font-mono text-[11px]">PDF & Plaintext</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CALL TO ACTION */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-12 max-w-5xl mx-auto text-center overflow-hidden">
        <div className="bg-zinc-950 text-white rounded-2xl sm:rounded-3xl p-6 sm:p-12 md:p-16 shadow-xl space-y-6">
          <div className="space-y-3 max-w-xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
              Ready to Advance?
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white leading-tight break-words">
              Create Your Executive Resume Today
            </h2>
            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed break-words">
              Start building with curated templates, ATS optimization, and AI bullet writing.
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center items-center">
            <button
              type="button"
              onClick={() => onStart('register')}
              className="min-h-[48px] min-w-[48px] w-full sm:w-auto px-7 py-3.5 bg-white text-zinc-950 hover:bg-zinc-100 rounded-xl font-bold flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.98] cursor-pointer text-sm sm:text-base"
            >
              <span>Launch Free Studio</span>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </button>
            <button
              type="button"
              onClick={() => onStart('login')}
              className="min-h-[48px] min-w-[48px] w-full sm:w-auto px-6 py-3.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 rounded-xl font-medium transition-all cursor-pointer text-sm flex items-center justify-center active:scale-[0.98]"
            >
              Sign In to Existing Session
            </button>
          </div>
        </div>
      </section>

      {/* CLEAN FOOTER WITH LEGAL LINKS & CREATOR PORTFOLIO */}
      <footer className="border-t border-zinc-200/80 bg-white py-10 sm:py-12 px-4 sm:px-6 lg:px-12 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          {/* Brand info */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 bg-zinc-950 rounded-lg flex items-center justify-center shrink-0">
                <FileText className="w-4 h-4 text-white" />
              </div>
              <span className="text-base font-display font-bold text-zinc-900 tracking-tight">
                AuraCV Studio
              </span>
            </div>
            <p className="text-xs text-zinc-500 break-words">
              Precision resume engineering & ATS career tools.
            </p>
          </div>

          {/* Links & Portfolio Button (Touch Friendly >= 44x44px) */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-xs text-zinc-600">
            <a href="#pipeline" className="hover:text-zinc-900 transition-colors py-2">How It Works</a>
            <a href="#scanner-demo" className="hover:text-zinc-900 transition-colors py-2">ATS Simulator</a>
            <a href="#bullet-engine" className="hover:text-zinc-900 transition-colors py-2">Bullet Enhancer</a>

            {/* Creator Portfolio Button */}
            <a 
              href="https://blaconchain.github.io/Portfolio/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center gap-2 px-4 py-2 bg-black hover:bg-zinc-800 text-white rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 no-underline cursor-pointer border border-zinc-800 shrink-0"
              aria-label="View Creator Portfolio"
            >
              <span>Creator Portfolio</span>
              <ExternalLink className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
            </a>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-6 mt-6 border-t border-zinc-100 flex flex-col sm:flex-row justify-between items-center text-[11px] text-zinc-500 gap-3">
          <p>© 2026 AuraCV Studio. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setIsPrivacyOpen(true)}
              className="min-h-[44px] inline-flex items-center text-zinc-500 hover:text-zinc-900 transition-colors cursor-pointer underline underline-offset-4"
            >
              Privacy Policy
            </button>
            <span aria-hidden="true" className="text-zinc-300">·</span>
            <button
              type="button"
              onClick={() => setIsTermsOpen(true)}
              className="min-h-[44px] inline-flex items-center text-zinc-500 hover:text-zinc-900 transition-colors cursor-pointer underline underline-offset-4"
            >
              Terms of Service
            </button>
            <span aria-hidden="true" className="text-zinc-300">·</span>
            <span className="flex items-center gap-1 text-emerald-600 font-medium">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>TLS / HTTPS Secured</span>
            </span>
          </div>
        </div>
      </footer>

      {/* Legal Modals & Cookie Banner */}
      <PrivacyPolicyModal isOpen={isPrivacyOpen} onClose={() => setIsPrivacyOpen(false)} />
      <TermsModal isOpen={isTermsOpen} onClose={() => setIsTermsOpen(false)} />
      <CookieConsentBanner onOpenPrivacy={() => setIsPrivacyOpen(true)} />
    </div>
  );
};
