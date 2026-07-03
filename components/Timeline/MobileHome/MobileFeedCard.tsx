"use client";

import { TimelineMoment } from "@/types/moment";
import { ExternalLink, MessageCircle } from "lucide-react";
import Link from "next/link";
import ContentRenderer from "@/components/Renderers";
import { useMobileFeedCard } from "@/hooks/useMobileFeedCard";
import { cn } from "@/lib/utils";

interface MobileFeedCardProps {
  moment: TimelineMoment;
}

const actionButtonClass =
  "inline-flex min-w-[2.75rem] items-center gap-1.5 text-grey-moss-700 active:opacity-70";

const MobileFeedCard = ({ moment }: MobileFeedCardProps) => {
  const {
    metadata,
    externalUrl,
    priceLabel,
    isSoldOut,
    onCollect,
    onExternalLink,
    commentCount,
    momentPath,
  } = useMobileFeedCard(moment);
  const creatorName = moment.creator.username ?? `${moment.creator.address.slice(0, 6)}...`;
  const timeStr = new Date(moment.created_at).toLocaleString();
  const showActionBar = Boolean(momentPath || externalUrl);

  return (
    <div className="mb-2 overflow-hidden rounded-[6px] border border-grey-moss-100 bg-white shadow-[0_4px_16px_-6px_rgba(27,21,4,.14)]">
      <div className="relative isolate z-0 w-full overflow-hidden">
        <ContentRenderer metadata={metadata} variant="natural" />
      </div>
      <div className="px-[15px] pb-[15px] pt-[13px]">
        <div className="mb-[5px] flex items-center gap-[9px]">
          <Link
            href={`/${moment.creator.address.toLowerCase()}`}
            onClick={(e) => e.stopPropagation()}
            className="font-archivo-medium text-base text-grey-moss-900 active:opacity-70"
          >
            {creatorName}
          </Link>
          <span className="ml-auto font-archivo text-xs text-tan-gold">{timeStr}</span>
        </div>
        <div className="flex items-end justify-between gap-3">
          <div className="min-w-0 flex-1 font-spectral-italic text-lg leading-[1.3] text-grey-moss-900">
            {metadata?.name ?? "—"}
          </div>
          <div className="flex shrink-0 flex-col items-center gap-[5px]">
            {priceLabel && (
              <span className="font-archivo-bold text-xs uppercase text-tan-gold">
                {priceLabel}
              </span>
            )}
            <button
              type="button"
              disabled={isSoldOut}
              onClick={(e) => {
                e.stopPropagation();
                if (!isSoldOut) onCollect();
              }}
              className={cn(
                "rounded-[22px] px-[18px] py-[9px] font-archivo-medium text-sm",
                isSoldOut
                  ? "cursor-not-allowed bg-grey-moss-300 text-white"
                  : "bg-grey-moss-900 text-white active:opacity-80"
              )}
            >
              {isSoldOut ? "Sold Out" : "Collect"}
            </button>
          </div>
        </div>
        {showActionBar && (
          <div className="mt-3 flex items-center gap-8">
            {momentPath && (
              <Link
                href={momentPath}
                onClick={(e) => e.stopPropagation()}
                className={actionButtonClass}
                aria-label={`${commentCount} comments`}
              >
                <MessageCircle className="h-[17px] w-[17px]" strokeWidth={1.75} />
                <span className="font-archivo text-sm tabular-nums">
                  {commentCount.toLocaleString()}
                </span>
              </Link>
            )}
            {externalUrl && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onExternalLink();
                }}
                className={actionButtonClass}
                aria-label="Open external link"
              >
                <ExternalLink className="h-[17px] w-[17px]" strokeWidth={1.75} />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileFeedCard;
