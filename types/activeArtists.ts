export interface ActiveArtistStats {
  artist_id: string;
  username: string | null;
  wallets: { address: string; type: string }[];
  created_count: number;
  airdropped_count: number;
  telegram_count: number;
  web_count: number;
  api_count: number;
  sms_count: number;
}

export interface ActiveArtistsResponse {
  artists: ActiveArtistStats[];
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
