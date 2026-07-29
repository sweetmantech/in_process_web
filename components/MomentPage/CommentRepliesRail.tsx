"use client";

import { ReactNode, useState } from "react";
import CommentLoadMoreReplies from "./CommentLoadMoreReplies";

type CommentRepliesRailProps = {
  children: ReactNode;
  commentId?: string | null;
  hiddenReplyCount: number;
  visibleReplyCount: number;
};

const CommentRepliesRail = ({
  children,
  commentId,
  hiddenReplyCount,
  visibleReplyCount,
}: CommentRepliesRailProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  if (visibleReplyCount === 0 && hiddenReplyCount === 0) {
    return null;
  }

  if (visibleReplyCount === 0) {
    return commentId ? (
      <CommentLoadMoreReplies commentId={commentId} hiddenReplyCount={hiddenReplyCount} />
    ) : null;
  }

  if (isCollapsed) {
    return (
      <button
        type="button"
        onClick={() => setIsCollapsed(false)}
        className="mt-2 font-archivo text-[11px] uppercase tracking-wide text-tan-gold transition-opacity hover:opacity-80"
      >
        show replies
      </button>
    );
  }

  return (
    <>
      <div className="mt-1 border-l border-[#EDEAE2] pl-3">{children}</div>
      <div className="mt-2 flex flex-wrap items-center gap-3">
        {hiddenReplyCount > 0 && commentId && (
          <CommentLoadMoreReplies commentId={commentId} hiddenReplyCount={hiddenReplyCount} />
        )}
        <button
          type="button"
          onClick={() => setIsCollapsed(true)}
          className="font-archivo text-[11px] uppercase tracking-wide text-grey-moss-300 transition-colors hover:text-tan-gold"
        >
          hide replies
        </button>
      </div>
    </>
  );
};

export default CommentRepliesRail;
