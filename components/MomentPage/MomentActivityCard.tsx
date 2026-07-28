"use client";

import { useState } from "react";
import Comments from "./Comments";
import { useMomentTransfersProvider } from "@/providers/MomentCollectorsProvider";
import { useMomentProvider } from "@/providers/MomentProvider";
import TransferItem from "./TransferItem";
import FetchMore from "../FetchMore";
import { Protocol } from "@/types/moment";
import { cn } from "@/lib/utils";

type ActivityTab = "comments" | "collectors";

const MomentActivityCard = () => {
  const { protocol } = useMomentProvider();
  const showComments = protocol === Protocol.InProcess;
  const [tab, setTab] = useState<ActivityTab>("comments");
  const activeTab: ActivityTab = showComments ? tab : "collectors";
  const { transfers, isLoading, hasMore, fetchMore } = useMomentTransfersProvider();
  const collectorCount = transfers.length;

  const tabs = [
    ...(showComments ? [{ key: "comments" as const, label: "comments" }] : []),
    {
      key: "collectors" as const,
      label: `collectors (${collectorCount}${hasMore ? "+" : ""})`,
    },
  ];

  return (
    <div className="overflow-hidden rounded-[10px] border border-[#E4E0D7] bg-white shadow-[0_4px_16px_-6px_rgba(27,21,4,.14)]">
      <div className="flex items-center gap-1 border-b border-[#DDD8CC] px-2">
        {tabs.map(({ key, label }) => {
          const active = activeTab === key;
          return (
            <button
              key={key}
              type="button"
              onClick={() => setTab(key)}
              className={cn(
                "-mb-px border-b-2 px-3 pb-[13px] pt-3.5 font-archivo text-xs uppercase tracking-[0.06em] transition-colors hover:text-grey-moss-900",
                active
                  ? "border-grey-moss-900 font-archivo-bold text-grey-moss-900"
                  : "border-transparent font-archivo-medium text-[#6B6456]"
              )}
            >
              {label}
            </button>
          );
        })}
      </div>

      {activeTab === "comments" && showComments && <Comments />}

      {activeTab === "collectors" && (
        <div className="flex max-h-[360px] flex-col overflow-y-auto px-3 py-1.5">
          {isLoading || transfers.length === 0 ? (
            <p className="px-2 py-6 font-archivo text-sm text-[#8B8474]">no collectors yet</p>
          ) : (
            <>
              {transfers.map((c) => (
                <TransferItem key={c.id} {...c} />
              ))}
              {hasMore && <FetchMore fetchMore={() => fetchMore()} />}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default MomentActivityCard;
