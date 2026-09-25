import React, { useState, useRef, useEffect } from 'react';
import { SkillCategory } from '../../types/resume';
import {
  Tag,
  Plus,
  X,
  Check,
  Search,
  Sparkles,
  Layers,
  Copy,
  Trash2,
  ChevronDown,
  Code2,
  Database,
  Cloud,
  Cpu,
  Boxes
} from 'lucide-react';

interface Props {
  skillCategories: SkillCategory[];
  onChange: (updated: SkillCategory[]) => void;
}

export interface TechSuggestion {
  name: string;
  category: 'languages' | 'frameworks' | 'databases' | 'devops' | 'architecture' | 'tools';
}

const TECH_SUGGESTIONS: TechSuggestion[] = [
  // Backend & Languages
  { name: 'PHP', category: 'languages' },
  { name: 'JavaScript', category: 'languages' },
  { name: 'TypeScript', category: 'languages' },
  { name: 'Python', category: 'languages' },
  { name: 'Go (Golang)', category: 'languages' },
  { name: 'Java', category: 'languages' },
  { name: 'C#', category: 'languages' },
  { name: 'SQL', category: 'languages' },
  { name: 'Bash / Shell', category: 'languages' },
  { name: 'HTML5 / CSS3', category: 'languages' },

  // Frameworks & Libraries
  { name: 'Laravel', category: 'frameworks' },
  { name: 'React', category: 'frameworks' },
  { name: 'Node.js', category: 'frameworks' },
  { name: 'Express.js', category: 'frameworks' },
  { name: 'Next.js', category: 'frameworks' },
  { name: 'Vue.js', category: 'frameworks' },
  { name: 'Tailwind CSS', category: 'frameworks' },
  { name: 'Django', category: 'frameworks' },
  { name: 'FastAPI', category: 'frameworks' },
  { name: 'NestJS', category: 'frameworks' },
  { name: 'Spring Boot', category: 'frameworks' },
  { name: 'PWA (Progressive Web Apps)', category: 'frameworks' },

  // Databases & Storage
  { name: 'MySQL', category: 'databases' },
  { name: 'PostgreSQL', category: 'databases' },
  { name: 'Redis', category: 'databases' },
  { name: 'MongoDB', category: 'databases' },
  { name: 'SQLite', category: 'databases' },
  { name: 'Firebase Firestore', category: 'databases' },
  { name: 'Supabase', category: 'databases' },
  { name: 'Database Optimization', category: 'databases' },
  { name: 'Schema Design', category: 'databases' },
  { name: 'Indexing & Caching', category: 'databases' },

  // DevOps & Cloud
  { name: 'Docker', category: 'devops' },
  { name: 'Git & GitHub', category: 'devops' },
  { name: 'CI/CD Pipelines', category: 'devops' },
  { name: 'Linux Server Admin', category: 'devops' },
  { name: 'AWS (EC2, S3)', category: 'devops' },
  { name: 'Nginx', category: 'devops' },
  { name: 'Kubernetes', category: 'devops' },
  { name: 'Vercel / Netlify', category: 'devops' },
  { name: 'GitHub Actions', category: 'devops' },

  // Architecture & Practices
  { name: 'RESTful APIs', category: 'architecture' },
  { name: 'Microservices', category: 'architecture' },
  { name: 'Object-Oriented Programming (OOP)', category: 'architecture' },
  { name: 'MVC Architecture', category: 'architecture' },
  { name: 'WebSockets', category: 'architecture' },
  { name: 'Unit Testing (PHPUnit/Jest)', category: 'architecture' },
  { name: 'API Security & JWT', category: 'architecture' },
  { name: 'Agile & Scrum', category: 'architecture' },

  // Tools & Operations
  { name: 'Postman', category: 'tools' },
  { name: 'VS Code', category: 'tools' },
  { name: 'Technical Documentation', category: 'tools' },
  { name: 'Community Management', category: 'tools' },
  { name: 'Discord Moderation', category: 'tools' },
];

