import type { InProcessNotification } from "@/types/notification";
import { notificationsGridClassName } from "@/lib/notifications/notificationsGridClassName";
import { MANAGE_CARD_CLASS } from "@/lib/utils/classNames";
import NotificationRow from "./NotificationRow";

interface NotificationsTableContentsProps {
  notifications: InProcessNotification[];
}

const NotificationsTableContents = ({ notifications }: NotificationsTableContentsProps) => (
  <div className={`${MANAGE_CARD_CLASS} overflow-hidden`}>
    <div
      className={`${notificationsGridClassName} border-b border-grey-moss-50 px-4 py-3 text-[10px] uppercase tracking-[0.1em] text-grey-moss-300 md:px-6`}
    >
      <span>notification</span>
      <span>moment</span>
      <span className="hidden lg:block">time</span>
    </div>
    {notifications.map((notification) => (
      <NotificationRow key={notification.id} notification={notification} />
    ))}
  </div>
);

export default NotificationsTableContents;
