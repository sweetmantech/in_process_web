"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { useCollectionProvider } from "@/providers/CollectionProvider";
import { SITE_ORIGINAL_URL } from "@/lib/consts";
import { getCollectionTimelineUrl } from "@/lib/collection/getCollectionTimelineUrl";
import { Address } from "viem";
import Preview from "../MomentsGrid/Preview";
import CopyButton from "../CopyButton";
import CollectionOverviewSkeleton from "./CollectionOverviewSkeleton";

const PILL_CLASS =
  "rounded-full border border-grey-moss-100 bg-white/80 px-3 py-1.5 text-[11.5px] text-grey-moss-300 hover:text-grey-moss-900";

const CollectionOverview = () => {
  const { push } = useRouter();
  const { data, isLoading } = useCollectionProvider();
  const metadata = data?.metadata;
  const address = data?.address as Address;

  const timelineUrl = getCollectionTimelineUrl(data?.chain_id, data?.address, SITE_ORIGINAL_URL);

  if (isLoading) return <CollectionOverviewSkeleton />;

  return (
    <div className="w-full pt-0">
      <button
        type="button"
        onClick={() => push("/manage/moments")}
        className="flex items-center gap-1.5 font-archivo-medium text-xs text-grey-moss-300 hover:text-grey-moss-900"
      >
        <ArrowLeft className="size-3.5" strokeWidth={1.5} />
        Back to moments
      </button>

      <div className="mt-4 flex flex-col items-center gap-4 md:flex-row">
        <div className="relative aspect-square w-24 shrink-0 overflow-hidden rounded-lg border border-dashed border-grey-moss-200 bg-grey-moss-50">
          {metadata ? (
            <Preview data={metadata} />
          ) : (
            <div className="flex size-full items-center justify-center">
              <p className="font-mono text-[10px] text-grey-moss-300">cover</p>
            </div>
          )}
        </div>
        <div className="min-w-0">
          <p
            className={`text-center md:text-left truncate font-spectral text-2xl leading-tight md:text-[32px] ${!metadata ? "text-grey-moss-200" : ""}`}
          >
            {metadata ? data?.name : "Unknown"}
          </p>
          <div className="mt-2.5 flex flex-wrap items-center gap-2">
            <CopyButton text={address} className={`font-mono ${PILL_CLASS}`} />
            {timelineUrl && (
              <CopyButton
                text={timelineUrl}
                shorten={false}
                className={`font-archivo ${PILL_CLASS}`}
              >
                collection timeline
              </CopyButton>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionOverview;
