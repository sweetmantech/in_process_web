"use client";

import { Button } from "@/components/ui/button";
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
import { Fragment, useEffect, useMemo } from "react";
import getArtistArweaveUploadsColumnDefs from "./getArtistArweaveUploadsColumnDefs";

const ArtistArweaveTransactions = ({ artist }: { artist: string }) => {
  const {
    transactions,
    isPending,
    isError,
    data,
    currentPage,
    totalPages,
    hasPrevPage,
    hasNextPage,
    goPrevPage,
    goNextPage,
    setArtist,
    sorting,
    onSortingChange,
  } = useArweaveUploadsProvider();

  useEffect(() => {
    setArtist(artist);
  }, [artist]);

  const columns = useMemo(() => getArtistArweaveUploadsColumnDefs(), []);

  const table = useReactTable({
    data: transactions,
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

  if (!artist) return <Fragment />;

  if (isPending && data === undefined) {
    return <p className="text-muted-foreground px-2 py-3 text-xs">Loading uploads…</p>;
  }

  if (isError) {
    return <p className="text-destructive px-2 py-3 text-xs">Could not load uploads.</p>;
  }

  if (transactions.length === 0) {
    return <p className="text-muted-foreground px-2 py-3 text-xs">No uploads for this artist.</p>;
  }

  const getHeaderClassName = (columnId: string) => {
    if (columnId === "size") return "w-28 whitespace-normal text-right";
    if (columnId === "winc_cost" || columnId === "usdc_cost")
      return "w-24 whitespace-normal text-right";
    if (columnId === "created_at") return "min-w-[10rem] whitespace-normal text-right";
    return "whitespace-normal";
  };

  const getCellClassName = (columnId: string) => {
    if (columnId === "arweave_uri") return "max-w-[14rem] truncate";
    if (columnId === "size" || columnId === "winc_cost" || columnId === "usdc_cost")
      return "text-right";
    if (columnId === "created_at") return "whitespace-nowrap text-right";
    return undefined;
  };

  return (
    <div className="text-xs space-y-3">
      <div className="bg-muted/30 rounded-md border px-2 py-2">
        <Table className="text-xs [&_td]:py-1.5 [&_th]:h-8 [&_th]:py-1.5 [&_td]:leading-snug [&_th]:leading-snug">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className={getHeaderClassName(header.column.id)}>
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
                  <TableCell key={cell.id} className={getCellClassName(cell.column.id)}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="text-muted-foreground flex items-center justify-between px-1">
        <Button
          variant="outline"
          size="sm"
          className="h-7 text-xs"
          onClick={goPrevPage}
          disabled={!hasPrevPage}
        >
          Previous
        </Button>
        <span>
          {currentPage} of {totalPages}
        </span>
        <Button
          variant="outline"
          size="sm"
          className="h-7 text-xs"
          onClick={goNextPage}
          disabled={!hasNextPage}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default ArtistArweaveTransactions;
