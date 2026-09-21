import { IN_PROCESS_API } from "@/lib/consts";

export const fetchLinkBlob = async (link: string): Promise<File> => {
  const response = await fetch(`${IN_PROCESS_API}/link/get_blob?url=${encodeURIComponent(link)}`);
  const type = response.headers.get("content-type") || "";
  const arrayBuffer = await response.arrayBuffer();
  const blob = new Blob([arrayBuffer], { type });
  return new File([blob], "uploadedFile", { type });
};
