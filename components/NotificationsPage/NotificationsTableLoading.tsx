import { Skeleton } from "@/components/ui/skeleton";
import { notificationsGridClassName } from "@/lib/notifications/notificationsGridClassName";
import { MANAGE_CARD_CLASS } from "@/lib/utils/classNames";

const NotificationsTableLoading = () => (
  <div className={`${MANAGE_CARD_CLASS} overflow-hidden`}>
    {Array.from({ length: 5 }, (_, i) => (
      <div
        key={i}
        className={`${notificationsGridClassName} items-center border-b border-grey-moss-50 px-4 py-3 last:border-b-0 md:px-6`}
      >
        <Skeleton className="h-4 w-48" />
        <div className="flex items-center gap-3">
          <Skeleton className="size-9 rounded-[10px]" />
          <Skeleton className="h-4 w-32" />
        </div>
        <Skeleton className="hidden h-4 w-32 lg:block" />
      </div>
    ))}
  </div>
);

export default NotificationsTableLoading;
