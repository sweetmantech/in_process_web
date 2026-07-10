"use client";

import dynamic from "next/dynamic";
import Logo from "../Logo";
import { useLayoutProvider } from "@/providers/LayoutProvider";
import SearchModal from "../ArtistSearch/SearchModal";
import HeaderNavLinks from "./HeaderNavLinks";
import HeaderSocialIcons from "./HeaderSocialIcons";
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
          ? "border-b border-[#E4E0D7] bg-white/[.82] backdrop-blur-[14px]"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <div className="flex items-center gap-7 px-10 py-3.5">
        <Logo />
        <div className="flex-1" />
        <div className="flex items-center gap-5" ref={menuRef}>
          <HeaderNavLinks />
          <div className={cn("h-4 w-px", isScrolled ? "bg-[#E4E0D7]" : "bg-grey-moss-900/20")} />
          <HeaderSocialIcons />
          <div className={cn("h-4 w-px", isScrolled ? "bg-[#E4E0D7]" : "bg-grey-moss-900/20")} />
          <div className="flex items-center gap-4">
            <SearchModal />
            <HeaderActions />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesktopHeader;
