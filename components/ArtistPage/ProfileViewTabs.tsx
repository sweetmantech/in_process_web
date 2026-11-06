"use client";

import { usePathname, useRouter } from "next/navigation";
import FilterSelect from "./FilterSelect";
import type { ProfileView } from "@/types/artistFilters";

type Props = {
  active: ProfileView;
};

const VIEW_OPTIONS: { label: ProfileView; displayLabel: string }[] = [
  { label: "timeline", displayLabel: "Timeline" },
  { label: "collected", displayLabel: "Collected" },
];

const ProfileViewTabs = ({ active }: Props) => {
  const router = useRouter();
  const basePath = `/${usePathname().split("/")[1]}`;

  return (
    <FilterSelect
      label="View"
      value={active}
      options={VIEW_OPTIONS}
      active={false}
      onChange={(view) => {
        router.push(view === "timeline" ? basePath : `${basePath}/collected`);
      }}
    />
  );
};

export default ProfileViewTabs;
