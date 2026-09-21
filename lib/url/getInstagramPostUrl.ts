const INSTAGRAM_HOSTNAMES = new Set(["instagram.com", "www.instagram.com"]);
const INSTAGRAM_POST_TYPES = new Set(["p", "reel", "reels", "tv"]);

export const getInstagramPostUrl = (url: string): string | null => {
  try {
    const parsed = new URL(url);
    if (!INSTAGRAM_HOSTNAMES.has(parsed.hostname)) return null;

    const parts = parsed.pathname.split("/").filter(Boolean);
    const typeIdx = parts.findIndex((part) => INSTAGRAM_POST_TYPES.has(part));
    const shortcode = typeIdx !== -1 ? parts[typeIdx + 1] : undefined;
    if (!shortcode) return null;

    const type = parts[typeIdx] === "reels" ? "reel" : parts[typeIdx];
    return `https://www.instagram.com/${type}/${shortcode}/`;
  } catch {
    return null;
  }
};
