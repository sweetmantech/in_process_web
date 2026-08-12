import useIsCreatePage from "@/hooks/useIsCreatePage";
import { useMetadataFormProvider } from "@/providers/MetadataFormProvider";
import { ImageIcon } from "lucide-react";

const ThumbnailUpload = () => {
  const isCreatePage = useIsCreatePage();
  const { setIsOpenPreviewUpload } = useMetadataFormProvider();

  if (!isCreatePage) return null;

  return (
    <button
      type="button"
      className="flex size-full flex-col items-center justify-center gap-2 border-2 border-dashed border-gray-300 rounded-lg bg-neutral-600 p-3 cursor-pointer"
      onClick={() => setIsOpenPreviewUpload(true)}
    >
      <ImageIcon className="size-10 shrink-0 text-white" strokeWidth={1.5} />
      <p className="text-center text-xs font-medium text-white sm:text-sm">Upload thumbnail</p>
    </button>
  );
};

export default ThumbnailUpload;
