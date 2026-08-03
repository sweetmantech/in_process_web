import type { CollectedItem } from "./types";

const NETWORKS = [
  { name: "Ethereum" as const, currency: "ETH", dot: "#8a92b2", rate: 3200 },
  { name: "Solana" as const, currency: "SOL", dot: "#14c98e", rate: 150 },
  { name: "Polygon" as const, currency: "MATIC", dot: "#8247e5", rate: 0.6 },
  { name: "Base" as const, currency: "ETH", dot: "#0052ff", rate: 3200 },
  { name: "Bitcoin" as const, currency: "BTC", dot: "#f7931a", rate: 62000 },
];

const TITLES = [
  "debug newbie in farcaster",
  "river",
  "morning shelf",
  "venue plan",
  "diamond schema",
  "coastal cliff",
  "untitled reel",
  "pale circuit",
  "ghost meridian",
  "terminal bloom",
  "static hymn",
  "velvet decay",
  "copper halo",
  "nightingale",
  "signal lost",
  "amber rift",
  "dust & ether",
  "neon fossil",
  "marble void",
  "iron lullaby",
  "solvent dreams",
  "fractured light",
  "chroma vault",
  "silent protocol",
];

const COLLECTIONS = [
  "khushaal zindagi",
  "redesign collection manage page",
  "ephemera",
  "pale circuits",
  "terminal series",
  "vault genesis",
];

const CREATORS = [
  "ziad",
  "luma.eth",
  "K. Okonkwo",
  "Rei Tanaka",
  "glitchwitch",
  "M. Álvarez",
  "Sable",
  "anon 0x9f",
];

const HEIGHTS = [300, 210, 246, 184, 268, 196, 320, 232, 204, 278, 222, 258];

const TYPES = [
  "Image",
  "Image",
  "Image",
  "Video",
  "Image",
  "PDF",
  "Video",
  "Image",
  "Image",
  "Other",
  "Image",
  "PDF",
] as const;

export const mockCollectedItems: CollectedItem[] = Array.from({ length: 24 }, (_, i) => {
  const network = NETWORKS[i % NETWORKS.length];
  const price = Math.round((0.15 + ((i * 37) % 90) / 16) * 100) / 100;
  const year = [2025, 2026][i % 2];
  const month = 1 + ((i * 7) % 12);
  const day = 1 + ((i * 13) % 27);

  return {
    id: i,
    contentType: TYPES[i % TYPES.length],
    title: TITLES[i % TITLES.length],
    collection: COLLECTIONS[i % COLLECTIONS.length],
    creator: CREATORS[i % CREATORS.length],
    network: network.name,
    currency: network.currency,
    networkDot: network.dot,
    price,
    usd: price * network.rate,
    acquiredAt: Date.UTC(year, month - 1, day),
    acquiredLabel: `${month}/${day}/${year}`,
    hue: (i * 53) % 360,
    height: HEIGHTS[i % HEIGHTS.length],
    tokenNumber: 1 + ((i * 673) % 95),
  };
});
