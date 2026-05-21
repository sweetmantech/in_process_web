"use client";

import { useUserProvider } from "@/providers/UserProvider";
import disconnectSocialWallet from "@/lib/artists/disconnectSocialWallet";
import { useState } from "react";

const DisconnectButton = ({ label = "disconnect" }: { label?: string }) => {
  const { fetchArtistWallet, getAuthHeaders } = useUserProvider();
  const [isLoading, setIsLoading] = useState(false);

  const handleDisconnect = async () => {
    setIsLoading(true);
    try {
      const authHeaders = await getAuthHeaders();
      await disconnectSocialWallet(authHeaders);
      await fetchArtistWallet();
    } finally {
      setIsLoading(false);
    }
  };

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
