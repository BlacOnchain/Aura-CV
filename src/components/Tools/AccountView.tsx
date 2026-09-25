import React from 'react';
import { 
  User as UserIcon, 
  LogOut, 
  ArrowLeft,
  Mail,
  ShieldCheck,
  Globe
} from 'lucide-react';
import { useAuth } from '../Auth/AuthContext';
import { APP_ACCENT } from '../../utils/theme';

interface Props {
  onBack?: () => void;
}

export const AccountView: React.FC<Props> = ({ onBack }) => {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <div className="flex flex-col h-full bg-transparent">
      {/* Header Banner */}
      <div className="bg-white p-5 rounded-2xl border border-[#EBE6DD] shadow-2xs flex items-center justify-between shrink-0 mb-5">
        <div className="flex items-center gap-3.5">
          {onBack && (
            <button onClick={onBack} className="p-2 hover:bg-zinc-100 rounded-lg transition-colors cursor-pointer text-[#1A1917]/70">
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}
          <div className="p-2.5 bg-[#FAF6F0] rounded-xl border border-[#EBE6DD]">
            <UserIcon className="w-5 h-5 text-[#1A1917]/85" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-base text-[#1A1917] tracking-tight">
                Your Account
              </h3>
              <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-[#EBE6DD]/60 text-[#1A1917]/70 uppercase tracking-wider border border-[#EBE6DD]">
                Session
              </span>
            </div>
            <p className="text-xs text-zinc-500 font-medium">
              Manage your identity and session preferences
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-[#EBE6DD] shadow-2xs overflow-y-auto flex-1">
        <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-lg shrink-0">
              <img src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="min-w-0">
              <h2 className="text-2xl font-black text-slate-900 truncate">{user.name}</h2>
              <div className="flex items-center gap-2 mt-1 text-slate-500 font-medium">
                <Mail className="w-4 h-4" />
                <span>{user.email}</span>
              </div>
              <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 bg-white rounded-full border border-slate-200 text-xs font-bold text-slate-700 uppercase tracking-widest">
                {user.auth_method === 'google' ? (
                  <>
                    <Globe className="w-3 h-3 text-emerald-600" />
                    Google Account
                  </>
                ) : (
                  <>
                    <Mail className="w-3 h-3 text-emerald-600" />
                    Email Account
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-4 p-4 rounded-2xl border border-slate-100 bg-white shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900">Verified Identity</h4>
              <p className="text-xs text-slate-500">Your account is secured via {user.auth_method === 'google' ? 'Google OAuth 2.0' : 'hashed password'}.</p>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-100">
          <button
            onClick={logout}
            className="w-full flex items-center justify-center gap-3 py-4 bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-2xl font-black transition-all cursor-pointer"
          >
            <LogOut className="w-5 h-5" />
            Sign Out of AuraCV
          </button>
        </div>
      </div>
    </div>
  );
};
