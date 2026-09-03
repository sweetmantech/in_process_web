"use client";

import { useActiveArtists } from "@/hooks/useActiveArtists";
import { useAnalyticsProvider } from "@/providers/AnalyticsProvider";
import { createContext, useContext, useMemo, type ReactNode } from "react";

type ActiveArtistsContextValue = ReturnType<typeof useActiveArtists>;

const ActiveArtistsContext = createContext<ActiveArtistsContextValue | null>(null);

export const ActiveArtistsProvider = ({
  children,
  limit = 10,
}: {
  children: ReactNode;
  limit?: number;
}) => {
  const { filters } = useAnalyticsProvider();
  const activeArtists = useActiveArtists({
    limit,
    period: filters.period,
    artist: filters.artist,
  });

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
