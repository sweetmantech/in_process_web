"use client";

import truncateAddress from "@/lib/truncateAddress";
import formatFileSize from "@/lib/formatFileSize";
import { ArweaveUpload } from "@/types/arweave";
import { ColumnDef } from "@tanstack/react-table";
import ArweaveUploadsSortableColumnHeader from "./ArweaveUploadsSortableColumnHeader";

export default function getArweaveUploadsColumnDefs(): ColumnDef<ArweaveUpload>[] {
  return [
    {
      id: "artist",
      accessorFn: (row) => row.artist.username ?? row.artist.address,
      enableSorting: false,
      header: () => <span className="text-sm font-medium">Artist</span>,
      cell: ({ row }) => {
        const artist = row.original.artist.username || truncateAddress(row.original.artist.address);
        return <span className="font-medium">{artist}</span>;
      },
    },
    {
      id: "size",
      accessorFn: (row) => row.file_size_bytes,
      enableSorting: true,
      header: ({ column }) => (
        <ArweaveUploadsSortableColumnHeader title="Size" column={column} align="right" />
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
        <ArweaveUploadsSortableColumnHeader title="WINC Cost" column={column} align="right" />
      ),
      cell: ({ row }) => <div className="text-right">{row.original.winc_cost}</div>,
    },
    {
      id: "usdc_cost",
      accessorKey: "usdc_cost",
      enableSorting: true,
      header: ({ column }) => (
        <ArweaveUploadsSortableColumnHeader title="USDC Cost" column={column} align="right" />
      ),
      cell: ({ row }) => <div className="text-right">{row.original.usdc_cost}</div>,
    },
  ];
}
