"use client";

import { Button } from "@/components/ui/button";
import { ActiveArtistStats } from "@/types/activeArtists";
import { Column } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

interface ActiveArtistsSortableColumnHeaderProps {
  title: string;
  column: Column<ActiveArtistStats, unknown>;
  align?: "left" | "right";
}

const ActiveArtistsSortableColumnHeader = ({
  title,
  column,
  align = "left",
}: ActiveArtistsSortableColumnHeaderProps) => {
  const button = (
    <Button
      variant="ghost"
      className={align === "right" ? "-mr-3 h-8 px-2 lg:px-3" : "-ml-3 h-8 px-2 lg:px-3"}
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
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

export default ActiveArtistsSortableColumnHeader;
