"use client";

import { useAnalyticsProvider } from "@/providers/AnalyticsProvider";
import type { AnalyticsTableTabId } from "@/types/analyticsStats";
import AnalyticsTableTabButton from "./AnalyticsTableTabButton";

export type { AnalyticsTableTabId };

const TAB_ITEMS: { id: AnalyticsTableTabId; label: string }[] = [
  { id: "active-artists", label: "Active Artists" },
  { id: "collectors", label: "Collectors" },
  { id: "artists-collectors", label: "Artists & Collectors" },
  { id: "arweave", label: "Arweave Expenses" },
];

const AnalyticsTableTabs = () => {
  const { activeTab, setActiveTab, tabCounts } = useAnalyticsProvider();

  return (
    <div className="flex flex-wrap gap-1 border-b border-[#E4E0D7] pb-1">
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
