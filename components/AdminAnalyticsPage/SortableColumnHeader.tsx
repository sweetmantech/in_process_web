"use client";

import { Button } from "@/components/ui/button";
import { Column } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

type SortableColumnHeaderSize = "default" | "compact";

interface SortableColumnHeaderProps<TData> {
  title: string;
  column: Column<TData, unknown>;
  align?: "left" | "right";
  size?: SortableColumnHeaderSize;
}

const SIZE_CLASSES: Record<
  SortableColumnHeaderSize,
  { left: string; right: string; icon: string }
> = {
  default: {
    left: "-ml-3 h-8 px-2 lg:px-3",
    right: "-mr-3 h-8 px-2 lg:px-3",
    icon: "ml-2 h-4 w-4",
  },
  compact: {
    left: "-ml-2 h-7 px-2 text-xs",
    right: "-mr-2 h-7 px-2 text-xs",
    icon: "ml-1.5 h-3 w-3",
  },
};

const SortableColumnHeader = <TData,>({
  title,
  column,
  align = "left",
  size = "default",
}: SortableColumnHeaderProps<TData>) => {
  const classes = SIZE_CLASSES[size];

  const button = (
    <Button
      variant="ghost"
      className={align === "right" ? classes.right : classes.left}
      onClick={() => {
        const sorted = column.getIsSorted();
        column.toggleSorting(sorted !== "desc");
      }}
    >
      {title}
      <ArrowUpDown className={classes.icon} />
    </Button>
  );

  if (align === "right") {
    return <div className="flex justify-end">{button}</div>;
  }
  return button;
};

export default SortableColumnHeader;
