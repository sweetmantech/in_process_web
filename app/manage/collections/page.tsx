"use client";

import ManageCollections from "@/components/ManageCollections/ManageCollections";
import MomentsSkeleton from "@/components/MomentsGrid/MomentsSkeleton";
import SignToInProcess from "@/components/ManagePage/SignToInProcess";
import { useWalletsProvider } from "@/providers/WalletsProvider";

const ManageCollectionsPage = () => {
  const { primaryWallet, walletsReady } = useWalletsProvider();

  if (!walletsReady) return <MomentsSkeleton />;
  if (!primaryWallet) return <SignToInProcess />;

  return <ManageCollections artist={primaryWallet} />;
};

export default ManageCollectionsPage;
