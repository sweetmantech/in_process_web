"use client";

import truncateAddress from "@/lib/truncateAddress";
import { CollectorStats } from "@/types/collectors";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import SortableColumnHeader from "./SortableColumnHeader";

export default function getCollectorsColumnDefs(): ColumnDef<CollectorStats>[] {
  return [
    {
      id: "username",
      accessorFn: (row) => row.username ?? row.collector,
      header: () => <span className="text-sm font-medium">Collector</span>,
      enableSorting: false,
      cell: ({ row }) => {
        const { collector, username } = row.original;
        const href = `/${collector.toLowerCase()}`;
        const label = username || truncateAddress(collector);
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
