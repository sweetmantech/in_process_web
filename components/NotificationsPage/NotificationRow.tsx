import MomentCell from "./MomentCell";
import NotificationDateCell from "./NotificationDateCell";
import { notificationsGridClassName } from "@/lib/notifications/notificationsGridClassName";
import { InProcessNotification } from "@/types/notification";

interface NotificationRowProps {
  notification: InProcessNotification;
}

const NotificationRow = ({ notification }: NotificationRowProps) => {
  const { transfer, artist, viewed } = notification;

  return (
    <div
      className={`${notificationsGridClassName} items-center border-b border-grey-moss-50 px-4 py-3 last:border-b-0 hover:bg-[#FDFCFA] md:px-6`}
    >
      <div className="flex min-w-0 flex-col items-start gap-1.5">
        <span className="text-sm text-grey-moss-900">
          {artist.username || "Unknown"} was paid ${transfer.value ?? 0} by{" "}
          {transfer.collector.username || "Unknown"}
        </span>
        {!viewed && (
          <span className="inline-flex items-center gap-[5px] whitespace-nowrap rounded-xl bg-grey-moss-50 px-[9px] py-[3px] text-xs text-grey-moss-900">
            <span className="h-1.5 w-1.5 rounded-full bg-[#7FD58A]" />
            new
          </span>
        )}
      </div>
      <MomentCell moment={transfer.moment} />
      <NotificationDateCell transfer={transfer} />
    </div>
  );
};

export default NotificationRow;
