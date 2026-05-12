"use client";

import { Button } from "@/components/ui/button";
import { Column } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

interface ArweaveUploadsSortableColumnHeaderProps<TData> {
  title: string;
  column: Column<TData, unknown>;
  align?: "left" | "right";
}

const ArweaveUploadsSortableColumnHeader = <TData,>({
  title,
  column,
  align = "left",
}: ArweaveUploadsSortableColumnHeaderProps<TData>) => {
  const button = (
    <Button
      variant="ghost"
      className={align === "right" ? "-mr-3 h-8 px-2 lg:px-3" : "-ml-3 h-8 px-2 lg:px-3"}
      onClick={() => {
        const sorted = column.getIsSorted();
        column.toggleSorting(sorted !== "desc");
      }}
    >
      {title}
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
  );

  if (align === "right") {
    return <div className="flex justify-end">{button}</div>;
  }
  return button;
};

export default ArweaveUploadsSortableColumnHeader;
