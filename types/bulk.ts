import type { MomentMetadata } from "@/types/moment";

export type BulkItemStatus = "idle" | "uploading" | "done" | "error";

export interface BulkItem {
  id: string;
  file: File;
  previewFile: File | null;
  mimeType: string;
  name: string;
  /** Object URL for the primary media file (video/pdf/audio/glb/image). */
  fileUrl: string;
  /** Object URL for thumbnail/poster when different from the primary file. */
  previewUrl: string;
  status: BulkItemStatus;
  progress: number;
  tokenId?: string;
  error?: string;
}

export interface BulkResultItem {
  name: string;
  previewUrl: string;
  fileUrl: string;
  mimeType: string;
  fileName: string;
  tokenId: string;
  /** Present when hydrated from the moment API (e.g. after refresh). */
  metadata?: MomentMetadata | null;
}

export interface BulkResult {
  contractAddress: string;
  tokenIds: string[];
  items: BulkResultItem[];
}
