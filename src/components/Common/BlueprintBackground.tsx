import React from 'react';

export const BlueprintBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 opacity-40 select-none overflow-hidden">
      <svg className="w-full h-full" viewBox="0 0 1000 2000" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="blueprint-grid" width="50" height="50" patternUnits="userSpaceOnUse">
            <path d="M 50 0 L 0 0 0 50" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-zinc-200" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#blueprint-grid)" />
        
        {/* Schematic Resume Document Outline & Dimension Callouts */}
        <g className="text-zinc-300/80" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4">
          <rect x="320" y="100" width="360" height="460" rx="3" />
        </g>
        <g className="text-zinc-400" stroke="currentColor" strokeWidth="0.75" fontFamily="monospace" fontSize="10">
          <path d="M 320 85 L 680 85 M 320 80 L 320 90 M 680 80 L 680 90" />
          <text x="500" y="75" fill="currentColor" textAnchor="middle">A4_WIDTH: 820px</text>
          
          <path d="M 320 160 L 230 160 M 230 160 L 210 160" />
          <text x="205" y="163" textAnchor="end">SEC_01: IDENTITY</text>

          <path d="M 680 250 L 770 250 M 770 250 L 790 250" />
          <text x="795" y="253" textAnchor="start">SEC_02: EXPERIENCE_BULLETS</text>

          <path d="M 320 390 L 230 390 M 230 390 L 210 390" />
          <text x="205" y="393" textAnchor="end">SEC_03: ATS_SCORECARD</text>

          {/* Workflow Callout */}
          <path d="M 900 1000 L 950 1000" />
          <text x="955" y="1003">SEC_04: WORKFLOW</text>
          
          {/* CTA Callout */}
          <path d="M 100 1800 L 50 1800" />
          <text x="45" y="1803" textAnchor="end">SEC_05: FINAL_CTA</text>
        </g>
      </svg>
    </div>
  );
};
