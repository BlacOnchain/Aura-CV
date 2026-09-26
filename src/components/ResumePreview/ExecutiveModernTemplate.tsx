import React from 'react';
import { ResumeData } from '../../types/resume';
import { Mail, Phone, Globe, Twitter, Github, Linkedin, ExternalLink } from 'lucide-react';

interface Props {
  data: ResumeData;
}

export const ExecutiveModernTemplate: React.FC<Props> = ({ data }) => {
  const { personal, summary, experiences, projects, education, skillCategories, certifications, languages, referencesText, settings } = data;

  const fontClass =
    settings.fontFamily === 'serif'
      ? 'font-serif'
      : settings.fontFamily === 'mono'
      ? 'font-mono'
      : 'font-sans';

  const accentColor = settings.accentColor || '#0f172a';

  return (
    <div
      className={`w-full bg-white text-slate-800 ${fontClass} leading-normal p-8 sm:p-10 select-text`}
      style={{ minHeight: '1050px' }}
    >
      {/* Header */}
      <header className="text-center pb-5 mb-5 border-b border-slate-900">
        <h1
          className="text-2xl sm:text-3xl font-bold tracking-wider uppercase text-slate-950"
          style={{ color: accentColor }}
        >
          {personal.fullName || 'YOUR NAME HERE'}
        </h1>
        <p className="text-sm sm:text-base font-semibold text-slate-700 mt-1 tracking-wide">
          {personal.title || 'Professional Title'}
        </p>

        {/* Contact details row */}
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 mt-3 text-xs text-slate-700 font-medium">
          {personal.email && (
            <div className="flex items-center gap-1">
              <Mail className="w-3.5 h-3.5 text-slate-900" />
              <a href={`mailto:${personal.email}`} className="hover:underline">{personal.email}</a>
            </div>
          )}
          {personal.phone && (
            <div className="flex items-center gap-1">
              <Phone className="w-3.5 h-3.5 text-slate-900" />
              <a href={`tel:${personal.phone}`} className="hover:underline">{personal.phone}</a>
            </div>
          )}
          {personal.twitterUrl && (
            <div className="flex items-center gap-1">
              <Twitter className="w-3.5 h-3.5 text-slate-900" />
              <span>{personal.twitterUrl}</span>
            </div>
          )}
          {personal.portfolioUrl && (
            <div className="flex items-center gap-1">
              <Globe className="w-3.5 h-3.5 text-slate-900" />
              <a 
                href={personal.portfolioUrl.startsWith('http') ? personal.portfolioUrl : `https://${personal.portfolioUrl}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:underline"
              >
                {personal.portfolioUrl}
              </a>
            </div>
          )}
          {personal.githubUrl && (
            <div className="flex items-center gap-1">
              <Github className="w-3.5 h-3.5 text-slate-900" />
              <a 
                href={personal.githubUrl.startsWith('http') ? personal.githubUrl : `https://${personal.githubUrl}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:underline"
              >
                {personal.githubUrl}
              </a>
            </div>
          )}
          {personal.linkedinUrl && (
            <div className="flex items-center gap-1">
              <Linkedin className="w-3.5 h-3.5 text-slate-900" />
              <a 
                href={personal.linkedinUrl.startsWith('http') ? personal.linkedinUrl : `https://${personal.linkedinUrl}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:underline"
              >
                {personal.linkedinUrl}
              </a>
            </div>
          )}
        </div>
      </header>

      {/* Summary Section */}
      {summary && (
        <section className="mb-5">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-900 pb-0.5 mb-2">
            Summary
          </h2>
          <p className="text-xs text-slate-800 leading-relaxed text-justify">
            {summary}
          </p>
        </section>
      )}

      {/* Experience Section */}
      {experiences.length > 0 && (
        <section className="mb-5">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-900 pb-0.5 mb-2.5">
            Experience
          </h2>

          <div className="space-y-4">
            {experiences.map((exp) => (
              <div key={exp.id} className="text-xs">
                <div className="flex justify-between items-baseline">
                  <div>
                    <span className="font-bold text-slate-900">{exp.role}</span>
                    {exp.company && (
                      <span className="text-slate-700 italic">, {exp.company}</span>
                    )}
                  </div>
                  <div className="text-right shrink-0 font-medium text-slate-800">
                    {exp.startDate} {exp.startDate && (exp.endDate || exp.isCurrent) ? '–' : ''}{' '}
                    {exp.isCurrent ? 'Present' : exp.endDate}
                  </div>
                </div>

                {exp.location && (
                  <div className="text-right text-[11px] text-slate-600 font-normal">
                    {exp.location}
                  </div>
                )}

                <ul className="mt-1 space-y-1 list-disc list-outside ml-4 text-slate-800 leading-relaxed">
                  {exp.descriptionBullets
                    .filter((b) => b.trim().length > 0)
                    .map((bullet, idx) => (
                      <li key={idx} className="pl-1">
                        {bullet}
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects Section */}
      {settings.showProjects && projects.length > 0 && (
        <section className="mb-5">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-900 pb-0.5 mb-2.5">
            Projects
          </h2>

          <div className="space-y-3.5">
            {projects.map((proj) => (
              <div key={proj.id} className="text-xs">
                <div className="flex justify-between items-baseline">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-slate-900">{proj.name}</span>
                    {proj.subtitle && (
                      <span className="text-slate-600 italic">, {proj.subtitle}</span>
                    )}
                    {proj.link && (
                      <span className="text-[10px] text-slate-500 inline-flex items-center gap-0.5 font-normal">
                        ({proj.link})
                      </span>
                    )}
                  </div>
                  <div className="text-right shrink-0 font-medium text-slate-800">
                    {proj.startDate} {proj.startDate && proj.endDate ? '–' : ''} {proj.endDate}
                  </div>
                </div>

                <ul className="mt-1 space-y-0.5 list-disc list-outside ml-4 text-slate-800 leading-relaxed">
                  {proj.descriptionBullets
                    .filter((b) => b.trim().length > 0)
                    .map((bullet, idx) => (
                      <li key={idx} className="pl-1">
                        {bullet}
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education Section */}
      {education.length > 0 && (
        <section className="mb-5">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-900 pb-0.5 mb-2">
            Education
          </h2>

          <div className="space-y-3">
            {education.map((edu) => (
              <div key={edu.id} className="text-xs">
                <div className="flex justify-between items-baseline">
                  <div>
                    <span className="font-bold text-slate-900">{edu.degree}</span>
                    {edu.institution && (
                      <span className="text-slate-700 italic">, {edu.institution}</span>
                    )}
                  </div>
                  <div className="text-right shrink-0 font-medium text-slate-800">
                    {edu.startDate} {edu.startDate && edu.endDate ? '–' : ''} {edu.endDate}
                  </div>
                </div>

                <ul className="mt-1 space-y-1 list-disc list-outside ml-4 text-slate-800 leading-relaxed">
                  {edu.courseworkBullets
                    .filter((b) => b.trim().length > 0)
                    .map((bullet, idx) => (
                      <li key={idx} className="pl-1">
                        {bullet}
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certificates */}
      {settings.showCertifications && certifications.length > 0 && (
        <section className="mb-5">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-900 pb-0.5 mb-2">
            Certificates
          </h2>
          <ul className="space-y-1 list-disc list-outside ml-4 text-xs text-slate-800">
            {certifications.map((cert) => (
              <li key={cert.id} className="pl-1">
                <span className="font-semibold text-slate-900">{cert.name}</span>
                {cert.issuer && <span className="text-slate-600"> — {cert.issuer}</span>}
                {cert.date && <span className="text-slate-500"> ({cert.date})</span>}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Core Skills (Categorized 2-column or list) */}
      {skillCategories.length > 0 && (
        <section className="mb-5">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-900 pb-0.5 mb-2.5">
            Core Skills
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3 text-xs">
            {skillCategories.map((cat) => (
              <div key={cat.id} className="space-y-0.5">
                <h3 className="font-bold text-slate-950">
                  {cat.categoryName}:
                </h3>
                {cat.description && (
                  <p className="text-slate-700 leading-relaxed text-[11.5px]">
                    {cat.description}
                  </p>
                )}
                {cat.skillsList.length > 0 && (
                  <p className="text-slate-800 font-medium text-[11px]">
                    {cat.skillsList.join(' • ')}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Languages */}
      {settings.showLanguages && languages.length > 0 && (
        <section className="mb-5">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-900 pb-0.5 mb-2">
            Languages
          </h2>
          <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs text-slate-800">
            {languages.map((lang) => (
              <div key={lang.id} className="flex items-center gap-1.5">
                <span className="text-slate-900 font-semibold">• {lang.language}</span>
                {lang.proficiency && (
                  <span className="text-slate-500 text-[11px]">({lang.proficiency})</span>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* References */}
      {settings.showReferences && referencesText && (
        <section className="pt-2 border-t border-slate-900">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-0.5">
            References
          </h2>
          <p className="text-xs text-slate-700 italic">
            {referencesText}
          </p>
        </section>
      )}
    </div>
  );
};
