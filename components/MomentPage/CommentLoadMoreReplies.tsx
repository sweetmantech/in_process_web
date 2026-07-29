"use client";

import { useState } from "react";
import { useMomentCommentsProvider } from "@/providers/MomentCommentsProvider";

type CommentLoadMoreRepliesProps = {
  commentId: string;
  hiddenReplyCount: number;
};

const CommentLoadMoreReplies = ({ commentId, hiddenReplyCount }: CommentLoadMoreRepliesProps) => {
  const [isLoadingReplies, setIsLoadingReplies] = useState(false);
  const { loadMoreReplies } = useMomentCommentsProvider();

  const handleLoadMore = async () => {
    if (isLoadingReplies) return;
    setIsLoadingReplies(true);
    try {
      await loadMoreReplies(commentId);
    } finally {
      setIsLoadingReplies(false);
    }
  };

  return (
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
  );
};

export default CommentLoadMoreReplies;
