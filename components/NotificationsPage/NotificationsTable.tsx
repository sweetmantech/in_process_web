"use client";

import { useNotificationsProvider } from "@/providers/NotificationsProvider";
import NotificationsTableLoading from "./NotificationsTableLoading";
import NotificationsTableError from "./NotificationsTableError";
import NoNotificationsFound from "./NoNotificationsFound";
import NotificationsTableContents from "./NotificationsTableContents";

const NotificationsTable = () => {
  const {
    notifications: { data, isLoading, error },
  } = useNotificationsProvider();

  if (isLoading) return <NotificationsTableLoading />;
  if (error) return <NotificationsTableError error={error} />;

  const notifications = data?.notifications || [];

  return (
    <>
      <section className="flex items-center justify-end border-b border-grey-moss-200 pb-2.5">
        <span className="text-xs text-grey-moss-300">{notifications.length} notifications</span>
      </section>
      {notifications.length === 0 ? (
        <NoNotificationsFound />
      ) : (
        <NotificationsTableContents notifications={notifications} />
      )}
    </>
  );
};

export default NotificationsTable;
