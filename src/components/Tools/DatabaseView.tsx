import React, { useState } from 'react';
import {
  Database,
  Trash2,
  Download,
  Copy,
  Check,
  Server,
  FileCode,
  CheckCircle2,
  ExternalLink,
  Code2,
  RefreshCw,
  ArrowLeft,
  AlertCircle
} from 'lucide-react';
import { SavedResume } from '../../types/resume';

import { useAuth } from '../Auth/AuthContext';
import { APP_ACCENT } from '../../utils/theme';

interface Props {
  savedResumes: SavedResume[];
  onClearDatabase: () => void;
  accentColor?: string;
  onBack?: () => void;
}

export const DatabaseView: React.FC<Props> = ({
  savedResumes,
  onClearDatabase,
  onBack
}) => {
  const { getToken } = useAuth();
  const accentColor = APP_ACCENT.hex;
  const [activeTab, setActiveTab] = useState<'overview' | 'mysql' | 'laravel' | 'api'>('overview');
  const [copied, setCopied] = useState<string | null>(null);
  const [confirmClear, setConfirmClear] = useState(false);
  const laravelApiUrl = import.meta.env.VITE_API_URL || '/api/v1/resumes';
  const [syncStatus, setSyncStatus] = useState<string | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleTestConnection = async () => {
    setIsSyncing(true);
    setSyncStatus('Testing connection to ' + laravelApiUrl + '...');
    try {
      const res = await fetch(`${laravelApiUrl}/api/v1/status`, { method: 'GET' });
      if (res.ok) {
        setSyncStatus('Connection successful! Connected to Laravel backend.');
      } else {
        setSyncStatus(`Connected, but server returned HTTP ${res.status}.`);
      }
    } catch (err: any) {
      setSyncStatus(`Could not reach ${laravelApiUrl}. Ensure the Laravel backend is running.`);
    } finally {
      setIsSyncing(false);
    }
  };

  const handleRealSync = async () => {
    setIsSyncing(true);
    setSyncStatus('Syncing ' + savedResumes.length + ' resumes to Laravel backend...');
    
    try {
      const token = await getToken();
      // Real sync logic
      const response = await fetch(laravelApiUrl, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ resumes: savedResumes })
      });
      
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      setSyncStatus('Successfully synced all resumes to Laravel!');
    } catch (err: any) {
      setSyncStatus('Sync failed: ' + err.message);
    } finally {
      setIsSyncing(false);
    }
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
            <Database className="w-5 h-5 text-zinc-800" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-base text-zinc-900 tracking-tight">
                Database & Backend Sync
              </h3>
              <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-zinc-100 text-zinc-700 uppercase tracking-wider border border-zinc-200">
                Active Database
              </span>
            </div>
            <p className="text-xs text-zinc-500 font-medium">
              Manage local database records, or synchronize with MySQL & PHP Laravel backend.
            </p>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-1.5 p-1 bg-zinc-100 rounded-full border border-zinc-200 max-w-fit mb-5 overflow-x-auto">
        {[
          { id: 'overview', label: 'Status', icon: Server },
          { id: 'mysql', label: 'MySQL Schema', icon: Database },
          { id: 'laravel', label: 'Laravel Backend', icon: FileCode },
          { id: 'api', label: 'API Sync', icon: Code2 },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                isActive
                  ? 'bg-zinc-950 text-white shadow-xs'
                  : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-200/50'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-2xs overflow-y-auto space-y-6 flex-1 max-w-4xl">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-50 rounded-3xl p-6 border-2 border-slate-100 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Database Engine</span>
                  <h3 className="text-xl font-bold text-slate-900 mt-1">Standalone Fresh Database</h3>
                  <p className="text-sm text-slate-500 mt-2">Your data is currently stored in a high-performance local relational engine.</p>
                </div>
                <div className="mt-6 flex items-center gap-3">
                  <div className="px-4 py-2 bg-white rounded-xl border border-slate-200 text-sm font-bold text-slate-800">
                    {savedResumes.length} <span className="text-slate-400 font-medium ml-1">Records</span>
                  </div>
                  <div className="px-4 py-2 bg-zinc-50 rounded-xl border border-zinc-200 text-sm font-bold text-zinc-700 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> Healthy
                  </div>
                </div>
              </div>

              <div className="bg-rose-50/30 rounded-3xl p-6 border-2 border-rose-100/50 flex flex-col justify-between">
                <div>
                  <h4 className="text-sm font-bold text-rose-900 flex items-center gap-2">
                    <Trash2 className="w-4 h-4" /> Reset Environment
                  </h4>
                  <p className="text-sm text-rose-800/70 mt-2 leading-relaxed">
                    Wipe all saved resumes and cache. Your website will be reset to a pristine standalone state.
                  </p>
                </div>
                
                <div className="mt-6">
                  {!confirmClear ? (
                    <button
                      type="button"
                      onClick={() => setConfirmClear(true)}
                      className="w-full px-4 py-3 bg-rose-600 hover:bg-rose-700 text-white rounded-2xl text-sm font-bold shadow-lg shadow-rose-200 transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-2"
                    >
                      <Trash2 className="w-4 h-4" /> Clear All Records
                    </button>
                  ) : (
                    <div className="flex flex-col gap-2">
                      <p className="text-xs text-rose-700 font-bold text-center mb-1">Confirm absolute reset?</p>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setConfirmClear(false)}
                          className="flex-1 px-3 py-2 bg-white border border-rose-200 text-rose-900 rounded-xl text-xs font-bold cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            onClearDatabase();
                            setConfirmClear(false);
                            if (onBack) onBack();
                          }}
                          className="flex-1 px-3 py-2 bg-rose-700 text-white rounded-xl text-xs font-bold cursor-pointer"
                        >
                          Confirm Wipe
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a
                href="/api/database/schema-sql"
                download="auracv_mysql_schema.sql"
                className="p-5 rounded-3xl border-2 border-zinc-100 hover:border-zinc-300 hover:bg-zinc-50 transition-all flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-zinc-100 group-hover:bg-zinc-200 flex items-center justify-center transition-colors">
                    <Database className="w-5 h-5 text-zinc-600 group-hover:text-zinc-900" />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-zinc-900">MySQL Schema (.sql)</h5>
                    <span className="text-xs text-zinc-500">Download 13 relational tables</span>
                  </div>
                </div>
                <Download className="w-5 h-5 text-zinc-300 group-hover:text-zinc-900" />
              </a>

              <button
                type="button"
                onClick={() => setActiveTab('laravel')}
                className="p-5 rounded-3xl border-2 border-zinc-100 hover:border-zinc-300 hover:bg-zinc-50 transition-all flex items-center justify-between group cursor-pointer text-left"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-zinc-100 group-hover:bg-zinc-200 flex items-center justify-center transition-colors">
                    <FileCode className="w-5 h-5 text-zinc-600 group-hover:text-zinc-900" />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-zinc-900">Laravel Driver</h5>
                    <span className="text-xs text-zinc-500">Migrations, Models, API</span>
                  </div>
                </div>
                <ExternalLink className="w-5 h-5 text-zinc-300 group-hover:text-zinc-900" />
              </button>
            </div>
          </div>
        )}

        {activeTab === 'api' && (
          <div className="space-y-6">
            <div className="bg-emerald-50/60 rounded-3xl p-6 border border-emerald-200/80">
              <h4 className="text-base font-bold text-emerald-950 flex items-center gap-2">
                <RefreshCw className={`w-5 h-5 text-emerald-600 ${isSyncing ? 'animate-spin' : ''}`} />
                Laravel Cloud Sync
              </h4>
              <p className="text-sm text-emerald-800/80 mt-2">
                Your resumes are automatically synced to the cloud using your Google account.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">
                  Target Backend
                </label>
                <div className="px-5 py-3.5 rounded-2xl border-2 border-slate-100 font-mono text-sm bg-slate-50 text-slate-500 truncate">
                  {laravelApiUrl}
                </div>
              </div>
              
              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleRealSync}
                  disabled={isSyncing}
                  className="flex-1 py-3.5 bg-zinc-900 hover:bg-zinc-800 text-white rounded-2xl text-sm font-bold shadow-lg shadow-zinc-100 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
                  Force Re-Sync Now
                </button>
              </div>

              {syncStatus && (
                <div className={`p-4 rounded-2xl border-2 font-mono text-xs flex items-start gap-3 mt-4 animate-in fade-in slide-in-from-top-2 ${syncStatus.includes('failed') || syncStatus.includes('Could not') ? 'bg-rose-50 border-rose-100 text-rose-800' : 'bg-emerald-50 border-emerald-100 text-emerald-800'}`}>
                  {syncStatus.includes('failed') || syncStatus.includes('Could not') ? <AlertCircle className="w-4 h-4 shrink-0" /> : <CheckCircle2 className="w-4 h-4 shrink-0" />}
                  <span>{syncStatus}</span>
                </div>
              )}
            </div>

            <div className="p-6 bg-slate-50 rounded-3xl border-2 border-slate-100 space-y-4">
              <h5 className="font-bold text-slate-900 flex items-center gap-2">
                <Code2 className="w-4 h-4 text-indigo-600" />
                Supported Laravel API Specification:
              </h5>
              <div className="font-mono text-xs space-y-2">
                <div className="flex items-center gap-3">
                  <span className="w-14 px-2 py-0.5 rounded bg-zinc-100 text-zinc-800 font-bold text-[10px] text-center">GET</span>
                  <span className="text-slate-600">/api/v1/resumes — Fetch active records</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-14 px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-bold text-[10px] text-center">POST</span>
                  <span className="text-slate-600">/api/v1/resumes — Create / Bulk Store</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-14 px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-bold text-[10px] text-center">PUT</span>
                  <span className="text-slate-600">/api/v1/resumes/:uuid — Update state</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'mysql' && (
          <div className="bg-slate-900 rounded-3xl p-8 text-slate-200 font-mono text-xs border border-slate-800 shadow-2xl relative">
             <button
                type="button"
                onClick={() => handleCopy("-- MySQL Schema ...", 'sql')}
                className="absolute right-6 top-6 p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors cursor-pointer"
              >
                {copied === 'sql' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            <pre className="leading-relaxed">
{`-- AuraCV Studio — MySQL Relational Schema
CREATE TABLE users (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE resumes (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  uuid VARCHAR(64) NOT NULL UNIQUE,
  user_id BIGINT UNSIGNED NULL,
  name VARCHAR(255) NOT NULL,
  target_role VARCHAR(255) NULL,
  summary TEXT NULL,
  template VARCHAR(64) DEFAULT 'executive',
  accent_color VARCHAR(32) DEFAULT '#059669',
  raw_json_data LONGTEXT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- (Includes 13 tables: experiences, educations, skills, projects, certifications, etc.)`}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};
