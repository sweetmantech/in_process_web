"use client";

import dynamic from "next/dynamic";
import Logo from "../Logo";
import { useLayoutProvider } from "@/providers/LayoutProvider";
import ArtistSearch from "../ArtistSearch";

const HeaderAuthSection = dynamic(() => import("./HeaderAuthSection"), { ssr: false });

const DesktopHeader = () => {
  const { menuRef } = useLayoutProvider();

  return (
    <div className="sticky top-0 z-20 w-screen border-b border-grey-moss-100 bg-white/[.82] backdrop-blur-md">
      <div className="flex items-center gap-7 px-10 py-3.5">
        <Logo />
        <div className="flex-1" />
        <div className="flex items-center gap-3.5" ref={menuRef}>
          <ArtistSearch />
          <HeaderAuthSection />
        </div>
      </div>
    </div>
  );
};

export default DesktopHeader;
