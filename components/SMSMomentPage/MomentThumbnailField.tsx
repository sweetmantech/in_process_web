import { ChangeEvent, RefObject } from "react";
import { Pencil } from "lucide-react";
import CollectionImage from "../CollectionImage";

interface MomentThumbnailFieldProps {
  imageUrl: string;
  alt: string;
  isOwner: boolean;
  disabled: boolean;
  fileInputRef: RefObject<HTMLInputElement | null>;
  onFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const MomentThumbnailField = ({
  imageUrl,
  alt,
  isOwner,
  disabled,
  fileInputRef,
  onFileChange,
}: MomentThumbnailFieldProps) => {
  const handleEditClick = () => fileInputRef.current?.click();

  return (
    <div className="flex items-center gap-3">
      <span className="w-16 shrink-0 font-archivo text-[10.5px] uppercase tracking-wider text-grey-moss-300">
        media
      </span>
      <div className="relative shrink-0">
        <CollectionImage src={imageUrl} alt={alt} className="h-14 w-14 rounded-lg" />
        {isOwner && (
          <button
            type="button"
            onClick={handleEditClick}
            disabled={disabled}
            aria-label="Edit media"
            className="absolute -bottom-1.5 -right-1.5 flex h-[18px] w-[18px] items-center justify-center rounded-full border border-tan-secondary bg-tan-primary text-grey-moss-900 hover:bg-tan-secondary/40 disabled:opacity-50"
          >
            <Pencil className="h-2.5 w-2.5" />
          </button>
        )}
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={onFileChange}
        className="hidden"
        disabled={disabled}
      />
    </div>
  );
};

export default MomentThumbnailField;
