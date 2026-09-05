"use client";

import { Protocol, TimelineMoment } from "@/types/moment";
import { formatSalePriceLabel } from "@/lib/moment/formatSalePriceLabel";
import { isSaleEnded } from "@/lib/moment/isSaleEnded";
import { useMobileDrawersProvider } from "@/providers/MobileDrawersProvider";
import { useMomentClick } from "@/hooks/useMomentClick";
import useDownload from "@/hooks/useDownload";
import { getMomentUrl } from "@/lib/moment/getMomentUrl";
import { getShortNameFromChainId } from "@/lib/zora/getShortNameFromChainId";
import truncateAddress from "@/lib/utils/truncateAddress";

export const useMomentFeedCard = (moment: TimelineMoment) => {
  const { openCollect, openComment } = useMobileDrawersProvider();
  const { handleMomentClick, data: metadata } = useMomentClick(moment);
  const { sale } = moment;
  const isSoldOut = isSaleEnded(sale);
  const commentCount = moment.comments ?? 0;
  const showComments = moment.protocol === Protocol.InProcess;
  const showDownload = Boolean(metadata?.content?.mime?.includes("pdf"));
  const { download, isDownloading } = useDownload(showDownload ? metadata : null);
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

  const onDownloadClick = () => {
    if (!showDownload || isDownloading) return;
    download();
  };

  return {
    metadata,
    priceLabel: formatSalePriceLabel(sale),
    isSoldOut,
    onCollect,
    onCommentClick,
    onDownloadClick,
    handleMomentClick,
    momentHref,
    commentCount,
    showComments,
    showDownload,
    isDownloading,
    collectionName,
    collectionHref,
  };
};
