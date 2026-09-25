import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, Check, Shield } from 'lucide-react';

interface Props {
  onOpenPrivacy: () => void;
}

export const CookieConsentBanner: React.FC<Props> = ({ onOpenPrivacy }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('auracv_cookie_consent');
    if (!consent) {
      // Show banner after brief delay
      const timer = setTimeout(() => setIsVisible(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = (type: 'all' | 'essential') => {
    localStorage.setItem('auracv_cookie_consent', type);
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          className="fixed bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-md z-50 bg-white/95 backdrop-blur-md rounded-2xl border border-zinc-200/90 shadow-2xl p-4 sm:p-5 font-body"
        >
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-zinc-100 flex items-center justify-center text-zinc-900 shrink-0">
              <Cookie className="w-5 h-5 text-zinc-800" />
            </div>
            <div className="flex-1 space-y-1">
              <h4 className="text-xs font-bold text-zinc-900 uppercase tracking-wider flex items-center gap-1.5">
                <span>Privacy & Essential Storage</span>
                <Shield className="w-3.5 h-3.5 text-emerald-600" />
              </h4>
              <p className="text-xs text-zinc-500 leading-relaxed">
                We use strictly essential local storage to save your resume drafts and maintain secure sessions. No cross-site marketing trackers are used.{' '}
                <button
                  type="button"
                  onClick={onOpenPrivacy}
                  className="text-zinc-900 font-semibold underline underline-offset-2 hover:text-black cursor-pointer inline"
                >
                  Learn more
                </button>
              </p>
            </div>
          </div>

          <div className="mt-3.5 pt-3 border-t border-zinc-100 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => handleAccept('essential')}
              className="min-h-[44px] min-w-[44px] px-3.5 py-2 text-xs font-semibold text-zinc-600 hover:text-zinc-900 transition-colors rounded-xl cursor-pointer"
            >
              Essential Only
            </button>
            <button
              type="button"
              onClick={() => handleAccept('all')}
              className="min-h-[44px] min-w-[44px] px-4 py-2 bg-zinc-950 hover:bg-zinc-800 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer active:scale-95"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Accept Preferences</span>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
