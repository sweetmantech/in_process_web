import Image from "next/image";
import { cn } from "@/lib/utils";
import { useWindowScrolled } from "@/hooks/useWindowScrolled";

const MobileHeader = () => {
  const isScrolled = useWindowScrolled();

  return (
    <div
      className={cn(
        "sticky top-0 z-30 flex items-center justify-between px-[22px] py-4 backdrop-blur-md transition-colors duration-200",
        isScrolled ? "bg-white" : "bg-transparent"
      )}
    >
      <div className="relative h-[22px] w-[97px]">
        <Image src="/logo.svg" alt="in process" fill />
      </div>
      <div className="flex items-center gap-3">
        <a
          href="https://x.com/stayinprocess"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="X"
        >
          <Image src="/images/x.svg" alt="X" width={20} height={20} />
        </a>
        <a
          href="https://farcaster.xyz/~/channel/inprocess"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Farcaster"
        >
          <Image src="/images/farcaster.svg" alt="Farcaster" width={20} height={20} />
        </a>
      </div>
    </div>
  );
};

export default MobileHeader;
