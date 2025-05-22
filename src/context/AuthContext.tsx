import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

type AuthContextType = {
  isAuthenticated: boolean;
  login: (email: string, role?: string | null) => void;
  logout: () => Promise<void>;
  userEmail: string | null;
  userRole: string | null;
  loading: boolean;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Busca o papel do usuário na tabela users
  const fetchUserRole = async (userId: string) => {
    const { data, error } = await supabase
      .from('users')
      .select('role')
      .eq('id', userId)
      .single();
    if (!error && data) {
      setUserRole(data.role);
    } else {
      setUserRole(null);
    }
  };

  useEffect(() => {
    const checkSession = async () => {
      setLoading(true);
      const { data: { session } } = await supabase.auth.getSession();
      const user = session?.user;
      if (user) {
        setUserEmail(user.email ?? null);
        setIsAuthenticated(true);
        await fetchUserRole(user.id);
      } else {
        setUserEmail(null);
        setIsAuthenticated(false);
        setUserRole(null);
      }
      setLoading(false);
    };
    checkSession();

    const { data: listener } = supabase.auth.onAuthStateChange(async (_event, session) => {
      const user = session?.user;
      if (user) {
        setUserEmail(user.email ?? null);
        setIsAuthenticated(true);
        await fetchUserRole(user.id);
      } else {
        setUserEmail(null);
        setIsAuthenticated(false);
        setUserRole(null);
      }
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const login = (email: string, role?: string | null) => {
    setUserEmail(email);
    setIsAuthenticated(true);
    if (role) setUserRole(role);
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUserEmail(null);
    setIsAuthenticated(false);
    setUserRole(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, userEmail, userRole, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}