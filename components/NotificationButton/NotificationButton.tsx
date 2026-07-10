"use client";

import { Bell } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import NotificationCountBadge from "./NotificationCountBadge";
import { cn } from "@/lib/utils";

interface NotificationButtonProps {
  onClick?: () => void;
}

const NotificationButton = ({ onClick }: NotificationButtonProps) => {
  const { push } = useRouter();
  const pathname = usePathname();
  const isNotificationsPage = pathname === "/notifications";

  return (
    <button
      onClick={() => {
        onClick?.();
        push("/notifications");
      }}
      type="button"
      className="relative md:flex md:items-center"
      aria-label="View notifications"
    >
      <Bell
        className={cn(
          "h-[23px] w-[23px] text-[#B6B2A8] md:h-5 md:w-5 md:text-grey-moss-900",
          isNotificationsPage && "!text-grey-moss-900"
        )}
        strokeWidth={1.75}
      />
      <NotificationCountBadge />
    </button>
  );
};

export default NotificationButton;
