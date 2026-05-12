"use client";

import { useArweaveUploads } from "@/hooks/useArweaveUploads";
import { AnalyticsPeriod } from "@/types/timeline";
import { createContext, useContext, useMemo, type ReactNode } from "react";

type ArweaveUploadsContextValue = ReturnType<typeof useArweaveUploads>;

const ArweaveUploadsContext = createContext<ArweaveUploadsContextValue | null>(null);

export const ArweaveUploadsProvider = ({
  children,
  limit = 10,
  detailArtist,
  period,
}: {
  children: ReactNode;
  limit?: number;
  /**
   * When set, context serves the expanded per-upload sub-table for this artist.
   * Pass `period` from the parent admin table so both use the same date window.
   */
  detailArtist?: string;
  period?: AnalyticsPeriod | undefined;
}) => {
  const arweaveUploads = useArweaveUploads(
    detailArtist !== undefined ? { limit, detailArtist, detailPeriod: period } : { limit }
  );

  const value = useMemo(() => arweaveUploads, [arweaveUploads]);

  return <ArweaveUploadsContext.Provider value={value}>{children}</ArweaveUploadsContext.Provider>;
};

export const useArweaveUploadsProvider = () => {
  const context = useContext(ArweaveUploadsContext);
  if (!context) {
    throw new Error("useArweaveUploadsProvider must be used within an ArweaveUploadsProvider");
  }
  return context;
};

export default ArweaveUploadsProvider;
