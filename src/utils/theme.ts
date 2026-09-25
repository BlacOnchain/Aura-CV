export interface DesignPalette {
  id: string;
  name: string;
  category: string;
  hex: string;
  secondaryHex: string;
  badgeBg: string;
  badgeText: string;
  badgeBorder: string;
  buttonClass: string;
  accentClass: string;
  description: string;
}

export const DESIGN_PALETTES: DesignPalette[] = [
  {
    id: 'emerald',
    name: 'Emerald Sovereign',
    category: 'Venture & Growth',
    hex: '#059669',
    secondaryHex: '#10b981',
    badgeBg: 'bg-emerald-50',
    badgeText: 'text-emerald-800',
    badgeBorder: 'border-emerald-200',
    buttonClass: 'bg-emerald-600 hover:bg-emerald-700 text-white',
    accentClass: 'text-emerald-600',
    description: 'Crisp high-growth venture tone with high contrast and distinguished authority.',
  },
  {
    id: 'gold',
    name: 'Champagne & Obsidian Gold',
    category: 'Executive Luxury',
    hex: '#b45309',
    secondaryHex: '#d97706',
    badgeBg: 'bg-amber-50',
    badgeText: 'text-amber-900',
    badgeBorder: 'border-amber-200',
    buttonClass: 'bg-amber-600 hover:bg-amber-700 text-white',
    accentClass: 'text-amber-600',
    description: 'Warm, refined golden metallic tone favored by C-suite executives and founders.',
  },
  {
    id: 'iris',
    name: 'Electric Iris & Violet',
    category: 'Creative Tech',
    hex: '#7c3aed',
    secondaryHex: '#a855f7',
    badgeBg: 'bg-violet-50',
    badgeText: 'text-violet-800',
    badgeBorder: 'border-violet-200',
    buttonClass: 'bg-violet-600 hover:bg-violet-700 text-white',
    accentClass: 'text-violet-600',
    description: 'Expressive visionary purple for software architects and product designers.',
  },
  {
    id: 'terracotta',
    name: 'Terracotta Rust & Clay',
    category: 'Modern Craft',
    hex: '#c2410c',
    secondaryHex: '#ea580c',
    badgeBg: 'bg-orange-50',
    badgeText: 'text-orange-900',
    badgeBorder: 'border-orange-200',
    buttonClass: 'bg-orange-600 hover:bg-orange-700 text-white',
    accentClass: 'text-orange-600',
    description: 'Earth-born architectural warmth, human craftsmanship, and editorial strength.',
  },
  {
    id: 'teal',
    name: 'Pacific Pine & Sage',
    category: 'Nordic Clean',
    hex: '#0f766e',
    secondaryHex: '#14b8a6',
    badgeBg: 'bg-teal-50',
    badgeText: 'text-teal-900',
    badgeBorder: 'border-teal-200',
    buttonClass: 'bg-teal-600 hover:bg-teal-700 text-white',
    accentClass: 'text-teal-600',
    description: 'Deep Scandinavian teal evoking calmness, scientific rigor, and balance.',
  },
  {
    id: 'crimson',
    name: 'Crimson Velvet & Rose',
    category: 'Bold Leadership',
    hex: '#be123c',
    secondaryHex: '#e11d48',
    badgeBg: 'bg-rose-50',
    badgeText: 'text-rose-900',
    badgeBorder: 'border-rose-200',
    buttonClass: 'bg-rose-600 hover:bg-rose-700 text-white',
    accentClass: 'text-rose-600',
    description: 'High-energy assertive crimson that commands recruiter attention.',
  },
  {
    id: 'obsidian',
    name: 'Midnight Titanium & Slate',
    category: 'Monochrome Crisp',
    hex: '#18181b',
    secondaryHex: '#3f3f46',
    badgeBg: 'bg-zinc-100',
    badgeText: 'text-zinc-900',
    badgeBorder: 'border-zinc-300',
    buttonClass: 'bg-zinc-900 hover:bg-zinc-800 text-white',
    accentClass: 'text-zinc-900',
    description: 'Pure architectural restraint, neutral density, and zero distractions.',
  },
  {
    id: 'plum',
    name: 'Tokyo Plum & Blackberry',
    category: 'Avant-Garde',
    hex: '#86198f',
    secondaryHex: '#c026d3',
    badgeBg: 'bg-fuchsia-50',
    badgeText: 'text-fuchsia-900',
    badgeBorder: 'border-fuchsia-200',
    buttonClass: 'bg-fuchsia-700 hover:bg-fuchsia-800 text-white',
    accentClass: 'text-fuchsia-700',
    description: 'Deep saturated berry-plum tone for standout creative portfolios.',
  },
  {
    id: 'sapphire',
    name: 'Royal Sapphire',
    category: 'Corporate Trust',
    hex: '#1d4ed8',
    secondaryHex: '#3b82f6',
    badgeBg: 'bg-blue-50',
    badgeText: 'text-blue-900',
    badgeBorder: 'border-blue-200',
    buttonClass: 'bg-blue-600 hover:bg-blue-700 text-white',
    accentClass: 'text-blue-600',
    description: 'Deep authoritative royal navy for traditional banking and institutional roles.',
  },
];

export const APP_ACCENT = DESIGN_PALETTES[0]; // Emerald Sovereign

export const getPaletteByHex = (hex: string): DesignPalette => {
  const normalized = (hex || '').toLowerCase().trim();
  const match = DESIGN_PALETTES.find((p) => p.hex.toLowerCase() === normalized);
  return match || DESIGN_PALETTES[0]; // defaults to Emerald Sovereign
};
