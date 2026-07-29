"use client";

import { useMomentProvider } from "@/providers/MomentProvider";
import { useArtistProfile } from "@/hooks/useArtistProfile";
import truncateAddress from "@/lib/utils/truncateAddress";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const BackToTimeline = () => {
  const { owner } = useMomentProvider();
  const { data: artistProfile, isLoading } = useArtistProfile(owner || undefined);

  if (!owner) return null;

  if (isLoading) {
    return (
      <div className="mb-3">
        <Skeleton className="h-5 w-48" />
      </div>
    );
  }

  const displayName = artistProfile?.username || truncateAddress(owner);

  return (
    <div className="mb-3">
      <Link
        href={`/${owner.toLowerCase()}`}
        className="inline-flex items-center gap-1.5 font-archivo-medium text-[12.5px] tracking-wide text-[#6B6456] transition-colors hover:text-grey-moss-900"
      >
        <ChevronLeft className="size-[15px]" strokeWidth={1.75} />
        BACK TO {displayName}&#39;S TIMELINE
      </Link>
    </div>
  );
};

export default BackToTimeline;
