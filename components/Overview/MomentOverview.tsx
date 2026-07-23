"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Address } from "viem";
import { networkConfigByChain } from "@/lib/protocolSdk/apis/chain-constants";
import { useMomentProvider } from "@/providers/MomentProvider";
import { useCollectionProvider } from "@/providers/CollectionProvider";
import { SITE_ORIGINAL_URL } from "@/lib/consts";
import { getShortNameFromChainId } from "@/lib/zora/getShortNameFromChainId";
import Preview from "../MomentsGrid/Preview";
import CopyButton from "../CopyButton";
import MomentOverviewSkeleton from "./MomentOverviewSkeleton";

const PILL_CLASS =
  "rounded-full border border-grey-moss-100 bg-white/80 px-3 py-1.5 text-[11.5px] text-grey-moss-300 hover:text-grey-moss-900";

const MomentOverview = () => {
  const { push } = useRouter();
  const { metadata, isLoading, moment } = useMomentProvider();
  const { data: collection, isLoading: isCollectionLoading } = useCollectionProvider();

  if (isLoading || isCollectionLoading || !collection) return <MomentOverviewSkeleton />;

  const collectionHref = `/manage/${networkConfigByChain[collection.chain_id].zoraCollectPathChainName}:${collection.address}`;
  const shortNetwork = getShortNameFromChainId(collection.chain_id);
  const collectUrl = shortNetwork
    ? `${SITE_ORIGINAL_URL}/collect/${shortNetwork}:${collection.address}/${moment.tokenId}`
    : undefined;
  const address = collection.address as Address;
  const title = metadata?.name;

  return (
    <div className="w-full pt-0">
      <button
        type="button"
        onClick={() => push(collectionHref)}
        className="flex items-center gap-1.5 font-archivo-medium text-xs text-grey-moss-300 hover:text-grey-moss-900"
      >
        <ArrowLeft className="size-3.5" strokeWidth={1.5} />
        Back to collection
      </button>

      <div className="mt-4 flex flex-col items-center gap-4 md:flex-row">
        <div className="relative aspect-square w-24 shrink-0 overflow-hidden rounded-lg border border-dashed border-grey-moss-200 bg-grey-moss-50">
          {metadata ? (
            <Preview data={metadata} />
          ) : (
            <div className="flex size-full items-center justify-center">
              <p className="font-mono text-[10px] text-grey-moss-300">media</p>
            </div>
          )}
        </div>
        <div className="min-w-0">
          <p
            className={`truncate text-center font-spectral text-2xl leading-tight md:text-left md:text-[32px] ${!metadata ? "text-grey-moss-200" : ""}`}
          >
            {title || "Unknown"}
          </p>
          <div className="mt-2.5 flex flex-wrap items-center justify-center gap-2 md:justify-start">
            <CopyButton text={address} className={`font-mono ${PILL_CLASS}`} />
            {collectUrl && (
              <CopyButton
                text={collectUrl}
                shorten={false}
                className={`font-archivo ${PILL_CLASS}`}
              >
                copy link
              </CopyButton>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MomentOverview;
