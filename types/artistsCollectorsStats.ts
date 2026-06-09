export interface ArtistsCollectorsStats {
  artist_id: string;
  username: string;
  wallets: { address: string; type: string }[];
  total_created_count: number;
  total_collected_count: number;
}

export interface ArtistsCollectorsStatsResponse {
  artists: ArtistsCollectorsStats[];
  total_count: number;
  page: number;
  total_pages: number;
}

export type ArtistsCollectorsStatsSortBy = "total_created_count" | "total_collected_count";
export type ArtistsCollectorsStatsSortOrder = "asc" | "desc";
