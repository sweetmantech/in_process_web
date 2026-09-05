import { useWayfinderRequest } from "@ar.io/wayfinder-react";
import { downloadMomentContent } from "@/lib/moment/downloadMomentContent";
import { MomentMetadata } from "@/types/moment";
import { useMutation } from "@tanstack/react-query";
import { usePrivy } from "@privy-io/react-auth";

const useDownload = (metadata?: MomentMetadata | null) => {
  const request = useWayfinderRequest();
  const { getAccessToken } = usePrivy();

  const mutation = useMutation({
    mutationFn: async () => {
      if (!metadata) return;
      const accessToken = await getAccessToken();
      await downloadMomentContent({
        metadata,
        accessToken,
        fetchArweave: async (uri, token) => {
          const response = await request(uri, {
            verificationSettings: { enabled: true, strict: false },
            headers: { Authorization: `Bearer ${token}` },
          });
          return response.blob();
        },
      });
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

export default useDownload;
