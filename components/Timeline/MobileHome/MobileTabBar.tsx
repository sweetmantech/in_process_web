"use client";

import { House, Search, Bell } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import NotificationCountBadge from "@/components/Header/NotificationCountBadge";
import MobileUserDrawer from "./MobileUserDrawer";
import MobileFeedbackDrawer from "./MobileFeedbackDrawer";

const MobileTabBar = () => {
  const { push } = useRouter();
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[60] flex h-[74px] items-center justify-around border-t border-[#EDEAE2] bg-white/[0.92] px-[30px] backdrop-blur-md">
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
      <MobileFeedbackDrawer />
      <MobileUserDrawer />
    </div>
  );
};

export default MobileTabBar;
