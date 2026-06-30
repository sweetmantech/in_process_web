import { AudioPlayer } from "@/components/AudioPlayer";
import ErrorContent from "./ErrorContent";

interface AudioContentProps {
  rawAnimationUri: string;
  rawImageUri: string;
  variant?: "fill" | "natural";
}

const AudioContent = ({ rawAnimationUri, rawImageUri, variant = "fill" }: AudioContentProps) => {
  if (!rawAnimationUri) return <ErrorContent />;
  return (
    <AudioPlayer
      thumbnailUrl={rawImageUri || "/images/placeholder.png"}
      audioUrl={rawAnimationUri}
      variant={variant}
    />
  );
};

export default AudioContent;
