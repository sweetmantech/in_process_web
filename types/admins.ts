import { Address } from "viem";

export interface AdminGroup {
  key: string;
  artistId: string | null;
  username: string | null;
  addresses: Address[];
}
