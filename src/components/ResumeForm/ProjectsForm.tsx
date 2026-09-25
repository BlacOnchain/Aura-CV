import React from 'react';
import { ProjectItem } from '../../types/resume';
import { FolderGit2, Plus, Trash2, ArrowUp, ArrowDown, Link as LinkIcon } from 'lucide-react';
import { AIBulletEnhancer } from './AIBulletEnhancer';

interface Props {
  projects: ProjectItem[];
  onChange: (updated: ProjectItem[]) => void;
}

export const ProjectsForm: React.FC<Props> = ({ projects = [], onChange }) => {

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
    onChange([...projects, newItem]);
  };

  const handleUpdate = (id: string, field: keyof ProjectItem, value: any) => {
    onChange(
      projects.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const handleRemove = (id: string) => {
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-[#EBE6DD]/60">
        <div>
          <p className="text-xs text-zinc-500">
            Key software projects, open-source repositories, academic tools, or live apps
          </p>
        </div>

        <button
          type="button"
          onClick={handleAddProject}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#1A1917] bg-[#EBE6DD]/60 hover:bg-[#EBE6DD] rounded-lg transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Add Project
        </button>
      </div>

      {projects.length === 0 && (
        <div className="text-center py-8 px-4 border border-dashed border-[#EBE6DD] rounded-2xl bg-transparent">
          <FolderGit2 className="w-8 h-8 text-zinc-400 mx-auto mb-2" />
          <p className="text-sm font-medium text-slate-700">No projects added yet</p>
          <p className="text-xs text-slate-500 mt-1 mb-4">Showcase personal, client, or academic software projects</p>
          <button
            type="button"
            onClick={handleAddProject}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-[#1A1917] hover:bg-zinc-800 rounded-lg shadow-xs cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Add Project
          </button>
        </div>
      )}

      <div className="space-y-8">
        {projects.map((proj, index) => (
          <div
            key={proj.id}
            className="pb-8 border-b border-[#EBE6DD]/60 last:border-0 last:pb-0 relative space-y-4"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500 bg-[#EBE6DD]/30 px-2 py-0.5 rounded-md border border-[#EBE6DD]/60">
                Project #{index + 1}
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
                  disabled={index === projects.length - 1}
                  className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30 cursor-pointer"
                  title="Move Down"
                >
                  <ArrowDown className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => handleRemove(proj.id)}
                  className="p-1 text-slate-400 hover:text-rose-600 cursor-pointer ml-1"
                  title="Delete Project"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Project Title <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={proj.name || ''}
                  onChange={(e) => handleUpdate(proj.id, 'name', e.target.value)}
                  placeholder="e.g. Receipt Pro or BlacRate Pro"
                  className="w-full px-3 py-1.5 text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Tag / Subtitle / Role
                </label>
                <input
                  type="text"
                  value={proj.subtitle || ''}
                  onChange={(e) => handleUpdate(proj.id, 'subtitle', e.target.value)}
                  placeholder="e.g. Academic Project or Progressive Web App (PWA)"
                  className="w-full px-3 py-1.5 text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Project Link / GitHub Repo
                </label>
                <div className="relative">
                  <LinkIcon className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={proj.link || ''}
                    onChange={(e) => handleUpdate(proj.id, 'link', e.target.value)}
                    placeholder="e.g. github.com/blaconchain/receipt-pro"
                    className="w-full pl-8 pr-3 py-1.5 text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Start Date
                  </label>
                  <input
                    type="text"
                    value={proj.startDate || ''}
                    onChange={(e) => handleUpdate(proj.id, 'startDate', e.target.value)}
                    placeholder="e.g. 12/2025"
                    className="w-full px-3 py-1.5 text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    End Date
                  </label>
                  <input
                    type="text"
                    value={proj.endDate || ''}
                    onChange={(e) => handleUpdate(proj.id, 'endDate', e.target.value)}
                    placeholder="e.g. 02/2026"
                    className="w-full px-3 py-1.5 text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 bg-white"
                  />
                </div>
              </div>
            </div>

            {/* Bullets */}
            <div className="pt-2 border-t border-slate-200/80 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-700">
                  Architectural Highlights & Features (Bullet Points)
                </span>
                <button
                  type="button"
                  onClick={() => handleAddBullet(proj.id)}
                  className="text-xs text-indigo-600 hover:text-indigo-800 font-medium inline-flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Bullet
                </button>
              </div>

              {(proj.descriptionBullets || ['']).map((bullet, bIdx) => (
                <div key={bIdx} className="space-y-1.5 p-2 rounded-xl bg-white border border-slate-200/90 shadow-2xs">
                  <div className="flex items-start gap-2">
                    <span className="text-slate-400 text-sm mt-1.5 select-none font-bold">•</span>
                    <textarea
                      rows={2}
                      value={bullet}
                      onChange={(e) => handleBulletChange(proj.id, bIdx, e.target.value)}
                      placeholder="e.g. Architected an asynchronous event-driven backend system, improving pipeline throughput by 30%..."
                      className="w-full p-2 text-xs sm:text-sm border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 bg-slate-50/40 text-slate-800 leading-relaxed"
                    />
                    {(proj.descriptionBullets || []).length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveBullet(proj.id, bIdx)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg transition-colors cursor-pointer shrink-0 mt-1"
                        title="Remove bullet"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  <div className="flex items-center justify-between pl-4 pr-1 pt-1 border-t border-slate-100 text-[11px] text-slate-500">
                    <span>Impact & technical architecture polish</span>
                    <AIBulletEnhancer
                      currentText={bullet}
                      onUpdate={(newText) => handleBulletChange(proj.id, bIdx, newText)}
                      roleContext={proj.name || 'Software Project'}
                      defaultMode="star"
                      sectionType="project"
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
