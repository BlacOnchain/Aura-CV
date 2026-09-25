import React from 'react';
import {
  ResumeData,
  TemplateStyle,
  FontFamily,
  PageMargin,
  FontSize,
} from '../../types/resume';
import { DESIGN_PALETTES, getPaletteByHex } from '../../utils/theme';
import {
  Layout,
  Palette,
  Type,
  Check,
  Sparkles,
  Sliders,
  CheckCircle2,
  FileSpreadsheet
} from 'lucide-react';

interface Props {
  data: ResumeData;
  onChangeSettings: (settingsPartial: Partial<ResumeData['settings']>) => void;
  onAutoFitOnePage?: () => void;
}

const TEMPLATES: {
  id: TemplateStyle;
  name: string;
  category: string;
  description: string;
  wireframe: 'banner' | 'compact' | 'nordic' | 'sidebar' | 'executive' | 'tech' | 'classic' | 'creative';
}[] = [
  {
    id: 'flow-moderna',
    name: 'Aura Moderna',
    category: 'Design-Forward',
    description: 'Header banner with monogram crest, timeline bullets, and skills badge rail.',
    wireframe: 'banner',
  },
  {
    id: 'flow-compact',
    name: 'Aura Compact 1-Page',
    category: 'High-Density Fit',
    description: 'Engineered specifically to maximize content density and fit extensive experience onto 1 page.',
    wireframe: 'compact',
  },
  {
    id: 'flow-nordic',
    name: 'Nordic Clean',
    category: 'Minimalist Architecture',
    description: 'Scandinavian clean aesthetic with left-rail section labels and generous air.',
    wireframe: 'nordic',
  },
  {
    id: 'flow-creative',
    name: 'Creative Accent Rail',
    category: 'Visual Showcase',
    description: 'Distinct accent column with avatar badge, skills proficiency meter, and bold headers.',
    wireframe: 'creative',
  },
  {
    id: 'executive',
    name: 'Executive Modern',
    category: 'Corporate & C-Suite',
    description: 'Centered executive masthead, hairline dividers, and flawless ATS scanner pass rates.',
    wireframe: 'executive',
  },
  {
    id: 'modern-tech',
    name: 'Minimalist Tech',
    category: 'ATS Standard',
    description: 'Engineered specifically for engineering recruiters with linear tabular clarity.',
    wireframe: 'tech',
  },
  {
    id: 'classic',
    name: 'Classic Editorial Serif',
    category: 'Formal & Law',
    description: 'Timeless typography, distinguished serif headings, and academic prestige.',
    wireframe: 'classic',
  },
  {
    id: 'sidebar',
    name: 'Split Executive',
    category: 'Two-Column Split',
    description: 'Balanced asymmetric layout separating core narrative from skills and credentials.',
    wireframe: 'sidebar',
  },
];

