"use client";

import FilterToolbar from "@/components/FilterToolbar";
import type { ContentTypeFilter } from "@/types/collected";

type Tab = { label: ContentTypeFilter; count: number };

type Props = {
  tabs: Tab[];
  active: ContentTypeFilter;
  onChange: (type: ContentTypeFilter) => void;
};

const CollectedToolbar = ({ tabs, active, onChange }: Props) => {
  return <FilterToolbar tabs={tabs} active={active} onChange={onChange} />;
};

export default CollectedToolbar;
