"use client";

import useRecipientSearch from "@/hooks/useRecipientSearch";
import truncateAddress from "@/lib/truncateAddress";

const RecentRecipientsRow = () => {
  const {
    isLoading,
    visibleRecipients,
    moreCount,
    toggleRecipient,
    openSearch,
    isRecipientActive,
  } = useRecipientSearch();

  if (isLoading || visibleRecipients.length === 0) return null;

  return (
    <div className="mt-3.5">
      <div className="mb-2 font-archivo text-[10.5px] uppercase tracking-wider text-grey-moss-300">
        recent recipients
      </div>
      <div className="flex flex-wrap gap-2">
        {visibleRecipients.map((recipient) => (
          <button
            type="button"
            key={recipient.address}
            onClick={() => toggleRecipient(recipient.address)}
            className={`rounded-full px-3.5 py-1.5 font-archivo text-xs font-semibold text-grey-moss-900 ${
              isRecipientActive(recipient.address) ? "bg-grey-moss-100" : "bg-grey-moss-50"
            }`}
          >
            {recipient.username || truncateAddress(recipient.address)}
          </button>
        ))}
        {moreCount > 0 && (
          <button
            type="button"
            onClick={openSearch}
            className="rounded-full border border-dashed border-grey-moss-200 px-3.5 py-1 font-archivo text-xs font-semibold text-grey-moss-300 hover:border-grey-moss-900 hover:text-grey-moss-900"
          >
            +{moreCount} more
          </button>
        )}
      </div>
    </div>
  );
};

export default RecentRecipientsRow;
