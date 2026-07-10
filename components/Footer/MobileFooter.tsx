"use client";

import { House } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import NotificationButton from "@/components/NotificationButton";
import { useMobileDrawersProvider } from "@/providers/MobileDrawersProvider";
import { useWalletsProvider } from "@/providers/WalletsProvider";
import MobileUserDrawer from "@/components/Footer/MobileUserDrawer";
import MobileFeedbackDrawer from "@/components/Footer/MobileFeedbackDrawer";
import MobileSearchDrawer from "@/components/Footer/MobileSearchDrawer";

const MobileFooter = () => {
  const { push } = useRouter();
  const pathname = usePathname();
  const { closeDrawer } = useMobileDrawersProvider();
  const { primaryWallet } = useWalletsProvider();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[60] border-t border-[#EDEAE2] bg-white pb-[env(safe-area-inset-bottom,0px)]">
      <div className="flex h-[74px] items-center justify-around px-[30px]">
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
        {primaryWallet && <NotificationButton onClick={closeDrawer} />}
        <MobileFeedbackDrawer />
        <MobileUserDrawer />
      </div>
    </div>
  );
};

export default MobileFooter;
