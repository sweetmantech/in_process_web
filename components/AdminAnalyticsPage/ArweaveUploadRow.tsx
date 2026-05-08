import { Badge } from "@/components/ui/badge";
import { TableCell, TableRow } from "@/components/ui/table";
import formatFileSizeMb from "@/lib/formatFileSizeMb";
import truncateAddress from "@/lib/truncateAddress";
import { ArweaveUpload } from "@/types/arweave";

interface ArweaveUploadRowProps {
  upload: ArweaveUpload;
}

const ArweaveUploadRow = ({ upload }: ArweaveUploadRowProps) => {
  const artist = upload.artist.username || truncateAddress(upload.artist.address);
  const fileSizeMb = formatFileSizeMb(upload.file_size_bytes);

  return (
    <TableRow>
      <TableCell>{artist}</TableCell>
      <TableCell className="font-mono text-xs">{upload.arweave_uri}</TableCell>
      <TableCell>{upload.winc_cost}</TableCell>
      <TableCell>{upload.usdc_cost ?? "-"}</TableCell>
      <TableCell>{fileSizeMb} MB</TableCell>
      <TableCell>
        <Badge variant="outline">{upload.content_type ?? "-"}</Badge>
      </TableCell>
      <TableCell className="text-neutral-500">
        {new Date(upload.created_at).toLocaleString()}
      </TableCell>
    </TableRow>
  );
};

export default ArweaveUploadRow;
