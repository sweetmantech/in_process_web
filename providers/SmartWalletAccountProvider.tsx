"use client";

import useSmartAccount from "@/hooks/useSmartAccount";
import { createContext, useMemo, useContext } from "react";

const SmartWalletContext = createContext<ReturnType<typeof useSmartAccount> | null>(null);

interface ISmartWalletAccountProvider {
  children: React.ReactNode;
}
const SmartWalletAccountProvider = ({ children }: ISmartWalletAccountProvider) => {
  const smartWallet = useSmartAccount();

  const value = useMemo(
    () => ({
      ...smartWallet,
    }),
    [smartWallet]
  );

  return <SmartWalletContext.Provider value={value}>{children}</SmartWalletContext.Provider>;
};

export const useSmartAccountProvider = () => {
  const context = useContext(SmartWalletContext);
  if (!context) {
    throw new Error("useSmartAccountProvider must be used within a SmartWalletAccountProvider");
  }
  return context;
};

export default SmartWalletAccountProvider;
