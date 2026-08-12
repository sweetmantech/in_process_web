import { useEffect } from "react";
import { useAudioProvider } from ".";
import Image from "next/image";
import getStreamingUrl from "@/lib/media/getStreamingUrl";
import Controls from "./Controls";
import DiscPlaceholder from "./DiscPlaceholder";
import ThumbnailUpload from "../MetadataCreation/ThumbnailUpload";
import { cn } from "@/lib/utils";

interface AudioPlayerProps {
  thumbnailUrl?: string;
  audioUrl: string;
  allowThumbnailUpload?: boolean;
  variant?: "fill" | "natural";
}

const AudioPlayer = ({
  thumbnailUrl,
  audioUrl,
  allowThumbnailUpload = false,
  variant = "fill",
}: AudioPlayerProps) => {
  const { audioSrc, setAudioSrc } = useAudioProvider();
  const isNatural = variant === "natural";
  const hasThumbnail = Boolean(thumbnailUrl?.trim());

  useEffect(() => {
    const src = getStreamingUrl(audioUrl);
    if (audioSrc !== src) {
      setAudioSrc(src);
    }
  }, [audioUrl, audioSrc, setAudioSrc]);

  return (
    <div
      className={cn(
        "relative flex w-full flex-col overflow-hidden bg-gradient-to-b from-neutral-900 to-neutral-950",
        isNatural ? "aspect-[10/11]" : "size-full rounded-2xl"
      )}
    >
      {/* Blurred background - Apple Music style (fill layout only) */}
      {!isNatural && hasThumbnail && (
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src={thumbnailUrl!}
            alt=""
            fill
            sizes="100vw"
            className="scale-110 blur-3xl opacity-40"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
      )}

      {/* Album art — fill sizes by height (create stage); natural sizes by width (feed cards) */}
      <div className="relative flex min-h-0 flex-1 items-center justify-center p-3">
        {isNatural ? (
          <div className="relative w-full max-w-[62%]">
            <div className="aspect-square w-full" aria-hidden />
            <div className="absolute inset-0 overflow-hidden rounded-lg shadow-2xl">
              {hasThumbnail ? (
                <Image
                  src={thumbnailUrl!}
                  alt="Audio cover"
                  fill
                  sizes="70vw"
                  className="object-contain"
                />
              ) : (
                <div className="absolute inset-[12%]">
                  <DiscPlaceholder />
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="relative aspect-square h-full max-h-full w-auto max-w-[70%] overflow-hidden rounded-lg shadow-2xl sm:max-w-[95%]">
            {hasThumbnail ? (
              <Image
                src={thumbnailUrl!}
                alt="Audio cover"
                fill
                sizes="70vw"
                className="object-contain"
              />
            ) : allowThumbnailUpload ? (
              <ThumbnailUpload />
            ) : (
              <div className="absolute inset-[12%]">
                <DiscPlaceholder />
              </div>
            )}
          </div>
        )}
      </div>

      <Controls />
    </div>
  );
};

export default AudioPlayer;
