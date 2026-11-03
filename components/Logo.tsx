"use client";

import useIsMobile from "@/hooks/useIsMobile";
import { useLayoutProvider } from "@/providers/LayoutProvider";
import LogoIcon from "@/components/Icons/LogoIcon";
import { useRouter } from "next/navigation";
import OpenInNewTabMenu from "@/components/OpenInNewTabMenu";

interface LogoProps {
  className?: string;
}
const Logo = ({ className = "" }: LogoProps) => {
  const { push } = useRouter();
  const isMobile = useIsMobile();
  const { isOpenNavbar } = useLayoutProvider();

  return (
    <OpenInNewTabMenu href="/">
      <button
        className={`relative h-[18px] w-[80px] md:h-[29px] md:w-[128px] ${className}`}
        type="button"
        onClick={() => push("/")}
      >
        <LogoIcon
          role="img"
          aria-label="in process"
          className={`absolute inset-0 size-full ${isOpenNavbar && isMobile ? "text-[#FEFEFE]" : "text-[#1B1504]"}`}
        />
      </button>
    </OpenInNewTabMenu>
  );
};

export default Logo;
