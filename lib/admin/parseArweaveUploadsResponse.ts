import type {
  ArweaveUpload,
  ArweaveUploadsParsedResponse,
  ArweaveUploadTransaction,
} from "@/types/arweave";

export function parseArweaveUploadsResponse(body: unknown): ArweaveUploadsParsedResponse {
  if (!body || typeof body !== "object" || !("uploads" in body)) {
    throw new Error("Invalid arweave uploads response");
  }
  const rec = body as Record<string, unknown>;
  const uploadsRaw = rec.uploads;
  const count = Number(rec.count ?? 0);
  if (!Array.isArray(uploadsRaw)) {
    throw new Error("Invalid arweave uploads response");
  }

  const listMode =
    uploadsRaw.length > 0
      ? "arweave_uri" in (uploadsRaw[0] as Record<string, unknown>)
        ? "detail"
        : "aggregate"
      : Object.prototype.hasOwnProperty.call(rec, "total_usdc_cost")
        ? "aggregate"
        : "detail";

  if (listMode === "detail") {
    return {
      variant: "detail",
      uploads: uploadsRaw.map((u) => {
        const row = u as Record<string, unknown>;
        return {
          id: String(row.id ?? ""),
          arweave_uri: String(row.arweave_uri ?? ""),
          winc_cost: String(row.winc_cost ?? ""),
          usdc_cost: row.usdc_cost as ArweaveUploadTransaction["usdc_cost"],
          file_size_bytes: row.file_size_bytes as ArweaveUploadTransaction["file_size_bytes"],
          content_type: row.content_type != null ? String(row.content_type) : null,
          created_at: String(row.created_at ?? ""),
        } satisfies ArweaveUploadTransaction;
      }),
      count,
    };
  }

  const total_usdc_cost =
    rec.total_usdc_cost != null && rec.total_usdc_cost !== ""
      ? Number(rec.total_usdc_cost)
      : undefined;

  return {
    variant: "aggregate",
    uploads: uploadsRaw.map((u) => {
      const row = u as Record<string, unknown>;
      return {
        winc_cost: String(row.winc_cost ?? ""),
        usdc_cost: String(row.usdc_cost ?? ""),
        file_size_bytes: row.file_size_bytes as ArweaveUpload["file_size_bytes"],
        artist: {
          address: String(row.artist_address ?? "").toLowerCase(),
          username: row.artist_username != null ? String(row.artist_username) : null,
        },
      } satisfies ArweaveUpload;
    }),
    count,
    total_usdc_cost,
  };
}
