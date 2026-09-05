import { useState, MouseEvent } from "react";
import useCanAirdropMoment from "@/hooks/useCanAirdropMoment";
import useCollectAvailability from "@/hooks/useCollectAvailability";
import useBalanceOf from "@/hooks/useBalanceOf";
import useShareMoment from "@/hooks/useShareMoment";
import useDownload from "@/hooks/useDownload";
import { useArtistProfile } from "@/hooks/useArtistProfile";
import { getSalePriceParts } from "@/lib/moment/getSalePriceParts";
import truncateAddress from "@/lib/utils/truncateAddress";
import { useMomentCommentsProvider } from "@/providers/MomentCommentsProvider";
import { useMomentProvider } from "@/providers/MomentProvider";
import { useUserProvider } from "@/providers/UserProvider";

type ActionMode = "collect" | "airdrop";

const useMomentActionCard = () => {
  const canAirdrop = useCanAirdropMoment();
  const [mode, setMode] = useState<ActionMode>("collect");
  const [copied, setCopied] = useState(false);
  const { isOpenCommentModal, setIsOpenCommentModal } = useMomentCommentsProvider();
  const { isLoading, metadata, saleConfig, owner } = useMomentProvider();
  const { data: artistProfile } = useArtistProfile(owner || undefined);
  const { isCollectDisabled, collectCtaLabel } = useCollectAvailability();
  const { isPrepared } = useUserProvider();
  const { balanceOf } = useBalanceOf();
  const { share } = useShareMoment();
  const { download } = useDownload(metadata);
  const { priceLabel, priceUnit } = getSalePriceParts(saleConfig);

  const creatorName = artistProfile?.username || (owner ? truncateAddress(owner) : "");

  const handleCollect = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!isPrepared()) return;
    setIsOpenCommentModal(true);
  };

  const handleCopyLink = async () => {
    await share();
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleShare = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ url: window.location.href });
      } catch {
        // user cancelled
      }
      return;
    }
    await share();
  };

  return {
    canAirdrop,
    mode,
    setMode,
    copied,
    isOpenCommentModal,
    setIsOpenCommentModal,
    isLoading,
    metadata,
    owner,
    isCollectDisabled,
    collectCtaLabel,
    balanceOf,
    download,
    creatorName,
    priceLabel,
    priceUnit,
    handleCollect,
    handleCopyLink,
    handleShare,
  };
};

export default useMomentActionCard;
