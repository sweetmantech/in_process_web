"use client";

import { useState } from "react";
import { EmojiText } from "@/components/EmojiText";
import { useArtistProfile } from "@/hooks/useArtistProfile";
import { avatarColorFor } from "@/lib/artists/avatarColorFor";
import truncateAddress from "@/lib/utils/truncateAddress";
import { MintComment } from "@/types/moment";
import Link from "next/link";
import { Address } from "viem";
import { Sparkles } from "lucide-react";
import CommentComposer from "./CommentComposer";
import { useMomentCommentsProvider } from "@/providers/MomentCommentsProvider";

type CommentThreadProps = {
  comment: MintComment;
  depth?: number;
};

const canReplyTo = (comment: MintComment) => Boolean(comment.commentId && comment.nonce);

export const CommentThread = ({ comment, depth = 0 }: CommentThreadProps) => {
  const [isReplying, setIsReplying] = useState(false);
  const [isLoadingReplies, setIsLoadingReplies] = useState(false);
  const { loadMoreReplies } = useMomentCommentsProvider();

  const {
    sender,
    username,
    timestamp,
    comment: commentText,
    replies,
    replyCount,
    commentId,
  } = comment;
  const { data } = useArtistProfile(!username ? (sender as Address) : undefined);
  const truncatedAddress = truncateAddress(sender);
  const displayName = username || data?.username || truncatedAddress;
  const initial = displayName.charAt(0).toLowerCase();
  const timelineHref = `/${(sender as Address).toLowerCase()}`;
  const hasText = Boolean(commentText?.trim());
  const showReply = canReplyTo(comment);
  const hiddenReplyCount = Math.max(0, replyCount - replies.length);

  const handleLoadMore = async () => {
    if (!commentId || isLoadingReplies) return;
    setIsLoadingReplies(true);
    try {
      await loadMoreReplies(commentId);
    } finally {
      setIsLoadingReplies(false);
    }
  };

  return (
    <div className={depth === 0 ? "border-t border-[#EDEAE2] py-[13px] first:border-t-0" : "pt-3"}>
      <div className="flex gap-3">
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
            <EmojiText
              text={commentText}
              className="mb-1 font-spectral text-[14.5px] leading-snug text-grey-moss-900"
            />
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
            {showReply && (
              <button
                type="button"
                onClick={() => setIsReplying((open) => !open)}
                className="font-archivo text-[11px] uppercase tracking-wide text-grey-moss-300 transition-colors hover:text-tan-gold"
              >
                {isReplying ? "cancel" : "reply"}
              </button>
            )}
          </div>

          {isReplying && (
            <div className="mt-3">
              <CommentComposer
                parent={comment}
                placeholder="write a reply…"
                submitLabel="reply"
                autoFocus
                onSuccess={() => setIsReplying(false)}
              />
            </div>
          )}

          {replies.length > 0 && (
            <div className="mt-1 border-l border-[#EDEAE2] pl-3">
              {replies.map((reply) => (
                <CommentThread key={reply.id} comment={reply} depth={depth + 1} />
              ))}
            </div>
          )}

          {hiddenReplyCount > 0 && (
            <button
              type="button"
              onClick={handleLoadMore}
              disabled={isLoadingReplies}
              className="mt-2 font-archivo text-[11px] uppercase tracking-wide text-tan-gold transition-opacity hover:opacity-80 disabled:opacity-40"
            >
              {isLoadingReplies
                ? "loading…"
                : `view ${hiddenReplyCount} more ${hiddenReplyCount === 1 ? "reply" : "replies"}`}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentThread;
