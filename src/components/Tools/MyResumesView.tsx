import React, { useState } from 'react';
import { SavedResume, ResumeData } from '../../types/resume';
import { 
  FolderOpen, 
  Search, 
  Plus, 
  FileText, 
  MoreVertical, 
  Copy, 
  Trash2, 
  Edit3, 
  Clock, 
  ArrowLeft,
  Layout
} from 'lucide-react';

interface Props {
  resumes: SavedResume[];
  activeResumeId: string;
  onSelectResume: (id: string) => void;
  onEditResume: (id: string) => void;
  onCreateResume: (name: string, data?: ResumeData) => void;
  onDuplicateResume: (id: string) => void;
  onDeleteResume: (id: string) => void;
  onRenameResume: (id: string, name: string) => void;
  onBack?: () => void;
}

export const MyResumesView: React.FC<Props> = ({
  resumes,
  activeResumeId,
  onEditResume,
  onCreateResume,
  onDuplicateResume,
  onDeleteResume,
  onRenameResume,
  onBack
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [tempName, setTempName] = useState('');

  const filtered = resumes.filter(r => 
    r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.targetRole.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRename = (id: string) => {
    if (tempName.trim()) {
      onRenameResume(id, tempName.trim());
    }
    setEditingId(null);
  };

  return (
    <div className="flex flex-col h-full bg-transparent">
      {/* Header Banner */}
      <div className="bg-white p-5 rounded-2xl border border-zinc-200 shadow-2xs flex items-center justify-between shrink-0 mb-5">
        <div className="flex items-center gap-3.5">
          {onBack && (
            <button onClick={onBack} className="p-2 hover:bg-zinc-100 rounded-lg transition-colors cursor-pointer text-zinc-700">
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}
          <div className="p-2.5 bg-zinc-50 rounded-xl border border-zinc-200">
            <FolderOpen className="w-5 h-5 text-zinc-800" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-base text-zinc-900 tracking-tight">
                Resume Library
              </h3>
              <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-zinc-100 text-zinc-700 uppercase tracking-wider border border-zinc-200">
                Versions
              </span>
            </div>
            <p className="text-xs text-zinc-500 font-medium">
              Manage and switch between different targeted resume versions
            </p>
          </div>
        </div>
        <button
          onClick={() => onCreateResume('New Resume')}
          className="px-4 py-2 bg-zinc-950 hover:bg-zinc-800 text-white rounded-xl text-xs font-bold shadow-xs transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
        >
          <Plus className="w-4 h-4" />
          New Resume
        </button>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-2xs overflow-y-auto flex-1">
        {/* Search Bar */}
        <div className="max-w-md relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search resumes by name or role..."
            className="w-full pl-11 pr-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-2xl text-sm focus:ring-4 focus:ring-zinc-500/10 focus:border-zinc-400 focus:outline-hidden transition-all"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
          {filtered.map((resume) => {
            const isActive = resume.id === activeResumeId;
            return (
              <div
                key={resume.id}
                className={`group relative bg-white rounded-3xl border-2 transition-all p-5 hover:shadow-xl hover:shadow-slate-200/50 ${
                  isActive ? 'border-zinc-900 ring-4 ring-zinc-500/5' : 'border-slate-100 hover:border-slate-200'
                }`}
              >
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex-1">
                    {editingId === resume.id ? (
                      <div className="flex items-center gap-2">
                        <input
                          autoFocus
                          type="text"
                          value={tempName}
                          onChange={(e) => setTempName(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && handleRename(resume.id)}
                          className="flex-1 px-3 py-1.5 border-2 border-zinc-300 rounded-lg text-sm font-bold outline-none"
                        />
                        <button onClick={() => handleRename(resume.id)} className="text-emerald-600 font-bold text-xs uppercase">Save</button>
                      </div>
                    ) : (
                      <h4 className="font-bold text-slate-900 group-hover:text-zinc-900 transition-colors flex items-center gap-2">
                        {resume.name}
                        {isActive && <span className="px-1.5 py-0.5 rounded-full bg-zinc-900 text-[9px] text-white font-black uppercase">Active</span>}
                      </h4>
                    )}
                    <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                      <Layout className="w-3 h-3" /> {resume.targetRole || 'Not specified'}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => onDuplicateResume(resume.id)}
                      className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-slate-100 rounded-lg transition-all"
                      title="Duplicate"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        setEditingId(resume.id);
                        setTempName(resume.name);
                      }}
                      className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-slate-100 rounded-lg transition-all"
                      title="Rename"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDeleteResume(resume.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-slate-100 rounded-lg transition-all"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-50">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                    <Clock className="w-3 h-3" />
                    Updated {new Date(resume.lastModified).toLocaleDateString()}
                  </div>
                  <button
                    onClick={() => onEditResume(resume.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                      isActive 
                        ? 'bg-slate-100 text-slate-500 cursor-default' 
                        : 'bg-slate-900 text-white hover:bg-slate-800 shadow-md shadow-slate-200'
                    }`}
                  >
                    {isActive ? 'Currently Editing' : 'Open Editor'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="py-20 flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 rounded-full bg-slate-50 flex items-center justify-center mb-4">
              <FolderOpen className="w-10 h-10 text-slate-200" />
            </div>
            <h4 className="text-xl font-bold text-slate-400">No resumes found</h4>
            <p className="text-sm text-slate-400 mt-2">Try a different search or create a new resume from scratch.</p>
          </div>
        )}
      </div>
    </div>
  );
};
