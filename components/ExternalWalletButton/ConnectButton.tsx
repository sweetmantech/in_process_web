import { classNames } from "@/lib/classNames";
import connectEOA from "@/lib/wallets/connectEOA";
import { signWalletConnectMessage } from "@/lib/wallets/signWalletConnectMessage";
import { useWalletsProvider } from "@/providers/WalletsProvider";
import { useAuthorizationProvider } from "@/providers/AuthorizationProvider";
import { useConnectWallet } from "@privy-io/react-auth";
import { useState } from "react";
import { Address } from "viem";

const ConnectButton = () => {
  const { refetchWallets } = useWalletsProvider();
  const { getAuthHeaders } = useAuthorizationProvider();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { connectWallet } = useConnectWallet({
    onSuccess: async ({ wallet }: any) => {
      setIsLoading(true);
      try {
        const provider = await wallet?.getEthereumProvider?.();
        if (!provider) throw new Error("No Ethereum provider found");
        const { message, signature } = await signWalletConnectMessage(
          wallet.address as Address,
          provider
        );
        await connectEOA({ authHeaders: await getAuthHeaders(), message, signature });
        await refetchWallets();
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <button type="button" disabled={isLoading} onClick={connectWallet} className={classNames()}>
      {isLoading ? "Connecting..." : "Connect"}
    </button>
  );
};

export default ConnectButton;
