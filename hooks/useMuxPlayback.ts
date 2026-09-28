import { useEffect, useState } from "react";
import getMuxPlaybackId from "@/lib/mux/getMuxPlaybackId";
import imageLoader from "@/lib/media/imageLoader";
import { MomentVideo } from "@/types/moment";

/**
 * Picks Mux streaming for a video moment when a playback id is available,
 * and switches back to the metadata copy once Mux playback errors.
 */
const useMuxPlayback = (
  video: MomentVideo | null | undefined,
  rawAnimationUri: string,
  rawImageUri: string
) => {
  const playbackId = getMuxPlaybackId(video, rawAnimationUri);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [playbackId]);

  return {
    muxPlaybackId: failed ? null : playbackId,
    // ar:// / ipfs:// posters go through the image proxy; without one Mux uses its own thumbnail.
    muxPoster: rawImageUri ? imageLoader({ src: rawImageUri, width: 1080 }) : undefined,
    onMuxError: () => setFailed(true),
  };
};

export default useMuxPlayback;
