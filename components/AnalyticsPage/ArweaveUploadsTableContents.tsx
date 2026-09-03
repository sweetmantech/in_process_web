"use client";

import {
  ANALYTICS_TABLE_CELL_CLASS,
  ANALYTICS_TABLE_HEAD_CLASS,
} from "@/lib/analytics/analyticsTableStyles";
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
import { ChevronRight } from "lucide-react";
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
    <Table className="w-full min-w-[560px] border-collapse md:min-w-0">
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id} className="border-0 hover:bg-transparent">
            {headerGroup.headers.map((header) => (
              <TableHead
                key={header.id}
                className={`${ANALYTICS_TABLE_HEAD_CLASS} ${
                  header.column.getCanSort() ? "text-right" : ""
                }`}
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
                className={`cursor-pointer border-0 hover:bg-transparent ${
                  isExpanded ? "bg-[#FAF8F3]" : "bg-transparent"
                }`}
                onClick={() => setExpandedRowId((prev) => (prev === row.id ? null : row.id))}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className={ANALYTICS_TABLE_CELL_CLASS}>
                    {cell.column.id === "artist" ? (
                      <div className="flex items-center gap-2.5">
                        <ChevronRight
                          className={`size-3.5 shrink-0 text-[#B6B2A8] transition-transform duration-200 ${
                            isExpanded ? "rotate-90" : ""
                          }`}
                        />
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </div>
                    ) : (
                      flexRender(cell.column.columnDef.cell, cell.getContext())
                    )}
                  </TableCell>
                ))}
              </TableRow>
              {isExpanded ? (
                <TableRow key={`${row.id}-detail`} className="border-0 hover:bg-transparent">
                  <TableCell colSpan={colSpan} className="bg-[#FAF8F3] px-6 py-3">
                    <ArweaveUploadsProvider aggregation={false}>
                      <ArtistArweaveTransactions
                        artist={row.original.artist_username?.trim() || row.original.artist_address}
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
  );
};

export default ArweaveUploadsTableContents;
