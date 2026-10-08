import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ConnectedWalletHint from "@/components/ExternalWalletButton/ConnectedWalletHint";
import { Address } from "viem";

interface ArweaveTopUpFormProps {
  amount: string;
  setAmount: (value: string) => void;
  topUp: () => Promise<void>;
  isToppingUp: boolean;
  externalWallet?: { address: string } | null;
}

const ArweaveTopUpForm = ({
  amount,
  setAmount,
  topUp,
  isToppingUp,
  externalWallet,
}: ArweaveTopUpFormProps) => (
  <div className="flex flex-col gap-3 md:gap-3.5">
    <fieldset className="flex flex-col gap-[5px] md:max-w-[320px]">
      <Label
        htmlFor="arweave-topup-amount"
        className="text-[10px] uppercase tracking-[0.1em] text-grey-moss-300"
      >
        amount (usdc on base)
      </Label>
      <Input
        id="arweave-topup-amount"
        type="number"
        inputMode="decimal"
        placeholder="0.00"
        step="0.01"
        className="rounded-md border-grey-moss-100 bg-[#FDFCFA] py-2.5 text-sm [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        onChange={(e) => setAmount(e.target.value)}
        value={amount}
      />
    </fieldset>
    <div className="mt-0.5 flex items-center justify-end gap-3 md:mt-1">
      {externalWallet && <ConnectedWalletHint address={externalWallet.address as Address} />}
      <button
        type="button"
        onClick={topUp}
        disabled={isToppingUp || (Boolean(externalWallet) && !amount)}
        className="rounded-full border border-grey-moss-900 bg-grey-moss-900 px-3.5 py-[7px] font-archivo-medium text-[11.5px] text-white hover:bg-black disabled:cursor-not-allowed disabled:opacity-50 md:px-[18px] md:py-2 md:text-[12.5px]"
      >
        {!externalWallet ? "Connect Wallet" : isToppingUp ? "Topping up..." : "Top Up"}
      </button>
    </div>
  </div>
);

export default ArweaveTopUpForm;
