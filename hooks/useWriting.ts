"use client";

import { uploadWritingFile } from "@/lib/arweave/uploadWritingFile";
import { generateAndUploadPreview } from "@/lib/writing/generateAndUploadPreview";
import { useMetadataFormProvider } from "@/providers/MetadataFormProvider";

const useWriting = () => {
  const { writingText } = useMetadataFormProvider();

  const uploadWriting = async () => {
    const [writingResult, previewResult] = await Promise.all([
      uploadWritingFile(writingText),
      generateAndUploadPreview(writingText),
    ]);

    return {
      mime: "text/plain" as const,
      animationUrl: writingResult.uri,
      contentUri: writingResult.uri,
      image: previewResult?.uri ?? "",
    };
  };

  return { uploadWriting };
};

export default useWriting;
