import React, { useState } from 'react';
import { ResumeData } from '../../types/resume';
import { callAI } from '../../utils/aiClient';
import {
  FileText,
  Wand2,
  Copy,
  Download,
  Loader2,
  Sparkles,
  ArrowLeft,
  Briefcase,
  Building2,
  ArrowRight
} from 'lucide-react';

interface Props {
  resumeData: ResumeData;
  onBack?: () => void;
}

export const CoverLetterView: React.FC<Props> = ({ resumeData, onBack }) => {
  const [companyName, setCompanyName] = useState('');
  const [roleTitle, setRoleTitle] = useState(resumeData.personal.title || '');
  const [jobDescription, setJobDescription] = useState('');
  const [tone, setTone] = useState('Professional & Persuasive');
  const [isGenerating, setIsGenerating] = useState(false);
  const [coverLetter, setCoverLetter] = useState('');
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true);
    
    const result = await callAI<any>('/api/ai/cover-letter', {
      resumeData,
      companyName,
      roleTitle,
      jobDescription,
      tone,
    });

    if (result.data?.coverLetter) {
      setCoverLetter(result.data.coverLetter);
    }
    setIsGenerating(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(coverLetter);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
            <FileText className="w-5 h-5 text-zinc-800" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-base text-zinc-900 tracking-tight">
                AI Cover Letter Architect
              </h3>
              <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-zinc-100 text-zinc-700 uppercase tracking-wider border border-zinc-200">
                AI Generator
              </span>
            </div>
            <p className="text-xs text-zinc-500 font-medium">
              Generate tailored, high-impact cover letters in seconds
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-2xs overflow-y-auto flex-1">
        <div className="max-w-4xl grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Input Controls */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-50 rounded-3xl p-6 border-2 border-slate-100 space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">
                  Target Company
                </label>
                <div className="relative">
                  <Building2 className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g. Google, Stripe, Tesla..."
                    className="w-full pl-10 pr-4 py-3 text-sm border-2 border-slate-200 rounded-2xl focus:ring-4 focus:ring-zinc-500/10 focus:border-zinc-900 focus:outline-hidden bg-white text-slate-900 font-bold transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">
                  Role Title
                </label>
                <div className="relative">
                  <Briefcase className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    value={roleTitle}
                    onChange={(e) => setRoleTitle(e.target.value)}
                    placeholder="e.g. Senior Frontend Engineer"
                    className="w-full pl-10 pr-4 py-3 text-sm border-2 border-slate-200 rounded-2xl focus:ring-4 focus:ring-zinc-500/10 focus:border-zinc-900 focus:outline-hidden bg-white text-slate-900 font-bold transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">
                  Writing Tone
                </label>
                <select
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  className="w-full px-4 py-3 text-sm border-2 border-slate-200 rounded-2xl focus:ring-4 focus:ring-zinc-500/10 focus:border-zinc-900 focus:outline-hidden bg-white text-slate-900 font-bold transition-all cursor-pointer"
                >
                  <option>Professional & Persuasive</option>
                  <option>Confident & Bold</option>
                  <option>Humble & Academic</option>
                  <option>Creative & High-Energy</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">
                  Job Description Context (Optional)
                </label>
                <textarea
                  rows={4}
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Paste snippets from the job ad to tailor the letter..."
                  className="w-full p-4 text-sm border-2 border-slate-200 rounded-2xl focus:ring-4 focus:ring-zinc-500/10 focus:border-zinc-900 focus:outline-hidden bg-white text-slate-900 transition-all font-medium"
                />
              </div>

              <button
                type="button"
                onClick={handleGenerate}
                disabled={isGenerating || !companyName.trim() || !roleTitle.trim()}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-zinc-900 hover:bg-zinc-800 text-white rounded-2xl text-sm font-bold shadow-lg shadow-zinc-100 transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Generating your Letter...
                  </>
                ) : (
                  <>
                    <Wand2 className="w-4 h-4" />
                    Generate AI Cover Letter
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right: Preview & Output */}
          <div className="lg:col-span-7">
            {coverLetter ? (
              <div className="bg-white border-2 border-slate-100 rounded-[32px] p-8 shadow-sm h-full flex flex-col animate-in fade-in zoom-in-95 duration-500">
                <div className="flex items-center justify-between mb-6 shrink-0">
                  <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-zinc-400" />
                    Preview Draft
                  </h4>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleCopy}
                      className="p-2.5 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-xl border border-slate-200 transition-all cursor-pointer"
                      title="Copy to Clipboard"
                    >
                      {copied ? <span className="text-[10px] font-bold text-emerald-600 px-1">✓ Copied</span> : <Copy className="w-4 h-4" />}
                    </button>
                    <button
                      className="p-2.5 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-xl border border-slate-200 transition-all cursor-pointer"
                      title="Download .txt"
                      onClick={() => {
                        const blob = new Blob([coverLetter], { type: 'text/plain' });
                        const url = window.URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = `Cover_Letter_${companyName.replace(/\s+/g, '_')}.txt`;
                        a.click();
                      }}
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="flex-1 p-6 bg-slate-50/50 rounded-2xl border border-slate-100 overflow-y-auto font-serif text-slate-800 whitespace-pre-wrap leading-relaxed text-sm italic">
                  {coverLetter}
                </div>
              </div>
            ) : (
              <div className="h-full min-h-[400px] border-2 border-dashed border-slate-200 rounded-[32px] flex flex-col items-center justify-center text-center p-8">
                <div className="w-16 h-16 rounded-3xl bg-slate-50 flex items-center justify-center mb-4">
                  <FileText className="w-8 h-8 text-slate-300" />
                </div>
                <h4 className="text-lg font-bold text-slate-400">Ready to Architect</h4>
                <p className="text-sm text-slate-400 mt-2 max-w-xs mx-auto">
                  Enter the company details and role on the left to generate your custom AI-driven cover letter.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
