"use client";

import truncateAddress from "@/lib/utils/truncateAddress";
import { getPrimaryWalletAddress } from "@/lib/wallets/getPrimaryWalletAddress";
import { CollectorStats } from "@/types/collectors";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import SortableColumnHeader from "./SortableColumnHeader";

export default function getCollectorsColumnDefs(): ColumnDef<CollectorStats>[] {
  return [
    {
      id: "username",
      accessorFn: (row) => row.username ?? row.artist_id,
      header: () => <span className="text-sm font-medium">Collector</span>,
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
      accessorKey: "collected_count",
      header: ({ column }) => (
        <SortableColumnHeader title="Collected" column={column} align="right" />
      ),
      cell: ({ row }) => <div className="text-right">{row.getValue("collected_count")}</div>,
    },
    {
      accessorKey: "eth_spent",
      header: ({ column }) => (
        <SortableColumnHeader title="ETH Spent" column={column} align="right" />
      ),
      cell: ({ row }) => {
        const val = parseFloat(row.getValue<string>("eth_spent"));
        return <div className="text-right">{isNaN(val) ? "0" : val.toFixed(4)}</div>;
      },
    },
    {
      accessorKey: "usdc_spent",
      header: ({ column }) => (
        <SortableColumnHeader title="USDC Spent" column={column} align="right" />
      ),
      cell: ({ row }) => {
        const val = parseFloat(row.getValue<string>("usdc_spent"));
        return <div className="text-right">{isNaN(val) ? "0" : val.toFixed(2)}</div>;
      },
    },
  ];
}
