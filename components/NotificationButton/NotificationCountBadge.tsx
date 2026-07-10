"use client";

import { useNotificationsProvider } from "@/providers/NotificationsProvider";
import { Badge } from "@/components/ui/badge";

const NotificationCountBadge = () => {
  const { unviewedCount } = useNotificationsProvider();

  if (unviewedCount === 0) return null;

  return (
    <Badge
      variant="destructive"
      className="absolute -right-[6px] top-[-10px] flex h-5 w-5 items-center justify-center p-0 text-xs font-bold md:-right-1.5 md:top-[-5px] md:h-[15px] md:w-auto md:min-w-[15px] md:rounded-[8px] md:bg-[#E0322E] md:px-[3px] md:text-[9px] md:leading-[15px] md:text-white"
    >
      {unviewedCount > 99 ? "99+" : unviewedCount}
    </Badge>
  );
};

export default NotificationCountBadge;
