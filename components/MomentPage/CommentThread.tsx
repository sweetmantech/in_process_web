"use client";

import { useState } from "react";
import { EmojiText } from "@/components/EmojiText";
import { useArtistProfile } from "@/hooks/useArtistProfile";
import truncateAddress from "@/lib/utils/truncateAddress";
import { MintComment } from "@/types/moment";
import { Address } from "viem";
import { Sparkles } from "lucide-react";
import CommentAvatar from "./CommentAvatar";
import CommentComposer from "./CommentComposer";
import CommentLoadMoreReplies from "./CommentLoadMoreReplies";
import CommentReplyToLabel, { type ReplyToTarget } from "./CommentReplyToLabel";
import CommentThreadHeader from "./CommentThreadHeader";

type CommentThreadProps = {
  comment: MintComment;
  depth?: number;
  replyTo?: ReplyToTarget;
};

const canReplyTo = (comment: MintComment) => Boolean(comment.commentId && comment.nonce);

export const CommentThread = ({ comment, depth = 0, replyTo }: CommentThreadProps) => {
  const [isReplying, setIsReplying] = useState(false);
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
  const displayName = username || data?.username || truncateAddress(sender);
  const timelineHref = `/${(sender as Address).toLowerCase()}`;
  const showReply = canReplyTo(comment);
  const hiddenReplyCount = Math.max(0, replyCount - replies.length);
  const childReplyTo: ReplyToTarget = { displayName, href: timelineHref };

  const replyNodes = replies.map((reply) => (
    <CommentThread key={reply.id} comment={reply} depth={depth + 1} replyTo={childReplyTo} />
  ));

  return (
    <div className={depth === 0 ? "border-t border-[#EDEAE2] py-[13px] first:border-t-0" : "pt-3"}>
      <div className="flex gap-3">
        <CommentAvatar
          sender={sender}
          initial={displayName.charAt(0).toLowerCase()}
          href={timelineHref}
        />
        <div className="min-w-0 flex-1">
          {replyTo && <CommentReplyToLabel displayName={replyTo.displayName} href={replyTo.href} />}
          {commentText?.trim() ? (
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
          <CommentThreadHeader
            displayName={displayName}
            timelineHref={timelineHref}
            timestamp={timestamp}
            showReply={showReply}
            isReplying={isReplying}
            onToggleReply={() => setIsReplying((open) => !open)}
          />
          {isReplying && (
            <div className="mt-3">
              <CommentComposer
                parent={comment}
                replyTo={childReplyTo}
                placeholder="write a reply…"
                submitLabel="reply"
                autoFocus
                onSuccess={() => setIsReplying(false)}
              />
            </div>
          )}
          {replies.length > 0 &&
            (depth === 0 ? (
              <div className="mt-1 border-l border-[#EDEAE2] pl-3">{replyNodes}</div>
            ) : (
              replyNodes
            ))}
          {hiddenReplyCount > 0 && commentId && (
            <CommentLoadMoreReplies commentId={commentId} hiddenReplyCount={hiddenReplyCount} />
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentThread;
