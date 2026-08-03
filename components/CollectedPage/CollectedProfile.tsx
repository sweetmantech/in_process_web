"use client";

import { EditIcon } from "../ui/icons";
import { useProfileProvider } from "@/providers/ProfileProvider";
import SocialAccounts from "../ArtistPage/SocialAccounts";
import { Skeleton } from "../ui/skeleton";
import useArtistEditable from "@/hooks/useArtistEditable";
import EditingStatus from "../ArtistPage/EditingStatus";
import { formatCollectedStatValue } from "@/lib/stats/formatCollectedStatValue";
import type { CollectingStats } from "@/types/collectingStats";

type Props = {
  collectingStats?: CollectingStats;
  isStatsLoading: boolean;
  collectedCount?: number;
  isCollectedCountLoading?: boolean;
};

const CollectedProfile = ({
  collectingStats,
  isStatsLoading,
  collectedCount,
  isCollectedCountLoading = false,
}: Props) => {
  const {
    isEditing,
    toggleEditing,
    displayName,
    username,
    bio,
    setUserName,
    setBio,
    isLoading,
    usernameRef,
    bioRef,
  } = useProfileProvider();
  const { isEditable } = useArtistEditable();

  const momentsCollected = collectedCount ?? 0;
  const ethSpent = collectingStats?.eth_spent ?? "0";
  const usdcSpent = collectingStats?.usdc_spent ?? "0";
  const showStatsLoading = isStatsLoading && !collectingStats;
  const showCountLoading = isCollectedCountLoading && collectedCount == null;

  const stats = [
    { value: String(momentsCollected), label: "moments collected", loading: showCountLoading },
    {
      value: `${formatCollectedStatValue(ethSpent)} ETH`,
      label: "eth spent",
      loading: showStatsLoading,
    },
    {
      value: `$${formatCollectedStatValue(usdcSpent, { maximumFractionDigits: 0 })}`,
      label: "usdc spent",
      loading: showStatsLoading,
    },
  ];

  return (
    <div className="mb-5 flex flex-wrap items-end justify-between gap-8">
      {isEditing && <EditingStatus />}
      <div className="min-w-[280px] flex-1 basis-[340px]">
        <div className="flex items-center gap-3">
          {isEditing ? (
            <input
              type="text"
              ref={usernameRef}
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              className="max-w-[200px] bg-transparent p-1 font-spectral-medium text-[38px] leading-none outline-none ring-0"
            />
          ) : (
            <h1 className="m-0 font-spectral-medium text-[38px] leading-none text-[#1c1a17]">
              {isLoading ? <Skeleton className="h-10 w-[150px]" /> : displayName}
            </h1>
          )}
          {isEditable && !isEditing && (
            <button
              type="button"
              onClick={toggleEditing}
              className="flex size-6 items-center justify-center rounded-md border border-[rgba(28,26,23,0.2)] text-[#8a8578]"
              aria-label="Edit profile"
            >
              <EditIcon width={12} height={12} />
            </button>
          )}
        </div>
        {isEditing ? (
          <input
            type="text"
            ref={bioRef}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="mt-[9px] max-w-[520px] bg-transparent p-1 font-spectral text-[15px] leading-[1.45] text-[#4a463d] outline-none ring-0"
          />
        ) : (
          <p className="mb-3 mt-[9px] max-w-[520px] font-spectral text-[15px] leading-[1.45] text-[#4a463d]">
            {isLoading ? <Skeleton className="h-5 w-[280px]" /> : bio}
          </p>
        )}
        <SocialAccounts variant="subtle" />
      </div>

      <div className="flex shrink-0">
        {stats.map((stat, index) => (
          <div
            key={stat.label}
            className={`px-[22px] py-1.5 text-right ${index === 0 ? "" : "border-l border-[rgba(28,26,23,0.12)]"}`}
          >
            <div className="whitespace-nowrap font-spectral-medium text-[25px] leading-none text-[#1c1a17]">
              {stat.loading ? <Skeleton className="ml-auto h-6 w-16" /> : stat.value}
            </div>
            <div className="mt-[7px] font-mono text-[9.5px] uppercase tracking-[0.13em] text-[#8a8578]">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CollectedProfile;
