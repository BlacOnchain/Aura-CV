import React from 'react';
import { ResumeData } from '../../types/resume';
import { Mail, Phone, MapPin, Globe, Star } from 'lucide-react';

interface Props {
  data: ResumeData;
}

export const ImpactHospitalityTemplate: React.FC<Props> = ({ data }) => {
  const { personal, summary, experiences, education, skillCategories, certifications, languages, settings } = data;

  const fontClass =
    settings.fontFamily === 'serif'
      ? 'font-serif'
      : settings.fontFamily === 'mono'
      ? 'font-mono'
      : 'font-sans';

  const accentColor = settings.accentColor || '#059669';

  return (
    <div className={`w-full bg-white text-zinc-800 ${fontClass} leading-relaxed p-0 select-text`} style={{ minHeight: '1050px' }}>
      {/* Bold Top Header */}
      <header className="bg-zinc-900 text-white p-10 pb-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16" />
        <div className="relative z-10">
          <h1 className="text-4xl font-black uppercase tracking-tighter leading-none mb-2">
            {personal.fullName || 'YOUR NAME'}
          </h1>
          <div className="flex items-center gap-3">
            <div className="h-0.5 w-8 bg-white" style={{ backgroundColor: accentColor }} />
            <p className="text-lg font-bold text-zinc-300 uppercase tracking-widest">
              {personal.title || 'Professional Title'}
            </p>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-2 mt-8 text-sm font-medium text-zinc-400">
            {personal.email && (
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-zinc-500" />
                <span>{personal.email}</span>
              </div>
            )}
            {personal.phone && (
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-zinc-500" />
                <span>{personal.phone}</span>
              </div>
            )}
            {personal.location && (
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-zinc-500" />
                <span>{personal.location}</span>
              </div>
            )}
            {personal.portfolioUrl && (
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-zinc-500" />
                <span>{personal.portfolioUrl}</span>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="px-10 py-8 grid grid-cols-12 gap-10">
        {/* Main Content (Experience) */}
        <div className="col-span-8 space-y-8">
          {summary && (
            <section>
              <h2 className="text-xs font-black uppercase tracking-widest text-zinc-400 mb-3 flex items-center gap-2">
                <Star className="w-3 h-3" style={{ color: accentColor }} />
                Professional Profile
              </h2>
              <p className="text-[13px] text-zinc-700 leading-relaxed font-medium">
                {summary}
              </p>
            </section>
          )}

          {experiences.length > 0 && (
            <section>
              <h2 className="text-xs font-black uppercase tracking-widest text-zinc-400 mb-6 flex items-center gap-2">
                <Star className="w-3 h-3" style={{ color: accentColor }} />
                Work History
              </h2>
              <div className="space-y-8">
                {experiences.map((exp) => (
                  <div key={exp.id} className="relative pl-6 border-l-2 border-zinc-100">
                    <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-zinc-300" style={{ backgroundColor: accentColor }} />
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-sm font-black text-zinc-900 uppercase tracking-tight">{exp.role}</h3>
                        <p className="text-xs font-bold text-zinc-500">{exp.company}</p>
                      </div>
                      <span className="text-[10px] font-black text-zinc-400 uppercase bg-zinc-50 px-2 py-1 rounded">
                        {exp.startDate} – {exp.isCurrent ? 'Present' : exp.endDate}
                      </span>
                    </div>
                    <ul className="space-y-2">
                      {exp.descriptionBullets.filter(b => b.trim()).map((bullet, idx) => (
                        <li key={idx} className="text-[12px] text-zinc-600 leading-snug">
                          • {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Sidebar (Skills, Education, Certs) */}
        <div className="col-span-4 space-y-10">
          {skillCategories.length > 0 && (
            <section>
              <h2 className="text-xs font-black uppercase tracking-widest text-zinc-400 mb-4">Core Strengths</h2>
              <div className="space-y-4">
                {skillCategories.map((cat) => (
                  <div key={cat.id}>
                    <h3 className="text-[11px] font-black text-zinc-900 uppercase mb-2">{cat.categoryName}</h3>
                    <div className="flex flex-wrap gap-1.5">
                      {cat.skillsList.map((skill, idx) => (
                        <span key={idx} className="text-[10px] font-bold px-2.5 py-1 bg-zinc-100 text-zinc-700 rounded-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {education.length > 0 && (
            <section>
              <h2 className="text-xs font-black uppercase tracking-widest text-zinc-400 mb-4">Education</h2>
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <h3 className="text-[11px] font-black text-zinc-900 uppercase leading-tight">{edu.degree}</h3>
                    <p className="text-[10px] font-bold text-zinc-500 mt-0.5">{edu.institution}</p>
                    <p className="text-[9px] font-black text-zinc-400 uppercase mt-1">{edu.endDate}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {certifications.length > 0 && settings.showCertifications && (
            <section>
              <h2 className="text-xs font-black uppercase tracking-widest text-zinc-400 mb-4">Training</h2>
              <div className="space-y-3">
                {certifications.map((cert) => (
                  <div key={cert.id} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-zinc-200 mt-1.5 shrink-0" style={{ backgroundColor: accentColor }} />
                    <div>
                      <p className="text-[11px] font-bold text-zinc-800 leading-tight">{cert.name}</p>
                      <p className="text-[9px] font-black text-zinc-400 uppercase mt-0.5">{cert.issuer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {languages.length > 0 && settings.showLanguages && (
            <section>
              <h2 className="text-xs font-black uppercase tracking-widest text-zinc-400 mb-4">Languages</h2>
              <div className="space-y-2">
                {languages.map((lang) => (
                  <div key={lang.id} className="flex justify-between items-center">
                    <span className="text-[11px] font-bold text-zinc-800">{lang.language}</span>
                    <span className="text-[9px] font-black text-zinc-400 uppercase">{lang.proficiency}</span>
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
