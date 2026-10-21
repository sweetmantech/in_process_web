import type { ReactNode } from "react";
import { useRouter } from "next/navigation";
import OpenInNewTabMenu from "@/components/OpenInNewTabMenu";

interface GridCardProps {
  href: string | undefined;
  media: ReactNode;
  children: ReactNode;
}

const GridCard = ({ href, media, children }: GridCardProps) => {
  const { push } = useRouter();

  const handleClick = () => {
    if (href) push(href);
  };

  return (
    <OpenInNewTabMenu href={href}>
      <div
        role="button"
        tabIndex={0}
        className="group relative col-span-1 h-fit w-full cursor-pointer rounded-[10px] border border-[#E4E0D7] bg-white shadow-[0_4px_16px_-6px_rgba(27,21,4,0.12)] transition-shadow duration-150 hover:z-10 hover:shadow-[0_10px_24px_-8px_rgba(27,21,4,0.22)]"
        onClick={handleClick}
        onKeyDown={(e) => e.key === "Enter" && handleClick()}
      >
        <div className="relative aspect-square w-full overflow-hidden rounded-t-[9px] bg-grey-moss-50 will-change-transform">
          {media}
        </div>
        <div className="px-[13px] pb-[13px] pt-3">{children}</div>
      </div>
    </OpenInNewTabMenu>
  );
};

export default GridCard;
