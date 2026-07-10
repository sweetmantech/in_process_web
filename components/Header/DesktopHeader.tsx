"use client";

import dynamic from "next/dynamic";
import Logo from "../Logo";
import { useLayoutProvider } from "@/providers/LayoutProvider";
import SearchModal from "../ArtistSearch/SearchModal";
import { cn } from "@/lib/utils";
import { useWindowScrolled } from "@/hooks/useWindowScrolled";

const HeaderActions = dynamic(() => import("./HeaderActions"), { ssr: false });

const DesktopHeader = () => {
  const { menuRef } = useLayoutProvider();
  const isScrolled = useWindowScrolled();

  return (
    <div
      className={cn(
        "sticky top-0 z-20 w-screen transition-colors duration-200",
        isScrolled
          ? "border-b border-grey-moss-100 bg-white/[.82] backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <div className="flex items-center gap-7 px-10 py-3.5">
        <Logo />
        <div className="flex-1" />
        <div className="flex items-center gap-3.5" ref={menuRef}>
          <SearchModal />
          <HeaderActions />
        </div>
      </div>
    </div>
  );
};

export default DesktopHeader;
