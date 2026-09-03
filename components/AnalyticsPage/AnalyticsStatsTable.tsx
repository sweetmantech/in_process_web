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
import { flexRender, type Table as TanstackTable } from "@tanstack/react-table";

type Props<TData> = {
  table: TanstackTable<TData>;
  minWidthClass: string;
  emptyColSpan: number;
};

const AnalyticsStatsTable = <TData,>({ table, minWidthClass, emptyColSpan }: Props<TData>) => (
  <Table className={`w-full border-collapse ${minWidthClass}`}>
    <TableHeader>
      {table.getHeaderGroups().map((headerGroup) => (
        <TableRow key={headerGroup.id} className="border-0 hover:bg-transparent">
          {headerGroup.headers.map((header) => (
            <TableHead
              key={header.id}
              className={`${ANALYTICS_TABLE_HEAD_CLASS} ${
                header.column.columnDef.header && header.column.getCanSort() ? "text-right" : ""
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
      {table.getRowModel().rows.length ? (
        table.getRowModel().rows.map((row) => (
          <TableRow key={row.id} className="border-0 hover:bg-transparent">
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id} className={ANALYTICS_TABLE_CELL_CLASS}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))
      ) : (
        <TableRow className="border-0 hover:bg-transparent">
          <TableCell
            colSpan={emptyColSpan}
            className="h-24 text-center text-sm text-[#6B6456]"
          >
            No results.
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  </Table>
);

export default AnalyticsStatsTable;
