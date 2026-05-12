"use client";

import formatFileSizeMb from "@/lib/formatFileSizeMb";
import { cn } from "@/lib/utils";
import truncateAddress from "@/lib/truncateAddress";
import { ArweaveUpload } from "@/types/arweave";
import { ColumnDef } from "@tanstack/react-table";
import { ChevronDown } from "lucide-react";
import ArweaveUploadsSortableColumnHeader from "./ArweaveUploadsSortableColumnHeader";

export default function getArweaveUploadsColumnDefs(
  expandedArtistAddress: string | null
): ColumnDef<ArweaveUpload>[] {
  return [
    {
      id: "expand",
      enableSorting: false,
      header: () => <span className="sr-only">Expand</span>,
      cell: ({ row }) => {
        const open = expandedArtistAddress === row.original.artist.address.toLowerCase();
        return (
          <ChevronDown
            className={cn("h-4 w-4 shrink-0 text-muted-foreground transition-transform", open && "rotate-180")}
            aria-hidden
          />
        );
      },
    },
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
    {
      id: "size",
      accessorKey: "file_size_bytes",
      enableSorting: true,
      header: ({ column }) => (
        <ArweaveUploadsSortableColumnHeader title="Size (MiB)" column={column} align="right" />
      ),
      cell: ({ row }) => {
        const raw = row.original.file_size_bytes;
        const bytes = typeof raw === "string" ? Number(raw) : raw;
        const label = typeof bytes === "number" && Number.isFinite(bytes) ? formatFileSizeMb(bytes) : "—";
        return <div className="text-right">{label}</div>;
      },
    },
  ];
}
