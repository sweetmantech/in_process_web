"use client";

import { Protocol, TimelineMoment } from "@/types/moment";
import { formatSalePriceLabel } from "@/lib/moment/formatSalePriceLabel";
import { isSaleEnded } from "@/lib/moment/isSaleEnded";
import { useMobileDrawersProvider } from "@/providers/MobileDrawersProvider";
import { useMomentClick } from "@/hooks/useMomentClick";

export const useMomentFeedCard = (moment: TimelineMoment) => {
  const { openCollect, openComment } = useMobileDrawersProvider();
  const { handleMomentClick, data: metadata } = useMomentClick(moment);
  const { sale } = moment;
  const isSoldOut = isSaleEnded(sale);
  const commentCount = moment.comments ?? 0;
  const showComments = moment.protocol === Protocol.InProcess;

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
    commentCount,
    showComments,
  };
};
