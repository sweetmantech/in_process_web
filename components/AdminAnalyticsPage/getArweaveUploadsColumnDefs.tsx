"use client";

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
