"use client";

import { useArtistsCollectorsStats } from "@/hooks/useArtistsCollectorsStats";
import { createContext, useContext, useMemo, type ReactNode } from "react";

type ArtistsCollectorsStatsContextValue = ReturnType<typeof useArtistsCollectorsStats>;

const ArtistsCollectorsStatsContext = createContext<ArtistsCollectorsStatsContextValue | null>(
  null
);

export const ArtistsCollectorsStatsProvider = ({
  children,
  limit = 10,
}: {
  children: ReactNode;
  limit?: number;
}) => {
  const value = useArtistsCollectorsStats({ limit });

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
