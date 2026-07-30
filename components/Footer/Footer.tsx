"use client";

import { House, Plus } from "lucide-react";
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
  const isHomePage = pathname === "/";

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[60] border-t border-[#EDEAE2] bg-white pb-[env(safe-area-inset-bottom,0px)]">
      <div className="relative flex h-[74px] items-center justify-between px-8">
        {primaryWallet ? (
          <>
            <SearchDrawer />
            <NotificationButton onClick={closeDrawer} />
          </>
        ) : (
          <>
            <button
              type="button"
              aria-label="Home"
              onClick={() => {
                closeDrawer();
                push("/");
              }}
            >
              <House
                className="h-[23px] w-[23px]"
                strokeWidth={1.75}
                color={isHomePage ? "#1B1504" : "#B6B2A8"}
              />
            </button>
            <SearchDrawer />
          </>
        )}

        <span className="w-20 shrink-0" aria-hidden />

        <button
          type="button"
          aria-label="Create"
          onClick={() => {
            closeDrawer();
            push("/create");
          }}
          className={cn(
            "absolute left-1/2 top-0 z-10 flex h-20 w-20 -translate-x-1/2 -translate-y-[26%] items-center justify-center rounded-full border-4 border-white shadow-[0_4px_14px_-4px_rgba(27,21,4,.35)] transition-opacity active:opacity-80",
            isCreatePage ? "bg-tan-gold text-white" : "bg-grey-moss-900 text-white"
          )}
        >
          <Plus className="h-9 w-9" strokeWidth={2} />
        </button>

        <FeedbackDrawer />
        <UserDrawer />
      </div>
    </div>
  );
};

export default Footer;
