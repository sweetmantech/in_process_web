"use client";

import { useSmartAccountProvider } from "@/providers/SmartWalletAccountProvider";
import { formatStatValue } from "@/lib/stats/formatStatValue";
import { WithdrawModal } from "./WithdrawModal";
import BalanceValue from "./BalanceValue";

const BalanceCard = () => {
  const { isLoading, ethBalance, usdcBalance } = useSmartAccountProvider();

  return (
    <section className="flex flex-wrap items-center justify-between gap-5 rounded-2xl border border-[#E4E0D7] bg-white/60 px-6 py-6">
      <div className="flex flex-col gap-2.5">
        <span className="font-archivo-bold text-[11px] uppercase tracking-[.1em] text-[#A8A296]">
          available to withdraw
        </span>
        <div className="flex items-baseline gap-[18px] whitespace-nowrap">
          <BalanceValue value={isLoading ? "—" : formatStatValue(usdcBalance)} unit="USDC" />
          <div className="h-6 w-px self-center bg-[#E4E0D7]" />
          <BalanceValue value={isLoading ? "—" : formatStatValue(ethBalance)} unit="ETH" />
        </div>
      </div>
      <WithdrawModal />
    </section>
  );
};

export default BalanceCard;
