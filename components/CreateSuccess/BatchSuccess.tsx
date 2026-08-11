"use client";

import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import useBatchSuccess from "@/hooks/useBatchSuccess";
import useFireCreateSuccessConfetti from "@/hooks/useFireCreateSuccessConfetti";
import BlurImage from "@/components/BlurImage";
import { Skeleton } from "@/components/ui/skeleton";
import Buttons from "./Buttons";
import BatchSuccessThumbSwiper from "./BatchSuccessThumbSwiper";
import BatchSuccessMediaPreview from "./BatchSuccessMediaPreview";

const BatchSuccess = () => {
  const {
    items,
    collectionName,
    collectionImageUrl,
    shareUrl,
    timelineHref,
    displayedPrice,
    timestamp,
    isLoading,
    handleBackToCreate,
  } = useBatchSuccess();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const firstTokenId = items[0]?.tokenId;
  const selectedItem = items[Math.min(selectedIndex, Math.max(items.length - 1, 0))];
  const momentCount = items.length;

  useFireCreateSuccessConfetti({
    liveTokenId: firstTokenId,
    isLoading,
    momentMetadata: items[0]?.metadata ?? items[0] ?? null,
  });

  if (isLoading) {
    return (
      <div className="col-span-1 w-full md:col-span-2">
        <div className="mx-auto mt-2 w-full max-w-[1120px] px-[6px] pb-12 md:mt-9 md:px-10 md:pb-20">
          <Skeleton className="mb-6 h-5 w-36" />
          <div className="grid items-start gap-6 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] md:gap-10">
            <div className="min-w-0">
              <Skeleton className="aspect-square w-full rounded-[16px]" />
              <div className="mt-3.5 flex gap-3">
                <Skeleton className="size-[78px] rounded-[11px]" />
                <Skeleton className="size-[78px] rounded-[11px]" />
                <Skeleton className="size-[78px] rounded-[11px]" />
              </div>
            </div>
            <div className="flex min-w-0 flex-col">
              <Skeleton className="h-9 w-64" />
              <Skeleton className="mt-4 h-3 w-20" />
              <Skeleton className="mt-2 h-8 w-48" />
              <div className="mt-4 flex gap-2">
                <Skeleton className="h-8 w-12 rounded-[22px]" />
                <Skeleton className="h-8 w-12 rounded-[22px]" />
                <Skeleton className="h-8 w-12 rounded-[22px]" />
              </div>
              <div className="mt-[18px] flex justify-between border-b border-[#E4E0D7] pb-4">
                <Skeleton className="h-8 w-28" />
                <Skeleton className="h-4 w-32" />
              </div>
              <div className="mt-3 flex gap-3">
                <Skeleton className="h-[51px] flex-1 rounded-[12px]" />
                <Skeleton className="h-[51px] flex-1 rounded-[12px]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0 || !selectedItem) return null;

  return (
    <div className="col-span-1 w-full md:col-span-2">
      <div className="mx-auto mt-2 w-full max-w-[1120px] px-[6px] pb-12 md:mt-9 md:px-10 md:pb-20">
        <button
          type="button"
          onClick={handleBackToCreate}
          className="mb-6 inline-flex items-center gap-2 font-archivo-medium text-[14px] text-[#6B6456] transition-colors hover:text-grey-moss-900 md:mb-7"
        >
          <ArrowLeft className="size-[18px]" strokeWidth={1.75} />
          Back to create
        </button>

        <div className="grid items-start gap-6 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] md:gap-10">
          <div className="min-w-0 md:sticky md:top-9">
            <div className="overflow-hidden rounded-[16px] border border-[#E4E0D7] bg-white shadow-[0_30px_70px_-34px_rgba(27,21,4,.45),0_0_0_1px_rgba(27,21,4,.03)]">
              <div className="relative aspect-square bg-[#EDEAE2]">
                <BatchSuccessMediaPreview
                  key={selectedItem.tokenId || selectedIndex}
                  item={selectedItem}
                />
              </div>
            </div>

            <BatchSuccessThumbSwiper
              items={items}
              selectedIndex={selectedIndex}
              onSelect={setSelectedIndex}
            />
          </div>

          <div className="flex min-w-0 flex-col">
            <h1 className="whitespace-nowrap font-archivo-medium text-[28px] leading-[1.02] tracking-[-0.01em] text-grey-moss-900 md:text-[36px]">
              {momentCount} moment{momentCount !== 1 ? "s" : ""} created
            </h1>

            <div className="mt-4 font-archivo-bold text-[11px] uppercase tracking-[0.1em] text-[#A8A296]">
              Collection
            </div>
            <div className="mt-1.5 flex items-center gap-3">
              {collectionImageUrl ? (
                <div className="relative size-10 shrink-0 overflow-hidden rounded-[10px] border border-[#E4E0D7] bg-[#EDEAE2]">
                  <BlurImage
                    src={collectionImageUrl}
                    alt={collectionName}
                    fill
                    className="object-cover"
                    sizes="40px"
                  />
                </div>
              ) : null}
              <div className="min-w-0 font-spectral-italic text-[28px] leading-[1.1] text-grey-moss-900 md:text-[32px]">
                {collectionName}
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {items.map((item, index) => {
                const selected = index === selectedIndex;
                return (
                  <button
                    key={`chip-${item.tokenId || index}`}
                    type="button"
                    onClick={() => setSelectedIndex(index)}
                    className={cn(
                      "rounded-[22px] border px-3.5 py-[7px] font-archivo-medium text-[13px] transition-colors",
                      selected
                        ? "border-grey-moss-900 bg-grey-moss-900 text-white"
                        : "border-[#E4E0D7] bg-white text-grey-moss-900 hover:bg-[#F7F5F0]"
                    )}
                  >
                    #{item.tokenId || index + 1}
                  </button>
                );
              })}
            </div>

            <div className="mt-[18px] flex items-baseline justify-between gap-4 border-b border-[#E4E0D7] pb-4">
              <span className="font-archivo-bold text-[28px] tracking-[-0.015em] text-[#A8862F]">
                {displayedPrice}
              </span>
              <span className="text-right font-archivo text-[12.5px] text-[#A8A296]">
                {timestamp}
              </span>
            </div>

            <div className="mt-3">
              <Buttons
                shareUrl={shareUrl}
                timelineHref={timelineHref}
                shareTitle={`${momentCount} moments on ${collectionName}`}
                shareLabel="Share all"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BatchSuccess;
