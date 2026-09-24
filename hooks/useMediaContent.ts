import useArweaveUrl from "@/hooks/useArweaveUrl";
import { MomentMetadata } from "@/types/moment";

const useMediaContent = (metadata: MomentMetadata | null | undefined) => {
  const mimeType = metadata?.content?.mime || "";
  const rawAnimationUri = metadata?.animation_url || "";
  const rawContentUri = metadata?.content?.uri || "";
  // Legacy tokens (e.g. zora_media) may have no `image`, only image content.
  const rawImageUri = metadata?.image || (mimeType.startsWith("image/") ? rawContentUri : "");

  // Resolve Arweave URLs via Wayfinder (fastest verified gateway)
  const { url: animationUrl, isLoading: animationLoading } = useArweaveUrl(rawAnimationUri);
  const { url: contentUrl, isLoading: contentLoading } = useArweaveUrl(rawContentUri);

  return {
    mimeType,
    rawAnimationUri,
    rawImageUri,
    rawContentUri,
    animationUrl,
    animationLoading,
    contentUrl,
    contentLoading,
  };
};

export default useMediaContent;
