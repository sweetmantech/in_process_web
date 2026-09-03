import analyticsTableAvatarBg from "@/lib/analytics/analyticsTableAvatarBg";
import truncateAddress from "@/lib/utils/truncateAddress";
import Link from "next/link";

const initialFromName = (name: string) =>
  name
    .replace(/[^A-Za-z0-9]/g, "")
    .charAt(0)
    .toUpperCase() || "·";

type Props = {
  name: string;
  href?: string;
};

const AnalyticsTableArtistCell = ({ name, href }: Props) => {
  const label = name.startsWith("0x") ? truncateAddress(name) : name;
  const inner = (
    <>
      <span
        className="flex size-[26px] shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white"
        style={{ background: analyticsTableAvatarBg(name) }}
      >
        {initialFromName(name)}
      </span>
      <span className="text-sm font-medium text-[#1B1504]">{label}</span>
    </>
  );

  if (!href) {
    return <div className="flex items-center gap-[11px]">{inner}</div>;
  }

  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-[11px] hover:underline"
      onClick={(event) => event.stopPropagation()}
    >
      {inner}
    </Link>
  );
};

export default AnalyticsTableArtistCell;
