"use client";

import { RefObject } from "react";
import { Plus } from "lucide-react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { restrictToHorizontalAxis } from "@dnd-kit/modifiers";
import { SortableContext, horizontalListSortingStrategy } from "@dnd-kit/sortable";
import { BulkItem } from "@/types/bulk";
import useBulkThumbDnd from "@/hooks/useBulkThumbDnd";
import SortableBulkThumb from "./SortableBulkThumb";

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
  const { sensors, handleDragEnd } = useBulkThumbDnd(items, onReorder);

  return (
    <div className="mt-3.5 min-w-0 w-full shrink-0 overflow-x-auto overflow-y-hidden">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        modifiers={[restrictToHorizontalAxis]}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={items.map((item) => item.id)}
          strategy={horizontalListSortingStrategy}
        >
          <div className="flex w-max items-center gap-3 px-0.5 py-1">
            {items.map((item, index) => (
              <SortableBulkThumb
                key={item.id}
                item={item}
                selected={index === selectedIndex}
                isCreating={isCreating}
                onSelect={() => onSelect(index)}
                onRemove={() => onRemove(item.id, index)}
              />
            ))}

            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={isCreating}
              className="flex aspect-square w-[78px] shrink-0 flex-col items-center justify-center gap-1 rounded-[11px] border-[1.5px] border-dashed border-[#C9C4B9] bg-white/40 text-[#8C8678] transition-colors hover:border-grey-moss-900 hover:text-grey-moss-900 disabled:opacity-50"
            >
              <Plus className="size-5" strokeWidth={1.75} />
              <span className="font-archivo-medium text-[9px] uppercase tracking-[0.05em]">
                add
              </span>
            </button>
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default BulkThumbSwiper;
