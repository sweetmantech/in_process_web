"use client";

import { useMemo } from "react";
import ContentRenderer from "@/components/Renderers";
import { buildBulkItemMetadata } from "@/lib/bulkUpload/buildBulkItemMetadata";
import { BulkResultItem } from "@/types/bulk";

interface BatchSuccessMediaPreviewProps {
  item: BulkResultItem;
}

const BatchSuccessMediaPreview = ({ item }: BatchSuccessMediaPreviewProps) => {
  const metadata = useMemo(() => {
    if (item.metadata) return item.metadata;
    if (!item.fileUrl) return null;
    return buildBulkItemMetadata(
      {
        name: item.name,
        mimeType: item.mimeType,
        previewUrl: item.previewUrl,
        fileName: item.fileName,
      },
      item.fileUrl
    );
  }, [item]);

  if (!metadata) {
    return (
      <div className="flex size-full items-center justify-center">
        <p className="font-archivo text-[12.5px] uppercase tracking-[0.06em] text-[#A8A296]">
          Preview
        </p>
      </div>
    );
  }

  return (
    <div className="relative size-full overflow-hidden">
      <ContentRenderer metadata={metadata} variant="fill" />
    </div>
  );
};

export default BatchSuccessMediaPreview;
