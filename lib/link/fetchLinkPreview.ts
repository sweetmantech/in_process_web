import { IN_PROCESS_API } from "@/lib/consts";
import { LinkPreview } from "@/types/link";

export const fetchLinkPreview = async (link: string): Promise<LinkPreview> => {
  const response = await fetch(`${IN_PROCESS_API}/link/get_detail?url=${encodeURIComponent(link)}`);
  if (!response.ok) throw Error("failed to get link preview.");

  return response.json();
};
