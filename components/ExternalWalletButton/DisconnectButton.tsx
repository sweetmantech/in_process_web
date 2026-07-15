"use client";

import { useWalletsProvider } from "@/providers/WalletsProvider";
import { useAuthorizationProvider } from "@/providers/AuthorizationProvider";
import disconnectWallet from "@/lib/wallets/disconnectWallet";
import { useState } from "react";
import { Address } from "viem";

interface DisconnectButtonProps {
  label?: string;
  variant?: "pill" | "row";
}

const DisconnectButton = ({
  label = "disconnect wallet",
  variant = "pill",
}: DisconnectButtonProps) => {
  const { refetchWallets, primaryWallet } = useWalletsProvider();
  const { getAuthHeaders } = useAuthorizationProvider();
  const [isLoading, setIsLoading] = useState(false);

  const handleDisconnect = async () => {
    setIsLoading(true);
    try {
      await disconnectWallet(await getAuthHeaders(), primaryWallet as Address);
      await refetchWallets();
    } finally {
      setIsLoading(false);
    }
  };

  if (variant === "row") {
    return (
      <button
        type="button"
        disabled={isLoading}
        onClick={handleDisconnect}
        className="rounded-full border border-grey-moss-100 bg-white px-3.5 py-[7px] font-archivo-medium text-[11.5px] text-red-dark hover:border-grey-moss-300"
      >
        {isLoading ? "disconnecting..." : "Disconnect"}
      </button>
    );
  }

  return (
    <button
      type="button"
      disabled={isLoading}
      onClick={handleDisconnect}
      className="flex w-full items-center justify-center gap-2 rounded-md bg-grey-moss-900 py-2 font-archivo text-grey-eggshell hover:bg-grey-eggshell hover:text-grey-moss-900 md:w-fit md:min-w-[150px]"
    >
      {isLoading ? "disconnecting..." : label}
    </button>
  );
};

export default DisconnectButton;
