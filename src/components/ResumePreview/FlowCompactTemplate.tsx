import React from 'react';
import { ResumeData } from '../../types/resume';
import { Mail, Phone, MapPin, Globe, Github, Linkedin } from 'lucide-react';

interface Props {
  data: ResumeData;
}

export const FlowCompactTemplate: React.FC<Props> = ({ data }) => {
  const { personal, summary, experiences, projects, education, skillCategories, certifications, languages, settings } = data;
  const accent = settings.accentColor || '#0f172a';

  const fontClass =
    settings.fontFamily === 'serif'
      ? 'font-serif'
      : settings.fontFamily === 'mono'
      ? 'font-mono'
      : 'font-sans';

  return (
    <div className={`w-full bg-white text-slate-800 ${fontClass} p-7 text-[12px] leading-snug`}>
      {/* Header */}
      <div className="pb-3 border-b-2" style={{ borderColor: accent }}>
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
          <div>
            <h1 className="text-2xl font-black tracking-tight text-slate-950 uppercase">
              {personal.fullName || 'Your Name'}
            </h1>
            <p className="text-sm font-semibold tracking-wide" style={{ color: accent }}>
              {personal.title}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-slate-600 sm:text-right">
            {personal.email && (
              <a href={`mailto:${personal.email}`} className="flex items-center gap-1 hover:text-slate-900 transition-colors">
                <Mail className="w-3 h-3 text-slate-400" />
                {personal.email}
              </a>
            )}
            {personal.phone && (
              <span className="flex items-center gap-1">
                <Phone className="w-3 h-3 text-slate-400" />
                {personal.phone}
              </span>
            )}
            {personal.location && (
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-slate-400" />
                {personal.location}
              </span>
            )}
            {personal.portfolioUrl && (
              <a 
                href={personal.portfolioUrl.startsWith('http') ? personal.portfolioUrl : `https://${personal.portfolioUrl}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:text-slate-900 transition-colors"
              >
                <Globe className="w-3 h-3 text-slate-400" />
                {personal.portfolioUrl}
              </a>
            )}
            {personal.githubUrl && (
              <a 
                href={personal.githubUrl.startsWith('http') ? personal.githubUrl : `https://${personal.githubUrl}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:text-slate-900 transition-colors"
              >
                <Github className="w-3 h-3 text-slate-400" />
                {personal.githubUrl}
              </a>
            )}
            {personal.linkedinUrl && (
              <a 
                href={personal.linkedinUrl.startsWith('http') ? personal.linkedinUrl : `https://${personal.linkedinUrl}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:text-slate-900 transition-colors"
              >
                <Linkedin className="w-3 h-3 text-slate-400" />
                {personal.linkedinUrl}
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="mt-3.5 space-y-3.5">
        {/* Summary */}
        {summary && (
          <div>
            <p className="text-slate-700 leading-relaxed text-[11.5px] italic">
              {summary}
            </p>
          </div>
        )}

        {/* Technical Skills - Compact Bar */}
        {skillCategories.length > 0 && (
          <div>
            <h2 className="text-[11px] font-black uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-0.5 mb-1.5 flex items-center justify-between">
              <span>Technical Skills & Tools</span>
              <span className="text-[9px] font-normal text-slate-400 lowercase">industry standards</span>
            </h2>
            <div className="space-y-1 text-[11px]">
              {skillCategories.map((c) => (
                <div key={c.id} className="flex flex-col sm:flex-row sm:items-baseline gap-1">
                  <span className="font-bold text-slate-900 shrink-0 sm:w-44">
                    {c.categoryName}:
                  </span>
                  <span className="text-slate-700">
                    {c.skillsList.join(' • ')}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Experience */}
        {experiences.length > 0 && (
          <div>
            <h2 className="text-[11px] font-black uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-0.5 mb-2">
              Work Experience
            </h2>
            <div className="space-y-2.5">
              {experiences.map((exp) => (
                <div key={exp.id}>
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="font-bold text-slate-950 text-[12px]">
                      {exp.role} <span className="text-slate-400 font-normal">|</span>{' '}
                      <span style={{ color: accent }}>{exp.company}</span>
                    </span>
                    <span className="text-[10.5px] text-slate-500 font-medium shrink-0">
                      {exp.startDate} – {exp.endDate} {exp.location ? `• ${exp.location}` : ''}
                    </span>
                  </div>

                  <ul className="mt-1 space-y-0.5 list-disc pl-4 text-slate-700 text-[11px]">
                    {exp.descriptionBullets.filter(Boolean).map((bullet, idx) => (
                      <li key={idx} className="leading-snug">
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {settings.showProjects && projects.length > 0 && (
          <div>
            <h2 className="text-[11px] font-black uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-0.5 mb-2">
              Projects & Engineering Systems
            </h2>
            <div className="space-y-2">
              {projects.map((proj) => (
                <div key={proj.id}>
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="font-bold text-slate-900 text-[12px]">
                      {proj.name}{' '}
                      {proj.subtitle && (
                        <span className="font-normal text-slate-500 text-[11px]">({proj.subtitle})</span>
                      )}
                    </span>
                    <span className="text-[10.5px] text-slate-500 font-medium shrink-0">
                      {proj.startDate} {proj.endDate ? `– ${proj.endDate}` : ''}
                    </span>
                  </div>
                  {proj.link && (
                    <div className="text-[10px] truncate" style={{ color: accent }}>{proj.link}</div>
                  )}

                  <ul className="mt-1 space-y-0.5 list-disc pl-4 text-slate-700 text-[11px]">
                    {proj.descriptionBullets.filter(Boolean).map((b, idx) => (
                      <li key={idx} className="leading-snug">
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div>
            <h2 className="text-[11px] font-black uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-0.5 mb-1.5">
              Education
            </h2>
            <div className="space-y-1.5">
              {education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex items-baseline justify-between gap-2">
                    <div>
                      <span className="font-bold text-slate-950 text-[12px]">{edu.degree}</span>
                      <span className="text-slate-600 text-[11px]"> — {edu.institution}</span>
                    </div>
                    <span className="text-[10.5px] text-slate-500 font-medium shrink-0">
                      {edu.startDate} – {edu.endDate} {edu.location ? `• ${edu.location}` : ''}
                    </span>
                  </div>
                  {edu.courseworkBullets.length > 0 && (
                    <p className="text-[10.5px] text-slate-600 pl-3 border-l border-slate-200 mt-0.5">
                      {edu.courseworkBullets.filter(Boolean).join(' • ')}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications & Languages */}
        {((settings.showCertifications && certifications.length > 0) || (settings.showLanguages && languages.length > 0)) && (
          <div className="flex flex-col sm:flex-row gap-4 pt-1 border-t border-slate-200 text-[11px]">
            {settings.showCertifications && certifications.length > 0 && (
              <div className="flex-1">
                <span className="font-bold text-slate-900">Certifications: </span>
                <span className="text-slate-700">
                  {certifications.map((c) => c.name).join(' • ')}
                </span>
              </div>
            )}
            {settings.showLanguages && languages.length > 0 && (
              <div className="flex-1">
                <span className="font-bold text-slate-900">Languages: </span>
                <span className="text-slate-700">
                  {languages.map((l) => `${l.language} (${l.proficiency || 'Proficient'})`).join(' • ')}
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
