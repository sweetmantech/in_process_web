import { uploadWritingFile } from "@/lib/arweave/uploadWritingFile";
import { generateAndUploadPreview } from "@/lib/writing/generateAndUploadPreview";
import { useMetadataFormProvider } from "@/providers/MetadataFormProvider";

const useWriting = () => {
  const { writingText } = useMetadataFormProvider();

  const uploadWriting = async (headers: HeadersInit) => {
    const [writingResult, previewResult] = await Promise.all([
      uploadWritingFile(writingText, headers),
      generateAndUploadPreview(writingText, headers),
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
