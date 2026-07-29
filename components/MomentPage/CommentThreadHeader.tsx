"use client";

import Link from "next/link";

type CommentThreadHeaderProps = {
  displayName: string;
  timelineHref: string;
  timestamp: number;
  showReply: boolean;
  isReplying: boolean;
  onToggleReply: () => void;
};

const CommentThreadHeader = ({
  displayName,
  timelineHref,
  timestamp,
  showReply,
  isReplying,
  onToggleReply,
}: CommentThreadHeaderProps) => (
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
        onClick={onToggleReply}
        className="font-archivo text-[11px] uppercase tracking-wide text-grey-moss-300 transition-colors hover:text-tan-gold"
      >
        {isReplying ? "cancel" : "reply"}
      </button>
    )}
  </div>
);

export default CommentThreadHeader;
