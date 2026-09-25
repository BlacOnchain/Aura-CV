import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bot, 
  Target, 
  FileText, 
  Download, 
  Database, 
  FolderOpen,
  User,
  X
} from 'lucide-react';
import { ToolView } from '../../App';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSelectTool: (tool: ToolView) => void;
}

export const MobileToolSheet: React.FC<Props> = ({ isOpen, onClose, onSelectTool }) => {
  const tools: { id: ToolView; icon: any; label: string; desc: string }[] = [
    { id: 'my-resumes', icon: FolderOpen, label: 'Resume Library', desc: 'Switch, clone, or create new resumes' },
    { id: 'ai-tools', icon: Bot, label: 'AI Writing Suite', desc: 'Google XYZ bullet & summary polish' },
    { id: 'ats-scanner', icon: Target, label: 'ATS Job Scanner', desc: 'Recruiter algorithm keyword audit' },
    { id: 'cover-letter', icon: FileText, label: 'Cover Letter Architect', desc: 'Generate tailored executive cover letters' },
    { id: 'import', icon: Download, label: 'Import / LinkedIn', desc: 'PDF upload & LinkedIn profile sync' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-zinc-950/60 backdrop-blur-xs z-[60]"
          />
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 240 }}
            className="fixed bottom-0 left-0 right-0 bg-white rounded-t-[32px] z-[70] p-5 sm:p-6 pb-12 shadow-2xl max-h-[85vh] overflow-y-auto"
          >
            {/* Centered Grab Handle */}
            <div className="w-12 h-1.5 bg-zinc-300 rounded-full mx-auto mb-6" />
            
            {/* Header */}
            <div className="flex items-center justify-between mb-5 pb-3 border-b border-zinc-100">
              <div>
                <h3 className="text-lg font-display font-bold text-zinc-900 leading-tight">Career Engineering Tools</h3>
                <p className="text-xs text-zinc-500">Select a tool to launch</p>
              </div>
              <button 
                onClick={onClose} 
                className="min-h-[44px] min-w-[44px] flex items-center justify-center bg-zinc-100 hover:bg-zinc-200 active:scale-95 rounded-full text-zinc-600 transition-all cursor-pointer"
                aria-label="Close tools menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Tool List with Large Touch Targets (min-h-[56px]) */}
            <div className="grid grid-cols-1 gap-2.5">
              {tools.map((tool) => (
                <button
                  key={tool.id}
                  onClick={() => {
                    onSelectTool(tool.id);
                    onClose();
                  }}
                  className="min-h-[56px] flex items-center gap-3.5 p-3.5 rounded-2xl bg-zinc-50 hover:bg-zinc-100 active:scale-[0.98] border border-zinc-100 transition-all text-left cursor-pointer"
                >
                  <div className="w-11 h-11 rounded-xl bg-white border border-zinc-200/80 flex items-center justify-center shrink-0 shadow-xs text-zinc-900">
                    <tool.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-zinc-900 text-sm leading-tight">{tool.label}</h4>
                    <p className="text-xs text-zinc-500 font-normal truncate mt-0.5">{tool.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
