import React from 'react';
import { ResumeData } from '../../types/resume';
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Github,
  Linkedin,
  Calendar,
  ExternalLink,
  Award,
  Languages as LanguagesIcon
} from 'lucide-react';

interface Props {
  data: ResumeData;
}

export const FlowModernaTemplate: React.FC<Props> = ({ data }) => {
  const { personal, summary, experiences, projects, education, skillCategories, certifications, languages, settings } = data;
  const accent = settings.accentColor || '#3b82f6';
  const isCompact = settings.compactSpacing || settings.pageMargin === 'compact';

  const fontClass =
    settings.fontFamily === 'serif'
      ? 'font-serif'
      : settings.fontFamily === 'mono'
      ? 'font-mono'
      : 'font-sans';

  // Dynamic Spacing Mapping
  const marginClass =
    settings.pageMargin === 'compact'
      ? 'p-5 sm:p-6 space-y-4'
      : settings.pageMargin === 'spacious'
      ? 'p-10 sm:p-12 space-y-7'
      : 'p-8 sm:p-9 space-y-5.5';

  const headerPaddingClass =
    settings.pageMargin === 'compact'
      ? 'px-6 py-4.5'
      : settings.pageMargin === 'spacious'
      ? 'px-12 py-9'
      : 'px-8 py-7';

  // Dynamic Font Size Mapping
  const titleSizeClass =
    settings.fontSize === 'small'
      ? 'text-[11px]'
      : settings.fontSize === 'large'
      ? 'text-[13px]'
      : 'text-[12px]'; // standard

  const baseSizeClass =
    settings.fontSize === 'small'
      ? 'text-[11px]'
      : settings.fontSize === 'large'
      ? 'text-[13.5px]'
      : 'text-[12.5px]'; // standard

  const contactSizeClass =
    settings.fontSize === 'small'
      ? 'text-[10px]'
      : settings.fontSize === 'large'
      ? 'text-[12px]'
      : 'text-[11px]';

  const headingSizeClass =
    settings.fontSize === 'small'
      ? 'text-2xl'
      : settings.fontSize === 'large'
      ? 'text-4xl'
      : 'text-3xl'; // standard

  return (
    <div className={`w-full bg-white text-slate-800 ${fontClass} leading-normal`}>
      {/* FlowCV Modern Header Banner */}
      <div
        className={`border-b transition-colors ${headerPaddingClass}`}
        style={{
          borderBottomColor: `${accent}30`,
          background: `linear-gradient(135deg, ${accent}08 0%, #ffffff 100%)`
        }}
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-widest uppercase mb-1.5"
                 style={{ backgroundColor: `${accent}18`, color: accent }}>
              Curriculum Vitae
            </div>
            <h1 className={`font-extrabold tracking-tight text-slate-900 ${headingSizeClass}`}>
              {personal.fullName || 'Your Full Name'}
            </h1>
            <p className="text-sm sm:text-base font-semibold mt-0.5" style={{ color: accent }}>
              {personal.title || 'Professional Title'}
            </p>
          </div>

          {/* Quick contact pills */}
          <div className={`flex flex-wrap gap-2 text-slate-600 max-w-md ${contactSizeClass}`}>
            {personal.email && (
              <a
                href={`mailto:${personal.email}`}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white border border-slate-200/90 shadow-2xs hover:border-slate-300"
              >
                <Mail className="w-3.5 h-3.5" style={{ color: accent }} />
                <span>{personal.email}</span>
              </a>
            )}
            {personal.phone && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white border border-slate-200/90 shadow-2xs">
                <Phone className="w-3.5 h-3.5" style={{ color: accent }} />
                <span>{personal.phone}</span>
              </span>
            )}
            {personal.location && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white border border-slate-200/90 shadow-2xs">
                <MapPin className="w-3.5 h-3.5" style={{ color: accent }} />
                <span>{personal.location}</span>
              </span>
            )}
            {personal.portfolioUrl && (
              <a
                href={personal.portfolioUrl.startsWith('http') ? personal.portfolioUrl : `https://${personal.portfolioUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white border border-slate-200/90 shadow-2xs hover:border-slate-300 transition-colors"
              >
                <Globe className="w-3.5 h-3.5" style={{ color: accent }} />
                <span>{personal.portfolioUrl}</span>
              </a>
            )}
            {personal.githubUrl && (
              <a
                href={personal.githubUrl.startsWith('http') ? personal.githubUrl : `https://${personal.githubUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white border border-slate-200/90 shadow-2xs hover:border-slate-300 transition-colors"
              >
                <Github className="w-3.5 h-3.5" style={{ color: accent }} />
                <span>{personal.githubUrl}</span>
              </a>
            )}
            {personal.linkedinUrl && (
              <a
                href={personal.linkedinUrl.startsWith('http') ? personal.linkedinUrl : `https://${personal.linkedinUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white border border-slate-200/90 shadow-2xs hover:border-slate-300 transition-colors"
              >
                <Linkedin className="w-3.5 h-3.5" style={{ color: accent }} />
                <span>{personal.linkedinUrl}</span>
              </a>
            )}
          </div>
        </div>
      </div>

      <div className={marginClass}>
        {/* Professional Summary */}
        {summary && (
          <section className="space-y-1.5">
            <h2
              className={`font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 ${titleSizeClass}`}
            >
              Professional Summary
            </h2>
            <p className={`text-slate-700 leading-relaxed mt-1 ${baseSizeClass}`}>
              {summary}
            </p>
          </section>
        )}

        {/* Experience Section */}
        {experiences.length > 0 && (
          <section className="space-y-3">
            <h2
              className={`font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 ${titleSizeClass}`}
            >
              Work Experience
            </h2>

            <div className={`space-y-4 mt-2 ${isCompact ? 'space-y-3' : 'space-y-4'}`}>
              {experiences.map((exp) => (
                <div key={exp.id} className="relative">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <span className={`font-bold text-slate-900 ${baseSizeClass}`}>
                      {exp.role} <span className="font-normal text-slate-500">at</span>{' '}
                      <span className="text-slate-800 font-semibold">{exp.company}</span>
                    </span>
                    <span className="text-[11px] font-medium text-slate-500 shrink-0 flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      {exp.startDate} - {exp.endDate} {exp.location ? `• ${exp.location}` : ''}
                    </span>
                  </div>

                  <ul className="mt-1 space-y-1">
                    {(exp.descriptionBullets || []).filter(Boolean).map((bullet, idx) => (
                      <li key={idx} className={`text-slate-700 flex items-start gap-2 leading-relaxed ${baseSizeClass}`}>
                        <span className="text-[12px] mt-0.5 shrink-0 text-slate-400">•</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills Grid */}
        {skillCategories.length > 0 && (
          <section className="space-y-2.5">
            <h2
              className={`font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 ${titleSizeClass}`}
            >
              Core Competencies & Technical Skills
            </h2>

            <div className="space-y-2 mt-2">
              {skillCategories.map((cat) => (
                <div key={cat.id} className={`text-slate-700 leading-relaxed ${baseSizeClass}`}>
                  <span className="font-bold text-slate-900">{cat.categoryName}: </span>
                  <span>{cat.description || cat.skillsList.join(', ')}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {settings.showProjects && projects.length > 0 && (
          <section className="space-y-3">
            <h2
              className={`font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 ${titleSizeClass}`}
            >
              Featured Projects & Systems
            </h2>

            <div className={`mt-2 ${isCompact ? 'space-y-3' : 'space-y-4'}`}>
              {projects.map((proj) => (
                <div key={proj.id} className="relative">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <span className={`font-bold text-slate-900 ${baseSizeClass}`}>
                      {proj.name} {proj.subtitle && <span className="font-normal text-slate-500">({proj.subtitle})</span>}
                    </span>
                    <span className="text-[11px] font-medium text-slate-500 shrink-0">
                      {proj.startDate} {proj.endDate ? `- ${proj.endDate}` : ''}
                      {proj.link && ` • ${proj.link}`}
                    </span>
                  </div>

                  <ul className="mt-1 space-y-1">
                    {(proj.descriptionBullets || []).filter(Boolean).map((b, bIdx) => (
                      <li key={bIdx} className={`text-slate-700 flex items-start gap-2 leading-relaxed ${baseSizeClass}`}>
                        <span className="text-[12px] mt-0.5 shrink-0 text-slate-400">•</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {education.length > 0 && (
          <section className="space-y-2.5">
            <h2
              className={`font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 ${titleSizeClass}`}
            >
              Education & Academic Background
            </h2>

            <div className={`mt-2 ${isCompact ? 'space-y-3' : 'space-y-4'}`}>
              {education.map((edu) => (
                <div key={edu.id} className="relative">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <span className={`font-bold text-slate-900 ${baseSizeClass}`}>
                      {edu.degree} <span className="font-normal text-slate-500">—</span> {edu.institution}
                    </span>
                    <span className="text-[11px] font-medium text-slate-500 shrink-0">
                      {edu.startDate} - {edu.endDate} {edu.location ? `• ${edu.location}` : ''}
                    </span>
                  </div>

                  {edu.courseworkBullets && edu.courseworkBullets.length > 0 && (
                    <ul className="mt-1 space-y-1">
                      {(edu.courseworkBullets || []).filter(Boolean).map((bullet, idx) => (
                        <li key={idx} className={`text-slate-700 flex items-start gap-2 leading-relaxed ${baseSizeClass}`}>
                          <span className="text-[12px] mt-0.5 shrink-0 text-slate-400">•</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Certifications & Languages Footer */}
        {(settings.showCertifications && certifications.length > 0) || (settings.showLanguages && languages.length > 0) ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-200">
            {settings.showCertifications && certifications.length > 0 && (
              <div>
                <h3 className={`font-bold uppercase tracking-wider text-slate-900 mb-1.5 flex items-center gap-1.5 ${titleSizeClass}`}>
                  <Award className="w-3.5 h-3.5 text-slate-800" />
                  Certifications
                </h3>
                <div className="space-y-1">
                  {certifications.map((c) => (
                    <div key={c.id} className={`text-slate-700 ${baseSizeClass}`}>
                      <span className="font-semibold text-slate-800">{c.name}</span>
                      {c.issuer && <span className="text-slate-500"> • {c.issuer}</span>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {settings.showLanguages && languages.length > 0 && (
              <div>
                <h3 className={`font-bold uppercase tracking-wider text-slate-900 mb-1.5 flex items-center gap-1.5 ${titleSizeClass}`}>
                  <LanguagesIcon className="w-3.5 h-3.5 text-slate-800" />
                  Languages
                </h3>
                <div className={`text-slate-700 leading-relaxed ${baseSizeClass}`}>
                  {languages.map((l) => `${l.language}${l.proficiency ? ` (${l.proficiency})` : ''}`).join(', ')}
                </div>
              </div>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
};
