import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  Target, 
  Palette, 
  CheckCircle2, 
  Zap, 
  ArrowRight, 
  Check, 
  Wand2,
  RefreshCw,
  SlidersHorizontal,
  ChevronRight
} from 'lucide-react';

interface Props {
  onStartStudio: () => void;
}

export const InteractiveMotionPreview: React.FC<Props> = ({ onStartStudio }) => {
  const [activeTab, setActiveTab] = useState<'bullet' | 'ats' | 'design'>('bullet');

  // Bullet Engine Interactive State
  const [bulletLevel, setBulletLevel] = useState<number>(0);
  const bulletVariations = [
    {
      label: 'Standard Duty',
      text: 'Responsible for managing the team software deployments and reviewing pull requests.',
      impact: '62%',
      badge: 'Basic Task',
      color: 'bg-zinc-100 text-zinc-600',
    },
    {
      label: 'Quantified Action',
      text: 'Led a cross-functional engineering team of 8 to streamline CI/CD deployment pipelines.',
      impact: '84%',
      badge: 'Quantified',
      color: 'bg-blue-50 text-blue-700 border border-blue-200',
    },
    {
      label: 'Google XYZ Formula',
      text: 'Architected automated CI/CD pipeline delivering 140+ monthly releases, reducing deployment cycle time by 48% across 12 microservices.',
      impact: '98%',
      badge: 'Executive XYZ',
      color: 'bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold',
    },
  ];

  // ATS Match Interactive State
  const [selectedRole, setSelectedRole] = useState<'swe' | 'pm' | 'lead'>('swe');
  const rolesData = {
    swe: {
      title: 'Senior Software Engineer',
      matchScore: 96,
      matchedKeywords: ['TypeScript', 'React 19', 'CI/CD', 'System Design', 'Microservices'],
      missingKeywords: ['GraphQL'],
    },
    pm: {
      title: 'Technical Product Manager',
      matchScore: 89,
      matchedKeywords: ['Roadmapping', 'Agile/Scrum', 'Data Analytics', 'A/B Testing'],
      missingKeywords: ['SQL Queries', 'PRD Specs'],
    },
    lead: {
      title: 'Engineering Director',
      matchScore: 94,
      matchedKeywords: ['Team Leadership', 'Budgeting', 'Architecture', 'Okrs', 'Mentorship'],
      missingKeywords: ['P&L Management'],
    },
  };

  // Design Theme Interactive State
  const [activeColor, setActiveColor] = useState<string>('#059669');
  const palettes = [
    { name: 'Emerald Executive', hex: '#059669' },
    { name: 'Corporate Indigo', hex: '#4f46e5' },
    { name: 'Obsidian Modern', hex: '#18181b' },
    { name: 'Warm Amber', hex: '#d97706' },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto bg-white rounded-3xl border border-zinc-200/90 shadow-xl overflow-hidden text-zinc-900">
      {/* Interactive Header Bar */}
      <div className="bg-zinc-950 text-white px-5 sm:px-8 py-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-zinc-800">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-zinc-800 border border-zinc-700/80 flex items-center justify-center shrink-0">
            <Sparkles className="w-4 h-4 text-zinc-200" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-display font-bold text-base sm:text-lg tracking-tight text-white">
                Interactive Studio Playground
              </h3>
              <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-zinc-800 text-zinc-300 border border-zinc-700 uppercase tracking-wider">
                Live Demo
              </span>
            </div>
            <p className="text-xs text-zinc-400">
              Interactive preview of formula rewriting, ATS skill scoring, and theme palettes
            </p>
          </div>
        </div>

        {/* Interactive Mode Pills */}
        <div className="flex items-center p-1 bg-zinc-900 rounded-xl border border-zinc-800 w-full sm:w-auto overflow-x-auto">
          {[
            { id: 'bullet', label: 'XYZ Bullet Rewriter', icon: Wand2 },
            { id: 'ats', label: 'ATS Skill Matcher', icon: Target },
            { id: 'design', label: 'Theme Designer', icon: Palette },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-white text-zinc-950 shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Interactive Motion Arena */}
      <div className="p-6 sm:p-10 bg-gradient-to-b from-zinc-50/60 to-white min-h-[360px] flex flex-col justify-center">
        <AnimatePresence mode="wait">
          {/* TAB 1: XYZ BULLET REWRITER */}
          {activeTab === 'bullet' && (
            <motion.div
              key="bullet"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <span className="text-[11px] font-mono font-bold text-zinc-500 uppercase tracking-wider">
                    Google XYZ Formula
                  </span>
                  <h4 className="text-xl sm:text-2xl font-display font-bold text-zinc-900 mt-0.5">
                    Transform Tasks Into Measurable Results
                  </h4>
                </div>

                {/* Level Switcher */}
                <div className="flex items-center gap-1 bg-zinc-100 p-1 rounded-xl border border-zinc-200">
                  {bulletVariations.map((v, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setBulletLevel(idx)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                        bulletLevel === idx
                          ? 'bg-zinc-950 text-white shadow-xs'
                          : 'text-zinc-600 hover:text-zinc-900'
                      }`}
                    >
                      Step {idx + 1}
                    </button>
                  ))}
                </div>
              </div>

              {/* Animated Interactive Card */}
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-zinc-200 shadow-sm relative overflow-hidden space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-semibold text-zinc-500">
                    <Wand2 className="w-3.5 h-3.5 text-zinc-700" />
                    <span>Formula Step {bulletLevel + 1}</span>
                  </div>

                  <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-zinc-100 text-zinc-800 border border-zinc-200">
                    {bulletVariations[bulletLevel].badge}
                  </span>
                </div>

                {/* Animated Bullet Text Box */}
                <motion.div
                  key={bulletLevel}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="p-4 sm:p-5 rounded-xl bg-zinc-50 border border-zinc-200 text-sm sm:text-base text-zinc-900 font-medium leading-relaxed font-body"
                >
                  <span className="text-zinc-900 font-bold mr-2">•</span>
                  {bulletVariations[bulletLevel].text}
                </motion.div>

                {/* Impact Meter */}
                <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-zinc-100">
                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <span className="text-xs font-semibold text-zinc-500">Recruiter Score:</span>
                    <div className="w-36 bg-zinc-100 h-2 rounded-full overflow-hidden border border-zinc-200">
                      <motion.div
                        className="bg-zinc-900 h-full rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: bulletVariations[bulletLevel].impact }}
                        transition={{ duration: 0.4 }}
                      />
                    </div>
                    <span className="text-xs font-bold text-zinc-900">
                      {bulletVariations[bulletLevel].impact}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setBulletLevel((prev) => (prev + 1) % bulletVariations.length)}
                    className="w-full sm:w-auto px-5 py-2.5 bg-zinc-950 hover:bg-zinc-800 text-white text-xs font-semibold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs active:scale-95"
                  >
                    <Wand2 className="w-3.5 h-3.5 text-zinc-300" />
                    <span>Advance Formula Step</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 2: ATS MATCHER SIMULATOR */}
          {activeTab === 'ats' && (
            <motion.div
              key="ats"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <span className="text-[11px] font-mono font-bold text-zinc-500 uppercase tracking-wider">
                    Parser Audit Engine
                  </span>
                  <h4 className="text-xl sm:text-2xl font-display font-bold text-zinc-900 mt-0.5">
                    Recruiter Keyword Match Index
                  </h4>
                </div>

                {/* Role Toggles */}
                <div className="flex items-center gap-1.5 bg-zinc-100 p-1 rounded-xl border border-zinc-200">
                  {(['swe', 'pm', 'lead'] as const).map((role) => (
                    <button
                      key={role}
                      type="button"
                      onClick={() => setSelectedRole(role)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                        selectedRole === role
                          ? 'bg-zinc-950 text-white shadow-xs'
                          : 'text-zinc-600 hover:text-zinc-900'
                      }`}
                    >
                      {role.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Match Card */}
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-zinc-200 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                <div className="md:col-span-4 flex flex-col items-center justify-center p-6 bg-zinc-50 rounded-xl border border-zinc-200 text-center space-y-2">
                  <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Match Index</span>
                  <motion.div
                    key={selectedRole}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-4xl sm:text-5xl font-display font-bold text-zinc-900 tracking-tight"
                  >
                    {rolesData[selectedRole].matchScore}%
                  </motion.div>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-zinc-900 text-white">
                    <CheckCircle2 className="w-3 h-3 text-zinc-300" /> High Match
                  </span>
                </div>

                <div className="md:col-span-8 space-y-4">
                  <h5 className="font-bold text-sm text-zinc-900">
                    {rolesData[selectedRole].title} — Skill Coverage
                  </h5>

                  <div>
                    <span className="text-[11px] font-mono font-semibold text-zinc-400 uppercase tracking-wider">Parsed Keywords:</span>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {rolesData[selectedRole].matchedKeywords.map((kw, i) => (
                        <motion.span
                          key={kw}
                          initial={{ opacity: 0, y: 3 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.04 }}
                          className="px-2.5 py-1 rounded-lg text-xs font-medium bg-zinc-100 text-zinc-900 border border-zinc-200 flex items-center gap-1.5"
                        >
                          <Check className="w-3 h-3 text-zinc-700" />
                          {kw}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="text-[11px] font-mono font-semibold text-zinc-400 uppercase tracking-wider">Suggested Skill Gap:</span>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {rolesData[selectedRole].missingKeywords.map((kw) => (
                        <span key={kw} className="px-2.5 py-1 rounded-lg text-xs font-medium bg-zinc-50 text-zinc-600 border border-zinc-200">
                          + Add {kw}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 3: THEME DESIGNER */}
          {activeTab === 'design' && (
            <motion.div
              key="design"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <span className="text-[11px] font-bold text-amber-700 uppercase tracking-wider">
                    Executive Palette Styling
                  </span>
                  <h4 className="text-xl sm:text-2xl font-display font-bold text-zinc-900 mt-0.5">
                    Live Palette & Typography Transformation
                  </h4>
                </div>

                {/* Color Swatches */}
                <div className="flex items-center gap-2">
                  {palettes.map((p) => (
                    <button
                      key={p.hex}
                      type="button"
                      onClick={() => setActiveColor(p.hex)}
                      className={`w-7 h-7 rounded-full border-2 transition-transform cursor-pointer ${
                        activeColor === p.hex ? 'scale-125 border-zinc-900 shadow-md' : 'border-white hover:scale-110'
                      }`}
                      style={{ backgroundColor: p.hex }}
                      title={p.name}
                    />
                  ))}
                </div>
              </div>

              {/* Interactive Mini Document Preview */}
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-zinc-200 shadow-md max-w-xl mx-auto space-y-4 text-xs">
                <div className="pb-3 border-b border-zinc-200" style={{ borderColor: activeColor }}>
                  <h3 className="text-lg font-bold transition-colors" style={{ color: activeColor }}>
                    ALEXANDER WRIGHT
                  </h3>
                  <p className="text-zinc-500 font-medium">Senior Software Architect & Technical Lead</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: activeColor }} />
                    <span className="font-bold text-zinc-900 uppercase tracking-wider text-[10px]">
                      CORE HIGHLIGHTS
                    </span>
                  </div>
                  <p className="text-zinc-600 leading-relaxed font-sans pl-4 border-l-2" style={{ borderColor: activeColor }}>
                    Engineered high-throughput event processing platform serving 2.4M daily requests with 99.99% availability across multi-cloud regions.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Interactive Footer CTA */}
      <div className="bg-zinc-50 p-5 px-6 sm:px-8 border-t border-zinc-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="text-xs font-semibold text-zinc-600">
          Ready to apply these interactive tools to your own resume?
        </span>

        <button
          type="button"
          onClick={onStartStudio}
          className="w-full sm:w-auto px-6 py-3 bg-zinc-950 hover:bg-zinc-800 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-95"
        >
          <span>Launch Full Interactive Studio</span>
          <ArrowRight className="w-4 h-4 text-emerald-400" />
        </button>
      </div>
    </div>
  );
};
