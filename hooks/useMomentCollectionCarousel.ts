"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Address } from "viem";
import { useTimelineProvider } from "@/providers/TimelineProvider";
import useCollection from "@/hooks/useCollection";
import { getMomentUrl } from "@/lib/moment/getMomentUrl";
import { timelineMomentToApiResponse } from "@/lib/moment/timelineMomentToApiResponse";
import { getShortNameFromChainId } from "@/lib/zora/getShortNameFromChainId";
import truncateAddress from "@/lib/utils/truncateAddress";
import { TimelineMoment } from "@/types/moment";

export type MomentCollectionCarouselValue = {
  tokenId: string;
  moments: TimelineMoment[];
  currentIndex: number;
  activeMoment: TimelineMoment | undefined;
  canNavigate: boolean;
  counter: string | null;
  goPrev: () => void;
  goNext: () => void;
  goToIndex: (index: number) => void;
  collectionName: string;
  collectionHref: string | undefined;
};

export const MomentCollectionCarouselContext = createContext<MomentCollectionCarouselValue | null>(
  null
);

export const useMomentCollectionCarouselState = ({
  collectionAddress,
  chainId,
  initialTokenId,
}: {
  collectionAddress: Address;
  chainId: number;
  initialTokenId: string;
}): MomentCollectionCarouselValue => {
  const queryClient = useQueryClient();
  const { moments, hasNextPage, isFetchingNextPage, fetchMore } = useTimelineProvider();
  const [tokenId, setTokenId] = useState(initialTokenId);

  useEffect(() => {
    setTokenId(initialTokenId);
  }, [initialTokenId]);

  useEffect(() => {
    const onPopState = () => {
      const match = window.location.pathname.match(/\/(\d+)\/?$/);
      if (match?.[1]) setTokenId(match[1]);
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    if (hasNextPage && !isFetchingNextPage) fetchMore();
  }, [hasNextPage, isFetchingNextPage, fetchMore]);

  useEffect(() => {
    for (const item of moments) {
      queryClient.setQueryData(
        ["tokenInfo", collectionAddress, String(item.token_id), chainId],
        (existing: ReturnType<typeof timelineMomentToApiResponse> | undefined) =>
          existing ?? timelineMomentToApiResponse(item)
      );
    }
  }, [moments, queryClient, collectionAddress, chainId]);

  const currentIndex = useMemo(
    () => moments.findIndex((item) => String(item.token_id) === String(tokenId)),
    [moments, tokenId]
  );
  const activeMoment = currentIndex >= 0 ? moments[currentIndex] : undefined;
  const canNavigate = moments.length > 1 && currentIndex >= 0;

  const momentsRef = useRef(moments);
  const currentIndexRef = useRef(currentIndex);
  momentsRef.current = moments;
  currentIndexRef.current = currentIndex;

  const { data: collectionData } = useCollection({
    collectionAddress,
    chainId: String(chainId),
  });
  const shortName = getShortNameFromChainId(chainId);
  const collectionHref = shortName ? `/collection/${shortName}:${collectionAddress}` : undefined;
  const collectionName =
    collectionData?.name?.trim() ||
    moments[0]?.collection?.name?.trim() ||
    truncateAddress(collectionAddress);

  const goToIndex = useCallback(
    (index: number) => {
      const list = momentsRef.current;
      if (list.length < 2) return;
      const target = list[(index + list.length) % list.length];
      const nextTokenId = String(target.token_id);
      if (nextTokenId === String(tokenId)) return;

      queryClient.setQueryData(
        ["tokenInfo", collectionAddress, nextTokenId, chainId],
        (existing: ReturnType<typeof timelineMomentToApiResponse> | undefined) =>
          existing ?? timelineMomentToApiResponse(target)
      );
      setTokenId(nextTokenId);

      const url = getMomentUrl(target);
      if (url && !url.isExternal) {
        window.history.replaceState(window.history.state, "", url.href);
      }
    },
    [tokenId, queryClient, collectionAddress, chainId]
  );

  const goPrev = useCallback(() => goToIndex(currentIndexRef.current - 1), [goToIndex]);
  const goNext = useCallback(() => goToIndex(currentIndexRef.current + 1), [goToIndex]);

  useEffect(() => {
    if (!canNavigate) return;
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.closest("input, textarea, [contenteditable=true]")) return;
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goPrev();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        goNext();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [canNavigate, goPrev, goNext]);

  return {
    tokenId,
    moments,
    currentIndex,
    activeMoment,
    canNavigate,
    counter: canNavigate ? `${currentIndex + 1} / ${moments.length}` : null,
    goPrev,
    goNext,
    goToIndex,
    collectionName,
    collectionHref,
  };
};

const useMomentCollectionCarousel = () => {
  const ctx = useContext(MomentCollectionCarouselContext);
  if (!ctx) {
    throw new Error("useMomentCollectionCarousel must be used within MomentCollectionCarouselRoot");
  }
  return ctx;
};

export default useMomentCollectionCarousel;
