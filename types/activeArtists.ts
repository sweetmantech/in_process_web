export interface ActiveArtistStats {
  address: string;
  username: string | null;
  created_count: number;
  airdropped_count: number;
  telegram_count: number;
  web_count: number;
  api_count: number;
  sms_count: number;
}

export interface ActiveArtistsResponse {
  data: ActiveArtistStats[];
  total_count: number;
  page: number;
  total_pages: number;
}

export type ActiveArtistsSortBy =
  | "created_count"
  | "airdropped_count"
  | "telegram_count"
  | "web_count"
  | "api_count"
  | "sms_count";

export type ActiveArtistsSortOrder = "asc" | "desc";
