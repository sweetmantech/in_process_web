import { useState } from "react";
import { ConnectedWallet, useConnectWallet } from "@privy-io/react-auth";
import useConnectedWallet from "./useConnectedWallet";
import { useSmartAccountProvider } from "@/providers/SmartWalletAccountProvider";
import { useWalletsProvider } from "@/providers/WalletsProvider";
import { createWalletClient, custom, Address } from "viem";
import { CHAIN_ID, PERMISSION_BIT_ADMIN } from "@/lib/consts";
import getViemNetwork from "@/lib/viem/getViemNetwork";
import { getPublicClient } from "@/lib/viem/publicClient";
import { toast } from "sonner";
import { isUserRejection } from "@/lib/viem/isUserRejection";
import { zoraCreator1155ImplABI } from "@zoralabs/protocol-deployments";

interface UseInProcessGrantPermissionOptions {
  onGranted?: () => void;
}

const useInProcessGrantPermission = (
  contractAddress: Address | undefined,
  { onGranted }: UseInProcessGrantPermissionOptions = {}
) => {
  const { primaryWallet } = useWalletsProvider();
  const { smartWallet } = useSmartAccountProvider();
  const { externalWallet } = useConnectedWallet();
  const [isGranting, setIsGranting] = useState(false);

  const sendGrantTransaction = async (
    wallet: Pick<ConnectedWallet, "address" | "switchChain" | "getEthereumProvider">
  ) => {
    if (!contractAddress) {
      toast.error("Contract data not available");
      return;
    }

    if (!smartWallet) {
      toast.error("Smart wallet not available");
      return;
    }

    try {
      setIsGranting(true);

      await wallet.switchChain(CHAIN_ID);

      const provider = await wallet.getEthereumProvider();
      const account = wallet.address as Address;

      const client = createWalletClient({
        account,
        chain: getViemNetwork(CHAIN_ID),
        transport: custom(provider),
      });

      const hash = await client.writeContract({
        address: contractAddress,
        abi: zoraCreator1155ImplABI,
        functionName: "addPermission",
        args: [BigInt(0), smartWallet as Address, BigInt(PERMISSION_BIT_ADMIN)],
      });

      const publicClient = getPublicClient(CHAIN_ID);
      await publicClient.waitForTransactionReceipt({ hash });

      toast.success("Smart wallet permission granted successfully");
      onGranted?.();
    } catch (error: any) {
      console.error("Grant permission error:", error);

      if (isUserRejection(error)) {
        toast.error("Transaction rejected");
      } else {
        toast.error(error?.message || "Failed to grant permission. Please try again.");
      }
    } finally {
      setIsGranting(false);
    }
  };

  const { connectWallet } = useConnectWallet({
    onSuccess: ({ wallet }) => {
      if (wallet.type !== "ethereum") {
        toast.error("Please connect an Ethereum wallet");
        return;
      }
      sendGrantTransaction(wallet);
    },
  });

  const grantPermission = async () => {
    if (!primaryWallet) {
      toast.error("Please connect your wallet first");
      return;
    }

    if (!externalWallet) {
      connectWallet();
      return;
    }

    await sendGrantTransaction(externalWallet);
  };

  return { grantPermission, isGranting };
};

export default useInProcessGrantPermission;
