"use client";

import React, { createContext, useContext, useMemo } from "react";
import useUpdateMomentURI, { type MomentUriUpdateRedirectTo } from "@/hooks/useUpdateMomentURI";

const MomentUriUpdateContext = createContext<ReturnType<typeof useUpdateMomentURI> | undefined>(
  undefined
);

const MomentUriUpdateProvider = ({
  children,
  redirectTo = "manage",
  redirectDelayMs = 0,
}: {
  children: React.ReactNode;
  redirectTo?: MomentUriUpdateRedirectTo;
  redirectDelayMs?: number;
}) => {
  const momentUriUpdate = useUpdateMomentURI({ redirectTo, redirectDelayMs });

  const value = useMemo(() => ({ ...momentUriUpdate }), [momentUriUpdate]);

  return (
    <MomentUriUpdateContext.Provider value={value}>{children}</MomentUriUpdateContext.Provider>
  );
};

const useMomentUriUpdateProvider = () => {
  const context = useContext(MomentUriUpdateContext);
  if (!context) {
    throw new Error("useMomentUriUpdateProvider must be used within a MomentUriUpdateProvider");
  }
  return context;
};

export { MomentUriUpdateProvider, useMomentUriUpdateProvider };
