"use client";

import { Feather } from "lucide-react";
import { useCollectionsProvider } from "@/providers/CollectionsProvider";
import { useMetadata } from "@/hooks/useMetadata";
import BlurImage from "@/components/BlurImage";

const CollectionTag = () => {
  const {
    collections,
    selectedCollection,
    isLoading: isCollectionsLoading,
  } = useCollectionsProvider();

  const selectedItem = collections.find(
    (c) => c.address.toLowerCase() === selectedCollection?.toLowerCase()
  );
  const { data: metadata, isLoading: isMetadataLoading } = useMetadata(selectedItem?.uri ?? "");

  if (isCollectionsLoading && !selectedItem) {
    return (
      <div className="inline-flex h-[28px] w-[88px] animate-pulse items-center rounded-full border border-[#E0DDD8] bg-white/65" />
    );
  }

  if (!selectedItem) return null;

  const imageUrl = metadata?.image;
  const showImage = Boolean(imageUrl) && !isMetadataLoading;

  return (
    <div className="inline-flex items-center gap-[7px] rounded-full border border-[#E0DDD8] bg-white/65 px-[11px] py-[5px]">
      {showImage ? (
        <div className="relative size-[13px] shrink-0 overflow-hidden rounded-full">
          <BlurImage src={imageUrl!} alt={selectedItem.name} fill className="object-cover" />
        </div>
      ) : (
        <Feather className="size-[13px] shrink-0 text-tan-gold" strokeWidth={1.75} />
      )}
      <span className="font-archivo-medium text-[11px] tracking-[0.04em] text-grey-moss-900">
        {selectedItem.name}
      </span>
    </div>
  );
};

export default CollectionTag;
