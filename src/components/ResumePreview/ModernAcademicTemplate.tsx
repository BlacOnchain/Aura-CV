import React from 'react';
import { ResumeData } from '../../types/resume';
import { Mail, Phone, MapPin, Globe, Linkedin, BookOpen } from 'lucide-react';

interface Props {
  data: ResumeData;
}

export const ModernAcademicTemplate: React.FC<Props> = ({ data }) => {
  const { personal, summary, experiences, education, skillCategories, certifications, languages, settings, projects } = data;

  const fontClass =
    settings.fontFamily === 'serif'
      ? 'font-serif'
      : settings.fontFamily === 'mono'
      ? 'font-mono'
      : 'font-sans';

  const accentColor = settings.accentColor || '#1e293b';

  return (
    <div className={`w-full bg-white text-slate-800 ${fontClass} leading-relaxed p-12 select-text`} style={{ minHeight: '1050px' }}>
      {/* Refined Centered Header */}
      <header className="text-center mb-12 border-b-2 border-slate-100 pb-10">
        <h1 className="text-3xl font-light tracking-[0.2em] uppercase text-slate-900 mb-4">
          {personal.fullName || 'FULL NAME'}
        </h1>
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="h-[1px] w-12 bg-slate-200" />
          <p className="text-sm font-medium tracking-[0.3em] uppercase text-slate-500 italic">
            {personal.title || 'Professional Title'}
          </p>
          <div className="h-[1px] w-12 bg-slate-200" />
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-[11px] font-bold text-slate-500 uppercase tracking-widest">
          {personal.email && (
            <div className="flex items-center gap-1.5 hover:text-slate-900 transition-colors">
              <Mail className="w-3 h-3" style={{ color: accentColor }} />
              <a href={`mailto:${personal.email}`} className="hover:underline">{personal.email}</a>
            </div>
          )}
          {personal.phone && (
            <div className="flex items-center gap-1.5 hover:text-slate-900 transition-colors">
              <Phone className="w-3 h-3" style={{ color: accentColor }} />
              <a href={`tel:${personal.phone}`} className="hover:underline">{personal.phone}</a>
            </div>
          )}
          {personal.location && (
            <div className="flex items-center gap-1.5 hover:text-slate-900 transition-colors">
              <MapPin className="w-3 h-3" style={{ color: accentColor }} />
              <span>{personal.location}</span>
            </div>
          )}
          {personal.linkedinUrl && (
            <div className="flex items-center gap-1.5 hover:text-slate-900 transition-colors">
              <Linkedin className="w-3 h-3" style={{ color: accentColor }} />
              <span>LinkedIn</span>
            </div>
          )}
        </div>
      </header>

      <div className="space-y-10 max-w-4xl mx-auto">
        {/* Summary */}
        {summary && (
          <section>
            <div className="flex items-center gap-4 mb-4">
              <h2 className="text-xs font-black uppercase tracking-[0.25em] text-slate-900 shrink-0">Profile</h2>
              <div className="h-[1px] w-full bg-slate-100" />
            </div>
            <p className="text-[13px] text-slate-600 leading-relaxed text-justify px-2">
              {summary}
            </p>
          </section>
        )}

        {/* Education First (Academic Style) */}
        {education.length > 0 && (
          <section>
            <div className="flex items-center gap-4 mb-6">
              <h2 className="text-xs font-black uppercase tracking-[0.25em] text-slate-900 shrink-0">Education</h2>
              <div className="h-[1px] w-full bg-slate-100" />
            </div>
            <div className="space-y-6 px-2">
              {education.map((edu) => (
                <div key={edu.id} className="grid grid-cols-12 gap-4">
                  <div className="col-span-3 text-[10px] font-black text-slate-400 uppercase tracking-widest pt-1">
                    {edu.startDate} — {edu.endDate}
                  </div>
                  <div className="col-span-9">
                    <h3 className="text-sm font-black text-slate-900 mb-1">{edu.degree}</h3>
                    <p className="text-[12px] font-bold text-slate-500 italic">{edu.institution}</p>
                    {edu.courseworkBullets.length > 0 && (
                      <ul className="mt-2 space-y-1">
                        {edu.courseworkBullets.filter(b => b.trim()).map((bullet, idx) => (
                          <li key={idx} className="text-[11px] text-slate-600 list-none flex items-start gap-2">
                            <span className="text-slate-300 mt-0.5">•</span>
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Experience */}
        {experiences.length > 0 && (
          <section>
            <div className="flex items-center gap-4 mb-6">
              <h2 className="text-xs font-black uppercase tracking-[0.25em] text-slate-900 shrink-0">Professional Experience</h2>
              <div className="h-[1px] w-full bg-slate-100" />
            </div>
            <div className="space-y-8 px-2">
              {experiences.map((exp) => (
                <div key={exp.id} className="grid grid-cols-12 gap-4">
                  <div className="col-span-3 text-[10px] font-black text-slate-400 uppercase tracking-widest pt-1">
                    {exp.startDate} — {exp.isCurrent ? 'Present' : exp.endDate}
                  </div>
                  <div className="col-span-9">
                    <h3 className="text-sm font-black text-slate-900 mb-1">{exp.role}</h3>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-[12px] font-bold text-slate-500 italic">{exp.company}</span>
                      <span className="w-1 h-1 rounded-full bg-slate-200" />
                      <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">{exp.location}</span>
                    </div>
                    <ul className="space-y-2">
                      {exp.descriptionBullets.filter(b => b.trim()).map((bullet, idx) => (
                        <li key={idx} className="text-[12px] text-slate-600 leading-snug flex items-start gap-2">
                          <span className="text-slate-300 mt-1.5">•</span>
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Core Competencies (Grid) */}
        {skillCategories.length > 0 && (
          <section>
            <div className="flex items-center gap-4 mb-6">
              <h2 className="text-xs font-black uppercase tracking-[0.25em] text-slate-900 shrink-0">Expertise</h2>
              <div className="h-[1px] w-full bg-slate-100" />
            </div>
            <div className="grid grid-cols-2 gap-8 px-2">
              {skillCategories.map((cat) => (
                <div key={cat.id}>
                  <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 border-b border-slate-50 pb-1">{cat.categoryName}</h3>
                  <p className="text-[12px] text-slate-600 font-medium leading-relaxed">
                    {cat.skillsList.join(' · ')}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Certifications & Languages (Two Column) */}
        <div className="grid grid-cols-2 gap-12 px-2">
          {certifications.length > 0 && settings.showCertifications && (
            <section>
              <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-3 border-b border-slate-50 pb-1">Recognition</h2>
              <div className="space-y-3">
                {certifications.map((cert) => (
                  <div key={cert.id}>
                    <p className="text-[11px] font-bold text-slate-800">{cert.name}</p>
                    <p className="text-[9px] font-medium text-slate-400 uppercase">{cert.issuer} · {cert.date}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {languages.length > 0 && settings.showLanguages && (
            <section>
              <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-3 border-b border-slate-50 pb-1">Languages</h2>
              <div className="space-y-2">
                {languages.map((lang) => (
                  <div key={lang.id} className="flex justify-between items-center text-[11px] font-bold text-slate-800">
                    <span>{lang.language}</span>
                    <span className="text-[9px] font-medium text-slate-400 uppercase">{lang.proficiency}</span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};
