import React, { Component, ReactNode, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { AuthProvider } from './components/Auth/AuthContext';
import { ToastProvider } from './components/Common/Toast';

// Guard against third-party browser extensions (Web3 wallets like MetaMask, Phantom, etc.)
// injecting scripts that throw 'Cannot redefine property: ethereum'
if (typeof window !== 'undefined') {
  window.addEventListener(
    'error',
    (event) => {
      const msg = event?.message || event?.error?.message || '';
      if (
        msg.includes('Cannot redefine property: ethereum') ||
        (msg.includes('ethereum') && msg.includes('redefine'))
      ) {
        event.stopImmediatePropagation();
        event.preventDefault();
      }
    },
    true
  );

  window.addEventListener(
    'unhandledrejection',
    (event) => {
      const reason = event?.reason?.message || String(event?.reason || '');
      if (
        reason.includes('Cannot redefine property: ethereum') ||
        (reason.includes('ethereum') && reason.includes('redefine'))
      ) {
        event.stopImmediatePropagation();
        event.preventDefault();
      }
    },
    true
  );
}

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class AppErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('App caught error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // If error is related to ethereum or extensions, ignore and continue rendering children
      const msg = this.state.error?.message || '';
      if (
        msg.includes('Cannot redefine property: ethereum') ||
        (msg.includes('ethereum') && msg.includes('redefine'))
      ) {
        return this.props.children;
      }

      return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
          <div className="max-w-md w-full bg-white p-6 rounded-2xl shadow-xl border border-slate-200 text-center space-y-4">
            <h2 className="text-lg font-bold text-slate-900">Something went wrong</h2>
            <p className="text-xs text-slate-600">
              An unexpected issue occurred. Click reload to refresh the resume editor.
            </p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg shadow-sm cursor-pointer transition-colors"
            >
              Reload Editor
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppErrorBoundary>
      <ToastProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </ToastProvider>
    </AppErrorBoundary>
  </StrictMode>,
);

