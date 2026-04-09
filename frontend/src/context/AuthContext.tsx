import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { User, AuthResponse } from '../types';
import { getToken, getUser, saveToken, saveUser, removeToken, removeUser } from '../utils/tokenUtils';

interface AuthContextType {
  token: string | null;
  user: User | null;
  login: (authResponse: AuthResponse) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedToken = getToken();
    const storedUser = getUser();
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(storedUser);
    }
  }, []);

  const login = (authResponse: AuthResponse) => {
    const { token, name, email, role } = authResponse;
    const userData: User = { name, email, role };
    
    setToken(token);
    setUser(userData);
    
    saveToken(token);
    saveUser(userData);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    removeToken();
    removeUser();
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
