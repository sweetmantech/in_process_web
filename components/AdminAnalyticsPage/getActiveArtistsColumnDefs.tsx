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
      header: ({ column }) => (
        <ActiveArtistsSortableColumnHeader title="Artist" column={column} align="left" />
      ),
      cell: ({ row }) => (
        <span className="font-medium">
          {row.original.username || truncateAddress(row.original.address)}
        </span>
      ),
    },
    {
      accessorKey: "moments_created",
      header: ({ column }) => (
        <ActiveArtistsSortableColumnHeader title="Moments Created" column={column} align="right" />
      ),
      cell: ({ row }) => <div className="text-right">{row.getValue("moments_created")}</div>,
    },
    {
      accessorKey: "airdropped",
      header: ({ column }) => (
        <ActiveArtistsSortableColumnHeader
          title="Moments Airdropped"
          column={column}
          align="right"
        />
      ),
      cell: ({ row }) => <div className="text-right">{row.getValue("airdropped")}</div>,
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
  ];
}
