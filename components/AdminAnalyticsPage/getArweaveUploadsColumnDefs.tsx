"use client";

import { Badge } from "@/components/ui/badge";
import formatFileSizeMb from "@/lib/formatFileSizeMb";
import truncateAddress from "@/lib/truncateAddress";
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
      accessorKey: "arweave_uri",
      enableSorting: false,
      header: () => <span className="text-sm font-medium">Arweave URI</span>,
      cell: ({ row }) => <span className="font-mono text-xs">{row.original.arweave_uri}</span>,
    },
    {
      accessorKey: "winc_cost",
      enableSorting: false,
      header: () => <span className="text-sm font-medium">WINC Cost</span>,
    },
    {
      id: "usdc_cost",
      accessorKey: "usdc_cost",
      enableSorting: true,
      header: ({ column }) => (
        <ArweaveUploadsSortableColumnHeader title="USDC Cost" column={column} align="right" />
      ),
      cell: ({ row }) => <div className="text-right">{row.original.usdc_cost ?? "-"}</div>,
    },
    {
      id: "size",
      accessorKey: "file_size_bytes",
      enableSorting: true,
      header: ({ column }) => (
        <ArweaveUploadsSortableColumnHeader title="Size" column={column} align="right" />
      ),
      cell: ({ row }) => (
        <div className="text-right">{formatFileSizeMb(row.original.file_size_bytes)} MB</div>
      ),
    },
    {
      accessorKey: "content_type",
      enableSorting: false,
      header: () => <span className="text-sm font-medium">Type</span>,
      cell: ({ row }) => <Badge variant="outline">{row.original.content_type ?? "-"}</Badge>,
    },
    {
      id: "created_at",
      accessorKey: "created_at",
      enableSorting: true,
      header: ({ column }) => (
        <ArweaveUploadsSortableColumnHeader title="Uploaded At" column={column} />
      ),
      cell: ({ row }) => (
        <span className="text-neutral-500">
          {new Date(row.original.created_at).toLocaleString()}
        </span>
      ),
    },
  ];
}
