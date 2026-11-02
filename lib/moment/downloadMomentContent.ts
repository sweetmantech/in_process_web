import { getFetchableUrl } from "@/lib/protocolSdk/ipfs/gateway";
import { isArweaveURL } from "@/lib/protocolSdk/ipfs/arweave";
import { validateUrl } from "@/lib/url/validateUrl";
import { MomentMetadata } from "@/types/moment";

type DownloadMomentContentParams = {
  metadata: MomentMetadata;
  accessToken: string | null;
};

export async function downloadMomentContent({
  metadata,
  accessToken,
}: DownloadMomentContentParams): Promise<void> {
  const contentUri = metadata.content?.uri;
  if (!contentUri) return;

  const fetchableUrl = getFetchableUrl(contentUri);
  const isLocalUri = fetchableUrl?.startsWith("blob:") || fetchableUrl?.startsWith("data:");
  if (!fetchableUrl || (!isLocalUri && !validateUrl(fetchableUrl))) {
    console.error("Invalid or unsafe URL for download");
    return;
  }

  const sendAuth = accessToken && !isArweaveURL(contentUri);
  const data = await fetch(fetchableUrl, {
    headers: sendAuth ? { Authorization: `Bearer ${accessToken}` } : {},
  }).then((res) => res.blob());

  const mime = metadata.content.mime || "";
  const baseName = metadata.name || "download";
  const fileName = mime.includes("pdf") && !/\.pdf$/i.test(baseName) ? `${baseName}.pdf` : baseName;

  const link = document.createElement("a");
  link.download = fileName;
  link.href = window.URL.createObjectURL(new Blob([data], { type: mime }));
  link.click();
  link.remove();
  window.URL.revokeObjectURL(link.href);
}
