import React, { useState } from 'react';
import { ResumeData } from '../../types/resume';
import { PersonalForm } from './PersonalForm';
import { SummaryForm } from './SummaryForm';
import { ExperienceForm } from './ExperienceForm';
import { ProjectsForm } from './ProjectsForm';
import { EducationForm } from './EducationForm';
import { SkillsForm } from './SkillsForm';
import { CertificationsForm } from './CertificationsForm';
import { LanguagesAndMoreForm } from './LanguagesAndMoreForm';
import {
  User,
  FileText,
  Briefcase,
  FolderGit2,
  GraduationCap,
  Cpu,
  Award,
  Languages,
  ChevronDown,
  Sparkles
} from 'lucide-react';

interface Props {
  data: ResumeData;
  onChange: (updated: ResumeData) => void;
}

type SectionKey = 'personal' | 'summary' | 'experience' | 'projects' | 'education' | 'skills' | 'certifications' | 'more';

export const FormContainer: React.FC<Props> = ({ data, onChange }) => {
  const [expandedSection, setExpandedSection] = useState<SectionKey | null>('personal');

  // Compute completeness score
  const totalChecks = 6;
  let passed = 0;
  if (data.personal.fullName && data.personal.email) passed++;
  if (data.summary.trim().length > 20) passed++;
  if (data.experiences.length > 0 && data.experiences[0].role) passed++;
  if (data.education.length > 0 && data.education[0].degree) passed++;
  if (data.skillCategories.length > 0 && data.skillCategories[0].skillsList.length > 0) passed++;
  if (data.projects.length > 0) passed++;
  const completionPercent = Math.round((passed / totalChecks) * 100);

  const sections: { key: SectionKey; label: string; icon: React.ElementType; component: React.ReactNode }[] = [
    {
      key: 'personal',
      label: 'Contact & Personal Details',
      icon: User,
      component: (
        <PersonalForm
          data={data.personal}
          onChange={(updated) => onChange({ ...data, personal: updated })}
        />
      )
    },
    {
      key: 'summary',
      label: 'Professional Summary',
      icon: FileText,
      component: (
        <SummaryForm
          summary={data.summary}
          resumeData={data}
          onChange={(updated) => onChange({ ...data, summary: updated })}
        />
      )
    },
    {
      key: 'experience',
      label: 'Work Experience',
      icon: Briefcase,
      component: (
        <ExperienceForm
          experiences={data.experiences}
          onChange={(updated) => onChange({ ...data, experiences: updated })}
        />
      )
    },
    {
      key: 'projects',
      label: 'Technical Projects',
      icon: FolderGit2,
      component: (
        <ProjectsForm
          projects={data.projects}
          onChange={(updated) => onChange({ ...data, projects: updated })}
        />
      )
    },
    {
      key: 'education',
      label: 'Education & Coursework',
      icon: GraduationCap,
      component: (
        <EducationForm
          education={data.education}
          onChange={(updated) => onChange({ ...data, education: updated })}
        />
      )
    },
    {
      key: 'skills',
      label: 'Core Skills',
      icon: Cpu,
      component: (
        <SkillsForm
          skillCategories={data.skillCategories}
          onChange={(updated) => onChange({ ...data, skillCategories: updated })}
          targetRole={data.personal?.title}
        />
      )
    },
    {
      key: 'certifications',
      label: 'Certificates & Licenses',
      icon: Award,
      component: (
        <CertificationsForm
          certifications={data.certifications}
          onChange={(updated) => onChange({ ...data, certifications: updated })}
        />
      )
    },
    {
      key: 'more',
      label: 'Languages & Settings',
      icon: Languages,
      component: (
        <LanguagesAndMoreForm
          languages={data.languages}
          referencesText={data.referencesText}
          settings={data.settings}
          onLanguagesChange={(updated) => onChange({ ...data, languages: updated })}
          onReferencesChange={(updated) => onChange({ ...data, referencesText: updated })}
          onSettingsChange={(updated) => onChange({ ...data, settings: updated })}
        />
      )
    }
  ];

  return (
    <div className="flex flex-col h-full bg-transparent">
      {/* Top Progress Block */}
      <div className="bg-[#FCF9F5] border border-[#EBE6DD] px-5 py-4 shrink-0 rounded-2xl mb-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#1A1917] uppercase tracking-wider">
              Profile Completeness
            </span>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#1A1917] text-white">
              {completionPercent}%
            </span>
          </div>
          <span className="text-[11px] text-zinc-500 font-medium">
            {passed} of {totalChecks} core sections filled
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-[#EBE6DD]/40 h-1 rounded-full overflow-hidden">
          <div
            className="bg-[#1A1917] h-full transition-all duration-500"
            style={{ width: `${completionPercent}%` }}
          />
        </div>
      </div>

      {/* Accordion Form Stack */}
      <div className="flex-1 space-y-4.5 pb-24">
        {sections.map((sec, idx) => {
          const Icon = sec.icon;
          const isExpanded = expandedSection === sec.key;

          return (
            <div
              key={sec.key}
              style={{
                animationDelay: `${idx * 60}ms`,
                animationFillMode: 'forwards',
              }}
              className="opacity-0 animate-stagger-fade-in bg-[#FCF9F5] border border-[#EBE6DD] rounded-2xl overflow-hidden shadow-xs hover:border-[#D6CFBC] hover:translate-y-[-1px] transition-all duration-300"
            >
              <button
                type="button"
                onClick={() => setExpandedSection(isExpanded ? null : sec.key)}
                className="w-full px-6 py-5 flex items-center justify-between text-left cursor-pointer select-none"
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4.5 h-4.5 text-zinc-400 shrink-0" />
                  <span className="font-bold text-sm text-[#1A1917] tracking-tight">{sec.label}</span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-zinc-400 transition-transform duration-300 ${
                    isExpanded ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isExpanded && (
                <div className="bg-white p-6 border-t border-[#EBE6DD]/50">
                  {sec.component}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
