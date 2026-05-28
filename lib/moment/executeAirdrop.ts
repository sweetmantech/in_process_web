import { IN_PROCESS_API } from "@/lib/consts";
import { Moment } from "@/types/moment";
import buildHeaders from "@/lib/http/buildHeaders";

interface ExecuteAirdropParams {
  airdropToItems: Array<{ address: string }>;
  moment: Moment;
  headers: HeadersInit;
}

export const executeAirdrop = async ({ airdropToItems, moment, headers }: ExecuteAirdropParams) => {
  const recipients = airdropToItems.map((item) => item.address);

  // Execute airdrop API call
  const response = await fetch(`${IN_PROCESS_API}/moment/airdrop`, {
    method: "POST",
    body: JSON.stringify({
      recipients,
      moment,
    }),
    headers: buildHeaders(headers),
  });

  if (!response.ok) throw new Error();

  const data = await response.json();
  return data.hash;
};
