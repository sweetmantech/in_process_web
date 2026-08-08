"use client";

import { ReactNode } from "react";
import { EditIcon } from "@/components/ui/icons";
import { useProfileProvider } from "@/providers/ProfileProvider";
import SocialAccounts from "@/components/ArtistPage/SocialAccounts";
import { Skeleton } from "@/components/ui/skeleton";
import useArtistEditable from "@/hooks/useArtistEditable";
import EditingStatus from "@/components/ArtistPage/EditingStatus";
import ProfileStats, { type ProfileStat } from "@/components/ProfileStats";

export type { ProfileStat };

type Props = {
  stats: ProfileStat[];
  /** When set, socials move to a second row with this content on the right. */
  toolbar?: ReactNode;
};

const ProfileWithStats = ({ stats, toolbar }: Props) => {
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

  return (
    <div className="mb-5 flex flex-col gap-2">
      {isEditing && <EditingStatus />}

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-8">
        <div className="min-w-0 flex-1 md:min-w-[280px] md:basis-[340px]">
          <div className="flex items-center gap-3">
            {isEditing ? (
              <input
                type="text"
                ref={usernameRef}
                value={username}
                onChange={(e) => setUserName(e.target.value)}
                className="max-w-[200px] bg-transparent p-1 font-spectral-medium text-[32px] leading-none outline-none ring-0 md:text-[38px]"
              />
            ) : (
              <h1 className="m-0 font-spectral-medium text-[32px] leading-none text-[#1c1a17] md:text-[38px]">
                {isLoading ? (
                  <Skeleton className="h-8 w-[120px] md:h-10 md:w-[150px]" />
                ) : (
                  displayName
                )}
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
            <p className="mt-[9px] max-w-[520px] font-spectral text-[15px] leading-[1.45] text-[#4a463d]">
              {isLoading ? <Skeleton className="h-5 w-[280px]" /> : bio}
            </p>
          )}
          {!toolbar && (
            <div className="mt-3">
              <SocialAccounts />
            </div>
          )}
        </div>

        <ProfileStats stats={stats} />
      </div>

      {toolbar ? (
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between md:gap-6">
          <SocialAccounts />
          <div className="min-w-0 md:ml-auto">{toolbar}</div>
        </div>
      ) : null}
    </div>
  );
};

export default ProfileWithStats;
