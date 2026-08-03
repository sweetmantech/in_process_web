import type { CollectedItem } from "./types";
import type { CSSProperties } from "react";

export function getCollectedArtStyle(
  item: CollectedItem,
  heightPx?: number
): CSSProperties {
  const c1 = `hsl(${item.hue}, 58%, 56%)`;
  const c2 = `hsl(${(item.hue + 55) % 360}, 52%, 32%)`;
  return {
    height: `${heightPx ?? item.height}px`,
    background: `repeating-linear-gradient(48deg, rgba(255,255,255,0.06) 0 15px, transparent 15px 30px), radial-gradient(120% 90% at 20% 12%, ${c1}, ${c2})`,
    position: "relative",
    borderTopLeftRadius: "11px",
    borderTopRightRadius: "11px",
  };
}

export function formatCollectedUsd(value: number): string {
  if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`;
  return `$${(value / 1000).toFixed(1)}K`;
}
