"use client";

import { useState, MouseEvent } from "react";
import { CircleDot, Link2, Share2, Download, Send } from "lucide-react";
import Link from "next/link";
import { Address } from "viem";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import CollectModalContents from "@/components/MomentPage/CollectModalContents";
import AirdropProvider from "@/providers/AirdropProvider";
import AddressChipInput from "@/components/SMSMomentPage/AddressChipInput";
import RecentRecipientsRow from "@/components/SMSMomentPage/RecentRecipientsRow";
import RecipientSearchSheet from "@/components/SMSMomentPage/RecipientSearchSheet";
import AirdropSubmitButton from "@/components/SMSMomentPage/AirdropSubmitButton";
import useCanAirdropMoment from "@/hooks/useCanAirdropMoment";
import useCollectAvailability from "@/hooks/useCollectAvailability";
import useBalanceOf from "@/hooks/useBalanceOf";
import useShareMoment from "@/hooks/useShareMoment";
import useDownload from "@/hooks/useDownload";
import { useArtistProfile } from "@/hooks/useArtistProfile";
import getPrice from "@/lib/getPrice";
import getPriceUnit from "@/lib/getPriceUnit";
import truncateAddress from "@/lib/truncateAddress";
import { useMomentCommentsProvider } from "@/providers/MomentCommentsProvider";
import { useMomentProvider } from "@/providers/MomentProvider";
import { useUserProvider } from "@/providers/UserProvider";
import { MomentType } from "@/types/moment";
import { cn } from "@/lib/utils";

type ActionMode = "collect" | "airdrop";

const CARD_CLASS =
  "rounded-[10px] border border-[#E4E0D7] bg-white p-5 shadow-[0_4px_16px_-6px_rgba(27,21,4,.14)]";

const PILL_BTN_CLASS =
  "flex flex-1 items-center justify-center gap-1.5 rounded-[20px] border border-[#E4E0D7] bg-white/80 px-2 py-2.5 font-archivo-medium text-xs text-[#6B6456] transition-colors hover:border-grey-moss-900 hover:text-grey-moss-900";

const MomentActionCard = () => {
  const canAirdrop = useCanAirdropMoment();
  const [mode, setMode] = useState<ActionMode>("collect");
  const [copied, setCopied] = useState(false);
  const { isOpenCommentModal, setIsOpenCommentModal } = useMomentCommentsProvider();
  const { isLoading, metadata, saleConfig, isSetSale, owner } = useMomentProvider();
  const { data: artistProfile } = useArtistProfile(owner || undefined);
  const { isCollectDisabled, collectCtaLabel } = useCollectAvailability();
  const { isPrepared } = useUserProvider();
  const { balanceOf } = useBalanceOf();
  const { share } = useShareMoment();
  const { download } = useDownload();

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

  if (isLoading || !metadata) return null;

  const creatorName = artistProfile?.username || (owner ? truncateAddress(owner) : "");

  const priceLabel =
    !isSetSale || !saleConfig
      ? null
      : BigInt(saleConfig.pricePerToken) === BigInt(0)
        ? "free"
        : `${getPrice(saleConfig.pricePerToken, saleConfig.type)}`;
  const priceUnit =
    !isSetSale || !saleConfig || BigInt(saleConfig.pricePerToken) === BigInt(0)
      ? null
      : getPriceUnit(saleConfig.type || MomentType.FixedPriceMint);

  return (
    <>
      <div className={CARD_CLASS}>
        {owner && (
          <div className="mb-4 flex items-center gap-1.5">
            <span className="font-archivo text-[12px] text-[#6B6456]">Created by</span>
            <Link
              href={`/${(owner as Address).toLowerCase()}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-archivo-medium text-[13px] text-grey-moss-900 hover:text-tan-gold"
            >
              {creatorName}
            </Link>
          </div>
        )}

        {canAirdrop && (
          <div className="mb-4 flex gap-1 rounded-[11px] bg-[#F1EEE8] p-0.5">
            {(
              [
                { key: "collect", label: "Collect", icon: CircleDot },
                { key: "airdrop", label: "Airdrop", icon: Send },
              ] as const
            ).map(({ key, label, icon: Icon }) => {
              const active = mode === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setMode(key)}
                  className={cn(
                    "flex flex-1 items-center justify-center gap-1.5 rounded-lg px-2 py-2 font-archivo-medium text-[12.5px] transition-colors",
                    active
                      ? "bg-white text-grey-moss-900 shadow-[0_1px_3px_rgba(27,21,4,.14)]"
                      : "bg-transparent text-[#8B8474]"
                  )}
                >
                  <Icon className="size-3.5" strokeWidth={1.75} />
                  {label}
                </button>
              );
            })}
          </div>
        )}

        {(!canAirdrop || mode === "collect") && (
          <>
            {priceLabel && (
              <div className="mt-0.5 flex items-baseline gap-1.5">
                <span className="font-['Archivo-Bold'] text-[42px] uppercase leading-none tracking-tight text-tan-gold">
                  {priceLabel}
                </span>
                {priceUnit && (
                  <span className="font-archivo-medium text-base uppercase text-tan-gold">
                    {priceUnit}
                  </span>
                )}
              </div>
            )}
            <button
              type="button"
              onClick={handleCollect}
              disabled={isCollectDisabled}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-grey-moss-900 py-3.5 font-archivo-medium text-base text-white shadow-[0_6px_16px_-8px_rgba(27,21,4,.28)] transition-all hover:bg-black hover:shadow-[0_8px_18px_-8px_rgba(27,21,4,.32)] active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-[#C7C1B4] disabled:text-[#F1EEE8] disabled:shadow-none disabled:active:scale-100"
            >
              <CircleDot className="size-[18px]" strokeWidth={1.75} />
              {collectCtaLabel}
            </button>
          </>
        )}

        {canAirdrop && mode === "airdrop" && (
          <AirdropProvider>
            <AddressChipInput />
            <RecentRecipientsRow />
            <AirdropSubmitButton />
            <RecipientSearchSheet />
          </AirdropProvider>
        )}

        <div className="mt-5 flex gap-2">
          <button type="button" onClick={handleCopyLink} className={PILL_BTN_CLASS}>
            <Link2 className="size-[13px]" strokeWidth={1.75} />
            {copied ? "Copied" : "Copy link"}
          </button>
          <button type="button" onClick={handleShare} className={PILL_BTN_CLASS}>
            <Share2 className="size-[13px]" strokeWidth={1.75} />
            Share
          </button>
          {balanceOf > 0 && (
            <button
              type="button"
              onClick={download}
              className={PILL_BTN_CLASS}
              aria-label="Download"
            >
              <Download className="size-[13px]" strokeWidth={1.75} />
            </button>
          )}
        </div>
      </div>

      <Dialog open={isOpenCommentModal} onOpenChange={setIsOpenCommentModal}>
        <DialogContent className="flex max-w-xl flex-col items-center !gap-0 overflow-hidden !rounded-3xl border-none !bg-white bg-transparent px-8 py-10 shadow-lg">
          <VisuallyHidden>
            <DialogTitle>Collect</DialogTitle>
          </VisuallyHidden>
          <CollectModalContents />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MomentActionCard;
