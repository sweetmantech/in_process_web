import { MomentVideo } from "@/types/moment";

/**
 * Mux playback id for a moment: its recorded streaming playback, or a
 * not-yet-migrated animation_url that still points at stream.mux.com.
 */
const getMuxPlaybackId = (
  video: MomentVideo | null | undefined,
  animationUri: string
): string | null => {
  if (video?.provider === "mux" && video.playback_id) return video.playback_id;
  return animationUri.match(/stream\.mux\.com\/([^/.?]+)/)?.[1] ?? null;
};

export default getMuxPlaybackId;