export const DesignStudio: React.FC<Props> = ({
  data,
  onChangeSettings,
  onAutoFitOnePage,
}) => {
  const currentSettings = data.settings;
  const activePalette = getPaletteByHex(currentSettings.accentColor);

  const handleAutoFit = () => {
    onChangeSettings({
      pageMargin: 'compact',
      compactSpacing: true,
      fontSize: 'small',
    });
    if (onAutoFitOnePage) onAutoFitOnePage();
  };

  // Wireframe mini thumbnail renderer for each template style
  const renderTemplateWireframe = (type: string, isSelected: boolean) => {
    const accent = currentSettings.accentColor || '#059669';
    return (
      <div className={`w-full h-24 rounded-lg p-2 flex flex-col justify-between border transition-all overflow-hidden ${
        isSelected ? 'bg-zinc-50 border-zinc-300' : 'bg-zinc-50/60 border-zinc-200'
      }`}>
        {type === 'banner' && (
          <div className="space-y-1 w-full">
            <div className="h-5 w-full rounded-sm flex items-center px-1.5 justify-between" style={{ backgroundColor: accent }}>
              <div className="w-10 h-1.5 bg-white/90 rounded-xs" />
              <div className="w-4 h-1 bg-white/70 rounded-xs" />
            </div>
            <div className="grid grid-cols-3 gap-1 pt-0.5">
              <div className="col-span-2 space-y-1">
                <div className="h-1.5 w-16 bg-zinc-300 rounded-xs" />
                <div className="h-1 w-full bg-zinc-200 rounded-xs" />
                <div className="h-1 w-4/5 bg-zinc-200 rounded-xs" />
              </div>
              <div className="col-span-1 space-y-1 border-l border-zinc-200 pl-1">
                <div className="h-1.5 w-8 bg-zinc-300 rounded-xs" />
                <div className="h-1 w-full bg-zinc-200 rounded-xs" />
              </div>
            </div>
          </div>
        )}

        {type === 'compact' && (
          <div className="space-y-1 w-full">
            <div className="flex items-center justify-between border-b pb-0.5" style={{ borderColor: accent }}>
              <div className="w-16 h-2 rounded-xs" style={{ backgroundColor: accent }} />
              <div className="w-12 h-1 bg-zinc-400 rounded-xs" />
            </div>
            <div className="space-y-0.5 pt-0.5">
              <div className="flex gap-1 items-center">
                <div className="w-1 h-1 rounded-full" style={{ backgroundColor: accent }} />
                <div className="h-1 w-full bg-zinc-200 rounded-xs" />
              </div>
              <div className="flex gap-1 items-center">
                <div className="w-1 h-1 rounded-full" style={{ backgroundColor: accent }} />
                <div className="h-1 w-3/4 bg-zinc-200 rounded-xs" />
              </div>
              <div className="flex gap-1 items-center">
                <div className="w-1 h-1 rounded-full" style={{ backgroundColor: accent }} />
                <div className="h-1 w-5/6 bg-zinc-200 rounded-xs" />
              </div>
            </div>
          </div>
        )}

        {type === 'nordic' && (
          <div className="grid grid-cols-3 gap-1.5 w-full pt-1">
            <div className="col-span-1 space-y-1.5 border-r border-zinc-200 pr-1">
              <div className="h-2 w-10 rounded-xs" style={{ backgroundColor: accent }} />
              <div className="h-1.5 w-8 bg-zinc-400 rounded-xs" />
              <div className="h-1.5 w-6 bg-zinc-400 rounded-xs" />
            </div>
            <div className="col-span-2 space-y-1">
              <div className="h-1.5 w-20 bg-zinc-300 rounded-xs" />
              <div className="h-1 w-full bg-zinc-200 rounded-xs" />
              <div className="h-1 w-full bg-zinc-200 rounded-xs" />
              <div className="h-1 w-2/3 bg-zinc-200 rounded-xs" />
            </div>
          </div>
        )}

        {type === 'sidebar' && (
          <div className="grid grid-cols-3 gap-1.5 w-full h-full">
            <div className="col-span-1 p-1 rounded-xs space-y-1" style={{ backgroundColor: `${accent}15` }}>
              <div className="w-4 h-4 rounded-full mx-auto" style={{ backgroundColor: accent }} />
              <div className="h-1 w-full bg-zinc-400 rounded-xs" />
              <div className="h-1 w-3/4 bg-zinc-300 rounded-xs" />
            </div>
            <div className="col-span-2 space-y-1 pt-1">
              <div className="h-1.5 w-16 bg-zinc-400 rounded-xs" />
              <div className="h-1 w-full bg-zinc-200 rounded-xs" />
              <div className="h-1 w-4/5 bg-zinc-200 rounded-xs" />
            </div>
          </div>
        )}

        {type === 'executive' && (
          <div className="space-y-1 w-full text-center">
            <div className="mx-auto w-20 h-2 rounded-xs" style={{ backgroundColor: accent }} />
            <div className="mx-auto w-12 h-1 bg-zinc-400 rounded-xs" />
            <div className="w-full border-t border-zinc-300 pt-1 space-y-0.5">
              <div className="h-1 w-full bg-zinc-200 rounded-xs" />
              <div className="h-1 w-3/4 mx-auto bg-zinc-200 rounded-xs" />
            </div>
          </div>
        )}

        {type === 'tech' && (
          <div className="space-y-1 w-full font-mono">
            <div className="flex items-center gap-1 border-b border-zinc-300 pb-0.5">
              <span className="text-[8px] font-bold" style={{ color: accent }}>&gt;_</span>
              <div className="w-14 h-1.5 bg-zinc-700 rounded-xs" />
            </div>
            <div className="space-y-0.5 pt-0.5">
              <div className="h-1 w-full bg-zinc-300 rounded-xs" />
              <div className="h-1 w-5/6 bg-zinc-200 rounded-xs" />
              <div className="h-1 w-2/3 bg-zinc-200 rounded-xs" />
            </div>
          </div>
        )}

        {type === 'classic' && (
          <div className="space-y-1 w-full text-center font-serif">
            <div className="mx-auto w-24 h-2 bg-zinc-800 rounded-xs" />
            <div className="w-full border-y border-zinc-300 py-0.5">
              <div className="h-1 w-16 mx-auto" style={{ backgroundColor: accent }} />
            </div>
            <div className="space-y-0.5 pt-0.5">
              <div className="h-1 w-full bg-zinc-200 rounded-xs" />
              <div className="h-1 w-4/5 mx-auto bg-zinc-200 rounded-xs" />
            </div>
          </div>
        )}

        {type === 'creative' && (
          <div className="grid grid-cols-4 gap-1 w-full h-full">
            <div className="col-span-1 rounded-xs flex flex-col justify-between p-1 text-white" style={{ backgroundColor: accent }}>
              <div className="w-3 h-3 rounded-full bg-white/90" />
              <div className="space-y-0.5">
                <div className="w-full h-0.5 bg-white/60" />
                <div className="w-2/3 h-0.5 bg-white/60" />
              </div>
            </div>
            <div className="col-span-3 space-y-1 pt-0.5 pl-0.5">
              <div className="h-2 w-16 bg-zinc-700 rounded-xs" />
              <div className="h-1 w-full bg-zinc-200 rounded-xs" />
              <div className="h-1 w-4/5 bg-zinc-200 rounded-xs" />
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full bg-zinc-50/70 overflow-y-auto p-4 sm:p-6 space-y-7">
      {/* Header Banner */}
      <div className="bg-white p-5 rounded-2xl border border-zinc-200/90 shadow-2xs">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className={`text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full border ${activePalette.badgeBg} ${activePalette.badgeText} ${activePalette.badgeBorder}`}>
                AuraCV Design Studio
              </span>
              <span className="text-xs text-zinc-400">·</span>
              <span className="text-xs text-zinc-500 font-medium">Precision Layout Engine</span>
            </div>
            <h2 className="text-lg font-bold text-zinc-900 mt-1.5">Design & Layout Architecture</h2>
            <p className="text-xs text-zinc-500 mt-0.5">
              Select designer-curated palettes, typography pairings, and layout densities with real-time A4 page budget sync.
            </p>
          </div>

          {/* Quick Auto-Fit Action */}
          <button
            type="button"
            onClick={handleAutoFit}
            className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-lg text-xs font-semibold transition-colors cursor-pointer shadow-2xs"
            title="Automatically adjust margins and font size to fit neatly on 1 page"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Auto-Fit 1 Page</span>
          </button>
        </div>
      </div>

      {/* 1. Curated Designer Color Palettes */}
      <section className="bg-white p-5 rounded-2xl border border-zinc-200/90 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Palette className="w-4 h-4" style={{ color: currentSettings.accentColor }} />
            <h3 className="text-sm font-bold text-zinc-900">Curated Designer Palettes</h3>
          </div>
          <span className="text-xs text-zinc-500 font-medium">
            Active: <strong className="text-zinc-800">{activePalette.name}</strong>
          </span>
        </div>

        {/* Palette Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {DESIGN_PALETTES.map((palette) => {
            const isSelected =
              currentSettings.accentColor.toLowerCase() === palette.hex.toLowerCase();
            return (
              <button
                key={palette.id}
                type="button"
                onClick={() => onChangeSettings({ accentColor: palette.hex })}
                className={`text-left p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                  isSelected
                    ? 'border-zinc-900 ring-2 ring-zinc-900/10 bg-zinc-50/80 shadow-2xs'
                    : 'border-zinc-200 hover:border-zinc-300 bg-white hover:bg-zinc-50/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  {/* Swatch Pill */}
                  <div
                    className="w-8 h-8 rounded-lg shadow-inner flex items-center justify-center text-white shrink-0 relative overflow-hidden"
                    style={{
                      background: `linear-gradient(135deg, ${palette.hex} 0%, ${palette.secondaryHex} 100%)`,
                    }}
                  >
                    {isSelected && <Check className="w-4 h-4 drop-shadow-xs" />}
                  </div>

                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-xs text-zinc-900">{palette.name}</span>
                    </div>
                    <span className="text-[10px] text-zinc-500 block">
                      {palette.category}
                    </span>
                  </div>
                </div>

                <span
                  className="w-3.5 h-3.5 rounded-full border border-black/10 shrink-0"
                  style={{ backgroundColor: palette.hex }}
                />
              </button>
            );
          })}
        </div>

        {/* Custom Hex Picker Row */}
        <div className="pt-3 border-t border-zinc-100 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <label className="font-semibold text-zinc-700">Custom Accent Hex:</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={currentSettings.accentColor}
                onChange={(e) => onChangeSettings({ accentColor: e.target.value })}
                className="w-7 h-7 rounded-md border border-zinc-300 cursor-pointer p-0.5"
              />
              <input
                type="text"
                value={currentSettings.accentColor}
                onChange={(e) => onChangeSettings({ accentColor: e.target.value })}
                placeholder="#059669"
                className="w-24 px-2 py-1 text-xs font-mono font-semibold uppercase bg-zinc-50 border border-zinc-200 rounded-md focus:outline-hidden focus:border-zinc-500"
              />
            </div>
          </div>
          <span className="text-[11px] text-zinc-400 hidden sm:inline">
            Applies to titles, timeline dots, header accents, and badges
          </span>
        </div>
      </section>

      {/* 2. Resume Templates with Visual Schematic Wireframes */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layout className="w-4 h-4 text-zinc-800" />
            <h3 className="text-sm font-bold text-zinc-900">Resume Templates</h3>
          </div>
          <span className="text-xs text-zinc-500">
            {TEMPLATES.length} architectural styles available
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {TEMPLATES.map((tpl) => {
            const isSelected = currentSettings.template === tpl.id;
            return (
              <button
                key={tpl.id}
                type="button"
                onClick={() => onChangeSettings({ template: tpl.id })}
                className={`text-left p-3 rounded-xl border-2 transition-all cursor-pointer relative flex flex-col justify-between ${
                  isSelected
                    ? 'border-zinc-900 bg-white shadow-xs'
                    : 'border-zinc-200 hover:border-zinc-300 bg-white'
                }`}
              >
                <div>
                  {/* Miniature Visual Wireframe */}
                  {renderTemplateWireframe(tpl.wireframe, isSelected)}

                  <div className="mt-2.5 flex items-center justify-between">
                    <span className="font-bold text-xs text-zinc-900">{tpl.name}</span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded-sm bg-zinc-100 text-zinc-600 font-medium">
                      {tpl.category}
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-500 mt-1 line-clamp-2 leading-relaxed">
                    {tpl.description}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-zinc-100 flex items-center justify-between text-[11px]">
                  <span
                    className={`font-semibold ${
                      isSelected ? 'text-zinc-900 font-bold' : 'text-zinc-400'
                    }`}
                  >
                    {isSelected ? 'Active Template' : 'Click to Apply'}
                  </span>
                  {isSelected && (
                    <div className="w-4 h-4 rounded-full bg-zinc-900 text-white flex items-center justify-center">
                      <Check className="w-3 h-3" />
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* 3. Typography & Font Hierarchy */}
      <section className="bg-white p-5 rounded-2xl border border-zinc-200/90 shadow-2xs space-y-4">
        <div className="flex items-center gap-2">
          <Type className="w-4 h-4 text-zinc-800" />
          <h3 className="text-sm font-bold text-zinc-900">Typography & Font Pairing</h3>
        </div>

        {/* Font Family Options */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {[
            {
              id: 'sans',
              name: 'Plus Jakarta Sans (Modern)',
              category: 'High-Scannability Contemporary',
              sample: 'Clean geometric lines with refined clarity for modern tech & product roles.',
            },
            {
              id: 'serif',
              name: 'Instrument Serif / Merriweather',
              category: 'Editorial & Academic Prestige',
              sample: 'Traditional authority, elegant serifs, and high-impact executive presence.',
            },
            {
              id: 'mono',
              name: 'JetBrains Mono (Technical)',
              category: 'Engineering & Data Systems',
              sample: 'Tabular numerals, precise developer styling, and code-aligned structure.',
            },
          ].map((font) => {
            const isSelected = currentSettings.fontFamily === font.id;
            return (
              <button
                key={font.id}
                type="button"
                onClick={() => onChangeSettings({ fontFamily: font.id as FontFamily })}
                className={`p-3.5 rounded-xl border-2 text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'border-zinc-900 bg-zinc-50/50 shadow-2xs'
                    : 'border-zinc-200 hover:border-zinc-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="text-xs font-bold text-zinc-900">{font.name}</div>
                  {isSelected && <Check className="w-3.5 h-3.5 text-zinc-900" />}
                </div>
                <div className="text-[10px] text-zinc-500 font-medium mt-0.5">{font.category}</div>
                <p className="text-[11px] text-zinc-600 mt-2 italic border-t border-zinc-100 pt-2 leading-snug">
                  "{font.sample}"
                </p>
              </button>
            );
          })}
        </div>

        {/* Font Size Presets */}
        <div className="pt-3 border-t border-zinc-100 flex items-center justify-between flex-wrap gap-2">
          <div>
            <label className="text-xs font-semibold text-zinc-800 block">Body Font Scale:</label>
            <span className="text-[11px] text-zinc-500">Scales titles and descriptions proportionally</span>
          </div>
          <div className="flex items-center rounded-lg border border-zinc-200 bg-zinc-50 p-0.5 text-xs">
            {[
              { id: 'small', label: 'Compact (9.5pt)' },
              { id: 'medium', label: 'Balanced (10.5pt)' },
              { id: 'large', label: 'Airy (11.5pt)' },
            ].map((size) => {
              const isSelected = (currentSettings.fontSize || 'medium') === size.id;
              return (
                <button
                  key={size.id}
                  type="button"
                  onClick={() => onChangeSettings({ fontSize: size.id as FontSize })}
                  className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-white shadow-2xs font-semibold text-zinc-900'
                      : 'text-zinc-600 hover:text-zinc-900'
                  }`}
                >
                  {size.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Page Margins & Spacing Density */}
      <section className="bg-white p-5 rounded-2xl border border-zinc-200/90 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-zinc-800" />
            <h3 className="text-sm font-bold text-zinc-900">Page Margins & Density</h3>
          </div>
          <span className="text-xs text-zinc-500 font-medium">Standard A4 Boundary Controls</span>
        </div>

        {/* Margin selector */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {[
            { id: 'compact', label: 'Compact (10mm)', desc: 'Fits up to 25% more experience on 1 page' },
            { id: 'normal', label: 'Standard (16mm)', desc: 'Balanced white space and ATS readability' },
            { id: 'spacious', label: 'Executive (22mm)', desc: 'Distinguished framing for senior roles' },
          ].map((m) => {
            const isSelected = (currentSettings.pageMargin || 'normal') === m.id;
            return (
              <button
                key={m.id}
                type="button"
                onClick={() =>
                  onChangeSettings({
                    pageMargin: m.id as PageMargin,
                    compactSpacing: m.id === 'compact',
                  })
                }
                className={`p-3 rounded-xl border-2 text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'border-zinc-900 bg-zinc-50/50 shadow-2xs'
                    : 'border-zinc-200 hover:border-zinc-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-zinc-900">{m.label}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-zinc-900" />}
                </div>
                <div className="text-[10px] text-zinc-500 mt-1">{m.desc}</div>
              </button>
            );
          })}
        </div>

        {/* Compact Vertical Spacing Checkbox */}
        <div className="pt-3 border-t border-zinc-100 flex items-center justify-between">
          <div>
            <label className="text-xs font-semibold text-zinc-800 block">
              High-Density Bullet Spacing
            </label>
            <p className="text-[11px] text-zinc-500">
              Tightens padding between achievement bullets and work experience entries
            </p>
          </div>
          <input
            type="checkbox"
            checked={currentSettings.compactSpacing}
            onChange={(e) => onChangeSettings({ compactSpacing: e.target.checked })}
            className="w-4 h-4 text-zinc-900 rounded-sm border-zinc-300 focus:ring-zinc-900 cursor-pointer"
          />
        </div>
      </section>

      {/* 5. Section Visibility Toggles */}
      <section className="bg-white p-5 rounded-2xl border border-zinc-200/90 shadow-2xs space-y-3">
        <h3 className="text-sm font-bold text-zinc-900">Optional Section Visibilities</h3>
        <p className="text-xs text-zinc-500">
          Toggle secondary sections to optimize space or tailor for specialized applications:
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
          {[
            { key: 'showProjects', label: 'Projects' },
            { key: 'showCertifications', label: 'Certifications' },
            { key: 'showLanguages', label: 'Languages' },
            { key: 'showReferences', label: 'References' },
          ].map((item) => (
            <label
              key={item.key}
              className="flex items-center gap-2 p-2.5 rounded-lg bg-zinc-50 border border-zinc-200 cursor-pointer hover:bg-zinc-100 transition-colors"
            >
              <input
                type="checkbox"
                checked={Boolean((currentSettings as any)[item.key])}
                onChange={(e) =>
                  onChangeSettings({ [item.key]: e.target.checked } as any)
                }
                className="w-4 h-4 text-zinc-900 rounded-sm border-zinc-300 focus:ring-zinc-900 cursor-pointer"
              />
              <span className="font-medium text-zinc-800">{item.label}</span>
            </label>
          ))}
        </div>
      </section>
    </div>
  );
};
