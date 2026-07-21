"use client";

import { TimelineMoment } from "@/types/moment";
import { MessageCircle } from "lucide-react";
import Link from "next/link";
import ContentRenderer from "@/components/Renderers";
import { useMomentFeedCard } from "@/hooks/useMomentFeedCard";
import OpenInNewTabMenu from "@/components/OpenInNewTabMenu";
import { cn } from "@/lib/utils";

interface MomentFeedCardProps {
  moment: TimelineMoment;
}

const actionButtonClass = "inline-flex items-center gap-1.5 text-grey-moss-700 active:opacity-70";

const MomentFeedCard = ({ moment }: MomentFeedCardProps) => {
  const {
    metadata,
    priceLabel,
    isSoldOut,
    onCollect,
    onCommentClick,
    handleMomentClick,
    momentHref,
    commentCount,
    showComments,
    collectionName,
    collectionHref,
  } = useMomentFeedCard(moment);
  const creatorName = moment.creator.username ?? `${moment.creator.address.slice(0, 6)}...`;
  const timeStr = new Date(moment.created_at).toLocaleString();

  return (
    <OpenInNewTabMenu href={momentHref}>
      <div
        role="button"
        tabIndex={0}
        onClick={handleMomentClick}
        onKeyDown={(e) => e.key === "Enter" && handleMomentClick()}
        className="mb-2 cursor-pointer overflow-hidden rounded-[6px] border border-grey-moss-100 bg-white shadow-[0_4px_16px_-6px_rgba(27,21,4,.14)]"
      >
        <div className="relative isolate z-0 w-full overflow-hidden">
          <ContentRenderer metadata={metadata} variant="natural" />
        </div>
        <div className="px-[15px] pb-[15px] pt-[13px]">
          <div className="mb-[5px] flex flex-col gap-[2px]">
            <div className="flex items-center justify-between gap-[9px]">
              <Link
                href={`/${moment.creator.address.toLowerCase()}`}
                onClick={(e) => e.stopPropagation()}
                className="block min-w-0 truncate font-archivo-medium text-base text-grey-moss-900 active:opacity-70"
              >
                {creatorName}
              </Link>
              <span className="shrink-0 font-archivo text-xs text-tan-gold">{timeStr}</span>
            </div>
            {collectionHref && (
              <div className="flex items-center justify-between gap-[9px]">
                <Link
                  href={collectionHref}
                  onClick={(e) => e.stopPropagation()}
                  className="block min-w-0 truncate font-archivo text-xs text-grey-moss-300 active:opacity-70"
                >
                  {collectionName}
                </Link>
                <Link
                  href={collectionHref}
                  onClick={(e) => e.stopPropagation()}
                  className="shrink-0 font-archivo text-xs text-tan-gold underline underline-offset-2 active:opacity-70"
                >
                  {`[ View collection ]`}
                </Link>
              </div>
            )}
          </div>

          <p className="my-2 line-clamp-2 font-spectral-italic text-lg leading-snug text-grey-moss-900">
            {metadata?.name ?? "—"}
          </p>

          <div className="flex items-center justify-between gap-3">
            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                disabled={isSoldOut}
                onClick={(e) => {
                  e.stopPropagation();
                  if (!isSoldOut) onCollect();
                }}
                className={cn(
                  "rounded-[22px] px-4 py-2 font-archivo-medium text-sm",
                  isSoldOut
                    ? "cursor-not-allowed bg-grey-moss-300 text-white"
                    : "bg-grey-moss-900 text-white active:opacity-80"
                )}
              >
                {isSoldOut ? "Sold Out" : "Collect"}
              </button>
              {priceLabel && (
                <span className="font-archivo-bold text-xs uppercase text-tan-gold">
                  {priceLabel}
                </span>
              )}
            </div>

            {showComments && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onCommentClick();
                }}
                className={actionButtonClass}
                aria-label={`${commentCount} comments`}
              >
                <MessageCircle className="h-[17px] w-[17px]" strokeWidth={1.75} />
                <span className="font-archivo text-sm tabular-nums">
                  {commentCount.toLocaleString()}
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
    </OpenInNewTabMenu>
  );
};

export default MomentFeedCard;
