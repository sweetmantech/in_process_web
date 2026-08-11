"use client";

import { useMemo } from "react";
import ContentRenderer from "@/components/Renderers";
import { buildBulkItemMetadata } from "@/lib/bulkUpload/buildBulkItemMetadata";
import { BulkItem } from "@/types/bulk";

interface BulkMediaPreviewProps {
  item: BulkItem;
}

const BulkMediaPreview = ({ item }: BulkMediaPreviewProps) => {
  const metadata = useMemo(
    () =>
      buildBulkItemMetadata(
        {
          name: item.name,
          mimeType: item.mimeType,
          previewUrl: item.previewUrl,
          fileName: item.file.name,
        },
        item.fileUrl
      ),
    [item]
  );

  return (
    <div className="relative size-full overflow-hidden">
      <ContentRenderer metadata={metadata} variant="fill" />
    </div>
  );
};

export default BulkMediaPreview;
