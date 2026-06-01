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
    <button
      disabled={isLoading}
      onClick={connectWallet}
      className="flex w-full items-center justify-center gap-2 rounded-md bg-grey-moss-900 py-2 font-archivo text-grey-eggshell hover:bg-grey-eggshell hover:text-grey-moss-900 md:w-fit md:min-w-[150px]"
    >
      {isLoading ? "connecting..." : "connect wallet"}
    </button>
  );
};

export default ConnectButton;
