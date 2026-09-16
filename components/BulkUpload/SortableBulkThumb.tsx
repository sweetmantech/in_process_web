"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { BulkItem } from "@/types/bulk";
import BulkFileCard from "./BulkFileCard";

interface SortableBulkThumbProps {
  item: BulkItem;
  selected: boolean;
  isCreating: boolean;
  onSelect: () => void;
  onRemove: () => void;
}

const SortableBulkThumb = ({
  item,
  selected,
  isCreating,
  onSelect,
  onRemove,
}: SortableBulkThumbProps) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: item.id,
    disabled: isCreating,
  });

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className="shrink-0 touch-none"
    >
      <BulkFileCard
        item={item}
        selected={selected}
        isCreating={isCreating}
        onSelect={onSelect}
        onRemove={onRemove}
        isDragging={isDragging}
      />
    </div>
  );
};

export default SortableBulkThumb;
