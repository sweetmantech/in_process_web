"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Search, Send, X } from "lucide-react";
import useRecipientSearch from "@/hooks/useRecipientSearch";
import truncateAddress from "@/lib/truncateAddress";

const RecipientSearchSheet = () => {
  const {
    isSearchOpen,
    closeSearch,
    query,
    setQuery,
    filteredRecipients,
    selectFromSearch,
    isRecipientActive,
  } = useRecipientSearch();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted || !isSearchOpen) return null;

  return createPortal(
    <div className="fixed bottom-[calc(74px+env(safe-area-inset-bottom,0px))] left-0 right-0 top-0 z-50 flex flex-col overflow-hidden bg-white">
      <div className="flex items-center gap-3 border-b border-grey-moss-100 px-5 py-4">
        <Search className="h-[18px] w-[18px] shrink-0 text-grey-moss-900" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search recipients"
          autoFocus
          className="flex-1 border-none bg-transparent font-archivo text-base text-grey-moss-900 outline-none"
        />
        <button
          type="button"
          onClick={closeSearch}
          aria-label="Close"
          className="text-grey-moss-900"
        >
          <X className="h-[18px] w-[18px]" />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto px-3 py-2">
        {filteredRecipients.map((recipient) => (
          <button
            type="button"
            key={recipient.address}
            onClick={() => selectFromSearch(recipient.address)}
            className={`flex w-full items-center gap-3 border-b border-grey-moss-50 px-2.5 py-2.5 text-left ${
              isRecipientActive(recipient.address) ? "bg-grey-moss-50" : "hover:bg-grey-moss-50"
            }`}
          >
            <span className="min-w-0 flex-1">
              <span className="block font-archivo text-sm font-semibold text-grey-moss-900">
                {recipient.username || truncateAddress(recipient.address)}
              </span>
              {recipient.username && (
                <span className="block font-archivo text-xs text-grey-moss-200">
                  {truncateAddress(recipient.address)}
                </span>
              )}
            </span>
            <Send className="h-4 w-4 shrink-0 text-grey-moss-200" />
          </button>
        ))}
      </div>
    </div>,
    document.body
  );
};

export default RecipientSearchSheet;
