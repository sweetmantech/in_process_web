import { kindFromMime } from "@/lib/media/kindFromMime";
import type { CollectedContentType } from "@/types/collected";
import type { CollectorTransfer } from "@/types/collectorTransfer";

export const contentTypeOf = (transfer: CollectorTransfer): CollectedContentType => {
  const mime = transfer.moment.metadata?.content?.mime;
  const kind = kindFromMime(mime);
  if (kind === "image") return "Image";
  if (kind === "video") return "Video";
  if (kind === "audio") return "Audio";
  return "Other";
};
