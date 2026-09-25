import React, { useState } from 'react';
import { ResumeData } from '../../types/resume';
import { DESIGN_PALETTES, getPaletteByHex } from '../../utils/theme';
import { isAIQuotaExceeded } from '../../utils/aiClient';
import { useAuth } from '../Auth/AuthContext';
import {
  FileText,
  Edit3,
  Columns,
  Eye,
  Download,
  Palette,
  ShieldCheck,
  Check,
  LogOut
} from 'lucide-react';

export type FlowTab = 'content' | 'design' | 'check' | 'download';

interface Props {
  data: ResumeData;
  activeResumeName?: string;
  activeTab: FlowTab;
  onChangeActiveTab: (tab: FlowTab) => void;
  onBackToDashboard: () => void;
  onRenameResume?: (newName: string) => void;
  onOpenAITools?: () => void;
  onOpenImport?: () => void;
  onSelectPalette?: (hex: string) => void;
  viewMode: 'edit' | 'split' | 'preview';
  onChangeViewMode: (mode: 'edit' | 'split' | 'preview') => void;
  onDownloadPdf: () => void;
  isSaved?: boolean;
}

export const Navbar: React.FC<Props> = ({
  data,
  activeResumeName,
  activeTab,
  onChangeActiveTab,
  onBackToDashboard,
  onRenameResume,
  onSelectPalette,
  viewMode,
  onChangeViewMode,
  onDownloadPdf,
}) => {
  const [isRenaming, setIsRenaming] = useState(false);
  const [tempName, setTempName] = useState(activeResumeName || 'My Resume');
  const [isPalettePickerOpen, setIsPalettePickerOpen] = useState(false);

  const accentColor = data.settings.accentColor || '#18181b';
  const activePalette = getPaletteByHex(accentColor);

  const handleSaveRename = () => {
    if (tempName.trim() && onRenameResume) {
      onRenameResume(tempName.trim());
    }
    setIsRenaming(false);
  };

  const navTabs: { id: FlowTab; label: string; icon: React.ElementType }[] = [
    { id: 'content', label: 'Draft', icon: FileText },
    { id: 'design', label: 'Design', icon: Palette },
    { id: 'check', label: 'Align', icon: ShieldCheck },
    { id: 'download', label: 'Export', icon: Download },
  ];

  return (
    <header className="no-print bg-white border-b border-zinc-100 sticky top-0 z-30 h-16 px-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-6 min-w-0">
          <button
            type="button"
            onClick={onBackToDashboard}
            className="flex items-center gap-3 group/brand cursor-pointer text-left focus:outline-none"
            title="AuraCV Dashboard"
          >
            <div className="w-8 h-8 bg-zinc-900 rounded flex items-center justify-center shadow-lg">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-display font-bold text-zinc-900 italic hidden lg:block">AuraCV Studio</span>
          </button>

          <span className="text-zinc-200 hidden md:inline">/</span>

          {isRenaming ? (
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSaveRename()}
                autoFocus
                className="px-3 py-1 text-[10px] font-bold bg-zinc-50 text-zinc-900 border border-zinc-200 rounded focus:outline-none uppercase tracking-widest"
              />
              <button
                type="button"
                onClick={handleSaveRename}
                className="px-3 py-1 text-[9px] font-bold uppercase tracking-widest bg-zinc-900 text-white rounded hover:bg-zinc-800 transition-colors"
              >
                Save
              </button>
            </div>
          ) : (
            <div className="hidden lg:flex items-center gap-2 group/name min-w-0">
              <span
                onClick={() => setIsRenaming(true)}
                className="font-bold text-[10px] text-zinc-400 truncate cursor-pointer hover:text-zinc-900 transition-colors uppercase tracking-[0.2em]"
                title="Click to rename"
              >
                {activeResumeName || data.title || 'Untitled Session'}
              </span>
              <button
                type="button"
                onClick={() => setIsRenaming(true)}
                className="opacity-0 group-hover/name:opacity-100 text-zinc-300 hover:text-zinc-900 p-0.5 transition-opacity cursor-pointer shrink-0"
              >
                <Edit3 className="w-3 h-3" />
              </button>
              <div className="w-1 h-1 rounded-full bg-zinc-100 ml-2" />
              <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-200 ml-1">Synchronized</span>
            </div>
          )}
        </div>

        <div className="hidden md:flex items-center gap-1 p-1 bg-zinc-50 rounded-lg border border-zinc-100">
          {navTabs.map((tab) => {
            const Icon = tab.icon as React.ComponentType<{ className?: string }>;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onChangeActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-1.5 rounded text-[9px] font-bold uppercase tracking-[0.2em] transition-all cursor-pointer ${
                  isActive
                    ? 'bg-white text-zinc-900 shadow-sm border border-zinc-100'
                    : 'text-zinc-400 hover:text-zinc-900'
                }`}
              >
                <Icon className="w-3 h-3" />
                <span className="hidden xl:inline">{tab.label}</span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsPalettePickerOpen(!isPalettePickerOpen)}
              className="w-8 h-8 rounded border border-zinc-200 flex items-center justify-center hover:bg-zinc-50 transition-colors cursor-pointer"
            >
              <div
                className="w-3.5 h-3.5 rounded-full border border-black/10 shadow-sm"
                style={{ backgroundColor: accentColor }}
              />
            </button>

            {isPalettePickerOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setIsPalettePickerOpen(false)} />
                <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-zinc-100 rounded-xl shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-100">
                  <div className="px-3 py-2 text-[8px] font-bold text-zinc-300 uppercase tracking-[0.3em] border-b border-zinc-50 mb-1 text-center">
                    Studio Accent
                  </div>
                  <div className="grid grid-cols-1 gap-0.5">
                    {DESIGN_PALETTES.map((p) => {
                      const isSelected = p.hex.toLowerCase() === accentColor.toLowerCase();
                      return (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => {
                            if (onSelectPalette) onSelectPalette(p.hex);
                            setIsPalettePickerOpen(false);
                          }}
                          className={`w-full text-left px-3 py-2 rounded text-[9px] font-bold uppercase tracking-widest flex items-center justify-between cursor-pointer transition-colors ${
                            isSelected ? 'bg-zinc-50 text-zinc-900' : 'text-zinc-400 hover:bg-zinc-50 hover:text-zinc-900'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-2.5 h-2.5 rounded-full border border-black/10" style={{ backgroundColor: p.hex }} />
                            <span>{p.name}</span>
                          </div>
                          {isSelected && <Check className="w-3 h-3" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* View mode toggle - accessible on mobile screens */}
          <div className="flex items-center p-1 bg-zinc-100 rounded-xl">
            <button
              type="button"
              onClick={() => onChangeViewMode('edit')}
              className={`min-h-[38px] px-2.5 sm:px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                viewMode === 'edit'
                  ? 'bg-white text-zinc-950 shadow-xs'
                  : 'text-zinc-500 hover:text-zinc-900'
              }`}
              title="Editor View"
            >
              <span className="sm:hidden">Edit</span>
              <span className="hidden sm:inline">Editor</span>
            </button>
            <button
              type="button"
              onClick={() => onChangeViewMode('preview')}
              className={`min-h-[38px] px-2.5 sm:px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                viewMode === 'preview'
                  ? 'bg-white text-zinc-950 shadow-xs'
                  : 'text-zinc-500 hover:text-zinc-900'
              }`}
              title="Preview View"
            >
              <span className="sm:hidden">View</span>
              <span className="hidden sm:inline">Preview</span>
            </button>
            <button
              type="button"
              onClick={() => onChangeViewMode('split')}
              className={`hidden lg:inline-flex min-h-[38px] px-2.5 sm:px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                viewMode === 'split'
                  ? 'bg-white text-zinc-950 shadow-xs'
                  : 'text-zinc-500 hover:text-zinc-900'
              }`}
              title="Split View"
            >
              Split
            </button>
          </div>

          <button
            type="button"
            onClick={onDownloadPdf}
            className="min-h-[40px] inline-flex items-center gap-2 px-3.5 sm:px-5 py-2 text-xs font-bold uppercase tracking-wider text-white bg-zinc-950 hover:bg-zinc-800 rounded-xl transition-all active:scale-95 shadow-md shadow-zinc-200 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Export</span>
          </button>

          <UserProfile />
        </div>
    </header>
  );
};

const UserProfile: React.FC = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  if (!user) return null;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-8 h-8 rounded-full border border-zinc-100 overflow-hidden hover:ring-2 hover:ring-zinc-900/5 transition-all cursor-pointer"
      >
        <img src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`} alt="User" />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-2xl border border-zinc-100 p-4 z-50 animate-in fade-in slide-in-from-top-2">
            <div className="flex items-center gap-3 pb-4 mb-4 border-b border-zinc-50">
              <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 border border-zinc-100">
                <img src={user.avatar || ''} alt="" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold text-zinc-900 truncate uppercase tracking-widest">{user.name}</p>
                <p className="text-[10px] text-zinc-400 truncate uppercase font-bold tracking-widest">{user.email}</p>
              </div>
            </div>
            <button
              onClick={() => { logout(); setIsOpen(false); }}
              className="w-full flex items-center gap-2 px-3 py-2 text-rose-500 hover:bg-rose-50 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-colors cursor-pointer"
            >
              <LogOut className="w-3 h-3" />
              Sign Out
            </button>
          </div>
        </>
      )}
    </div>
  );
};
