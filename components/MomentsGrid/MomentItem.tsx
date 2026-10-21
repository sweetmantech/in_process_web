import truncateAddress from "@/lib/utils/truncateAddress";
import { usePathname, useRouter } from "next/navigation";
import truncated from "@/lib/utils/truncated";
import HideButton from "@/components/TimelineMoments/HideButton";
import { type TimelineMoment } from "@/types/moment";
import { ArrowUpRight } from "lucide-react";
import Preview from "./Preview";
import useCanHideMoment from "@/hooks/useCanHideMoment";
import GridCard from "./GridCard";

import ProtocolBadge from "./ProtocolBadge";
import ChainLogo from "./ChainLogo";
import { getShortNameFromChainId } from "@/lib/zora/getShortNameFromChainId";

interface MomentItemProps {
  m: TimelineMoment;
}

const MomentItem = ({ m }: MomentItemProps) => {
  const data = m.metadata;
  const hasName = Boolean(data?.name?.trim());
  const { push } = useRouter();
  const canHideMoment = useCanHideMoment(m);
  const pathname = usePathname();
  const isManagePage = pathname.includes("/manage");

  const shortName = getShortNameFromChainId(m.chain_id);
  const momentHref = shortName
    ? `/${isManagePage ? "manage" : "collect"}/${shortName}:${m.address}/${m.token_id}`
    : undefined;

  const handleViewCollection = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!shortName) return;
    const base = isManagePage ? "manage" : "collection";
    push(`/${base}/${shortName}:${m.address}`);
  };

  return (
    <GridCard
      href={momentHref}
      media={
        <>
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
        </>
      }
    >
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
        <span className="uppercase pointer-events-none absolute right-0 top-full z-10 mt-1.5 hidden items-center gap-1 whitespace-nowrap rounded-lg bg-grey-moss-900 px-2.5 py-1.5 font-archivo text-[10.5px] text-white shadow-lg group-hover/link:flex">
          {isManagePage ? "manage collection" : "open collection timeline"}
          <ArrowUpRight className="size-3" />
        </span>
      </button>
    </GridCard>
  );
};

export default MomentItem;
