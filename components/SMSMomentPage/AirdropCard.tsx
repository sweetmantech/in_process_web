"use client";

import { useMomentProvider } from "@/providers/MomentProvider";
import AirdropProvider from "@/providers/AirdropProvider";
import AddressChipInput from "./AddressChipInput";
import RecentRecipientsRow from "./RecentRecipientsRow";
import RecipientSearchSheet from "./RecipientSearchSheet";
import AirdropSubmitButton from "./AirdropSubmitButton";

const AirdropCard = () => {
  const { isOwner } = useMomentProvider();

  if (!isOwner) return null;

  return (
    <AirdropProvider>
      <div className="rounded-md border border-grey-moss-100 bg-white p-4 shadow-[0_4px_16px_-6px_rgba(27,21,4,0.14)]">
        <div className="mb-1.5 flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-[#887bff] shadow-[0_0_8px_rgba(136,123,255,0.7)]" />
          <span className="font-archivo text-[10.5px] uppercase tracking-wider text-grey-moss-300">
            airdrop this moment
          </span>
        </div>
        <AddressChipInput />
        <RecentRecipientsRow />
        <AirdropSubmitButton />
        <RecipientSearchSheet />
      </div>
    </AirdropProvider>
  );
};

export default AirdropCard;
