"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useArweaveUploadsProvider } from "@/providers/ArweaveUploadsProvider";
import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useMemo } from "react";
import getArweaveUploadsColumnDefs from "./getArweaveUploadsColumnDefs";

const ArweaveUploadsTableContents = () => {
  const { uploads, sorting, onSortingChange } = useArweaveUploadsProvider();

  const columns = useMemo(() => getArweaveUploadsColumnDefs(), []);

  const table = useReactTable({
    data: uploads,
    columns,
    defaultColumn: { enableSorting: false },
    getCoreRowModel: getCoreRowModel(),
    manualSorting: true,
    enableSortingRemoval: false,
    sortDescFirst: true,
    onSortingChange,
    state: { sorting },
    getRowId: (row) => row.id,
  });

  return (
    <div className="overflow-auto rounded-md border">
      <Table className="min-w-[1000px] md:min-w-0">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  className={
                    header.column.id === "usdc_cost" || header.column.id === "size"
                      ? "w-28 whitespace-normal text-right"
                      : header.column.id === "artist"
                        ? "w-40 whitespace-normal"
                        : header.column.id === "created_at"
                          ? "w-48 whitespace-normal"
                          : "whitespace-normal"
                  }
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell
                  key={cell.id}
                  className={
                    cell.column.id === "usdc_cost" || cell.column.id === "size"
                      ? "text-right"
                      : undefined
                  }
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ArweaveUploadsTableContents;
