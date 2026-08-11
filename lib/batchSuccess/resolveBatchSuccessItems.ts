import { BulkItem, BulkResultItem } from "@/types/bulk";

interface ResolveBatchSuccessItemsParams {
  hasLocalItems: boolean;
  resultItems: BulkResultItem[];
  bulkItems: BulkItem[];
  remoteItems?: BulkResultItem[];
  stickyItems: BulkResultItem[];
}

const mergeLocalResultItems = (
  resultItems: BulkResultItem[],
  bulkItems: BulkItem[]
): BulkResultItem[] =>
  resultItems.map((item, index) => {
    const live = bulkItems[index];
    if (!live) return item;
    return {
      ...item,
      name: item.name || live.name,
      previewUrl: item.previewUrl || live.previewUrl,
      fileUrl: item.fileUrl || live.fileUrl,
      mimeType: item.mimeType || live.mimeType,
      fileName: item.fileName || live.file.name,
      tokenId: item.tokenId,
    };
  });

/** Prefer local playable media, then remote hydrate, then sticky to avoid UI flash. */
const resolveBatchSuccessItems = ({
  hasLocalItems,
  resultItems,
  bulkItems,
  remoteItems,
  stickyItems,
}: ResolveBatchSuccessItemsParams): BulkResultItem[] => {
  if (hasLocalItems) {
    return mergeLocalResultItems(resultItems, bulkItems);
  }
  if (remoteItems?.length) {
    return remoteItems;
  }
  return stickyItems;
};

export default resolveBatchSuccessItems;
