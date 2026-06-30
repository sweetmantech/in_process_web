"use client";

import AudioPlayerComponent from "./AudioPlayer";
import { AudioProvider, useAudioProvider } from "@/providers/AudioProvider";

interface AudioPlayerProps {
  thumbnailUrl?: string;
  audioUrl: string;
  allowThumbnailUpload?: boolean;
  variant?: "fill" | "natural";
}

const AudioPlayer = (props: AudioPlayerProps) => (
  <AudioProvider>
    <AudioPlayerComponent {...props} />
  </AudioProvider>
);

export { AudioPlayer, AudioProvider, useAudioProvider };
