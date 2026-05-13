"use client";

import { useArweaveUploads } from "@/hooks/useArweaveUploads";
import { createContext, useContext, useMemo, type ReactNode } from "react";

type ArweaveUploadsContextValue = ReturnType<typeof useArweaveUploads>;

const ArweaveUploadsContext = createContext<ArweaveUploadsContextValue | null>(null);

export const ArweaveUploadsProvider = ({
  children,
  aggregation,
}: {
  children: ReactNode;
  aggregation: boolean;
}) => {
  const arweaveUploads = useArweaveUploads({ aggregation });

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
