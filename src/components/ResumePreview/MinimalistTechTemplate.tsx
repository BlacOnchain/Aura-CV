import React from 'react';
import { ResumeData } from '../../types/resume';
import { Mail, Phone, Globe, Twitter, Github, Linkedin, ExternalLink, Terminal } from 'lucide-react';

interface Props {
  data: ResumeData;
}

export const MinimalistTechTemplate: React.FC<Props> = ({ data }) => {
  const { personal, summary, experiences, projects, education, skillCategories, certifications, languages, referencesText, settings } = data;

  const accentColor = settings.accentColor || '#2563eb';

  return (
    <div
      className="w-full bg-white text-slate-800 font-sans leading-normal p-8 sm:p-10 select-text"
      style={{ minHeight: '1050px' }}
    >
      {/* Header */}
      <header className="pb-5 mb-5 border-b border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
              {personal.fullName || 'YOUR NAME'}
            </h1>
            <p className="text-sm font-semibold text-slate-600 font-mono mt-0.5" style={{ color: accentColor }}>
              {personal.title || 'Software Engineer'}
            </p>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 text-emerald-700 text-xs font-medium rounded-full border border-emerald-200/60 self-start">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Available for Opportunities</span>
          </div>
        </div>

        {/* Contact links */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-3 text-xs text-slate-600 font-mono">
          {personal.email && (
            <a href={`mailto:${personal.email}`} className="flex items-center gap-1 hover:text-slate-900 hover:underline">
              <Mail className="w-3.5 h-3.5" /> {personal.email}
            </a>
          )}
          {personal.phone && (
            <a href={`tel:${personal.phone}`} className="flex items-center gap-1 hover:text-slate-900 hover:underline">
              <Phone className="w-3.5 h-3.5" /> {personal.phone}
            </a>
          )}
          {personal.location && (
            <span className="text-slate-500">📍 {personal.location}</span>
          )}
          {personal.portfolioUrl && (
            <a 
              href={personal.portfolioUrl.startsWith('http') ? personal.portfolioUrl : `https://${personal.portfolioUrl}`} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-1 text-slate-700 hover:underline"
            >
              <Globe className="w-3.5 h-3.5" /> {personal.portfolioUrl}
            </a>
          )}
          {personal.githubUrl && (
            <a 
              href={personal.githubUrl.startsWith('http') ? personal.githubUrl : `https://${personal.githubUrl}`} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-1 text-slate-700 hover:underline"
            >
              <Github className="w-3.5 h-3.5" /> {personal.githubUrl}
            </a>
          )}
          {personal.twitterUrl && (
            <a 
              href={personal.twitterUrl.startsWith('http') ? personal.twitterUrl : `https://${personal.twitterUrl}`} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-1 text-slate-700 hover:underline"
            >
              <Twitter className="w-3.5 h-3.5" /> {personal.twitterUrl}
            </a>
          )}
        </div>
      </header>

      {/* Summary */}
      {summary && (
        <section className="mb-5">
          <div className="flex items-center gap-1.5 mb-1.5">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900">
              // 01. Profile Summary
            </span>
          </div>
          <p className="text-xs text-slate-700 leading-relaxed bg-slate-50/70 p-3 rounded-md border border-slate-100">
            {summary}
          </p>
        </section>
      )}

      {/* Skills Badges First in Tech template */}
      {skillCategories.length > 0 && (
        <section className="mb-5">
          <div className="flex items-center gap-1.5 mb-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900">
              // 02. Technical Arsenal & Skills
            </span>
          </div>

          <div className="space-y-2.5">
            {skillCategories.map((cat) => (
              <div key={cat.id} className="text-xs">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="font-bold text-slate-900 font-mono text-[11px]">
                    {cat.categoryName}:
                  </span>
                  {cat.description && (
                    <span className="text-slate-500 text-[11px]">
                      {cat.description}
                    </span>
                  )}
                </div>
                {cat.skillsList.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {cat.skillsList.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-2 py-0.5 text-[11px] font-mono bg-slate-100 text-slate-800 rounded-sm border border-slate-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Experience */}
      {experiences.length > 0 && (
        <section className="mb-5">
          <div className="flex items-center gap-1.5 mb-2.5">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900">
              // 03. Engineering Experience
            </span>
          </div>

          <div className="space-y-4">
            {experiences.map((exp) => (
              <div
                key={exp.id}
                className="text-xs border-l-2 pl-3 py-0.5 space-y-1"
                style={{ borderColor: accentColor }}
              >
                <div className="flex justify-between items-baseline">
                  <div>
                    <span className="font-bold text-slate-900 text-[13px]">{exp.role}</span>
                    <span className="text-slate-600 font-medium"> @ {exp.company}</span>
                  </div>
                  <div className="text-right shrink-0 font-mono text-[11px] text-slate-600">
                    {exp.startDate} – {exp.isCurrent ? 'Present' : exp.endDate}
                    {exp.location && ` • ${exp.location}`}
                  </div>
                </div>

                <ul className="mt-1 space-y-1 list-disc list-outside ml-3.5 text-slate-700 leading-relaxed">
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
        <section className="mb-5">
          <div className="flex items-center gap-1.5 mb-2.5">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900">
              // 04. Key Projects & Systems
            </span>
          </div>

          <div className="grid grid-cols-1 gap-3 text-xs">
            {projects.map((proj) => (
              <div key={proj.id} className="p-3 bg-slate-50/50 rounded-lg border border-slate-200">
                <div className="flex justify-between items-baseline mb-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900">{proj.name}</span>
                    {proj.subtitle && (
                      <span className="text-[11px] px-1.5 py-0.2 bg-slate-200 text-slate-700 rounded-sm font-mono">
                        {proj.subtitle}
                      </span>
                    )}
                    {proj.link && (
                      <span className="text-[10px] text-slate-500 font-mono">({proj.link})</span>
                    )}
                  </div>
                  <div className="text-right text-[11px] font-mono text-slate-500">
                    {proj.startDate} – {proj.endDate}
                  </div>
                </div>

                <ul className="space-y-0.5 list-disc list-outside ml-3.5 text-slate-700 leading-relaxed">
                  {proj.descriptionBullets
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

      {/* Education & Certs in 2 columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        {education.length > 0 && (
          <section>
            <div className="flex items-center gap-1.5 mb-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900">
                // 05. Education
              </span>
            </div>
            {education.map((edu) => (
              <div key={edu.id} className="space-y-1">
                <div className="font-bold text-slate-900">{edu.degree}</div>
                <div className="text-slate-600">{edu.institution} ({edu.startDate} – {edu.endDate})</div>
                <ul className="mt-1 space-y-0.5 list-disc list-outside ml-3.5 text-slate-700 text-[11.5px]">
                  {edu.courseworkBullets
                    .filter((b) => b.trim().length > 0)
                    .map((bullet, idx) => (
                      <li key={idx}>{bullet}</li>
                    ))}
                </ul>
              </div>
            ))}
          </section>
        )}

        <div>
          {settings.showCertifications && certifications.length > 0 && (
            <section className="mb-3">
              <div className="flex items-center gap-1.5 mb-1.5">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900">
                  // 06. Certifications
                </span>
              </div>
              <ul className="space-y-1 text-slate-700 text-[11.5px]">
                {certifications.map((c) => (
                  <li key={c.id}>
                    • <strong className="text-slate-900">{c.name}</strong> {c.issuer && `— ${c.issuer}`}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {settings.showLanguages && languages.length > 0 && (
            <section>
              <div className="flex items-center gap-1.5 mb-1.5">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900">
                  // 07. Languages
                </span>
              </div>
              <div className="flex flex-wrap gap-2 text-[11.5px] text-slate-700">
                {languages.map((l) => (
                  <span key={l.id} className="font-mono bg-slate-100 px-2 py-0.5 rounded-sm">
                    {l.language} {l.proficiency && `(${l.proficiency})`}
                  </span>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>

      {settings.showReferences && referencesText && (
        <div className="mt-5 pt-3 border-t border-slate-200 text-center text-xs text-slate-500 font-mono">
          {referencesText}
        </div>
      )}
    </div>
  );
};
