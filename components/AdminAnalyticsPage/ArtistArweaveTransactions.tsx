"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import formatDate from "@/lib/date/formateDate";
import formatFileSize from "@/lib/formatFileSize";
import { useArweaveUploadsProvider } from "@/providers/ArweaveUploadsProvider";

const ArtistArweaveTransactions = () => {
  const {
    transactions,
    isPending,
    isError,
    data,
    currentPage,
    totalPages,
    hasPrevPage,
    hasNextPage,
    goPrevPage,
    goNextPage,
  } = useArweaveUploadsProvider();

  if (isPending && data === undefined) {
    return <p className="text-muted-foreground px-2 py-3 text-xs">Loading uploads…</p>;
  }

  if (isError) {
    return <p className="text-destructive px-2 py-3 text-xs">Could not load uploads.</p>;
  }

  if (transactions.length === 0) {
    return <p className="text-muted-foreground px-2 py-3 text-xs">No uploads for this artist.</p>;
  }

  return (
    <div className="text-xs space-y-3">
      <div className="bg-muted/30 rounded-md border px-2 py-2">
        <Table className="text-xs [&_td]:py-1.5 [&_th]:h-8 [&_th]:py-1.5 [&_td]:leading-snug [&_th]:leading-snug">
          <TableHeader>
            <TableRow>
              <TableHead className="whitespace-normal">URI</TableHead>
              <TableHead className="whitespace-normal">Type</TableHead>
              <TableHead className="w-28 text-right whitespace-normal">Size</TableHead>
              <TableHead className="w-24 text-right whitespace-normal">WINC</TableHead>
              <TableHead className="w-24 text-right whitespace-normal">USDC</TableHead>
              <TableHead className="min-w-[10rem] text-right whitespace-normal">Created</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((tx) => (
              <TableRow key={tx.id}>
                <TableCell className="max-w-[14rem] truncate font-mono">{tx.arweave_uri}</TableCell>
                <TableCell>{tx.content_type}</TableCell>
                <TableCell className="text-right">{formatFileSize(tx.file_size_bytes)}</TableCell>
                <TableCell className="text-right">{tx.winc_cost}</TableCell>
                <TableCell className="text-right">{tx.usdc_cost}</TableCell>
                <TableCell className="whitespace-nowrap text-right">
                  {formatDate(tx.created_at)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="text-muted-foreground flex items-center justify-between px-1">
        <Button
          variant="outline"
          size="sm"
          className="h-7 text-xs"
          onClick={goPrevPage}
          disabled={!hasPrevPage}
        >
          Previous
        </Button>
        <span>
          {currentPage} of {totalPages}
        </span>
        <Button
          variant="outline"
          size="sm"
          className="h-7 text-xs"
          onClick={goNextPage}
          disabled={!hasNextPage}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default ArtistArweaveTransactions;
