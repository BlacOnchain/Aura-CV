import React, { useState } from 'react';
import { ProjectItem } from '../../types/resume';
import { FolderGit2, Plus, Trash2, ArrowUp, ArrowDown, Edit3, Check, Link as LinkIcon, Calendar } from 'lucide-react';
import { AIBulletEnhancer } from './AIBulletEnhancer';

interface Props {
  projects: ProjectItem[];
  onChange: (updated: ProjectItem[]) => void;
}

export const ProjectsForm: React.FC<Props> = ({ projects = [], onChange }) => {
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleAddProject = () => {
    const newItem: ProjectItem = {
      id: `proj-${Date.now()}`,
      name: '',
      subtitle: '',
      startDate: '',
      endDate: '',
      link: '',
      descriptionBullets: [''],
    };
    const updated = [...projects, newItem];
    onChange(updated);
    setEditingId(newItem.id);
  };

  const handleUpdate = (id: string, field: keyof ProjectItem, value: any) => {
    onChange(
      projects.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const handleRemove = (id: string) => {
    if (editingId === id) setEditingId(null);
    onChange(projects.filter((item) => item.id !== id));
  };

  const handleMove = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= projects.length) return;
    const copy = [...projects];
    const temp = copy[index];
    copy[index] = copy[targetIndex];
    copy[targetIndex] = temp;
    onChange(copy);
  };

  const handleBulletChange = (projId: string, bulletIndex: number, text: string) => {
    onChange(
      projects.map((item) => {
        if (item.id !== projId) return item;
        const newBullets = [...item.descriptionBullets];
        newBullets[bulletIndex] = text;
        return { ...item, descriptionBullets: newBullets };
      })
    );
  };

  const handleAddBullet = (projId: string) => {
    onChange(
      projects.map((item) => {
        if (item.id !== projId) return item;
        return { ...item, descriptionBullets: [...item.descriptionBullets, ''] };
      })
    );
  };

  const handleRemoveBullet = (projId: string, bulletIndex: number) => {
    onChange(
      projects.map((item) => {
        if (item.id !== projId) return item;
        const newBullets = item.descriptionBullets.filter((_, idx) => idx !== bulletIndex);
        return { ...item, descriptionBullets: newBullets.length ? newBullets : [''] };
      })
    );
  };

  const editingItem = projects.find((p) => p.id === editingId);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-zinc-200">
        <div>
          <p className="text-xs text-zinc-500">
            Key software projects, open-source repositories, academic tools, or live apps
          </p>
        </div>

        <button
          type="button"
          onClick={handleAddProject}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-zinc-900 bg-zinc-100 hover:bg-zinc-200 rounded-lg transition-colors cursor-pointer border border-zinc-200"
        >
          <Plus className="w-4 h-4" />
          Add Project
        </button>
      </div>

      {projects.length === 0 && (
        <div className="text-center py-8 px-4 border border-dashed border-zinc-200 rounded-2xl bg-transparent">
          <FolderGit2 className="w-8 h-8 text-zinc-400 mx-auto mb-2" />
          <p className="text-sm font-medium text-slate-700">No projects added yet</p>
          <p className="text-xs text-slate-500 mt-1 mb-4">Showcase personal, client, or academic software projects</p>
          <button
            type="button"
            onClick={handleAddProject}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-zinc-900 hover:bg-zinc-800 rounded-lg shadow-xs cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Add Project
          </button>
        </div>
      )}

      {editingItem ? (
        <div className="bg-white rounded-2xl border border-zinc-200 shadow-md p-6 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-zinc-100">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-zinc-900 text-white flex items-center justify-center text-xs font-bold">
                <Edit3 className="w-3.5 h-3.5" />
              </span>
              <div>
                <h3 className="text-sm font-bold text-zinc-900">
                  Editing Project: {editingItem.name || 'Untitled Project'}
                </h3>
                <p className="text-xs text-zinc-500">{editingItem.subtitle || 'Tech stack / Subtitle'}</p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setEditingId(null)}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              <Check className="w-4 h-4" /> Done
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Project Title <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={editingItem.name || ''}
                onChange={(e) => handleUpdate(editingItem.id, 'name', e.target.value)}
                placeholder="e.g. AuraCV AI Resume Engine"
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Tech Stack / Subtitle
              </label>
              <input
                type="text"
                value={editingItem.subtitle || ''}
                onChange={(e) => handleUpdate(editingItem.id, 'subtitle', e.target.value)}
                placeholder="e.g. React, TypeScript, Tailwind, FastAPI"
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Project Link / URL</label>
              <input
                type="text"
                value={editingItem.link || ''}
                onChange={(e) => handleUpdate(editingItem.id, 'link', e.target.value)}
                placeholder="e.g. github.com/username/project"
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
                  placeholder="e.g. 2024"
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">End Date</label>
                <input
                  type="text"
                  value={editingItem.endDate || ''}
                  onChange={(e) => handleUpdate(editingItem.id, 'endDate', e.target.value)}
                  placeholder="e.g. Present"
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 bg-white"
                />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-zinc-900 uppercase tracking-wider">
                Project Key Features & Achievements
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
                    placeholder="e.g. Developed real-time parsing engine processing 10k+ resumes monthly..."
                    className="w-full p-2.5 text-xs sm:text-sm border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 bg-white text-slate-800 leading-relaxed"
                  />
                  {(editingItem.descriptionBullets || []).length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveBullet(editingItem.id, bIdx)}
                      title="Remove"
                      className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg transition-colors cursor-pointer shrink-0 mt-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <div className="flex items-center justify-between pl-4 pr-1 pt-1 border-t border-slate-200/60 text-[11px] text-slate-500">
                  <span>STAR format recommended</span>
                  <AIBulletEnhancer
                    currentText={bullet}
                    onUpdate={(newText) => handleBulletChange(editingItem.id, bIdx, newText)}
                    roleContext="Software Project"
                    defaultMode="star"
                    sectionType="project"
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
        <div className="space-y-3">
          {projects.map((proj, index) => (
            <div
              key={proj.id}
              onClick={() => setEditingId(proj.id)}
              className="flex items-center justify-between p-4 bg-white hover:bg-zinc-50/80 rounded-2xl border border-zinc-200/90 shadow-2xs transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-zinc-100 group-hover:bg-zinc-900 group-hover:text-white text-zinc-700 flex items-center justify-center shrink-0 transition-colors font-bold text-xs">
                  {index + 1}
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs sm:text-sm font-bold text-zinc-900 truncate">
                    {proj.name || 'Untitled Project'} <span className="font-normal text-zinc-500">· {proj.subtitle || 'Tech stack'}</span>
                  </h4>
                  <div className="flex items-center gap-3 mt-1 text-[11px] text-zinc-500">
                    {proj.link && (
                      <span className="flex items-center gap-1 text-emerald-700 font-medium">
                        <LinkIcon className="w-3 h-3" />
                        {proj.link}
                      </span>
                    )}
                    <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md font-medium">
                      {(proj.descriptionBullets || []).filter(b => b.trim()).length} bullets
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
                  disabled={index === projects.length - 1}
                  className="p-1.5 text-zinc-400 hover:text-zinc-800 disabled:opacity-20 cursor-pointer rounded-lg hover:bg-zinc-100"
                  title="Move Down"
                >
                  <ArrowDown className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setEditingId(proj.id)}
                  className="px-3 py-1.5 text-xs font-semibold text-zinc-700 bg-zinc-100 hover:bg-zinc-900 hover:text-white rounded-lg transition-colors cursor-pointer inline-flex items-center gap-1"
                >
                  <Edit3 className="w-3.5 h-3.5" /> Edit
                </button>
                <button
                  type="button"
                  onClick={() => handleRemove(proj.id)}
                  className="p-1.5 text-zinc-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer"
                  title="Delete"
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
