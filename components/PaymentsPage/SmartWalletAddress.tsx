"use client";

import CopyButton from "@/components/CopyButton";
import { useSmartAccountProvider } from "@/providers/SmartWalletAccountProvider";
import { Address } from "viem";

export function SmartWalletAddress() {
  const { isLoading, smartWallet } = useSmartAccountProvider();

  return (
    <div className="flex flex-col gap-[5px]">
      <span className="text-[10px] uppercase tracking-[0.1em] text-grey-moss-300">
        smart wallet
      </span>
      {smartWallet ? (
        <CopyButton
          text={smartWallet as Address}
          className="bg-transparent px-0 py-0 text-sm text-grey-moss-900 hover:text-grey-moss-300"
        />
      ) : (
        <span className="text-sm text-grey-moss-300">
          {isLoading ? "loading..." : "no smart wallet found"}
        </span>
      )}
    </div>
  );
}
