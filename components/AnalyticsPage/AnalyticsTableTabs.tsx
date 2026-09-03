"use client";

import { useAnalyticsProvider } from "@/providers/AnalyticsProvider";
import type { AnalyticsTableTabId } from "@/types/analyticsStats";
import AnalyticsTableTabButton from "./AnalyticsTableTabButton";

export type { AnalyticsTableTabId };

const TAB_ITEMS: { id: AnalyticsTableTabId; label: string }[] = [
  { id: "active-artists", label: "Active artists" },
  { id: "collectors", label: "Collectors" },
  { id: "artists-collectors", label: "Artists × collectors" },
  { id: "arweave", label: "Arweave expenses" },
];

const AnalyticsTableTabs = () => {
  const { activeTab, setActiveTab, tabCounts } = useAnalyticsProvider();

  return (
    <div className="flex items-center gap-0.5 overflow-x-auto border-b border-[#EDEAE2] px-2 py-1.5">
      {TAB_ITEMS.map(({ id, label }) => (
        <AnalyticsTableTabButton
          key={id}
          label={label}
          count={tabCounts[id]}
          active={activeTab === id}
          onClick={() => setActiveTab(id)}
        />
      ))}
    </div>
  );
};

export default AnalyticsTableTabs;
