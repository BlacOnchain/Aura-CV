import React, { useState } from 'react';
import { FileText, Sparkles, Loader2, Undo2, Check } from 'lucide-react';
import { ResumeData } from '../../types/resume';
import { callAI } from '../../utils/aiClient';

interface Props {
  summary: string;
  resumeData: ResumeData;
  onChange: (updated: string) => void;
}

export const SummaryForm: React.FC<Props> = ({ summary, resumeData, onChange }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [previousSummary, setPreviousSummary] = useState<string | null>(null);
  const [tone, setTone] = useState<'Technical' | 'Executive' | 'Results-Driven'>('Technical');
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  const wordCount = summary.trim() ? summary.trim().split(/\s+/).length : 0;

  const handleAiPolish = async () => {
    setIsGenerating(true);
    setFeedbackMsg(null);
    
    const topSkills = resumeData.skillCategories.flatMap(sc => sc.skillsList);
    const topExperiences = resumeData.experiences.map(e => `${e.role} at ${e.company}`);

    const result = await callAI<any>('/api/ai/generate-summary', {
      fullName: resumeData.personal.fullName,
      jobTitle: resumeData.personal.title,
      skills: topSkills,
      experiences: topExperiences,
      tone,
    });

    if (result.error) {
      setFeedbackMsg(result.error);
      setIsGenerating(false);
      return;
    }

    if (result.data?.summary) {
      setPreviousSummary(summary);
      onChange(result.data.summary);
      setFeedbackMsg('Summary enhanced by AI!');
      setTimeout(() => setFeedbackMsg(null), 3000);
    }
    
    setIsGenerating(false);
  };

  const handleUndo = () => {
    if (previousSummary !== null) {
      onChange(previousSummary);
      setPreviousSummary(null);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-zinc-200 gap-3">
        <div>
          <p className="text-xs text-zinc-500">
            A concise 3-4 sentence hook highlighting your core competencies and value proposition
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <select
            value={tone}
            onChange={(e) => setTone(e.target.value as any)}
            className="text-xs border border-slate-200 rounded-lg px-2.5 py-1.5 bg-slate-50 text-slate-700 font-medium focus:outline-hidden focus:ring-1 focus:ring-indigo-500"
          >
            <option value="Technical">Tone: Technical & Scalable</option>
            <option value="Executive">Tone: Executive & Strategic</option>
            <option value="Results-Driven">Tone: Results & Impact</option>
          </select>

          <button
            type="button"
            onClick={handleAiPolish}
            disabled={isGenerating}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-zinc-900 hover:bg-zinc-800 rounded-lg shadow-xs transition-all disabled:opacity-50 cursor-pointer"
          >
            {isGenerating ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : null}
            Optimize Hook
          </button>

          {previousSummary !== null && (
            <button
              type="button"
              onClick={handleUndo}
              title="Undo AI changes"
              className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            >
              <Undo2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {feedbackMsg && (
        <div className="flex items-center gap-2 text-xs text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-3 py-2 rounded-lg">
          <Check className="w-3.5 h-3.5 shrink-0" />
          <span>{feedbackMsg}</span>
        </div>
      )}

      <div>
        <textarea
          rows={4}
          value={summary}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Focused Backend Developer and Systems Analyst with hands-on experience architecting relational databases..."
          className="w-full p-3 text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 text-slate-800 leading-relaxed font-normal"
        />
        <div className="flex justify-between items-center text-xs text-slate-400 mt-1 px-1">
          <span>Target length: 40-75 words for ATS impact</span>
          <span className={wordCount > 90 ? 'text-amber-600 font-medium' : ''}>
            {wordCount} words ({summary.length} chars)
          </span>
        </div>
      </div>
    </div>
  );
};
