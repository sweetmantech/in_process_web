"use client";

import truncateAddress from "@/lib/truncateAddress";
import { getPrimaryWalletAddress } from "@/lib/wallets/getPrimaryWalletAddress";
import { ArtistsCollectorsStats } from "@/types/artistsCollectorsStats";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import SortableColumnHeader from "./SortableColumnHeader";

export default function getArtistsCollectorsStatsColumnDefs(): ColumnDef<ArtistsCollectorsStats>[] {
  return [
    {
      id: "username",
      accessorFn: (row) => row.username ?? row.artist_id,
      header: () => <span className="text-sm font-medium">Artist</span>,
      enableSorting: false,
      cell: ({ row }) => {
        const { wallets, username, artist_id } = row.original;
        const primaryAddress = getPrimaryWalletAddress(wallets);
        const href = primaryAddress ? `/${primaryAddress.toLowerCase()}` : `/${artist_id}`;
        const label = username || (primaryAddress ? truncateAddress(primaryAddress) : artist_id);
        return (
          <Link
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium hover:underline"
          >
            {label}
          </Link>
        );
      },
    },
    {
      accessorKey: "total_created_count",
      header: ({ column }) => (
        <SortableColumnHeader title="Moments Created" column={column} align="right" />
      ),
      cell: ({ row }) => <div className="text-right">{row.getValue("total_created_count")}</div>,
    },
    {
      accessorKey: "total_collected_count",
      header: ({ column }) => (
        <SortableColumnHeader title="Moments Collected" column={column} align="right" />
      ),
      cell: ({ row }) => <div className="text-right">{row.getValue("total_collected_count")}</div>,
    },
  ];
}
