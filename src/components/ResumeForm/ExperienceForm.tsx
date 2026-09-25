import React, { useState } from 'react';
import { ExperienceItem } from '../../types/resume';
import { Briefcase, Plus, Trash2, ArrowUp, ArrowDown } from 'lucide-react';
import { AIBulletEnhancer } from './AIBulletEnhancer';

interface Props {
  experiences: ExperienceItem[];
  onChange: (updated: ExperienceItem[]) => void;
}

export const ExperienceForm: React.FC<Props> = ({ experiences, onChange }) => {
  const handleAddExperience = () => {
    const newItem: ExperienceItem = {
      id: `exp-${Date.now()}`,
      role: '',
      company: '',
      location: 'Remote',
      startDate: '',
      endDate: 'Present',
      isCurrent: true,
      descriptionBullets: [''],
    };
    onChange([...experiences, newItem]);
  };

  const handleUpdate = (id: string, field: keyof ExperienceItem, value: any) => {
    onChange(
      experiences.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const handleRemove = (id: string) => {
    onChange(experiences.filter((item) => item.id !== id));
  };

  const handleMove = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= experiences.length) return;
    const copy = [...experiences];
    const temp = copy[index];
    copy[index] = copy[targetIndex];
    copy[targetIndex] = temp;
    onChange(copy);
  };

  const handleBulletChange = (expId: string, bulletIndex: number, text: string) => {
    onChange(
      experiences.map((item) => {
        if (item.id !== expId) return item;
        const newBullets = [...item.descriptionBullets];
        newBullets[bulletIndex] = text;
        return { ...item, descriptionBullets: newBullets };
      })
    );
  };

  const handleAddBullet = (expId: string) => {
    onChange(
      experiences.map((item) => {
        if (item.id !== expId) return item;
        return { ...item, descriptionBullets: [...item.descriptionBullets, ''] };
      })
    );
  };

  const handleRemoveBullet = (expId: string, bulletIndex: number) => {
    onChange(
      experiences.map((item) => {
        if (item.id !== expId) return item;
        const newBullets = item.descriptionBullets.filter((_, idx) => idx !== bulletIndex);
        return { ...item, descriptionBullets: newBullets.length ? newBullets : [''] };
      })
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-[#EBE6DD]/60">
        <div>
          <p className="text-xs text-zinc-500">
            Employment history, internships, technical apprenticeships, and leadership roles
          </p>
        </div>

        <button
          type="button"
          onClick={handleAddExperience}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#1A1917] bg-[#EBE6DD]/60 hover:bg-[#EBE6DD] rounded-lg transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Add Role
        </button>
      </div>

      {experiences.length === 0 && (
        <div className="text-center py-8 px-4 border border-dashed border-[#EBE6DD] rounded-2xl bg-transparent">
          <Briefcase className="w-8 h-8 text-zinc-400 mx-auto mb-2" />
          <p className="text-sm font-medium text-slate-700">No work experience entries yet</p>
          <p className="text-xs text-slate-500 mt-1 mb-4">Add your internships, contracts, or full-time jobs</p>
          <button
            type="button"
            onClick={handleAddExperience}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-[#1A1917] hover:bg-zinc-800 rounded-lg shadow-xs cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Add Experience
          </button>
        </div>
      )}

      <div className="space-y-8">
        {experiences.map((exp, index) => (
          <div
            key={exp.id}
            className="pb-8 border-b border-[#EBE6DD]/60 last:border-0 last:pb-0 relative space-y-4"
          >
            {/* Header / Actions */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500 bg-[#EBE6DD]/30 px-2 py-0.5 rounded-md border border-[#EBE6DD]/60">
                Position #{index + 1}
              </span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => handleMove(index, 'up')}
                  disabled={index === 0}
                  className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30 cursor-pointer"
                  title="Move Up"
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => handleMove(index, 'down')}
                  disabled={index === experiences.length - 1}
                  className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30 cursor-pointer"
                  title="Move Down"
                >
                  <ArrowDown className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => handleRemove(exp.id)}
                  className="p-1 text-slate-400 hover:text-rose-600 cursor-pointer ml-1"
                  title="Delete Position"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Inputs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Job Title / Role <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={exp.role || ''}
                  onChange={(e) => handleUpdate(exp.id, 'role', e.target.value)}
                  placeholder="e.g. Backend Developer Intern (SIWES)"
                  className="w-full px-3 py-1.5 text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Company / Organization <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={exp.company || ''}
                  onChange={(e) => handleUpdate(exp.id, 'company', e.target.value)}
                  placeholder="e.g. Olak Tech or Crypto Dungeon"
                  className="w-full px-3 py-1.5 text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Location / Workplace Type
                </label>
                <input
                  type="text"
                  value={exp.location || ''}
                  onChange={(e) => handleUpdate(exp.id, 'location', e.target.value)}
                  placeholder="e.g. Remote, Full-time, Lagos"
                  className="w-full px-3 py-1.5 text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Start Date
                  </label>
                  <input
                    type="text"
                    value={exp.startDate || ''}
                    onChange={(e) => handleUpdate(exp.id, 'startDate', e.target.value)}
                    placeholder="e.g. 11/2024"
                    className="w-full px-3 py-1.5 text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    End Date
                  </label>
                  <input
                    type="text"
                    value={exp.endDate || ''}
                    disabled={exp.isCurrent}
                    onChange={(e) => handleUpdate(exp.id, 'endDate', e.target.value)}
                    placeholder="e.g. 11/2025 or Present"
                    className="w-full px-3 py-1.5 text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 bg-white disabled:bg-slate-100 disabled:text-slate-400"
                  />
                </div>
              </div>

              <div className="md:col-span-2 flex items-center gap-2">
                <input
                  type="checkbox"
                  id={`current-${exp.id}`}
                  checked={exp.isCurrent || false}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    handleUpdate(exp.id, 'isCurrent', checked);
                    if (checked) handleUpdate(exp.id, 'endDate', 'Present');
                  }}
                  className="rounded text-indigo-600 focus:ring-indigo-500 h-4 w-4 border-slate-300 cursor-pointer"
                />
                <label htmlFor={`current-${exp.id}`} className="text-xs text-slate-600 cursor-pointer select-none">
                  I currently work here
                </label>
              </div>
            </div>

            {/* Bullet Points */}
            <div className="pt-2 border-t border-slate-200/80 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-700">
                  Key Responsibilities & Measurable Impact (Bullet Points)
                </span>
                <button
                  type="button"
                  onClick={() => handleAddBullet(exp.id)}
                  className="text-xs text-indigo-600 hover:text-indigo-800 font-medium inline-flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Bullet
                </button>
              </div>

              {(exp.descriptionBullets || ['']).map((bullet, bIdx) => (
                <div key={bIdx} className="space-y-1.5 p-2 rounded-xl bg-white border border-slate-200/90 shadow-2xs">
                  <div className="flex items-start gap-2">
                    <span className="text-slate-400 text-sm mt-1.5 select-none font-bold">•</span>
                    <textarea
                      rows={2}
                      value={bullet}
                      onChange={(e) => handleBulletChange(exp.id, bIdx, e.target.value)}
                      placeholder="e.g. Spearheaded microservices migration with Docker & AWS, decreasing system latency by 42%..."
                      className="w-full p-2 text-xs sm:text-sm border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 bg-slate-50/40 text-slate-800 leading-relaxed"
                    />
                    {(exp.descriptionBullets || []).length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveBullet(exp.id, bIdx)}
                        title="Remove bullet"
                        className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg transition-colors cursor-pointer shrink-0 mt-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  <div className="flex items-center justify-between pl-4 pr-1 pt-1 border-t border-slate-100 text-[11px] text-slate-500">
                    <span>Google X-Y-Z & STAR format recommended</span>
                    <AIBulletEnhancer
                      currentText={bullet}
                      onUpdate={(newText) => handleBulletChange(exp.id, bIdx, newText)}
                      roleContext={exp.role || 'Software Engineer'}
                      defaultMode="star"
                      sectionType="experience"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
