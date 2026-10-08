"use client";

import useArweaveBalance from "@/hooks/useArweaveBalance";
import useArweaveTopUp from "@/hooks/useArweaveTopUp";
import { formatStatValue } from "@/lib/stats/formatStatValue";
import { MANAGE_CARD_CLASS } from "@/lib/utils/classNames";
import { ARWEAVE_WALLET_ADDRESS } from "@/lib/consts";
import CardSectionHeader from "@/components/ManagePage/CardSectionHeader";
import BalanceValue from "@/components/PaymentsPage/BalanceValue";
import ArweaveTopUpForm from "./ArweaveTopUpForm";

const ArweavePage = () => {
  const { data, isLoading, refetch } = useArweaveBalance();
  const topUpState = useArweaveTopUp(refetch);

  return (
    <main className="mx-auto w-full max-w-4xl p-4 font-archivo md:p-8">
      <div className={`${MANAGE_CARD_CLASS} p-4 md:px-6 md:py-[22px]`}>
        <CardSectionHeader
          dotColor="#7FD58A"
          label="arweave balance"
          marginBottom="mb-3.5 md:mb-[18px]"
        />
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="flex items-baseline gap-4 whitespace-nowrap">
            <BalanceValue
              value={
                isLoading || !data
                  ? "—"
                  : formatStatValue(String(data.credits), { maximumFractionDigits: 4 })
              }
              unit="credits"
            />
            <div className="h-5 w-px self-center bg-grey-moss-100" />
            <BalanceValue
              value={isLoading || !data ? "—" : `≈ $${formatStatValue(String(data.usd))}`}
              unit="USD"
            />
          </div>
          <p className="break-all text-[11.5px] text-grey-moss-300 md:text-xs">
            {ARWEAVE_WALLET_ADDRESS}
          </p>
        </div>

        <div className="-mx-4 my-4 h-px bg-grey-moss-50 md:-mx-6 md:my-[22px]" />

        <CardSectionHeader
          dotColor="#FDAD00"
          label="top up with usdc"
          marginBottom="mb-3.5 md:mb-[18px]"
        />
        <ArweaveTopUpForm {...topUpState} />
      </div>
    </main>
  );
};

export default ArweavePage;
