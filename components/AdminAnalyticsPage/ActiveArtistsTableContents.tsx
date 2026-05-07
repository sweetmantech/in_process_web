import { ActiveArtistStats } from "@/types/activeArtists";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface ActiveArtistsTableContentsProps {
  artists: ActiveArtistStats[];
}

const shortenAddress = (address: string) => `${address.slice(0, 6)}...${address.slice(-4)}`;

const ActiveArtistsTableContents = ({ artists }: ActiveArtistsTableContentsProps) => {
  return (
    <div className="overflow-auto rounded-md border">
      <Table className="min-w-[860px] md:min-w-0">
        <TableHeader>
          <TableRow>
            <TableHead className="w-48">Artist</TableHead>
            <TableHead className="w-36">Moments Created</TableHead>
            <TableHead className="w-40">Moments Airdropped</TableHead>
            <TableHead className="w-24">Telegram</TableHead>
            <TableHead className="w-24">Web</TableHead>
            <TableHead className="w-24">API</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {artists.map((artist) => (
            <TableRow key={artist.address}>
              <TableCell className="font-medium">
                {artist.username || shortenAddress(artist.address)}
              </TableCell>
              <TableCell>{artist.moments_created}</TableCell>
              <TableCell>{artist.airdropped}</TableCell>
              <TableCell>{artist.telegram_count}</TableCell>
              <TableCell>{artist.web_count}</TableCell>
              <TableCell>{artist.api_count}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ActiveArtistsTableContents;
