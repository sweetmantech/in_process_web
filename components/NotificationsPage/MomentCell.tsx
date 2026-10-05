import { ImageIcon } from "lucide-react";
import BlurImage from "@/components/BlurImage";
import { SITE_ORIGINAL_URL } from "@/lib/consts";
import type { InProcessNotification } from "@/types/notification";

interface MomentCellProps {
  moment: InProcessNotification["transfer"]["moment"];
}

const MomentCell = ({ moment }: MomentCellProps) => {
  const { metadata, collection, token_id } = moment;

  return (
    <a
      href={`${SITE_ORIGINAL_URL}/collect/base:${collection.address}/${token_id}`}
      target="_blank"
      rel="noopener noreferrer"
      className="flex min-w-0 items-center gap-3 hover:opacity-90"
    >
      <div className="flex size-9 flex-none items-center justify-center overflow-hidden rounded-[10px] bg-grey-moss-50 text-grey-moss-300">
        {metadata?.image ? (
          <BlurImage
            src={metadata.image}
            alt={metadata.name || "moment"}
            width={36}
            height={36}
            className="size-full object-cover"
          />
        ) : (
          <ImageIcon className="size-[17px]" />
        )}
      </div>
      <span className="truncate text-sm text-grey-moss-900">{metadata?.name}</span>
    </a>
  );
};

export default MomentCell;
