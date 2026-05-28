"use client";

import CopyButton from "@/components/CopyButton";
import { useSmartAccountProvider } from "@/providers/SmartWalletAccountProvider";
import { Address } from "viem";

export function SmartWalletAddress() {
  const { isLoading, smartWallet } = useSmartAccountProvider();

  if (isLoading) {
    return <p className="text-xs font-spectral text-grey-secondary">Loading smart wallet...</p>;
  }

  if (!smartWallet) {
    return <p className="text-xs font-spectral text-grey-secondary">No smart wallet found</p>;
  }

  return (
    <div className="space-y-0.5">
      <p className="text-[10px] font-spectral-italic text-grey-secondary">Smart Wallet</p>
      <CopyButton
        text={smartWallet as Address}
        className="bg-transparent px-0 py-0 font-spectral text-xs text-grey-moss-900 hover:text-grey-moss-700"
      />
    </div>
  );
}
