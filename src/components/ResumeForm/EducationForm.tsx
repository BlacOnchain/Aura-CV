import React from 'react';
import { EducationItem } from '../../types/resume';
import { GraduationCap, Plus, Trash2, ArrowUp, ArrowDown } from 'lucide-react';
import { AIBulletEnhancer } from './AIBulletEnhancer';

interface Props {
  education: EducationItem[];
  onChange: (updated: EducationItem[]) => void;
}

export const EducationForm: React.FC<Props> = ({ education, onChange }) => {
  const handleAdd = () => {
    const newItem: EducationItem = {
      id: `edu-${Date.now()}`,
      degree: '',
      institution: '',
      location: '',
      startDate: '',
      endDate: '',
      gpaOrGrade: '',
      courseworkBullets: [''],
    };
    onChange([...education, newItem]);
  };

  const handleUpdate = (id: string, field: keyof EducationItem, value: any) => {
    onChange(
      education.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const handleRemove = (id: string) => {
    onChange(education.filter((item) => item.id !== id));
  };

  const handleMove = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= education.length) return;
    const copy = [...education];
    const temp = copy[index];
    copy[index] = copy[targetIndex];
    copy[targetIndex] = temp;
    onChange(copy);
  };

  const handleBulletChange = (eduId: string, bulletIndex: number, text: string) => {
    onChange(
      education.map((item) => {
        if (item.id !== eduId) return item;
        const newBullets = [...item.courseworkBullets];
        newBullets[bulletIndex] = text;
        return { ...item, courseworkBullets: newBullets };
      })
    );
  };

  const handleAddBullet = (eduId: string) => {
    onChange(
      education.map((item) => {
        if (item.id !== eduId) return item;
        return { ...item, courseworkBullets: [...item.courseworkBullets, ''] };
      })
    );
  };

  const handleRemoveBullet = (eduId: string, bulletIndex: number) => {
    onChange(
      education.map((item) => {
        if (item.id !== eduId) return item;
        const newBullets = item.courseworkBullets.filter((_, idx) => idx !== bulletIndex);
        return { ...item, courseworkBullets: newBullets.length ? newBullets : [''] };
      })
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-zinc-200">
        <div>
          <p className="text-xs text-zinc-500">
            Degrees, diplomas (ND/HND, BSc), academic systems projects, and core coursework
          </p>
        </div>

        <button
          type="button"
          onClick={handleAdd}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-zinc-900 bg-zinc-100 hover:bg-zinc-200 rounded-lg transition-colors cursor-pointer border border-zinc-200"
        >
          <Plus className="w-4 h-4" />
          Add Education
        </button>
      </div>

      {education.length === 0 && (
        <div className="text-center py-8 px-4 border border-dashed border-zinc-200 rounded-2xl bg-transparent">
          <GraduationCap className="w-8 h-8 text-zinc-400 mx-auto mb-2" />
          <p className="text-sm font-medium text-slate-700">No education entries yet</p>
          <p className="text-xs text-slate-500 mt-1 mb-4">Add your academic background</p>
          <button
            type="button"
            onClick={handleAdd}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-zinc-900 hover:bg-zinc-800 rounded-lg shadow-xs cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Add Education
          </button>
        </div>
      )}

      <div className="space-y-8">
        {education.map((edu, index) => (
          <div
            key={edu.id}
            className="pb-8 border-b border-zinc-200/80 last:border-0 last:pb-0 relative space-y-4"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500 bg-zinc-100 px-2 py-0.5 rounded-md border border-zinc-200">
                Education #{index + 1}
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
                  disabled={index === education.length - 1}
                  className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30 cursor-pointer"
                  title="Move Down"
                >
                  <ArrowDown className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => handleRemove(edu.id)}
                  className="p-1 text-slate-400 hover:text-rose-600 cursor-pointer ml-1"
                  title="Delete Entry"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Degree / Program <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={edu.degree || ''}
                  onChange={(e) => handleUpdate(edu.id, 'degree', e.target.value)}
                  placeholder="e.g. B.S. in Computer Science or Master of Science"
                  className="w-full px-3 py-1.5 text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Institution / University <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={edu.institution || ''}
                  onChange={(e) => handleUpdate(edu.id, 'institution', e.target.value)}
                  placeholder="e.g. University of California, Berkeley"
                  className="w-full px-3 py-1.5 text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Location (City, Country)
                </label>
                <input
                  type="text"
                  value={edu.location || ''}
                  onChange={(e) => handleUpdate(edu.id, 'location', e.target.value)}
                  placeholder="e.g. Berkeley, CA or Cambridge, MA"
                  className="w-full px-3 py-1.5 text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Start Year
                  </label>
                  <input
                    type="text"
                    value={edu.startDate || ''}
                    onChange={(e) => handleUpdate(edu.id, 'startDate', e.target.value)}
                    placeholder="e.g. 2020"
                    className="w-full px-3 py-1.5 text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    End Year
                  </label>
                  <input
                    type="text"
                    value={edu.endDate || ''}
                    onChange={(e) => handleUpdate(edu.id, 'endDate', e.target.value)}
                    placeholder="e.g. 2024"
                    className="w-full px-3 py-1.5 text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 bg-white"
                  />
                </div>
              </div>
            </div>

            {/* Coursework & Systems Projects */}
            <div className="pt-2 border-t border-slate-200/80 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-700">
                  Coursework, Academic Projects, or Key Focus Areas
                </span>
                <button
                  type="button"
                  onClick={() => handleAddBullet(edu.id)}
                  className="text-xs text-indigo-600 hover:text-indigo-800 font-medium inline-flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Bullet
                </button>
              </div>

              {edu.courseworkBullets.map((bullet, bIdx) => (
                <div key={bIdx} className="space-y-1.5 p-2 rounded-xl bg-white border border-slate-200/90 shadow-2xs">
                  <div className="flex items-start gap-2">
                    <span className="text-slate-400 text-sm mt-1.5 select-none font-bold">•</span>
                    <textarea
                      rows={2}
                      value={bullet}
                      onChange={(e) => handleBulletChange(edu.id, bIdx, e.target.value)}
                      placeholder="e.g. Core Coursework: Database Management Systems (DBMS), Systems Analysis, Distributed Computing..."
                      className="w-full p-2 text-xs sm:text-sm border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 bg-slate-50/40 text-slate-800 leading-relaxed"
                    />
                    {edu.courseworkBullets.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveBullet(edu.id, bIdx)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg transition-colors cursor-pointer shrink-0 mt-1"
                        title="Remove bullet"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  <div className="flex items-center justify-between pl-4 pr-1 pt-1 border-t border-slate-100 text-[11px] text-slate-500">
                    <span>Academic & technical coursework polish</span>
                    <AIBulletEnhancer
                      currentText={bullet}
                      onUpdate={(newText) => handleBulletChange(edu.id, bIdx, newText)}
                      roleContext={edu.degree || 'Computer Science'}
                      defaultMode="academic"
                      sectionType="education"
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
