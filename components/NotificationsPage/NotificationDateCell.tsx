import { ExternalLink } from "lucide-react";
import type { InProcessNotification } from "@/types/notification";

interface NotificationDateCellProps {
  transfer: InProcessNotification["transfer"];
}

const NotificationDateCell = ({ transfer }: NotificationDateCellProps) => (
  <div className="hidden items-center justify-between gap-2.5 lg:flex">
    <span className="text-xs text-grey-moss-300">
      {new Date(transfer.transferred_at).toLocaleString()}
    </span>
    <a
      href={`https://basescan.org/tx/${transfer.transaction_hash}`}
      target="_blank"
      rel="noopener noreferrer"
      title="see transaction details"
      className="flex size-7 flex-none items-center justify-center rounded-[9px] text-grey-moss-300 hover:bg-grey-moss-50 hover:text-grey-moss-900"
    >
      <ExternalLink className="size-[15px]" />
    </a>
  </div>
);

export default NotificationDateCell;
