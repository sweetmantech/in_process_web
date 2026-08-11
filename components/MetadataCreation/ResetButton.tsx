import { useMetadataFormProvider } from "@/providers/MetadataFormProvider";
import { X } from "lucide-react";

const ResetButton = () => {
  const { resetFiles } = useMetadataFormProvider();

  return (
    <button
      type="button"
      aria-label="Remove media"
      className="absolute right-2.5 top-2.5 z-10 flex size-7 items-center justify-center rounded-full bg-grey-moss-900 text-white shadow-[0_4px_12px_rgba(0,0,0,0.35)] md:right-3 md:top-3 md:size-[30px]"
      onClick={resetFiles}
    >
      <X className="size-4" strokeWidth={1.75} />
    </button>
  );
};

export default ResetButton;
