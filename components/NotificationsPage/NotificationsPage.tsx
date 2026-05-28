"use client";

import NotificationsTable from "@/components/NotificationsPage/NotificationsTable";
import { useWalletsProvider } from "@/providers/WalletsProvider";
import useMarkNotificationAsViewed from "@/hooks/useMarkNotificationAsViewed";

const NotificationsPage = () => {
  const { primaryWallet } = useWalletsProvider();
  useMarkNotificationAsViewed();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="mb-2 font-archivo-medium text-3xl font-bold">Notifications</h1>
          <p className="text-neutral-600 dark:text-neutral-400">
            {primaryWallet
              ? "Your notifications on In Process"
              : "View all notifications on In Process"}
          </p>
        </div>

        <NotificationsTable />
      </div>
    </div>
  );
};

export default NotificationsPage;
