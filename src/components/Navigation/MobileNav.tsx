import React from 'react';
import { 
  FileEdit, 
  Palette, 
  Target, 
  Download, 
  MoreHorizontal 
} from 'lucide-react';
import { FlowTab } from './Navbar';

interface Props {
  activeTab: FlowTab;
  onTabChange: (tab: FlowTab) => void;
  onOpenTools: () => void;
}

export const MobileNav: React.FC<Props> = ({ activeTab, onTabChange, onOpenTools }) => {
  const tabs = [
    { id: 'content', label: 'Content', icon: FileEdit },
    { id: 'design', label: 'Design', icon: Palette },
    { id: 'check', label: 'Check', icon: Target },
    { id: 'download', label: 'Export', icon: Download },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-zinc-200 px-3 py-1.5 pb-safe z-50 flex items-center justify-around shadow-[0_-4px_24px_-6px_rgba(0,0,0,0.08)]">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id as FlowTab)}
            className={`min-h-[48px] min-w-[56px] flex flex-col items-center justify-center gap-1 rounded-xl transition-all cursor-pointer active:scale-95 px-2 py-1 ${
              isActive 
                ? 'text-zinc-950 font-bold' 
                : 'text-zinc-400 hover:text-zinc-700 font-medium'
            }`}
          >
            <div className="relative">
              <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5px]' : 'stroke-[1.8px]'}`} />
              {isActive && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-zinc-950" />
              )}
            </div>
            <span className="text-[10px] uppercase tracking-wider">{tab.label}</span>
          </button>
        );
      })}
      
      <button
        onClick={onOpenTools}
        className="min-h-[48px] min-w-[56px] flex flex-col items-center justify-center gap-1 rounded-xl text-zinc-400 hover:text-zinc-700 font-medium transition-all cursor-pointer active:scale-95 px-2 py-1"
      >
        <MoreHorizontal className="w-5 h-5 stroke-[1.8px]" />
        <span className="text-[10px] uppercase tracking-wider">Tools</span>
      </button>
    </div>
  );
};
