"use client";

import { Skeleton } from "@/components/ui/skeleton";
import useCollectAvailability from "@/hooks/useCollectAvailability";
import getPrice from "@/lib/getPrice";
import getPriceUnit from "@/lib/getPriceUnit";
import { useMomentProvider } from "@/providers/MomentProvider";
import { MomentType, Protocol } from "@/types/moment";
import CommentButton from "@/components/CommentButton/CommentButton";
import CollectAdvanced from "@/components/HomePage/CollectAdvanced";

const CollectModalContents = () => {
  const { isLoading, metadata, saleConfig, protocol } = useMomentProvider();
  const { isCollectDisabled, collectCtaLabel } = useCollectAvailability();

  if (isLoading || !metadata) {
    return <Skeleton className="h-32 w-full rounded-none" />;
  }

  const pricePerToken = BigInt(saleConfig?.pricePerToken || 0);
  const priceLabel =
    pricePerToken === BigInt(0)
      ? "free"
      : `${getPrice(pricePerToken, saleConfig?.type || MomentType.FixedPriceMint)} ${getPriceUnit(saleConfig?.type || MomentType.FixedPriceMint)}`;

  return (
    <>
      <p className="text-center font-archivo text-lg">Are you sure you want to collect?</p>
      <div className="mt-3 w-full space-y-1 font-archivo text-sm text-grey-moss-400">
        {metadata.name && (
          <p className="font-spectral-italic text-center text-lg">{metadata.name}</p>
        )}
        <p className="font-archivo-bold uppercase text-tan-gold text-center text-lg">
          {priceLabel}
        </p>
      </div>
      {protocol === Protocol.InProcess && !isCollectDisabled && <CollectAdvanced />}
      <div className="pt-3 w-full">
        <CommentButton disabled={isCollectDisabled} label={collectCtaLabel} />
      </div>
    </>
  );
};

export default CollectModalContents;
