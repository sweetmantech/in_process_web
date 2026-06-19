"use client";

import AirdropProvider from "@/providers/AirdropProvider";
import Airdrop from "@/components/MomentAirdrop/Airdrop";
import { useMomentProvider } from "@/providers/MomentProvider";

const MomentAirdrop = () => {
  const { isOwner } = useMomentProvider();

  if (!isOwner) return null;

  return (
    <AirdropProvider>
      <Airdrop />
    </AirdropProvider>
  );
};

export default MomentAirdrop;
