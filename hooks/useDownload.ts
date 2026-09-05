import useContentDownload from "@/hooks/useContentDownload";
import { useMomentProvider } from "@/providers/MomentProvider";

const useDownload = () => {
  const { metadata } = useMomentProvider();
  return useContentDownload(metadata);
};

export default useDownload;
