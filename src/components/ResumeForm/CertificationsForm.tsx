import React, { useState } from 'react';
import { CertificationItem } from '../../types/resume';
import { Award, Plus, Trash2, Edit3, Check, Calendar } from 'lucide-react';

interface Props {
  certifications: CertificationItem[];
  onChange: (updated: CertificationItem[]) => void;
}

export const CertificationsForm: React.FC<Props> = ({ certifications, onChange }) => {
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleAdd = () => {
    const newItem: CertificationItem = {
      id: `cert-${Date.now()}`,
      name: '',
      issuer: '',
      date: '',
    };
    const updated = [...certifications, newItem];
    onChange(updated);
    setEditingId(newItem.id);
  };

  const handleUpdate = (id: string, field: keyof CertificationItem, value: string) => {
    onChange(
      certifications.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const handleRemove = (id: string) => {
    if (editingId === id) setEditingId(null);
    onChange(certifications.filter((item) => item.id !== id));
  };

  const editingItem = certifications.find((c) => c.id === editingId);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-zinc-200">
        <div>
          <p className="text-xs text-zinc-500">
            Verified credentials, language proficiencies (e.g. C1 Advanced English), or cloud certificates
          </p>
        </div>

        <button
          type="button"
          onClick={handleAdd}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-zinc-900 bg-zinc-100 hover:bg-zinc-200 rounded-lg transition-colors cursor-pointer border border-zinc-200"
        >
          <Plus className="w-4 h-4" />
          Add Certificate
        </button>
      </div>

      {certifications.length === 0 && (
        <div className="text-center py-8 px-4 border border-dashed border-zinc-200 rounded-2xl bg-transparent">
          <Award className="w-8 h-8 text-zinc-400 mx-auto mb-2" />
          <p className="text-sm font-medium text-slate-700">No certifications added yet</p>
          <p className="text-xs text-slate-500 mt-1 mb-4">Add your professional licenses and credentials</p>
          <button
            type="button"
            onClick={handleAdd}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-zinc-900 hover:bg-zinc-800 rounded-lg shadow-xs cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Add Certificate
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
                  Editing Credential: {editingItem.name || 'Untitled Certification'}
                </h3>
                <p className="text-xs text-zinc-500">{editingItem.issuer || 'Issuing Organization'}</p>
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Credential Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={editingItem.name || ''}
                onChange={(e) => handleUpdate(editingItem.id, 'name', e.target.value)}
                placeholder="e.g. AWS Certified Solutions Architect"
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Issuing Organization <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={editingItem.issuer || ''}
                onChange={(e) => handleUpdate(editingItem.id, 'issuer', e.target.value)}
                placeholder="e.g. Amazon Web Services"
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Date Issued</label>
              <input
                type="text"
                value={editingItem.date || ''}
                onChange={(e) => handleUpdate(editingItem.id, 'date', e.target.value)}
                placeholder="e.g. 2024"
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 bg-white"
              />
            </div>
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
          {certifications.map((cert, index) => (
            <div
              key={cert.id}
              onClick={() => setEditingId(cert.id)}
              className="flex items-center justify-between p-4 bg-white hover:bg-zinc-50/80 rounded-2xl border border-zinc-200/90 shadow-2xs transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-zinc-100 group-hover:bg-zinc-900 group-hover:text-white text-zinc-700 flex items-center justify-center shrink-0 transition-colors font-bold text-xs">
                  {index + 1}
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs sm:text-sm font-bold text-zinc-900 truncate">
                    {cert.name || 'Untitled Certification'} <span className="font-normal text-zinc-500">· {cert.issuer || 'Issuer'}</span>
                  </h4>
                  <div className="flex items-center gap-2 mt-1 text-[11px] text-zinc-500">
                    {cert.date && (
                      <span className="flex items-center gap-1 text-emerald-700 font-medium bg-emerald-50 px-2 py-0.5 rounded-md">
                        <Calendar className="w-3 h-3" />
                        {cert.date}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1 shrink-0" onClick={(e) => e.stopPropagation()}>
                <button
                  type="button"
                  onClick={() => setEditingId(cert.id)}
                  className="px-3 py-1.5 text-xs font-semibold text-zinc-700 bg-zinc-100 hover:bg-zinc-900 hover:text-white rounded-lg transition-colors cursor-pointer inline-flex items-center gap-1"
                >
                  <Edit3 className="w-3.5 h-3.5" /> Edit
                </button>
                <button
                  type="button"
                  onClick={() => handleRemove(cert.id)}
                  className="p-1.5 text-zinc-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer"
                  title="Remove"
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
