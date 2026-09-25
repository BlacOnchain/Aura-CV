import React, { useState, useEffect } from 'react';
import { PersonalInfo } from '../../types/resume';
import { callAI } from '../../utils/aiClient';
import { User, Briefcase, Mail, Phone, MapPin, Globe, Twitter, Github, Linkedin, Wand2, Loader2 } from 'lucide-react';

interface Props {
  data: PersonalInfo;
  onChange: (updated: PersonalInfo) => void;
}

export const PersonalForm: React.FC<Props> = ({ data, onChange }) => {
  const [isSmartFilling, setIsSmartFilling] = useState(false);
  const [smartFillMessage, setSmartFillMessage] = useState<string | null>(null);

  const handleChange = (field: keyof PersonalInfo, value: string) => {
    onChange({ ...data, [field]: value });
  };

  const handleSmartFill = async () => {
    if (!data.linkedinUrl) {
      setSmartFillMessage('Please enter a LinkedIn profile URL first.');
      return;
    }
    setIsSmartFilling(true);
    setSmartFillMessage(null);
    
    const result = await callAI<any>('/api/ai/parse-linkedin', { url: data.linkedinUrl });

    if (result.error) {
      setSmartFillMessage(result.error);
      setIsSmartFilling(false);
      return;
    }

    if (result.data?.resume?.personal) {
      const personal = result.data.resume.personal;
      onChange({
        ...data,
        fullName: personal.fullName || data.fullName,
        location: personal.location || data.location,
      });
      setSmartFillMessage('Profile details successfully imported.');
    } else {
      setSmartFillMessage('Could not parse profile data.');
    }
    
    setIsSmartFilling(false);
  };

  return (
    <div className="space-y-6">
      {smartFillMessage && (
        <div className="p-3 bg-zinc-100 border border-zinc-200 rounded-xl text-xs text-zinc-800 flex items-center justify-between">
          <span>{smartFillMessage}</span>
          <button 
            type="button" 
            onClick={() => setSmartFillMessage(null)}
            className="text-xs font-bold text-zinc-500 hover:text-zinc-900 ml-2"
          >
            ✕
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-semibold text-zinc-600 mb-1.5 uppercase tracking-wider">
            Full Name <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            value={data.fullName || ''}
            onChange={(e) => handleChange('fullName', e.target.value)}
            placeholder="e.g. Odubela Oluwatomiwa"
            className="w-full px-4 py-2.5 text-sm bg-white border border-[#EBE6DD] rounded-xl focus:outline-hidden focus:ring-1 focus:ring-[#1A1917] focus:border-[#1A1917] text-[#1A1917] transition-all font-medium placeholder:text-zinc-400"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-zinc-600 mb-1.5 uppercase tracking-wider">
            Target Job Title <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            value={data.title || ''}
            onChange={(e) => handleChange('title', e.target.value)}
            placeholder="e.g. Backend Developer"
            className="w-full px-4 py-2.5 text-sm bg-white border border-[#EBE6DD] rounded-xl focus:outline-hidden focus:ring-1 focus:ring-[#1A1917] focus:border-[#1A1917] text-[#1A1917] transition-all font-medium placeholder:text-zinc-400"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-zinc-600 mb-1.5 uppercase tracking-wider">
            Email Address <span className="text-rose-500">*</span>
          </label>
          <input
            type="email"
            value={data.email || ''}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder="e.g. odubelaotomiwa508@gmail.com"
            className="w-full px-4 py-2.5 text-sm bg-white border border-[#EBE6DD] rounded-xl focus:outline-hidden focus:ring-1 focus:ring-[#1A1917] focus:border-[#1A1917] text-[#1A1917] transition-all font-medium placeholder:text-zinc-400"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-zinc-600 mb-1.5 uppercase tracking-wider">
            Phone Number <span className="text-rose-500">*</span>
          </label>
          <input
            type="tel"
            value={data.phone || ''}
            onChange={(e) => handleChange('phone', e.target.value)}
            placeholder="e.g. 09125808797"
            className="w-full px-4 py-2.5 text-sm bg-white border border-[#EBE6DD] rounded-xl focus:outline-hidden focus:ring-1 focus:ring-[#1A1917] focus:border-[#1A1917] text-[#1A1917] transition-all font-medium placeholder:text-zinc-400"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-zinc-600 mb-1.5 uppercase tracking-wider">
            Location / Work Mode
          </label>
          <input
            type="text"
            value={data.location || ''}
            onChange={(e) => handleChange('location', e.target.value)}
            placeholder="e.g. Lagos, Nigeria / Remote"
            className="w-full px-4 py-2.5 text-sm bg-white border border-[#EBE6DD] rounded-xl focus:outline-hidden focus:ring-1 focus:ring-[#1A1917] focus:border-[#1A1917] text-[#1A1917] transition-all font-medium placeholder:text-zinc-400"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-zinc-600 mb-1.5 uppercase tracking-wider">
            Portfolio Website
          </label>
          <input
            type="text"
            value={data.portfolioUrl || ''}
            onChange={(e) => handleChange('portfolioUrl', e.target.value)}
            placeholder="e.g. blaconchain.github.io/Portfolio"
            className="w-full px-4 py-2.5 text-sm bg-white border border-[#EBE6DD] rounded-xl focus:outline-hidden focus:ring-1 focus:ring-[#1A1917] focus:border-[#1A1917] text-[#1A1917] transition-all font-medium placeholder:text-zinc-400"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-zinc-600 mb-1.5 uppercase tracking-wider">
            GitHub Profile
          </label>
          <input
            type="text"
            value={data.githubUrl || ''}
            onChange={(e) => handleChange('githubUrl', e.target.value)}
            placeholder="e.g. github.com/blaconchain"
            className="w-full px-4 py-2.5 text-sm bg-white border border-[#EBE6DD] rounded-xl focus:outline-hidden focus:ring-1 focus:ring-[#1A1917] focus:border-[#1A1917] text-[#1A1917] transition-all font-medium placeholder:text-zinc-400"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-zinc-600 mb-1.5 uppercase tracking-wider">
            X / Twitter Handle
          </label>
          <input
            type="text"
            value={data.twitterUrl || ''}
            onChange={(e) => handleChange('twitterUrl', e.target.value)}
            placeholder="e.g. @blac_onchain"
            className="w-full px-4 py-2.5 text-sm bg-white border border-[#EBE6DD] rounded-xl focus:outline-hidden focus:ring-1 focus:ring-[#1A1917] focus:border-[#1A1917] text-[#1A1917] transition-all font-medium placeholder:text-zinc-400"
          />
        </div>

        <div className="md:col-span-2">
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-xs font-semibold text-zinc-600 uppercase tracking-wider">
              LinkedIn Profile
            </label>
            <button
              onClick={handleSmartFill}
              disabled={isSmartFilling || !data.linkedinUrl}
              className="flex items-center gap-1.5 text-xs font-semibold text-zinc-600 hover:text-zinc-900 disabled:opacity-50 cursor-pointer"
            >
              {isSmartFilling && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
              {isSmartFilling ? 'Syncing...' : 'Sync details'}
            </button>
          </div>
          <input
            type="text"
            value={data.linkedinUrl || ''}
            onChange={(e) => handleChange('linkedinUrl', e.target.value)}
            placeholder="e.g. linkedin.com/in/odubela-oluwatomiwa"
            className="w-full px-4 py-2.5 text-sm bg-white border border-[#EBE6DD] rounded-xl focus:outline-hidden focus:ring-1 focus:ring-[#1A1917] focus:border-[#1A1917] text-[#1A1917] transition-all font-medium placeholder:text-zinc-400"
          />
        </div>
      </div>
    </div>
  );
};
