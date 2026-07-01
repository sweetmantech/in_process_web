"use client";

import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import useCollectAvailability from "@/hooks/useCollectAvailability";
import getPrice from "@/lib/getPrice";
import getPriceUnit from "@/lib/getPriceUnit";
import truncated from "@/lib/truncated";
import { useMomentCommentsProvider } from "@/providers/MomentCommentsProvider";
import { useMomentCollectProvider } from "@/providers/MomentCollectProvider";
import { useMomentProvider } from "@/providers/MomentProvider";
import { MomentType, Protocol } from "@/types/moment";
import CommentButton from "../CommentButton/CommentButton";
import Advanced from "./Advanced";

const CollectModalContents = () => {
  const { comment, setComment } = useMomentCommentsProvider();
  const { saleConfig, isLoading, metadata, protocol } = useMomentProvider();
  const { amountToCollect } = useMomentCollectProvider();
  const { isCollectDisabled, collectCtaLabel } = useCollectAvailability();

  if (isLoading || !metadata) {
    return <Skeleton className="h-32 w-full rounded-none" />;
  }

  return (
    <>
      <section className="flex flex-wrap items-center gap-2 pt-2 font-archivo-medium text-xl">
        collect {truncated(metadata.name || "")} for{" "}
        {BigInt(saleConfig?.pricePerToken || 0) === BigInt(0)
          ? "free"
          : `${getPrice(BigInt(saleConfig?.pricePerToken || 0) * BigInt(amountToCollect), saleConfig?.type || MomentType.FixedPriceMint)} ${getPriceUnit(saleConfig?.type || MomentType.FixedPriceMint)}`}
      </section>
      {protocol === Protocol.InProcess && !isCollectDisabled && (
        <>
          <Label className="mt-4 w-full text-left font-archivo text-lg">comment</Label>
          <textarea
            className="w-full !border-none bg-grey-moss-50 p-3 font-spectral !outline-none !ring-0"
            rows={6}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </>
      )}
      {!isCollectDisabled && <Advanced />}
      <div className="mt-4 w-full">
        <CommentButton disabled={isCollectDisabled} label={collectCtaLabel} />
      </div>
    </>
  );
};

export default CollectModalContents;
