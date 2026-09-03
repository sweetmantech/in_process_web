"use client";

import formatFileSize from "@/lib/format/formatFileSize";
import { ArweaveUpload } from "@/types/arweave";
import { ColumnDef } from "@tanstack/react-table";
import AnalyticsTableArtistCell from "./AnalyticsTableArtistCell";
import AnalyticsTableNumericCell from "./AnalyticsTableNumericCell";
import SortableColumnHeader from "./SortableColumnHeader";

export default function getArweaveUploadsColumnDefs(): ColumnDef<ArweaveUpload>[] {
  return [
    {
      id: "artist",
      accessorFn: (row) => row.artist_username ?? row.artist_address,
      enableSorting: false,
      header: () => <span>Artist</span>,
      cell: ({ row }) => {
        const name = row.original.artist_username || row.original.artist_address;
        const href = row.original.artist_address
          ? `/${row.original.artist_address.toLowerCase()}`
          : undefined;
        return <AnalyticsTableArtistCell name={name} href={href} />;
      },
    },
    {
      id: "size",
      accessorFn: (row) => row.file_size_bytes,
      enableSorting: true,
      header: ({ column }) => <SortableColumnHeader title="Size" column={column} align="right" />,
      cell: ({ row }) => (
        <div className="text-right text-[13.5px] tabular-nums text-[#1B1504]">
          {formatFileSize(row.original.file_size_bytes)}
        </div>
      ),
    },
    {
      id: "winc_cost",
      accessorKey: "winc_cost",
      enableSorting: true,
      header: ({ column }) => (
        <SortableColumnHeader title="WINC cost" column={column} align="right" />
      ),
      cell: ({ row }) => <AnalyticsTableNumericCell value={row.original.winc_cost} />,
    },
    {
      id: "usdc_cost",
      accessorKey: "usdc_cost",
      enableSorting: true,
      header: ({ column }) => (
        <SortableColumnHeader title="USDC cost" column={column} align="right" />
      ),
      cell: ({ row }) => <AnalyticsTableNumericCell value={row.original.usdc_cost} />,
    },
  ];
}
