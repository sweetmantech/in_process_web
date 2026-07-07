"use client";

import { useAirdropProvider } from "@/providers/AirdropProvider";
import useAirdropInput from "@/hooks/useAirdropInput";
import { AirdropItem } from "@/types/airdrop";
import AddressChip from "./AddressChip";

const AddressChipInput = () => {
  const { airdropToItems } = useAirdropProvider();
  const { handleInput, handlePaste, handleBlur, value, setValue } = useAirdropInput();

  return (
    <div className="flex flex-wrap items-center gap-1.5 border-b-2 border-grey-moss-900 py-2">
      {airdropToItems.map((item: AirdropItem, index) => (
        <AddressChip item={item} index={index} key={`${index}-${item.address || item.ensName}`} />
      ))}
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleInput}
        onPaste={handlePaste}
        onBlur={handleBlur}
        placeholder="wallet address or ENS"
        className="min-w-[130px] flex-1 border-none bg-transparent py-1.5 font-archivo text-sm text-grey-moss-900 outline-none"
      />
    </div>
  );
};

export default AddressChipInput;
