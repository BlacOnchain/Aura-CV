import React from 'react';
import { motion } from 'framer-motion';

export const BlueprintBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 opacity-20 select-none overflow-hidden">
      <svg className="w-full h-full" viewBox="0 0 1000 1000" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="blueprint-grid" width="50" height="50" patternUnits="userSpaceOnUse">
            <path d="M 50 0 L 0 0 0 50" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-zinc-400" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#blueprint-grid)" />
        
        {/* Schematic Resume Document Outline & Dimension Callouts */}
        <motion.g 
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
          className="text-zinc-300/50" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4"
        >
          <rect x="320" y="200" width="360" height="460" rx="3" />
        </motion.g>
        <g className="text-zinc-400" stroke="currentColor" strokeWidth="0.75" fontFamily="monospace" fontSize="10">
          <path d="M 320 185 L 680 185 M 320 180 L 320 190 M 680 180 L 680 190" />
          <text x="500" y="175" fill="currentColor" textAnchor="middle">A4_WIDTH: 820px</text>
          
          <path d="M 320 260 L 230 260 M 230 260 L 210 260" />
          <text x="205" y="263" textAnchor="end">SEC_01: IDENTITY</text>

          <path d="M 680 350 L 770 350 M 770 350 L 790 350" />
          <text x="795" y="353" textAnchor="start">SEC_02: EXPERIENCE_BULLETS</text>

          <path d="M 320 490 L 230 490 M 230 490 L 210 490" />
          <text x="205" y="493" textAnchor="end">SEC_03: ATS_SCORECARD</text>
        </g>
      </svg>
    </div>
  );
};
