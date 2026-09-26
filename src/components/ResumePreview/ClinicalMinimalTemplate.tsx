import React from 'react';
import { ResumeData } from '../../types/resume';
import { Mail, Phone, MapPin, CheckSquare } from 'lucide-react';

interface Props {
  data: ResumeData;
}

export const ClinicalMinimalTemplate: React.FC<Props> = ({ data }) => {
  const { personal, summary, experiences, education, skillCategories, certifications } = data;
  const accent = data.settings.accentColor || '#0ea5e9';

  return (
    <div className="bg-white p-[1in] min-h-[11in] text-slate-700 font-sans leading-relaxed">
      {/* Centered Clinical Header */}
      <header className="text-center mb-12 border-b-2 border-slate-100 pb-8">
        <h1 className="text-3xl font-light tracking-tight text-slate-900 mb-2">{personal.fullName}</h1>
        <p className="text-sm font-bold uppercase tracking-[0.2em] mb-4" style={{ color: accent }}>{personal.title}</p>
        
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-1 text-[11px] font-medium text-slate-400">
          {personal.email && <a href={`mailto:${personal.email}`} className="hover:underline">{personal.email}</a>}
          {personal.phone && <a href={`tel:${personal.phone}`} className="hover:underline">{personal.phone}</a>}
          {personal.location && <span>{personal.location}</span>}
        </div>
      </header>

      <div className="space-y-12">
        {/* Professional Summary */}
        {summary && (
          <section>
            <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-900 mb-4 border-l-4 pl-3" style={{ borderColor: accent }}>Overview</h3>
            <p className="text-sm leading-relaxed text-slate-600">{summary}</p>
          </section>
        )}

        {/* Clinical & Professional Experience */}
        <section>
          <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-900 mb-6 border-l-4 pl-3" style={{ borderColor: accent }}>Professional Experience</h3>
          <div className="space-y-8">
            {experiences.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h4 className="text-sm font-bold text-slate-900">{exp.role}</h4>
                  <span className="text-[11px] font-medium text-slate-400">{exp.startDate} — {exp.endDate}</span>
                </div>
                <p className="text-[11px] font-bold text-slate-500 mb-3">{exp.company} | {exp.location}</p>
                <ul className="space-y-2">
                  {exp.descriptionBullets.map((bullet, idx) => (
                    <li key={idx} className="text-xs text-slate-600 flex gap-3">
                      <span className="text-slate-300 mt-1">•</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Credentials & Competencies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <section>
            <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-900 mb-5 border-l-4 pl-3" style={{ borderColor: accent }}>Education</h3>
            <div className="space-y-4">
              {education.map((edu) => (
                <div key={edu.id}>
                  <h4 className="text-xs font-bold text-slate-800">{edu.degree}</h4>
                  <p className="text-[11px] text-slate-500">{edu.institution} · {edu.endDate}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-900 mb-5 border-l-4 pl-3" style={{ borderColor: accent }}>Certifications</h3>
            <div className="space-y-3">
              {certifications?.map((cert) => (
                <div key={cert.id} className="flex items-center gap-2">
                  <CheckSquare className="w-3.5 h-3.5 shrink-0" style={{ color: accent }} />
                  <span className="text-xs font-medium text-slate-700">{cert.name}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Skills */}
        <section>
          <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-900 mb-5 border-l-4 pl-3" style={{ borderColor: accent }}>Clinical Skills</h3>
          <div className="flex flex-wrap gap-x-8 gap-y-4">
            {skillCategories.map((cat) => (
              <div key={cat.id} className="max-w-[200px]">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">{cat.categoryName}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {cat.skillsList.join(', ')}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
