import { classNames } from "@/lib/utils/classNames";
import { CHAIN_ID } from "@/lib/consts";
import connectEOA from "@/lib/wallets/connectEOA";
import resolveSigningAddress from "@/lib/wallets/resolveSigningAddress";
import { signWalletConnectMessage } from "@/lib/wallets/signWalletConnectMessage";
import { useWalletsProvider } from "@/providers/WalletsProvider";
import { useAuthorizationProvider } from "@/providers/AuthorizationProvider";
import { useConnectWallet } from "@privy-io/react-auth";
import { useState } from "react";
import { toast } from "sonner";
import { Address } from "viem";

const ConnectButton = () => {
  const { refetchWallets } = useWalletsProvider();
  const { getAuthHeaders } = useAuthorizationProvider();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { connectWallet } = useConnectWallet({
    onSuccess: async ({ wallet }: any) => {
      setIsLoading(true);
      try {
        await wallet.switchChain(CHAIN_ID);
        const provider = await wallet?.getEthereumProvider?.();
        if (!provider) throw new Error("No Ethereum provider found");
        const address = await resolveSigningAddress(provider, wallet.address as Address);
        const { message, signature } = await signWalletConnectMessage(address, provider);
        await connectEOA({ authHeaders: await getAuthHeaders(), message, signature });
        await refetchWallets();
      } catch (error: any) {
        toast.error(error?.message || "Failed to connect wallet");
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
