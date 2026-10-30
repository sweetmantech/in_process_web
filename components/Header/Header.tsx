"use client";

import MobileOnly from "@/components/Responsive/MobileOnly";
import DesktopOnly from "@/components/Responsive/DesktopOnly";
import DesktopHeader from "./DesktopHeader";
import MobileHeader from "./MobileHeader";

const Header = () => (
  <>
    <MobileOnly>
      <MobileHeader />
    </MobileOnly>
    <DesktopOnly>
      <DesktopHeader />
    </DesktopOnly>
  </>
);

export default Header;
