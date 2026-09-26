import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../Auth/AuthContext';
import { BrandLogo } from '../Brand/BrandLogo';
import { SavedResume, ResumeData } from '../../types/resume';
import {
  Plus,
  Copy,
  Trash2,
  Edit3,
  Calendar,
  FileText,
  Search,
  Upload,
  ArrowRight,
  Sparkles,
  Linkedin,
  Grid,
  LogOut
} from 'lucide-react';
import { 
  BLANK_RESUME, 
  SOFTWARE_ENGINEER_RESUME, 
  PRODUCT_MANAGER_RESUME, 
  MARKETING_MANAGER_RESUME 
} from '../../data/defaultResumes';

interface Props {
  resumes: SavedResume[];
  activeResumeId: string;
  onSelectResume: (id: string) => void;
  onEditResume: (id: string) => void;
  onCreateResume: (name: string, templateData?: ResumeData) => void;
  onDuplicateResume: (id: string) => void;
  onDeleteResume: (id: string) => void;
  onRenameResume: (id: string, newName: string) => void;
  onOpenCoverLetter: () => void;
  onOpenImportModal: () => void;
}

export const ResumesDashboard: React.FC<Props> = ({
  resumes,
  onEditResume,
  onCreateResume,
  onDuplicateResume,
  onDeleteResume,
  onRenameResume,
  onOpenCoverLetter,
  onOpenImportModal,
}) => {
  const { logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingResumeId, setEditingResumeId] = useState<string | null>(null);
  const [tempName, setTempName] = useState('');

  const filteredResumes = resumes.filter((r) => {
    const q = searchQuery.toLowerCase();
    return (
      r.name.toLowerCase().includes(q) ||
      (r.targetRole && r.targetRole.toLowerCase().includes(q))
    );
  });

  const handleStartRename = (resume: SavedResume) => {
    setEditingResumeId(resume.id);
    setTempName(resume.name);
  };

  const handleSaveRename = (id: string) => {
    if (tempName.trim()) onRenameResume(id, tempName.trim());
    setEditingResumeId(null);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-body text-zinc-900">
      {/* Editorial Header */}
      <header className="h-20 bg-white border-b border-zinc-100 sticky top-0 z-40 px-6 lg:px-12 flex items-center justify-between">
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-3">
            <BrandLogo size="md" />
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <button className="text-[10px] font-bold uppercase tracking-widest text-zinc-900 border-b border-zinc-900 pb-1 cursor-pointer transition-colors">Resumes</button>
            <button onClick={onOpenCoverLetter} className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 hover:text-zinc-900 cursor-pointer transition-colors">Narratives</button>
            <button onClick={onOpenImportModal} className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 hover:text-zinc-900 cursor-pointer transition-colors">Import PDF / Data</button>
          </nav>
        </div>

        <div className="flex items-center gap-6">
           <div className="relative hidden lg:block">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-300" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search sessions..."
                className="w-48 pl-9 pr-4 py-2 bg-zinc-50 border border-zinc-100 rounded-lg text-[10px] font-bold uppercase tracking-widest focus:outline-none focus:ring-1 focus:ring-zinc-900/5 transition-all placeholder:text-zinc-300"
              />
           </div>
           <button
            onClick={() => setIsCreateModalOpen(true)}
            className="min-h-[44px] px-5 sm:px-6 py-2.5 bg-zinc-950 text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-zinc-800 transition-all active:scale-95 shadow-md shadow-zinc-200 cursor-pointer flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>New Session</span>
          </button>

          <button
            onClick={logout}
            title="Sign Out"
            className="min-h-[44px] w-11 h-11 bg-rose-50 hover:bg-rose-100 text-rose-500 rounded-xl flex items-center justify-center transition-all cursor-pointer active:scale-95 border border-rose-100/50"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 lg:px-12 py-16 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-zinc-100 pb-12">
           <div className="space-y-2">
              <div className="text-zinc-400 text-[10px] font-bold uppercase tracking-[0.4em]">Personal Collection</div>
              <h1 className="text-5xl lg:text-7xl font-display text-zinc-900 font-bold italic">Career Studio.</h1>
           </div>
        </div>

        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
           {/* New Resume trigger */}
           <motion.button
            whileHover={{ y: -5 }}
            onClick={() => setIsCreateModalOpen(true)}
            className="group relative min-h-[380px] rounded-[32px] border-2 border-dashed border-zinc-100 bg-zinc-50/50 hover:bg-white hover:border-zinc-200 transition-all flex flex-col items-center justify-center text-center p-8 cursor-pointer"
          >
            <div className="w-12 h-12 rounded-xl bg-white border border-zinc-100 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-zinc-900 transition-all shadow-sm">
              <Plus className="w-6 h-6 text-zinc-400 group-hover:text-white" />
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-display text-zinc-900 font-bold italic">Initialize New</h3>
              <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">From technical baseline</p>
            </div>
          </motion.button>

          {/* List items */}
          <AnimatePresence mode="popLayout">
            {filteredResumes.map((resume, idx) => {
              const accentColor = resume.data.settings.accentColor || '#18181b';
              return (
                <motion.div
                  key={resume.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  whileHover={{ y: -5 }}
                  className="group relative h-[380px] rounded-[32px] bg-white border border-zinc-100 overflow-hidden flex flex-col shadow-sm hover:shadow-xl hover:shadow-zinc-200/50 transition-all"
                >
                  <div 
                    onClick={() => onEditResume(resume.id)}
                    className="flex-1 bg-zinc-50/30 p-8 flex items-center justify-center relative cursor-pointer group-hover:bg-white transition-colors"
                  >
                    <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none" 
                         style={{ background: `radial-gradient(circle at center, ${accentColor} 0%, transparent 70%)` }} />
                    
                    {/* Miniature Preview Mockup */}
                    <div className="w-28 h-36 bg-white border border-zinc-100 rounded shadow-xl relative overflow-hidden flex flex-col gap-1.5 p-3 group-hover:scale-110 transition-transform duration-500">
                      <div className="h-1.5 w-8 rounded-full" style={{ backgroundColor: accentColor }} />
                      <div className="space-y-1">
                        <div className="h-0.5 w-full bg-zinc-50 rounded-full" />
                        <div className="h-0.5 w-4/5 bg-zinc-50 rounded-full" />
                      </div>
                      <div className="mt-3 space-y-1.5">
                        <div className="h-1 w-12 bg-zinc-100 rounded-full" />
                        <div className="h-0.5 w-full bg-zinc-50 rounded-full" />
                        <div className="h-0.5 w-5/6 bg-zinc-50 rounded-full" />
                      </div>
                    </div>

                    <div className="absolute inset-0 bg-white/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                       <div className="w-10 h-10 rounded-full bg-zinc-900 text-white flex items-center justify-center shadow-lg">
                          <ArrowRight className="w-5 h-5" />
                       </div>
                    </div>
                  </div>

                  <div className="p-6 space-y-4 border-t border-zinc-50">
                    <div className="flex items-center justify-between">
                      <div className="min-w-0 flex-1">
                        {editingResumeId === resume.id ? (
                          <input
                            autoFocus
                            value={tempName}
                            onChange={(e) => setTempName(e.target.value)}
                            onBlur={() => handleSaveRename(resume.id)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSaveRename(resume.id)}
                            className="w-full bg-zinc-50 border border-zinc-200 rounded px-2 py-1 text-xs font-bold text-zinc-900 focus:outline-none"
                          />
                        ) : (
                          <h3 
                            onClick={() => onEditResume(resume.id)}
                            className="text-sm font-bold text-zinc-900 truncate cursor-pointer hover:underline underline-offset-4 decoration-zinc-300 transition-all uppercase tracking-widest"
                          >
                            {resume.name}
                          </h3>
                        )}
                        <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-[0.2em] mt-1 truncate">
                          {resume.targetRole || 'Professional session'}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-zinc-50">
                       <div className="flex items-center gap-2 text-[8px] font-bold text-zinc-300 uppercase tracking-widest">
                          <Calendar className="w-2.5 h-2.5" />
                          <span>{new Date(resume.lastModified).toLocaleDateString()}</span>
                       </div>
                       <div className="flex items-center gap-1">
                          <button 
                            onClick={() => handleStartRename(resume)} 
                            className="min-h-[36px] min-w-[36px] flex items-center justify-center rounded-lg text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 active:scale-95 transition-all cursor-pointer"
                            title="Rename"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button 
                            onClick={() => onDuplicateResume(resume.id)} 
                            className="min-h-[36px] min-w-[36px] flex items-center justify-center rounded-lg text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 active:scale-95 transition-all cursor-pointer"
                            title="Duplicate"
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </button>
                          <button 
                            onClick={() => onDeleteResume(resume.id)} 
                            className="min-h-[36px] min-w-[36px] flex items-center justify-center rounded-lg text-zinc-400 hover:text-rose-600 hover:bg-rose-50 active:scale-95 transition-all cursor-pointer"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                       </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </main>

      {/* Create Modal */}
      <AnimatePresence>
        {isCreateModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsCreateModalOpen(false)}
              className="absolute inset-0 bg-zinc-950/60 backdrop-blur-xs"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.98, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.98, y: 10 }}
              className="relative w-full max-w-4xl bg-white border border-zinc-200 rounded-[28px] sm:rounded-[40px] shadow-2xl p-6 sm:p-10 md:p-12 overflow-y-auto max-h-[90vh]"
            >
              <div className="flex justify-between items-start mb-8 sm:mb-12">
                 <div className="space-y-1.5">
                    <div className="text-zinc-400 text-xs font-bold uppercase tracking-wider">Baseline Selection</div>
                    <h2 className="text-3xl sm:text-5xl font-display text-zinc-900 font-bold italic">Initialize Session.</h2>
                 </div>
                 <button 
                  onClick={() => setIsCreateModalOpen(false)} 
                  className="min-w-[44px] min-h-[44px] rounded-full hover:bg-zinc-100 flex items-center justify-center text-zinc-400 hover:text-zinc-900 transition-all cursor-pointer text-lg font-bold"
                  aria-label="Close modal"
                 >
                   ✕
                 </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {[
                  { id: 'blank', title: 'Absolute Zero', desc: 'A minimal technical slate.', resume: BLANK_RESUME, icon: Plus },
                  { id: 'swe', title: 'Technical Lead', desc: 'Precision architecture profiles.', resume: SOFTWARE_ENGINEER_RESUME, icon: FileText },
                  { id: 'pm', title: 'Strategy Head', desc: 'Focus on narrative impact.', resume: PRODUCT_MANAGER_RESUME, icon: Sparkles },
                  { id: 'mkt', title: 'Creative Director', desc: 'Editorial visual balance.', resume: MARKETING_MANAGER_RESUME, icon: Grid }
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => {
                      onCreateResume(`${opt.title} Profile`, opt.resume);
                      setIsCreateModalOpen(false);
                    }}
                    className="min-h-[72px] p-5 sm:p-6 rounded-2xl bg-zinc-50 border border-zinc-200/80 hover:border-zinc-950 hover:bg-white text-left transition-all active:scale-[0.98] group flex gap-4 sm:gap-5 items-center cursor-pointer shadow-xs"
                  >
                    <div className="w-12 h-12 rounded-xl bg-white border border-zinc-200 flex items-center justify-center shrink-0 group-hover:bg-zinc-950 transition-all">
                       <opt.icon className="w-6 h-6 text-zinc-500 group-hover:text-white" />
                    </div>
                    <div>
                      <h4 className="text-base font-display text-zinc-900 font-bold uppercase tracking-wider">{opt.title}</h4>
                      <p className="text-xs text-zinc-500 font-medium">{opt.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
