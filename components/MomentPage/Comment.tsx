import { useArtistProfile } from "@/hooks/useArtistProfile";
import { avatarColorFor } from "@/lib/artists/avatarColorFor";
import truncateAddress from "@/lib/utils/truncateAddress";
import { MintComment } from "@/types/moment";
import Link from "next/link";
import { Address } from "viem";
import { Sparkles } from "lucide-react";

export const Comment = (comment: MintComment) => {
  const { sender, username, timestamp, comment: commentText } = comment;
  const { data } = useArtistProfile(!username ? (sender as Address) : undefined);
  const truncatedAddress = truncateAddress(sender);
  const displayName = username || data?.username || truncatedAddress;
  const initial = displayName.charAt(0).toLowerCase();
  const timelineHref = `/${(sender as Address).toLowerCase()}`;
  const hasText = Boolean(commentText?.trim());

  return (
    <div className="flex gap-3 border-t border-[#EDEAE2] py-[13px] first:border-t-0">
      <Link
        href={timelineHref}
        target="_blank"
        rel="noopener noreferrer"
        className="flex size-[30px] shrink-0 items-center justify-center rounded-full font-archivo-bold text-xs text-white"
        style={{ background: avatarColorFor(sender) }}
      >
        {initial}
      </Link>
      <div className="min-w-0 flex-1">
        {hasText ? (
          <p className="mb-1 font-spectral text-[14.5px] leading-snug text-grey-moss-900 [font-variant-emoji:emoji]">
            {commentText}
          </p>
        ) : (
          <div className="mb-1 inline-flex items-center gap-1.5 font-archivo text-[11.5px] text-[#8B8474]">
            <Sparkles className="size-3 text-tan-gold" strokeWidth={1.75} />
            collected
          </div>
        )}
        <div className="flex flex-wrap items-baseline gap-2.5">
          <Link
            href={timelineHref}
            target="_blank"
            rel="noopener noreferrer"
            className="font-archivo-medium text-[13px] text-grey-moss-900 transition-colors hover:text-tan-gold"
          >
            {displayName}
          </Link>
          <span className="font-archivo text-[11px] text-tan-gold">
            {new Date(timestamp).toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
};
