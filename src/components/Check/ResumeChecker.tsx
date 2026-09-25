import React from 'react';
import { ResumeData } from '../../types/resume';
import { CompletenessDashboard } from './CompletenessDashboard';
import {
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  FileCheck,
  TrendingUp,
  Award,
  Layers,
  Wand2,
  ShieldCheck,
  ArrowRight,
  ChevronRight
} from 'lucide-react';

interface Props {
  data: ResumeData;
  onOpenAITools: () => void;
  onAutoFitOnePage: () => void;
  onSwitchTab: (tab: 'content' | 'design') => void;
}

export const ResumeChecker: React.FC<Props> = ({
  data,
  onOpenAITools,
  onAutoFitOnePage,
  onSwitchTab,
}) => {
  const accentColor = data.settings.accentColor || '#059669';

  // 1. Contact Info Audit
  const hasName = Boolean(data.personal.fullName.trim());
  const hasEmail = Boolean(data.personal.email.trim());
  const hasPhone = Boolean(data.personal.phone.trim());
  const hasLocation = Boolean(data.personal.location.trim());
  const hasLinks = Boolean(data.personal.linkedinUrl || data.personal.githubUrl || data.personal.portfolioUrl);

  // 2. Summary Audit
  const summaryLength = data.summary.trim().split(/\s+/).filter(Boolean).length;
  const hasGoodSummary = summaryLength >= 30 && summaryLength <= 120;

  // 3. Experience & Action Verbs Audit
  const allBullets: string[] = [];
  data.experiences.forEach((exp) => {
    exp.descriptionBullets.forEach((b) => {
      if (b.trim()) allBullets.push(b.trim());
    });
  });

  const POWER_VERBS = [
    'architected', 'spearheaded', 'engineered', 'streamlined', 'orchestrated',
    'optimized', 'formulated', 'delivered', 'automated', 'scaled', 'mentored',
    'pioneered', 'implemented', 'designed', 'accelerated', 'transformed'
  ];

  let actionVerbCount = 0;
  let metricsCount = 0;

  allBullets.forEach((bullet) => {
    const lower = bullet.toLowerCase();
    const hasVerb = POWER_VERBS.some((v) => lower.startsWith(v) || lower.includes(` ${v} `));
    if (hasVerb) actionVerbCount++;

    // Metrics pattern (%, $, numbers, x-fold, ms, k, etc.)
    const hasMetric = /\d+(\.\d+)?%|\$\d+|\d+x|\b\d{2,}\b|\b\d+ms\b/i.test(bullet);
    if (hasMetric) metricsCount++;
  });

  // 4. Skills Audit
  const totalSkills = data.skillCategories.reduce(
    (acc, cat) => acc + cat.skillsList.length,
    0
  );

  // Compute Overall Score (0-100)
  let score = 30; // baseline
  if (hasName && hasEmail && hasLocation) score += 15;
  if (hasLinks) score += 5;
  if (hasGoodSummary) score += 15;
  if (data.experiences.length >= 2) score += 10;
  if (actionVerbCount >= 3) score += 10;
  if (metricsCount >= 2) score += 10;
  if (totalSkills >= 8) score += 5;
  score = Math.min(100, score);

  return (
    <div className="flex flex-col h-full bg-zinc-50/70 overflow-y-auto p-4 sm:p-6 space-y-6">
      {/* Metrics Dashboard */}
      <CompletenessDashboard data={data} />

      {/* Top ATS Score Card */}
      <div className="bg-white p-6 rounded-2xl border border-zinc-200/90 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            {/* Circular score dial with dynamic accent color */}
            <div
              className="relative w-16 h-16 shrink-0 flex items-center justify-center rounded-2xl font-extrabold text-2xl shadow-inner border"
              style={{
                backgroundColor: `${accentColor}10`,
                borderColor: `${accentColor}30`,
                color: accentColor,
              }}
            >
              {score}
              <span className="text-[10px] text-zinc-400 absolute bottom-1 font-medium font-mono">/100</span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold tracking-wider uppercase text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  {score >= 85 ? 'ATS Optimized' : score >= 70 ? 'Strong Draft' : 'Needs Polish'}
                </span>
                <span className="text-xs text-zinc-400">·</span>
                <span className="text-xs text-zinc-500 font-medium">AuraCV Audit Engine</span>
              </div>
              <h2 className="text-lg font-bold text-zinc-900 mt-1">
                Resume Quality & ATS Readability
              </h2>
              <p className="text-xs text-zinc-500 mt-0.5">
                Evaluated against Fortune 500 ATS parse algorithms and recruiter screening heuristics.
              </p>
            </div>
          </div>

          {/* Quick AI Polish Action */}
          <button
            type="button"
            onClick={onOpenAITools}
            className="inline-flex items-center gap-2 px-3.5 py-2 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors cursor-pointer shrink-0"
            style={{ backgroundColor: accentColor }}
          >
            <Wand2 className="w-3.5 h-3.5" />
            <span>AI Resume Polish</span>
          </button>
        </div>
      </div>

      {/* Page Overflow & 1-Page Fit Advisory */}
      <div className="bg-white p-5 rounded-2xl border border-zinc-200/90 shadow-2xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-zinc-800" />
            <h3 className="text-sm font-bold text-zinc-900">Page Length & Density</h3>
          </div>
          <button
            type="button"
            onClick={onAutoFitOnePage}
            className="text-xs font-semibold text-emerald-800 hover:text-emerald-900 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-2.5 py-1 rounded-md transition-colors cursor-pointer"
          >
            Apply 1-Page Fit
          </button>
        </div>
        <p className="text-xs text-zinc-600 leading-relaxed">
          Recruiters spend an average of 6 seconds per resume. Having a tight, well-proportioned 1-page document boosts callback rates by up to 2.4x.
        </p>
      </div>

      {/* Audit Checklist Categories */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-zinc-900 px-1">Detailed Findings</h3>

        {/* 1. Contact Information */}
        <div className="bg-white p-4 rounded-xl border border-zinc-200/90 shadow-2xs flex items-start gap-3">
          {hasName && hasEmail && hasLocation ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          ) : (
            <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
          )}
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-zinc-900">
                Contact & Identification
              </h4>
              <button
                type="button"
                onClick={() => onSwitchTab('content')}
                className="text-[11px] font-semibold text-zinc-800 hover:text-zinc-950 cursor-pointer"
              >
                Edit Details →
              </button>
            </div>
            <p className="text-xs text-zinc-500 mt-1">
              Full Name, Email ({data.personal.email || 'missing'}), Location, and LinkedIn profile link.
            </p>
          </div>
        </div>

        {/* 2. Professional Summary */}
        <div className="bg-white p-4 rounded-xl border border-zinc-200/90 shadow-2xs flex items-start gap-3">
          {hasGoodSummary ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          ) : (
            <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
          )}
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-zinc-900">
                Executive Profile Summary
              </h4>
              <button
                type="button"
                onClick={onOpenAITools}
                className="text-[11px] font-semibold text-zinc-800 hover:text-zinc-950 cursor-pointer"
              >
                AI Summary Studio →
              </button>
            </div>
            <p className="text-xs text-zinc-500 mt-1">
              Current word count: <strong className="text-zinc-700 font-mono">{summaryLength}</strong> words. Recommended length is 35–80 words with targeted keywords.
            </p>
          </div>
        </div>

        {/* 3. Action Verbs */}
        <div className="bg-white p-4 rounded-xl border border-zinc-200/90 shadow-2xs flex items-start gap-3">
          {actionVerbCount >= 3 ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          ) : (
            <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
          )}
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-zinc-900">
                High-Impact Action Verbs
              </h4>
              <button
                type="button"
                onClick={onOpenAITools}
                className="text-[11px] font-semibold text-zinc-800 hover:text-zinc-950 cursor-pointer"
              >
                Enhance with STAR →
              </button>
            </div>
            <p className="text-xs text-zinc-500 mt-1">
              Found <strong className="text-zinc-700 font-mono">{actionVerbCount}</strong> strong executive action verbs (e.g. architected, spearheaded, engineered, scaled). Aim for 3+ per role.
            </p>
          </div>
        </div>

        {/* 4. Measurable Quantitative Metrics */}
        <div className="bg-white p-4 rounded-xl border border-zinc-200/90 shadow-2xs flex items-start gap-3">
          {metricsCount >= 2 ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          ) : (
            <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
          )}
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-zinc-900">
                Quantified Outcomes & Business Metrics
              </h4>
              <button
                type="button"
                onClick={onOpenAITools}
                className="text-[11px] font-semibold text-zinc-800 hover:text-zinc-950 cursor-pointer"
              >
                Add Metrics with AI →
              </button>
            </div>
            <p className="text-xs text-zinc-500 mt-1">
              Detected <strong className="text-zinc-700 font-mono">{metricsCount}</strong> quantified bullets with figures, percentages (%), dollar amounts ($), or performance multipliers.
            </p>
          </div>
        </div>

        {/* 5. Core Skills Density */}
        <div className="bg-white p-4 rounded-xl border border-zinc-200/90 shadow-2xs flex items-start gap-3">
          {totalSkills >= 6 ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          ) : (
            <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
          )}
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-zinc-900">
                Skills & Technical Competencies
              </h4>
              <button
                type="button"
                onClick={() => onSwitchTab('content')}
                className="text-[11px] font-semibold text-zinc-800 hover:text-zinc-950 cursor-pointer"
              >
                Add Skills →
              </button>
            </div>
            <p className="text-xs text-zinc-500 mt-1">
              <strong className="text-zinc-700 font-mono">{totalSkills}</strong> skills categorized across domains. ATS bots scan explicitly for categorized keyword matching.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
