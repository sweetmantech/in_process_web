"use client";

import { uploadWritingFile } from "@/lib/arweave/uploadWritingFile";
import { generateAndUploadPreview } from "@/lib/writing/generateAndUploadPreview";
import { useMetadataFormProvider } from "@/providers/MetadataFormProvider";
import type { UploadClient } from "@/types/upload";

const useWriting = () => {
  const { writingText } = useMetadataFormProvider();

  const uploadWriting = async (client: UploadClient) => {
    const [writingResult, previewResult] = await Promise.all([
      uploadWritingFile(writingText, client),
      generateAndUploadPreview(writingText, client),
    ]);

    return {
      mime: "text/plain" as const,
      animationUrl: writingResult.arweave_uri,
      contentUri: writingResult.arweave_uri,
      image: previewResult?.arweave_uri ?? "",
    };
  };

  return { uploadWriting };
};

export default useWriting;
