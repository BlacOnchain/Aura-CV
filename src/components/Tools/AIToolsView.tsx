import React, { useState } from 'react';
import { ResumeData } from '../../types/resume';
import { AISkillSuggestions } from '../ResumeForm/AISkillSuggestions';
import { callAI } from '../../utils/aiClient';
import {
  Sparkles,
  Zap,
  TrendingUp,
  Scissors,
  Loader2,
  FileText,
  Target,
  Wand2,
  Bot,
  ArrowLeft
} from 'lucide-react';

interface Props {
  resumeData: ResumeData;
  onUpdateResume: (updated: ResumeData) => void;
  onOpenATS: () => void;
  onOpenCoverLetter: () => void;
  onBack?: () => void;
}

export const AIToolsView: React.FC<Props> = ({
  resumeData,
  onUpdateResume,
  onOpenATS,
  onOpenCoverLetter,
  onBack
}) => {
  const [activeTab, setActiveTab] = useState<'bullet' | 'summary' | 'skills'>('bullet');

  // Bullet improver state
  const [inputBullet, setInputBullet] = useState('');
  const [bulletMode, setBulletMode] = useState<'star' | 'metrics' | 'concise' | 'grammar'>('star');
  const [enhancedBullet, setEnhancedBullet] = useState('');
  const [isEnhancingBullet, setIsEnhancingBullet] = useState(false);
  const [copiedBullet, setCopiedBullet] = useState(false);

  // Summary state
  const [summaryTone, setSummaryTone] = useState('Senior & Results-driven');
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);
  const [generatedSummary, setGeneratedSummary] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Skills state
  const [targetRole, _setTargetRole] = useState(resumeData.personal.title || 'Software Engineer');

  const handleEnhanceBullet = async () => {
    if (!inputBullet.trim()) return;
    setIsEnhancingBullet(true);
    setErrorMessage(null);
    
    const result = await callAI<any>('/api/ai/enhance-bullet', {
      bullet: inputBullet,
      role: resumeData.personal.title || 'Tech Professional',
      mode: bulletMode,
    });

    if (result.error) {
      setErrorMessage(result.error);
      setIsEnhancingBullet(false);
      return;
    }

    if (result.data?.enhanced) {
      setEnhancedBullet(result.data.enhanced);
    }
    
    setIsEnhancingBullet(false);
  };

  const handleGenerateSummary = async () => {
    setIsGeneratingSummary(true);
    setErrorMessage(null);
    
    const result = await callAI<any>('/api/ai/generate-summary', {
      resumeData,
      tone: summaryTone,
    });

    if (result.error) {
      setErrorMessage(result.error);
      setIsGeneratingSummary(false);
      return;
    }

    if (result.data?.summary) {
      setGeneratedSummary(result.data.summary);
    }
    
    setIsGeneratingSummary(false);
  };

  const handleApplySummary = () => {
    if (generatedSummary) {
      onUpdateResume({
        ...resumeData,
        summary: generatedSummary,
      });
      if (onBack) onBack();
    }
  };

  return (
    <div className="flex flex-col h-full bg-transparent">
      {/* Header Banner */}
      <div className="bg-white p-5 rounded-2xl border border-zinc-200 shadow-2xs flex items-center justify-between shrink-0 mb-5">
        <div className="flex items-center gap-3.5">
          {onBack && (
            <button onClick={onBack} className="p-2 hover:bg-zinc-100 rounded-lg transition-colors cursor-pointer text-zinc-700">
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}
          <div className="p-2.5 bg-zinc-50 rounded-xl border border-zinc-200">
            <Bot className="w-5 h-5 text-zinc-800" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-base text-zinc-900 tracking-tight">
                AI Writing Suite
              </h3>
              <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-zinc-100 text-zinc-700 uppercase tracking-wider border border-zinc-200">
                Gemini AI
              </span>
            </div>
            <p className="text-xs text-zinc-500 font-medium">
              Elevate your resume content with professional writing models
            </p>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-1.5 p-1 bg-zinc-100 rounded-full border border-zinc-200 max-w-fit mb-5">
        {[
          { id: 'bullet', label: 'Bullet Improver', icon: Zap },
          { id: 'summary', label: 'Summary Builder', icon: Wand2 },
          { id: 'skills', label: 'Skills Suggester', icon: Sparkles },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                isActive
                  ? 'bg-zinc-950 text-white shadow-xs'
                  : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-200/50'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {errorMessage && (
        <div className="mb-5 p-3.5 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-center justify-between">
          <span>{errorMessage}</span>
          <button 
            type="button" 
            onClick={() => setErrorMessage(null)} 
            className="text-xs font-bold text-rose-500 hover:text-rose-900 ml-2 cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {/* Content Body */}
      <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-2xs overflow-y-auto space-y-6 flex-1 max-w-4xl">
        {activeTab === 'bullet' && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-800 mb-2">
                Paste or Write Any Bullet Point:
              </label>
              <textarea
                rows={4}
                value={inputBullet}
                onChange={(e) => setInputBullet(e.target.value)}
                placeholder="e.g. helped build payment feature and managed mysql queries..."
                className="w-full p-4 text-sm border-2 border-slate-200 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-600 focus:outline-hidden bg-slate-50/50 text-slate-900 transition-all font-medium"
              />
            </div>

            {/* Mode Selection */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { id: 'star', label: 'STAR Impact', icon: Zap, sub: 'Google X-Y-Z', color: 'emerald' },
                { id: 'metrics', label: 'Add Metrics', icon: TrendingUp, sub: 'Quantify data', color: 'emerald' },
                { id: 'concise', label: 'Make Concise', icon: Scissors, sub: 'Punchy & Short', color: 'blue' },
                { id: 'grammar', label: 'Tone & Voice', icon: Bot, sub: 'Executive polish', color: 'purple' },
              ].map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setBulletMode(m.id as any)}
                  className={`p-4 rounded-2xl border-2 text-left cursor-pointer transition-all ${
                    bulletMode === m.id
                      ? 'border-zinc-900 bg-zinc-50/50 ring-4 ring-zinc-500/5'
                      : 'border-slate-100 hover:border-slate-200 bg-white'
                  }`}
                >
                  <div className={`font-bold text-sm flex items-center gap-1.5 mb-1 ${bulletMode === m.id ? 'text-zinc-900' : 'text-slate-700'}`}>
                    <m.icon className="w-4 h-4" /> {m.label}
                  </div>
                  <div className="text-[11px] text-slate-500 font-medium">{m.sub}</div>
                </button>
              ))}
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleEnhanceBullet}
                disabled={isEnhancingBullet || !inputBullet.trim()}
                className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-900 hover:bg-zinc-800 text-white rounded-2xl text-sm font-bold shadow-lg shadow-zinc-200 disabled:opacity-50 cursor-pointer transition-all active:scale-95"
              >
                {isEnhancingBullet ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Polishing with Gemini...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Transform Bullet Point
                  </>
                )}
              </button>
            </div>

            {enhancedBullet && (
              <div className="p-6 rounded-3xl bg-slate-50 border-2 border-slate-100 space-y-4 animate-in fade-in slide-in-from-top-4 duration-300">
                <div className="text-sm font-bold text-slate-900 flex items-center justify-between">
                  <span className="flex items-center gap-2 text-zinc-600 uppercase tracking-wider text-xs">
                    <Sparkles className="w-4 h-4" />
                    AI Enhanced Result
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(enhancedBullet);
                      setCopiedBullet(true);
                      setTimeout(() => setCopiedBullet(false), 2500);
                    }}
                    className="text-xs font-bold text-slate-500 hover:text-zinc-900 cursor-pointer transition-colors"
                  >
                    {copiedBullet ? '✓ Copied to clipboard!' : 'Copy Result'}
                  </button>
                </div>
                <div className="text-base text-slate-800 bg-white p-5 rounded-2xl border border-slate-200 leading-relaxed font-medium shadow-sm">
                  {enhancedBullet}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'summary' && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-800 mb-3">
                Select Narrative Tone:
              </label>
              <div className="flex flex-wrap gap-2.5">
                {[
                  'Senior & Results-driven',
                  'Strategic & Visionary Leader',
                  'Deeply Technical & Architecture-focused',
                  'Collaborative & Agile Team Catalyst',
                ].map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setSummaryTone(t)}
                    className={`px-5 py-2.5 rounded-xl text-sm font-bold cursor-pointer transition-all ${
                      summaryTone === t
                        ? 'bg-zinc-900 text-white shadow-md shadow-zinc-200'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleGenerateSummary}
                disabled={isGeneratingSummary}
                className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-900 hover:bg-zinc-800 text-white rounded-2xl text-sm font-bold shadow-lg shadow-zinc-200 disabled:opacity-50 cursor-pointer transition-all active:scale-95"
              >
                {isGeneratingSummary ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Crafting Executive Summary...
                  </>
                ) : (
                  <>
                    <Wand2 className="w-4 h-4" />
                    Generate Summary
                  </>
                )}
              </button>
            </div>

            {generatedSummary && (
              <div className="p-6 rounded-3xl bg-slate-50 border-2 border-slate-100 space-y-4 animate-in fade-in slide-in-from-top-4 duration-300">
                <div className="text-sm font-bold text-slate-900 flex items-center justify-between">
                  <span className="flex items-center gap-2 text-zinc-600 uppercase tracking-wider text-xs">
                    <Sparkles className="w-4 h-4" />
                    Generated Summary
                  </span>
                  <button
                    type="button"
                    onClick={handleApplySummary}
                    className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl text-xs font-bold cursor-pointer shadow-md shadow-zinc-100 transition-all"
                  >
                    Apply to Resume
                  </button>
                </div>
                <div className="text-base text-slate-800 bg-white p-5 rounded-2xl border border-slate-200 leading-relaxed font-medium shadow-sm">
                  {generatedSummary}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'skills' && (
          <div className="space-y-6">
            <AISkillSuggestions
              currentRole={resumeData.personal.title}
              existingSkillCategories={resumeData.skillCategories}
              onAddSkill={(categoryName, skillName) => {
                const existingIndex = resumeData.skillCategories.findIndex(
                  (cat) => cat.categoryName.toLowerCase() === categoryName.toLowerCase()
                );
                if (existingIndex >= 0) {
                  const targetCat = resumeData.skillCategories[existingIndex];
                  if (!targetCat.skillsList.some((s) => s.toLowerCase() === skillName.toLowerCase())) {
                    const updated = [...resumeData.skillCategories];
                    updated[existingIndex] = {
                      ...targetCat,
                      skillsList: [...targetCat.skillsList, skillName],
                    };
                    onUpdateResume({ ...resumeData, skillCategories: updated });
                  }
                } else {
                  const newCat = {
                    id: `skill-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
                    categoryName,
                    skillsList: [skillName],
                  };
                  onUpdateResume({
                    ...resumeData,
                    skillCategories: [...resumeData.skillCategories, newCat],
                  });
                }
              }}
              onAddMultipleSkills={(categoryName, skills) => {
                const existingIndex = resumeData.skillCategories.findIndex(
                  (cat) => cat.categoryName.toLowerCase() === categoryName.toLowerCase()
                );
                if (existingIndex >= 0) {
                  const targetCat = resumeData.skillCategories[existingIndex];
                  const existingLower = new Set(targetCat.skillsList.map((s) => s.toLowerCase()));
                  const toAdd = skills.filter((s) => !existingLower.has(s.toLowerCase()));
                  if (toAdd.length === 0) return;
                  const updated = [...resumeData.skillCategories];
                  updated[existingIndex] = {
                    ...targetCat,
                    skillsList: [...targetCat.skillsList, ...toAdd],
                  };
                  onUpdateResume({ ...resumeData, skillCategories: updated });
                } else {
                  const newCat = {
                    id: `skill-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
                    categoryName,
                    skillsList: skills,
                  };
                  onUpdateResume({
                    ...resumeData,
                    skillCategories: [...resumeData.skillCategories, newCat],
                  });
                }
              }}
            />
          </div>
        )}
      </div>

      {/* Footer Quick Links */}
      <div className="px-8 py-5 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-6">
          <button
            type="button"
            onClick={onOpenATS}
            className="text-xs text-zinc-600 hover:text-zinc-900 font-bold inline-flex items-center gap-1.5 cursor-pointer transition-colors"
          >
            <Target className="w-4 h-4" /> Open ATS Keyword Scanner
          </button>
          <button
            type="button"
            onClick={onOpenCoverLetter}
            className="text-xs text-zinc-600 hover:text-zinc-900 font-bold inline-flex items-center gap-1.5 cursor-pointer transition-colors"
          >
            <FileText className="w-4 h-4" /> Open Cover Letter Builder
          </button>
        </div>
      </div>
    </div>
  );
};
