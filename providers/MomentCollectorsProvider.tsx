import { useMomentTransfers } from "@/hooks/useMomentTransfers";
import { createContext, useContext, ReactNode } from "react";

const MomentTransfersContext = createContext<ReturnType<typeof useMomentTransfers> | undefined>(
  undefined
);

export function MomentTransfersProvider({ children }: { children: ReactNode }) {
  const transfers = useMomentTransfers();

  return (
    <MomentTransfersContext.Provider value={transfers}>{children}</MomentTransfersContext.Provider>
  );
}

export function useMomentTransfersProvider() {
  const context = useContext(MomentTransfersContext);
  if (context === undefined) {
    throw new Error("useMomentTransfersProvider must be used within a MomentTransfersProvider");
  }
  return context;
}
