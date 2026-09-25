import React, { useState } from 'react';
import { callAI } from '../../utils/aiClient';
import {
  Sparkles,
  Loader2,
  Check,
  RotateCcw,
  ChevronDown,
  TrendingUp,
  Zap,
  Scissors,
  GraduationCap,
  SpellCheck
} from 'lucide-react';

interface Props {
  currentText: string;
  onUpdate: (newText: string) => void;
  roleContext?: string;
  defaultMode?: 'star' | 'academic' | 'metrics' | 'concise' | 'grammar';
  sectionType?: 'experience' | 'education' | 'project';
}

export const AIBulletEnhancer: React.FC<Props> = ({
  currentText,
  onUpdate,
  roleContext,
  defaultMode = 'star',
  sectionType = 'experience',
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [lastOriginal, setLastOriginal] = useState<string | null>(null);
  const [showRevertNotice, setShowRevertNotice] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const enhanceWithMode = async (
    mode: 'star' | 'academic' | 'metrics' | 'concise' | 'grammar'
  ) => {
    if (!currentText.trim() || isLoading) return;

    setIsLoading(true);
    setIsMenuOpen(false);
    setErrorMessage(null);

    const result = await callAI<any>('/api/ai/enhance-bullet', {
      bullet: currentText,
      role: roleContext || 'Software / Tech Professional',
      mode,
      context: sectionType,
    });

    if (result.error) {
      setErrorMessage(result.error);
      setIsLoading(false);
      setTimeout(() => setErrorMessage(null), 4000);
      return;
    }

    if (result.data?.enhanced?.trim()) {
      setLastOriginal(currentText);
      onUpdate(result.data.enhanced.trim());
      setShowRevertNotice(true);
      setTimeout(() => setShowRevertNotice(false), 5000);
    }
    
    setIsLoading(false);
  };

  const handleRevert = () => {
    if (lastOriginal) {
      onUpdate(lastOriginal);
      setLastOriginal(null);
      setShowRevertNotice(false);
    }
  };

  return (
    <div className="relative inline-flex items-center gap-1.5 shrink-0">
      {/* Primary Action Button */}
      <div className="inline-flex rounded-lg shadow-2xs border border-zinc-200 bg-white text-zinc-900 hover:bg-zinc-50 transition-all">
        <button
          type="button"
          onClick={() => enhanceWithMode(defaultMode)}
          disabled={isLoading || !currentText.trim()}
          className="inline-flex items-center gap-1.5 px-2 py-0.5 text-[10px] font-semibold disabled:opacity-40 cursor-pointer rounded-l-lg transition-colors text-zinc-700"
          title={`Polish text style (${defaultMode})`}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-3 h-3 animate-spin text-zinc-500" />
              <span className="hidden sm:inline">Polishing...</span>
            </>
          ) : (
            <>
              <SpellCheck className="w-3 h-3 text-zinc-500" />
              <span>Improve</span>
            </>
          )}
        </button>

        {/* Dropdown Toggle */}
        <button
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          disabled={isLoading || !currentText.trim()}
          className="px-1 text-zinc-500 hover:bg-zinc-100 border-l border-zinc-200 rounded-r-lg disabled:opacity-40 cursor-pointer"
          title="Choose improvement strategy"
        >
          <ChevronDown className="w-3 h-3" />
        </button>
      </div>

      {/* Undo / Revert Button */}
      {lastOriginal && (
        <button
          type="button"
          onClick={handleRevert}
          className="inline-flex items-center gap-1 px-2 py-1 text-[11px] font-medium text-slate-600 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg shadow-2xs transition-colors cursor-pointer"
          title="Revert to original text"
        >
          <RotateCcw className="w-3 h-3 text-slate-500" />
          <span className="hidden md:inline">Undo</span>
        </button>
      )}

      {errorMessage && (
        <span className="text-[10px] text-rose-600 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
          {errorMessage}
        </span>
      )}

      {/* Options Menu Popover */}
      {isMenuOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsMenuOpen(false)}
          />
          <div className="absolute right-0 top-full mt-1.5 w-64 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 text-xs animate-in fade-in zoom-in-95 duration-100">
            <div className="px-3 py-1.5 border-b border-slate-100">
              <span className="font-bold text-[10px] text-slate-400 uppercase tracking-wider block">
                Enhance Goal (Gemini AI)
              </span>
            </div>

            {sectionType === 'education' ? (
              <button
                type="button"
                onClick={() => enhanceWithMode('academic')}
                className="w-full text-left px-3 py-2 hover:bg-indigo-50 flex items-center gap-2 text-slate-700 hover:text-indigo-700 transition-colors"
              >
                <GraduationCap className="w-4 h-4 text-indigo-600 shrink-0" />
                <div>
                  <div className="font-semibold">Academic Rigor & Mastery</div>
                  <div className="text-[10px] text-slate-400">High-impact coursework & labs</div>
                </div>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => enhanceWithMode('star')}
                className="w-full text-left px-3 py-2 hover:bg-indigo-50 flex items-center gap-2 text-slate-700 hover:text-indigo-700 transition-colors"
              >
                <Zap className="w-4 h-4 text-amber-500 shrink-0" />
                <div>
                  <div className="font-semibold">Google X-Y-Z / STAR Impact</div>
                  <div className="text-[10px] text-slate-400">Accomplished [X] by doing [Z]</div>
                </div>
              </button>
            )}

            <button
              type="button"
              onClick={() => enhanceWithMode('metrics')}
              className="w-full text-left px-3 py-2 hover:bg-indigo-50 flex items-center gap-2 text-slate-700 hover:text-indigo-700 transition-colors"
            >
              <TrendingUp className="w-4 h-4 text-emerald-600 shrink-0" />
              <div>
                <div className="font-semibold">Quantify with Metrics</div>
                <div className="text-[10px] text-slate-400">Add percentages, speed & scale</div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => enhanceWithMode('concise')}
              className="w-full text-left px-3 py-2 hover:bg-indigo-50 flex items-center gap-2 text-slate-700 hover:text-indigo-700 transition-colors"
            >
              <Scissors className="w-4 h-4 text-blue-600 shrink-0" />
              <div>
                <div className="font-semibold">Make Concise & Punchy</div>
                <div className="text-[10px] text-slate-400">Trim fluff, maximize signal</div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => enhanceWithMode('grammar')}
              className="w-full text-left px-3 py-2 hover:bg-indigo-50 flex items-center gap-2 text-slate-700 hover:text-indigo-700 transition-colors"
            >
              <SpellCheck className="w-4 h-4 text-purple-600 shrink-0" />
              <div>
                <div className="font-semibold">Active Voice & Tone</div>
                <div className="text-[10px] text-slate-400">Polished corporate language</div>
              </div>
            </button>
          </div>
        </>
      )}
    </div>
  );
};
