"use client";

import MuxPlayer from "@mux/mux-player-react/lazy";
import type { MuxCSSProperties } from "@mux/mux-player-react";
import type { SyntheticEvent } from "react";

interface MuxVideoContentProps {
  playbackId: string;
  poster?: string;
  aspectRatio?: string;
  variant: "fill" | "natural";
  onError: () => void;
}

// Keep taps on the player controls from triggering the feed card's navigation.
const stopPropagation = (e: SyntheticEvent) => e.stopPropagation();

const FILL_STYLE: MuxCSSProperties = {
  width: "100%",
  height: "100%",
  "--media-object-fit": "contain",
};
const NATURAL_STYLE: MuxCSSProperties = { width: "100%" };

const MuxVideoContent = ({
  playbackId,
  poster,
  aspectRatio,
  variant,
  onError,
}: MuxVideoContentProps) => {
  const isFill = variant === "fill";
  const isSized = !isFill && Boolean(aspectRatio);

  return (
    <div
      className={isFill ? "size-full" : "w-full"}
      style={isSized ? { aspectRatio } : undefined}
      onClick={stopPropagation}
      onMouseDown={stopPropagation}
      onPointerDown={stopPropagation}
      onTouchStart={stopPropagation}
    >
      <MuxPlayer
        playbackId={playbackId}
        streamType="on-demand"
        poster={poster}
        loading="viewport"
        preload="metadata"
        playsInline
        onError={onError}
        className="rounded-md"
        style={isFill || isSized ? FILL_STYLE : NATURAL_STYLE}
      />
    </div>
  );
};

export default MuxVideoContent;
