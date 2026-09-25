import React, { useState } from 'react';
import { SkillCategory } from '../../types/resume';
import { TechStackTagInput } from './TechStackTagInput';
import { AISkillSuggestions } from './AISkillSuggestions';
import { Cpu, Plus, Trash2, X, Sparkles } from 'lucide-react';

interface Props {
  skillCategories: SkillCategory[];
  onChange: (updated: SkillCategory[]) => void;
  targetRole?: string;
}

export const SkillsForm: React.FC<Props> = ({ skillCategories, onChange, targetRole }) => {
  const [tagInputs, setTagInputs] = useState<Record<string, string>>({});
  const [showAISuggestions, setShowAISuggestions] = useState(true);

  const handleAddCategory = () => {
    const newCat: SkillCategory = {
      id: `skill-${Date.now()}`,
      categoryName: 'New Skill Category',
      skillsList: [],
      description: '',
    };
    onChange([...skillCategories, newCat]);
  };

  const handleAddSkillFromAI = (categoryName: string, skillName: string) => {
    const existingIndex = skillCategories.findIndex(
      (cat) => cat.categoryName.toLowerCase() === categoryName.toLowerCase()
    );

    if (existingIndex >= 0) {
      const targetCat = skillCategories[existingIndex];
      if (!targetCat.skillsList.some((s) => s.toLowerCase() === skillName.toLowerCase())) {
        const updatedCat = {
          ...targetCat,
          skillsList: [...targetCat.skillsList, skillName],
        };
        const nextList = [...skillCategories];
        nextList[existingIndex] = updatedCat;
        onChange(nextList);
      }
    } else {
      const newCat: SkillCategory = {
        id: `skill-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        categoryName,
        skillsList: [skillName],
      };
      onChange([...skillCategories, newCat]);
    }
  };

  const handleAddMultipleSkillsFromAI = (categoryName: string, skills: string[]) => {
    const existingIndex = skillCategories.findIndex(
      (cat) => cat.categoryName.toLowerCase() === categoryName.toLowerCase()
    );

    if (existingIndex >= 0) {
      const targetCat = skillCategories[existingIndex];
      const existingLower = new Set(targetCat.skillsList.map((s) => s.toLowerCase()));
      const toAdd = skills.filter((s) => !existingLower.has(s.toLowerCase()));
      if (toAdd.length === 0) return;
      const updatedCat = {
        ...targetCat,
        skillsList: [...targetCat.skillsList, ...toAdd],
      };
      const nextList = [...skillCategories];
      nextList[existingIndex] = updatedCat;
      onChange(nextList);
    } else {
      const newCat: SkillCategory = {
        id: `skill-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        categoryName,
        skillsList: skills,
      };
      onChange([...skillCategories, newCat]);
    }
  };

  const handleUpdate = (id: string, field: keyof SkillCategory, value: any) => {
    onChange(
      skillCategories.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const handleRemoveCategory = (id: string) => {
    onChange(skillCategories.filter((item) => item.id !== id));
  };

  const handleAddTag = (catId: string, tagToAdd: string) => {
    const trimmed = tagToAdd.trim().replace(/^[,]+|[,]+$/g, '');
    if (!trimmed) return;

    onChange(
      skillCategories.map((item) => {
        if (item.id !== catId) return item;
        if (item.skillsList.some((t) => t.toLowerCase() === trimmed.toLowerCase())) return item;
        return { ...item, skillsList: [...item.skillsList, trimmed] };
      })
    );
    setTagInputs((prev) => ({ ...prev, [catId]: '' }));
  };

  const handleRemoveTag = (catId: string, tagIndex: number) => {
    onChange(
      skillCategories.map((item) => {
        if (item.id !== catId) return item;
        return {
          ...item,
          skillsList: item.skillsList.filter((_, idx) => idx !== tagIndex),
        };
      })
    );
  };

  return (
    <div className="space-y-6">
      {/* AI Skill Suggester Toggle & Component */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            AI Recommendations
          </span>
          <button
            type="button"
            onClick={() => setShowAISuggestions(!showAISuggestions)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{showAISuggestions ? 'Hide AI Suggestions' : 'Show AI Suggestions'}</span>
          </button>
        </div>

        {showAISuggestions && (
          <AISkillSuggestions
            currentRole={targetRole}
            existingSkillCategories={skillCategories}
            onAddSkill={handleAddSkillFromAI}
            onAddMultipleSkills={handleAddMultipleSkillsFromAI}
          />
        )}
      </div>

      {/* Interactive Tag-Based Skills & Keywords Manager */}
      <TechStackTagInput
        skillCategories={skillCategories}
        onChange={onChange}
      />

      {/* Categorized Domains & Resume Groupings */}
      <div className="space-y-6 pt-4 border-t border-zinc-200">
        <div className="flex items-center justify-between pb-3 border-b border-zinc-200">
          <div>
            <p className="text-xs text-zinc-500">
              Customize domain headers and explanatory context for your ATS resume layout
            </p>
          </div>

          <button
            type="button"
            onClick={handleAddCategory}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-zinc-900 bg-zinc-100 hover:bg-zinc-200 rounded-lg transition-colors cursor-pointer border border-zinc-200"
          >
            <Plus className="w-4 h-4" />
            Add Domain
          </button>
        </div>

        {skillCategories.length === 0 && (
          <div className="text-center py-8 px-4 border border-dashed border-zinc-200 rounded-2xl bg-transparent">
            <Cpu className="w-8 h-8 text-zinc-400 mx-auto mb-2" />
            <p className="text-sm font-medium text-slate-700">No skill categories added</p>
            <p className="text-xs text-slate-500 mt-1 mb-4">Add your technical competencies</p>
            <button
              type="button"
              onClick={handleAddCategory}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-zinc-900 hover:bg-zinc-800 rounded-lg shadow-xs cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Add Skill Category
            </button>
          </div>
        )}

        <div className="space-y-8">
          {skillCategories.map((cat, index) => {
            const currentInput = tagInputs[cat.id] || '';

            return (
              <div
                key={cat.id}
                className="pb-8 border-b border-zinc-200/80 last:border-0 last:pb-0 relative space-y-3.5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500 bg-zinc-100 px-2 py-0.5 rounded-md border border-zinc-200">
                    Domain #{index + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleRemoveCategory(cat.id)}
                    className="p-1 text-slate-400 hover:text-rose-600 cursor-pointer"
                    title="Delete Category"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Domain / Category Header <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={cat.categoryName || ''}
                      onChange={(e) => handleUpdate(cat.id, 'categoryName', e.target.value)}
                      placeholder="e.g. PHP & Laravel Frameworks or MySQL Database Architecture"
                      className="w-full px-3 py-1.5 text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 bg-white font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Context / Scope Description
                    </label>
                    <input
                      type="text"
                      value={cat.description || ''}
                      onChange={(e) => handleUpdate(cat.id, 'description', e.target.value)}
                      placeholder="e.g. Server-side application development, secure API architectures..."
                      className="w-full px-3 py-1.5 text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 bg-white"
                    />
                  </div>
                </div>

                {/* Skills Tags List */}
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1.5 flex items-center justify-between">
                    <span>Skills in this Domain</span>
                    <span className="text-slate-400 font-normal">Press Enter or Comma to add</span>
                  </label>

                  <div className="flex flex-wrap items-center gap-1.5 p-2 bg-white border border-slate-300 rounded-lg min-h-11">
                    {cat.skillsList.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium bg-slate-100 text-slate-800 rounded-md border border-slate-200"
                      >
                        {skill}
                        <button
                          type="button"
                          onClick={() => handleRemoveTag(cat.id, sIdx)}
                          className="text-slate-400 hover:text-slate-700 cursor-pointer"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}

                    <input
                      type="text"
                      value={currentInput}
                      onChange={(e) => setTagInputs({ ...tagInputs, [cat.id]: e.target.value })}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ',') {
                          e.preventDefault();
                          handleAddTag(cat.id, currentInput);
                        }
                      }}
                      onBlur={() => {
                        if (currentInput.trim()) handleAddTag(cat.id, currentInput);
                      }}
                      placeholder={cat.skillsList.length === 0 ? "Type skill and press Enter..." : "Add more..."}
                      className="text-xs px-2 py-1 flex-1 min-w-[140px] focus:outline-hidden text-slate-800"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
