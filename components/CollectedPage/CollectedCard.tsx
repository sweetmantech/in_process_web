"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { zeroAddress } from "viem";
import ContentRenderer from "@/components/Renderers";
import OpenInNewTabMenu from "@/components/OpenInNewTabMenu";
import { CHAIN_ID, USDC_ADDRESS } from "@/lib/consts";
import { getMomentUrl } from "@/lib/moment/getMomentUrl";
import { getShortNameFromChainId } from "@/lib/zora/getShortNameFromChainId";
import truncateAddress from "@/lib/utils/truncateAddress";
import type { CollectorTransfer } from "@/types/collectorTransfer";
import type { TimelineMoment } from "@/types/moment";

type Props = {
  transfer: CollectorTransfer;
};

const transferPriceLabel = (transfer: CollectorTransfer): string | null => {
  if (transfer.value == null) return null;
  const chainId = transfer.moment.collection.chain_id;
  const currency = transfer.currency;
  if (!currency || currency === zeroAddress) return `${transfer.value} ETH`;
  const usdc = USDC_ADDRESS[chainId] ?? USDC_ADDRESS[CHAIN_ID];
  if (usdc && currency.toLowerCase() === usdc.toLowerCase()) {
    return `${transfer.value} USDC`;
  }
  return `${transfer.value} ${truncateAddress(currency)}`;
};

const CollectedCard = ({ transfer }: Props) => {
  const { push } = useRouter();
  const { metadata, collection, token_id } = transfer.moment;
  const creatorAddress = collection.artist?.address;
  const creatorName =
    collection.artist?.username ?? (creatorAddress ? truncateAddress(creatorAddress) : "unknown");
  const shortName = getShortNameFromChainId(collection.chain_id);
  const collectionName = truncateAddress(collection.address);
  const collectionHref = shortName ? `/collection/${shortName}:${collection.address}` : undefined;
  const momentUrl = getMomentUrl({
    chain_id: collection.chain_id,
    address: collection.address,
    token_id,
    metadata: metadata ?? undefined,
  } as TimelineMoment);
  const priceLabel = transferPriceLabel(transfer);
  const timeStr = transfer.transferred_at
    ? new Date(transfer.transferred_at).toLocaleString()
    : "—";

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
              {creatorAddress ? (
                <Link
                  href={`/${creatorAddress.toLowerCase()}`}
                  onClick={(e) => e.stopPropagation()}
                  className="block min-w-0 truncate font-archivo-medium text-base text-grey-moss-900 transition-colors hover:text-tan-gold active:opacity-70"
                >
                  {creatorName}
                </Link>
              ) : (
                <span className="block min-w-0 truncate font-archivo-medium text-base text-grey-moss-900">
                  {creatorName}
                </span>
              )}
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

          <p className="my-2 line-clamp-2 font-spectral-italic text-lg leading-snug text-grey-moss-900 transition-colors group-hover:text-tan-gold">
            {metadata?.name ?? "—"}
          </p>

          {priceLabel && (
            <span className="font-archivo-bold text-xs uppercase text-tan-gold">{priceLabel}</span>
          )}
        </div>
      </div>
    </OpenInNewTabMenu>
  );
};

export default CollectedCard;
