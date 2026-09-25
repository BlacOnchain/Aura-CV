import React from 'react';
import { ResumeData } from '../../types/resume';
import { Mail, Phone, MapPin, Globe, Github, Linkedin, Briefcase, GraduationCap, Code2, Award, FolderGit2 } from 'lucide-react';

interface Props {
  data: ResumeData;
}

export const FlowCreativeTemplate: React.FC<Props> = ({ data }) => {
  const { personal, summary, experiences, projects, education, skillCategories, certifications, languages, settings } = data;
  const accent = settings.accentColor || '#6366f1';

  const fontClass =
    settings.fontFamily === 'serif'
      ? 'font-serif'
      : settings.fontFamily === 'mono'
      ? 'font-mono'
      : 'font-sans';

  // Get initials
  const initials = personal.fullName
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase() || 'CV';

  return (
    <div className={`w-full min-h-[900px] bg-white text-slate-800 ${fontClass} flex flex-col md:flex-row leading-normal`}>
      {/* Left Rail Sidebar */}
      <div
        className="w-full md:w-72 p-6 shrink-0 flex flex-col space-y-5 text-white"
        style={{
          background: `linear-gradient(180deg, ${accent} 0%, #1e1b4b 100%)`
        }}
      >
        {/* Monogram Badge */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center font-black text-xl text-white border border-white/30 shadow-md">
            {initials}
          </div>
          <div>
            <h1 className="text-lg font-bold text-white leading-tight">
              {personal.fullName}
            </h1>
            <p className="text-xs text-white/80 font-medium">
              {personal.title}
            </p>
          </div>
        </div>

        {/* Contact Links */}
        <div className="space-y-2 text-xs text-white/90 pt-3 border-t border-white/20">
          <div className="text-[10px] font-bold uppercase tracking-wider text-white/60">
            Contact
          </div>
          {personal.email && (
            <div className="flex items-center gap-2 break-all">
              <Mail className="w-3.5 h-3.5 text-white/70 shrink-0" />
              <a href={`mailto:${personal.email}`} className="hover:text-white transition-colors underline decoration-white/30 underline-offset-2">
                {personal.email}
              </a>
            </div>
          )}
          {personal.phone && (
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-white/70 shrink-0" />
              <span>{personal.phone}</span>
            </div>
          )}
          {personal.location && (
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-white/70 shrink-0" />
              <span>{personal.location}</span>
            </div>
          )}
          {personal.portfolioUrl && (
            <div className="flex items-center gap-2 truncate">
              <Globe className="w-3.5 h-3.5 text-white/70 shrink-0" />
              <a href={personal.portfolioUrl.startsWith('http') ? personal.portfolioUrl : `https://${personal.portfolioUrl}`} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors underline decoration-white/30 underline-offset-2">
                {personal.portfolioUrl}
              </a>
            </div>
          )}
          {personal.githubUrl && (
            <div className="flex items-center gap-2 truncate">
              <Github className="w-3.5 h-3.5 text-white/70 shrink-0" />
              <a href={personal.githubUrl.startsWith('http') ? personal.githubUrl : `https://${personal.githubUrl}`} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors underline decoration-white/30 underline-offset-2">
                {personal.githubUrl}
              </a>
            </div>
          )}
          {personal.linkedinUrl && (
            <div className="flex items-center gap-2 truncate">
              <Linkedin className="w-3.5 h-3.5 text-white/70 shrink-0" />
              <a href={personal.linkedinUrl.startsWith('http') ? personal.linkedinUrl : `https://${personal.linkedinUrl}`} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors underline decoration-white/30 underline-offset-2">
                {personal.linkedinUrl}
              </a>
            </div>
          )}
        </div>

        {/* Technical Skills Rail */}
        {skillCategories.length > 0 && (
          <div className="space-y-3 pt-3 border-t border-white/20">
            <div className="text-[10px] font-bold uppercase tracking-wider text-white/60 flex items-center gap-1.5">
              <Code2 className="w-3.5 h-3.5" />
              Skills & Stack
            </div>
            {skillCategories.map((c) => (
              <div key={c.id} className="space-y-1">
                <div className="text-[11px] font-semibold text-white/90">{c.categoryName}</div>
                <div className="flex flex-wrap gap-1">
                  {c.skillsList.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-white/15 text-white border border-white/15"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Languages Rail */}
        {settings.showLanguages && languages.length > 0 && (
          <div className="space-y-2 pt-3 border-t border-white/20">
            <div className="text-[10px] font-bold uppercase tracking-wider text-white/60">
              Languages
            </div>
            <div className="space-y-1 text-xs">
              {languages.map((l) => (
                <div key={l.id} className="flex justify-between text-white/90">
                  <span>{l.language}</span>
                  <span className="text-white/60 text-[11px]">{l.proficiency || 'Fluent'}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications Rail */}
        {settings.showCertifications && certifications.length > 0 && (
          <div className="space-y-2 pt-3 border-t border-white/20">
            <div className="text-[10px] font-bold uppercase tracking-wider text-white/60 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5" />
              Certifications
            </div>
            <div className="space-y-1.5 text-xs">
              {certifications.map((c) => (
                <div key={c.id} className="text-white/90 leading-tight">
                  <div className="font-semibold">{c.name}</div>
                  {c.issuer && <div className="text-[10px] text-white/60">{c.issuer}</div>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right Content Area */}
      <div className="flex-1 p-7 sm:p-8 space-y-6">
        {/* Executive Summary */}
        {summary && (
          <div className="space-y-1.5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              About Me
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
              {summary}
            </p>
          </div>
        )}

        {/* Experience Section */}
        {experiences.length > 0 && (
          <div className="space-y-3.5">
            <h2 className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5" style={{ color: accent }}>
              <Briefcase className="w-3.5 h-3.5" />
              Experience
            </h2>

            <div className="space-y-4">
              {experiences.map((exp) => (
                <div key={exp.id} className="space-y-1">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <span className="text-xs sm:text-sm font-bold text-slate-900">
                      {exp.role} <span className="font-normal text-slate-400">at</span> {exp.company}
                    </span>
                    <span className="text-[11px] font-medium text-slate-500 shrink-0">
                      {exp.startDate} - {exp.endDate} {exp.location ? `• ${exp.location}` : ''}
                    </span>
                  </div>

                  <ul className="space-y-1 pt-1">
                    {exp.descriptionBullets.filter(Boolean).map((bullet, idx) => (
                      <li key={idx} className="text-xs text-slate-700 flex items-start gap-2 leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: accent }} />
                        <span>{bullet}</span>
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
          <div className="space-y-3 pt-3 border-t border-slate-100">
            <h2 className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5" style={{ color: accent }}>
              <FolderGit2 className="w-3.5 h-3.5" />
              Projects
            </h2>

            <div className="space-y-3">
              {projects.map((proj) => (
                <div key={proj.id} className="space-y-0.5">
                  <div className="flex items-baseline justify-between text-xs sm:text-sm font-bold text-slate-900">
                    <span>{proj.name} {proj.subtitle && <span className="font-normal text-slate-500 text-xs">({proj.subtitle})</span>}</span>
                    <span className="text-[11px] font-medium text-slate-500">{proj.startDate} {proj.endDate ? `- ${proj.endDate}` : ''}</span>
                  </div>
                  {proj.link && <p className="text-[11px] text-indigo-600 truncate">{proj.link}</p>}
                  <ul className="space-y-1 pt-1">
                    {proj.descriptionBullets.filter(Boolean).map((b, idx) => (
                      <li key={idx} className="text-xs text-slate-700 flex items-start gap-2 leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: accent }} />
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
          <div className="space-y-2.5 pt-3 border-t border-slate-100">
            <h2 className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5" style={{ color: accent }}>
              <GraduationCap className="w-3.5 h-3.5" />
              Education
            </h2>

            <div className="space-y-2">
              {education.map((edu) => (
                <div key={edu.id} className="text-xs space-y-0.5">
                  <div className="flex items-baseline justify-between">
                    <span className="font-bold text-slate-900">{edu.degree} — {edu.institution}</span>
                    <span className="text-[11px] text-slate-500">{edu.startDate} - {edu.endDate}</span>
                  </div>
                  {edu.courseworkBullets.length > 0 && (
                    <p className="text-slate-600 text-[11px]">{edu.courseworkBullets.filter(Boolean).join(' • ')}</p>
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
