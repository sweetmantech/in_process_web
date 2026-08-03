"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { MessageCircle } from "lucide-react";
import ContentRenderer from "@/components/Renderers";
import OpenInNewTabMenu from "@/components/OpenInNewTabMenu";
import { formatSalePriceLabel } from "@/lib/moment/formatSalePriceLabel";
import { getMomentUrl } from "@/lib/moment/getMomentUrl";
import { getShortNameFromChainId } from "@/lib/zora/getShortNameFromChainId";
import truncateAddress from "@/lib/utils/truncateAddress";
import { useMobileDrawersProvider } from "@/providers/MobileDrawersProvider";
import type { CollectorTransfer } from "@/types/collectorTransfer";
import { Protocol, type TimelineMoment } from "@/types/moment";

type Props = {
  transfer: CollectorTransfer;
};

const toTimelineMoment = (transfer: CollectorTransfer): TimelineMoment => {
  const { metadata, collection, token_id, sale } = transfer.moment;
  return {
    address: collection.address,
    token_id: String(token_id),
    chain_id: collection.chain_id,
    id: String(transfer.id),
    uri: "",
    protocol: collection.protocol as Protocol,
    creator: {
      address: collection.artist?.address ?? "",
      username: collection.artist?.username ?? null,
    },
    admins: [],
    hidden: [],
    created_at: transfer.transferred_at,
    metadata: metadata ?? undefined,
    sale: sale ?? null,
    comments: 0,
  };
};

const CollectedCard = ({ transfer }: Props) => {
  const { push } = useRouter();
  const { openComment } = useMobileDrawersProvider();
  const { metadata, collection, sale } = transfer.moment;
  const shortName = getShortNameFromChainId(collection.chain_id);
  const collectionName =
    collection.name?.trim() || truncateAddress(collection.address);
  const collectionHref = shortName ? `/collection/${shortName}:${collection.address}` : undefined;
  const timelineMoment = toTimelineMoment(transfer);
  const momentUrl = getMomentUrl(timelineMoment);
  const priceLabel = formatSalePriceLabel(sale);
  const timeStr = transfer.transferred_at
    ? new Date(transfer.transferred_at).toLocaleString()
    : "—";
  const momentName = metadata?.name?.trim() || "—";
  const showComments = String(collection.protocol) === Protocol.InProcess;

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
        className="group mb-2 w-full break-inside-avoid cursor-pointer overflow-hidden rounded-[6px] border border-grey-moss-100 bg-white text-left shadow-[0_4px_16px_-6px_rgba(27,21,4,.14)]"
      >
        <div className="relative isolate z-0 w-full overflow-hidden">
          <ContentRenderer metadata={metadata ?? undefined} variant="natural" />
        </div>
        <div className="px-[15px] pb-[15px] pt-[13px]">
          <div className="mb-[5px] flex flex-col gap-[2px]">
            <div className="flex items-center justify-between gap-[9px]">
              <span className="block min-w-0 truncate font-archivo-medium text-base text-grey-moss-900 transition-colors group-hover:text-tan-gold">
                {momentName}
              </span>
              <span className="shrink-0 font-archivo text-xs text-tan-gold">{timeStr}</span>
            </div>
            {collectionHref && (
              <div className="flex items-center justify-between gap-[9px]">
                <Link
                  href={collectionHref}
                  onClick={(e) => e.stopPropagation()}
                  className="block min-w-0 truncate font-archivo text-xs text-grey-moss-300 transition-colors hover:text-grey-moss-900 active:opacity-70"
                >
                  {collectionName}
                </Link>
                <Link
                  href={collectionHref}
                  onClick={(e) => e.stopPropagation()}
                  className="shrink-0 font-archivo text-xs text-tan-gold underline underline-offset-2 transition-colors hover:text-grey-moss-900 active:opacity-70"
                >
                  {`[ View collection ]`}
                </Link>
              </div>
            )}
          </div>

          <div className="mt-2 flex items-center justify-between gap-3">
            <div className="flex shrink-0 items-center gap-2">
              {priceLabel && (
                <span className="font-archivo-bold text-xs uppercase text-tan-gold">{priceLabel}</span>
              )}
            </div>
            {showComments && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  openComment(timelineMoment);
                }}
                className="inline-flex items-center gap-1.5 text-grey-moss-700 active:opacity-70"
                aria-label="comments"
              >
                <MessageCircle className="h-[17px] w-[17px]" strokeWidth={1.75} />
              </button>
            )}
          </div>
        </div>
      </div>
    </OpenInNewTabMenu>
  );
};

export default CollectedCard;
