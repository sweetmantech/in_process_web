"use client";

import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import MomentCount from "@/components/HomePage/MomentCount";
import { useCollectionProvider } from "@/providers/CollectionProvider";
import { useTimelineProvider } from "@/providers/TimelineProvider";
import truncateAddress from "@/lib/utils/truncateAddress";

const InPublicHero = () => {
  const { data: collection, isLoading: isCollectionLoading } = useCollectionProvider();
  const { moments, isLoading: isTimelineLoading } = useTimelineProvider();

  const collectionName = collection?.name || "IN PUBLIC";
  const creatorLabel =
    collection?.creator_username ||
    (collection?.creator ? truncateAddress(collection.creator) : "");
  const creatorAddress = collection?.creator?.toLowerCase();
  const totalCount = isTimelineLoading ? undefined : moments.length;

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 px-2 pb-2 pt-8">
      <div className="font-spectral-italic text-3xl leading-tight tracking-[-1px] text-grey-moss-900 md:text-4xl lg:text-[38px]">
        {isCollectionLoading ? <Skeleton className="h-10 w-48" /> : collectionName}
      </div>
      <div className="flex flex-wrap items-center gap-3.5">
        <MomentCount totalCount={totalCount} todayCount={0} />
        {creatorAddress && (
          <p className="font-archivo text-sm text-grey-moss-300">
            by{" "}
            <Link
              href={`/${creatorAddress}`}
              className="font-archivo-medium text-tan-gold transition-colors hover:text-grey-moss-900"
            >
              {creatorLabel}
            </Link>
          </p>
        )}
      </div>
    </div>
  );
};

export default InPublicHero;
