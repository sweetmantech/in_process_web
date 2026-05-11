"use client";

import truncateAddress from "@/lib/truncateAddress";
import { ActiveArtistStats } from "@/types/activeArtists";
import { ColumnDef } from "@tanstack/react-table";
import ActiveArtistsSortableColumnHeader from "./ActiveArtistsSortableColumnHeader";

export default function getActiveArtistsColumnDefs(): ColumnDef<ActiveArtistStats>[] {
  return [
    {
      id: "username",
      accessorFn: (row) => row.username ?? row.address,
      header: () => <span className="text-sm font-medium">Artist</span>,
      enableSorting: false,
      cell: ({ row }) => (
        <span className="font-medium">
          {row.original.username || truncateAddress(row.original.address)}
        </span>
      ),
    },
    {
      accessorKey: "created_count",
      header: ({ column }) => (
        <ActiveArtistsSortableColumnHeader title="Moments Created" column={column} align="right" />
      ),
      cell: ({ row }) => <div className="text-right">{row.getValue("created_count")}</div>,
    },
    {
      accessorKey: "airdropped_count",
      header: ({ column }) => (
        <ActiveArtistsSortableColumnHeader
          title="Moments Airdropped"
          column={column}
          align="right"
        />
      ),
      cell: ({ row }) => <div className="text-right">{row.getValue("airdropped_count")}</div>,
    },
    {
      accessorKey: "telegram_count",
      header: ({ column }) => (
        <ActiveArtistsSortableColumnHeader title="Telegram" column={column} align="right" />
      ),
      cell: ({ row }) => <div className="text-right">{row.getValue("telegram_count")}</div>,
    },
    {
      accessorKey: "web_count",
      header: ({ column }) => (
        <ActiveArtistsSortableColumnHeader title="Web" column={column} align="right" />
      ),
      cell: ({ row }) => <div className="text-right">{row.getValue("web_count")}</div>,
    },
    {
      accessorKey: "api_count",
      header: ({ column }) => (
        <ActiveArtistsSortableColumnHeader title="API" column={column} align="right" />
      ),
      cell: ({ row }) => <div className="text-right">{row.getValue("api_count")}</div>,
    },
    {
      accessorKey: "sms_count",
      header: ({ column }) => (
        <ActiveArtistsSortableColumnHeader title="SMS" column={column} align="right" />
      ),
      cell: ({ row }) => <div className="text-right">{row.getValue("sms_count")}</div>,
    },
  ];
}
