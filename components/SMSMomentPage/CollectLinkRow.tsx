"use client";

import { Copy, Link as LinkIcon } from "lucide-react";
import useShareMoment from "@/hooks/useShareMoment";

const CollectLinkRow = () => {
  const { share, displayUrl } = useShareMoment();

  return (
    <div className="flex items-center gap-2 border-b border-grey-moss-100 pb-3">
      <LinkIcon className="h-3.5 w-3.5 shrink-0 text-tan-gold" />
      <span className="min-w-0 flex-1 truncate font-archivo text-xs text-tan-gold">
        {displayUrl}
      </span>
      <button
        type="button"
        onClick={share}
        className="flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full bg-grey-moss-50 px-3 py-1.5 font-archivo text-xs font-semibold text-grey-moss-900 hover:bg-grey-moss-100"
      >
        <Copy className="h-3 w-3" />
        Copy link
      </button>
    </div>
  );
};

export default CollectLinkRow;
