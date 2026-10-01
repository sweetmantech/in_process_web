"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Currency } from "@/types/balances";
import WithdrawAmountInput from "./WithdrawAmountInput";

interface WithdrawFormProps {
  recipientAddress: string;
  setRecipientAddress: (value: string) => void;
  withdrawAmount: string;
  setWithdrawAmount: (value: string) => void;
  currency: Currency;
  setCurrency: (value: Currency) => void;
  withdraw: () => Promise<void>;
  isWithdrawing: boolean;
  setMax: () => void;
}

export function WithdrawForm({
  recipientAddress,
  setRecipientAddress,
  withdraw,
  isWithdrawing,
  ...amountProps
}: WithdrawFormProps) {
  return (
    <div className="flex flex-col gap-3 md:gap-3.5">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-[minmax(0,1fr)_minmax(0,320px)] md:gap-4">
        <fieldset className="flex flex-col gap-[5px]">
          <Label
            htmlFor="recipient-address"
            className="text-[10px] uppercase tracking-[0.1em] text-grey-moss-300"
          >
            recipient address
          </Label>
          <Input
            id="recipient-address"
            placeholder="0x..."
            className="rounded-md border-grey-moss-100 bg-[#FDFCFA] py-2.5 text-sm"
            onChange={(e) => setRecipientAddress(e.target.value)}
            value={recipientAddress}
          />
        </fieldset>
        <fieldset className="flex flex-col gap-[5px]">
          <Label
            htmlFor="withdraw-amount"
            className="text-[10px] uppercase tracking-[0.1em] text-grey-moss-300"
          >
            amount
          </Label>
          <WithdrawAmountInput {...amountProps} />
        </fieldset>
      </div>
      <div className="mt-0.5 flex justify-end md:mt-1">
        <button
          type="button"
          onClick={withdraw}
          disabled={!amountProps.withdrawAmount || !recipientAddress || isWithdrawing}
          className="rounded-full border border-grey-moss-900 bg-grey-moss-900 px-3.5 py-[7px] font-archivo-medium text-[11.5px] text-white hover:bg-black disabled:cursor-not-allowed disabled:opacity-50 md:px-[18px] md:py-2 md:text-[12.5px]"
        >
          {isWithdrawing ? "Withdrawing..." : "Withdraw"}
        </button>
      </div>
    </div>
  );
}
