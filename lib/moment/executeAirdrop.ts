import { IN_PROCESS_API } from "@/lib/consts";
import { Moment } from "@/types/moment";
import buildHeaders from "@/lib/http/buildHeaders";

interface ExecuteAirdropParams {
  airdropToItems: Array<{ address: string; email?: string }>;
  moment: Moment;
  headers: HeadersInit;
}

export const executeAirdrop = async ({ airdropToItems, moment, headers }: ExecuteAirdropParams) => {
  const recipients = airdropToItems.map((item) => item.email || item.address);

  const response = await fetch(`${IN_PROCESS_API}/moment/airdrop`, {
    method: "POST",
    body: JSON.stringify({
      recipients,
      moment,
    }),
    headers: buildHeaders(headers),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => null);
    throw new Error(error?.message || `Airdrop failed with status ${response.status}`);
  }

  const data = await response.json();
  return data.hash;
};
