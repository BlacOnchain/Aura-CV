import React from 'react';
import { ResumeData } from '../../types/resume';
import { Mail, Phone, MapPin, Globe, Github, Linkedin } from 'lucide-react';

interface Props {
  data: ResumeData;
}

export const FlowNordicTemplate: React.FC<Props> = ({ data }) => {
  const { personal, summary, experiences, projects, education, skillCategories, certifications, languages, settings } = data;
  const accent = settings.accentColor || '#1e293b';

  const fontClass =
    settings.fontFamily === 'serif'
      ? 'font-serif'
      : settings.fontFamily === 'mono'
      ? 'font-mono'
      : 'font-sans';

  return (
    <div className={`w-full bg-white text-slate-800 ${fontClass} p-8 sm:p-10 leading-relaxed`}>
      {/* Nordic Minimal Header */}
      <div className="pb-6 border-b border-slate-200">
        <h1 className="text-3xl font-light tracking-wide text-slate-900 uppercase">
          <span className="font-semibold">{personal.fullName.split(' ')[0]}</span>{' '}
          {personal.fullName.split(' ').slice(1).join(' ')}
        </h1>
        <p className="text-xs uppercase tracking-widest font-semibold mt-1" style={{ color: accent }}>
          {personal.title}
        </p>

        <div className="flex flex-wrap gap-x-4 gap-y-1.5 mt-3 text-xs text-slate-500 font-light">
          {personal.email && (
            <a href={`mailto:${personal.email}`} className="flex items-center gap-1.5 hover:text-slate-900 transition-colors">
              <Mail className="w-3 h-3 text-slate-400" />
              {personal.email}
            </a>
          )}
          {personal.phone && (
            <span className="flex items-center gap-1.5">
              <Phone className="w-3 h-3 text-slate-400" />
              {personal.phone}
            </span>
          )}
          {personal.location && (
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3 h-3 text-slate-400" />
              {personal.location}
            </span>
          )}
          {personal.portfolioUrl && (
            <a 
              href={personal.portfolioUrl.startsWith('http') ? personal.portfolioUrl : `https://${personal.portfolioUrl}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-slate-900 transition-colors"
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
              className="flex items-center gap-1.5 hover:text-slate-900 transition-colors"
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
              className="flex items-center gap-1.5 hover:text-slate-900 transition-colors"
            >
              <Linkedin className="w-3 h-3 text-slate-400" />
              {personal.linkedinUrl}
            </a>
          )}
        </div>
      </div>

      <div className="space-y-6 pt-6">
        {/* Profile */}
        {summary && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <div className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
              Profile
            </div>
            <div className="md:col-span-3 text-xs sm:text-sm text-slate-700 font-normal leading-relaxed">
              {summary}
            </div>
          </div>
        )}

        {/* Experience */}
        {experiences.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 pt-4 border-t border-slate-100">
            <div className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
              Experience
            </div>
            <div className="md:col-span-3 space-y-4">
              {experiences.map((exp) => (
                <div key={exp.id} className="space-y-1">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <span className="text-xs sm:text-sm font-semibold text-slate-900">
                      {exp.role} <span className="font-light text-slate-400">—</span> {exp.company}
                    </span>
                    <span className="text-[11px] text-slate-400 font-light shrink-0">
                      {exp.startDate} – {exp.endDate}
                    </span>
                  </div>

                  <ul className="space-y-1 pt-1">
                    {exp.descriptionBullets.filter(Boolean).map((bullet, idx) => (
                      <li key={idx} className="text-xs text-slate-600 flex items-start gap-2 leading-relaxed">
                        <span className="text-slate-300 font-bold select-none">—</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {skillCategories.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 pt-4 border-t border-slate-100">
            <div className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
              Expertise
            </div>
            <div className="md:col-span-3 space-y-2">
              {skillCategories.map((cat) => (
                <div key={cat.id} className="text-xs">
                  <span className="font-semibold text-slate-800">{cat.categoryName}: </span>
                  <span className="text-slate-600 font-light">{cat.skillsList.join(', ')}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {settings.showProjects && projects.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 pt-4 border-t border-slate-100">
            <div className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
              Selected Work
            </div>
            <div className="md:col-span-3 space-y-3">
              {projects.map((proj) => (
                <div key={proj.id} className="space-y-0.5">
                  <div className="flex items-baseline justify-between text-xs sm:text-sm font-semibold text-slate-900">
                    <span>{proj.name} {proj.subtitle && <span className="font-light text-slate-400 text-xs">({proj.subtitle})</span>}</span>
                    <span className="text-[11px] font-light text-slate-400">{proj.startDate} {proj.endDate ? `– ${proj.endDate}` : ''}</span>
                  </div>
                  {proj.link && <p className="text-[11px] text-slate-400">{proj.link}</p>}
                  <ul className="space-y-1 pt-1">
                    {proj.descriptionBullets.filter(Boolean).map((b, idx) => (
                      <li key={idx} className="text-xs text-slate-600 flex items-start gap-2">
                        <span className="text-slate-300 font-bold select-none">—</span>
                        <span>{b}</span>
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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 pt-4 border-t border-slate-100">
            <div className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
              Education
            </div>
            <div className="md:col-span-3 space-y-2">
              {education.map((edu) => (
                <div key={edu.id} className="text-xs space-y-0.5">
                  <div className="flex items-baseline justify-between">
                    <span className="font-semibold text-slate-900">{edu.degree} — {edu.institution}</span>
                    <span className="text-[11px] font-light text-slate-400">{edu.startDate} – {edu.endDate}</span>
                  </div>
                  {edu.courseworkBullets.length > 0 && (
                    <p className="text-slate-500 font-light">{edu.courseworkBullets.filter(Boolean).join(' • ')}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
