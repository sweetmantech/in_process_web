"use client";

import { useMemo, useState } from "react";
import { kindFromMime } from "@/lib/media/kindFromMime";
import type { CollectorTransfer } from "@/types/collectorTransfer";
import type { CollectedContentType, ContentTypeFilter } from "./types";

type Options = {
  transfers?: CollectorTransfer[];
};

const contentTypeOf = (transfer: CollectorTransfer): CollectedContentType => {
  const mime = transfer.moment.metadata?.content?.mime;
  const kind = kindFromMime(mime);
  if (kind === "image") return "Image";
  if (kind === "video") return "Video";
  if (kind === "audio") return "Audio";
  return "Other";
};

export function useCollectedPageState({ transfers: sourceTransfers = [] }: Options = {}) {
  const [contentType, setContentType] = useState<ContentTypeFilter>("All");

  const transfers = useMemo(() => {
    const filtered =
      contentType === "All"
        ? sourceTransfers
        : sourceTransfers.filter((transfer) => contentTypeOf(transfer) === contentType);
    return filtered
      .slice()
      .sort((a, b) => Date.parse(b.transferred_at || "") - Date.parse(a.transferred_at || ""));
  }, [sourceTransfers, contentType]);

  const typeTabs = useMemo(() => {
    const types: ContentTypeFilter[] = ["All", "Audio", "Video", "Image", "Other"];
    return types.map((label) => ({
      label,
      count:
        label === "All"
          ? sourceTransfers.length
          : sourceTransfers.filter((transfer) => contentTypeOf(transfer) === label).length,
    }));
  }, [sourceTransfers]);

  return {
    transfers,
    typeTabs,
    contentType,
    setContentType,
  };
}
