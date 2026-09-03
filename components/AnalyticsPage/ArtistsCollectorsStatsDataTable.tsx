"use client";

import { useArtistsCollectorsStatsProvider } from "@/providers/ArtistsCollectorsStatsProvider";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useMemo } from "react";
import AnalyticsStatsTable from "./AnalyticsStatsTable";
import getArtistsCollectorsStatsColumnDefs from "./getArtistsCollectorsStatsColumnDefs";

const ArtistsCollectorsStatsDataTable = () => {
  const { artists, sorting, onSortingChange } = useArtistsCollectorsStatsProvider();
  const columns = useMemo(() => getArtistsCollectorsStatsColumnDefs(), []);

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
      minWidthClass="min-w-[640px] md:min-w-0"
      emptyColSpan={columns.length}
    />
  );
};

export default ArtistsCollectorsStatsDataTable;
