import React, { useState } from 'react';
import { ResumeData } from '../../types/resume';
import {
  Download,
  Printer,
  FileText,
  FileCode,
  Copy,
  Check,
  Send,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Layers,
  AlertCircle
} from 'lucide-react';

interface Props {
  data: ResumeData;
  onOpenCoverLetter: () => void;
  onImportData: (imported: ResumeData) => void;
}

export const DownloadStudio: React.FC<Props> = ({
  data,
  onOpenCoverLetter,
  onImportData,
}) => {
  const [copiedTxt, setCopiedTxt] = useState(false);
  const [jsonNotice, setJsonNotice] = useState<string | null>(null);

  const accentColor = data.settings.accentColor || '#059669';

  // Generate plain text version for ATS copy
  const generatePlainText = () => {
    let out = `${data.personal.fullName.toUpperCase()}\n`;
    if (data.personal.title) out += `${data.personal.title}\n`;
    out += `${data.personal.email} | ${data.personal.phone} | ${data.personal.location}\n`;
    if (data.personal.linkedinUrl) out += `LinkedIn: ${data.personal.linkedinUrl}\n`;
    if (data.personal.githubUrl) out += `GitHub: ${data.personal.githubUrl}\n`;
    if (data.personal.portfolioUrl) out += `Portfolio: ${data.personal.portfolioUrl}\n`;
    out += '\n' + '='.repeat(40) + '\n';
    out += 'PROFESSIONAL SUMMARY\n';
    out += '='.repeat(40) + '\n';
    out += `${data.summary}\n\n`;

    out += '='.repeat(40) + '\n';
    out += 'WORK EXPERIENCE\n';
    out += '='.repeat(40) + '\n';
    data.experiences.forEach((exp) => {
      out += `${exp.role} - ${exp.company} (${exp.location})\n`;
      out += `${exp.startDate} - ${exp.endDate}\n`;
      exp.descriptionBullets.forEach((b) => {
        out += `  • ${b}\n`;
      });
      out += '\n';
    });

    out += '='.repeat(40) + '\n';
    out += 'EDUCATION\n';
    out += '='.repeat(40) + '\n';
    data.education.forEach((edu) => {
      out += `${edu.degree} - ${edu.institution}\n`;
      out += `${edu.startDate} - ${edu.endDate}${edu.gpaOrGrade ? ` | GPA: ${edu.gpaOrGrade}` : ''}\n`;
      edu.courseworkBullets.forEach((b) => {
        out += `  • ${b}\n`;
      });
      out += '\n';
    });

    out += '='.repeat(40) + '\n';
    out += 'SKILLS & EXPERTISE\n';
    out += '='.repeat(40) + '\n';
    data.skillCategories.forEach((cat) => {
      out += `${cat.categoryName}: ${cat.skillsList.join(', ')}\n`;
    });

    return out;
  };

  const handleDownloadTxt = () => {
    const text = generatePlainText();
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${(data.personal.fullName || 'Resume').replace(/\s+/g, '_')}_Resume_ATS.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleCopyTxt = () => {
    navigator.clipboard.writeText(generatePlainText());
    setCopiedTxt(true);
    setTimeout(() => setCopiedTxt(false), 2000);
  };

  const handleExportJson = () => {
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${(data.personal.fullName || 'Resume').replace(/\s+/g, '_')}_AuraCV_Data.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex flex-col h-full bg-zinc-50/70 overflow-y-auto p-4 sm:p-6 space-y-6">
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-2xl border border-zinc-200/90 shadow-2xs">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold tracking-wider uppercase text-zinc-700 bg-zinc-100 px-2 py-0.5 rounded-full border border-zinc-200">
                AuraCV Export & Delivery
              </span>
              <span className="text-xs text-zinc-400">·</span>
              <span className="text-xs text-zinc-500 font-medium">Production Output</span>
            </div>
            <h2 className="text-lg font-bold text-zinc-900 mt-1">
              Export Your Resume
            </h2>
            <p className="text-xs text-zinc-500 mt-0.5">
              Print or save as pixel-perfect PDF, copy ATS-clean plain text for portal textareas, or backup your JSON.
            </p>
          </div>
        </div>
      </div>

      {/* Primary Export Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* 1. PDF Download */}
        <div className="bg-white p-5 rounded-2xl border border-zinc-200/90 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-zinc-900 text-white flex items-center justify-center mb-3">
              <Printer className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-zinc-900">
              Download Print-Ready PDF
            </h3>
            <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
              Standard A4 pixel-perfect formatting. Optimized with crisp vector typography and precise page borders.
            </p>
          </div>

          <div className="mt-5 pt-3 border-t border-zinc-100">
            <button
              type="button"
              onClick={handlePrint}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Print / Save as PDF</span>
            </button>
            <p className="text-[10px] text-zinc-400 text-center mt-2">
              Tip: In print settings, set &quot;Save as PDF&quot; and margins to &quot;None&quot; or &quot;Default&quot;.
            </p>
          </div>
        </div>

        {/* 2. Plain Text ATS File */}
        <div className="bg-white p-5 rounded-2xl border border-zinc-200/90 shadow-2xs flex flex-col justify-between">
          <div>
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
              style={{
                backgroundColor: `${accentColor}15`,
                color: accentColor,
              }}
            >
              <FileText className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-zinc-900">
              ATS Plain Text (.txt)
            </h3>
            <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
              Clean unformatted text designed specifically for legacy enterprise ATS portal fields (Workday, Taleo, Greenhouse).
            </p>
          </div>

          <div className="mt-5 pt-3 border-t border-zinc-100 flex items-center gap-2">
            <button
              type="button"
              onClick={handleDownloadTxt}
              className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download .txt</span>
            </button>
            <button
              type="button"
              onClick={handleCopyTxt}
              className="inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-white hover:bg-zinc-50 text-zinc-700 border border-zinc-200 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
            >
              {copiedTxt ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedTxt ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Secondary Tools: Cover Letter & JSON Data */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Cover Letter Studio */}
        <div className="bg-white p-5 rounded-2xl border border-zinc-200/90 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-violet-50 text-violet-700 flex items-center justify-center mb-3">
              <Send className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-zinc-900">
              Matching Cover Letter
            </h3>
            <p className="text-xs text-zinc-500 mt-1">
              Generate a tailored, high-converting cover letter aligned with your resume's experience and target job.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-zinc-100">
            <button
              type="button"
              onClick={onOpenCoverLetter}
              className="w-full inline-flex items-center justify-center gap-2 px-3.5 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Open Cover Letter Studio</span>
            </button>
          </div>
        </div>

        {/* JSON Backup & Restore */}
        <div className="bg-white p-5 rounded-2xl border border-zinc-200/90 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center mb-3">
              <FileCode className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-zinc-900">
              JSON Data Backup & Restore
            </h3>
            <p className="text-xs text-zinc-500 mt-1">
              Export your structured resume data to store securely or transfer to another device.
            </p>
            {jsonNotice && (
              <div className="mt-2 text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg p-2">
                {jsonNotice}
              </div>
            )}
          </div>

          <div className="mt-4 pt-3 border-t border-zinc-100 flex items-center gap-2">
            <button
              type="button"
              onClick={handleExportJson}
              className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export JSON</span>
            </button>

            <label className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-white hover:bg-zinc-50 border border-zinc-200 text-zinc-700 rounded-xl text-xs font-semibold transition-colors cursor-pointer">
              <span>Import JSON</span>
              <input
                type="file"
                accept=".json"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                      try {
                        const parsed = JSON.parse(event.target?.result as string);
                        if (parsed && parsed.personal) {
                          onImportData(parsed);
                          setJsonNotice('Resume data loaded successfully!');
                          setTimeout(() => setJsonNotice(null), 3000);
                        }
                      } catch (err) {
                        setJsonNotice('Error: Invalid JSON resume format.');
                        setTimeout(() => setJsonNotice(null), 3000);
                      }
                    };
                    reader.readAsText(file);
                  }
                }}
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};
