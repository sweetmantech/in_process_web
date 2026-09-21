import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useMetadataFormProvider } from "@/providers/MetadataFormProvider";
import { fetchLinkBlob } from "@/lib/link/fetchLinkBlob";
import { fetchLinkPreview } from "@/lib/link/fetchLinkPreview";

const useLinkPreview = () => {
  const { setPreviewFile, link } = useMetadataFormProvider();

  const { data } = useQuery({
    queryKey: ["link_preview", link],
    queryFn: () => fetchLinkPreview(link),
    staleTime: 1000 * 60 * 5,
    enabled: !!link,
    refetchOnMount: true,
  });

  useEffect(() => {
    // TODO: Centralize upload+preview logic with handleImageSelection helper to avoid duplication
    // Note: This flow differs slightly as it fetches blob from URL first, then uploads
    const uploadImage = async () => {
      if (!data) return;
      if (data.images?.[0] || data.favicons?.[0]) {
        try {
          const file = await fetchLinkBlob(data.images?.[0] || data.favicons?.[0]);
          setPreviewFile(file);
        } catch (error) {
          console.error(error);
        }
      }
      return;
    };
    uploadImage();
  }, [data, setPreviewFile]);
};

export default useLinkPreview;
