"use client";

import useIsMobile from "@/hooks/useIsMobile";
import DesktopHeader from "./DesktopHeader";
import MobileHeader from "./MobileHeader";

const Header = () => {
  const isMobile = useIsMobile();
  return isMobile ? <MobileHeader /> : <DesktopHeader />;
};

export default Header;
