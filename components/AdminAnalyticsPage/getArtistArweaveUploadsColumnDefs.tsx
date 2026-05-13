"use client";

import formatDate from "@/lib/date/formateDate";
import formatFileSize from "@/lib/formatFileSize";
import { ArtistArweaveTransaction } from "@/types/arweave";
import { ColumnDef } from "@tanstack/react-table";
import SortableColumnHeader from "./SortableColumnHeader";

export default function getArtistArweaveUploadsColumnDefs(): ColumnDef<ArtistArweaveTransaction>[] {
  return [
    {
      id: "arweave_uri",
      accessorKey: "arweave_uri",
      enableSorting: false,
      header: () => <span className="text-xs font-medium">URI</span>,
      cell: ({ row }) => <span className="font-mono">{row.original.arweave_uri}</span>,
    },
    {
      id: "content_type",
      accessorKey: "content_type",
      enableSorting: false,
      header: () => <span className="text-xs font-medium">Type</span>,
      cell: ({ row }) => row.original.content_type,
    },
    {
      id: "size",
      accessorFn: (row) => row.file_size_bytes,
      enableSorting: true,
      header: ({ column }) => (
        <SortableColumnHeader title="Size" column={column} align="right" size="compact" />
      ),
      cell: ({ row }) => (
        <div className="text-right">{formatFileSize(row.original.file_size_bytes)}</div>
      ),
    },
    {
      id: "winc_cost",
      accessorKey: "winc_cost",
      enableSorting: true,
      header: ({ column }) => (
        <SortableColumnHeader title="WINC" column={column} align="right" size="compact" />
      ),
      cell: ({ row }) => <div className="text-right">{row.original.winc_cost}</div>,
    },
    {
      id: "usdc_cost",
      accessorKey: "usdc_cost",
      enableSorting: true,
      header: ({ column }) => (
        <SortableColumnHeader title="USDC" column={column} align="right" size="compact" />
      ),
      cell: ({ row }) => <div className="text-right">{row.original.usdc_cost}</div>,
    },
    {
      id: "created_at",
      accessorKey: "created_at",
      enableSorting: false,
      header: () => <div className="text-right text-xs font-medium">Created</div>,
      cell: ({ row }) => (
        <div className="whitespace-nowrap text-right">{formatDate(row.original.created_at)}</div>
      ),
    },
  ];
}
