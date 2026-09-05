"use client";

import { useParams } from "next/navigation";
import { Address } from "viem";
import Moment from "./Moment";
import { MomentProvider } from "@/providers/MomentProvider";
import { MomentCommentsProvider } from "@/providers/MomentCommentsProvider";
import { MomentCollectProvider } from "@/providers/MomentCollectProvider";
import { MomentTransfersProvider } from "@/providers/MomentCollectorsProvider";
import { TimelineProvider } from "@/providers/TimelineProvider";
import {
  MomentCollectionCarouselProvider,
  useMomentCollectionCarouselProvider,
} from "@/providers/MomentCollectionCarouselProvider";
import { parseCollectionAddress } from "@/lib/timeline/parseCollectionAddress";
import { timelineMomentToApiResponse } from "@/lib/moment/timelineMomentToApiResponse";

const MomentProviders = ({
  collectionAddress,
  chainId,
}: {
  collectionAddress: Address;
  chainId: number;
}) => {
  const { tokenId, activeMoment } = useMomentCollectionCarouselProvider();

  return (
    <MomentProvider
      moment={{
        collectionAddress,
        tokenId,
        chainId,
      }}
      initialData={activeMoment ? timelineMomentToApiResponse(activeMoment) : undefined}
    >
      <MomentCommentsProvider>
        <MomentCollectProvider>
          <MomentTransfersProvider>
            <Moment />
          </MomentTransfersProvider>
        </MomentCollectProvider>
      </MomentCommentsProvider>
    </MomentProvider>
  );
};

const MomentPage = () => {
  const params = useParams();
  const collection = params.collection as string;
  const tokenId = params.tokenId as string;
  const { chainId, address } = parseCollectionAddress(collection);

  if (!address || !chainId) {
    return null;
  }

  return (
    <main className="flex w-screen grow">
      <div className="flex w-full flex-col pt-6 md:pt-8">
        <TimelineProvider
          collection={collection}
          chainId={chainId}
          curated={false}
          sortOrder="token_id_asc"
        >
          <MomentCollectionCarouselProvider
            collectionAddress={address as Address}
            chainId={chainId}
            initialTokenId={tokenId}
          >
            <MomentProviders collectionAddress={address as Address} chainId={chainId} />
          </MomentCollectionCarouselProvider>
        </TimelineProvider>
      </div>
    </main>
  );
};

export default MomentPage;
