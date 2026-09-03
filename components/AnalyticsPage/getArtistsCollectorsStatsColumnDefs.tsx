"use client";

import { getPrimaryWalletAddress } from "@/lib/wallets/getPrimaryWalletAddress";
import { ArtistsCollectorsStats } from "@/types/artistsCollectorsStats";
import { ColumnDef } from "@tanstack/react-table";
import AnalyticsTableArtistCell from "./AnalyticsTableArtistCell";
import AnalyticsTableNumericCell from "./AnalyticsTableNumericCell";
import SortableColumnHeader from "./SortableColumnHeader";

export default function getArtistsCollectorsStatsColumnDefs(): ColumnDef<ArtistsCollectorsStats>[] {
  return [
    {
      id: "username",
      accessorFn: (row) => row.username ?? row.artist_id,
      header: () => <span>Artist</span>,
      enableSorting: false,
      cell: ({ row }) => {
        const { wallets, username, artist_id } = row.original;
        const primaryAddress = getPrimaryWalletAddress(wallets);
        const href = primaryAddress ? `/${primaryAddress.toLowerCase()}` : `/${artist_id}`;
        const name = username || primaryAddress || artist_id;
        return <AnalyticsTableArtistCell name={name} href={href} />;
      },
    },
    {
      accessorKey: "total_created_count",
      header: ({ column }) => (
        <SortableColumnHeader title="Created" column={column} align="right" />
      ),
      cell: ({ row }) => <AnalyticsTableNumericCell value={row.getValue("total_created_count")} />,
    },
    {
      accessorKey: "total_collected_count",
      header: ({ column }) => (
        <SortableColumnHeader title="Collected" column={column} align="right" />
      ),
      cell: ({ row }) => <AnalyticsTableNumericCell value={row.getValue("total_collected_count")} />,
    },
  ];
}
