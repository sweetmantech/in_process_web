"use client";

import { useSmartAccountProvider } from "@/providers/SmartWalletAccountProvider";
import { formatStatValue } from "@/lib/stats/formatStatValue";
import { MANAGE_CARD_CLASS } from "@/lib/utils/classNames";
import { useWithdraw } from "@/hooks/useWithdraw";
import CardSectionHeader from "@/components/ManagePage/CardSectionHeader";
import BalanceValue from "./BalanceValue";
import { SmartWalletAddress } from "./SmartWalletAddress";
import { WithdrawForm } from "./WithdrawForm";

const BalanceCard = () => {
  const { isLoading, ethBalance, usdcBalance } = useSmartAccountProvider();
  const withdrawState = useWithdraw();

  return (
    <div className={`${MANAGE_CARD_CLASS} p-4 md:px-6 md:py-[22px]`}>
      <CardSectionHeader
        dotColor="#7FD58A"
        label="available to withdraw"
        marginBottom="mb-3.5 md:mb-[18px]"
      />
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="flex items-baseline gap-4 whitespace-nowrap">
          <BalanceValue value={isLoading ? "—" : formatStatValue(usdcBalance)} unit="USDC" />
          <div className="h-5 w-px self-center bg-grey-moss-100" />
          <BalanceValue value={isLoading ? "—" : formatStatValue(ethBalance)} unit="ETH" />
        </div>
        <SmartWalletAddress />
      </div>

      <div className="-mx-4 my-4 h-px bg-grey-moss-50 md:-mx-6 md:my-[22px]" />

      <CardSectionHeader dotColor="#FDAD00" label="withdraw" marginBottom="mb-3.5 md:mb-[18px]" />
      <WithdrawForm {...withdrawState} />
    </div>
  );
};

export default BalanceCard;
