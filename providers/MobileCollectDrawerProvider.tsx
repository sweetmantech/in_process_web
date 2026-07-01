"use client";

import useMobileCollectDrawer from "@/hooks/useMobileCollectDrawer";
import { createContext, useContext, type ReactNode } from "react";

const MobileCollectDrawerContext = createContext<
  ReturnType<typeof useMobileCollectDrawer> | undefined
>(undefined);

const MobileCollectDrawerProvider = ({ children }: { children: ReactNode }) => {
  const mobileCollectDrawer = useMobileCollectDrawer();

  return (
    <MobileCollectDrawerContext.Provider value={mobileCollectDrawer}>
      {children}
    </MobileCollectDrawerContext.Provider>
  );
};

const useMobileCollectDrawerProvider = () => {
  const context = useContext(MobileCollectDrawerContext);
  if (!context) {
    throw new Error(
      "useMobileCollectDrawerProvider must be used within a MobileCollectDrawerProvider"
    );
  }
  return context;
};

export { MobileCollectDrawerProvider, useMobileCollectDrawerProvider };
