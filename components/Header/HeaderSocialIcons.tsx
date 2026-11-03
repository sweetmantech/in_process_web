import XIcon from "@/components/Icons/XIcon";
import FarcasterIcon from "@/components/Icons/FarcasterIcon";

const HeaderSocialIcons = () => (
  <div className="flex items-center gap-2">
    <a href="https://x.com/stayinprocess" target="_blank" rel="noopener noreferrer" aria-label="X">
      <XIcon width={22} height={22} />
    </a>
    <a
      href="https://farcaster.xyz/~/channel/inprocess"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Farcaster"
    >
      <FarcasterIcon width={22} height={22} />
    </a>
  </div>
);

export default HeaderSocialIcons;
