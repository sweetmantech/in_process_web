import { determineMediaType } from "@/lib/zora/utils";

export const kindFromMime = (mime: string | undefined) => {
  if (!mime) return null;
  const kind = determineMediaType(mime);
  return kind === "unknown" ? "file" : kind;
};
