import { ImageIcon } from "lucide-react";
import BlurImage from "@/components/BlurImage";
import { SITE_ORIGINAL_URL } from "@/lib/consts";
import type { PaymentTransferRow } from "@/types/payments";

interface PaymentMomentCellProps {
  moment: PaymentTransferRow["moment"];
}

const PaymentMomentCell = ({ moment }: PaymentMomentCellProps) => {
  const { metadata, collection, token_id } = moment;

  return (
    <a
      href={`${SITE_ORIGINAL_URL}/collect/base:${collection.address}/${token_id}`}
      target="_blank"
      rel="noopener noreferrer"
      className="flex min-w-0 items-center gap-[13px] hover:opacity-90"
    >
      <div className="flex size-[42px] flex-none items-center justify-center overflow-hidden rounded-[9px] bg-[#E3DFD5] text-[#B5AFA2] shadow-[inset_0_0_0_1px_rgba(27,21,4,.06)]">
        {metadata?.image ? (
          <BlurImage
            src={metadata.image}
            alt={metadata.name || "moment"}
            width={42}
            height={42}
            className="size-full object-cover"
          />
        ) : (
          <ImageIcon className="size-4" />
        )}
      </div>
      <span className="truncate font-archivo-medium text-sm text-grey-moss-900">
        {metadata?.name}
      </span>
    </a>
  );
};

export default PaymentMomentCell;
