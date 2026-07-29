"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import AirdropProvider from "@/providers/AirdropProvider";
import AddressChipInput from "@/components/SMSMomentPage/AddressChipInput";
import RecentRecipientsRow from "@/components/SMSMomentPage/RecentRecipientsRow";
import RecipientSearchSheet from "@/components/SMSMomentPage/RecipientSearchSheet";
import AirdropSubmitButton from "@/components/SMSMomentPage/AirdropSubmitButton";
import useCanAirdropMoment from "@/hooks/useCanAirdropMoment";
import { cn } from "@/lib/utils";

const MomentAirdropAccordion = () => {
  const canAirdrop = useCanAirdropMoment();
  const [open, setOpen] = useState(false);

  if (!canAirdrop) return null;

  return (
    <div className="mt-4 overflow-hidden rounded-[12px] border border-[#E4E0D7] bg-white shadow-[0_4px_16px_-6px_rgba(27,21,4,.14)] md:hidden">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center justify-between gap-2.5 bg-transparent px-4 py-3.5 text-grey-moss-900"
      >
        <span className="inline-flex items-center gap-2">
          <span className="size-1.5 rounded-full bg-[#887bff] shadow-[0_0_8px_rgba(136,123,255,.7)]" />
          <span className="font-archivo text-[10.5px] uppercase tracking-[0.1em] text-[#6B6456]">
            airdrop
          </span>
        </span>
        <ChevronDown
          className={cn(
            "size-4 text-[#8B8474] transition-transform duration-[180ms] ease-out",
            open && "rotate-180"
          )}
          strokeWidth={1.75}
        />
      </button>
      {open && (
        <div className="px-4 pb-4">
          <AirdropProvider>
            <AddressChipInput />
            <RecentRecipientsRow />
            <AirdropSubmitButton />
            <RecipientSearchSheet />
          </AirdropProvider>
        </div>
      )}
    </div>
  );
};

export default MomentAirdropAccordion;
