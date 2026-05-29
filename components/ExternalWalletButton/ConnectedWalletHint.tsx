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
    <div className="pt-1 font-spectral-italic text-sm text-grey-moss-300">
      connected:{" "}
      <button
        type="button"
        onClick={copy}
        className="inline-flex items-center gap-1 font-spectral-italic text-grey-moss-500 underline decoration-grey-moss-400/70 underline-offset-2 transition-colors hover:text-grey-moss-900 hover:decoration-grey-moss-900"
      >
        {truncateAddress(address)}
        <AnimatedCopyIcon isCopied={copied} />
      </button>
    </div>
  );
};

export default ConnectedWalletHint;
