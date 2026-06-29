"use client";

import { useNotificationsProvider } from "@/providers/NotificationsProvider";
import { Badge } from "@/components/ui/badge";

interface NotificationCountBadgeProps {
  className?: string;
}

const NotificationCountBadge = ({ className }: NotificationCountBadgeProps) => {
  const { unviewedCount } = useNotificationsProvider();

  if (unviewedCount === 0) return null;

  return (
    <Badge
      variant="destructive"
      className={
        className ??
        "absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center p-0 text-xs font-bold"
      }
    >
      {unviewedCount > 99 ? "99+" : unviewedCount}
    </Badge>
  );
};

export default NotificationCountBadge;
