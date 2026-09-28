"use client";

import { useState, useEffect } from "react";
import VideoPlayer from "@/components/VideoPlayer";
import useMuxPlayback from "@/hooks/useMuxPlayback";
import { MomentVideo } from "@/types/moment";
import ErrorContent from "./ErrorContent";
import MuxVideoContent from "./MuxVideoContent";

interface VideoContentProps {
  rawAnimationUri: string;
  rawImageUri: string;
  video?: MomentVideo | null;
  variant: "fill" | "natural";
  sizes?: string;
  onRefresh?: () => Promise<string | undefined | void>;
}

const VideoContent = ({
  rawAnimationUri,
  rawImageUri,
  video,
  variant,
  sizes,
  onRefresh,
}: VideoContentProps) => {
  const [videoUri, setVideoUri] = useState(rawAnimationUri);
  const { muxPlaybackId, muxPoster, onMuxError } = useMuxPlayback(
    video,
    rawAnimationUri,
    rawImageUri
  );

  useEffect(() => {
    setVideoUri(rawAnimationUri);
  }, [rawAnimationUri]);

  const handleError = async (): Promise<boolean> => {
    if (!onRefresh || !videoUri.includes("stream.mux.com")) return false;
    const freshUri = await onRefresh();
    if (freshUri && freshUri !== videoUri) {
      setVideoUri(freshUri);
      return true;
    }
    return false;
  };

  if (muxPlaybackId)
    return (
      <MuxVideoContent
        playbackId={muxPlaybackId}
        poster={muxPoster}
        variant={variant}
        onError={onMuxError}
      />
    );

  if (!videoUri) return <ErrorContent />;
  return (
    <VideoPlayer
      url={videoUri}
      thumbnail={rawImageUri || undefined}
      variant={variant}
      sizes={sizes}
      onError={handleError}
    />
  );
};

export default VideoContent;
