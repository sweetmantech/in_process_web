"use client";

import React, { createContext, useContext, useMemo } from "react";
import useMomentMedia from "@/hooks/useMomentMedia";

const MomentEditContext = createContext<ReturnType<typeof useMomentMedia> | undefined>(undefined);

const MomentEditProvider = ({ children }: { children: React.ReactNode }) => {
  const momentEdit = useMomentMedia();

  const value = useMemo(() => ({ ...momentEdit }), [momentEdit]);

  return <MomentEditContext.Provider value={value}>{children}</MomentEditContext.Provider>;
};

const useMomentEditProvider = () => {
  const context = useContext(MomentEditContext);
  if (!context) {
    throw new Error("useMomentEditProvider must be used within a MomentEditProvider");
  }
  return context;
};

export { MomentEditProvider, useMomentEditProvider };
