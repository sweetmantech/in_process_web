"use client";

import { useArtistArweaveTransactions } from "@/hooks/useArtistArweaveTransactions";
import { AnalyticsPeriod } from "@/types/timeline";
import { createContext, useContext, useMemo, type ReactNode } from "react";

type ArtistArweaveUploadsContextValue = ReturnType<typeof useArtistArweaveTransactions>;

const ArtistArweaveUploadsContext = createContext<ArtistArweaveUploadsContextValue | null>(null);

export const ArtistArweaveUploadsProvider = ({
  children,
  artistQueryValue,
  period,
  limit = 10,
}: {
  children: ReactNode;
  artistQueryValue: string;
  period: AnalyticsPeriod | undefined;
  limit?: number;
}) => {
  const artistUploads = useArtistArweaveTransactions({
    artist: artistQueryValue,
    period,
    limit,
  });

  const value = useMemo(() => artistUploads, [artistUploads]);

  return (
    <ArtistArweaveUploadsContext.Provider value={value}>
      {children}
    </ArtistArweaveUploadsContext.Provider>
  );
};

export const useArtistArweaveUploadsProvider = () => {
  const context = useContext(ArtistArweaveUploadsContext);
  if (!context) {
    throw new Error(
      "useArtistArweaveUploadsProvider must be used within an ArtistArweaveUploadsProvider"
    );
  }
  return context;
};

export default ArtistArweaveUploadsProvider;
