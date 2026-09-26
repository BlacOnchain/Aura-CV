import React from 'react';
import { 
  Bot, 
  Sparkles, 
  FileText, 
  Upload, 
  Database, 
  FolderOpen,
  Settings,
  Target,
  User as UserIcon,
  LogOut
} from 'lucide-react';
import { ToolView } from '../../App';
import { APP_ACCENT } from '../../utils/theme';
import { useAuth } from '../Auth/AuthContext';

interface Props {
  activeTool: ToolView | null;
  onSelectTool: (tool: ToolView | null) => void;
}

export const UtilityRail: React.FC<Props> = ({ activeTool, onSelectTool }) => {
  const { logout } = useAuth();
  const tools: { id: ToolView; icon: any; label: string }[] = [
    { id: 'my-resumes', icon: FolderOpen, label: 'My Resumes' },
    { id: 'ai-tools', icon: Bot, label: 'AI Suite' },
    { id: 'ats-scanner', icon: Target, label: 'ATS Check' },
    { id: 'cover-letter', icon: FileText, label: 'Cover Letter' },
    { id: 'import', icon: Upload, label: 'Import' },
  ];

  return (
    <nav className="hidden md:flex w-20 flex-col items-center py-8 bg-white border-r border-zinc-100 shrink-0 z-40">
      <div className="flex-1 flex flex-col gap-6">
        {tools.map((tool) => {
          const Icon = tool.icon;
          const isActive = activeTool === tool.id;
          
          return (
            <div key={tool.id} className="relative group">
              <button
                onClick={() => onSelectTool(isActive ? null : tool.id)}
                className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 cursor-pointer relative ${
                  isActive 
                    ? 'bg-zinc-900 text-white shadow-xl shadow-zinc-200' 
                    : 'text-zinc-300 hover:text-zinc-900 hover:bg-zinc-50'
                }`}
                title={tool.label}
              >
                <Icon 
                  className="w-5 h-5 relative z-10 transition-transform group-hover:scale-110" 
                />
              </button>
              
              {/* Premium Tooltip */}
              <div className="absolute left-full ml-4 px-3 py-1.5 bg-zinc-900 text-[9px] font-bold text-white uppercase tracking-widest rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300 whitespace-nowrap z-50 shadow-2xl">
                {tool.label}
              </div>
            </div>
          );
        })}
      </div>

      <div className="pt-8 border-t border-zinc-50 w-12 flex flex-col items-center gap-4">
         <button
            onClick={() => onSelectTool(null)}
            className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 cursor-pointer ${
              activeTool === null 
                ? 'bg-zinc-900 text-white shadow-lg' 
                : 'text-zinc-300 hover:text-zinc-900 hover:bg-zinc-50'
            }`}
            title="Resume Editor"
          >
            <Settings className="w-5 h-5 transition-transform hover:rotate-90 duration-700" />
          </button>

         <button
            onClick={logout}
            className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 cursor-pointer text-rose-400 hover:text-rose-600 hover:bg-rose-50"
            title="Sign Out"
          >
            <LogOut className="w-5 h-5" />
          </button>
      </div>
    </nav>
  );
};
