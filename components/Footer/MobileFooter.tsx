"use client";

import { House, Bell } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import NotificationCountBadge from "@/components/Header/NotificationCountBadge";
import { useMobileDrawersProvider } from "@/providers/MobileDrawersProvider";
import MobileUserDrawer from "@/components/Timeline/MobileHome/MobileUserDrawer";
import MobileFeedbackDrawer from "@/components/Timeline/MobileHome/MobileFeedbackDrawer";
import MobileSearchDrawer from "@/components/Timeline/MobileHome/MobileSearchDrawer";

const MobileFooter = () => {
  const { push } = useRouter();
  const pathname = usePathname();
  const { closeDrawer } = useMobileDrawersProvider();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[60] flex h-[74px] items-center justify-around border-t border-[#EDEAE2] bg-white/[0.92] px-[30px] backdrop-blur-md">
      <button
        type="button"
        onClick={() => {
          closeDrawer();
          push("/");
        }}
      >
        <House
          className="h-[23px] w-[23px]"
          strokeWidth={1.75}
          color={pathname === "/" ? "#1B1504" : "#B6B2A8"}
        />
      </button>
      <MobileSearchDrawer />
      <button
        type="button"
        onClick={() => {
          closeDrawer();
          push("/notifications");
        }}
        className="relative"
      >
        <Bell className="h-[23px] w-[23px] text-[#B6B2A8]" strokeWidth={1.75} />
        <NotificationCountBadge className="absolute -right-1 -top-1 flex h-[14px] min-w-[14px] items-center justify-center rounded-full p-0 text-[9px] font-bold leading-none" />
      </button>
      <MobileFeedbackDrawer />
      <MobileUserDrawer />
    </div>
  );
};

export default MobileFooter;
