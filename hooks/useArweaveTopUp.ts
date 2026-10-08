import { useState } from "react";
import { toast } from "sonner";
import { useConnectWallet } from "@privy-io/react-auth";
import useConnectedWallet from "@/hooks/useConnectedWallet";
import topUpArweaveWithUsdc from "@/lib/arweave/topUpArweaveWithUsdc";
import { isUserRejection } from "@/lib/viem/isUserRejection";

const useArweaveTopUp = (onSuccess: () => void) => {
  const [amount, setAmount] = useState("");
  const [isToppingUp, setIsToppingUp] = useState(false);
  const { externalWallet } = useConnectedWallet();
  const { connectWallet } = useConnectWallet();

  const topUp = async () => {
    if (!externalWallet) {
      connectWallet();
      return;
    }

    const amountNum = parseFloat(amount);
    if (isNaN(amountNum) || amountNum <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    setIsToppingUp(true);
    try {
      await topUpArweaveWithUsdc({ wallet: externalWallet, amount });
      toast.success("Arweave balance topped up");
      setAmount("");
      onSuccess();
    } catch (error) {
      if (!isUserRejection(error)) {
        toast.error(error instanceof Error ? error.message : "Failed to top up");
      }
    } finally {
      setIsToppingUp(false);
    }
  };

  return { amount, setAmount, topUp, isToppingUp, externalWallet };
};

export default useArweaveTopUp;
