"use client";

import { useMomentProvider } from "@/providers/MomentProvider";
import useMediaInitialization from "@/hooks/useMediaInitialization";
import { MomentEditProvider } from "@/providers/MomentEditProvider";
import MomentMediaCard from "./MomentMediaCard";
import MomentMediaSkeleton from "./MomentMediaSkeleton";

const MomentMedia = () => {
  const { metadata, isLoading } = useMomentProvider();
  useMediaInitialization(metadata ?? undefined);

  if (isLoading) return <MomentMediaSkeleton />;

  return (
    <MomentEditProvider>
      <MomentMediaCard />
    </MomentEditProvider>
  );
};

export default MomentMedia;
