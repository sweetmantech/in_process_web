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
import { getArweaveUploads } from "@/lib/admin/getArweaveUploads";
import { useUserProvider } from "@/providers/UserProvider";
import { ArweaveUploadsSortBy } from "@/types/arweave";
import { AnalyticsPeriod } from "@/types/timeline";
import { useQuery } from "@tanstack/react-query";
import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";
import getArweaveUploadTransactionColumnDefs from "./getArweaveUploadTransactionColumnDefs";

interface ArweaveUploadExpandedPanelProps {
  artistAddress: string;
  period?: AnalyticsPeriod;
  sortBy: ArweaveUploadsSortBy;
  sortOrder: "asc" | "desc";
  detailLimit: number;
}

const ArweaveUploadExpandedPanel = ({
  artistAddress,
  period,
  sortBy,
  sortOrder,
  detailLimit,
}: ArweaveUploadExpandedPanelProps) => {
  const { getAuthHeaders } = useUserProvider();
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [artistAddress, period, sortBy, sortOrder]);

  const query = useQuery({
    queryKey: [
      "admin-arweave-uploads-expanded",
      artistAddress,
      page,
      detailLimit,
      period,
      sortBy,
      sortOrder,
    ],
    queryFn: async () => {
      const authHeaders = await getAuthHeaders();
      return getArweaveUploads({
        authHeaders,
        artist: artistAddress,
        page,
        limit: detailLimit,
        period,
        sortBy,
        sortOrder,
      });
    },
    staleTime: 1000 * 60 * 2,
  });

  const rows = query.data?.variant === "detail" ? query.data.uploads : [];
  const count = query.data?.count ?? 0;
  const totalPages = Math.max(1, Math.ceil(count / detailLimit));
  const hasPrev = page > 1;
  const hasNext = page < totalPages;

  const columns = useMemo(() => getArweaveUploadTransactionColumnDefs(false), []);

  const table = useReactTable({
    data: rows,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getRowId: (r) => r.id,
  });

  if (query.isPending) {
    return <div className="px-4 py-6 text-sm text-muted-foreground">Loading transactions…</div>;
  }
  if (query.error) {
    return <div className="px-4 py-6 text-sm text-red-500">Failed to load transactions</div>;
  }
  if (query.data && query.data.variant !== "detail") {
    return <div className="px-4 py-6 text-sm text-muted-foreground">Unexpected response</div>;
  }

  return (
    <div className="border-t bg-muted/20 px-4 py-4">
      <p className="mb-3 text-xs font-medium text-muted-foreground">Transactions for this artist</p>
      {rows.length === 0 ? (
        <p className="text-sm text-muted-foreground">No uploads in this period.</p>
      ) : (
        <>
          <div className="overflow-auto rounded-md border bg-background">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead
                        key={header.id}
                        className={
                          header.column.id === "winc_cost" ||
                          header.column.id === "usdc_cost" ||
                          header.column.id === "size"
                            ? "w-28 whitespace-normal text-right text-sm"
                            : header.column.id === "created_at"
                              ? "min-w-[10rem] whitespace-normal text-sm"
                              : "whitespace-normal text-sm"
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
                          cell.column.id === "winc_cost" ||
                          cell.column.id === "usdc_cost" ||
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
          {count > detailLimit ? (
            <div className="mt-3 flex items-center justify-between">
              <Button variant="outline" size="sm" onClick={() => setPage((p) => p - 1)} disabled={!hasPrev}>
                Previous
              </Button>
              <span className="text-xs text-muted-foreground">
                Page {page} / {totalPages}
              </span>
              <Button variant="outline" size="sm" onClick={() => setPage((p) => p + 1)} disabled={!hasNext}>
                Next
              </Button>
            </div>
          ) : null}
        </>
      )}
    </div>
  );
};

export default ArweaveUploadExpandedPanel;
