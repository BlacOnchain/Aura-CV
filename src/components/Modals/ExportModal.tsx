import React, { useState } from 'react';
import { ResumeData } from '../../types/resume';
import { X, Copy, Check, Download, Upload, FileCode, Printer, FileText } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  resumeData: ResumeData;
  onImportData: (imported: ResumeData) => void;
}

export const ExportModal: React.FC<Props> = ({ isOpen, onClose, resumeData, onImportData }) => {
  const [activeTab, setActiveTab] = useState<'print' | 'text' | 'markdown' | 'json'>('print');
  const [copied, setCopied] = useState(false);
  const [importError, setImportError] = useState<string | null>(null);

  if (!isOpen) return null;

  const generatePlainText = () => {
    let out = `${resumeData.personal.fullName}\n${resumeData.personal.title}\n`;
    out += `${resumeData.personal.email} | ${resumeData.personal.phone} | ${resumeData.personal.location}\n`;
    if (resumeData.personal.portfolioUrl) out += `Portfolio: ${resumeData.personal.portfolioUrl}\n`;
    if (resumeData.personal.githubUrl) out += `GitHub: ${resumeData.personal.githubUrl}\n`;
    if (resumeData.personal.twitterUrl) out += `X/Twitter: ${resumeData.personal.twitterUrl}\n`;

    if (resumeData.summary) {
      out += `\nSUMMARY\n${resumeData.summary}\n`;
    }

    if (resumeData.experiences.length > 0) {
      out += `\nEXPERIENCE\n`;
      resumeData.experiences.forEach((exp) => {
        out += `${exp.role} - ${exp.company} (${exp.location})\n`;
        out += `${exp.startDate} - ${exp.isCurrent ? 'Present' : exp.endDate}\n`;
        exp.descriptionBullets.forEach((b) => {
          if (b.trim()) out += `• ${b}\n`;
        });
        out += `\n`;
      });
    }

    if (resumeData.projects.length > 0) {
      out += `PROJECTS\n`;
      resumeData.projects.forEach((proj) => {
        out += `${proj.name} ${proj.subtitle ? `(${proj.subtitle})` : ''} [${proj.startDate} - ${proj.endDate}]\n`;
        if (proj.link) out += `Link: ${proj.link}\n`;
        proj.descriptionBullets.forEach((b) => {
          if (b.trim()) out += `• ${b}\n`;
        });
        out += `\n`;
      });
    }

    if (resumeData.education.length > 0) {
      out += `EDUCATION\n`;
      resumeData.education.forEach((edu) => {
        out += `${edu.degree} - ${edu.institution} (${edu.startDate} - ${edu.endDate})\n`;
        edu.courseworkBullets.forEach((b) => {
          if (b.trim()) out += `• ${b}\n`;
        });
        out += `\n`;
      });
    }

    if (resumeData.skillCategories.length > 0) {
      out += `SKILLS\n`;
      resumeData.skillCategories.forEach((sc) => {
        out += `${sc.categoryName}: ${sc.skillsList.join(', ')}\n`;
        if (sc.description) out += `${sc.description}\n`;
      });
    }

    return out;
  };

  const generateMarkdown = () => {
    let out = `# ${resumeData.personal.fullName}\n**${resumeData.personal.title}**\n\n`;
    out += `- **Email**: ${resumeData.personal.email}\n- **Phone**: ${resumeData.personal.phone}\n`;
    if (resumeData.personal.location) out += `- **Location**: ${resumeData.personal.location}\n`;
    if (resumeData.personal.portfolioUrl) out += `- **Portfolio**: ${resumeData.personal.portfolioUrl}\n`;
    if (resumeData.personal.githubUrl) out += `- **GitHub**: ${resumeData.personal.githubUrl}\n`;

    if (resumeData.summary) {
      out += `\n## Summary\n${resumeData.summary}\n`;
    }

    if (resumeData.experiences.length > 0) {
      out += `\n## Work Experience\n`;
      resumeData.experiences.forEach((exp) => {
        out += `### ${exp.role} — ${exp.company} (${exp.location})\n`;
        out += `*${exp.startDate} – ${exp.isCurrent ? 'Present' : exp.endDate}*\n\n`;
        exp.descriptionBullets.forEach((b) => {
          if (b.trim()) out += `- ${b}\n`;
        });
        out += `\n`;
      });
    }

    if (resumeData.projects.length > 0) {
      out += `\n## Projects\n`;
      resumeData.projects.forEach((proj) => {
        out += `### ${proj.name} ${proj.subtitle ? `(${proj.subtitle})` : ''}\n`;
        out += `*${proj.startDate} – ${proj.endDate}* ${proj.link ? `| [Link](${proj.link})` : ''}\n\n`;
        proj.descriptionBullets.forEach((b) => {
          if (b.trim()) out += `- ${b}\n`;
        });
        out += `\n`;
      });
    }

    if (resumeData.education.length > 0) {
      out += `\n## Education\n`;
      resumeData.education.forEach((edu) => {
        out += `### ${edu.degree} — ${edu.institution}\n`;
        out += `*${edu.startDate} – ${edu.endDate}*\n\n`;
        edu.courseworkBullets.forEach((b) => {
          if (b.trim()) out += `- ${b}\n`;
        });
        out += `\n`;
      });
    }

    if (resumeData.skillCategories.length > 0) {
      out += `\n## Core Skills\n`;
      resumeData.skillCategories.forEach((sc) => {
        out += `- **${sc.categoryName}**: ${sc.skillsList.join(', ')}\n`;
      });
    }

    return out;
  };

  const handleCopyText = (content: string) => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadJSON = () => {
    const jsonStr = JSON.stringify(resumeData, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${resumeData.personal.fullName.replace(/\s+/g, '_') || 'Resume'}_data.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImportError(null);
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed.personal && parsed.experiences) {
          onImportData(parsed);
          onClose();
        } else {
          setImportError('Invalid resume JSON format. Must contain personal and experiences fields.');
        }
      } catch (err) {
        setImportError('Failed to parse JSON file. Please check syntax.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-xl w-full shadow-2xl overflow-hidden border border-slate-200 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Download className="w-5 h-5 text-indigo-400" />
            <h3 className="font-semibold text-base">Export & Backup Options</h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-md transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-6 pt-2 gap-2 text-xs font-semibold text-slate-600">
          <button
            onClick={() => setActiveTab('print')}
            className={`pb-2.5 px-3 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'print' ? 'border-indigo-600 text-indigo-600' : 'border-transparent hover:text-slate-900'
            }`}
          >
            <Printer className="w-3.5 h-3.5" /> PDF / Print
          </button>
          <button
            onClick={() => setActiveTab('text')}
            className={`pb-2.5 px-3 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'text' ? 'border-indigo-600 text-indigo-600' : 'border-transparent hover:text-slate-900'
            }`}
          >
            <FileText className="w-3.5 h-3.5" /> Plain ATS Text
          </button>
          <button
            onClick={() => setActiveTab('markdown')}
            className={`pb-2.5 px-3 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'markdown' ? 'border-indigo-600 text-indigo-600' : 'border-transparent hover:text-slate-900'
            }`}
          >
            <FileCode className="w-3.5 h-3.5" /> Markdown
          </button>
          <button
            onClick={() => setActiveTab('json')}
            className={`pb-2.5 px-3 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'json' ? 'border-indigo-600 text-indigo-600' : 'border-transparent hover:text-slate-900'
            }`}
          >
            <Upload className="w-3.5 h-3.5" /> Backup & Restore
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm text-slate-700">
          {activeTab === 'print' && (
            <div className="space-y-4">
              <div className="p-4 bg-indigo-50/60 rounded-xl border border-indigo-100 space-y-2">
                <h4 className="font-bold text-indigo-900">How to Save as Clean PDF:</h4>
                <ol className="list-decimal ml-4 space-y-1 text-slate-700 text-xs">
                  <li>Click <strong>&quot;Open Print Dialog&quot;</strong> below or press <kbd className="px-1.5 py-0.5 bg-white border rounded text-[10px]">Ctrl+P</kbd> / <kbd className="px-1.5 py-0.5 bg-white border rounded text-[10px]">Cmd+P</kbd>.</li>
                  <li>In the Destination dropdown, choose <strong>&quot;Save as PDF&quot;</strong>.</li>
                  <li>Under More Settings, check <strong>&quot;Background graphics&quot;</strong>.</li>
                  <li>Set Margins to <strong>&quot;None&quot;</strong> or <strong>&quot;Default&quot;</strong> for pixel-perfect layout.</li>
                </ol>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    setTimeout(() => window.print(), 200);
                  }}
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  Open Print / Save PDF Dialog
                </button>
              </div>
            </div>
          )}

          {activeTab === 'text' && (
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <p className="text-xs text-slate-500">
                  Ideal for pasting into online job application forms (Workday, Greenhouse, Lever).
                </p>
                <button
                  type="button"
                  onClick={() => handleCopyText(generatePlainText())}
                  className="inline-flex items-center gap-1 px-3 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-semibold cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Copied to Clipboard!' : 'Copy Plain Text'}
                </button>
              </div>
              <textarea
                readOnly
                rows={9}
                value={generatePlainText()}
                className="w-full p-3 font-mono text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-800"
              />
            </div>
          )}

          {activeTab === 'markdown' && (
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <p className="text-xs text-slate-500">
                  Formatted Markdown for GitHub README, portfolio blogs, or Notion.
                </p>
                <button
                  type="button"
                  onClick={() => handleCopyText(generateMarkdown())}
                  className="inline-flex items-center gap-1 px-3 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-semibold cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Copied!' : 'Copy Markdown'}
                </button>
              </div>
              <textarea
                readOnly
                rows={9}
                value={generateMarkdown()}
                className="w-full p-3 font-mono text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-800"
              />
            </div>
          )}

          {activeTab === 'json' && (
            <div className="space-y-4">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <h4 className="font-semibold text-slate-900 text-xs">Save or Restore Data</h4>
                <p className="text-xs text-slate-500">
                  Export your resume as a JSON file to your device so you never lose your progress, or import an existing resume file anytime.
                </p>
                {importError && (
                  <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-700 font-medium">
                    {importError}
                  </div>
                )}
                <div className="flex flex-wrap gap-2 pt-1">
                  <button
                    type="button"
                    onClick={handleDownloadJSON}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-lg cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Download JSON Backup
                  </button>

                  <label className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 text-xs font-semibold rounded-lg cursor-pointer border border-indigo-200/80">
                    <Upload className="w-3.5 h-3.5" />
                    Upload & Restore JSON
                    <input
                      type="file"
                      accept=".json"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
