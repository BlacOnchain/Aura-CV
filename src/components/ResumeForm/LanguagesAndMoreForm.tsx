import React from 'react';
import { LanguageItem, ResumeSettings } from '../../types/resume';
import { Languages, Plus, Trash2, Sliders, CheckSquare } from 'lucide-react';

interface Props {
  languages: LanguageItem[];
  referencesText: string;
  settings: ResumeSettings;
  onLanguagesChange: (updated: LanguageItem[]) => void;
  onReferencesChange: (updated: string) => void;
  onSettingsChange: (updated: ResumeSettings) => void;
}

export const LanguagesAndMoreForm: React.FC<Props> = ({
  languages,
  referencesText,
  settings,
  onLanguagesChange,
  onReferencesChange,
  onSettingsChange,
}) => {
  const handleAddLanguage = () => {
    const newItem: LanguageItem = {
      id: `lang-${Date.now()}`,
      language: '',
      proficiency: 'Fluent',
    };
    onLanguagesChange([...languages, newItem]);
  };

  const handleUpdateLanguage = (id: string, field: keyof LanguageItem, value: string) => {
    onLanguagesChange(
      languages.map((l) => (l.id === id ? { ...l, [field]: value } : l))
    );
  };

  const handleRemoveLanguage = (id: string) => {
    onLanguagesChange(languages.filter((l) => l.id !== id));
  };

  const handleToggleSetting = (field: keyof ResumeSettings) => {
    onSettingsChange({
      ...settings,
      [field]: !settings[field],
    });
  };

  return (
    <div className="space-y-6">
      {/* Languages */}
      <div className="space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#EBE6DD]/60">
          <div>
            <p className="text-xs text-zinc-500">
              Fluency levels (e.g. English, Yoruba)
            </p>
          </div>

          <button
            type="button"
            onClick={handleAddLanguage}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#1A1917] bg-[#EBE6DD]/60 hover:bg-[#EBE6DD] rounded-lg transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Add Language
          </button>
        </div>

        {languages.length === 0 ? (
          <p className="text-xs text-slate-500 py-3 text-center bg-slate-50 rounded-lg border border-dashed border-slate-200">
            No languages added yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {languages.map((lang) => (
              <div
                key={lang.id}
                className="flex items-center gap-2 p-2.5 bg-slate-50/60 rounded-lg border border-slate-200"
              >
                <input
                  type="text"
                  value={lang.language || ''}
                  onChange={(e) => handleUpdateLanguage(lang.id, 'language', e.target.value)}
                  placeholder="Language (e.g. English)"
                  className="flex-1 px-2.5 py-1 text-xs sm:text-sm bg-white border border-slate-300 rounded-md focus:outline-hidden focus:ring-1 focus:ring-indigo-500 font-medium"
                />
                <input
                  type="text"
                  value={lang.proficiency || ''}
                  onChange={(e) => handleUpdateLanguage(lang.id, 'proficiency', e.target.value)}
                  placeholder="Proficiency (e.g. Native / C1)"
                  className="w-28 px-2.5 py-1 text-xs bg-white border border-slate-300 rounded-md focus:outline-hidden focus:ring-1 focus:ring-indigo-500 text-slate-600"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveLanguage(lang.id)}
                  className="p-1 text-slate-400 hover:text-rose-600 rounded-md cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* References & Section Visibility Settings */}
      <div className="space-y-4 pt-4 border-t border-[#EBE6DD]/60">
        <div className="pb-3 border-b border-[#EBE6DD]/60">
          <p className="text-xs text-zinc-500">
            Turn sections on or off to tailor your resume layout
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <label className="flex items-center gap-2 p-2.5 rounded-lg border border-slate-200 bg-slate-50/50 cursor-pointer hover:bg-slate-50">
            <input
              type="checkbox"
              checked={settings.showProjects}
              onChange={() => handleToggleSetting('showProjects')}
              className="rounded text-indigo-600 focus:ring-indigo-500 h-4 w-4 border-slate-300 cursor-pointer"
            />
            <span className="text-xs font-medium text-slate-700">Show Projects</span>
          </label>

          <label className="flex items-center gap-2 p-2.5 rounded-lg border border-slate-200 bg-slate-50/50 cursor-pointer hover:bg-slate-50">
            <input
              type="checkbox"
              checked={settings.showCertifications}
              onChange={() => handleToggleSetting('showCertifications')}
              className="rounded text-indigo-600 focus:ring-indigo-500 h-4 w-4 border-slate-300 cursor-pointer"
            />
            <span className="text-xs font-medium text-slate-700">Show Certs</span>
          </label>

          <label className="flex items-center gap-2 p-2.5 rounded-lg border border-slate-200 bg-slate-50/50 cursor-pointer hover:bg-slate-50">
            <input
              type="checkbox"
              checked={settings.showLanguages}
              onChange={() => handleToggleSetting('showLanguages')}
              className="rounded text-indigo-600 focus:ring-indigo-500 h-4 w-4 border-slate-300 cursor-pointer"
            />
            <span className="text-xs font-medium text-slate-700">Show Languages</span>
          </label>

          <label className="flex items-center gap-2 p-2.5 rounded-lg border border-slate-200 bg-slate-50/50 cursor-pointer hover:bg-slate-50">
            <input
              type="checkbox"
              checked={settings.showReferences}
              onChange={() => handleToggleSetting('showReferences')}
              className="rounded text-indigo-600 focus:ring-indigo-500 h-4 w-4 border-slate-300 cursor-pointer"
            />
            <span className="text-xs font-medium text-slate-700">Show References</span>
          </label>
        </div>

        {settings.showReferences && (
          <div className="pt-2">
            <label className="block text-xs font-medium text-slate-700 mb-1">
              References Footer Text
            </label>
            <input
              type="text"
              value={referencesText || ''}
              onChange={(e) => onReferencesChange(e.target.value)}
              placeholder="e.g. References, Available upon request."
              className="w-full px-3 py-1.5 text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 bg-white"
            />
          </div>
        )}
      </div>
    </div>
  );
};
