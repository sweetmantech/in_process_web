"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import BlurImage from "@/components/BlurImage";
import { CarouselItem } from "@/lib/instagram/uploadCarouselSlide";
import { FEED_IMAGE_SIZES } from "./ImageContent";

interface CarouselContentProps {
  items: CarouselItem[];
  alt?: string;
  variant?: "fill" | "natural";
  sizes?: string;
}

// Renders our own permanently-stored carousel slides (content.uri manifest),
// not Instagram's embed widget. Swipe/tap navigation and the position dots
// are handled by Swiper itself rather than hand-rolled arrows — this also
// keeps it visually distinct from the collection-carousel arrows on the
// moment page (MomentMediaFrame.tsx), which own the left/right edges this
// never touches, instead of overlapping them.
const CarouselContent = ({
  items,
  alt = "Moment carousel",
  variant = "fill",
  sizes = FEED_IMAGE_SIZES,
}: CarouselContentProps) => {
  if (!items.length) return null;

  return (
    <div
      className={
        (variant === "fill" ? "relative h-full w-full" : "relative w-full") +
        " [&_.swiper-pagination-bullet]:bg-white [&_.swiper-pagination-bullet]:opacity-70 [&_.swiper-pagination-bullet-active]:bg-tan-gold [&_.swiper-pagination-bullet-active]:opacity-100"
      }
      // Clicking a pagination dot should switch slides, not trigger the
      // feed card's click-to-navigate — a plain tap/swipe on the image
      // itself is left alone so navigation still works there.
      onClickCapture={(e) => {
        if ((e.target as HTMLElement).closest(".swiper-pagination-bullet")) {
          e.stopPropagation();
        }
      }}
    >
      <Swiper
        modules={[Pagination, A11y]}
        pagination={items.length > 1 ? { clickable: true } : false}
        autoHeight={variant === "natural"}
        className={variant === "fill" ? "h-full w-full" : "w-full"}
      >
        {items.map((item, index) => (
          <SwiperSlide key={`${item.url}-${index}`}>
            {variant === "natural" ? (
              <BlurImage
                src={item.preview}
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
                src={item.preview}
                alt={alt}
                fill
                sizes={sizes}
                draggable={false}
                className="bg-[#EDEAE2]"
                style={{ objectFit: "contain", objectPosition: "center" }}
              />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CarouselContent;
