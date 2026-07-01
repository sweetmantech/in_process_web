"use client";

import useMobileDrawers from "@/hooks/useMobileDrawers";
import { createContext, useContext, type ReactNode } from "react";

const MobileDrawersContext = createContext<ReturnType<typeof useMobileDrawers> | undefined>(
  undefined
);

const MobileDrawersProvider = ({ children }: { children: ReactNode }) => {
  const mobileDrawers = useMobileDrawers();

  return (
    <MobileDrawersContext.Provider value={mobileDrawers}>{children}</MobileDrawersContext.Provider>
  );
};

const useMobileDrawersProvider = () => {
  const context = useContext(MobileDrawersContext);
  if (!context) {
    throw new Error("useMobileDrawersProvider must be used within a MobileDrawersProvider");
  }
  return context;
};

export { MobileDrawersProvider, useMobileDrawersProvider };
