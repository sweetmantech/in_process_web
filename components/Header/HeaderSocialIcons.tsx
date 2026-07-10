import Image from "next/image";

const HeaderSocialIcons = () => (
  <div className="flex items-center gap-2">
    <a href="https://x.com/stayinprocess" target="_blank" rel="noopener noreferrer" aria-label="X">
      <Image src="/images/x.svg" alt="X icon" width={22} height={22} />
    </a>
    <a
      href="https://farcaster.xyz/~/channel/inprocess"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Farcaster"
    >
      <Image src="/images/farcaster.svg" alt="Farcaster icon" width={22} height={22} />
    </a>
  </div>
);

export default HeaderSocialIcons;
