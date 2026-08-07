"use client";

import AltToggle from "./AltToggle";
import { useState } from "react";
import { useParams } from "next/navigation";
import MomentsTimeline from "../Timeline/MomentsTimeline";
import { TimelineProvider } from "@/providers/TimelineProvider";
import ProfileProvider from "@/providers/ProfileProvider";
import { Address } from "viem";
import ProfileWithStats from "@/components/ProfileWithStats";
import { useTimelineStats } from "@/hooks/useTimelineStats";
import { formatStatValue } from "@/lib/stats/formatStatValue";

const ArtistPageContent = ({ address }: { address: Address }) => {
  const [alt, setAlt] = useState<"timeline" | "grid">("grid");
  const { data: timelineStats, isLoading: isStatsLoading } = useTimelineStats(address);

  const showStatsLoading = isStatsLoading && !timelineStats;
  const stats = [
    {
      value: String(timelineStats?.created_count ?? 0),
      label: "moments created",
      mobileLabel: "created",
      loading: showStatsLoading,
    },
    {
      value: `${formatStatValue(timelineStats?.eth_archived ?? "0")} ETH`,
      label: "eth archived",
      loading: showStatsLoading,
    },
    {
      value: `$${formatStatValue(timelineStats?.usdc_archived ?? "0", { maximumFractionDigits: 0 })}`,
      label: "usdc archived",
      loading: showStatsLoading,
    },
  ];

  return (
    <div className="relative flex min-h-full w-full grow flex-col text-[#1c1a17]">
      <div className="relative grow px-[18px] pb-[30px] pt-[22px] md:px-10 md:pb-11 xl:px-14 2xl:px-20 3xl:px-28">
        <ProfileWithStats stats={stats} />
        <div className="mb-4 flex justify-end">
          <AltToggle alt={alt} setAlt={setAlt} />
        </div>
        <div className={`flex grow flex-col ${alt === "timeline" && "md:pt-20"}`}>
          <TimelineProvider artistAddress={address} curated={false}>
            <MomentsTimeline alt={alt} />
          </TimelineProvider>
        </div>
      </div>
    </div>
  );
};

const ArtistPage = () => {
  const { artistAddress } = useParams();
  const address = artistAddress?.toString().toLowerCase() as Address | undefined;

  return (
    <ProfileProvider address={address}>
      {address ? <ArtistPageContent address={address} /> : null}
    </ProfileProvider>
  );
};

export default ArtistPage;
