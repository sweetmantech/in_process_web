"use client";

import { useMomentProvider } from "@/providers/MomentProvider";
import AirdropProvider from "@/providers/AirdropProvider";
import AddressChipInput from "@/components/SMSMomentPage/AddressChipInput";
import RecentRecipientsRow from "@/components/SMSMomentPage/RecentRecipientsRow";
import RecipientSearchSheet from "@/components/SMSMomentPage/RecipientSearchSheet";
import AirdropSubmitButton from "@/components/SMSMomentPage/AirdropSubmitButton";
import { cn } from "@/lib/utils";

interface AirdropCardProps {
  className?: string;
  title?: string;
}

const FIELD_LABEL_CLASS = "font-archivo text-[10.5px] uppercase tracking-wider text-grey-moss-300";

const AirdropCard = ({ className, title = "airdrop" }: AirdropCardProps) => {
  const { isOwner } = useMomentProvider();

  if (!isOwner) return null;

  return (
    <AirdropProvider>
      <div
        className={cn(
          "rounded-lg border border-grey-moss-100 bg-white p-4 shadow-sm md:p-6",
          className
        )}
      >
        <div className="mb-3 flex items-center gap-1.5">
          <span className="size-1.5 rounded-full bg-[#887bff]" />
          <span className={FIELD_LABEL_CLASS}>{title}</span>
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
