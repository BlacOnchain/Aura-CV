import React from 'react';
import { ResumeData } from '../../types/resume';
import { Globe, Instagram, Mail, Phone, Zap } from 'lucide-react';

interface Props {
  data: ResumeData;
}

export const CreativeBoldTemplate: React.FC<Props> = ({ data }) => {
  const { personal, summary, experiences, education, skillCategories } = data;
  const accent = data.settings.accentColor || '#f43f5e';

  return (
    <div className="bg-white min-h-[11in] flex flex-col md:flex-row text-slate-900 font-sans">
      {/* Sidebar: Bold Info */}
      <aside className="md:w-1/3 bg-slate-900 text-white p-10 flex flex-col gap-12 shrink-0">
        <div className="space-y-4">
          <h1 className="text-5xl font-black leading-none tracking-tighter break-words">{personal.fullName.split(' ')[0]}<br/>{personal.fullName.split(' ').slice(1).join(' ')}</h1>
          <div className="h-2 w-16" style={{ backgroundColor: accent }} />
          <p className="text-sm font-bold uppercase tracking-widest text-slate-400">{personal.title}</p>
        </div>

        <div className="space-y-6">
          <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Contact</h3>
          <div className="space-y-4 text-sm font-medium">
            {personal.email && (
              <a href={`mailto:${personal.email}`} className="flex items-center gap-3 hover:text-slate-300 transition-colors">
                <Mail className="w-4 h-4 shrink-0" style={{ color: accent }} />
                <span className="truncate">{personal.email}</span>
              </a>
            )}
            {personal.phone && (
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 shrink-0" style={{ color: accent }} />
                <span>{personal.phone}</span>
              </div>
            )}
            {personal.portfolioUrl && (
              <a 
                href={personal.portfolioUrl.startsWith('http') ? personal.portfolioUrl : `https://${personal.portfolioUrl}`} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-3 hover:text-slate-300 transition-colors"
              >
                <Globe className="w-4 h-4 shrink-0" style={{ color: accent }} />
                <span>{personal.portfolioUrl}</span>
              </a>
            )}
          </div>
        </div>

        <div className="space-y-8 mt-auto">
          {skillCategories.map((cat) => (
            <div key={cat.id} className="space-y-4">
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">{cat.categoryName}</h3>
              <div className="flex flex-wrap gap-2">
                {cat.skillsList.map((skill, idx) => (
                  <span key={idx} className="px-3 py-1 bg-white/10 rounded-full text-xs font-bold whitespace-nowrap">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-12 space-y-12">
        {summary && (
          <section className="bg-slate-50 p-8 rounded-3xl border border-slate-100 relative">
            <Zap className="absolute -top-3 -right-3 w-8 h-8 p-1.5 bg-white rounded-full shadow-lg" style={{ color: accent }} />
            <p className="text-lg font-bold leading-relaxed text-slate-800 italic">&ldquo;{summary}&rdquo;</p>
          </section>
        )}

        <section className="space-y-8">
          <h2 className="text-2xl font-black tracking-tight flex items-center gap-3">
            Experience
            <div className="flex-1 h-px bg-slate-100" />
          </h2>
          <div className="space-y-10">
            {experiences.map((exp) => (
              <div key={exp.id} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-1">
                  <span className="text-xs font-black uppercase tracking-widest text-slate-400">{exp.startDate} — {exp.endDate}</span>
                </div>
                <div className="md:col-span-3 space-y-3">
                  <h4 className="text-lg font-black text-slate-900">{exp.role}</h4>
                  <p className="text-sm font-bold" style={{ color: accent }}>{exp.company} · {exp.location}</p>
                  <ul className="space-y-2">
                    {exp.descriptionBullets.map((bullet, idx) => (
                      <li key={idx} className="text-sm text-slate-600 leading-relaxed font-medium">{bullet}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-black tracking-tight flex items-center gap-3">
            Education
            <div className="flex-1 h-px bg-slate-100" />
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {education.map((edu) => (
              <div key={edu.id} className="space-y-1">
                <h4 className="font-black text-slate-900 leading-tight">{edu.degree}</h4>
                <p className="text-sm text-slate-500 font-bold">{edu.institution}</p>
                <p className="text-xs text-slate-400 font-black uppercase">{edu.endDate}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};
