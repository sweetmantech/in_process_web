export interface ActiveArtistStats {
  address: string;
  username: string | null;
  moments_created: number;
  airdropped: number;
  telegram_count: number;
  web_count: number;
  api_count: number;
  sms_count?: number;
}

export interface ActiveArtistsResponse {
  data: ActiveArtistStats[];
  total_count: number;
  page: number;
  total_pages: number;
}
