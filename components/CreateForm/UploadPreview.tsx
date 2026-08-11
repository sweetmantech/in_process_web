import { Fragment } from "react";
import { useCropImageProvider } from "@/providers/CropImageProvider";
import CropImage from "@/components/CropImage";
import { useMetadataFormProvider } from "@/providers/MetadataFormProvider";
import { useUploadPreview } from "@/hooks/useUploadPreview";

const UploadPreview = () => {
  const { previewFile } = useMetadataFormProvider();
  const { isUploading: isUploadingCrop } = useCropImageProvider();
  const { previewRef, handleClick, handlePreviewUpload, handleDoneClick } = useUploadPreview();

  return (
    <Fragment>
      <div className="w-full text-center font-spectral-italic text-2xl text-grey-moss-900">
        Preview
      </div>
      <input
        type="file"
        className="hidden"
        ref={previewRef}
        accept="image/*"
        onChange={handlePreviewUpload}
      />
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-[#E4E0D7] bg-[#EDEAE2] font-spectral">
        {previewFile ? (
          <CropImage />
        ) : (
          <div className="flex size-full items-center justify-center p-3">
            <p className="font-archivo text-sm uppercase tracking-[0.08em] text-[#A8A296]">
              Drop thumbnail
            </p>
          </div>
        )}
      </div>
      <p className="text-center font-archivo text-xs uppercase tracking-[0.08em] text-[#A8A296]">
        drag / zoom to resize
      </p>
      <div className="flex w-full gap-2.5">
        <button
          type="button"
          className="flex-1 rounded-[11px] border border-[#DCD6CA] bg-transparent py-3 font-archivo-medium text-[13px] uppercase tracking-[0.06em] text-grey-moss-900 transition-colors hover:bg-[#F1EEE8]"
          onClick={handleClick}
        >
          upload thumbnail
        </button>
        <button
          type="button"
          className="flex-1 rounded-[11px] bg-grey-moss-900 py-3.5 font-archivo-bold text-[13px] uppercase tracking-[0.06em] text-white transition-colors hover:bg-black disabled:opacity-50"
          onClick={handleDoneClick}
          disabled={isUploadingCrop}
        >
          {isUploadingCrop ? "saving..." : "done"}
        </button>
      </div>
    </Fragment>
  );
};

export default UploadPreview;
