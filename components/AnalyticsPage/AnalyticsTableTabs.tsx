"use client";

import AnalyticsTableTabButton from "./AnalyticsTableTabButton";

export type AnalyticsTableTabId =
  | "active-artists"
  | "collectors"
  | "artists-collectors"
  | "arweave";

type TabCounts = Partial<Record<AnalyticsTableTabId, number>>;

type Props = {
  activeTab: AnalyticsTableTabId;
  onChange: (tab: AnalyticsTableTabId) => void;
  counts?: TabCounts;
};

const TAB_ITEMS: { id: AnalyticsTableTabId; label: string }[] = [
  { id: "active-artists", label: "Active Artists" },
  { id: "collectors", label: "Collectors" },
  { id: "artists-collectors", label: "Artists & Collectors" },
  { id: "arweave", label: "Arweave Expenses" },
];

const AnalyticsTableTabs = ({ activeTab, onChange, counts }: Props) => (
  <div className="flex flex-wrap gap-1 border-b border-[#E4E0D7] pb-1">
    {TAB_ITEMS.map(({ id, label }) => (
      <AnalyticsTableTabButton
        key={id}
        label={label}
        count={counts?.[id]}
        active={activeTab === id}
        onClick={() => onChange(id)}
      />
    ))}
  </div>
);

export default AnalyticsTableTabs;
