export type BulkItemStatus = "idle" | "uploading" | "done" | "error";

export interface BulkItem {
  id: string;
  file: File;
  previewFile: File | null;
  mimeType: string;
  name: string;
  previewUrl: string;
  status: BulkItemStatus;
  progress: number;
  tokenId?: string;
  error?: string;
}

export interface BulkResult {
  contractAddress: string;
  tokenIds: string[];
  items: Array<{ name: string; previewUrl: string; tokenId: string }>;
}
