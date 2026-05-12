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
import { Fragment, useMemo, useState } from "react";
import ArtistArweaveTransactions from "./ArtistArweaveTransactions";
import getArweaveUploadsColumnDefs from "./getArweaveUploadsColumnDefs";

const ArweaveUploadsTableContents = () => {
  const { uploads, sorting, onSortingChange, period } = useArweaveUploadsProvider();
  const [expandedArtistAddress, setExpandedArtistAddress] = useState<string | null>(null);

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
    getRowId: (row) => row.artist.address,
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
            const isExpanded = expandedArtistAddress === row.original.artist.address;
            const artistQueryValue =
              row.original.artist.username?.trim() || row.original.artist.address;
            const colSpan = row.getVisibleCells().length;

            return (
              <Fragment key={row.id}>
                <TableRow
                  data-state={isExpanded ? "open" : undefined}
                  className="hover:bg-muted/50 cursor-pointer"
                  onClick={() =>
                    setExpandedArtistAddress((prev) =>
                      prev === row.original.artist.address ? null : row.original.artist.address
                    )
                  }
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
                    <TableCell colSpan={colSpan} className="bg-muted/20 p-3">
                      <ArtistArweaveTransactions
                        artistQueryValue={artistQueryValue}
                        period={period}
                      />
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
