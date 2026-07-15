"use client";

import truncateAddress from "@/lib/truncateAddress";
import useCopy from "@/hooks/useCopy";
import AnimatedCopyIcon from "../CopyButton/AnimatedCopyIcon";
import { Address } from "viem";

interface ConnectedWalletHintProps {
  address: Address;
}

const ConnectedWalletHint = ({ address }: ConnectedWalletHintProps) => {
  const { copied, copy } = useCopy(address);

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex items-center gap-1 text-[11.5px] text-tan-gold underline underline-offset-2 md:text-xs"
    >
      {truncateAddress(address)}
      <AnimatedCopyIcon isCopied={copied} />
    </button>
  );
};

export default ConnectedWalletHint;
