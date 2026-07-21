"use client";

import { Protocol, TimelineMoment } from "@/types/moment";
import { formatSalePriceLabel } from "@/lib/moment/formatSalePriceLabel";
import { isSaleEnded } from "@/lib/moment/isSaleEnded";
import { useMobileDrawersProvider } from "@/providers/MobileDrawersProvider";
import { useMomentClick } from "@/hooks/useMomentClick";
import { getMomentUrl } from "@/lib/moment/getMomentUrl";
import { getShortNameFromChainId } from "@/lib/zora/getShortNameFromChainId";
import truncateAddress from "@/lib/truncateAddress";

export const useMomentFeedCard = (moment: TimelineMoment) => {
  const { openCollect, openComment } = useMobileDrawersProvider();
  const { handleMomentClick, data: metadata } = useMomentClick(moment);
  const { sale } = moment;
  const isSoldOut = isSaleEnded(sale);
  const commentCount = moment.comments ?? 0;
  const showComments = moment.protocol === Protocol.InProcess;
  const shortName = getShortNameFromChainId(moment.chain_id);
  const collectionName = moment.collection?.name?.trim() || truncateAddress(moment.address);
  const collectionHref = shortName ? `/collection/${shortName}:${moment.address}` : undefined;
  const momentHref = getMomentUrl(moment)?.href;

  const onCollect = () => {
    openCollect(moment);
  };

  const onCommentClick = () => {
    openComment(moment);
  };

  return {
    metadata,
    priceLabel: formatSalePriceLabel(sale),
    isSoldOut,
    onCollect,
    onCommentClick,
    handleMomentClick,
    momentHref,
    commentCount,
    showComments,
    collectionName,
    collectionHref,
  };
};
