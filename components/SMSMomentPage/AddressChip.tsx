import { X } from "lucide-react";
import { AirdropItem } from "@/types/airdrop";
import truncateAddress from "@/lib/truncateAddress";
import { useAirdropProvider } from "@/providers/AirdropProvider";

interface AddressChipProps {
  item: AirdropItem;
  index: number;
}

const AddressChip = ({ item, index }: AddressChipProps) => {
  const { removeAddress } = useAirdropProvider();
  const isInvalid = item.status === "invalid";

  return (
    <span
      className={`flex items-center gap-1.5 rounded-full py-1 pl-3 pr-1 font-archivo text-xs font-semibold ${
        isInvalid ? "bg-red text-white" : "bg-grey-moss-50 text-grey-moss-900"
      }`}
    >
      {item.status === "validating"
        ? "validating..."
        : item.ensName || truncateAddress(item.address)}
      <button
        type="button"
        onClick={() => removeAddress(index)}
        aria-label="Remove recipient"
        className={`flex h-[15px] w-[15px] items-center justify-center rounded-full ${
          isInvalid
            ? "bg-white/30 text-white"
            : "bg-grey-moss-100 text-grey-moss-300 hover:bg-grey-moss-900 hover:text-white"
        }`}
      >
        <X className="h-2.5 w-2.5" />
      </button>
    </span>
  );
};

export default AddressChip;
