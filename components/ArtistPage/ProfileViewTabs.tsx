"use client";

import { useRouter } from "next/navigation";
import { Address } from "viem";
import FilterSelect from "./FilterSelect";
import type { ProfileView } from "@/types/artistFilters";

type Props = {
  address: Address;
  active: ProfileView;
};

const VIEW_OPTIONS: { label: ProfileView; displayLabel: string }[] = [
  { label: "timeline", displayLabel: "Timeline" },
  { label: "collected", displayLabel: "Collected" },
];

const ProfileViewTabs = ({ address, active }: Props) => {
  const router = useRouter();

  return (
    <FilterSelect
      label="View"
      value={active}
      options={VIEW_OPTIONS}
      active={false}
      onChange={(view) => {
        router.push(view === "timeline" ? `/${address}` : `/${address}/collected`);
      }}
    />
  );
};

export default ProfileViewTabs;
