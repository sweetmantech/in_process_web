"use client";

import React, { createContext, useContext, useMemo } from "react";
import useMediaEdit from "@/hooks/useMediaEdit";

const MediaEditContext = createContext<ReturnType<typeof useMediaEdit> | undefined>(undefined);

const MediaEditProvider = ({ children }: { children: React.ReactNode }) => {
  const mediaEdit = useMediaEdit();

  const value = useMemo(() => ({ ...mediaEdit }), [mediaEdit]);

  return <MediaEditContext.Provider value={value}>{children}</MediaEditContext.Provider>;
};

const useMediaEditProvider = () => {
  const context = useContext(MediaEditContext);
  if (!context) {
    throw new Error("useMediaEditProvider must be used within a MediaEditProvider");
  }
  return context;
};

export { MediaEditProvider, useMediaEditProvider };
