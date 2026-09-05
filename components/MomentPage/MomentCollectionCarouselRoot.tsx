"use client";

import { type ReactNode } from "react";
import { Address } from "viem";
import {
  MomentCollectionCarouselContext,
  useMomentCollectionCarouselState,
} from "@/hooks/useMomentCollectionCarousel";

const MomentCollectionCarouselRoot = ({
  children,
  collectionAddress,
  chainId,
  initialTokenId,
}: {
  children: ReactNode;
  collectionAddress: Address;
  chainId: number;
  initialTokenId: string;
}) => {
  const value = useMomentCollectionCarouselState({
    collectionAddress,
    chainId,
    initialTokenId,
  });

  return (
    <MomentCollectionCarouselContext.Provider value={value}>
      {children}
    </MomentCollectionCarouselContext.Provider>
  );
};

export default MomentCollectionCarouselRoot;
