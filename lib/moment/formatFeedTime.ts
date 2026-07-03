export const formatFeedTime = (iso: string): string => {
  const created = new Date(iso);
  const diffSec = Math.floor((Date.now() - created.getTime()) / 1000);
  if (diffSec < 60) return "now";
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin}m`;
  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `${diffHr}h`;
  const diffDay = Math.floor(diffHr / 24);
  if (diffDay < 7) return `${diffDay}d`;
  return created.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};
