import { getPublicClient } from "@/lib/viem/publicClient";
import { useMomentProvider } from "@/providers/MomentProvider";
import { useWalletsProvider } from "@/providers/WalletsProvider";
import { zoraCreator1155ImplABI } from "@zoralabs/protocol-deployments";
import { useEffect, useState } from "react";
import { Address } from "viem";

const useBalanceOf = () => {
  const [balanceOf, setBalanceOf] = useState<number>(0);
  const { moment } = useMomentProvider();
  const { primaryWallet } = useWalletsProvider();

  useEffect(() => {
    const getBalanceOf = async () => {
      const publicClient = getPublicClient();
      const response = await publicClient.readContract({
        address: moment.collectionAddress,
        abi: zoraCreator1155ImplABI,
        functionName: "balanceOf",
        args: [primaryWallet as Address, BigInt(moment.tokenId)],
      });

      setBalanceOf(parseInt(response.toString(), 10));
    };
    if (moment && primaryWallet) getBalanceOf();
  }, [moment, primaryWallet]);

  return {
    balanceOf,
  };
};

export default useBalanceOf;
