import CopyButton from "@/components/CopyButton/CopyButton";
import { ARWEAVE_DEPOSIT_ADDRESS } from "@/lib/consts";

const ArweaveDepositAddress = () => (
  <div className="flex flex-col gap-2.5">
    <p className="text-[10px] uppercase tracking-[0.1em] text-grey-moss-300">
      send usdc on base to
    </p>
    <CopyButton
      text={ARWEAVE_DEPOSIT_ADDRESS}
      shorten={false}
      className="max-w-full break-all bg-[#FDFCFA] px-3 py-2.5 font-mono text-xs text-grey-moss-900 hover:text-grey-moss-400 md:text-sm"
    />
    <p className="text-[11.5px] text-grey-moss-300 md:text-xs">
      Only send USDC on Base. Deposits of 1 USDC or more are added to the balance within a minute or
      two.
    </p>
  </div>
);

export default ArweaveDepositAddress;
