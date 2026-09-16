"use client";

import { RefObject } from "react";
import { Plus } from "lucide-react";
import { Reorder } from "framer-motion";
import { BulkItem } from "@/types/bulk";
import BulkFileCard from "./BulkFileCard";

interface BulkThumbSwiperProps {
  items: BulkItem[];
  selectedIndex: number;
  isCreating: boolean;
  inputRef: RefObject<HTMLInputElement | null>;
  onSelect: (index: number) => void;
  onRemove: (id: string, index: number) => void;
  onReorder: (orderedIds: string[]) => void;
}

const BulkThumbSwiper = ({
  items,
  selectedIndex,
  isCreating,
  inputRef,
  onSelect,
  onRemove,
  onReorder,
}: BulkThumbSwiperProps) => {
  return (
    <div className="mt-3.5 min-w-0 w-full shrink-0 overflow-x-auto overflow-y-hidden">
      <div className="flex w-max items-center gap-3 px-0.5 py-1">
        <Reorder.Group
          as="div"
          axis="x"
          layoutScroll
          values={items.map((item) => item.id)}
          onReorder={onReorder}
          className="flex items-center gap-3"
        >
          {items.map((item, index) => (
            <Reorder.Item
              key={item.id}
              value={item.id}
              as="div"
              drag={isCreating ? false : "x"}
              whileDrag={{ scale: 1.05, zIndex: 10 }}
              className="shrink-0 touch-none"
            >
              <BulkFileCard
                item={item}
                selected={index === selectedIndex}
                isCreating={isCreating}
                onSelect={() => onSelect(index)}
                onRemove={() => onRemove(item.id, index)}
              />
            </Reorder.Item>
          ))}
        </Reorder.Group>

        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={isCreating}
          className="flex aspect-square w-[78px] shrink-0 flex-col items-center justify-center gap-1 rounded-[11px] border-[1.5px] border-dashed border-[#C9C4B9] bg-white/40 text-[#8C8678] transition-colors hover:border-grey-moss-900 hover:text-grey-moss-900 disabled:opacity-50"
        >
          <Plus className="size-5" strokeWidth={1.75} />
          <span className="font-archivo-medium text-[9px] uppercase tracking-[0.05em]">add</span>
        </button>
      </div>
    </div>
  );
};

export default BulkThumbSwiper;
