"use client";

import { House, Search, Bell, User } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import NotificationCountBadge from "@/components/Header/NotificationCountBadge";

const MobileTabBar = () => {
  const { push } = useRouter();
  const pathname = usePathname();

  return (
    <div className="flex h-[74px] flex-none items-center justify-around border-t border-[#EDEAE2] bg-white/[0.92] px-[30px] backdrop-blur-md">
      <button type="button" onClick={() => push("/")}>
        <House
          className="h-[23px] w-[23px]"
          strokeWidth={1.75}
          color={pathname === "/" ? "#1B1504" : "#B6B2A8"}
        />
      </button>
      <button type="button">
        <Search className="h-[23px] w-[23px] text-[#B6B2A8]" strokeWidth={1.75} />
      </button>
      <button type="button" onClick={() => push("/notifications")} className="relative">
        <Bell className="h-[23px] w-[23px] text-[#B6B2A8]" strokeWidth={1.75} />
        <NotificationCountBadge />
      </button>
      <button type="button" onClick={() => push("/manage/account")}>
        <User className="h-[23px] w-[23px] text-[#B6B2A8]" strokeWidth={1.75} />
      </button>
    </div>
  );
};

export default MobileTabBar;
