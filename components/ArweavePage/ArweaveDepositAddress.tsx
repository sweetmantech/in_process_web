import CopyButton from "@/components/CopyButton/CopyButton";
import useArweaveDepositAddress from "@/hooks/useArweaveDepositAddress";

const ArweaveDepositAddress = () => {
  const { data: address, isLoading } = useArweaveDepositAddress();

  return (
    <div className="flex flex-col gap-2.5">
      <p className="text-[10px] uppercase tracking-[0.1em] text-grey-moss-300">
        send usdc on base to
      </p>
      {address ? (
        <CopyButton
          text={address}
          shorten={false}
          className="max-w-full break-all bg-[#FDFCFA] px-3 py-2.5 font-mono text-xs text-grey-moss-900 hover:text-grey-moss-400 md:text-sm"
        />
      ) : (
        <p className="text-xs text-grey-moss-300">{isLoading ? "Loading…" : "Unavailable"}</p>
      )}
      <p className="text-[11.5px] text-grey-moss-300 md:text-xs">
        Only send USDC on Base. Deposits of 1 USDC or more are added to the balance within about 10
        minutes.
      </p>
    </div>
  );
};

export default ArweaveDepositAddress;
