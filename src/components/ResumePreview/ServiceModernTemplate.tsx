import React from 'react';
import { ResumeData } from '../../types/resume';
import { Mail, Phone, MapPin, Globe, Award, Star } from 'lucide-react';

interface Props {
  data: ResumeData;
}

export const ServiceModernTemplate: React.FC<Props> = ({ data }) => {
  const { personal, summary, experiences, education, skillCategories, certifications } = data;
  const accent = data.settings.accentColor || '#0ea5e9';

  return (
    <div className="bg-white p-[1in] min-h-[11in] text-slate-800 font-sans leading-relaxed">
      {/* Header with Background Block */}
      <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b-4 pb-6" style={{ borderColor: accent }}>
        <div className="space-y-2">
          <h1 className="text-4xl font-black tracking-tighter text-slate-900 uppercase">{personal.fullName}</h1>
          <p className="text-lg font-bold uppercase tracking-widest" style={{ color: accent }}>{personal.title}</p>
        </div>
        
        <div className="grid grid-cols-1 gap-1 text-xs font-bold text-slate-500">
          {personal.email && <div className="flex items-center gap-2"><Mail className="w-3 h-3" /> {personal.email}</div>}
          {personal.phone && <div className="flex items-center gap-2"><Phone className="w-3 h-3" /> {personal.phone}</div>}
          {personal.location && <div className="flex items-center gap-2"><MapPin className="w-3 h-3" /> {personal.location}</div>}
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
        <div className="md:col-span-8 space-y-10">
          {/* Summary */}
          {summary && (
            <section>
              <h3 className="text-sm font-black uppercase tracking-widest mb-3 flex items-center gap-2">
                <Star className="w-4 h-4" style={{ color: accent }} />
                Professional Profile
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed font-medium">{summary}</p>
            </section>
          )}

          {/* Experience */}
          <section>
            <h3 className="text-sm font-black uppercase tracking-widest mb-6 flex items-center gap-2">
              <Award className="w-4 h-4" style={{ color: accent }} />
              Work History
            </h3>
            <div className="space-y-8">
              {experiences.map((exp) => (
                <div key={exp.id} className="relative pl-6 border-l-2 border-slate-100">
                  <div className="absolute w-3 h-3 rounded-full -left-[7px] top-1.5 bg-white border-2" style={{ borderColor: accent }} />
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-bold text-slate-900">{exp.role}</h4>
                    <span className="text-[10px] font-black bg-slate-100 px-2 py-0.5 rounded text-slate-500 uppercase tracking-tighter">
                      {exp.startDate} — {exp.endDate}
                    </span>
                  </div>
                  <p className="text-xs font-bold text-slate-500 mb-3">{exp.company} · {exp.location}</p>
                  <ul className="space-y-1.5">
                    {exp.descriptionBullets.map((bullet, idx) => (
                      <li key={idx} className="text-xs text-slate-600 leading-relaxed">{bullet}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="md:col-span-4 space-y-10">
          {/* Skills */}
          <section>
            <h3 className="text-sm font-black uppercase tracking-widest mb-4">Core Strengths</h3>
            <div className="space-y-4">
              {skillCategories.map((cat) => (
                <div key={cat.id}>
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">{cat.categoryName}</h4>
                  <div className="flex flex-wrap gap-2">
                    {cat.skillsList.map((skill, idx) => (
                      <span key={idx} className="px-2 py-1 bg-slate-50 text-slate-700 text-[10px] font-bold rounded border border-slate-100">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Education */}
          {education.length > 0 && (
            <section>
              <h3 className="text-sm font-black uppercase tracking-widest mb-4">Education</h3>
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <h4 className="text-xs font-bold text-slate-900 leading-tight">{edu.degree}</h4>
                    <p className="text-[10px] text-slate-500 font-medium mt-1">{edu.institution}</p>
                    <p className="text-[9px] text-slate-400 font-bold uppercase mt-0.5">{edu.startDate} — {edu.endDate}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Certifications */}
          {certifications && certifications.length > 0 && (
            <section>
              <h3 className="text-sm font-black uppercase tracking-widest mb-4">Licensing</h3>
              <div className="space-y-3">
                {certifications.map((cert) => (
                  <div key={cert.id} className="flex gap-3">
                    <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: accent }} />
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 leading-tight">{cert.name}</h4>
                      <p className="text-[10px] text-slate-400 font-medium">{cert.issuer}</p>
                    </div>
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
