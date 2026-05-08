import { Moment } from "@/types/moment";
import { IN_PROCESS_API } from "@/lib/consts";

interface CallUpdateMomentURIInput {
  moment: Moment;
  newUri: string;
  authHeaders: HeadersInit;
}

export async function callUpdateMomentURI({
  moment,
  newUri,
  authHeaders,
}: CallUpdateMomentURIInput): Promise<void> {
  try {
    const response = await fetch(`${IN_PROCESS_API}/moment/update-uri`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        ...authHeaders,
      },
      body: JSON.stringify({
        moment,
        newUri,
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to update moment metadata");
    }
    return data.hash;
  } catch (error: any) {
    throw new Error(error?.message || "Failed to update moment metadata");
  }
}
