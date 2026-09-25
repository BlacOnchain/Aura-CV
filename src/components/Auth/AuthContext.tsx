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

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem(STORAGE_KEY_TOKEN));
  const [loading, setLoading] = useState(true);

  const apiUrl = import.meta.env.VITE_API_URL || '';

  useEffect(() => {
    // Check for token in URL (callback from Google)
    const urlParams = new URLSearchParams(window.location.search);
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

  const handleLoginSuccess = (newToken: string) => {
    setToken(newToken);
    localStorage.setItem(STORAGE_KEY_TOKEN, newToken);
    fetchUser(newToken);
  };

  const fetchUser = async (authToken: string) => {
    try {
      const response = await fetch(`${apiUrl}/api/v1/user`, {
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Accept': 'application/json'
        }
      });
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        // Token might be invalid/expired
        logoutLocal();
      }
    } catch (error) {
      console.error('Failed to fetch user', error);
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = () => {
    window.location.href = `${apiUrl}/api/v1/auth/google/redirect`;
  };

  const loginWithEmail = async (email: string, password: string) => {
    const response = await fetch(`${apiUrl}/api/v1/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Login failed');
    }

    const data = await response.json();
    handleLoginSuccess(data.access_token);
    setUser(data.user);
  };

  const registerWithEmail = async (name: string, email: string, password: string) => {
    const response = await fetch(`${apiUrl}/api/v1/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Registration failed');
    }

    const data = await response.json();
    handleLoginSuccess(data.access_token);
    setUser(data.user);
  };

  const logoutLocal = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem(STORAGE_KEY_TOKEN);
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
