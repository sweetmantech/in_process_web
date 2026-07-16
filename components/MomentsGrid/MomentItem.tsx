import truncateAddress from "@/lib/truncateAddress";
import { usePathname, useRouter } from "next/navigation";
import truncated from "@/lib/truncated";
import HideButton from "@/components/TimelineMoments/HideButton";
import { type TimelineMoment, Protocol } from "@/types/moment";
import { ArrowUpRight } from "lucide-react";
import Preview from "./Preview";
import useCanHideMoment from "@/hooks/useCanHideMoment";

import ProtocolBadge from "./ProtocolBadge";
import ChainLogo from "./ChainLogo";
import { getShortNameFromChainId } from "@/lib/zora/getShortNameFromChainId";

export type MomentItemVariant = "collection" | "moment";

interface MomentItemProps {
  m: TimelineMoment;
  variant?: MomentItemVariant;
}

const MomentItem = ({ m, variant = "collection" }: MomentItemProps) => {
  const data = m.metadata;
  const hasName = Boolean(data?.name?.trim());
  const { push } = useRouter();
  const canHideMoment = useCanHideMoment(m);
  const pathname = usePathname();
  const isManagePage = pathname.includes("/manage");

  const buildPath = (includeTokenId: boolean) => {
    const shortName = getShortNameFromChainId(m.chain_id);
    if (!shortName) return null;
    return `/${isManagePage ? "manage" : "collect"}/${shortName}:${m.address}${includeTokenId ? `/${m.token_id}` : ""}`;
  };

  const handleClick = () => {
    const includeTokenId = variant === "moment" || m.protocol === Protocol.ZoraMedia;
    const path = buildPath(includeTokenId);
    if (path) push(path);
  };

  const handleViewCollection = (e: React.MouseEvent) => {
    e.stopPropagation();
    const path = buildPath(false);
    if (path) push(path);
  };

  return (
    <div
      role="button"
      tabIndex={0}
      className="group relative col-span-1 h-fit w-full cursor-pointer rounded-[10px] border border-[#E4E0D7] bg-white shadow-[0_4px_16px_-6px_rgba(27,21,4,0.12)] transition-shadow duration-150 hover:z-10 hover:shadow-[0_10px_24px_-8px_rgba(27,21,4,0.22)]"
      onClick={handleClick}
      onKeyDown={(e) => e.key === "Enter" && handleClick()}
    >
      <div className="relative aspect-square w-full overflow-hidden rounded-t-[9px] bg-grey-moss-50 will-change-transform">
        <div className="absolute left-2 top-2 z-20">
          <ProtocolBadge protocol={m.protocol} />
        </div>
        {canHideMoment && (
          <div className="absolute right-2 top-2 z-20">
            <HideButton moment={m} />
          </div>
        )}
        {data ? (
          <Preview data={data} />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <p className="font-archivo text-sm text-grey-moss-200">No Preview</p>
          </div>
        )}
      </div>
      <div className="px-[13px] pb-[13px] pt-3">
        <div className="flex items-baseline justify-between gap-2">
          <p
            className={`truncate font-spectral text-[14.5px] leading-[1.3] transition-colors ${hasName ? "text-grey-moss-900 hover:text-tan-gold" : "text-grey-moss-200"}`}
          >
            {data ? (hasName ? truncated(data.name ?? "", 20) : "------") : "Unknown"}
          </p>
          <span className="shrink-0 whitespace-nowrap font-archivo text-[10.5px] text-tan-gold">
            {new Date(m.created_at).toLocaleDateString("en-US")}
          </span>
        </div>
        <button
          type="button"
          onClick={handleViewCollection}
          className="group/link relative mt-[7px] flex w-full items-center justify-between gap-1.5 text-left"
        >
          <ChainLogo chainId={m.chain_id} />
          <span className="min-w-0 truncate text-right font-spectral-italic text-xs text-grey-moss-200">
            <span className="font-archivo text-[11px] text-grey-moss-300">#{m.token_id}</span> in{" "}
            <span className="text-sm text-tan-gold underline decoration-tan-gold underline-offset-[3px] transition-colors group-hover/link:text-grey-moss-900">
              {m.collection?.name?.trim() || truncateAddress(m.address)}
            </span>
          </span>
          <span className="pointer-events-none absolute right-0 top-full z-10 mt-1.5 hidden items-center gap-1 whitespace-nowrap rounded-lg bg-grey-moss-900 px-2.5 py-1.5 font-archivo text-[10.5px] font-semibold text-white shadow-lg group-hover/link:flex">
            view collection
            <ArrowUpRight className="size-3" />
          </span>
        </button>
      </div>
    </div>
  );
};

export default MomentItem;
