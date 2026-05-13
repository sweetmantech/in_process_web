"use client";

import truncateAddress from "@/lib/truncateAddress";
import { ActiveArtistStats } from "@/types/activeArtists";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import SortableColumnHeader from "./SortableColumnHeader";

export default function getActiveArtistsColumnDefs(): ColumnDef<ActiveArtistStats>[] {
  return [
    {
      id: "username",
      accessorFn: (row) => row.username ?? row.address,
      header: () => <span className="text-sm font-medium">Artist</span>,
      enableSorting: false,
      cell: ({ row }) => {
        const { address, username } = row.original;
        const href = `/${address.toLowerCase()}`;
        const label = username || truncateAddress(address);
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
      accessorKey: "created_count",
      header: ({ column }) => (
        <SortableColumnHeader title="Moments Created" column={column} align="right" />
      ),
      cell: ({ row }) => <div className="text-right">{row.getValue("created_count")}</div>,
    },
    {
      accessorKey: "airdropped_count",
      header: ({ column }) => (
        <SortableColumnHeader title="Moments Airdropped" column={column} align="right" />
      ),
      cell: ({ row }) => <div className="text-right">{row.getValue("airdropped_count")}</div>,
    },
    {
      accessorKey: "telegram_count",
      header: ({ column }) => (
        <SortableColumnHeader title="Telegram" column={column} align="right" />
      ),
      cell: ({ row }) => <div className="text-right">{row.getValue("telegram_count")}</div>,
    },
    {
      accessorKey: "web_count",
      header: ({ column }) => <SortableColumnHeader title="Web" column={column} align="right" />,
      cell: ({ row }) => <div className="text-right">{row.getValue("web_count")}</div>,
    },
    {
      accessorKey: "api_count",
      header: ({ column }) => <SortableColumnHeader title="API" column={column} align="right" />,
      cell: ({ row }) => <div className="text-right">{row.getValue("api_count")}</div>,
    },
    {
      accessorKey: "sms_count",
      header: ({ column }) => <SortableColumnHeader title="SMS" column={column} align="right" />,
      cell: ({ row }) => <div className="text-right">{row.getValue("sms_count")}</div>,
    },
  ];
}
