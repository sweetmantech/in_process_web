"use client";

import { FreeMode, Mousewheel } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import { cn } from "@/lib/utils";
import { BulkResultItem } from "@/types/bulk";
import BulkDiscThumb from "@/components/BulkUpload/BulkDiscThumb";
import { getMimeTypeIcon } from "@/lib/bulkUpload/getMimeTypeIcon";
import BlurImage from "@/components/BlurImage";

interface BatchSuccessThumbSwiperProps {
  items: BulkResultItem[];
  selectedIndex: number;
  onSelect: (index: number) => void;
}

const BatchSuccessThumbSwiper = ({
  items,
  selectedIndex,
  onSelect,
}: BatchSuccessThumbSwiperProps) => {
  return (
    <div className="mt-3.5 min-w-0 w-full overflow-hidden">
      <Swiper
        modules={[FreeMode, Mousewheel]}
        slidesPerView="auto"
        spaceBetween={12}
        freeMode
        mousewheel={{ forceToAxis: true }}
        className="w-full !overflow-hidden !px-0.5 !py-1"
      >
        {items.map((item, index) => {
          const selected = index === selectedIndex;
          const isAudio = Boolean(item.mimeType?.includes("audio"));
          const hasImagePreview =
            Boolean(item.previewUrl) && (!isAudio || item.previewUrl !== item.fileUrl);

          return (
            <SwiperSlide key={item.tokenId || index} className="!w-[78px]">
              <button
                type="button"
                onClick={() => onSelect(index)}
                className={cn(
                  "w-[78px] overflow-hidden rounded-[11px] border-2 bg-white p-0 transition-colors",
                  selected
                    ? "border-grey-moss-900 shadow-[0_8px_22px_-10px_rgba(27,21,4,.4)]"
                    : "border-[#E4E0D7]"
                )}
              >
                <div
                  className={cn(
                    "relative flex aspect-square items-center justify-center",
                    isAudio && !hasImagePreview ? "bg-neutral-900" : "bg-[#EDEAE2]"
                  )}
                >
                  {hasImagePreview ? (
                    <BlurImage
                      src={item.metadata?.image || item.previewUrl}
                      alt={item.name || `Moment ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="78px"
                    />
                  ) : isAudio ? (
                    <BulkDiscThumb />
                  ) : (
                    <div className="flex size-full items-center justify-center font-archivo text-[11px] text-[#A8A296]">
                      {getMimeTypeIcon(item.mimeType)}
                    </div>
                  )}
                </div>
              </button>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default BatchSuccessThumbSwiper;
