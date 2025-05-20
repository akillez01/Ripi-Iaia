import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

type AuthContextType = {
  isAuthenticated: boolean;
  login: (email: string) => void;
  logout: () => void;
  userEmail: string | null;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      console.log('Usuário detectado:', user);
      if (user) {
        setUserEmail(user.email);
        setIsAuthenticated(true);
      } else {
        setUserEmail(null);
        setIsAuthenticated(false);
      }
      setLoading(false);
    };
    checkSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUserEmail(session.user.email);
        setIsAuthenticated(true);
      } else {
        setUserEmail(null);
        setIsAuthenticated(false);
      }
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const login = (email: string) => {
    setUserEmail(email);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setUserEmail(null);
    setIsAuthenticated(false);
    supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, userEmail, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}