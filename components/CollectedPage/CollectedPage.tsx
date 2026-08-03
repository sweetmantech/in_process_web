"use client";

import { Address } from "viem";
import { useParams } from "next/navigation";
import ProfileProvider from "@/providers/ProfileProvider";
import useIsMobile from "@/hooks/useIsMobile";
import CollectedProfile from "./CollectedProfile";
import CollectedToolbar from "./CollectedToolbar";
import CollectedCard from "./CollectedCard";
import { useCollectedPageState } from "./useCollectedPageState";
import { useCollectingStats } from "@/hooks/useCollectingStats";
import { useCollectorTransfers } from "@/hooks/useCollectorTransfers";
import FetchMore from "@/components/FetchMore";

const DesktopCollectedPage = ({ address }: { address: Address }) => {
  const { data: collectingStats, isLoading: isStatsLoading } = useCollectingStats(address);
  const {
    transfers: sourceTransfers,
    collectedCount,
    isLoading: isTransfersLoading,
    hasNextPage,
    fetchMore,
  } = useCollectorTransfers(address);

  const { transfers, typeTabs, contentType, setContentType } = useCollectedPageState({
    transfers: sourceTransfers,
  });

  return (
    <div className="relative flex min-h-full w-full grow flex-col text-[#1c1a17]">
      <div className="relative grow px-10 pb-11 pt-[22px] xl:px-14 2xl:px-20 3xl:px-28">
        <CollectedProfile
          collectingStats={collectingStats}
          isStatsLoading={isStatsLoading}
          collectedCount={collectedCount}
          isCollectedCountLoading={isTransfersLoading}
        />
        <CollectedToolbar tabs={typeTabs} active={contentType} onChange={setContentType} />
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
            <div className="w-full" style={{ columnWidth: "232px", columnGap: "14px" }}>
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
  const isMobile = useIsMobile();
  const { artistAddress } = useParams();
  const address = artistAddress?.toString().toLowerCase() as Address | undefined;

  return (
    <ProfileProvider address={address}>
      {isMobile ? (
        <div className="flex grow items-center justify-center px-6 py-20 text-center font-spectral text-lg text-grey-moss-300">
          Collected moments desktop view coming soon on mobile.
        </div>
      ) : address ? (
        <DesktopCollectedPage address={address} />
      ) : null}
    </ProfileProvider>
  );
};

export default CollectedPage;
