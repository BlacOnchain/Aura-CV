import React, { createContext, useContext, useEffect, useState } from 'react';

export interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  auth_method: 'google' | 'email';
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  loginWithGoogle: () => void;
  loginWithEmail: (email: string, password: string) => Promise<void>;
  registerWithEmail: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  getToken: () => Promise<string | null>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY_TOKEN = 'auracv_auth_token';
const STORAGE_KEY_USER = 'auracv_user';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_USER);
      return saved ? JSON.parse(saved) : null;
    } catch (_) {
      return null;
    }
  });
  const [token, setToken] = useState<string | null>(localStorage.getItem(STORAGE_KEY_TOKEN));
  const [loading, setLoading] = useState(true);

  const apiUrl = import.meta.env.VITE_API_URL || '';

  useEffect(() => {
    // Check for password reset action in URL specifically before generic OAuth token check
    const urlParams = new URLSearchParams(window.location.search);
    const action = urlParams.get('action');
    const resetTokenParam = urlParams.get('token');

    if (action === 'reset-password' && resetTokenParam) {
      setLoading(false);
      return;
    }

    // Check for token in URL (callback from Google)
    const urlToken = urlParams.get('token');
    
    if (urlToken) {
      handleLoginSuccess(urlToken);
      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname);
    } else if (token) {
      fetchUser(token);
    } else {
      setLoading(false);
    }
  }, []);

  const handleLoginSuccess = (newToken: string, userObj?: User) => {
    setToken(newToken);
    localStorage.setItem(STORAGE_KEY_TOKEN, newToken);
    if (userObj) {
      setUser(userObj);
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(userObj));
    } else {
      fetchUser(newToken);
    }
  };

  const fetchUser = async (authToken: string) => {
    if (authToken.startsWith('session-token-')) {
      const storedUser = localStorage.getItem(STORAGE_KEY_USER);
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
          setLoading(false);
          return;
        } catch (_) {}
      }
      const defaultUser: User = {
        id: 101,
        name: 'Studio Professional',
        email: 'user@auracv.studio',
        auth_method: 'email'
      };
      setUser(defaultUser);
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(defaultUser));
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/api/v1/user`, {
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Accept': 'application/json'
        }
      });
      const contentType = response.headers.get('content-type') || '';
      if (response.ok && contentType.includes('application/json')) {
        const userData = await response.json();
        setUser(userData);
        localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(userData));
      } else if (!response.ok && response.status !== 404) {
        logoutLocal();
      }
    } catch (error) {
      console.error('Failed to fetch user', error);
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = () => {
    if (apiUrl) {
      window.location.href = `${apiUrl}/api/v1/auth/google/redirect`;
    } else {
      const mockUser: User = {
        id: Date.now(),
        name: 'Google User',
        email: 'google.user@auracv.studio',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256',
        auth_method: 'google'
      };
      handleLoginSuccess(`session-token-${Date.now()}`, mockUser);
    }
  };

  const loginWithEmail = async (email: string, password: string) => {
    if (apiUrl) {
      try {
        const response = await fetch(`${apiUrl}/api/v1/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify({ email, password })
        });

        const contentType = response.headers.get('content-type') || '';
        if (contentType.includes('application/json')) {
          const data = await response.json();
          if (!response.ok) {
            throw new Error(data.message || 'Login failed');
          }
          handleLoginSuccess(data.access_token, data.user);
          return;
        }
      } catch (e: any) {
        if (e.message && !e.message.includes('Unexpected token') && !e.message.includes('Failed to fetch')) {
          throw e;
        }
      }
    }

    // Static GitHub Pages Session Fallback
    const mockUser: User = {
      id: Date.now(),
      name: email.split('@')[0] || 'Studio Professional',
      email: email,
      auth_method: 'email'
    };
    handleLoginSuccess(`session-token-${Date.now()}`, mockUser);
  };

  const registerWithEmail = async (name: string, email: string, password: string) => {
    if (apiUrl) {
      try {
        const response = await fetch(`${apiUrl}/api/v1/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify({ name, email, password })
        });

        const contentType = response.headers.get('content-type') || '';
        if (contentType.includes('application/json')) {
          const data = await response.json();
          if (!response.ok) {
            throw new Error(data.message || 'Registration failed');
          }
          handleLoginSuccess(data.access_token, data.user);
          return;
        }
      } catch (e: any) {
        if (e.message && !e.message.includes('Unexpected token') && !e.message.includes('Failed to fetch')) {
          throw e;
        }
      }
    }

    // Static GitHub Pages Session Fallback
    const mockUser: User = {
      id: Date.now(),
      name: name || email.split('@')[0] || 'Studio Professional',
      email: email,
      auth_method: 'email'
    };
    handleLoginSuccess(`session-token-${Date.now()}`, mockUser);
  };

  const logoutLocal = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem(STORAGE_KEY_TOKEN);
    localStorage.removeItem(STORAGE_KEY_USER);
  };

  const logout = async () => {
    if (token) {
      try {
        await fetch(`${apiUrl}/api/v1/logout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json'
          }
        });
      } catch (error) {
        console.error('Logout request failed', error);
      }
    }
    logoutLocal();
  };

  const getToken = async () => {
    return token;
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      token,
      loading, 
      loginWithGoogle, 
      loginWithEmail, 
      registerWithEmail,
      logout, 
      getToken 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
