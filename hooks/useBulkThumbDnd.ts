"use client";

import { useCallback } from "react";
import { DragEndEvent, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { BulkItem } from "@/types/bulk";

const useBulkThumbDnd = (items: BulkItem[], onReorder: (orderedIds: string[]) => void) => {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } })
  );

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      if (!over || active.id === over.id) return;

      const ids = items.map((item) => item.id);
      const from = ids.indexOf(active.id as string);
      const to = ids.indexOf(over.id as string);
      if (from === -1 || to === -1) return;

      onReorder(arrayMove(ids, from, to));
    },
    [items, onReorder]
  );

  return { sensors, handleDragEnd };
};

export default useBulkThumbDnd;
