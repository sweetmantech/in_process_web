"use client";

import { Plus } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import NotificationButton from "@/components/NotificationButton";
import { useMobileDrawersProvider } from "@/providers/MobileDrawersProvider";
import { useWalletsProvider } from "@/providers/WalletsProvider";
import UserDrawer from "@/components/Footer/UserDrawer";
import FeedbackDrawer from "@/components/Footer/FeedbackDrawer";
import SearchDrawer from "@/components/ArtistSearch/SearchDrawer";
import { cn } from "@/lib/utils";

const Footer = () => {
  const { push } = useRouter();
  const pathname = usePathname();
  const { closeDrawer } = useMobileDrawersProvider();
  const { primaryWallet } = useWalletsProvider();
  const isCreatePage = pathname.startsWith("/create");

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[60] border-t border-[#EDEAE2] bg-white pb-[env(safe-area-inset-bottom,0px)]">
      <div className="relative flex h-[74px] items-center px-5">
        <div className="flex flex-1 items-center justify-evenly">
          <SearchDrawer />
          {primaryWallet ? (
            <NotificationButton onClick={closeDrawer} />
          ) : (
            <span className="inline-block h-[23px] w-[23px]" aria-hidden />
          )}
        </div>

        <button
          type="button"
          aria-label="Create"
          onClick={() => {
            closeDrawer();
            push("/create");
          }}
          className={cn(
            "absolute left-1/2 top-0 z-10 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full shadow-[0_4px_14px_-4px_rgba(27,21,4,.35)] transition-opacity active:opacity-80",
            isCreatePage ? "bg-tan-gold text-white" : "bg-grey-moss-900 text-white"
          )}
        >
          <Plus className="h-7 w-7" strokeWidth={2.25} />
        </button>

        <div className="flex flex-1 items-center justify-evenly">
          <FeedbackDrawer />
          <UserDrawer />
        </div>
      </div>
    </div>
  );
};

export default Footer;
