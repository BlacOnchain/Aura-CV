import React from 'react';
import { ResumeData } from '../../types/resume';

interface Props {
  data: ResumeData;
}

export const ClassicElegantTemplate: React.FC<Props> = ({ data }) => {
  const { personal, summary, experiences, projects, education, skillCategories, certifications, languages, referencesText, settings } = data;

  const accentColor = settings.accentColor || '#334155';

  return (
    <div
      className="w-full bg-white text-slate-900 font-serif leading-relaxed p-8 sm:p-11 select-text"
      style={{ minHeight: '1050px' }}
    >
      {/* Header */}
      <header className="text-center pb-4 mb-4 border-b-2 border-slate-800">
        <h1
          className="text-2xl sm:text-3xl font-bold tracking-widest uppercase"
          style={{ color: accentColor }}
        >
          {personal.fullName || 'YOUR NAME'}
        </h1>
        <p className="text-sm font-semibold tracking-wider text-slate-700 italic mt-0.5">
          {personal.title || 'Professional Title'}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 mt-2 text-xs text-slate-600 font-sans">
          {personal.email && (
            <a href={`mailto:${personal.email}`} className="hover:underline">{personal.email}</a>
          )}
          {personal.phone && (
            <span className="flex items-center">
              <span className="mx-1">•</span>
              {personal.phone}
            </span>
          )}
          {personal.location && (
            <span className="flex items-center">
              <span className="mx-1">•</span>
              {personal.location}
            </span>
          )}
          {personal.portfolioUrl && (
            <a 
              href={personal.portfolioUrl.startsWith('http') ? personal.portfolioUrl : `https://${personal.portfolioUrl}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center hover:underline"
            >
              <span className="mx-1">•</span>
              {personal.portfolioUrl}
            </a>
          )}
          {personal.twitterUrl && (
            <a 
              href={personal.twitterUrl.startsWith('http') ? personal.twitterUrl : `https://${personal.twitterUrl}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center hover:underline"
            >
              <span className="mx-1">•</span>
              {personal.twitterUrl}
            </a>
          )}
          {personal.githubUrl && (
            <a 
              href={personal.githubUrl.startsWith('http') ? personal.githubUrl : `https://${personal.githubUrl}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center hover:underline"
            >
              <span className="mx-1">•</span>
              {personal.githubUrl}
            </a>
          )}
          {personal.linkedinUrl && (
            <a 
              href={personal.linkedinUrl.startsWith('http') ? personal.linkedinUrl : `https://${personal.linkedinUrl}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center hover:underline"
            >
              <span className="mx-1">•</span>
              {personal.linkedinUrl}
            </a>
          )}
        </div>
      </header>

      {/* Summary */}
      {summary && (
        <section className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-400 pb-0.5 mb-1.5 font-sans">
            Executive Summary
          </h2>
          <p className="text-xs text-slate-800 leading-relaxed text-justify">
            {summary}
          </p>
        </section>
      )}

      {/* Experience */}
      {experiences.length > 0 && (
        <section className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-400 pb-0.5 mb-2 font-sans">
            Professional Experience
          </h2>
          <div className="space-y-3.5">
            {experiences.map((exp) => (
              <div key={exp.id} className="text-xs">
                <div className="flex justify-between items-baseline font-sans">
                  <div>
                    <strong className="text-slate-950 font-bold">{exp.role}</strong>
                    <span className="italic text-slate-700">, {exp.company}</span>
                  </div>
                  <div className="text-slate-700 font-medium">
                    {exp.startDate} – {exp.isCurrent ? 'Present' : exp.endDate}
                  </div>
                </div>
                {exp.location && (
                  <div className="text-[11px] text-slate-500 font-sans italic">{exp.location}</div>
                )}
                <ul className="mt-1 space-y-0.5 list-disc list-outside ml-4 text-slate-800 leading-normal">
                  {exp.descriptionBullets
                    .filter((b) => b.trim().length > 0)
                    .map((bullet, idx) => (
                      <li key={idx}>{bullet}</li>
                    ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {settings.showProjects && projects.length > 0 && (
        <section className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-400 pb-0.5 mb-2 font-sans">
            Selected Projects & Systems
          </h2>
          <div className="space-y-2.5 text-xs">
            {projects.map((proj) => (
              <div key={proj.id}>
                <div className="flex justify-between items-baseline font-sans">
                  <div>
                    <strong className="text-slate-950 font-bold">{proj.name}</strong>
                    {proj.subtitle && <span className="italic text-slate-600"> ({proj.subtitle})</span>}
                  </div>
                  <div className="text-slate-600 font-medium">
                    {proj.startDate} – {proj.endDate}
                  </div>
                </div>
                <ul className="mt-0.5 space-y-0.5 list-disc list-outside ml-4 text-slate-800 leading-normal">
                  {proj.descriptionBullets
                    .filter((b) => b.trim().length > 0)
                    .map((b, idx) => (
                      <li key={idx}>{b}</li>
                    ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-400 pb-0.5 mb-2 font-sans">
            Education
          </h2>
          {education.map((edu) => (
            <div key={edu.id} className="text-xs">
              <div className="flex justify-between items-baseline font-sans">
                <div>
                  <strong className="text-slate-950 font-bold">{edu.degree}</strong>
                  <span className="italic text-slate-700">, {edu.institution}</span>
                </div>
                <div className="text-slate-600">
                  {edu.startDate} – {edu.endDate}
                </div>
              </div>
              <ul className="mt-1 space-y-0.5 list-disc list-outside ml-4 text-slate-800">
                {edu.courseworkBullets
                  .filter((b) => b.trim().length > 0)
                  .map((b, idx) => (
                    <li key={idx}>{b}</li>
                  ))}
              </ul>
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      {skillCategories.length > 0 && (
        <section className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-400 pb-0.5 mb-2 font-sans">
            Core Competencies & Skills
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 text-xs">
            {skillCategories.map((c) => (
              <div key={c.id}>
                <span className="font-bold text-slate-950 font-sans">{c.categoryName}: </span>
                <span className="text-slate-800">{c.description || c.skillsList.join(', ')}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Footer / Languages */}
      {settings.showLanguages && languages.length > 0 && (
        <div className="text-xs text-slate-700 font-sans pt-1">
          <strong className="text-slate-950">Languages: </strong>
          {languages.map((l) => `${l.language}${l.proficiency ? ` (${l.proficiency})` : ''}`).join(', ')}
        </div>
      )}

      {settings.showReferences && referencesText && (
        <div className="text-xs text-slate-500 font-sans italic text-center mt-4 pt-2 border-t border-slate-200">
          {referencesText}
        </div>
      )}
    </div>
  );
};
