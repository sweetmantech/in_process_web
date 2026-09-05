import { useWayfinderRequest } from "@ar.io/wayfinder-react";
import { getFetchableUrl } from "@/lib/protocolSdk/ipfs/gateway";
import { isArweaveURL } from "@/lib/protocolSdk/ipfs/arweave";
import { validateUrl } from "@/lib/url/validateUrl";
import { MomentMetadata } from "@/types/moment";
import { useMutation } from "@tanstack/react-query";
import { usePrivy } from "@privy-io/react-auth";

const useContentDownload = (metadata?: MomentMetadata | null) => {
  const request = useWayfinderRequest();
  const { getAccessToken } = usePrivy();

  const mutation = useMutation({
    mutationFn: async () => {
      if (!metadata?.content?.uri) return;
      const accessToken = await getAccessToken();
      const contentUri = metadata.content.uri;
      let data: Blob;

      if (isArweaveURL(contentUri)) {
        const response = await request(contentUri, {
          verificationSettings: { enabled: true, strict: false },
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        data = await response.blob();
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
      const fileName =
        mime.includes("pdf") && !/\.pdf$/i.test(baseName) ? `${baseName}.pdf` : baseName;

      const link = document.createElement("a");
      link.download = fileName;
      link.href = window.URL.createObjectURL(new Blob([data], { type: mime }));
      link.click();
      link.remove();
      window.URL.revokeObjectURL(link.href);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return {
    download: () => mutation.mutate(),
    isDownloading: mutation.isPending,
  };
};

export default useContentDownload;
