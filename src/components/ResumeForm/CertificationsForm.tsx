import React from 'react';
import { CertificationItem } from '../../types/resume';
import { Award, Plus, Trash2 } from 'lucide-react';

interface Props {
  certifications: CertificationItem[];
  onChange: (updated: CertificationItem[]) => void;
}

export const CertificationsForm: React.FC<Props> = ({ certifications, onChange }) => {
  const handleAdd = () => {
    const newItem: CertificationItem = {
      id: `cert-${Date.now()}`,
      name: '',
      issuer: '',
      date: '',
    };
    onChange([...certifications, newItem]);
  };

  const handleUpdate = (id: string, field: keyof CertificationItem, value: string) => {
    onChange(
      certifications.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const handleRemove = (id: string) => {
    onChange(certifications.filter((item) => item.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-[#EBE6DD]/60">
        <div>
          <p className="text-xs text-zinc-500">
            Verified credentials, language proficiencies (e.g. C1 Advanced English), or cloud certificates
          </p>
        </div>

        <button
          type="button"
          onClick={handleAdd}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#1A1917] bg-[#EBE6DD]/60 hover:bg-[#EBE6DD] rounded-lg transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Add Certificate
        </button>
      </div>

      {certifications.length === 0 ? (
        <p className="text-xs text-slate-500 py-3 text-center bg-slate-50 rounded-lg border border-dashed border-slate-200">
          No certifications added yet. Click &quot;Add Certificate&quot; to include one.
        </p>
      ) : (
        <div className="space-y-3">
          {certifications.map((cert) => (
            <div
              key={cert.id}
              className="flex items-center gap-3 p-3 bg-slate-50/50 rounded-lg border border-slate-200"
            >
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-2">
                <input
                  type="text"
                  value={cert.name || ''}
                  onChange={(e) => handleUpdate(cert.id, 'name', e.target.value)}
                  placeholder="e.g. C1 Advanced English or AWS Certified"
                  className="px-2.5 py-1.5 text-xs sm:text-sm bg-white border border-slate-300 rounded-md focus:outline-hidden focus:ring-1 focus:ring-indigo-500"
                />
                <input
                  type="text"
                  value={cert.issuer || ''}
                  onChange={(e) => handleUpdate(cert.id, 'issuer', e.target.value)}
                  placeholder="e.g. Cambridge / CEFR Standard"
                  className="px-2.5 py-1.5 text-xs sm:text-sm bg-white border border-slate-300 rounded-md focus:outline-hidden focus:ring-1 focus:ring-indigo-500"
                />
                <input
                  type="text"
                  value={cert.date || ''}
                  onChange={(e) => handleUpdate(cert.id, 'date', e.target.value)}
                  placeholder="e.g. 2024"
                  className="px-2.5 py-1.5 text-xs sm:text-sm bg-white border border-slate-300 rounded-md focus:outline-hidden focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <button
                type="button"
                onClick={() => handleRemove(cert.id)}
                className="p-1.5 text-slate-400 hover:text-rose-600 rounded-md cursor-pointer"
                title="Remove"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
