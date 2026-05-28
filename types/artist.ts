export interface ArtistWallet {
  address: string;
  type?: string | null;
}

export interface ArtistProfilePhone {
  phone_number: string;
  verified: boolean;
}

export interface ArtistProfile {
  id: string;
  username: string | null;
  bio: string | null;
  instagram: string | null;
  x: string | null;
  telegram: string | null;
  phone?: ArtistProfilePhone;
}

export interface Artist {
  id: string;
  username: string | null;
  bio: string | null;
  instagram: string | null;
  x: string | null;
  telegram: string | null;
  wallets: ArtistWallet[];
}

interface ArtistsPagination {
  page: number;
  limit: number;
  total_pages: number;
  total?: number;
}

export interface ArtistsResponse {
  status: string;
  artists: Artist[];
  pagination: ArtistsPagination;
}
