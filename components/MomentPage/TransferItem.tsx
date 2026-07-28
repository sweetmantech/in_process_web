"use client";

import { avatarColorFor } from "@/lib/artists/avatarColorFor";
import truncateAddress from "@/lib/truncateAddress";
import { Transfer } from "@/types/moment";
import CopyButton from "@/components/CopyButton";
import { EXPLORER_URL } from "@/lib/consts";
import { useWalletsProvider } from "@/providers/WalletsProvider";
import Link from "next/link";
import { Address } from "viem";
import { ExternalLink } from "lucide-react";

const TransferItem = ({ collector, username, amount, transactionHash, timestamp }: Transfer) => {
  const { primaryWallet } = useWalletsProvider();
  const isYou = primaryWallet?.toLowerCase() === collector.toLowerCase();
  const displayName = isYou ? "me" : username || truncateAddress(collector);
  const initial = displayName.charAt(0).toLowerCase();
  const txUrl = `${EXPLORER_URL}/tx/${transactionHash}`;

  return (
    <div className="flex gap-[11px] rounded-lg px-2 py-2.5 transition-colors hover:bg-[#F6F4EF]">
      <Link
        href={`/${(collector as Address).toLowerCase()}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex size-7 shrink-0 items-center justify-center rounded-full font-archivo-bold text-[11px] text-white"
        style={{ background: avatarColorFor(collector) }}
      >
        {initial}
      </Link>
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-2">
          <Link
            href={`/${(collector as Address).toLowerCase()}`}
            target="_blank"
            rel="noopener noreferrer"
            className="min-w-0 truncate font-archivo-medium text-[13.5px] text-grey-moss-900 hover:text-tan-gold"
          >
            {displayName}
          </Link>
          {amount > 1 && (
            <span className="shrink-0 font-archivo text-[11px] text-[#8B8474]">{amount}x</span>
          )}
        </div>
        <div className="mt-0.5 flex flex-wrap items-center gap-x-1.5 gap-y-0.5 font-archivo text-[11px] text-[#8B8474]">
          <CopyButton
            text={collector}
            className="gap-1 rounded-none bg-transparent px-0 py-0 text-[#8B8474] hover:text-grey-moss-900"
          >
            {truncateAddress(collector)}
          </CopyButton>
          <span className="text-[#C9C3B4]">·</span>
          <a
            href={txUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-0.5 text-[#8B8474] transition-colors hover:text-tan-gold"
          >
            tx {truncateAddress(transactionHash)}
            <ExternalLink className="size-2.5" strokeWidth={2} />
          </a>
          <span className="text-[#C9C3B4]">·</span>
          <span>{new Date(timestamp).toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

export default TransferItem;
