import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { useWindowScrolled } from "@/hooks/useWindowScrolled";
import useMobileHeaderMenu from "@/hooks/useMobileHeaderMenu";
import MobileHeaderMenu from "./MobileHeaderMenu";

const MobileHeader = () => {
  const { isOpen, toggle, close } = useMobileHeaderMenu();
  const isScrolled = useWindowScrolled();

  return (
    <header className="fixed left-0 right-0 top-0 z-30">
      <div className="h-[env(safe-area-inset-top,0px)] bg-white" />
      <div
        className={cn(
          "backdrop-blur-md transition-colors duration-200",
          isScrolled ? "bg-white" : "bg-transparent"
        )}
      >
        <div className="flex items-center justify-between px-[22px] py-4">
          <Link href="/" className="relative block h-[22px] w-[97px]">
            <Image src="/logo.svg" alt="in process" fill />
          </Link>
          <button
            type="button"
            aria-label="more"
            onClick={toggle}
            className="flex size-8 items-center justify-center text-grey-moss-900"
          >
            <Menu className="size-5" strokeWidth={1.75} />
          </button>
        </div>
      </div>

      {isOpen && (
        <>
          <div className="fixed inset-0" onClick={close} />
          <MobileHeaderMenu onNavigate={close} />
        </>
      )}
    </header>
  );
};

export default MobileHeader;
