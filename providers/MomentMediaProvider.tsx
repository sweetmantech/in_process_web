"use client";

import React, { createContext, useContext, useMemo } from "react";
import useMediaEdit from "@/hooks/useMomentMedia";
import useMomentMedia from "@/hooks/useMomentMedia";

const MomentMediaContext = createContext<ReturnType<typeof useMediaEdit> | undefined>(undefined);

const MomentMediaProvider = ({ children }: { children: React.ReactNode }) => {
  const momentMedia = useMomentMedia();

  const value = useMemo(() => ({ ...momentMedia }), [momentMedia]);

  return <MomentMediaContext.Provider value={value}>{children}</MomentMediaContext.Provider>;
};

const useMomentMediaProvider = () => {
  const context = useContext(MomentMediaContext);
  if (!context) {
    throw new Error("useMomentMediaProvider must be used within a MomentMediaProvider");
  }
  return context;
};

export { MomentMediaProvider, useMomentMediaProvider };
