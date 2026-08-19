"use client";

import useIsSplitContract from "@/hooks/useIsSplitContract";
import truncateAddress from "@/lib/utils/truncateAddress";

const FundsRecipientHint = () => {
  const { isSplit, fundsRecipient } = useIsSplitContract();

  if (!fundsRecipient || isSplit !== false) return null;

  return (
    <div className="mb-4 rounded-lg border border-grey-moss-100 bg-grey-moss-50/60 px-3.5 py-3">
      <p className="font-archivo text-[13px] text-grey-moss-900">
        The current fundsRecipient is {truncateAddress(fundsRecipient)}, not a split.
      </p>
      <p className="mt-1 font-archivo text-[12px] text-grey-moss-300">
        Create a split to set fundsRecipient to the new split address.
      </p>
    </div>
  );
};

export default FundsRecipientHint;
