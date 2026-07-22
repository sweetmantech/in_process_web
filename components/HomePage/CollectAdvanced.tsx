"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { useMomentCommentsProvider } from "@/providers/MomentCommentsProvider";

const CollectAdvanced = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { comment, setComment } = useMomentCommentsProvider();

  return (
    <div className="mt-3 flex w-full flex-col gap-2">
      <button
        type="button"
        className="flex w-full items-center justify-between border-b border-grey-moss-300 pb-1 font-archivo text-sm text-grey-moss-400"
        onClick={() => setIsOpen(!isOpen)}
      >
        Advanced
        <ChevronDown
          className={`h-4 w-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      {isOpen && (
        <textarea
          className="w-full !border-none bg-grey-moss-50 p-3 font-spectral text-sm !outline-none !ring-0"
          rows={4}
          placeholder="leave a comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      )}
    </div>
  );
};

export default CollectAdvanced;
