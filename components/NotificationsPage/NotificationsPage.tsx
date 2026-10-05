"use client";

import NotificationsTable from "@/components/NotificationsPage/NotificationsTable";
import { useWalletsProvider } from "@/providers/WalletsProvider";
import useMarkNotificationAsViewed from "@/hooks/useMarkNotificationAsViewed";

const NotificationsPage = () => {
  const { primaryWallet } = useWalletsProvider();
  useMarkNotificationAsViewed();

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-4 pb-6 pt-8 font-archivo md:gap-4 md:px-10">
      <div className="mb-2">
        <h1 className="font-archivo-medium text-2xl text-grey-moss-900 md:text-3xl">
          notifications
        </h1>
        <p className="mt-1 text-sm text-grey-moss-300">
          {primaryWallet
            ? "your notifications on in process"
            : "view all notifications on in process"}
        </p>
      </div>
      <NotificationsTable />
    </main>
  );
};

export default NotificationsPage;
