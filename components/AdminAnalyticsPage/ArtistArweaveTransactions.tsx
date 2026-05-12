"use client";

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
import { useArtistArweaveTransactions } from "@/hooks/useArtistArweaveTransactions";
import { AnalyticsPeriod } from "@/types/timeline";

interface ArtistArweaveTransactionsProps {
  artistQueryValue: string;
  period: AnalyticsPeriod | undefined;
}

const ArtistArweaveTransactions = ({
  artistQueryValue,
  period,
}: ArtistArweaveTransactionsProps) => {
  const { transactions, isPending, isError } = useArtistArweaveTransactions({
    artist: artistQueryValue,
    period,
  });

  if (isPending) {
    return <p className="text-muted-foreground px-2 py-3 text-sm">Loading uploads…</p>;
  }

  if (isError) {
    return <p className="text-destructive px-2 py-3 text-sm">Could not load uploads.</p>;
  }

  if (transactions.length === 0) {
    return <p className="text-muted-foreground px-2 py-3 text-sm">No uploads for this artist.</p>;
  }

  return (
    <div className="bg-muted/30 rounded-md border px-2 py-2">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="whitespace-normal">Created</TableHead>
            <TableHead className="whitespace-normal">URI</TableHead>
            <TableHead className="whitespace-normal">Type</TableHead>
            <TableHead className="w-28 text-right whitespace-normal">Size</TableHead>
            <TableHead className="w-24 text-right whitespace-normal">WINC</TableHead>
            <TableHead className="w-24 text-right whitespace-normal">USDC</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((tx) => (
            <TableRow key={tx.id}>
              <TableCell className="whitespace-nowrap text-sm">
                {formatDate(tx.created_at)}
              </TableCell>
              <TableCell className="max-w-[14rem] truncate font-mono text-xs">
                {tx.arweave_uri}
              </TableCell>
              <TableCell className="text-sm">{tx.content_type}</TableCell>
              <TableCell className="text-right text-sm">
                {formatFileSize(tx.file_size_bytes)}
              </TableCell>
              <TableCell className="text-right text-sm">{tx.winc_cost}</TableCell>
              <TableCell className="text-right text-sm">{tx.usdc_cost}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ArtistArweaveTransactions;
