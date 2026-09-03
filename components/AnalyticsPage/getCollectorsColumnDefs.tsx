"use client";

import { getPrimaryWalletAddress } from "@/lib/wallets/getPrimaryWalletAddress";
import { CollectorStats } from "@/types/collectors";
import { ColumnDef } from "@tanstack/react-table";
import AnalyticsTableArtistCell from "./AnalyticsTableArtistCell";
import AnalyticsTableNumericCell from "./AnalyticsTableNumericCell";
import SortableColumnHeader from "./SortableColumnHeader";

const formatEth = (value: string) => {
  const parsed = parseFloat(value);
  return isNaN(parsed) ? "0.0000" : parsed.toFixed(4);
};

const formatUsdc = (value: string) => {
  const parsed = parseFloat(value);
  return isNaN(parsed) ? "0.00" : parsed.toFixed(2);
};

export default function getCollectorsColumnDefs(): ColumnDef<CollectorStats>[] {
  return [
    {
      id: "username",
      accessorFn: (row) => row.username ?? row.artist_id,
      header: () => <span>Collector</span>,
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
      accessorKey: "collected_count",
      header: ({ column }) => (
        <SortableColumnHeader title="Collected" column={column} align="right" />
      ),
      cell: ({ row }) => <AnalyticsTableNumericCell value={row.getValue("collected_count")} />,
    },
    {
      accessorKey: "eth_spent",
      header: ({ column }) => (
        <SortableColumnHeader title="ETH spent" column={column} align="right" />
      ),
      cell: ({ row }) => <AnalyticsTableNumericCell value={formatEth(row.getValue("eth_spent"))} />,
    },
    {
      accessorKey: "usdc_spent",
      header: ({ column }) => (
        <SortableColumnHeader title="USDC spent" column={column} align="right" />
      ),
      cell: ({ row }) => (
        <AnalyticsTableNumericCell value={formatUsdc(row.getValue("usdc_spent"))} />
      ),
    },
  ];
}
