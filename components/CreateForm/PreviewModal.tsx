import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import UploadPreview from "./UploadPreview";
import { CropImageProvider } from "@/providers/CropImageProvider";
import { useMetadataFormProvider } from "@/providers/MetadataFormProvider";

const PreviewModal = () => {
  const { setIsOpenPreviewUpload, isOpenPreviewUpload } = useMetadataFormProvider();

  return (
    <Dialog
      open={isOpenPreviewUpload}
      onOpenChange={() => setIsOpenPreviewUpload(!isOpenPreviewUpload)}
    >
      <DialogTrigger
        asChild
        onClick={() => setIsOpenPreviewUpload(true)}
        className="disabled:cursor-not-allowed disabled:bg-grey-moss-300"
      >
        <button
          type="button"
          className="shrink-0 rounded-[10px] border border-[#DCD6CA] bg-transparent px-3.5 py-2 font-archivo-medium text-[11.5px] uppercase tracking-[0.06em] text-grey-moss-900 transition-colors hover:bg-[#F1EEE8] disabled:!pointer-events-auto disabled:!cursor-not-allowed md:text-[12.5px]"
        >
          set preview
        </button>
      </DialogTrigger>
      <DialogContent className="flex max-w-[440px] flex-col items-center !gap-4 overflow-hidden !rounded-[18px] border-none !bg-white !px-[26px] py-[26px] shadow-[0_40px_90px_-30px_rgba(27,21,4,0.55)]">
        <VisuallyHidden>
          <DialogTitle>Preview</DialogTitle>
        </VisuallyHidden>
        <CropImageProvider>
          <UploadPreview />
        </CropImageProvider>
      </DialogContent>
    </Dialog>
  );
};

export default PreviewModal;
