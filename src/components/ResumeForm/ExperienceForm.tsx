import React, { useState } from 'react';
import { ExperienceItem } from '../../types/resume';
import { Briefcase, Plus, Trash2, ArrowUp, ArrowDown, Edit3, Check, Calendar, MapPin } from 'lucide-react';
import { AIBulletEnhancer } from './AIBulletEnhancer';

interface Props {
  experiences: ExperienceItem[];
  onChange: (updated: ExperienceItem[]) => void;
}

export const ExperienceForm: React.FC<Props> = ({ experiences, onChange }) => {
  const [editingId, setEditingId] = useState<string | null>(null);

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
    const updated = [...experiences, newItem];
    onChange(updated);
    setEditingId(newItem.id); // automatically open new item for editing
  };

  const handleUpdate = (id: string, field: keyof ExperienceItem, value: any) => {
    onChange(
      experiences.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const handleRemove = (id: string) => {
    if (editingId === id) setEditingId(null);
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

  const editingItem = experiences.find((e) => e.id === editingId);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-zinc-200">
        <div>
          <p className="text-xs text-zinc-500">
            Employment history, internships, technical apprenticeships, and leadership roles
          </p>
        </div>

        <button
          type="button"
          onClick={handleAddExperience}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-zinc-900 bg-zinc-100 hover:bg-zinc-200 rounded-lg transition-colors cursor-pointer border border-zinc-200"
        >
          <Plus className="w-4 h-4" />
          Add Role
        </button>
      </div>

      {experiences.length === 0 && (
        <div className="text-center py-8 px-4 border border-dashed border-zinc-200 rounded-2xl bg-transparent">
          <Briefcase className="w-8 h-8 text-zinc-400 mx-auto mb-2" />
          <p className="text-sm font-medium text-slate-700">No work experience entries yet</p>
          <p className="text-xs text-slate-500 mt-1 mb-4">Add your internships, contracts, or full-time jobs</p>
          <button
            type="button"
            onClick={handleAddExperience}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-zinc-900 hover:bg-zinc-800 rounded-lg shadow-xs cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Add Experience
          </button>
        </div>
      )}

      {/* If an item is being edited, show the single Edit Entry panel */}
      {editingItem ? (
        <div className="bg-white rounded-2xl border border-zinc-200 shadow-md p-6 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-zinc-100">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-zinc-900 text-white flex items-center justify-center text-xs font-bold">
                <Edit3 className="w-3.5 h-3.5" />
              </span>
              <div>
                <h3 className="text-sm font-bold text-zinc-900">
                  Editing Position: {editingItem.role || 'Untitled Role'}
                </h3>
                <p className="text-xs text-zinc-500">{editingItem.company || 'Company Name'}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setEditingId(null)}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                <Check className="w-4 h-4" /> Done
              </button>
            </div>
          </div>

          {/* Inputs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Job Title / Role <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={editingItem.role || ''}
                onChange={(e) => handleUpdate(editingItem.id, 'role', e.target.value)}
                placeholder="e.g. Backend Developer Intern"
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Company / Organization <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={editingItem.company || ''}
                onChange={(e) => handleUpdate(editingItem.id, 'company', e.target.value)}
                placeholder="e.g. Acme Corp"
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Location / Workplace Type
              </label>
              <input
                type="text"
                value={editingItem.location || ''}
                onChange={(e) => handleUpdate(editingItem.id, 'location', e.target.value)}
                placeholder="e.g. Remote, Lagos"
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 bg-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Start Date</label>
                <input
                  type="text"
                  value={editingItem.startDate || ''}
                  onChange={(e) => handleUpdate(editingItem.id, 'startDate', e.target.value)}
                  placeholder="e.g. 11/2024"
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">End Date</label>
                <input
                  type="text"
                  value={editingItem.endDate || ''}
                  disabled={editingItem.isCurrent}
                  onChange={(e) => handleUpdate(editingItem.id, 'endDate', e.target.value)}
                  placeholder="e.g. Present"
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 bg-white disabled:bg-slate-100 disabled:text-slate-400"
                />
              </div>
            </div>

            <div className="md:col-span-2 flex items-center gap-2">
              <input
                type="checkbox"
                id={`current-${editingItem.id}`}
                checked={editingItem.isCurrent || false}
                onChange={(e) => {
                  const checked = e.target.checked;
                  handleUpdate(editingItem.id, 'isCurrent', checked);
                  if (checked) handleUpdate(editingItem.id, 'endDate', 'Present');
                }}
                className="rounded text-emerald-600 focus:ring-emerald-500 h-4 w-4 border-slate-300 cursor-pointer"
              />
              <label htmlFor={`current-${editingItem.id}`} className="text-xs text-slate-600 cursor-pointer select-none">
                I currently work here
              </label>
            </div>
          </div>

          {/* Bullet Points */}
          <div className="pt-4 border-t border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-zinc-900 uppercase tracking-wider">
                Key Responsibilities & Measurable Impact
              </span>
              <button
                type="button"
                onClick={() => handleAddBullet(editingItem.id)}
                className="text-xs text-emerald-700 hover:text-emerald-800 font-semibold inline-flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" /> Add Bullet
              </button>
            </div>

            {(editingItem.descriptionBullets || ['']).map((bullet, bIdx) => (
              <div key={bIdx} className="space-y-1.5 p-3 rounded-xl bg-zinc-50/70 border border-slate-200 shadow-2xs">
                <div className="flex items-start gap-2">
                  <span className="text-slate-400 text-sm mt-1.5 select-none font-bold">•</span>
                  <textarea
                    rows={2}
                    value={bullet}
                    onChange={(e) => handleBulletChange(editingItem.id, bIdx, e.target.value)}
                    placeholder="e.g. Spearheaded microservices migration with Docker & AWS, decreasing latency by 42%..."
                    className="w-full p-2.5 text-xs sm:text-sm border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 bg-white text-slate-800 leading-relaxed"
                  />
                  {(editingItem.descriptionBullets || []).length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveBullet(editingItem.id, bIdx)}
                      title="Remove bullet"
                      className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg transition-colors cursor-pointer shrink-0 mt-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <div className="flex items-center justify-between pl-4 pr-1 pt-1 border-t border-slate-200/60 text-[11px] text-slate-500">
                  <span>Google STAR format recommended</span>
                  <AIBulletEnhancer
                    currentText={bullet}
                    onUpdate={(newText) => handleBulletChange(editingItem.id, bIdx, newText)}
                    roleContext={editingItem.role || 'Professional'}
                    defaultMode="star"
                    sectionType="experience"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="button"
              onClick={() => setEditingId(null)}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              <Check className="w-4 h-4 text-emerald-400" /> Save & Close Entry
            </button>
          </div>
        </div>
      ) : (
        /* Collapsed List View */
        <div className="space-y-3">
          {experiences.map((exp, index) => (
            <div
              key={exp.id}
              onClick={() => setEditingId(exp.id)}
              className="flex items-center justify-between p-4 bg-white hover:bg-zinc-50/80 rounded-2xl border border-zinc-200/90 shadow-2xs transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-zinc-100 group-hover:bg-zinc-900 group-hover:text-white text-zinc-700 flex items-center justify-center shrink-0 transition-colors font-bold text-xs">
                  {index + 1}
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs sm:text-sm font-bold text-zinc-900 truncate">
                    {exp.role || 'Untitled Role'} <span className="font-normal text-zinc-500">at {exp.company || 'Company Name'}</span>
                  </h4>
                  <div className="flex items-center gap-3 mt-1 text-[11px] text-zinc-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-zinc-400" />
                      {exp.startDate || 'Start'} — {exp.endDate || 'Present'}
                    </span>
                    {exp.location && (
                      <span className="flex items-center gap-1 hidden sm:flex">
                        <MapPin className="w-3 h-3 text-zinc-400" />
                        {exp.location}
                      </span>
                    )}
                    <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md font-medium">
                      {(exp.descriptionBullets || []).filter(b => b.trim()).length} bullets
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1 shrink-0" onClick={(e) => e.stopPropagation()}>
                <button
                  type="button"
                  onClick={() => handleMove(index, 'up')}
                  disabled={index === 0}
                  className="p-1.5 text-zinc-400 hover:text-zinc-800 disabled:opacity-20 cursor-pointer rounded-lg hover:bg-zinc-100"
                  title="Move Up"
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => handleMove(index, 'down')}
                  disabled={index === experiences.length - 1}
                  className="p-1.5 text-zinc-400 hover:text-zinc-800 disabled:opacity-20 cursor-pointer rounded-lg hover:bg-zinc-100"
                  title="Move Down"
                >
                  <ArrowDown className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setEditingId(exp.id)}
                  className="px-3 py-1.5 text-xs font-semibold text-zinc-700 bg-zinc-100 hover:bg-zinc-900 hover:text-white rounded-lg transition-colors cursor-pointer inline-flex items-center gap-1"
                >
                  <Edit3 className="w-3.5 h-3.5" /> Edit
                </button>
                <button
                  type="button"
                  onClick={() => handleRemove(exp.id)}
                  className="p-1.5 text-zinc-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer"
                  title="Delete Position"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
