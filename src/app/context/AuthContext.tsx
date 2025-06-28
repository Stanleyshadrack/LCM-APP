"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

// Define user roles
export type Role = "owner" | "employee" | "tenant";

interface User {
  role: Role;
  name?: string;      // Optional fields you can expand
  token?: string;
}

// Context type
interface AuthContextType {
  user: User | null;
  login: (role: Role) => void;
  logout: () => void;
  loading: boolean;
}

// Create context
const AuthContext = createContext<AuthContextType | null>(null);

// Export custom hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};

// Provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
    setLoading(false);
  }, []);

  // Sync logout across tabs
  useEffect(() => {
    const handleStorageChange = () => {
      const storedUser = localStorage.getItem("user");
      setUser(storedUser ? JSON.parse(storedUser) : null);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Simulated login
  const login = (role: Role) => {
    const userData: User = { role };
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  // Logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
