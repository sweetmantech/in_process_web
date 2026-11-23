import { CREATE_REQUEST_TIMEOUT_MS, IN_PROCESS_API } from "@/lib/consts";
import CreatePendingError from "./CreatePendingError";

export async function postCreateRequest(path: string, body: unknown): Promise<Response> {
  try {
    return await fetch(`${IN_PROCESS_API}${path}`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(CREATE_REQUEST_TIMEOUT_MS),
    });
  } catch (error) {
    console.error(error);
    throw new CreatePendingError();
  }
}
