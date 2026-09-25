import React, { useState } from 'react';
import { ResumeData } from '../../types/resume';
import { callAI } from '../../utils/aiClient';
import {
  Search,
  Zap,
  Target,
  CheckCircle2,
  AlertTriangle,
  Loader2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  ArrowLeft
} from 'lucide-react';

interface Props {
  resumeData: ResumeData;
  onBack?: () => void;
}

export const ATSScannerView: React.FC<Props> = ({ resumeData, onBack }) => {
  const [jobDescription, setJobDescription] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<any>(null);

  const handleAnalyze = async () => {
    if (!jobDescription.trim()) return;
    setIsAnalyzing(true);
    
    // Convert resume data to text for the AI
    const resumeText = `
      Name: ${resumeData.personal.fullName}
      Title: ${resumeData.personal.title}
      Summary: ${resumeData.summary}
      Experiences: ${resumeData.experiences.map(e => `${e.role} at ${e.company}: ${e.descriptionBullets.join(', ')}`).join('\n')}
      Skills: ${resumeData.skillCategories.map(c => `${c.categoryName}: ${c.skillsList.join(', ')}`).join('\n')}
    `;

    const result = await callAI<any>('/api/ai/ats-analyze', {
      resumeText,
      jobDescription,
    });

    if (result.data) {
      setResults(result.data);
    }
    setIsAnalyzing(false);
  };

  return (
    <div className="flex flex-col h-full bg-transparent">
      {/* Header Banner */}
      <div className="bg-white p-5 rounded-2xl border border-[#EBE6DD] shadow-2xs flex items-center justify-between shrink-0 mb-5">
        <div className="flex items-center gap-3.5">
          {onBack && (
            <button onClick={onBack} className="p-2 hover:bg-zinc-100 rounded-lg transition-colors cursor-pointer text-[#1A1917]/70">
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}
          <div className="p-2.5 bg-[#FAF6F0] rounded-xl border border-[#EBE6DD]">
            <Target className="w-5 h-5 text-[#1A1917]/85" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-base text-[#1A1917] tracking-tight">
                ATS Optimizer Scanner
              </h3>
              <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-[#EBE6DD]/60 text-[#1A1917]/70 uppercase tracking-wider border border-[#EBE6DD]">
                AI Match Engine
              </span>
            </div>
            <p className="text-xs text-zinc-500 font-medium">
              Match your resume against any job description using precision AI parsing
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-[#EBE6DD] shadow-2xs overflow-y-auto flex-1">
        <div className="max-w-4xl space-y-8">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-bold text-slate-800 uppercase tracking-wider">
                Target Job Description
              </label>
              <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full uppercase">
                AI Match Engine v2.0
              </span>
            </div>
            <textarea
              rows={8}
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the full job description here (responsibilities, requirements, etc.)..."
              className="w-full p-5 text-sm border-2 border-slate-200 rounded-3xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-600 focus:outline-hidden bg-slate-50/50 text-slate-900 transition-all leading-relaxed"
            />
            
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleAnalyze}
                disabled={isAnalyzing || !jobDescription.trim()}
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-zinc-900 hover:bg-zinc-800 text-white rounded-2xl text-sm font-bold shadow-lg shadow-zinc-200 transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    AI Analyzing Match...
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4" />
                    Scan & Calculate Score
                  </>
                )}
              </button>
            </div>
          </div>

          {results && (
            <div className="space-y-6 animate-in fade-in slide-in-from-top-4 duration-500">
              {/* Score Card */}
              <div className="bg-white border-2 border-slate-100 rounded-[32px] p-8 shadow-sm">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="relative w-32 h-32 shrink-0">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="64"
                        cy="64"
                        r="58"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="transparent"
                        className="text-slate-100"
                      />
                      <circle
                        cx="64"
                        cy="64"
                        r="58"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="transparent"
                        strokeDasharray={364.4}
                        strokeDashoffset={364.4 - (364.4 * results.score) / 100}
                        className={results.score >= 80 ? 'text-emerald-500' : results.score >= 60 ? 'text-amber-500' : 'text-rose-500'}
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-3xl font-black text-slate-900">{results.score}%</span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Match</span>
                    </div>
                  </div>

                  <div className="flex-1 space-y-3">
                    <h4 className="text-xl font-black text-slate-900">
                      {results.score >= 80 ? 'Strong Candidate Fit!' : results.score >= 60 ? 'Competitive Match' : 'Optimization Required'}
                    </h4>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Your resume contains <span className="font-bold text-slate-900">{results.matchedKeywords.length} core keywords</span> identified in the job description. 
                      Adding the <span className="font-bold text-slate-900">{results.missingKeywords.length} missing keywords</span> below could significantly increase your ATS visibility.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Keywords */}
                <div className="bg-emerald-50/50 border-2 border-emerald-100 rounded-3xl p-6">
                  <h5 className="text-sm font-bold text-emerald-900 flex items-center gap-2 mb-4">
                    <CheckCircle2 className="w-4 h-4" /> Found Keywords
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {results.matchedKeywords.map((kw: string) => (
                      <span key={kw} className="px-3 py-1 bg-white border border-emerald-200 text-emerald-700 rounded-lg text-xs font-bold">
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-amber-50/50 border-2 border-amber-100 rounded-3xl p-6">
                  <h5 className="text-sm font-bold text-amber-900 flex items-center gap-2 mb-4">
                    <AlertTriangle className="w-4 h-4" /> Missing Keywords
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {results.missingKeywords.map((kw: string) => (
                      <span key={kw} className="px-3 py-1 bg-white border border-amber-200 text-amber-700 rounded-lg text-xs font-bold">
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recommendations */}
              <div className="bg-slate-900 rounded-[32px] p-8 text-white">
                <h5 className="text-lg font-bold flex items-center gap-2 mb-6">
                  <Sparkles className="w-5 h-5 text-zinc-400" />
                  AI Optimization Strategy
                </h5>
                <div className="space-y-4">
                  {results.recommendations.map((rec: string, idx: number) => (
                    <div key={idx} className="flex gap-4 group">
                      <div className="w-6 h-6 rounded-lg bg-white/10 flex items-center justify-center shrink-0 font-bold text-xs text-zinc-400 group-hover:bg-white/20 transition-colors">
                        {idx + 1}
                      </div>
                      <p className="text-sm text-slate-300 leading-relaxed group-hover:text-white transition-colors">{rec}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Footer */}
      <div className="px-8 py-5 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
             <ShieldCheck className="w-4 h-4 text-zinc-600" />
             ATS-Algorithm Compliant
          </div>
        </div>
      </div>
    </div>
  );
};
