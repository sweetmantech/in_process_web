"use client";

import { useArtistsCollectorsStats } from "@/hooks/useArtistsCollectorsStats";
import { AnalyticsPeriod } from "@/types/timeline";
import { createContext, useContext, useMemo, type ReactNode } from "react";

type ArtistsCollectorsStatsContextValue = ReturnType<typeof useArtistsCollectorsStats>;

const ArtistsCollectorsStatsContext = createContext<ArtistsCollectorsStatsContextValue | null>(
  null
);

export const ArtistsCollectorsStatsProvider = ({
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
  const value = useArtistsCollectorsStats({ limit, period, artist });

  return (
    <ArtistsCollectorsStatsContext.Provider value={value}>
      {children}
    </ArtistsCollectorsStatsContext.Provider>
  );
};

export const useArtistsCollectorsStatsProvider = () => {
  const context = useContext(ArtistsCollectorsStatsContext);
  if (!context) {
    throw new Error(
      "useArtistsCollectorsStatsProvider must be used within ArtistsCollectorsStatsProvider"
    );
  }
  return context;
};

export default ArtistsCollectorsStatsProvider;
