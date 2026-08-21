"use client";

import FilterSelect from "@/components/ArtistPage/FilterSelect";
import ProfileViewTabs from "@/components/ArtistPage/ProfileViewTabs";
import { CONTENT_TYPE_FILTER_TABS } from "@/lib/timeline/timelineFilters";
import type { ContentTypeFilter } from "@/lib/timeline/timelineFilters";
import type { Address } from "viem";

type Props = {
  address: Address;
  active: ContentTypeFilter;
  onChange: (type: ContentTypeFilter) => void;
};

const CollectedToolbar = ({ address, active, onChange }: Props) => (
  <div className="flex flex-wrap items-center gap-1.5">
    <FilterSelect
      label="Content"
      value={active}
      options={CONTENT_TYPE_FILTER_TABS}
      onChange={onChange}
    />
    <ProfileViewTabs address={address} active="collected" />
  </div>
);

export default CollectedToolbar;
