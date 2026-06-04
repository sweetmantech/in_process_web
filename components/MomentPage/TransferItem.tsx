import truncateAddress from "@/lib/truncateAddress";
import { Transfer } from "@/types/moment";
import CopyButton from "@/components/CopyButton";
import { EXPLORER_URL } from "@/lib/consts";
import { useWalletsProvider } from "@/providers/WalletsProvider";

const TransferItem = ({ collector, username, amount, transactionHash, timestamp }: Transfer) => {
  const { primaryWallet } = useWalletsProvider();
  const isYou = primaryWallet?.toLowerCase() === collector.toLowerCase();
  return (
    <div className="px-1 md:px-2 space-y-0.5">
      <div className="flex items-center justify-between">
        <p className="font-archivo text-sm font-medium">
          {isYou ? "me" : username || truncateAddress(collector)}
        </p>
        <p className="font-archivo text-sm">{amount}x</p>
      </div>
      <div className="flex flex-wrap items-center gap-x-1.5 gap-y-0.5 font-archivo text-[11px] text-neutral-400">
        <CopyButton
          text={collector}
          className="bg-transparent px-0 py-0 rounded-none gap-1 text-neutral-500 hover:text-black"
        >
          {truncateAddress(collector)}
        </CopyButton>
        <span className="text-neutral-300">|</span>
        <CopyButton
          text={`${EXPLORER_URL}/tx/${transactionHash}`}
          className="bg-transparent px-0 py-0 rounded-none gap-1 text-neutral-500 hover:text-black"
        >
          tx {truncateAddress(transactionHash)}
        </CopyButton>
        <span className="text-neutral-300">|</span>
        <span>{new Date(timestamp).toLocaleString()}</span>
      </div>
    </div>
  );
};

export default TransferItem;
