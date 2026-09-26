import React from 'react';

export const BlueprintBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 opacity-40 select-none overflow-hidden">
      <svg className="w-full h-full" viewBox="0 0 1000 1000" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="blueprint-grid" width="50" height="50" patternUnits="userSpaceOnUse">
            <path d="M 50 0 L 0 0 0 50" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-zinc-200" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#blueprint-grid)" />
        
        {/* Continuous vertical guide-lines */}
        <path d="M 100 0 L 100 1000 M 500 0 L 500 1000 M 900 0 L 900 1000" stroke="currentColor" strokeWidth="0.5" className="text-zinc-300" strokeDasharray="10 5" />
      </svg>
    </div>
  );
};
