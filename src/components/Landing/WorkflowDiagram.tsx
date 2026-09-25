import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileUp, 
  Sparkles, 
  Target, 
  Download, 
  Check, 
  ArrowRight
} from 'lucide-react';

interface Step {
  id: number;
  title: string;
  tagline: string;
  desc: string;
  icon: React.ComponentType<{ className?: string }>;
  highlights: string[];
  mockupSnippet: { title: string; lines: string[]; status: string };
}

const STEPS: Step[] = [
  {
    id: 1,
    title: '1. Ingest & Draft',
    tagline: 'Zero-effort career import',
    desc: 'Upload an existing PDF, paste your LinkedIn text, or start with curated templates tailored for technical and executive roles.',
    icon: FileUp,
    highlights: ['Multi-page PDF parsing', 'LinkedIn JSON & text ingestion', 'Role-specific starter presets'],
    mockupSnippet: {
      title: 'Parser Status: Ready',
      lines: ['Extracted 4 Work Experiences', 'Detected 18 Technical Skills', 'Normalized Education & Degrees'],
      status: 'Document Loaded in 1.2s'
    }
  },
  {
    id: 2,
    title: '2. Narrative Polish',
    tagline: 'Precision AI bullet writing',
    desc: 'Transform raw tasks into quantifiable achievements using the proven Google XYZ formula (Accomplished [X] as measured by [Y] by doing [Z]).',
    icon: Sparkles,
    highlights: ['Impact metric injections', 'Power action verb suggestions', 'Fluff & buzzword detector'],
    mockupSnippet: {
      title: 'AI Optimization Engine',
      lines: ['Replaced "Helped with app" -> "Engineered"', 'Calculated +44% latency reduction metric', 'Scored 98/100 impact clarity'],
      status: '3 Bullets Elevated'
    }
  },
  {
    id: 3,
    title: '3. ATS Audit',
    tagline: 'Real recruiter algorithm scan',
    desc: 'Scan your resume against any job description. Identify missing keywords, keyword density, section headers, and recruiter readability.',
    icon: Target,
    highlights: ['Workday & Greenhouse syntax check', 'Role keyword match percentage', 'Live gap recommendation list'],
    mockupSnippet: {
      title: 'Recruiter Filter Report',
      lines: ['Match Alignment: 96%', 'Missing keywords: 1 optional', 'Formatting: 100% Machine Readable'],
      status: 'Shortlist Recommended'
    }
  },
  {
    id: 4,
    title: '4. Executive Export',
    tagline: 'Complete application suite',
    desc: 'Download pixel-perfect, printer-ready A4 PDFs with strict page budgets, accompanied by a matching editorial cover letter.',
    icon: Download,
    highlights: ['Strict 1-page budget meter', 'Print-optimized CSS & vector typography', 'Matched cover letter export'],
    mockupSnippet: {
      title: 'Export Package Ready',
      lines: ['Julian_Vane_Resume_2026.pdf (A4)', 'Julian_Vane_CoverLetter.pdf', 'Workday Plaintext Clean Copy (.txt)'],
      status: 'Ready for Submission'
    }
  }
];

