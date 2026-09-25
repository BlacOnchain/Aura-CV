import React, { useState, useEffect } from 'react';
import { SkillCategory } from '../../types/resume';
import { callAI, isAIQuotaExceeded } from '../../utils/aiClient';
import {
  Sparkles,
  Plus,
  Check,
  Search,
  Cpu,
  Layers,
  Flame,
  Star,
  TrendingUp,
  FileText,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  Zap
} from 'lucide-react';

interface SuggestedSkill {
  name: string;
  relevance: string;
  reason: string;
}

interface SuggestedCategory {
  categoryName: string;
  suggestedSkills: SuggestedSkill[];
}

interface Props {
  currentRole?: string;
  existingSkillCategories: SkillCategory[];
  onAddSkill: (categoryName: string, skillName: string) => void;
  onAddMultipleSkills?: (categoryName: string, skillNames: string[]) => void;
}

export const AISkillSuggestions: React.FC<Props> = ({
  currentRole = '',
  existingSkillCategories,
  onAddSkill,
  onAddMultipleSkills,
}) => {
  const [roleTitle, setRoleTitle] = useState(currentRole || 'Software Engineer');
  const [industry, setIndustry] = useState('Technology');
  const [jobDescription, setJobDescription] = useState('');
  const [categories, setCategories] = useState<SuggestedCategory[]>([]);
  const [topKeywords, setTopKeywords] = useState<string[]>([]);
  const [addedSkills, setAddedSkills] = useState<Set<string>>(new Set());
  const [showJobDescInput, setShowJobDescInput] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Collect all currently added skill strings in lowercase
  const existingSkillSet = React.useMemo(() => {
    const set = new Set<string>();
    existingSkillCategories.forEach((cat) => {
      cat.skillsList.forEach((s) => set.add(s.toLowerCase().trim()));
    });
    return set;
  }, [existingSkillCategories]);

  // Sync role if updated from parent
  useEffect(() => {
    if (currentRole && !roleTitle) {
      setRoleTitle(currentRole);
    }
  }, [currentRole]);

  // Fetch suggestions
  const fetchSuggestions = async () => {
    setIsLoading(true);
    setError(null);
    
    const allExisting = Array.from(existingSkillSet);
    const result = await callAI<any>('/api/ai/suggest-skills', {
      roleTitle: roleTitle.trim() || 'Software Engineer',
      industry,
      existingSkills: allExisting.slice(0, 20),
      jobDescription: jobDescription.trim(),
    });

    if (result.error) {
      setError(result.error);
      setIsLoading(false);
      return;
    }

    if (result.data) {
      const data = result.data;
      if (data.categories && Array.isArray(data.categories)) {
        setCategories(data.categories);
      }
      if (data.topKeywordsForATS && Array.isArray(data.topKeywordsForATS)) {
        setTopKeywords(data.topKeywordsForATS);
      }
    }
    
    setIsLoading(false);
  };

  // Initial load once if empty
  useEffect(() => {
    if (categories.length === 0) {
      fetchSuggestions();
    }
  }, []);

  const handleAddSingle = (categoryName: string, skillName: string) => {
    onAddSkill(categoryName, skillName);
    setAddedSkills((prev) => new Set(prev).add(skillName.toLowerCase()));
  };

  const handleAddAllInCategory = (cat: SuggestedCategory) => {
    const unadded = cat.suggestedSkills
      .map((s) => s.name)
      .filter((name) => !existingSkillSet.has(name.toLowerCase()));

    if (unadded.length === 0) return;

    if (onAddMultipleSkills) {
      onAddMultipleSkills(cat.categoryName, unadded);
    } else {
      unadded.forEach((skill) => onAddSkill(cat.categoryName, skill));
    }

    setAddedSkills((prev) => {
      const next = new Set(prev);
      unadded.forEach((s) => next.add(s.toLowerCase()));
      return next;
    });
  };

  const getRelevanceBadge = (relevance: string) => {
    const lower = relevance.toLowerCase();
    if (lower.includes('core')) {
      return (
        <span className="inline-flex items-center gap-1 text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
          <Star className="w-2.5 h-2.5 fill-indigo-500" />
          Core
        </span>
      );
    }
    if (lower.includes('high')) {
      return (
        <span className="inline-flex items-center gap-1 text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
          <Flame className="w-2.5 h-2.5 text-emerald-600" />
          High ATS
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-violet-50 text-violet-700 border border-violet-200">
        <TrendingUp className="w-2.5 h-2.5 text-violet-600" />
        Trending
      </span>
    );
  };

  return (
    <div className="bg-linear-to-b from-indigo-50/40 via-white to-slate-50/60 rounded-2xl border border-indigo-100/90 p-5 shadow-xs space-y-5">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-indigo-100/60">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-xs">
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <span>AI Skill & Keyword Recommendations</span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-indigo-100 text-indigo-800 rounded-full">
                ATS Optimizer
              </span>
            </h3>
            <p className="text-xs text-slate-500">
              Instantly discover and append in-demand technical competencies for your role
            </p>
          </div>
        </div>

        {/* Refresh button */}
        <button
          type="button"
          onClick={() => fetchSuggestions()}
          disabled={isLoading}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-50 text-indigo-700 border border-indigo-200 rounded-lg text-xs font-semibold shadow-2xs transition-colors cursor-pointer disabled:opacity-50 shrink-0"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
          <span>{isLoading ? 'Analyzing...' : 'Refresh Suggestions'}</span>
        </button>
      </div>

      {/* Target Role & Job Context Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="sm:col-span-2">
          <label className="block text-[11px] font-semibold text-slate-600 mb-1">
            Target Job Title / Career Track
          </label>
          <div className="relative">
            <input
              type="text"
              value={roleTitle}
              onChange={(e) => setRoleTitle(e.target.value)}
              placeholder="e.g. Senior Full Stack Engineer, Technical PM..."
              className="w-full pl-3 pr-20 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:border-indigo-500 shadow-2xs"
            />
            <button
              type="button"
              onClick={() => fetchSuggestions()}
              disabled={isLoading}
              className="absolute right-1 top-1 bottom-1 px-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-[11px] font-semibold rounded-md transition-colors cursor-pointer"
            >
              Analyze
            </button>
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-slate-600 mb-1">
            Job Description Match
          </label>
          <button
            type="button"
            onClick={() => setShowJobDescInput(!showJobDescInput)}
            className="w-full flex items-center justify-between px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg text-slate-700 hover:border-slate-300 shadow-2xs cursor-pointer"
          >
            <span className="truncate">
              {jobDescription.trim() ? 'Job Description Active' : '+ Paste Target Job Ad'}
            </span>
            {showJobDescInput ? (
              <ChevronUp className="w-3.5 h-3.5 text-slate-400" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            )}
          </button>
        </div>
      </div>

      {/* Expandable Job Description Input */}
      {showJobDescInput && (
        <div className="p-3 bg-white rounded-xl border border-indigo-100 shadow-2xs space-y-2 animate-in fade-in duration-150">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-800">
              Paste Job Description Requirements
            </span>
            <span className="text-[10px] text-slate-400">
              Extracts high-priority ATS keywords
            </span>
          </div>
          <textarea
            rows={3}
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste required qualifications or tech stack from LinkedIn / Greenhouse / Lever..."
            className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:border-indigo-500 resize-none"
          />
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => {
                fetchSuggestions();
                setShowJobDescInput(false);
              }}
              disabled={isLoading || !jobDescription.trim()}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold transition-colors disabled:opacity-50 cursor-pointer"
            >
              <Sparkles className="w-3 h-3" />
              <span>Extract Matching Keywords</span>
            </button>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="p-3 bg-rose-50 border border-rose-100 rounded-xl text-xs text-rose-700 flex items-center gap-2">
          <RefreshCw className="w-4 h-4 shrink-0" />
          <span>{error}</span>
          <button 
            onClick={() => fetchSuggestions()}
            className="ml-auto underline font-semibold cursor-pointer"
          >
            Retry
          </button>
        </div>
      )}

      {/* Top ATS Keywords Bar */}
      {topKeywords.length > 0 && (
        <div className="p-3 bg-white/80 rounded-xl border border-slate-200/80 shadow-2xs">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>High-Yield ATS Keywords for {roleTitle || 'Role'}:</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {topKeywords.map((kw) => {
              const isAdded = existingSkillSet.has(kw.toLowerCase()) || addedSkills.has(kw.toLowerCase());
              return (
                <button
                  key={kw}
                  type="button"
                  onClick={() => !isAdded && handleAddSingle('Key Competencies', kw)}
                  disabled={isAdded}
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                    isAdded
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 cursor-default'
                      : 'bg-white hover:bg-indigo-50 text-slate-700 hover:text-indigo-700 border border-slate-200 hover:border-indigo-300 shadow-2xs'
                  }`}
                  title={isAdded ? 'Already added to your resume' : `Click to add ${kw}`}
                >
                  {isAdded ? (
                    <Check className="w-3 h-3 text-emerald-600" />
                  ) : (
                    <Plus className="w-3 h-3 text-indigo-500" />
                  )}
                  <span>{kw}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Suggested Categories Grid */}
      {isLoading ? (
        <div className="py-8 flex flex-col items-center justify-center text-slate-500 space-y-2">
          <RefreshCw className="w-6 h-6 animate-spin text-indigo-600" />
          <p className="text-xs font-medium">Analyzing industry skill demand and recruiter requirements...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {categories.map((cat, idx) => {
            const allInCatAdded = cat.suggestedSkills.every(
              (s) => existingSkillSet.has(s.name.toLowerCase()) || addedSkills.has(s.name.toLowerCase())
            );

            return (
              <div
                key={cat.categoryName || idx}
                className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="text-xs font-bold text-slate-900 truncate">
                      {cat.categoryName}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleAddAllInCategory(cat)}
                      disabled={allInCatAdded}
                      className="text-[11px] font-semibold text-indigo-600 hover:text-indigo-800 disabled:text-slate-400 disabled:cursor-default cursor-pointer transition-colors"
                    >
                      {allInCatAdded ? 'All Added' : '+ Add All'}
                    </button>
                  </div>

                  {/* Skills List in Category */}
                  <div className="mt-2.5 space-y-2">
                    {cat.suggestedSkills.map((skill) => {
                      const isAdded =
                        existingSkillSet.has(skill.name.toLowerCase()) ||
                        addedSkills.has(skill.name.toLowerCase());

                      return (
                        <div
                          key={skill.name}
                          className="flex items-start justify-between gap-2 p-2 rounded-lg bg-slate-50/70 hover:bg-slate-50 border border-slate-100 transition-colors"
                        >
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className="font-bold text-xs text-slate-800">
                                {skill.name}
                              </span>
                              {getRelevanceBadge(skill.relevance)}
                            </div>
                            {skill.reason && (
                              <p className="text-[10px] text-slate-500 mt-0.5 line-clamp-1">
                                {skill.reason}
                              </p>
                            )}
                          </div>

                          <button
                            type="button"
                            onClick={() => !isAdded && handleAddSingle(cat.categoryName, skill.name)}
                            disabled={isAdded}
                            className={`shrink-0 inline-flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-semibold transition-colors cursor-pointer ${
                              isAdded
                                ? 'bg-emerald-100 text-emerald-800 cursor-default'
                                : 'bg-white hover:bg-indigo-600 hover:text-white text-slate-700 border border-slate-200 shadow-2xs'
                            }`}
                          >
                            {isAdded ? (
                              <>
                                <Check className="w-3 h-3 text-emerald-700" />
                                <span>Added</span>
                              </>
                            ) : (
                              <>
                                <Plus className="w-3 h-3" />
                                <span>Add</span>
                              </>
                            )}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
