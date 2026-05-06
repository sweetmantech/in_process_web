import { Badge } from "@/components/ui/badge";
import { TableCell, TableRow } from "@/components/ui/table";
import formatFileSizeMb from "@/lib/formatFileSizeMb";
import truncateAddress from "@/lib/truncateAddress";
import { ArweaveUploadLog } from "@/types/arweave";

interface ArweaveUploadRowProps {
  log: ArweaveUploadLog;
}

const ArweaveUploadRow = ({ log }: ArweaveUploadRowProps) => {
  const artist = log.artist.username || truncateAddress(log.artist.address);
  const fileSizeMb = formatFileSizeMb(log.file_size_bytes);

  return (
    <TableRow>
      <TableCell>{artist}</TableCell>
      <TableCell className="font-mono text-xs">{log.arweave_uri}</TableCell>
      <TableCell>{log.winc_cost}</TableCell>
      <TableCell>{log.usdc_cost ?? "-"}</TableCell>
      <TableCell>{fileSizeMb} MB</TableCell>
      <TableCell>
        <Badge variant="outline">{log.content_type ?? "-"}</Badge>
      </TableCell>
      <TableCell className="text-neutral-500">
        {new Date(log.created_at).toLocaleString()}
      </TableCell>
    </TableRow>
  );
};

export default ArweaveUploadRow;
