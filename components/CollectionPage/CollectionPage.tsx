"use client";

import CollectionInfo from "./CollectionInfo";
import MomentsTimeline from "../Timeline/MomentsTimeline";
import { TimelineProvider } from "@/providers/TimelineProvider";
import { CollectionProvider } from "@/providers/CollectionProvider";
import { Address } from "viem";
import { useParams } from "next/navigation";
import { parseCollectionAddress } from "@/lib/timeline/parseCollectionAddress";

const CollectionPage = () => {
  const params = useParams();
  const collection = params.collection as string | undefined;
  const { chainId, address } = parseCollectionAddress(collection);

  if (!collection || !address || !chainId) {
    return null;
  }

  return (
    <CollectionProvider collection={{ address: address as Address, chainId }}>
      <div className="relative flex min-h-[450px] w-screen grow flex-col overflow-hidden pb-20 pt-6 md:min-h-[550px] md:pt-10">
        <div className="relative flex items-start justify-between px-2 pb-4 md:px-10 md:pb-8">
          <CollectionInfo />
        </div>
        <div className="flex grow flex-col px-2 md:px-10">
          <TimelineProvider collection={collection}>
            <MomentsTimeline />
          </TimelineProvider>
        </div>
      </div>
    </CollectionProvider>
  );
};

export default CollectionPage;
