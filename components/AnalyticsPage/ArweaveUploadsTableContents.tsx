"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ArweaveUploadsProvider, {
  useArweaveUploadsProvider,
} from "@/providers/ArweaveUploadsProvider";
import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { Fragment, useMemo, useState } from "react";
import ArtistArweaveTransactions from "./ArtistArweaveTransactions";
import getArweaveUploadsColumnDefs from "./getArweaveUploadsColumnDefs";

const ArweaveUploadsTableContents = () => {
  const { uploads, sorting, onSortingChange } = useArweaveUploadsProvider();
  const [expandedRowId, setExpandedRowId] = useState<string | null>(null);

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
    getRowId: (row, index) => {
      const addr = row.artist_address.trim().toLowerCase();
      if (addr.length > 0) return addr;
      const user = row.artist_username?.trim().toLowerCase();
      if (user) return `username:${user}`;
      return `arweave-upload-${index}`;
    },
  });

  return (
    <div className="overflow-auto rounded-md border">
      <Table className="min-w-[560px] md:min-w-0">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  className={
                    header.column.id === "usdc_cost" ||
                    header.column.id === "winc_cost" ||
                    header.column.id === "size"
                      ? "w-32 whitespace-normal text-right"
                      : header.column.id === "artist"
                        ? "min-w-[12rem] whitespace-normal"
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
          {table.getRowModel().rows.map((row) => {
            const isExpanded = expandedRowId === row.id;
            const colSpan = row.getVisibleCells().length;

            return (
              <Fragment key={row.id}>
                <TableRow
                  data-state={isExpanded ? "open" : undefined}
                  className="hover:bg-muted/50 cursor-pointer"
                  onClick={() => setExpandedRowId((prev) => (prev === row.id ? null : row.id))}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={
                        cell.column.id === "usdc_cost" ||
                        cell.column.id === "winc_cost" ||
                        cell.column.id === "size"
                          ? "text-right"
                          : undefined
                      }
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
                {isExpanded ? (
                  <TableRow key={`${row.id}-detail`} className="hover:bg-transparent">
                    <TableCell
                      colSpan={colSpan}
                      className="bg-muted/20 border-muted-foreground/20 border-l-2 py-3 pr-3 pl-6 sm:pl-8"
                    >
                      <ArweaveUploadsProvider aggregation={false}>
                        <ArtistArweaveTransactions
                          artist={
                            row.original.artist_username?.trim() || row.original.artist_address
                          }
                        />
                      </ArweaveUploadsProvider>
                    </TableCell>
                  </TableRow>
                ) : null}
              </Fragment>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default ArweaveUploadsTableContents;
