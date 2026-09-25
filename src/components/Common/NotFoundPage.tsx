import React from 'react';
import { ArrowLeft, FileQuestion, Home } from 'lucide-react';

interface Props {
  onReturnHome: () => void;
}

export const NotFoundPage: React.FC<Props> = ({ onReturnHome }) => {
  return (
    <div className="min-h-screen bg-zinc-50 flex items-center justify-center p-6 text-zinc-900 font-body">
      <div className="max-w-md w-full text-center space-y-6 bg-white p-8 sm:p-10 rounded-3xl border border-zinc-200 shadow-xl">
        <div className="w-16 h-16 bg-zinc-100 rounded-2xl mx-auto flex items-center justify-center text-zinc-900 shadow-xs">
          <FileQuestion className="w-8 h-8 text-zinc-700" />
        </div>

        <div className="space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-widest text-zinc-400">Error 404</span>
          <h1 className="text-3xl font-display font-bold text-zinc-900">
            Document Not Found
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed">
            The studio route or resume document you requested does not exist or has been relocated.
          </p>
        </div>

        <div className="pt-2 flex flex-col gap-2.5">
          <button
            type="button"
            onClick={onReturnHome}
            className="min-h-[48px] w-full px-5 py-3 bg-zinc-950 hover:bg-zinc-800 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all active:scale-[0.98] shadow-md flex items-center justify-center gap-2 cursor-pointer"
          >
            <Home className="w-4 h-4" />
            <span>Return to Studio Home</span>
          </button>
        </div>
      </div>
    </div>
  );
};
