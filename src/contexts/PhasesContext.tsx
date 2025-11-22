// src/context/PhasesContext.tsx
import { createContext, useContext, useState, ReactNode } from "react";

interface PhasesContextType {
  currentPhaseId: string;
  setCurrentPhaseId: (id: string) => void;
}

const PhasesContext = createContext<PhasesContextType | undefined>(undefined);

export const PhasesProvider = ({ children }: { children: ReactNode }) => {
  const [currentPhaseId, setCurrentPhaseId] = useState("preparacao");

  return (
    <PhasesContext.Provider value={{ currentPhaseId, setCurrentPhaseId }}>
      {children}
    </PhasesContext.Provider>
  );
};

export const usePhaseNavigation = () => {
  const context = useContext(PhasesContext);
  if (!context) {
    throw new Error("usePhaseNavigation deve ser usado dentro de PhasesProvider");
  }
  return context;
};
