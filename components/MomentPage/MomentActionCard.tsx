"use client";

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
import useMomentActionCard from "@/hooks/useMomentActionCard";
import { CARD_CLASS, PILL_BTN_CLASS } from "@/lib/utils/classNames";
import { cn } from "@/lib/utils";

const MomentActionCard = () => {
  const {
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
  } = useMomentActionCard();

  if (isLoading || !metadata) return null;

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
