import type { AnalyticsContentType, AnalyticsPeriod } from "@/types/timeline";
import type { TimelineProtocol } from "@/types/timeline";

export type ProtocolFilter = "All" | TimelineProtocol;
export type ContentTypeFilter = "All" | AnalyticsContentType;
export type PeriodFilter = "All" | Exclude<AnalyticsPeriod, "all">;
export type ChainFilter = "All" | "1" | "10" | "8453";

export const PROTOCOL_FILTER_TABS: {
  label: ProtocolFilter;
  displayLabel: string;
}[] = [
  { label: "All", displayLabel: "All" },
  { label: "in_process", displayLabel: "In Process" },
  { label: "catalog", displayLabel: "Catalog" },
  { label: "sound.xyz", displayLabel: "Sound.xyz" },
  { label: "zora_media", displayLabel: "Zora Media" },
  { label: "zora", displayLabel: "Zora" },
];

export const CONTENT_TYPE_FILTER_TABS: {
  label: ContentTypeFilter;
  displayLabel: string;
}[] = [
  { label: "All", displayLabel: "All" },
  { label: "audio", displayLabel: "Audio" },
  { label: "video", displayLabel: "Video" },
  { label: "image", displayLabel: "Image" },
];

export const PERIOD_FILTER_TABS: {
  label: PeriodFilter;
  displayLabel: string;
}[] = [
  { label: "All", displayLabel: "All time" },
  { label: "day", displayLabel: "Last 24h" },
  { label: "week", displayLabel: "Last 7 days" },
  { label: "month", displayLabel: "Last 30 days" },
];

export const CHAIN_FILTER_TABS: {
  label: ChainFilter;
  displayLabel: string;
}[] = [
  { label: "All", displayLabel: "All chains" },
  { label: "8453", displayLabel: "Base" },
  { label: "1", displayLabel: "Ethereum" },
  { label: "10", displayLabel: "Optimism" },
];
