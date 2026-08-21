"use client";

import { useState } from "react";
import { Address } from "viem";
import { useParams } from "next/navigation";
import ProfileProvider from "@/providers/ProfileProvider";
import ProfileWithStats from "@/components/ProfileWithStats";
import CollectedToolbar from "./CollectedToolbar";
import CollectedCard from "./CollectedCard";
import { useCollectingStats } from "@/hooks/useCollectingStats";
import { useCollectorTransfers } from "@/hooks/useCollectorTransfers";
import FetchMore from "@/components/FetchMore";
import { formatStatValue } from "@/lib/stats/formatStatValue";
import type { ContentTypeFilter } from "@/lib/timeline/timelineFilters";
import type { AnalyticsContentType } from "@/types/timeline";

const CollectedPageContent = ({ address }: { address: Address }) => {
  const [contentTypeFilter, setContentTypeFilter] = useState<ContentTypeFilter>("All");
  const contentType =
    contentTypeFilter === "All" ? undefined : (contentTypeFilter as AnalyticsContentType);

  const { data: collectingStats, isLoading: isStatsLoading } = useCollectingStats(address);
  const { collectedCount } = useCollectorTransfers(address);
  const {
    transfers,
    isLoading: isTransfersLoading,
    hasNextPage,
    fetchMore,
  } = useCollectorTransfers(address, contentType);

  const showStatsLoading = isStatsLoading && !collectingStats;
  const showCountLoading = isTransfersLoading && collectedCount == null;
  const stats = [
    {
      value: String(collectedCount ?? 0),
      label: "moments collected",
      mobileLabel: "collected",
      loading: showCountLoading,
    },
    {
      value: `${formatStatValue(collectingStats?.eth_spent ?? "0")} ETH`,
      label: "eth spent",
      loading: showStatsLoading,
    },
    {
      value: `$${formatStatValue(collectingStats?.usdc_spent ?? "0", { maximumFractionDigits: 0 })}`,
      label: "usdc spent",
      loading: showStatsLoading,
    },
  ];

  return (
    <div className="relative flex min-h-full w-full grow flex-col text-[#1c1a17]">
      <div className="relative grow px-[18px] pb-[30px] pt-[22px] md:px-10 md:pb-11 xl:px-14 2xl:px-20 3xl:px-28">
        <ProfileWithStats
          stats={stats}
          toolbar={
            <CollectedToolbar
              address={address}
              active={contentTypeFilter}
              onChange={setContentTypeFilter}
            />
          }
        />
        {isTransfersLoading ? (
          <div className="py-16 text-center font-archivo text-sm text-[#8a8578]">
            Loading collected moments…
          </div>
        ) : transfers.length === 0 ? (
          <div className="py-16 text-center font-archivo text-sm text-[#8a8578]">
            No collected moments yet.
          </div>
        ) : (
          <>
            <div className="w-full columns-1 gap-3 md:columns-[232px] md:gap-3.5">
              {transfers.map((transfer) => (
                <CollectedCard key={transfer.id} transfer={transfer} />
              ))}
            </div>
            {hasNextPage && <FetchMore fetchMore={fetchMore} />}
          </>
        )}
      </div>
    </div>
  );
};

const CollectedPage = () => {
  const { artistAddress } = useParams();
  const address = artistAddress?.toString().toLowerCase() as Address | undefined;

  return (
    <ProfileProvider address={address}>
      {address ? <CollectedPageContent address={address} /> : null}
    </ProfileProvider>
  );
};

export default CollectedPage;
