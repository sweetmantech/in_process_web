import connectEOA from "@/lib/wallets/connectEOA";
import { signWalletConnectMessage } from "@/lib/wallets/signWalletConnectMessage";
import { useWalletsProvider } from "@/providers/WalletsProvider";
import { useAuthorizationProvider } from "@/providers/AuthorizationProvider";
import { useConnectWallet } from "@privy-io/react-auth";
import { Fragment, useState } from "react";
import { Address } from "viem";
import CopyButton from "../CopyButton";
import DisconnectButton from "./DisconnectButton";

const ConnectButton = () => {
  const { refetchWallets, primaryWallet, hasEOA } = useWalletsProvider();
  const { authorization } = useAuthorizationProvider();
  const shouldConnect = !hasEOA && Boolean(primaryWallet);

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
        await connectEOA({ authHeaders: authorization, message, signature });
        await refetchWallets();
      } finally {
        setIsLoading(false);
      }
    },
  });

  if (!primaryWallet) return <Fragment />;

  if (!shouldConnect) {
    return (
      <div className="flex w-full md:w-fit flex-col items-end gap-2 md:flex-row md:justify-end">
        <CopyButton text={primaryWallet as Address} />
        <DisconnectButton label="disconnect wallet" />
      </div>
    );
  }

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
