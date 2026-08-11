import useIsMobile from "@/hooks/useIsMobile";
import { useMomentCreateProvider } from "@/providers/MomentCreateProvider/MomentCreateProvider";
import useTypeParam from "@/hooks/useTypeParam";
import { ReactNode, useMemo } from "react";
import { cn } from "@/lib/utils";

const Preview = ({ children }: { children: ReactNode }) => {
  const { createdTokenId } = useMomentCreateProvider();
  const type = useTypeParam();
  const isMobile = useIsMobile();
  const frameVisible = useMemo(() => {
    if (type === "link" && isMobile) return false;
    if (type === "embed" && isMobile) return false;
    if (createdTokenId) return false;
    return true;
  }, [type, isMobile, createdTokenId]);
  const isWritingPage = type === "writing";
  const isCreatingPage = !type;

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden",
        createdTokenId
          ? isWritingPage || isCreatingPage
            ? "min-h-[300px]"
            : "min-h-auto"
          : "min-h-[400px]",
        "md:min-h-0 md:flex-1 md:aspect-auto",
        frameVisible &&
          "rounded-[12px] border border-[#E4E0D7] bg-[repeating-linear-gradient(45deg,#F1EEE8_0_12px,#EAE6DD_12px_24px)] shadow-[0_8px_26px_-12px_rgba(27,21,4,.3)] md:shadow-[0_10px_34px_-14px_rgba(27,21,4,.32)]"
      )}
    >
      {children}
    </div>
  );
};

export default Preview;
