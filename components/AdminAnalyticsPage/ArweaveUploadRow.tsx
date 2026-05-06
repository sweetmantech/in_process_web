import { Badge } from "@/components/ui/badge";
import { TableCell, TableRow } from "@/components/ui/table";
import { ArweaveUploadLog } from "@/types/arweave";

interface ArweaveUploadRowProps {
  log: ArweaveUploadLog;
}

const ArweaveUploadRow = ({ log }: ArweaveUploadRowProps) => {
  const artist =
    log.artist.username ||
    `${log.artist.artist_address.slice(0, 6)}...${log.artist.artist_address.slice(-4)}`;
  const fileSizeMb = (log.file_size_bytes / (1024 * 1024)).toFixed(2);

  return (
    <TableRow>
      <TableCell className="font-mono text-xs">{log.arweave_uri}</TableCell>
      <TableCell>{artist}</TableCell>
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
