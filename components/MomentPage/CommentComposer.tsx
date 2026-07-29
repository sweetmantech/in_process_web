"use client";

import { useState } from "react";
import { useMomentCommentsProvider } from "@/providers/MomentCommentsProvider";
import { MintComment } from "@/types/moment";
import CommentReplyToLabel, { type ReplyToTarget } from "./CommentReplyToLabel";

type CommentComposerProps = {
  parent?: MintComment;
  replyTo?: ReplyToTarget;
  placeholder?: string;
  submitLabel?: string;
  onSuccess?: () => void;
  autoFocus?: boolean;
};

const CommentComposer = ({
  parent,
  replyTo,
  placeholder = "write a comment…",
  submitLabel = "post",
  onSuccess,
  autoFocus = false,
}: CommentComposerProps) => {
  const [text, setText] = useState("");
  const { submitComment, isSubmitting } = useMomentCommentsProvider();
  const canSubmit = Boolean(text.trim()) && !isSubmitting;

  const handleSubmit = async () => {
    if (!canSubmit) return;
    const ok = await submitComment({ text, parent });
    if (ok) {
      setText("");
      onSuccess?.();
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {replyTo && <CommentReplyToLabel displayName={replyTo.displayName} href={replyTo.href} />}
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={placeholder}
        autoFocus={autoFocus}
        rows={2}
        disabled={isSubmitting}
        className="w-full resize-none rounded-lg border border-[#EDEAE2] bg-grey-moss-50 px-3 py-2 font-spectral text-[14px] text-grey-moss-900 outline-none ring-0 placeholder:text-[#8B8474] focus:border-tan-gold"
      />
      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!canSubmit}
          className="rounded-full bg-grey-moss-900 px-4 py-1.5 font-archivo text-xs uppercase tracking-wide text-white transition-opacity disabled:opacity-40"
        >
          {isSubmitting ? "posting…" : submitLabel}
        </button>
      </div>
    </div>
  );
};

export default CommentComposer;
