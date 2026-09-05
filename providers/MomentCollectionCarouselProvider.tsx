"use client";

import { createContext, useContext, type ReactNode } from "react";
import { Address } from "viem";
import useMomentCollectionCarousel from "@/hooks/useMomentCollectionCarousel";

const MomentCollectionCarouselContext = createContext<
  ReturnType<typeof useMomentCollectionCarousel> | undefined
>(undefined);

interface MomentCollectionCarouselProviderProps {
  children: ReactNode;
  collectionAddress: Address;
  chainId: number;
  initialTokenId: string;
}

export function MomentCollectionCarouselProvider({
  children,
  collectionAddress,
  chainId,
  initialTokenId,
}: MomentCollectionCarouselProviderProps) {
  const carousel = useMomentCollectionCarousel({
    collectionAddress,
    chainId,
    initialTokenId,
  });

  return (
    <MomentCollectionCarouselContext.Provider value={carousel}>
      {children}
    </MomentCollectionCarouselContext.Provider>
  );
}

export function useMomentCollectionCarouselProvider() {
  const context = useContext(MomentCollectionCarouselContext);
  if (context === undefined) {
    throw new Error(
      "useMomentCollectionCarouselProvider must be used within a MomentCollectionCarouselProvider"
    );
  }
  return context;
}
