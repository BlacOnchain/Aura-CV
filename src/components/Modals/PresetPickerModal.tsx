import React, { useState } from 'react';
import { ResumeData } from '../../types/resume';
import { RESUME_PRESETS_LIST, ResumePresetOption } from '../../data/defaultResumes';
import {
  X,
  Sparkles,
  Check,
  ChevronRight,
  Briefcase,
  FileCode,
  LineChart,
  Palette,
  GraduationCap,
  FileText,
  Layers,
  ArrowRight
} from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSelectPreset: (presetData: ResumeData) => void;
}

export const PresetPickerModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onSelectPreset,
}) => {
  const [selectedId, setSelectedId] = useState<string>('preset-swe');

  if (!isOpen) return null;

  const currentPreset =
    RESUME_PRESETS_LIST.find((p) => p.id === selectedId) || RESUME_PRESETS_LIST[0];

  const handleApply = () => {
    onSelectPreset(currentPreset.data);
    onClose();
  };

  const getCategoryIcon = (cat: ResumePresetOption['category']) => {
    switch (cat) {
      case 'Tech':
        return <FileCode className="w-4 h-4 text-indigo-600" />;
      case 'Product':
        return <Briefcase className="w-4 h-4 text-blue-600" />;
      case 'Data':
        return <LineChart className="w-4 h-4 text-emerald-600" />;
      case 'Design':
        return <Palette className="w-4 h-4 text-purple-600" />;
      case 'Service':
        return <GraduationCap className="w-4 h-4 text-amber-600" />;
      case 'Finance':
        return <LineChart className="w-4 h-4 text-rose-600" />;
      case 'Admin':
        return <FileText className="w-4 h-4 text-slate-600" />;
      case 'Education':
        return <GraduationCap className="w-4 h-4 text-indigo-400" />;
      case 'Blank':
      default:
        return <FileText className="w-4 h-4 text-slate-600" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-4xl w-full shadow-2xl overflow-hidden border border-slate-200 flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="px-6 py-4 bg-linear-to-r from-slate-900 via-indigo-950 to-slate-900 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-500/20 rounded-xl border border-indigo-400/30">
              <Layers className="w-5 h-5 text-indigo-300" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white flex items-center gap-2">
                <span>CV Starter Presets & Industry Profiles</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/30 text-indigo-200 border border-indigo-400/30 font-medium">
                  {RESUME_PRESETS_LIST.length} Available
                </span>
              </h3>
              <p className="text-xs text-slate-300">
                Choose a pre-filled career blueprint optimized for ATS scans, or start completely blank
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-md transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-hidden grid grid-cols-1 md:grid-cols-12">
          {/* Left Column: Preset List */}
          <div className="md:col-span-5 border-r border-slate-200 overflow-y-auto p-4 space-y-2 bg-slate-50/50">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block px-1 mb-1">
              Select Profile Blueprint
            </span>

            {RESUME_PRESETS_LIST.map((preset) => {
              const isSelected = selectedId === preset.id;
              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => setSelectedId(preset.id)}
                  className={`w-full text-left p-3 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                    isSelected
                      ? 'bg-white border-indigo-600 shadow-md ring-2 ring-indigo-500/20'
                      : 'bg-white/80 border-slate-200 hover:border-slate-300 hover:bg-white'
                  }`}
                >
                  <div className="p-2 rounded-lg bg-slate-50 border border-slate-100 shrink-0">
                    {getCategoryIcon(preset.category)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs sm:text-sm text-slate-900 truncate">
                        {preset.name}
                      </span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded-md bg-slate-100 text-slate-600 font-medium">
                        {preset.category}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 truncate mt-0.5">
                      {preset.role}
                    </p>
                  </div>
                  {isSelected && (
                    <Check className="w-4 h-4 text-indigo-600 shrink-0 mt-1" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Column: Preview of Selected Preset */}
          <div className="md:col-span-7 overflow-y-auto p-5 sm:p-6 space-y-5 bg-white flex flex-col justify-between">
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
                    {currentPreset.category} Blueprint
                  </span>
                </div>
                <h4 className="text-lg font-bold text-slate-900">
                  {currentPreset.name}
                </h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  {currentPreset.description}
                </p>
              </div>

              {/* Sample Details */}
              {currentPreset.id !== 'preset-blank' ? (
                <div className="space-y-3.5 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
                  <div>
                    <span className="font-bold text-slate-700 block mb-0.5">Candidate:</span>
                    <span className="text-slate-900 font-medium">
                      {currentPreset.data.personal.fullName} • {currentPreset.data.personal.title}
                    </span>
                  </div>

                  <div>
                    <span className="font-bold text-slate-700 block mb-0.5">Executive Summary Preview:</span>
                    <p className="text-slate-600 line-clamp-3 leading-relaxed">
                      {currentPreset.data.summary}
                    </p>
                  </div>

                  <div>
                    <span className="font-bold text-slate-700 block mb-1">Featured Skill Keywords:</span>
                    <div className="flex flex-wrap gap-1">
                      {currentPreset.data.skillCategories
                        .flatMap((c) => c.skillsList)
                        .slice(0, 10)
                        .map((skill, sIdx) => (
                          <span
                            key={sIdx}
                            className="px-2 py-0.5 bg-white border border-slate-200 rounded-md text-[11px] font-medium text-slate-700"
                          >
                            {skill}
                          </span>
                        ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200/80 text-[11px] text-slate-500">
                    <div>• {currentPreset.data.experiences.length} Experience Positions</div>
                    <div>• {currentPreset.data.education.length} Education Entry</div>
                    <div>• {currentPreset.data.projects.length} Showcased Projects</div>
                    <div>• {currentPreset.data.certifications.length} Certifications</div>
                  </div>
                </div>
              ) : (
                <div className="p-8 text-center bg-slate-50 rounded-xl border-2 border-dashed border-slate-200">
                  <FileText className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                  <p className="font-bold text-slate-800 text-sm">Clean Blank Slate</p>
                  <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                    Starts with an empty form with zero pre-filled sample text so you can write your own resume completely from scratch.
                  </p>
                </div>
              )}
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">
                You can customize every section after loading
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-3.5 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleApply}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-xs transition-colors cursor-pointer"
                >
                  <span>Load {currentPreset.name}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
