"use client";

import { Bell } from "lucide-react";
import { useRouter } from "next/navigation";
import NotificationCountBadge from "./NotificationCountBadge";

const NotificationButton = () => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push("/notifications")}
      type="button"
      className="relative rounded-full p-2 text-grey-moss-900 transition-colors hover:bg-grey-moss-50"
      aria-label="View notifications"
    >
      <Bell className="h-5 w-5" strokeWidth={1.75} />
      <NotificationCountBadge />
    </button>
  );
};

export default NotificationButton;
