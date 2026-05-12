"use client";

import formatDate from "@/lib/date/formateDate";
import formatFileSizeMb from "@/lib/formatFileSizeMb";
import formatUsdcAmount from "@/lib/formatUsdcAmount";
import { ArweaveUploadTransaction } from "@/types/arweave";
import { ColumnDef } from "@tanstack/react-table";
import ArweaveUploadsSortableColumnHeader from "./ArweaveUploadsSortableColumnHeader";

const truncateUri = (uri: string) =>
  uri.length <= 40 ? uri : `${uri.slice(0, 18)}…${uri.slice(-14)}`;

export default function getArweaveUploadTransactionColumnDefs(
  manualSorting: boolean
): ColumnDef<ArweaveUploadTransaction>[] {
  return [
    {
      id: "created_at",
      accessorKey: "created_at",
      enableSorting: false,
      header: () => <span className="text-sm font-medium">Date</span>,
      cell: ({ row }) => (
        <span className="whitespace-nowrap text-sm">{formatDate(row.original.created_at)}</span>
      ),
    },
    {
      id: "content_type",
      accessorKey: "content_type",
      enableSorting: false,
      header: () => <span className="text-sm font-medium">Type</span>,
      cell: ({ row }) => <span className="text-sm">{row.original.content_type ?? "—"}</span>,
    },
    {
      id: "size",
      accessorKey: "file_size_bytes",
      enableSorting: manualSorting,
      header: manualSorting
        ? ({ column }) => <ArweaveUploadsSortableColumnHeader title="Size (MiB)" column={column} align="right" />
        : () => <span className="text-sm font-medium">Size (MiB)</span>,
      cell: ({ row }) => {
        const raw = row.original.file_size_bytes;
        const bytes = typeof raw === "string" ? Number(raw) : raw;
        const label = typeof bytes === "number" && Number.isFinite(bytes) ? formatFileSizeMb(bytes) : "—";
        return <div className="text-right text-sm">{label}</div>;
      },
    },
    {
      id: "winc_cost",
      accessorKey: "winc_cost",
      enableSorting: manualSorting,
      header: manualSorting
        ? ({ column }) => <ArweaveUploadsSortableColumnHeader title="WINC Cost" column={column} align="right" />
        : () => <span className="text-sm font-medium">WINC Cost</span>,
      cell: ({ row }) => <div className="text-right text-sm">{row.original.winc_cost}</div>,
    },
    {
      id: "usdc_cost",
      accessorKey: "usdc_cost",
      enableSorting: manualSorting,
      header: manualSorting
        ? ({ column }) => <ArweaveUploadsSortableColumnHeader title="USDC Cost" column={column} align="right" />
        : () => <span className="text-sm font-medium">USDC Cost</span>,
      cell: ({ row }) => (
        <div className="text-right text-sm">{formatUsdcAmount(Number(row.original.usdc_cost))}</div>
      ),
    },
    {
      id: "arweave_uri",
      accessorKey: "arweave_uri",
      enableSorting: false,
      header: () => <span className="text-sm font-medium">URI</span>,
      cell: ({ row }) => {
        const uri = row.original.arweave_uri;
        return (
          <a
            href={uri}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-primary underline-offset-4 hover:underline"
            onClick={(e) => e.stopPropagation()}
          >
            {truncateUri(uri)}
          </a>
        );
      },
    },
  ];
}
