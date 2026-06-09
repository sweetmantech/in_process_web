"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useArtistsCollectorsStatsProvider } from "@/providers/ArtistsCollectorsStatsProvider";
import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useMemo } from "react";
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
    <div className="overflow-auto rounded-md border">
      <Table className="min-w-[640px] md:min-w-0">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id} className="whitespace-normal">
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ArtistsCollectorsStatsDataTable;