export const WorkflowDiagram: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(1);
  const current = STEPS.find((s) => s.id === activeStep) || STEPS[0];
  const Icon = current.icon;

  return (
    <div className="bg-white rounded-2xl sm:rounded-[36px] border border-zinc-200/80 p-4 sm:p-8 md:p-12 shadow-xl shadow-zinc-100/50 max-w-full overflow-hidden">
      {/* Header */}
      <div className="max-w-2xl mx-auto text-center space-y-2 sm:space-y-3 mb-8 sm:mb-10">
        <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-400">
          The Career Engineering Pipeline
        </span>
        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-zinc-900 break-words">
          How AuraCV Lands You Executive Interviews
        </h3>
        <p className="text-xs sm:text-sm md:text-base text-zinc-500 font-medium leading-relaxed break-words">
          From an unformatted draft to a recruiter-ready, ATS-compliant application suite in 4 seamless stages.
        </p>
      </div>

      {/* Step Selector Pipeline Tabs with Touch-Friendly (min 48px height) targets */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3 mb-6 sm:mb-8">
        {STEPS.map((step) => {
          const StepIcon = step.icon;
          const isActive = step.id === activeStep;
          return (
            <button
              key={step.id}
              type="button"
              onClick={() => setActiveStep(step.id)}
              className={`min-h-[56px] p-3 sm:p-4 rounded-xl sm:rounded-2xl border text-left transition-all cursor-pointer relative overflow-hidden active:scale-95 ${
                isActive
                  ? 'bg-zinc-950 text-white border-zinc-950 shadow-lg shadow-zinc-200/50'
                  : 'bg-zinc-50/70 hover:bg-zinc-100/80 text-zinc-700 border-zinc-200/70'
              }`}
            >
              <div className="flex items-center justify-between mb-2 sm:mb-3">
                <div
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center ${
                    isActive ? 'bg-zinc-800 text-white' : 'bg-white border border-zinc-200 text-zinc-800'
                  }`}
                >
                  <StepIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <span
                  className={`text-[9px] sm:text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                    isActive ? 'bg-zinc-800 text-zinc-300' : 'bg-zinc-200 text-zinc-600'
                  }`}
                >
                  0{step.id}
                </span>
              </div>
              <div className="font-bold text-xs sm:text-sm tracking-tight truncate">{step.title.split('. ')[1]}</div>
              <div
                className={`text-[10px] sm:text-[11px] truncate mt-0.5 ${
                  isActive ? 'text-zinc-400' : 'text-zinc-500'
                }`}
              >
                {step.tagline}
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Step Showcase */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeStep}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.25 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center bg-zinc-50 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 border border-zinc-200/70"
        >
          {/* Left: Step details */}
          <div className="lg:col-span-6 space-y-4 sm:space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-zinc-200 text-xs font-semibold text-zinc-700 shadow-xs">
              <Icon className="w-3.5 h-3.5 text-zinc-900 shrink-0" />
              <span className="truncate">{current.tagline}</span>
            </div>

            <h4 className="text-xl sm:text-2xl lg:text-3xl font-display font-bold text-zinc-900 break-words">
              {current.title}
            </h4>

            <p className="text-zinc-600 leading-relaxed text-xs sm:text-sm md:text-base break-words">
              {current.desc}
            </p>

            <div className="space-y-2 pt-1">
              {current.highlights.map((h, i) => (
                <div key={i} className="flex items-center gap-2.5 text-xs text-zinc-700 font-medium">
                  <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                  <span className="break-words">{h}</span>
                </div>
              ))}
            </div>

            {/* Next step button - 44px min height for mobile touch */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setActiveStep(activeStep === 4 ? 1 : activeStep + 1)}
                className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center gap-2 px-4 py-2 bg-white hover:bg-zinc-100 border border-zinc-200 rounded-xl text-xs font-bold uppercase tracking-wider text-zinc-900 transition-colors cursor-pointer active:scale-95 shadow-xs"
              >
                <span>{activeStep === 4 ? 'Cycle to Step 1' : `Next: Step 0${activeStep + 1}`}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right: Interactive Mockup Card */}
          <div className="lg:col-span-6 w-full">
            <div className="bg-white rounded-xl sm:rounded-2xl border border-zinc-200/80 p-4 sm:p-6 shadow-md space-y-3 sm:space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-2.5 h-2.5 rounded-full bg-zinc-300 shrink-0" />
                  <span className="text-xs font-bold text-zinc-900 truncate">{current.mockupSnippet.title}</span>
                </div>
                <span className="text-[10px] font-mono bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded font-semibold shrink-0 ml-2">
                  {current.mockupSnippet.status}
                </span>
              </div>

              <div className="space-y-2">
                {current.mockupSnippet.lines.map((line, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 sm:p-3 bg-zinc-50 rounded-xl border border-zinc-100 flex items-center gap-2.5 text-xs text-zinc-700"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-zinc-900 shrink-0" />
                    <span className="break-words">{line}</span>
                  </div>
                ))}
              </div>

              <div className="pt-1 flex items-center justify-between text-[11px] text-zinc-400">
                <span>Phase verification: Confirmed</span>
                <span className="text-zinc-900 font-bold">AuraCV Studio Core</span>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
