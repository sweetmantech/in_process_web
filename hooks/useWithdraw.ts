import { useEffect, useState } from "react";
import { useWalletsProvider } from "@/providers/WalletsProvider";
import { useAuthorizationProvider } from "@/providers/AuthorizationProvider";
import { toast } from "sonner";
import { CHAIN_ID } from "@/lib/consts";
import { withdrawApi } from "@/lib/smartwallets/withdrawApi";
import { useSmartAccountProvider } from "@/providers/SmartWalletAccountProvider";
import { Currency } from "@/types/balances";

export const useWithdraw = () => {
  const [withdrawAmount, setWithdrawAmount] = useState<string>("");
  const [currency, setCurrency] = useState<Currency>("usdc");
  const [recipientAddress, setRecipientAddress] = useState<string>("");
  const { hasEOA, primaryWallet } = useWalletsProvider();
  const { authorization } = useAuthorizationProvider();
  const [isOpen, setIsOpen] = useState(false);
  const [isWithdrawing, setIsWithdrawing] = useState<boolean>(false);
  const { refetch, ethBalance, usdcBalance } = useSmartAccountProvider();

  useEffect(() => {
    if (isOpen && hasEOA && primaryWallet) {
      setRecipientAddress(primaryWallet as string);
    } else if (isOpen && !hasEOA) {
      setRecipientAddress("");
    }
  }, [isOpen, hasEOA, primaryWallet]);

  const setMax = () => {
    const maxAmount = currency === "eth" ? ethBalance : usdcBalance;
    setWithdrawAmount(maxAmount);
  };

  const withdraw = async () => {
    if (!recipientAddress || !withdrawAmount) {
      toast.error("Please fill in all fields");
      return;
    }

    const availableBalance = currency === "eth" ? ethBalance : usdcBalance;
    const withdrawAmountNum = parseFloat(withdrawAmount);
    const availableBalanceNum = parseFloat(availableBalance);

    if (isNaN(withdrawAmountNum) || withdrawAmountNum <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    if (withdrawAmountNum > availableBalanceNum) {
      toast.error(`Insufficient balance. Available: ${availableBalance} ${currency.toUpperCase()}`);
      return;
    }

    setIsWithdrawing(true);
    try {
      const headers = authorization;

      await withdrawApi({
        headers,
        amount: withdrawAmount,
        currency,
        to: recipientAddress as `0x${string}`,
        chainId: CHAIN_ID,
      });
      refetch();
      toast.success("Withdrawal was successful");
    } catch (error: any) {
      toast.error(error?.message || "Failed to withdraw");
    } finally {
      setIsWithdrawing(false);
    }
  };

  return {
    withdrawAmount,
    setWithdrawAmount,
    currency,
    setCurrency,
    recipientAddress,
    setRecipientAddress,
    isOpen,
    setIsOpen,
    withdraw,
    isWithdrawing,
    setMax,
  };
};
