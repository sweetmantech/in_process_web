import BlurImage from "@/components/BlurImage";
import NoPreview from "@/components/NoPreview";

/** Masonry feeds are ~2–3 columns; avoid requesting 800px+ for every card. */
export const FEED_IMAGE_SIZES = "(max-width: 768px) 100vw, (max-width: 1280px) 40vw, 420px";

/** Moment detail / large single-image surfaces. */
export const DETAIL_IMAGE_SIZES = "(max-width: 768px) 100vw, 1200px";

interface ImageContentProps {
  rawImageUri: string;
  alt: string;
  variant: "fill" | "natural";
  sizes?: string;
}

const ImageContent = ({
  rawImageUri,
  alt,
  variant,
  sizes = FEED_IMAGE_SIZES,
}: ImageContentProps) => {
  const src = rawImageUri;

  if (!src) {
    return <NoPreview className="min-h-32" />;
  }

  if (variant === "natural") {
    return (
      <BlurImage
        src={src}
        alt={alt}
        width={0}
        height={0}
        sizes={sizes}
        draggable={false}
        className="bg-[#EDEAE2]"
        style={{ width: "100%", height: "auto" }}
      />
    );
  }

  return (
    <BlurImage
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      draggable={false}
      className="bg-[#EDEAE2]"
      style={{ objectFit: "contain", objectPosition: "center" }}
    />
  );
};

export default ImageContent;
