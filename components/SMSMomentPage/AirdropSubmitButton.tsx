"use client";

import { Send } from "lucide-react";
import { useAirdropProvider } from "@/providers/AirdropProvider";
import useCanAirdropMoment from "@/hooks/useCanAirdropMoment";
import { AirdropItem } from "@/types/airdrop";

const AirdropSubmitButton = () => {
  const { airdropToItems, onAirdrop, loading } = useAirdropProvider();
  const canAirdrop = useCanAirdropMoment();

  const isDisabled =
    airdropToItems.length === 0 ||
    airdropToItems.some((item: AirdropItem) => item.status === "invalid") ||
    loading ||
    !canAirdrop;

  return (
    <button
      type="button"
      onClick={onAirdrop}
      disabled={isDisabled}
      className="mt-3.5 flex w-full items-center justify-center gap-2 rounded-full bg-grey-moss-900 py-2.5 font-archivo text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:bg-grey-moss-200"
    >
      <Send className="h-3.5 w-3.5" />
      {loading ? "Loading..." : "Airdrop"}
    </button>
  );
};

export default AirdropSubmitButton;
