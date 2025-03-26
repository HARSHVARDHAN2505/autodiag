
import React, { createContext, useState, useContext, ReactNode } from 'react';

type NavigationContextType = {
  previousPage: string;
  setPreviousPage: (page: string) => void;
  currentScan: string | null;
  setCurrentScan: (scanId: string | null) => void;
};

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const NavigationProvider = ({ children }: { children: ReactNode }) => {
  const [previousPage, setPreviousPage] = useState<string>('/');
  const [currentScan, setCurrentScan] = useState<string | null>(null);

  return (
    <NavigationContext.Provider 
      value={{ 
        previousPage, 
        setPreviousPage, 
        currentScan, 
        setCurrentScan 
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};
