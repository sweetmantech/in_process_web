import { IN_PROCESS_API } from "@/lib/consts";

export const toggleMoment = async (
  authHeaders: HeadersInit,
  momentId: string
): Promise<{ success: boolean }> => {
  const response = await fetch(`${IN_PROCESS_API}/moment/hide`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      ...authHeaders,
    },
    body: JSON.stringify({ momentId }),
  });

  if (!response.ok) {
    throw new Error(`Failed to toggle moment: ${response.statusText}`);
  }

  return response.json();
};
