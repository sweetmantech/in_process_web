import { downloadMomentContent } from "@/lib/moment/downloadMomentContent";
import { MomentMetadata } from "@/types/moment";
import { useMutation } from "@tanstack/react-query";
import { usePrivy } from "@privy-io/react-auth";

const useDownload = (metadata?: MomentMetadata | null) => {
  const { getAccessToken } = usePrivy();

  const mutation = useMutation({
    mutationFn: async () => {
      if (!metadata) return;
      const accessToken = await getAccessToken();
      await downloadMomentContent({ metadata, accessToken });
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
