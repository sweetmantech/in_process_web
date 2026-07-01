import Image from "next/image";
import Link from "next/link";

const MobileHeader = () => (
  <header className="fixed top-0 left-0 right-0 z-30 bg-white pt-[env(safe-area-inset-top,0px)]">
    <div className="flex items-center justify-between px-[22px] py-4">
      <Link href="/" className="relative block h-[22px] w-[97px]">
        <Image src="/logo.svg" alt="in process" fill />
      </Link>
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
  </header>
);

export default MobileHeader;
