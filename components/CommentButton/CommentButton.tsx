"use client";

import { useMomentCollectProvider } from "@/providers/MomentCollectProvider";

interface CommentButtonProps {
  disabled?: boolean;
  label?: string;
  onSuccess?: () => void;
}

export default function CommentButton({
  disabled = false,
  label = "collect",
  onSuccess,
}: CommentButtonProps) {
  const { collectWithComment, isLoading } = useMomentCollectProvider();

  return (
    <button
      onClick={async () => {
        const success = await collectWithComment();
        if (success) onSuccess?.();
      }}
      type="button"
      className="w-full bg-black py-3 font-archivo text-xl text-grey-eggshell hover:bg-grey-moss-300 disabled:cursor-not-allowed disabled:bg-grey-moss-300"
      disabled={isLoading || disabled}
    >
      {isLoading ? "Collecting..." : label}
    </button>
  );
}
