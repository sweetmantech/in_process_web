"use client";

import Link from "next/link";
import { Layers } from "lucide-react";
import { FreeMode, Mousewheel } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import BlurImage from "@/components/BlurImage";
import { cn } from "@/lib/utils";
import useMomentCollectionCarousel from "@/hooks/useMomentCollectionCarousel";

const MomentCollectionCarousel = () => {
  const { canNavigate, moments, currentIndex, goToIndex, collectionName, collectionHref } =
    useMomentCollectionCarousel();

  if (!canNavigate) return null;

  return (
    <div className="flex min-w-0 shrink-0 flex-col gap-2.5">
      <div className="flex items-center justify-between gap-2.5">
        <span className="inline-flex min-w-0 items-center gap-1.5 font-archivo text-[11px] uppercase tracking-[0.09em] text-[#6B6456]">
          <Layers className="size-[13px] shrink-0 text-[#A8862F]" strokeWidth={1.75} />
          <span className="truncate">{collectionName}</span>
        </span>
        {collectionHref && (
          <Link
            href={collectionHref}
            className="shrink-0 font-archivo-medium text-[11.5px] text-[#A8862F] transition-colors hover:text-grey-moss-900"
          >
            VIEW COLLECTION
          </Link>
        )}
      </div>

      <div className="min-w-0 w-full overflow-hidden">
        <Swiper
          modules={[FreeMode, Mousewheel]}
          slidesPerView="auto"
          spaceBetween={8}
          freeMode
          mousewheel={{ forceToAxis: true }}
          className="w-full !overflow-hidden !px-0.5 !py-1"
        >
          {moments.map((item, index) => {
            const selected = index === currentIndex;
            const image = item.metadata?.image;
            const label = item.metadata?.name || `Moment ${item.token_id}`;

            return (
              <SwiperSlide
                key={item.id || `${item.address}-${item.token_id}`}
                className="!w-[62px]"
              >
                <button
                  type="button"
                  onClick={() => goToIndex(index)}
                  aria-label={label}
                  aria-current={selected ? "true" : undefined}
                  className={cn(
                    "relative h-[50px] w-[62px] overflow-hidden rounded-lg border-2 p-0 transition-opacity",
                    selected
                      ? "border-grey-moss-900 opacity-100"
                      : "border-transparent opacity-55 hover:opacity-80"
                  )}
                >
                  {image ? (
                    <BlurImage src={image} alt={label} fill className="object-cover" sizes="62px" />
                  ) : (
                    <div className="size-full bg-[repeating-linear-gradient(45deg,#F1EEE8_0_8px,#E3DFD5_8px_16px)]" />
                  )}
                </button>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};

export default MomentCollectionCarousel;
