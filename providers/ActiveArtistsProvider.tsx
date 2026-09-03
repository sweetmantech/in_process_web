"use client";

import { useActiveArtists } from "@/hooks/useActiveArtists";
import { AnalyticsPeriod } from "@/types/timeline";
import { createContext, useContext, useMemo, type ReactNode } from "react";

type ActiveArtistsContextValue = ReturnType<typeof useActiveArtists>;

const ActiveArtistsContext = createContext<ActiveArtistsContextValue | null>(null);

export const ActiveArtistsProvider = ({
  children,
  limit = 10,
  period,
  artist,
}: {
  children: ReactNode;
  limit?: number;
  period?: AnalyticsPeriod;
  artist?: string;
}) => {
  const activeArtists = useActiveArtists({ limit, period, artist });

  const value = useMemo(() => activeArtists, [activeArtists]);

  return <ActiveArtistsContext.Provider value={value}>{children}</ActiveArtistsContext.Provider>;
};

export const useActiveArtistsProvider = () => {
  const context = useContext(ActiveArtistsContext);
  if (!context) {
    throw new Error("useActiveArtistsProvider must be used within an ActiveArtistsProvider");
  }
  return context;
};

export default ActiveArtistsProvider;
