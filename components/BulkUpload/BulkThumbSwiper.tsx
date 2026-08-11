"use client";

import { RefObject } from "react";
import { Plus } from "lucide-react";
import { FreeMode, Mousewheel } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import { BulkItem } from "@/types/bulk";
import BulkFileCard from "./BulkFileCard";

interface BulkThumbSwiperProps {
  items: BulkItem[];
  selectedIndex: number;
  isCreating: boolean;
  inputRef: RefObject<HTMLInputElement | null>;
  onSelect: (index: number) => void;
  onRemove: (id: string, index: number) => void;
}

const BulkThumbSwiper = ({
  items,
  selectedIndex,
  isCreating,
  inputRef,
  onSelect,
  onRemove,
}: BulkThumbSwiperProps) => {
  return (
    <div className="mt-3.5 min-w-0 w-full shrink-0 overflow-hidden">
      <Swiper
        modules={[FreeMode, Mousewheel]}
        slidesPerView="auto"
        spaceBetween={12}
        freeMode
        mousewheel={{ forceToAxis: true }}
        className="w-full !overflow-hidden !px-0.5 !py-1"
      >
        {items.map((item, index) => (
          <SwiperSlide key={item.id} className="!w-[78px]">
            <BulkFileCard
              item={item}
              selected={index === selectedIndex}
              isCreating={isCreating}
              onSelect={() => onSelect(index)}
              onRemove={() => onRemove(item.id, index)}
            />
          </SwiperSlide>
        ))}
        <SwiperSlide className="!w-[78px]">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={isCreating}
            className="flex aspect-square w-[78px] flex-col items-center justify-center gap-1 rounded-[11px] border-[1.5px] border-dashed border-[#C9C4B9] bg-white/40 text-[#8C8678] transition-colors hover:border-grey-moss-900 hover:text-grey-moss-900 disabled:opacity-50"
          >
            <Plus className="size-5" strokeWidth={1.75} />
            <span className="font-archivo-medium text-[9px] uppercase tracking-[0.05em]">add</span>
          </button>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default BulkThumbSwiper;
