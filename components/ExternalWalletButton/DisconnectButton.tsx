"use client";

import { classNames } from "@/lib/classNames";
import { useWalletsProvider } from "@/providers/WalletsProvider";
import { useAuthorizationProvider } from "@/providers/AuthorizationProvider";
import disconnectWallet from "@/lib/wallets/disconnectWallet";
import { useState } from "react";
import { Address } from "viem";

const DisconnectButton = () => {
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

  return (
    <button
      type="button"
      disabled={isLoading}
      onClick={handleDisconnect}
      className={classNames("danger")}
    >
      {isLoading ? "Disconnecting..." : "Disconnect"}
    </button>
  );
};

export default DisconnectButton;
