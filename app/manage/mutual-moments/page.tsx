"use client";

import Moments from "@/components/MomentsGrid/Moments";
import MomentsSkeleton from "@/components/MomentsGrid/MomentsSkeleton";
import { TimelineProvider } from "@/providers/TimelineProvider";
import { useWalletsProvider } from "@/providers/WalletsProvider";
import { Address } from "viem";
import SignToInProcess from "@/components/ManagePage/SignToInProcess";

const ManageMutualMoments = () => {
  const { primaryWallet, walletsReady } = useWalletsProvider();

  if (!walletsReady) return <MomentsSkeleton />;
  if (!primaryWallet) return <SignToInProcess />;

  return (
    <TimelineProvider artistAddress={primaryWallet as Address} includeHidden={true} type="mutual">
      <Moments />
    </TimelineProvider>
  );
};

export default ManageMutualMoments;
