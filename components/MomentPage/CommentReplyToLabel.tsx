"use client";

import Link from "next/link";

export type ReplyToTarget = {
  displayName: string;
  href: string;
};

type CommentReplyToLabelProps = ReplyToTarget;

const CommentReplyToLabel = ({ displayName, href }: CommentReplyToLabelProps) => (
  <p className="mb-1 font-archivo text-[11px] text-[#8B8474]">
    replying to{" "}
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-grey-moss-900 transition-colors hover:text-tan-gold"
    >
      @{displayName}
    </Link>
  </p>
);

export default CommentReplyToLabel;
