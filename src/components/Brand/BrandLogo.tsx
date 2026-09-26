import React from 'react';

interface Props {
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
  className?: string;
  accentColor?: string;
}

export const BrandLogo: React.FC<Props> = ({
  size = 'md',
  showSubtitle = false,
  className = '',
  accentColor = '#059669',
}) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-xl',
  };

  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      {/* Precision Document Icon */}
      <div
        className={`${iconSizes[size]} rounded-xl relative flex items-center justify-center shadow-xs transition-transform hover:scale-105 overflow-hidden`}
        style={{
          backgroundColor: '#09090b',
        }}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4"
        >
          {/* Outline */}
          <path d="M8 6h5l3 3v9a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M13 6v3h3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          
          {/* Accent Line (emerald) */}
          <line x1="9" y1="12" x2="14" y2="12" stroke={accentColor} strokeWidth="1.5" strokeLinecap="round" />
          {/* Other lines */}
          <line x1="9" y1="14" x2="13" y2="14" stroke="white" strokeWidth="1" strokeLinecap="round" />
          <line x1="9" y1="16" x2="12" y2="16" stroke="#71717a" strokeWidth="1" strokeLinecap="round" />
        </svg>
      </div>

      <div className="flex flex-col">
        <div className="flex items-center gap-1.5 leading-none">
          <span className={`font-extrabold ${textSizes[size]} tracking-tight text-zinc-900`}>
            Aura<span style={{ color: accentColor }}>CV</span>
          </span>
          <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-sm bg-zinc-100 text-zinc-600">
            Studio
          </span>
        </div>
        {showSubtitle && (
          <span className="text-[11px] text-zinc-500 font-medium tracking-normal mt-0.5">
            Precision Career & Resume Platform
          </span>
        )}
      </div>
    </div>
  );
};
