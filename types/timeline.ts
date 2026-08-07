import { TimelineMoment } from "@/types/moment";

export interface TimelineResponse {
  status: "success" | "error";
  moments: TimelineMoment[];
  pagination: {
    page: number;
    limit: number;
    total_pages: number;
  };
  message?: string;
}

export type AnalyticsPeriod = "day" | "week" | "month" | "all";
export type AnalyticsChannel = "telegram" | "sms" | "web" | "api";
export type AnalyticsContentType = "audio" | "image" | "video";
export type TimelineProtocol = "in_process" | "catalog" | "sound.xyz" | "zora_media" | "zora";

export interface AnalyticsFilters {
  period?: AnalyticsPeriod;
  channel?: AnalyticsChannel;
  artist?: string;
  contentType?: AnalyticsContentType;
}

export interface UseTimelineParams {
  page?: number;
  limit?: number;
  enabled?: boolean;
  artistAddress?: string;
  collection?: string;
  includeHidden?: boolean;
  type?: "mutual" | "default";
  chainId?: number;
  period?: AnalyticsPeriod;
  channel?: AnalyticsChannel;
  contentType?: AnalyticsContentType;
  protocol?: TimelineProtocol;
  curated?: boolean;
}

export interface FetchTimelineParams {
  page?: number;
  limit?: number;
  artistAddress?: string;
  collection?: string;
  includeHidden?: boolean;
  type?: "mutual" | "default";
  chainId?: number;
  period?: AnalyticsPeriod;
  channel?: AnalyticsChannel;
  contentType?: AnalyticsContentType;
  protocol?: TimelineProtocol;
  curated?: boolean;
}
