"use client";

import useIsMobile from "@/hooks/useIsMobile";
import DesktopFooter from "./DesktopFooter";
import MobileFooter from "./MobileFooter";

const Footer = () => {
  const isMobile = useIsMobile();
  return isMobile ? <MobileFooter /> : <DesktopFooter />;
};

export default Footer;
