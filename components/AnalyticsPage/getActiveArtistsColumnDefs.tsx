"use client";

import { getPrimaryWalletAddress } from "@/lib/wallets/getPrimaryWalletAddress";
import { ActiveArtistStats } from "@/types/activeArtists";
import { ColumnDef } from "@tanstack/react-table";
import AnalyticsTableArtistCell from "./AnalyticsTableArtistCell";
import AnalyticsTableNumericCell from "./AnalyticsTableNumericCell";
import SortableColumnHeader from "./SortableColumnHeader";

export default function getActiveArtistsColumnDefs(): ColumnDef<ActiveArtistStats>[] {
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
      accessorKey: "created_count",
      header: ({ column }) => (
        <SortableColumnHeader title="Created" column={column} align="right" />
      ),
      cell: ({ row }) => <AnalyticsTableNumericCell value={row.getValue("created_count")} />,
    },
    {
      accessorKey: "airdropped_count",
      header: ({ column }) => (
        <SortableColumnHeader title="Airdropped" column={column} align="right" />
      ),
      cell: ({ row }) => <AnalyticsTableNumericCell value={row.getValue("airdropped_count")} />,
    },
    {
      accessorKey: "telegram_count",
      header: ({ column }) => (
        <SortableColumnHeader title="Telegram" column={column} align="right" />
      ),
      cell: ({ row }) => <AnalyticsTableNumericCell value={row.getValue("telegram_count")} />,
    },
    {
      accessorKey: "web_count",
      header: ({ column }) => <SortableColumnHeader title="Web" column={column} align="right" />,
      cell: ({ row }) => <AnalyticsTableNumericCell value={row.getValue("web_count")} />,
    },
    {
      accessorKey: "api_count",
      header: ({ column }) => <SortableColumnHeader title="API" column={column} align="right" />,
      cell: ({ row }) => <AnalyticsTableNumericCell value={row.getValue("api_count")} />,
    },
    {
      accessorKey: "sms_count",
      header: ({ column }) => <SortableColumnHeader title="SMS" column={column} align="right" />,
      cell: ({ row }) => <AnalyticsTableNumericCell value={row.getValue("sms_count")} />,
    },
  ];
}
