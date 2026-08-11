import Image from "next/image";
import PreviewModal from "./PreviewModal";
import { useMetadataFormProvider } from "@/providers/MetadataFormProvider";
import useTypeParam from "@/hooks/useTypeParam";

const Preview = () => {
  const { previewFile, animationFile, imageFile, previewFileUrl } = useMetadataFormProvider();
  const type = useTypeParam();

  if (type === "writing") return null;

  const hasSelectedFile = Boolean(previewFile || animationFile || imageFile);
  const showImagePreview = hasSelectedFile && Boolean(previewFileUrl);
  const showPreviewControls = hasSelectedFile || type === "link";

  if (!showImagePreview && !showPreviewControls) {
    return null;
  }

  return (
    <div className="border-b border-[#E4E0D7] pb-4 md:pb-5">
      <div className="flex items-center gap-3">
        {showImagePreview && previewFileUrl ? (
          <div className="relative size-[52px] shrink-0 overflow-hidden rounded-[10px] border border-[#E4E0D7] md:size-[60px]">
            <Image
              key={previewFile ? `${previewFile.name}-${previewFile.lastModified}` : previewFileUrl}
              layout="fill"
              objectFit="cover"
              objectPosition="center"
              src={previewFileUrl}
              alt="not found preview."
            />
          </div>
        ) : (
          <div className="flex size-[52px] shrink-0 flex-col items-center justify-center rounded-[10px] border border-dashed border-[#DCD6CA] bg-[#FBFAF7] px-1 text-center md:size-[60px]">
            <span className="w-full text-center font-archivo text-[8px] uppercase leading-[1.15] tracking-[0.04em] text-[#A8A296] md:text-[9px]">
              no
              <br />
              preview
            </span>
          </div>
        )}
        <div className="min-w-0 flex-1 font-archivo text-[11.5px] text-[#A8A296] md:hidden">
          How this appears in the timeline
        </div>
        <div className="hidden min-w-0 flex-1 md:block" />
        {showPreviewControls && <PreviewModal />}
      </div>
    </div>
  );
};

export default Preview;
