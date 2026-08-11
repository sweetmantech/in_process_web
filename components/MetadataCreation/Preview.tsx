import useIsMobile from "@/hooks/useIsMobile";
import { useMomentCreateProvider } from "@/providers/MomentCreateProvider/MomentCreateProvider";
import { useMetadataFormProvider } from "@/providers/MetadataFormProvider";
import useTypeParam from "@/hooks/useTypeParam";
import { ReactNode, useMemo } from "react";
import { cn } from "@/lib/utils";

const Preview = ({ children }: { children: ReactNode }) => {
  const { createdTokenId } = useMomentCreateProvider();
  const { imageFile, animationFile, previewFile } = useMetadataFormProvider();
  const type = useTypeParam();
  const isMobile = useIsMobile();
  const isWritingPage = type === "writing";
  const isCreatingPage = !type;
  const hasMedia = Boolean(imageFile || animationFile || previewFile);

  const frameVisible = useMemo(() => {
    if (type === "link" && isMobile) return false;
    if (type === "embed" && isMobile) return false;
    if (type === "writing") return false;
    if (createdTokenId) return false;
    // Empty dropzone is self-styled; stripe frame only when media is present.
    if (isCreatingPage && !hasMedia) return false;
    return true;
  }, [type, isMobile, createdTokenId, isCreatingPage, hasMedia]);

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden",
        // Thought sheet must keep full-stage height even after create sets tokenId.
        isWritingPage
          ? "flex min-h-[300px] flex-1 md:min-h-0"
          : createdTokenId
            ? isCreatingPage
              ? "min-h-[300px]"
              : "min-h-auto"
            : isCreatingPage
              ? "aspect-square min-h-0 md:aspect-auto md:min-h-0 md:flex-1"
              : type === "embed" || type === "link"
                ? "flex min-h-0 flex-col md:min-h-0 md:flex-1"
                : "min-h-[300px] md:min-h-0 md:flex-1",
        !isCreatingPage && !isWritingPage && "md:aspect-auto",
        frameVisible &&
          "rounded-[14px] border border-[#E4E0D7] bg-[repeating-linear-gradient(45deg,#F1EEE8_0_12px,#EAE6DD_12px_24px)] shadow-[0_8px_26px_-12px_rgba(27,21,4,.3)] md:rounded-[12px] md:shadow-[0_10px_34px_-14px_rgba(27,21,4,.32)]"
      )}
    >
      {children}
    </div>
  );
};

export default Preview;