const PRESET_STACKS = [
  {
    name: '🚀 Modern Laravel & MySQL',
    skills: ['PHP', 'Laravel', 'MySQL', 'RESTful APIs', 'Redis', 'Docker', 'Git & GitHub', 'Tailwind CSS'],
    targetCategoryName: 'PHP & Laravel Frameworks',
  },
  {
    name: '⚡ Full-Stack TypeScript',
    skills: ['TypeScript', 'React', 'Node.js', 'Express.js', 'PostgreSQL', 'Tailwind CSS', 'Docker', 'RESTful APIs'],
    targetCategoryName: 'TypeScript & Web Development',
  },
  {
    name: '🐍 Python & Data/Backend',
    skills: ['Python', 'FastAPI', 'PostgreSQL', 'Redis', 'Docker', 'RESTful APIs', 'Git & GitHub'],
    targetCategoryName: 'Python Backend Systems',
  },
];

type CategoryFilter = 'all' | 'languages' | 'frameworks' | 'databases' | 'devops' | 'architecture' | 'tools';

export const TechStackTagInput: React.FC<Props> = ({ skillCategories, onChange }) => {
  const [inputValue, setInputValue] = useState('');
  const [selectedTargetCatId, setSelectedTargetCatId] = useState<string>('');
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const [copiedNotification, setCopiedNotification] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Set default target category if not chosen yet
  useEffect(() => {
    if (skillCategories.length > 0 && !selectedTargetCatId) {
      setSelectedTargetCatId(skillCategories[0].id);
    }
  }, [skillCategories, selectedTargetCatId]);

  // Click outside to close suggestion dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Compute all current skills flattened across categories
  const allCurrentSkills = skillCategories.flatMap((cat) =>
    cat.skillsList.map((skill) => ({
      skill,
      categoryId: cat.id,
      categoryName: cat.categoryName,
    }))
  );

  const isSkillAdded = (skillName: string) => {
    const target = skillName.trim().toLowerCase();
    return allCurrentSkills.some((s) => s.skill.toLowerCase() === target);
  };

  // Helper: auto-detect best category for a tech item if auto is desired
  const guessCategoryName = (skill: string): string => {
    const item = TECH_SUGGESTIONS.find((s) => s.name.toLowerCase() === skill.toLowerCase());
    if (!item) return 'Core Technical Stack';
    switch (item.category) {
      case 'languages':
      case 'frameworks':
        return 'Languages & Frameworks';
      case 'databases':
        return 'Databases & Storage Architecture';
      case 'devops':
        return 'DevOps, Cloud & Infrastructure';
      case 'architecture':
        return 'Systems Architecture & APIs';
      case 'tools':
      default:
        return 'Developer Tools & Methodologies';
    }
  };

  const handleAddSkill = (skillName: string, explicitCatId?: string) => {
    const trimmed = skillName.trim().replace(/^[,]+|[,]+$/g, '');
    if (!trimmed) return;

    if (isSkillAdded(trimmed)) {
      setInputValue('');
      setIsDropdownOpen(false);
      return;
    }

    let updatedCategories = [...skillCategories];

    // If no category exists at all, create one
    if (updatedCategories.length === 0) {
      const defaultCategoryName = guessCategoryName(trimmed);
      const newCat: SkillCategory = {
        id: `skill-${Date.now()}`,
        categoryName: defaultCategoryName,
        skillsList: [trimmed],
        description: 'Key technologies and development proficiencies',
      };
      onChange([newCat]);
      setSelectedTargetCatId(newCat.id);
      setInputValue('');
      setIsDropdownOpen(false);
      return;
    }

    // Determine target category
    const targetId = explicitCatId || selectedTargetCatId || updatedCategories[0].id;
    let targetFound = false;

    updatedCategories = updatedCategories.map((cat) => {
      if (cat.id === targetId) {
        targetFound = true;
        if (!cat.skillsList.some((s) => s.toLowerCase() === trimmed.toLowerCase())) {
          return { ...cat, skillsList: [...cat.skillsList, trimmed] };
        }
      }
      return cat;
    });

    if (!targetFound) {
      // Add to first category
      updatedCategories[0] = {
        ...updatedCategories[0],
        skillsList: [...updatedCategories[0].skillsList, trimmed],
      };
    }

    onChange(updatedCategories);
    setInputValue('');
    setIsDropdownOpen(false);
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    const target = skillToRemove.toLowerCase();
    const updated = skillCategories.map((cat) => ({
      ...cat,
      skillsList: cat.skillsList.filter((s) => s.toLowerCase() !== target),
    }));
    onChange(updated);
  };

  const handleToggleSkill = (skillName: string) => {
    if (isSkillAdded(skillName)) {
      handleRemoveSkill(skillName);
    } else {
      handleAddSkill(skillName);
    }
  };

  const handleAddPreset = (preset: typeof PRESET_STACKS[0]) => {
    let updated = [...skillCategories];
    if (updated.length === 0) {
      updated.push({
        id: `skill-${Date.now()}`,
        categoryName: preset.targetCategoryName,
        skillsList: [],
        description: 'Core production stack and engineering proficiencies',
      });
    }

    const targetCat = updated.find((c) => c.id === selectedTargetCatId) || updated[0];

    const currentLower = new Set(targetCat.skillsList.map((s) => s.toLowerCase()));
    const toAdd = preset.skills.filter((s) => !currentLower.has(s.toLowerCase()));

    const newCategories = updated.map((cat) =>
      cat.id === targetCat.id
        ? { ...cat, skillsList: [...cat.skillsList, ...toAdd] }
        : cat
    );

    onChange(newCategories);
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to remove all skills from all categories?')) {
      onChange(skillCategories.map((c) => ({ ...c, skillsList: [] })));
    }
  };

  const handleCopyAll = () => {
    const text = allCurrentSkills.map((s) => s.skill).join(', ');
    navigator.clipboard.writeText(text);
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 2000);
  };

  // Autocomplete dropdown matching
  const matchingSuggestions = inputValue.trim()
    ? TECH_SUGGESTIONS.filter((s) =>
        s.name.toLowerCase().includes(inputValue.toLowerCase()) && !isSkillAdded(s.name)
      ).slice(0, 8)
    : [];

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (matchingSuggestions.length > 0) {
        setHighlightedIndex((prev) =>
          prev < matchingSuggestions.length - 1 ? prev + 1 : 0
        );
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (matchingSuggestions.length > 0) {
        setHighlightedIndex((prev) =>
          prev > 0 ? prev - 1 : matchingSuggestions.length - 1
        );
      }
    } else if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      if (highlightedIndex >= 0 && matchingSuggestions[highlightedIndex]) {
        handleAddSkill(matchingSuggestions[highlightedIndex].name);
      } else if (inputValue.trim()) {
        handleAddSkill(inputValue);
      }
    } else if (e.key === 'Backspace' && !inputValue && allCurrentSkills.length > 0) {
      // Remove last skill tag
      const lastSkill = allCurrentSkills[allCurrentSkills.length - 1];
      handleRemoveSkill(lastSkill.skill);
    } else if (e.key === 'Escape') {
      setIsDropdownOpen(false);
    }
  };

  // Filtered suggestions for the quick-add chips area
  const filteredSuggestions = TECH_SUGGESTIONS.filter((item) => {
    const matchesFilter = activeFilter === 'all' || item.category === activeFilter;
    const matchesSearch =
      !searchQuery.trim() ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="bg-white rounded-xl border border-indigo-100 shadow-xs p-5 sm:p-6 space-y-5 relative">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-indigo-50 text-indigo-600 rounded-lg">
              <Tag className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-slate-900">
              Interactive Tech Stack & Skills Tag Manager
            </h3>
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200/60">
              {allCurrentSkills.length} Total {allCurrentSkills.length === 1 ? 'Skill' : 'Skills'}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Type keyword, hit Enter or comma, or click suggestion chips to instantly toggle tech stack keywords for ATS indexing.
          </p>
        </div>

        {/* Action Buttons: Copy All / Clear All */}
        {allCurrentSkills.length > 0 && (
          <div className="flex items-center gap-1.5 self-start sm:self-center">
            <button
              type="button"
              onClick={handleCopyAll}
              className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-slate-600 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-md transition-colors cursor-pointer"
              title="Copy all skills as comma-separated text"
            >
              {copiedNotification ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy List</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleClearAll}
              className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-slate-400 hover:text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-200 rounded-md transition-colors cursor-pointer"
              title="Clear all active skills"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear</span>
            </button>
          </div>
        )}
      </div>

      {/* Target Domain Selector (if user has multiple skill categories) */}
      {skillCategories.length > 1 && (
        <div className="flex flex-wrap items-center gap-2 p-2.5 bg-slate-50 rounded-lg border border-slate-200 text-xs">
          <span className="font-semibold text-slate-700 flex items-center gap-1">
            <Layers className="w-3.5 h-3.5 text-indigo-600" />
            Add New Skills To Domain:
          </span>
          <select
            value={selectedTargetCatId}
            onChange={(e) => setSelectedTargetCatId(e.target.value)}
            className="px-2.5 py-1 bg-white border border-slate-300 rounded-md font-medium text-slate-800 focus:outline-hidden focus:ring-1 focus:ring-indigo-500 cursor-pointer text-xs"
          >
            {skillCategories.map((cat, idx) => (
              <option key={cat.id} value={cat.id}>
                #{idx + 1}: {cat.categoryName} ({cat.skillsList.length} skills)
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Main Tag-Based Interactive Input Field */}
      <div className="relative">
        <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <span>Tech Keywords & Tags</span>
            <span className="text-[11px] font-normal text-slate-400">
              (Backspace to delete last tag)
            </span>
          </span>
          <span className="text-[11px] text-indigo-600 font-medium hidden sm:inline">
            Press Enter ↵ or comma , to add
          </span>
        </label>

        {/* Tag Container with Input */}
        <div
          onClick={() => inputRef.current?.focus()}
          className="min-h-14 p-2.5 bg-slate-50/70 hover:bg-slate-50 border-2 border-slate-200 focus-within:border-indigo-500 focus-within:bg-white rounded-xl transition-all flex flex-wrap items-center gap-1.5 cursor-text shadow-2xs"
        >
          {allCurrentSkills.map(({ skill, categoryId, categoryName }, idx) => (
            <span
              key={`${skill}-${idx}`}
              className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold bg-indigo-50 text-indigo-900 border border-indigo-200/80 rounded-lg group animate-in fade-in zoom-in-95 duration-150"
            >
              <span className="truncate max-w-[180px]">{skill}</span>
              {skillCategories.length > 1 && (
                <span className="text-[10px] text-indigo-400 font-normal hidden sm:inline">
                  • {categoryName.split(' ')[0]}
                </span>
              )}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveSkill(skill);
                }}
                className="text-indigo-400 hover:text-rose-600 hover:bg-rose-50 rounded p-0.5 transition-colors cursor-pointer"
                title={`Remove ${skill}`}
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}

          {/* Inline Typing Input */}
          <div className="flex-1 min-w-[200px] flex items-center gap-2">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
                setIsDropdownOpen(true);
                setHighlightedIndex(-1);
              }}
              onFocus={() => {
                if (inputValue.trim()) setIsDropdownOpen(true);
              }}
              onKeyDown={handleKeyDown}
              placeholder={
                allCurrentSkills.length === 0
                  ? "Type skill (e.g. PHP, Laravel, MySQL, Docker) & press Enter..."
                  : "Type keyword and press Enter..."
              }
              className="w-full text-xs sm:text-sm py-1 px-1 bg-transparent border-none focus:outline-hidden text-slate-800 placeholder:text-slate-400 font-medium"
            />
            {inputValue.trim() && (
              <button
                type="button"
                onClick={() => handleAddSkill(inputValue)}
                className="shrink-0 px-2.5 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
              >
                Add
              </button>
            )}
          </div>
        </div>

        {/* Live Auto-Complete Suggestions Dropdown */}
        {isDropdownOpen && inputValue.trim().length > 0 && (
          <div
            ref={dropdownRef}
            className="absolute left-0 right-0 top-full mt-1.5 z-30 bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150"
          >
            <div className="p-2 bg-slate-50 border-b border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-medium">
              <span>Matching Tech Suggestions</span>
              <span>Use ↑↓ arrows and Enter</span>
            </div>

            <div className="max-h-56 overflow-y-auto p-1.5 space-y-0.5">
              {matchingSuggestions.map((sug, idx) => (
                <button
                  key={sug.name}
                  type="button"
                  onClick={() => handleAddSkill(sug.name)}
                  className={`w-full flex items-center justify-between px-3 py-2 text-xs rounded-lg text-left transition-colors cursor-pointer ${
                    highlightedIndex === idx
                      ? 'bg-indigo-600 text-white font-semibold'
                      : 'hover:bg-indigo-50 text-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Plus className={`w-3.5 h-3.5 ${highlightedIndex === idx ? 'text-white' : 'text-indigo-600'}`} />
                    <span>{sug.name}</span>
                  </div>
                  <span
                    className={`text-[10px] capitalize px-2 py-0.5 rounded-full ${
                      highlightedIndex === idx
                        ? 'bg-indigo-700 text-indigo-100'
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {sug.category}
                  </span>
                </button>
              ))}

              {/* Option to add custom skill verbatim */}
              <button
                type="button"
                onClick={() => handleAddSkill(inputValue)}
                className="w-full flex items-center gap-2 px-3 py-2 text-xs text-indigo-700 hover:bg-indigo-50 rounded-lg text-left font-semibold border-t border-slate-100 mt-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5 text-indigo-600" />
                <span>Add custom keyword: &quot;{inputValue.trim()}&quot;</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Quick Stack Bundles (1-Click Batch Add) */}
      <div className="p-3 bg-linear-to-r from-indigo-50/60 via-purple-50/30 to-blue-50/60 rounded-xl border border-indigo-100/80">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-indigo-950 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            Quick Stack Presets (1-Click Fill)
          </span>
          <span className="text-[10px] text-indigo-600 font-medium hidden sm:inline">
            Appends missing skills instantly
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {PRESET_STACKS.map((stack) => (
            <button
              key={stack.name}
              type="button"
              onClick={() => handleAddPreset(stack)}
              className="text-xs px-2.5 py-1 bg-white hover:bg-indigo-600 hover:text-white text-slate-700 font-medium rounded-lg border border-indigo-200/80 shadow-2xs transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>{stack.name}</span>
              <span className="text-[10px] opacity-75">({stack.skills.length} techs)</span>
            </button>
          ))}
        </div>
      </div>

      {/* Suggested Keywords by Tech Category */}
      <div className="space-y-3 pt-1">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
            <Boxes className="w-4 h-4 text-indigo-600" />
            <span>Common Tech Stack Suggestions</span>
            <span className="text-slate-400 font-normal text-[11px]">
              (Click to toggle add/remove)
            </span>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none text-[11px]">
            <button
              type="button"
              onClick={() => setActiveFilter('all')}
              className={`px-2 py-0.5 rounded-md font-medium transition-colors cursor-pointer ${
                activeFilter === 'all'
                  ? 'bg-slate-900 text-white font-semibold'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              All
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter('languages')}
              className={`px-2 py-0.5 rounded-md font-medium transition-colors cursor-pointer ${
                activeFilter === 'languages'
                  ? 'bg-slate-900 text-white font-semibold'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Languages
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter('frameworks')}
              className={`px-2 py-0.5 rounded-md font-medium transition-colors cursor-pointer ${
                activeFilter === 'frameworks'
                  ? 'bg-slate-900 text-white font-semibold'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Frameworks
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter('databases')}
              className={`px-2 py-0.5 rounded-md font-medium transition-colors cursor-pointer ${
                activeFilter === 'databases'
                  ? 'bg-slate-900 text-white font-semibold'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Databases
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter('devops')}
              className={`px-2 py-0.5 rounded-md font-medium transition-colors cursor-pointer ${
                activeFilter === 'devops'
                  ? 'bg-slate-900 text-white font-semibold'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              DevOps
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter('architecture')}
              className={`px-2 py-0.5 rounded-md font-medium transition-colors cursor-pointer ${
                activeFilter === 'architecture'
                  ? 'bg-slate-900 text-white font-semibold'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Architecture
            </button>
          </div>
        </div>

        {/* Suggestion Chips Grid */}
        <div className="flex flex-wrap gap-1.5 max-h-48 overflow-y-auto p-1">
          {filteredSuggestions.map((item) => {
            const added = isSkillAdded(item.name);
            return (
              <button
                key={item.name}
                type="button"
                onClick={() => handleToggleSkill(item.name)}
                className={`text-xs px-2.5 py-1 rounded-lg border font-medium transition-all flex items-center gap-1.5 cursor-pointer select-none ${
                  added
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-300 shadow-2xs hover:bg-emerald-100'
                    : 'bg-white hover:bg-indigo-50 text-slate-700 hover:text-indigo-700 border-slate-200 hover:border-indigo-300 shadow-2xs'
                }`}
                title={added ? `Click to remove ${item.name}` : `Click to add ${item.name}`}
              >
                {added ? (
                  <Check className="w-3 h-3 text-emerald-600" />
                ) : (
                  <Plus className="w-3 h-3 text-slate-400 group-hover:text-indigo-600" />
                )}
                <span>{item.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
