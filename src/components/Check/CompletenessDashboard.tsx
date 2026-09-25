import React from 'react';
import { ResumeData } from '../../types/resume';
import { 
  CheckCircle2, 
  Circle, 
  AlertCircle, 
  User, 
  Briefcase, 
  GraduationCap, 
  Wrench,
  Award,
  Globe2
} from 'lucide-react';

interface Props {
  data: ResumeData;
}

export const CompletenessDashboard: React.FC<Props> = ({ data }) => {
  const checks = [
    {
      id: 'personal',
      label: 'Contact Info',
      icon: User,
      valid: !!(data.personal.fullName && data.personal.email && data.personal.phone),
      score: 15
    },
    {
      id: 'summary',
      label: 'Executive Summary',
      icon: CheckCircle2,
      valid: !!(data.summary && data.summary.length > 50),
      score: 15
    },
    {
      id: 'experience',
      label: 'Work Experience',
      icon: Briefcase,
      valid: data.experiences.length > 0,
      score: 30
    },
    {
      id: 'education',
      label: 'Education',
      icon: GraduationCap,
      valid: data.education.length > 0,
      score: 15
    },
    {
      id: 'skills',
      label: 'Key Skills',
      icon: Wrench,
      valid: data.skillCategories.some(c => c.skillsList.length > 0),
      score: 15
    },
    {
      id: 'extras',
      label: 'Projects / Certs',
      icon: Award,
      valid: data.projects.length > 0 || data.certifications.length > 0,
      score: 10
    }
  ];

  const totalScore = checks.reduce((acc, curr) => acc + (curr.valid ? curr.score : 0), 0);

  return (
    <div className="bg-white rounded-[32px] border-2 border-slate-100 p-8 mb-8 shadow-sm">
      <div className="flex flex-col md:flex-row items-center gap-10">
        {/* Radial Progress */}
        <div className="relative w-40 h-40 shrink-0">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="80"
              cy="80"
              r="72"
              stroke="currentColor"
              strokeWidth="12"
              fill="transparent"
              className="text-slate-50"
            />
            <circle
              cx="80"
              cy="80"
              r="72"
              stroke="currentColor"
              strokeWidth="12"
              fill="transparent"
              strokeDasharray={452.3}
              strokeDashoffset={452.3 - (452.3 * totalScore) / 100}
              className={`transition-all duration-1000 ease-out ${
                totalScore >= 80 ? 'text-emerald-500' : totalScore >= 50 ? 'text-indigo-500' : 'text-amber-500'
              }`}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-black text-slate-900 leading-none">{totalScore}</span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Completeness</span>
          </div>
        </div>

        {/* Breakdown */}
        <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 gap-4 w-full">
          {checks.map((check) => {
            const Icon = check.icon;
            return (
              <div 
                key={check.id}
                className={`p-4 rounded-2xl border-2 transition-all flex flex-col gap-2 ${
                  check.valid ? 'bg-slate-50/50 border-slate-100' : 'bg-rose-50/20 border-rose-100/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className={`p-1.5 rounded-lg ${check.valid ? 'bg-indigo-100 text-indigo-600' : 'bg-rose-100 text-rose-500'}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  {check.valid ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-rose-300" />
                  )}
                </div>
                <span className={`text-[11px] font-bold uppercase tracking-tight ${check.valid ? 'text-slate-900' : 'text-rose-400'}`}>
                  {check.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-8 pt-8 border-t border-slate-50">
        <p className="text-xs text-slate-500 font-medium leading-relaxed">
          {totalScore === 100 
            ? "Your resume is 100% complete! Gemini suggests double-checking your bullet point impact next."
            : "Complete all sections to reach 100%. A fully populated resume is 4x more likely to clear ATS filters."
          }
        </p>
      </div>
    </div>
  );
};
