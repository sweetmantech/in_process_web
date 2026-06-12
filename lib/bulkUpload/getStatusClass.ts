import { BulkItem } from "@/types/bulk";

const statusClass: Record<BulkItem["status"], string> = {
  idle: "border-grey-moss-300",
  uploading: "border-blue-400",
  done: "border-green-400",
  error: "border-red-400",
};

export const getStatusClass = (status: BulkItem["status"]): string => statusClass[status];
