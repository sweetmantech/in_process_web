import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArweaveUploadLog } from "@/types/arweave";
import ArweaveUploadRow from "./ArweaveUploadRow";

interface ArweaveUploadsTableContentsProps {
  logs: ArweaveUploadLog[];
}

const ArweaveUploadsTableContents = ({ logs }: ArweaveUploadsTableContentsProps) => {
  return (
    <div className="overflow-auto rounded-md border">
      <Table className="min-w-[1000px] md:min-w-0">
        <TableHeader>
          <TableRow>
            <TableHead>Arweave URI</TableHead>
            <TableHead className="w-40">Artist</TableHead>
            <TableHead className="w-28">WINC Cost</TableHead>
            <TableHead className="w-28">USDC Cost</TableHead>
            <TableHead className="w-28">Size</TableHead>
            <TableHead className="w-36">Type</TableHead>
            <TableHead className="w-48">Uploaded At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {logs.map((log) => (
            <ArweaveUploadRow key={log.id} log={log} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ArweaveUploadsTableContents;
