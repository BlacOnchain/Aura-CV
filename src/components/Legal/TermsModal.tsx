import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, X } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const TermsModal: React.FC<Props> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-zinc-950/60 backdrop-blur-xs"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 15 }}
            className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-zinc-200 p-6 sm:p-8 max-h-[88vh] overflow-y-auto z-10"
          >
            {/* Header */}
            <div className="flex items-start justify-between pb-4 border-b border-zinc-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-zinc-100 flex items-center justify-center text-zinc-900 shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-display font-bold text-zinc-900 leading-tight">Terms & Conditions</h3>
                  <p className="text-xs text-zinc-500 font-medium">Standard Software & Service Terms · AuraCV Studio</p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="min-h-[44px] min-w-[44px] rounded-full hover:bg-zinc-100 flex items-center justify-center text-zinc-400 hover:text-zinc-900 transition-colors cursor-pointer"
                aria-label="Close Terms"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="py-5 space-y-5 text-xs text-zinc-600 leading-relaxed font-body">
              <section className="space-y-2">
                <h4 className="text-sm font-bold text-zinc-900">1. Acceptance of Terms</h4>
                <p>
                  By accessing or utilizing AuraCV Studio, you agree to comply with and be bound by these Terms and Conditions. If you do not agree to these terms, please discontinue use of the platform.
                </p>
              </section>

              <section className="space-y-2">
                <h4 className="text-sm font-bold text-zinc-900">2. Intellectual Property & Document Ownership</h4>
                <p>
                  You retain full, exclusive ownership of all resume content, personal experience narratives, and materials that you author or import. AuraCV Studio grants you an unrestricted license to export, print, and distribute generated PDF and plain-text assets.
                </p>
              </section>

              <section className="space-y-2">
                <h4 className="text-sm font-bold text-zinc-900">3. Permitted & Acceptable Use</h4>
                <p>
                  You agree to use AuraCV Studio solely for lawful employment and career engineering purposes. You may not attempt to reverse engineer, abuse rate limits, or perform automated denial-of-service scans on the studio infrastructure.
                </p>
              </section>

              <section className="space-y-2">
                <h4 className="text-sm font-bold text-zinc-900">4. Disclaimer of Warranty</h4>
                <p>
                  AuraCV Studio provides career optimization tools, ATS simulations, and narrative recommendations. While our metrics align with industry best practices (Google XYZ framework, Workday heuristics), we do not guarantee specific interview or hiring outcomes.
                </p>
              </section>
            </div>

            {/* Footer */}
            <div className="pt-4 border-t border-zinc-100 flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="min-h-[44px] min-w-[44px] px-5 py-2.5 bg-zinc-950 text-white rounded-xl text-xs font-semibold hover:bg-zinc-800 transition-colors cursor-pointer"
              >
                Accept & Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
