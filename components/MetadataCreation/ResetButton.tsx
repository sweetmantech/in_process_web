import { useMetadataFormProvider } from "@/providers/MetadataFormProvider";
import { X } from "lucide-react";

interface ResetButtonProps {
  onReset?: () => void;
}

const ResetButton = ({ onReset }: ResetButtonProps) => {
  const { resetFiles } = useMetadataFormProvider();

  const handleClick = () => {
    resetFiles();
    onReset?.();
  };

  return (
    <button
      type="button"
      aria-label="Remove media"
      className="absolute right-3 top-3 z-10 flex size-[30px] items-center justify-center rounded-full bg-grey-moss-900 text-white shadow-[0_4px_12px_rgba(0,0,0,0.35)]"
      onClick={handleClick}
    >
      <X className="size-4" strokeWidth={1.75} />
    </button>
  );
};

export default ResetButton;
