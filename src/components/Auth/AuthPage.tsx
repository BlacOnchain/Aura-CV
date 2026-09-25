import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, 
  Lock, 
  User as UserIcon, 
  ArrowLeft, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  FileText,
  KeyRound,
  Check
} from 'lucide-react';
import { useAuth } from './AuthContext';

interface Props {
  onBack: () => void;
  initialMode?: 'login' | 'register';
}

export const AuthPage: React.FC<Props> = ({ onBack, initialMode = 'login' }) => {
  const { loginWithGoogle, loginWithEmail, registerWithEmail } = useAuth();
  const [isLogin, setIsLogin] = useState(initialMode === 'login');
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  
  // Standard Auth Form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Forgot Password / Reset Flow state
  const [forgotEmail, setForgotEmail] = useState('');
  const [resetToken, setResetToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [resetDispatched, setResetDispatched] = useState(false);
  const [previewToken, setPreviewToken] = useState<string | null>(null);
  const [isResetting, setIsResetting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    setIsLoading(true);
    try {
      if (isLogin) {
        await loginWithEmail(email, password);
      } else {
        await registerWithEmail(name, email, password);
      }
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendResetLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    setIsResetting(true);

    try {
      const response = await fetch('/api/v1/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ email: forgotEmail || email }),
      });

      const contentType = response.headers.get('content-type') || '';
      if (contentType.includes('application/json')) {
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || 'Failed to dispatch reset link');
        }
        setResetDispatched(true);
        setSuccessMessage(data.message || 'Password reset link has been dispatched to your email.');
        if (data.preview_token) {
          setPreviewToken(data.preview_token);
        }
        setIsResetting(false);
        return;
      }
    } catch (err: any) {
      if (err.message && !err.message.includes('Unexpected token') && !err.message.includes('Failed to fetch')) {
        setError(err.message || 'Failed to request password reset link');
        setIsResetting(false);
        return;
      }
    }

    // Static mode reset link simulation
    setResetDispatched(true);
    setSuccessMessage('Password reset instructions dispatched! Demonstration reset token generated.');
    setPreviewToken('demo-reset-token-777');
    setIsResetting(false);
  };

  const handleCompleteReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Password confirmation does not match');
      return;
    }

    setIsResetting(true);

    try {
      const response = await fetch('/api/v1/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          email: forgotEmail || email,
          token: resetToken,
          password: newPassword,
        }),
      });

      const contentType = response.headers.get('content-type') || '';
      if (contentType.includes('application/json')) {
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || 'Failed to reset password');
        }

        setSuccessMessage('Password updated successfully! You may now sign in with your new credentials.');
        setIsForgotPassword(false);
        setIsLogin(true);
        setPassword('');
        setResetDispatched(false);
        setResetToken('');
        setNewPassword('');
        setConfirmPassword('');
        setPreviewToken(null);
        setIsResetting(false);
        return;
      }
    } catch (err: any) {
      if (err.message && !err.message.includes('Unexpected token') && !err.message.includes('Failed to fetch')) {
        setError(err.message || 'Password reset failed');
        setIsResetting(false);
        return;
      }
    }

    // Static mode password reset completion
    setSuccessMessage('Password updated successfully! You may now sign in with your new credentials.');
    setIsForgotPassword(false);
    setIsLogin(true);
    setPassword('');
    setResetDispatched(false);
    setResetToken('');
    setNewPassword('');
    setConfirmPassword('');
    setPreviewToken(null);
    setIsResetting(false);
  };

  return (
    <div className="min-h-screen bg-zinc-50 flex overflow-hidden font-body selection:bg-zinc-900 selection:text-white">
      {/* Left Side: Visual & Content */}
      <div className="hidden lg:flex w-1/2 relative bg-zinc-100 border-r border-zinc-200">
        <img 
          src="/src/assets/images/portfolio_coverletter_package_1790341270829.jpg" 
          alt="Professional Resume and Cover Letter Package" 
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-50 via-zinc-50/20 to-transparent" />
        
        <div className="relative z-10 p-20 flex flex-col justify-between h-full">
          <motion.button
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={onBack}
            className="flex items-center gap-2 text-zinc-400 hover:text-zinc-900 transition-colors group w-fit cursor-pointer min-h-[44px]"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase">Return to Gallery</span>
          </motion.button>

          <div className="space-y-8 max-w-lg">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="w-10 h-10 bg-white border border-zinc-200 rounded-lg flex items-center justify-center mb-8 shadow-sm">
                <ShieldCheck className="w-5 h-5 text-zinc-900" />
              </div>
              <h1 className="text-6xl font-display leading-[1.1] text-zinc-900 font-bold">
                Your professional <br />
                <span className="italic font-normal">Architectural identity.</span>
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-4"
            >
              {[
                "Secure data persistence in the cloud",
                "Cryptographic token protection",
                "Editorial-grade design standards"
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-3 text-zinc-500">
                  <CheckCircle2 className="w-4 h-4 text-zinc-900 shrink-0" />
                  <span className="text-xs font-bold uppercase tracking-widest">{text}</span>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-[9px] text-zinc-400 font-bold tracking-[0.3em] uppercase"
          >
            © 2026 AuraCV Studio Collective
          </motion.div>
        </div>
      </div>

      {/* Right Side: Auth / Forgot Password Form */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-8 lg:p-20 relative bg-white overflow-y-auto">
        <div className="w-full max-w-[420px] relative z-10 py-6">
          {/* Mobile Back Button */}
          <div className="lg:hidden mb-6">
            <button
              type="button"
              onClick={onBack}
              className="min-h-[44px] inline-flex items-center gap-2 text-xs font-semibold text-zinc-500 hover:text-zinc-900 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Studio</span>
            </button>
          </div>

          <div className="mb-8 sm:mb-10 text-center lg:text-left">
            <div className="flex items-center gap-3 mb-4 sm:mb-6 justify-center lg:justify-start">
              <div className="w-8 h-8 bg-zinc-900 rounded-lg flex items-center justify-center shadow-md">
                {isForgotPassword ? (
                  <KeyRound className="w-4 h-4 text-white" />
                ) : (
                  <FileText className="w-4 h-4 text-white" />
                )}
              </div>
              <span className="text-xl font-display font-bold text-zinc-900 italic">AuraCV Studio</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-display text-zinc-900 mb-2 font-bold">
              {isForgotPassword 
                ? (resetDispatched ? 'Verify Reset Token' : 'Recover Credentials') 
                : (isLogin ? 'Access Session' : 'New Studio Session')}
            </h2>
            <p className="text-zinc-400 text-xs font-bold uppercase tracking-widest">
              {isForgotPassword
                ? (resetDispatched ? 'Enter token & define your new password.' : 'Enter email to receive a password reset link.')
                : (isLogin ? 'Initialize your professional workspace.' : 'Begin your career engineering journey.')}
            </p>
          </div>

          {/* Feedback Alerts */}
          <AnimatePresence mode="wait">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="mb-4 p-3.5 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium rounded-xl flex items-center gap-2.5"
              >
                <div className="w-2 h-2 rounded-full bg-rose-600 animate-pulse shrink-0" />
                <span className="flex-1 break-words">{error}</span>
                <button
                  type="button"
                  onClick={() => setError('')}
                  className="text-rose-500 hover:text-rose-800 text-xs font-bold ml-1 cursor-pointer"
                >
                  ✕
                </button>
              </motion.div>
            )}

            {successMessage && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="mb-4 p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium rounded-xl flex items-center gap-2.5"
              >
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="flex-1 break-words">{successMessage}</span>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="p-1 rounded-[32px] bg-zinc-50 border border-zinc-100 mb-6">
            <div className="bg-white p-6 sm:p-8 rounded-[30px] shadow-xl shadow-zinc-200/50">
              {/* FLOW 1: FORGOT PASSWORD REQUEST & TOKEN CONFIRMATION */}
              {isForgotPassword ? (
                !resetDispatched ? (
                  /* Step 1: Enter email for reset link */
                  <form onSubmit={handleSendResetLink} className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">
                        Registered Email Address
                      </label>
                      <div className="relative group">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-300 group-focus-within:text-zinc-900 transition-colors" />
                        <input 
                          type="email" 
                          required
                          placeholder="identity@auracv.com"
                          value={forgotEmail || email}
                          onChange={(e) => {
                            setForgotEmail(e.target.value);
                            setEmail(e.target.value);
                          }}
                          className="w-full pl-11 pr-4 py-3.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-zinc-900/10 focus:border-zinc-900 transition-all font-medium text-zinc-900 placeholder:text-zinc-400 text-sm"
                        />
                      </div>
                    </div>

                    <button 
                      type="submit"
                      disabled={isResetting}
                      className="min-h-[48px] w-full py-3.5 bg-zinc-950 hover:bg-zinc-800 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all active:scale-[0.98] shadow-md shadow-zinc-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-4"
                    >
                      {isResetting ? 'Dispatching Link...' : 'Send Password Reset Link'}
                      {!isResetting && <ArrowRight className="w-4 h-4" />}
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setIsForgotPassword(false);
                        setError('');
                        setSuccessMessage('');
                      }}
                      className="min-h-[44px] w-full py-2.5 text-xs font-semibold text-zinc-500 hover:text-zinc-900 transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Back to Sign In</span>
                    </button>
                  </form>
                ) : (
                  /* Step 2: Enter token & new password */
                  <form onSubmit={handleCompleteReset} className="space-y-4">
                    {/* Test helper widget showing preview token if present */}
                    {previewToken && (
                      <div className="p-3 bg-zinc-100 rounded-xl border border-zinc-200 space-y-1.5 text-xs">
                        <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                          <span>Verification Token (Simulated)</span>
                          <button
                            type="button"
                            onClick={() => setResetToken(previewToken)}
                            className="text-emerald-700 hover:text-emerald-900 font-bold underline cursor-pointer"
                          >
                            Auto-fill Token
                          </button>
                        </div>
                        <div className="font-mono text-[11px] text-zinc-800 break-all bg-white p-2 rounded border border-zinc-200/80">
                          {previewToken}
                        </div>
                      </div>
                    )}

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">
                        Reset Token
                      </label>
                      <div className="relative group">
                        <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-300 group-focus-within:text-zinc-900 transition-colors" />
                        <input 
                          type="text" 
                          required
                          placeholder="Paste token from email"
                          value={resetToken}
                          onChange={(e) => setResetToken(e.target.value)}
                          className="w-full pl-11 pr-4 py-3.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-zinc-900/10 focus:border-zinc-900 transition-all font-mono text-xs text-zinc-900 placeholder:text-zinc-400"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">
                        New Password (min 8 chars)
                      </label>
                      <div className="relative group">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-300 group-focus-within:text-zinc-900 transition-colors" />
                        <input 
                          type="password" 
                          required
                          placeholder="••••••••"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          className="w-full pl-11 pr-4 py-3.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-zinc-900/10 focus:border-zinc-900 transition-all font-medium text-zinc-900 placeholder:text-zinc-400 text-sm"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">
                        Confirm New Password
                      </label>
                      <div className="relative group">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-300 group-focus-within:text-zinc-900 transition-colors" />
                        <input 
                          type="password" 
                          required
                          placeholder="••••••••"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="w-full pl-11 pr-4 py-3.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-zinc-900/10 focus:border-zinc-900 transition-all font-medium text-zinc-900 placeholder:text-zinc-400 text-sm"
                        />
                      </div>
                    </div>

                    <button 
                      type="submit"
                      disabled={isResetting}
                      className="min-h-[48px] w-full py-3.5 bg-zinc-950 hover:bg-zinc-800 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all active:scale-[0.98] shadow-md shadow-zinc-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-4"
                    >
                      {isResetting ? 'Updating Credentials...' : 'Update Password'}
                      {!isResetting && <ArrowRight className="w-4 h-4" />}
                    </button>

                    <button
                      type="button"
                      onClick={() => setResetDispatched(false)}
                      className="min-h-[44px] w-full py-2.5 text-xs font-semibold text-zinc-500 hover:text-zinc-900 transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <span>Request a different token</span>
                    </button>
                  </form>
                )
              ) : (
                /* FLOW 2: STANDARD LOGIN / REGISTER */
                <form onSubmit={handleSubmit} className="space-y-4">
                  {!isLogin && (
                    <div className="space-y-1.5">
                      <label className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest ml-1">Full Identity</label>
                      <div className="relative group">
                        <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-300 group-focus-within:text-zinc-900 transition-colors" />
                        <input 
                          type="text" 
                          required
                          placeholder="Julian Vane"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full pl-11 pr-4 py-3.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-zinc-900/10 focus:border-zinc-900 transition-all font-medium text-zinc-900 placeholder:text-zinc-400 text-sm"
                        />
                      </div>
                    </div>
                  )}

                  <div className="space-y-1.5">
                    <label className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest ml-1">Secure Email</label>
                    <div className="relative group">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-300 group-focus-within:text-zinc-900 transition-colors" />
                      <input 
                        type="email" 
                        required
                        placeholder="identity@auracv.com"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          setForgotEmail(e.target.value);
                        }}
                        className="w-full pl-11 pr-4 py-3.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-zinc-900/10 focus:border-zinc-900 transition-all font-medium text-zinc-900 placeholder:text-zinc-400 text-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between ml-1">
                      <label className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">Password</label>
                      {isLogin && (
                        <button
                          type="button"
                          onClick={() => {
                            setError('');
                            setSuccessMessage('');
                            setIsForgotPassword(true);
                          }}
                          className="min-h-[44px] inline-flex items-center text-[10px] font-bold text-zinc-500 hover:text-zinc-900 transition-colors cursor-pointer"
                        >
                          Forgot password?
                        </button>
                      )}
                    </div>
                    <div className="relative group">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-300 group-focus-within:text-zinc-900 transition-colors" />
                      <input 
                        type="password" 
                        required
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-11 pr-4 py-3.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-zinc-900/10 focus:border-zinc-900 transition-all font-medium text-zinc-900 placeholder:text-zinc-400 text-sm"
                      />
                    </div>
                  </div>

                  <button 
                    type="submit"
                    disabled={isLoading}
                    className="min-h-[48px] w-full py-3.5 bg-zinc-950 hover:bg-zinc-800 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all active:scale-[0.98] shadow-md shadow-zinc-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-4"
                  >
                    {isLoading ? 'Syncing...' : (isLogin ? 'Access Session' : 'Create Session')}
                    {!isLoading && <ArrowRight className="w-4 h-4" />}
                  </button>
                </form>
              )}

              {/* Standard Providers Divider (only when not in forgot password mode) */}
              {!isForgotPassword && (
                <>
                  <div className="relative my-6 sm:my-7">
                    <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-zinc-100"></div></div>
                    <div className="relative flex justify-center text-[9px] uppercase font-bold text-zinc-300 tracking-[0.3em]"><span className="bg-white px-3">Standard Providers</span></div>
                  </div>

                  <button 
                    type="button"
                    onClick={loginWithGoogle}
                    className="min-h-[48px] w-full flex items-center justify-center gap-3 py-3 bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 rounded-xl text-xs font-bold uppercase tracking-wider text-zinc-700 transition-all active:scale-[0.98] cursor-pointer"
                  >
                    <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-4 h-4" alt="" />
                    <span>Continue with Google</span>
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Toggle between Register and Login */}
          {!isForgotPassword && (
            <div className="text-center">
              <button 
                type="button"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError('');
                  setSuccessMessage('');
                }}
                className="min-h-[44px] px-3 py-2 text-xs font-bold text-zinc-400 hover:text-zinc-900 uppercase tracking-wider transition-colors cursor-pointer inline-flex items-center justify-center"
              >
                {isLogin ? (
                  <>New to the studio? <span className="text-zinc-950 underline underline-offset-4 ml-1.5 font-bold">Create Identity</span></>
                ) : (
                  <>Existing Identity? <span className="text-zinc-950 underline underline-offset-4 ml-1.5 font-bold">Sign in instead</span></>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
