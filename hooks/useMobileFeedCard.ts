"use client";

import { Protocol, TimelineMoment } from "@/types/moment";
import { formatSalePriceLabel } from "@/lib/moment/formatSalePriceLabel";
import { isSaleEnded } from "@/lib/moment/isSaleEnded";
import { useMobileDrawersProvider } from "@/providers/MobileDrawersProvider";
import { useMomentClick } from "@/hooks/useMomentClick";

export const useMobileFeedCard = (moment: TimelineMoment) => {
  const { openCollect } = useMobileDrawersProvider();
  const { handleMomentClick, data: metadata } = useMomentClick(moment);
  const { sale } = moment;
  const isSoldOut = isSaleEnded(sale);
  const commentCount = moment.comments ?? 0;
  const showComments = moment.protocol === Protocol.InProcess;

  const onCollect = () => {
    openCollect(moment);
  };

  return {
    metadata,
    priceLabel: formatSalePriceLabel(sale),
    isSoldOut,
    onCollect,
    handleMomentClick,
    commentCount,
    showComments,
  };
};
