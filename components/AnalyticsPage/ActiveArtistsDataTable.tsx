"use client";

import { useActiveArtistsProvider } from "@/providers/ActiveArtistsProvider";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useMemo } from "react";
import AnalyticsStatsTable from "./AnalyticsStatsTable";
import getActiveArtistsColumnDefs from "./getActiveArtistsColumnDefs";

const ActiveArtistsDataTable = () => {
  const { artists, sorting, onSortingChange } = useActiveArtistsProvider();
  const columns = useMemo(() => getActiveArtistsColumnDefs(), []);

  const table = useReactTable({
    data: artists,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualSorting: true,
    enableSortingRemoval: false,
    sortDescFirst: true,
    onSortingChange,
    state: { sorting },
    getRowId: (row) => row.artist_id,
  });

  return (
    <AnalyticsStatsTable
      table={table}
      minWidthClass="min-w-[860px] md:min-w-0"
      emptyColSpan={columns.length}
    />
  );
};

export default ActiveArtistsDataTable;
