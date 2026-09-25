import React, { useState } from 'react';
import { ResumeData } from '../../types/resume';
import { callAI } from '../../utils/aiClient';
import {
  Upload,
  Linkedin,
  FileJson,
  Loader2,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  FileText,
  ArrowLeft,
  Wand2,
  ShieldCheck,
  X
} from 'lucide-react';

interface Props {
  onImportAsNew: (name: string, data: ResumeData) => void;
  onOverwriteCurrent: (data: ResumeData) => void;
  onBack?: () => void;
}

export const ImportView: React.FC<Props> = ({
  onImportAsNew,
  onOverwriteCurrent,
  onBack
}) => {
  const [activeMode, setActiveMode] = useState<'pdf' | 'linkedin' | 'json'>('pdf');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [isImporting, setIsImporting] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [previewData, setPreviewData] = useState<ResumeData | null>(null);

  const handleLinkedInImport = async () => {
    if (!linkedinUrl.trim()) return;
    setIsImporting(true);
    setStatus('Gemini is crawling and parsing profile data...');
    
    const result = await callAI<any>('/api/ai/parse-linkedin', { url: linkedinUrl });

    if (result.data?.resume) {
      setPreviewData(result.data.resume);
      setStatus('Successfully parsed profile! Choose how to apply it below.');
    } else {
      setStatus('Could not parse LinkedIn profile. Please try another URL or paste profile text.');
    }
    setIsImporting(false);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type === 'application/json') {
      const reader = new FileReader();
      reader.onload = (ev) => {
        try {
          const json = JSON.parse(ev.target?.result as string);
          setPreviewData(json);
          setStatus('JSON detected. You can import this as a new resume.');
        } catch (err) {
          setStatus('Invalid JSON file.');
        }
      };
      reader.readAsText(file);
      return;
    }

    if (file.type === 'application/pdf') {
      setIsImporting(true);
      setStatus(`Uploading and parsing ${file.name} using Gemini Vision...`);
      
      const reader = new FileReader();
      reader.onload = async (ev) => {
        const base64 = ev.target?.result as string;
        const result = await callAI<any>('/api/ai/parse-resume', {
          fileBase64: base64,
          fileName: file.name,
        });

        if (result.data?.resume) {
          setPreviewData(result.data.resume);
          setStatus('Successfully extracted resume data! Apply it below.');
        } else {
          setStatus('Parsing failed. Gemini could not read the PDF structure.');
        }
        setIsImporting(false);
      };
      reader.readAsDataURL(file);
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
            <Upload className="w-5 h-5 text-zinc-800" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-base text-zinc-900 tracking-tight">
                Import Intelligence Hub
              </h3>
              <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-zinc-100 text-zinc-700 uppercase tracking-wider border border-zinc-200">
                Data Migrator
              </span>
            </div>
            <p className="text-xs text-zinc-500 font-medium">
              Migrate LinkedIn profiles, PDFs, or JSON data into your studio
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-2xs overflow-y-auto flex-1">
        <div className="max-w-4xl space-y-8">
          {/* View Switcher */}
          <div className="grid grid-cols-3 gap-3 bg-slate-100 p-1.5 rounded-2xl">
            {[
              { id: 'pdf', label: 'PDF Resume', icon: FileText },
              { id: 'linkedin', label: 'LinkedIn URL', icon: Linkedin },
              { id: 'json', label: 'AuraCV JSON', icon: FileJson },
            ].map((mode) => (
              <button
                key={mode.id}
                onClick={() => {
                  setActiveMode(mode.id as any);
                  setPreviewData(null);
                  setStatus(null);
                }}
                className={`flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeMode === mode.id
                    ? 'bg-white shadow-md text-slate-900'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <mode.icon className="w-4 h-4" />
                {mode.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input area */}
            <div className="space-y-6">
              {activeMode === 'pdf' && (
                <div className="border-3 border-dashed border-slate-200 rounded-[32px] p-10 flex flex-col items-center justify-center text-center hover:border-zinc-300 transition-colors group relative bg-slate-50/50">
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileUpload}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  <div className="w-16 h-16 rounded-3xl bg-white shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Upload className="w-8 h-8 text-zinc-900" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900">Upload PDF Resume</h4>
                  <p className="text-sm text-slate-500 mt-2">
                    Drag and drop or click to upload. Gemini will intelligently extract your experience.
                  </p>
                </div>
              )}

              {activeMode === 'linkedin' && (
                <div className="bg-slate-50 border-2 border-slate-100 rounded-[32px] p-8 space-y-5">
                  <div className="w-12 h-12 rounded-2xl bg-zinc-900 flex items-center justify-center">
                    <Linkedin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">LinkedIn Profile Link</h4>
                    <p className="text-sm text-slate-500 mt-1">Paste your public LinkedIn profile URL to fetch your history.</p>
                  </div>
                  <div className="space-y-3">
                    <input
                      type="url"
                      value={linkedinUrl}
                      onChange={(e) => setLinkedinUrl(e.target.value)}
                      placeholder="https://linkedin.com/in/username"
                      className="w-full px-5 py-4 border-2 border-slate-200 rounded-2xl focus:ring-4 focus:ring-zinc-500/10 focus:border-zinc-900 focus:outline-hidden bg-white text-slate-900 font-bold transition-all"
                    />
                    <button
                      onClick={handleLinkedInImport}
                      disabled={isImporting || !linkedinUrl.trim()}
                      className="w-full py-4 bg-zinc-900 hover:bg-zinc-800 text-white rounded-2xl text-sm font-bold shadow-lg shadow-zinc-100 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {isImporting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                      {isImporting ? 'Parsing Profile...' : 'Extract from LinkedIn'}
                    </button>
                  </div>
                </div>
              )}

              {activeMode === 'json' && (
                <div className="border-3 border-dashed border-slate-200 rounded-[32px] p-10 flex flex-col items-center justify-center text-center hover:border-zinc-300 transition-colors group relative bg-slate-50/50">
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleFileUpload}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  <div className="w-16 h-16 rounded-3xl bg-white shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <FileJson className="w-8 h-8 text-zinc-900" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900">Import .json File</h4>
                  <p className="text-sm text-slate-500 mt-2">
                    Restore a previously exported AuraCV data file.
                  </p>
                </div>
              )}

              {status && (
                <div className={`p-4 rounded-2xl border-2 text-sm flex items-start gap-3 animate-in fade-in slide-in-from-top-2 ${status.includes('failed') || status.includes('Could not') ? 'bg-rose-50 border-rose-100 text-rose-800' : 'bg-emerald-50 border-emerald-100 text-emerald-800'}`}>
                  {status.includes('failed') || status.includes('Could not') ? <AlertCircle className="w-4 h-4 shrink-0" /> : <CheckCircle2 className="w-4 h-4 shrink-0" />}
                  <span className="font-medium">{status}</span>
                </div>
              )}
            </div>

            {/* Actions area */}
            <div className="space-y-6">
              {previewData ? (
                <div className="bg-white border-2 border-slate-100 rounded-[32px] p-8 shadow-sm space-y-6 animate-in fade-in zoom-in-95">
                  <div>
                    <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
                      <ShieldCheck className="w-5 h-5 text-emerald-600" />
                      Extracted Profile Ready
                    </h4>
                    <p className="text-xs text-slate-500 mt-1 uppercase font-bold tracking-widest">
                      {previewData.personal?.fullName} · {previewData.personal?.title}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <button
                      onClick={() => {
                        onImportAsNew(`${previewData.personal?.fullName || 'Imported'} Resume`, previewData);
                        if (onBack) onBack();
                      }}
                      className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl text-sm font-bold shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Wand2 className="w-4 h-4" />
                      Import as New Resume
                    </button>
                    <button
                      onClick={() => {
                        onOverwriteCurrent(previewData);
                        if (onBack) onBack();
                      }}
                      className="w-full py-4 bg-white border-2 border-slate-200 hover:border-zinc-300 hover:bg-zinc-50/30 text-slate-800 rounded-2xl text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      Overwrite Active Resume
                    </button>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                     <p className="text-[11px] text-slate-500 leading-relaxed italic">
                       &quot;Success! Gemini Vision and AI extraction have reconstructed the relational structure from your source. You can now tweak the content or change the design palette.&quot;
                     </p>
                  </div>
                </div>
              ) : (
                <div className="h-full min-h-[300px] border-2 border-dashed border-slate-200 rounded-[32px] flex flex-col items-center justify-center text-center p-8">
                  <div className="w-16 h-16 rounded-3xl bg-slate-50 flex items-center justify-center mb-4">
                    <Wand2 className="w-8 h-8 text-slate-200" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-300 uppercase tracking-widest">Awaiting Input</h4>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
