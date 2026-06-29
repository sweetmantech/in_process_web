"use client";

import { TimelineMoment } from "@/types/moment";
import { ExternalLink } from "lucide-react";
import ContentRenderer from "@/components/Renderers";
import { useMobileFeedCard } from "@/hooks/useMobileFeedCard";

interface MobileFeedCardProps {
  moment: TimelineMoment;
}

const MobileFeedCard = ({ moment }: MobileFeedCardProps) => {
  const { metadata, externalUrl, onCollect, onExternalLink } = useMobileFeedCard(moment);
  const creatorName = moment.creator.username ?? `${moment.creator.address.slice(0, 6)}...`;
  const timeStr = new Date(moment.created_at).toLocaleString();

  return (
    <div className="mb-2 overflow-hidden rounded-[6px] border border-grey-moss-100 bg-white shadow-[0_4px_16px_-6px_rgba(27,21,4,.14)]">
      <div className="relative w-full">
        <ContentRenderer metadata={metadata} variant="natural" />
        {externalUrl && (
          <button
            type="button"
            onClick={onExternalLink}
            className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/40 backdrop-blur-sm active:opacity-70"
            aria-label="Open external link"
          >
            <ExternalLink className="h-[13px] w-[13px] text-white" strokeWidth={2} />
          </button>
        )}
      </div>
      <div className="px-[15px] pb-[15px] pt-[13px]">
        <div className="mb-[5px] flex items-center gap-[9px]">
          <span className="font-archivo-medium text-[14.5px] text-grey-moss-900">
            {creatorName}
          </span>
          <span className="ml-auto font-archivo text-[11px] text-[#A8862F]">{timeStr}</span>
        </div>
        <div className="font-spectral-italic mb-3 text-[19px] leading-[1.3] text-grey-moss-900">
          {metadata?.name ?? "—"}
        </div>
        <div className="flex items-center justify-end">
          <button
            type="button"
            onClick={onCollect}
            className="rounded-[22px] bg-grey-moss-900 px-[18px] py-[9px] font-archivo-medium text-[13px] text-white active:opacity-80"
          >
            Collect
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileFeedCard;
