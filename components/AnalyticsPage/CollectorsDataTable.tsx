"use client";

import { useCollectorsProvider } from "@/providers/CollectorsProvider";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useMemo } from "react";
import AnalyticsStatsTable from "./AnalyticsStatsTable";
import getCollectorsColumnDefs from "./getCollectorsColumnDefs";

const CollectorsDataTable = () => {
  const { collectors, sorting, onSortingChange } = useCollectorsProvider();
  const columns = useMemo(() => getCollectorsColumnDefs(), []);

  const table = useReactTable({
    data: collectors,
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

export default CollectorsDataTable;
