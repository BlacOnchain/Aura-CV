import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, X, Lock, CheckCircle2, Server } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyPolicyModal: React.FC<Props> = ({ isOpen, onClose }) => {
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
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-display font-bold text-zinc-900 leading-tight">Privacy Policy</h3>
                  <p className="text-xs text-zinc-500 font-medium">Last updated: September 2026 · AuraCV Studio</p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="min-h-[44px] min-w-[44px] rounded-full hover:bg-zinc-100 flex items-center justify-center text-zinc-400 hover:text-zinc-900 transition-colors cursor-pointer"
                aria-label="Close Privacy Policy"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="py-5 space-y-5 text-xs text-zinc-600 leading-relaxed font-body">
              <section className="space-y-2">
                <h4 className="text-sm font-bold text-zinc-900 flex items-center gap-2">
                  <Lock className="w-4 h-4 text-emerald-600" />
                  1. Zero Data Brokerage Commitment
                </h4>
                <p>
                  AuraCV Studio is engineered with a strict privacy-first principle. We do not sell, rent, or monetize your resume content, job application details, or personal contact information to any third-party advertisers or recruitment brokers.
                </p>
              </section>

              <section className="space-y-2">
                <h4 className="text-sm font-bold text-zinc-900 flex items-center gap-2">
                  <Server className="w-4 h-4 text-emerald-600" />
                  2. Information We Process
                </h4>
                <p>
                  We process career information you voluntarily enter or upload, including:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-zinc-700">
                  <li>Contact details (name, email, phone, location) for resume formatting.</li>
                  <li>Professional experience, metrics, educational history, and skill tags.</li>
                  <li>Target job postings provided for ATS keyword matching.</li>
                </ul>
              </section>

              <section className="space-y-2">
                <h4 className="text-sm font-bold text-zinc-900 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  3. Client-Side & Local Storage Control
                </h4>
                <p>
                  Your drafts and session state are persisted securely in your local browser storage and private session tokens. You maintain 100% control to export, clone, or wipe your resume data from your browser at any time.
                </p>
              </section>

              <section className="space-y-2">
                <h4 className="text-sm font-bold text-zinc-900">4. AI Processing Safeguards</h4>
                <p>
                  When utilizing AI Bullet Polish or Executive Summary generators, text is processed securely server-side through encrypted TLS channels. Your prompts are strictly isolated to your session and are not used for public model training.
                </p>
              </section>

              <section className="space-y-2">
                <h4 className="text-sm font-bold text-zinc-900">5. Contact & Rights</h4>
                <p>
                  You have the right to request deletion of any session data. For privacy inquiries, please contact <span className="font-mono text-zinc-900">privacy@auracv.com</span>.
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
                Understood & Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
