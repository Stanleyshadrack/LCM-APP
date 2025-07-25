"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the shape of your context data
type AppContextType = {
  user?: { name: string }; // you can expand this later
  setUser: (user: { name: string } | undefined) => void;
};

// Create context with default empty implementation
const AppContext = createContext<AppContextType | undefined>(undefined);

// Provider props
type ClientProviderProps = {
  children: ReactNode;
};

export const ClientProvider: React.FC<ClientProviderProps> = ({ children }) => {
  const [user, setUser] = useState<{ name: string } | undefined>(undefined);

  return (
    <AppContext.Provider value={{ user, setUser }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook for easier access
export const useClientContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useClientContext must be used within a ClientProvider");
  }
  return context;
};

export default ClientProvider;