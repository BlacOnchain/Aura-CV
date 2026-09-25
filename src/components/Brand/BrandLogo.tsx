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
      {/* Precision Geometric Monogram */}
      <div
        className={`${iconSizes[size]} rounded-xl relative flex items-center justify-center shadow-xs transition-transform hover:scale-105 overflow-hidden`}
        style={{
          background: `linear-gradient(135deg, ${accentColor} 0%, #18181b 100%)`,
        }}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4 text-white drop-shadow-xs"
        >
          {/* Stylized faceted 'A' glyph with precision craft angles */}
          <path
            d="M12 3L4 20H8.5L10.2 16H13.8L15.5 20H20L12 3Z"
            fill="currentColor"
            fillOpacity="0.95"
          />
          <path
            d="M12 7.5L10.8 13.5H13.2L12 7.5Z"
            fill="#18181b"
          />
          <circle cx="12" cy="4" r="1.5" fill="#fef08a" />
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
