import { useState } from "react";
import { Address } from "viem";
import { useMomentProvider } from "@/providers/MomentProvider";
import { useWalletsProvider } from "@/providers/WalletsProvider";
import { useMiniAppProvider } from "@/providers/MiniAppProvider";
import { useAuthorizationProvider } from "@/providers/AuthorizationProvider";
import { useSmartAccountProvider } from "@/providers/SmartWalletAccountProvider";
import { toast } from "sonner";
import useCollectBalanceValidation from "./useCollectBalanceValidation";
import useFarcasterTopup from "./useFarcasterTopup";
import { collectMomentApi } from "@/lib/moment/collectMomentApi";
import fireCollectConfetti from "@/lib/moment/fireCollectConfetti";
import { useMomentCommentsProvider } from "@/providers/MomentCommentsProvider";
import { Protocol } from "@/types/moment";
import { showInsufficientBalanceError } from "@/lib/balance/showInsufficientBalanceError";
import { isUserRejection } from "@/lib/viem/isUserRejection";

const useMomentCollect = () => {
  const [amountToCollect, setAmountToCollect] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const { isMiniApp } = useMiniAppProvider();
  const { primaryWallet } = useWalletsProvider();
  const { moment, saleConfig, protocol } = useMomentProvider();
  const { comment, addComment, setComment, setIsOpenCommentModal } = useMomentCommentsProvider();
  const { checkBalance } = useCollectBalanceValidation();
  const { getAuthHeaders } = useAuthorizationProvider();
  const { topup } = useFarcasterTopup();
  const { smartWallet } = useSmartAccountProvider();

  const collectWithComment = async (): Promise<boolean> => {
    setIsLoading(true);
    try {
      if (!primaryWallet) throw new Error("No wallet connected");
      if (!saleConfig) throw new Error("Sale config not found");
      if (!smartWallet) throw new Error("Wallet is loading");

      if (protocol !== Protocol.InProcess) {
        throw new Error("Collecting is not supported for Sound.xyz or Catalog moments");
      }

      const { sufficient, currency, shortfall } = checkBalance(saleConfig, amountToCollect);
      if (!sufficient) {
        if (isMiniApp) {
          await topup(currency, shortfall, smartWallet as Address);
        } else {
          showInsufficientBalanceError(currency);
          return false;
        }
      }

      const headers = await getAuthHeaders();
      await collectMomentApi(moment, amountToCollect, comment, headers);

      if (comment.trim()) {
        addComment({
          sender: primaryWallet as Address,
          comment,
          timestamp: new Date().getTime(),
        } as any);
      }
      setComment("");
      setIsOpenCommentModal(false);
      toast.success("collected!");
      fireCollectConfetti();
      return true;
    } catch (error: any) {
      if (isUserRejection(error)) {
        toast.error("Topup rejected");
      } else if (!error?.message?.includes("funds")) {
        toast.error("Failed to collect moment");
      }
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    collectWithComment,
    isLoading,
    amountToCollect,
    setAmountToCollect,
  };
};

export default useMomentCollect;
