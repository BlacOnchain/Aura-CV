import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  FileText, 
  CheckCircle2, 
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { AuraAestheticIllustration } from './AuraAestheticIllustration';
import { PrivacyPolicyModal } from '../Legal/PrivacyPolicyModal';
import { TermsModal } from '../Legal/TermsModal';
import { CookieConsentBanner } from '../Legal/CookieConsentBanner';
import { useDocumentMetadata } from '../../hooks/useDocumentMetadata';
import { BrandLogo } from '../Brand/BrandLogo';
import { BlueprintBackground } from '../Common/BlueprintBackground';

interface Props {
  onStart: (mode?: 'login' | 'register') => void;
}

export const LandingPage: React.FC<Props> = ({ onStart }) => {
  useDocumentMetadata('landing');

  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);

  const headlineLine1 = "Architect Your Career Identity.";
  const headlineLine2 = "With Precision.";

  return (
    <div className="min-h-screen bg-zinc-50/60 overflow-x-hidden selection:bg-zinc-900 selection:text-white font-body text-zinc-900 w-full max-w-full">
      <BlueprintBackground />
      {/* Navigation Header */}
      <header className="fixed top-0 left-0 right-0 h-16 sm:h-20 z-50 px-4 sm:px-8 lg:px-12 flex items-center justify-between glass-surface border-x-0 border-t-0">
        <div 
          onClick={() => {
            const hero = document.getElementById('hero');
            if (hero) hero.scrollIntoView({ behavior: 'smooth' });
            else window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="cursor-pointer group"
        >
          <BrandLogo size="md" />
        </div>
        
        <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-zinc-500">
          <a href="#hero" className="hover:text-zinc-900 transition-colors">Overview</a>
          <a href="#workflow" className="hover:text-zinc-900 transition-colors">Workflow</a>
        </nav>

        <div className="flex items-center gap-2 shrink-0">
          <button 
            type="button"
            onClick={() => onStart('login')}
            className="px-3.5 py-2 text-xs font-semibold text-zinc-600 hover:text-zinc-950 transition-colors cursor-pointer rounded-lg"
          >
            Sign In
          </button>
          <button 
            type="button"
            onClick={() => onStart('register')}
            className="px-4 py-2.5 bg-zinc-900 text-white rounded-xl text-xs font-semibold hover:bg-zinc-800 transition-all cursor-pointer shadow-2xs flex items-center gap-1.5"
          >
            <span>Open Studio</span>
            <ArrowRight className="w-3.5 h-3.5 shrink-0" />
          </button>
        </div>
      </header>

      {/* Clean Aesthetic Hero Section */}
      <section id="hero" className="pt-28 sm:pt-36 pb-8 sm:pb-12 px-4 sm:px-6 lg:px-12 max-w-5xl mx-auto text-center space-y-6">

        <motion.div 
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-4 max-w-3xl mx-auto relative z-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-200 bg-white text-zinc-800 text-xs font-semibold shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-zinc-900" />
            <span>Clean & Minimalist Resume Studio</span>
          </div>

          {/* Draft-In Kinetic Animated Headline */}
          <motion.h1 
            initial="hidden"
            animate="visible"
            className="text-3xl sm:text-5xl lg:text-6xl font-display font-bold text-zinc-950 tracking-tight leading-tight"
          >
            <div>
              {headlineLine1.split(' ').map((word, wI) => (
                <React.Fragment key={wI}>
                  <motion.span
                    variants={{
                      hidden: { opacity: 0 },
                      visible: { opacity: 1, transition: { staggerChildren: 0.02 } }
                    }}
                    style={{ display: 'inline-block', whiteSpace: 'nowrap' }}
                  >
                    {word.split('').map((char, cI) => (
                      <motion.span
                        key={cI}
                        variants={{
                          hidden: { opacity: 0, y: 6, filter: 'blur(2px)' },
                          visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.3 } }
                        }}
                        style={{ display: 'inline-block' }}
                      >
                        {char}
                      </motion.span>
                    ))}
                  </motion.span>
                  {wI < headlineLine1.split(' ').length - 1 && ' '}
                </React.Fragment>
              ))}
            </div>
            <div className="italic font-normal text-zinc-700 mt-1">
              {headlineLine2.split(' ').map((word, wI) => (
                <React.Fragment key={wI}>
                  <motion.span
                    variants={{
                      hidden: { opacity: 0 },
                      visible: { opacity: 1, transition: { staggerChildren: 0.02 } }
                    }}
                    style={{ display: 'inline-block', whiteSpace: 'nowrap' }}
                  >
                    {word.split('').map((char, cI) => (
                      <motion.span
                        key={cI}
                        variants={{
                          hidden: { opacity: 0, y: 6, filter: 'blur(2px)' },
                          visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.3 } }
                        }}
                        style={{ display: 'inline-block' }}
                      >
                        {char}
                      </motion.span>
                    ))}
                  </motion.span>
                  {wI < headlineLine2.split(' ').length - 1 && ' '}
                </React.Fragment>
              ))}
            </div>
          </motion.h1>

          <p className="text-sm sm:text-base text-zinc-600 max-w-xl mx-auto leading-relaxed">
            Format action bullets using Google XYZ metrics, audit skill coverage against ATS recruiter filters, and export print-ready A4 resumes.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center items-center">
            <button 
              type="button"
              onClick={() => onStart('register')}
              className="w-full sm:w-auto px-7 py-3 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl font-semibold flex items-center justify-center gap-2 shadow-2xs transition-all cursor-pointer text-sm"
            >
              <span>Start Building Now</span>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </button>
            <button 
              type="button"
              onClick={() => onStart('login')}
              className="w-full sm:w-auto px-6 py-3 bg-white hover:bg-zinc-100 text-zinc-800 border border-zinc-200 rounded-xl font-semibold transition-all cursor-pointer text-sm"
            >
              Access Saved Session
            </button>
          </div>

          <div className="pt-3 flex flex-wrap justify-center items-center gap-3 text-xs text-zinc-500 font-medium">
            <span className="flex items-center gap-1.5 text-zinc-700">
              <CheckCircle2 className="w-3.5 h-3.5 text-zinc-900" />
              Workday & Greenhouse Parser Compatible
            </span>
            <span>·</span>
            <span>Single-Page A4 Layout</span>
            <span>·</span>
            <span>Instant PDF Export</span>
          </div>
        </motion.div>

        {/* The One Point Minimalist Aesthetic Illustration */}
        <AuraAestheticIllustration onStart={() => onStart('register')} />
      </section>

      {/* Simple 3-Step Workflow Process */}
      <section id="workflow" className="py-10 sm:py-14 px-4 sm:px-6 lg:px-12 max-w-5xl mx-auto space-y-6">
        <div className="text-center space-y-1.5">
          <span className="text-xs font-mono font-semibold uppercase text-zinc-400">Streamlined Process</span>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-zinc-900">
            Three Steps To Career Excellence
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-white p-6 rounded-2xl border border-zinc-200/90 shadow-2xs space-y-2">
            <div className="w-8 h-8 rounded-lg bg-zinc-100 flex items-center justify-center text-zinc-900 font-mono font-bold text-xs">
              01
            </div>
            <h3 className="text-base font-bold text-zinc-900 pt-1">Quantify Experience</h3>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Auto-rewrite responsibilities using measurable impact statistics and action verbs.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-zinc-200/90 shadow-2xs space-y-2">
            <div className="w-8 h-8 rounded-lg bg-zinc-100 flex items-center justify-center text-zinc-900 font-mono font-bold text-xs">
              02
            </div>
            <h3 className="text-base font-bold text-zinc-900 pt-1">ATS Keyword Audit</h3>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Scan target job descriptions to identify missing skills and eliminate formatting errors.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-zinc-200/90 shadow-2xs space-y-2">
            <div className="w-8 h-8 rounded-lg bg-zinc-100 flex items-center justify-center text-zinc-900 font-mono font-bold text-xs">
              03
            </div>
            <h3 className="text-base font-bold text-zinc-900 pt-1">Export PDF Package</h3>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Download clean A4 PDFs and matching cover letters formatted for instant submission.
            </p>
          </div>
        </div>
      </section>

      {/* Clean, Light Call To Action Section (No Big Black Box!) */}
      <section className="py-10 sm:py-14 px-4 sm:px-6 lg:px-12 max-w-4xl mx-auto text-center">
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-zinc-200 space-y-5">
          <div className="space-y-2 max-w-md mx-auto">
            <span className="text-xs font-bold font-mono uppercase tracking-widest text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200 inline-block">
              READY TO ADVANCE?
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-zinc-900 leading-tight">
              Create Your Executive Resume Today
            </h2>
            <p className="text-zinc-500 text-xs sm:text-sm leading-relaxed">
              Start building with curated templates, ATS optimization, and AI bullet writing.
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center items-center">
            <button
              type="button"
              onClick={() => onStart('register')}
              className="w-full sm:w-auto px-7 py-3 bg-zinc-900 text-white hover:bg-zinc-800 font-bold rounded-xl text-xs sm:text-sm transition-all cursor-pointer shadow-2xs"
            >
              <span>Launch Free Studio</span>
              <ArrowRight className="w-4 h-4 inline-block ml-1.5" />
            </button>
            <button
              type="button"
              onClick={() => onStart('login')}
              className="w-full sm:w-auto px-6 py-3 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 border border-zinc-200 font-medium rounded-xl text-xs sm:text-sm transition-all cursor-pointer"
            >
              Sign In to Existing Session
            </button>
          </div>
        </div>
      </section>

      {/* Clean Footer */}
      <footer className="border-t border-zinc-200 bg-white py-8 px-4 sm:px-8 lg:px-12">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-zinc-500">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-zinc-900 rounded-md flex items-center justify-center">
              <FileText className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-display font-bold text-zinc-900 text-sm">AuraCV Studio</span>
          </div>

          <div className="flex items-center gap-3 text-[11px]">
            <button type="button" onClick={() => setIsPrivacyOpen(true)} className="hover:underline">Privacy</button>
            <span>·</span>
            <button type="button" onClick={() => setIsTermsOpen(true)} className="hover:underline">Terms</button>
            <span>·</span>
            <span className="flex items-center gap-1 text-emerald-600 font-medium">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>TLS Secured</span>
            </span>
          </div>
        </div>
      </footer>

      {/* Modals & Cookie Banner */}
      <PrivacyPolicyModal isOpen={isPrivacyOpen} onClose={() => setIsPrivacyOpen(false)} />
      <TermsModal isOpen={isTermsOpen} onClose={() => setIsTermsOpen(false)} />
      <CookieConsentBanner onOpenPrivacy={() => setIsPrivacyOpen(true)} />
    </div>
  );
};
