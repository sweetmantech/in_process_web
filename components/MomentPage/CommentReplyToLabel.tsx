"use client";

import Link from "next/link";
import type { ReplyToTarget } from "@/types/replyToTarget";

type CommentReplyToLabelProps = ReplyToTarget;

const CommentReplyToLabel = ({ displayName, href, commentPreview }: CommentReplyToLabelProps) => (
  <div className="mb-1">
    <p className="font-archivo text-[11px] text-[#8B8474]">
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
    <p className="font-spectral text-[12px] leading-snug text-[#8B8474]">"{commentPreview}"</p>
  </div>
);

export default CommentReplyToLabel;
