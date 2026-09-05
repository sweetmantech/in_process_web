import { getFetchableUrl } from "@/lib/protocolSdk/ipfs/gateway";
import { isArweaveURL } from "@/lib/protocolSdk/ipfs/arweave";
import { validateUrl } from "@/lib/url/validateUrl";
import { MomentMetadata } from "@/types/moment";

type DownloadMomentContentParams = {
  metadata: MomentMetadata;
  accessToken: string | null;
  fetchArweave: (uri: string, accessToken: string | null) => Promise<Blob>;
};

export async function downloadMomentContent({
  metadata,
  accessToken,
  fetchArweave,
}: DownloadMomentContentParams): Promise<void> {
  const contentUri = metadata.content?.uri;
  if (!contentUri) return;

  let data: Blob;

  if (isArweaveURL(contentUri)) {
    data = await fetchArweave(contentUri, accessToken);
  } else {
    const fetchableUrl = getFetchableUrl(contentUri);
    const isLocalUri = fetchableUrl?.startsWith("blob:") || fetchableUrl?.startsWith("data:");
    if (!fetchableUrl || (!isLocalUri && !validateUrl(fetchableUrl))) {
      console.error("Invalid or unsafe URL for download");
      return;
    }

    data = await fetch(fetchableUrl, {
      headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {},
    }).then((res) => res.blob());
  }

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
