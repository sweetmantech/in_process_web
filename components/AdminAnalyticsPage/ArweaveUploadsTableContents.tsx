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
import type { ArweaveUpload, ArweaveUploadTransaction } from "@/types/arweave";
import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { Fragment, useMemo } from "react";
import ArweaveUploadExpandedPanel from "./ArweaveUploadExpandedPanel";
import getArweaveUploadTransactionColumnDefs from "./getArweaveUploadTransactionColumnDefs";
import getArweaveUploadsColumnDefs from "./getArweaveUploadsColumnDefs";

const ArweaveUploadsAggregateTable = () => {
  const {
    uploads,
    sorting,
    onSortingChange,
    expandedArtistAddress,
    toggleExpandedArtist,
    period,
    sortBy,
    sortOrder,
    limit,
  } = useArweaveUploadsProvider();

  const data = uploads as ArweaveUpload[];
  const columns = useMemo(
    () => getArweaveUploadsColumnDefs(expandedArtistAddress),
    [expandedArtistAddress]
  );

  const table = useReactTable({
    data,
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
      <Table className="min-w-[480px] md:min-w-0">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  className={
                    header.column.id === "expand"
                      ? "w-10 px-2"
                      : header.column.id === "usdc_cost" ||
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
            const addressKey = row.original.artist.address.toLowerCase();
            const isOpen = expandedArtistAddress === addressKey;
            return (
              <Fragment key={row.id}>
                <TableRow
                  className="cursor-pointer hover:bg-muted/40"
                  onClick={() => toggleExpandedArtist(row.original.artist.address)}
                  data-state={isOpen ? "open" : "closed"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={
                        cell.column.id === "usdc_cost" ||
                        cell.column.id === "winc_cost" ||
                        cell.column.id === "size"
                          ? "text-right"
                          : cell.column.id === "expand"
                            ? "w-10 px-2"
                            : undefined
                      }
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
                {isOpen ? (
                  <TableRow className="hover:bg-transparent">
                    <TableCell colSpan={columns.length} className="p-0">
                      <ArweaveUploadExpandedPanel
                        artistAddress={row.original.artist.address}
                        period={period}
                        sortBy={sortBy}
                        sortOrder={sortOrder}
                        detailLimit={limit}
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

const ArweaveUploadsDetailTable = () => {
  const { uploads, sorting, onSortingChange } = useArweaveUploadsProvider();
  const data = uploads as ArweaveUploadTransaction[];
  const columns = useMemo(() => getArweaveUploadTransactionColumnDefs(true), []);

  const table = useReactTable({
    data,
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
      <Table className="min-w-[480px] md:min-w-0">
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
                      : header.column.id === "created_at"
                        ? "min-w-[10rem] whitespace-normal"
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
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

const ArweaveUploadsTableContents = () => {
  const { viewVariant } = useArweaveUploadsProvider();
  if (viewVariant === "detail") {
    return <ArweaveUploadsDetailTable />;
  }
  return <ArweaveUploadsAggregateTable />;
};

export default ArweaveUploadsTableContents;
