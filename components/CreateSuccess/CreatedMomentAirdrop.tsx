"use client";

import MomentAirdrop from "../MomentAirdrop";
import { Address } from "viem";
import { MomentProvider } from "@/providers/MomentProvider";
import { CHAIN_ID } from "@/lib/consts";
import { useCollectionsProvider } from "@/providers/CollectionsProvider";
import { Fragment } from "react";
import useTokenIdParam from "@/hooks/useTokenIdParam";

const CreatedMomentAirdrop = () => {
  const tokenId = useTokenIdParam();
  const { selectedCollection: collection } = useCollectionsProvider();

  if (!collection) return <Fragment />;

  return (
    <MomentProvider
      moment={{
        collectionAddress: collection as Address,
        tokenId,
        chainId: CHAIN_ID,
      }}
    >
      <MomentAirdrop />
    </MomentProvider>
  );
};

export default CreatedMomentAirdrop;
