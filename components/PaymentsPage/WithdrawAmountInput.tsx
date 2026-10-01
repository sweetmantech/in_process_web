import { Input } from "@/components/ui/input";
import { Currency } from "@/types/balances";

interface WithdrawAmountInputProps {
  withdrawAmount: string;
  setWithdrawAmount: (value: string) => void;
  currency: Currency;
  setCurrency: (value: Currency) => void;
  setMax: () => void;
}

const WithdrawAmountInput = ({
  withdrawAmount,
  setWithdrawAmount,
  currency,
  setCurrency,
  setMax,
}: WithdrawAmountInputProps) => (
  <div className="flex items-center overflow-hidden rounded-md border border-grey-moss-100 bg-[#FDFCFA]">
    <Input
      id="withdraw-amount"
      type="number"
      inputMode="decimal"
      placeholder="0.00"
      step={currency === "usdc" ? "0.001" : "0.0001"}
      className="border-none bg-transparent py-2.5 text-sm [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
      onChange={(e) => setWithdrawAmount(e.target.value)}
      value={withdrawAmount}
    />
    <button
      type="button"
      onClick={setMax}
      className="px-2 text-[10px] uppercase tracking-[0.1em] text-grey-moss-300 hover:text-grey-moss-900"
    >
      max
    </button>
    <div className="h-4 w-px bg-grey-moss-100" />
    <select
      value={currency}
      onChange={(e) => setCurrency(e.target.value as Currency)}
      className="cursor-pointer appearance-none bg-transparent px-3 py-2.5 text-sm text-grey-moss-900 outline-none"
    >
      <option value="usdc">USDC</option>
      <option value="eth">ETH</option>
    </select>
  </div>
);

export default WithdrawAmountInput;
