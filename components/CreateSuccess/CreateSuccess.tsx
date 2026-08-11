import { useMemo, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMetadataFormProvider } from "@/providers/MetadataFormProvider";
import { useCollectionsProvider } from "@/providers/CollectionsProvider";
import { useMomentCreateProvider } from "@/providers/MomentCreateProvider/MomentCreateProvider";
import { CHAIN, SITE_ORIGINAL_URL } from "@/lib/consts";
import { getCollectionTimelineUrl } from "@/lib/collection/getCollectionTimelineUrl";
import { getShortNetworkName } from "@/lib/zora/zoraToViem";
import CreatedMomentAirdrop from "./CreatedMomentAirdrop";
import MomentCreatedHeader from "./MomentCreatedHeader";
import Buttons from "./Buttons";
import useTokenIdParam from "@/hooks/useTokenIdParam";
import { CHAIN_ID } from "@/lib/consts";
import useMomentData from "@/hooks/useMomentData";
import type { Address } from "viem";
import MomentsGridPreview from "@/components/MomentsGrid/Preview";
import { Skeleton } from "@/components/ui/skeleton";
import useFireCreateSuccessConfetti from "@/hooks/useFireCreateSuccessConfetti";

const CreateSuccess = () => {
  const { name, description, price, priceUnit, resetForm } = useMetadataFormProvider();
  const { selectedCollection, collections } = useCollectionsProvider();
  const { createdTokenId, setCreatedTokenId } = useMomentCreateProvider();
  const { push } = useRouter();
  const [descExpanded, setDescExpanded] = useState(false);

  const timestamp = useMemo(() => new Date().toLocaleString(), []);
  const tokenIdFromUrl = useTokenIdParam();
  const liveTokenId = createdTokenId || tokenIdFromUrl;
  const collectionItem = collections.find(
    (collection) => collection.address.toLowerCase() === selectedCollection?.toLowerCase()
  );

  const shortNetworkName = getShortNetworkName(CHAIN.name.toLowerCase());
  const shareUrl =
    shortNetworkName && selectedCollection && liveTokenId
      ? `${SITE_ORIGINAL_URL}/collect/${shortNetworkName}:${selectedCollection}/${liveTokenId}`
      : undefined;
  const moment = useMemo(
    () => ({
      // `useMomentData` internally disables the query when any field is falsy.
      collectionAddress: selectedCollection as Address,
      tokenId: liveTokenId || "",
      chainId: CHAIN_ID,
    }),
    [selectedCollection, liveTokenId]
  );
  const { metadata: momentMetadata, owner, isLoading } = useMomentData(moment);
  const personalTimelineHref = owner ? `/${owner.toLowerCase()}` : undefined;
  const showSuccessSkeleton = Boolean(liveTokenId) && isLoading && !momentMetadata;

  useFireCreateSuccessConfetti({ liveTokenId, isLoading, momentMetadata });

  const displayedName = momentMetadata?.name?.trim() || name.trim() || "Untitled moment";
  const trimmedDescription = momentMetadata?.description?.trim() || description?.trim() || "";
  const showDescriptionToggle = trimmedDescription.length > 160;
  const displayedDescription = descExpanded
    ? trimmedDescription
    : trimmedDescription.slice(0, 160).trimEnd();
  const displayedPrice = liveTokenId ? `${price} ${priceUnit.toUpperCase()}` : "--";
  const displayedTimestamp = liveTokenId ? timestamp : "Created just now";

  const handleBackToCreate = () => {
    resetForm();
    setCreatedTokenId("");
    push("/create");
  };

  return (
    <div className="col-span-1 w-full md:col-span-2">
      <div className="mx-auto mt-8 w-full max-w-[1440px] px-[6px] pb-12 md:mt-6 md:px-14 md:pb-20">
        <button
          type="button"
          onClick={handleBackToCreate}
          className="mb-6 inline-flex items-center gap-2 font-archivo-medium text-[14px] text-[#6B6456] transition-colors hover:text-grey-moss-900 md:mb-7"
        >
          <ArrowLeft className="size-[18px]" strokeWidth={1.75} />
          Back to create
        </button>

        <div className="grid items-start gap-4 md:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] md:gap-12">
          <div className="overflow-hidden rounded-[16px] border border-[#E4E0D7] bg-white shadow-[0_24px_56px_-30px_rgba(27,21,4,.45),0_0_0_1px_rgba(27,21,4,.03)] md:sticky md:top-9">
            <div className="aspect-square bg-[#EDEAE2]">
              <div className="relative size-full overflow-hidden">
                {showSuccessSkeleton ? (
                  <Skeleton className="size-full rounded-none" />
                ) : momentMetadata ? (
                  <MomentsGridPreview data={momentMetadata} />
                ) : (
                  <div className="flex size-full items-center justify-center p-6">
                    <p className="text-center font-archivo text-[12.5px] uppercase tracking-[0.06em] text-[#A8A296]">
                      Preview
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex min-w-0 flex-col">
            <MomentCreatedHeader />

            {showSuccessSkeleton ? (
              <>
                <div className="mt-4">
                  <Skeleton className="h-8 w-48" />
                  <Skeleton className="mt-3 h-4 w-full max-w-[360px]" />
                  <Skeleton className="mt-2 h-4 w-3/4 max-w-[280px]" />
                </div>

                <div className="mt-5 flex items-baseline justify-between gap-4 border-b border-[#E4E0D7] pb-[18px]">
                  <Skeleton className="h-8 w-28" />
                  <Skeleton className="h-4 w-32" />
                </div>

                <div className="mt-3 flex flex-col gap-3 md:flex-row">
                  <Skeleton className="h-[51px] flex-1 rounded-[12px]" />
                  <Skeleton className="h-[51px] flex-1 rounded-[12px]" />
                </div>

                <div className="mt-7 rounded-[16px] border border-[#E4E0D7] bg-white p-[22px]">
                  <Skeleton className="h-3 w-16" />
                  <Skeleton className="mt-4 h-12 w-full rounded-none" />
                  <Skeleton className="mt-4 h-3 w-28" />
                  <div className="mt-3 flex gap-2">
                    <Skeleton className="h-8 w-20 rounded-full" />
                    <Skeleton className="h-8 w-24 rounded-full" />
                    <Skeleton className="h-8 w-14 rounded-full" />
                  </div>
                  <Skeleton className="mt-4 h-12 w-full rounded-full" />
                </div>
              </>
            ) : (
              <>
                <div className="mt-4">
                  <div className="font-archivo-bold text-[24px] leading-[1.2] tracking-[-0.01em] text-grey-moss-900">
                    {displayedName}
                  </div>
                  {trimmedDescription && (
                    <>
                      <p className="mt-2 font-spectral text-[16px] leading-[1.6] text-[#4E4A40]">
                        {displayedDescription}
                        {!descExpanded && showDescriptionToggle ? "..." : ""}
                      </p>
                      {showDescriptionToggle && (
                        <button
                          type="button"
                          onClick={() => setDescExpanded((current) => !current)}
                          className="mt-1 border-none bg-transparent p-0 font-archivo-medium text-[13.5px] text-[#6B6456] transition-colors hover:text-grey-moss-900"
                        >
                          {descExpanded ? "Show less" : "Show more"}
                        </button>
                      )}
                    </>
                  )}
                </div>

                <div className="mt-5 flex items-baseline justify-between gap-4 border-b border-[#E4E0D7] pb-[18px]">
                  <span className="font-archivo-bold text-[30px] tracking-[-0.015em] text-[#A8862F]">
                    {displayedPrice}
                  </span>
                  <span className="pr-2 text-right font-archivo text-[13px] text-[#8C8678] md:pr-4">
                    {displayedTimestamp}
                  </span>
                </div>

                <Buttons
                  shareUrl={shareUrl}
                  timelineHref={personalTimelineHref}
                  shareTitle={displayedName || collectionItem?.name || "moment"}
                />

                <div className="mt-7">
                  <CreatedMomentAirdrop />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateSuccess;
