"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { MessageCircle } from "lucide-react";
import ContentRenderer from "@/components/Renderers";
import OpenInNewTabMenu from "@/components/OpenInNewTabMenu";
import { formatSalePriceLabel } from "@/lib/moment/formatSalePriceLabel";
import { getMomentUrl } from "@/lib/moment/getMomentUrl";
import { toTimelineMoment } from "@/lib/collected/toTimelineMoment";
import { getShortNameFromChainId } from "@/lib/zora/getShortNameFromChainId";
import truncateAddress from "@/lib/utils/truncateAddress";
import type { CollectorTransfer } from "@/types/collectorTransfer";
import { Protocol } from "@/types/moment";

type Props = {
  transfer: CollectorTransfer;
};

const CollectedCard = ({ transfer }: Props) => {
  const { push } = useRouter();
  const { metadata, collection, sale } = transfer.moment;
  const shortName = getShortNameFromChainId(collection.chain_id);
  const collectionName = collection.name?.trim() || truncateAddress(collection.address);
  const collectionHref = shortName ? `/collection/${shortName}:${collection.address}` : undefined;
  const timelineMoment = toTimelineMoment(transfer);
  const momentUrl = getMomentUrl(timelineMoment);
  const priceLabel = formatSalePriceLabel(sale);
  const timeStr = transfer.transferred_at
    ? new Date(transfer.transferred_at).toLocaleString()
    : "—";
  const momentName = metadata?.name?.trim() || "—";
  const showComments = String(collection.protocol) === Protocol.InProcess;
  const commentCount = transfer.moment.comments ?? 0;

  const handleMomentClick = () => {
    if (!momentUrl) return;
    if (momentUrl.isExternal) {
      window.open(momentUrl.href, "_blank", "noopener,noreferrer");
      return;
    }
    push(momentUrl.href);
  };

  return (
    <OpenInNewTabMenu href={momentUrl?.href}>
      <div
        role="button"
        tabIndex={0}
        onClick={handleMomentClick}
        onKeyDown={(e) => e.key === "Enter" && handleMomentClick()}
        className="group mb-3 w-full cursor-pointer overflow-hidden rounded-[6px] border border-grey-moss-100 bg-white text-left shadow-[0_4px_16px_-6px_rgba(27,21,4,.14)] md:mb-2"
      >
        <div className="relative isolate z-0 w-full overflow-hidden">
          <ContentRenderer metadata={metadata ?? undefined} variant="natural" preferPoster />
        </div>
        <div className="px-2.5 pb-3 pt-2.5 md:px-[15px] md:pb-[15px] md:pt-[13px]">
          <div className="mb-[5px] flex flex-col gap-[2px]">
            <div className="flex items-center justify-between gap-[9px]">
              <span className="block min-w-0 truncate font-archivo-medium text-sm text-grey-moss-900 transition-colors group-hover:text-tan-gold md:text-base">
                {momentName}
              </span>
              <span className="shrink-0 font-archivo text-[11px] text-tan-gold md:text-xs">
                {timeStr}
              </span>
            </div>
            {collectionHref && (
              <div className="flex items-center justify-between gap-[9px]">
                <Link
                  href={collectionHref}
                  onClick={(e) => e.stopPropagation()}
                  className="block min-w-0 truncate font-archivo text-[11px] text-grey-moss-300 transition-colors hover:text-grey-moss-900 active:opacity-70 md:text-xs"
                >
                  {collectionName}
                </Link>
                <Link
                  href={collectionHref}
                  onClick={(e) => e.stopPropagation()}
                  className="shrink-0 font-archivo text-[11px] text-tan-gold underline underline-offset-2 transition-colors hover:text-grey-moss-900 active:opacity-70 md:text-xs"
                >
                  {`[ View collection ]`}
                </Link>
              </div>
            )}
          </div>

          <div className="mt-2 flex items-center justify-between gap-3">
            <div className="flex shrink-0 items-center gap-2">
              {priceLabel && (
                <span className="font-archivo-bold text-xs uppercase text-tan-gold">
                  {priceLabel}
                </span>
              )}
            </div>
            {showComments && (
              <span
                className="inline-flex items-center gap-1.5 text-grey-moss-700"
                aria-label={`${commentCount} comments`}
              >
                <MessageCircle className="h-[17px] w-[17px]" strokeWidth={1.75} />
                <span className="font-archivo text-sm tabular-nums">
                  {commentCount.toLocaleString()}
                </span>
              </span>
            )}
          </div>
        </div>
      </div>
    </OpenInNewTabMenu>
  );
};

export default CollectedCard;
