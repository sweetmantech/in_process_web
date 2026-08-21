import type {
  ChainFilter,
  ContentTypeFilter,
  PeriodFilter,
  ProtocolFilter,
} from "@/lib/timeline/timelineFilters";
import type { Address } from "viem";

export type ProfileView = "timeline" | "collected";

export type ArtistFiltersProps = {
  address: Address;
  view: ProfileView;
  protocol: ProtocolFilter;
  contentType: ContentTypeFilter;
  period: PeriodFilter;
  chain: ChainFilter;
  onProtocolChange: (value: ProtocolFilter) => void;
  onContentTypeChange: (value: ContentTypeFilter) => void;
  onPeriodChange: (value: PeriodFilter) => void;
  onChainChange: (value: ChainFilter) => void;
};

export type FilterSelectProps<T extends string> = {
  label: string;
  value: T;
  options: { label: T; displayLabel: string }[];
  onChange: (value: T) => void;
  withChainLogo?: boolean;
  /** Overrides default active style (value !== "All"). */
  active?: boolean;
};
