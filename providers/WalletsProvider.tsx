import { createContext, useContext, useMemo } from "react";
import useWallets from "@/hooks/useWallets";

const WalletsContext = createContext<ReturnType<typeof useWallets> | null>(null);

export const WalletsProvider = ({ children }: { children: React.ReactNode }) => {
  const wallets = useWallets();
  const value = useMemo(() => wallets, [wallets]);

  return <WalletsContext.Provider value={value}>{children}</WalletsContext.Provider>;
};

export const useWalletsProvider = () => {
  const context = useContext(WalletsContext);
  if (!context) {
    throw new Error("useWalletsProvider must be used within a WalletsProvider");
  }
  return context;
};

export default WalletsProvider;
