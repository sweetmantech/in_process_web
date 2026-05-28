"use client";

import { useWalletsProvider } from "@/providers/WalletsProvider";

interface OwnerWarningProps {
  isOwner: boolean;
}

const OwnerWarning = ({ isOwner }: OwnerWarningProps) => {
  const { walletsReady } = useWalletsProvider();

  if (!walletsReady || isOwner) return null;

  return <p className="text-grey-moss-500 text-xs">Only the contract owner can save changes.</p>;
};

export default OwnerWarning;
