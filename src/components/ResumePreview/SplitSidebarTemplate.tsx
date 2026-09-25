import React from 'react';
import { ResumeData } from '../../types/resume';
import { Mail, Phone, MapPin, Globe, Twitter, Github, Linkedin, Award, Languages } from 'lucide-react';

interface Props {
  data: ResumeData;
}

export const SplitSidebarTemplate: React.FC<Props> = ({ data }) => {
  const { personal, summary, experiences, projects, education, skillCategories, certifications, languages, referencesText, settings } = data;

  const accentColor = settings.accentColor || '#1e293b';

  return (
    <div
      className="w-full bg-white text-slate-800 font-sans grid grid-cols-12 min-h-[1050px] select-text shadow-sm"
    >
      {/* Left Sidebar (35% on desktop, 4 columns) */}
      <aside className="col-span-12 sm:col-span-4 bg-slate-900 text-slate-100 p-6 sm:p-7 space-y-6 flex flex-col justify-between">
        <div className="space-y-6">
          {/* Candidate Name in Sidebar */}
          <div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white uppercase">
              {personal.fullName || 'YOUR NAME'}
            </h1>
            <p className="text-xs sm:text-sm font-semibold text-indigo-300 mt-1">
              {personal.title || 'Backend Developer'}
            </p>
          </div>

          {/* Contact Details */}
          <div className="space-y-2.5 text-xs text-slate-300 border-t border-slate-700/80 pt-4">
            <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Contact & Links
            </h3>
            {personal.email && (
              <div className="flex items-center gap-2 break-all">
                <Mail className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                <span>{personal.email}</span>
              </div>
            )}
            {personal.phone && (
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                <span>{personal.phone}</span>
              </div>
            )}
            {personal.location && (
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                <span>{personal.location}</span>
              </div>
            )}
            {personal.portfolioUrl && (
              <div className="flex items-center gap-2 break-all">
                <Globe className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                <a href={personal.portfolioUrl.startsWith('http') ? personal.portfolioUrl : `https://${personal.portfolioUrl}`} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  {personal.portfolioUrl}
                </a>
              </div>
            )}
            {personal.githubUrl && (
              <div className="flex items-center gap-2 break-all">
                <Github className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                <a href={personal.githubUrl.startsWith('http') ? personal.githubUrl : `https://${personal.githubUrl}`} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  {personal.githubUrl}
                </a>
              </div>
            )}
            {personal.twitterUrl && (
              <div className="flex items-center gap-2">
                <Twitter className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                <a href={personal.twitterUrl.startsWith('http') ? personal.twitterUrl : `https://${personal.twitterUrl}`} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  {personal.twitterUrl}
                </a>
              </div>
            )}
          </div>

          {/* Core Skills in Sidebar */}
          {skillCategories.length > 0 && (
            <div className="space-y-3 border-t border-slate-700/80 pt-4 text-xs">
              <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Skills & Tech
              </h3>
              {skillCategories.map((cat) => (
                <div key={cat.id} className="space-y-1">
                  <div className="font-semibold text-white text-[11.5px]">
                    {cat.categoryName}
                  </div>
                  {cat.skillsList.length > 0 && (
                    <div className="flex flex-wrap gap-1 pt-0.5">
                      {cat.skillsList.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-1.5 py-0.5 text-[10px] bg-slate-800 text-slate-200 rounded border border-slate-700"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Education in Sidebar */}
          {education.length > 0 && (
            <div className="space-y-2 border-t border-slate-700/80 pt-4 text-xs">
              <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Education
              </h3>
              {education.map((edu) => (
                <div key={edu.id} className="space-y-0.5">
                  <div className="font-semibold text-white">{edu.degree}</div>
                  <div className="text-slate-400 text-[11px]">{edu.institution}</div>
                  <div className="text-indigo-300 text-[10.5px]">
                    {edu.startDate} – {edu.endDate}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Certifications & Languages in Sidebar */}
          {settings.showCertifications && certifications.length > 0 && (
            <div className="space-y-1.5 border-t border-slate-700/80 pt-4 text-xs">
              <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Certifications
              </h3>
              {certifications.map((c) => (
                <div key={c.id} className="text-slate-300 text-[11px]">
                  • <strong className="text-white">{c.name}</strong> {c.issuer && `(${c.issuer})`}
                </div>
              ))}
            </div>
          )}

          {settings.showLanguages && languages.length > 0 && (
            <div className="space-y-1 border-t border-slate-700/80 pt-4 text-xs">
              <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Languages
              </h3>
              <div className="text-slate-300 text-[11px]">
                {languages.map((l) => `${l.language} (${l.proficiency || 'Fluent'})`).join(', ')}
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Main Right Column (65%, 8 columns) */}
      <main className="col-span-12 sm:col-span-8 p-6 sm:p-8 space-y-5">
        {/* Summary */}
        {summary && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 mb-2">
              Professional Profile
            </h2>
            <p className="text-xs text-slate-700 leading-relaxed text-justify">
              {summary}
            </p>
          </section>
        )}

        {/* Experience */}
        {experiences.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 mb-3">
              Work Experience
            </h2>

            <div className="space-y-4">
              {experiences.map((exp) => (
                <div key={exp.id} className="text-xs space-y-1">
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-slate-900 text-[12.5px]">{exp.role}</span>
                    <span className="text-slate-500 font-medium text-[11px]">
                      {exp.startDate} – {exp.isCurrent ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <div className="font-semibold text-[11.5px]" style={{ color: accentColor }}>
                    {exp.company} {exp.location && `• ${exp.location}`}
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
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 mb-3">
              Featured Projects
            </h2>

            <div className="space-y-3 text-xs">
              {projects.map((proj) => (
                <div key={proj.id} className="space-y-0.5">
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-slate-900">
                      {proj.name} {proj.subtitle && <span className="font-normal text-slate-500 italic">({proj.subtitle})</span>}
                    </span>
                    <span className="text-slate-500 text-[11px]">
                      {proj.startDate} – {proj.endDate}
                    </span>
                  </div>
                  {proj.link && (
                    <div className="text-[11px] font-mono" style={{ color: accentColor }}>{proj.link}</div>
                  )}
                  <ul className="mt-1 space-y-0.5 list-disc list-outside ml-3.5 text-slate-700 leading-relaxed">
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

        {settings.showReferences && referencesText && (
          <div className="pt-3 border-t border-slate-200 text-xs text-slate-500 italic">
            {referencesText}
          </div>
        )}
      </main>
    </div>
  );
};
