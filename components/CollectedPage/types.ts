export type CollectedContentType = "Image" | "Video" | "PDF" | "Other";

export type CollectedNetwork = "Ethereum" | "Solana" | "Polygon" | "Base" | "Bitcoin";

export type CollectedItem = {
  id: number;
  contentType: CollectedContentType;
  title: string;
  collection: string;
  creator: string;
  network: CollectedNetwork;
  currency: string;
  networkDot: string;
  price: number;
  usd: number;
  acquiredAt: number;
  acquiredLabel: string;
  hue: number;
  height: number;
  tokenNumber: number;
};

export type CollectedSort = "recent" | "oldest" | "phigh" | "plow";

export type ContentTypeFilter = "All" | CollectedContentType;
