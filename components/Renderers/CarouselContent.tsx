"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import BlurImage from "@/components/BlurImage";
import { CarouselItem } from "@/lib/instagram/uploadCarouselSlide";
import { FEED_IMAGE_SIZES } from "./ImageContent";

interface CarouselContentProps {
  items: CarouselItem[];
  alt?: string;
  variant?: "fill" | "natural";
  sizes?: string;
}

// Renders our own permanently-stored carousel slides (content.uri manifest)
// with prev/next arrows — not Instagram's embed widget. Feed cards and the
// moment page both go through this via ContentRenderer.
const CarouselContent = ({
  items,
  alt = "Moment carousel",
  variant = "fill",
  sizes = FEED_IMAGE_SIZES,
}: CarouselContentProps) => {
  const [index, setIndex] = useState(0);

  if (!items.length) return null;

  const canNavigate = items.length > 1;

  const goPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIndex((i) => (i - 1 + items.length) % items.length);
  };
  const goNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIndex((i) => (i + 1) % items.length);
  };

  return (
    <div className={variant === "fill" ? "relative h-full w-full" : "relative w-full"}>
      {variant === "natural" ? (
        <BlurImage
          src={items[index].preview}
          alt={alt}
          width={0}
          height={0}
          sizes={sizes}
          draggable={false}
          className="bg-[#EDEAE2]"
          style={{ width: "100%", height: "auto" }}
        />
      ) : (
        <BlurImage
          src={items[index].preview}
          alt={alt}
          fill
          sizes={sizes}
          draggable={false}
          className="bg-[#EDEAE2]"
          style={{ objectFit: "contain", objectPosition: "center" }}
        />
      )}
      {canNavigate && (
        <>
          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous carousel image"
            className="absolute left-2.5 top-1/2 z-[1] flex size-[34px] -translate-y-1/2 items-center justify-center rounded-full border-none bg-[rgba(255,255,255,.92)] text-grey-moss-900 shadow-[0_2px_8px_rgba(27,21,4,.16)] transition-colors hover:bg-white"
          >
            <ChevronLeft className="size-[17px]" strokeWidth={1.75} />
          </button>
          <button
            type="button"
            onClick={goNext}
            aria-label="Next carousel image"
            className="absolute right-2.5 top-1/2 z-[1] flex size-[34px] -translate-y-1/2 items-center justify-center rounded-full border-none bg-[rgba(255,255,255,.92)] text-grey-moss-900 shadow-[0_2px_8px_rgba(27,21,4,.16)] transition-colors hover:bg-white"
          >
            <ChevronRight className="size-[17px]" strokeWidth={1.75} />
          </button>
          <span className="pointer-events-none absolute right-3 top-3 z-[1] rounded-[5px] bg-[rgba(255,255,255,.9)] px-2.5 py-1 font-archivo-medium text-[10.5px] tracking-wide text-[#6B6456]">
            {index + 1} / {items.length}
          </span>
        </>
      )}
    </div>
  );
};

export default CarouselContent;
